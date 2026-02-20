#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

loadDotEnv(path.resolve(process.cwd(), '.env'));

const API_BASE_URL = process.env.X_API_BASE_URL ?? 'https://api.x.com/2';
const READ_BEARER_TOKEN = requireEnv('X_READ_BEARER_TOKEN');
const WRITE_BEARER_TOKEN = process.env.X_WRITE_BEARER_TOKEN ?? READ_BEARER_TOKEN;
const SEARCH_QUERY = requireEnv('X_SEARCH_QUERY');
const BOT_USER_ID = requireEnv('X_BOT_USER_ID');
const REPLY_TEMPLATE = process.env.X_REPLY_TEMPLATE ?? '문의 주셔서 감사합니다. 자세히 확인해볼게요.';
const REQUIRED_TRIGGER = (process.env.X_REQUIRED_TRIGGER ?? '#replyme').trim();
const POLL_INTERVAL_MS = parsePositiveInt('X_POLL_INTERVAL_MS', 60_000);
const MAX_RESULTS = clamp(parsePositiveInt('X_MAX_RESULTS', 10), 10, 100);
const MAX_REPLIES_PER_CYCLE = parsePositiveInt('X_MAX_REPLIES_PER_CYCLE', 3);
const RUN_ONCE = parseBoolean(process.env.X_RUN_ONCE, false);
const DRY_RUN = parseBoolean(process.env.X_DRY_RUN, true);
const STATE_FILE = process.env.X_STATE_FILE
  ? path.resolve(process.cwd(), process.env.X_STATE_FILE)
  : path.resolve(process.cwd(), 'data/x-reply-bot-state.json');
const REPLIED_CACHE_LIMIT = clamp(parsePositiveInt('X_REPLIED_CACHE_LIMIT', 5000), 100, 50_000);

async function main() {
  log('X reply bot started.');
  log(`API base: ${API_BASE_URL}`);
  log(`Query: ${SEARCH_QUERY}`);
  log(`Dry run: ${DRY_RUN ? 'yes' : 'no'}`);
  log(`Run once: ${RUN_ONCE ? 'yes' : 'no'}`);
  if (REQUIRED_TRIGGER) {
    log(`Required trigger: ${REQUIRED_TRIGGER}`);
  }

  if (RUN_ONCE) {
    await runCycle();
    return;
  }

  while (true) {
    try {
      await runCycle();
    } catch (error) {
      logError(error);
    }
    await sleep(POLL_INTERVAL_MS);
  }
}

async function runCycle() {
  const state = await loadState();
  const searchResponse = await searchRecentPosts(state.lastSeenId);
  const posts = (searchResponse.data ?? [])
    .filter((post) => post && post.id)
    .sort((a, b) => compareSnowflake(a.id, b.id));

  if (searchResponse.meta?.newest_id) {
    state.lastSeenId = maxSnowflake(state.lastSeenId, searchResponse.meta.newest_id);
  }

  if (posts.length === 0) {
    log('No new posts found.');
    await saveState(state);
    return;
  }

  let repliesSent = 0;
  const repliedSet = new Set(state.repliedPostIds);

  for (const post of posts) {
    state.lastSeenId = maxSnowflake(state.lastSeenId, post.id);

    if (repliesSent >= MAX_REPLIES_PER_CYCLE) {
      break;
    }

    if (post.author_id === BOT_USER_ID) {
      continue;
    }

    if (repliedSet.has(post.id)) {
      continue;
    }

    if (REQUIRED_TRIGGER && !containsTrigger(post.text ?? '', REQUIRED_TRIGGER)) {
      continue;
    }

    const replyText = buildReplyText(post);

    if (DRY_RUN) {
      log(`[DRY RUN] Would reply to post ${post.id}: ${replyText}`);
      repliedSet.add(post.id);
      repliesSent += 1;
      continue;
    }

    const reply = await createReply(post.id, replyText);
    log(`Replied to post ${post.id} -> ${reply?.data?.id ?? 'unknown id'}`);
    repliedSet.add(post.id);
    repliesSent += 1;

    // Small delay helps avoid burst posting and keeps behavior predictable.
    await sleep(1_500);
  }

  state.repliedPostIds = keepNewestIds([...repliedSet], REPLIED_CACHE_LIMIT);
  await saveState(state);
  log(`Cycle complete. replies=${repliesSent}, scanned=${posts.length}`);
}

