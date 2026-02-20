import crypto from "node:crypto";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import express from "express";
import pg from "pg";

const { Pool } = pg;

const app = express();
const PORT = Number(process.env.PORT || 3000);
const ROOT = process.cwd();

loadDotEnv(path.join(ROOT, ".env"));

const execFileAsync = promisify(execFile);
const X_ENGAGEMENT_SCRIPT_PATH = path.join(ROOT, "scripts", "x-engagement-assistant.mjs");
const DEFAULT_X_ENGAGEMENT_STATE_PATH = path.join(ROOT, "data", "x-engagement-assistant.json");
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/gommath";
const GOOGLE_CLIENT_IDS = (process.env.GOOGLE_CLIENT_IDS || process.env.GOOGLE_CLIENT_ID || "160808232856-3c351j191uocqiailplgha2pnf2qtdam.apps.googleusercontent.com")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
const SESSION_SECRET = process.env.SESSION_SECRET || "gommath-dev-session-secret";
const SESSION_TTL_HOURS = Math.max(Number(process.env.SESSION_TTL_HOURS || 24 * 7), 1);
const SESSION_TTL_MS = SESSION_TTL_HOURS * 60 * 60 * 1000;
const SKIP_DB = ["1", "true", "yes", "y", "on"].includes(String(process.env.SKIP_DB || "").trim().toLowerCase());
const ALLOWED_THEMES = ["red", "orange", "yellow", "green", "blue", "purple", "pink"];
const NICKNAME_PATTERN = /^[A-Za-z0-9가-힣_]{2,12}$/;
const OPENAI_API_KEY = String(process.env.OPENAI_API_KEY || "").trim();
const OPENAI_MODEL = String(process.env.OPENAI_MODEL || "gpt-4o-mini").trim();
const OLLAMA_BASE_URL = String(process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434")
  .trim()
  .replace(/\/+$/g, "");
const OLLAMA_MODEL = String(process.env.OLLAMA_MODEL || "qwen2.5:3b-instruct").trim();

const isLocalDb = DATABASE_URL.includes("localhost") || DATABASE_URL.includes("127.0.0.1");
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: isLocalDb ? false : { rejectUnauthorized: false }
});

if (!process.env.SESSION_SECRET) {
  console.warn("[warn] SESSION_SECRET is not set. Using development default secret.");
}

function loadDotEnv(filePath) {
  try {
    const content = readFileSync(filePath, "utf8");
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;

      const separatorIndex = line.indexOf("=");
      if (separatorIndex <= 0) continue;

      const key = line.slice(0, separatorIndex).trim();
      if (!key || process.env[key] != null) continue;

      let value = line.slice(separatorIndex + 1).trim();
      if (
        (value.startsWith("\"") && value.endsWith("\"")) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  } catch (error) {
    if (error?.code !== "ENOENT") {
      console.warn("[warn] failed to load .env", error.message || error);
    }
  }
}

function toBase64Url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(input) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return Buffer.from(`${normalized}${padding}`, "base64");
}

function signSession(user) {
  const payload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    picture: user.picture,
    iat: Date.now(),
    exp: Date.now() + SESSION_TTL_MS
  };

  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = crypto.createHmac("sha256", SESSION_SECRET).update(encodedPayload).digest("base64url");

  return `${encodedPayload}.${signature}`;
}

function verifySession(token) {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [encodedPayload, signature] = parts;
  const expected = crypto.createHmac("sha256", SESSION_SECRET).update(encodedPayload).digest("base64url");

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (signatureBuffer.length !== expectedBuffer.length) return null;
  if (!crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) return null;

  try {
    const payload = JSON.parse(fromBase64Url(encodedPayload).toString("utf8"));
    if (!payload?.sub || Number(payload.exp || 0) < Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

function getBearerToken(req) {
  const header = String(req.headers.authorization || "").trim();
  if (!header.startsWith("Bearer ")) return "";
  return header.slice(7).trim();
}

function getSessionOrReject(req, res) {
  const token = getBearerToken(req);
  if (!token) {
    res.status(401).json({ error: "authorization token is required" });
    return null;
  }

  const session = verifySession(token);
  if (!session) {
    res.status(401).json({ error: "invalid or expired session" });
    return null;
  }

  return session;
}

async function verifyGoogleIdToken(idToken) {
  const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("google token verification failed");
  }

  const payload = await response.json();

  const issuer = String(payload.iss || "");
  const isIssuerValid = issuer === "accounts.google.com" || issuer === "https://accounts.google.com";
  if (!isIssuerValid) {
    throw new Error("invalid google token issuer");
  }

  if (!payload.sub) {
    throw new Error("google token is missing sub");
  }

  if (GOOGLE_CLIENT_IDS.length > 0 && !GOOGLE_CLIENT_IDS.includes(String(payload.aud || ""))) {
    throw new Error("google token audience is not allowed");
  }

  const expiresAt = Number(payload.exp || 0) * 1000;
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
    throw new Error("google token is expired");
  }

  return {
    id: String(payload.sub),
    email: String(payload.email || ""),
    name: String(payload.name || "사용자"),
    picture: String(payload.picture || "")
  };
}

async function upsertMathUser(user) {
  const { rows } = await pool.query(
    `
      INSERT INTO math_users (id, email, name, picture)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id)
      DO UPDATE SET
        email = EXCLUDED.email,
        name = EXCLUDED.name,
        picture = EXCLUDED.picture,
        updated_at = NOW()
      RETURNING
        id,
        email,
        name,
        picture,
        theme,
        nickname
    `,
    [user.id, user.email, user.name, user.picture]
  );

  return rows[0];
}

function toInt(value, fallback = 0) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.trunc(parsed);
}

function toTimestamp(value) {
  const parsed = Date.parse(String(value || ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function safeParseBoolean(value, fallback) {
  if (value == null || value === "") return fallback;
  const normalized = String(value).trim().toLowerCase();
  if (["1", "true", "yes", "y", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "n", "off"].includes(normalized)) return false;
  return fallback;
}

function safeParseNonNegativeInt(value, fallback) {
  if (value == null || value === "") return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return fallback;
  return Math.floor(parsed);
}

async function readEnvFileMap(filePath) {
  try {
    const content = await readFile(filePath, "utf8");
    const env = {};

    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;

      const separatorIndex = line.indexOf("=");
      if (separatorIndex <= 0) continue;

      const key = line.slice(0, separatorIndex).trim();
      if (!key) continue;

      let value = line.slice(separatorIndex + 1).trim();
      if (
        (value.startsWith("\"") && value.endsWith("\"")) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      env[key] = value;
    }

    return env;
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw error;
  }
}

function resolveXEngagementStatePath(envMap = {}) {
  const configuredPath =
    String(envMap.X_ENGAGEMENT_STATE_FILE || process.env.X_ENGAGEMENT_STATE_FILE || "").trim() ||
    path.relative(ROOT, DEFAULT_X_ENGAGEMENT_STATE_PATH);

  if (path.isAbsolute(configuredPath)) {
    return configuredPath;
  }
  return path.join(ROOT, configuredPath);
}

function summarizeCandidateStatuses(candidates) {
  const summary = {
    total: candidates.length,
    pending: 0,
    sent: 0,
    rejected: 0,
    failed: 0,
    approvedDryRun: 0,
    other: 0
  };

  for (const candidate of candidates) {
    const status = String(candidate?.status || "pending");
    if (status === "pending") summary.pending += 1;
    else if (status === "sent") summary.sent += 1;
    else if (status === "rejected") summary.rejected += 1;
    else if (status === "failed") summary.failed += 1;
    else if (status === "approved_dry_run") summary.approvedDryRun += 1;
    else summary.other += 1;
  }

  return summary;
}

async function readXBotSnapshot() {
  const envMap = await readEnvFileMap(path.join(ROOT, ".env"));
  const stateFile = resolveXEngagementStatePath(envMap);
  const readToken = String(envMap.X_READ_BEARER_TOKEN || process.env.X_READ_BEARER_TOKEN || "").trim();
  const writeToken = String(
    envMap.X_WRITE_BEARER_TOKEN || process.env.X_WRITE_BEARER_TOKEN || readToken || ""
  ).trim();
  const botUserId = String(envMap.X_BOT_USER_ID || process.env.X_BOT_USER_ID || "").trim();
  const dryRun = safeParseBoolean(envMap.X_DRY_RUN ?? process.env.X_DRY_RUN, true);
  const approveCooldownSeconds = safeParseNonNegativeInt(
    envMap.X_APPROVE_COOLDOWN_SECONDS ?? process.env.X_APPROVE_COOLDOWN_SECONDS,
    45
  );

  const config = {
    hasBotUserId: Boolean(botUserId),
    hasReadToken: Boolean(readToken),
    hasWriteToken: Boolean(writeToken),
    dryRun,
    approveCooldownSeconds,
    readyForScan: Boolean(botUserId && readToken),
    readyForApprove: Boolean(botUserId && writeToken),
    stateFile
  };

  try {
    const raw = await readFile(stateFile, "utf8");
    const parsed = JSON.parse(raw);
    const candidates = Array.isArray(parsed.candidates) ? parsed.candidates : [];
    candidates.sort((a, b) => {
      const aTs = toTimestamp(a?.updatedAt || a?.createdAt);
      const bTs = toTimestamp(b?.updatedAt || b?.createdAt);
      return bTs - aTs;
    });

    return {
      config,
      stateFile,
      updatedAt: parsed.updatedAt || null,
      followingCount: Array.isArray(parsed.following) ? parsed.following.length : 0,
      lastActionAt: parsed.lastActionAt || null,
      lastActionType: parsed.lastActionType || null,
      lastCooldownSeconds: safeParseNonNegativeInt(parsed.lastCooldownSeconds, null),
      candidates,
      summary: summarizeCandidateStatuses(candidates)
    };
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }

    const candidates = [];
    return {
      config,
      stateFile,
      updatedAt: null,
      followingCount: 0,
      lastActionAt: null,
      lastActionType: null,
      lastCooldownSeconds: null,
      candidates,
      summary: summarizeCandidateStatuses(candidates)
    };
  }
}

async function runXAssistantCommand(command, args = []) {
  try {
    const { stdout, stderr } = await execFileAsync(
      process.execPath,
      [X_ENGAGEMENT_SCRIPT_PATH, command, ...args],
      {
        cwd: ROOT,
        timeout: 120_000,
        maxBuffer: 4 * 1024 * 1024
      }
    );

    return {
      exitCode: 0,
      stdout: String(stdout || "").trim(),
      stderr: String(stderr || "").trim()
    };
  } catch (error) {
    const stdout = String(error?.stdout || "").trim();
    const stderr = String(error?.stderr || "").trim();
    const failureMessage = stderr || stdout || String(error?.message || "x assistant command failed");
    const failure = new Error(failureMessage);
    failure.details = {
      exitCode: Number.isInteger(error?.code) ? error.code : 1,
      stdout,
      stderr
    };
    throw failure;
  }
}

function normalizeSpaces(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function truncateText(value, maxLength) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, Math.max(0, maxLength - 1)).trim()}…`;
}

function sanitizeXhaDraft(value) {
  const lines = String(value || "")
    .replace(/```/g, "")
    .split(/\r?\n/)
    .map((line) => sanitizeXhaLine(line))
    .filter(Boolean)
    .slice(0, 2);

  return truncateText(lines.join("\n"), 120);
}

