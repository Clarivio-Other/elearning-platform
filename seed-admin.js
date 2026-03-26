// Temporary script to generate localStorage admin data
const modules = [
  { id: 'modulo-1', maxCredits: 90 },
  { id: 'modulo-2', maxCredits: 70 },
  { id: 'modulo-3', maxCredits: 75 },
  { id: 'modulo-4', maxCredits: 95 },
  { id: 'modulo-5', maxCredits: 70 },
  { id: 'modulo-6', maxCredits: 95 },
];

const now = new Date().toISOString();

const profile = {
  nome: 'Admin',
  cognome: 'Clarivio',
  email: 'admin@clarivio.it',
  telefono: '',
  ruolo: 'Super Admin',
  azienda: 'Clarivio',
  registeredAt: now,
  privacyAccepted: true,
  privacyAcceptedAt: now,
  marketingConsent: true,
  marketingConsentAt: now,
  profilingConsent: true,
  profilingConsentAt: now,
};

const scores = {};
modules.forEach(m => {
  scores[m.id] = { score: m.maxCredits, maxCredits: m.maxCredits, completedAt: now };
});

const progress = {
  userName: 'Admin Clarivio',
  totalCredits: modules.reduce((s, m) => s + m.maxCredits, 0),
  moduleScores: scores,
  badges: [
    { id: 'first-step', title: 'Primo Passo', description: 'Hai completato il tuo primo modulo!', icon: 'footprints', image: '/icons/robot.png', unlockedAt: now },
    { id: 'perfect-score', title: 'Studente Modello', description: 'Hai ottenuto il 100% in un quiz!', icon: 'star', image: '/icons/medal.png', unlockedAt: now },
    { id: 'all-complete', title: 'Percorso Completo', description: 'Hai completato tutti i moduli del corso!', icon: 'trophy', image: '/icons/trophy.png', unlockedAt: now },
    { id: 'prompt-master', title: 'Maestro del Prompt', description: 'Hai superato i moduli sul prompt engineering!', icon: 'sparkles', image: '/icons/award.png', unlockedAt: now },
    { id: 'half-way', title: 'A Metà Strada', description: 'Hai completato almeno 3 moduli!', icon: 'flag', image: '/icons/target.png', unlockedAt: now },
  ],
  streak: 7,
  lastActivityDate: now.slice(0, 10),
  activityLog: [],
};

console.log('\n=== INCOLLA QUESTO NELLA CONSOLE DEL BROWSER (F12) ===\n');
console.log(`localStorage.setItem("elearning-profile", '${JSON.stringify(profile)}');`);
console.log(`localStorage.setItem("elearning-progress", '${JSON.stringify(progress)}');`);
console.log(`location.reload();`);
console.log('\n=== FINE ===\n');
