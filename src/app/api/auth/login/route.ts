import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword, signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email?.trim() || !password) {
      return NextResponse.json(
        { error: "Email e password sono obbligatori" },
        { status: 400 }
      );
    }

    // Cerca l'utente
    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email o password non corretti" },
        { status: 401 }
      );
    }

    // Verifica la password
    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Email o password non corretti" },
        { status: 401 }
      );
    }

    // Genera JWT
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
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Errore interno del server" },
      { status: 500 }
    );
  }
}
