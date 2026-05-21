"use client";

import {
  createContext, useContext, useState, useEffect, useCallback, type ReactNode,
} from "react";
import { UserProfile } from "@/types";
import { apiGetMe, apiLogin, apiRegister, apiLogout, apiUpdateProfile, apiGoogleLogin, getToken, ApiError, type ApiUser } from "@/lib/api-client";
import AuthForms from "@/components/Auth/AuthForms";

interface AuthContextValue {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function apiUserToProfile(user: ApiUser): UserProfile {
  return {
    nome: user.nome, cognome: user.cognome, email: user.email,
    telefono: user.telefono || "", ruolo: user.ruolo || "",
    azienda: user.azienda || "", avatar: user.avatar || undefined,
    registeredAt: user.registeredAt,
    privacyAccepted: user.privacyAccepted, privacyAcceptedAt: user.privacyAcceptedAt,
    marketingConsent: user.marketingConsent, marketingConsentAt: user.marketingConsentAt,
    profilingConsent: user.profilingConsent, profilingConsentAt: user.profilingConsentAt,
    isAdmin: user.isAdmin ?? false,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null | "loading">("loading");
  const [authError, setAuthError] = useState<string>("");

  useEffect(() => {
    const token = getToken();
    if (!token) { setProfile(null); return; }
    apiGetMe()
      .then((res) => setProfile(apiUserToProfile(res.user)))
      .catch(() => { apiLogout(); setProfile(null); });
  }, []);

  const handleRegister = useCallback(async (data: {
    nome: string; cognome: string; email: string; password: string;
    telefono?: string; ruolo?: string; azienda?: string;
    privacyAccepted: boolean; marketingConsent: boolean; profilingConsent: boolean;
  }) => {
    try {
      setAuthError("");
      const res = await apiRegister(data);
      setProfile(apiUserToProfile(res.user));
      // Fire-and-forget: salva su Supabase e manda email di benvenuto
      fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch(() => undefined);
    } catch (err) {
      if (err instanceof ApiError) setAuthError(err.message);
      else setAuthError("Errore di connessione. Riprova.");
      throw err;
    }
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    try {
      setAuthError("");
      const res = await apiLogin(email, password);
      setProfile(apiUserToProfile(res.user));
    } catch (err) {
      if (err instanceof ApiError) setAuthError(err.message);
      else setAuthError("Errore di connessione. Riprova.");
      throw err;
    }
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile((prev) => {
      if (!prev || prev === "loading") return prev;
      return { ...prev, ...updates };
    });
    apiUpdateProfile(updates).catch(console.error);
  }, []);

  const handleGoogleLogin = useCallback(async (credential: string) => {
    try {
      setAuthError("");
      const res = await apiGoogleLogin(credential);
      setProfile(apiUserToProfile(res.user));
    } catch (err) {
      if (err instanceof ApiError) setAuthError(err.message);
      else setAuthError("Errore di connessione con Google. Riprova.");
      throw err;
    }
  }, []);

  const logout = useCallback(() => { apiLogout(); setProfile(null); }, []);

  if (profile === "loading") {
    return (<div className="flex min-h-screen items-center justify-center bg-white"><div className="h-8 w-8 animate-spin rounded-full border-4 border-viola border-t-transparent" /></div>);
  }

  if (!profile) {
    return <AuthForms onRegister={handleRegister} onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} error={authError} />;
  }

  return (<AuthContext.Provider value={{ profile, updateProfile, logout }}>{children}</AuthContext.Provider>);
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}