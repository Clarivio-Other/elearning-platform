import pg from "pg";
const { Client } = pg;
const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
await client.connect();
// Rename is_admin → "isAdmin" to match Prisma field name
await client.query(`ALTER TABLE users RENAME COLUMN is_admin TO "isAdmin"`);
const { rows } = await client.query(`SELECT column_name FROM information_schema.columns WHERE table_name='users' AND column_name='isAdmin'`);
console.log("Column after rename:", rows);
await client.end();