function sanitizeXhaLine(value) {
  let line = normalizeSpaces(
    String(value || "")
      .replace(/^[-*]\s*/, "")
      .replace(/^(댓글|reply)\s*[:：]\s*/i, "")
      .replace(/[`"'“”‘’]/g, "")
      .replace(/[一-龯㐀-䶵]/g, "")
      .replace(/\b[A-Za-z][A-Za-z0-9+_.:-]*\b/g, " ")
  );
  line = line
    .replace(/땡댕/g, "댕댕")
    .replace(/요[ㅋㅎ]{1,}/g, "요")
    .replace(/네요[ㅋㅎ]{1,}/g, "네요")
    .replace(/욬+/g, "요")
    .replace(/ㅋ{5,}/g, "ㅋㅋㅋㅋ")
    .replace(/ㅎ{5,}/g, "ㅎㅎㅎ");
  line = line.replace(/\s{2,}/g, " ").trim();
  return line;
}

function hasAnyText(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword));
}

function isNaturalKoreanDraft(value) {
  const draft = sanitizeXhaDraft(value);
  if (!draft) return false;
  if (/[A-Za-z]{2,}/.test(draft)) return false;
  if (draft.includes("?")) return false;

  const lower = draft.toLowerCase();
  const banned = [
    "생각해볼 포인트",
    "잘 와닿",
    "좋은 정보 감사합니다",
    "감사합니다",
    "감사해요",
    "의견이 꽤 갈릴",
    "결론 나오면 궁금",
    "흐름이 궁금",
    "perfect",
    "analysis",
    "point"
  ];
  if (hasAnyText(lower, banned)) return false;

  const hangulCount = (draft.match(/[가-힣]/g) || []).length;
  const alphaCount = (draft.match(/[A-Za-z가-힣]/g) || []).length;
  if (alphaCount > 0 && hangulCount / alphaCount < 0.85) return false;
  return true;
}

function buildSafeKoreanFallback(input) {
  const source = normalizeSpaces(`${input.text || ""} ${input.imageNotes || ""}`.toLowerCase());
  if (/(라면|파스타|피자|버거|햄버거|치킨|초밥|스시|국밥|떡볶이|맛집|음식|요리|food|pizza|ramen|pasta|burger|sushi|dessert|coffee|cafe)/.test(source)) {
    return "와.. 맛있겠다...\n배고파지네요 ㅎㅎㅎ";
  }
  if (/(주식|종목|투자|지분|블랙록|나스닥|가즈아|stock|share|equity|blackrock|nasdaq)/.test(source)) {
    return "와.. 이건 좀 세네요...\n가즈아~~!! ㅋㅋㅋㅋ";
  }
  if (/(골프|golf|버디|이글|티샷|퍼팅|라운딩)/.test(source)) {
    return "굿샷 ㅎㅎㅎ";
  }
  if (isPetSource(source)) {
    return "와우~ 강아지들이 너무 귀여워~";
  }
  if (/(여행|풍경|도시|그리스|바다|travel|city|beach|resort|nature)/.test(source)) {
    return "와.. 사진 너무 예쁘네요...\n진짜 좋네요 ㅎㅎㅎ";
  }
  return "와우.... ㅎㅎㅎ";
}

function applyTopicFallbackIfNeeded(draft, input) {
  const clean = sanitizeXhaDraft(draft);
  if (!clean) return buildSafeKoreanFallback(input);

  const source = normalizeSpaces(`${input.text || ""} ${input.imageNotes || ""}`.toLowerCase());
  if (isPetSource(source)) {
    return pickBySeed([
      "와우~ 강아지들이 너무 귀여워~",
      "와우~ 댕댕이 너무 귀여워~",
      "아~ 강아지들 너무 사랑스러워~",
      "와~ 강아지들 너무 귀엽다~"
    ], `${source}|pet-fallback`);
  }

  if (/(주식|종목|투자|지분|블랙록|가즈아|stock|share|equity|blackrock|nasdaq)/.test(source)) {
    if (!/(가즈아|주식|종목|투자|블랙록|세네요|강하네요|쎄네요)/.test(clean)) {
      return "와.. 이건 좀 세네요...\n가즈아~~!! ㅋㅋㅋㅋ";
    }
  }

  if (/(라면|파스타|피자|버거|햄버거|치킨|초밥|스시|국밥|떡볶이|맛집|음식|요리|food|pizza|ramen|pasta|burger|sushi|dessert|coffee|cafe)/.test(source)) {
    if (!/(맛|배고|먹|땡기|냠|맛있)/.test(clean)) {
      return "와.. 맛있겠다...\n배고파지네요 ㅎㅎㅎ";
    }
  }

  return clean;
}

function hashText(value) {
  let hash = 2166136261;
  const input = String(value || "");
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pickBySeed(options, seed) {
  if (!Array.isArray(options) || options.length === 0) return "";
  const index = hashText(seed) % options.length;
  return options[index];
}

function applyCasualEmpathyTone(draft, input) {
  const clean = sanitizeXhaDraft(draft);
  if (!clean) return clean;

  const source = normalizeSpaces(`${input.text || ""} ${input.imageNotes || ""}`.toLowerCase());
  const seed = `${input.text || ""}|${input.imageNotes || ""}|${clean}`;

  if (isPetSource(source)) {
    const line = pickBySeed([
      "와우~ 강아지들이 너무 귀여워~",
      "와우~ 댕댕이 너무 귀여워~",
      "아~ 강아지들 너무 사랑스러워~",
      "와~ 강아지들 너무 귀엽다~"
    ], `${seed}|pet-line`);
    const tail = pickBySeed(["", " ㅎㅎㅎ", " ㅋㅋㅋㅋ"], `${seed}|pet-tail`);
    return sanitizeXhaDraft(`${line}${tail}`.trim());
  }

  const softened = clean
    .split("\n")
    .map((line) => normalizeSpaces(line))
    .filter(Boolean)
    .slice(0, 2)
    .map((line) => {
      let next = line;
      next = next.replace(/습니다(\.*)?$/g, "네요...");
      next = next.replace(/입니다(\.*)?$/g, "이에요...");
      next = next.replace(/어요(\.*)?$/g, "어요...");
      next = next.replace(/해요(\.*)?$/g, "해요...");
      next = next.replace(/네요(\.*)?$/g, "네요...");
      next = next.replace(/합니다(\.*)?$/g, "해요...");
      return normalizeSpaces(next);
    });

  if (softened.length === 0) return clean;

  if (!/^(와|오|헉|진짜|아|음)/.test(softened[0])) {
    const opener = pickBySeed(["와..", "오..", "헉.."], `${seed}|opener`);
    softened[0] = `${opener} ${softened[0]}`.replace(/\s+/g, " ").trim();
  }

  const low = source;
  let suffixPool = ["...", "ㅎㅎㅎ", "ㅋㅋㅋㅋ"];
  if (/(주식|종목|투자|블랙록|가즈아|stock|share|equity|blackrock)/.test(low)) {
    suffixPool = ["ㅋㅋㅋㅋ", "...", "ㅎㅎㅎ"];
  } else if (/(음식|맛집|라면|파스타|피자|치킨|초밥|요리|food|pizza|ramen|pasta|burger|sushi|dessert)/.test(low)) {
    suffixPool = ["ㅎㅎㅎ", "...", "ㅋㅋㅋㅋ"];
  }

  const tail = pickBySeed(suffixPool, `${seed}|tail`);
  const lastIndex = softened.length - 1;
  softened[lastIndex] = softened[lastIndex]
    .replace(/\s*(?:[~!]+|ㅋㅋ+|ㅎㅎ+|\.{2,})+\s*$/g, "")
    .trim();
  softened[lastIndex] = `${softened[lastIndex]} ${tail}`.trim();

  return sanitizeXhaDraft(softened.join("\n"));
}

function isPetSource(source) {
  return /(강아지|댕댕|멍멍|고양이|냥이|cat|dog|puppy|kitten|pet)/.test(String(source || ""));
}

function buildXhaPrompt({ text, imageNotes, authorSignature, tone }) {
  const toneMap = {
    warm: "자연스럽고 다정한 톤",
    calm: "차분하고 담백한 톤",
    cheer: "밝고 리액션 있는 톤"
  };
  const toneText = toneMap[tone] || toneMap.warm;

  const system = [
    "너는 X 댓글 문구를 만드는 한국어 작성 도우미다.",
    "출력은 댓글 본문만 1~2줄로 작성한다.",
    "반드시 한국어만 사용한다. 영어/일본어/중국어 단어를 쓰지 않는다.",
    "공감하는 사람 말투로 짧고 자연스럽게 쓴다.",
    "끝부분에 ... 또는 ㅎㅎㅎ 또는 ㅋㅋㅋㅋ 같은 가벼운 리액션을 자연스럽게 붙일 수 있다.",
    "강아지/고양이 글이면 '와우~ 강아지들이 너무 귀여워~' 같은 짧은 감탄형 말투를 우선 사용한다.",
    "게시글의 텍스트/이미지 메모를 보고 구체적으로 반응한다.",
    "뻔한 문장(예: 생각해볼 포인트, 잘 와닿네요, 좋은 정보 감사합니다) 금지.",
    "내용이 음식이면 음식명/맛 표현 중심으로 쓴다.",
    "주식/투자면 짧고 강하게 반응한다(예: 가즈아 느낌).",
    "골프면 굿샷 같은 짧은 반응 가능.",
    "과장된 설명/분석체 문장 금지. 사람이 바로 쓰는 자연스러운 구어체로 쓴다."
  ].join(" ");

  const user = [
    `톤: ${toneText}`,
    `작성자: ${authorSignature || "(없음)"}`,
    `글 본문: ${text}`,
    `이미지 메모: ${imageNotes || "(없음)"}`,
    "",
    "조건:",
    "- 한글 1~2줄",
    "- 총 120자 이내",
    "- 같은 표현 반복 금지",
    "- 댓글 본문만 출력"
  ].join("\n");

  return { system, user };
}

function buildXhaRepairPrompt({ text, imageNotes, authorSignature, tone, badDraft }) {
  const toneMap = {
    warm: "자연스럽고 다정한 말투",
    calm: "차분하고 담백한 말투",
    cheer: "밝고 리액션 있는 말투"
  };
  const toneText = toneMap[tone] || toneMap.warm;

  const system = [
    "너는 한국어 댓글 교정기다.",
    "반드시 한국어만 사용한다.",
    "어색한 번역투, 설명체, 영어 섞임을 제거한다.",
    "문법이 어색하면 쉬운 단문으로 자연스럽게 다시 쓴다.",
    "의미 없는 질문형(예: 뭐지?)을 만들지 않는다.",
    "댓글 본문만 1~2줄, 120자 이내로 출력한다."
  ].join(" ");

  const user = [
    `톤: ${toneText}`,
    `작성자: ${authorSignature || "(없음)"}`,
    `글 본문: ${text}`,
    `이미지 메모: ${imageNotes || "(없음)"}`,
    `초안(문제 있음): ${badDraft}`,
    "",
    "요구사항:",
    "- 완전 자연스러운 한국어",
    "- 영어/외국어 단어 금지",
    "- 댓글 본문만 출력"
  ].join("\n");

  return { system, user };
}

async function repairOpenAiXhaDraft(input, badDraft) {
  const { system, user } = buildXhaRepairPrompt({ ...input, badDraft });
  const { response, json } = await fetchJsonWithTimeout(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        temperature: 0.45,
        max_tokens: 140,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user }
        ]
      })
    },
    18_000
  );

  if (!response.ok) return "";
  return sanitizeXhaDraft(json?.choices?.[0]?.message?.content);
}

async function repairOllamaXhaDraft(input, badDraft) {
  const { system, user } = buildXhaRepairPrompt({ ...input, badDraft });
  const { response, json } = await fetchJsonWithTimeout(
    `${OLLAMA_BASE_URL}/api/chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        stream: false,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user }
        ],
        options: {
          temperature: 0.4
        }
      })
    },
    20_000
  );

  if (!response.ok) return "";
  return sanitizeXhaDraft(json?.message?.content);
}

