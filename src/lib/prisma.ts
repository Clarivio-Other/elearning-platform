/**
 * Prisma-compatible DB client using raw `pg`.
 * Workaround for Windows ARM64: Prisma's native DLL is x64-only.
 * Production (Railway/Linux x64) uses the standard PrismaClient.
 */
import { Pool } from "pg";

const globalForPool = globalThis as unknown as { __pgPool?: Pool };
const pool =
  globalForPool.__pgPool ??
  new Pool({ connectionString: process.env.DATABASE_URL });
if (!globalForPool.__pgPool) globalForPool.__pgPool = pool;

// ─── Row types matching exact DB column names (camelCase) ───────────────────

type UserRow = {
  id: number;
  email: string;
  passwordHash: string;
  nome: string;
  cognome: string;
  telefono: string | null;
  ruolo: string | null;
  azienda: string | null;
  avatar: string | null;
  privacyAccepted: boolean;
  privacyAcceptedAt: Date | null;
  marketingConsent: boolean;
  marketingConsentAt: Date | null;
  profilingConsent: boolean;
  profilingConsentAt: Date | null;
  totalCredits: number;
  streak: number;
  lastActivityDate: string | null;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  // joined relations (optional)
  moduleProgress?: ModuleProgressRow[];
  badges?: UserBadgeRow[];
  activityLog?: UserActivityRow[];
};

type ModuleProgressRow = {
  id: number;
  userId: number;
  moduleId: string;
  bestScore: number;
  maxCredits: number;
  completedAt: Date;
  updatedAt: Date;
};

type UserBadgeRow = {
  id: number;
  userId: number;
  badgeId: string;
  unlockedAt: Date;
};

