import pg from "pg";
const { Client } = pg;
const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
await client.connect();
const { rows } = await client.query(`SELECT id, email, "isAdmin", "totalCredits" FROM users WHERE email = 'fabrizio@clarivio.it'`);
console.log("User:", rows[0]);
const mp = await client.query(`SELECT "moduleId", "bestScore" FROM module_progress WHERE "userId" = $1`, [rows[0].id]);
console.log("Modules:", mp.rows);
await client.end();
