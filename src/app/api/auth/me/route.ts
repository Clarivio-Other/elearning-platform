import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

/** GET /api/auth/me — Ritorna il profilo dell'utente autenticato */
export async function GET(req: NextRequest) {
  try {
    const payload = getUserFromRequest(req);
    if (!payload) {
      return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        nome: user.nome,
        cognome: user.cognome,
        email: user.email,
        telefono: user.telefono,
        ruolo: user.ruolo,
        azienda: user.azienda,
        avatar: user.avatar,
        registeredAt: user.createdAt.toISOString(),
        privacyAccepted: user.privacyAccepted,
        privacyAcceptedAt: user.privacyAcceptedAt?.toISOString() || "",
        marketingConsent: user.marketingConsent,
        marketingConsentAt: user.marketingConsentAt?.toISOString() || "",
        profilingConsent: user.profilingConsent,
        profilingConsentAt: user.profilingConsentAt?.toISOString() || "",
      },
    });
  } catch (error) {
    console.error("Me error:", error);
    return NextResponse.json(
      { error: "Errore interno del server" },
      { status: 500 }
    );
  }
}

/** PUT /api/auth/me — Aggiorna il profilo utente */
export async function PUT(req: NextRequest) {
  try {
    const payload = getUserFromRequest(req);
    if (!payload) {
      return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
    }

    const body = await req.json();
    const { nome, cognome, telefono, ruolo, azienda, avatar, marketingConsent, profilingConsent } = body;

    const now = new Date();
    const updateData: Record<string, unknown> = {};

    if (nome !== undefined) updateData.nome = nome.trim();
    if (cognome !== undefined) updateData.cognome = cognome.trim();
    if (telefono !== undefined) updateData.telefono = telefono.trim() || null;
    if (ruolo !== undefined) updateData.ruolo = ruolo.trim() || null;
    if (azienda !== undefined) updateData.azienda = azienda.trim() || null;
    if (avatar !== undefined) updateData.avatar = avatar || null;

    if (marketingConsent !== undefined) {
      updateData.marketingConsent = !!marketingConsent;
      updateData.marketingConsentAt = marketingConsent ? now : null;
    }
    if (profilingConsent !== undefined) {
      updateData.profilingConsent = !!profilingConsent;
      updateData.profilingConsentAt = profilingConsent ? now : null;
    }

    const user = await prisma.user.update({
      where: { id: payload.userId },
      data: updateData,
    });

    return NextResponse.json({
      user: {
        id: user.id,
        nome: user.nome,
        cognome: user.cognome,
        email: user.email,
        telefono: user.telefono,
        ruolo: user.ruolo,
        azienda: user.azienda,
        avatar: user.avatar,
        registeredAt: user.createdAt.toISOString(),
        privacyAccepted: user.privacyAccepted,
        privacyAcceptedAt: user.privacyAcceptedAt?.toISOString() || "",
        marketingConsent: user.marketingConsent,
        marketingConsentAt: user.marketingConsentAt?.toISOString() || "",
        profilingConsent: user.profilingConsent,
        profilingConsentAt: user.profilingConsentAt?.toISOString() || "",
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "Errore interno del server" },
      { status: 500 }
    );
  }
}
