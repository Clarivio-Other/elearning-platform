CREATE TABLE IF NOT EXISTS users (
  id              SERIAL PRIMARY KEY,
  email           TEXT UNIQUE NOT NULL,
  "passwordHash"  TEXT NOT NULL,
  nome            TEXT NOT NULL,
  cognome         TEXT NOT NULL,
  telefono        TEXT,
  ruolo           TEXT,
  azienda         TEXT,
  avatar          TEXT,
  "privacyAccepted"    BOOLEAN NOT NULL DEFAULT false,
  "privacyAcceptedAt"  TIMESTAMPTZ,
  "marketingConsent"   BOOLEAN NOT NULL DEFAULT false,
  "marketingConsentAt" TIMESTAMPTZ,
  "profilingConsent"   BOOLEAN NOT NULL DEFAULT false,
  "profilingConsentAt" TIMESTAMPTZ,
  "totalCredits"       INTEGER NOT NULL DEFAULT 0,
  streak               INTEGER NOT NULL DEFAULT 0,
  "lastActivityDate"   TEXT,
  "createdAt"          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt"          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS module_progress (
  id           SERIAL PRIMARY KEY,
  "userId"     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "moduleId"   TEXT NOT NULL,
  "bestScore"  INTEGER NOT NULL,
  "maxCredits" INTEGER NOT NULL,
  "completedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE("userId", "moduleId")
);

CREATE TABLE IF NOT EXISTS user_badges (
  id           SERIAL PRIMARY KEY,
  "userId"     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "badgeId"    TEXT NOT NULL,
  "unlockedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE("userId", "badgeId")
);

CREATE TABLE IF NOT EXISTS user_activity (
  id        SERIAL PRIMARY KEY,
  "userId"  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type      TEXT NOT NULL,
  message   TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS user_activity_userid_timestamp ON user_activity("userId", timestamp);
