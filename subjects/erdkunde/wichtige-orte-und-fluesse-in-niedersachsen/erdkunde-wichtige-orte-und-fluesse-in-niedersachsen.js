const nioTabButtons = document.querySelectorAll(".nio-tab-btn");
const nioTabPanels = document.querySelectorAll(".nio-tab");

const nioStepButtons = document.querySelectorAll(".nio-step-btn");
const nioStepTitle = document.getElementById("nioStepTitle");
const nioStepText = document.getElementById("nioStepText");
const nioStepList = document.getElementById("nioStepList");

const nioKnowledgePrompt = document.getElementById("nioKnowledgePrompt");
const nioKnowledgeAnswers = document.getElementById("nioKnowledgeAnswers");
const nioKnowledgeNext = document.getElementById("nioKnowledgeNext");
const nioKnowledgeFeedback = document.getElementById("nioKnowledgeFeedback");

const nioGridPrompt = document.getElementById("nioGridPrompt");
const nioGridMap = document.getElementById("nioGridMap");
const nioGridInput = document.getElementById("nioGridInput");
const nioGridCheck = document.getElementById("nioGridCheck");
const nioGridNext = document.getElementById("nioGridNext");
const nioGridFeedback = document.getElementById("nioGridFeedback");

const nioGeoPrompt = document.getElementById("nioGeoPrompt");
const nioGeoAnswers = document.getElementById("nioGeoAnswers");
const nioGeoNext = document.getElementById("nioGeoNext");
const nioGeoFeedback = document.getElementById("nioGeoFeedback");

const nioQuizStart = document.getElementById("nioQuizStart");
const nioQuizNext = document.getElementById("nioQuizNext");
const nioQuizScore = document.getElementById("nioQuizScore");
const nioQuizStatus = document.getElementById("nioQuizStatus");
const nioQuizPrompt = document.getElementById("nioQuizPrompt");
const nioQuizContext = document.getElementById("nioQuizContext");
const nioQuizAnswers = document.getElementById("nioQuizAnswers");
const nioQuizFeedback = document.getElementById("nioQuizFeedback");

const columns = ["A", "B", "C", "D", "E"];
const directions = {
  "0,1": "Norden",
  "1,1": "Nordosten",
  "1,0": "Osten",
  "1,-1": "Suedosten",
  "0,-1": "Sueden",
  "-1,-1": "Suedwesten",
  "-1,0": "Westen",
  "-1,1": "Nordwesten",
};

const cities = [
  { name: "Aurich", coord: "A5", x: 0, y: 5, mapX: 72, mapY: 72, kind: "Stadt" },
  { name: "Bremerhaven", coord: "B5", x: 1, y: 5, mapX: 175, mapY: 52, kind: "Stadt" },
  { name: "Oldenburg", coord: "B4", x: 1, y: 4, mapX: 158, mapY: 126, kind: "Stadt" },
  { name: "Lueneburg", coord: "D4", x: 3, y: 4, mapX: 378, mapY: 122, kind: "Stadt" },
  { name: "Osnabrueck", coord: "A3", x: 0, y: 3, mapX: 95, mapY: 195, kind: "Stadt" },
  { name: "Hannover", coord: "C3", x: 2, y: 3, mapX: 270, mapY: 185, kind: "Landeshauptstadt" },
  { name: "Braunschweig", coord: "D3", x: 3, y: 3, mapX: 360, mapY: 198, kind: "Stadt" },
  { name: "Goettingen", coord: "C1", x: 2, y: 1, mapX: 282, mapY: 298, kind: "Stadt" },
];

const rivers = [
  { name: "Weser", fact: "fliesst von Sueden nach Norden und muendet in die Nordsee." },
  { name: "Ems", fact: "fliesst durch den Westen Niedersachsens Richtung Nordsee." },
  { name: "Elbe", fact: "bildet teilweise die Nordost-Grenze Niedersachsens." },
  { name: "Leine", fact: "fliesst durch Hannover und muendet spaeter in die Aller." },
  { name: "Aller", fact: "fliesst durch den Osten Niedersachsens und zur Weser." },
];

