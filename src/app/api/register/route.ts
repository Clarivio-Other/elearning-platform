import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { nome, cognome, email, telefono, ruolo, azienda,
          privacyAccepted, privacyAcceptedAt,
          marketingConsent, marketingConsentAt,
          profilingConsent, profilingConsentAt,
          registeredAt } = body as Record<string, string | boolean>;

  // Basic validation
  if (!nome || !cognome || !email || !privacyAccepted) {
    return NextResponse.json({ error: "Campi obbligatori mancanti" }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    return NextResponse.json({ error: "Email non valida" }, { status: 422 });
  }

  // ── Supabase ────────────────────────────────────────────────────────────
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error: dbError } = await supabase.from("school_registrations").insert({
      nome,
      cognome,
      email: String(email).toLowerCase(),
      telefono: telefono || null,
      ruolo: ruolo || null,
      azienda: azienda || null,
      privacy_accepted: true,
      privacy_accepted_at: privacyAcceptedAt,
      marketing_consent: marketingConsent ?? false,
      marketing_consent_at: marketingConsent ? marketingConsentAt : null,
      profiling_consent: profilingConsent ?? false,
      profiling_consent_at: profilingConsent ? profilingConsentAt : null,
      registered_at: registeredAt,
    });
    if (dbError) {
      console.error("[register] Supabase error:", dbError.message);
      // Don't fail the request — local profile is already saved
    }
  }

  // ── Welcome email via Resend ────────────────────────────────────────────
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM ?? "noreply@clarivio.it";

  if (resendKey) {
    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: fromEmail,
      to: String(email).toLowerCase(),
      subject: "Benvenuto in Clarivio School!",
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px">
          <img src="https://clarivio.it/logo/Logo_clarivio.svg" alt="Clarivio" style="height:32px;margin-bottom:24px" />
          <h1 style="font-size:22px;font-weight:700;color:#1e1b4b;margin-bottom:8px">
            Ciao ${nome}! 👋
          </h1>
          <p style="color:#475569;line-height:1.6;margin-bottom:16px">
            La tua registrazione a <strong>Clarivio School</strong> è avvenuta con successo.
          </p>
          <p style="color:#475569;line-height:1.6;margin-bottom:16px">
            Puoi ora accedere ai moduli del corso sull'AI generativa, completare i quiz e ottenere il tuo attestato finale.
          </p>
          <a href="https://school.clarivio.it"
             style="display:inline-block;background:#4f46e5;color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:600;margin-top:8px">
            Vai al corso →
          </a>
          <p style="color:#94a3b8;font-size:12px;margin-top:32px;border-top:1px solid #e2e8f0;padding-top:16px">
            Clarivio S.r.l. — <a href="https://clarivio.it/privacy" style="color:#6366f1">Privacy Policy</a>
          </p>
        </div>
      `,
    }).catch((err: unknown) => console.error("[register] Resend error:", err));
  }

  return NextResponse.json({ ok: true });
}