async function searchRecentPosts(sinceId) {
  const params = new URLSearchParams({
    query: SEARCH_QUERY,
    max_results: String(MAX_RESULTS),
    'tweet.fields': 'author_id,created_at,text,conversation_id',
  });

  if (sinceId) {
    params.set('since_id', sinceId);
  }

  const url = `${API_BASE_URL}/tweets/search/recent?${params.toString()}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${READ_BEARER_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await readJson(response);

  if (!response.ok) {
    throw new Error(`Search API error ${response.status}: ${summarizeApiError(data)}`);
  }

  return data;
}

async function createReply(inReplyToPostId, text) {
  const url = `${API_BASE_URL}/tweets`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${WRITE_BEARER_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      reply: {
        in_reply_to_tweet_id: inReplyToPostId,
      },
    }),
  });

  const data = await readJson(response);

  if (response.status === 429) {
    const resetAt = response.headers.get('x-rate-limit-reset');
    const waitSec = resetAt ? Math.max(0, Number(resetAt) - Math.floor(Date.now() / 1000)) : null;
    const hint = waitSec !== null ? `rate-limit reset in ~${waitSec}s` : 'rate-limited';
    throw new Error(`Reply API error 429: ${hint}`);
  }

  if (!response.ok) {
    throw new Error(`Reply API error ${response.status}: ${summarizeApiError(data)}`);
  }

  return data;
}

function buildReplyText(post) {
  return REPLY_TEMPLATE
    .replaceAll('{post_id}', String(post.id ?? ''))
    .replaceAll('{author_id}', String(post.author_id ?? ''))
    .trim();
}

function containsTrigger(text, trigger) {
  return text.toLowerCase().includes(trigger.toLowerCase());
}

function keepNewestIds(ids, limit) {
  const unique = [...new Set(ids)];
  unique.sort(compareSnowflake);
  return unique.slice(Math.max(0, unique.length - limit));
}

function compareSnowflake(a, b) {
  return bigIntFromId(a) < bigIntFromId(b) ? -1 : bigIntFromId(a) > bigIntFromId(b) ? 1 : 0;
}

function maxSnowflake(a, b) {
  if (!a) return b;
  if (!b) return a;
  return compareSnowflake(a, b) >= 0 ? a : b;
}

function bigIntFromId(value) {
  return BigInt(String(value));
}

async function loadState() {
  try {
    const raw = await readFile(STATE_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return {
      lastSeenId: parsed.lastSeenId ? String(parsed.lastSeenId) : null,
      repliedPostIds: Array.isArray(parsed.repliedPostIds)
        ? parsed.repliedPostIds.map((id) => String(id))
        : [],
    };
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { lastSeenId: null, repliedPostIds: [] };
    }
    throw error;
  }
}

async function saveState(state) {
  await mkdir(path.dirname(STATE_FILE), { recursive: true });
  const payload = {
    lastSeenId: state.lastSeenId,
    repliedPostIds: state.repliedPostIds,
    updatedAt: new Date().toISOString(),
  };
  await writeFile(STATE_FILE, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
}

async function readJson(response) {
  const text = await response.text();
  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

function summarizeApiError(data) {
  if (!data) return 'unknown error';
  if (typeof data === 'string') return data;
  if (Array.isArray(data.errors) && data.errors.length > 0) {
    return data.errors.map((error) => error.message ?? JSON.stringify(error)).join('; ');
  }
  if (data.title || data.detail) {
    return [data.title, data.detail].filter(Boolean).join(' - ');
  }
  return JSON.stringify(data);
}

function parsePositiveInt(name, defaultValue) {
  const value = process.env[name];
  if (!value) return defaultValue;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`${name} must be a positive number`);
  }
  return Math.floor(parsed);
}

function parseBoolean(value, defaultValue) {
  if (value == null) return defaultValue;
  const normalized = value.trim().toLowerCase();
  if (['1', 'true', 'yes', 'y', 'on'].includes(normalized)) return true;
  if (['0', 'false', 'no', 'n', 'off'].includes(normalized)) return false;
  throw new Error(`Invalid boolean value: ${value}`);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function loadDotEnv(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) {
        continue;
      }

      const separatorIndex = line.indexOf('=');
      if (separatorIndex <= 0) {
        continue;
      }

      const key = line.slice(0, separatorIndex).trim();
      if (!key || Object.prototype.hasOwnProperty.call(process.env, key)) {
        continue;
      }

      let value = line.slice(separatorIndex + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      process.env[key] = value;
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value.trim();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function log(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

function logError(error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[${new Date().toISOString()}] ERROR: ${message}`);
}

main().catch((error) => {
  logError(error);
  process.exitCode = 1;
});
