const hiTabButtons = document.querySelectorAll(".hi-tab-btn");
const hiTabPanels = document.querySelectorAll(".hi-tab");

const hiCycleButtons = document.querySelectorAll(".hi-cycle-btn");
const hiCycleVisual = document.getElementById("hiCycleVisual");
const hiCycleText = document.getElementById("hiCycleText");

const hiNilNewRound = document.getElementById("hiNilNewRound");
const hiNilCheck = document.getElementById("hiNilCheck");
const hiNilList = document.getElementById("hiNilList");
const hiNilFeedback = document.getElementById("hiNilFeedback");

const hiCultureNewRound = document.getElementById("hiCultureNewRound");
const hiCultureCheck = document.getElementById("hiCultureCheck");
const hiCultureList = document.getElementById("hiCultureList");
const hiCultureFeedback = document.getElementById("hiCultureFeedback");

const hiCauseNewRound = document.getElementById("hiCauseNewRound");
const hiCauseCheck = document.getElementById("hiCauseCheck");
const hiCauseList = document.getElementById("hiCauseList");
const hiCauseFeedback = document.getElementById("hiCauseFeedback");

const hiQuizStart = document.getElementById("hiQuizStart");
const hiQuizNext = document.getElementById("hiQuizNext");
const hiQuizScore = document.getElementById("hiQuizScore");
const hiQuizStatus = document.getElementById("hiQuizStatus");
const hiQuizPrompt = document.getElementById("hiQuizPrompt");
const hiQuizAnswers = document.getElementById("hiQuizAnswers");
const hiQuizFeedback = document.getElementById("hiQuizFeedback");

const cycleInfo = {
  achet:
    "Achet (Ueberschwemmung): Der Nil tritt ueber die Ufer. Wasser und fruchtbarer Schlamm verteilen sich auf den Feldern. Das schafft die natuerliche Grundlage fuer spaetere Ernten.",
  peret:
    "Peret (Wachstum): Nach dem Rueckgang des Wassers werden Felder bestellt, Saat ausgebracht und Kanaele gepflegt. In dieser Phase zeigt sich, wie wichtig Planung und Arbeitsteilung waren.",
  shemu:
    "Shemu (Ernte): Die Ernte wird eingebracht und in Speichern gesichert. Ueberschuesse unterstuetzen Handel, Versorgung und die Finanzierung staatlicher Aufgaben.",
};

