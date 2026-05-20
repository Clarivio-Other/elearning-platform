"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight, ChevronLeft } from "lucide-react";
import { useLearning } from "@/context/LearningContext";
import { modules } from "@/data/modules";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ModuleContent from "@/components/Module/ModuleContent";
import Quiz from "@/components/Module/Quiz";
import ResourceViewer from "@/components/Module/ResourceViewer";
import GlossaryPanel from "@/components/Module/GlossaryPanel";

type Phase = "reading" | "resources" | "quiz";

/** Split raw markdown content into sections by ### headers. */
function splitContentSections(content: string): { title: string; body: string }[] {
  const parts = content.split(/(?=^### )/m);
  const sections: { title: string; body: string }[] = [];
  let intro = "";

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("### ")) {
      const firstNewline = trimmed.indexOf("\n");
      const title = firstNewline > 0 ? trimmed.slice(4, firstNewline).trim() : trimmed.slice(4).trim();
      const body = firstNewline > 0 ? trimmed.slice(firstNewline + 1).trim() : "";
      sections.push({ title, body });
    } else {
      intro += (intro ? "\n" : "") + trimmed;
    }
  }

  // If there's intro content before the first ###, prepend it as section 0
  if (intro) {
    sections.unshift({ title: "Introduzione", body: intro });
  }

  return sections;
}

