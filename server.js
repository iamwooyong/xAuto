import crypto from "node:crypto";
import path from "node:path";
import express from "express";
import pg from "pg";

const { Pool } = pg;

const app = express();
const PORT = Number(process.env.PORT || 3000);
const ROOT = process.cwd();
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/gommath";
const GOOGLE_CLIENT_IDS = (process.env.GOOGLE_CLIENT_IDS || process.env.GOOGLE_CLIENT_ID || "160808232856-3c351j191uocqiailplgha2pnf2qtdam.apps.googleusercontent.com")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
const SESSION_SECRET = process.env.SESSION_SECRET || "gommath-dev-session-secret";
const SESSION_TTL_HOURS = Math.max(Number(process.env.SESSION_TTL_HOURS || 24 * 7), 1);
const SESSION_TTL_MS = SESSION_TTL_HOURS * 60 * 60 * 1000;

const isLocalDb = DATABASE_URL.includes("localhost") || DATABASE_URL.includes("127.0.0.1");
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: isLocalDb ? false : { rejectUnauthorized: false }
});

if (!process.env.SESSION_SECRET) {
  console.warn("[warn] SESSION_SECRET is not set. Using development default secret.");
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
  await pool.query(
    `
      INSERT INTO math_users (id, email, name, picture)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id)
      DO UPDATE SET
        email = EXCLUDED.email,
        name = EXCLUDED.name,
        picture = EXCLUDED.picture,
        updated_at = NOW()
    `,
    [user.id, user.email, user.name, user.picture]
  );
}

function toInt(value, fallback = 0) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.trunc(parsed);
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
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
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
}

app.use(express.json());

app.get("/api/health", async (_req, res) => {
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
    await upsertMathUser(user);

    const token = signSession(user);
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture
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
          picture
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
        picture: session.picture
      }
    });
  } catch (error) {
    console.error("auth me failed", error);
    res.status(500).json({ error: "failed to load user" });
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

app.use(express.static(ROOT));

app.get("*", (_req, res) => {
  res.sendFile(path.join(ROOT, "index.html"));
});

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`곰돌이 수학 running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database", error);
    process.exit(1);
  });