const landscapes = [
  { name: "Harz", clue: "Mittelgebirge im Suedosten mit hohen Bergen." },
  { name: "Lueneburger Heide", clue: "Grosse Heidelandschaft im Nordosten." },
  { name: "Weserbergland", clue: "Huegelige Landschaft zwischen Weser und Harz." },
  { name: "Nordsee und Kueste", clue: "Wattenmeer, Inseln und Kuestenraum." },
  { name: "Muensterland", clue: "Flaches Land im Westen mit Feldern und Hoefen." },
];

const stepDetails = [
  {
    title: "1. Orientierung in Niedersachsen",
    text: "Bestimme zuerst die Lage im Norden, Sueden, Westen und Osten sowie die Nachbarlaender.",
    points: [
      "Im Norden grenzt Niedersachsen an die Nordsee.",
      "Wichtige Nachbarbundeslaender: Bremen, Hamburg, NRW, Hessen, Thueringen, Sachsen-Anhalt.",
      "Nutze immer den Nordpfeil fuer sichere Richtungen.",
    ],
  },
  {
    title: "2. Staedte sicher zuordnen",
    text: "Pruefe grob die Lage grosser Staedte und merke dir die Landeshauptstadt.",
    points: [
      "Hannover liegt eher zentral und ist die Landeshauptstadt.",
      "Bremerhaven liegt kuestennah im Norden.",
      "Goettingen liegt deutlich im Sueden des Landes.",
    ],
  },
  {
    title: "3. Fluesse lesen und deuten",
    text: "Folge dem Verlauf von Flussnamen und achte auf Richtung und Muendung.",
    points: [
      "Weser, Ems und Elbe sind besonders wichtige Fluesse.",
      "Fluesse verbinden Landschaften, Staedte und Wirtschaftsraeume.",
      "Flusslagen helfen bei Lagebeschreibungen in Aufgaben.",
    ],
  },
  {
    title: "4. Landschaften unterscheiden",
    text: "Vergleiche Naturraeume mit ihren typischen Merkmalen.",
    points: [
      "Harz = Mittelgebirge, Heide = flache Heidelandschaft.",
      "Weserbergland = huegelig, Kueste = maritim und vom Wattenmeer gepraegt.",
      "Nutze Farben und Legende der Karte fuer sichere Deutung.",
    ],
  },
];

const knowledgePool = [
  {
    prompt: "Welche Stadt ist die Landeshauptstadt von Niedersachsen?",
    options: ["Hannover", "Braunschweig", "Osnabrueck", "Lueneburg"],
    correct: 0,
    explanation: "Hannover ist die Landeshauptstadt Niedersachsens.",
  },
  {
    prompt: "Woran grenzt Niedersachsen im Norden?",
    options: ["An die Nordsee", "An die Ostsee", "An die Alpen", "An die Schweiz"],
    correct: 0,
    explanation: "Niedersachsen hat im Norden eine Kueste zur Nordsee.",
  },
  {
    prompt: "Welche Landschaft liegt im Suedosten Niedersachsens?",
    options: ["Harz", "Nordseeinseln", "Muensterland", "Lueneburger Heide"],
    correct: 0,
    explanation: "Der Harz liegt im Suedosten Niedersachsens.",
  },
  {
    prompt: "Welche Aussage zur Weser passt?",
    options: [
      "Sie fliesst von Sueden nach Norden Richtung Nordsee.",
      "Sie entspringt an der Nordsee.",
      "Sie verlaeuft nur in Bayern.",
      "Sie ist ein Gebirge.",
    ],
    correct: 0,
    explanation: "Die Weser fliesst in Niedersachsen nordwaerts zur Nordsee.",
  },
  {
    prompt: "Welche Stadt liegt eher im Sueden Niedersachsens?",
    options: ["Goettingen", "Bremerhaven", "Aurich", "Oldenburg"],
    correct: 0,
    explanation: "Goettingen liegt deutlich weiter im Sueden.",
  },
];

let knowledgeTask = null;
let knowledgeAnswered = false;
let gridTask = null;
let gridAnswered = false;
let geoTask = null;
let geoAnswered = false;

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
    .map((option, index) => `<button type="button" class="nio-answer-btn" data-index="${index}">${option}</button>`)
    .join("");
}

function normalizeCoord(value) {
  const match = String(value || "").toUpperCase().trim().match(/^([A-E])\s*([1-5])$/);
  if (!match) {
    return "";
  }
  return `${match[1]}${match[2]}`;
}

