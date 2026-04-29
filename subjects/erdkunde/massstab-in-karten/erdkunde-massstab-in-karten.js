const mkTabButtons = document.querySelectorAll(".mk-tab-btn");
const mkTabPanels = document.querySelectorAll(".mk-tab");

const mkStepButtons = document.querySelectorAll(".mk-step-btn");
const mkStepTitle = document.getElementById("mkStepTitle");
const mkStepText = document.getElementById("mkStepText");
const mkStepList = document.getElementById("mkStepList");

const mkPosterButtons = document.querySelectorAll(".mk-poster-btn");
const mkPosterImage = document.getElementById("mkPosterImage");
const mkPosterCaption = document.getElementById("mkPosterCaption");

const mkMode = document.getElementById("mkMode");
const mkScaleN = document.getElementById("mkScaleN");
const mkInputValue = document.getElementById("mkInputValue");
const mkInputUnit = document.getElementById("mkInputUnit");
const mkOutputUnit = document.getElementById("mkOutputUnit");
const mkCalcRun = document.getElementById("mkCalcRun");
const mkCalcScenario = document.getElementById("mkCalcScenario");
const mkCalcResult = document.getElementById("mkCalcResult");

const mkScaleSlider = document.getElementById("mkScaleSlider");
const mkScaleLabel = document.getElementById("mkScaleLabel");
const mkScaleExplain = document.getElementById("mkScaleExplain");
const mkScaleArea = document.getElementById("mkScaleArea");
const mkScaleBar = document.getElementById("mkScaleBar");

const mkConceptPrompt = document.getElementById("mkConceptPrompt");
const mkConceptAnswers = document.getElementById("mkConceptAnswers");
const mkConceptNext = document.getElementById("mkConceptNext");
const mkConceptFeedback = document.getElementById("mkConceptFeedback");

const mkMathPrompt = document.getElementById("mkMathPrompt");
const mkMathInput = document.getElementById("mkMathInput");
const mkMathUnit = document.getElementById("mkMathUnit");
const mkMathCheck = document.getElementById("mkMathCheck");
const mkMathNext = document.getElementById("mkMathNext");
const mkMathFeedback = document.getElementById("mkMathFeedback");

const mkScenarioPrompt = document.getElementById("mkScenarioPrompt");
const mkScenarioAnswers = document.getElementById("mkScenarioAnswers");
const mkScenarioNext = document.getElementById("mkScenarioNext");
const mkScenarioFeedback = document.getElementById("mkScenarioFeedback");

const mkQuizStart = document.getElementById("mkQuizStart");
const mkQuizNext = document.getElementById("mkQuizNext");
const mkQuizScore = document.getElementById("mkQuizScore");
const mkQuizStatus = document.getElementById("mkQuizStatus");
const mkQuizPrompt = document.getElementById("mkQuizPrompt");
const mkQuizContext = document.getElementById("mkQuizContext");
const mkQuizAnswers = document.getElementById("mkQuizAnswers");
const mkQuizFeedback = document.getElementById("mkQuizFeedback");

const unitToCm = {
  mm: 0.1,
  cm: 1,
  m: 100,
  km: 100000,
};

const compareScales = [5000, 10000, 25000, 50000, 100000, 250000, 500000];

