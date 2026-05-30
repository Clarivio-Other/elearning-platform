"use client";

import { useState, useEffect } from "react";
import { Lightbulb, X } from "lucide-react";
import { type GlossaryTerm, findTermsInContent, glossary } from "@/data/glossary";

const CATEGORY_LABELS: Record<GlossaryTerm["category"], string> = {
  fondamenti: "Fondamenti",
  modelli: "Modelli",
  prompt: "Prompt",
  tecnica: "Tecnica",
  applicazioni: "Applicazioni",
};

const CATEGORY_COLORS: Record<GlossaryTerm["category"], string> = {
  fondamenti: "bg-surface-alt text-foreground-muted border-border",
  modelli: "bg-surface-alt text-foreground-muted border-border",
  prompt: "bg-surface-alt text-foreground-muted border-border",
  tecnica: "bg-surface-alt text-foreground-muted border-border",
  applicazioni: "bg-surface-alt text-foreground-muted border-border",
};

interface GlossaryPanelProps {
  /** Full text content of the current section/module to scan for terms */
  content: string;
  /** If true, scans the full module content (all sections); otherwise current section only */
  fullContent?: string;
}

export default function GlossaryPanel({ content, fullContent }: GlossaryPanelProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Terms found in the current section
  const sectionTerms = findTermsInContent(content);
  // Terms found anywhere in the full module (for "Tutti i termini del modulo")
  const moduleTerms = fullContent ? findTermsInContent(fullContent) : sectionTerms;

  const activeTerms = showAll ? moduleTerms : sectionTerms;

  const filtered = search.trim()
    ? activeTerms.filter(
        (t) =>
          t.term.toLowerCase().includes(search.toLowerCase()) ||
          t.definition.toLowerCase().includes(search.toLowerCase()),
      )
    : activeTerms;

  const count = sectionTerms.length;

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Reset showAll when section content changes
  useEffect(() => {
    setShowAll(false);
    setSearch("");
  }, [content]);

  return (
    <>
      {/* ── Floating Lightbulb Button ── */}
      <button
        onClick={() => setOpen(true)}
        title="Glossario — parole chiave di questa sezione"
        className={`
          fixed bottom-6 right-6 z-40
          flex items-center gap-2
          rounded-full px-4 py-3 border border-border
          transition-all duration-200
          ${count > 0
            ? "bg-viola text-white hover:bg-viola-dark hover:scale-105"
            : "bg-white border border-border text-foreground-muted hover:bg-surface hover:scale-105"}
        `}
      >
        <Lightbulb className={`h-5 w-5 ${count > 0 ? "fill-white/30" : ""}`} />
        {count > 0 && (
          <span className="text-sm font-bold leading-none">{count}</span>
        )}
      </button>

      {/* ── Backdrop ── */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/20"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Slide-in Panel ── */}
      <div
        className={`
          fixed right-0 top-0 bottom-0 z-50
          w-full max-w-sm bg-white border-l border-border
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border bg-surface-alt">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-viola" />
            <h2 className="font-bold text-base text-foreground">Glossario</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg hover:bg-surface text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Toggle: sezione corrente vs tutto il modulo */}
        <div className="px-5 pt-4 pb-2 flex items-center gap-2">
          <button
            onClick={() => setShowAll(false)}
            className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all ${
              !showAll ? "bg-viola text-white" : "bg-surface text-foreground-muted hover:bg-surface-alt"
            }`}
          >
            Questa sezione ({sectionTerms.length})
          </button>
          <button
            onClick={() => setShowAll(true)}
            className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all ${
              showAll ? "bg-viola text-white" : "bg-surface text-foreground-muted hover:bg-surface-alt"
            }`}
          >
            Tutto il modulo ({moduleTerms.length})
          </button>
        </div>

        {/* Search */}
        <div className="px-5 pb-3">
          <input
            type="text"
            placeholder="Cerca un termine…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm placeholder:text-foreground-muted/60 focus:outline-none focus:ring-2 focus:ring-viola/20 focus:border-viola transition-all"
          />
        </div>

        {/* Terms list */}
        <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-3">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Lightbulb className="h-10 w-10 text-foreground-muted/30 mb-3" />
              <p className="text-sm text-foreground-muted font-medium">
                {search ? "Nessun termine trovato" : "Nessun termine chiave in questa sezione"}
              </p>
              {!search && !showAll && moduleTerms.length > 0 && (
                <button
                  onClick={() => setShowAll(true)}
                  className="mt-3 text-xs text-viola hover:underline"
                >
                  Mostra tutti i termini del modulo →
                </button>
              )}
            </div>
          ) : (
            filtered.map((t) => (
              <div
                key={t.term}
                className="rounded-2xl border border-border bg-white p-4 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm text-foreground leading-snug">{t.term}</h3>
                  <span
                    className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[t.category]}`}
                  >
                    {CATEGORY_LABELS[t.category]}
                  </span>
                </div>
                {t.aliases && t.aliases.length > 0 && (
                  <p className="text-[11px] text-foreground-muted/70 italic">
                    Anche: {t.aliases.slice(0, 3).join(", ")}
                  </p>
                )}
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  {t.definition}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-5 py-3 bg-surface/50">
          <p className="text-[11px] text-foreground-muted text-center">
            {glossary.length} termini nel glossario completo
          </p>
        </div>
      </div>
    </>
  );
}
