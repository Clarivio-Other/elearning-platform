"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { UserProgress } from "@/types";
import type { ActivityEntry } from "@/types";
import { modules, UNLOCK_THRESHOLD } from "@/data/modules";
import {
  loadProgress,
  saveProgress,
  resetProgress as resetStorage,
} from "@/lib/storage";

interface LearningContextValue {
  progress: UserProgress;
  isModuleUnlocked: (moduleId: string) => boolean;
  isModuleCompleted: (moduleId: string) => boolean;
  submitQuiz: (moduleId: string, answers: number[]) => number;
  setUserName: (name: string) => void;
  reset: () => void;
  allModulesCompleted: boolean;
  completionDate: string | null;
}

const LearningContext = createContext<LearningContextValue | null>(null);

export function LearningProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  // Persist every change
  useEffect(() => {
    if (progress) saveProgress(progress);
  }, [progress]);

  const isModuleUnlocked = useCallback(
    (moduleId: string): boolean => {
      if (!progress) return false;
      const idx = modules.findIndex((m) => m.id === moduleId);
      if (idx === 0) return true; // primo modulo sempre sbloccato
      const prev = modules[idx - 1];
      const prevScore = progress.moduleScores[prev.id];
      if (!prevScore) return false;
      return prevScore.score >= prev.maxCredits * UNLOCK_THRESHOLD;
    },
    [progress]
  );

  const isModuleCompleted = useCallback(
    (moduleId: string): boolean => {
      if (!progress) return false;
      return !!progress.moduleScores[moduleId];
    },
    [progress]
  );

  const submitQuiz = useCallback(
    (moduleId: string, answers: number[]): number => {
      const mod = modules.find((m) => m.id === moduleId);
      if (!mod || !progress) return 0;

      let score = 0;
      mod.quiz.forEach((q, i) => {
        if (answers[i] === q.correctIndex) {
          score += q.credits;
        }
      });

      setProgress((prev) => {
        if (!prev) return prev;

        // Keep best score
        const existing = prev.moduleScores[moduleId];
        if (existing && existing.score >= score) return prev;

        const newModuleScores = {
          ...prev.moduleScores,
          [moduleId]: {
            score,
            maxCredits: mod.maxCredits,
            completedAt: new Date().toISOString(),
          },
        };

        const totalCredits = Object.values(newModuleScores).reduce(
          (sum, s) => sum + s.score,
          0
        );

        // Badge logic
        const newBadges = prev.badges.map((b) => ({ ...b }));
        const now = new Date().toISOString();

        // "Primo Passo" — first module completed
        const completedCount = Object.keys(newModuleScores).length;
        const firstStep = newBadges.find((b) => b.id === "first-step");
        if (firstStep && !firstStep.unlockedAt && completedCount >= 1) {
          firstStep.unlockedAt = now;
        }

        // "Studente Modello" — perfect score on any quiz
        const perfectScore = newBadges.find((b) => b.id === "perfect-score");
        if (perfectScore && !perfectScore.unlockedAt && score === mod.maxCredits) {
          perfectScore.unlockedAt = now;
        }

        // "A Metà Strada" — at least 3 modules completed
        const halfWay = newBadges.find((b) => b.id === "half-way");
        if (halfWay && !halfWay.unlockedAt && completedCount >= 3) {
          halfWay.unlockedAt = now;
        }

        // "Maestro del Prompt" — completed modules 3 and 4 (prompt engineering)
        const promptMaster = newBadges.find((b) => b.id === "prompt-master");
        if (
          promptMaster &&
          !promptMaster.unlockedAt &&
          newModuleScores["modulo-3"] &&
          newModuleScores["modulo-4"]
        ) {
          promptMaster.unlockedAt = now;
        }

        // "Percorso Completo" — all modules completed
        const allComplete = newBadges.find((b) => b.id === "all-complete");
        if (
          allComplete &&
          !allComplete.unlockedAt &&
          completedCount === modules.length
        ) {
          allComplete.unlockedAt = now;
        }

        // ── Streak tracking ──
        const today = new Date().toISOString().slice(0, 10);
        let newStreak = prev.streak;
        if (prev.lastActivityDate !== today) {
          const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
          newStreak = prev.lastActivityDate === yesterday ? prev.streak + 1 : 1;
        }

        // ── Activity log ──
        const newLog: ActivityEntry[] = [...prev.activityLog];
        const modTitle = mod.title;
        const pct = Math.round((score / mod.maxCredits) * 100);
        newLog.unshift({ type: "quiz_completed", message: `Quiz "${modTitle}" completato — ${score}/${mod.maxCredits} XP (${pct}%)`, timestamp: now });

        // Level up?
        const prevLevel = Math.floor(prev.totalCredits / 50) + 1;
        const newLevel = Math.floor(totalCredits / 50) + 1;
        if (newLevel > prevLevel) {
          newLog.unshift({ type: "level_up", message: `Nuovo livello raggiunto: Lv.${newLevel}!`, timestamp: now });
        }

        // Badge unlocked logs
        newBadges.forEach((b) => {
          const wasBefore = prev.badges.find((pb) => pb.id === b.id);
          if (b.unlockedAt && (!wasBefore || !wasBefore.unlockedAt)) {
            newLog.unshift({ type: "badge_unlocked", message: `Badge sbloccato: "${b.title}"`, timestamp: now });
          }
        });

        // Keep log to last 30 entries
        if (newLog.length > 30) newLog.length = 30;

        return {
          ...prev,
          moduleScores: newModuleScores,
          totalCredits,
          badges: newBadges,
          streak: newStreak,
          lastActivityDate: today,
          activityLog: newLog,
        };
      });

      return score;
    },
    [progress]
  );

  const setUserName = useCallback((name: string) => {
    setProgress((prev) => (prev ? { ...prev, userName: name } : prev));
  }, []);

  const reset = useCallback(() => {
    setProgress(resetStorage());
  }, []);

  const allModulesCompleted = progress
    ? modules.every((m) => !!progress.moduleScores[m.id])
    : false;

  const completionDate = (() => {
    if (!progress || !allModulesCompleted) return null;
    const dates = Object.values(progress.moduleScores).map(
      (s) => new Date(s.completedAt)
    );
    return new Date(Math.max(...dates.map((d) => d.getTime()))).toLocaleDateString(
      "it-IT",
      { year: "numeric", month: "long", day: "numeric" }
    );
  })();

  // Render nothing until hydrated
  if (!progress) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-viola border-t-transparent" />
      </div>
    );
  }

  return (
    <LearningContext.Provider
      value={{
        progress,
        isModuleUnlocked,
        isModuleCompleted,
        submitQuiz,
        setUserName,
        reset,
        allModulesCompleted,
        completionDate,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning(): LearningContextValue {
  const ctx = useContext(LearningContext);
  if (!ctx) throw new Error("useLearning must be used within LearningProvider");
  return ctx;
}
