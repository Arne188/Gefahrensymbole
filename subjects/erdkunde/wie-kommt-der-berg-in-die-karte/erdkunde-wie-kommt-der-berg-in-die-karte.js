const bkTabButtons = document.querySelectorAll(".bk-tab-btn");
const bkTabPanels = document.querySelectorAll(".bk-tab");

const bkIntervalSelect = document.getElementById("bkIntervalSelect");
const bkSliceSlider = document.getElementById("bkSliceSlider");
const bkSliceValue = document.getElementById("bkSliceValue");
const bkSideView = document.getElementById("bkSideView");
const bkTopView = document.getElementById("bkTopView");
const bkSliceExplain = document.getElementById("bkSliceExplain");

const bkLabPrompt = document.getElementById("bkLabPrompt");
const bkLabAnswers = document.getElementById("bkLabAnswers");
const bkLabNext = document.getElementById("bkLabNext");
const bkLabFeedback = document.getElementById("bkLabFeedback");

const bkTrainPrompt = document.getElementById("bkTrainPrompt");
const bkTrainAnswers = document.getElementById("bkTrainAnswers");
const bkTrainNext = document.getElementById("bkTrainNext");
const bkTrainFeedback = document.getElementById("bkTrainFeedback");

const bkCalcPrompt = document.getElementById("bkCalcPrompt");
const bkCalcInput = document.getElementById("bkCalcInput");
const bkCalcCheck = document.getElementById("bkCalcCheck");
const bkCalcNext = document.getElementById("bkCalcNext");
const bkCalcFeedback = document.getElementById("bkCalcFeedback");

const bkPathPrompt = document.getElementById("bkPathPrompt");
const bkPathData = document.getElementById("bkPathData");
const bkPathAnswers = document.getElementById("bkPathAnswers");
const bkPathNext = document.getElementById("bkPathNext");
const bkPathFeedback = document.getElementById("bkPathFeedback");

const bkQuizStart = document.getElementById("bkQuizStart");
const bkQuizNext = document.getElementById("bkQuizNext");
const bkQuizScore = document.getElementById("bkQuizScore");
const bkQuizStatus = document.getElementById("bkQuizStatus");
const bkQuizPrompt = document.getElementById("bkQuizPrompt");
const bkQuizContext = document.getElementById("bkQuizContext");
const bkQuizAnswers = document.getElementById("bkQuizAnswers");
const bkQuizFeedback = document.getElementById("bkQuizFeedback");

const contourLevels = [0, 100, 200, 300, 400, 500, 600];
const routeProfiles = [
  [120, 180, 250, 330, 410],
  [280, 300, 315, 330, 340],
  [450, 390, 320, 250, 200],
  [140, 220, 210, 260, 350],
];

let labTask = null;
let labAnswered = false;
let trainTask = null;
let trainAnswered = false;
let calcTask = null;
let calcAnswered = false;
let pathTask = null;
let pathAnswered = false;