const stepDetails = [
  {
    title: "1. Was ist ein Massstab?",
    text: "Der Massstab 1:n bedeutet: 1 Laengeneinheit auf der Karte entspricht n gleichen Laengeneinheiten in Wirklichkeit.",
    points: [
      "Beispiel: 1:50000 heisst 1 cm auf der Karte = 50000 cm in Wirklichkeit.",
      "50000 cm entsprechen 500 m.",
      "Der Massstab ist ein Verhaeltnis, keine eigene Einheit.",
    ],
  },
  {
    title: "2. Karte -> Wirklichkeit",
    text: "Du misst auf der Karte und multiplizierst mit n.",
    points: [
      "Formel: Wirklichkeit = Kartenstrecke * n.",
      "Danach in m oder km umrechnen.",
      "Typischer Fehler: Einheiten nicht angleichen.",
    ],
  },
  {
    title: "3. Wirklichkeit -> Karte",
    text: "Du startest mit der realen Strecke und teilst durch n.",
    points: [
      "Formel: Kartenstrecke = Wirklichkeit : n.",
      "Fuer den Atlas brauchst du oft cm oder mm.",
      "Plausibilitaet: Die Kartenstrecke muss deutlich kleiner sein als die Wirklichkeit.",
    ],
  },
  {
    title: "4. Plausibilitaet pruefen",
    text: "Rechnen reicht nicht, das Ergebnis muss auch sinnvoll sein.",
    points: [
      "Kleiner Massstab (z. B. 1:500000) zeigt grossen Ausschnitt mit weniger Details.",
      "Grosser Massstab (z. B. 1:10000) zeigt kleinen Ausschnitt mit vielen Details.",
      "Wenn 2 cm auf der Karte nur 2 m ergeben, stimmt meist etwas nicht.",
    ],
  },
];

const posters = {
  1: {
    src: "../../../assets/erdkunde/massstab-in-karten-uebersicht-1.png",
    caption: "Plakat 1: Grundlagen und typische Rechenwege.",
  },
  2: {
    src: "../../../assets/erdkunde/massstab-in-karten-uebersicht-2.png",
    caption: "Plakat 2: Vertiefung mit Anwendungsbeispielen.",
  },
};

const calcScenarios = [
  { mode: "karte-real", n: 50000, value: 4, inUnit: "cm", outUnit: "km" },
  { mode: "karte-real", n: 25000, value: 7.2, inUnit: "cm", outUnit: "m" },
  { mode: "real-karte", n: 100000, value: 12, inUnit: "km", outUnit: "cm" },
  { mode: "real-karte", n: 5000, value: 850, inUnit: "m", outUnit: "cm" },
];

const conceptPool = [
  {
    prompt: "Was bedeutet der Massstab 1:100000?",
    options: [
      "1 cm Karte entspricht 100000 cm Wirklichkeit.",
      "100000 cm Karte entspricht 1 cm Wirklichkeit.",
      "1 km Karte entspricht 100000 km Wirklichkeit.",
      "Die Karte ist 100000 mal groesser als echt.",
    ],
    correct: 0,
    explanation: "1:n wird immer als Karte zu Wirklichkeit in gleicher Einheit gelesen.",
  },
  {
    prompt: "Welche Aussage ist richtig?",
    options: [
      "1:10000 ist ein groesserer Massstab als 1:500000.",
      "1:500000 ist immer genauer als 1:10000.",
      "1:10000 und 1:500000 zeigen gleich viele Details.",
      "Je groesser n, desto mehr Details.",
    ],
    correct: 0,
    explanation: "Kleineres n bedeutet groessere Darstellung und mehr Details.",
  },
  {
    prompt: "Was musst du vor jeder Massstabsrechnung zuerst klaeren?",
    options: [
      "Ob die Einheiten zusammenpassen.",
      "Ob die Karte farbig ist.",
      "Ob Norden oben liegt.",
      "Ob der Atlas alt oder neu ist.",
    ],
    correct: 0,
    explanation: "Einheiten muessen vor dem Rechnen vereinheitlicht werden.",
  },
  {
    prompt: "Welche Formel passt zu Wirklichkeit -> Karte?",
    options: [
      "Kartenstrecke = Wirklichkeit : n",
      "Kartenstrecke = Wirklichkeit * n",
      "Wirklichkeit = Kartenstrecke : n",
      "n = Kartenstrecke + Wirklichkeit",
    ],
    correct: 0,
    explanation: "Beim Verkleinern von echt auf Karte wird durch n geteilt.",
  },
  {
    prompt: "Wann nutzt man eher einen kleinen Massstab (z. B. 1:1000000)?",
    options: [
      "Wenn man sehr grosse Gebiete auf einmal sehen will.",
      "Wenn man einzelne Haeuser genau sehen will.",
      "Wenn man Millimeter genau messen will.",
      "Wenn man nur kurze Fusswege plant.",
    ],
    correct: 0,
    explanation: "Kleine Massstaebe zeigen grosse Gebiete, aber weniger Details.",
  },
];

