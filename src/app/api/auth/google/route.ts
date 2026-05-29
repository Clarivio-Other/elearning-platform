import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import { isDisposableEmail } from "@/lib/email-security";

interface GoogleTokenInfo {
  sub: string;
  email: string;
  email_verified: string;
  given_name: string;
  family_name: string;
  picture: string;
  name: string;
}

export async function POST(req: NextRequest) {
  try {
    const { credential } = await req.json();

    if (!credential) {
      return NextResponse.json({ error: "Credenziale Google mancante" }, { status: 400 });
    }

    // Verifica il token Google tramite tokeninfo endpoint
    const resp = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
    );
    if (!resp.ok) {
      return NextResponse.json({ error: "Token Google non valido" }, { status: 401 });
    }

    const info: GoogleTokenInfo = await resp.json();

    if (info.email_verified !== "true") {
      return NextResponse.json({ error: "Email Google non verificata" }, { status: 401 });
    }

    const email = info.email.toLowerCase();

    if (isDisposableEmail(email)) {
      return NextResponse.json(
        { error: "Usa un indirizzo email personale o aziendale valido." },
        { status: 400 }
      );
    }

    // Trova o crea l'utente
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          passwordHash: "google_oauth_no_password",
          nome: info.given_name || info.name.split(" ")[0] || "Utente",
          cognome: info.family_name || info.name.split(" ").slice(1).join(" ") || "",
          avatar: info.picture || null,
          privacyAccepted: true,
          privacyAcceptedAt: new Date(),
        },
      });
    } else if (!user.avatar && info.picture) {
      // Aggiorna avatar se mancante
      user = await prisma.user.update({
        where: { id: user.id },
        data: { avatar: info.picture },
      });
    }

    const token = signToken({ userId: user.id, email: user.email });

    return NextResponse.json({
      token,
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
    console.error("Google auth error:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}
