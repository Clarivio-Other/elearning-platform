"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import { Module } from "@/types";
import { useLearning } from "@/context/LearningContext";
import { UNLOCK_THRESHOLD } from "@/data/modules";

interface ModuleCardProps {
  module: Module;
  index: number;
  isLast?: boolean;
}

export default function ModuleCard({ module, index, isLast = false }: ModuleCardProps) {
  const router = useRouter();
  const { isModuleUnlocked, isModuleCompleted, progress } = useLearning();

  const unlocked = isModuleUnlocked(module.id);
  const completed = isModuleCompleted(module.id);
  const score = progress.moduleScores[module.id];
  const percent = score ? Math.round((score.score / score.maxCredits) * 100) : 0;

  const handleClick = () => {
    if (unlocked) {
      router.push(`/modulo/${module.id}`);
    }
  };

  return (
    <div className="flex gap-3 sm:gap-4">
      {/* Step indicator with connecting line */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl text-sm font-bold transition-all
            ${completed
              ? "bg-viola-light text-viola-dark"
              : unlocked
                ? "bg-viola text-white"
                : "bg-surface-alt text-foreground-muted"
            }`}
        >
          {completed ? (
            <img src="/icons/award.png" alt="Completato" className="h-5 w-5 object-contain" />
          ) : (
            <span>{index + 1}</span>
          )}
        </div>
        {/* Connecting line */}
        {!isLast && (
          <div
            className={`w-0.5 flex-1 min-h-6 mt-1 rounded-full transition-colors
              ${completed ? "bg-success/40" : "bg-border"}`}
          />
        )}
      </div>

      {/* Card content */}
      <div
        onClick={handleClick}
        className={`flex-1 mb-3 rounded-2xl border p-4 sm:p-5 transition-all duration-300
          ${unlocked
            ? "border-border bg-white cursor-pointer hover:border-viola/40 hover:bg-surface-alt"
            : "border-border/50 bg-surface opacity-60"
          }
          ${completed ? "border-viola/30" : ""}
        `}
      >
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Module icon */}
          <div className="relative shrink-0">
            <img
              src={module.icon}
              alt={module.title}
              className={`h-11 w-11 sm:h-14 sm:w-14 object-contain ${!unlocked ? "opacity-30 grayscale" : ""}`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-foreground-muted uppercase tracking-wider">
                Modulo {index + 1}
              </span>
              {completed && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-viola-light text-viola-dark font-medium inline-flex items-center gap-1">
                  <img src="/icons/trophy.png" alt="" className="h-3 w-3 object-contain" />
                  {percent}%
                </span>
              )}
              {!unlocked && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-surface-alt text-foreground-muted font-medium inline-flex items-center gap-1">
                  <img src="/icons/shield.png" alt="" className="h-3 w-3 object-contain" />
                  Bloccato
                </span>
              )}
            </div>

            <h3 className={`mt-1 font-semibold text-base sm:text-lg leading-tight ${!unlocked ? "text-foreground-muted" : ""}`}>
              {module.title}
            </h3>

            <p className="mt-1 text-xs sm:text-sm text-foreground-muted line-clamp-2">
              {module.description}
            </p>

            {/* Score bar if completed */}
            {score && (
              <div className="mt-3">
                <ProgressBar
                  value={(score.score / score.maxCredits) * 100}
                  label={`${score.score}/${score.maxCredits} crediti`}
                  size="sm"
                />
              </div>
            )}

            {/* CTA hint for unlocked, not completed */}
            {unlocked && !completed && (
              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-viola-dark">
                <span>{score ? "Riprova il quiz" : "Inizia a studiare"}</span>
                <ChevronRight className="h-3 w-3" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