const scenarioPool = [
  {
    prompt: "Du planst einen Spaziergang in einer Stadt mit vielen Strassen und Abzweigungen.",
    correct: "1:10000",
    options: ["1:10000", "1:500000", "1:2000000", "1:5000000"],
    explanation: "Fuer viele Details in kleinem Gebiet passt ein grosser Massstab wie 1:10000.",
  },
  {
    prompt: "Du moechtest den Verlauf einer Reise durch ganz Deutschland ueberblicken.",
    correct: "1:1000000",
    options: ["1:10000", "1:25000", "1:1000000", "1:5000"],
    explanation: "Fuer grosse Gebiete braucht man einen kleineren Massstab wie 1:1000000.",
  },
  {
    prompt: "Du suchst den besten Weg durch ein Wandergebiet mit Hoehenlinien.",
    correct: "1:25000",
    options: ["1:25000", "1:2000000", "1:5000000", "1:1000000"],
    explanation: "Wanderkarten brauchen viele Details, deshalb z. B. 1:25000.",
  },
  {
    prompt: "Du willst die Lage der Kontinente auf einen Blick sehen.",
    correct: "1:50000000",
    options: ["1:5000", "1:50000", "1:500000", "1:50000000"],
    explanation: "Fuer Weltkarten sind sehr kleine Massstaebe noetig, z. B. 1:50000000.",
  },
];

let conceptTask = null;
let conceptAnswered = false;
let mathTask = null;
let mathAnswered = false;
let scenarioTask = null;
let scenarioAnswered = false;

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

function parseNumberInput(value) {
  let cleaned = String(value || "").trim().replace(/\s+/g, "");
  if (!cleaned) {
    return Number.NaN;
  }
  if (cleaned.includes(",") && cleaned.includes(".")) {
    cleaned = cleaned.replace(/\./g, "").replace(",", ".");
  } else if (/^\d{1,3}(\.\d{3})+$/.test(cleaned)) {
    cleaned = cleaned.replace(/\./g, "");
  } else {
    cleaned = cleaned.replace(",", ".");
  }
  return Number(cleaned);
}

function formatNumber(value, maxDecimals = 3) {
  const rounded = Number(Number(value).toFixed(maxDecimals));
  return rounded.toLocaleString("de-DE", { maximumFractionDigits: maxDecimals });
}

function formatScale(n) {
  return Math.round(n).toLocaleString("de-DE");
}

function toCm(value, unit) {
  return value * unitToCm[unit];
}

function fromCm(value, unit) {
  return value / unitToCm[unit];
}

function nearlyEqual(a, b, tolerance = 1e-3) {
  return Math.abs(a - b) <= tolerance;
}

function setFeedback(element, kind, text) {
  element.innerHTML = `<p class="feedback ${kind}">${text}</p>`;
}

function renderAnswerButtons(container, options) {
  container.innerHTML = options
    .map((option, index) => `<button type="button" class="mk-answer-btn" data-index="${index}">${option}</button>`)
    .join("");
}

