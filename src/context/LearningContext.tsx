"use client";

import {
  createContext, useContext, useState, useEffect, useCallback, type ReactNode,
} from "react";
import { UserProgress } from "@/types";
import { modules, UNLOCK_THRESHOLD } from "@/data/modules";
import { loadProgress as loadLocalProgress, saveProgress as saveLocalProgress, resetProgress as resetLocalStorage } from "@/lib/storage";
import { apiLoadProgress, apiSubmitQuiz, apiResetProgress, getToken } from "@/lib/api-client";

interface LearningContextValue {
  progress: UserProgress;
  isModuleUnlocked: (moduleId: string) => boolean;
  isModuleCompleted: (moduleId: string) => boolean;
  submitQuiz: (moduleId: string, answers: number[]) => Promise<number>;
  setUserName: (name: string) => void;
  reset: () => void;
  allModulesCompleted: boolean;
  completionDate: string | null;
}

const LearningContext = createContext<LearningContextValue | null>(null);

export function LearningProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      apiLoadProgress()
        .then((res) => { setProgress(res.progress); saveLocalProgress(res.progress); })
        .catch(() => { setProgress(loadLocalProgress()); });
    } else {
      setProgress(loadLocalProgress());
    }
  }, []);

  useEffect(() => { if (progress) saveLocalProgress(progress); }, [progress]);

  const isModuleUnlocked = useCallback((moduleId: string): boolean => {
    if (!progress) return false;
    const idx = modules.findIndex((m) => m.id === moduleId);
    if (idx === 0) return true;
    const prev = modules[idx - 1];
    const prevScore = progress.moduleScores[prev.id];
    if (!prevScore) return false;
    return prevScore.score >= prev.maxCredits * UNLOCK_THRESHOLD;
  }, [progress]);

  const isModuleCompleted = useCallback((moduleId: string): boolean => {
    if (!progress) return false;
    return !!progress.moduleScores[moduleId];
  }, [progress]);

  const submitQuiz = useCallback(async (moduleId: string, answers: number[]): Promise<number> => {
    const token = getToken();
    if (token) {
      try {
        const res = await apiSubmitQuiz(moduleId, answers);
        setProgress(res.progress);
        return res.score;
      } catch (err) { console.error("Errore submit quiz via API:", err); }
    }
    const mod = modules.find((m) => m.id === moduleId);
    if (!mod || !progress) return 0;
    let score = 0;
    mod.quiz.forEach((q, i) => { if (answers[i] === q.correctIndex) score += q.credits; });
    setProgress((prev) => {
      if (!prev) return prev;
      const existing = prev.moduleScores[moduleId];
      if (existing && existing.score >= score) return prev;
      const newModuleScores = { ...prev.moduleScores, [moduleId]: { score, maxCredits: mod.maxCredits, completedAt: new Date().toISOString() } };
      const totalCredits = Object.values(newModuleScores).reduce((sum, s) => sum + s.score, 0);
      const newBadges = prev.badges.map((b) => ({ ...b }));
      const now = new Date().toISOString();
      const completedCount = Object.keys(newModuleScores).length;
      const fs = newBadges.find((b) => b.id === "first-step");
      if (fs && !fs.unlockedAt && completedCount >= 1) fs.unlockedAt = now;
      const ps = newBadges.find((b) => b.id === "perfect-score");
      if (ps && !ps.unlockedAt && score === mod.maxCredits) ps.unlockedAt = now;
      const hw = newBadges.find((b) => b.id === "half-way");
      if (hw && !hw.unlockedAt && completedCount >= 3) hw.unlockedAt = now;
      const pm = newBadges.find((b) => b.id === "prompt-master");
      if (pm && !pm.unlockedAt && newModuleScores["modulo-3"] && newModuleScores["modulo-4"]) pm.unlockedAt = now;
      const ac = newBadges.find((b) => b.id === "all-complete");
      if (ac && !ac.unlockedAt && completedCount === modules.length) ac.unlockedAt = now;
      const today = new Date().toISOString().slice(0, 10);
      let newStreak = prev.streak;
      if (prev.lastActivityDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        newStreak = prev.lastActivityDate === yesterday ? prev.streak + 1 : 1;
      }
      const newLog = [...prev.activityLog];
      const pct = Math.round((score / mod.maxCredits) * 100);
      newLog.unshift({ type: "quiz_completed", message: "Quiz completato - " + score + "/" + mod.maxCredits + " XP (" + pct + "%)", timestamp: now });
      const prevLevel = Math.floor(prev.totalCredits / 50) + 1;
      const newLevel = Math.floor(totalCredits / 50) + 1;
      if (newLevel > prevLevel) newLog.unshift({ type: "level_up", message: "Nuovo livello raggiunto: Lv." + newLevel + "!", timestamp: now });
      newBadges.forEach((b) => { const wb = prev.badges.find((pb) => pb.id === b.id); if (b.unlockedAt && (!wb || !wb.unlockedAt)) newLog.unshift({ type: "badge_unlocked", message: "Badge sbloccato: " + b.title, timestamp: now }); });
      if (newLog.length > 30) newLog.length = 30;
      return { ...prev, moduleScores: newModuleScores, totalCredits, badges: newBadges, streak: newStreak, lastActivityDate: today, activityLog: newLog };
    });
    return score;
  }, [progress]);

  const setUserName = useCallback((name: string) => { setProgress((prev) => (prev ? { ...prev, userName: name } : prev)); }, []);
  const reset = useCallback(() => { const token = getToken(); if (token) apiResetProgress().catch(console.error); setProgress(resetLocalStorage()); }, []);

  const allModulesCompleted = progress ? modules.every((m) => !!progress.moduleScores[m.id]) : false;
  const completionDate = (() => {
    if (!progress || !allModulesCompleted) return null;
    const dates = Object.values(progress.moduleScores).map((s) => new Date(s.completedAt));
    return new Date(Math.max(...dates.map((d) => d.getTime()))).toLocaleDateString("it-IT", { year: "numeric", month: "long", day: "numeric" });
  })();

  if (!progress) return (<div className="flex min-h-screen items-center justify-center bg-white"><div className="h-8 w-8 animate-spin rounded-full border-4 border-viola border-t-transparent" /></div>);

  return (<LearningContext.Provider value={{ progress, isModuleUnlocked, isModuleCompleted, submitQuiz, setUserName, reset, allModulesCompleted, completionDate }}>{children}</LearningContext.Provider>);
}

export function useLearning(): LearningContextValue {
  const ctx = useContext(LearningContext);
  if (!ctx) throw new Error("useLearning must be used within LearningProvider");
  return ctx;
}