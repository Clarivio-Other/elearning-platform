"use client";

import {
  RotateCcw,
  Menu, X, ChevronsLeft, ChevronsRight,
  ChevronRight, LogOut,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useLearning } from "@/context/LearningContext";
import { useAuth } from "@/context/AuthContext";
import { modules } from "@/data/modules";
import ProgressBar from "@/components/ui/ProgressBar";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ModuleCard from "@/components/Dashboard/ModuleCard";
import BadgeGrid from "@/components/Dashboard/BadgeGrid";

type Section = "learn" | "webinar" | "toolkit" | "risorse" | "profilo";

const ThIcon = ({ src, alt, className = "h-5 w-5" }: { src: string; alt: string; className?: string }) => (
  <img src={src} alt={alt} className={`${className} object-contain`} />
);

const sectionTabs: { id: Section; label: string; icon: React.ReactNode; active: boolean }[] = [
  { id: "learn", label: "Learn", icon: <ThIcon src="/icons/computer.png" alt="Learn" />, active: true },
  { id: "webinar", label: "Webinar", icon: <ThIcon src="/icons/keyboard.png" alt="Webinar" />, active: false },
  { id: "toolkit", label: "Toolkit", icon: <ThIcon src="/icons/gear.png" alt="Toolkit" />, active: true },
  { id: "risorse", label: "Risorse", icon: <ThIcon src="/icons/pen.png" alt="Risorse" />, active: true },
  { id: "profilo", label: "Profilo", icon: <ThIcon src="/icons/award.png" alt="Profilo" />, active: true },
];

const comingSoonData: Record<string, { title: string; description: string; items: string[] }> = {
  webinar: {
    title: "Clarivio Webinar",
    description: "Webinar live e registrazioni con esperti di AI, marketing e comunicazione digitale.",
    items: [
      "Webinar mensili con esperti del settore",
      "Sessioni Q&A interattive in diretta",
      "Archivio completo delle registrazioni",
      "Materiali e slide scaricabili",
    ],
  },
  toolkit: {
    title: "Clarivio Toolkit",
    description: "La cassetta degli attrezzi: template, prompt pronti all'uso e strumenti AI selezionati.",
    items: [
      "Libreria di prompt testati e ottimizzati",
      "Template per contenuti, email e social",
      "Confronto strumenti AI aggiornato",
      "Workflow automatizzati pronti all'uso",
    ],
  },
};

