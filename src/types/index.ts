export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  credits: number;
}

export interface UserProfile {
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  ruolo: string;
  azienda: string;
  avatar?: string;
  registeredAt: string;
  privacyAccepted: boolean;
  privacyAcceptedAt: string;
  marketingConsent: boolean;
  marketingConsentAt: string;
  profilingConsent: boolean;
  profilingConsentAt: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  content: string;
  quiz: QuizQuestion[];
  maxCredits: number;
  icon: string;
  agenda: string[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  unlockedAt: string | null;
}

export interface ModuleScore {
  score: number;
  maxCredits: number;
  completedAt: string;
}

export interface ActivityEntry {
  type: "quiz_completed" | "badge_unlocked" | "level_up" | "streak";
  message: string;
  timestamp: string;
}

export interface UserProgress {
  userName: string;
  totalCredits: number;
  moduleScores: Record<string, ModuleScore>;
  badges: Badge[];
  streak: number;
  lastActivityDate: string | null;
  activityLog: ActivityEntry[];
}