function setupTabs() {
  nioTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;
      nioTabButtons.forEach((entry) => entry.classList.remove("is-active"));
      nioTabPanels.forEach((panel) => panel.classList.remove("is-active"));
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
  nioStepTitle.textContent = detail.title;
  nioStepText.textContent = detail.text;
  nioStepList.innerHTML = detail.points.map((entry) => `<li>${entry}</li>`).join("");
  nioStepButtons.forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.step) === stepIndex);
  });
}

function setupSteps() {
  nioStepButtons.forEach((button) => {
    button.addEventListener("click", () => setStep(Number(button.dataset.step)));
  });
  setStep(0);
}

function showKnowledgeTask() {
  knowledgeTask = choose(knowledgePool);
  knowledgeAnswered = false;
  nioKnowledgePrompt.textContent = knowledgeTask.prompt;
  renderAnswerButtons(nioKnowledgeAnswers, knowledgeTask.options);
  nioKnowledgeFeedback.innerHTML = "";
}

function answerKnowledgeTask(index) {
  if (!knowledgeTask || knowledgeAnswered) {
    return;
  }
  const selected = Number(index);
  const isCorrect = selected === knowledgeTask.correct;
  knowledgeAnswered = true;

  nioKnowledgeAnswers.querySelectorAll(".nio-answer-btn").forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === knowledgeTask.correct) {
      button.classList.add("is-correct");
    } else if (buttonIndex === selected) {
      button.classList.add("is-wrong");
    }
  });

  setFeedback(
    nioKnowledgeFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect ? `Richtig. ${knowledgeTask.explanation}` : `Nicht korrekt. ${knowledgeTask.explanation}`
  );
}

function coordToSvgCell(coord) {
  const column = coord[0];
  const row = Number(coord.slice(1));
  const colIndex = columns.indexOf(column);
  if (colIndex < 0 || !Number.isFinite(row)) {
    return null;
  }
  return {
    x: colIndex * 100,
    y: (5 - row) * 68,
    width: 100,
    height: 68,
  };
}

function renderGridMap(targetCoord = "", targetElement = nioGridMap, options = {}) {
  const panelClass = options.compact ? " nio-map-panel-compact" : "";
  const shouldHighlight = options.highlight !== false;
  const targetCell = coordToSvgCell(targetCoord);
  const targetStyle = targetCell && shouldHighlight
    ? `style="left:${targetCell.x / 5}%;top:${targetCell.y / 3.4}%;width:${targetCell.width / 5}%;height:${targetCell.height / 3.4}%"`
    : "";
  const targetOverlay = targetStyle
    ? `<span class="nio-map-target" ${targetStyle}></span>`
    : "";
  const columnLabels = columns.map((column) => `<span>${column}</span>`).join("");
  const rowLabels = [5, 4, 3, 2, 1].map((row) => `<span>${row}</span>`).join("");

  let html = [
    `<div class="nio-map-panel${panelClass}">`,
    '<div class="nio-map-head">',
    '<div>',
    '<p class="nio-map-kicker">Uebungskarte Niedersachsen</p>',
    '<h3>Staedte im Raster finden</h3>',
    '</div>',
    '<span class="nio-north">N</span>',
    '</div>',
    '<div class="nio-real-map-wrap">',
    '<img class="nio-real-map" src="../../../assets/erdkunde/niedersachsen-karte-ausschnitt.png" alt="Kartenausschnitt Niedersachsen mit Staedten und Fluessen">',
    '<div class="nio-map-grid" aria-hidden="true"></div>',
    `<div class="nio-map-cols" aria-hidden="true">${columnLabels}</div>`,
    `<div class="nio-map-rows" aria-hidden="true">${rowLabels}</div>`,
    targetOverlay,
    '</div>',
    '<div class="nio-map-legend">',
    '<span><i class="nio-dot nio-dot-capital"></i>Landeshauptstadt</span>',
    '<span><i class="nio-dot"></i>Stadt</span>',
    '<span><i class="nio-line"></i>Fluss/Lagehilfe</span>',
    "</div>",
    "</div>",
  ].join("");
  targetElement.innerHTML = html;
}

