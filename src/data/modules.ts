import { Module, Badge } from "@/types";

export const UNLOCK_THRESHOLD = 0.8; // 80% dei crediti per sbloccare il modulo successivo

export const initialBadges: Badge[] = [
  {
    id: "first-step",
    title: "Primo Passo",
    description: "Hai completato il tuo primo modulo!",
    icon: "footprints",
    image: "/icons/robot.png",
    unlockedAt: null,
  },
  {
    id: "perfect-score",
    title: "Studente Modello",
    description: "Hai ottenuto il 100% in un quiz!",
    icon: "star",
    image: "/icons/medal.png",
    unlockedAt: null,
  },
  {
    id: "all-complete",
    title: "Percorso Completo",
    description: "Hai completato tutti i moduli del corso!",
    icon: "trophy",
    image: "/icons/trophy.png",
    unlockedAt: null,
  },
  {
    id: "prompt-master",
    title: "Maestro del Prompt",
    description: "Hai superato i moduli sul prompt engineering!",
    icon: "sparkles",
    image: "/icons/award.png",
    unlockedAt: null,
  },
  {
    id: "half-way",
    title: "A Metà Strada",
    description: "Hai completato almeno 3 moduli!",
    icon: "flag",
    image: "/icons/target.png",
    unlockedAt: null,
  },
];

