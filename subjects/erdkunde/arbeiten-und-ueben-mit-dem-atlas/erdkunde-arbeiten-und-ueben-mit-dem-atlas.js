const auaTabButtons = document.querySelectorAll(".aua-tab-btn");
const auaTabPanels = document.querySelectorAll(".aua-tab");

const auaStepButtons = document.querySelectorAll(".aua-step-btn");
const auaStepTitle = document.getElementById("auaStepTitle");
const auaStepText = document.getElementById("auaStepText");
const auaStepList = document.getElementById("auaStepList");

const auaRegisterPrompt = document.getElementById("auaRegisterPrompt");
const auaRegisterAnswers = document.getElementById("auaRegisterAnswers");
const auaRegisterNext = document.getElementById("auaRegisterNext");
const auaRegisterFeedback = document.getElementById("auaRegisterFeedback");

const auaMapTypePrompt = document.getElementById("auaMapTypePrompt");
const auaMapTypeAnswers = document.getElementById("auaMapTypeAnswers");
const auaMapTypeNext = document.getElementById("auaMapTypeNext");
const auaMapTypeFeedback = document.getElementById("auaMapTypeFeedback");

const auaTrainPrompt = document.getElementById("auaTrainPrompt");
const auaTrainAnswers = document.getElementById("auaTrainAnswers");
const auaTrainNext = document.getElementById("auaTrainNext");
const auaTrainFeedback = document.getElementById("auaTrainFeedback");

const auaGridPrompt = document.getElementById("auaGridPrompt");
const auaGridMap = document.getElementById("auaGridMap");
const auaGridInput = document.getElementById("auaGridInput");
const auaGridCheck = document.getElementById("auaGridCheck");
const auaGridNext = document.getElementById("auaGridNext");
const auaGridFeedback = document.getElementById("auaGridFeedback");

const auaDirectionPrompt = document.getElementById("auaDirectionPrompt");
const auaDirectionAnswers = document.getElementById("auaDirectionAnswers");
const auaDirectionNext = document.getElementById("auaDirectionNext");
const auaDirectionFeedback = document.getElementById("auaDirectionFeedback");

const auaQuizStart = document.getElementById("auaQuizStart");
const auaQuizNext = document.getElementById("auaQuizNext");
const auaQuizScore = document.getElementById("auaQuizScore");
const auaQuizStatus = document.getElementById("auaQuizStatus");
const auaQuizPrompt = document.getElementById("auaQuizPrompt");
const auaQuizContext = document.getElementById("auaQuizContext");
const auaQuizAnswers = document.getElementById("auaQuizAnswers");
const auaQuizFeedback = document.getElementById("auaQuizFeedback");

const columns = ["A", "B", "C", "D", "E"];

const atlasPlaces = [
  { name: "Bremen", page: 24, coord: "A4", x: 0, y: 4 },
  { name: "Hamburg", page: 24, coord: "B5", x: 1, y: 5 },
  { name: "Koeln", page: 42, coord: "B2", x: 1, y: 2 },
  { name: "Leipzig", page: 40, coord: "D3", x: 3, y: 3 },
  { name: "Dresden", page: 40, coord: "E2", x: 4, y: 2 },
  { name: "Muenchen", page: 44, coord: "D1", x: 3, y: 1 },
];

const stepDetails = [
  {
    title: "1. Suchbegriff klar machen",
    text: "Klaere zuerst genau, was du suchst: Stadt, Fluss, Gebirge, Land oder Thema.",
    points: [
      "Suche immer mit einem eindeutigen Namen.",
      "Bei gleichen Namen hilft der Kontext (Land, Region).",
      "Markiere Suchbegriffe in der Aufgabenstellung.",
    ],
  },
  {
    title: "2. Register systematisch nutzen",
    text: "Im Register findest du alphabetisch den Ort und daneben Seite plus Planquadrat.",
    points: [
      "Erst im Register suchen, dann Atlasseite aufschlagen.",
      "Notiere Seite und Planquadrat direkt.",
      "Arbeite sauber: z. B. Koeln 42 C3.",
    ],
  },
  {
    title: "3. Seite und Planquadrat lesen",
    text: "Auf der Karte suchst du das Feld aus Buchstabe (waagerecht) und Zahl (senkrecht).",
    points: [
      "Immer erst Buchstabe, dann Zahl nennen.",
      "Vergleiche Buchstaben oben und Zahlen links/rechts.",
      "Suche den Schnittpunkt zielsicher im Kartenraster.",
    ],
  },
  {
    title: "4. Lage fachlich beschreiben",
    text: "Wenn du den Ort gefunden hast, beschreibst du Lagebeziehungen mit Himmelsrichtungen und Nachbarraeumen.",
    points: [
      "Nutze Nord, Sued, Ost, West oder Zwischenrichtungen.",
      "Beziehe Nachbarlaender, Fluesse oder Gebirge ein.",
      "Schreibe in ganzen Atlas-Saetzen.",
    ],
  },
];

