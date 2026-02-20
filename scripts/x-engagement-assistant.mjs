#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

loadDotEnv(path.resolve(process.cwd(), '.env'));

const API_BASE_URL = process.env.X_API_BASE_URL ?? 'https://api.x.com/2';
const READ_BEARER_TOKEN = (process.env.X_READ_BEARER_TOKEN ?? '').trim();
const WRITE_BEARER_TOKEN = (process.env.X_WRITE_BEARER_TOKEN ?? process.env.X_READ_BEARER_TOKEN ?? '').trim();
const BOT_USER_ID = (process.env.X_BOT_USER_ID ?? '').trim();
const DRY_RUN = parseBoolean(process.env.X_DRY_RUN, true);

const STATE_FILE = process.env.X_ENGAGEMENT_STATE_FILE
  ? path.resolve(process.cwd(), process.env.X_ENGAGEMENT_STATE_FILE)
  : path.resolve(process.cwd(), 'data/x-engagement-assistant.json');

const FOLLOWING_PAGE_SIZE = clamp(parsePositiveInt('X_FOLLOWING_PAGE_SIZE', 200), 1, 1000);
const FOLLOWING_MAX_PAGES = clamp(parsePositiveInt('X_FOLLOWING_MAX_PAGES', 5), 1, 20);
const FOLLOWING_REFRESH_HOURS = clamp(parsePositiveInt('X_FOLLOWING_REFRESH_HOURS', 12), 1, 168);
const FOLLOWING_SAMPLE_SIZE = clamp(parsePositiveInt('X_FOLLOWING_SAMPLE_SIZE', 20), 1, 500);
const TWEETS_PER_USER = clamp(parsePositiveInt('X_TWEETS_PER_USER', 2), 1, 10);
const MAX_CANDIDATES_PER_SCAN = clamp(parsePositiveInt('X_MAX_CANDIDATES_PER_SCAN', 20), 1, 100);
const MAX_SEEN_POST_IDS = clamp(parsePositiveInt('X_MAX_SEEN_POST_IDS', 10000), 100, 100000);
const MAX_CANDIDATE_HISTORY = clamp(parsePositiveInt('X_MAX_CANDIDATE_HISTORY', 2000), 50, 10000);
const MAX_POST_AGE_HOURS = clamp(parsePositiveInt('X_MAX_POST_AGE_HOURS', 72), 1, 720);
const INCLUDE_REPLIES = parseBoolean(process.env.X_INCLUDE_REPLIES, false);
const INCLUDE_RETWEETS = parseBoolean(process.env.X_INCLUDE_RETWEETS, false);
const REQUIRE_MEDIA = parseBoolean(process.env.X_REQUIRE_MEDIA, false);
const AUTO_LIKE_ON_APPROVE = parseBoolean(process.env.X_AUTO_LIKE_ON_APPROVE, true);
const APPROVE_COOLDOWN_SECONDS = clamp(parseNonNegativeInt('X_APPROVE_COOLDOWN_SECONDS', 45), 0, 86_400);
const REPLY_PREFIX = (process.env.X_REPLY_PREFIX ?? '').trim();
const REPLY_SUFFIX = (process.env.X_REPLY_SUFFIX ?? '').trim();

const command = (process.argv[2] ?? 'scan').toLowerCase();
const flags = parseFlags(process.argv.slice(3));

async function main() {
  switch (command) {
    case 'scan':
      await runScan();
      return;
    case 'list':
      await runList();
      return;
    case 'approve':
      await runApprove();
      return;
    case 'reject':
      await runReject();
      return;
    case 'help':
    case '--help':
    case '-h':
      printHelp();
      return;
    default:
      throw new Error(`Unknown command: ${command}`);
  }
}