function showGridTask() {
  const place = choose(cities);
  gridTask = {
    prompt: `In welchem Planquadrat liegt ${place.name} auf der Uebungskarte?`,
    answer: place.coord,
    explanation: `${place.name} liegt im Planquadrat ${place.coord}.`,
  };
  gridAnswered = false;
  nioGridPrompt.textContent = gridTask.prompt;
  nioGridInput.value = "";
  nioGridFeedback.innerHTML = "";
  renderGridMap(place.coord);
}

function checkGridTask() {
  if (!gridTask || gridAnswered) {
    return;
  }
  const userCoord = normalizeCoord(nioGridInput.value);
  if (!userCoord) {
    setFeedback(nioGridFeedback, "info", "Bitte gib ein gueltiges Planquadrat wie C3 ein.");
    return;
  }

  gridAnswered = true;
  const isCorrect = userCoord === gridTask.answer;
  setFeedback(
    nioGridFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect ? `Richtig. ${gridTask.explanation}` : `Nicht korrekt. ${gridTask.explanation}`
  );
}

function directionBetween(a, b) {
  const dx = Math.sign(b.x - a.x);
  const dy = Math.sign(b.y - a.y);
  return directions[`${dx},${dy}`] || null;
}

function createDirectionQuestion() {
  let start = choose(cities);
  let target = choose(cities);
  while (target.name === start.name) {
    target = choose(cities);
  }
  const direction = directionBetween(start, target);
  if (!direction) {
    return createDirectionQuestion();
  }
  const allDirections = Object.values(directions);
  const options = new Set([direction]);
  shuffle(allDirections).forEach((entry) => {
    if (options.size < 4) {
      options.add(entry);
    }
  });
  const optionList = shuffle([...options]);
  return {
    prompt: `In welche Richtung liegt ${target.name} von ${start.name} aus?`,
    options: optionList,
    correct: optionList.indexOf(direction),
    explanation: `${target.name} liegt ${direction.toLowerCase()} von ${start.name}.`,
  };
}

function createRiverQuestion() {
  const river = choose(rivers);
  const wrongFacts = shuffle(rivers.filter((entry) => entry.name !== river.name))
    .slice(0, 3)
    .map((entry) => entry.fact);
  const options = shuffle([river.fact, ...wrongFacts]);
  return {
    prompt: `Welche Aussage passt zum Fluss ${river.name}?`,
    options,
    correct: options.indexOf(river.fact),
    explanation: `${river.name}: ${river.fact}`,
  };
}

function createLandscapeQuestion() {
  const area = choose(landscapes);
  const wrong = shuffle(landscapes.filter((entry) => entry.name !== area.name))
    .slice(0, 3)
    .map((entry) => entry.clue);
  const options = shuffle([area.clue, ...wrong]);
  return {
    prompt: `Welche Beschreibung gehoert zur Landschaft ${area.name}?`,
    options,
    correct: options.indexOf(area.clue),
    explanation: `${area.name}: ${area.clue}`,
  };
}

function showGeoTask() {
  geoTask = choose([createDirectionQuestion(), createRiverQuestion(), createLandscapeQuestion()]);
  geoAnswered = false;
  nioGeoPrompt.textContent = geoTask.prompt;
  renderAnswerButtons(nioGeoAnswers, geoTask.options);
  nioGeoFeedback.innerHTML = "";
}

function answerGeoTask(index) {
  if (!geoTask || geoAnswered) {
    return;
  }
  const selected = Number(index);
  const isCorrect = selected === geoTask.correct;
  geoAnswered = true;

  nioGeoAnswers.querySelectorAll(".nio-answer-btn").forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === geoTask.correct) {
      button.classList.add("is-correct");
    } else if (buttonIndex === selected) {
      button.classList.add("is-wrong");
    }
  });

  setFeedback(
    nioGeoFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect ? `Richtig. ${geoTask.explanation}` : `Nicht korrekt. ${geoTask.explanation}`
  );
}