const mapTypeCases = [
  {
    prompt: "Du willst Gebirge, Fluesse und Hoehenfarben in Deutschland untersuchen.",
    answer: "Physische Karte",
    explanation: "Naturformen wie Gebirge und Fluesse liest man auf physischen Karten.",
  },
  {
    prompt: "Du suchst Staatsgrenzen und Hauptstaedte in Europa.",
    answer: "Politische Karte",
    explanation: "Grenzen und Hauptstaedte sind Inhalte politischer Karten.",
  },
  {
    prompt: "Du vergleichst Bevoelkerungsdichte in verschiedenen Regionen.",
    answer: "Thematische Karte",
    explanation: "Ein spezielles Thema wie Bevoelkerung zeigt eine thematische Karte.",
  },
  {
    prompt: "Du willst Temperaturzonen der Erde auswerten.",
    answer: "Thematische Karte",
    explanation: "Klima- und Temperaturdaten sind typische thematische Kartenthemen.",
  },
];

const trainKnowledgePool = [
  {
    prompt: "Welche Angabe aus dem Register brauchst du, um den Ort schnell auf der Karte zu finden?",
    options: [
      "Seite und Planquadrat",
      "Nur die Farbe des Landes",
      "Nur den Namen des Kontinents",
      "Nur die Hoehe ueber dem Meer",
    ],
    correct: 0,
    explanation: "Seite + Planquadrat fuehren dich direkt zum Ort.",
  },
  {
    prompt: "Wie gibst du ein Planquadrat korrekt an?",
    options: ["Erst Buchstabe, dann Zahl", "Erst Zahl, dann Buchstabe", "Nur den Buchstaben", "Nur die Zahl"],
    correct: 0,
    explanation: "Das Standardformat lautet Buchstabe + Zahl, z. B. C3.",
  },
  {
    prompt: "Wozu dient die Legende in der Karte?",
    options: [
      "Sie erklaert Symbole, Farben und Zeichen.",
      "Sie zeigt den Stundenplan.",
      "Sie ersetzt das Register.",
      "Sie zeigt nur den Norden.",
    ],
    correct: 0,
    explanation: "Ohne Legende kannst du Symbole und Farben kaum sicher deuten.",
  },
  {
    prompt: "Was ist der beste erste Schritt bei einer Atlasaufgabe?",
    options: [
      "Suchbegriff markieren und im Register nachsehen.",
      "Beliebige Seite aufschlagen.",
      "Nur die Legende lesen.",
      "Direkt Antwort hinschreiben.",
    ],
    correct: 0,
    explanation: "Systematisches Arbeiten startet mit dem Register.",
  },
];

const directionLookup = {
  "0,1": "Norden",
  "1,1": "Nordosten",
  "1,0": "Osten",
  "1,-1": "Suedosten",
  "0,-1": "Sueden",
  "-1,-1": "Suedwesten",
  "-1,0": "Westen",
  "-1,1": "Nordwesten",
};

let registerTask = null;
let registerAnswered = false;
let mapTypeTask = null;
let mapTypeAnswered = false;
let trainTask = null;
let trainAnswered = false;
let gridTask = null;
let gridAnswered = false;
let directionTask = null;
let directionAnswered = false;

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
    .map((option, index) => `<button type="button" class="aua-answer-btn" data-index="${index}">${option}</button>`)
    .join("");
}

