import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import { getUserFromRequest } from "@/lib/auth";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

type UserRow = {
  id: number;
  email: string;
  nome: string;
  cognome: string;
  telefono: string | null;
  ruolo: string | null;
  azienda: string | null;
  avatar: string | null;
  privacyAccepted: boolean;
  privacyAcceptedAt: string | null;
  marketingConsent: boolean;
  marketingConsentAt: string | null;
  profilingConsent: boolean;
  profilingConsentAt: string | null;
  totalCredits: number;
  streak: number;
  isAdmin: boolean;
  createdAt: string;
};

async function requireAdmin(req: NextRequest): Promise<{ userId: number } | NextResponse> {
  const payload = getUserFromRequest(req);
  if (!payload) {
    return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
  }
  const res = await pool.query<{ isAdmin: boolean }>(
    `SELECT "isAdmin" FROM users WHERE id = $1 LIMIT 1`,
    [payload.userId]
  );
  if (!res.rows[0]?.isAdmin) {
    return NextResponse.json({ error: "Accesso negato" }, { status: 403 });
  }
  return { userId: payload.userId };
}

/** GET /api/admin/users — Lista tutti gli utenti (solo admin) */
export async function GET(req: NextRequest) {
  try {
    const auth = await requireAdmin(req);
    if (auth instanceof NextResponse) return auth;

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("q")?.trim() ?? "";

    let query = `
      SELECT id, email, nome, cognome, telefono, ruolo, azienda, avatar,
             "privacyAccepted", "privacyAcceptedAt",
             "marketingConsent", "marketingConsentAt",
             "profilingConsent", "profilingConsentAt",
             "totalCredits", streak, "isAdmin", "createdAt"
      FROM users
    `;
    const params: string[] = [];

    if (search) {
      query += ` WHERE (email ILIKE $1 OR nome ILIKE $1 OR cognome ILIKE $1 OR azienda ILIKE $1)`;
      params.push(`%${search}%`);
    }

    query += ` ORDER BY "createdAt" DESC`;

    const res = await pool.query<UserRow>(query, params);

    const users = res.rows.map((u) => ({
      id: u.id,
      email: u.email,
      nome: u.nome,
      cognome: u.cognome,
      telefono: u.telefono,
      ruolo: u.ruolo,
      azienda: u.azienda,
      avatar: u.avatar,
      privacyAccepted: u.privacyAccepted,
      privacyAcceptedAt: u.privacyAcceptedAt,
      marketingConsent: u.marketingConsent,
      marketingConsentAt: u.marketingConsentAt,
      profilingConsent: u.profilingConsent,
      profilingConsentAt: u.profilingConsentAt,
      totalCredits: u.totalCredits,
      streak: u.streak,
      isAdmin: u.isAdmin,
      createdAt: u.createdAt,
    }));

    return NextResponse.json({ users, total: users.length });
  } catch (error) {
    console.error("Admin users GET error:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}

/** PATCH /api/admin/users?id=X — Aggiorna isAdmin dell'utente */
export async function PATCH(req: NextRequest) {
  try {
    const auth = await requireAdmin(req);
    if (auth instanceof NextResponse) return auth;

    const { searchParams } = new URL(req.url);
    const targetId = parseInt(searchParams.get("id") ?? "0", 10);
    if (!targetId) {
      return NextResponse.json({ error: "ID utente mancante" }, { status: 400 });
    }

    // Impedisci di rimuovere i propri privilegi admin
    if (targetId === auth.userId) {
      return NextResponse.json(
        { error: "Non puoi modificare i tuoi stessi privilegi admin" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { isAdmin } = body;

    const res = await pool.query<UserRow>(
      `UPDATE users SET "isAdmin" = $1, "updatedAt" = NOW() WHERE id = $2 RETURNING id, email, "isAdmin"`,
      [!!isAdmin, targetId]
    );

    if (!res.rows[0]) {
      return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });
    }

    return NextResponse.json({ user: res.rows[0] });
  } catch (error) {
    console.error("Admin users PATCH error:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}
