"use client";

import BadgeCard from "@/components/ui/BadgeCard";
import { useLearning } from "@/context/LearningContext";

export default function BadgeGrid() {
  const { progress } = useLearning();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {progress.badges.map((badge) => (
        <BadgeCard key={badge.id} badge={badge} />
      ))}
    </div>
  );
}