function setupTabs() {
  mkTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;
      mkTabButtons.forEach((entry) => entry.classList.remove("is-active"));
      mkTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${tab}`).classList.add("is-active");
    });
  });
}

function setStep(stepIndex) {
  const detail = stepDetails[stepIndex];
  if (!detail) {
    return;
  }
  mkStepTitle.textContent = detail.title;
  mkStepText.textContent = detail.text;
  mkStepList.innerHTML = detail.points.map((point) => `<li>${point}</li>`).join("");
  mkStepButtons.forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.step) === stepIndex);
  });
}

function setupSteps() {
  mkStepButtons.forEach((button) => {
    button.addEventListener("click", () => setStep(Number(button.dataset.step)));
  });
  setStep(0);
}

function setPoster(posterId) {
  const poster = posters[posterId];
  if (!poster) {
    return;
  }
  mkPosterImage.src = poster.src;
  mkPosterCaption.textContent = poster.caption;
  mkPosterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.poster === String(posterId));
  });
}

function setupPosters() {
  mkPosterButtons.forEach((button) => {
    button.addEventListener("click", () => setPoster(Number(button.dataset.poster)));
  });
}

function runCalc() {
  const mode = mkMode.value;
  const n = Number(mkScaleN.value);
  const inValue = parseNumberInput(mkInputValue.value);
  const inUnit = mkInputUnit.value;
  const outUnit = mkOutputUnit.value;

  if (!Number.isFinite(inValue) || inValue <= 0) {
    mkCalcResult.innerHTML = '<p class="feedback bad">Bitte gib eine positive Strecke ein.</p>';
    return;
  }
  if (!Number.isFinite(n) || n <= 1) {
    mkCalcResult.innerHTML = '<p class="feedback bad">Bitte gib fuer n eine Zahl groesser als 1 ein.</p>';
    return;
  }

  const inputCm = toCm(inValue, inUnit);
  const resultCm = mode === "karte-real" ? inputCm * n : inputCm / n;
  const resultValue = fromCm(resultCm, outUnit);
  const stepFormula = mode === "karte-real" ? "*" : ":";

  mkCalcResult.innerHTML = [
    `<p class="mk-calc-main">Ergebnis: ${formatNumber(resultValue)} ${outUnit}</p>`,
    `<p>Schritt 1: ${formatNumber(inValue)} ${inUnit} = ${formatNumber(inputCm)} cm</p>`,
    `<p>Schritt 2: ${formatNumber(inputCm)} ${stepFormula} ${mode === "karte-real" ? formatScale(n) : formatScale(n)} = ${formatNumber(resultCm)} cm</p>`,
    `<p>Schritt 3: ${formatNumber(resultCm)} cm = ${formatNumber(resultValue)} ${outUnit}</p>`,
  ].join("");
}

function applyCalcScenario() {
  const scenario = choose(calcScenarios);
  mkMode.value = scenario.mode;
  mkScaleN.value = String(scenario.n);
  mkInputValue.value = String(scenario.value).replace(".", ",");
  mkInputUnit.value = scenario.inUnit;
  mkOutputUnit.value = scenario.outUnit;
  runCalc();
}

function setupCalc() {
  mkCalcRun.addEventListener("click", runCalc);
  mkCalcScenario.addEventListener("click", applyCalcScenario);
  runCalc();
}

function updateScaleCompare() {
  const index = Number(mkScaleSlider.value);
  const scale = compareScales[index];
  const realCm = 10 * scale;
  const realKm = realCm / 100000;

  const detailText =
    scale <= 25000
      ? "Grosser Massstab: viel Detail, kleiner Ausschnitt."
      : scale <= 100000
        ? "Mittlerer Bereich: Kompromiss aus Uebersicht und Detail."
        : "Kleiner Massstab: grosser Ausschnitt, weniger Detail.";

  mkScaleLabel.textContent = `Aktuell: 1:${formatScale(scale)}`;
  mkScaleExplain.textContent = detailText;
  mkScaleArea.textContent = `10 cm Kartenbreite entsprechen hier ${formatNumber(realKm, 2)} km in Wirklichkeit.`;

  const fillPercent = ((index + 1) / compareScales.length) * 100;
  mkScaleBar.style.width = `${fillPercent}%`;
}

function setupScaleCompare() {
  mkScaleSlider.addEventListener("input", updateScaleCompare);
  updateScaleCompare();
}

function showConceptTask() {
  conceptTask = choose(conceptPool);
  conceptAnswered = false;
  mkConceptPrompt.textContent = conceptTask.prompt;
  renderAnswerButtons(mkConceptAnswers, conceptTask.options);
  mkConceptFeedback.innerHTML = "";
}

function answerConceptTask(index) {
  if (!conceptTask || conceptAnswered) {
    return;
  }
  const selected = Number(index);
  const isCorrect = selected === conceptTask.correct;
  conceptAnswered = true;

  mkConceptAnswers.querySelectorAll(".mk-answer-btn").forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === conceptTask.correct) {
      button.classList.add("is-correct");
    } else if (buttonIndex === selected) {
      button.classList.add("is-wrong");
    }
  });

  setFeedback(
    mkConceptFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect ? `Richtig. ${conceptTask.explanation}` : `Nicht korrekt. ${conceptTask.explanation}`
  );
}

function pickOutputUnitForValue(cmValue) {
  if (cmValue >= 100000) {
    return "km";
  }
  if (cmValue >= 100) {
    return "m";
  }
  return "cm";
}

function createMathTask() {
  const type = choose(["karte-real", "real-karte", "scale-find"]);

  if (type === "karte-real") {
    const n = choose(compareScales);
    const mapUnit = choose(["cm", "mm"]);
    const mapValue = mapUnit === "cm" ? choose([1.5, 2, 3, 4, 5.5, 7]) : choose([12, 20, 35, 48, 60]);
    const mapCm = toCm(mapValue, mapUnit);
    const realCm = mapCm * n;
    const outUnit = pickOutputUnitForValue(realCm);
    const answer = fromCm(realCm, outUnit);
    return {
      prompt: `Karte -> Wirklichkeit: ${formatNumber(mapValue)} ${mapUnit} bei 1:${formatScale(n)}. Wie gross ist die echte Strecke?`,
      answer,
      unit: outUnit,
      tolerance: Math.max(0.01, Math.abs(answer) * 0.002),
      explanation: `${formatNumber(mapCm)} cm * ${formatScale(n)} = ${formatNumber(realCm)} cm = ${formatNumber(answer)} ${outUnit}.`,
    };
  }

  if (type === "real-karte") {
    const n = choose(compareScales);
    const realUnit = choose(["m", "km"]);
    const realValue = realUnit === "m" ? choose([300, 450, 800, 1200, 2500]) : choose([1.2, 2.5, 4, 7.5, 12]);
    const realCm = toCm(realValue, realUnit);
    const mapCm = realCm / n;
    const outUnit = mapCm < 1 ? "mm" : "cm";
    const answer = outUnit === "mm" ? mapCm * 10 : mapCm;
    return {
      prompt: `Wirklichkeit -> Karte: ${formatNumber(realValue)} ${realUnit} bei 1:${formatScale(n)}. Wie lang ist die Strecke auf der Karte?`,
      answer,
      unit: outUnit,
      tolerance: Math.max(0.01, Math.abs(answer) * 0.002),
      explanation: `${formatNumber(realCm)} cm : ${formatScale(n)} = ${formatNumber(mapCm)} cm = ${formatNumber(answer)} ${outUnit}.`,
    };
  }

  const n = choose(compareScales);
  const mapCm = choose([2, 3, 4, 5, 6, 8]);
  const realCm = mapCm * n;
  const realUnit = realCm >= 100000 ? "km" : "m";
  const realValue = fromCm(realCm, realUnit);
  return {
    prompt: `Massstab suchen: ${mapCm} cm auf der Karte entsprechen ${formatNumber(realValue)} ${realUnit} in Wirklichkeit. Bestimme n.`,
    answer: n,
    unit: "n",
    tolerance: 0.5,
    explanation: `${formatNumber(realCm)} cm : ${mapCm} cm = ${formatScale(n)}. Also 1:${formatScale(n)}.`,
  };
}

function showMathTask() {
  mathTask = createMathTask();
  mathAnswered = false;
  mkMathPrompt.textContent = mathTask.prompt;
  mkMathInput.value = "";
  mkMathUnit.textContent = mathTask.unit === "n" ? "n" : mathTask.unit;
  mkMathFeedback.innerHTML = "";
}

function checkMathTask() {
  if (!mathTask || mathAnswered) {
    return;
  }
  const value = parseNumberInput(mkMathInput.value);
  if (!Number.isFinite(value)) {
    setFeedback(mkMathFeedback, "info", "Bitte gib eine gueltige Zahl ein.");
    return;
  }

  mathAnswered = true;
  const isCorrect = nearlyEqual(value, mathTask.answer, mathTask.tolerance);
  const answerLabel =
    mathTask.unit === "n" ? `1:${formatScale(mathTask.answer)}` : `${formatNumber(mathTask.answer)} ${mathTask.unit}`;
  setFeedback(
    mkMathFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect ? `Richtig. ${mathTask.explanation}` : `Nicht korrekt. Richtige Loesung: ${answerLabel}. ${mathTask.explanation}`
  );
}

function showScenarioTask() {
  scenarioTask = choose(scenarioPool);
  scenarioAnswered = false;
  mkScenarioPrompt.textContent = scenarioTask.prompt;
  renderAnswerButtons(mkScenarioAnswers, shuffle([...scenarioTask.options]));
  mkScenarioFeedback.innerHTML = "";
}

function answerScenarioTask(index) {
  if (!scenarioTask || scenarioAnswered) {
    return;
  }
  const buttonList = [...mkScenarioAnswers.querySelectorAll(".mk-answer-btn")];
  const selectedIndex = Number(index);
  const selectedText = buttonList[selectedIndex]?.textContent || "";
  const correctIndex = buttonList.findIndex((button) => button.textContent === scenarioTask.correct);
  const isCorrect = selectedText === scenarioTask.correct;
  scenarioAnswered = true;

  buttonList.forEach((button, idx) => {
    button.disabled = true;
    if (idx === correctIndex) {
      button.classList.add("is-correct");
    } else if (idx === selectedIndex) {
      button.classList.add("is-wrong");
    }
  });

  setFeedback(
    mkScenarioFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect ? `Richtig. ${scenarioTask.explanation}` : `Nicht korrekt. ${scenarioTask.explanation}`
  );
}

const quizKnowledgePool = [
  {
    prompt: "Welche Aussage beschreibt den Massstab korrekt?",
    options: [
      "Er verbindet eine Kartenstrecke mit der passenden Wirklichkeitsstrecke.",
      "Er gibt die Wetterlage auf der Karte an.",
      "Er ersetzt die Legende der Karte.",
      "Er zeigt nur Himmelsrichtungen.",
    ],
    correct: 0,
    explanation: "Der Massstab ist das Verhaeltnis von Karte zu Wirklichkeit.",
  },
  {
    prompt: "Welche Karte zeigt typischerweise den groessten Ausschnitt?",
    options: ["1:5000000", "1:10000", "1:25000", "1:5000"],
    correct: 0,
    explanation: "Je groesser n, desto kleiner der Massstab und desto groesser der Ausschnitt.",
  },
  {
    prompt: "Welche Rechnung ist richtig fuer Karte -> Wirklichkeit?",
    options: [
      "Kartenstrecke * n",
      "Kartenstrecke : n",
      "n : Kartenstrecke",
      "Kartenstrecke - n",
    ],
    correct: 0,
    explanation: "Von Karte nach echt wird mit n multipliziert.",
  },
  {
    prompt: "Welche Einheitengleichung ist korrekt?",
    options: ["1 km = 100000 cm", "1 km = 10000 cm", "1 m = 10 cm", "1 cm = 100 m"],
    correct: 0,
    explanation: "1 km = 1000 m = 100000 cm.",
  },
  {
    prompt: "Wann ist 1:25000 sinnvoll?",
    options: [
      "Bei detaillierten Wander- oder Ortskarten.",
      "Bei einer Weltkarte in einem Buch.",
      "Nur bei Wetterkarten.",
      "Nur bei Satellitenbildern.",
    ],
    correct: 0,
    explanation: "1:25000 liefert viele Details in einem kleineren Gebiet.",
  },
  {
    prompt: "Was bedeutet eine Verdoppelung der Kartenstrecke bei gleichem Massstab?",
    options: [
      "Die Wirklichkeitsstrecke verdoppelt sich ebenfalls.",
      "Die Wirklichkeitsstrecke halbiert sich.",
      "Der Massstab wird kleiner.",
      "Es aendert sich nichts.",
    ],
    correct: 0,
    explanation: "Bei festem n ist die Zuordnung proportional.",
  },
];

function createQuizMathQuestion() {
  const task = createMathTask();
  return {
    type: "input",
    prompt: task.prompt,
    answer: task.answer,
    unit: task.unit,
    tolerance: task.tolerance,
    explanation: task.explanation,
    context: task.unit === "n" ? "Gib nur die Zahl n ein (ohne 1:)." : `Ergebnis in ${task.unit} angeben.`,
  };
}

function createQuizScenarioQuestion() {
  const base = choose(scenarioPool);
  const options = shuffle([...base.options]);
  return {
    type: "mc",
    prompt: `Welche Massstabsangabe passt am besten? ${base.prompt}`,
    options,
    correct: options.indexOf(base.correct),
    explanation: base.explanation,
  };
}

function generateQuizSet() {
  const knowledge = shuffle([...quizKnowledgePool]).slice(0, 4).map((entry) => ({
    type: "mc",
    prompt: entry.prompt,
    options: [...entry.options],
    correct: entry.correct,
    explanation: entry.explanation,
  }));

  const mathQuestions = [];
  const mathPrompts = new Set();
  while (mathQuestions.length < 4) {
    const item = createQuizMathQuestion();
    if (!mathPrompts.has(item.prompt)) {
      mathPrompts.add(item.prompt);
      mathQuestions.push(item);
    }
  }

  const scenarioQuestions = [];
  const scenarioPrompts = new Set();
  while (scenarioQuestions.length < 2) {
    const item = createQuizScenarioQuestion();
    if (!scenarioPrompts.has(item.prompt)) {
      scenarioPrompts.add(item.prompt);
      scenarioQuestions.push(item);
    }
  }

  return shuffle([...knowledge, ...mathQuestions, ...scenarioQuestions]);
}

function updateQuizScore() {
  mkQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  mkQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  mkQuizPrompt.textContent = question.prompt;
  mkQuizFeedback.innerHTML = "";
  mkQuizNext.disabled = true;
  mkQuizNext.textContent =
    quizState.index === quizState.questions.length - 1 ? "Ergebnis anzeigen" : "Naechste Frage";

  if (question.context) {
    mkQuizContext.hidden = false;
    mkQuizContext.textContent = question.context;
  } else {
    mkQuizContext.hidden = true;
    mkQuizContext.textContent = "";
  }

  if (question.type === "mc") {
    renderAnswerButtons(mkQuizAnswers, question.options);
    return;
  }

  mkQuizAnswers.innerHTML = [
    '<div class="mk-input-row">',
    '<label for="mkQuizInput">Antwort:</label>',
    '<input id="mkQuizInput" type="text" autocomplete="off" placeholder="Zahl eingeben">',
    `<span class="mk-unit-chip">${question.unit === "n" ? "n" : question.unit}</span>`,
    '<button id="mkQuizCheck" type="button">Antwort pruefen</button>',
    "</div>",
  ].join("");
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

  mkQuizAnswers.querySelectorAll(".mk-answer-btn").forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === question.correct) {
      button.classList.add("is-correct");
    } else if (buttonIndex === selected) {
      button.classList.add("is-wrong");
    }
  });

  updateQuizScore();
  mkQuizNext.disabled = false;
  setFeedback(
    mkQuizFeedback,
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

  const input = document.getElementById("mkQuizInput");
  if (!(input instanceof HTMLInputElement)) {
    return;
  }

  const value = parseNumberInput(input.value);
  if (!Number.isFinite(value)) {
    setFeedback(mkQuizFeedback, "info", "Bitte gib eine gueltige Zahl ein.");
    return;
  }

  const isCorrect = nearlyEqual(value, question.answer, question.tolerance);
  quizState.answered = true;
  if (isCorrect) {
    quizState.correct += 1;
  }

  const checkButton = document.getElementById("mkQuizCheck");
  if (checkButton instanceof HTMLButtonElement) {
    checkButton.disabled = true;
  }

  const answerText =
    question.unit === "n" ? `1:${formatScale(question.answer)}` : `${formatNumber(question.answer)} ${question.unit}`;
  updateQuizScore();
  mkQuizNext.disabled = false;
  setFeedback(
    mkQuizFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect ? `Richtig. ${question.explanation}` : `Nicht korrekt. Richtige Loesung: ${answerText}. ${question.explanation}`
  );
}

function startQuiz() {
  quizState.running = true;
  quizState.answered = false;
  quizState.index = 0;
  quizState.correct = 0;
  quizState.questions = generateQuizSet();

  mkQuizStart.textContent = "Test neu starten";
  updateQuizScore();
  renderQuizQuestion();
}

function finishQuiz() {
  const percent = Math.round((quizState.correct / quizState.questions.length) * 100);
  quizState.running = false;
  mkQuizStatus.textContent = "Test beendet";
  mkQuizPrompt.textContent = `Ergebnis: ${quizState.correct}/${quizState.questions.length} (${percent}%)`;
  mkQuizContext.hidden = true;
  mkQuizContext.textContent = "";
  mkQuizAnswers.innerHTML = "";
  mkQuizNext.disabled = true;

  const message =
    percent >= 80
      ? "Sehr gut. Du kannst den Massstab in Karten sicher anwenden."
      : "Gut gearbeitet. Wiederhole besonders Einheitenumrechnung und Rechenrichtung.";
  setFeedback(mkQuizFeedback, percent >= 80 ? "ok" : "info", message);
}

function nextQuizQuestion() {
  if (!quizState.running) {
    return;
  }
  if (!quizState.answered) {
    setFeedback(mkQuizFeedback, "info", "Bitte zuerst die aktuelle Frage beantworten.");
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
  setupSteps();
  setupPosters();
  setupCalc();
  setupScaleCompare();

  showConceptTask();
  mkConceptNext.addEventListener("click", showConceptTask);
  mkConceptAnswers.addEventListener("click", (event) => {
    const button = event.target;
    if (!(button instanceof HTMLButtonElement) || !button.classList.contains("mk-answer-btn")) {
      return;
    }
    answerConceptTask(button.dataset.index);
  });

  showMathTask();
  mkMathNext.addEventListener("click", showMathTask);
  mkMathCheck.addEventListener("click", checkMathTask);
  mkMathInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      checkMathTask();
    }
  });

  showScenarioTask();
  mkScenarioNext.addEventListener("click", showScenarioTask);
  mkScenarioAnswers.addEventListener("click", (event) => {
    const button = event.target;
    if (!(button instanceof HTMLButtonElement) || !button.classList.contains("mk-answer-btn")) {
      return;
    }
    answerScenarioTask(button.dataset.index);
  });

  mkQuizStart.addEventListener("click", startQuiz);
  mkQuizNext.addEventListener("click", nextQuizQuestion);
  mkQuizAnswers.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target instanceof HTMLButtonElement && target.classList.contains("mk-answer-btn")) {
      answerQuizMc(target.dataset.index);
      return;
    }
    if (target instanceof HTMLButtonElement && target.id === "mkQuizCheck") {
      answerQuizInput();
    }
  });
  mkQuizAnswers.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }
    const target = event.target;
    if (target instanceof HTMLInputElement && target.id === "mkQuizInput") {
      answerQuizInput();
    }
  });
}

bootstrap();
