/**
 * One-time setup script (uses pg directly — no Prisma binary needed):
 * - Adds is_admin column to users table
 * - Sets fabrizio@clarivio.it as admin
 * - Marks all 6 modules as completed at max score
 *
 * Run: node scripts/admin-setup.mjs
 */
import pg from "pg";

const { Client } = pg;

const TARGET_EMAIL = "fabrizio@clarivio.it";

const MODULES = [
  { id: "modulo-1", maxCredits: 90 },
  { id: "modulo-2", maxCredits: 70 },
  { id: "modulo-3", maxCredits: 75 },
  { id: "modulo-4", maxCredits: 95 },
  { id: "modulo-5", maxCredits: 70 },
  { id: "modulo-6", maxCredits: 95 },
];

const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function main() {
  await client.connect();
  console.log("✓ Connesso al database");

  // 1. Add is_admin column
  await client.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT FALSE`);
  console.log("✓ Colonna is_admin aggiunta (o già esistente)");

  // 2. Find user
  const { rows } = await client.query(`SELECT id, nome, cognome FROM users WHERE email = $1`, [TARGET_EMAIL]);
  if (!rows.length) { console.error(`✗ Utente ${TARGET_EMAIL} non trovato!`); process.exit(1); }
  const user = rows[0];
  console.log(`✓ Utente trovato: ${user.nome} ${user.cognome} (id=${user.id})`);

  // 3. Set as admin
  await client.query(`UPDATE users SET is_admin = TRUE WHERE id = $1`, [user.id]);
  console.log("✓ is_admin = TRUE impostato");

  // 4. Upsert module progress for all modules
  const now = new Date().toISOString();
  for (const mod of MODULES) {
    await client.query(
      `INSERT INTO module_progress ("userId", "moduleId", "bestScore", "maxCredits", "completedAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $5)
       ON CONFLICT ("userId", "moduleId") DO UPDATE
         SET "bestScore" = EXCLUDED."bestScore",
             "maxCredits" = EXCLUDED."maxCredits",
             "completedAt" = EXCLUDED."completedAt",
             "updatedAt" = EXCLUDED."updatedAt"`,
      [user.id, mod.id, mod.maxCredits, mod.maxCredits, now]
    );
    console.log(`✓ ${mod.id}: ${mod.maxCredits}/${mod.maxCredits} XP`);
  }

  // 5. Update totalCredits on user
  const totalCredits = MODULES.reduce((sum, m) => sum + m.maxCredits, 0);
  await client.query(`UPDATE users SET "totalCredits" = $1 WHERE id = $2`, [totalCredits, user.id]);
  console.log(`✓ totalCredits = ${totalCredits}`);

  console.log("\n🎉 Setup completato! Vai su learn.clarivio.it → /attestato");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => client.end());