const promptLibrary: { category: string; icon: string; prompts: { title: string; prompt: string }[] }[] = [
  {
    category: "Analisi e Ricerca",
    icon: "/icons/magnifier.png",
    prompts: [
      {
        title: "Analisi di Mercato",
        prompt: "Sei un analista di mercato senior con 15 anni di esperienza nel settore [SETTORE]. Conduci un'analisi approfondita del mercato [MERCATO] in Italia. Includi: dimensioni del mercato, trend attuali, principali player, opportunità emergenti e rischi. Presenta i risultati in una tabella riassuntiva seguita da 5 insight strategici.",
      },
      {
        title: "Sintesi di Documento",
        prompt: "Leggi attentamente il seguente documento e produci: (1) un riassunto esecutivo di 150 parole, (2) i 5 punti chiave in elenco puntato, (3) le 3 azioni raccomandate, (4) le domande aperte da approfondire. Documento: [INCOLLA TESTO]",
      },
      {
        title: "Analisi SWOT Completa",
        prompt: "Conduci un'analisi SWOT completa per [AZIENDA/PROGETTO]. Per ciascun quadrante (Strengths, Weaknesses, Opportunities, Threats) fornisci almeno 5 punti con breve spiegazione. Concludi con 3 raccomandazioni strategiche prioritarie.",
      },
      {
        title: "Analisi Competitor",
        prompt: "Sei un analista strategico. Analizza i principali competitor di [AZIENDA] nel mercato [MERCATO]. Per ciascun competitor identifica: punti di forza, debolezze, posizionamento, strategia di prezzo e differenziazione. Concludi con una mappa di posizionamento e 3 opportunità di differenziazione.",
      },
    ],
  },
  {
    category: "Scrittura e Contenuti",
    icon: "/icons/pen.png",
    prompts: [
      {
        title: "Articolo Blog SEO",
        prompt: "Sei un content strategist esperto di SEO. Scrivi un articolo di 1200 parole ottimizzato per la keyword '[KEYWORD]'. Struttura: titolo H1 accattivante, introduzione con hook, 4 sezioni con H2, ciascuna con un esempio concreto, conclusione con CTA. Tono: professionale ma accessibile. Target: [AUDIENCE].",
      },
      {
        title: "Post LinkedIn Professionale",
        prompt: "Scrivi un post LinkedIn professionale su [ARGOMENTO]. Struttura: hook potente nella prima riga (max 15 parole), 3 paragrafi brevi con spazi tra loro, 1 dato o statistica rilevante, chiusura con domanda al pubblico. Massimo 250 parole. Tono: autorevole ma umano.",
      },
      {
        title: "Newsletter Settimanale",
        prompt: "Crea una newsletter settimanale per [BRAND/SETTORE]. Oggetto email irresistibile (max 50 caratteri). Struttura: saluto personalizzato, 1 insight principale con approfondimento, 3 news brevi del settore, 1 tip pratico, CTA finale. Tono: [TONO]. Max 400 parole.",
      },
      {
        title: "Comunicato Stampa",
        prompt: "Redigi un comunicato stampa professionale per [EVENTO/NOTIZIA] di [AZIENDA]. Segui la struttura: titolo forte, sottotitolo esplicativo, lead con le 5W, corpo con citazioni del management, paragrafo boilerplate sull'azienda, contatti per la stampa. Max 500 parole.",
      },
    ],
  },
  {
    category: "Business e Strategia",
    icon: "/icons/target.png",
    prompts: [
      {
        title: "Business Plan Sintetico",
        prompt: "Sei un consulente strategico. Crea un business plan sintetico per [IDEA DI BUSINESS]. Includi: executive summary, problema risolto, soluzione proposta, modello di revenue, analisi del target, strategia go-to-market, proiezioni economiche a 12 mesi, KPI da monitorare. Formato: sezioni chiare con bullet point.",
      },
      {
        title: "Proposta Commerciale",
        prompt: "Redigi una proposta commerciale professionale per [SERVIZIO/PRODOTTO] destinata a [TIPO DI CLIENTE]. Includi: presentazione dell'azienda (3 righe), analisi dei bisogni del cliente, soluzione proposta, deliverable, timeline, pricing, termini e condizioni, CTA per procedere.",
      },
      {
        title: "Piano Marketing Trimestrale",
        prompt: "Sei un CMO con esperienza in [SETTORE]. Crea un piano marketing per il prossimo trimestre per [AZIENDA]. Budget: [BUDGET]. Obiettivi: [OBIETTIVI]. Includi: canali prioritari, azioni specifiche per settimana, KPI per ciascuna azione, allocazione budget, metriche di successo.",
      },
    ],
  },
  {
    category: "Email Professionali",
    icon: "/icons/computer.png",
    prompts: [
      {
        title: "Email di Follow-up",
        prompt: "Scrivi un'email di follow-up professionale dopo un incontro con [TIPO DI INTERLOCUTORE] riguardo a [ARGOMENTO]. L'email deve: ringraziare per il tempo dedicato, riassumere i 3 punti chiave discussi, proporre i prossimi passi concreti, includere una CTA con data specifica. Tono: cordiale e professionale. Max 150 parole.",
      },
      {
        title: "Email di Vendita",
        prompt: "Scrivi un'email di vendita per [PRODOTTO] destinata a [RUOLO] di aziende [SETTORE]. L'oggetto deve avere un tasso di apertura elevato. Il corpo deve seguire il framework PAS (Problema, Amplificazione, Soluzione). Includi social proof e CTA chiara. Max 200 parole.",
      },
      {
        title: "Sequenza Email Nurturing (5 email)",
        prompt: "Crea una sequenza di 5 email per nutrire un lead che ha scaricato il nostro ebook su [ARGOMENTO]. Email 1: benvenuto e valore aggiunto. Email 2: caso d'uso pratico. Email 3: testimonianza cliente. Email 4: obiezione comune risolta. Email 5: offerta con urgenza. Per ogni email specifica: oggetto, corpo (150 parole), CTA, tempistica di invio.",
      },
    ],
  },
  {
    category: "Social Media",
    icon: "/icons/robot.png",
    prompts: [
      {
        title: "Piano Editoriale Mensile",
        prompt: "Crea un piano editoriale di 4 settimane per [PIATTAFORMA] di [BRAND]. Per ogni giorno lavorativo prevedi: tipo di contenuto (reel, carosello, post singolo, stories), argomento, copy (max 200 caratteri), 5 hashtag, orario di pubblicazione. Alterna: educativo 40%, storytelling 25%, prodotto 20%, engagement 15%.",
      },
      {
        title: "Carosello Instagram Educativo",
        prompt: "Crea un carosello Instagram di 8 slide su [ARGOMENTO]. Slide 1: titolo con hook provocatorio. Slide 2-7: un concetto per slide, frase breve e impattante (max 25 parole per slide). Slide 8: CTA e riepilogo. Suggerisci la caption (max 200 parole) con 10 hashtag.",
      },
      {
        title: "Script Video/Reel",
        prompt: "Crea lo script per un video/reel di 60 secondi su [ARGOMENTO]. Struttura: hook nei primi 3 secondi (domanda o affermazione provocatoria), 3 punti principali (10 secondi ciascuno), CTA finale. Includi indicazioni per il tono, il ritmo e i momenti chiave per la grafica/testo sullo schermo.",
      },
    ],
  },
  {
    category: "Formazione e Didattica",
    icon: "/icons/brain.png",
    prompts: [
      {
        title: "Piano di Lezione",
        prompt: "Sei un instructional designer esperto. Crea un piano di lezione di 60 minuti su [ARGOMENTO] per [LIVELLO/AUDIENCE]. Includi: obiettivi di apprendimento (3 max), scaletta temporale, attività interattive, materiali necessari, metodo di valutazione, 5 domande di verifica.",
      },
      {
        title: "Quiz a Scelta Multipla",
        prompt: "Crea 10 domande a scelta multipla su [ARGOMENTO]. Ogni domanda deve avere 4 opzioni con una sola risposta corretta. Includi: domande di diversa difficoltà (3 facili, 4 medie, 3 difficili). Alla fine, fornisci le risposte con breve spiegazione per ciascuna.",
      },
      {
        title: "Spiega come un Esperto",
        prompt: "Sei un professore universitario di [MATERIA] con 20 anni di esperienza didattica. Spiega [CONCETTO] in modo chiaro e approfondito. Usa: un'analogia con la vita quotidiana, un esempio concreto, un controesempio per chiarire malintesi comuni, e una sintesi in 3 punti chiave. Livello: [AUDIENCE].",
      },
    ],
  },
  {
    category: "Copywriting Avanzato",
    icon: "/icons/award.png",
    prompts: [
      {
        title: "Landing Page con Framework AIDA",
        prompt: "Usa il framework AIDA (Attenzione, Interesse, Desiderio, Azione) per scrivere una landing page per [PRODOTTO/SERVIZIO]. Target: [AUDIENCE]. Beneficio principale: [BENEFICIO]. Includi: headline che cattura, sottotitolo esplicativo, 3 sezioni di benefici, social proof, FAQ (3 domande), CTA finale urgente.",
      },
      {
        title: "Storytelling Cliente (BAB)",
        prompt: "Racconta la storia di un nostro cliente tipo usando il framework BAB (Before-After-Bridge). Il protagonista è [DESCRIZIONE]. Il problema era [PAIN POINT]. La soluzione è stata [PRODOTTO/SERVIZIO]. Il risultato è [BENEFICIO QUANTIFICABILE]. Tono: empatico e ispirazionale. 400 parole.",
      },
      {
        title: "Meta Prompt: Miglioratore di Prompt",
        prompt: "Sono un [RUOLO] che lavora in [SETTORE]. Devo usare l'AI per [OBIETTIVO]. Scrivi il prompt migliore possibile che potrei usare per ottenere [RISULTATO DESIDERATO]. Il prompt deve specificare il contesto, il ruolo da assegnare all'AI, il formato dell'output, il tono e gli eventuali vincoli.",
      },
    ],
  },
  {
    category: "Framework Prompt",
    icon: "/icons/brain.png",
    prompts: [
      {
        title: "RTF — Role, Task, Format",
        prompt: "Ruolo: Ragiona e agisci come un [RUOLO] con [ANNI] anni di esperienza nel settore [SETTORE].\nTask: [DESCRIVI IL COMPITO DA SVOLGERE].\nFormato: restituisci l'output sotto forma di [tabella / elenco puntato / report / paragrafi strutturati].",
      },
      {
        title: "RISEN — Role, Instructions, Steps, End Goal, Narrowing",
        prompt: "Role: Sei un [RUOLO] con esperienza nel settore [SETTORE].\nInstructions: [DESCRIVI IL COMPITO PRINCIPALE].\nSteps:\n1. [PRIMO PASSO]\n2. [SECONDO PASSO]\n3. [TERZO PASSO]\n4. [QUARTO PASSO]\nEnd Goal: [RISULTATO FINALE DESIDERATO].\nNarrowing: concentrati su [VINCOLI, FOCUS SPECIFICI, RESTRIZIONI].",
      },
      {
        title: "RODES — Role, Objective, Details, Examples, Sense Check",
        prompt: "Role: Sei un esperto di [CAMPO] con focus su [SPECIALIZZAZIONE].\nObjective: [OBIETTIVO PRINCIPALE].\nDetails: [DETTAGLI AGGIUNTIVI, DATI DI INPUT, METRICHE].\nExamples: [FORNISCI 1-2 ESEMPI CONCRETI DI RISULTATO ATTESO].\nSense Check: prima di iniziare, analizza la mia richiesta e rispondi: hai compreso tutti i dettagli? Sei in grado di svolgere il compito? Hai bisogno di ulteriori informazioni?",
      },
      {
        title: "ABA — Ask Before Answer",
        prompt: "Ruolo: Sei un [RUOLO] specializzato in [CAMPO].\nIstruzioni: [DESCRIVI IL COMPITO].\nTono: [TONO DESIDERATO].\nAudience: [PUBBLICO DI RIFERIMENTO].\nObiettivo: [OBIETTIVO DEL CONTENUTO].\n\nPrima di rispondere, voglio che tu mi faccia delle domande per ottenere informazioni che possano aiutarti a generare una risposta migliore. Procedi una domanda alla volta.",
      },
    ],
  },
  {
    category: "Costruzione Prompt",
    icon: "/icons/gear.png",
    prompts: [
      {
        title: "Prompt a Blocchi Strutturato",
        prompt: "Ruolo: [RUOLO CON ANNI DI ESPERIENZA]\nIstruzioni: [AZIONE RICHIESTA]\nArgomento: [TEMA SPECIFICO]\nTipologia di media: [DOVE VERRÀ PUBBLICATO]\nAudience: [PUBBLICO TARGET]\nTono: [professionale / informale / tecnico / divulgativo]\nStile: [informativo / persuasivo / narrativo]\nObiettivo: [SCOPO DEL CONTENUTO]\nIncludi: [ELEMENTI SPECIFICI DA INSERIRE]\nFormato: [tabella / elenco / testo discorsivo / report]\nLingua: [LINGUA DI OUTPUT]\nLunghezza: [INDICAZIONE DI LUNGHEZZA]",
      },
      {
        title: "Chain of Thought — Ragionamento Guidato",
        prompt: "[INSERISCI LA TUA DOMANDA O PROBLEMA COMPLESSO]\n\nRagiona step by step:\n1. Capiamo il problema\n2. Facciamo un piano d'azione\n3. Seguiamo il piano punto per punto\n4. Controlliamo la soluzione\n\nMostra tutto il processo di ragionamento prima di fornire la risposta finale.",
      },
      {
        title: "RE2 + CoT — Rilettura e Ragionamento",
        prompt: "Domanda: [INSERISCI LA DOMANDA COMPLESSA]\n\nRileggi la domanda: [RIPETI LA STESSA DOMANDA]\n\nFornisci la risposta nel seguente formato: [FORMATO DESIDERATO].\n\nRagioniamo passo dopo passo.",
      },
      {
        title: "Prompt di Contesto per il Brand",
        prompt: "Ricevi e memorizza i testi che ti fornirò. Ti invierò i testi in un unico blocco.\n\n(INIZIO BLOCCO INFO)\n\nPROFILO DEL BRAND:\nNome: [NOME BRAND]\nLocalizzazione: [SEDE]\nMission: [MISSION]\nVision: [VISION]\nPosizionamento: [POSIZIONAMENTO]\nProdotti/servizi: [PRODOTTI]\nPunti di forza: [DIFFERENZIAZIONE]\nTono e stile: [TONO]\n\nTARGET AUDIENCE:\nProfilo 1: [DESCRIZIONE TARGET PRIMARIO]\nBisogni: [BISOGNI]\nTimori: [PAIN POINTS]\n\n(FINE BLOCCO INFO)\n\nConferma di aver acquisito le informazioni. Da questo momento, usa questi dati come contesto per ogni richiesta successiva.",
      },
      {
        title: "Plan-and-Solve — Pianifica e Risolvi",
        prompt: "Domanda: [INSERISCI IL PROBLEMA O COMPITO]\n\nRisolviamo il problema in questi passaggi:\n1. Capiamo il problema: analizza tutti gli elementi e le variabili coinvolte\n2. Facciamo un piano: suddividi il compito in sotto-operazioni gestibili\n3. Seguiamo il piano: esegui ogni sotto-operazione in ordine\n4. Controlliamo la soluzione: verifica la correttezza del risultato finale\n\nEstrai con cura le variabili rilevanti e calcolale con attenzione.",
      },
      {
        title: "Prompt per Immagini AI",
        prompt: "Genera un'immagine con le seguenti specifiche:\n\nSoggetto principale: [DESCRIZIONE DETTAGLIATA DEL SOGGETTO]\nAmbientazione/sfondo: [DETTAGLI DELL'AMBIENTE]\nStile artistico: [fotorealistico / illustrazione / pittura a olio / acquerello / 3D render / flat design]\nIlluminazione: [luce naturale / golden hour / studio / drammatica / soffusa]\nAngolazione: [primo piano / dal basso / dall'alto / panoramica]\nPalette colori: [COLORI DOMINANTI]\nMood/atmosfera: [EMOZIONE DA TRASMETTERE]\n\nPrompt negativo (cosa evitare): [ELEMENTI DA NON INCLUDERE]",
      },
    ],
  },
  {
    category: "Produttività e Progetti",
    icon: "/icons/target.png",
    prompts: [
      {
        title: "Brainstorming Strutturato",
        prompt: "Conduciamo una sessione di brainstorming per ideare [PRODOTTO/SERVIZIO/PROGETTO]. Segui questi passaggi:\n1. Elenca [NUMERO] problemi comuni che [GRUPPO TARGET] affronta in relazione a [TEMA]\n2. Per ciascun problema, proponi [NUMERO] possibili soluzioni innovative\n3. Seleziona le [NUMERO] idee più promettenti e sviluppale ulteriormente, descrivendo come potrebbero funzionare",
      },
      {
        title: "Project Management con AI",
        prompt: "Sto iniziando un progetto per [DESCRIZIONE PROGETTO] e ho molti compiti da coordinare. Aiutami a definire le priorità e a creare un calendario dettagliato che includa scadenze e responsabilità per ogni task. Inizia facendomi delle domande preliminari per capire di più sul progetto, poi procederemo a stilare un piano completo.\n\nDescrizione: [DETTAGLI DEL PROGETTO]",
      },
      {
        title: "Analisi Feedback Clienti",
        prompt: "Agisci come analista per [NOME BRAND]. Esamina le seguenti interazioni dei clienti:\n\n[INSERISCI RECENSIONI, COMMENTI, DOMANDE]\n\n1. Identifica i 3-5 temi principali emersi\n2. Per ciascun tema, evidenzia: sentimenti prevalenti (positivi/negativi/neutri), frequenza delle menzioni, insight chiave\n3. Proponi 3 azioni concrete per migliorare l'esperienza cliente\n4. Suggerisci 3 argomenti per contenuti basati sui bisogni emersi",
      },
      {
        title: "Schema Semantico di un Argomento",
        prompt: "Agisci come il responsabile della comunicazione per [NOME BRAND], operante nel settore [SETTORE]. Sviluppa uno schema semantico per l'argomento \"[ARGOMENTO]\" che risponda alle domande comuni di un potenziale cliente. Organizza le idee principali e i concetti correlati, includendo temi, sottotemi e interconnessioni. Utilizzeremo questo schema come base per il piano editoriale dei canali di comunicazione.",
      },
    ],
  },
];