const nilePool = [
  {
    prompt: "Warum wird der Nil als Lebensader bezeichnet?",
    options: [
      { text: "Weil Wasser und fruchtbarer Schlamm Ernten moeglich machten.", isCorrect: true, wrongReason: "" },
      { text: "Weil der Fluss nur fuer Schmuck wichtig war.", isCorrect: false, wrongReason: "Der zentrale Punkt ist Versorgung durch Wasser und Boden." },
      { text: "Weil man den Nil fuer Siedlungen vermied.", isCorrect: false, wrongReason: "Siedlungen lagen oft bewusst in Nilnaehe." },
      { text: "Weil der Nil Arbeitsteilung unnoetig machte.", isCorrect: false, wrongReason: "Arbeitsteilung blieb fuer die Gesellschaft wichtig." },
    ],
    explanation: "Der Nil verband Wasser, Landwirtschaft und Versorgung.",
  },
  {
    prompt: "Welche direkte Folge hatte die Nilflut?",
    options: [
      { text: "Fruchtbarer Schlamm blieb auf Feldern zurueck.", isCorrect: true, wrongReason: "" },
      { text: "Ackerbau wurde unmoeglich.", isCorrect: false, wrongReason: "Die Flut verbesserte die Anbaubedingungen." },
      { text: "Vorratsspeicher wurden nutzlos.", isCorrect: false, wrongReason: "Speicher blieben fuer schlechte Jahre wichtig." },
      { text: "Handel wurde beendet.", isCorrect: false, wrongReason: "Versorgung und Austausch blieben notwendig." },
    ],
    explanation: "Die Flut erhoehte die Bodenfruchtbarkeit.",
  },
  {
    prompt: "Wozu dienten Vorratsspeicher?",
    options: [
      { text: "Zur Sicherung von Nahrung fuer spaetere Zeiten.", isCorrect: true, wrongReason: "" },
      { text: "Sie ersetzten die Landwirtschaft.", isCorrect: false, wrongReason: "Speicher und Landwirtschaft gehoeren zusammen." },
      { text: "Sie hatten nur dekorative Aufgaben.", isCorrect: false, wrongReason: "Ihr Zweck war Versorgungssicherheit." },
      { text: "Sie waren nur fuer Tempel gedacht.", isCorrect: false, wrongReason: "Sie dienten dem Alltag und der Versorgung." },
    ],
    explanation: "Vorrat senkt das Risiko bei schwankenden Ernten.",
  },
  {
    prompt: "Warum war Schrift im Alten Aegypten wichtig?",
    options: [
      { text: "Weil man Verwaltung und Abgaben dokumentieren konnte.", isCorrect: true, wrongReason: "" },
      { text: "Weil Schrift nur als Deko genutzt wurde.", isCorrect: false, wrongReason: "Schrift war ein Werkzeug fuer Organisation." },
      { text: "Weil Schrift nur private Notizen meinte.", isCorrect: false, wrongReason: "Im Lernmodul geht es vor allem um Verwaltung." },
      { text: "Weil Schrift muendliche Sprache ersetzte.", isCorrect: false, wrongReason: "Schrift ergaenzte, ersetzte aber nicht alles." },
    ],
    explanation: "Schrift war ein Kernmerkmal organisierter Hochkulturen.",
  },
  {
    prompt: "Was bedeutet Arbeitsteilung?",
    options: [
      { text: "Verschiedene Gruppen uebernehmen verschiedene Aufgaben.", isCorrect: true, wrongReason: "" },
      { text: "Alle Menschen machen immer exakt dieselbe Arbeit.", isCorrect: false, wrongReason: "Das Gegenteil von Arbeitsteilung." },
      { text: "Nur Bauern arbeiten, andere Gruppen nicht.", isCorrect: false, wrongReason: "Es gab mehrere Berufsgruppen." },
      { text: "Arbeitsteilung gibt es nur heute.", isCorrect: false, wrongReason: "Sie war schon fuer antike Hochkulturen wichtig." },
    ],
    explanation: "Arbeitsteilung ermoeglicht spezialisierte Berufe.",
  },
  {
    prompt: "Welche Aussage beschreibt den Pharao richtig?",
    options: [
      { text: "Er war zentraler Herrscher mit politischer und religioeser Bedeutung.", isCorrect: true, wrongReason: "" },
      { text: "Er war nur ein Dorfvorsteher.", isCorrect: false, wrongReason: "Die Rolle war reichsweit und zentral." },
      { text: "Er war nur ein Haendler.", isCorrect: false, wrongReason: "Der Begriff steht fuer Herrschaft." },
      { text: "Er hatte keine Funktion fuer den Staat.", isCorrect: false, wrongReason: "Herrschaft und Staat waren eng verbunden." },
    ],
    explanation: "Der Pharao steht in der Gesellschaftspyramide an der Spitze.",
  },
  {
    prompt: "Warum war der Nil auch ein Verkehrsweg?",
    options: [
      { text: "Menschen und Waren konnten entlang des Flusses transportiert werden.", isCorrect: true, wrongReason: "" },
      { text: "Der Fluss wurde fuer Reisen gemieden.", isCorrect: false, wrongReason: "Transport auf dem Nil war ein Vorteil." },
      { text: "Verkehr spielte im Alten Aegypten keine Rolle.", isCorrect: false, wrongReason: "Verkehr und Handel gehoerten zum Alltag." },
      { text: "Der Nil war nur ein religioeses Symbol.", isCorrect: false, wrongReason: "Im Lernteil ist der Alltagsnutzen klar erklaert." },
    ],
    explanation: "Der Nil verband Regionen und foerderte Austausch.",
  },
  {
    prompt: "Was meint der Begriff Hochkultur in diesem Modul?",
    options: [
      { text: "Eine komplexe Gesellschaft mit Schrift, Herrschaft und Arbeitsteilung.", isCorrect: true, wrongReason: "" },
      { text: "Eine Gesellschaft ohne Regeln.", isCorrect: false, wrongReason: "Hochkultur bedeutet gerade Organisation." },
      { text: "Eine Gesellschaft ohne Berufe ausser Landwirtschaft.", isCorrect: false, wrongReason: "Arbeitsteilung ist ein Kernmerkmal." },
      { text: "Eine Gesellschaft ohne Verwaltung.", isCorrect: false, wrongReason: "Verwaltung gehoert dazu." },
    ],
    explanation: "Hochkultur ist ein Strukturbegriff, kein Lobwort.",
  },
];