type UserActivityRow = {
  id: number;
  userId: number;
  type: string;
  message: string;
  timestamp: Date;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function quoted(col: string) {
  return `"${col}"`;
}

// ─── User model ──────────────────────────────────────────────────────────────

const user = {
  async findUnique(args: {
    where: { id?: number; email?: string };
    include?: {
      moduleProgress?: boolean | { orderBy?: Record<string, string>; take?: number };
      badges?: boolean;
      activityLog?: boolean | { orderBy?: Record<string, string>; take?: number };
    };
    select?: Record<string, boolean | object>;
  }): Promise<UserRow | null> {
    const { where, include } = args;
    let row: UserRow | null = null;

    if (where.email !== undefined) {
      const res = await pool.query<UserRow>(
        `SELECT * FROM users WHERE email = $1 LIMIT 1`,
        [where.email]
      );
      row = res.rows[0] ?? null;
    } else if (where.id !== undefined) {
      const res = await pool.query<UserRow>(
        `SELECT * FROM users WHERE id = $1 LIMIT 1`,
        [where.id]
      );
      row = res.rows[0] ?? null;
    }

    if (!row || !include) return row;

    if (include.moduleProgress) {
      const mp = await pool.query<ModuleProgressRow>(
        `SELECT * FROM module_progress WHERE "userId" = $1`,
        [row.id]
      );
      row.moduleProgress = mp.rows;
    }
    if (include.badges) {
      const b = await pool.query<UserBadgeRow>(
        `SELECT * FROM user_badges WHERE "userId" = $1`,
        [row.id]
      );
      row.badges = b.rows;
    }
    if (include.activityLog) {
      const opts = typeof include.activityLog === "object" ? include.activityLog : {};
      const orderCol = opts.orderBy ? Object.keys(opts.orderBy)[0] : "timestamp";
      const orderDir =
        opts.orderBy ? (Object.values(opts.orderBy)[0] as string).toUpperCase() : "DESC";
      const limit = opts.take ? `LIMIT ${opts.take}` : "LIMIT 30";
      const al = await pool.query<UserActivityRow>(
        `SELECT * FROM user_activity WHERE "userId" = $1 ORDER BY ${quoted(orderCol)} ${orderDir} ${limit}`,
        [row.id]
      );
      row.activityLog = al.rows;
    }
    return row;
  },

  async create(args: { data: Partial<UserRow> }): Promise<UserRow> {
    const d = args.data;
    const res = await pool.query<UserRow>(
      `INSERT INTO users (
        email, "passwordHash", nome, cognome, telefono, ruolo, azienda, avatar,
        "privacyAccepted", "privacyAcceptedAt", "marketingConsent", "marketingConsentAt",
        "profilingConsent", "profilingConsentAt"
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
      RETURNING *`,
      [
        d.email ?? null,
        d.passwordHash ?? null,
        d.nome ?? null,
        d.cognome ?? null,
        d.telefono ?? null,
        d.ruolo ?? null,
        d.azienda ?? null,
        d.avatar ?? null,
        d.privacyAccepted ?? false,
        d.privacyAcceptedAt ?? null,
        d.marketingConsent ?? false,
        d.marketingConsentAt ?? null,
        d.profilingConsent ?? false,
        d.profilingConsentAt ?? null,
      ]
    );
    return res.rows[0];
  },

  async update(args: {
    where: { id: number };
    data: Partial<UserRow>;
  }): Promise<UserRow> {
    const sets: string[] = [];
    const vals: unknown[] = [];
    let idx = 1;
    for (const [k, v] of Object.entries(args.data)) {
      sets.push(`${quoted(k)} = $${idx++}`);
      vals.push(v);
    }
    // Always bump updatedAt
    sets.push(`${quoted("updatedAt")} = NOW()`);
    vals.push(args.where.id);
    const res = await pool.query<UserRow>(
      `UPDATE users SET ${sets.join(", ")} WHERE id = $${idx} RETURNING *`,
      vals
    );
    return res.rows[0];
  },

  async findMany(args: {
    select?: Record<string, boolean | object>;
    orderBy?: Record<string, string>;
    take?: number;
  }): Promise<UserRow[]> {
    const orderCol = args.orderBy ? Object.keys(args.orderBy)[0] : "id";
    const orderDir = args.orderBy
      ? (Object.values(args.orderBy)[0] as string).toUpperCase()
      : "DESC";
    const limit = args.take ? `LIMIT ${args.take}` : "";
    const res = await pool.query<UserRow>(
      `SELECT * FROM users ORDER BY ${quoted(orderCol)} ${orderDir} ${limit}`
    );
    // Attach moduleProgress if requested in select
    const rows = res.rows;
    if (args.select?.moduleProgress) {
      for (const row of rows) {
        const mp = await pool.query<ModuleProgressRow>(
          `SELECT * FROM module_progress WHERE "userId" = $1`,
          [row.id]
        );
        row.moduleProgress = mp.rows;
      }
    }
    return rows;
  },
};

// ─── ModuleProgress model ────────────────────────────────────────────────────

const moduleProgress = {
  async upsert(args: {
    where: { userId_moduleId: { userId: number; moduleId: string } };
    update: Partial<ModuleProgressRow>;
    create: Partial<ModuleProgressRow>;
  }): Promise<ModuleProgressRow> {
    const { userId, moduleId } = args.where.userId_moduleId;
    const c = args.create;
    const u = args.update;
    const res = await pool.query<ModuleProgressRow>(
      `INSERT INTO module_progress ("userId", "moduleId", "bestScore", "maxCredits", "completedAt")
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT ("userId", "moduleId")
       DO UPDATE SET "bestScore" = $3, "completedAt" = $5, "updatedAt" = NOW()
       RETURNING *`,
      [
        userId,
        moduleId,
        u.bestScore ?? c.bestScore ?? 0,
        c.maxCredits ?? 0,
        u.completedAt ?? c.completedAt ?? new Date(),
      ]
    );
    return res.rows[0];
  },

  async findMany(args: { where: { userId: number } }): Promise<ModuleProgressRow[]> {
    const res = await pool.query<ModuleProgressRow>(
      `SELECT * FROM module_progress WHERE "userId" = $1`,
      [args.where.userId]
    );
    return res.rows;
  },

  async deleteMany(args: { where: { userId: number } }): Promise<void> {
    await pool.query(`DELETE FROM module_progress WHERE "userId" = $1`, [
      args.where.userId,
    ]);
  },
};

// ─── UserBadge model ─────────────────────────────────────────────────────────

const userBadge = {
  async createMany(args: {
    data: Partial<UserBadgeRow>[];
    skipDuplicates?: boolean;
  }): Promise<void> {
    for (const d of args.data) {
      const conflict = args.skipDuplicates ? "ON CONFLICT DO NOTHING" : "";
      await pool.query(
        `INSERT INTO user_badges ("userId", "badgeId") VALUES ($1, $2) ${conflict}`,
        [d.userId, d.badgeId]
      );
    }
  },

  async deleteMany(args: { where: { userId: number } }): Promise<void> {
    await pool.query(`DELETE FROM user_badges WHERE "userId" = $1`, [
      args.where.userId,
    ]);
  },
};

// ─── UserActivity model ──────────────────────────────────────────────────────

const userActivity = {
  async createMany(args: {
    data: Partial<UserActivityRow>[];
  }): Promise<void> {
    for (const d of args.data) {
      await pool.query(
        `INSERT INTO user_activity ("userId", type, message) VALUES ($1, $2, $3)`,
        [d.userId, d.type, d.message]
      );
    }
  },

  async deleteMany(args: { where: { userId: number } }): Promise<void> {
    await pool.query(`DELETE FROM user_activity WHERE "userId" = $1`, [
      args.where.userId,
    ]);
  },
};

// ─── Transaction helper ──────────────────────────────────────────────────────
// Note: ops are already-running promises. We await them sequentially.
// Not a true atomic transaction, but sufficient for this app's reset flow.

async function $transaction(ops: Promise<unknown>[]): Promise<unknown[]> {
  const results: unknown[] = [];
  for (const op of ops) {
    results.push(await op);
  }
  return results;
}

// ─── Export ──────────────────────────────────────────────────────────────────

export const prisma = {
  user,
  moduleProgress,
  userBadge,
  userActivity,
  $transaction,
};
