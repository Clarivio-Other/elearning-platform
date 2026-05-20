"use client";

import { useState } from "react";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";

const EINSTEIN_IMG = "https://lftz25oez4aqbxpq.public.blob.vercel-storage.com/image-fJV4yQH9mUdahQ7NUaPm0gtBp7WNfd.png";

const RUOLI = [
  "Imprenditore",
  "Manager",
  "Marketing Specialist",
  "Content Creator",
  "Freelancer",
  "Studente",
  "Docente",
  "Developer",
  "Designer",
  "Altro",
];

interface AuthFormsProps {
  onRegister: (data: {
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
  }) => Promise<void>;
  onLogin: (email: string, password: string) => Promise<void>;
  onGoogleLogin: (credential: string) => Promise<void>;
  error: string;
}

export default function AuthForms({ onRegister, onLogin, onGoogleLogin, error }: AuthFormsProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register state
  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    ruolo: "",
    ruoloAltro: "",
    azienda: "",
    privacyAccepted: false,
    marketingConsent: false,
    profilingConsent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateRegister = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.nome.trim()) errs.nome = "Il nome è obbligatorio";
    if (!form.cognome.trim()) errs.cognome = "Il cognome è obbligatorio";
    if (!form.email.trim()) {
      errs.email = "L'email è obbligatoria";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = "Email non valida";
    }
    if (!form.password) {
      errs.password = "La password è obbligatoria";
    } else if (form.password.length < 6) {
      errs.password = "La password deve avere almeno 6 caratteri";
    }
    if (form.password !== form.confirmPassword) {
      errs.confirmPassword = "Le password non coincidono";
    }
    if (form.telefono.trim() && !/^[\d\s+\-().]{7,20}$/.test(form.telefono.trim())) {
      errs.telefono = "Numero di telefono non valido";
    }
    if (form.ruolo === "Altro" && !form.ruoloAltro.trim()) errs.ruoloAltro = "Specifica il tuo ruolo";
    if (!form.privacyAccepted) errs.privacyAccepted = "Devi accettare l'informativa sulla privacy per procedere";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword) return;
    setLoading(true);
    try {
      await onLogin(loginEmail.trim(), loginPassword);
    } catch {
      // error è gestito dal parent
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegister()) return;
    setLoading(true);
    try {
      await onRegister({
        nome: form.nome.trim(),
        cognome: form.cognome.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        telefono: form.telefono.trim() || undefined,
        ruolo: form.ruolo === "Altro" ? form.ruoloAltro.trim() : form.ruolo || undefined,
        azienda: form.azienda.trim() || undefined,
        privacyAccepted: form.privacyAccepted,
        marketingConsent: form.marketingConsent,
        profilingConsent: form.profilingConsent,
      });
    } catch {
      // error è gestito dal parent
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const inputClass = (field: string) =>
    `w-full rounded-xl border px-3.5 py-2.5 text-sm transition-colors outline-none ${
      errors[field] ? "border-danger bg-danger/5" : "border-border focus:border-viola"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src={EINSTEIN_IMG} alt="Clarivio Learn" className="h-20 w-20 object-contain drop-shadow-md" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {mode === "login" ? "Accedi a" : "Registrati su"} Clarivio<span className="text-viola">.</span>
          </h1>
          <p className="text-sm text-foreground-muted mt-2 max-w-sm mx-auto">
            {mode === "login"
              ? "Inserisci le tue credenziali per accedere alla piattaforma."
              : "Crea il tuo account per accedere alla formazione sull'AI generativa."}
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-4 rounded-xl bg-danger/10 border border-danger/20 px-4 py-3 text-sm text-danger text-center">
            {error}
          </div>
        )}

        {/* ─── LOGIN FORM ─── */}
        {mode === "login" && (
          <form
            onSubmit={handleLoginSubmit}
            className="bg-white rounded-2xl border border-border shadow-lg shadow-black/5 p-6 sm:p-8 space-y-5"
          >
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="mario.rossi@azienda.it"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-sm transition-colors outline-none focus:border-viola"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="La tua password"
                className="w-full rounded-xl border border-border px-3.5 py-2.5 text-sm transition-colors outline-none focus:border-viola"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-viola text-white font-semibold py-3 text-sm transition-all hover:bg-viola-light hover:shadow-lg hover:shadow-viola/20 active:scale-[0.98] cursor-pointer disabled:opacity-50"
            >
              {loading ? "Accesso in corso..." : "Accedi"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-foreground-muted">oppure</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Google login */}
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={(credentialResponse: CredentialResponse) => {
                  if (credentialResponse.credential) {
                    setLoading(true);
                    onGoogleLogin(credentialResponse.credential).finally(() => setLoading(false));
                  }
                }}
                onError={() => undefined}
                width="100%"
                text="continue_with"
                shape="rectangular"
                logo_alignment="left"
              />
            </div>

            <p className="text-center text-sm text-foreground-muted">
              Non hai un account?{" "}
              <button
                type="button"
                onClick={() => setMode("register")}
                className="text-viola font-semibold hover:underline cursor-pointer"
              >
                Registrati
              </button>
            </p>
          </form>
        )}

        {/* ─── REGISTER FORM ─── */}
        {mode === "register" && (
          <form
            onSubmit={handleRegisterSubmit}
            className="bg-white rounded-2xl border border-border shadow-lg shadow-black/5 p-6 sm:p-8 space-y-5"
          >
            {/* Nome + Cognome */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Nome <span className="text-danger">*</span>
                </label>
                <input type="text" value={form.nome} onChange={(e) => updateField("nome", e.target.value)} placeholder="Mario" className={inputClass("nome")} />
                {errors.nome && <p className="text-[11px] text-danger mt-1">{errors.nome}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Cognome <span className="text-danger">*</span>
                </label>
                <input type="text" value={form.cognome} onChange={(e) => updateField("cognome", e.target.value)} placeholder="Rossi" className={inputClass("cognome")} />
                {errors.cognome && <p className="text-[11px] text-danger mt-1">{errors.cognome}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Email <span className="text-danger">*</span>
              </label>
              <input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="mario.rossi@azienda.it" className={inputClass("email")} />
              {errors.email && <p className="text-[11px] text-danger mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Password <span className="text-danger">*</span>
                </label>
                <input type="password" value={form.password} onChange={(e) => updateField("password", e.target.value)} placeholder="Min. 6 caratteri" className={inputClass("password")} />
                {errors.password && <p className="text-[11px] text-danger mt-1">{errors.password}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Conferma Password <span className="text-danger">*</span>
                </label>
                <input type="password" value={form.confirmPassword} onChange={(e) => updateField("confirmPassword", e.target.value)} placeholder="Ripeti la password" className={inputClass("confirmPassword")} />
                {errors.confirmPassword && <p className="text-[11px] text-danger mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Telefono */}
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Numero di telefono</label>
              <input type="tel" value={form.telefono} onChange={(e) => updateField("telefono", e.target.value)} placeholder="+39 333 1234567" className={inputClass("telefono")} />
              {errors.telefono && <p className="text-[11px] text-danger mt-1">{errors.telefono}</p>}
            </div>

            {/* Ruolo */}
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Ruolo</label>
              <select
                value={form.ruolo}
                onChange={(e) => updateField("ruolo", e.target.value)}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm transition-colors outline-none appearance-none bg-white cursor-pointer border-border focus:border-viola ${!form.ruolo ? "text-foreground-muted" : ""}`}
              >
                <option value="">Seleziona il tuo ruolo (opzionale)</option>
                {RUOLI.map((r) => (<option key={r} value={r}>{r}</option>))}
              </select>
              {form.ruolo === "Altro" && (
                <div className="mt-2">
                  <input type="text" value={form.ruoloAltro} onChange={(e) => updateField("ruoloAltro", e.target.value)} placeholder="Specifica il tuo ruolo..." className={inputClass("ruoloAltro")} />
                  {errors.ruoloAltro && <p className="text-[11px] text-danger mt-1">{errors.ruoloAltro}</p>}
                </div>
              )}
            </div>

            {/* Azienda */}
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Azienda / Organizzazione</label>
              <input type="text" value={form.azienda} onChange={(e) => updateField("azienda", e.target.value)} placeholder="Nome della tua azienda" className={inputClass("azienda")} />
            </div>

            {/* ── Consensi e Privacy ── */}
            <div className="space-y-4 pt-2 border-t border-border">
              <p className="text-[11px] font-semibold text-foreground-muted uppercase tracking-wide">Consensi e Privacy</p>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" checked={form.privacyAccepted} onChange={(e) => updateField("privacyAccepted", e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-viola cursor-pointer" />
                <span className={`text-xs leading-relaxed ${errors.privacyAccepted ? "text-danger" : "text-foreground-muted"}`}>
                  <span className="text-danger">*</span> Ho letto e accetto l&apos;informativa sulla privacy ai sensi del Regolamento UE 2016/679 (GDPR) e del D.Lgs. 196/2003 e successive modifiche. I dati forniti saranno trattati esclusivamente per l&apos;erogazione del servizio formativo.
                </span>
              </label>
              {errors.privacyAccepted && <p className="text-[11px] text-danger -mt-2 ml-7">{errors.privacyAccepted}</p>}

              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" checked={form.marketingConsent} onChange={(e) => updateField("marketingConsent", e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-viola cursor-pointer" />
                <span className="text-xs leading-relaxed text-foreground-muted">
                  Acconsento al trattamento dei miei dati personali per finalità di marketing diretto, incluso l&apos;invio di comunicazioni promozionali, newsletter, aggiornamenti su corsi e servizi correlati via email, SMS o altri canali di contatto (art. 6, par. 1, lett. a del GDPR). <span className="italic">(Facoltativo)</span>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" checked={form.profilingConsent} onChange={(e) => updateField("profilingConsent", e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-viola cursor-pointer" />
                <span className="text-xs leading-relaxed text-foreground-muted">
                  Acconsento al trattamento dei miei dati per finalità di profilazione, analisi delle preferenze e personalizzazione dei contenuti formativi e delle comunicazioni commerciali (art. 6, par. 1, lett. a e art. 22 del GDPR). <span className="italic">(Facoltativo)</span>
                </span>
              </label>

              <p className="text-[10px] text-foreground-muted/70 leading-relaxed">
                Puoi revocare il consenso in qualsiasi momento scrivendo a privacy@clarivio.it. Il ritiro del consenso non pregiudica la liceità del trattamento basato sul consenso precedente.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-viola text-white font-semibold py-3 text-sm transition-all hover:bg-viola-light hover:shadow-lg hover:shadow-viola/20 active:scale-[0.98] cursor-pointer disabled:opacity-50"
            >
              {loading ? "Registrazione in corso..." : "Crea il tuo account"}
            </button>

            <p className="text-center text-sm text-foreground-muted">
              Hai già un account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-viola font-semibold hover:underline cursor-pointer"
              >
                Accedi
              </button>
            </p>

            <p className="text-[10px] text-foreground-muted text-center leading-relaxed">
              Titolare del trattamento: Clarivio S.r.l. — I tuoi dati saranno trattati nel rispetto del GDPR (Reg. UE 2016/679).
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
