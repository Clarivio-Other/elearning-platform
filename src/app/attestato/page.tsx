"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Mail, Check, Award, Printer } from "lucide-react";
import { useLearning } from "@/context/LearningContext";
import { useAuth } from "@/context/AuthContext";
import { modules } from "@/data/modules";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function CertificatePage() {
  const router = useRouter();
  const { progress, allModulesCompleted, completionDate } = useLearning();
  const { profile } = useAuth();
  const certRef = useRef<HTMLDivElement>(null);
  const [emailState, setEmailState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [pdfState, setPdfState] = useState<"idle" | "generating" | "fallback" | "error">("idle");
  const [pdfErrorDetail, setPdfErrorDetail] = useState("");

  const openBrowserPrintFallback = () => {
    if (!certRef.current) return false;
    const printWindow = window.open("", "_blank", "width=1280,height=920");
    if (!printWindow) return false;

    const styles = Array.from(document.querySelectorAll("style, link[rel='stylesheet']"))
      .map((node) => node.outerHTML)
      .join("\n");

    printWindow.document.write(`
      <!doctype html>
      <html lang="it">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Attestato Clarivio</title>
          ${styles}
          <style>
            body { margin: 0; background: #ffffff; }
            main { padding: 20px; }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              main { padding: 0; }
            }
          </style>
        </head>
        <body>
          <main>${certRef.current.outerHTML}</main>
        </body>
      </html>
    `);
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };

    return true;
  };

  if (!allModulesCompleted) {
    return (
      <main className="flex flex-1 items-center justify-center px-4">
        <Card className="p-8 text-center space-y-4 max-w-md">
          <h2 className="text-xl font-bold">Attestato non disponibile</h2>
          <p className="text-foreground-muted">
            Devi completare tutti i moduli per ottenere l&apos;attestato.
          </p>
          <Button onClick={() => router.push("/")}>
            <ArrowLeft className="h-4 w-4" />
            Torna alla Dashboard
          </Button>
        </Card>
      </main>
    );
  }

  const handleDownloadPDF = async () => {
    if (!certRef.current) return;
    setPdfState("generating");
    setPdfErrorDetail("");
    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const jsPdfModule = await import("jspdf");
      const PdfCtor = (jsPdfModule as unknown as { jsPDF?: new (...args: unknown[]) => {
        addImage: (data: string, format: string, x: number, y: number, w: number, h: number) => void;
        save: (filename: string) => void;
      } }).jsPDF;

      if (!PdfCtor) {
        throw new Error("jsPDF non disponibile");
      }

      const canvas = await html2canvas(certRef.current, {
        scale: Math.max(2, window.devicePixelRatio || 1),
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new PdfCtor({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`attestato-clarivio-${progress.userName?.replace(/\s+/g, "-").toLowerCase() || "studente"}.pdf`);
      setPdfState("idle");
    } catch (error) {
      console.error("Errore download PDF:", error);
      const detail = error instanceof Error ? error.message : "Errore sconosciuto";
      setPdfErrorDetail(detail);
      const opened = openBrowserPrintFallback();
      setPdfState(opened ? "fallback" : "error");
    }
  };

  const handlePrintPdf = () => {
    const opened = openBrowserPrintFallback();
    setPdfState(opened ? "fallback" : "error");
  };

  const handleSendEmail = async () => {
    if (!profile?.email) return;
    setEmailState("sending");
    try {
      const res = await fetch("/api/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: profile.nome,
          cognome: profile.cognome,
          email: profile.email,
          totalCredits: progress.totalCredits,
          completionDate,
          modules: modules.map((m) => ({
            title: m.title,
            score: progress.moduleScores[m.id]?.score ?? 0,
            maxCredits: m.maxCredits,
          })),
        }),
      });
      const data = await res.json();
      setEmailState(data.emailSent ? "sent" : "error");
    } catch {
      setEmailState("error");
    }
  };

  const maxTotalCredits = modules.reduce((sum, m) => sum + m.maxCredits, 0);
  const avgScore = Math.round((progress.totalCredits / maxTotalCredits) * 100);

  return (
    <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-2">
          <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Button>
          <div className="flex items-center gap-2">
            {profile?.email && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSendEmail}
                disabled={emailState === "sending" || emailState === "sent"}
              >
                {emailState === "sent" ? (
                  <><Check className="h-4 w-4 text-green-600" /> Inviato</>
                ) : emailState === "sending" ? (
                  <><Mail className="h-4 w-4 animate-pulse" /> Invio…</>
                ) : (
                  <><Mail className="h-4 w-4" /> Ricevi via email</>
                )}
              </Button>
            )}
            <Button size="sm" onClick={handleDownloadPDF} disabled={pdfState === "generating"}>
              <Download className={`h-4 w-4 ${pdfState === "generating" ? "animate-pulse" : ""}`} />
              {pdfState === "generating" ? "Generazione..." : "Scarica PDF"}
            </Button>
            <Button variant="ghost" size="sm" onClick={handlePrintPdf}>
              <Printer className="h-4 w-4" />
              Stampa / Salva PDF
            </Button>
          </div>
        </div>
        {pdfState === "error" && (
          <p className="text-sm text-red-600 text-center">
            Errore durante la generazione del PDF.
            {pdfErrorDetail ? ` Dettaglio: ${pdfErrorDetail}` : ""}
          </p>
        )}
        {pdfState === "fallback" && (
          <p className="text-sm text-amber-700 text-center">
            Generazione PDF diretta non riuscita: aperta la finestra di stampa per salvare in PDF.
            {pdfErrorDetail ? ` Dettaglio: ${pdfErrorDetail}` : ""}
          </p>
        )}

        {/* ─── CERTIFICATE ─── */}
        <div
          ref={certRef}
          className="relative overflow-hidden bg-white shadow-2xl"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {/* Top accent band */}
          <div className="h-3 w-full bg-gradient-to-r from-[#4f2ee8] via-[#7c5af6] to-[#4f2ee8]" />

          {/* Watermark background */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none flex items-center justify-center"
            aria-hidden
          >
            <img src="/logo/Logo_clarivio.svg" alt="" className="w-[600px]" />
          </div>

          {/* Corner ornaments */}
          <div className="absolute top-3 left-0 w-40 h-40 border-t-[3px] border-l-[3px] border-[#4f2ee8]/20" />
          <div className="absolute top-3 right-0 w-40 h-40 border-t-[3px] border-r-[3px] border-[#4f2ee8]/20" />
          <div className="absolute bottom-0 left-0 w-40 h-40 border-b-[3px] border-l-[3px] border-[#4f2ee8]/20" />
          <div className="absolute bottom-0 right-0 w-40 h-40 border-b-[3px] border-r-[3px] border-[#4f2ee8]/20" />

          <div className="relative px-10 sm:px-16 lg:px-24 py-10 sm:py-14">
            {/* Header row: logo + badge */}
            <div className="flex items-start justify-between mb-10">
              <img src="/logo/Logo_clarivio.svg" alt="Clarivio" className="h-8 sm:h-10 opacity-90" />
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-slate-400 font-medium">
                  Attestato Ufficiale
                </span>
                <span className="text-[10px] sm:text-xs text-slate-300 tabular-nums">
                  CL-{new Date().getFullYear()}-{String(progress.totalCredits).padStart(4, "0")}
                </span>
              </div>
            </div>

            {/* Main content */}
            <div className="text-center space-y-6 sm:space-y-8">
              {/* Award icon */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[#4f2ee8]/10 blur-xl scale-150" />
                  <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#4f2ee8]/10 to-[#7c5af6]/10 ring-2 ring-[#4f2ee8]/20">
                    <img src="/icons/trophy.png" alt="" className="h-12 w-12 sm:h-14 sm:w-14 object-contain" />
                  </div>
                </div>
              </div>

              {/* Heading */}
              <div className="space-y-1">
                <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-slate-400 font-medium">
                  Clarivio Learn certifica che
                </p>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mt-3"
                  style={{ fontFamily: "'Newsreader', serif", fontStyle: "italic" }}
                >
                  {progress.userName || `${profile?.nome} ${profile?.cognome}`}
                </h1>
              </div>

              {/* Divider with star */}
              <div className="flex items-center justify-center gap-4">
                <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-[#4f2ee8]/30" />
                <Award className="h-5 w-5 text-[#4f2ee8]/50" />
                <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-[#4f2ee8]/30" />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
                  ha completato con successo il percorso formativo
                </p>
                <p
                  className="text-2xl sm:text-3xl font-bold text-[#4f2ee8]"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  AI Generativa per Professionisti
                </p>
                <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed mt-2">
                  dimostrando piena padronanza degli strumenti, delle tecniche e delle applicazioni
                  dell&apos;intelligenza artificiale generativa nel contesto professionale.
                </p>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-4">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#4f2ee8]">{progress.totalCredits}</div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 mt-0.5">Crediti XP</div>
                </div>
                <div className="h-10 w-px bg-slate-200" />
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#4f2ee8]">{modules.length}</div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 mt-0.5">Moduli</div>
                </div>
                <div className="h-10 w-px bg-slate-200" />
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#4f2ee8]">{avgScore}%</div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 mt-0.5">Media</div>
                </div>
                <div className="h-10 w-px bg-slate-200" />
                <div className="text-center">
                  <div className="text-sm sm:text-base font-bold text-slate-700">{completionDate}</div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 mt-0.5">Data</div>
                </div>
              </div>

              {/* Module scores grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-2xl mx-auto">
                {modules.map((mod, i) => {
                  const sc = progress.moduleScores[mod.id];
                  const pct = sc ? Math.round((sc.score / sc.maxCredits) * 100) : 0;
                  return (
                    <div
                      key={mod.id}
                      className="flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-100 px-3 py-2"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#4f2ee8]/10 text-[#4f2ee8] text-[10px] font-bold">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-medium text-slate-700 truncate leading-tight">{mod.title}</p>
                        <p className="text-[10px] text-[#4f2ee8] font-bold">{pct}%</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Signature row */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 pt-4 border-t border-slate-100 mt-4">
                <div className="text-center">
                  <div
                    className="text-2xl sm:text-3xl text-slate-700 mb-1"
                    style={{ fontFamily: "'Newsreader', serif", fontStyle: "italic" }}
                  >
                    Fabrizio Dodaro
                  </div>
                  <div className="h-px w-40 bg-slate-200 mx-auto mb-1.5" />
                  <p className="text-[11px] uppercase tracking-wider text-slate-400">CEO &amp; Responsabile Formazione</p>
                  <p className="text-[10px] text-slate-300 mt-0.5">Clarivio Srl</p>
                </div>
                {/* Seal */}
                <div className="relative flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full border-2 border-dashed border-[#4f2ee8]/30 flex items-center justify-center">
                    <div className="h-14 w-14 rounded-full bg-[#4f2ee8]/5 border border-[#4f2ee8]/20 flex items-center justify-center">
                      <img src="/logo/Logo.png" alt="Sigillo Clarivio" className="h-8 w-8 object-contain opacity-60" />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="text-2xl sm:text-3xl text-slate-700 mb-1"
                    style={{ fontFamily: "'Newsreader', serif", fontStyle: "italic" }}
                  >
                    Clarivio Learn
                  </div>
                  <div className="h-px w-40 bg-slate-200 mx-auto mb-1.5" />
                  <p className="text-[11px] uppercase tracking-wider text-slate-400">Piattaforma Formativa Ufficiale</p>
                  <p className="text-[10px] text-slate-300 mt-0.5">learn.clarivio.it</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent band */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#4f2ee8]/30 via-[#4f2ee8] to-[#4f2ee8]/30" />

          {/* Legal footer inside certificate */}
          <div className="bg-slate-50 border-t border-slate-100 px-10 sm:px-16 lg:px-24 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="text-[10px] text-slate-400 text-center sm:text-left leading-relaxed">
              <span className="font-semibold text-slate-500">Clarivio Srl</span>
              {" · "}P.IVA IT03479880738
            </div>
            <div className="text-[10px] text-slate-400 text-center sm:text-right">
              <span className="tabular-nums">ID: CL-{new Date().getFullYear()}-{String(progress.totalCredits).padStart(4, "0")}</span>
              {" · "}Verificabile su <span className="text-[#4f2ee8]/70">learn.clarivio.it</span>
            </div>
          </div>
        </div>

        {/* Info under certificate */}
        <p className="text-center text-xs text-slate-400 pb-4">
          Attestato ufficiale rilasciato da <strong>Clarivio Srl</strong> — P.IVA IT03479880738 — Certificazione completamento percorso formativo su learn.clarivio.it
        </p>
      </div>
    </main>
  );
}