const resourceLibrary: { category: string; icon: string; resources: { title: string; description: string; type: "pdf" | "link" | "checklist"; url?: string; content?: string; links?: { name: string; url: string; desc: string }[] }[] }[] = [
  {
    category: "Checklist",
    icon: "/icons/thiings/checklist.png",
    resources: [
      {
        title: "Checklist Pre-Pubblicazione",
        description: "10 controlli da fare prima di pubblicare contenuti generati con AI.",
        type: "checklist",
        content: "✅ CHECKLIST PRE-PUBBLICAZIONE\n\n□ Verificato accuratezza dei fatti\n□ Controllate citazioni e fonti\n□ Rimossi placeholder [ESEMPIO]\n□ Adattato il tono al brand\n□ Verificata coerenza con contenuti esistenti\n□ Controllato grammatica e refusi\n□ Ottimizzato per SEO (se applicabile)\n□ Verificata originalità (no plagiarismo)\n□ Aggiunto valore umano e insight\n□ Approvazione finale del responsabile",
      },
      {
        title: "Checklist Anti-Allucinazioni",
        description: "Come verificare e validare le informazioni generate dall'AI.",
        type: "checklist",
        content: "✅ CHECKLIST ANTI-ALLUCINAZIONI\n\n□ Chiesto fonti specifiche all'AI\n□ Verificate date ed eventi\n□ Cross-check con fonti autorevoli\n□ Controllati nomi e titoli\n□ Verificate statistiche e numeri\n□ Testati link (se forniti)\n□ Controllata coerenza interna\n□ Verificata plausibilità logica",
      },
      {
        title: "AI Policy Audit",
        description: "Checklist per valutare la policy AI aziendale.",
        type: "checklist",
        content: "✅ AI POLICY AUDIT\n\n□ Definiti i tool AI approvati\n□ Stabilito chi può usare AI (ruoli)\n□ Definiti dati che NON vanno inseriti\n□ Processo di revisione contenuti AI\n□ Training obbligatorio completato\n□ Clausole contrattuali aggiornate\n□ Informativa privacy aggiornata\n□ Processo di escalation definito\n□ Monitoraggio e audit periodico\n□ Compliance EU AI Act verificata",
      },
    ],
  },
  {
    category: "Link Curati",
    icon: "/icons/thiings/magnifier.png",
    resources: [
      {
        title: "Newsletter AI Consigliate",
        description: "Le migliori newsletter per restare aggiornati sul mondo AI.",
        type: "link",
        content: "📬 NEWSLETTER AI CONSIGLIATE",
        links: [
          { name: "The Rundown AI", url: "https://www.therundown.ai/", desc: "Notizie quotidiane" },
          { name: "Superhuman", url: "https://www.superhuman.ai/", desc: "AI per produttività" },
          { name: "Ben's Bites", url: "https://bensbites.beehiiv.com/", desc: "Panoramica giornaliera" },
          { name: "AI Tool Report", url: "https://aitoolreport.beehiiv.com/", desc: "Nuovi strumenti" },
          { name: "Prompt Engineering Daily", url: "https://www.neatprompts.com/", desc: "Tecniche prompt" },
          { name: "The Neuron", url: "https://www.theneurondaily.com/", desc: "Analisi approfondite" },
        ],
      },
      {
        title: "Corsi Gratuiti Consigliati",
        description: "Risorse formative gratuite di alta qualità.",
        type: "link",
        content: "🎓 CORSI GRATUITI AI",
        links: [
          { name: "Google AI Essentials", url: "https://www.coursera.org/learn/google-ai-essentials", desc: "Coursera" },
          { name: "Prompt Engineering", url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/", desc: "DeepLearning.AI" },
          { name: "Generative AI for Everyone", url: "https://www.coursera.org/learn/generative-ai-for-everyone", desc: "Coursera - Andrew Ng" },
          { name: "Microsoft AI Skills", url: "https://learn.microsoft.com/en-us/training/topics/artificial-intelligence", desc: "Microsoft Learn" },
          { name: "Introduction to Generative AI", url: "https://www.cloudskillsboost.google/course_templates/536", desc: "Google Cloud" },
          { name: "AI Fundamentals", url: "https://skillsbuild.org/adult-learners/explore-learning/artificial-intelligence", desc: "IBM SkillsBuild" },
        ],
      },
      {
        title: "Tool AI Essenziali",
        description: "I migliori strumenti AI da provare subito.",
        type: "link",
        content: "🛠️ TOOL AI ESSENZIALI",
        links: [
          { name: "ChatGPT", url: "https://chat.openai.com/", desc: "OpenAI - Chatbot" },
          { name: "Claude", url: "https://claude.ai/", desc: "Anthropic - Assistente AI" },
          { name: "Perplexity", url: "https://www.perplexity.ai/", desc: "Ricerca AI" },
          { name: "Midjourney", url: "https://www.midjourney.com/", desc: "Generazione immagini" },
          { name: "Gamma", url: "https://gamma.app/", desc: "Presentazioni AI" },
          { name: "ElevenLabs", url: "https://elevenlabs.io/", desc: "Sintesi vocale" },
        ],
      },
    ],
  },
];

export default function DashboardPage() {
  const { progress, setUserName, reset, allModulesCompleted } = useLearning();
  const { profile, updateProfile, logout } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<Section>("learn");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedPromptCat, setSelectedPromptCat] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [selectedResourceCat, setSelectedResourceCat] = useState(0);
  const [copiedResource, setCopiedResource] = useState<string | null>(null);
  const [expandedResource, setExpandedResource] = useState<string | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    ruolo: "",
    azienda: "",
  });

  // Sync userName from profile
  useEffect(() => {
    if (profile && !progress.userName) {
      setUserName(`${profile.nome} ${profile.cognome}`);
    }
  }, [profile, progress.userName, setUserName]);

  const completedCount = Object.keys(progress.moduleScores).length;
  const overallPercent = (completedCount / modules.length) * 100;
  const maxTotalCredits = modules.reduce((sum, m) => sum + m.maxCredits, 0);

  const level = Math.floor(progress.totalCredits / 50) + 1;
  const creditsInLevel = progress.totalCredits % 50;
  const creditsForNextLevel = 50;

  // ── Motivational quotes ──
  const quotes = [
    "L'AI non sostituisce la creatività, la amplifica.",
    "Un buon prompt è metà del lavoro fatto.",
    "Impara, testa, verifica: il ciclo dell'AI consapevole.",
    "La tecnologia è uno strumento. La strategia sei tu.",
    "Ogni modulo completato è un passo verso la padronanza.",
    "Chi sa fare le domande giuste ottiene le risposte migliori.",
    "L'innovazione inizia dalla curiosità.",
  ];
  const todayQuote = quotes[new Date().getDate() % quotes.length];

  // ── Next module to continue ──
  const nextModule = useMemo(() => {
    for (const mod of modules) {
      if (!progress.moduleScores[mod.id]) return mod;
    }
    return null;
  }, [progress.moduleScores]);

  // ── Detailed stats ──
  const avgAccuracy = useMemo(() => {
    const scores = Object.values(progress.moduleScores);
    if (scores.length === 0) return 0;
    const total = scores.reduce((s, sc) => s + (sc.score / sc.maxCredits) * 100, 0);
    return Math.round(total / scores.length);
  }, [progress.moduleScores]);

  const strongestModule = useMemo(() => {
    let best: { title: string; pct: number } | null = null;
    for (const mod of modules) {
      const sc = progress.moduleScores[mod.id];
      if (sc) {
        const pct = (sc.score / sc.maxCredits) * 100;
        if (!best || pct > best.pct) best = { title: mod.title, pct };
      }
    }
    return best;
  }, [progress.moduleScores]);

  const weakestModule = useMemo(() => {
    let worst: { title: string; pct: number } | null = null;
    for (const mod of modules) {
      const sc = progress.moduleScores[mod.id];
      if (sc) {
        const pct = (sc.score / sc.maxCredits) * 100;
        if (!worst || pct < worst.pct) worst = { title: mod.title, pct };
      }
    }
    return worst;
  }, [progress.moduleScores]);

  // ── Weekly goal ──
  const weeklyGoal = 2;
  const thisWeekCompletions = useMemo(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    return Object.values(progress.moduleScores).filter(
      (s) => new Date(s.completedAt) >= startOfWeek
    ).length;
  }, [progress.moduleScores]);

  // ── Leaderboard ──
  const leaderboard = useMemo(() => {
    const fakeUsers = [
      { name: "Marco R.", xp: 230 },
      { name: "Giulia S.", xp: 195 },
      { name: "Alessia T.", xp: 170 },
      { name: "Luca M.", xp: 140 },
      { name: "Sara B.", xp: 110 },
    ];
    // Formatta nome: "Mario Rossi" → "Mario R."
    const formatName = (fullName: string) => {
      const parts = fullName.trim().split(/\s+/);
      if (parts.length < 2) return fullName;
      return `${parts[0]} ${parts[1].charAt(0).toUpperCase()}.`;
    };
    const displayName = progress.userName ? formatName(progress.userName) : "Tu";
    const you = { name: displayName, xp: progress.totalCredits, isYou: true };
    const all = [...fakeUsers, you].sort((a, b) => b.xp - a.xp).slice(0, 6);
    return all.map((u, i) => ({ ...u, rank: i + 1, isYou: "isYou" in u }));
  }, [progress.totalCredits, progress.userName]);

  // ── Competency areas from modules ──
  const competencies = useMemo(() => {
    const areas = [
      { label: "Fondamenti AI", moduleIds: ["modulo-1"] },
      { label: "Strumenti", moduleIds: ["modulo-2"] },
      { label: "Prompt Base", moduleIds: ["modulo-3"] },
      { label: "Prompt Avanzato", moduleIds: ["modulo-4"] },
      { label: "Creazione", moduleIds: ["modulo-5"] },
      { label: "Verifica", moduleIds: ["modulo-6"] },
    ];
    return areas.map((a) => {
      const scores = a.moduleIds.map((id) => progress.moduleScores[id]).filter(Boolean);
      const pct = scores.length > 0
        ? Math.round(scores.reduce((s, sc) => s + (sc.score / sc.maxCredits) * 100, 0) / scores.length)
        : 0;
      return { ...a, pct };
    });
  }, [progress.moduleScores]);

  // ── Featured videos for Risorse section ──
  const featuredVideos = useMemo(() => {
    return modules
      .flatMap((mod) =>
        mod.resources
          .filter((r) => r.type === "video" && Boolean(r.url))
          .map((r) => ({
            id: r.id,
            title: r.title,
            description: r.description,
            url: r.url!,
            moduleTitle: mod.title,
          })),
      )
      .slice(0, 4);
  }, []);

  // Close mobile sidebar on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSectionClick = (id: Section) => {
    setActiveSection(id);
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* ══════ MOBILE OVERLAY ══════ */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ══════ SIDEBAR ══════ */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50 bg-white border border-border/80 rounded-r-3xl shadow-[0_8px_30px_rgba(15,23,42,0.08)] overflow-hidden
          flex flex-col transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen
          ${sidebarCollapsed ? "lg:w-[72px]" : "lg:w-64"}
          w-72
        `}
      >
        {/* Sidebar header */}
        <div className={`flex items-center gap-3 p-4 border-b border-border ${sidebarCollapsed ? "lg:justify-center lg:px-2" : ""}`}>
          <img
            src={sidebarCollapsed ? "/logo/Logo.png" : "/logo/Logo_clarivio.svg"}
            alt="Clarivio"
            className={`transition-all duration-300 ${sidebarCollapsed ? "h-8 w-8 object-contain" : "h-8 w-auto"}`}
          />
          {/* Mobile close */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden text-foreground-muted hover:text-foreground cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
          {sectionTabs.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSectionClick(s.id)}
              title={sidebarCollapsed ? s.label : undefined}
              className={`
                w-full flex items-center gap-3 rounded-xl px-3 py-2.5
                text-sm font-medium transition-all cursor-pointer
                ${sidebarCollapsed ? "lg:justify-center lg:px-2" : ""}
                ${activeSection === s.id
                  ? "bg-viola/10 text-viola"
                  : "text-foreground-muted hover:bg-surface hover:text-foreground"
                }
              `}
            >
              <span className="shrink-0">{s.icon}</span>
              <span className={`transition-all duration-300 whitespace-nowrap ${sidebarCollapsed ? "lg:hidden" : ""}`}>
                {s.label}
              </span>
              {!s.active && (
                <img src="/icons/shield.png" alt="" className={`h-4 w-4 object-contain opacity-40 ml-auto shrink-0 ${sidebarCollapsed ? "lg:hidden" : ""}`} />
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className={`border-t border-border p-3 space-y-2 ${sidebarCollapsed ? "lg:px-2" : ""}`}>
          {/* Collapse toggle (desktop only) */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`hidden lg:flex items-center gap-2 w-full rounded-xl px-3 py-2 text-xs text-foreground-muted hover:bg-surface hover:text-foreground transition-colors cursor-pointer ${sidebarCollapsed ? "justify-center px-2" : ""}`}
          >
            {sidebarCollapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
            <span className={`${sidebarCollapsed ? "lg:hidden" : ""}`}>Comprimi</span>
          </button>

          {/* Reset */}
          <button
            onClick={reset}
            title={sidebarCollapsed ? "Reset" : undefined}
            className={`flex items-center gap-2 w-full rounded-xl px-3 py-2 text-xs text-foreground-muted hover:bg-danger/10 hover:text-danger transition-colors cursor-pointer ${sidebarCollapsed ? "lg:justify-center lg:px-2" : ""}`}
          >
            <RotateCcw className="h-4 w-4 shrink-0" />
            <span className={`${sidebarCollapsed ? "lg:hidden" : ""}`}>Reset progresso</span>
          </button>
        </div>
      </aside>

      {/* ══════ MAIN CONTENT ══════ */}
      <main className="flex-1 min-w-0">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="cursor-pointer text-foreground">
            <Menu className="h-5 w-5" />
          </button>
          <img src="/logo/Logo_clarivio.svg" alt="Clarivio" className="h-6 w-auto" />
          <span className="text-xs text-foreground-muted">
            {sectionTabs.find((s) => s.id === activeSection)?.label}
          </span>
        </div>

        <div className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          <div className="mx-auto max-w-3xl space-y-6 sm:space-y-8">

            {/* ═══════════ LEARN SECTION ═══════════ */}
            {activeSection === "learn" && (
              <div className="space-y-6 sm:space-y-8">

                {/* ── Motivational Quote ── */}
                <div className="flex items-start gap-3 rounded-2xl bg-gradient-to-r from-viola/5 to-transparent p-4 sm:p-5">
                  <img src="/icons/pen.png" alt="" className="h-6 w-6 object-contain shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base italic text-foreground-muted leading-relaxed" style={{ fontFamily: "'Newsreader', serif" }}>
                    &ldquo;{todayQuote}&rdquo;
                  </p>
                </div>

                {/* ── Continua da qui (hero) ── */}
                {nextModule && (
                  <div
                    onClick={() => router.push(`/modulo/${nextModule.id}`)}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-viola to-viola-light p-5 sm:p-6 text-white cursor-pointer hover:shadow-xl hover:shadow-viola/20 transition-all hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-4">
                      <img src={nextModule.icon} alt="" className="h-14 w-14 sm:h-16 sm:w-16 object-contain brightness-0 invert opacity-90" />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-medium text-white/70 uppercase tracking-wider">Continua da qui</span>
                        <h2 className="text-lg sm:text-xl font-bold leading-tight mt-0.5 truncate">{nextModule.title}</h2>
                        <p className="text-xs sm:text-sm text-white/80 line-clamp-1 mt-1">{nextModule.description}</p>
                      </div>
                      <ChevronRight className="h-6 w-6 text-white/60 shrink-0" />
                    </div>
                    {/* Decorative circle */}
                    <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-white/10" />
                  </div>
                )}

                {/* ── User Profile Card ── */}
                <Card className="p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-viola/10 text-viola font-bold text-sm">
                        {profile.nome[0]}{profile.cognome[0]}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-sm truncate">{profile.nome} {profile.cognome}</div>
                        <div className="text-[11px] text-foreground-muted truncate">{profile.ruolo} · {profile.azienda}</div>
                      </div>
                    </div>
                    <button
                      onClick={logout}
                      className="text-foreground-muted hover:text-danger transition-colors cursor-pointer shrink-0"
                      title="Esci"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                </Card>

                {/* ── Stats row — 3D icons + Streak ── */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  <Card className="p-2.5 sm:p-4 text-center">
                    <div className="flex justify-center mb-1">
                      <img src="/icons/trophy.png" alt="Livello" className="h-8 w-8 sm:h-12 sm:w-12 object-contain" />
                    </div>
                    <div className="text-base sm:text-xl font-bold text-viola">Lv.{level}</div>
                    <div className="text-[9px] sm:text-xs text-foreground-muted">Livello</div>
                  </Card>
                  <Card className="p-2.5 sm:p-4 text-center">
                    <div className="flex justify-center mb-1">
                      <img src="/icons/brain.png" alt="Crediti XP" className="h-8 w-8 sm:h-12 sm:w-12 object-contain" />
                    </div>
                    <div className="text-base sm:text-xl font-bold text-success">{progress.totalCredits}</div>
                    <div className="text-[9px] sm:text-xs text-foreground-muted">XP</div>
                  </Card>
                  <Card className="p-2.5 sm:p-4 text-center">
                    <div className="flex justify-center mb-1">
                      <img src="/icons/target.png" alt="Completati" className="h-8 w-8 sm:h-12 sm:w-12 object-contain" />
                    </div>
                    <div className="text-base sm:text-xl font-bold text-warning">{completedCount}/{modules.length}</div>
                    <div className="text-[9px] sm:text-xs text-foreground-muted">Completati</div>
                  </Card>
                  <Card className="p-2.5 sm:p-4 text-center">
                    <div className="flex justify-center mb-1">
                      <img src="/icons/medal.png" alt="Streak" className={`h-8 w-8 sm:h-12 sm:w-12 object-contain ${progress.streak === 0 ? "grayscale opacity-30" : ""}`} />
                    </div>
                    <div className={`text-base sm:text-xl font-bold ${progress.streak > 0 ? "text-orange-500" : "text-foreground-muted"}`}>{progress.streak}</div>
                    <div className="text-[9px] sm:text-xs text-foreground-muted">Streak</div>
                  </Card>
                </div>

                {/* ── Weekly Goal ── */}
                <Card className="p-4 sm:p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <img src="/icons/target.png" alt="" className="h-6 w-6 object-contain" />
                    <h2 className="font-semibold text-sm sm:text-base">Obiettivo Settimanale</h2>
                    <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${thisWeekCompletions >= weeklyGoal ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}`}>
                      {thisWeekCompletions >= weeklyGoal ? "Completato!" : `${thisWeekCompletions}/${weeklyGoal}`}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-surface-alt overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-[width] duration-700 ${thisWeekCompletions >= weeklyGoal ? "bg-success" : "bg-gradient-to-r from-viola to-viola-light"}`}
                      style={{ width: `${Math.min(100, (thisWeekCompletions / weeklyGoal) * 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-foreground-muted mt-2">Completa {weeklyGoal} moduli questa settimana</p>
                </Card>

                {/* ── Progress overview ── */}
                <Card className="p-4 sm:p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-base sm:text-lg">Progressi Generali</h2>
                    <span className="text-sm font-bold text-viola">{Math.round(overallPercent)}%</span>
                  </div>

                  <ProgressBar
                    value={overallPercent}
                    label={`${completedCount}/${modules.length} moduli completati`}
                    size="lg"
                    showPercentage={false}
                  />

                  {progress.totalCredits < maxTotalCredits && (
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-xs text-foreground-muted mb-1">
                        <span>Livello {level} → {level + 1}</span>
                        <span>{creditsInLevel}/{creditsForNextLevel} XP</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-surface-alt overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-warning to-warning/70 transition-[width] duration-700"
                          style={{ width: `${(creditsInLevel / creditsForNextLevel) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {allModulesCompleted && (
                    <Button onClick={() => router.push("/attestato")} className="mt-2 w-full justify-center">
                      <img src="/icons/award.png" alt="" className="h-4 w-4 object-contain" />
                      Visualizza Attestato
                    </Button>
                  )}
                </Card>

                {/* ── Detailed Stats ── */}
                {completedCount > 0 && (
                  <Card className="p-4 sm:p-5 space-y-4">
                    <div className="flex items-center gap-2 mb-1">
                      <img src="/icons/magnifier.png" alt="" className="h-6 w-6 object-contain" />
                      <h2 className="font-semibold text-base sm:text-lg">Statistiche Dettagliate</h2>
                    </div>

                    {/* Accuracy */}
                    <div className="flex items-center justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-foreground-muted">Accuratezza media</span>
                      <span className={`text-sm font-bold ${avgAccuracy >= 80 ? "text-success" : avgAccuracy >= 60 ? "text-warning" : "text-danger"}`}>{avgAccuracy}%</span>
                    </div>

                    {/* Per module bar chart */}
                    <div className="space-y-2.5">
                      {modules.map((mod, i) => {
                        const sc = progress.moduleScores[mod.id];
                        const pct = sc ? Math.round((sc.score / sc.maxCredits) * 100) : 0;
                        return (
                          <div key={mod.id}>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-foreground-muted truncate pr-2">M{i + 1}. {mod.title}</span>
                              <span className="font-medium shrink-0">{sc ? `${pct}%` : "—"}</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-surface-alt overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-[width] duration-700 ${pct >= 80 ? "bg-success" : pct > 0 ? "bg-warning" : "bg-surface-alt"}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Strongest / Weakest */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {strongestModule && (
                        <div className="rounded-xl bg-success/5 p-3">
                          <span className="text-[10px] uppercase tracking-wider text-success font-medium">Punto forte</span>
                          <p className="text-xs font-semibold mt-1 line-clamp-1">{strongestModule.title}</p>
                          <p className="text-xs text-success font-bold">{Math.round(strongestModule.pct)}%</p>
                        </div>
                      )}
                      {weakestModule && weakestModule.title !== strongestModule?.title && (
                        <div className="rounded-xl bg-warning/5 p-3">
                          <span className="text-[10px] uppercase tracking-wider text-warning font-medium">Da migliorare</span>
                          <p className="text-xs font-semibold mt-1 line-clamp-1">{weakestModule.title}</p>
                          <p className="text-xs text-warning font-bold">{Math.round(weakestModule.pct)}%</p>
                        </div>
                      )}
                    </div>
                  </Card>
                )}

                {/* ── Competency Map ── */}
                {completedCount > 0 && (
                  <Card className="p-4 sm:p-5 space-y-4">
                    <div className="flex items-center gap-2">
                      <img src="/icons/trophy.png" alt="" className="h-6 w-6 object-contain" />
                      <h2 className="font-semibold text-base sm:text-lg">Mappa Competenze</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {competencies.map((c) => (
                        <div key={c.label} className="relative rounded-xl border border-border p-3 text-center overflow-hidden">
                          {/* Fill indicator */}
                          <div
                            className="absolute inset-0 bg-viola/5 transition-[height] duration-700"
                            style={{ height: `${c.pct}%`, top: "auto" }}
                          />
                          <div className="relative z-10">
                            <div className={`text-xl sm:text-2xl font-bold ${c.pct > 0 ? "text-viola" : "text-foreground-muted/30"}`}>
                              {c.pct}%
                            </div>
                            <div className="text-[10px] sm:text-xs text-foreground-muted mt-0.5">{c.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}


                {/* ── Percorso Formativo con Agenda ── */}
                <div className="space-y-3">
                  <h2 className="font-semibold text-base sm:text-lg">Percorso Formativo</h2>
                  <div className="space-y-0">
                    {modules.map((mod, i) => (
                      <div key={mod.id}>
                        <ModuleCard
                          module={mod}
                          index={i}
                          isLast={i === modules.length - 1}
                        />
                        {/* Module Agenda */}
                        {mod.agenda && mod.agenda.length > 0 && (
                          <div className="ml-[52px] sm:ml-[64px] -mt-1 mb-4">
                            <details className="group">
                              <summary className="flex items-center gap-1.5 text-xs text-foreground-muted cursor-pointer hover:text-viola transition-colors select-none list-none">
                                <img src="/icons/brain.png" alt="" className="h-4 w-4 object-contain" />
                                <span>Agenda del modulo ({mod.agenda.length} argomenti)</span>
                                <ChevronRight className="h-3 w-3 transition-transform group-open:rotate-90" />
                              </summary>
                              <ul className="mt-2 ml-1 space-y-1 border-l-2 border-viola/15 pl-3">
                                {mod.agenda.map((item, ai) => (
                                  <li key={ai} className="text-xs text-foreground-muted flex items-start gap-2 py-0.5">
                                    <span className="text-[10px] font-bold text-viola/50 mt-px shrink-0">{ai + 1}.</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </details>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Activity Timeline ── */}
                {progress.activityLog.length > 0 && (
                  <Card className="p-4 sm:p-5 space-y-3">
                    <h2 className="font-semibold text-base sm:text-lg">Attività Recente</h2>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {progress.activityLog.slice(0, 10).map((entry, i) => {
                        const icons: Record<string, React.ReactNode> = {
                          quiz_completed: <img src="/icons/target.png" alt="" className="h-4 w-4 object-contain" />,
                          badge_unlocked: <img src="/icons/award.png" alt="" className="h-4 w-4 object-contain" />,
                          level_up: <img src="/icons/trophy.png" alt="" className="h-4 w-4 object-contain" />,
                          streak: <img src="/icons/medal.png" alt="" className="h-4 w-4 object-contain" />,
                        };
                        const ago = getTimeAgo(entry.timestamp);
                        return (
                          <div key={i} className="flex items-start gap-2.5 text-sm">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-surface mt-0.5">
                              {icons[entry.type] || <img src="/icons/target.png" alt="" className="h-3.5 w-3.5 object-contain" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-foreground-muted leading-relaxed">{entry.message}</p>
                              <p className="text-[10px] text-foreground-muted/60 mt-0.5">{ago}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                )}

                {/* ── Badge & Micro-certificati ── */}
                <div className="space-y-3">
                  <h2 className="font-semibold text-base sm:text-lg">Badge & Traguardi</h2>
                  {/* Micro-certificate badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {completedCount >= 3 && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-viola/10 px-3 py-1 text-xs font-medium text-viola">
                        <img src="/icons/trophy.png" alt="" className="h-4 w-4 object-contain" /> Prima metà completata
                      </span>
                    )}
                    {avgAccuracy >= 90 && completedCount > 0 && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                        <img src="/icons/trophy.png" alt="" className="h-4 w-4 object-contain" /> Accuratezza 90%+
                      </span>
                    )}
                    {progress.streak >= 3 && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-500">
                        <img src="/icons/medal.png" alt="" className="h-4 w-4 object-contain" /> Streak 3+ giorni
                      </span>
                    )}
                    {allModulesCompleted && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-3 py-1 text-xs font-medium text-warning">
                        <img src="/icons/award.png" alt="" className="h-4 w-4 object-contain" /> Percorso completo
                      </span>
                    )}
                  </div>
                  <BadgeGrid />
                </div>
              </div>
            )}

            {/* ═══════════ TOOLKIT PROMPT LIBRARY ═══════════ */}
            {activeSection === "toolkit" && (
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center sm:text-left">
                  <div className="flex items-center gap-3 mb-2 justify-center sm:justify-start">
                    <img src="/icons/gear.png" alt="" className="h-8 w-8 object-contain" />
                    <h2 className="text-xl sm:text-2xl font-bold">Libreria Prompt</h2>
                  </div>
                  <p className="text-sm text-foreground-muted max-w-xl">
                    Prompt professionali testati e ottimizzati, pronti da copiare e personalizzare. Sostituisci i campi tra [PARENTESI] con i tuoi dati.
                  </p>
                </div>

                {/* Category tabs */}
                <div className="flex flex-wrap gap-2">
                  {promptLibrary.map((cat, i) => (
                    <button
                      key={cat.category}
                      onClick={() => setSelectedPromptCat(i)}
                      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium transition-all ${
                        selectedPromptCat === i
                          ? "bg-viola text-white shadow-sm"
                          : "bg-surface text-foreground-muted hover:bg-surface-alt"
                      }`}
                    >
                      <img src={cat.icon} alt="" className="h-4 w-4 object-contain" />
                      {cat.category}
                    </button>
                  ))}
                </div>

                {/* Prompt cards */}
                <div className="space-y-4">
                  {promptLibrary[selectedPromptCat].prompts.map((p) => (
                    <Card key={p.title} className="p-4 sm:p-5 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold text-sm sm:text-base">{p.title}</h3>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(p.prompt);
                            setCopiedPrompt(p.title);
                            setTimeout(() => setCopiedPrompt(null), 2000);
                          }}
                          className={`shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                            copiedPrompt === p.title
                              ? "bg-success/10 text-success"
                              : "bg-viola/10 text-viola hover:bg-viola/20"
                          }`}
                        >
                          {copiedPrompt === p.title ? (
                            <>
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              Copiato!
                            </>
                          ) : (
                            <>
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Copia
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed bg-surface rounded-xl p-3 sm:p-4 border border-border font-mono whitespace-pre-wrap">
                        {p.prompt}
                      </p>
                    </Card>
                  ))}
                </div>

                {/* Prompt count */}
                <div className="text-center pt-2">
                  <span className="inline-flex items-center gap-2 text-xs text-foreground-muted bg-surface rounded-full px-4 py-2">
                    <img src="/icons/target.png" alt="" className="h-4 w-4 object-contain" />
                    {promptLibrary.reduce((sum, c) => sum + c.prompts.length, 0)} prompt disponibili in {promptLibrary.length} categorie
                  </span>
                </div>
              </div>
            )}

            {/* ═══════════ RISORSE LIBRARY ═══════════ */}
            {activeSection === "risorse" && (
              <div className="space-y-6">
                {/* Header */}
                <Card className="p-5 sm:p-6">
                <div className="flex items-center gap-4">
                  <img src="/icons/thiings/rocket.png" alt="" className="w-14 h-14 object-contain shrink-0" />
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold">Risorse e Materiali</h2>
                    <p className="text-sm text-foreground-muted mt-1 max-w-xl">
                      Guide, tool, corsi, video e materiali operativi — tutto il materiale di approfondimento in un unico luogo.
                    </p>
                  </div>
                </div>
                </Card>

                {/* ── Quick Stats ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-green-50 border border-green-200/60 p-4 flex items-center gap-3 shadow-sm">
                    <img src="/icons/thiings/toolbox.png" alt="" className="w-11 h-11 object-contain shrink-0" />
                    <div>
                      <p className="text-2xl font-bold text-green-700">
                        {modules.reduce((sum, m) => sum + m.resources.filter(r => r.type === "tool").length, 0)}
                      </p>
                      <p className="text-xs text-foreground-muted mt-0.5">Tool AI</p>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-blue-50 border border-blue-200/60 p-4 flex items-center gap-3 shadow-sm">
                    <img src="/icons/thiings/desktop.png" alt="" className="w-11 h-11 object-contain shrink-0" />
                    <div>
                      <p className="text-2xl font-bold text-blue-700">
                        {modules.reduce((sum, m) => sum + m.resources.filter(r => r.type === "link").length, 0)}
                      </p>
                      <p className="text-xs text-foreground-muted mt-0.5">Link e Corsi</p>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-purple-50 border border-purple-200/60 p-4 flex items-center gap-3 shadow-sm">
                    <img src="/icons/thiings/video.png" alt="" className="w-11 h-11 object-contain shrink-0" />
                    <div>
                      <p className="text-2xl font-bold text-purple-700">
                        {modules.reduce((sum, m) => sum + m.resources.filter(r => r.type === "video").length, 0)}
                      </p>
                      <p className="text-xs text-foreground-muted mt-0.5">Video</p>
                    </div>
                  </div>
                </div>

                {/* ── 4 Video visibili ── */}
                <Card className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="/icons/thiings/television.png" alt="" className="w-7 h-7 object-contain" />
                    <h3 className="text-lg font-semibold">Video consigliati</h3>
                    <span className="ml-auto text-xs text-foreground-muted">{featuredVideos.length}/4</span>
                  </div>

                  {featuredVideos.length > 0 ? (
                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                      {featuredVideos.map((video) => (
                        <a
                          key={video.id}
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl border border-border bg-white p-4 hover:border-viola/40 hover:bg-viola/5 transition-all group"
                        >
                          <div className="flex items-start gap-3">
                            <img src="/icons/thiings/video.png" alt="" className="w-10 h-10 object-contain shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-foreground-muted mb-1 line-clamp-1">{video.moduleTitle}</p>
                              <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-viola transition-colors">{video.title}</h4>
                              <p className="text-xs text-foreground-muted mt-1 line-clamp-2">{video.description}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-foreground-muted group-hover:text-viola shrink-0 mt-0.5" />
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-foreground-muted">Nessun video disponibile al momento.</p>
                  )}
                </Card>

                {/* ── Per-Module Resources ── */}
                <Card className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="/icons/thiings/book.png" alt="" className="w-7 h-7 object-contain" />
                    <h3 className="text-lg font-semibold">Risorse per Modulo</h3>
                  </div>
                  <p className="text-sm text-foreground-muted mb-4">
                    Ogni modulo ha risorse specifiche di approfondimento: tool, link, corsi e video selezionati.
                  </p>
                  <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {modules.map((mod, idx) => {
                      const toolCount = mod.resources.filter(r => r.type === "tool").length;
                      const linkCount = mod.resources.filter(r => r.type === "link").length;
                      const videoCount = mod.resources.filter(r => r.type === "video").length;
                      return (
                        <Card
                          key={mod.id}
                          className="p-0 overflow-hidden hover:border-border hover:shadow-md transition-all cursor-pointer group"
                          onClick={() => router.push(`/modulo/${mod.id}`)}
                        >
                          <div className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-alt text-foreground text-sm font-bold border border-border">
                                {idx + 1}
                              </span>
                              <h4 className="font-semibold text-sm transition-colors line-clamp-1">
                                {mod.title}
                              </h4>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-foreground-muted">
                              {toolCount > 0 && (
                                <span className="flex items-center gap-1">
                                  <img src="/icons/thiings/toolbox.png" alt="" className="w-4 h-4 object-contain" /> {toolCount}
                                </span>
                              )}
                              {linkCount > 0 && (
                                <span className="flex items-center gap-1">
                                  <img src="/icons/thiings/desktop.png" alt="" className="w-4 h-4 object-contain" /> {linkCount}
                                </span>
                              )}
                              {videoCount > 0 && (
                                <span className="flex items-center gap-1">
                                  <img src="/icons/thiings/video.png" alt="" className="w-4 h-4 object-contain" /> {videoCount}
                                </span>
                              )}
                              <span className="ml-auto text-[11px] bg-surface-alt px-2 py-0.5 rounded-full">
                                {mod.resources.length} risors{mod.resources.length === 1 ? "a" : "e"}
                              </span>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </Card>

                {/* ── Category tabs (existing resources) ── */}
                <Card className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="/icons/thiings/tool-belt.png" alt="" className="w-7 h-7 object-contain" />
                    <h3 className="text-lg font-semibold">Materiali Operativi</h3>
                  </div>
                  <p className="text-sm text-foreground-muted mb-4">
                    Guide pratiche, cheat sheet, checklist e link curati selezionati dal team Clarivio.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-5">
                    {resourceLibrary.map((cat, i) => (
                      <button
                        key={cat.category}
                        onClick={() => setSelectedResourceCat(i)}
                        className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                          selectedResourceCat === i
                            ? "bg-viola text-white shadow-sm"
                            : "bg-surface border border-border text-foreground-muted hover:bg-surface-alt hover:border-viola/30"
                        }`}
                      >
                        <img src={cat.icon} alt="" className="h-4 w-4 object-contain" />
                        {cat.category}
                        <span className={`text-[10px] rounded-full px-1.5 py-0.5 font-bold ${
                          selectedResourceCat === i ? "bg-white/20" : "bg-viola/10 text-viola"
                        }`}>
                          {cat.resources.length}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Full-width resource list (no modal) */}
                  <div className="space-y-3">
                    {resourceLibrary[selectedResourceCat].resources.map((r) => {
                      const isExpanded = expandedResource === r.title;
                      const typeIcon = r.type === "pdf" ? "/icons/thiings/novel.png" :
                                       r.type === "checklist" ? "/icons/thiings/checklist.png" : "/icons/thiings/desktop.png";
                      const typeLabel = r.type === "pdf" ? "Guida" : r.type === "checklist" ? "Checklist" : "Link";

                      return (
                        <Card key={r.title} className="p-0 overflow-hidden transition-all">
                          {/* Clickable header row */}
                          <div
                            className="flex items-center gap-4 p-4 sm:p-5 cursor-pointer hover:bg-surface/50 transition-colors group"
                            onClick={() => setExpandedResource(isExpanded ? null : r.title)}
                          >
                            {/* 3D Icon */}
                            <img src={typeIcon} alt="" className="w-12 h-12 object-contain shrink-0" />

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <span className="inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md font-semibold mb-1 bg-surface-alt text-foreground-muted border border-border">
                                {typeLabel}
                              </span>
                              <h3 className="font-semibold text-sm sm:text-base group-hover:text-viola transition-colors">
                                {r.title}
                              </h3>
                              <p className="text-xs text-foreground-muted line-clamp-1 mt-0.5">
                                {r.description}
                              </p>
                            </div>

                            {/* Expand indicator */}
                            <ChevronRight className={`h-5 w-5 text-foreground-muted shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`} />
                          </div>

                          {/* Expanded content (inline, no modal) */}
                          {isExpanded && (
                            <div className="border-t border-border bg-surface/30">
                              <div className="p-5 sm:p-6 space-y-4">
                                <p className="text-sm text-foreground-muted">{r.description}</p>

                                {/* Text content */}
                                {r.content && !r.links && (
                                  <div className="bg-surface-alt rounded-xl p-4 border border-border">
                                    <StructuredDocument content={r.content} />
                                  </div>
                                )}

                                {/* Links list */}
                                {r.links && (
                                  <div className="space-y-2">
                                    <p className="text-sm text-foreground-muted">{r.content}</p>
                                    {r.links.map((link) => (
                                      <a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 rounded-xl bg-white border border-border hover:border-viola/50 hover:bg-viola/5 transition-all group/link"
                                      >
                                        <div className="w-9 h-9 rounded-lg bg-viola/10 flex items-center justify-center shrink-0 group-hover/link:bg-viola/20 transition-colors">
                                          <img src="/icons/thiings/book-launch.png" alt="" className="w-5 h-5 object-contain" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className="font-semibold text-sm group-hover/link:text-viola transition-colors">{link.name}</p>
                                          <p className="text-xs text-foreground-muted truncate">{link.desc}</p>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-foreground-muted group-hover/link:text-viola transition-colors shrink-0" />
                                      </a>
                                    ))}
                                  </div>
                                )}

                                {/* Copy button */}
                                {r.content && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigator.clipboard.writeText(r.content!);
                                      setCopiedResource(r.title);
                                      setTimeout(() => setCopiedResource(null), 2000);
                                    }}
                                    className={`w-full py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                      copiedResource === r.title
                                        ? "bg-success/10 text-success"
                                        : "bg-viola text-white hover:bg-viola/90"
                                    }`}
                                  >
                                    {copiedResource === r.title ? (
                                      <>
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Copiato negli appunti!
                                      </>
                                    ) : (
                                      <>
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        Copia contenuto
                                      </>
                                    )}
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </Card>

                {/* ── Total summary ── */}
                <div className="text-center pt-4 border-t border-border">
                  <span className="text-xs text-foreground-muted">
                    {modules.reduce((sum, m) => sum + m.resources.length, 0)} risorse per modulo
                    {" · "}
                    {resourceLibrary.reduce((sum, c) => sum + c.resources.length, 0)} materiali operativi
                  </span>
                </div>
              </div>
            )}

            {/* ═══════════ PROFILO ═══════════ */}
            {activeSection === "profilo" && (
              <div className="max-w-2xl mx-auto space-y-8">
                {/* Profile Header */}
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    {profile.avatar ? (
                      <img
                        src={profile.avatar}
                        alt="Avatar"
                        className="h-28 w-28 rounded-full object-cover ring-4 ring-viola/20"
                      />
                    ) : (
                      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-viola to-viola/70 text-white text-4xl font-bold ring-4 ring-viola/20">
                        {profile.nome[0]}{profile.cognome[0]}
                      </div>
                    )}
                    <label className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center bg-viola rounded-full cursor-pointer hover:bg-viola/90 transition-colors shadow-lg">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              const base64 = reader.result as string;
                              updateProfile({ avatar: base64 });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                  <h2 className="text-2xl font-bold">{profile.nome} {profile.cognome}</h2>
                  <p className="text-foreground-muted">{profile.ruolo} {profile.azienda && `@ ${profile.azienda}`}</p>
                  <p className="text-xs text-foreground-muted mt-2">
                    Iscritto dal {new Date(profile.registeredAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-4 gap-3">
                  <div className="text-center p-4 rounded-2xl bg-surface">
                    <p className="text-2xl font-bold text-viola">{level}</p>
                    <p className="text-xs text-foreground-muted">Livello</p>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-surface">
                    <p className="text-2xl font-bold">{progress.totalCredits}</p>
                    <p className="text-xs text-foreground-muted">Crediti</p>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-surface">
                    <p className="text-2xl font-bold">{completedCount}/{modules.length}</p>
                    <p className="text-xs text-foreground-muted">Moduli</p>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-surface">
                    <p className="text-2xl font-bold">{progress.badges.length}</p>
                    <p className="text-xs text-foreground-muted">Badge</p>
                  </div>
                </div>

                {/* Profile Form */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Informazioni personali</h3>
                    <button
                      onClick={() => {
                        if (editingProfile) {
                          setEditingProfile(false);
                        } else {
                          setProfileForm({
                            nome: profile.nome,
                            cognome: profile.cognome,
                            email: profile.email,
                            telefono: profile.telefono,
                            ruolo: profile.ruolo,
                            azienda: profile.azienda,
                          });
                          setEditingProfile(true);
                        }
                      }}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        editingProfile
                          ? "bg-foreground-muted/10 text-foreground-muted hover:bg-foreground-muted/20"
                          : "bg-viola text-white hover:bg-viola/90"
                      }`}
                    >
                      {editingProfile ? "Annulla" : "Modifica"}
                    </button>
                  </div>

                  {editingProfile ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        updateProfile(profileForm);
                        setUserName(`${profileForm.nome} ${profileForm.cognome}`);
                        setEditingProfile(false);
                      }}
                      className="space-y-4"
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium mb-1.5">Nome</label>
                          <input
                            type="text"
                            value={profileForm.nome}
                            onChange={(e) => setProfileForm({ ...profileForm, nome: e.target.value })}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-viola focus:outline-none focus:ring-2 focus:ring-viola/20"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5">Cognome</label>
                          <input
                            type="text"
                            value={profileForm.cognome}
                            onChange={(e) => setProfileForm({ ...profileForm, cognome: e.target.value })}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-viola focus:outline-none focus:ring-2 focus:ring-viola/20"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Email</label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-viola focus:outline-none focus:ring-2 focus:ring-viola/20"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Telefono</label>
                        <input
                          type="tel"
                          value={profileForm.telefono}
                          onChange={(e) => setProfileForm({ ...profileForm, telefono: e.target.value })}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-viola focus:outline-none focus:ring-2 focus:ring-viola/20"
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium mb-1.5">Ruolo</label>
                          <input
                            type="text"
                            value={profileForm.ruolo}
                            onChange={(e) => setProfileForm({ ...profileForm, ruolo: e.target.value })}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-viola focus:outline-none focus:ring-2 focus:ring-viola/20"
                            placeholder="es. Marketing Manager"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5">Azienda</label>
                          <input
                            type="text"
                            value={profileForm.azienda}
                            onChange={(e) => setProfileForm({ ...profileForm, azienda: e.target.value })}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:border-viola focus:outline-none focus:ring-2 focus:ring-viola/20"
                            placeholder="es. Acme Inc."
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-viola text-white rounded-xl px-4 py-3 text-sm font-medium hover:bg-viola/90 transition-colors"
                      >
                        Salva modifiche
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-border">
                        <span className="text-sm text-foreground-muted">Email</span>
                        <span className="text-sm font-medium">{profile.email}</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-border">
                        <span className="text-sm text-foreground-muted">Telefono</span>
                        <span className="text-sm font-medium">{profile.telefono || "—"}</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-border">
                        <span className="text-sm text-foreground-muted">Ruolo</span>
                        <span className="text-sm font-medium">{profile.ruolo || "—"}</span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <span className="text-sm text-foreground-muted">Azienda</span>
                        <span className="text-sm font-medium">{profile.azienda || "—"}</span>
                      </div>
                    </div>
                  )}
                </Card>

                {/* Privacy */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Consensi privacy</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-foreground-muted">Privacy policy</span>
                      <span className="text-sm text-green-600 font-medium">✓ Accettata</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-foreground-muted">Comunicazioni marketing</span>
                      <span className={`text-sm font-medium ${profile.marketingConsent ? "text-green-600" : "text-foreground-muted"}`}>
                        {profile.marketingConsent ? "✓ Accettato" : "Non accettato"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-foreground-muted">Profilazione</span>
                      <span className={`text-sm font-medium ${profile.profilingConsent ? "text-green-600" : "text-foreground-muted"}`}>
                        {profile.profilingConsent ? "✓ Accettata" : "Non accettata"}
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      if (confirm("Sei sicuro di voler azzerare tutti i progressi del corso?")) {
                        reset();
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm text-foreground-muted bg-surface hover:bg-surface-alt transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Azzera progressi corso
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Sei sicuro di voler uscire? Dovrai registrarti di nuovo.")) {
                        logout();
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm text-danger bg-danger/5 hover:bg-danger/10 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Esci dall'account
                  </button>
                </div>
              </div>
            )}

            {/* ═══════════ COMING SOON SECTIONS ═══════════ */}
            {activeSection !== "learn" && activeSection !== "toolkit" && activeSection !== "risorse" && activeSection !== "profilo" && comingSoonData[activeSection] && (
              <div className="space-y-6">
                <div className="text-center py-8 sm:py-12">
                  {/* Lock badge */}
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-viola/10 to-viola/5 ring-1 ring-viola/20">
                    <img src="/icons/shield.png" alt="" className="h-10 w-10 object-contain opacity-60" />
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold mb-2">
                    {comingSoonData[activeSection].title}
                  </h2>
                  <p className="text-sm sm:text-base text-foreground-muted max-w-md mx-auto mb-8">
                    {comingSoonData[activeSection].description}
                  </p>

                  {/* Feature preview */}
                  <div className="mx-auto max-w-sm space-y-3 text-left">
                    {comingSoonData[activeSection].items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-xl bg-surface p-3 text-sm text-foreground-muted"
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-viola/10">
                          <img src="/icons/target.png" alt="" className="h-3.5 w-3.5 object-contain" />
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Coming soon badge */}
                  <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-viola/10 px-5 py-2.5 text-sm font-medium text-viola">
                    <div className="h-2 w-2 rounded-full bg-viola animate-pulse" />
                    Prossimamente
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function getTimeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Adesso";
  if (mins < 60) return `${mins}min fa`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h fa`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Ieri";
  return `${days}g fa`;
}

function StructuredDocument({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <div className="space-y-2.5">
      {lines.map((raw, i) => {
        const line = raw.trim();

        if (!line) {
          return <div key={`sp-${i}`} className="h-1" />;
        }

        if (line.startsWith("# ")) {
          return (
            <h4 key={`h1-${i}`} className="text-base sm:text-lg font-bold text-foreground">
              {line.replace(/^#\s+/, "")}
            </h4>
          );
        }

        if (line.startsWith("## ")) {
          return (
            <h5 key={`h2-${i}`} className="text-sm sm:text-base font-semibold text-viola pt-1">
              {line.replace(/^##\s+/, "")}
            </h5>
          );
        }

        if (/^\d+\.\s+/.test(line)) {
          const [num, ...rest] = line.split(" ");
          return (
            <div key={`n-${i}`} className="flex items-start gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="shrink-0 mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-viola/10 text-[11px] font-bold text-viola">
                {num.replace(".", "")}
              </span>
              <span>{rest.join(" ")}</span>
            </div>
          );
        }

        if (line.startsWith("-") || line.startsWith("•") || line.startsWith("□")) {
          return (
            <div key={`b-${i}`} className="flex items-start gap-2 text-sm text-foreground-muted leading-relaxed">
              <span className="shrink-0 mt-2 h-1.5 w-1.5 rounded-full bg-viola/60" />
              <span>{line.replace(/^[-•□]\s*/, "")}</span>
            </div>
          );
        }

        return (
          <p key={`p-${i}`} className="text-sm text-foreground-muted leading-relaxed">
            {line}
          </p>
        );
      })}
    </div>
  );
}