async function fetchJsonWithTimeout(url, options = {}, timeoutMs = 20_000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    const text = await response.text();
    let json = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = null;
    }
    return { response, json, text };
  } finally {
    clearTimeout(timeout);
  }
}

async function requestOpenAiXhaDraft(input) {
  const { system, user } = buildXhaPrompt(input);
  const { response, json } = await fetchJsonWithTimeout(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        temperature: 0.9,
        max_tokens: 140,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user }
        ]
      })
    },
    22_000
  );

  if (!response.ok) {
    const message = normalizeSpaces(json?.error?.message || `OpenAI HTTP ${response.status}`);
    throw new Error(`OpenAI 오류: ${message}`);
  }

  const content = json?.choices?.[0]?.message?.content;
  let draft = sanitizeXhaDraft(content);
  if (!draft) {
    throw new Error("OpenAI 응답이 비어 있습니다.");
  }
  if (!isNaturalKoreanDraft(draft)) {
    const repaired = await repairOpenAiXhaDraft(input, draft);
    if (repaired) draft = repaired;
  }
  draft = applyTopicFallbackIfNeeded(draft, input);
  draft = applyCasualEmpathyTone(draft, input);
  draft = sanitizeXhaDraft(draft);
  if (!isNaturalKoreanDraft(draft)) {
    draft = applyCasualEmpathyTone(buildSafeKoreanFallback(input), input);
  }
  return draft;
}

