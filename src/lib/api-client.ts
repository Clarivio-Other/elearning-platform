/**
 * Client API per comunicare con il backend Next.js.
 * Gestisce automaticamente il token JWT e gli errori.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
const TOKEN_KEY = "clarivio-token";

// ─── Token management ───

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

// ─── Fetch wrapper ───

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(data.error || "Errore sconosciuto", res.status);
  }

  return data as T;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

// ─── Auth API ───

export interface AuthResponse {
  token: string;
  user: ApiUser;
}

export interface ApiUser {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  telefono: string | null;
  ruolo: string | null;
  azienda: string | null;
  avatar: string | null;
  registeredAt: string;
  privacyAccepted: boolean;
  privacyAcceptedAt: string;
  marketingConsent: boolean;
  marketingConsentAt: string;
  profilingConsent: boolean;
  profilingConsentAt: string;
}

export async function apiRegister(data: {
  nome: string;
  cognome: string;
  email: string;
  password: string;
  telefono?: string;
  ruolo?: string;
  azienda?: string;
  privacyAccepted: boolean;
  marketingConsent: boolean;
  profilingConsent: boolean;
}): Promise<AuthResponse> {
  const res = await apiFetch<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
  setToken(res.token);
  return res;
}

export async function apiLogin(
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await apiFetch<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setToken(res.token);
  return res;
}

export async function apiGoogleLogin(credential: string): Promise<AuthResponse> {
  const res = await apiFetch<AuthResponse>("/api/auth/google", {
    method: "POST",
    body: JSON.stringify({ credential }),
  });
  setToken(res.token);
  return res;
}

export async function apiGetMe(): Promise<{ user: ApiUser }> {
  return apiFetch<{ user: ApiUser }>("/api/auth/me");
}

export async function apiUpdateProfile(
  updates: Partial<ApiUser>
): Promise<{ user: ApiUser }> {
  return apiFetch<{ user: ApiUser }>("/api/auth/me", {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

export function apiLogout(): void {
  removeToken();
}

// ─── Progress API ───

import type { UserProgress } from "@/types";

export async function apiLoadProgress(): Promise<{ progress: UserProgress }> {
  return apiFetch<{ progress: UserProgress }>("/api/progress");
}

export async function apiSubmitQuiz(
  moduleId: string,
  answers: number[]
): Promise<{
  score: number;
  isBestScore: boolean;
  progress: UserProgress;
}> {
  return apiFetch("/api/progress", {
    method: "POST",
    body: JSON.stringify({ moduleId, answers }),
  });
}

export async function apiResetProgress(): Promise<void> {
  await apiFetch("/api/progress/reset", { method: "DELETE" });
}

// ─── Leaderboard API ───

export interface LeaderboardEntry {
  rank: number;
  id: number;
  nome: string;
  cognome: string;
  avatar: string | null;
  totalCredits: number;
  streak: number;
  modulesCompleted: number;
  level: number;
}

export async function apiGetLeaderboard(): Promise<{
  leaderboard: LeaderboardEntry[];
}> {
  return apiFetch<{ leaderboard: LeaderboardEntry[] }>("/api/leaderboard");
}