export const modules: Module[] = [
  // ═══════════════════════════════════════════════════════════════
  // MODULO 1 — Comprendere l'AI Generativa
  // ═══════════════════════════════════════════════════════════════
  {
    id: "modulo-1",
    title: "Comprendere l'AI Generativa",
    description:
      "Dalle basi del Machine Learning ai Large Language Model: scopri cosa c'è dietro l'intelligenza artificiale generativa.",
    icon: "/icons/brain.png",
    agenda: [
      "Breve Storia dell'AI: dai Primi Passi alla Generazione",
      "Dal Surrealismo all'Automatismo Creativo",
      "La Rivoluzione Cibernetica",
      "Il Connessionismo: dal Percettrone al Deep Learning",
      "Machine Learning e Deep Learning",
      "L'Architettura Transformer",
      "I Large Language Model (LLM)",
      "Come Funziona la Generazione del Testo",
      "Lo Spazio Latente e i Dataset",
      "Il Fenomeno delle Allucinazioni",
      "AI Generativa vs AI Discriminativa",
      "Multimodalità: Oltre il Testo",
      "Mixture of Experts (MoE): Architetture Ibride",
      "Retrieval-Augmented Generation (RAG)",
      "AI Agenti: Dall'Assistenza all'Autonomia",
      "Small Language Models (SLM)",
      "Il Ruolo dell'Essere Umano",
      "Impatto Economico e Sociale",
    ],
    content: `
## Che cos'è l'Intelligenza Artificiale Generativa?

L'intelligenza artificiale generativa (genAI) rappresenta una categoria di sistemi AI capaci di creare contenuti originali — testi, immagini, video, musica e codice — a partire da istruzioni fornite in linguaggio naturale. A differenza dei software tradizionali, questi sistemi non seguono regole rigide programmate a mano, ma apprendono dai dati.

> "Lo scopo dell'AI generativa è creare contenuti. Quando mancano informazioni, a volte può inventare dettagli pur di adempiere al proprio compito." — Google Workspace Lab

Per capirne la portata, basta pensare che ChatGPT, lanciato il 30 novembre 2022, ha raggiunto 100 milioni di utenti attivi in soli due mesi — il prodotto tecnologico con la crescita più rapida nella storia. Questo ha segnato l'inizio di una vera e propria rivoluzione: per la prima volta, chiunque poteva interagire con un modello AI avanzato usando semplice linguaggio naturale.

### Breve Storia dell'AI: dai Primi Passi alla Generazione

L'intelligenza artificiale non è un'invenzione recente. Il termine fu coniato nel 1956 durante la conferenza di Dartmouth da John McCarthy. Ecco le tappe fondamentali:

- **1950** — Alan Turing pubblica *Computing Machinery and Intelligence* e propone il "Test di Turing" per misurare l'intelligenza delle macchine
- **1956** — Nasce formalmente il campo dell'AI alla conferenza di Dartmouth
- **1966** — ELIZA, il primo chatbot, simula uno psicoterapeuta usando semplici regole di matching
- **1997** — Deep Blue di IBM sconfigge il campione mondiale di scacchi Garry Kasparov
- **2011** — Watson di IBM vince a Jeopardy!, dimostrando la capacità di comprendere il linguaggio naturale
- **2012** — La rete neurale AlexNet segna la svolta del Deep Learning nella visione artificiale
- **2017** — Google pubblica il paper *Attention Is All You Need*, introducendo l'architettura **Transformer** che rivoluzionerà tutto il campo
- **2020** — GPT-3 di OpenAI dimostra le capacità di generazione di testo dei modelli di grandi dimensioni
- **2022** — ChatGPT rende l'AI generativa accessibile a tutti
- **2023-2024** — Esplosione di modelli multimodali: GPT-4, Claude, Gemini, Llama, Mistral

### Dal Surrealismo all'Automatismo Creativo

L'idea che un processo creativo possa essere affidato a meccanismi automatici non nasce con i computer. Già nel 1919, André Breton e Philippe Soupault sperimentarono la **scrittura automatica** con *Les Champs magnétiques*: scrivere per ore senza arrestarsi, lasciando che il linguaggio si abbandonasse agli automatismi psichici, liberandosi da costrizioni sintattiche e semantiche.

Il Surrealismo inaugurò un principio che risuona ancora oggi: **automatico e creativo non si escludono**. La parentela tra la via surrealista e la via del prompting sta nella pretesa di sfruttare l'automatico — della vita psichica oppure della macchina — come parte integrante della creazione artistica.

Come scrissero Boiffard, Éluard e Vitrac nella prefazione a *La Révolution surréaliste* (1924): "Già gli automi si moltiplicano e sognano."

Anche il **Futurismo italiano** condivise questa fascinazione per le macchine. Le "parole in libertà" di Marinetti volevano meccanizzare l'attività creativa e inaugurare una nuova condizione antropologica. Ma mentre i futuristi elogiavano il mondo delle macchine, i surrealisti cercavano l'automatismo liberatorio già dormiente nell'organico.

Come ha osservato il filosofo Bernard Stiegler: "Il digitale è scrittura che può essere iscritta e letta da automi: è una scrittura essenzialmente automatica." Senza Surrealismo, forse non ci sarebbe una così ampia curiosità verso il prompting come possibilità creativa. Le avanguardie del Novecento hanno instaurato un legame privilegiato con i processi automatici, preparando il terreno per ciò che stiamo vivendo oggi con l'AI generativa.

### La Rivoluzione Cibernetica

Se il Surrealismo mostrò che la mano che crea può affidarsi all'automatico, la **cibernetica** dimostrò che un computer può rimpiazzare mediatamente le funzioni svolte dal cervello, presupponendo un'analogia funzionale tra macchine e organismi.

**Claude Shannon** formulò nel 1948 la **teoria dell'informazione**, proponendo di misurare la comunicazione come un gioco probabilistico: l'informazione è determinata dalla probabilità che un dato simbolo venga enunciato tra quelli selezionabili. Questa idea è alla base di come funzionano gli LLM odierni, che generano testo calcolando le probabilità del token successivo.

Nel 1943, **Wiener, Rosenblueth e Bigelow** pubblicarono "Behavior, Purpose and Teleology", sostenendo che macchine e organismi condividono un meccanismo di **feedback**: una serie di aggiustamenti attivata in risposta al ritorno degli output come input. Questa idea di apprendimento adattivo è alla base di tutto il deep learning moderno.

Nello stesso anno, **McCulloch e Pitts** formalizzarono il primo modello matematico di **rete neurale**, emulando l'attività dei neuroni biologici: "L'attività del neurone è un processo di tipo tutto-o-niente." Un neurone può essere attivato oppure no — come in un circuito elettrico un relè può trovarsi spento o acceso.

Le **Macy Conferences** (1946-1953) e la **conferenza di Dartmouth** (1956) sancirono la nascita dell'AI come campo di ricerca, ponendo al centro il problema di come rendere una macchina originale e creativa, integrando una dose controllata di casualità nel ragionamento ordinato.

### Il Connessionismo: dal Percettrone al Deep Learning

La storia dell'AI si è biforcata in due paradigmi fondamentali:

- **IA Simbolica**: ogni pensiero è un calcolo di simboli con materialità e valore semantico. Si basa su regole predeterminate e proposizioni dichiarative. Ha dominato fino agli anni '80-'90.
- **Connessionismo**: al centro della costruzione di macchine intelligenti c'è il meccanismo di feedback tra macchina e mondo. La conoscenza si rappresenta per connessioni e associazioni, non per regole.

Il **percettrone** di Frank Rosenblatt (1958) fu il primo modello matematico ad ispirarsi al connessionismo, tentando di riprodurre le operazioni di riconoscimento di pattern visivi del cervello. A differenza dell'IA simbolica, il percettrone organizzava gli stimoli in un sistema di **associazioni probabilistiche**, costruendo nodi associativi distribuiti e non centralizzati.

Rosenblatt ipotizzò persino che il percettrone potesse un giorno rispondere a comandi come "nomina quest'oggetto sulla sinistra" — qualcosa che oggi chiameremmo un prompt. Tuttavia, riconobbe i limiti del modello: serviva un sistema più avanzato.

Il **deep learning** è l'erede diretto di questa tradizione connessionista. Le reti neurali profonde odierne sono discendenti del percettrone: macchine stratificate le cui architetture si sviluppano in profondità, nel tentativo di riprodurre le logiche non-lineari del pensiero.

### Machine Learning e Deep Learning

**Machine Learning (ML)** è il ramo dell'AI in cui le macchine imparano dai dati senza essere programmate esplicitamente. Attraverso l'analisi di grandi quantità di esempi, un algoritmo ML individua pattern e li utilizza per fare previsioni o generare output.

Esistono tre principali paradigmi di apprendimento:

- **Apprendimento supervisionato**: il modello impara da dati etichettati (es. foto di cani etichettate come "cane"). Impara ad associare input a output corretti.
- **Apprendimento non supervisionato**: il modello trova strutture e pattern in dati non etichettati. Utile per segmentazione, clustering e scoperta di anomalie.
- **Apprendimento per rinforzo (Reinforcement Learning)**: il modello impara tramite tentativi e ricompense, come un bambino che impara camminando. È alla base dell'addestramento dei chatbot moderni tramite RLHF (Reinforcement Learning from Human Feedback).

**Deep Learning (DL)** è un sottoinsieme del ML basato su reti neurali artificiali con molti strati (layers). Questi modelli "profondi" eccellono nell'elaborazione di dati complessi — come il linguaggio naturale, le immagini e l'audio — perché riescono a catturare relazioni astratte tra i dati.

Le reti neurali artificiali si ispirano (in modo semplificato) al funzionamento dei neuroni biologici: ogni nodo riceve input, li elabora e produce un output. Organizzati in strati, questi nodi imparano a riconoscere pattern sempre più complessi:
- I primi strati riconoscono tratti semplici (bordi, fonemi)
- Gli strati intermedi combinano questi tratti in concetti più complessi (forme, parole)
- Gli strati finali producono output ad alto livello (riconoscimento facciale, comprensione di frasi)

### L'Architettura Transformer

L'architettura **Transformer**, introdotta da Google nel 2017, è la vera spina dorsale di tutti i modelli AI generativi moderni. La sua innovazione chiave è il meccanismo di **attenzione (attention)**: invece di elaborare il testo parola per parola in sequenza, il Transformer può "guardare" l'intera frase contemporaneamente e capire quali parole sono più importanti in relazione alle altre.

Esempio: nella frase "La banca del fiume era coperta di muschio", il meccanismo di attenzione aiuta il modello a capire che "banca" si riferisce alla sponda del fiume (non a un istituto finanziario) guardando il contesto circostante.

I Transformer sono alla base di:
- **GPT** (Generative Pre-trained Transformer) — OpenAI
- **BERT** (Bidirectional Encoder Representations from Transformers) — Google
- **LLaMA** (Large Language Model Meta AI) — Meta
- **Claude** — Anthropic
- **Gemini** — Google DeepMind

### I Large Language Model (LLM)

I modelli linguistici di grandi dimensioni (LLM) sono alla base dei chatbot come ChatGPT, Claude e Gemini. Sono addestrati su enormi quantità di testo e imparano a prevedere la parola successiva in una sequenza, producendo così testi fluenti e coerenti.

Il processo di addestramento avviene in tre fasi:

1. **Pre-training**: il modello viene addestrato su enormi dataset testuali (libri, siti web, articoli) per imparare la struttura del linguaggio, i fatti e le relazioni tra concetti
2. **Fine-tuning**: il modello viene perfezionato su compiti specifici (conversazione, istruzioni, analisi) con dataset curati
3. **Allineamento (RLHF)**: il modello viene allineato alle preferenze umane attraverso feedback di valutatori umani che classificano le risposte come utili, accurate e sicure

Caratteristiche chiave degli LLM:

- **Comprensione del contesto**: possono mantenere la coerenza in conversazioni lunghe
- **Generazione multilingue**: operano in decine di lingue diverse
- **Versatilità**: possono scrivere, tradurre, riassumere, programmare e molto altro
- **Emergent abilities**: capacità che emergono solo al crescere della scala (ragionamento, analogie)
- **Limiti**: non "capiscono" nel senso umano; producono output statisticamente probabili

### Come Funziona la Generazione del Testo

Quando chiedi qualcosa a ChatGPT, ecco cosa succede dietro le quinte:

1. Il tuo testo viene suddiviso in **token** (frammenti di parole). "Intelligenza artificiale" potrebbe diventare ["Intellig", "enza", " artific", "iale"]
2. I token vengono convertiti in **vettori numerici** (embedding) che catturano il significato semantico
3. Il modello elabora questi vettori attraverso decine di strati Transformer
4. Per ogni posizione, calcola la **probabilità** di ogni possibile token successivo
5. Seleziona il token successivo (con un certo grado di casualità controllata dalla **temperature**)
6. Ripete il processo fino a completare la risposta

Il parametro **temperature** controlla la creatività:
- Temperature bassa (0.0-0.3): risposte prevedibili, precise, ripetitive
- Temperature media (0.4-0.7): buon equilibrio tra creatività e coerenza
- Temperature alta (0.8-1.0): risposte più creative ma potenzialmente meno accurate

### Lo Spazio Latente e i Dataset

Un concetto fondamentale per comprendere l'AI generativa è lo **spazio latente**: lo spazio vettoriale multidimensionale in cui i dati di addestramento vengono tradotti e organizzati. In questo spazio, ogni dato — una parola, un'immagine, un concetto — è rappresentato da coordinate vettoriali che ne definiscono la posizione e le relazioni con altri dati.

Per esempio, la parola "cane" viene tradotta in un vettore numerico (es. -0.2, -1, +0.7, …) e risulterà vicina a "gatto" nello spazio vettoriale, perché condividono caratteristiche statistiche simili nei dati di addestramento.

I **dataset** sono la materia prima di ogni modello generativo. I principali includono:
- **Common Crawl**: miliardi di pagine web raccolte automaticamente
- **BookCorpus/Books3**: milioni di libri digitalizzati
- **Wikipedia**: l'intera enciclopedia in decine di lingue
- **LAION**: un vastissimo dataset di coppie testo-immagine usato per i modelli text-to-image
- **ImageNet**: un dataset di riferimento per la classificazione delle immagini

Per i modelli **text-to-image** come DALL-E e Midjourney, il sistema **CLIP** (Contrastive Language-Image Pre-Training) di OpenAI ha rivoluzionato il settore: addestrato su 400 milioni di coppie testo-immagine, CLIP apprende concetti visuali dalla supervisione in linguaggio naturale, permettendo di associare descrizioni verbali a rappresentazioni visive.

Un aspetto cruciale: i modelli generativi **non contengono più le immagini originali** nel senso tradizionale. Come osservano i ricercatori Chatonsky e Somaini: "Non ci sono più delle immagini in un'immaginazione artificiale, neanche sotto forma compressa, ma semplici probabilità vettorializzate." Il prompting funziona come un **veicolo di esplorazione** di questo spazio di possibilità, non come una copiatura.

La crescita esponenziale dei dataset ha posto problemi etici significativi: spesso è difficile sapere esattamente cosa contiene un dataset, e il ricorso a giganteschi aggregati ha impedito un controllo accurato dei dati inclusi. Molti dataset contengono materiale protetto da diritto d'autore, raccolto senza il consenso degli autori.

### Il Fenomeno delle Allucinazioni

Un aspetto fondamentale da conoscere è il fenomeno delle **allucinazioni**: quando l'AI genera informazioni false ma formulate in modo credibile. Il Cambridge Dictionary ha scelto *hallucinate* come parola dell'anno 2023 proprio per sottolineare questo rischio.

Le allucinazioni si verificano perché gli LLM producono testi convincenti senza una vera consapevolezza del contenuto. Possono inventare statistiche, citazioni o eventi mai accaduti.

Tipologie di allucinazioni:
- **Fatti inventati**: statistiche, date o eventi mai avvenuti presentati come reali
- **Fonti inesistenti**: citazioni di articoli, libri o studi che non esistono
- **Attribuzioni errate**: citazioni attribuite a persone che non le hanno mai dette
- **Incoerenze logiche**: ragionamenti che sembrano corretti ma contengono errori logici

### AI Generativa vs AI Discriminativa

È importante distinguere tra:

- **AI Discriminativa**: classifica, analizza e categorizza dati esistenti. Esempio: filtro antispam, riconoscimento facciale, diagnosi mediche da radiografie.
- **AI Generativa**: crea nuovi contenuti originali. Esempio: scrivere un articolo, generare un'immagine, comporre musica.

Entrambe usano il deep learning, ma con obiettivi diversi: l'AI discriminativa risponde a "cos'è questo?", l'AI generativa a "crea qualcosa come questo".

### Multimodalità: Oltre il Testo

I modelli più recenti sono **multimodali**: possono elaborare e generare diversi tipi di contenuto:

- **Testo → Testo**: conversazione, scrittura, analisi (ChatGPT, Claude)
- **Testo → Immagine**: generazione di immagini da descrizione (DALL-E, Midjourney)
- **Immagine → Testo**: descrizione e analisi di immagini (GPT-4 Vision)
- **Testo → Audio**: generazione di voce e musica (ElevenLabs, Suno)
- **Testo → Video**: generazione di clip video (Sora, Runway)
- **Testo → Codice**: generazione e debug di codice (GitHub Copilot)

### Mixture of Experts (MoE): Architetture Ibride

Una delle innovazioni più importanti nelle architetture AI recenti è il **Mixture of Experts (MoE)**. Invece di un singolo modello monolitico, un MoE combina più "esperti" specializzati, attivando solo quelli rilevanti per ogni richiesta.

Come funziona:
- Il modello contiene diversi sotto-modelli ("esperti") specializzati in compiti diversi
- Un **router** (gating network) decide quali esperti attivare per ogni token/query
- Solo una frazione degli esperti viene attivata per ogni inferenza (tipicamente 2 su 8)
- Questo permette modelli con molti più parametri totali ma costi computazionali contenuti

Esempi di modelli MoE:
- **Mixtral 8x7B** (Mistral): 8 esperti da 7B, ne attiva 2 alla volta → prestazioni di un modello 45B con costi di un 14B
- **GPT-4**: si ritiene utilizzi un'architettura MoE (non confermato ufficialmente)
- **Grok** (xAI): architettura MoE dichiarata

Vantaggi del MoE:
- Maggiore efficienza computazionale
- Specializzazione: ogni esperto può eccellere in un dominio
- Scalabilità: è possibile aggiungere nuovi esperti senza riaddestramento completo

### Retrieval-Augmented Generation (RAG)

Il **RAG (Retrieval-Augmented Generation)** è una tecnica che combina la generazione di testo con il recupero di informazioni da una base di conoscenza esterna. Risolve uno dei problemi principali degli LLM: la conoscenza "congelata" alla data di training.

Come funziona:
1. **Indicizzazione**: i documenti vengono suddivisi in chunk e convertiti in embedding vettoriali
2. **Retrieval**: quando arriva una query, viene convertita in embedding e confrontata con i documenti
3. **Augmentation**: i chunk più rilevanti vengono aggiunti al prompt come contesto
4. **Generation**: il modello genera la risposta basandosi sia sulla sua conoscenza che sui documenti recuperati

Vantaggi del RAG:
- **Conoscenza aggiornata**: può accedere a documenti recenti non presenti nel training
- **Citazione delle fonti**: può indicare da dove provengono le informazioni
- **Riduzione delle allucinazioni**: il modello si basa su fatti concreti
- **Personalizzazione**: può lavorare su documenti aziendali specifici

Applicazioni pratiche:
- Chatbot aziendali che rispondono basandosi sulla documentazione interna
- Assistenti legali che citano articoli di legge specifici
- Supporto clienti che accede a manuali e FAQ aggiornati

### AI Agenti: Dall'Assistenza all'Autonomia

Gli **AI Agents** rappresentano l'evoluzione dei chatbot: sistemi AI capaci di pianificare, eseguire azioni e raggiungere obiettivi in modo autonomo, utilizzando strumenti esterni.

Caratteristiche distintive:
- **Pianificazione**: scompongono obiettivi complessi in sotto-task
- **Uso di strumenti**: possono navigare il web, eseguire codice, interagire con API
- **Memoria**: mantengono il contesto tra le sessioni
- **Autonomia**: prendono decisioni senza intervento umano continuo

Esempi di agenti AI:
- **Computer Use** (Anthropic): Claude può controllare il mouse e la tastiera del computer
- **Operator** (OpenAI): agente che naviga il web ed esegue task
- **Devin** (Cognition): agente software engineer che scrive codice autonomamente
- **AutoGPT**: framework open source per creare agenti autonomi

Architettura tipica di un agente:
1. **Percezione**: riceve input dall'ambiente (testo, immagini, dati)
2. **Ragionamento**: analizza la situazione e pianifica le azioni
3. **Azione**: esegue operazioni tramite strumenti (API, browser, terminale)
4. **Feedback**: osserva i risultati e adatta il piano

### Small Language Models (SLM)

Controtrend rispetto alla corsa ai modelli sempre più grandi, gli **Small Language Models** (SLM) dimostrano che "piccolo" può essere efficiente:

- **Phi-3** (Microsoft): modelli da 3.8B parametri con prestazioni sorprendenti
- **Gemma 2** (Google): modelli da 2B a 9B ottimizzati per dispositivi
- **Qwen2** (Alibaba): modelli compatti ma performanti

Vantaggi degli SLM:
- Eseguibili su dispositivi locali (laptop, smartphone)
- Latenza ridotta e risposte immediate
- Privacy totale: i dati non lasciano il dispositivo
- Costi operativi molto inferiori
- Ideali per task specifici e ben definiti

Quando scegliere un SLM:
- Task ripetitivi e prevedibili (classificazione, estrazione dati)
- Contesti con vincoli di privacy stringenti
- Applicazioni embedded o edge computing
- Budget limitato per inferenza

### Il Ruolo dell'Essere Umano

Come sottolinea Andrea Giorgi in *Generazione AI*, questi strumenti vanno considerati come **assistenti e amplificatori** delle nostre capacità, non come sostituti del nostro giudizio. Siamo noi, con la nostra esperienza e competenze, a dover guidare il processo.

- L'output finale è sempre responsabilità dell'utente
- La revisione critica di ogni contenuto generato è indispensabile
- L'AI non sostituisce il pensiero critico, lo potenzia
- L'AI è tanto efficace quanto lo è il suo utilizzatore: la qualità delle istruzioni determina la qualità dei risultati

### Impatto Economico e Sociale

Secondo McKinsey Global Institute, l'AI generativa potrebbe aggiungere tra 2,6 e 4,4 trilioni di dollari all'economia globale ogni anno. I settori più impattati includono:

- **Marketing e vendite**: personalizzazione su larga scala, creazione contenuti
- **Sviluppo software**: generazione e revisione di codice
- **Ricerca e sviluppo**: accelerazione dei processi di innovazione
- **Customer service**: assistenti virtuali sempre più sofisticati
- **Educazione**: tutoring personalizzato e creazione di materiali didattici
    `,
    quiz: [
      {
        id: "q1-1",
        question:
          "Cosa distingue l'AI generativa dai software tradizionali?",
        options: [
          "È più veloce nell'esecuzione dei calcoli",
          "Apprende dai dati e crea contenuti originali invece di seguire regole rigide",
          "Non ha bisogno di hardware potente",
          "Funziona solo online",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q1-2",
        question:
          "Qual è la relazione tra Machine Learning e Deep Learning?",
        options: [
          "Sono la stessa cosa",
          "Il Deep Learning è un sottoinsieme del Machine Learning basato su reti neurali profonde",
          "Il Machine Learning è più avanzato del Deep Learning",
          "Il Deep Learning non utilizza dati",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q1-3",
        question: "Cosa sono le 'allucinazioni' nell'ambito dell'AI generativa?",
        options: [
          "Errori grafici nelle immagini generate",
          "Informazioni false generate dall'AI ma formulate in modo credibile",
          "Problemi di connessione al server",
          "Funzionalità sperimentali non ancora stabili",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q1-4",
        question:
          "Come funzionano i Large Language Model (LLM)?",
        options: [
          "Seguono un database di risposte precompilate",
          "Sono addestrati su grandi quantità di testo e prevedono la parola successiva nella sequenza",
          "Traducono il linguaggio umano in codice macchina",
          "Copiano risposte da Internet in tempo reale",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q1-5",
        question:
          "Secondo gli esperti, come dovremmo considerare gli strumenti di AI generativa?",
        options: [
          "Come sostituti completi del giudizio umano",
          "Come assistenti e amplificatori delle nostre capacità",
          "Come strumenti infallibili per la ricerca",
          "Come semplici motori di ricerca migliorati",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q1-6",
        question:
          "Quale innovazione ha introdotto l'architettura Transformer?",
        options: [
          "La capacità di connettersi a Internet",
          "Il meccanismo di attenzione che permette di elaborare l'intera frase contemporaneamente",
          "La possibilità di funzionare senza GPU",
          "La traduzione automatica in tempo reale",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q1-7",
        question:
          "Cosa controlla il parametro 'temperature' nella generazione di testo?",
        options: [
          "La velocità di elaborazione del modello",
          "Il livello di creatività e casualità nelle risposte",
          "La lunghezza massima della risposta",
          "La lingua in cui il modello risponde",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q1-8",
        question:
          "Quale paradigma di apprendimento viene usato nell'RLHF per allineare i chatbot alle preferenze umane?",
        options: [
          "Apprendimento supervisionato",
          "Apprendimento non supervisionato",
          "Apprendimento per rinforzo (Reinforcement Learning)",
          "Apprendimento profondo non guidato",
        ],
        correctIndex: 2,
        credits: 5,
      },
      {
        id: "q1-9",
        question:
          "Cosa significa che un modello AI è 'multimodale'?",
        options: [
          "Che funziona su più dispositivi contemporaneamente",
          "Che può elaborare e generare diversi tipi di contenuto (testo, immagini, audio, video)",
          "Che supporta diverse lingue",
          "Che ha più di un miliardo di parametri",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q1-10",
        question:
          "In quanto tempo ChatGPT ha raggiunto 100 milioni di utenti attivi dopo il lancio?",
        options: [
          "Un anno",
          "Sei mesi",
          "Due mesi",
          "Una settimana",
        ],
        correctIndex: 2,
        credits: 5,
      },
      {
        id: "q1-11",
        question:
          "Quale movimento artistico del Novecento anticipò il concetto di creatività automatica poi ripreso dal prompting?",
        options: [
          "Il Cubismo",
          "Il Surrealismo, con la scrittura automatica di Breton e Soupault",
          "L'Impressionismo",
          "Il Minimalismo",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q1-12",
        question:
          "Cos'è lo 'spazio latente' nell'AI generativa?",
        options: [
          "Lo spazio fisico in cui si trovano i server",
          "Lo spazio vettoriale multidimensionale in cui i dati sono tradotti e organizzati come coordinate numeriche",
          "Il tempo che intercorre tra invio del prompt e risposta",
          "La memoria cache del modello",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q1-13",
        question:
          "Cosa dimostrò il percettrone di Rosenblatt nel 1958?",
        options: [
          "Che i computer possono navigare su Internet",
          "Che un modello matematico poteva organizzare stimoli per associazioni probabilistiche, precorrendo il deep learning",
          "Che le macchine possono provare emozioni",
          "Che l'IA simbolica era superiore al connessionismo",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q1-14",
        question:
          "Cos'è CLIP (Contrastive Language-Image Pre-Training)?",
        options: [
          "Un formato per comprimere le immagini",
          "Un linguaggio di programmazione per l'AI",
          "Una rete neurale di OpenAI che associa descrizioni testuali a rappresentazioni visive, addestrata su 400 milioni di coppie testo-immagine",
          "Un editor video basato su AI",
        ],
        correctIndex: 2,
        credits: 5,
      },
      {
        id: "q1-15",
        question:
          "Cos'è l'architettura Mixture of Experts (MoE)?",
        options: [
          "Un modello che richiede più esperti umani per funzionare",
          "Un sistema che combina più sotto-modelli specializzati, attivandone solo alcuni per ogni richiesta",
          "Un metodo per addestrare modelli con dati provenienti da diversi Paesi",
          "Un'interfaccia che collega più chatbot diversi",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q1-16",
        question:
          "Qual è il principale vantaggio del RAG (Retrieval-Augmented Generation)?",
        options: [
          "Genera risposte più veloci eliminando la necessità di contesto",
          "Permette di accedere a documenti esterni aggiornati, riducendo le allucinazioni e citando le fonti",
          "Sostituisce completamente la necessità di addestrare modelli",
          "Funziona solo con immagini e video, non con testo",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q1-17",
        question:
          "Cosa distingue un AI Agent da un chatbot tradizionale?",
        options: [
          "L'AI Agent risponde solo in inglese",
          "L'AI Agent può pianificare, usare strumenti esterni ed eseguire azioni autonomamente",
          "L'AI Agent non ha bisogno di prompt",
          "L'AI Agent funziona solo offline",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q1-18",
        question:
          "Qual è il vantaggio principale degli Small Language Models (SLM)?",
        options: [
          "Sono sempre più accurati dei modelli grandi",
          "Possono essere eseguiti localmente, garantendo privacy e bassa latenza",
          "Non richiedono alcun prompt per funzionare",
          "Possono generare solo testo, non immagini",
        ],
        correctIndex: 1,
        credits: 5,
      },
    ],
    maxCredits: 90,
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULO 2 — Strumenti e Modelli di AI Generativa
  // ═══════════════════════════════════════════════════════════════
  {
    id: "modulo-2",
    title: "Strumenti e Modelli di AI Generativa",
    description:
      "Esplora i principali chatbot, generatori di immagini, video e audio: da ChatGPT a Midjourney, da Suno a ElevenLabs.",
    icon: "/icons/computer.png",
    agenda: [
      "Chatbot e Modelli Testuali",
      "Generazione di Immagini",
      "Generazione Video",
      "Generazione Audio e Musica",
      "Generazione di Codice",
      "AI Agents e Automazione",
      "Workflow Automation con AI",
      "Piattaforme Aggregatrici",
      "La Finestra di Contesto",
      "Modelli Proprietari vs Open Source",
      "Strumenti di Ricerca AI",
      "AI per la Produttività Personale",
      "Come Scegliere lo Strumento Giusto",
    ],
    content: `
## Il Panorama degli Strumenti AI

Il mercato dell'AI generativa offre una vasta gamma di strumenti specializzati. Conoscerli è fondamentale per scegliere quello più adatto alle proprie esigenze. Il settore è in continua evoluzione: nuovi modelli e funzionalità vengono rilasciati ogni settimana.

### Chatbot e Modelli Testuali

**ChatGPT (OpenAI)** — Il chatbot più diffuso al mondo, basato sui modelli GPT. Offre generazione di testo, analisi di documenti, generazione di codice e, nelle versioni più recenti, anche generazione di immagini tramite DALL-E. La versione GPT-4o è multimodale: può analizzare immagini, documenti PDF, fogli di calcolo e persino audio. Il piano gratuito dà accesso al modello base, mentre il piano Plus (20$/mese) sblocca GPT-4o con limiti più alti, DALL-E e la navigazione web.

Funzionalità avanzate di ChatGPT:
- **Canvas**: ambiente collaborativo per scrittura e codice con editing laterale
- **Custom Instructions**: personalizzazione permanente del comportamento
- **GPT Store**: marketplace di GPT specializzati creati dalla community
- **Code Interpreter**: esecuzione di codice Python per analisi dati, grafici e calcoli
- **Navigazione web**: accesso a informazioni aggiornate da Internet
- **Memoria**: capacità di ricordare preferenze e contesto tra conversazioni diverse

**Claude (Anthropic)** — Si distingue per la gestione di testi molto lunghi grazie a una finestra di contesto di oltre 200.000 token. Offre la funzionalità "Artefatti" per visualizzare i contenuti generati in modo strutturato — codice, documenti, diagrammi — in un pannello laterale interattivo. Claude è noto per:
- Risposte più sfumate e meno "scolastiche"
- Eccellente comprensione di testi lunghi e documenti complessi
- **Progetti**: spazi di lavoro con contesto condiviso e documenti caricati
- Forte focus sulla sicurezza e sull'allineamento con i valori umani

**Gemini (Google)** — Il modello di Google, integrato nell'ecosistema Google Workspace. Vanta una finestra di contesto record: fino a oltre 1 milione di token nel modello Gemini 1.5 Pro. Particolarmente forte nell'accesso e analisi di dati web, e nell'integrazione nativa con Gmail, Google Docs, Sheets e Drive.

**Microsoft Copilot** — Integrato in Windows, Edge, Microsoft 365 (Word, Excel, PowerPoint, Outlook, Teams). Combina i modelli GPT di OpenAI con l'accesso ai dati aziendali. Ideale per chi lavora nell'ecosistema Microsoft.

**Modelli Open Source** — Una tendenza in forte crescita:
- **Llama (Meta)**: modelli aperti ad alte prestazioni, utilizzabili localmente
- **Mistral**: modello europeo efficiente e performante
- **Phi (Microsoft)**: modelli "small" ottimizzati per uso locale
- Questi modelli possono essere eseguiti sul proprio computer tramite strumenti come **Ollama** e **LM Studio**, garantendo privacy totale

### Generazione di Immagini

La generazione di immagini da testo ha fatto progressi straordinari. I principali strumenti:

- **DALL-E 3** (integrato in ChatGPT): genera immagini da descrizioni testuali con buona comprensione delle istruzioni. Particolarmente efficace nel gestire testo all'interno delle immagini.

- **Midjourney**: eccelle nella qualità artistica e nel fotorealismo. Funziona tramite Discord o la nuova interfaccia web. Offre controllo avanzato sullo stile con parametri come --ar (aspect ratio), --style, --chaos.

- **Stable Diffusion**: modello open source, personalizzabile e utilizzabile in locale. Ideale per chi vuole il massimo controllo e privacy. Supporta tecniche avanzate come ControlNet, LoRA e Inpainting.

- **Adobe Firefly**: integrato nella suite Creative Cloud (Photoshop, Illustrator). Addestrato esclusivamente su contenuti licenziati, quindi sicuro dal punto di vista del copyright. Offre funzionalità come Riempimento Generativo in Photoshop.

- **Ideogram**: particolarmente efficace nella generazione di testo all'interno delle immagini (insegne, poster, loghi).

Come valutare la qualità di un'immagine AI:
- Coerenza con il prompt fornito
- Dettagli anatomici (mani, dita, volti — ancora un punto debole)
- Risoluzione e nitidezza
- Assenza di artefatti visivi
- Leggibilità del testo eventualmente incluso

### Generazione Video

La generazione video è il frontiera più recente e in rapida evoluzione:

- **Sora (OpenAI)**: genera video fino a 60 secondi da descrizioni testuali con qualità cinematografica. Capace di mantenere coerenza tra scene.
- **Runway Gen-3 Alpha**: uno dei tool più avanzati, usato anche in produzioni professionali. Supporta text-to-video, image-to-video e video-to-video.
- **Kling (Kuaishou)**: modello cinese con risultati impressionanti nella simulazione fisica realistica.
- **Pika**: interfaccia intuitiva per la generazione e modifica di video con effetti speciali.

### Generazione Audio e Musica

- **ElevenLabs**: leader nella sintesi vocale realistica. Offre voice cloning (clonazione della voce da pochi secondi di audio), text-to-speech in 30+ lingue, doppiaggio automatico, e un'API per integrazioni. Usato nella produzione di audiolibri, podcast e contenuti video.
- **Suno**: piattaforma per la generazione di brani musicali completi con voce e strumenti. Dato un prompt testuale, genera canzoni con testo, melodia, arrangiamento e voce.
- **Udio**: competitor diretto di Suno, con focus sulla qualità musicale e fedeltà ai generi.
- **Mubert**: generazione di musica ambientale e di sottofondo royalty-free.

### Generazione di Codice

L'AI ha trasformato anche il modo in cui si sviluppa software:

- **GitHub Copilot**: assistente di codice integrato nell'editor (VS Code, JetBrains). Suggerisce codice in tempo reale, completa funzioni e genera intere classi.
- **Cursor**: editor di codice con AI nativa, progettato per il coding assistito.
- **Replit Agent**: piattaforma che genera intere applicazioni web da una descrizione in linguaggio naturale.
- **v0 (Vercel)**: genera interfacce utente React/Next.js da prompt testuali.

### AI Agents e Automazione

Gli **AI Agents** rappresentano la prossima frontiera: sistemi capaci di eseguire task complessi in autonomia.

**Agenti per il Web**:
- **Operator** (OpenAI): naviga siti web, compila form, effettua acquisti
- **Computer Use** (Claude): controlla mouse e tastiera per interagire con qualsiasi software
- **Browserbase / Browserless**: infrastruttura per far navigare agenti AI

**Agenti per il Lavoro**:
- **Devin** (Cognition): "software engineer AI" che scrive, testa e deploya codice
- **Sweep**: agente che risolve bug e implementa feature da issue GitHub
- **Lindy**: crea agenti personalizzati per task ripetitivi (email, scheduling, ricerca)

**Agenti Open Source**:
- **AutoGPT**: framework per creare agenti autonomi con obiettivi definiti
- **BabyAGI**: agente semplice che scompone task e li esegue iterativamente
- **CrewAI**: framework per orchestrare team di agenti AI collaborativi
- **LangChain Agents**: integrazione di agenti nel framework LangChain

### Workflow Automation con AI

L'integrazione dell'AI nei workflow automatizzati moltiplica la produttività:

**Piattaforme No-Code**:
- **Zapier + AI**: automazioni che usano GPT per processare dati, scrivere email, classificare ticket
- **Make (ex Integromat)**: workflow visivi con moduli AI integrati
- **n8n**: alternativa open source con nodi per ChatGPT, Claude, modelli locali

**Casi d'uso comuni**:
- Email in arrivo → AI classifica per urgenza → smista al team corretto
- Nuovo lead nel CRM → AI genera email di benvenuto personalizzata
- Menzione social → AI analizza sentiment → alert se negativo
- Documento caricato → AI estrae dati chiave → popola database

**Costruire Workflow RAG**:
Piattaforme come **Flowise**, **LangFlow** e **Dify** permettono di creare sistemi RAG visualmente:
1. Carica documenti (PDF, Word, web pages)
2. Indicizza in un vector database (Pinecone, Weaviate, Chroma)
3. Collega a un LLM per rispondere basandosi sui documenti
4. Esponi come chatbot o API

### Piattaforme Aggregatrici

Strumenti che permettono di accedere a più modelli da un'unica interfaccia:

- **Poe**: accesso a ChatGPT, Claude, Gemini, Llama e altri da un'unica chat
- **Not Diamond**: routing intelligente che sceglie automaticamente il modello migliore per ogni richiesta
- **OpenRouter**: API unificata per accedere a decine di modelli con un solo account
- **Hugging Face**: piattaforma open source con migliaia di modelli, dataset e spazi demo

### La Finestra di Contesto

Un concetto fondamentale è la **finestra di contesto**: la quantità di testo che il modello può considerare per generare una risposta. Viene misurata in **token** (parole o frammenti di parole). Un token equivale approssimativamente a 0,75 parole in inglese (in italiano il rapporto è circa 0,6).

Confronto tra modelli:
- Gemini 1.5 Pro: fino a 1.048.576 token (~750.000 parole)
- Claude 3.5: 200.000 token (~150.000 parole)
- GPT-4o: 128.000 token (~96.000 parole)
- Llama 3.1: 128.000 token

Una finestra più ampia permette:
- Analisi di documenti molto lunghi (libri interi)
- Conversazioni più coerenti e contestualizzate
- Elaborazione di grandi basi di codice
- Confronto tra più documenti simultaneamente

### Modelli Proprietari vs Open Source

Una distinzione importante nel panorama AI:

**Modelli proprietari** (ChatGPT, Claude, Gemini):
- Prestazioni generalmente superiori
- Aggiornati frequentemente
- Richiedono connessione Internet
- I dati vengono inviati ai server dell'azienda
- Costo: gratuiti con limiti, o piani a pagamento (15-25$/mese)

**Modelli open source** (Llama, Mistral, Phi):
- Eseguibili in locale → privacy totale
- Personalizzabili e fine-tunabili
- Nessun costo di abbonamento (solo hardware)
- Comunità attiva e innovazione rapida
- Prestazioni in rapido miglioramento

### Strumenti di Ricerca AI

Oltre ai chatbot generici, esistono strumenti specializzati per la ricerca:

- **Perplexity**: motore di ricerca conversazionale con fonti citate
- **Consensus**: ricerca in letteratura scientifica peer-reviewed
- **Elicit**: assistente di ricerca per paper accademici
- **Semantic Scholar**: database accademico con AI per estrarre insight
- **You.com**: motore di ricerca con modalità AI e fonti multiple

### AI per la Produttività Personale

Strumenti AI per migliorare la produttività quotidiana:

**Note e Conoscenza**:
- **Notion AI**: assistente integrato per scrivere, riassumere, tradurre
- **Mem.ai**: note con memoria AI che collega automaticamente i concetti
- **Reflect**: app di note con AI per journaling e brainstorming

**Riunioni e Comunicazione**:
- **Otter.ai**: trascrizione automatica di meeting con riassunti AI
- **Fireflies.ai**: registra, trascrive e analizza le riunioni
- **Fathom**: note automatiche durante le call con highlight e action items
- **Supernormal**: riassunti AI delle riunioni inviati automaticamente

**Scrittura e Editing**:
- **Grammarly**: correzione grammaticale e suggerimenti di stile con AI
- **Hemingway Editor**: migliora la leggibilità del testo
- **Wordtune**: riscrittura e parafrasi con diverse tonalità
- **Jasper**: piattaforma di content marketing con AI

**Gestione Email**:
- **Superhuman AI**: scrittura e risposta email con AI integrata
- **Shortwave**: inbox intelligente con AI per prioritizzare e rispondere
- **Sanebox**: filtri AI per organizzare la posta

### Come Scegliere lo Strumento Giusto

Non esiste un modello migliore in assoluto. La scelta dipende da:
- **Tipo di contenuto**: testo, immagini, video, audio, codice
- **Complessità del progetto**: documenti brevi vs analisi di interi libri
- **Privacy**: dati sensibili → modelli locali; uso generale → cloud
- **Integrazione**: ecosistema già in uso (Google, Microsoft, standalone)
- **Budget**: molti offrono piani gratuiti limitati; l'uso professionale richiede abbonamenti
- **Qualità richiesta**: per uso professionale, testare più modelli sullo stesso compito
    `,
    quiz: [
      {
        id: "q2-1",
        question:
          "Quale chatbot si distingue per la gestione di testi molto lunghi con una finestra di contesto superiore a 200.000 token?",
        options: [
          "ChatGPT",
          "Claude di Anthropic",
          "Copilot di Microsoft",
          "Llama di Meta",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q2-2",
        question: "Cos'è la 'finestra di contesto' di un modello AI?",
        options: [
          "La dimensione dello schermo consigliata per l'uso del chatbot",
          "La quantità di testo che il modello può considerare per generare una risposta",
          "Il tempo massimo di una sessione di conversazione",
          "Il numero massimo di utenti contemporanei",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q2-3",
        question:
          "Quale strumento è specializzato nella sintesi vocale realistica e nel voice cloning?",
        options: [
          "Midjourney",
          "Stable Diffusion",
          "ElevenLabs",
          "Runway Gen-3",
        ],
        correctIndex: 2,
        credits: 5,
      },
      {
        id: "q2-4",
        question: "A cosa servono piattaforme aggregatrici come Poe e Not Diamond?",
        options: [
          "A generare esclusivamente immagini di alta qualità",
          "Ad accedere a più modelli AI da un'unica interfaccia",
          "A tradurre automaticamente in tutte le lingue",
          "A sostituire completamente i motori di ricerca",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q2-5",
        question:
          "Qual è una caratteristica distintiva di Stable Diffusion rispetto a DALL-E e Midjourney?",
        options: [
          "È l'unico che genera video",
          "È un modello open source, personalizzabile e utilizzabile in locale",
          "È integrato esclusivamente in Google Workspace",
          "Funziona solo su dispositivi Apple",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q2-6",
        question:
          "Quale modello ha la finestra di contesto più ampia?",
        options: [
          "GPT-4o con 128.000 token",
          "Claude 3.5 con 200.000 token",
          "Gemini 1.5 Pro con oltre 1 milione di token",
          "Llama 3.1 con 128.000 token",
        ],
        correctIndex: 2,
        credits: 5,
      },
      {
        id: "q2-7",
        question:
          "Perché Adobe Firefly è considerato sicuro dal punto di vista del copyright?",
        options: [
          "Perché genera solo immagini astratte",
          "Perché è stato addestrato esclusivamente su contenuti licenziati",
          "Perché le immagini sono sempre in bianco e nero",
          "Perché richiede il consenso dell'artista prima di ogni generazione",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q2-8",
        question:
          "Qual è il principale vantaggio dei modelli open source come Llama e Mistral?",
        options: [
          "Sono sempre più potenti dei modelli proprietari",
          "Possono essere eseguiti in locale garantendo privacy totale e sono personalizzabili",
          "Non richiedono alcun tipo di hardware",
          "Generano contenuti solo in lingua inglese",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q2-9",
        question:
          "Cosa permette di fare il Code Interpreter di ChatGPT?",
        options: [
          "Tradurre il codice da un linguaggio all'altro",
          "Eseguire codice Python per analisi dati, grafici e calcoli direttamente nella chat",
          "Installare software sul computer dell'utente",
          "Sostituire completamente un programmatore",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q2-10",
        question:
          "Cos'è Suno e cosa permette di generare?",
        options: [
          "Un generatore di immagini fotorealistiche",
          "Una piattaforma per la generazione di brani musicali completi con voce, melodia e strumenti",
          "Un modello di linguaggio open source",
          "Un editor video con effetti speciali AI",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q2-11",
        question:
          "Cosa distingue un AI Agent da un chatbot tradizionale?",
        options: [
          "L'AI Agent è sempre più veloce",
          "L'AI Agent può pianificare, usare strumenti esterni (browser, API, terminale) ed eseguire azioni in autonomia",
          "L'AI Agent funziona solo con comandi vocali",
          "L'AI Agent non ha bisogno di connessione Internet",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q2-12",
        question:
          "Quale strumento permette di creare workflow automatizzati con AI senza scrivere codice?",
        options: [
          "GitHub Copilot",
          "Zapier, Make o n8n con integrazioni AI",
          "Midjourney",
          "Stable Diffusion",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q2-13",
        question:
          "Cos'è CrewAI?",
        options: [
          "Un social network per sviluppatori AI",
          "Un framework per orchestrare team di agenti AI che collaborano tra loro",
          "Un tool per la gestione delle risorse umane",
          "Un chatbot specializzato in recruiting",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q2-14",
        question:
          "Quale tool è specializzato nella trascrizione automatica di meeting con riassunti AI?",
        options: [
          "DALL-E",
          "Otter.ai o Fireflies.ai",
          "Midjourney",
          "Stable Diffusion",
        ],
        correctIndex: 1,
        credits: 5,
      },
    ],
    maxCredits: 70,
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULO 3 — Prompt Engineering: Le Basi
  // ═══════════════════════════════════════════════════════════════
  {
    id: "modulo-3",
    title: "Prompt Engineering: Le Basi",
    description:
      "Impara a comunicare efficacemente con l'AI: dalle caratteristiche di un buon prompt ai framework fondamentali.",
    icon: "/icons/keyboard.png",
    agenda: [
      "Il Prompt come Atto Linguistico",
      "Il Promptismo: un Movimento Artistico",
      "Le Caratteristiche di un Prompt Efficace",
      "Prompt Zero-Shot, One-Shot e Few-Shot",
      "Il Framework Persona + Compito + Contesto + Formato",
      "Un Secondo Framework: RISCO",
      "L'Importanza del Ruolo",
      "Principi Fondamentali del Prompt Design",
      "Errori Comuni nel Prompt Engineering",
      "Debugging dei Prompt: Quando Non Funziona",
      "Tecniche di Iterazione e Raffinamento",
      "La Conversazione come Strumento",
      "Prompt Engineering nel Mondo Reale",
      "Prompt Predefiniti: Template Pronti all'Uso",
    ],
    content: `
## L'Arte di Comunicare con l'AI

Il **prompt** è l'istruzione che forniamo a un modello di AI generativa per ottenere una risposta. La qualità dell'output dipende direttamente dalla qualità del prompt: più ricchi, articolati e circostanziati saranno i nostri prompt, migliori saranno le risposte.

> "I prompt di maggior successo contengono in media circa 21 parole." — Google Workspace Lab

Il prompt engineering non è una scienza esatta ma una competenza pratica: si affina con l'esperienza, la sperimentazione e la comprensione profonda di come funzionano i modelli linguistici.

### Il Prompt come Atto Linguistico

In informatica, il **prompt** ("domanda, invito") è un indicatore della prontezza di un programma a ricevere un comando dall'utente. Nel deep learning il termine ha preso a indicare un testo elaborato in linguaggio naturale attraverso cui interagire con il software, con la mediazione di un bot che genera una risposta.

In termini performativi, un prompt può essere avvicinato a ciò che in linguistica si definisce un **atto linguistico**: enunciati carichi di una forza pragmatica, come quando facciamo una promessa o impartiamo un ordine. La funzionalità performativa del prompt sta proprio nell'**impartire un ordine al programma**, nel fargli fare qualcosa.

Come spiega il sito di Midjourney: "Un prompt è una breve frase testuale che il Bot interpreta per produrre un'immagine. Il Bot scompone le parole e le frasi in parti più piccole, chiamate **token**, in modo che possano essere paragonate ai dati di addestramento e quindi usate per generare un'immagine."

Il prompt è un **gesto matematico reso gesto comune**: le interfacce di questi strumenti si mostrano accessibili a un utilizzo non esperto, e gli utenti fondano su quell'atto — ordinare a una macchina cosa fare — l'esecuzione di un'attività creativa. Ciò comporta che non è strettamente richiesta una conoscenza informatica dello strumento: si può lavorare sull'interfaccia, giocando con ciò che si trova nello spazio rappresentazionale del modello.

Chi opera in questo campo non necessariamente possiede una maggiore conoscenza del mezzo; di certo, avrà una maggiore **familiarità** e un più sofisticato **metodo** per farlo funzionare manipolando l'input.

### Il Promptismo: un Movimento Artistico

Nel 2022 è nata una vera e propria comunità attorno al prompting e alle sue possibilità creative. Si scambiano consigli su GitHub e Reddit, si compilano guide per affinare i prompt, si esplorano i modelli generativi come strumenti creativi.

La **Prompt Battle** di Hellerau (Dresda), disputata il 30 ottobre 2022 alla Festspielhaus, fu il primo evento competitivo di prompting al mondo. Ideata da Florian A. Schmidt e Sebastian Schmieg dell'Università di Dresda, il format si ispirava alle battaglie rap: due sfidanti si confrontano a colpi di prompt, e il pubblico decide il vincitore per acclamazione.

Un gruppo di artisti ha persino redatto un **"Manifesto Promptista"**, scritto con l'ausilio di GPT-3, tentando di definire il prompting come un nuovo movimento artistico. Pur di breve durata, il manifesto ha colto qualcosa di importante: dall'AI generativa poteva nascere un **nuovo modo di agire nelle arti**.

Come aveva intuito già nel 2017 l'ingegnere François Chollet, creatore di Keras, parlando di "ganism" — l'aspetto e l'impressione tipica delle immagini generate da GAN — stava emergendo un'estetica specifica legata alla generazione artificiale.

Definire il **promptismo come poetica** significa riconoscere che questi strumenti non sono solo mezzi tecnici, ma possono dare luogo a una riflessione sull'agire creativo stesso. Come in ogni poetica, ciò che conta è il tentativo di interpretare un agire creativo attraverso le riflessioni su quell'agire, determinando nuovi modi di creare, nuovi rapporti tra ideazione e realizzazione.

### Le Caratteristiche di un Prompt Efficace

Secondo Andrea Giorgi, un buon prompt dovrebbe possedere queste caratteristiche:

**Unicità** — Ogni prompt deve essere pensato per la specifica situazione, non copiato genericamente. Un prompt generico produce risultati generici.

**Specificità** — Evitare richieste vaghe. Più dettagli forniamo, più l'output sarà pertinente.
- Debole: "Scrivi qualcosa sul marketing"
- Forte: "Scrivi un articolo di 800 parole sul content marketing per piccole imprese B2B nel settore manifatturiero, con focus sulla lead generation tramite LinkedIn"

**Concretezza** — Usare riferimenti concreti, esempi e dati reali. Non restare nell'astratto.
- Debole: "Dammi consigli per migliorare il mio business"
- Forte: "Sono un consulente finanziario indipendente con 50 clienti. Come posso aumentare il mio fatturato del 20% nei prossimi 12 mesi senza assumere personale?"

**Obiettivi chiari** — Definire cosa vogliamo ottenere: un articolo? Un elenco? Un'analisi? Un confronto?

**Contesto ricco** — Fornire informazioni di contesto: chi siamo, a chi ci rivolgiamo, in quale ambito operiamo, quali sono i vincoli.

**Esempi** — Includere esempi del formato o dello stile desiderato aiuta l'AI a calibrare l'output. Questa tecnica si chiama **few-shot prompting**.

### Prompt Zero-Shot, One-Shot e Few-Shot

Queste terminologie descrivono quanti esempi forniamo all'AI nel prompt:

**Zero-shot**: nessun esempio, solo l'istruzione diretta.
- "Classifica questa recensione come positiva o negativa: 'Il prodotto è arrivato rotto.'"

**One-shot**: un esempio + la richiesta.
- "Esempio: 'Il prodotto è fantastico!' → Positiva. Ora classifica: 'Non lo consiglio a nessuno.'"

**Few-shot**: due o più esempi + la richiesta.
- Fornire 3-5 esempi di input/output per stabilire lo schema, poi il caso da risolvere.

Il few-shot prompting è particolarmente efficace per compiti di classificazione, traduzione, formattazione e riscrittura.

### Il Framework Persona + Compito + Contesto + Formato

Fulvio Julita propone quattro unità di informazione fondamentali per un prompt efficace:

- **Persona**: il ruolo che l'AI deve assumere ("Sei un copywriter per Netflix con 10 anni di esperienza…")
- **Compito**: cosa deve fare l'AI ("Scrivi un riassunto accattivante di 150 parole…")
- **Contesto**: le informazioni di sfondo ("Basati sulle recensioni della critica e sulle prime impressioni del pubblico…")
- **Formato**: come deve essere presentato l'output ("Prevedi introduzione, 5 punti salienti e citazione finale…")

Esempio completo:
> "Sei un nutrizionista sportivo (PERSONA) specializzato in atleti amatoriali. Crea un piano alimentare settimanale (COMPITO) per un maratoneta di 35 anni che si allena 4 volte a settimana e vuole perdere 3 kg mantenendo le performance (CONTESTO). Presenta il piano in una tabella con colonne: giorno, colazione, spuntino, pranzo, merenda, cena, con le calorie totali per ogni giorno (FORMATO)."

### Un Secondo Framework: RISCO

Per compiti più complessi, si può usare il framework RISCO che scompone il task in modo analitico:

- **Ruolo**: chi è l'AI ("Sei il responsabile comunicazione di un'azienda tech")
- **Istruzioni**: cosa deve fare ("Redigi un comunicato stampa per il lancio di un nuovo prodotto")
- **Step**: la sequenza di azioni (1. Analizza i punti di forza del prodotto. 2. Individua il messaggio chiave. 3. Struttura il comunicato con titolo, sottotitolo, corpo e boilerplate.)
- **Confinamento/Obiettivo**: il risultato atteso e i limiti ("L'obiettivo è ottenere copertura mediatica. Il comunicato non deve superare le 500 parole.")
- **Output**: formato specifico ("Fornisci il comunicato in formato pronto per l'invio via email, con oggetto email incluso.")

### L'Importanza del Ruolo

Assegnare un ruolo all'AI cambia radicalmente il risultato. Lo stesso argomento spiegato da un "professore universitario" o da un "bambino di nove anni" produrrà output completamente diversi nel lessico, nella profondità e nel punto di vista.

Esempi di ruoli efficaci:
- "Sei un avvocato specializzato in diritto del lavoro con 20 anni di esperienza"
- "Sei un data scientist senior di Google"
- "Sei un giornalista investigativo del New York Times"
- "Sei un insegnante di scuola media che spiega concetti complessi in modo semplice"
- "Sei il direttore marketing di un brand di lusso"

Il ruolo influenza: vocabolario, profondità tecnica, struttura argomentativa, tono, prospettiva e livello di astrazione.

### Principi Fondamentali del Prompt Design

1. **Sii diretto**: vai al punto, evita giri di parole. I modelli rispondono meglio a istruzioni chiare.

2. **Usa direttive affermative**: "fai" è meglio di "non fare"; usa "evita" per le esclusioni. "Evita la voce passiva" funziona meglio di "Non usare la voce passiva".

3. **Integra il pubblico di destinazione** nel prompt: "Spiega come se parlassi a un manager non tecnico" produce risultati diversi da "Spiega a un ingegnere software senior".

4. **Scomponi i compiti complessi** in passaggi più semplici: invece di un unico mega-prompt, suddividi in prompt sequenziali collegati.

5. **Scrivi prompt basati su esempi** per chiarire le aspettative: mostra il formato desiderato con un esempio concreto.

6. **Usa i delimitatori** (###, ---, <>) per separare le sezioni del prompt: istruzioni, contesto, dati, formato.

7. **Specifica la lunghezza** dell'output desiderato: "in 200 parole", "in 5 punti", "in un paragrafo".

8. **Ripeti le parole chiave**: se un concetto è importante, menzionalo più volte nel prompt.

### Errori Comuni nel Prompt Engineering

**Prompt troppo vaghi**: "Dimmi qualcosa sull'intelligenza artificiale" → risultato generico e inutile.

**Troppe richieste in un solo prompt**: "Scrivi un articolo, poi crea 5 post social, poi suggerisci hashtag e poi genera un'immagine" → il modello si confonde o trascura parti.

**Mancanza di contesto**: il modello non conosce la tua situazione specifica. Senza contesto, dà risposte generiche.

**Non specificare il formato**: se non dici come vuoi la risposta, il modello decide autonomamente (spesso in modo non ottimale).

**Ignorare l'iterazione**: raramente il primo prompt dà il risultato perfetto. Il prompt engineering è un processo iterativo di raffinamento.

### Debugging dei Prompt: Quando Non Funziona

Quando un prompt non produce i risultati desiderati, ecco come diagnosticare e risolvere il problema:

**Sintomi comuni e soluzioni**:

| Problema | Possibile Causa | Soluzione |
|----------|-----------------|----------|
| Risposta troppo generica | Mancanza di specificità | Aggiungi dettagli concreti, esempi, vincoli |
| Risposta fuori tema | Prompt ambiguo | Riformula in modo più diretto, usa delimitatori |
| Tono sbagliato | Ruolo non definito | Specifica il ruolo e il pubblico target |
| Troppo lungo/corto | Lunghezza non specificata | Indica esplicitamente la lunghezza desiderata |
| Formato errato | Formato non richiesto | Descrivi il formato con un esempio |
| Allucinazioni | Domanda su dati sconosciuti | Chiedi di citare fonti o ammettere incertezza |

**tecnica del "Spiega il tuo ragionamento"**:
Se non capisci perché l'AI ha risposto in un certo modo:
> "Spiega passo dopo passo come sei arrivato a questa risposta."

**Tecnica del "Cosa manca?"**:
> "Rivedi la tua risposta. Cosa manca? Quali aspetti importanti non hai considerato?"

**Tecnica dell'"Avvocato del diavolo"**:
> "Critica la tua risposta. Quali sono i punti deboli? Come potrebbe essere migliorata?"

### Tecniche di Iterazione e Raffinamento

Il prompt engineering è un processo iterativo. Ecco le strategie più efficaci:

**1. Iterazione per addizione**:
Partire da un prompt semplice e aggiungere elementi progressivamente:
- Versione 1: "Scrivi un articolo sull'AI"
- Versione 2: "Scrivi un articolo di 800 parole sull'AI per manager non tecnici"
- Versione 3: "Scrivi un articolo di 800 parole sull'AI per manager non tecnici, con focus sui benefici operativi e 3 casi d'uso concreti"

**2. Iterazione per sottrazione**:
Partire da un prompt complesso e semplificare se la risposta è confusa:
- Rimuovi istruzioni ridondanti
- Elimina vincoli contraddittori
- Separa in prompt multipli se necessario

**3. A/B Testing dei prompt**:
Testa varianti dello stesso prompt per capire cosa funziona meglio:
- Cambia il ruolo assegnato
- Prova formati diversi (elenco vs prosa)
- Varia il livello di dettaglio

**4. Tecnica della "Bozza Zero"**:
1. Primo prompt: genera una bozza grezza
2. Secondo prompt: "Identifica i 3 punti più deboli di questa bozza"
3. Terzo prompt: "Riscrivi migliorando questi 3 punti"

**5. Feedback loop esplicito**:
> "Ecco la tua risposta precedente. Il problema è [X]. Riscrivi affrontando specificamente questo aspetto."

### La Conversazione come Strumento

I chatbot moderni supportano conversazioni multi-turno. Questo significa che puoi:

- Iniziare con un prompt ampio, poi raffinare con follow-up
- Chiedere chiarimenti o modifiche senza riscrivere tutto
- Costruire progressivamente un contenuto complesso
- Usare "continua" o "approfondisci il punto 3" per espandere

La conversazione è uno strumento potente: l'AI mantiene il contesto dell'intera chat, quindi ogni messaggio successivo beneficia di tutto ciò che è stato detto prima.

### Prompt Engineering nel Mondo Reale

Il prompt engineering è una competenza sempre più richiesta nel mercato del lavoro. Secondo LinkedIn, "AI prompt engineering" è tra le competenze in più rapida crescita. Viene applicato in:

- **Marketing**: generazione di copy, piani editoriali, analisi competitor
- **Educazione**: creazione di materiali didattici, quiz, spiegazioni personalizzate
- **Legale**: sintesi di documenti, ricerca giuridica, bozze di contratti
- **Medicina**: supporto alla diagnosi, sintesi di studi clinici, comunicazione paziente
- **Sviluppo software**: generazione di codice, documentazione, debug
- **Risorse umane**: screening CV, job description, comunicazione interna

### Prompt Predefiniti: Template Pronti all'Uso

Ecco una raccolta di **prompt predefiniti** testati e ottimizzati, organizzati per categoria. Puoi copiarli e adattarli alle tue esigenze.

**ANALISI E RICERCA**

> **Analisi di mercato**: "Sei un analista di mercato senior con 15 anni di esperienza nel settore [SETTORE]. Conduci un'analisi approfondita del mercato [MERCATO] in Italia. Includi: dimensioni del mercato, trend attuali, principali player, opportunità emergenti e rischi. Presenta i risultati in una tabella riassuntiva seguita da 5 insight strategici."

> **Sintesi di documento**: "Leggi attentamente il seguente documento e produci: (1) un riassunto esecutivo di 150 parole, (2) i 5 punti chiave in elenco puntato, (3) le 3 azioni raccomandate, (4) le domande aperte da approfondire. Documento: [INCOLLA TESTO]"

> **Analisi SWOT**: "Conduci un'analisi SWOT completa per [AZIENDA/PROGETTO]. Per ciascun quadrante (Strengths, Weaknesses, Opportunities, Threats) fornisci almeno 5 punti con breve spiegazione. Concludi con 3 raccomandazioni strategiche prioritarie."

**SCRITTURA E CONTENUTI**

> **Articolo di blog SEO**: "Sei un content strategist esperto di SEO. Scrivi un articolo di 1200 parole ottimizzato per la keyword '[KEYWORD]'. Struttura: titolo H1 accattivante, introduzione con hook, 4 sezioni con H2, ciascuna con un esempio concreto, conclusione con CTA. Tono: professionale ma accessibile. Target: [AUDIENCE]."

> **Post LinkedIn**: "Scrivi un post LinkedIn professionale su [ARGOMENTO]. Struttura: hook potente nella prima riga (max 15 parole), 3 paragrafi brevi con spazi tra loro, 1 dato o statistica rilevante, chiusura con domanda al pubblico. Massimo 250 parole. Tono: autorevole ma umano."

> **Newsletter**: "Crea una newsletter settimanale per [BRAND/SETTORE]. Oggetto email irresistibile (max 50 caratteri). Struttura: saluto personalizzato, 1 insight principale con approfondimento, 3 news brevi del settore, 1 tip pratico, CTA finale. Tono: [TONO]. Max 400 parole."

**BUSINESS E STRATEGIA**

> **Business plan sintetico**: "Sei un consulente strategico. Crea un business plan sintetico per [IDEA DI BUSINESS]. Includi: executive summary, problema risolto, soluzione proposta, modello di revenue, analisi del target, strategia go-to-market, proiezioni economiche a 12 mesi, KPI da monitorare. Formato: sezioni chiare con bullet point."

> **Proposta commerciale**: "Redigi una proposta commerciale professionale per [SERVIZIO/PRODOTTO] destinata a [TIPO DI CLIENTE]. Includi: presentazione dell'azienda (3 righe), analisi dei bisogni del cliente, soluzione proposta, deliverable, timeline, pricing, termini e condizioni, CTA per procedere."

**FORMAZIONE E DIDATTICA**

> **Piano di lezione**: "Sei un instructional designer esperto. Crea un piano di lezione di 60 minuti su [ARGOMENTO] per [LIVELLO/AUDIENCE]. Includi: obiettivi di apprendimento (3 max), scaletta temporale, attività interattive, materiali necessari, metodo di valutazione, 5 domande di verifica."

> **Quiz a scelta multipla**: "Crea 10 domande a scelta multipla su [ARGOMENTO]. Ogni domanda deve avere 4 opzioni con una sola risposta corretta. Includi: domande di diversa difficoltà (3 facili, 4 medie, 3 difficili). Alla fine, fornisci le risposte con breve spiegazione per ciascuna."

**EMAIL PROFESSIONALI**

> **Email di follow-up**: "Scrivi un'email di follow-up professionale dopo un incontro con [TIPO DI INTERLOCUTORE] riguardo a [ARGOMENTO]. L'email deve: ringraziare per il tempo dedicato, riassumere i 3 punti chiave discussi, proporre i prossimi passi concreti, includere una CTA con data specifica. Tono: cordiale e professionale. Max 150 parole."

> **Email di presentazione aziendale**: "Scrivi un'email di presentazione di [AZIENDA] destinata a potenziali clienti nel settore [SETTORE]. Deve essere breve (max 200 parole), evidenziare il valore unico, includere 1-2 risultati concreti ottenuti, e chiudersi con una CTA per una call di 15 minuti."

**SOCIAL MEDIA**

> **Piano editoriale mensile**: "Crea un piano editoriale di 4 settimane per [PIATTAFORMA] di [BRAND]. Per ogni giorno lavorativo prevedi: tipo di contenuto (reel, carosello, post singolo, stories), argomento, copy (max 200 caratteri), 5 hashtag, orario di pubblicazione. Alterna: educativo 40%, storytelling 25%, prodotto 20%, engagement 15%."

> **Carosello Instagram educativo**: "Crea un carosello Instagram di 8 slide su [ARGOMENTO]. Slide 1: titolo con hook provocatorio. Slide 2-7: un concetto per slide, frase breve e impattante (max 25 parole per slide). Slide 8: CTA e riepilogo. Suggerisci la caption (max 200 parole) con 10 hashtag."
    `,
    quiz: [
      {
        id: "q3-1",
        question:
          "Secondo il Google Workspace Lab, quante parole contengono in media i prompt di maggior successo?",
        options: [
          "Meno di 5 parole",
          "Circa 10 parole",
          "Circa 21 parole",
          "Più di 50 parole",
        ],
        correctIndex: 2,
        credits: 5,
      },
      {
        id: "q3-2",
        question:
          "Nel framework 'Persona + Compito + Contesto + Formato', cosa rappresenta la 'Persona'?",
        options: [
          "L'utente che scrive il prompt",
          "Il ruolo che l'AI deve assumere nella risposta",
          "Il destinatario finale del contenuto",
          "Il nome del chatbot utilizzato",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q3-3",
        question:
          "Perché è importante assegnare un ruolo all'AI nel prompt?",
        options: [
          "Perché l'AI funziona solo se ha un ruolo assegnato",
          "Perché cambia radicalmente il lessico, la profondità e il punto di vista della risposta",
          "Perché rende il prompt più corto",
          "Perché è obbligatorio per motivi tecnici",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q3-4",
        question:
          "Quale principio suggerisce di usare 'evita' invece di 'non fare' nei prompt?",
        options: [
          "Il principio di concretezza",
          "Il principio delle direttive affermative",
          "Il principio di unicità",
          "Il principio di formattazione",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q3-5",
        question:
          "A cosa servono i delimitatori (###, ---, <>) in un prompt?",
        options: [
          "A rendere il prompt più elegante visivamente",
          "A separare le sezioni del prompt e chiarire la struttura per l'AI",
          "A limitare la lunghezza della risposta",
          "A indicare le parole chiave da evidenziare",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q3-6",
        question:
          "Cos'è il 'few-shot prompting'?",
        options: [
          "Un prompt molto breve di poche parole",
          "Fornire 2-5 esempi di input/output nel prompt per guidare l'AI",
          "Un prompt che genera output in lingue diverse",
          "Una tecnica per limitare la lunghezza delle risposte",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q3-7",
        question:
          "Qual è l'approccio consigliato per compiti complessi con l'AI?",
        options: [
          "Scrivere un unico prompt lunghissimo con tutti i dettagli",
          "Scomporre il compito in passaggi più semplici e procedere con prompt sequenziali",
          "Usare sempre il modello più potente disponibile",
          "Evitare di fornire contesto per non confondere il modello",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q3-8",
        question:
          "Cosa distingue un prompt 'zero-shot' da un prompt 'one-shot'?",
        options: [
          "Lo zero-shot è più lungo",
          "Lo zero-shot non include alcun esempio, l'one-shot include un esempio",
          "Lo zero-shot funziona solo con GPT-4",
          "Non c'è nessuna differenza",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q3-9",
        question:
          "Perché il primo prompt raramente dà il risultato perfetto?",
        options: [
          "Perché i modelli AI sono ancora in versione beta",
          "Perché il prompt engineering è un processo iterativo di raffinamento progressivo",
          "Perché il modello ha bisogno di tempo per 'scaldarsi'",
          "Perché il primo output è sempre di qualità inferiore",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q3-10",
        question:
          "Nel framework RISCO, cosa rappresenta la 'S'?",
        options: [
          "Stile della risposta",
          "Step: la sequenza di azioni da seguire",
          "Sicurezza dei dati",
          "Sintesi dei contenuti",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q3-11",
        question:
          "In senso linguistico, a cosa può essere avvicinato un prompt?",
        options: [
          "A un testo narrativo",
          "A un atto linguistico performativo: un enunciato che produce un effetto, come impartire un ordine",
          "A una poesia in versi liberi",
          "A un messaggio di posta elettronica",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q3-12",
        question:
          "Cos'è la Prompt Battle di Hellerau?",
        options: [
          "Un videogioco basato sull'AI",
          "Il primo evento competitivo di prompting al mondo, ispirato alle battaglie rap, tenutosi a Dresda nel 2022",
          "Un software per testare prompt automaticamente",
          "Un corso universitario sul prompt engineering",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q3-13",
        question:
          "Quando un prompt genera risposte troppo generiche, qual è la soluzione più efficace?",
        options: [
          "Usare un modello AI diverso",
          "Aggiungere dettagli concreti, esempi e vincoli specifici al prompt",
          "Ripetere lo stesso prompt più volte",
          "Ridurre la lunghezza del prompt",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q3-14",
        question:
          "Cos'è la tecnica dell'iterazione per addizione?",
        options: [
          "Aggiungere più chatbot alla conversazione",
          "Partire da un prompt semplice e aggiungere elementi progressivamente per raffinarlo",
          "Sommare i risultati di più prompt diversi",
          "Aumentare automaticamente la lunghezza delle risposte",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q3-15",
        question:
          "A cosa serve la tecnica 'Spiega il tuo ragionamento' nel debugging dei prompt?",
        options: [
          "A rallentare la generazione per risposte più accurate",
          "A capire come l'AI è arrivata a una certa risposta per identificare errori nel prompt",
          "A tradurre il prompt in linguaggio tecnico",
          "A ridurre il consumo di token",
        ],
        correctIndex: 1,
        credits: 5,
      },
    ],
    maxCredits: 75,
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULO 4 — Prompt Avanzato e Personalizzazione
  // ═══════════════════════════════════════════════════════════════
  {
    id: "modulo-4",
    title: "Prompt Avanzato e Personalizzazione",
    description:
      "Tecniche avanzate di prompt: meta prompt, chain-of-thought, istruzioni personalizzate, GPT su misura e il prompt di contesto per il brand.",
    icon: "/icons/gear.png",
    agenda: [
      "Il Chain-of-Thought (CoT) Prompting",
      "Il Tree-of-Thought (ToT) Prompting",
      "Il Meta Prompt",
      "La Tecnica del Prompt Ricorsivo",
      "Le Istruzioni Personalizzate",
      "I GPT Personalizzati (Custom GPTs)",
      "Il Prompt di Contesto per il Brand",
      "Strategie Anti-Verbosità",
      "Scomporre i Prompt in Blocchi",
      "I Framework Operativi: RTF, RISEN, RODES, ABA",
      "La Tecnica RE2 (Re-Reading)",
      "La Tecnica Plan-and-Solve",
      "Prompt per Immagini e Video AI",
      "Tecniche di Prompting Avanzate: Riepilogo",
      "Quando Non Sai da Dove Iniziare",
    ],
    content: `
## Oltre le Basi: Tecniche Avanzate

Una volta acquisite le basi del prompt engineering, è possibile elevare la qualità delle interazioni con l'AI attraverso tecniche più sofisticate. Queste tecniche sono ciò che distingue un utente occasionale da un professionista dell'AI.

### Il Chain-of-Thought (CoT) Prompting

Il **Chain-of-Thought** è una tecnica che invita l'AI a "ragionare passo dopo passo" prima di arrivare alla conclusione. Questo migliora drasticamente le prestazioni su problemi logici, matematici e decisionali.

Esempio senza CoT:
> "Quante palline da tennis entrano in un autobus?"
> → Risposta istantanea (spesso imprecisa)

Esempio con CoT:
> "Quante palline da tennis entrano in un autobus? Ragiona passo dopo passo: stima le dimensioni dell'autobus, calcola il volume, stima le dimensioni di una pallina da tennis, e poi dividi."
> → Ragionamento dettagliato e risposta più accurata

La semplice aggiunta di "Ragiona passo dopo passo" o "Pensa ad alta voce" può migliorare la qualità delle risposte del 20-40% su compiti di ragionamento.

Varianti più sofisticate:
- **Zero-shot CoT**: aggiungere "Pensiamo passo a passo" senza fornire esempi
- **Few-shot CoT**: fornire esempi di ragionamento corretto prima del problema
- **Self-consistency**: generare più ragionamenti e selezionare la risposta più frequente

### Il Tree-of-Thought (ToT) Prompting

Una evoluzione del CoT che chiede all'AI di esplorare **più percorsi di ragionamento** in parallelo, come un albero decisionale:

> "Considera tre approcci diversi per risolvere questo problema. Per ciascuno, valuta pro e contro. Poi seleziona l'approccio migliore e sviluppalo."

Questa tecnica è particolarmente utile per problemi complessi con più soluzioni possibili, come pianificazione strategica, analisi di scenario e decisioni aziendali.

### Il Meta Prompt

Il **meta prompt** è un prompt che chiede all'AI di *migliorare un altro prompt*. Invece di scrivere direttamente la richiesta perfetta, descriviamo cosa vogliamo ottenere e chiediamo al modello di formulare il prompt ottimale.

Esempio pratico:
> "Sono un responsabile marketing di una PMI italiana nel settore alimentare. Devo usare ChatGPT per creare contenuti per i social media. Scrivi il prompt migliore possibile che potrei usare per generare un piano editoriale mensile per Instagram. Il prompt deve specificare il contesto aziendale, il tono di voce, il formato desiderato e gli obiettivi."

Il meta prompt è utile quando:
- Non sai come formulare al meglio una richiesta complessa
- Vuoi imparare a scrivere prompt migliori
- Devi creare prompt riutilizzabili per un team

### La Tecnica del "Prompt Ricorsivo"

Consiste nel chiedere all'AI di valutare e migliorare iterativamente il proprio output:

1. Primo prompt: genera il contenuto
2. Secondo prompt: "Rivedi il testo generato. Identifica 3 punti deboli e riscrivi migliorandoli."
3. Terzo prompt: "Ora confronta la prima e la seconda versione. Crea una versione finale che combini i migliori elementi di entrambe."

Questo approccio iterativo produce risultati significativamente migliori rispetto a un singolo prompt.

### Prompt Chaining: Sequenze di Prompt

Il **prompt chaining** consiste nel collegare più prompt in sequenza, dove l'output di uno diventa l'input del successivo. È fondamentale per task complessi che non possono essere risolti con un singolo prompt.

**Struttura tipica di una catena**:
1. **Prompt di analisi**: comprendi il problema e i requisiti
2. **Prompt di pianificazione**: crea una struttura o outline
3. **Prompt di esecuzione**: genera il contenuto secondo il piano
4. **Prompt di revisione**: valuta e migliora il risultato
5. **Prompt di finalizzazione**: formatta e ottimizza l'output

**Esempio pratico: creazione di un report**:

> **Prompt 1**: "Analizza questi dati di vendita e identifica i 5 trend principali. [DATI]"
> **Output 1**: Trend identificati

> **Prompt 2**: "Per ciascuno di questi trend, suggerisci 3 azioni strategiche: [OUTPUT 1]"
> **Output 2**: Azioni strategiche

> **Prompt 3**: "Scrivi un executive summary di 300 parole basato su questa analisi: [OUTPUT 1 + OUTPUT 2]"
> **Output 3**: Report finale

**Vantaggi del chaining**:
- Maggiore controllo su ogni fase
- Possibilità di correggere errori intermedi
- Output finale più coerente e approfondito
- Riduzione delle allucinazioni

### System Prompts e Istruzioni di Sistema

Il **system prompt** (o system message) è un'istruzione speciale che definisce il comportamento globale del modello, separata dalla conversazione utente.

**Differenza con il prompt utente**:
- **System prompt**: definisce "chi sei" e "come devi comportarti" — resta attivo per tutta la conversazione
- **User prompt**: la richiesta specifica dell'utente

**Struttura di un system prompt efficace**:

~~~
## Identità
Sei [ruolo] con [esperienza/competenze].

## Comportamento
- Rispondi sempre in [lingua]
- Usa un tono [aggettivo]
- Struttura le risposte con [formato]

## Conoscenze
Hai accesso a: [documenti/contesto]

## Limitazioni
- Non fare [azione proibita]
- Se non sai qualcosa, [comportamento]

## Formato Output
- Usa sempre [struttura]
- Includi [elementi richiesti]
~~~

**System prompt per assistente aziendale**:
> "Sei l'assistente AI di TechCorp. Rispondi solo a domande relative ai nostri prodotti software. Usa sempre un tono professionale ma amichevole. Se la domanda esula dal tuo ambito, suggerisci di contattare il supporto umano. Cita sempre la fonte quando possibile."

### Le Istruzioni Personalizzate

Le **Istruzioni Personalizzate** di ChatGPT permettono di fornire un ricco contesto che il modello considererà in ogni conversazione. Sono composte da due sezioni:

1. **Informazioni su di noi**: professione, campo di specializzazione, progetti attuali, obiettivi, interessi, stile di comunicazione preferito, livello di competenza tecnica
2. **Preferenze di risposta**: struttura (più elenchi o più prosa?), tono (formale/informale), terminologia (tecnica/divulgativa), livello di dettaglio (conciso/approfondito), creatività (conservativo/creativo), metodo di problem solving (analitico/pratico)

Esempio di istruzione personalizzata efficace:
> **Chi sei**: "Sono un copywriter freelance specializzato in tecnologia B2B. Lavoro con startup SaaS italiane ed europee. Il mio obiettivo principale è creare contenuti che generino lead qualificati. Ho 8 anni di esperienza."
> **Come rispondere**: "Rispondi sempre in modo diretto e concreto. Usa il 'tu' informale. Evita frasi fatte e cliché. Quando proponi testi, includi sempre una CTA. Preferisco elenchi puntati a paragrafi lunghi. Se non conosci qualcosa, dillo apertamente."

Anche **Claude** offre funzionalità simili attraverso i **Progetti**, dove è possibile impostare un prompt di sistema e caricare documenti di riferimento. **Gemini** permette di personalizzare attraverso le estensioni e le Gems.

### I GPT Personalizzati (Custom GPTs)

Il **GPT Store** di OpenAI ospita migliaia di GPT specializzati, organizzati in categorie come produttività, generazione di codice, scrittura e lifestyle. È possibile:

- Usare GPT creati da altri (Canva, Kayak, Consensus, Scholar AI…)
- **Costruire un proprio GPT**: definendo un nome, una descrizione, istruzioni specifiche (il "system prompt") e caricando documenti di riferimento (knowledge base)
- Richiamare GPT diversi con il simbolo **@** all'interno di qualsiasi conversazione

Come creare un GPT personalizzato:
1. Vai su "Esplora GPT" → "Crea"
2. Nella sezione Configura, definisci: nome, descrizione, istruzioni dettagliate
3. Carica documenti di riferimento (cataloghi, guide di stile, FAQ, documenti aziendali)
4. Scegli le capacità: navigazione web, DALL-E, Code Interpreter
5. Definisci i "conversation starters": domande suggerite per iniziare
6. Testa e affina il comportamento

Casi d'uso per GPT personalizzati:
- Assistente clienti che conosce tutto il catalogo prodotti
- Tutor personalizzato per una materia specifica
- Generatore di report che segue un template aziendale
- Traduttore specializzato con glossario tecnico di settore

### Prompting per AI Agents

Promptare un agente AI richiede un approccio diverso rispetto a un chatbot tradizionale. Gli agenti devono capire **obiettivi**, **strumenti disponibili** e **criteri di successo**.

**Struttura del prompt per agenti**:

~~~
## OBIETTIVO
[Descrizione chiara del risultato finale desiderato]

## STRUMENTI DISPONIBILI
- [Tool 1]: [cosa fa, quando usarlo]
- [Tool 2]: [cosa fa, quando usarlo]

## VINCOLI
- [Limitazione 1]
- [Limitazione 2]

## CRITERI DI SUCCESSO
- [Come capire se il task è completato]

## PROCEDURA
1. [Primo step]
2. [Secondo step]
...
~~~

**Esempio per un agente di ricerca**:
> **Obiettivo**: Trova i 5 competitor principali di [Azienda] e crea una tabella comparativa con pricing, feature e recensioni.
> **Strumenti**: Browser web, lettura pagine, estrazione dati, creazione tabelle.
> **Vincoli**: Usa solo fonti ufficiali e recensioni verificate. Non inventare dati.
> **Criteri di successo**: Tabella completa con almeno 3 datapoint per ogni competitor.

**Principi chiave per prompting di agenti**:
- Sii esplicito sugli **strumenti** che l'agente può usare
- Definisci chiaramente **quando fermarsi**
- Specifica come **gestire gli errori** (riprovare, chiedere aiuto, segnalare)
- Includi **esempi di output atteso** quando possibile

### Il Prompt di Contesto per il Brand

Fulvio Julita propone il concetto di **prompt di contesto**: un documento strutturato che contiene tutte le informazioni su un brand da fornire all'AI come base per ogni sessione di lavoro.

Struttura completa del prompt di contesto:

**1. Profilo del Brand**
- Ragione sociale e anno di fondazione
- Mission e vision
- Posizionamento nel mercato
- Principali prodotti/servizi
- Punti di forza e differenziazione
- Valori fondamentali
- Tono di voce e personalità del brand

**2. Target Audience**
- Demografia (età, genere, professione, area geografica)
- Bisogni e desideri principali
- Timori e frustrazioni (pain points)
- Comportamenti d'acquisto
- Canali di comunicazione preferiti
- Linguaggio e terminologia dell'audience

**3. Linee Guida per la Comunicazione**
- Parole e frasi da usare sempre
- Parole e frasi da evitare
- Esempi di contenuti approvati
- Competitori chiave e come differenziarsi
- Call-to-action standard

Vantaggi: maggiore precisione, efficienza, coerenza con l'identità del brand e flessibilità nell'uso. Il documento può essere caricato come knowledge base in un GPT personalizzato o incollato all'inizio di una conversazione.

### Strategie Anti-Verbosità

Per ottenere testi concisi e meno "prolissi":

1. **Comandi diretti**: "Sii conciso", "Evita parole inutili", "Scrivi in modo chiaro e diretto"
2. **Leggibilità**: specificare un livello misurato (es. "Flesch Reading Ease di 80+", "comprensibile da uno studente di 14 anni")
3. **Limite parole**: "Rispondi in non più di 100 parole"
4. **Struttura**: richiedere elenchi puntati, tabelle o bullet point
5. **Anti-pattern**: "Evita introduzioni generiche del tipo 'Certamente!', 'Ottima domanda!'". "Non ripetere la mia domanda nella risposta."
6. **Modello**: fornire un esempio dell'output desiderato per il livello di concisione

### Scomporre i Prompt in Blocchi

Un prompt efficace è come un muro: è composto da tanti **"mattoni"** (blocchi) che rappresentano i distinti elementi della richiesta. Pensare al prompt in modo modulare ci permette di costruire template riutilizzabili e coerenti.

**I due mattoni base** — Ogni prompt deve contenere almeno:
- **Istruzioni**: l'azione richiesta ("scrivi un articolo", "analizza questo dataset", "genera un piano")
- **Contesto**: le informazioni e i dettagli che arricchiscono la richiesta e indirizzano il modello

Senza questi due blocchi il prompt è inefficace. A partire da qui, possiamo aggiungere mattoni specifici:

| Blocco | Funzione | Esempio |
|--------|----------|---------|
| Ruolo | Chi è l'AI | "Ragiona come un redattore con 10 anni di esperienza" |
| Argomento | Il tema specifico | "L'impatto del cambiamento climatico sulla produzione vinicola" |
| Audience | Il destinatario | "Professionisti del settore enogastronomico" |
| Tono | L'inflessione emotiva | "Professionale", "Amichevole", "Autorevole" |
| Stile | Il modo espositivo | "Informativo", "Persuasivo", "Narrativo" |
| Obiettivo | Lo scopo | "Sensibilizzare sui rischi del cambiamento climatico" |
| Formato | La struttura dell'output | "Tabella", "Elenco puntato", "Report" |
| Risorse | Fonti da utilizzare | "Basati sui dati dell'ultimo report ISTAT" |
| Lingua | La lingua dell'output | "Rispondi in tedesco" |
| Metriche | Come misurare il successo | "Il CTR target è del 3%" |
| CTA | Chiamata all'azione | "Invita i lettori a iscriversi al webinar" |

**Prompt discorsivo vs. prompt per punti** — Entrambi funzionano, ma i prompt strutturati a blocchi sono generalmente più efficaci per compiti complessi perché separano le informazioni in modo chiaro, riducendo ambiguità.

### I Framework Operativi per il Prompt

Combinando i blocchi in modo sistematico, possiamo creare **framework** — schemi predefiniti di comprovata efficacia da usare come base per ogni prompt.

**RTF (Role-Task-Format)** — Il framework più semplice e diffuso:
- **Role**: il ruolo assegnato al modello
- **Task**: le istruzioni specifiche
- **Format**: il formato di output desiderato

> Esempio: "Ruolo: Sei un direttore HR con 20 anni di esperienza. Task: crea un piano di onboarding per un nuovo direttore vendite nel settore elettrodomestici. Formato: tabella con timeline settimanale."

**RISEN (Role-Instructions-Steps-End Goal-Narrowing)** — Per compiti strutturati con obiettivi precisi:
- **Role**: ruolo dell'AI
- **Instructions**: il compito principale
- **Steps**: sequenza di azioni da seguire
- **End Goal**: risultato finale desiderato
- **Narrowing**: focus e restrizioni specifiche

> Esempio: "Role: ecommerce manager (10+ anni). Instructions: piano d'azione per lancio e-commerce cosmetica green. Steps: 1) Ricerca di mercato; 2) Pianificazione strategica; 3) Sviluppo piattaforma; 4) Marketing e branding; 5) Logistica; 6) Lancio e monitoraggio. End Goal: attrarre e fidelizzare clienti con vendite costanti. Narrowing: focus su sostenibilità e ingredienti naturali."

**RODES (Role-Objective-Details-Examples-Sense Check)** — Per analisi complesse con verifica di comprensione:
- **Role**: ruolo specializzato
- **Objective**: azione richiesta
- **Details**: dati di input e metriche
- **Examples**: esempi concreti di risultato atteso
- **Sense Check**: verifica che l'AI abbia compreso tutti i dettagli

> Esempio: "Role: esperto TikTok advertising. Objective: analizza performance di una campagna streetwear. Details: [metriche fornite]. Examples: se i video influencer hanno +50% visualizzazioni e 4% conversion rate, l'influencer marketing è efficace. Sense Check: hai compreso le metriche? Sei in grado di confrontare le performance e valutare il ROI?"

**ABA (Ask Before Answer)** — Per arricchire il contesto facendo domande:

Aggiungendo una frase al termine del prompt, si chiede all'AI di porre domande prima di procedere. Questo migliora significativamente la qualità dell'output.

> Esempio: "Sei un articolista web SEO. Scrivi un articolo sulla storia dell'energia solare. Tono: professionale. Audience: aziende del settore. **Prima di rispondere, voglio che tu mi faccia delle domande per ottenere informazioni che possano aiutarti a generare una risposta migliore. Procedi una domanda alla volta.**"

### La Tecnica RE2 (Re-Reading)

La tecnica **RE2** si ispira al modo in cui gli esseri umani rileggono un problema per comprenderlo meglio. Ripetendo la domanda nel prompt, l'AI si focalizza meglio sul contenuto. Si combina efficacemente con il Chain of Thought.

Struttura:
> "{domanda}. Rileggi la domanda: {domanda}. [Istruzione sul formato]. Ragioniamo passo dopo passo."

### La Tecnica Plan-and-Solve (PS)

Tecnica che migliora il ragionamento dell'AI in due fasi: prima crea un piano che suddivide il compito in sotto-operazioni, poi le esegue in ordine. La versione avanzata (PS+) aggiunge istruzioni per estrarre le variabili rilevanti con cura.

> "Domanda: [problema]. Risolviamo in questi passaggi: 1) Capiamo il problema 2) Facciamo un piano 3) Seguiamo il piano 4) Controlliamo la soluzione."

### Come Scrivere Prompt per Immagini e Video AI

Per generare immagini efficaci con strumenti come DALL-E, Midjourney o Stable Diffusion, la parola d'ordine è **essere descrittivi**. La struttura base di un prompt visuale include:

- **Soggetto**: cosa rappresentare (descrizione dettagliata)
- **Stile**: fotorealistico, illustrazione, acquerello, 3D render, flat design
- **Illuminazione**: luce naturale, golden hour, studio, drammatica
- **Composizione**: primo piano, panoramica, angolazione
- **Mood**: l'atmosfera da trasmettere
- **Prompt negativi**: elementi da escludere dall'immagine

Per i video AI, si aggiungono: movimenti di camera, transizioni, durata e ritmo.

### Tecniche di Prompting Avanzate: Riepilogo

- **Chain-of-Thought**: "Ragiona passo dopo passo"
- **Tree-of-Thought**: "Esplora 3 approcci diversi e scegli il migliore"
- **Meta Prompt**: "Scrivi il prompt migliore per ottenere X"
- **Self-Ask**: "Prima di rispondere, poniti le domande necessarie per formulare una risposta completa"
- **Prompt ricorsivo**: genera → rivedi → migliora
- **Role-playing**: "Simula un dialogo tra un CEO e un investitore"
- **Socratic prompting**: "Invece di darmi la risposta, guidami con domande"
- **Constraint-based**: "Rispondi usando solo analogie con lo sport"
- **RTF**: Role + Task + Format
- **RISEN**: Role + Instructions + Steps + End Goal + Narrowing
- **RODES**: Role + Objective + Details + Examples + Sense Check
- **ABA**: Ask Before Answer — chiedi domande prima di procedere
- **RE2**: Re-Reading — ripeti la domanda per maggiore focus
- **Plan-and-Solve**: pianifica, esegui, verifica

### Quando Non Sai da Dove Iniziare

Un approccio efficace è chiedere all'AI stessa di suggerire come può essere utile:

> "Sono un [ruolo] che lavora in [settore]. I miei obiettivi principali sono [obiettivi]. In quali aree del mio lavoro l'AI generativa potrebbe essermi più utile? Per ciascuna area, fornisci un prompt pronto all'uso che potrei copiare e incollare."

Questa tecnica si chiama **"AI come consulente"** e permette di scoprire applicazioni che non avremmo considerato autonomamente.
    `,
    quiz: [
      {
        id: "q4-1",
        question: "Cos'è un 'meta prompt'?",
        options: [
          "Un prompt molto lungo e dettagliato",
          "Un prompt che chiede all'AI di migliorare un altro prompt",
          "Il primo prompt di una conversazione",
          "Un prompt scritto in linguaggio di programmazione",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q4-2",
        question:
          "Quali sono le due sezioni delle Istruzioni Personalizzate di ChatGPT?",
        options: [
          "Input e Output",
          "Informazioni su di noi e Preferenze di risposta",
          "Domanda e Risposta",
          "Titolo e Corpo del testo",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q4-3",
        question: "Cos'è il 'prompt di contesto' proposto da Fulvio Julita?",
        options: [
          "Un prompt che descrive il contesto tecnologico dell'AI",
          "Un documento strutturato con le informazioni del brand da fornire all'AI come base per il lavoro",
          "Un tipo di prompt che funziona solo con ChatGPT",
          "Un prompt utilizzato esclusivamente per la SEO",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q4-4",
        question:
          "Qual è una strategia efficace per ridurre la verbosità nelle risposte dell'AI?",
        options: [
          "Usare prompt più corti possibile",
          "Specificare 'rispondi in non più di 100 parole' o richiedere elenchi puntati",
          "Cambiare modello AI a ogni domanda",
          "Non fornire contesto per non confondere il modello",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q4-5",
        question:
          "Come si può costruire un GPT personalizzato su ChatGPT?",
        options: [
          "Solo tramite programmazione avanzata in Python",
          "Definendo istruzioni, caricando documenti e specificando il comportamento desiderato nella sezione Configura",
          "Inviando una richiesta via email a OpenAI",
          "Non è possibile, i GPT sono creati solo da OpenAI",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q4-6",
        question:
          "In cosa consiste la tecnica del Chain-of-Thought (CoT) prompting?",
        options: [
          "Collegare più chatbot in sequenza per una risposta migliore",
          "Invitare l'AI a ragionare passo dopo passo prima di arrivare alla conclusione",
          "Scrivere prompt molto lunghi con molte catene di parole chiave",
          "Usare catene di prompt automatizzati senza intervento umano",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q4-7",
        question:
          "Cos'è il Tree-of-Thought (ToT) prompting?",
        options: [
          "Una tecnica di generazione di immagini",
          "Una tecnica che chiede all'AI di esplorare più percorsi di ragionamento in parallelo",
          "Un metodo per organizzare le conversazioni in cartelle",
          "Un modo per strutturare i GPT personalizzati",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q4-8",
        question:
          "In cosa consiste il 'prompt ricorsivo'?",
        options: [
          "Un prompt che si ripete automaticamente ogni giorno",
          "Una tecnica in cui l'AI genera content, lo rivede, identifica i punti deboli e lo migliora iterativamente",
          "Un prompt che funziona solo con modelli di grandi dimensioni",
          "Un prompt che richiama automaticamente altri GPT",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q4-9",
        question:
          "Di quanto può migliorare la qualità delle risposte aggiungendo 'Ragiona passo dopo passo'?",
        options: [
          "Dell'1-5%",
          "Del 5-10%",
          "Del 20-40%",
          "Del 90-100%",
        ],
        correctIndex: 2,
        credits: 5,
      },
      {
        id: "q4-10",
        question:
          "Cos'è il 'Self-Ask' prompting?",
        options: [
          "Chiedere all'AI di porre domande a se stessa prima di rispondere, per formulare una risposta più completa",
          "Chiedere all'utente di rispondere da solo",
          "Un sistema di auto-valutazione dei prompt",
          "Una tecnica di debugging per il codice generato",
        ],
        correctIndex: 0,
        credits: 5,
      },
      {
        id: "q4-11",
        question:
          "Quali sono i tre elementi del framework RTF?",
        options: [
          "Research, Testing, Feedback",
          "Role, Task, Format",
          "Result, Template, Function",
          "Review, Topic, Focus",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q4-12",
        question:
          "Nel framework RISEN, cosa rappresenta la 'N' (Narrowing)?",
        options: [
          "Il numero di parole della risposta",
          "La necessità di usare un modello specifico",
          "Il focus e le restrizioni specifiche per restringere il campo",
          "La rete neurale da utilizzare",
        ],
        correctIndex: 2,
        credits: 5,
      },
      {
        id: "q4-13",
        question:
          "Cosa prevede il Sense Check nel framework RODES?",
        options: [
          "Verificare la grammatica del prompt",
          "Controllare che l'AI abbia compreso tutti i dettagli prima di procedere",
          "Analizzare il sentiment delle risposte",
          "Confrontare l'output con i risultati dei competitor",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q4-14",
        question:
          "Come funziona la tecnica ABA (Ask Before Answer)?",
        options: [
          "L'AI risponde automaticamente senza interazione",
          "Si chiede all'AI di fare domande all'utente prima di generare la risposta, per arricchire il contesto",
          "Si usa solo per analisi di dati numerici",
          "Si ripete la stessa domanda tre volte per ottenere coerenza",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q4-15",
        question:
          "In cosa consiste la tecnica RE2 (Re-Reading)?",
        options: [
          "Rileggere manualmente l'output generato dall'AI",
          "Ripetere la domanda due volte nel prompt per aiutare l'AI a focalizzarsi meglio sul contenuto",
          "Generare due versioni della risposta e confrontarle",
          "Leggere due articoli diversi sullo stesso tema",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q4-16",
        question:
          "Quali sono i due 'mattoni base' imprescindibili di ogni prompt secondo l'approccio a blocchi?",
        options: [
          "Titolo e Conclusione",
          "Istruzioni e Contesto",
          "Domanda e Risposta",
          "Soggetto e Predicato",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q4-17",
        question:
          "Cos'è il prompt chaining?",
        options: [
          "Usare lo stesso prompt su modelli diversi",
          "Collegare più prompt in sequenza, dove l'output di uno diventa l'input del successivo",
          "Creare catene di parole chiave nel prompt",
          "Condividere i prompt con altri utenti",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q4-18",
        question:
          "Qual è la differenza tra system prompt e user prompt?",
        options: [
          "Il system prompt è più corto",
          "Il system prompt definisce il comportamento globale del modello e resta attivo per tutta la conversazione, mentre l'user prompt è la richiesta specifica",
          "Il system prompt funziona solo con GPT-4",
          "Non c'è differenza, sono sinonimi",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q4-19",
        question:
          "Cosa deve includere un prompt efficace per un AI Agent?",
        options: [
          "Solo l'obiettivo finale",
          "Obiettivo, strumenti disponibili, vincoli e criteri di successo",
          "Solo il nome dell'agente che si vuole usare",
          "Una descrizione generica del problema",
        ],
        correctIndex: 1,
        credits: 5,
      },
    ],
    maxCredits: 95,
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULO 5 — Scrivere e Creare Contenuti con l'AI
  // ═══════════════════════════════════════════════════════════════
  {
    id: "modulo-5",
    title: "Scrivere e Creare Contenuti con l'AI",
    description:
      "Dalla scrittura di articoli al copywriting, dalle email alla pianificazione editoriale: casi d'uso pratici per la creazione di contenuti.",
    icon: "/icons/pen.png",
    agenda: [
      "La Formula Base per la Scrittura",
      "Articoli di Blog e SEO",
      "Tecniche di Copywriting",
      "Trovare Ispirazione e Idee",
      "Il Calendario Editoriale",
      "Riformulazione e Adattamento",
      "Email e Comunicazione",
      "Storytelling con l'AI",
      "Social Media Specifici",
      "Script per Video e YouTube",
      "Contenuti per Podcast",
      "Presentazioni e Slide",
      "Documentazione Tecnica",
    ],
    content: `
## L'AI come Alleato nella Creazione di Contenuti

La generazione e manipolazione di contenuti testuali è uno dei casi d'uso più diffusi e immediati dell'AI generativa. Possiamo generare praticamente qualsiasi tipologia di testo, modulando sapientemente gli elementi del prompt. Ma l'AI non si limita a scrivere testi: può aiutarci a ideare, strutturare, ottimizzare e adattare contenuti per qualsiasi canale e pubblico.

### La Formula Base per la Scrittura

Quando creiamo contenuti testuali, questi "blocchi" assumono importanza centrale:

- **Istruzioni**: tipo di contenuto (articolo, post, newsletter, script, white paper, comunicato stampa…)
- **Tono**: autorevole, empatico, professionale, conversazionale, ironico, ispirazionale…
- **Stile**: ricco di dati, narrativo, conciso, esplicativo, minimalista, giornalistico…
- **Audience**: a chi ci rivolgiamo (professionisti, studenti, decision maker, consumatori…)
- **Lunghezza**: numero di parole o paragrafi desiderato
- **Struttura**: con o senza sottotitoli, elenchi puntati, citazioni, call-to-action

Esempio di prompt per la scrittura:
> "Scrivi un articolo di 1000 parole sull'adozione dell'AI nelle PMI italiane. Tono: professionale ma accessibile. Audience: imprenditori di PMI con scarsa conoscenza tecnica. Struttura: introduzione coinvolgente, 4 sezioni con sottotitoli, ogni sezione con un caso d'uso concreto italiano, conclusione con 3 azioni immediate da intraprendere."

### Articoli di Blog e SEO

Per la scrittura di articoli ottimizzati per i motori di ricerca, un approccio completo prevede:

**Fase 1 — Ricerca e pianificazione**:
- "Genera 10 idee di articoli su [argomento] che rispondano a domande reali che gli utenti cercano su Google"
- "Per il tema [X], identifica le 5 parole chiave principali e 10 long-tail keywords correlate"
- "Analizza il search intent per la keyword [X]: l'utente cerca informazioni, vuole comprare, o vuole fare qualcosa?"

**Fase 2 — Struttura**:
- "Crea un outline dettagliato per un articolo SEO sulla keyword [X]. Includi: H1, H2, H3, FAQ e meta description"

**Fase 3 — Scrittura progressiva**:
Procedi gradualmente — paragrafo per paragrafo — per mantenere il controllo. Non generare l'intero articolo con un unico prompt; il risultato sarà generico e poco profondo.
- "Scrivi l'introduzione dell'articolo. Deve catturare l'attenzione con un dato sorprendente e presentare il problema."
- "Scrivi la sezione 2 dell'outline. Approfondisci con un esempio pratico e una citazione di esperti."

**Fase 4 — Ottimizzazione**:
- "Rivedi l'articolo e aggiungi le keywords [X, Y, Z] in modo naturale. Suggerisci una meta description di max 155 caratteri e 5 possibili permalink."

La tecnica **ABA** (Ask Before Answering) prevede di chiedere all'AI di porre domande preliminari prima di scrivere: "Prima di scrivere, fammi 5 domande per capire meglio cosa devo trattare." Questo arricchisce enormemente il contesto.

### Tecniche di Copywriting

L'AI eccelle nell'applicare le tecniche di copywriting più efficaci. Ecco le principali con esempi:

**AIDA** (Attenzione, Interesse, Desiderio, Azione):
- **A**ttenzione: titolo/hook che cattura → "Il 73% delle PMI che adottano l'AI aumenta il fatturato entro 6 mesi"
- **I**nteresse: informazioni che sostengono → "Ecco come tre aziende italiane lo hanno fatto…"
- **D**esiderio: benefici emotivi e razionali → "Immagina di risparmiare 20 ore a settimana sulle attività ripetitive…"
- **A**zione: call-to-action chiara → "Prenota la tua consulenza gratuita oggi"

Prompt: "Usa il framework AIDA per scrivere una landing page per [prodotto]. Target: [audience]. Beneficio principale: [beneficio]."

**PAS** (Problema, Amplificazione, Soluzione):
- **P**roblema: identifica il pain point → "Passi ore a scrivere email che nessuno legge?"
- **A**mplificazione: amplifica le conseguenze → "Ogni email ignorata è un'opportunità persa. In un anno sono centinaia di contatti sprecati."
- **S**oluzione: presenta la soluzione → "Con il nostro template system, le tue email ottengono il 40% in più di aperture."

**BAB** (Before-After-Bridge):
- **B**efore: situazione attuale → "Ogni settimana passi 10 ore a creare contenuti per i social"
- **A**fter: benefici futuri → "Con il nostro approccio AI-assisted, ne bastano 2"
- **B**ridge: come il prodotto colma il divario → "Ecco il metodo in 3 step che insegniamo ai nostri clienti"

**FAB** (Feature-Advantage-Benefit):
- **F**eature: "Il corso include 50 prompt pronti all'uso"
- **A**dvantage: "Non dovrai mai partire da zero"
- **B**enefit: "Risparmi ore di lavoro e produci contenuti professionali fin dal primo giorno"

### Trovare Ispirazione e Idee

Strategie collaudate per generare idee con l'AI:

**Il Brainstorming Strutturato**:
> "Genera 20 idee di contenuto per [brand/settore]. Per ciascuna, indica: titolo, formato (articolo, video, infografica, podcast), canale (blog, LinkedIn, Instagram, newsletter), e livello di complessità (facile, medio, avanzato)."

**I Sei Cappelli per Pensare di De Bono**:
Una tecnica creativa che propone sei prospettive diverse per analizzare qualsiasi argomento:
- Cappello **Bianco**: fatti e dati oggettivi
- Cappello **Rosso**: emozioni e intuizioni
- Cappello **Nero**: rischi e criticità
- Cappello **Giallo**: opportunità e benefici
- Cappello **Verde**: idee creative e alternative
- Cappello **Blu**: visione d'insieme e strategia

Prompt: "Analizza il lancio del nostro nuovo prodotto [X] usando la tecnica dei Sei Cappelli di De Bono. Per ciascun cappello, fornisci 3 osservazioni rilevanti."

**Analisi SWOT con AI**:
> "Conduci un'analisi SWOT completa per [azienda/progetto]. Strengths: punti di forza interni. Weaknesses: debolezze interne. Opportunities: opportunità esterne. Threats: minacce esterne. Per ciascun quadrante, fornisci almeno 5 punti e suggerisci 2 azioni concrete."

**Framework SCAMPER**:
Una tecnica per innovare partendo da qualcosa di esistente:
- **S**ubstitute: cosa possiamo sostituire?
- **C**ombine: cosa possiamo combinare?
- **A**dapt: cosa possiamo adattare?
- **M**odify: cosa possiamo modificare o ingrandire?
- **P**ut to other use: come possiamo riutilizzarlo?
- **E**liminate: cosa possiamo eliminare?
- **R**everse: cosa possiamo invertire o riorganizzare?

**Sentiment Analysis**:
> "Analizza queste 20 recensioni dei nostri clienti e identifica: 3 temi positivi ricorrenti, 3 pain point condivisi, e 5 idee di contenuto basate su queste evidenze."

### Il Calendario Editoriale

L'AI può pianificare un intero calendario editoriale partendo dalle informazioni sul brand:

> "Crea un calendario editoriale per 4 settimane per il profilo Instagram di [brand]. Il brand vende [prodotto/servizio]. Target: [audience]. Obiettivi: [awareness/engagement/conversioni]. Per ogni giorno prevedi: tipo di post (reel, carosello, singola immagine, stories), argomento, copy del post (max 200 caratteri), 5 hashtag rilevanti, orario migliore di pubblicazione. Alterna i filoni tematici: educativo, behind the scenes, testimonianze, prodotto, intrattenimento."

### Riformulazione e Adattamento

Un contenuto può essere **moltiplicato** adattandolo a diversi canali e formati:

- Articolo di blog → 5 post LinkedIn, 3 caroselli Instagram, 1 thread, 1 newsletter
- Webinar registrato → articolo di sintesi, 10 clip social, FAQ, white paper
- Case study → comunicato stampa, slide di presentazione, email per prospect
- Report interno → executive summary, infografica, post per dipendenti

Prompt di adattamento:
> "Trasforma questo articolo di 1500 parole in: (1) un post LinkedIn di 300 parole con hook nella prima riga, (2) una caption Instagram di 150 parole divisa in paragrafi brevi con emoji, (3) un tweet di 280 caratteri con hashtag."

### Email e Comunicazione

L'AI può supportare sia la **creazione da zero** di email sia il **miglioramento** di bozze esistenti:

**Email di vendita**:
> "Scrivi un'email di vendita per [prodotto] destinata a [ruolo] di aziende [settore]. L'oggetto deve avere un tasso di apertura elevato. Il corpo deve seguire il framework PAS. Includi social proof e CTA chiara. Max 200 parole."

**Email nurturing sequence**:
> "Crea una sequenza di 5 email per nutrire un lead che ha scaricato il nostro ebook su [argomento]. Email 1: benvenuto e valore aggiunto. Email 2: caso d'uso pratico. Email 3: testimonianza cliente. Email 4: obiezione comune risolta. Email 5: offerta con urgenza. Per ogni email specifica: oggetto, corpo (150 parole), CTA, tempistica di invio."

**Miglioramento di bozze**:
> "Riscrivi questa email rendendola più concisa, professionale e con una call-to-action più efficace. Mantieni lo stesso tono ma migliora la struttura: [incolla la bozza]"

### Storytelling con l'AI

Lo storytelling è una delle applicazioni più potenti dell'AI nella comunicazione:

**La struttura in tre atti**:
- **Setup**: presenta il contesto e il protagonista
- **Confronto**: il problema, la sfida, il conflitto
- **Risoluzione**: la soluzione, la trasformazione, il risultato

Prompt:
> "Racconta la storia di un nostro cliente tipo usando la struttura in tre atti. Il protagonista è [descrizione]. Il problema era [pain point]. La soluzione è stata [prodotto/servizio]. Il risultato è [beneficio quantificabile]. Tono: empatico e ispirazionale. 400 parole."

### Social Media Specifici

Ogni piattaforma ha le sue regole. L'AI può adattare il contenuto:

**LinkedIn**: tono professionale, hook nella prima riga, spazi tra i paragrafi, no emoji eccessivi, focus su insight e dati
**Instagram**: caption breve e visiva, emoji moderate, hashtag strategici, CTA in bio, formato carosello per contenuti educativi
**Newsletter**: oggetto irresistibile, anteprima coinvolgente, valore immediato nei primi paragrafi, link di approfondimento, PS finale
**Blog**: SEO ottimizzato, H2/H3 strutturati, link interni ed esterni, CTA nel contenuto

### Script per Video e YouTube

Creare script video efficaci richiede una struttura specifica ottimizzata per la retention:

**Struttura dello script YouTube**:
1. **Hook (0-30 sec)**: cattura l'attenzione immediata con una domanda, statistica shock o promessa di valore
2. **Intro (30 sec - 1 min)**: presenta il problema e anticipa la soluzione
3. **Corpo (variabile)**: contenuto principale diviso in sezioni chiare
4. **CTA intermedia**: invito a iscriversi o lasciare like
5. **Conclusione**: recap dei punti chiave
6. **CTA finale**: cosa fare dopo (video correlato, link in descrizione)

**Prompt per script YouTube**:
> "Crea uno script per un video YouTube di 10 minuti su [ARGOMENTO]. Target: [AUDIENCE]. Struttura: hook di 30 secondi che catturi l'attenzione, introduzione del problema, 5 sezioni con sottotitoli visuali, CTA intermedia al minuto 5, conclusione con recap e CTA finale. Includi indicazioni per B-roll e grafiche. Tono: energico ma professionale."

**Script per Reel/Shorts (< 60 sec)**:
> "Crea uno script per un Reel di 45 secondi su [ARGOMENTO]. Struttura: hook nei primi 3 secondi, 3 punti chiave rapidi, chiusura con CTA. Linguaggio colloquiale e diretto. Indica i tagli di scena."

### Contenuti per Podcast

L'AI può supportare ogni fase della produzione podcast:

**Pianificazione episodi**:
> "Genera 10 idee di episodi podcast per [NOME PODCAST] sul tema [TEMA]. Per ogni idea: titolo accattivante, 3 punti chiave da trattare, domande per eventuale ospite, durata stimata."

**Outline dell'episodio**:
> "Crea un outline dettagliato per un episodio podcast di 45 minuti su [ARGOMENTO]. Struttura: introduzione (2 min), segmento 1 (15 min), segmento 2 (15 min), Q&A/riflessioni (10 min), chiusura (3 min). Includi domande di transizione e punti di discussione."

**Domande per interviste**:
> "Genera 15 domande per un'intervista podcast con [TIPO DI OSPITE] che lavora nel settore [SETTORE]. Mix di: 5 domande sul percorso personale, 5 domande tecniche/di settore, 5 domande provocatorie/fuori dagli schemi. Ordina dalla più accessibile alla più profonda."

**Show notes e descrizioni**:
> "Basandoti su questa trascrizione/outline, crea: titolo SEO-friendly, descrizione di 200 parole, 5 bullet point con timestamp, 3 citazioni memorabili, keywords per la ricerca."

### Presentazioni e Slide

L'AI eccelle nella strutturazione di presentazioni:

**Prompt per presentazione completa**:
> "Crea una presentazione di 15 slide su [ARGOMENTO] per [AUDIENCE]. Ogni slide deve contenere: titolo, 3-4 bullet point (max 6 parole ciascuno), nota per lo speaker (cosa dire), suggerimento visivo. Includi: slide titolo, agenda, 10 slide di contenuto, slide Q&A, slide finale con contatti."

**Struttura delle slide per impatto**:
- **Slide 1**: Titolo + sottotitolo evocativo
- **Slide 2**: Il problema (pain point dell'audience)
- **Slide 3**: Dati che supportano il problema
- **Slide 4-10**: La soluzione, step by step
- **Slide 11-12**: Risultati/case study
- **Slide 13**: Riepilogo in 3 punti
- **Slide 14**: CTA chiara
- **Slide 15**: Contatti e Q&A

**Prompt per pitch deck**:
> "Crea un pitch deck di 10 slide per [STARTUP/PROGETTO]. Include: problema, soluzione, mercato (TAM/SAM/SOM), modello di business, traction, team, roadmap, richiesta di investimento, contatti. Ogni slide: titolo, 3 bullet point, dato chiave."

### Documentazione Tecnica

L'AI può accelerare la creazione di documentazione:

**Documentazione API**:
> "Genera la documentazione per questa API: [DESCRIZIONE]. Includi: descrizione endpoint, parametri (required/optional), esempi di request/response, codici di errore, limiti di rate, esempi in curl e Python."

**User Guide**:
> "Crea una guida utente per [PRODOTTO/FEATURE]. Struttura: introduzione, prerequisiti, guida passo-passo con screenshot placeholder, troubleshooting (5 problemi comuni), FAQ (10 domande), glossario."

**README per progetti open source**:
> "Genera un README.md professionale per [PROGETTO]. Includi: badge, descrizione one-liner, features, demo GIF placeholder, installazione (npm/pip/etc), quick start, configurazione, contributing guidelines, license, contatti."
    `,
    quiz: [
      {
        id: "q5-1",
        question:
          "Nella tecnica di copywriting PAS, cosa rappresentano le tre lettere?",
        options: [
          "Persona, Azione, Soluzione",
          "Problema, Amplificazione, Soluzione",
          "Pubblico, Analisi, Strategia",
          "Prodotto, Audience, Social",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q5-2",
        question:
          "Cos'è la tecnica ABA (Ask Before Answering)?",
        options: [
          "Chiedere all'AI di scrivere tre versioni diverse",
          "Chiedere all'AI di porre domande preliminari prima di scrivere, per arricchire il contesto",
          "Alternare domande aperte e chiuse nel prompt",
          "Analizzare automaticamente il testo prima della pubblicazione",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q5-3",
        question:
          "Quale approccio è consigliato per scrivere articoli con l'AI?",
        options: [
          "Generare l'intero articolo con un solo prompt",
          "Procedere gradualmente, paragrafo per paragrafo, per mantenere il controllo",
          "Lasciare fare completamente all'AI senza intervenire",
          "Scrivere solo il titolo e lasciare all'AI il resto",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q5-4",
        question:
          "Cosa sono i 'Sei Cappelli per Pensare' nel contesto della creazione di contenuti?",
        options: [
          "Sei modelli AI diversi da usare in sequenza",
          "Un frame creativo di De Bono che propone sei prospettive diverse per generare idee",
          "Sei regole grammaticali per la scrittura AI",
          "Sei tipi di prompt standardizzati",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q5-5",
        question:
          "Nella formula AIDA, cosa rappresenta la 'D'?",
        options: [
          "Dati",
          "Design",
          "Desiderio",
          "Diffusione",
        ],
        correctIndex: 2,
        credits: 5,
      },
      {
        id: "q5-6",
        question:
          "Cos'è il framework SCAMPER?",
        options: [
          "Un metodo per valutare la qualità dei contenuti AI",
          "Una tecnica per innovare partendo da qualcosa di esistente tramite 7 azioni: Substitute, Combine, Adapt, Modify, Put to use, Eliminate, Reverse",
          "Un acronimo per i 7 tipi di copywriting più efficaci",
          "Un software per la pianificazione editoriale",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q5-7",
        question:
          "Come si può 'moltiplicare' un contenuto usando l'AI?",
        options: [
          "Pubblicandolo su più piattaforme con lo stesso formato",
          "Adattandolo a diversi canali e formati: da un articolo a post LinkedIn, caroselli Instagram, newsletter, tweet",
          "Generandolo in più lingue contemporaneamente",
          "Creando più versioni identiche per A/B testing",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q5-8",
        question:
          "Nella tecnica BAB (Before-After-Bridge), cosa rappresenta il 'Bridge'?",
        options: [
          "La piattaforma social su cui pubblicare",
          "Come il prodotto o servizio colma il divario tra la situazione attuale e i benefici futuri",
          "Il prezzo del prodotto",
          "Il ponte tra due lingue diverse nella traduzione",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q5-9",
        question:
          "Perché è meglio scrivere un articolo 'paragrafo per paragrafo' con l'AI piuttosto che tutto insieme?",
        options: [
          "Perché l'AI non riesce a scrivere testi lunghi",
          "Perché si mantiene il controllo sulla qualità, si evita genericità e si può raffinare ogni sezione",
          "Perché costa meno in termini di token consumati",
          "Perché i motori di ricerca preferiscono articoli scritti in questo modo",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q5-10",
        question:
          "Come dovrebbe essere strutturata una sequenza di email nurturing?",
        options: [
          "Tutte le email identiche con lo stesso messaggio ripetuto",
          "Una progressione dal valore gratuito alla testimonianza, dall'obiezione risolta all'offerta con urgenza",
          "Solo email promozionali con sconti crescenti",
          "Una singola email molto lunga con tutti i contenuti",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q5-11",
        question:
          "Qual è la struttura consigliata per uno script video YouTube?",
        options: [
          "Iniziare con una lunga presentazione del canale",
          "Hook nei primi 30 secondi, intro del problema, corpo in sezioni, CTA intermedia, conclusione con recap e CTA finale",
          "Solo contenuto senza introduzione né conclusione",
          "Leggere direttamente un articolo di blog",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q5-12",
        question:
          "Cosa sono le 'show notes' nel contesto di un podcast?",
        options: [
          "Le note personali del conduttore",
          "Descrizione dell'episodio con titolo SEO, bullet point con timestamp, citazioni e keywords",
          "La scaletta dei prossimi episodi",
          "I commenti degli ascoltatori",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q5-13",
        question:
          "Quante parole/bullet point dovrebbe avere ogni slide di una presentazione efficace?",
        options: [
          "Almeno 50 parole per slide",
          "3-4 bullet point con massimo 6 parole ciascuno",
          "Il più testo possibile per non dimenticare nulla",
          "Nessun testo, solo immagini",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q5-14",
        question:
          "Cosa dovrebbe includere un pitch deck efficace?",
        options: [
          "Solo la descrizione del prodotto",
          "Problema, soluzione, mercato, modello di business, traction, team, roadmap e richiesta di investimento",
          "Solo le proiezioni finanziarie",
          "La biografia completa del founder",
        ],
        correctIndex: 1,
        credits: 5,
      },
    ],
    maxCredits: 70,
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULO 6 — Ricerca, Verifica e Responsabilità
  // ═══════════════════════════════════════════════════════════════
  {
    id: "modulo-6",
    title: "Ricerca, Verifica e Responsabilità",
    description:
      "Dalle allucinazioni al fact-checking, dagli strumenti di ricerca alla responsabilità nella produzione di contenuti con l'AI.",
    icon: "/icons/magnifier.png",
    agenda: [
      "Il Problema delle Allucinazioni: Casi Reali",
      "Perché l'AI Allucina",
      "Strumenti per la Ricerca",
      "Differenze tra Ricerca Tradizionale e Ricerca con AI",
      "La Strategia di Verifica CRAAP",
      "La Strategia di Verifica in Tre Passi",
      "Categorie di Fonti Affidabili",
      "Responsabilità e Uso Etico",
      "Il Paradigma della Copia e la Creatività Computazionale",
      "L'EU AI Act: Regolamentazione Europea",
      "Deepfakes: Riconoscimento e Rischi",
      "AI Governance Aziendale",
      "Impatto Ambientale e Sociale dell'AI",
      "Il Fenomeno dell'Automazione Bias",
      "Costruire un Workflow di Verifica",
      "Il Futuro: Prepararsi al Cambiamento",
    ],
    content: `
## Verificare per Comunicare con Credibilità

La capacità di produrre contenuti con l'AI comporta una grande responsabilità: verificare la qualità e la veridicità di ciò che viene generato. In un'epoca in cui chiunque può generare testi convincenti in pochi secondi, la verifica delle informazioni diventa la competenza più importante.

### Il Problema delle Allucinazioni: Casi Reali

Le allucinazioni dell'AI possono avere conseguenze reali e gravi. Ecco alcuni casi documentati che dimostrano l'importanza della verifica:

**Caso Schwartz (2023, USA)**: L'avvocato Steven Schwartz di New York fu multato di 5.000 dollari per aver portato in tribunale precedenti legali inventati da ChatGPT. I casi citati avevano nomi di giudici, numeri di registro e date completamente falsi, ma formattati in modo impeccabile. Il tribunale definì la vicenda "senza precedenti".

**Caso Google Bard (2023)**: Durante la prima demo pubblica di Google Bard, il chatbot affermò che il James Webb Space Telescope aveva scattato "le prime foto di un esopianeta al di fuori del nostro sistema solare". L'informazione era falsa: le prime foto di esopianeti risalgono al 2004. L'errore costò a Google un calo del 7% del valore azionario in un solo giorno (100 miliardi di dollari di capitalizzazione persa).

**Diffamazione AI (2023, Australia)**: Un sindaco australiano minacciò azioni legali contro OpenAI dopo che ChatGPT aveva falsamente affermato che era stato condannato per corruzione come parte di uno scandalo in una banca nazionale. L'informazione era completamente inventata.

Come sottolinea Fulvio Julita: "Accettare ciò che l'AI restituisce, riponendovi fiducia incondizionata, porta a produrre contenuti deboli. Dobbiamo sviluppare un'attitudine critica."

### Perché l'AI "Allucina"

Per prevenire le allucinazioni, è utile capire perché si verificano:

1. **Lacune nei dati di addestramento**: il modello non ha informazioni su un argomento ma tenta comunque di rispondere, "riempiendo i vuoti" con testo statisticamente plausibile

2. **Pressione a rispondere**: i modelli sono addestrati a essere utili e dare risposte complete. Raramente dicono "non lo so" (anche se i modelli più recenti migliorano in questo)

3. **Pattern matching probabilistico**: i modelli non "verificano" le informazioni contro un database di fatti. Generano testo basato su probabilità statistiche

4. **Conflazione di informazioni**: possono combinare fatti reali da contesti diversi, creando affermazioni false ma superficialmente credibili

5. **Informazioni obsolete**: il training ha una data di cutoff; informazioni più recenti non sono disponibili (a meno di navigazione web)

Segnali di una possibile allucinazione:
- Statistiche molto precise e specifiche senza fonte citata
- Citazioni con autore, titolo e anno specifici (spesso inventati)
- Affermazioni troppo "perfette" o che supportano esattamente la tua tesi
- Dettagli molto granulari su eventi specifici

### Strumenti per la Ricerca

**Perplexity** — Motore di ricerca conversazionale che trova, analizza e sintetizza dati dal web in tempo reale. A differenza dei motori tradizionali, privilegia l'interpretazione semantica delle query e fornisce risposte contestualizzate con le fonti citate e linkate.

Punti di forza:
- Fornisce sempre le fonti con link cliccabili
- Risponde in modo conversazionale ma basato su dati reali
- Modalità "Pro" per ricerche più approfondite con follow-up automatici
- Supporta domande di follow-up per approfondire
- Utile per fact-checking rapido di affermazioni generate da altri chatbot

**Consensus** — Motore di ricerca specializzato in documenti scientifici peer-reviewed, con un database di oltre 200 milioni di articoli accademici. Include un "Consensus meter" che mostra il grado di accordo della letteratura scientifica su un dato argomento. Particolarmente utile per:
- Verificare affermazioni scientifiche
- Trovare studi a supporto di una tesi
- Capire se c'è consenso scientifico su un argomento
- Citare fonti accademiche nei propri contenuti

**Google Scholar** — Database di letteratura accademica gratuito. Utile per verificare se studi citati dall'AI esistono effettivamente.

**Semantic Scholar** — Motore di ricerca accademico con AI che estrae claim chiave e collega paper correlati.

**AI Overview** — Le funzioni AI integrate in Google e Bing offrono sintesi intelligenti dei risultati di ricerca, con link alle fonti originali.

### Differenze tra Ricerca Tradizionale e Ricerca con AI

La ricerca tradizionale (Google classico) dipende fortemente dalle parole chiave usate e restituisce un elenco di link. L'utente deve poi aprire i link, leggere i contenuti e sintetizzare le informazioni.

La ricerca con AI:
- Interpreta semanticamente l'intento della domanda (non solo le parole chiave)
- Estrapola le informazioni rilevanti e le presenta in modo strutturato
- Sintetizza dati da più fonti in un'unica risposta coerente
- Suggerisce le fonti a margine per la verifica
- Permette domande di follow-up per approfondire

Quando usare quale approccio:
- **Ricerca tradizionale**: quando cerchi siti specifici, prodotti, servizi locali
- **Ricerca AI (Perplexity)**: quando cerchi risposte strutturate, confronti, sintesi di informazioni complesse
- **Ricerca accademica (Consensus)**: quando hai bisogno di evidenze scientifiche

### La Strategia di Verifica CRAAP

Il test **CRAAP** (Currency, Relevance, Authority, Accuracy, Purpose) è uno strumento consolidato per valutare la qualità delle fonti, applicabile anche ai contenuti generati dall'AI:

- **Currency (Attualità)**: quando è stata pubblicata l'informazione? È ancora attuale?
- **Relevance (Rilevanza)**: l'informazione è pertinente al mio argomento e al mio pubblico?
- **Authority (Autorevolezza)**: la fonte è autorevole? Chi l'ha prodotta? Quali sono le sue credenziali?
- **Accuracy (Accuratezza)**: l'informazione è supportata da evidenze? È verificabile?
- **Purpose (Scopo)**: perché esiste questa informazione? Informare, vendere, persuadere, intrattenere?

### La Strategia di Verifica in Tre Passi

Per ogni contenuto generato dall'AI:

**1. Ricerca incrociata (Cross-referencing)**
- Confronta le informazioni da almeno 3 fonti autorevoli e indipendenti
- Verifica date, nomi, statistiche e citazioni
- Se una statistica viene citata, cerca lo studio originale

**2. Verifica delle fonti (Source evaluation)**
- Controlla l'autorevolezza della fonte (chi l'ha prodotta? È un esperto?)
- Verifica l'attualità (quando è stata pubblicata?)
- Valuta potenziali bias (la fonte ha interessi diretti nell'argomento?)
- Distingui tra opinioni e fatti

**3. Revisione umana (Human review)**
- Rileggi criticamente il contenuto con occhio critico
- Verifica la coerenza logica dell'argomentazione
- Controlla che il tono e lo stile siano appropriati
- Fai rileggere a un collega o esperto di settore quando possibile

### Categorie di Fonti Affidabili

Per un contenuto credibile, privilegia:
- **Studi accademici** e articoli peer-reviewed (Nature, Science, PNAS…)
- **Rapporti governativi** e documenti ufficiali (ISTAT, Eurostat, OMS…)
- **Pubblicazioni di istituzioni** riconosciute (McKinsey, Deloitte, Gartner…)
- **Dati statistici** da istituti certificati (ISTAT, World Bank, UN Data…)
- **Testate giornalistiche** di qualità con fact-checking (Reuters, AP, ANSA…)
- **Organizzazioni di settore** e associazioni professionali

Fonti da trattare con cautela:
- Blog personali e articoli senza autore identificato
- Contenuti sponsorizzati mascherati da editoriali
- Wikipedia (utile come punto di partenza, non come fonte definitiva)
- Post sui social media, anche di figure pubbliche

### Responsabilità e Uso Etico

**Il principio della responsabilità**: L'output finale è **sempre responsabilità dell'autore/utente**, non dell'AI. Se pubblichi un contenuto con informazioni false generate dall'AI, la responsabilità legale e professionale è tua.

**Privacy e riservatezza**:
- Non condividere dati personali di clienti o dipendenti con chatbot
- Non caricare documenti confidenziali aziendali su servizi gratuiti (i dati potrebbero essere usati per addestrare i modelli)
- Per dati sensibili, usare modelli locali (Llama, Mistral su Ollama) o piani enterprise con garanzie contrattuali

**Trasparenza**:
- Dichiara l'uso dell'AI quando richiesto dal contesto (accademia, giornalismo, legale)
- Molte organizzazioni stanno implementando policy sull'uso dell'AI — informati sulle regole del tuo contesto
- In ambito accademico, l'uso non dichiarato di AI può costituire plagio

**Copyright e proprietà intellettuale**:
- I contenuti generati dall'AI non sono attualmente protetti da copyright in molte giurisdizioni (tra cui gli USA)
- Attenzione a non richiedere la generazione di contenuti che imitino lo stile di artisti o autori specifici
- Adobe Firefly è tra i pochi strumenti con garanzia di indennità per copyright

**Pensiero critico**:
- Non affidarsi passivamente: l'AI è un assistente, non un sostituto del giudizio
- Un uso "passivo" dell'AI può portare a comunicazione impersonale e omogenea
- L'AI amplifica le competenze di chi la usa — senza competenze di base, i risultati saranno mediocri
- Distingui sempre tra "l'AI ha detto" e "le evidenze mostrano"

### Il Paradigma della Copia e la Creatività Computazionale

Una delle accuse più comuni rivolte all'AI generativa è quella di **copiare**: i dataset di addestramento conterrebbero opere originali sottratte ai legittimi proprietari, e gli output sarebbero essenzialmente dei plagi. Ma la questione è più complessa di quanto appaia.

Come argomentano i ricercatori Gregory Chatonsky e Antonio Somaini, i modelli generativi **non contengono più le immagini originali**: ai contorni, alle colorature, alle intensità si sostituiscono probabilità vettorializzate in uno spazio matematico multidimensionale. Non si tratta di una copia, ma di una **generazione** a partire da uno spazio di possibilità.

Questa distinzione è cruciale: il prompting come mezzo estetico funziona come un **veicolo di esplorazione** dello spazio latente, non come un meccanismo di replica. Come scrivono Chatonsky e Somaini: "Non si cercherà di produrre l'immagine che si ha in testa, ma di esplorare lo spazio latente, poiché esso è uno spazio culturale divenuto spazio di possibilità."

La filosofa **Margaret A. Boden** ha proposto una tripartizione della creatività che aiuta a inquadrare la questione:
- **Creatività combinatoria**: nuove e improbabili combinazioni di idee note
- **Creatività esplorativa**: esplorazione inedita di spazi concettuali strutturati
- **Creatività trasformativa**: trasformazione radicale degli spazi concettuali

L'AI generativa opera principalmente ai livelli combinatorio ed esplorativo: ricombina elementi del dataset in configurazioni nuove e permette di esplorare regioni inedite dello spazio latente. La creatività umana non viene copiata, bensì **automatizzata**: si tratta di giungere alla riproduzione di processi collettivi che portano all'innovazione.

Tuttavia il dibattito legale resta aperto: il susseguirsi di cause contro OpenAI, Midjourney e Stability AI è stato sostenuto da un vasto scontento verso le pratiche di raccolta dei dati. La Writers Guild of America nel 2023 ha indetto uno sciopero per limitare l'uso dei modelli generativi nell'industria cinematografica, ottenendo garanzie che l'AI non possa sostituire il lavoro di sceneggiatura.

### L'EU AI Act: Regolamentazione Europea

L'**EU AI Act** è la prima legislazione completa sull'intelligenza artificiale al mondo, approvata dal Parlamento Europeo nel marzo 2024. Entrerà in vigore progressivamente tra il 2024 e il 2027.

**Approccio basato sul rischio**:
La normativa classifica i sistemi AI in quattro categorie di rischio:

1. **Rischio inaccettabile** (vietati):
   - Sistemi di social scoring governativo
   - Manipolazione subliminale del comportamento
   - Sfruttamento di vulnerabilità (età, disabilità)
   - Riconoscimento facciale in tempo reale in spazi pubblici (con eccezioni)

2. **Rischio alto** (requisiti stringenti):
   - Sistemi usati in ambito occupazionale (recruiting, valutazione)
   - Accesso a servizi essenziali (credito, assicurazioni)
   - Sistemi educativi e di formazione
   - Infrastrutture critiche
   - Devono: documentare i dati di training, garantire supervisione umana, essere trasparenti

3. **Rischio limitato** (obblighi di trasparenza):
   - Chatbot e assistenti virtuali
   - Sistemi che generano contenuti (testo, immagini, audio, video)
   - **Obbligo di dichiarare che il contenuto è generato da AI**

4. **Rischio minimo** (nessun obbligo specifico):
   - Filtri spam, videogiochi, sistemi di raccomandazione

**Obblighi per i modelli foundation (GPAI)**:
- Documentazione tecnica dettagliata
- Policy sul copyright e trasparenza sui dati di training
- Per modelli ad alto rischio: valutazioni di sicurezza, reporting incidenti

**Sanzioni**:
- Fino al 7% del fatturato globale per violazioni gravi
- Fino al 3% per altre violazioni

**Implicazioni pratiche**:
- Se usi chatbot per assistenza clienti: devi dichiarare che è un'AI
- Se generi contenuti (testo, immagini, video): devi indicare che sono AI-generated
- Se usi AI per screening CV: rientri nella categoria alto rischio

### Deepfakes: Riconoscimento e Rischi

I **deepfakes** sono contenuti sintetici (video, audio, immagini) che usano l'AI per creare rappresentazioni false ma realistiche di persone reali.

**Tipologie di deepfake**:
- **Face swap**: sostituzione del volto di una persona con un'altra
- **Voice cloning**: sintesi vocale che imita la voce di una persona
- **Lip sync**: sincronizzazione delle labbra con audio diverso dall'originale
- **Full body**: generazione di video completi con persone inesistenti

**Rischi principali**:
- **Disinformazione politica**: video falsi di politici che dicono cose mai dette
- **Frodi finanziarie**: CEO deepfake che autorizzano trasferimenti di denaro
- **Revenge porn**: contenuti intimi non consensuali
- **Truffe**: chiamate vocali che imitano familiari in difficoltà

**Come riconoscere un deepfake**:
- Movimenti oculari innaturali o assenza di battito di ciglia
- Bordi sfumati o "tremolanti" attorno al viso
- Illuminazione incoerente tra viso e sfondo
- Sincronizzazione labiale imperfetta
- Artefatti nei capelli, orecchie, denti
- Metadati del file sospetti

**Strumenti di detection**:
- **Hive Moderation**: API per rilevare contenuti AI-generated
- **Sensity AI**: specializzato in detection di deepfake
- **Microsoft Video Authenticator**: analisi di video sospetti
- **Adobe Content Authenticity Initiative**: verifica della provenienza

**Best practices**:
- Verifica sempre la fonte originale di video virali o sensazionali
- Usa la ricerca inversa delle immagini (Google Images, TinEye)
- Controlla se il contenuto è stato riportato da fonti autorevoli
- In caso di dubbio, non condividere

### AI Governance Aziendale

Le organizzazioni devono definire policy chiare per l'uso dell'AI:

**Elementi di una AI Policy aziendale**:

1. **Ambito di applicazione**: quali tool AI sono approvati e per quali scopi
2. **Classificazione dei dati**: cosa può e cosa non può essere condiviso con AI esterne
3. **Uso accettabile**: esempi concreti di usi consentiti e vietati
4. **Revisione e approvazione**: chi deve approvare output AI prima della pubblicazione
5. **Trasparenza**: quando e come dichiarare l'uso dell'AI
6. **Formazione**: requisiti di training per i dipendenti
7. **Monitoraggio**: come viene verificato il rispetto della policy

**Modello di classificazione per l'uso aziendale**:

| Livello | Dati ammessi | Strumenti | Esempio |
|---------|-------------|-----------|----------|
| Verde | Pubblici, non sensibili | Qualsiasi chatbot | Bozza email generica |
| Giallo | Interni non confidenziali | Tool aziendali approvati | Analisi trend di mercato |
| Rosso | Confidenziali, personali | Solo modelli locali/enterprise | Dati clienti, strategie |

**Checklist pre-deployment per applicazioni AI**:
- [ ] I dati di training sono legittimi e documentati?
- [ ] Il sistema ha supervisione umana appropriata?
- [ ] Gli utenti sono informati che interagiscono con AI?
- [ ] Esistono procedure per gestire errori e reclami?
- [ ] I bias sono stati valutati e mitigati?
- [ ] La conformità normativa è stata verificata?

### Impatto Ambientale e Sociale dell'AI

L'AI generativa ha un **costo ambientale significativo** che non va sottovalutato. Le innovazioni del prompting si sono potute avvicendare a fronte di un incremento massiccio della potenza di calcolo — il cosiddetto computational power — che richiede enormi risorse energetiche.

**Impatto ambientale**:
- Il settore digitale produce oggi tra il **2% e il 4%** del totale dei gas serra emessi globalmente, un dato in costante crescita trainato dall'AI
- L'addestramento di un singolo LLM di grandi dimensioni può consumare l'equivalente energetico di centinaia di voli transatlantici
- Le aziende tech propongono soluzioni (fonti energetiche alternative, rimozione di CO2) ma i rischi restano elevati
- Come evidenziato da Kate Crawford in *Atlas of AI*, le infrastrutture dell'AI hanno un impatto su clima, risorse idriche e territori

**Impatto sociale**:
- Secondo un report del «Time» (2023), OpenAI ha impiegato **lavoratori kenyoti** pagati meno di 2 dollari l'ora, tramite un'azienda intermediaria, per etichettare contenuti tossici e violenti necessari ad addestrare i filtri di sicurezza di ChatGPT
- Le pratiche estrattive dei dataset sollevano questioni di **giustizia globale**: chi produce i dati e chi ne trae profitto?
- L'industria dell'AI tende all'**oligopolio**: poche grandi aziende controllano i modelli più potenti, i dataset più vasti e le infrastrutture di calcolo
- Come osserva la ricercatrice Hito Steyerl, l'AI dovrebbe essere pensata come un **bene comune** (commons), non come proprietà privata

L'AI va vista anche come un progetto di **ingegneria sociale**: tra i suoi scopi c'è quello di automatizzare la forza lavoro e la forza creativa. La domanda etica non riguarda solo "cosa può fare l'AI", ma "a vantaggio di chi" e "a quale costo".

### Il Fenomeno dell'Automazione Bias

L'**automation bias** è la tendenza umana ad accettare acriticamente le informazioni prodotte da sistemi automatizzati, soprattutto quando sono presentate in modo autorevole. I chatbot generano testo fluido, ben strutturato e apparentemente competente — questo rende particolarmente facile cadere nell'automazione bias.

Come contrastarlo:
- Mantieni sempre un atteggiamento di "scetticismo costruttivo"
- Sfida le affermazioni dell'AI con domande di verifica
- Ricorda che un testo ben scritto non è necessariamente un testo accurato
- Prendi nota delle volte in cui l'AI ha sbagliato — aiuta a calibrare la fiducia

### Costruire un Workflow di Verifica

Un approccio sistematico alla verifica:

1. **Genera** il contenuto con il chatbot (ChatGPT, Claude, etc.)
2. **Cross-check** le affermazioni chiave con Perplexity (ricerca web con fonti)
3. **Verifica dati** specifici con Consensus (per evidenze scientifiche) o Google Scholar
4. **Valuta** le fonti con il test CRAAP
5. **Revisiona** con occhio critico: coerenza, tono, accuratezza
6. **Documenta** le fonti usate per trasparenza

### Il Futuro: Prepararsi al Cambiamento

Il settore dell'AI è caratterizzato da un flusso costante di novità. Ogni 3-6 mesi emergono modelli e strumenti che ridefiniscono le possibilità. La chiave per rimanere rilevanti:

**Competenze transferibili** — Le abilità che restano valide indipendentemente dallo strumento:
- Pensiero critico e capacità di verifica
- Capacità di formulare domande efficaci (prompt engineering)
- Scrittura e comunicazione di qualità
- Comprensione dei principi etici
- Adattabilità e mentalità di apprendimento continuo

**Rimanere aggiornati**:
- Segui newsletter di settore (The Neuron, TLDR AI, Ben's Bites)
- Testa personalmente ogni nuovo strumento significativo
- Partecipa a community e gruppi di discussione (Reddit r/ChatGPT, r/LocalLLaMA)
- Sperimenta: l'esperienza pratica vale più di mille tutorial

**La regola d'oro**: L'AI migliore è quella che usi. Non cercare lo strumento perfetto — inizia a usare quello che hai a disposizione, impara facendo, e aggiorna progressivamente le tue competenze e i tuoi strumenti.

> "L'AI generativa non è il futuro — è il presente. Chi non inizia a integrarla nel proprio lavoro oggi, rischia di trovarsi in svantaggio domani." — Andrea Giorgi
    `,
    quiz: [
      {
        id: "q6-1",
        question:
          "Cosa accadde all'avvocato Steven Schwartz che usò ChatGPT per ricerca legale?",
        options: [
          "Vinse la causa grazie ai dati trovati dall'AI",
          "Fu multato di 5.000 dollari per aver portato in tribunale precedenti legali inventati dall'AI",
          "Brevettò un nuovo metodo di ricerca giuridica",
          "Divenne un promotore ufficiale di ChatGPT",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q6-2",
        question:
          "Cos'è Consensus e a cosa serve?",
        options: [
          "Un social network per ricercatori",
          "Un motore di ricerca specializzato in documenti scientifici peer-reviewed",
          "Un chatbot specializzato in copywriting",
          "Un tool per la generazione di immagini scientifiche",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q6-3",
        question:
          "Qual è la principale differenza tra ricerca tradizionale e ricerca con AI?",
        options: [
          "La ricerca tradizionale è sempre più accurata",
          "La ricerca con AI interpreta semanticamente l'intento e contestualizza le informazioni",
          "La ricerca con AI non utilizza fonti web",
          "Non c'è alcuna differenza sostanziale",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q6-4",
        question:
          "Chi è responsabile dell'output generato dall'AI?",
        options: [
          "L'azienda che ha creato il modello AI",
          "Nessuno, è generato automaticamente",
          "L'autore/utente che pubblica il contenuto",
          "Il motore di ricerca che fornisce i dati",
        ],
        correctIndex: 2,
        credits: 5,
      },
      {
        id: "q6-5",
        question:
          "Quale capacità è fondamentale indipendentemente dall'evoluzione degli strumenti AI?",
        options: [
          "Saper programmare modelli di deep learning",
          "Il pensiero critico e la capacità di verificare le fonti",
          "Conoscere tutti i chatbot disponibili sul mercato",
          "Saper generare immagini fotorealistiche",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q6-6",
        question:
          "Cos'è l'automation bias?",
        options: [
          "Un errore nel codice dei modelli AI",
          "La tendenza umana ad accettare acriticamente le informazioni prodotte da sistemi automatizzati",
          "Un algoritmo che migliora l'output dell'AI",
          "Un pregiudizio politico nei dati di addestramento",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q6-7",
        question:
          "Nel test CRAAP, cosa valuta la 'A' di Authority?",
        options: [
          "L'accuratezza matematica dei dati",
          "L'autorevolezza della fonte e le credenziali di chi ha prodotto l'informazione",
          "L'attrattiva visiva del contenuto",
          "L'anno di pubblicazione dell'articolo",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q6-8",
        question:
          "Perché i modelli AI tendono ad 'allucinare' piuttosto che ammettere di non sapere?",
        options: [
          "Perché sono programmati per mentire deliberatamente",
          "Perché sono addestrati a essere utili e dare risposte complete, e generano testo basato su probabilità statistiche",
          "Perché il loro hardware ha difetti di fabbricazione",
          "Perché vengono aggiornati troppo frequentemente",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q6-9",
        question:
          "Cosa è consigliato fare con dati sensibili o confidenziali?",
        options: [
          "Caricarli su ChatGPT gratuito per un'analisi veloce",
          "Usare modelli locali (come Llama su Ollama) o piani enterprise con garanzie contrattuali",
          "Condividerli solo con Gemini perché è di Google",
          "Pubblicarli su forum tematici per commenti",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q6-10",
        question:
          "Qual è un segnale d'allarme che indica una possibile allucinazione dell'AI?",
        options: [
          "La risposta ha più di 500 parole",
          "Statistiche molto precise e specifiche citate senza fonte verificabile",
          "La risposta è in formato elenco puntato",
          "Il modello chiede chiarimenti prima di rispondere",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q6-11",
        question:
          "Secondo Chatonsky e Somaini, i modelli generativi copiano le immagini originali?",
        options: [
          "Sì, le comprimono e le archiviano nel dataset",
          "No, le trasformano in probabilità vettorializzate in uno spazio matematico: non sono più immagini in senso tradizionale",
          "Sì, ma solo in bassa risoluzione",
          "Dipende dalla licenza del modello",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q6-12",
        question:
          "Quale percentuale dei gas serra globali è attribuita al settore digitale, in costante crescita per via dell'AI?",
        options: [
          "Meno dello 0,5%",
          "Tra il 2% e il 4%",
          "Circa il 15%",
          "Oltre il 25%",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q6-13",
        question:
          "Nella tripartizione di Margaret Boden, quale tipo di creatività prevede la trasformazione radicale degli spazi concettuali?",
        options: [
          "Creatività combinatoria",
          "Creatività esplorativa",
          "Creatività trasformativa",
          "Creatività automatica",
        ],
        correctIndex: 2,
        credits: 5,
      },
      {
        id: "q6-14",
        question:
          "Perché l'AI generativa dovrebbe essere considerata anche sotto l'aspetto dell'impatto sociale?",
        options: [
          "Solo perché è costosa da acquistare",
          "Perché le pratiche estrattive, lo sfruttamento del lavoro esternalizzato e la concentrazione del potere in poche aziende pongono questioni di giustizia globale",
          "Perché i modelli AI non funzionano nei Paesi in via di sviluppo",
          "Solo per ragioni di marketing",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q6-15",
        question:
          "Secondo l'EU AI Act, in quale categoria di rischio rientrano i chatbot?",
        options: [
          "Rischio inaccettabile (vietati)",
          "Rischio alto (requisiti stringenti)",
          "Rischio limitato (obblighi di trasparenza, devono dichiarare di essere AI)",
          "Rischio minimo (nessun obbligo)",
        ],
        correctIndex: 2,
        credits: 5,
      },
      {
        id: "q6-16",
        question:
          "Qual è un segnale visivo che può indicare un deepfake video?",
        options: [
          "Video in alta definizione",
          "Movimenti oculari innaturali, bordi sfumati attorno al viso, sincronizzazione labiale imperfetta",
          "Presenza di sottotitoli",
          "Durata superiore a 10 minuti",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q6-17",
        question:
          "Cosa prevede l'EU AI Act per i contenuti generati da AI?",
        options: [
          "Devono essere tutti vietati",
          "Devono essere etichettati, dichiarando che sono stati generati da AI",
          "Possono essere usati solo da aziende certificate",
          "Devono essere approvati dalla Commissione Europea",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q6-18",
        question:
          "Cosa dovrebbe includere una AI Policy aziendale?",
        options: [
          "Solo l'elenco dei tool vietati",
          "Ambito di applicazione, classificazione dati, uso accettabile, revisione, trasparenza, formazione e monitoraggio",
          "Solo le sanzioni per chi non rispetta le regole",
          "Solo i costi degli abbonamenti",
        ],
        correctIndex: 1,
        credits: 5,
      },
      {
        id: "q6-19",
        question:
          "Quali sistemi AI sono vietati dall'EU AI Act?",
        options: [
          "Tutti i chatbot",
          "Social scoring governativo, manipolazione subliminale e riconoscimento facciale in tempo reale in spazi pubblici (con eccezioni)",
          "Tutti i generatori di immagini",
          "Qualsiasi sistema che usa deep learning",
        ],
        correctIndex: 1,
        credits: 5,
      },
    ],
    maxCredits: 95,
  },
];