async function requestOllamaXhaDraft(input) {
  const { system, user } = buildXhaPrompt(input);
  const { response, json, text } = await fetchJsonWithTimeout(
    `${OLLAMA_BASE_URL}/api/chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        stream: false,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user }
        ],
        options: {
          temperature: 0.85
        }
      })
    },
    25_000
  );

  if (!response.ok) {
    const message = normalizeSpaces(json?.error || text || `Ollama HTTP ${response.status}`);
    throw new Error(`Ollama 오류: ${message}`);
  }

  const content = json?.message?.content;
  let draft = sanitizeXhaDraft(content);
  if (!draft) {
    throw new Error("Ollama 응답이 비어 있습니다.");
  }
  const repaired = await repairOllamaXhaDraft(input, draft);
  if (repaired) {
    draft = repaired;
  }
  draft = applyTopicFallbackIfNeeded(draft, input);
  draft = applyCasualEmpathyTone(draft, input);
  draft = sanitizeXhaDraft(draft);
  if (!isNaturalKoreanDraft(draft)) {
    draft = applyCasualEmpathyTone(buildSafeKoreanFallback(input), input);
  }
  return draft;
}

async function generateXhaDraft(input) {
  const errors = [];

  if (OPENAI_API_KEY) {
    try {
      const draft = await requestOpenAiXhaDraft(input);
      return { provider: `openai:${OPENAI_MODEL}`, draft };
    } catch (error) {
      errors.push(String(error?.message || error));
    }
  }

  try {
    const draft = await requestOllamaXhaDraft(input);
    return { provider: `ollama:${OLLAMA_MODEL}`, draft };
  } catch (error) {
    errors.push(String(error?.message || error));
  }

  if (!OPENAI_API_KEY) {
    errors.push("OPENAI_API_KEY 미설정 + Ollama 연결 실패");
  }
  throw new Error(normalizeSpaces(errors.filter(Boolean).join(" | ")) || "LLM 초안 생성 실패");
}

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS readings (
      id BIGSERIAL PRIMARY KEY,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL,
      date TEXT NOT NULL,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      external_key TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_readings_user_created
    ON readings(user_id, created_at DESC)
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS math_users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      name TEXT NOT NULL,
      picture TEXT NOT NULL,
      theme TEXT NOT NULL DEFAULT 'pink',
      nickname TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await pool.query(`
    ALTER TABLE math_users
    ADD COLUMN IF NOT EXISTS theme TEXT NOT NULL DEFAULT 'pink'
  `);

  await pool.query(`
    ALTER TABLE math_users
    ADD COLUMN IF NOT EXISTS nickname TEXT
  `);

  await pool.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_math_users_nickname_unique
    ON math_users ((LOWER(nickname)))
    WHERE nickname IS NOT NULL
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS math_sessions (
      id BIGSERIAL PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES math_users(id) ON DELETE CASCADE,
      date TEXT NOT NULL,
      operation TEXT NOT NULL,
      level TEXT NOT NULL,
      total_questions INTEGER NOT NULL,
      correct_answers INTEGER NOT NULL,
      wrong_answers INTEGER NOT NULL,
      accuracy INTEGER NOT NULL,
      best_streak INTEGER NOT NULL DEFAULT 0,
      duration_ms INTEGER NOT NULL DEFAULT 0,
      external_key TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_math_sessions_user_created
    ON math_sessions(user_id, created_at DESC)
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS english_sessions (
      id BIGSERIAL PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES math_users(id) ON DELETE CASCADE,
      date TEXT NOT NULL,
      total_questions INTEGER NOT NULL,
      correct_answers INTEGER NOT NULL,
      wrong_answers INTEGER NOT NULL,
      accuracy INTEGER NOT NULL,
      best_streak INTEGER NOT NULL DEFAULT 0,
      duration_ms INTEGER NOT NULL DEFAULT 0,
      external_key TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_english_sessions_user_created
    ON english_sessions(user_id, created_at DESC)
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS history_sessions (
      id BIGSERIAL PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES math_users(id) ON DELETE CASCADE,
      date TEXT NOT NULL,
      level TEXT NOT NULL,
      total_questions INTEGER NOT NULL,
      correct_answers INTEGER NOT NULL,
      wrong_answers INTEGER NOT NULL,
      accuracy INTEGER NOT NULL,
      best_streak INTEGER NOT NULL DEFAULT 0,
      duration_ms INTEGER NOT NULL DEFAULT 0,
      external_key TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_history_sessions_user_created
    ON history_sessions(user_id, created_at DESC)
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS science_sessions (
      id BIGSERIAL PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES math_users(id) ON DELETE CASCADE,
      date TEXT NOT NULL,
      level TEXT NOT NULL,
      total_questions INTEGER NOT NULL,
      correct_answers INTEGER NOT NULL,
      wrong_answers INTEGER NOT NULL,
      accuracy INTEGER NOT NULL,
      best_streak INTEGER NOT NULL DEFAULT 0,
      duration_ms INTEGER NOT NULL DEFAULT 0,
      external_key TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_science_sessions_user_created
    ON science_sessions(user_id, created_at DESC)
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS world_history_sessions (
      id BIGSERIAL PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES math_users(id) ON DELETE CASCADE,
      date TEXT NOT NULL,
      level TEXT NOT NULL,
      total_questions INTEGER NOT NULL,
      correct_answers INTEGER NOT NULL,
      wrong_answers INTEGER NOT NULL,
      accuracy INTEGER NOT NULL,
      best_streak INTEGER NOT NULL DEFAULT 0,
      duration_ms INTEGER NOT NULL DEFAULT 0,
      external_key TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_world_history_sessions_user_created
    ON world_history_sessions(user_id, created_at DESC)
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS baseball_sessions (
      id BIGSERIAL PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES math_users(id) ON DELETE CASCADE,
      date TEXT NOT NULL,
      level TEXT NOT NULL,
      total_questions INTEGER NOT NULL,
      correct_answers INTEGER NOT NULL,
      wrong_answers INTEGER NOT NULL,
      accuracy INTEGER NOT NULL,
      best_streak INTEGER NOT NULL DEFAULT 0,
      duration_ms INTEGER NOT NULL DEFAULT 0,
      external_key TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_baseball_sessions_user_created
    ON baseball_sessions(user_id, created_at DESC)
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS soccer_sessions (
      id BIGSERIAL PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES math_users(id) ON DELETE CASCADE,
      date TEXT NOT NULL,
      level TEXT NOT NULL,
      total_questions INTEGER NOT NULL,
      correct_answers INTEGER NOT NULL,
      wrong_answers INTEGER NOT NULL,
      accuracy INTEGER NOT NULL,
      best_streak INTEGER NOT NULL DEFAULT 0,
      duration_ms INTEGER NOT NULL DEFAULT 0,
      external_key TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_soccer_sessions_user_created
    ON soccer_sessions(user_id, created_at DESC)
  `);
}

app.use(express.json());

app.use("/api/xha", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Request-Private-Network");
  res.setHeader("Access-Control-Allow-Private-Network", "true");
  res.setHeader("Vary", "Origin, Access-Control-Request-Private-Network");
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  next();
});

app.get("/api/health", async (_req, res) => {
  if (SKIP_DB) {
    res.json({ ok: true, db: "skipped" });
    return;
  }

  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, db: "connected" });
  } catch {
    res.status(500).json({ ok: false, db: "error" });
  }
});

app.post("/api/auth/google", async (req, res) => {
  const idToken = String(req.body?.idToken || "").trim();
  if (!idToken) {
    res.status(400).json({ error: "idToken is required" });
    return;
  }

  try {
    const user = await verifyGoogleIdToken(idToken);
    const dbUser = await upsertMathUser(user);

    const token = signSession(user);
    res.json({
      token,
      user: {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        picture: dbUser.picture,
        theme: dbUser.theme,
        nickname: dbUser.nickname
      }
    });
  } catch (error) {
    console.error("google auth failed", error);
    res.status(401).json({ error: "failed to authenticate with google" });
  }
});

app.get("/api/auth/me", async (req, res) => {
  const session = getSessionOrReject(req, res);
  if (!session) return;

  try {
    const { rows } = await pool.query(
      `
        SELECT
          id,
          email,
          name,
          picture,
          theme,
          nickname
        FROM math_users
        WHERE id = $1
        LIMIT 1
      `,
      [session.sub]
    );

    if (rows.length > 0) {
      res.json({ user: rows[0] });
      return;
    }

    res.json({
      user: {
        id: session.sub,
        email: session.email,
        name: session.name,
        picture: session.picture,
        theme: "pink",
        nickname: null
      }
    });
  } catch (error) {
    console.error("auth me failed", error);
    res.status(500).json({ error: "failed to load user" });
  }
});

app.patch("/api/math/profile/nickname", async (req, res) => {
  const session = getSessionOrReject(req, res);
  if (!session) return;

  const nickname = String(req.body?.nickname || "").trim();
  if (!NICKNAME_PATTERN.test(nickname)) {
    res.status(400).json({ error: "nickname must be 2-12 chars (KOR/ENG/NUM/_)" });
    return;
  }

  try {
    const { rows } = await pool.query(
      `
        UPDATE math_users
        SET
          nickname = $2,
          updated_at = NOW()
        WHERE id = $1
        RETURNING
          id,
          email,
          name,
          picture,
          theme,
          nickname
      `,
      [session.sub, nickname]
    );

    if (rows.length > 0) {
      res.json({ ok: true, user: rows[0] });
      return;
    }

    const { rows: insertedRows } = await pool.query(
      `
        INSERT INTO math_users (id, email, name, picture, theme, nickname)
        VALUES ($1, $2, $3, $4, 'pink', $5)
        RETURNING
          id,
          email,
          name,
          picture,
          theme,
          nickname
      `,
      [session.sub, session.email || "", session.name || "사용자", session.picture || "", nickname]
    );

    res.json({ ok: true, user: insertedRows[0] });
  } catch (error) {
    if (error?.code === "23505") {
      res.status(409).json({ error: "nickname is already in use" });
      return;
    }
    console.error("failed to save nickname", error);
    res.status(500).json({ error: "failed to save nickname" });
  }
});

