"use client";

import { useState } from "react";
import { UserProfile } from "@/types";

interface RegistrationFormProps {
  onRegister: (profile: UserProfile) => void;
}

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

export default function RegistrationForm({ onRegister }: RegistrationFormProps) {
  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    ruolo: "",
    ruoloAltro: "",
    azienda: "",
    privacyAccepted: false,
    marketingConsent: false,
    profilingConsent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.nome.trim()) errs.nome = "Il nome è obbligatorio";
    if (!form.cognome.trim()) errs.cognome = "Il cognome è obbligatorio";
    if (!form.email.trim()) {
      errs.email = "L'email è obbligatoria";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = "Email non valida";
    }
    if (form.telefono.trim() && !/^[\d\s+\-().]{7,20}$/.test(form.telefono.trim())) {
      errs.telefono = "Numero di telefono non valido";
    }
    if (form.ruolo === "Altro" && !form.ruoloAltro.trim()) errs.ruoloAltro = "Specifica il tuo ruolo";
    if (!form.privacyAccepted) errs.privacyAccepted = "Devi accettare l'informativa sulla privacy per procedere";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const now = new Date().toISOString();
    onRegister({
      nome: form.nome.trim(),
      cognome: form.cognome.trim(),
      email: form.email.trim().toLowerCase(),
      telefono: form.telefono.trim(),
      ruolo: form.ruolo === "Altro" ? form.ruoloAltro.trim() : form.ruolo,
      azienda: form.azienda.trim(),
      registeredAt: now,
      privacyAccepted: form.privacyAccepted,
      privacyAcceptedAt: now,
      marketingConsent: form.marketingConsent,
      isAdmin: false,
      marketingConsentAt: form.marketingConsent ? now : "",
      profilingConsent: form.profilingConsent,
      profilingConsentAt: form.profilingConsent ? now : "",
    });
  };

  const updateField = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src="/icons/robot.png" alt="Clarivio" className="h-16 w-16 object-contain" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Benvenuto in Clarivio<span className="text-viola">.</span>
          </h1>
          <p className="text-sm text-foreground-muted mt-2 max-w-sm mx-auto">
            Registrati per accedere alla piattaforma di formazione sull&apos;AI generativa.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-border shadow-lg shadow-black/5 p-6 sm:p-8 space-y-5"
        >
          {/* Nome + Cognome */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Nome <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                value={form.nome}
                onChange={(e) => updateField("nome", e.target.value)}
                placeholder="Mario"
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm transition-colors outline-none
                  ${errors.nome ? "border-danger bg-danger/5" : "border-border focus:border-viola"}`}
              />
              {errors.nome && <p className="text-[11px] text-danger mt-1">{errors.nome}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Cognome <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                value={form.cognome}
                onChange={(e) => updateField("cognome", e.target.value)}
                placeholder="Rossi"
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm transition-colors outline-none
                  ${errors.cognome ? "border-danger bg-danger/5" : "border-border focus:border-viola"}`}
              />
              {errors.cognome && <p className="text-[11px] text-danger mt-1">{errors.cognome}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Email <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="mario.rossi@azienda.it"
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm transition-colors outline-none
                ${errors.email ? "border-danger bg-danger/5" : "border-border focus:border-viola"}`}
            />
            {errors.email && <p className="text-[11px] text-danger mt-1">{errors.email}</p>}
          </div>

          {/* Telefono */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Numero di telefono
            </label>
            <input
              type="tel"
              value={form.telefono}
              onChange={(e) => updateField("telefono", e.target.value)}
              placeholder="+39 333 1234567"
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm transition-colors outline-none
                ${errors.telefono ? "border-danger bg-danger/5" : "border-border focus:border-viola"}`}
            />
            {errors.telefono && <p className="text-[11px] text-danger mt-1">{errors.telefono}</p>}
          </div>

          {/* Ruolo */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Ruolo
            </label>
            <select
              value={form.ruolo}
              onChange={(e) => updateField("ruolo", e.target.value)}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm transition-colors outline-none appearance-none bg-white cursor-pointer
                ${errors.ruolo ? "border-danger bg-danger/5" : "border-border focus:border-viola"}
                ${!form.ruolo ? "text-foreground-muted" : ""}`}
            >
              <option value="">Seleziona il tuo ruolo (opzionale)</option>
              {RUOLI.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            {errors.ruolo && <p className="text-[11px] text-danger mt-1">{errors.ruolo}</p>}
            {form.ruolo === "Altro" && (
              <div className="mt-2">
                <input
                  type="text"
                  value={form.ruoloAltro}
                  onChange={(e) => updateField("ruoloAltro", e.target.value)}
                  placeholder="Specifica il tuo ruolo..."
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm transition-colors outline-none
                    ${errors.ruoloAltro ? "border-danger bg-danger/5" : "border-border focus:border-viola"}`}
                />
                {errors.ruoloAltro && <p className="text-[11px] text-danger mt-1">{errors.ruoloAltro}</p>}
              </div>
            )}
          </div>

          {/* Azienda */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Azienda / Organizzazione
            </label>
            <input
              type="text"
              value={form.azienda}
              onChange={(e) => updateField("azienda", e.target.value)}
              placeholder="Nome della tua azienda"
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm transition-colors outline-none
                ${errors.azienda ? "border-danger bg-danger/5" : "border-border focus:border-viola"}`}
            />
            {errors.azienda && <p className="text-[11px] text-danger mt-1">{errors.azienda}</p>}
          </div>

          {/* ── Consensi e Privacy ── */}
          <div className="space-y-4 pt-2 border-t border-border">
            <p className="text-[11px] font-semibold text-foreground-muted uppercase tracking-wide">Consensi e Privacy</p>

            {/* Privacy Policy — obbligatorio */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={form.privacyAccepted}
                onChange={(e) => updateField("privacyAccepted", e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-viola cursor-pointer"
              />
              <span className={`text-xs leading-relaxed ${errors.privacyAccepted ? "text-danger" : "text-foreground-muted"}`}>
                <span className="text-danger">*</span> Ho letto e accetto l&apos;informativa sulla privacy ai sensi del Regolamento UE 2016/679 (GDPR) e del D.Lgs. 196/2003 e successive modifiche. I dati forniti saranno trattati esclusivamente per l&apos;erogazione del servizio formativo.
              </span>
            </label>
            {errors.privacyAccepted && <p className="text-[11px] text-danger -mt-2 ml-7">{errors.privacyAccepted}</p>}

            {/* Marketing — facoltativo */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={form.marketingConsent}
                onChange={(e) => updateField("marketingConsent", e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-viola cursor-pointer"
              />
              <span className="text-xs leading-relaxed text-foreground-muted">
                Acconsento al trattamento dei miei dati personali per finalità di marketing diretto, incluso l&apos;invio di comunicazioni promozionali, newsletter, aggiornamenti su corsi e servizi correlati via email, SMS o altri canali di contatto (art. 6, par. 1, lett. a del GDPR). <span className="italic">(Facoltativo)</span>
              </span>
            </label>

            {/* Profilazione — facoltativo */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={form.profilingConsent}
                onChange={(e) => updateField("profilingConsent", e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-viola cursor-pointer"
              />
              <span className="text-xs leading-relaxed text-foreground-muted">
                Acconsento al trattamento dei miei dati per finalità di profilazione, analisi delle preferenze e personalizzazione dei contenuti formativi e delle comunicazioni commerciali (art. 6, par. 1, lett. a e art. 22 del GDPR). <span className="italic">(Facoltativo)</span>
              </span>
            </label>

            <p className="text-[10px] text-foreground-muted/70 leading-relaxed">
              Puoi revocare il consenso in qualsiasi momento scrivendo a privacy@clarivio.it. Il ritiro del consenso non pregiudica la liceità del trattamento basato sul consenso precedente.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl bg-viola text-white font-semibold py-3 text-sm transition-all hover:bg-viola-light hover:shadow-lg hover:shadow-viola/20 active:scale-[0.98] cursor-pointer"
          >
            Accedi alla piattaforma
          </button>

          <p className="text-[10px] text-foreground-muted text-center leading-relaxed">
            Titolare del trattamento: Clarivio S.r.l. — I tuoi dati saranno trattati nel rispetto del GDPR (Reg. UE 2016/679).
          </p>
        </form>
      </div>
    </div>
  );
}