const quizState = {
  running: false,
  answered: false,
  index: 0,
  correct: 0,
  questions: [],
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choose(items) {
  return items[randomInt(0, items.length - 1)];
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function setFeedback(element, kind, text) {
  element.innerHTML = `<p class="feedback ${kind}">${text}</p>`;
}

function renderAnswerButtons(container, options) {
  container.innerHTML = options
    .map((option, index) => `<button type="button" class="bk-answer-btn" data-index="${index}">${option}</button>`)
    .join("");
}

function setupTabs() {
  bkTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;
      bkTabButtons.forEach((entry) => entry.classList.remove("is-active"));
      bkTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${tab}`).classList.add("is-active");
    });
  });
}

function formatLevels(levels) {
  return levels.map((entry) => `${entry} m`).join(", ");
}

function renderContourDemo() {
  const interval = Number(bkIntervalSelect.value);
  const activeLevel = Number(bkSliceSlider.value);
  const shownLevels = contourLevels.filter((level) => level % interval === 0);

  bkSliceValue.textContent = `${activeLevel} m`;

  const sideLines = shownLevels
    .map((level) => {
      const pos = 48 + (level / 600) * 185;
      const top = `calc(100% - ${pos}px)`;
      return [
        `<div class="bk-slice-line${level === activeLevel ? " is-active" : ""}" style="top:${top}"></div>`,
        `<span class="bk-slice-label" style="top:${top}">${level} m</span>`,
      ].join("");
    })
    .join("");

  bkSideView.innerHTML = `
    <div class="bk-ground-line"></div>
    <div class="bk-mountain"></div>
    ${sideLines}
  `;

  const centerX = 50;
  const centerY = 50;
  const maxRadius = 40;
  const minRadius = 8;
  const layers = shownLevels
    .filter((level) => level !== 0)
    .map((level, index, arr) => {
      const factor = (arr.length - 1 - index) / Math.max(arr.length - 1, 1);
      const radius = minRadius + factor * (maxRadius - minRadius);
      const size = `${radius * 2}%`;
      const top = `${centerY - radius}%`;
      const left = `${centerX - radius}%`;
      const labelTop = `${centerY - radius - 4}%`;
      const labelLeft = `${centerX + radius - 2}%`;
      return [
        `<div class="bk-contour-layer${level === activeLevel ? " is-active" : ""}" style="width:${size};height:${size};top:${top};left:${left}"></div>`,
        `<span class="bk-contour-label" style="top:${labelTop};left:${labelLeft}">${level} m</span>`,
      ].join("");
    })
    .join("");

  bkTopView.innerHTML = layers;
  bkSliceExplain.textContent =
    `Linienabstand ${interval} m: Sichtbar sind ${shownLevels.length - 1} Hoehenlinien (${formatLevels(
      shownLevels.filter((level) => level !== 0)
    )}). Je kleiner der Abstand, desto mehr Details zeigt die Karte.`;
}

function syncSliderToInterval() {
  const interval = Number(bkIntervalSelect.value);
  bkSliceSlider.step = String(interval);
  const snappedValue = Math.round(Number(bkSliceSlider.value) / interval) * interval;
  bkSliceSlider.value = String(Math.max(0, Math.min(600, snappedValue)));
  renderContourDemo();
}

function createLabTask() {
  const variant = randomInt(0, 2);
  if (variant === 0) {
    return {
      prompt: "Auf einer Karte liegen die Hoehenlinien sehr dicht nebeneinander. Was bedeutet das?",
      options: [
        "Der Hang ist steil.",
        "Das Gelaende ist sehr flach.",
        "Es gibt keine Hoehenunterschiede.",
        "Die Karte ist falsch gezeichnet.",
      ],
      correct: 0,
      explanation: "Dicht beieinander liegende Hoehenlinien zeigen einen steilen Hang.",
    };
  }
  if (variant === 1) {
    return {
      prompt: "Mehrere geschlossene Hoehenlinien liegen wie Ringe ineinander. Was liegt wahrscheinlich in der Mitte?",
      options: ["Ein Gipfelbereich", "Ein See", "Ein Tunnel", "Ein Talboden"],
      correct: 0,
      explanation: "Geschlossene Ringe mit steigenden Werten zeigen meist einen Gipfelbereich.",
    };
  }
  return {
    prompt: "Die Linien sind weit auseinander. Welche Aussage passt?",
    options: [
      "Das Gelaende steigt nur langsam an.",
      "Das Gelaende faellt senkrecht ab.",
      "Es gibt dort einen Vulkan.",
      "Dort sind keine Hoehenlinien erlaubt.",
    ],
    correct: 0,
    explanation: "Grosser Abstand zwischen Linien bedeutet ein flaches oder sanft ansteigendes Gelaende.",
  };
}

function showLabTask() {
  labTask = createLabTask();
  labAnswered = false;
  bkLabPrompt.textContent = labTask.prompt;
  renderAnswerButtons(bkLabAnswers, labTask.options);
  bkLabFeedback.innerHTML = "";
}

function answerLabTask(index) {
  if (!labTask || labAnswered) {
    return;
  }
  const selected = Number(index);
  const isCorrect = selected === labTask.correct;
  labAnswered = true;

  bkLabAnswers.querySelectorAll(".bk-answer-btn").forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === labTask.correct) {
      button.classList.add("is-correct");
    } else if (buttonIndex === selected) {
      button.classList.add("is-wrong");
    }
  });

  setFeedback(
    bkLabFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect ? `Richtig. ${labTask.explanation}` : `Nicht korrekt. ${labTask.explanation}`
  );
}

function createTrainTask() {
  const tasks = [
    {
      prompt: "Was beschreibt eine Hoehenlinie genau?",
      options: [
        "Punkte mit gleicher Hoehe ueber dem Meeresspiegel",
        "Alle Fluesse einer Region",
        "Nur die Grenzen eines Landes",
        "Die Entfernung zwischen zwei Orten",
      ],
      correct: 0,
      explanation: "Eine Hoehenlinie verbindet Punkte gleicher Hoehe.",
    },
    {
      prompt: "Welche Karte zeigt den steileren Anstieg?",
      options: [
        "Die Karte mit eng stehenden Linien",
        "Die Karte mit weit stehenden Linien",
        "Beide sind gleich steil",
        "Man kann es nicht erkennen",
      ],
      correct: 0,
      explanation: "Enge Linien bedeuten grosse Hoehendifferenzen auf kurzer Strecke, also steil.",
    },
    {
      prompt: "Warum sind Hoehenlinien fuer Wanderkarten hilfreich?",
      options: [
        "Man kann anstrengende Anstiege erkennen",
        "Man kann Wetterberichte ablesen",
        "Man kann Landesgrenzen neu festlegen",
        "Man sieht nur die Vegetation",
      ],
      correct: 0,
      explanation: "Linienabstand und Verlauf zeigen, wo Aufstiege steil oder sanft sind.",
    },
    {
      prompt: "Welche Aussage zu Isolinien ist richtig?",
      options: [
        "Isolinien verbinden Punkte mit gleichem Messwert",
        "Isolinien sind immer gerade Linien",
        "Isolinien gibt es nur in Deutschland",
        "Isolinien zeigen nur Temperaturen",
      ],
      correct: 0,
      explanation: "Isolinien sind ein allgemeines Prinzip: gleicher Wert auf einer Linie.",
    },
  ];
  return choose(tasks);
}

function showTrainTask() {
  trainTask = createTrainTask();
  trainAnswered = false;
  bkTrainPrompt.textContent = trainTask.prompt;
  renderAnswerButtons(bkTrainAnswers, trainTask.options);
  bkTrainFeedback.innerHTML = "";
}

function answerTrainTask(index) {
  if (!trainTask || trainAnswered) {
    return;
  }
  const selected = Number(index);
  const isCorrect = selected === trainTask.correct;
  trainAnswered = true;

  bkTrainAnswers.querySelectorAll(".bk-answer-btn").forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === trainTask.correct) {
      button.classList.add("is-correct");
    } else if (buttonIndex === selected) {
      button.classList.add("is-wrong");
    }
  });

  setFeedback(
    bkTrainFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect ? `Richtig. ${trainTask.explanation}` : `Nicht korrekt. ${trainTask.explanation}`
  );
}

function createCalcTask() {
  const interval = choose([50, 100, 200]);
  const base = choose([100, 200, 300, 400]);
  const maxDownSteps = Math.floor(base / interval);
  const direction = maxDownSteps > 0 ? choose(["oben", "unten"]) : "oben";
  const maxSteps = direction === "unten" ? Math.max(1, Math.min(4, maxDownSteps)) : 4;
  const steps = randomInt(1, maxSteps);
  const answer = direction === "oben" ? base + steps * interval : base - steps * interval;
  return {
    prompt:
      `Linienabstand: ${interval} m. Eine Linie ist mit ${base} m beschriftet. ` +
      `Du gehst ${steps} Linie(n) nach ${direction}. Welche Hoehe hat die neue Linie?`,
    answer,
    explanation: `Rechnung: ${base} ${direction === "oben" ? "+" : "-"} ${steps} * ${interval} = ${answer} m.`,
  };
}

function showCalcTask() {
  calcTask = createCalcTask();
  calcAnswered = false;
  bkCalcPrompt.textContent = calcTask.prompt;
  bkCalcInput.value = "";
  bkCalcFeedback.innerHTML = "";
}

function parseNumber(value) {
  const cleaned = String(value || "").replace(",", ".").trim();
  if (!cleaned) {
    return null;
  }
  const parsed = Number(cleaned);
  if (!Number.isFinite(parsed)) {
    return null;
  }
  return parsed;
}

function checkCalcTask() {
  if (!calcTask || calcAnswered) {
    return;
  }
  const numeric = parseNumber(bkCalcInput.value);
  if (numeric === null) {
    setFeedback(bkCalcFeedback, "info", "Bitte gib eine Zahl in Metern ein.");
    return;
  }

  calcAnswered = true;
  const isCorrect = Number(numeric) === calcTask.answer;
  setFeedback(
    bkCalcFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect
      ? `Richtig. ${calcTask.explanation}`
      : `Nicht korrekt. Richtige Loesung: ${calcTask.answer} m. ${calcTask.explanation}`
  );
}

function heightDelta(profile) {
  return profile[profile.length - 1] - profile[0];
}

function sumAscents(profile) {
  let total = 0;
  for (let i = 1; i < profile.length; i += 1) {
    const diff = profile[i] - profile[i - 1];
    if (diff > 0) {
      total += diff;
    }
  }
  return total;
}

function createPathTask() {
  const profile = choose(routeProfiles);
  const maxStep = Math.max(...profile.slice(1).map((value, index) => Math.abs(value - profile[index])));
  const steepHint = maxStep >= 100 ? "steil" : "eher sanft";
  const delta = heightDelta(profile);
  const upDown = delta > 0 ? "bergauf" : "bergab";
  const totalUp = sumAscents(profile);
  const options = shuffle([
    `Der Weg geht insgesamt ${upDown}.`,
    "Der Weg bleibt immer auf gleicher Hoehe.",
    "Der Weg hat keinen einzigen Anstieg.",
    "Der Weg endet hoeher, aber startet bereits am Gipfel.",
  ]);
  const correctText = `Der Weg geht insgesamt ${upDown}.`;
  return {
    prompt: "Welche Aussage passt am besten zum Hoehenprofil?",
    profile,
    details: `Hoehenpunkte entlang des Weges: ${profile.map((entry) => `${entry} m`).join(" -> ")}`,
    options,
    correct: options.indexOf(correctText),
    explanation:
      `Start und Ende zeigen die Gesamtbewegung (${upDown}). ` +
      `Steilster Abschnitt: ${maxStep} m Unterschied (${steepHint}). Gesamtanstieg: ${totalUp} m.`,
  };
}

function showPathTask() {
  pathTask = createPathTask();
  pathAnswered = false;
  bkPathPrompt.textContent = pathTask.prompt;
  bkPathData.textContent = pathTask.details;
  renderAnswerButtons(bkPathAnswers, pathTask.options);
  bkPathFeedback.innerHTML = "";
}

function answerPathTask(index) {
  if (!pathTask || pathAnswered) {
    return;
  }
  const selected = Number(index);
  const isCorrect = selected === pathTask.correct;
  pathAnswered = true;

  bkPathAnswers.querySelectorAll(".bk-answer-btn").forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === pathTask.correct) {
      button.classList.add("is-correct");
    } else if (buttonIndex === selected) {
      button.classList.add("is-wrong");
    }
  });

  setFeedback(
    bkPathFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect ? `Richtig. ${pathTask.explanation}` : `Nicht korrekt. ${pathTask.explanation}`
  );
}

const quizKnowledgePool = [
  {
    prompt: "Welche Aussage trifft auf Isolinien allgemein zu?",
    options: [
      "Sie verbinden Punkte mit gleichem Messwert.",
      "Sie zeigen nur Hoehen in Gebirgen.",
      "Sie sind immer kreisfoermig.",
      "Sie duerfen sich auf Karten schneiden.",
    ],
    correct: 0,
    explanation: "Isolinien verbinden immer Punkte mit demselben Wert (z. B. Hoehe, Temperatur, Druck).",
  },
  {
    prompt: "Woran erkennst du auf einer Karte am besten eine flache Hochflaeche?",
    options: [
      "An weit auseinander liegenden Hoehenlinien mit aehnlichen Werten.",
      "An sehr eng gepackten Hoehenlinien.",
      "An vielen Flusssymbolen.",
      "An dicken Landesgrenzen.",
    ],
    correct: 0,
    explanation: "Weite Linienabstaende zeigen geringe Steigung, also eher flaches Gelaende.",
  },
  {
    prompt: "Zwischen zwei benachbarten Hoehenlinien liegt immer derselbe Wertabstand. Wie nennt man ihn?",
    options: ["Aequidistanz", "Legende", "Massstab", "Profilhoehe"],
    correct: 0,
    explanation: "Der feste Hoehenabstand zwischen benachbarten Linien heisst Aequidistanz.",
  },
  {
    prompt: "Eine Linie ist mit 300 m beschriftet. Welche Hoehe hat die naechste Linie oberhalb bei 100-m-Aequidistanz?",
    options: ["400 m", "200 m", "350 m", "500 m"],
    correct: 0,
    explanation: "Bei 100 m Aequidistanz geht es je Linie um 100 m nach oben oder unten.",
  },
  {
    prompt: "Warum helfen Hoehenlinien bei der Routenplanung?",
    options: [
      "Sie zeigen, wo starke Anstiege Kraft kosten.",
      "Sie ersetzen alle Wegemarkierungen.",
      "Sie zeigen immer die schnellste Route.",
      "Sie enthalten automatisch Wetterdaten.",
    ],
    correct: 0,
    explanation: "Mit Hoehenlinien erkennst du schwierige Anstiege und kannst Wege besser einschaetzen.",
  },
  {
    prompt: "Was bedeutet es, wenn geschlossene Linien nach innen niedrigere Werte tragen?",
    options: ["Es kann eine Senke sein.", "Es ist sicher ein Gipfel.", "Es ist ein Flussbett.", "Es ist automatisch eine Strasse."],
    correct: 0,
    explanation: "Wenn Werte nach innen sinken, deutet das auf eine Senke hin statt auf einen Gipfel.",
  },
];

function createQuizKnowledgeQuestion(baseQuestion) {
  return {
    type: "mc",
    prompt: baseQuestion.prompt,
    options: [...baseQuestion.options],
    correct: baseQuestion.correct,
    explanation: baseQuestion.explanation,
  };
}

function createQuizCalcQuestion() {
  const interval = choose([50, 100, 200]);
  const base = choose([150, 250, 350, 450]);
  const maxDownSteps = Math.floor(base / interval);
  const direction = maxDownSteps > 0 ? choose(["hoeher", "tiefer"]) : "hoeher";
  const maxSteps = direction === "tiefer" ? Math.max(1, Math.min(4, maxDownSteps)) : 4;
  const steps = randomInt(1, maxSteps);
  const answer = direction === "hoeher" ? base + steps * interval : base - steps * interval;
  return {
    type: "input",
    prompt:
      `Aequidistanz: ${interval} m. Ausgangspunkt ist die Hoehenlinie ${base} m. ` +
      `Du gehst ${steps} Linie(n) ${direction}. Welche Hoehe erreichst du?`,
    answer,
    context: "Rechne in gleich grossen Hoehenschritten weiter.",
    explanation:
      `Rechnung: ${base} ${direction === "hoeher" ? "+" : "-"} ${steps} * ${interval} = ${answer} m.`,
  };
}

function createQuizPathQuestion() {
  const task = createPathTask();
  const climb = sumAscents(task.profile);
  const optionValues = new Set([climb]);
  const deltas = shuffle([40, 60, 80, 100, 120, 140, 160]);

  for (let i = 0; i < deltas.length && optionValues.size < 4; i += 1) {
    const delta = deltas[i];
    const higher = climb + delta;
    const lower = climb - delta;
    if (higher !== climb) {
      optionValues.add(higher);
    }
    if (optionValues.size < 4 && lower >= 0 && lower !== climb) {
      optionValues.add(lower);
    }
  }

  while (optionValues.size < 4) {
    optionValues.add(climb + randomInt(20, 180));
  }

  const options = shuffle([...optionValues].slice(0, 4).map((value) => `Der gesamte Aufstieg betraegt ${value} m.`));
  return {
    type: "mc",
    prompt: "Wie gross ist der gesamte Aufstieg entlang dieses Wegprofils?",
    options,
    correct: options.indexOf(`Der gesamte Aufstieg betraegt ${climb} m.`),
    context: task.details,
    explanation: `Addiere nur positive Teilanstiege. Hier ergibt das insgesamt ${climb} m Aufstieg.`,
  };
}

function generateQuizSet() {
  const knowledgeQuestions = shuffle([...quizKnowledgePool])
    .slice(0, 5)
    .map((entry) => createQuizKnowledgeQuestion(entry));

  const calcQuestions = [];
  const calcPromptSet = new Set();
  while (calcQuestions.length < 3) {
    const item = createQuizCalcQuestion();
    if (!calcPromptSet.has(item.prompt)) {
      calcPromptSet.add(item.prompt);
      calcQuestions.push(item);
    }
  }

  const pathQuestions = [];
  const pathContextSet = new Set();
  while (pathQuestions.length < 2) {
    const item = createQuizPathQuestion();
    if (!pathContextSet.has(item.context)) {
      pathContextSet.add(item.context);
      pathQuestions.push(item);
    }
  }

  return shuffle([...knowledgeQuestions, ...calcQuestions, ...pathQuestions]);
}

function updateQuizScore() {
  bkQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  bkQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  bkQuizPrompt.textContent = question.prompt;
  bkQuizFeedback.innerHTML = "";
  bkQuizNext.disabled = true;
  bkQuizNext.textContent =
    quizState.index === quizState.questions.length - 1 ? "Ergebnis anzeigen" : "Naechste Frage";

  if (question.context) {
    bkQuizContext.hidden = false;
    bkQuizContext.textContent = question.context;
  } else {
    bkQuizContext.hidden = true;
    bkQuizContext.textContent = "";
  }

  if (question.type === "mc") {
    renderAnswerButtons(bkQuizAnswers, question.options);
  } else {
    bkQuizAnswers.innerHTML = [
      '<div class="bk-input-row">',
      '<label for="bkQuizInput">Antwort in m:</label>',
      '<input id="bkQuizInput" type="text" autocomplete="off" inputmode="numeric" placeholder="z. B. 500">',
      '<button id="bkQuizCheck" type="button">Antwort pruefen</button>',
      "</div>",
    ].join("");
  }
}

function answerQuizMc(index) {
  if (!quizState.running || quizState.answered) {
    return;
  }
  const question = quizState.questions[quizState.index];
  if (question.type !== "mc") {
    return;
  }

  const selected = Number(index);
  const isCorrect = selected === question.correct;
  quizState.answered = true;
  if (isCorrect) {
    quizState.correct += 1;
  }

  bkQuizAnswers.querySelectorAll(".bk-answer-btn").forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === question.correct) {
      button.classList.add("is-correct");
    } else if (buttonIndex === selected) {
      button.classList.add("is-wrong");
    }
  });

  updateQuizScore();
  bkQuizNext.disabled = false;
  setFeedback(
    bkQuizFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect ? `Richtig. ${question.explanation}` : `Nicht korrekt. ${question.explanation}`
  );
}

function answerQuizInput() {
  if (!quizState.running || quizState.answered) {
    return;
  }
  const question = quizState.questions[quizState.index];
  if (question.type !== "input") {
    return;
  }
  const input = document.getElementById("bkQuizInput");
  if (!(input instanceof HTMLInputElement)) {
    return;
  }
  const numeric = parseNumber(input.value);
  if (numeric === null) {
    setFeedback(bkQuizFeedback, "info", "Bitte gib eine Zahl in Metern ein.");
    return;
  }

  const isCorrect = Number(numeric) === question.answer;
  quizState.answered = true;
  if (isCorrect) {
    quizState.correct += 1;
  }

  const checkButton = document.getElementById("bkQuizCheck");
  if (checkButton instanceof HTMLButtonElement) {
    checkButton.disabled = true;
  }

  updateQuizScore();
  bkQuizNext.disabled = false;
  setFeedback(
    bkQuizFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect
      ? `Richtig. ${question.explanation}`
      : `Nicht korrekt. Richtige Loesung: ${question.answer} m. ${question.explanation}`
  );
}

function startQuiz() {
  quizState.running = true;
  quizState.answered = false;
  quizState.index = 0;
  quizState.correct = 0;
  quizState.questions = generateQuizSet();
  bkQuizStart.textContent = "Test neu starten";
  updateQuizScore();
  renderQuizQuestion();
}

function finishQuiz() {
  const percent = Math.round((quizState.correct / quizState.questions.length) * 100);
  quizState.running = false;
  bkQuizStatus.textContent = "Test beendet";
  bkQuizPrompt.textContent = `Ergebnis: ${quizState.correct}/${quizState.questions.length} (${percent}%)`;
  bkQuizContext.hidden = true;
  bkQuizContext.textContent = "";
  bkQuizAnswers.innerHTML = "";
  bkQuizNext.disabled = true;

  const message =
    percent >= 80
      ? "Sehr gut. Du kannst Hoehenlinien sicher lesen und anwenden."
      : "Gut gearbeitet. Wiederhole vor allem Linienabstand und Hoehenberechnung.";
  setFeedback(bkQuizFeedback, percent >= 80 ? "ok" : "info", message);
}

function nextQuizQuestion() {
  if (!quizState.running) {
    return;
  }
  if (!quizState.answered) {
    setFeedback(bkQuizFeedback, "info", "Bitte zuerst die aktuelle Frage beantworten.");
    return;
  }
  if (quizState.index >= quizState.questions.length - 1) {
    finishQuiz();
    return;
  }

  quizState.index += 1;
  quizState.answered = false;
  renderQuizQuestion();
}

function bootstrap() {
  setupTabs();
  syncSliderToInterval();
  showLabTask();
  showTrainTask();
  showCalcTask();
  showPathTask();

  bkIntervalSelect.addEventListener("change", syncSliderToInterval);
  bkSliceSlider.addEventListener("input", renderContourDemo);

  bkLabNext.addEventListener("click", showLabTask);
  bkLabAnswers.addEventListener("click", (event) => {
    const button = event.target;
    if (!(button instanceof HTMLButtonElement) || !button.classList.contains("bk-answer-btn")) {
      return;
    }
    answerLabTask(button.dataset.index);
  });

  bkTrainNext.addEventListener("click", showTrainTask);
  bkTrainAnswers.addEventListener("click", (event) => {
    const button = event.target;
    if (!(button instanceof HTMLButtonElement) || !button.classList.contains("bk-answer-btn")) {
      return;
    }
    answerTrainTask(button.dataset.index);
  });

  bkCalcCheck.addEventListener("click", checkCalcTask);
  bkCalcNext.addEventListener("click", showCalcTask);
  bkCalcInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      checkCalcTask();
    }
  });

  bkPathNext.addEventListener("click", showPathTask);
  bkPathAnswers.addEventListener("click", (event) => {
    const button = event.target;
    if (!(button instanceof HTMLButtonElement) || !button.classList.contains("bk-answer-btn")) {
      return;
    }
    answerPathTask(button.dataset.index);
  });

  bkQuizStart.addEventListener("click", startQuiz);
  bkQuizNext.addEventListener("click", nextQuizQuestion);
  bkQuizAnswers.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target instanceof HTMLButtonElement && target.classList.contains("bk-answer-btn")) {
      answerQuizMc(target.dataset.index);
      return;
    }
    if (target instanceof HTMLButtonElement && target.id === "bkQuizCheck") {
      answerQuizInput();
    }
  });

  bkQuizAnswers.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }
    const target = event.target;
    if (target instanceof HTMLInputElement && target.id === "bkQuizInput") {
      answerQuizInput();
    }
  });
}

bootstrap();
