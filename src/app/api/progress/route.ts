import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";
import { initialBadges, modules, UNLOCK_THRESHOLD } from "@/data/modules";

/** GET /api/progress — Carica i progressi dell'utente */
export async function GET(req: NextRequest) {
  try {
    const payload = getUserFromRequest(req);
    if (!payload) {
      return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        moduleProgress: true,
        badges: true,
        activityLog: {
          orderBy: { timestamp: "desc" },
          take: 30,
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });
    }

    // Ricostruisci moduleScores nel formato atteso dal frontend
    const moduleScores: Record<string, { score: number; maxCredits: number; completedAt: string }> = {};
    for (const mp of user.moduleProgress) {
      moduleScores[mp.moduleId] = {
        score: mp.bestScore,
        maxCredits: mp.maxCredits,
        completedAt: mp.completedAt.toISOString(),
      };
    }

    // Ricostruisci i badge nel formato atteso
    const unlockedBadgeIds = new Set(user.badges.map((b) => b.badgeId));
    const badges = initialBadges.map((def) => ({
      ...def,
      unlockedAt: unlockedBadgeIds.has(def.id)
        ? user.badges.find((b) => b.badgeId === def.id)!.unlockedAt.toISOString()
        : null,
    }));

    // Ricostruisci activity log
    const activityLog = user.activityLog.map((a) => ({
      type: a.type as "quiz_completed" | "badge_unlocked" | "level_up" | "streak",
      message: a.message,
      timestamp: a.timestamp.toISOString(),
    }));

    return NextResponse.json({
      progress: {
        userName: `${user.nome} ${user.cognome}`,
        totalCredits: user.totalCredits,
        moduleScores,
        badges,
        streak: user.streak,
        lastActivityDate: user.lastActivityDate,
        activityLog,
      },
    });
  } catch (error) {
    console.error("Load progress error:", error);
    return NextResponse.json(
      { error: "Errore interno del server" },
      { status: 500 }
    );
  }
}

