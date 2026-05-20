export interface GlossaryTerm {
  term: string;
  /** Variants/aliases for matching (case-insensitive) */
  aliases?: string[];
  definition: string;
  category: "fondamenti" | "modelli" | "prompt" | "tecnica" | "applicazioni";
}

export const glossary: GlossaryTerm[] = [
  // ── Fondamenti ──
  {
    term: "Machine Learning",
    aliases: ["ML", "apprendimento automatico"],
    definition:
      "Branca dell'AI che permette ai sistemi di imparare dai dati senza essere esplicitamente programmati, migliorando le proprie prestazioni con l'esperienza.",
    category: "fondamenti",
  },
  {
    term: "Deep Learning",
    aliases: ["apprendimento profondo"],
    definition:
      "Sottocategoria del Machine Learning che usa reti neurali artificiali con molti strati (deep) per apprendere rappresentazioni complesse dei dati.",
    category: "fondamenti",
  },
  {
    term: "Rete Neurale",
    aliases: ["rete neurale artificiale", "neural network", "reti neurali"],
    definition:
      "Sistema computazionale ispirato al cervello umano, composto da nodi (neuroni) interconnessi organizzati in strati che elaborano le informazioni.",
    category: "fondamenti",
  },
  {
    term: "Percettrone",
    aliases: ["perceptron"],
    definition:
      "Il più semplice tipo di rete neurale artificiale, inventato nel 1958 da Frank Rosenblatt. È l'unità base da cui derivano tutte le reti neurali moderne.",
    category: "fondamenti",
  },
  {
    term: "Connessionismo",
    aliases: ["connessionista"],
    definition:
      "Approccio all'AI che modella i processi cognitivi tramite reti di nodi semplici interconnessi, in opposizione ai sistemi simbolici basati su regole.",
    category: "fondamenti",
  },
  {
    term: "Dataset",
    aliases: ["set di dati", "dati di addestramento"],
    definition:
      "Raccolta strutturata di dati usata per addestrare, validare e testare i modelli di AI. La qualità e la quantità dei dati influenza direttamente le prestazioni del modello.",
    category: "fondamenti",
  },
  {
    term: "Overfitting",
    aliases: ["sovra-adattamento"],
    definition:
      "Fenomeno in cui un modello impara troppo bene i dati di training, perdendo la capacità di generalizzare su nuovi dati mai visti in precedenza.",
    category: "fondamenti",
  },
  {
    term: "Parametri",
    aliases: ["pesi", "weights"],
    definition:
      "Valori numerici interni a una rete neurale, aggiornati durante il training. I modelli linguistici moderni ne hanno miliardi (es. GPT-4 ne ha stimati ~1.8 trilioni).",
    category: "fondamenti",
  },

  // ── Modelli ──
  {
    term: "LLM",
    aliases: ["Large Language Model", "modello linguistico di grandi dimensioni", "modelli linguistici"],
    definition:
      "Modello AI addestrato su enormi quantità di testo per comprendere e generare linguaggio naturale. Esempi: GPT-4, Claude, Gemini, LLaMA.",
    category: "modelli",
  },
  {
    term: "Transformer",
    aliases: ["architettura transformer", "transformer architecture"],
    definition:
      "Architettura di rete neurale introdotta nel 2017 nel paper 'Attention Is All You Need'. Alla base di tutti i grandi modelli linguistici moderni grazie al meccanismo di self-attention.",
    category: "modelli",
  },
  {
    term: "Self-Attention",
    aliases: ["meccanismo di attenzione", "attention mechanism", "attention"],
    definition:
      "Meccanismo che permette al modello di pesare l'importanza di ogni parola rispetto alle altre nella stessa sequenza, catturando le relazioni a lungo raggio nel testo.",
    category: "modelli",
  },
  {
    term: "GPT",
    aliases: ["Generative Pre-trained Transformer"],
    definition:
      "Famiglia di modelli linguistici sviluppata da OpenAI. GPT sta per Generative Pre-trained Transformer. GPT-4 è la versione più avanzata alla base di ChatGPT.",
    category: "modelli",
  },
  {
    term: "SLM",
    aliases: ["Small Language Model", "modelli linguistici piccoli"],
    definition:
      "Versioni compatte degli LLM progettate per funzionare su dispositivi con risorse limitate (smartphone, PC). Esempi: Phi-3, Mistral 7B, Gemma.",
    category: "modelli",
  },
  {
    term: "Mixture of Experts",
    aliases: ["MoE", "mixture of expert"],
    definition:
      "Architettura in cui il modello è composto da più sotto-reti specializzate ('esperti'). Solo una parte degli esperti viene attivata per ogni input, rendendo il modello più efficiente.",
    category: "modelli",
  },
  {
    term: "Multimodalità",
    aliases: ["modello multimodale", "multimodale", "multimodali"],
    definition:
      "Capacità di un modello AI di processare e generare diversi tipi di dati (testo, immagini, audio, video) in modo integrato. Esempi: GPT-4o, Gemini Ultra.",
    category: "modelli",
  },
  {
    term: "Token",
    aliases: ["token", "tokenizzazione", "tokenization"],
    definition:
      "Unità base di testo che i modelli LLM elaborano. Può essere una parola, parte di parola o simbolo. In inglese, 1 token ≈ 0.75 parole. I modelli hanno un limite massimo di token (context window).",
    category: "modelli",
  },
  {
    term: "Context Window",
    aliases: ["finestra di contesto", "context length"],
    definition:
      "La quantità massima di testo (in token) che un LLM può 'ricordare' e processare in una singola conversazione. I modelli moderni gestiscono da 8K a oltre 1 milione di token.",
    category: "modelli",
  },

  // ── Tecnica ──
  {
    term: "Fine-tuning",
    aliases: ["fine tuning", "messa a punto"],
    definition:
      "Processo di adattamento di un modello pre-addestrato su un dataset specifico per ottimizzarne le prestazioni in un dominio particolare (es. legale, medico, e-commerce).",
    category: "tecnica",
  },
  {
    term: "RAG",
    aliases: ["Retrieval-Augmented Generation", "retrieval augmented generation"],
    definition:
      "Tecnica che potenzia gli LLM recuperando informazioni da una knowledge base esterna prima di generare la risposta. Riduce le allucinazioni e permette di usare dati aggiornati.",
    category: "tecnica",
  },
  {
    term: "Spazio Latente",
    aliases: ["latent space", "rappresentazione latente"],
    definition:
      "Rappresentazione matematica compressa dei concetti all'interno di un modello AI. Concetti simili sono vicini nello spazio latente, permettendo al modello di generalizzare.",
    category: "tecnica",
  },
  {
    term: "Allucinazione",
    aliases: ["allucinazioni", "hallucination", "hallucinations"],
    definition:
      "Fenomeno in cui un LLM genera informazioni false ma presentate con sicurezza. Avviene perché il modello ottimizza la coerenza linguistica, non la verità fattuale.",
    category: "tecnica",
  },
  {
    term: "Embedding",
    aliases: ["embeddings", "vettore semantico"],
    definition:
      "Rappresentazione numerica (vettore) di un testo che ne cattura il significato semantico. Testi con significati simili hanno vettori vicini nello spazio matematico.",
    category: "tecnica",
  },
  {
    term: "Temperature",
    aliases: ["temperatura"],
    definition:
      "Parametro che controlla la casualità dell'output di un LLM. Valori bassi (vicino a 0) rendono le risposte più deterministiche; valori alti le rendono più creative e variabili.",
    category: "tecnica",
  },
  {
    term: "RLHF",
    aliases: ["Reinforcement Learning from Human Feedback"],
    definition:
      "Tecnica di addestramento in cui umani valutano le risposte del modello, e questo feedback viene usato per migliorarlo tramite reinforcement learning. Usata per ChatGPT e Claude.",
    category: "tecnica",
  },
  {
    term: "Prompt",
    aliases: ["prompting", "input"],
    definition:
      "L'istruzione o il testo fornito a un modello AI per guidarne l'output. Un prompt ben strutturato include contesto, ruolo, compito e formato atteso.",
    category: "prompt",
  },
  {
    term: "Prompt Engineering",
    aliases: ["ingegneria del prompt", "ottimizzazione del prompt"],
    definition:
      "Disciplina che studia come formulare prompt efficaci per ottenere output ottimali dai modelli AI. Include tecniche come chain-of-thought, few-shot e role prompting.",
    category: "prompt",
  },
  {
    term: "Chain-of-Thought",
    aliases: ["CoT", "catena di pensiero", "chain of thought"],
    definition:
      "Tecnica di prompting che istruisce il modello a ragionare passo per passo prima di rispondere. Migliora significativamente le prestazioni su compiti complessi e matematici.",
    category: "prompt",
  },
  {
    term: "Few-Shot",
    aliases: ["few shot", "pochi esempi"],
    definition:
      "Tecnica in cui si forniscono pochi esempi nel prompt per guidare il modello verso il formato o il tipo di risposta desiderato, senza richiedere training aggiuntivo.",
    category: "prompt",
  },
  {
    term: "Zero-Shot",
    aliases: ["zero shot", "senza esempi"],
    definition:
      "Capacità di un LLM di eseguire un compito senza esempi nel prompt, solo con l'istruzione. I modelli moderni eccellono nello zero-shot grazie al pre-training su dati vastissimi.",
    category: "prompt",
  },
  {
    term: "System Prompt",
    aliases: ["prompt di sistema"],
    definition:
      "Istruzione iniziale invisibile all'utente che definisce il comportamento, il ruolo e i vincoli del modello AI in una conversazione. Usata per personalizzare assistenti AI.",
    category: "prompt",
  },
  {
    term: "AI Agenti",
    aliases: ["agenti AI", "autonomous agent", "agente autonomo", "AI agent"],
    definition:
      "Sistemi AI in grado di pianificare ed eseguire sequenze di azioni autonomamente per raggiungere obiettivi complessi, usando strumenti come browser, codice o API.",
    category: "applicazioni",
  },
  {
    term: "AI Generativa",
    aliases: ["intelligenza artificiale generativa", "generative AI"],
    definition:
      "Categoria di AI in grado di creare nuovi contenuti (testo, immagini, audio, video, codice) apprendo schemi dai dati di training. Include LLM, Stable Diffusion, DALL-E.",
    category: "applicazioni",
  },
  {
    term: "AI Discriminativa",
    aliases: ["discriminativa", "discriminative AI"],
    definition:
      "Tipo di AI che classifica o distingue dati esistenti (es. spam detection, riconoscimento facciale), in opposizione all'AI Generativa che crea nuovi contenuti.",
    category: "applicazioni",
  },
  {
    term: "OpenAI",
    definition:
      "Azienda fondata nel 2015 (poi diventata commerciale) che ha sviluppato GPT-4 e ChatGPT. È uno dei principali attori nel campo dell'AI generativa.",
    category: "applicazioni",
  },
  {
    term: "ChatGPT",
    definition:
      "Assistente AI conversazionale sviluppato da OpenAI, basato sui modelli GPT. Lanciato nel novembre 2022, ha raggiunto 100 milioni di utenti in soli 2 mesi.",
    category: "applicazioni",
  },
  {
    term: "Claude",
    definition:
      "Assistente AI sviluppato da Anthropic, noto per le elevate capacità di ragionamento e il focus sulla sicurezza (principi Constitutional AI). Disponibile su claude.ai.",
    category: "applicazioni",
  },
  {
    term: "Gemini",
    aliases: ["Google Gemini"],
    definition:
      "Famiglia di modelli AI multimodali sviluppata da Google DeepMind. Gemini Ultra è il modello più potente, integrato in Google Workspace e Android.",
    category: "applicazioni",
  },
  {
    term: "Midjourney",
    definition:
      "Strumento di generazione immagini AI accessibile via Discord. Noto per lo stile artistico di alta qualità, molto usato in design, marketing e creatività.",
    category: "applicazioni",
  },
  {
    term: "Stable Diffusion",
    aliases: ["diffusion model", "modelli di diffusione"],
    definition:
      "Modello open-source per la generazione di immagini da testo. A differenza di Midjourney, può essere eseguito localmente e personalizzato con fine-tuning.",
    category: "applicazioni",
  },
  {
    term: "API",
    aliases: ["Application Programming Interface"],
    definition:
      "Interfaccia che permette a programmi diversi di comunicare. Le API degli LLM (es. OpenAI API) permettono di integrare l'AI in applicazioni e workflow personalizzati.",
    category: "applicazioni",
  },
  {
    term: "GDPR",
    definition:
      "Regolamento Generale sulla Protezione dei Dati (UE 2016/679). Nella gestione dell'AI, regola come i dati degli utenti possono essere usati nell'addestramento e nell'uso dei modelli.",
    category: "fondamenti",
  },
  {
    term: "Intelligenza Artificiale",
    aliases: ["AI", "artificial intelligence"],
    definition:
      "Campo dell'informatica che mira a creare sistemi in grado di eseguire compiti che normalmente richiedono intelligenza umana: ragionamento, apprendimento, percezione, linguaggio.",
    category: "fondamenti",
  },
];

