import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, signToken } from "@/lib/auth";
import { isDisposableEmail } from "@/lib/email-security";

const REGISTER_WINDOW_MS = 15 * 60 * 1000;
const REGISTER_MAX_REQUESTS = 12;

type RegisterRateEntry = {
  count: number;
  windowStart: number;
};

const registerRateStore: Map<string, RegisterRateEntry> =
  (globalThis as typeof globalThis & { __registerRateStore?: Map<string, RegisterRateEntry> }).__registerRateStore ??
  new Map<string, RegisterRateEntry>();

(globalThis as typeof globalThis & { __registerRateStore?: Map<string, RegisterRateEntry> }).__registerRateStore = registerRateStore;

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

function checkRegisterRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const current = registerRateStore.get(ip);

  if (!current || now - current.windowStart >= REGISTER_WINDOW_MS) {
    registerRateStore.set(ip, { count: 1, windowStart: now });
    return { allowed: true };
  }

  if (current.count >= REGISTER_MAX_REQUESTS) {
    const retryAfterSeconds = Math.ceil((current.windowStart + REGISTER_WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  current.count += 1;
  registerRateStore.set(ip, current);
  return { allowed: true };
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateLimit = checkRegisterRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Troppi tentativi di registrazione. Riprova tra qualche minuto.",
          retryAfterSeconds: rateLimit.retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds ?? 60),
          },
        }
      );
    }

    const body = await req.json();
    const {
      nome,
      cognome,
      email,
      password,
      telefono,
      ruolo,
      azienda,
      privacyAccepted,
      marketingConsent,
      profilingConsent,
    } = body;

    // Validazione
    if (!nome?.trim() || !cognome?.trim() || !email?.trim() || !password) {
      return NextResponse.json(
        { error: "Nome, cognome, email e password sono obbligatori" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "La password deve avere almeno 6 caratteri" },
        { status: 400 }
      );
    }

    if (!privacyAccepted) {
      return NextResponse.json(
        { error: "Devi accettare l'informativa sulla privacy" },
        { status: 400 }
      );
    }

    if (isDisposableEmail(email)) {
      return NextResponse.json(
        { error: "Usa un indirizzo email personale o aziendale valido." },
        { status: 400 }
      );
    }

    // Controlla se l'email esiste già
    const existing = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Questa email è già registrata. Prova ad accedere." },
        { status: 409 }
      );
    }

    // Crea l'utente
    const passwordHash = await hashPassword(password);
    const now = new Date();

    const user = await prisma.user.create({
      data: {
        email: email.trim().toLowerCase(),
        passwordHash,
        nome: nome.trim(),
        cognome: cognome.trim(),
        telefono: telefono?.trim() || null,
        ruolo: ruolo?.trim() || null,
        azienda: azienda?.trim() || null,
        privacyAccepted: true,
        privacyAcceptedAt: now,
        marketingConsent: !!marketingConsent,
        marketingConsentAt: marketingConsent ? now : null,
        profilingConsent: !!profilingConsent,
        profilingConsentAt: profilingConsent ? now : null,
      },
    });

    // Genera JWT
    const token = signToken({ userId: user.id, email: user.email });

    return NextResponse.json(
      {
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
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Errore interno del server" },
      { status: 500 }
    );
  }
}
