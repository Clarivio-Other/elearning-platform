"use client";

import { useState } from "react";
import { Resource } from "@/types";
import Card from "@/components/ui/Card";

/* ── Thiings.co 3D icon mapping ── */
const thIcon = (name: string) => `/icons/thiings/${name}.png`;

/* ── Resource type config with thiings.co 3D icons ── */
const typeConfig: Record<
  Resource["type"],
  { label: string; color: string; bgColor: string; accentColor: string; icon: string }
> = {
  book: {
    label: "Libro",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    accentColor: "#d97706",
    icon: thIcon("book"),
  },
  pdf: {
    label: "PDF",
    color: "text-red-600",
    bgColor: "bg-red-50",
    accentColor: "#dc2626",
    icon: thIcon("novel"),
  },
  link: {
    label: "Link",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    accentColor: "#3b82f6",
    icon: thIcon("desktop"),
  },
  video: {
    label: "Video",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    accentColor: "#9333ea",
    icon: thIcon("video"),
  },
  tool: {
    label: "Tool",
    color: "text-green-600",
    bgColor: "bg-green-50",
    accentColor: "#16a34a",
    icon: thIcon("toolbox"),
  },
  doc: {
    label: "Documento",
    color: "text-slate-600",
    bgColor: "bg-slate-50",
    accentColor: "#64748b",
    icon: thIcon("open-book"),
  },
};

/* ── Filter pills ── */
const allTypes: Resource["type"][] = ["link", "tool", "video", "doc", "book", "pdf"];

interface ResourceViewerProps {
  resources: Resource[];
  moduleTitle?: string;
}

export default function ResourceViewer({
  resources,
  moduleTitle,
}: ResourceViewerProps) {
  const [activeFilter, setActiveFilter] = useState<Resource["type"] | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Which types actually exist
  const availableTypes = allTypes.filter((t) =>
    resources.some((r) => r.type === t),
  );

  // Filter resources
  const filtered = resources.filter((r) => {
    const matchesType = activeFilter === "all" || r.type === activeFilter;
    const matchesSearch =
      searchQuery === "" ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.author && r.author.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex items-center gap-4">
        <img src={thIcon("rocket")} alt="" className="w-12 h-12 object-contain shrink-0" />
        <div>
          <h2 className="text-lg sm:text-xl font-bold">Risorse e Materiali</h2>
          {moduleTitle && (
            <p className="text-sm text-foreground-muted mt-0.5">
              Materiale di approfondimento per <strong>{moduleTitle}</strong>
            </p>
          )}
        </div>
      </div>

      {/* ── Search + Filters ── */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative">
          <img
            src={thIcon("magnifier")}
            alt=""
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 object-contain opacity-50"
          />
          <input
            type="text"
            placeholder="Cerca risorse per titolo, autore, tag…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm placeholder:text-foreground-muted/60 focus:outline-none focus:ring-2 focus:ring-viola/30 focus:border-viola transition-all"
          />
        </div>

        {/* Type filter pills */}
        {availableTypes.length > 1 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeFilter === "all"
                  ? "bg-viola text-white shadow-sm"
                  : "bg-surface border border-border text-foreground-muted hover:border-viola/30"
              }`}
            >
              Tutti ({resources.length})
            </button>
            {availableTypes.map((type) => {
              const cfg = typeConfig[type];
              const count = resources.filter((r) => r.type === type).length;
              return (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeFilter === type
                      ? "bg-viola text-white shadow-sm"
                      : "bg-surface border border-border text-foreground-muted hover:border-viola/30"
                  }`}
                >
                  <img src={cfg.icon} alt="" className="w-4 h-4" />
                  {cfg.label} ({count})
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Resource List (full-width) ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-foreground-muted">
          <img src={thIcon("magnifier")} alt="" className="mx-auto mb-4 w-16 h-16 object-contain opacity-30" />
          <p className="text-sm">Nessuna risorsa trovata per questa ricerca.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}

      {/* ── Summary ── */}
      <div className="flex items-center justify-center gap-5 pt-4 border-t border-border">
        {availableTypes.map((type) => {
          const cfg = typeConfig[type];
          const count = resources.filter((r) => r.type === type).length;
          return (
            <div key={type} className="flex items-center gap-2 text-xs text-foreground-muted">
              <img src={cfg.icon} alt="" className="w-5 h-5 object-contain opacity-60" />
              <span>
                {count} {cfg.label.toLowerCase()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Individual Resource Card (full-width horizontal) ── */
function ResourceCard({ resource }: { resource: Resource }) {
  const cfg = typeConfig[resource.type];
  const hasExternalLink = resource.url;
  const hasDownload = resource.downloadUrl;
  const isActionable = hasExternalLink || hasDownload;

  const handleClick = () => {
    if (hasExternalLink) {
      window.open(resource.url, "_blank", "noopener,noreferrer");
    } else if (hasDownload) {
      const a = document.createElement("a");
      a.href = resource.downloadUrl!;
      a.download = resource.downloadUrl!.split("/").pop() || "risorsa";
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <Card
      className={`p-0 overflow-hidden transition-all group ${
        isActionable
          ? "cursor-pointer hover:border-viola/50 hover:shadow-lg hover:-translate-y-0.5"
          : ""
      }`}
      onClick={isActionable ? handleClick : undefined}
    >
      <div className="flex items-stretch">
        {/* Left accent bar */}
        <div className="w-1.5 shrink-0 rounded-l-xl" style={{ background: cfg.accentColor }} />

        <div className="flex-1 p-4 sm:p-5 flex items-center gap-4">
          {/* 3D Icon */}
          <div className="shrink-0">
            <img src={cfg.icon} alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Top row: badge + author */}
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span
                className={`inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md font-semibold ${cfg.bgColor} ${cfg.color}`}
              >
                {cfg.label}
              </span>
              {resource.author && (
                <span className="text-[11px] text-foreground-muted">
                  {resource.author}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="font-semibold text-sm sm:text-base leading-snug mb-1 group-hover:text-viola transition-colors">
              {resource.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed line-clamp-2 mb-2">
              {resource.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {resource.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-surface-alt text-foreground-muted border border-border/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action indicator */}
          {isActionable && (
            <div className="shrink-0 flex items-center">
              {hasExternalLink ? (
                <svg className="w-5 h-5 text-foreground-muted/40 group-hover:text-viola transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-foreground-muted/40 group-hover:text-viola transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