app.patch("/api/math/profile/theme", async (req, res) => {
  const session = getSessionOrReject(req, res);
  if (!session) return;

  const theme = String(req.body?.theme || "").trim().toLowerCase();
  if (!ALLOWED_THEMES.includes(theme)) {
    res.status(400).json({ error: "theme is invalid" });
    return;
  }

  try {
    const { rows } = await pool.query(
      `
        UPDATE math_users
        SET
          theme = $2,
          updated_at = NOW()
        WHERE id = $1
        RETURNING
          id,
          email,
          name,
          picture,
          theme,
          nickname
      `,
      [session.sub, theme]
    );

    if (rows.length > 0) {
      res.json({ ok: true, user: rows[0] });
      return;
    }

    const { rows: insertedRows } = await pool.query(
      `
        INSERT INTO math_users (id, email, name, picture, theme)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING
          id,
          email,
          name,
          picture,
          theme,
          nickname
      `,
      [session.sub, session.email || "", session.name || "사용자", session.picture || "", theme]
    );

    res.json({ ok: true, user: insertedRows[0] });
  } catch (error) {
    console.error("failed to save theme preference", error);
    res.status(500).json({ error: "failed to save theme preference" });
  }
});

app.get("/api/math/rankings", async (req, res) => {
  const limit = Math.min(Math.max(toInt(req.query.limit, 10), 1), 50);

  try {
    const { rows } = await pool.query(
      `
        SELECT
          u.id AS "userId",
          COALESCE(NULLIF(u.nickname, ''), u.name) AS "displayName",
          COALESCE(SUM(s.correct_answers), 0)::INT AS "totalCorrect",
          COUNT(s.id)::INT AS "roundCount"
        FROM math_users u
        LEFT JOIN math_sessions s ON s.user_id = u.id
        GROUP BY u.id, u.nickname, u.name
        HAVING COALESCE(SUM(s.correct_answers), 0) > 0
        ORDER BY "totalCorrect" DESC, "roundCount" ASC, "displayName" ASC
        LIMIT $1
      `,
      [limit]
    );

    res.json({ items: rows });
  } catch (error) {
    console.error("failed to fetch rankings", error);
    res.status(500).json({ error: "failed to fetch rankings" });
  }
});

app.get("/api/math/sessions", async (req, res) => {
  const session = getSessionOrReject(req, res);
  if (!session) return;

  const limit = Math.min(Math.max(toInt(req.query.limit, 50), 1), 200);

  try {
    const { rows } = await pool.query(
      `
        SELECT
          date,
          operation,
          level,
          total_questions AS "totalQuestions",
          correct_answers AS "correctAnswers",
          wrong_answers AS "wrongAnswers",
          accuracy,
          best_streak AS "bestStreak",
          duration_ms AS "durationMs",
          created_at AS "createdAt"
        FROM math_sessions
        WHERE user_id = $1
        ORDER BY created_at DESC
        LIMIT $2
      `,
      [session.sub, limit]
    );

    res.json({ items: rows });
  } catch (error) {
    console.error("failed to fetch math sessions", error);
    res.status(500).json({ error: "failed to fetch math sessions" });
  }
});

app.post("/api/math/sessions", async (req, res) => {
  const session = getSessionOrReject(req, res);
  if (!session) return;

  const date = String(req.body?.date || "").trim();
  const operation = String(req.body?.operation || "").trim();
  const level = String(req.body?.level || "").trim();
  const totalQuestions = toInt(req.body?.totalQuestions, 0);
  const correctAnswers = toInt(req.body?.correctAnswers, 0);
  const wrongAnswers = toInt(req.body?.wrongAnswers, 0);
  const accuracy = toInt(req.body?.accuracy, 0);
  const bestStreak = toInt(req.body?.bestStreak, 0);
  const durationMs = Math.max(toInt(req.body?.durationMs, 0), 0);
  const externalKey = String(req.body?.externalKey || `math:${session.sub}:${Date.now()}`).slice(0, 160);

  const validOperations = ["add", "subtract", "multiply", "divide", "mix"];
  const validLevels = ["easy", "medium", "hard"];

  if (!date || !validOperations.includes(operation) || !validLevels.includes(level)) {
    res.status(400).json({ error: "date, operation, level are invalid" });
    return;
  }

  if (totalQuestions <= 0 || correctAnswers < 0 || wrongAnswers < 0) {
    res.status(400).json({ error: "session metrics are invalid" });
    return;
  }

  try {
    await pool.query(
      `
        INSERT INTO math_sessions (
          user_id,
          date,
          operation,
          level,
          total_questions,
          correct_answers,
          wrong_answers,
          accuracy,
          best_streak,
          duration_ms,
          external_key
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (external_key)
        DO UPDATE SET
          operation = EXCLUDED.operation,
          level = EXCLUDED.level,
          total_questions = EXCLUDED.total_questions,
          correct_answers = EXCLUDED.correct_answers,
          wrong_answers = EXCLUDED.wrong_answers,
          accuracy = EXCLUDED.accuracy,
          best_streak = EXCLUDED.best_streak,
          duration_ms = EXCLUDED.duration_ms,
          updated_at = NOW()
      `,
      [
        session.sub,
        date,
        operation,
        level,
        totalQuestions,
        correctAnswers,
        wrongAnswers,
        accuracy,
        bestStreak,
        durationMs,
        externalKey
      ]
    );

    res.status(201).json({ ok: true });
  } catch (error) {
    console.error("failed to save math session", error);
    res.status(500).json({ error: "failed to save math session" });
  }
});

app.get("/api/english/rankings", async (req, res) => {
  const limit = Math.min(Math.max(toInt(req.query.limit, 10), 1), 50);

  try {
    const { rows } = await pool.query(
      `
        SELECT
          u.id AS "userId",
          COALESCE(NULLIF(u.nickname, ''), u.name) AS "displayName",
          COALESCE(SUM(s.correct_answers), 0)::INT AS "totalCorrect",
          COUNT(s.id)::INT AS "roundCount"
        FROM math_users u
        LEFT JOIN english_sessions s ON s.user_id = u.id
        GROUP BY u.id, u.nickname, u.name
        HAVING COALESCE(SUM(s.correct_answers), 0) > 0
        ORDER BY "totalCorrect" DESC, "roundCount" ASC, "displayName" ASC
        LIMIT $1
      `,
      [limit]
    );

    res.json({ items: rows });
  } catch (error) {
    console.error("failed to fetch english rankings", error);
    res.status(500).json({ error: "failed to fetch english rankings" });
  }
});

app.get("/api/english/sessions", async (req, res) => {
  const session = getSessionOrReject(req, res);
  if (!session) return;

  const limit = Math.min(Math.max(toInt(req.query.limit, 50), 1), 200);

  try {
    const { rows } = await pool.query(
      `
        SELECT
          date,
          total_questions AS "totalQuestions",
          correct_answers AS "correctAnswers",
          wrong_answers AS "wrongAnswers",
          accuracy,
          best_streak AS "bestStreak",
          duration_ms AS "durationMs",
          created_at AS "createdAt"
        FROM english_sessions
        WHERE user_id = $1
        ORDER BY created_at DESC
        LIMIT $2
      `,
      [session.sub, limit]
    );

    res.json({ items: rows });
  } catch (error) {
    console.error("failed to fetch english sessions", error);
    res.status(500).json({ error: "failed to fetch english sessions" });
  }
});

app.post("/api/english/sessions", async (req, res) => {
  const session = getSessionOrReject(req, res);
  if (!session) return;

  const date = String(req.body?.date || "").trim();
  const totalQuestions = toInt(req.body?.totalQuestions, 0);
  const correctAnswers = toInt(req.body?.correctAnswers, 0);
  const wrongAnswers = toInt(req.body?.wrongAnswers, 0);
  const accuracy = toInt(req.body?.accuracy, 0);
  const bestStreak = toInt(req.body?.bestStreak, 0);
  const durationMs = Math.max(toInt(req.body?.durationMs, 0), 0);
  const externalKey = String(req.body?.externalKey || `english:${session.sub}:${Date.now()}`).slice(0, 160);

  if (!date) {
    res.status(400).json({ error: "date is invalid" });
    return;
  }

  if (totalQuestions <= 0 || correctAnswers < 0 || wrongAnswers < 0) {
    res.status(400).json({ error: "session metrics are invalid" });
    return;
  }

  try {
    await pool.query(
      `
        INSERT INTO english_sessions (
          user_id,
          date,
          total_questions,
          correct_answers,
          wrong_answers,
          accuracy,
          best_streak,
          duration_ms,
          external_key
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (external_key)
        DO UPDATE SET
          total_questions = EXCLUDED.total_questions,
          correct_answers = EXCLUDED.correct_answers,
          wrong_answers = EXCLUDED.wrong_answers,
          accuracy = EXCLUDED.accuracy,
          best_streak = EXCLUDED.best_streak,
          duration_ms = EXCLUDED.duration_ms,
          updated_at = NOW()
      `,
      [session.sub, date, totalQuestions, correctAnswers, wrongAnswers, accuracy, bestStreak, durationMs, externalKey]
    );

    res.status(201).json({ ok: true });
  } catch (error) {
    console.error("failed to save english session", error);
    res.status(500).json({ error: "failed to save english session" });
  }
});

