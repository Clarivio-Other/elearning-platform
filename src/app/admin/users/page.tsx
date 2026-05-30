"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { getToken } from "@/lib/api-client";
import { useRouter } from "next/navigation";

type AdminUser = {
  id: number;
  email: string;
  nome: string;
  cognome: string;
  telefono: string | null;
  ruolo: string | null;
  azienda: string | null;
  privacyAccepted: boolean;
  privacyAcceptedAt: string | null;
  marketingConsent: boolean;
  profilingConsent: boolean;
  totalCredits: number;
  streak: number;
  isAdmin: boolean;
  createdAt: string;
};

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Chip({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
        ok
          ? "bg-emerald-100 text-emerald-700"
          : "bg-slate-100 text-slate-400"
      }`}
    >
      {ok ? "✓" : "✗"} {label}
    </span>
  );
}

export default function AdminUsersPage() {
  const { profile } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const fetchUsers = useCallback(
    async (q: string) => {
      const token = getToken();
      if (!token) return;
      setFetching(true);
      setError("");
      try {
        const url = q
          ? `/api/admin/users?q=${encodeURIComponent(q)}`
          : "/api/admin/users";
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error ?? "Errore caricamento");
          return;
        }
        const data = await res.json();
        setUsers(data.users);
        setTotal(data.total);
      } catch {
        setError("Errore di rete");
      } finally {
        setFetching(false);
      }
    },
    []
  );

  // Auth guard — AuthContext mostra login se !profile, quindi qui profile è sempre definito
  useEffect(() => {
    if (!profile.isAdmin) {
      router.replace("/dashboard");
      return;
    }
    fetchUsers("");
  }, [profile, router, fetchUsers]);

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => fetchUsers(search), 350);
    return () => clearTimeout(t);
  }, [search, fetchUsers]);

  async function toggleAdmin(targetUser: AdminUser) {
    const token = getToken();
    if (!token) return;
    setTogglingId(targetUser.id);
    try {
      const res = await fetch(`/api/admin/users?id=${targetUser.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAdmin: !targetUser.isAdmin }),
      });
      if (!res.ok) {
        const d = await res.json();
        alert(d.error ?? "Errore");
        return;
      }
      setUsers((prev) =>
        prev.map((u) =>
          u.id === targetUser.id ? { ...u, isAdmin: !u.isAdmin } : u
        )
      );
    } finally {
      setTogglingId(null);
    }
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FC]">
        <div className="text-[#475569]">Caricamento…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FC]" style={{ fontFamily: "Geist, sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-[#DDE5F0] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-[#475569] hover:text-[#0F172A] text-sm"
          >
            ← Dashboard
          </button>
          <span className="text-[#DDE5F0]">|</span>
          <h1
            className="text-xl font-bold text-[#0F172A]"
            style={{ fontFamily: "DM Serif Display, serif" }}
          >
            Admin — Utenti Registrati
          </h1>
        </div>
        <span className="text-sm text-[#475569]">
          {total} utenti totali
        </span>
      </header>

      <main className="px-6 py-6 max-w-[1400px] mx-auto">
        {/* Search */}
        <div className="mb-5">
          <input
            type="text"
            placeholder="Cerca per email, nome, cognome, azienda…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md border border-[#DDE5F0] rounded-lg px-4 py-2 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6556F6] bg-white"
          />
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {fetching && (
          <div className="text-sm text-[#475569] mb-4">Caricamento…</div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#DDE5F0] overflow-x-auto shadow-sm">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-[#DDE5F0] bg-[#F5F7FC]">
                <th className="text-left px-4 py-3 font-semibold text-[#475569] whitespace-nowrap">#</th>
                <th className="text-left px-4 py-3 font-semibold text-[#475569] whitespace-nowrap">Nome</th>
                <th className="text-left px-4 py-3 font-semibold text-[#475569] whitespace-nowrap">Email</th>
                <th className="text-left px-4 py-3 font-semibold text-[#475569] whitespace-nowrap">Ruolo</th>
                <th className="text-left px-4 py-3 font-semibold text-[#475569] whitespace-nowrap">Azienda</th>
                <th className="text-left px-4 py-3 font-semibold text-[#475569] whitespace-nowrap">Telefono</th>
                <th className="text-left px-4 py-3 font-semibold text-[#475569] whitespace-nowrap">Consensi</th>
                <th className="text-right px-4 py-3 font-semibold text-[#475569] whitespace-nowrap">XP</th>
                <th className="text-left px-4 py-3 font-semibold text-[#475569] whitespace-nowrap">Registrato il</th>
                <th className="text-left px-4 py-3 font-semibold text-[#475569] whitespace-nowrap">Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && !fetching && (
                <tr>
                  <td colSpan={10} className="text-center py-10 text-[#94A3B8]">
                    Nessun utente trovato
                  </td>
                </tr>
              )}
              {users.map((u, i) => (
                <tr
                  key={u.id}
                  className={`border-b border-[#F0F4FB] hover:bg-[#F8F9FF] transition-colors ${
                    u.isAdmin ? "bg-[#FAF9FF]" : ""
                  }`}
                >
                  <td className="px-4 py-3 text-[#94A3B8]">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-[#0F172A] whitespace-nowrap">
                    {u.nome} {u.cognome}
                  </td>
                  <td className="px-4 py-3 text-[#475569]">{u.email}</td>
                  <td className="px-4 py-3 text-[#475569]">{u.ruolo ?? "—"}</td>
                  <td className="px-4 py-3 text-[#475569]">{u.azienda ?? "—"}</td>
                  <td className="px-4 py-3 text-[#475569]">{u.telefono ?? "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      <Chip ok={u.privacyAccepted} label="Privacy" />
                      <Chip ok={u.marketingConsent} label="Mktg" />
                      <Chip ok={u.profilingConsent} label="Profil." />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-[#6556F6] font-semibold">
                    {u.totalCredits}
                  </td>
                  <td className="px-4 py-3 text-[#475569] whitespace-nowrap">
                    {formatDate(u.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleAdmin(u)}
                      disabled={togglingId === u.id || u.email === profile.email}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        u.isAdmin
                          ? "bg-[#ECE9FF] text-[#6556F6] hover:bg-[#DDD8FF]"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      } disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                      {togglingId === u.id
                        ? "…"
                        : u.email === profile.email
                        ? "Tu"
                        : u.isAdmin
                        ? "Admin ✓"
                        : "Promuovi"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
