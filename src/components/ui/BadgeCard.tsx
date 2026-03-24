import type { Badge as BadgeType } from "@/types";

interface BadgeProps {
  badge: BadgeType;
}

export default function BadgeCard({ badge }: BadgeProps) {
  const unlocked = !!badge.unlockedAt;

  return (
    <div
      className={`flex flex-col items-center gap-1.5 sm:gap-2 rounded-2xl border p-3 sm:p-4 text-center transition-all duration-300
        ${
          unlocked
            ? "border-viola/50 bg-viola/5 shadow-lg shadow-viola/10"
            : "border-border bg-surface opacity-40"
        }`}
    >
      <img
        src={badge.image}
        alt={badge.title}
        className={`h-10 w-10 sm:h-14 sm:w-14 object-contain ${!unlocked ? "grayscale" : ""}`}
      />
      <span className="text-xs sm:text-sm font-semibold leading-tight">{badge.title}</span>
      <span className="text-[10px] sm:text-xs text-foreground-muted leading-tight">{badge.description}</span>
    </div>
  );
}