app.get("/api/history/rankings", async (req, res) => {
  const limit = Math.min(Math.max(toInt(req.query.limit, 10), 1), 50);

  try {
    const { rows } = await pool.query(
      `
        SELECT
          u.id AS "userId",
          COALESCE(NULLIF(u.nickname, ''), u.name) AS "displayName",
          COALESCE(SUM(s.correct_answers), 0)::INT AS "totalCorrect",
          COUNT(s.id)::INT AS "roundCount"
        FROM math_users u
        LEFT JOIN history_sessions s ON s.user_id = u.id
        GROUP BY u.id, u.nickname, u.name
        HAVING COALESCE(SUM(s.correct_answers), 0) > 0
        ORDER BY "totalCorrect" DESC, "roundCount" ASC, "displayName" ASC
        LIMIT $1
      `,
      [limit]
    );

    res.json({ items: rows });
  } catch (error) {
    console.error("failed to fetch history rankings", error);
    res.status(500).json({ error: "failed to fetch history rankings" });
  }
});

app.get("/api/history/sessions", async (req, res) => {
  const session = getSessionOrReject(req, res);
  if (!session) return;

  const limit = Math.min(Math.max(toInt(req.query.limit, 50), 1), 200);

  try {
    const { rows } = await pool.query(
      `
        SELECT
          date,
          level,
          total_questions AS "totalQuestions",
          correct_answers AS "correctAnswers",
          wrong_answers AS "wrongAnswers",
          accuracy,
          best_streak AS "bestStreak",
          duration_ms AS "durationMs",
          created_at AS "createdAt"
        FROM history_sessions
        WHERE user_id = $1
        ORDER BY created_at DESC
        LIMIT $2
      `,
      [session.sub, limit]
    );

    res.json({ items: rows });
  } catch (error) {
    console.error("failed to fetch history sessions", error);
    res.status(500).json({ error: "failed to fetch history sessions" });
  }
});

app.post("/api/history/sessions", async (req, res) => {
  const session = getSessionOrReject(req, res);
  if (!session) return;

  const date = String(req.body?.date || "").trim();
  const level = String(req.body?.level || "").trim();
  const totalQuestions = toInt(req.body?.totalQuestions, 0);
  const correctAnswers = toInt(req.body?.correctAnswers, 0);
  const wrongAnswers = toInt(req.body?.wrongAnswers, 0);
  const accuracy = toInt(req.body?.accuracy, 0);
  const bestStreak = toInt(req.body?.bestStreak, 0);
  const durationMs = Math.max(toInt(req.body?.durationMs, 0), 0);
  const externalKey = String(req.body?.externalKey || `history:${session.sub}:${Date.now()}`).slice(0, 160);

  const validLevels = ["grade4", "grade3", "grade2", "grade1"];
  if (!date || !validLevels.includes(level)) {
    res.status(400).json({ error: "date or level is invalid" });
    return;
  }

  if (totalQuestions <= 0 || correctAnswers < 0 || wrongAnswers < 0) {
    res.status(400).json({ error: "session metrics are invalid" });
    return;
  }

  try {
    await pool.query(
      `
        INSERT INTO history_sessions (
          user_id,
          date,
          level,
          total_questions,
          correct_answers,
          wrong_answers,
          accuracy,
          best_streak,
          duration_ms,
          external_key
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (external_key)
        DO UPDATE SET
          level = EXCLUDED.level,
          total_questions = EXCLUDED.total_questions,
          correct_answers = EXCLUDED.correct_answers,
          wrong_answers = EXCLUDED.wrong_answers,
          accuracy = EXCLUDED.accuracy,
          best_streak = EXCLUDED.best_streak,
          duration_ms = EXCLUDED.duration_ms,
          updated_at = NOW()
      `,
      [session.sub, date, level, totalQuestions, correctAnswers, wrongAnswers, accuracy, bestStreak, durationMs, externalKey]
    );

    res.status(201).json({ ok: true });
  } catch (error) {
    console.error("failed to save history session", error);
    res.status(500).json({ error: "failed to save history session" });
  }
});

app.get("/api/science/rankings", async (req, res) => {
  const limit = Math.min(Math.max(toInt(req.query.limit, 10), 1), 50);

  try {
    const { rows } = await pool.query(
      `
        SELECT
          u.id AS "userId",
          COALESCE(NULLIF(u.nickname, ''), u.name) AS "displayName",
          COALESCE(SUM(s.correct_answers), 0)::INT AS "totalCorrect",
          COUNT(s.id)::INT AS "roundCount"
        FROM math_users u
        LEFT JOIN science_sessions s ON s.user_id = u.id
        GROUP BY u.id, u.nickname, u.name
        HAVING COALESCE(SUM(s.correct_answers), 0) > 0
        ORDER BY "totalCorrect" DESC, "roundCount" ASC, "displayName" ASC
        LIMIT $1
      `,
      [limit]
    );

    res.json({ items: rows });
  } catch (error) {
    console.error("failed to fetch science rankings", error);
    res.status(500).json({ error: "failed to fetch science rankings" });
  }
});

app.get("/api/science/sessions", async (req, res) => {
  const session = getSessionOrReject(req, res);
  if (!session) return;

  const limit = Math.min(Math.max(toInt(req.query.limit, 50), 1), 200);

  try {
    const { rows } = await pool.query(
      `
        SELECT
          date,
          level,
          total_questions AS "totalQuestions",
          correct_answers AS "correctAnswers",
          wrong_answers AS "wrongAnswers",
          accuracy,
          best_streak AS "bestStreak",
          duration_ms AS "durationMs",
          created_at AS "createdAt"
        FROM science_sessions
        WHERE user_id = $1
        ORDER BY created_at DESC
        LIMIT $2
      `,
      [session.sub, limit]
    );

    res.json({ items: rows });
  } catch (error) {
    console.error("failed to fetch science sessions", error);
    res.status(500).json({ error: "failed to fetch science sessions" });
  }
});

app.post("/api/science/sessions", async (req, res) => {
  const session = getSessionOrReject(req, res);
  if (!session) return;

  const date = String(req.body?.date || "").trim();
  const level = String(req.body?.level || "").trim();
  const totalQuestions = toInt(req.body?.totalQuestions, 0);
  const correctAnswers = toInt(req.body?.correctAnswers, 0);
  const wrongAnswers = toInt(req.body?.wrongAnswers, 0);
  const accuracy = toInt(req.body?.accuracy, 0);
  const bestStreak = toInt(req.body?.bestStreak, 0);
  const durationMs = Math.max(toInt(req.body?.durationMs, 0), 0);
  const externalKey = String(req.body?.externalKey || `science:${session.sub}:${Date.now()}`).slice(0, 160);

  const validLevels = ["starter", "beginner", "intermediate", "advanced"];
  if (!date || !validLevels.includes(level)) {
    res.status(400).json({ error: "date or level is invalid" });
    return;
  }

  if (totalQuestions <= 0 || correctAnswers < 0 || wrongAnswers < 0) {
    res.status(400).json({ error: "session metrics are invalid" });
    return;
  }

  try {
    await pool.query(
      `
        INSERT INTO science_sessions (
          user_id,
          date,
          level,
          total_questions,
          correct_answers,
          wrong_answers,
          accuracy,
          best_streak,
          duration_ms,
          external_key
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (external_key)
        DO UPDATE SET
          level = EXCLUDED.level,
          total_questions = EXCLUDED.total_questions,
          correct_answers = EXCLUDED.correct_answers,
          wrong_answers = EXCLUDED.wrong_answers,
          accuracy = EXCLUDED.accuracy,
          best_streak = EXCLUDED.best_streak,
          duration_ms = EXCLUDED.duration_ms,
          updated_at = NOW()
      `,
      [session.sub, date, level, totalQuestions, correctAnswers, wrongAnswers, accuracy, bestStreak, durationMs, externalKey]
    );

    res.status(201).json({ ok: true });
  } catch (error) {
    console.error("failed to save science session", error);
    res.status(500).json({ error: "failed to save science session" });
  }
});

app.get("/api/world-history/rankings", async (req, res) => {
  const limit = Math.min(Math.max(toInt(req.query.limit, 10), 1), 50);

  try {
    const { rows } = await pool.query(
      `
        SELECT
          u.id AS "userId",
          COALESCE(NULLIF(u.nickname, ''), u.name) AS "displayName",
          COALESCE(SUM(s.correct_answers), 0)::INT AS "totalCorrect",
          COUNT(s.id)::INT AS "roundCount"
        FROM math_users u
        LEFT JOIN world_history_sessions s ON s.user_id = u.id
        GROUP BY u.id, u.nickname, u.name
        HAVING COALESCE(SUM(s.correct_answers), 0) > 0
        ORDER BY "totalCorrect" DESC, "roundCount" ASC, "displayName" ASC
        LIMIT $1
      `,
      [limit]
    );

    res.json({ items: rows });
  } catch (error) {
    console.error("failed to fetch world history rankings", error);
    res.status(500).json({ error: "failed to fetch world history rankings" });
  }
});