function setupTabs() {
  auaTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;
      auaTabButtons.forEach((entry) => entry.classList.remove("is-active"));
      auaTabPanels.forEach((panel) => panel.classList.remove("is-active"));
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
  auaStepTitle.textContent = detail.title;
  auaStepText.textContent = detail.text;
  auaStepList.innerHTML = detail.points.map((entry) => `<li>${entry}</li>`).join("");
  auaStepButtons.forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.step) === stepIndex);
  });
}

function setupSteps() {
  auaStepButtons.forEach((button) => {
    button.addEventListener("click", () => setStep(Number(button.dataset.step)));
  });
  setStep(0);
}

function createRegisterTask() {
  const place = choose(atlasPlaces);
  const correct = `${place.name} ... ${place.page} ${place.coord}`;
  const wrong = shuffle(atlasPlaces.filter((entry) => entry.name !== place.name))
    .slice(0, 3)
    .map((entry) => `${entry.name} ... ${entry.page} ${entry.coord}`);
  const options = shuffle([correct, ...wrong]);
  return {
    prompt: `Suchbegriff im Register: "${place.name}". Welcher Eintrag passt?`,
    options,
    correct: options.indexOf(correct),
    explanation: `Der passende Registereintrag lautet ${correct}.`,
  };
}

function showRegisterTask() {
  registerTask = createRegisterTask();
  registerAnswered = false;
  auaRegisterPrompt.textContent = registerTask.prompt;
  renderAnswerButtons(auaRegisterAnswers, registerTask.options);
  auaRegisterFeedback.innerHTML = "";
}

function answerRegisterTask(index) {
  if (!registerTask || registerAnswered) {
    return;
  }
  const selected = Number(index);
  const isCorrect = selected === registerTask.correct;
  registerAnswered = true;

  auaRegisterAnswers.querySelectorAll(".aua-answer-btn").forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === registerTask.correct) {
      button.classList.add("is-correct");
    } else if (buttonIndex === selected) {
      button.classList.add("is-wrong");
    }
  });

  setFeedback(
    auaRegisterFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect ? `Richtig. ${registerTask.explanation}` : `Nicht korrekt. ${registerTask.explanation}`
  );
}

function createMapTypeTask() {
  const task = choose(mapTypeCases);
  const options = shuffle(["Physische Karte", "Politische Karte", "Thematische Karte"]);
  return {
    prompt: task.prompt,
    options,
    correct: options.indexOf(task.answer),
    explanation: task.explanation,
  };
}

function showMapTypeTask() {
  mapTypeTask = createMapTypeTask();
  mapTypeAnswered = false;
  auaMapTypePrompt.textContent = mapTypeTask.prompt;
  renderAnswerButtons(auaMapTypeAnswers, mapTypeTask.options);
  auaMapTypeFeedback.innerHTML = "";
}

function answerMapTypeTask(index) {
  if (!mapTypeTask || mapTypeAnswered) {
    return;
  }
  const selected = Number(index);
  const isCorrect = selected === mapTypeTask.correct;
  mapTypeAnswered = true;

  auaMapTypeAnswers.querySelectorAll(".aua-answer-btn").forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === mapTypeTask.correct) {
      button.classList.add("is-correct");
    } else if (buttonIndex === selected) {
      button.classList.add("is-wrong");
    }
  });

  setFeedback(
    auaMapTypeFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect ? `Richtig. ${mapTypeTask.explanation}` : `Nicht korrekt. ${mapTypeTask.explanation}`
  );
}

function showTrainTask() {
  trainTask = choose(trainKnowledgePool);
  trainAnswered = false;
  auaTrainPrompt.textContent = trainTask.prompt;
  renderAnswerButtons(auaTrainAnswers, trainTask.options);
  auaTrainFeedback.innerHTML = "";
}

function answerTrainTask(index) {
  if (!trainTask || trainAnswered) {
    return;
  }
  const selected = Number(index);
  const isCorrect = selected === trainTask.correct;
  trainAnswered = true;

  auaTrainAnswers.querySelectorAll(".aua-answer-btn").forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === trainTask.correct) {
      button.classList.add("is-correct");
    } else if (buttonIndex === selected) {
      button.classList.add("is-wrong");
    }
  });

  setFeedback(
    auaTrainFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect ? `Richtig. ${trainTask.explanation}` : `Nicht korrekt. ${trainTask.explanation}`
  );
}