/** POST /api/progress — Salva il risultato di un quiz */
export async function POST(req: NextRequest) {
  try {
    const payload = getUserFromRequest(req);
    if (!payload) {
      return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
    }

    const body = await req.json();
    const { moduleId, answers } = body;

    if (!moduleId || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: "moduleId e answers sono obbligatori" },
        { status: 400 }
      );
    }

    const mod = modules.find((m) => m.id === moduleId);
    if (!mod) {
      return NextResponse.json({ error: "Modulo non trovato" }, { status: 404 });
    }

    // Verifica che il modulo sia sbloccato
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { moduleProgress: true, badges: true },
    });

    if (!user) {
      return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });
    }

    const modIdx = modules.findIndex((m) => m.id === moduleId);
    if (modIdx > 0) {
      const prevMod = modules[modIdx - 1];
      const prevProgress = user.moduleProgress.find((p) => p.moduleId === prevMod.id);
      if (!prevProgress || prevProgress.bestScore < prevMod.maxCredits * UNLOCK_THRESHOLD) {
        return NextResponse.json(
          { error: "Modulo non sbloccato" },
          { status: 403 }
        );
      }
    }

    // Calcola score
    let score = 0;
    mod.quiz.forEach((q, i) => {
      if (answers[i] === q.correctIndex) {
        score += q.credits;
      }
    });

    // Salva best score (upsert)
    const existingProgress = user.moduleProgress.find((p) => p.moduleId === moduleId);
    const isBetterScore = !existingProgress || score > existingProgress.bestScore;

    if (isBetterScore) {
      await prisma.moduleProgress.upsert({
        where: {
          userId_moduleId: { userId: user.id, moduleId },
        },
        update: {
          bestScore: score,
          completedAt: new Date(),
        },
        create: {
          userId: user.id,
          moduleId,
          bestScore: score,
          maxCredits: mod.maxCredits,
        },
      });
    }

    // Ricalcola totalCredits
    const allProgress = await prisma.moduleProgress.findMany({
      where: { userId: user.id },
    });
    const totalCredits = allProgress.reduce((sum, p) => sum + p.bestScore, 0);

    // Badge logic
    const completedCount = allProgress.length;
    const existingBadgeIds = new Set(user.badges.map((b) => b.badgeId));
    const newBadges: string[] = [];

    // "Primo Passo" — first module completed
    if (!existingBadgeIds.has("first-step") && completedCount >= 1) {
      newBadges.push("first-step");
    }
    // "Studente Modello" — perfect score
    if (!existingBadgeIds.has("perfect-score") && score === mod.maxCredits) {
      newBadges.push("perfect-score");
    }
    // "A Metà Strada" — 3+ modules
    if (!existingBadgeIds.has("half-way") && completedCount >= 3) {
      newBadges.push("half-way");
    }
    // "Maestro del Prompt" — modules 3 and 4
    if (
      !existingBadgeIds.has("prompt-master") &&
      allProgress.some((p) => p.moduleId === "modulo-3") &&
      allProgress.some((p) => p.moduleId === "modulo-4")
    ) {
      newBadges.push("prompt-master");
    }
    // "Percorso Completo" — all modules
    if (!existingBadgeIds.has("all-complete") && completedCount === modules.length) {
      newBadges.push("all-complete");
    }

    // Salva nuovi badge
    if (newBadges.length > 0) {
      await prisma.userBadge.createMany({
        data: newBadges.map((badgeId) => ({
          userId: user.id,
          badgeId,
        })),
        skipDuplicates: true,
      });
    }

    // Streak tracking
    const today = new Date().toISOString().slice(0, 10);
    let newStreak = user.streak;
    if (user.lastActivityDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      newStreak = user.lastActivityDate === yesterday ? user.streak + 1 : 1;
    }

    // Aggiorna utente
    await prisma.user.update({
      where: { id: user.id },
      data: {
        totalCredits,
        streak: newStreak,
        lastActivityDate: today,
      },
    });

    // Activity log
    const modTitle = mod.title;
    const pct = Math.round((score / mod.maxCredits) * 100);
    const activities: { type: string; message: string }[] = [
      {
        type: "quiz_completed",
        message: `Quiz "${modTitle}" completato — ${score}/${mod.maxCredits} XP (${pct}%)`,
      },
    ];

    // Level up?
    const prevLevel = Math.floor((totalCredits - (isBetterScore ? score - (existingProgress?.bestScore || 0) : 0)) / 50) + 1;
    const newLevel = Math.floor(totalCredits / 50) + 1;
    if (newLevel > prevLevel) {
      activities.push({
        type: "level_up",
        message: `Nuovo livello raggiunto: Lv.${newLevel}!`,
      });
    }

    // Badge logs
    for (const badgeId of newBadges) {
      const badgeDef = initialBadges.find((b) => b.id === badgeId);
      if (badgeDef) {
        activities.push({
          type: "badge_unlocked",
          message: `Badge sbloccato: "${badgeDef.title}"`,
        });
      }
    }

    await prisma.userActivity.createMany({
      data: activities.map((a) => ({
        userId: user.id,
        type: a.type,
        message: a.message,
      })),
    });

    // Ricarica tutto per risposta completa
    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        moduleProgress: true,
        badges: true,
        activityLog: { orderBy: { timestamp: "desc" }, take: 30 },
      },
    });

    if (!updatedUser) {
      return NextResponse.json({ error: "Errore" }, { status: 500 });
    }

    const moduleScores: Record<string, { score: number; maxCredits: number; completedAt: string }> = {};
    for (const mp of updatedUser.moduleProgress) {
      moduleScores[mp.moduleId] = {
        score: mp.bestScore,
        maxCredits: mp.maxCredits,
        completedAt: mp.completedAt.toISOString(),
      };
    }

    const unlockedBadgeIds = new Set(updatedUser.badges.map((b) => b.badgeId));
    const badges = initialBadges.map((def) => ({
      ...def,
      unlockedAt: unlockedBadgeIds.has(def.id)
        ? updatedUser.badges.find((b) => b.badgeId === def.id)!.unlockedAt.toISOString()
        : null,
    }));

    const activityLog = updatedUser.activityLog.map((a) => ({
      type: a.type as "quiz_completed" | "badge_unlocked" | "level_up" | "streak",
      message: a.message,
      timestamp: a.timestamp.toISOString(),
    }));

    return NextResponse.json({
      score,
      isBestScore: isBetterScore,
      progress: {
        userName: `${updatedUser.nome} ${updatedUser.cognome}`,
        totalCredits: updatedUser.totalCredits,
        moduleScores,
        badges,
        streak: updatedUser.streak,
        lastActivityDate: updatedUser.lastActivityDate,
        activityLog,
      },
    });
  } catch (error) {
    console.error("Submit quiz error:", error);
    return NextResponse.json(
      { error: "Errore interno del server" },
      { status: 500 }
    );
  }
}