app.get("/api/world-history/sessions", async (req, res) => {
  const session = getSessionOrReject(req, res);
  if (!session) return;

  const limit = Math.min(Math.max(toInt(req.query.limit, 50), 1), 200);

  try {
    const { rows } = await pool.query(
      `
        SELECT
          date,
          level,
          total_questions AS "totalQuestions",
          correct_answers AS "correctAnswers",
          wrong_answers AS "wrongAnswers",
          accuracy,
          best_streak AS "bestStreak",
          duration_ms AS "durationMs",
          created_at AS "createdAt"
        FROM world_history_sessions
        WHERE user_id = $1
        ORDER BY created_at DESC
        LIMIT $2
      `,
      [session.sub, limit]
    );

    res.json({ items: rows });
  } catch (error) {
    console.error("failed to fetch world history sessions", error);
    res.status(500).json({ error: "failed to fetch world history sessions" });
  }
});

app.post("/api/world-history/sessions", async (req, res) => {
  const session = getSessionOrReject(req, res);
  if (!session) return;

  const date = String(req.body?.date || "").trim();
  const level = String(req.body?.level || "").trim();
  const totalQuestions = toInt(req.body?.totalQuestions, 0);
  const correctAnswers = toInt(req.body?.correctAnswers, 0);
  const wrongAnswers = toInt(req.body?.wrongAnswers, 0);
  const accuracy = toInt(req.body?.accuracy, 0);
  const bestStreak = toInt(req.body?.bestStreak, 0);
  const durationMs = Math.max(toInt(req.body?.durationMs, 0), 0);
  const externalKey = String(req.body?.externalKey || `world-history:${session.sub}:${Date.now()}`).slice(0, 160);

  const validLevels = ["grade6", "grade5", "grade4", "grade3", "grade2", "grade1"];
  if (!date || !validLevels.includes(level)) {
    res.status(400).json({ error: "date or level is invalid" });
    return;
  }

  if (totalQuestions <= 0 || correctAnswers < 0 || wrongAnswers < 0) {
    res.status(400).json({ error: "session metrics are invalid" });
    return;
  }

  try {
    await pool.query(
      `
        INSERT INTO world_history_sessions (
          user_id,
          date,
          level,
          total_questions,
          correct_answers,
          wrong_answers,
          accuracy,
          best_streak,
          duration_ms,
          external_key
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (external_key)
        DO UPDATE SET
          level = EXCLUDED.level,
          total_questions = EXCLUDED.total_questions,
          correct_answers = EXCLUDED.correct_answers,
          wrong_answers = EXCLUDED.wrong_answers,
          accuracy = EXCLUDED.accuracy,
          best_streak = EXCLUDED.best_streak,
          duration_ms = EXCLUDED.duration_ms,
          updated_at = NOW()
      `,
      [session.sub, date, level, totalQuestions, correctAnswers, wrongAnswers, accuracy, bestStreak, durationMs, externalKey]
    );

    res.status(201).json({ ok: true });
  } catch (error) {
    console.error("failed to save world history session", error);
    res.status(500).json({ error: "failed to save world history session" });
  }
});

app.get("/api/baseball/rankings", async (req, res) => {
  const limit = Math.min(Math.max(toInt(req.query.limit, 10), 1), 50);

  try {
    const { rows } = await pool.query(
      `
        SELECT
          u.id AS "userId",
          COALESCE(NULLIF(u.nickname, ''), u.name) AS "displayName",
          COALESCE(SUM(s.correct_answers), 0)::INT AS "totalCorrect",
          COUNT(s.id)::INT AS "roundCount"
        FROM math_users u
        LEFT JOIN baseball_sessions s ON s.user_id = u.id
        GROUP BY u.id, u.nickname, u.name
        HAVING COALESCE(SUM(s.correct_answers), 0) > 0
        ORDER BY "totalCorrect" DESC, "roundCount" ASC, "displayName" ASC
        LIMIT $1
      `,
      [limit]
    );

    res.json({ items: rows });
  } catch (error) {
    console.error("failed to fetch baseball rankings", error);
    res.status(500).json({ error: "failed to fetch baseball rankings" });
  }
});

app.get("/api/baseball/sessions", async (req, res) => {
  const session = getSessionOrReject(req, res);
  if (!session) return;

  const limit = Math.min(Math.max(toInt(req.query.limit, 50), 1), 200);

  try {
    const { rows } = await pool.query(
      `
        SELECT
          date,
          level,
          total_questions AS "totalQuestions",
          correct_answers AS "correctAnswers",
          wrong_answers AS "wrongAnswers",
          accuracy,
          best_streak AS "bestStreak",
          duration_ms AS "durationMs",
          created_at AS "createdAt"
        FROM baseball_sessions
        WHERE user_id = $1
        ORDER BY created_at DESC
        LIMIT $2
      `,
      [session.sub, limit]
    );

    res.json({ items: rows });
  } catch (error) {
    console.error("failed to fetch baseball sessions", error);
    res.status(500).json({ error: "failed to fetch baseball sessions" });
  }
});

app.post("/api/baseball/sessions", async (req, res) => {
  const session = getSessionOrReject(req, res);
  if (!session) return;

  const date = String(req.body?.date || "").trim();
  const level = String(req.body?.level || "").trim();
  const totalQuestions = toInt(req.body?.totalQuestions, 0);
  const correctAnswers = toInt(req.body?.correctAnswers, 0);
  const wrongAnswers = toInt(req.body?.wrongAnswers, 0);
  const accuracy = toInt(req.body?.accuracy, 0);
  const bestStreak = toInt(req.body?.bestStreak, 0);
  const durationMs = Math.max(toInt(req.body?.durationMs, 0), 0);
  const externalKey = String(req.body?.externalKey || `baseball:${session.sub}:${Date.now()}`).slice(0, 160);

  const validLevels = ["beginner", "intermediate", "advanced"];
  if (!date || !validLevels.includes(level)) {
    res.status(400).json({ error: "date or level is invalid" });
    return;
  }

  if (totalQuestions <= 0 || correctAnswers < 0 || wrongAnswers < 0) {
    res.status(400).json({ error: "session metrics are invalid" });
    return;
  }

  try {
    await pool.query(
      `
        INSERT INTO baseball_sessions (
          user_id,
          date,
          level,
          total_questions,
          correct_answers,
          wrong_answers,
          accuracy,
          best_streak,
          duration_ms,
          external_key
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (external_key)
        DO UPDATE SET
          level = EXCLUDED.level,
          total_questions = EXCLUDED.total_questions,
          correct_answers = EXCLUDED.correct_answers,
          wrong_answers = EXCLUDED.wrong_answers,
          accuracy = EXCLUDED.accuracy,
          best_streak = EXCLUDED.best_streak,
          duration_ms = EXCLUDED.duration_ms,
          updated_at = NOW()
      `,
      [session.sub, date, level, totalQuestions, correctAnswers, wrongAnswers, accuracy, bestStreak, durationMs, externalKey]
    );

    res.status(201).json({ ok: true });
  } catch (error) {
    console.error("failed to save baseball session", error);
    res.status(500).json({ error: "failed to save baseball session" });
  }
});

app.get("/api/soccer/rankings", async (req, res) => {
  const limit = Math.min(Math.max(toInt(req.query.limit, 10), 1), 50);

  try {
    const { rows } = await pool.query(
      `
        SELECT
          u.id AS "userId",
          COALESCE(NULLIF(u.nickname, ''), u.name) AS "displayName",
          COALESCE(SUM(s.correct_answers), 0)::INT AS "totalCorrect",
          COUNT(s.id)::INT AS "roundCount"
        FROM math_users u
        LEFT JOIN soccer_sessions s ON s.user_id = u.id
        GROUP BY u.id, u.nickname, u.name
        HAVING COALESCE(SUM(s.correct_answers), 0) > 0
        ORDER BY "totalCorrect" DESC, "roundCount" ASC, "displayName" ASC
        LIMIT $1
      `,
      [limit]
    );

    res.json({ items: rows });
  } catch (error) {
    console.error("failed to fetch soccer rankings", error);
    res.status(500).json({ error: "failed to fetch soccer rankings" });
  }
});

app.get("/api/soccer/sessions", async (req, res) => {
  const session = getSessionOrReject(req, res);
  if (!session) return;

  const limit = Math.min(Math.max(toInt(req.query.limit, 50), 1), 200);

  try {
    const { rows } = await pool.query(
      `
        SELECT
          date,
          level,
          total_questions AS "totalQuestions",
          correct_answers AS "correctAnswers",
          wrong_answers AS "wrongAnswers",
          accuracy,
          best_streak AS "bestStreak",
          duration_ms AS "durationMs",
          created_at AS "createdAt"
        FROM soccer_sessions
        WHERE user_id = $1
        ORDER BY created_at DESC
        LIMIT $2
      `,
      [session.sub, limit]
    );

    res.json({ items: rows });
  } catch (error) {
    console.error("failed to fetch soccer sessions", error);
    res.status(500).json({ error: "failed to fetch soccer sessions" });
  }
});