const quizKnowledgePool = [
  {
    prompt: "Welche Stadt ist Landeshauptstadt von Niedersachsen?",
    options: ["Hannover", "Oldenburg", "Braunschweig", "Aurich"],
    correct: 0,
    explanation: "Hannover ist die Landeshauptstadt.",
  },
  {
    prompt: "Welche Landschaft liegt im Nordosten Niedersachsens?",
    options: ["Lueneburger Heide", "Harz", "Weserbergland", "Muensterland"],
    correct: 0,
    explanation: "Die Lueneburger Heide liegt im Nordosten.",
  },
  {
    prompt: "Welche Aussage zur Elbe passt?",
    options: [
      "Sie bildet teilweise die Grenze im Nordosten Niedersachsens.",
      "Sie fliesst nur durch Bayern.",
      "Sie muendet direkt in den Bodensee.",
      "Sie ist kein Fluss, sondern ein Gebirge.",
    ],
    correct: 0,
    explanation: "Die Elbe ist ein wichtiger Grenz- und Stromfluss im Nordosten.",
  },
  {
    prompt: "Welche Stadt liegt kuestennah im Norden?",
    options: ["Bremerhaven", "Goettingen", "Braunschweig", "Hannover"],
    correct: 0,
    explanation: "Bremerhaven liegt an der Nordseekueste.",
  },
];

function createQuizGridQuestion() {
  const place = choose(cities);
  return {
    type: "input",
    prompt: `Nenne das Planquadrat von ${place.name} auf der Uebungskarte.`,
    answer: place.coord,
    context: "Antwortformat: Buchstabe + Zahl (z. B. C3).",
    explanation: `${place.name} liegt im Planquadrat ${place.coord}.`,
    showMap: true,
  };
}

function createQuizDirectionQuestion() {
  const task = createDirectionQuestion();
  return {
    type: "mc",
    prompt: task.prompt,
    options: task.options,
    correct: task.correct,
    explanation: task.explanation,
  };
}

function createQuizRiverQuestion() {
  const task = createRiverQuestion();
  return {
    type: "mc",
    prompt: task.prompt,
    options: task.options,
    correct: task.correct,
    explanation: task.explanation,
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

  const coordQuestions = [];
  const coordPrompts = new Set();
  while (coordQuestions.length < 2) {
    const item = createQuizGridQuestion();
    if (!coordPrompts.has(item.prompt)) {
      coordPrompts.add(item.prompt);
      coordQuestions.push(item);
    }
  }

  const dirQuestions = [];
  const dirPrompts = new Set();
  while (dirQuestions.length < 2) {
    const item = createQuizDirectionQuestion();
    if (!dirPrompts.has(item.prompt)) {
      dirPrompts.add(item.prompt);
      dirQuestions.push(item);
    }
  }

  const riverQuestions = [];
  const riverPrompts = new Set();
  while (riverQuestions.length < 2) {
    const item = createQuizRiverQuestion();
    if (!riverPrompts.has(item.prompt)) {
      riverPrompts.add(item.prompt);
      riverQuestions.push(item);
    }
  }

  return shuffle([...knowledge, ...coordQuestions, ...dirQuestions, ...riverQuestions]);
}

function updateQuizScore() {
  nioQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  nioQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  nioQuizPrompt.textContent = question.prompt;
  nioQuizFeedback.innerHTML = "";
  nioQuizNext.disabled = true;
  nioQuizNext.textContent =
    quizState.index === quizState.questions.length - 1 ? "Ergebnis anzeigen" : "Naechste Frage";

  if (question.context) {
    nioQuizContext.hidden = false;
    nioQuizContext.textContent = question.context;
  } else {
    nioQuizContext.hidden = true;
    nioQuizContext.textContent = "";
  }

  if (question.type === "mc") {
    renderAnswerButtons(nioQuizAnswers, question.options);
    return;
  }

  const mapHtml = question.showMap
    ? '<div class="nio-grid-shell nio-quiz-map-shell"><div id="nioQuizGridMap"></div></div>'
    : "";

  nioQuizAnswers.innerHTML = [
    mapHtml,
    question.showMap ? '<div class="nio-map-question-overlay">' : '<div class="nio-input-row">',
    '<label for="nioQuizInput">Antwort:</label>',
    '<input id="nioQuizInput" type="text" autocomplete="off" placeholder="z. B. C3">',
    '<button id="nioQuizCheck" type="button">Antwort pruefen</button>',
    "</div>",
  ].join("");

  const quizGridMap = document.getElementById("nioQuizGridMap");
  if (quizGridMap instanceof HTMLDivElement) {
    renderGridMap("", quizGridMap, { compact: true, highlight: false });
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

  nioQuizAnswers.querySelectorAll(".nio-answer-btn").forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === question.correct) {
      button.classList.add("is-correct");
    } else if (buttonIndex === selected) {
      button.classList.add("is-wrong");
    }
  });

  updateQuizScore();
  nioQuizNext.disabled = false;
  setFeedback(
    nioQuizFeedback,
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
  const input = document.getElementById("nioQuizInput");
  if (!(input instanceof HTMLInputElement)) {
    return;
  }

  const userValue = normalizeCoord(input.value);
  if (!userValue) {
    setFeedback(nioQuizFeedback, "info", "Bitte gib ein gueltiges Planquadrat ein, z. B. C3.");
    return;
  }

  const isCorrect = userValue === question.answer;
  quizState.answered = true;
  if (isCorrect) {
    quizState.correct += 1;
  }

  const checkButton = document.getElementById("nioQuizCheck");
  if (checkButton instanceof HTMLButtonElement) {
    checkButton.disabled = true;
  }

  updateQuizScore();
  nioQuizNext.disabled = false;
  setFeedback(
    nioQuizFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect ? `Richtig. ${question.explanation}` : `Nicht korrekt. ${question.explanation}`
  );
}

