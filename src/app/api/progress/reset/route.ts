import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

/** DELETE /api/progress/reset — Reset completo dei progressi utente */
export async function DELETE(req: NextRequest) {
  try {
    const payload = getUserFromRequest(req);
    if (!payload) {
      return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
    }

    // Elimina tutti i progressi, badge e attività
    await prisma.$transaction([
      prisma.moduleProgress.deleteMany({ where: { userId: payload.userId } }),
      prisma.userBadge.deleteMany({ where: { userId: payload.userId } }),
      prisma.userActivity.deleteMany({ where: { userId: payload.userId } }),
      prisma.user.update({
        where: { id: payload.userId },
        data: {
          totalCredits: 0,
          streak: 0,
          lastActivityDate: null,
        },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reset progress error:", error);
    return NextResponse.json(
      { error: "Errore interno del server" },
      { status: 500 }
    );
  }
}
