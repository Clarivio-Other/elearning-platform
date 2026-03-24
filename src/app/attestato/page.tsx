"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import { useLearning } from "@/context/LearningContext";
import { modules } from "@/data/modules";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function CertificatePage() {
  const router = useRouter();
  const { progress, allModulesCompleted, completionDate } = useLearning();
  const certRef = useRef<HTMLDivElement>(null);

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

    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    const canvas = await html2canvas(certRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`attestato-${progress.userName || "studente"}.pdf`);
  };

  return (
    <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between gap-2">
          <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Button>
          <Button size="sm" onClick={handleDownloadPDF}>
            <Download className="h-4 w-4" />
            Scarica PDF
          </Button>
        </div>

        {/* Certificate */}
        <div
          ref={certRef}
          className="relative overflow-hidden rounded-2xl border-2 border-viola/30 bg-white p-6 sm:p-8 lg:p-12 shadow-lg"
        >
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 h-24 w-24 border-t-4 border-l-4 border-viola rounded-tl-2xl" />
          <div className="absolute top-0 right-0 h-24 w-24 border-t-4 border-r-4 border-viola rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 h-24 w-24 border-b-4 border-l-4 border-viola rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 h-24 w-24 border-b-4 border-r-4 border-viola rounded-br-2xl" />

          {/* Content */}
          <div className="relative text-center space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full">
                <img src="/icons/trophy.png" alt="Attestato" className="h-16 w-16 sm:h-20 sm:w-20 object-contain" />
              </div>
            </div>

            {/* Title */}
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-foreground-muted">
                Attestato di
              </p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-bold bg-gradient-to-r from-viola to-viola-light bg-clip-text text-transparent">
                Fine Percorso
              </h1>
            </div>

            {/* Divider */}
            <div className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-viola to-transparent" />

            {/* Conferito a */}
            <div>
              <p className="text-sm text-foreground-muted">
                Conferito a
              </p>
              <p className="mt-2 text-2xl sm:text-3xl font-bold italic" style={{ fontFamily: "'Newsreader', serif" }}>
                {progress.userName || "Studente"}
              </p>
            </div>

            {/* Description */}
            <p className="mx-auto max-w-lg text-foreground-muted">
              Per aver completato con successo tutti i moduli del percorso formativo
              della piattaforma LearnUp, dimostrando impegno e competenza.
            </p>

            {/* Modules completed */}
            <div className="mx-auto max-w-md space-y-2">
              {modules.map((mod) => {
                const score = progress.moduleScores[mod.id];
                return (
                  <div
                    key={mod.id}
                    className="flex items-center justify-between rounded-xl bg-surface px-4 py-2 text-sm"
                  >
                    <span>{mod.title}</span>
                    <span className="font-semibold text-viola">
                      {score ? `${score.score}/${score.maxCredits}` : "-"}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Total & date */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
              <div>
                <span className="text-foreground-muted">Crediti totali: </span>
                <span className="font-bold text-viola">
                  {progress.totalCredits}
                </span>
              </div>
              <div>
                <span className="text-foreground-muted">Data: </span>
                <span className="font-bold">{completionDate}</span>
              </div>
            </div>

            {/* Platform name */}
            <p className="text-xs text-foreground-muted tracking-widest uppercase">
              LearnUp — Piattaforma E-Learning
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
