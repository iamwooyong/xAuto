import path from "node:path";
import express from "express";
import pg from "pg";

const { Pool } = pg;

const app = express();
const PORT = Number(process.env.PORT || 3000);
const ROOT = process.cwd();
const DATABASE_URL = process.env.DATABASE_URL || "";

const hasDb = Boolean(DATABASE_URL);
const pool = hasDb
  ? new Pool({
      connectionString: DATABASE_URL,
      ssl: DATABASE_URL.includes("localhost") ? false : { rejectUnauthorized: false }
    })
  : null;

async function initDb() {
  if (!pool) {
    console.warn("[warn] DATABASE_URL is not set. DB features are disabled.");
    return;
  }

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
}

app.use(express.json());

app.get("/api/health", async (_req, res) => {
  if (!pool) {
    res.json({ ok: true, db: "disabled" });
    return;
  }

  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, db: "connected" });
  } catch {
    res.status(500).json({ ok: false, db: "error" });
  }
});

app.get("/api/readings", async (req, res) => {
  if (!pool) {
    res.status(503).json({ error: "database is not configured" });
    return;
  }

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
  if (!pool) {
    res.status(503).json({ error: "database is not configured" });
    return;
  }

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
      console.log(`Tarot-Mate running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database", error);
    process.exit(1);
  });