// ── Inline matching helpers ──

/** Builds (and caches) a global regex matching all terms + aliases, longest first. */
let _cachedRegexSource: string | null = null;

export function getGlossaryRegex(): RegExp {
  if (!_cachedRegexSource) {
    const allVariants = glossary.flatMap((g) => [g.term, ...(g.aliases ?? [])]);
    const escaped = allVariants
      .sort((a, b) => b.length - a.length)
      .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    _cachedRegexSource = `\\b(${escaped.join("|")})\\b`;
  }
  return new RegExp(_cachedRegexSource, "gi");
}

/** Returns the GlossaryTerm matching a given text (term name or alias). */
export function getTermByMatch(matchedText: string): GlossaryTerm | undefined {
  const lower = matchedText.toLowerCase();
  return glossary.find(
    (g) =>
      g.term.toLowerCase() === lower ||
      (g.aliases ?? []).some((a) => a.toLowerCase() === lower)
  );
}

/**
 * Finds all glossary terms present in a given text (case-insensitive, whole-word matching).
 */
export function findTermsInContent(content: string): GlossaryTerm[] {
  const found: GlossaryTerm[] = [];
  const lowerContent = content.toLowerCase();

  for (const entry of glossary) {
    const allVariants = [entry.term, ...(entry.aliases ?? [])];
    const matched = allVariants.some((v) => {
      const lower = v.toLowerCase();
      // Whole-word boundary check using a simple approach
      const idx = lowerContent.indexOf(lower);
      if (idx === -1) return false;
      const before = idx === 0 ? true : /[\s\W]/.test(lowerContent[idx - 1]);
      const after =
        idx + lower.length >= lowerContent.length
          ? true
          : /[\s\W]/.test(lowerContent[idx + lower.length]);
      return before && after;
    });
    if (matched) found.push(entry);
  }

  return found;
}
