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

  const { nome, cognome, email, totalCredits, completionDate, modules } =
    body as {
      nome: string;
      cognome: string;
      email: string;
      totalCredits: number;
      completionDate: string;
      modules: Array<{ title: string; score: number; maxCredits: number }>;
    };

  if (!email || !nome) {
    return NextResponse.json({ error: "Campi obbligatori mancanti" }, { status: 422 });
  }

  // ── Mark course completed in Supabase ───────────────────────────────────
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    try {
      await supabase
        .from("school_registrations")
        .update({ course_completed: true, course_completed_at: new Date().toISOString() })
        .eq("email", String(email).toLowerCase());
    } catch (err: unknown) {
      console.error("[certificate] Supabase update error:", err);
    }
  }

  // ── Send certificate email via Resend ────────────────────────────────────
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM ?? "noreply@clarivio.it";

  if (!resendKey) {
    return NextResponse.json({ ok: true, emailSent: false });
  }

  const modulesHtml = (modules ?? [])
    .map(
      (m) =>
        `<tr>
          <td style="padding:6px 12px;color:#475569">${m.title}</td>
          <td style="padding:6px 12px;text-align:right;font-weight:600;color:#4f46e5">${m.score}/${m.maxCredits}</td>
        </tr>`
    )
    .join("");

  const resend = new Resend(resendKey);
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: String(email).toLowerCase(),
    subject: "🏆 Il tuo Attestato Clarivio School",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px 24px">
        <img src="https://clarivio.it/logo/Logo_clarivio.svg" alt="Clarivio" style="height:32px;margin-bottom:24px" />

        <h1 style="font-size:22px;font-weight:700;color:#1e1b4b;margin-bottom:8px">
          Complimenti ${nome}! 🎉
        </h1>
        <p style="color:#475569;line-height:1.6;margin-bottom:24px">
          Hai completato con successo il percorso formativo <strong>Clarivio School — AI Generativa per Professionisti</strong>.
        </p>

        <!-- Certificate card -->
        <div style="border:2px solid #c7d2fe;border-radius:16px;padding:24px;text-align:center;background:#fafafe;margin-bottom:24px">
          <p style="color:#6366f1;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 8px">
            Attestato di Fine Percorso
          </p>
          <p style="font-size:28px;font-weight:700;font-style:italic;color:#1e1b4b;margin:0 0 4px">
            ${nome} ${cognome}
          </p>
          <p style="color:#94a3b8;font-size:13px;margin:0 0 20px">
            Completato il ${completionDate}
          </p>

          <table style="width:100%;border-collapse:collapse;margin-bottom:12px">
            <tr style="background:#ede9fe">
              <th style="padding:6px 12px;text-align:left;font-size:12px;color:#4f46e5">Modulo</th>
              <th style="padding:6px 12px;text-align:right;font-size:12px;color:#4f46e5">Crediti</th>
            </tr>
            ${modulesHtml}
          </table>

          <p style="font-weight:700;color:#4f46e5;font-size:18px;margin:0">
            Crediti totali: ${totalCredits}
          </p>
        </div>

        <a href="https://school.clarivio.it/attestato"
           style="display:inline-block;background:#4f46e5;color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:600">
          Scarica l'attestato PDF →
        </a>

        <p style="color:#94a3b8;font-size:12px;margin-top:32px;border-top:1px solid #e2e8f0;padding-top:16px">
          Clarivio S.r.l. — <a href="https://clarivio.it/privacy" style="color:#6366f1">Privacy Policy</a>
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("[certificate] Resend error:", error);
    return NextResponse.json({ ok: true, emailSent: false });
  }

  return NextResponse.json({ ok: true, emailSent: true });
}
