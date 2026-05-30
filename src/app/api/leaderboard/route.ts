import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** GET /api/leaderboard — Classifica reale di tutti gli utenti */
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        nome: true,
        cognome: true,
        avatar: true,
        totalCredits: true,
        streak: true,
        moduleProgress: {
          select: {
            moduleId: true,
          },
        },
      },
      orderBy: { totalCredits: "desc" },
      take: 50,
    });

    const leaderboard = users.map((user: typeof users[number], index: number) => ({
      rank: index + 1,
      id: user.id,
      nome: user.nome,
      cognome: user.cognome,
      avatar: user.avatar,
      totalCredits: user.totalCredits,
      streak: user.streak,
      modulesCompleted: user.moduleProgress?.length ?? 0,
      level: Math.floor(user.totalCredits / 50) + 1,
    }));

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json(
      { error: "Errore interno del server" },
      { status: 500 }
    );
  }
}