function normalizeCoord(value) {
  const match = String(value || "").toUpperCase().trim().match(/^([A-E])\s*([1-5])$/);
  if (!match) {
    return "";
  }
  return `${match[1]}${match[2]}`;
}

function renderGridMap(targetCoord = "") {
  const placeByCoord = Object.fromEntries(atlasPlaces.map((entry) => [entry.coord, entry]));
  let html = '<table class="aua-grid-table" aria-label="Planquadratkarte"><thead><tr><th></th>';
  columns.forEach((column) => {
    html += `<th scope="col">${column}</th>`;
  });
  html += "</tr></thead><tbody>";

  for (let row = 5; row >= 1; row -= 1) {
    html += `<tr><th scope="row">${row}</th>`;
    columns.forEach((column) => {
      const coord = `${column}${row}`;
      const place = placeByCoord[coord];
      const targetClass = coord === targetCoord ? " is-target" : "";
      const content = place ? `<span class="aua-place-chip">${place.name}</span>` : "";
      html += `<td class="${targetClass}" data-coord="${coord}">${content}</td>`;
    });
    html += "</tr>";
  }
  html += "</tbody></table>";
  auaGridMap.innerHTML = html;
}

function showGridTask() {
  const place = choose(atlasPlaces);
  gridTask = {
    prompt: `In welchem Planquadrat liegt ${place.name} auf der Uebungskarte?`,
    answer: place.coord,
    explanation: `${place.name} liegt im Planquadrat ${place.coord}.`,
  };
  gridAnswered = false;
  auaGridPrompt.textContent = gridTask.prompt;
  auaGridInput.value = "";
  auaGridFeedback.innerHTML = "";
  renderGridMap(place.coord);
}

function checkGridTask() {
  if (!gridTask || gridAnswered) {
    return;
  }
  const userCoord = normalizeCoord(auaGridInput.value);
  if (!userCoord) {
    setFeedback(auaGridFeedback, "info", "Bitte gib ein gueltiges Planquadrat ein, z. B. C3.");
    return;
  }
  gridAnswered = true;
  const isCorrect = userCoord === gridTask.answer;
  setFeedback(
    auaGridFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect ? `Richtig. ${gridTask.explanation}` : `Nicht korrekt. ${gridTask.explanation}`
  );
}

function directionFromPlaces(start, end) {
  const dx = Math.sign(end.x - start.x);
  const dy = Math.sign(end.y - start.y);
  return directionLookup[`${dx},${dy}`] || null;
}

function createDirectionTask() {
  let start = choose(atlasPlaces);
  let end = choose(atlasPlaces);
  while (end.name === start.name) {
    end = choose(atlasPlaces);
  }
  const direction = directionFromPlaces(start, end);
  if (!direction) {
    return createDirectionTask();
  }

  const options = new Set([direction]);
  Object.values(directionLookup).forEach((entry) => {
    if (options.size < 4) {
      options.add(entry);
    }
  });
  const optionList = shuffle([...options]);
  return {
    prompt: `In welche Richtung liegt ${end.name} von ${start.name} aus?`,
    options: optionList,
    correct: optionList.indexOf(direction),
    explanation: `${end.name} liegt ${direction.toLowerCase()} von ${start.name}.`,
  };
}

function showDirectionTask() {
  directionTask = createDirectionTask();
  directionAnswered = false;
  auaDirectionPrompt.textContent = directionTask.prompt;
  renderAnswerButtons(auaDirectionAnswers, directionTask.options);
  auaDirectionFeedback.innerHTML = "";
}

function answerDirectionTask(index) {
  if (!directionTask || directionAnswered) {
    return;
  }
  const selected = Number(index);
  const isCorrect = selected === directionTask.correct;
  directionAnswered = true;

  auaDirectionAnswers.querySelectorAll(".aua-answer-btn").forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === directionTask.correct) {
      button.classList.add("is-correct");
    } else if (buttonIndex === selected) {
      button.classList.add("is-wrong");
    }
  });

  setFeedback(
    auaDirectionFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect ? `Richtig. ${directionTask.explanation}` : `Nicht korrekt. ${directionTask.explanation}`
  );
}