const culturePool = [
  { statement: "Schrift wird genutzt, um Verwaltung zu organisieren.", correct: "merkmal", explanation: "Schrift ist ein Kernmerkmal im Lernteil." },
  { statement: "Alle Menschen machen immer dieselbe Arbeit.", correct: "kein", explanation: "Arbeitsteilung ist ein zentrales Merkmal." },
  { statement: "Es gibt einen zentralen Herrscher (Pharao).", correct: "merkmal", explanation: "Die Gesellschaftspyramide zeigt diese Ordnung." },
  { statement: "Vorrat und Planung spielen fuer Versorgung eine Rolle.", correct: "merkmal", explanation: "Vorratsspeicher sichern Ernten." },
  { statement: "Siedlungen haben nichts mit Umweltbedingungen zu tun.", correct: "kein", explanation: "Im Modul wird die Nilnaehe klar erklaert." },
  { statement: "Schreiber halten wichtige Daten schriftlich fest.", correct: "merkmal", explanation: "Das wurde bei Begriffen und Aufgaben erklaert." },
  { statement: "Es gibt keinerlei Regeln oder Organisation.", correct: "kein", explanation: "Hochkulturen sind organisiert." },
  { statement: "Arbeitsteilung schafft verschiedene Berufsgruppen.", correct: "merkmal", explanation: "Das ist ein Schluesselbegriff des Moduls." },
];

const causeEffectPool = [
  {
    cause: "Der Nil ueberschwemmt regelmaessig die Ufer.",
    effect: "Fruchtbarer Schlamm verbessert die Felder.",
    explanation: "So entsteht die Basis fuer gute Ernten.",
  },
  {
    cause: "Es gibt regelmaessige Ernten und Vorrat.",
    effect: "Die Versorgung wird stabiler.",
    explanation: "Vorrat puffert schlechte Zeiten ab.",
  },
  {
    cause: "Es entstehen Ernteueberschuesse.",
    effect: "Arbeitsteilung mit verschiedenen Berufen wird moeglich.",
    explanation: "Nicht alle muessen nur Landwirtschaft betreiben.",
  },
  {
    cause: "Schrift wird genutzt.",
    effect: "Verwaltung und Planung funktionieren genauer.",
    explanation: "Schrift stuetzt Organisation.",
  },
  {
    cause: "Der Nil dient als Verkehrsweg.",
    effect: "Handel und Austausch zwischen Regionen nehmen zu.",
    explanation: "Transport erleichtert Verbindungen.",
  },
  {
    cause: "Herrschaft ist zentral organisiert.",
    effect: "Groessere Projekte koennen koordiniert werden.",
    explanation: "Organisation macht langfristige Planung moeglich.",
  },
  {
    cause: "Ackerflaechen liegen besonders am Nil.",
    effect: "Siedlungen konzentrieren sich in Flussnaehe.",
    explanation: "Menschen siedeln dort, wo Versorgung moeglich ist.",
  },
];

let nilTasks = [];
let cultureTasks = [];
let causeTasks = [];