export default function ModulePageClient() {
  const params = useParams();
  const router = useRouter();
  const { isModuleUnlocked } = useLearning();
  const [phase, setPhase] = useState<Phase>("reading");
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [slideDir, setSlideDir] = useState<"left" | "right">("right");

  const moduleId = params.id as string;
  const mod = modules.find((m) => m.id === moduleId);

  // Split content into sections
  const sections = useMemo(() => (mod ? splitContentSections(mod.content) : []), [mod]);

  // Reading progress based on current section
  const readProgress = sections.length > 0 ? ((currentSection + 1) / sections.length) * 100 : 0;

  const goToSection = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= sections.length) return;
      setSlideDir(idx > currentSection ? "right" : "left");
      setCurrentSection(idx);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [currentSection, sections.length],
  );

  // Reset section on phase change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [phase]);

  // Module not found
  if (!mod) {
    return (
      <main className="flex flex-1 items-center justify-center px-4">
        <Card className="p-8 text-center space-y-4">
          <h2 className="text-xl font-bold">Modulo non trovato</h2>
          <Button onClick={() => router.push("/")}>
            <ArrowLeft className="h-4 w-4" />
            Torna alla Dashboard
          </Button>
        </Card>
      </main>
    );
  }

  // Module locked
  if (!isModuleUnlocked(mod.id)) {
    return (
      <main className="flex flex-1 items-center justify-center px-4">
        <Card className="p-8 text-center space-y-4 max-w-md">
          <h2 className="text-xl font-bold">Modulo Bloccato</h2>
          <p className="text-foreground-muted">
            Completa il modulo precedente con almeno l&apos;80% dei crediti per sbloccare questo modulo.
          </p>
          <Button onClick={() => router.push("/")}>
            <ArrowLeft className="h-4 w-4" />
            Torna alla Dashboard
          </Button>
        </Card>
      </main>
    );
  }

  const moduleIndex = modules.findIndex((m) => m.id === moduleId);

  // Full module content (all sections joined) for module-wide glossary
  const fullModuleContent = sections.map((s) => s.body).join(" ");

  return (
    <>
      {/* Dynamic Glossary Panel — visible during reading phase */}
      {phase === "reading" && (
        <GlossaryPanel
          content={sections[currentSection]?.body ?? ""}
          fullContent={fullModuleContent}
        />
      )}

      {/* Fixed reading progress bar at top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-surface-alt">
        <div
          className="h-full bg-gradient-to-r from-viola to-viola-light transition-[width] duration-300 ease-out"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <main className="flex-1 px-4 py-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-4xl">
          {/* Sticky header */}
          <div className="sticky top-1 z-40 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10 pb-3 pt-2 bg-white/80 backdrop-blur-md border-b border-transparent"
            style={{ borderColor: readProgress > 5 ? 'var(--color-border)' : 'transparent' }}
          >
            <div className="mx-auto max-w-4xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => router.push("/")}
                  className="flex items-center gap-1 text-foreground-muted hover:text-viola text-sm transition-colors cursor-pointer shrink-0"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </button>
                <ChevronRight className="h-3 w-3 text-foreground-muted/50 shrink-0" />
                <div className="flex items-center gap-2 min-w-0">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-viola/10 text-viola text-xs font-bold">
                    {moduleIndex + 1}
                  </span>
                  <span className="font-semibold text-sm truncate">{mod.title}</span>
                </div>
              </div>

              {/* Phase toggle */}
              <div className="flex bg-surface rounded-xl p-1 shrink-0">
                <button
                  onClick={() => setPhase("reading")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer
                    ${phase === "reading" ? "bg-viola text-white shadow-sm" : "text-foreground-muted hover:text-foreground"}`}
                >
                  <img src="/icons/computer.png" alt="" className="h-3.5 w-3.5 object-contain" />
                  <span className="hidden sm:inline">Contenuto</span>
                </button>
                <button
                  onClick={() => setPhase("resources")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer
                    ${phase === "resources" ? "bg-viola text-white shadow-sm" : "text-foreground-muted hover:text-foreground"}`}
                >
                  <img src="/icons/pen.png" alt="" className="h-3.5 w-3.5 object-contain" />
                  <span className="hidden sm:inline">Risorse</span>
                  {mod.resources.length > 0 && (
                    <span className={`ml-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold ${
                      phase === "resources" ? "bg-white/20" : "bg-viola/10 text-viola"
                    }`}>
                      {mod.resources.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setPhase("quiz")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer
                    ${phase === "quiz" ? "bg-viola text-white shadow-sm" : "text-foreground-muted hover:text-foreground"}`}
                >
                  <img src="/icons/brain.png" alt="" className="h-3.5 w-3.5 object-contain" />
                  <span className="hidden sm:inline">Quiz</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content area — horizontal section slider */}
          {phase === "reading" ? (
            <div ref={contentRef} className="py-6 sm:py-8 lg:py-10">
              {/* Module title block — always visible */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <img src={mod.icon} alt="" className="h-10 w-10 sm:h-12 sm:w-12 object-contain" />
                  <div>
                    <span className="text-xs font-medium text-viola uppercase tracking-wider">
                      Modulo {moduleIndex + 1} di {modules.length}
                    </span>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                      {mod.title}
                    </h1>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-foreground-muted max-w-2xl">
                  {mod.description}
                </p>
              </div>

              {/* ── Horizontal Agenda Stepper ── */}
              {sections.length > 1 && (
                <div className="mb-8 rounded-2xl border border-border bg-surface/50 p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <img src="/icons/pen.png" alt="" className="h-4 w-4 object-contain" />
                    <h2 className="text-sm font-semibold">Agenda del modulo</h2>
                    <span className="text-[10px] text-foreground-muted ml-1">
                      {currentSection + 1} / {sections.length}
                    </span>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {sections.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goToSection(i)}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 cursor-pointer ${
                          i <= currentSection
                            ? "bg-viola"
                            : "bg-border hover:bg-viola/30"
                        }`}
                        title={sections[i].title}
                      />
                    ))}
                  </div>
                  <div className="overflow-x-auto scrollbar-hide -mx-1 px-1">
                    <div className="flex gap-2 min-w-max">
                      {sections.map((sec, i) => (
                        <button
                          key={i}
                          onClick={() => goToSection(i)}
                          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all cursor-pointer whitespace-nowrap border ${
                            i === currentSection
                              ? "bg-viola text-white border-viola shadow-sm"
                              : i < currentSection
                                ? "bg-viola/10 text-viola border-viola/20"
                                : "bg-white text-foreground-muted border-border hover:border-viola/30"
                          }`}
                        >
                          <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded text-[9px] font-bold ${
                            i === currentSection
                              ? "bg-white/20"
                              : i < currentSection
                                ? "bg-viola/20"
                                : "bg-surface-alt"
                          }`}>
                            {i + 1}
                          </span>
                          {sec.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Section Content with slide animation ── */}
              <div className="relative overflow-hidden">
                <div
                  key={currentSection}
                  className={`animate-slide-in ${slideDir === "right" ? "slide-from-right" : "slide-from-left"}`}
                >
                  {/* Section header */}
                  <div className="flex items-start gap-3 mb-6">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-viola/10 text-viola text-sm font-bold">
                      {currentSection + 1}
                    </span>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground leading-snug pt-0.5">
                      {sections[currentSection]?.title}
                    </h3>
                  </div>

                  {/* Section body rendered through ModuleContent */}
                  {sections[currentSection]?.body && (
                    <ModuleContent content={sections[currentSection].body} />
                  )}
                </div>
              </div>

              {/* ── Navigation Buttons ── */}
              <div className="mt-10 pt-6 border-t border-border flex items-center justify-between gap-4">
                <Button
                  onClick={() => goToSection(currentSection - 1)}
                  variant="secondary"
                  className={currentSection === 0 ? "invisible" : ""}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Precedente</span>
                </Button>

                <span className="text-xs text-foreground-muted">
                  {currentSection + 1} / {sections.length}
                </span>

                {currentSection < sections.length - 1 ? (
                  <Button onClick={() => goToSection(currentSection + 1)}>
                    <span className="hidden sm:inline">Successivo</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={() => setPhase("quiz")}>
                    <img src="/icons/brain.png" alt="" className="h-4 w-4 object-contain" />
                    Inizia il Quiz
                  </Button>
                )}
              </div>
            </div>
          ) : phase === "resources" ? (
            <div className="py-6 sm:py-8">
              <Card className="p-4 sm:p-6 lg:p-8">
                <ResourceViewer
                  resources={mod.resources}
                  moduleTitle={mod.title}
                />
              </Card>
            </div>
          ) : (
            <div className="py-6 sm:py-8">
              <Card className="p-4 sm:p-6 lg:p-8">
                <Quiz
                  moduleId={mod.id}
                  questions={mod.quiz}
                  maxCredits={mod.maxCredits}
                />
              </Card>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