const quizKnowledgePool = [
  {
    prompt: "Welche Reihenfolge ist fuer Atlasaufgaben am sinnvollsten?",
    options: [
      "Suchbegriff -> Register -> Seite/Planquadrat -> Karte auswerten",
      "Beliebige Seite -> Antwort raten -> Register",
      "Nur Legende lesen -> fertig",
      "Nur Planquadrat ohne Register",
    ],
    correct: 0,
    explanation: "So arbeitest du schnell und systematisch.",
  },
  {
    prompt: "Welche Karte brauchst du fuer Grenzen und Hauptstaedte?",
    options: ["Politische Karte", "Physische Karte", "Thematische Karte", "Reliefkarte ohne Grenzen"],
    correct: 0,
    explanation: "Politische Karten zeigen Grenzen und Hauptstaedte.",
  },
  {
    prompt: "Warum ist die Legende wichtig?",
    options: [
      "Sie erklaert, was Farben und Symbole bedeuten.",
      "Sie zeigt nur den Massstab.",
      "Sie ersetzt das Register.",
      "Sie ist nur Deko.",
    ],
    correct: 0,
    explanation: "Legenden sind der Schluessel zum Kartenverstaendnis.",
  },
  {
    prompt: "Wie liest du ein Planquadrat?",
    options: ["Buchstabe zuerst, dann Zahl", "Zahl zuerst, dann Buchstabe", "Nur Zahl", "Nur Buchstabe"],
    correct: 0,
    explanation: "Das Standardformat ist Buchstabe + Zahl.",
  },
];

function createQuizRegisterQuestion() {
  const task = createRegisterTask();
  return {
    type: "mc",
    prompt: `Pruefung: ${task.prompt}`,
    options: task.options,
    correct: task.correct,
    explanation: task.explanation,
  };
}

function createQuizGridQuestion() {
  const place = choose(atlasPlaces);
  return {
    type: "input",
    prompt: `Nenne das Planquadrat von ${place.name} auf der Uebungskarte.`,
    answer: place.coord,
    inputType: "coord",
    context: `Tipp: erst Buchstabe, dann Zahl.`,
    explanation: `${place.name} liegt in ${place.coord}.`,
  };
}

function createQuizDirectionQuestion() {
  const task = createDirectionTask();
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

  const register = [];
  const registerPrompts = new Set();
  while (register.length < 2) {
    const item = createQuizRegisterQuestion();
    if (!registerPrompts.has(item.prompt)) {
      registerPrompts.add(item.prompt);
      register.push(item);
    }
  }

  const grid = [];
  const gridPrompts = new Set();
  while (grid.length < 2) {
    const item = createQuizGridQuestion();
    if (!gridPrompts.has(item.prompt)) {
      gridPrompts.add(item.prompt);
      grid.push(item);
    }
  }

  const direction = [];
  const directionPrompts = new Set();
  while (direction.length < 2) {
    const item = createQuizDirectionQuestion();
    if (!directionPrompts.has(item.prompt)) {
      directionPrompts.add(item.prompt);
      direction.push(item);
    }
  }

  return shuffle([...knowledge, ...register, ...grid, ...direction]);
}

