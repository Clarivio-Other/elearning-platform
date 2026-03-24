import { UserProgress, UserProfile } from "@/types";
import { initialBadges } from "@/data/modules";

const STORAGE_KEY = "elearning-progress";
const PROFILE_KEY = "elearning-profile";

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") {
    return getDefaultProgress();
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as UserProgress;
      // Merge saved badge state with current badge definitions (picks up new fields like image)
      saved.badges = initialBadges.map((def) => {
        const existing = saved.badges.find((b) => b.id === def.id);
        return existing ? { ...def, unlockedAt: existing.unlockedAt } : { ...def };
      });
      // Ensure new fields exist for older saves
      if (!saved.activityLog) saved.activityLog = [];
      if (saved.streak === undefined) saved.streak = 0;
      if (saved.lastActivityDate === undefined) saved.lastActivityDate = null;
      return saved;
    }
  } catch {
    // corrupted data — reset
  }
  return getDefaultProgress();
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function resetProgress(): UserProgress {
  const fresh = getDefaultProgress();
  saveProgress(fresh);
  return fresh;
}

function getDefaultProgress(): UserProgress {
  return {
    userName: "",
    totalCredits: 0,
    moduleScores: {},
    badges: initialBadges.map((b) => ({ ...b })),
    streak: 0,
    lastActivityDate: null,
    activityLog: [],
  };
}

// ── User Profile (auth) ──

export function loadProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) return JSON.parse(raw) as UserProfile;
  } catch {
    // corrupted
  }
  return null;
}

export function saveProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function clearProfile(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PROFILE_KEY);
}