async function runScan() {
  requireConfigForScan();

  const state = await loadState();
  const now = Date.now();

  if (shouldRefreshFollowing(state, now)) {
    log('Refreshing following list...');
    const following = await fetchFollowingUsers(BOT_USER_ID);
    state.following = following;
    state.followingUpdatedAt = new Date(now).toISOString();
    state.followingRotationIndex = 0;
    log(`Following refreshed: ${following.length} users`);
  }

  if (!state.following.length) {
    log('No following users found.');
    await saveState(state);
    return;
  }

  const selectedFollowing = selectFollowingSlice(state.following, state.followingRotationIndex, FOLLOWING_SAMPLE_SIZE);
  state.followingRotationIndex = nextRotationIndex(state.following.length, state.followingRotationIndex, selectedFollowing.length);

  log(`Scanning posts from ${selectedFollowing.length} following accounts...`);

  const seenSet = new Set(state.seenPostIds);
  const existingPostIdSet = new Set(state.candidates.map((candidate) => candidate.postId));
  const freshCandidates = [];

  for (const user of selectedFollowing) {
    const posts = await fetchUserPosts(user.id);

    for (const post of posts) {
      if (freshCandidates.length >= MAX_CANDIDATES_PER_SCAN) {
        break;
      }

      if (post.author_id === BOT_USER_ID) {
        continue;
      }

      if (seenSet.has(post.id) || existingPostIdSet.has(post.id)) {
        continue;
      }

      if (!isWithinAgeLimit(post.created_at, MAX_POST_AGE_HOURS)) {
        continue;
      }

      const mediaSummary = buildMediaSummary(post.media ?? []);
      if (REQUIRE_MEDIA && mediaSummary.count === 0) {
        continue;
      }

      const draftedReply = buildEmpatheticReply({
        text: post.text,
        mediaSummary,
      });

      const candidate = {
        id: `cand_${post.id}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        postId: post.id,
        postUrl: makePostUrl(post.author_username ?? user.username, post.id),
        authorId: post.author_id,
        authorUsername: post.author_username ?? user.username ?? null,
        authorName: post.author_name ?? user.name ?? null,
        createdAtPost: post.created_at ?? null,
        postText: post.text,
        mediaSummary: mediaSummary.text,
        draftedReply,
        suggestedLike: AUTO_LIKE_ON_APPROVE,
        metrics: post.public_metrics ?? null,
        source: 'following',
      };

      freshCandidates.push(candidate);
      seenSet.add(post.id);
      existingPostIdSet.add(post.id);
    }

    if (freshCandidates.length >= MAX_CANDIDATES_PER_SCAN) {
      break;
    }

    await sleep(200);
  }

  state.seenPostIds = keepNewestIds([...seenSet], MAX_SEEN_POST_IDS);
  state.candidates = pruneCandidates([...state.candidates, ...freshCandidates], MAX_CANDIDATE_HISTORY);
  state.updatedAt = new Date().toISOString();
  await saveState(state);

  if (!freshCandidates.length) {
    log('No new engagement candidates created.');
    return;
  }

  log(`Created ${freshCandidates.length} new candidates.`);
  printCandidates(freshCandidates);
  log('Use: npm run xbot:approve -- --id=<candidate_id>');
}

async function runList() {
  const state = await loadState();
  const pending = state.candidates.filter((candidate) => candidate.status === 'pending');

  if (!pending.length) {
    log('No pending candidates.');
    return;
  }

  log(`Pending candidates: ${pending.length}`);
  printCandidates(pending);
}

async function runApprove() {
  requireConfigForApprove();

  const candidateId = flags.id;
  if (!candidateId) {
    throw new Error('Missing --id for approve command');
  }

  const state = await loadState();
  const cooldownSeconds = resolveApproveCooldownSeconds(flags);
  enforceApproveCooldown(state, cooldownSeconds);

  const candidate = state.candidates.find((item) => item.id === candidateId);
  if (!candidate) {
    throw new Error(`Candidate not found: ${candidateId}`);
  }

  if (candidate.status !== 'pending') {
    throw new Error(`Candidate ${candidateId} is not pending (status=${candidate.status})`);
  }

  const replyTextRaw = flags.reply?.trim() || candidate.draftedReply;
  const replyText = withAffixes(replyTextRaw, REPLY_PREFIX, REPLY_SUFFIX);
  const shouldLike = flags.like !== 'false' && flags.noLike !== 'true' && candidate.suggestedLike;
  const actionAt = new Date().toISOString();

  if (DRY_RUN) {
    log(`[DRY RUN] approve ${candidateId}`);
    log(`[DRY RUN] like=${shouldLike ? 'yes' : 'no'} cooldown=${cooldownSeconds}s reply="${replyText}"`);
    candidate.status = 'approved_dry_run';
    candidate.replyText = replyText;
    candidate.updatedAt = actionAt;
    state.lastActionAt = actionAt;
    state.lastActionType = 'approved_dry_run';
    state.lastCooldownSeconds = cooldownSeconds;
    await saveState(state);
    return;
  }

  try {
    if (shouldLike) {
      await likePost(BOT_USER_ID, candidate.postId);
      candidate.likedAt = new Date().toISOString();
    }

    const replyResult = await createReply(candidate.postId, replyText);
    candidate.status = 'sent';
    candidate.replyId = replyResult?.data?.id ?? null;
    candidate.replyText = replyText;
    candidate.sentAt = new Date().toISOString();
    candidate.updatedAt = new Date().toISOString();
    state.lastActionAt = candidate.updatedAt;
    state.lastActionType = 'sent';
    state.lastCooldownSeconds = cooldownSeconds;
    await saveState(state);

    log(`Candidate sent: ${candidate.id}`);
    log(`Post: ${candidate.postUrl}`);
    if (candidate.replyId) {
      log(`Reply ID: ${candidate.replyId}`);
    }
  } catch (error) {
    const failedAt = new Date().toISOString();
    candidate.status = 'failed';
    candidate.error = normalizeError(error);
    candidate.updatedAt = failedAt;
    state.lastActionAt = failedAt;
    state.lastActionType = 'failed';
    state.lastCooldownSeconds = cooldownSeconds;
    await saveState(state);
    throw error;
  }
}

async function runReject() {
  const candidateId = flags.id;
  if (!candidateId) {
    throw new Error('Missing --id for reject command');
  }

  const state = await loadState();
  const candidate = state.candidates.find((item) => item.id === candidateId);
  if (!candidate) {
    throw new Error(`Candidate not found: ${candidateId}`);
  }

  if (candidate.status !== 'pending') {
    throw new Error(`Candidate ${candidateId} is not pending (status=${candidate.status})`);
  }

  candidate.status = 'rejected';
  candidate.rejectionReason = flags.reason?.trim() || null;
  candidate.updatedAt = new Date().toISOString();
  await saveState(state);
  log(`Candidate rejected: ${candidateId}`);
}

function printHelp() {
  console.log([
    'X engagement assistant (human approval required)',
    '',
    'Commands:',
    '  scan                        Generate pending candidates from following posts',
    '  list                        List pending candidates',
    '  approve --id=<candidate>    Approve one candidate and execute like/reply',
    '  reject --id=<candidate>     Reject one candidate',
    '',
    'Options:',
    '  --reply="..."               Override drafted reply on approve',
    '  --like=false                Skip like on approve',
    '  --no-like=true              Skip like on approve',
    '  --cooldown-seconds=45       Override approve cooldown for this command',
    '  --reason="..."              Rejection reason (reject command)',
  ].join('\n'));
}

function parseFlags(items) {
  const parsed = {};
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    if (!item.startsWith('--')) continue;
    const index = item.indexOf('=');
    if (index === -1) {
      const key = item.slice(2);
      const next = items[i + 1];
      if (next && !next.startsWith('--')) {
        parsed[key] = next;
        i += 1;
      } else {
        parsed[key] = 'true';
      }
      continue;
    }

    const key = item.slice(2, index);
    const value = item.slice(index + 1);
    parsed[key] = value;
  }
  return parsed;
}

function requireConfigForScan() {
  if (!BOT_USER_ID) {
    throw new Error('Missing required environment variable: X_BOT_USER_ID');
  }
  if (!READ_BEARER_TOKEN) {
    throw new Error('Missing required environment variable: X_READ_BEARER_TOKEN');
  }
}

function requireConfigForApprove() {
  if (!BOT_USER_ID) {
    throw new Error('Missing required environment variable: X_BOT_USER_ID');
  }
  if (!WRITE_BEARER_TOKEN) {
    throw new Error('Missing required environment variable: X_WRITE_BEARER_TOKEN (or X_READ_BEARER_TOKEN fallback)');
  }
}

function resolveApproveCooldownSeconds(flagMap) {
  const value = flagMap['cooldown-seconds'] ?? flagMap.cooldownSeconds;
  if (value == null || value === '') {
    return APPROVE_COOLDOWN_SECONDS;
  }

  return clamp(parseNonNegativeIntValue(value, '--cooldown-seconds'), 0, 86_400);
}

function enforceApproveCooldown(state, cooldownSeconds) {
  if (cooldownSeconds <= 0) {
    return;
  }

  const lastActionTs = Date.parse(String(state.lastActionAt || ''));
  if (!Number.isFinite(lastActionTs)) {
    return;
  }

  const remainingMs = cooldownSeconds * 1000 - (Date.now() - lastActionTs);
  if (remainingMs > 0) {
    const waitSeconds = Math.ceil(remainingMs / 1000);
    throw new Error(`Cooldown active: wait ${waitSeconds}s before next approve (cooldown=${cooldownSeconds}s)`);
  }
}

function shouldRefreshFollowing(state, nowTs) {
  if (!Array.isArray(state.following) || !state.following.length) {
    return true;
  }
  if (!state.followingUpdatedAt) {
    return true;
  }

  const last = Date.parse(state.followingUpdatedAt);
  if (!Number.isFinite(last)) {
    return true;
  }

  return nowTs - last >= FOLLOWING_REFRESH_HOURS * 60 * 60 * 1000;
}

function selectFollowingSlice(following, startIndex, count) {
  if (!following.length) return [];
  const selected = [];
  const limit = Math.min(count, following.length);

  for (let i = 0; i < limit; i += 1) {
    selected.push(following[(startIndex + i) % following.length]);
  }

  return selected;
}

function nextRotationIndex(total, start, used) {
  if (total <= 0) return 0;
  return (start + used) % total;
}

async function fetchFollowingUsers(userId) {
  let paginationToken = null;
  let page = 0;
  const users = [];

  while (page < FOLLOWING_MAX_PAGES) {
    page += 1;
    const params = new URLSearchParams({
      max_results: String(FOLLOWING_PAGE_SIZE),
      'user.fields': 'id,name,username',
    });

    if (paginationToken) {
      params.set('pagination_token', paginationToken);
    }

    const url = `${API_BASE_URL}/users/${encodeURIComponent(userId)}/following?${params.toString()}`;
    const response = await apiRequest(url, READ_BEARER_TOKEN, 'GET');

    if (Array.isArray(response.data)) {
      for (const user of response.data) {
        if (user?.id) {
          users.push({
            id: String(user.id),
            username: user.username ? String(user.username) : null,
            name: user.name ? String(user.name) : null,
          });
        }
      }
    }

    paginationToken = response.meta?.next_token ?? null;
    if (!paginationToken) {
      break;
    }

    await sleep(250);
  }

  return users;
}

async function fetchUserPosts(userId) {
  const params = new URLSearchParams({
    max_results: String(TWEETS_PER_USER),
    expansions: 'attachments.media_keys',
    'tweet.fields': 'author_id,created_at,text,attachments,public_metrics',
    'media.fields': 'media_key,type,alt_text,url,preview_image_url,width,height',
  });

  const excludes = [];
  if (!INCLUDE_RETWEETS) excludes.push('retweets');
  if (!INCLUDE_REPLIES) excludes.push('replies');
  if (excludes.length) {
    params.set('exclude', excludes.join(','));
  }

  const url = `${API_BASE_URL}/users/${encodeURIComponent(userId)}/tweets?${params.toString()}`;
  const response = await apiRequest(url, READ_BEARER_TOKEN, 'GET');

  const mediaByKey = new Map();
  for (const media of response.includes?.media ?? []) {
    if (media?.media_key) {
      mediaByKey.set(String(media.media_key), media);
    }
  }

  const posts = [];
  for (const post of response.data ?? []) {
    if (!post?.id || !post?.author_id) continue;
    const mediaKeys = post.attachments?.media_keys ?? [];
    const media = [];

    for (const key of mediaKeys) {
      const item = mediaByKey.get(String(key));
      if (item) media.push(item);
    }

    posts.push({
      id: String(post.id),
      author_id: String(post.author_id),
      author_username: post.username ? String(post.username) : null,
      author_name: null,
      created_at: post.created_at ?? null,
      text: String(post.text ?? ''),
      public_metrics: post.public_metrics ?? null,
      media,
    });
  }

  return posts;
}

function buildMediaSummary(mediaItems) {
  if (!Array.isArray(mediaItems) || mediaItems.length === 0) {
    return { count: 0, text: '미디어 없음' };
  }

  const typeCount = new Map();
  const altTexts = [];

  for (const media of mediaItems) {
    const type = String(media?.type ?? 'unknown');
    typeCount.set(type, (typeCount.get(type) ?? 0) + 1);

    const alt = normalizeWhitespace(media?.alt_text ?? '');
    if (alt) {
      altTexts.push(alt);
    }
  }

  const typeSummary = [...typeCount.entries()]
    .map(([type, count]) => `${type} ${count}개`)
    .join(', ');

  const altSummary = altTexts.length
    ? `alt: ${truncateText(altTexts.join(' / '), 140)}`
    : 'alt: 없음';

  return {
    count: mediaItems.length,
    text: `${typeSummary} | ${altSummary}`,
  };
}

function buildEmpatheticReply({ text, mediaSummary }) {
  const cleanText = normalizeWhitespace(stripUrls(text));
  const lower = cleanText.toLowerCase();

  const hasCongratsCue = containsAny(lower, [
    '축하',
    '성공',
    '완료',
    '런칭',
    '합격',
    '오픈',
    'release',
    'launched',
    'shipped',
    'won',
    'passed',
  ]);

  const hasStruggleCue = containsAny(lower, [
    '힘들',
    '지치',
    '고민',
    '어렵',
    '실패',
    '스트레스',
    '아프',
    'tired',
    'hard',
    'rough',
    'struggle',
    'stressed',
  ]);

  const hasQuestionCue = /\?$/.test(cleanText) || containsAny(lower, ['어떻게', '추천', '의견', 'help', 'advice']);

  const hasMedia = mediaSummary.count > 0;

  if (hasCongratsCue) {
    return hasMedia
      ? '정말 축하드려요! 올려주신 이미지에서도 준비한 과정이 느껴져서 더 인상적이에요.'
      : '정말 축하드려요! 준비하신 과정이 글에서 잘 느껴집니다.';
  }

  if (hasStruggleCue) {
    return hasMedia
      ? '쉽지 않은 순간이었을 텐데 공유해주셔서 고마워요. 이미지와 함께 보니 마음이 더 전해져요. 응원합니다.'
      : '쉽지 않은 순간이었을 텐데 공유해주셔서 고마워요. 진심으로 응원합니다.';
  }

  if (hasQuestionCue) {
    return '좋은 질문이에요. 저도 비슷한 고민을 자주 하는데, 맥락을 조금 더 보면 더 정확히 의견 드릴 수 있을 것 같아요.';
  }

  if (hasMedia) {
    return '사진(이미지) 분위기랑 글 톤이 잘 맞아서 인상 깊게 봤어요. 공유해주셔서 감사합니다.';
  }

  return '공유해주신 내용 잘 봤어요. 핵심 포인트가 명확해서 공감하면서 읽었습니다.';
}

function containsAny(text, words) {
  return words.some((word) => text.includes(word));
}

function stripUrls(text) {
  return text.replace(/https?:\/\/\S+/g, '');
}

function normalizeWhitespace(text) {
  return String(text).replace(/\s+/g, ' ').trim();
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, Math.max(0, maxLength - 3))}...`;
}

function isWithinAgeLimit(createdAt, maxAgeHours) {
  if (!createdAt) return true;
  const createdTs = Date.parse(createdAt);
  if (!Number.isFinite(createdTs)) return true;
  return Date.now() - createdTs <= maxAgeHours * 60 * 60 * 1000;
}

function makePostUrl(authorUsername, postId) {
  if (authorUsername) {
    return `https://x.com/${authorUsername}/status/${postId}`;
  }
  return `https://x.com/i/web/status/${postId}`;
}

function withAffixes(text, prefix, suffix) {
  return [prefix, text, suffix].filter(Boolean).join(' ').trim();
}

function pruneCandidates(candidates, limit) {
  const sorted = [...candidates].sort((a, b) => {
    const at = Date.parse(a.updatedAt ?? a.createdAt ?? 0);
    const bt = Date.parse(b.updatedAt ?? b.createdAt ?? 0);
    return at - bt;
  });

  return sorted.slice(Math.max(0, sorted.length - limit));
}

function printCandidates(candidates) {
  for (const candidate of candidates) {
    const metrics = candidate.metrics
      ? `likes=${candidate.metrics.like_count ?? 0}, reposts=${candidate.metrics.retweet_count ?? 0}`
      : 'likes=0, reposts=0';

    console.log('---');
    console.log(`id: ${candidate.id}`);
    console.log(`status: ${candidate.status}`);
    console.log(`post: ${candidate.postUrl}`);
    console.log(`author: ${candidate.authorUsername ? `@${candidate.authorUsername}` : candidate.authorId}`);
    console.log(`text: ${truncateText(normalizeWhitespace(candidate.postText ?? ''), 180)}`);
    console.log(`media: ${candidate.mediaSummary ?? '미디어 없음'}`);
    console.log(`draft: ${candidate.draftedReply}`);
    console.log(`metrics: ${metrics}`);
  }
}

async function likePost(userId, postId) {
  const url = `${API_BASE_URL}/users/${encodeURIComponent(userId)}/likes`;
  await apiRequest(url, WRITE_BEARER_TOKEN, 'POST', { tweet_id: String(postId) });
}

async function createReply(inReplyToPostId, text) {
  const url = `${API_BASE_URL}/tweets`;
  return apiRequest(url, WRITE_BEARER_TOKEN, 'POST', {
    text,
    reply: {
      in_reply_to_tweet_id: String(inReplyToPostId),
    },
  });
}

async function apiRequest(url, token, method, body) {
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await readJson(response);
  if (!response.ok) {
    throw new Error(`${method} ${url} -> ${response.status}: ${summarizeApiError(data)}`);
  }

  return data;
}

async function loadState() {
  try {
    const raw = await readFile(STATE_FILE, 'utf8');
    const parsed = JSON.parse(raw);

    return {
      following: Array.isArray(parsed.following)
        ? parsed.following
            .filter((user) => user && user.id)
            .map((user) => ({
              id: String(user.id),
              username: user.username ? String(user.username) : null,
              name: user.name ? String(user.name) : null,
            }))
        : [],
      followingUpdatedAt: parsed.followingUpdatedAt ?? null,
      followingRotationIndex: normalizeIndex(parsed.followingRotationIndex),
      seenPostIds: Array.isArray(parsed.seenPostIds) ? parsed.seenPostIds.map((id) => String(id)) : [],
      candidates: Array.isArray(parsed.candidates) ? parsed.candidates : [],
      lastActionAt: parsed.lastActionAt ? String(parsed.lastActionAt) : null,
      lastActionType: parsed.lastActionType ? String(parsed.lastActionType) : null,
      lastCooldownSeconds: normalizeIndex(parsed.lastCooldownSeconds),
      updatedAt: parsed.updatedAt ?? null,
    };
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {
        following: [],
        followingUpdatedAt: null,
        followingRotationIndex: 0,
        seenPostIds: [],
        candidates: [],
        lastActionAt: null,
        lastActionType: null,
        lastCooldownSeconds: 0,
        updatedAt: null,
      };
    }
    throw error;
  }
}

function normalizeIndex(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }
  return Math.floor(parsed);
}

async function saveState(state) {
  await mkdir(path.dirname(STATE_FILE), { recursive: true });
  const payload = {
    following: state.following,
    followingUpdatedAt: state.followingUpdatedAt,
    followingRotationIndex: state.followingRotationIndex,
    seenPostIds: state.seenPostIds,
    candidates: state.candidates,
    lastActionAt: state.lastActionAt ?? null,
    lastActionType: state.lastActionType ?? null,
    lastCooldownSeconds: normalizeIndex(state.lastCooldownSeconds),
    updatedAt: new Date().toISOString(),
  };

  await writeFile(STATE_FILE, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
}

function keepNewestIds(ids, limit) {
  const unique = [...new Set(ids)];
  unique.sort(compareSnowflake);
  return unique.slice(Math.max(0, unique.length - limit));
}

function compareSnowflake(a, b) {
  const ai = BigInt(String(a));
  const bi = BigInt(String(b));
  if (ai < bi) return -1;
  if (ai > bi) return 1;
  return 0;
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
    return data.errors.map((error) => error.message ?? error.detail ?? JSON.stringify(error)).join('; ');
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

function parseNonNegativeInt(name, defaultValue) {
  const value = process.env[name];
  if (!value) return defaultValue;
  return parseNonNegativeIntValue(value, name);
}

function parseNonNegativeIntValue(value, label) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`${label} must be a non-negative number`);
  }
  return Math.floor(parsed);
}

function parseBoolean(value, defaultValue) {
  if (value == null) return defaultValue;
  const normalized = String(value).trim().toLowerCase();
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

function normalizeError(error) {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function log(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[${new Date().toISOString()}] ERROR: ${message}`);
  process.exitCode = 1;
});