function startQuiz() {
  quizState.running = true;
  quizState.answered = false;
  quizState.index = 0;
  quizState.correct = 0;
  quizState.questions = generateQuizSet();
  nioQuizStart.textContent = "Quiz neu starten";
  updateQuizScore();
  renderQuizQuestion();
}

function finishQuiz() {
  const percent = Math.round((quizState.correct / quizState.questions.length) * 100);
  quizState.running = false;
  nioQuizStatus.textContent = "Quiz beendet";
  nioQuizPrompt.textContent = `Ergebnis: ${quizState.correct}/${quizState.questions.length} (${percent}%)`;
  nioQuizContext.hidden = true;
  nioQuizContext.textContent = "";
  nioQuizAnswers.innerHTML = "";
  nioQuizNext.disabled = true;

  const message =
    percent >= 80
      ? "Sehr gut. Du kennst wichtige Orte, Fluesse und Landschaften in Niedersachsen."
      : "Gut gearbeitet. Wiederhole vor allem Flussverlaeufe und Lagebeziehungen.";
  setFeedback(nioQuizFeedback, percent >= 80 ? "ok" : "info", message);
}

function nextQuizQuestion() {
  if (!quizState.running) {
    return;
  }
  if (!quizState.answered) {
    setFeedback(nioQuizFeedback, "info", "Bitte zuerst die aktuelle Frage beantworten.");
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
  renderGridMap();

  showKnowledgeTask();
  showGridTask();
  showGeoTask();

  nioKnowledgeNext.addEventListener("click", showKnowledgeTask);
  nioKnowledgeAnswers.addEventListener("click", (event) => {
    const button = event.target;
    if (!(button instanceof HTMLButtonElement) || !button.classList.contains("nio-answer-btn")) {
      return;
    }
    answerKnowledgeTask(button.dataset.index);
  });

  nioGridCheck.addEventListener("click", checkGridTask);
  nioGridNext.addEventListener("click", showGridTask);
  nioGridInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      checkGridTask();
    }
  });

  nioGeoNext.addEventListener("click", showGeoTask);
  nioGeoAnswers.addEventListener("click", (event) => {
    const button = event.target;
    if (!(button instanceof HTMLButtonElement) || !button.classList.contains("nio-answer-btn")) {
      return;
    }
    answerGeoTask(button.dataset.index);
  });

  nioQuizStart.addEventListener("click", startQuiz);
  nioQuizNext.addEventListener("click", nextQuizQuestion);
  nioQuizAnswers.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target instanceof HTMLButtonElement && target.classList.contains("nio-answer-btn")) {
      answerQuizMc(target.dataset.index);
      return;
    }
    if (target instanceof HTMLButtonElement && target.id === "nioQuizCheck") {
      answerQuizInput();
    }
  });
  nioQuizAnswers.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }
    const target = event.target;
    if (target instanceof HTMLInputElement && target.id === "nioQuizInput") {
      answerQuizInput();
    }
  });
}

bootstrap();