const hiQuizState = {
  running: false,
  answered: false,
  index: 0,
  correct: 0,
  questions: [],
};

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function setupTabs() {
  hiTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      hiTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      hiTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${target}`).classList.add("is-active");
    });
  });
}

function setCycle(cycleId) {
  hiCycleVisual.dataset.cycle = cycleId;
  hiCycleText.textContent = cycleInfo[cycleId];
  hiCycleButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.cycle === cycleId);
  });
}

function setupCycleModule() {
  hiCycleButtons.forEach((button) => {
    button.addEventListener("click", () => setCycle(button.dataset.cycle));
  });
  setCycle("achet");
}

function cloneTask(task) {
  return {
    prompt: task.prompt,
    options: shuffle(task.options.map((option) => ({ ...option }))),
    explanation: task.explanation,
  };
}

function toCultureTask(item) {
  const options = [
    {
      text: "Typisches Merkmal einer Hochkultur",
      isCorrect: item.correct === "merkmal",
      wrongReason:
        item.correct === "kein"
          ? `Diese Aussage ist kein Kernmerkmal. ${item.explanation}`
          : "",
    },
    {
      text: "Kein typisches Merkmal",
      isCorrect: item.correct === "kein",
      wrongReason:
        item.correct === "merkmal"
          ? `Diese Aussage gehoert zu den Kernmerkmalen. ${item.explanation}`
          : "",
    },
  ];
  return {
    prompt: item.statement,
    options: shuffle(options),
    explanation: item.explanation,
  };
}

function buildCauseTask(item) {
  const distractors = shuffle(causeEffectPool.filter((entry) => entry !== item)).slice(0, 3);
  const options = [
    { text: item.effect, isCorrect: true, wrongReason: "" },
    ...distractors.map((entry) => ({
      text: entry.effect,
      isCorrect: false,
      wrongReason: `Diese Folge passt besser zu: "${entry.cause}"`,
    })),
  ];
  return {
    prompt: `Ursache: ${item.cause} Welche Folge passt am besten?`,
    options: shuffle(options),
    explanation: item.explanation,
  };
}

function generateNilRound(count = 10) {
  return shuffle(nilePool).slice(0, count).map(cloneTask);
}

function generateCultureRound(count = 10) {
  return shuffle(culturePool).slice(0, count).map(toCultureTask);
}

function generateCauseRound(count = 8) {
  return shuffle(causeEffectPool).slice(0, count).map((item) => buildCauseTask(item));
}

function renderChoiceRound(target, tasks, prefix) {
  target.replaceChildren();
  tasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "hi-task-row";

    const prompt = document.createElement("p");
    prompt.textContent = `${index + 1}. ${task.prompt}`;

    const choiceGrid = document.createElement("div");
    choiceGrid.className = "hi-choice-grid";
    task.options.forEach((option, optionIndex) => {
      const label = document.createElement("label");
      label.className = "hi-choice-item";
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `${prefix}-${index}`;
      radio.value = String(optionIndex);
      label.append(radio, document.createTextNode(option.text));
      choiceGrid.append(label);
    });

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";
    row.append(prompt, choiceGrid, feedback);
    target.append(row);
  });
}

function checkChoiceRound(target, tasks, prefix, summaryTarget, missingMessage) {
  const rows = target.querySelectorAll(".hi-task-row");
  let answered = 0;
  let correct = 0;

  rows.forEach((row, index) => {
    row.classList.remove("is-correct", "is-wrong");
    const feedback = row.querySelector(".task-feedback");
    if (!(feedback instanceof HTMLDivElement)) {
      return;
    }
    feedback.innerHTML = "";

    const checked = row.querySelector(`input[name="${prefix}-${index}"]:checked`);
    if (!(checked instanceof HTMLInputElement)) {
      return;
    }
    answered += 1;

    const selected = tasks[index].options[Number(checked.value)];
    const correctOption = tasks[index].options.find((option) => option.isCorrect);
    if (selected?.isCorrect) {
      correct += 1;
      row.classList.add("is-correct");
      feedback.innerHTML = `<p class="feedback ok">Richtig. ${tasks[index].explanation}</p>`;
    } else {
      row.classList.add("is-wrong");
      feedback.innerHTML = `
        <p class="feedback bad">
          Nicht korrekt. ${selected?.wrongReason || "Diese Option passt nicht."}
          Richtige Loesung: "${correctOption?.text || ""}". ${tasks[index].explanation}
        </p>
      `;
    }
  });

  if (answered < tasks.length) {
    summaryTarget.innerHTML = `<p class="feedback info">${missingMessage}</p>`;
    return;
  }

  const allCorrect = correct === tasks.length;
  summaryTarget.innerHTML = `
    <p class="feedback ${allCorrect ? "ok" : "bad"}">
      ${correct} / ${tasks.length} richtig.
      ${allCorrect ? "Sehr gut. Du kannst in den Test wechseln." : "Arbeite die roten Erklaerungen durch und starte eine neue Runde."}
    </p>
  `;
}

function setupNilModule() {
  nilTasks = generateNilRound();
  renderChoiceRound(hiNilList, nilTasks, "nil");
  hiNilFeedback.innerHTML = "";
  hiNilNewRound.addEventListener("click", () => {
    nilTasks = generateNilRound();
    renderChoiceRound(hiNilList, nilTasks, "nil");
    hiNilFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });
  hiNilCheck.addEventListener("click", () => {
    checkChoiceRound(hiNilList, nilTasks, "nil", hiNilFeedback, "Bitte alle Aufgaben in Modul A beantworten.");
  });
}

function setupCultureModule() {
  cultureTasks = generateCultureRound();
  renderChoiceRound(hiCultureList, cultureTasks, "culture");
  hiCultureFeedback.innerHTML = "";
  hiCultureNewRound.addEventListener("click", () => {
    cultureTasks = generateCultureRound();
    renderChoiceRound(hiCultureList, cultureTasks, "culture");
    hiCultureFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });
  hiCultureCheck.addEventListener("click", () => {
    checkChoiceRound(
      hiCultureList,
      cultureTasks,
      "culture",
      hiCultureFeedback,
      "Bitte alle Aussagen in Modul B einordnen."
    );
  });
}

function setupCauseModule() {
  causeTasks = generateCauseRound();
  renderChoiceRound(hiCauseList, causeTasks, "cause");
  hiCauseFeedback.innerHTML = "";
  hiCauseNewRound.addEventListener("click", () => {
    causeTasks = generateCauseRound();
    renderChoiceRound(hiCauseList, causeTasks, "cause");
    hiCauseFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });
  hiCauseCheck.addEventListener("click", () => {
    checkChoiceRound(hiCauseList, causeTasks, "cause", hiCauseFeedback, "Bitte alle Aufgaben in Modul C beantworten.");
  });
}

function fixedQuizQuestions() {
  return [
    {
      prompt: "Was erklaert den Titel 'Geschenk des Nils' am besten?",
      options: [
        "Wasser und Bodenfruchtbarkeit machten Versorgung moeglich.",
        "Der Nil war nur ein religioeses Symbol.",
        "Der Nil hatte keinen Bezug zur Landwirtschaft.",
        "Der Nil wurde erst in der Neuzeit wichtig.",
      ],
      correct: 0,
      explanation: "Naturfaktor und Versorgung sind direkt verbunden.",
      wrongReasons: {
        1: "Der Nil hatte auch konkreten Alltagsnutzen.",
        2: "Landwirtschaft war eng mit dem Nil verknuepft.",
        3: "Die Bedeutung ist gerade fuer die Antike zentral.",
      },
    },
    {
      prompt: "Welche Aussage passt zu Hochkultur?",
      options: [
        "Keine Arbeitsteilung",
        "Schrift und organisierte Verwaltung",
        "Regelloses Zusammenleben",
        "Keine staedtischen Zentren",
      ],
      correct: 1,
      explanation: "Schrift und Verwaltung gehoeren zu den Kernmerkmalen.",
      wrongReasons: {
        0: "Hochkulturen sind arbeitsteilig.",
        2: "Hochkulturen sind strukturiert organisiert.",
        3: "Zentren und Organisation sind typisch.",
      },
    },
    {
      prompt: "Welche Kette ist historisch schluessig?",
      options: [
        "Nilflut -> fruchtbarer Boden -> bessere Ernten",
        "Keine Verwaltung -> bessere Planung",
        "Weniger Wasser -> automatisch mehr Ertrag",
        "Keine Arbeitsteilung -> mehr Spezialberufe",
      ],
      correct: 0,
      explanation: "Diese Kette zeigt nachvollziehbare Ursache und Wirkung.",
      wrongReasons: {
        1: "Planung braucht geregelte Organisation.",
        2: "Wasserknappheit ist kein automatischer Vorteil.",
        3: "Spezialberufe entstehen durch Arbeitsteilung.",
      },
    },
    {
      prompt: "Warum waren Schreiber wichtig?",
      options: [
        "Sie dokumentierten Verwaltung und Vorratshaltung.",
        "Sie ersetzten alle Bauern.",
        "Sie waren nur fuer Unterhaltung da.",
        "Sie waren nur in Krisen noetig.",
      ],
      correct: 0,
      explanation: "Dokumentation und Verwaltung waren zentrale Aufgaben.",
      wrongReasons: {
        1: "Bauern und Schreiber hatten unterschiedliche Rollen.",
        2: "Ihre Hauptfunktion war Verwaltung, nicht Unterhaltung.",
        3: "Schrift wurde auch im Alltagsbetrieb benoetigt.",
      },
    },
  ];
}

function taskToQuizQuestion(task) {
  const options = task.options.map((option) => option.text);
  const correct = task.options.findIndex((option) => option.isCorrect);
  const wrongReasons = {};
  task.options.forEach((option, index) => {
    if (index !== correct) {
      wrongReasons[index] = option.wrongReason || "Diese Option passt fachlich nicht.";
    }
  });
  return {
    prompt: task.prompt,
    options,
    correct,
    explanation: task.explanation,
    wrongReasons,
  };
}

function buildQuizPool() {
  const fixed = fixedQuizQuestions();
  const nil = generateNilRound(12).map(taskToQuizQuestion);
  const culture = generateCultureRound(12).map(taskToQuizQuestion);
  const cause = generateCauseRound(10).map(taskToQuizQuestion);
  return [...fixed, ...nil, ...culture, ...cause];
}

function updateQuizScore() {
  hiQuizScore.textContent = `Punkte: ${hiQuizState.correct} / ${hiQuizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = hiQuizState.questions[hiQuizState.index];
  hiQuizStatus.textContent = `Frage ${hiQuizState.index + 1} von ${hiQuizState.questions.length}`;
  hiQuizPrompt.textContent = question.prompt;
  hiQuizFeedback.innerHTML = "";
  hiQuizNext.disabled = true;
  hiQuizAnswers.innerHTML = question.options
    .map(
      (option, optionIndex) => `
        <button class="choice-btn" type="button" data-option="${optionIndex}">
          ${option}
        </button>
      `
    )
    .join("");
}

function finishQuiz() {
  hiQuizState.running = false;
  hiQuizStatus.textContent = "Test abgeschlossen.";
  hiQuizPrompt.textContent = "Starte neu fuer weitere Aufgaben aus dem Pool.";
  hiQuizAnswers.innerHTML = "";
  hiQuizFeedback.innerHTML = '<p class="feedback info">Nutze die Fehlererklaerungen fuer deine Wiederholung.</p>';
  hiQuizNext.disabled = true;
  hiQuizStart.textContent = "Neu starten";
}

function submitQuizAnswer(optionIndex) {
  if (!hiQuizState.running || hiQuizState.answered) {
    return;
  }
  const question = hiQuizState.questions[hiQuizState.index];
  hiQuizState.answered = true;
  const isCorrect = optionIndex === question.correct;
  if (isCorrect) {
    hiQuizState.correct += 1;
  }
  updateQuizScore();

  hiQuizAnswers.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  const wrongReason = question.wrongReasons?.[optionIndex] || "Pruefe Ursache-Folge und Hochkultur-Merkmale erneut.";
  hiQuizFeedback.innerHTML = `
    <p class="feedback ${isCorrect ? "ok" : "bad"}">${
      isCorrect
        ? `Richtig. ${question.explanation}`
        : `Nicht korrekt. ${wrongReason} Richtige Antwort: "${question.options[question.correct]}". ${question.explanation}`
    }</p>
  `;

  hiQuizNext.disabled = false;
  hiQuizNext.textContent =
    hiQuizState.index === hiQuizState.questions.length - 1 ? "Ergebnis anzeigen" : "Naechste Frage";
}

function startQuiz() {
  const pool = shuffle(buildQuizPool());
  hiQuizState.running = true;
  hiQuizState.answered = false;
  hiQuizState.index = 0;
  hiQuizState.correct = 0;
  hiQuizState.questions = pool.slice(0, 10);
  hiQuizStart.textContent = "Test neu starten";
  updateQuizScore();
  renderQuizQuestion();
}

function nextQuizStep() {
  if (!hiQuizState.running || !hiQuizState.answered) {
    return;
  }
  if (hiQuizState.index === hiQuizState.questions.length - 1) {
    finishQuiz();
    return;
  }
  hiQuizState.index += 1;
  hiQuizState.answered = false;
  renderQuizQuestion();
}

function setupQuiz() {
  hiQuizStart.addEventListener("click", startQuiz);
  hiQuizNext.addEventListener("click", nextQuizStep);
  hiQuizAnswers.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }
    const optionIndex = Number(button.dataset.option);
    if (!Number.isInteger(optionIndex)) {
      return;
    }
    submitQuizAnswer(optionIndex);
  });
}

setupTabs();
setupCycleModule();
setupNilModule();
setupCultureModule();
setupCauseModule();
setupQuiz();
