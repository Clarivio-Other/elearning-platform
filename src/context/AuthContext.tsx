"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { UserProfile } from "@/types";
import { loadProfile, saveProfile, clearProfile } from "@/lib/storage";
import RegistrationForm from "@/components/Auth/RegistrationForm";

interface AuthContextValue {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null | "loading">("loading");

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  const handleRegister = useCallback((p: UserProfile) => {
    saveProfile(p);
    setProfile(p);
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile((prev) => {
      if (!prev || prev === "loading") return prev;
      const updated = { ...prev, ...updates };
      saveProfile(updated);
      return updated;
    });
  }, []);

  const logout = useCallback(() => {
    clearProfile();
    setProfile(null);
  }, []);

  // Loading state
  if (profile === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-viola border-t-transparent" />
      </div>
    );
  }

  // Not authenticated — show registration
  if (!profile) {
    return <RegistrationForm onRegister={handleRegister} />;
  }

  return (
    <AuthContext.Provider value={{ profile, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