app.post("/api/soccer/sessions", async (req, res) => {
  const session = getSessionOrReject(req, res);
  if (!session) return;

  const date = String(req.body?.date || "").trim();
  const level = String(req.body?.level || "").trim();
  const totalQuestions = toInt(req.body?.totalQuestions, 0);
  const correctAnswers = toInt(req.body?.correctAnswers, 0);
  const wrongAnswers = toInt(req.body?.wrongAnswers, 0);
  const accuracy = toInt(req.body?.accuracy, 0);
  const bestStreak = toInt(req.body?.bestStreak, 0);
  const durationMs = Math.max(toInt(req.body?.durationMs, 0), 0);
  const externalKey = String(req.body?.externalKey || `soccer:${session.sub}:${Date.now()}`).slice(0, 160);

  const validLevels = ["beginner", "intermediate", "advanced"];
  if (!date || !validLevels.includes(level)) {
    res.status(400).json({ error: "date or level is invalid" });
    return;
  }

  if (totalQuestions <= 0 || correctAnswers < 0 || wrongAnswers < 0) {
    res.status(400).json({ error: "session metrics are invalid" });
    return;
  }

  try {
    await pool.query(
      `
        INSERT INTO soccer_sessions (
          user_id,
          date,
          level,
          total_questions,
          correct_answers,
          wrong_answers,
          accuracy,
          best_streak,
          duration_ms,
          external_key
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (external_key)
        DO UPDATE SET
          level = EXCLUDED.level,
          total_questions = EXCLUDED.total_questions,
          correct_answers = EXCLUDED.correct_answers,
          wrong_answers = EXCLUDED.wrong_answers,
          accuracy = EXCLUDED.accuracy,
          best_streak = EXCLUDED.best_streak,
          duration_ms = EXCLUDED.duration_ms,
          updated_at = NOW()
      `,
      [session.sub, date, level, totalQuestions, correctAnswers, wrongAnswers, accuracy, bestStreak, durationMs, externalKey]
    );

    res.status(201).json({ ok: true });
  } catch (error) {
    console.error("failed to save soccer session", error);
    res.status(500).json({ error: "failed to save soccer session" });
  }
});

app.get("/api/readings", async (req, res) => {
  const userId = String(req.query.userId || "").trim();
  const limit = Math.min(Number(req.query.limit || 200), 500);

  if (!userId) {
    res.status(400).json({ error: "userId is required" });
    return;
  }

  try {
    const { rows } = await pool.query(
      `
        SELECT
          user_id AS "userId",
          type,
          date,
          title,
          summary,
          external_key AS "externalKey",
          created_at AS "createdAt"
        FROM readings
        WHERE user_id = $1
        ORDER BY created_at DESC
        LIMIT $2
      `,
      [userId, limit]
    );

    res.json({ items: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to fetch readings" });
  }
});

app.post("/api/readings", async (req, res) => {
  const { userId, type, date, title, summary, externalKey } = req.body || {};

  if (!userId || !type || !date || !title || !summary || !externalKey) {
    res.status(400).json({ error: "userId, type, date, title, summary, externalKey are required" });
    return;
  }

  try {
    await pool.query(
      `
        INSERT INTO readings (user_id, type, date, title, summary, external_key)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (external_key)
        DO UPDATE SET
          title = EXCLUDED.title,
          summary = EXCLUDED.summary,
          updated_at = NOW()
      `,
      [String(userId), String(type), String(date), String(title), String(summary), String(externalKey)]
    );

    res.status(201).json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to save reading" });
  }
});

app.post("/api/xha/draft", async (req, res) => {
  const text = normalizeSpaces(req.body?.text);
  const imageNotes = normalizeSpaces(req.body?.imageNotes);
  const authorSignature = normalizeSpaces(req.body?.authorSignature);
  const toneRaw = normalizeSpaces(req.body?.tone).toLowerCase();
  const tone = ["warm", "calm", "cheer"].includes(toneRaw) ? toneRaw : "warm";

  if (!text) {
    res.status(400).json({ error: "text is required" });
    return;
  }

  try {
    const result = await generateXhaDraft({
      text,
      imageNotes,
      authorSignature,
      tone
    });

    res.json({
      ok: true,
      provider: result.provider,
      draft: result.draft
    });
  } catch (error) {
    const message = normalizeSpaces(String(error?.message || "LLM 초안 생성 실패"));
    console.error("xha draft failed", error);
    res.status(502).json({ error: message });
  }
});

app.get("/api/xbot/state", async (req, res) => {
  const statusFilter = String(req.query.status || "all").trim().toLowerCase();
  const limit = Math.min(Math.max(toInt(req.query.limit, 200), 1), 1000);

  try {
    const snapshot = await readXBotSnapshot();
    let candidates = snapshot.candidates;

    if (statusFilter !== "all") {
      candidates = candidates.filter((candidate) => String(candidate?.status || "pending") === statusFilter);
    }

    res.json({
      ok: true,
      config: snapshot.config,
      summary: snapshot.summary,
      followingCount: snapshot.followingCount,
      updatedAt: snapshot.updatedAt,
      lastActionAt: snapshot.lastActionAt,
      lastActionType: snapshot.lastActionType,
      lastCooldownSeconds: snapshot.lastCooldownSeconds,
      candidates: candidates.slice(0, limit)
    });
  } catch (error) {
    console.error("failed to load xbot state", error);
    res.status(500).json({ error: "failed to load xbot state" });
  }
});

app.post("/api/xbot/scan", async (_req, res) => {
  try {
    const command = await runXAssistantCommand("scan");
    const snapshot = await readXBotSnapshot();
    res.json({
      ok: true,
      command,
      summary: snapshot.summary,
      followingCount: snapshot.followingCount,
      pendingCandidates: snapshot.candidates.filter((candidate) => String(candidate?.status || "pending") === "pending")
    });
  } catch (error) {
    const message = String(error.message || "scan failed");
    const statusCode = message.includes("Missing required environment variable") ? 400 : 500;
    console.error("xbot scan failed", error);
    res.status(statusCode).json({ error: message, details: error.details || null });
  }
});

app.post("/api/xbot/approve", async (req, res) => {
  const id = String(req.body?.id || "").trim();
  const reply = String(req.body?.reply || "").trim();
  const like = safeParseBoolean(req.body?.like, true);
  const cooldownSeconds = safeParseNonNegativeInt(req.body?.cooldownSeconds, null);

  if (!id) {
    res.status(400).json({ error: "id is required" });
    return;
  }

  const args = [`--id=${id}`];
  if (reply) {
    args.push(`--reply=${reply}`);
  }
  if (like === false) {
    args.push("--like=false");
  }
  if (cooldownSeconds !== null) {
    args.push(`--cooldown-seconds=${cooldownSeconds}`);
  }

  try {
    const command = await runXAssistantCommand("approve", args);
    const snapshot = await readXBotSnapshot();
    const candidate = snapshot.candidates.find((item) => String(item?.id || "") === id) || null;

    res.json({
      ok: true,
      command,
      candidate,
      summary: snapshot.summary
    });
  } catch (error) {
    const message = String(error.message || "approve failed");
    const statusCode = message.includes("Cooldown active")
      ? 429
      : message.includes("Missing required environment variable") || message.includes("Candidate")
        ? 400
        : 500;
    console.error("xbot approve failed", error);
    res.status(statusCode).json({ error: message, details: error.details || null });
  }
});

app.post("/api/xbot/reject", async (req, res) => {
  const id = String(req.body?.id || "").trim();
  const reason = String(req.body?.reason || "").trim();

  if (!id) {
    res.status(400).json({ error: "id is required" });
    return;
  }

  const args = [`--id=${id}`];
  if (reason) {
    args.push(`--reason=${reason}`);
  }

  try {
    const command = await runXAssistantCommand("reject", args);
    const snapshot = await readXBotSnapshot();
    const candidate = snapshot.candidates.find((item) => String(item?.id || "") === id) || null;

    res.json({
      ok: true,
      command,
      candidate,
      summary: snapshot.summary
    });
  } catch (error) {
    const message = String(error.message || "reject failed");
    const statusCode = message.includes("Candidate") ? 400 : 500;
    console.error("xbot reject failed", error);
    res.status(statusCode).json({ error: message, details: error.details || null });
  }
});

app.get("/xbot-api", (_req, res) => {
  res.sendFile(path.join(ROOT, "xbot.html"));
});

app.get("/xbot", (_req, res) => {
  res.sendFile(path.join(ROOT, "xbot-manual.html"));
});

app.use(express.static(ROOT));

app.get("*", (_req, res) => {
  res.sendFile(path.join(ROOT, "index.html"));
});

function startServer() {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    if (SKIP_DB) {
      console.log("[warn] SKIP_DB=true, database-backed APIs are disabled.");
    }
  });
}

if (SKIP_DB) {
  startServer();
} else {
  initDb()
    .then(() => {
      startServer();
    })
    .catch((error) => {
      console.error("Failed to initialize database", error);
      process.exit(1);
    });
}