function updateQuizScore() {
  auaQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  auaQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  auaQuizPrompt.textContent = question.prompt;
  auaQuizFeedback.innerHTML = "";
  auaQuizNext.disabled = true;
  auaQuizNext.textContent =
    quizState.index === quizState.questions.length - 1 ? "Ergebnis anzeigen" : "Naechste Frage";

  if (question.context) {
    auaQuizContext.hidden = false;
    auaQuizContext.textContent = question.context;
  } else {
    auaQuizContext.hidden = true;
    auaQuizContext.textContent = "";
  }

  if (question.type === "mc") {
    renderAnswerButtons(auaQuizAnswers, question.options);
    return;
  }

  auaQuizAnswers.innerHTML = [
    '<div class="aua-input-row">',
    '<label for="auaQuizInput">Antwort:</label>',
    '<input id="auaQuizInput" type="text" autocomplete="off" placeholder="z. B. C3">',
    '<button id="auaQuizCheck" type="button">Antwort pruefen</button>',
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

  auaQuizAnswers.querySelectorAll(".aua-answer-btn").forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === question.correct) {
      button.classList.add("is-correct");
    } else if (buttonIndex === selected) {
      button.classList.add("is-wrong");
    }
  });

  updateQuizScore();
  auaQuizNext.disabled = false;
  setFeedback(
    auaQuizFeedback,
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
  const input = document.getElementById("auaQuizInput");
  if (!(input instanceof HTMLInputElement)) {
    return;
  }
  const userValue = normalizeCoord(input.value);
  if (!userValue) {
    setFeedback(auaQuizFeedback, "info", "Bitte gib ein gueltiges Planquadrat ein, z. B. C3.");
    return;
  }

  const isCorrect = userValue === question.answer;
  quizState.answered = true;
  if (isCorrect) {
    quizState.correct += 1;
  }

  const checkButton = document.getElementById("auaQuizCheck");
  if (checkButton instanceof HTMLButtonElement) {
    checkButton.disabled = true;
  }

  updateQuizScore();
  auaQuizNext.disabled = false;
  setFeedback(
    auaQuizFeedback,
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
  auaQuizStart.textContent = "Test neu starten";
  updateQuizScore();
  renderQuizQuestion();
}

function finishQuiz() {
  const percent = Math.round((quizState.correct / quizState.questions.length) * 100);
  quizState.running = false;
  auaQuizStatus.textContent = "Test beendet";
  auaQuizPrompt.textContent = `Ergebnis: ${quizState.correct}/${quizState.questions.length} (${percent}%)`;
  auaQuizContext.hidden = true;
  auaQuizContext.textContent = "";
  auaQuizAnswers.innerHTML = "";
  auaQuizNext.disabled = true;

  const message =
    percent >= 80
      ? "Sehr gut. Du kannst mit dem Atlas sicher arbeiten."
      : "Gut gearbeitet. Wiederhole Registerschritte, Planquadrate und Lageaussagen.";
  setFeedback(auaQuizFeedback, percent >= 80 ? "ok" : "info", message);
}

function nextQuizQuestion() {
  if (!quizState.running) {
    return;
  }
  if (!quizState.answered) {
    setFeedback(auaQuizFeedback, "info", "Bitte zuerst die aktuelle Frage beantworten.");
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

  showRegisterTask();
  showMapTypeTask();
  showTrainTask();
  showGridTask();
  showDirectionTask();

  auaRegisterNext.addEventListener("click", showRegisterTask);
  auaRegisterAnswers.addEventListener("click", (event) => {
    const button = event.target;
    if (!(button instanceof HTMLButtonElement) || !button.classList.contains("aua-answer-btn")) {
      return;
    }
    answerRegisterTask(button.dataset.index);
  });

  auaMapTypeNext.addEventListener("click", showMapTypeTask);
  auaMapTypeAnswers.addEventListener("click", (event) => {
    const button = event.target;
    if (!(button instanceof HTMLButtonElement) || !button.classList.contains("aua-answer-btn")) {
      return;
    }
    answerMapTypeTask(button.dataset.index);
  });

  auaTrainNext.addEventListener("click", showTrainTask);
  auaTrainAnswers.addEventListener("click", (event) => {
    const button = event.target;
    if (!(button instanceof HTMLButtonElement) || !button.classList.contains("aua-answer-btn")) {
      return;
    }
    answerTrainTask(button.dataset.index);
  });

  auaGridNext.addEventListener("click", showGridTask);
  auaGridCheck.addEventListener("click", checkGridTask);
  auaGridInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      checkGridTask();
    }
  });

  auaDirectionNext.addEventListener("click", showDirectionTask);
  auaDirectionAnswers.addEventListener("click", (event) => {
    const button = event.target;
    if (!(button instanceof HTMLButtonElement) || !button.classList.contains("aua-answer-btn")) {
      return;
    }
    answerDirectionTask(button.dataset.index);
  });

  auaQuizStart.addEventListener("click", startQuiz);
  auaQuizNext.addEventListener("click", nextQuizQuestion);
  auaQuizAnswers.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target instanceof HTMLButtonElement && target.classList.contains("aua-answer-btn")) {
      answerQuizMc(target.dataset.index);
      return;
    }
    if (target instanceof HTMLButtonElement && target.id === "auaQuizCheck") {
      answerQuizInput();
    }
  });
  auaQuizAnswers.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }
    const target = event.target;
    if (target instanceof HTMLInputElement && target.id === "auaQuizInput") {
      answerQuizInput();
    }
  });
}

bootstrap();
