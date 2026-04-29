const pqTabButtons = document.querySelectorAll(".pq-tab-btn");
const pqTabPanels = document.querySelectorAll(".pq-tab");

const pqTrainMap = document.getElementById("pqTrainMap");
const pqRouteMap = document.getElementById("pqRouteMap");
const pqQuizMap = document.getElementById("pqQuizMap");

const pqCoordPrompt = document.getElementById("pqCoordPrompt");
const pqCoordInput = document.getElementById("pqCoordInput");
const pqCoordCheck = document.getElementById("pqCoordCheck");
const pqCoordNext = document.getElementById("pqCoordNext");
const pqCoordFeedback = document.getElementById("pqCoordFeedback");

const pqPlacePrompt = document.getElementById("pqPlacePrompt");
const pqPlaceAnswers = document.getElementById("pqPlaceAnswers");
const pqPlaceNext = document.getElementById("pqPlaceNext");
const pqPlaceFeedback = document.getElementById("pqPlaceFeedback");

const pqRoutePrompt = document.getElementById("pqRoutePrompt");
const pqRouteInput = document.getElementById("pqRouteInput");
const pqRouteCheck = document.getElementById("pqRouteCheck");
const pqRouteNext = document.getElementById("pqRouteNext");
const pqRouteFeedback = document.getElementById("pqRouteFeedback");

const pqQuizStart = document.getElementById("pqQuizStart");
const pqQuizNext = document.getElementById("pqQuizNext");
const pqQuizScore = document.getElementById("pqQuizScore");
const pqQuizStatus = document.getElementById("pqQuizStatus");
const pqQuizPrompt = document.getElementById("pqQuizPrompt");
const pqQuizAnswers = document.getElementById("pqQuizAnswers");
const pqQuizFeedback = document.getElementById("pqQuizFeedback");

const columns = ["A", "B", "C", "D", "E"];
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
const directionLabels = Object.values(directionLookup);

const places = [
  { name: "Waldheim", coord: "B5" },
  { name: "Seehausen", coord: "C3" },
  { name: "Bergtal", coord: "D4" },
  { name: "Muehlendorf", coord: "B2" },
  { name: "Sonnenfeld", coord: "D1" },
];

const placeByCoord = Object.fromEntries(places.map((place) => [place.coord, place]));

let coordTask = null;
let coordAnswered = false;
let placeTask = null;
let placeAnswered = false;
let routeTask = null;
let routeAnswered = false;

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
    .map((option, index) => `<button type="button" class="pq-answer-btn" data-index="${index}">${option}</button>`)
    .join("");
}

function setupTabs() {
  pqTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;
      pqTabButtons.forEach((entry) => entry.classList.remove("is-active"));
      pqTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${tab}`).classList.add("is-active");
    });
  });
}

function coordToPoint(coord) {
  const col = coord[0];
  const row = Number(coord.slice(1));
  return { x: columns.indexOf(col), y: row };
}

function pointToCoord(x, y) {
  return `${columns[x]}${y}`;
}

function renderMap(container, options = {}) {
  if (!(container instanceof HTMLDivElement)) {
    return;
  }

  const highlightSet = new Set(options.highlightCoords || []);
  const startCoord = options.startCoord || "";
  const endCoord = options.endCoord || "";

  let html = '<table class="pq-map-table" aria-label="Karte mit Planquadraten"><thead><tr><th></th>';
  columns.forEach((column) => {
    html += `<th scope="col">${column}</th>`;
  });
  html += "</tr></thead><tbody>";

  for (let row = 5; row >= 1; row -= 1) {
    html += `<tr><th scope="row">${row}</th>`;
    columns.forEach((column) => {
      const coord = `${column}${row}`;
      const classes = [];
      if (highlightSet.has(coord)) {
        classes.push("pq-highlight");
      }
      if (coord === startCoord) {
        classes.push("pq-start");
      }
      if (coord === endCoord) {
        classes.push("pq-end");
      }

      const place = placeByCoord[coord];
      const content = place ? `<span class="pq-place-pill">${place.name}</span>` : "";
      html += `<td class="${classes.join(" ")}" data-coord="${coord}">${content}</td>`;
    });
    html += "</tr>";
  }

  html += "</tbody></table>";
  container.innerHTML = html;
}

function normalizeCoord(value) {
  if (typeof value !== "string") {
    return "";
  }
  const match = value.toUpperCase().trim().match(/^([A-E])\s*([1-5])$/);
  if (!match) {
    return "";
  }
  return `${match[1]}${match[2]}`;
}

function parseCoordSequence(value) {
  if (typeof value !== "string") {
    return [];
  }
  const matches = value.toUpperCase().match(/[A-E]\s*[1-5]/g) || [];
  return matches.map((entry) => entry.replace(/\s+/g, ""));
}

function formatRoute(route) {
  return route.join(" -> ");
}

function buildRoute(startCoord, endCoord, order) {
  const start = coordToPoint(startCoord);
  const end = coordToPoint(endCoord);
  const route = [startCoord];
  let x = start.x;
  let y = start.y;

  function stepHorizontal() {
    while (x !== end.x) {
      x += x < end.x ? 1 : -1;
      route.push(pointToCoord(x, y));
    }
  }

  function stepVertical() {
    while (y !== end.y) {
      y += y < end.y ? 1 : -1;
      route.push(pointToCoord(x, y));
    }
  }

  if (order === "horizontal") {
    stepHorizontal();
    stepVertical();
  } else {
    stepVertical();
    stepHorizontal();
  }

  return route;
}

function sequencesEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

function showCoordTask() {
  const place = choose(places);
  coordTask = {
    place,
    answer: place.coord,
  };
  coordAnswered = false;
  pqCoordPrompt.textContent = `In welchem Planquadrat liegt ${place.name}?`;
  pqCoordInput.value = "";
  pqCoordFeedback.innerHTML = "";
  pqCoordInput.focus();
}

function checkCoordTask() {
  if (!coordTask || coordAnswered) {
    return;
  }

  const userValue = normalizeCoord(pqCoordInput.value);
  if (!userValue) {
    setFeedback(pqCoordFeedback, "info", "Bitte gib ein gueltiges Planquadrat wie C3 ein.");
    return;
  }

  coordAnswered = true;
  const isCorrect = userValue === coordTask.answer;
  setFeedback(
    pqCoordFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect
      ? `Richtig. ${coordTask.place.name} liegt in ${coordTask.answer}.`
      : `Nicht korrekt. ${coordTask.place.name} liegt in ${coordTask.answer}.`
  );
}

function generatePlaceTask() {
  const correctPlace = choose(places);
  const wrongOptions = shuffle(places.filter((place) => place.name !== correctPlace.name))
    .slice(0, 3)
    .map((place) => place.name);
  const options = shuffle([correctPlace.name, ...wrongOptions]);
  return {
    prompt: `Welcher Ort liegt im Planquadrat ${correctPlace.coord}?`,
    options,
    correct: options.indexOf(correctPlace.name),
    explanation: `${correctPlace.name} liegt im Planquadrat ${correctPlace.coord}.`,
  };
}

function showPlaceTask() {
  placeTask = generatePlaceTask();
  placeAnswered = false;
  pqPlacePrompt.textContent = placeTask.prompt;
  renderAnswerButtons(pqPlaceAnswers, placeTask.options);
  pqPlaceFeedback.innerHTML = "";
}

function answerPlaceTask(index) {
  if (!placeTask || placeAnswered) {
    return;
  }

  const selected = Number(index);
  const isCorrect = selected === placeTask.correct;
  placeAnswered = true;

  pqPlaceAnswers.querySelectorAll(".pq-answer-btn").forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === placeTask.correct) {
      button.classList.add("is-correct");
    } else if (buttonIndex === selected) {
      button.classList.add("is-wrong");
    }
  });

  setFeedback(
    pqPlaceFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect ? `Richtig. ${placeTask.explanation}` : `Nicht korrekt. ${placeTask.explanation}`
  );
}

function generateRouteTask() {
  let start = choose(places);
  let end = choose(places);

  while (end.coord === start.coord) {
    end = choose(places);
  }

  const startPoint = coordToPoint(start.coord);
  const endPoint = coordToPoint(end.coord);
  const distance = Math.abs(startPoint.x - endPoint.x) + Math.abs(startPoint.y - endPoint.y);

  if (distance < 3) {
    return generateRouteTask();
  }

  const order = choose(["horizontal", "vertical"]);
  const route = buildRoute(start.coord, end.coord, order);
  const orderText = order === "horizontal" ? "zuerst waagerecht, dann senkrecht" : "zuerst senkrecht, dann waagerecht";
  return {
    start,
    end,
    order,
    orderText,
    route,
  };
}

function showRouteTask() {
  routeTask = generateRouteTask();
  routeAnswered = false;

  pqRoutePrompt.textContent =
    `Beschreibe den Weg von ${routeTask.start.name} (${routeTask.start.coord}) nach ${routeTask.end.name} (${routeTask.end.coord}). ` +
    `Gib die besuchten Planquadrate in Reihenfolge an (${routeTask.orderText}).`;
  pqRouteInput.value = "";
  pqRouteFeedback.innerHTML = "";
  renderMap(pqRouteMap, {
    highlightCoords: routeTask.route,
    startCoord: routeTask.start.coord,
    endCoord: routeTask.end.coord,
  });
}

function checkRouteTask() {
  if (!routeTask || routeAnswered) {
    return;
  }

  const userSequence = parseCoordSequence(pqRouteInput.value);
  if (userSequence.length < 2) {
    setFeedback(
      pqRouteFeedback,
      "info",
      "Bitte gib eine ganze Folge von Planquadraten ein, zum Beispiel B5 -> C5 -> C4."
    );
    return;
  }

  routeAnswered = true;
  const isCorrect = sequencesEqual(userSequence, routeTask.route);
  setFeedback(
    pqRouteFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect
      ? `Richtig. Deine Wegfolge passt exakt: ${formatRoute(routeTask.route)}.`
      : `Nicht korrekt. Eine passende Folge lautet: ${formatRoute(routeTask.route)}.`
  );
}

function directionFromCoords(startCoord, endCoord) {
  const start = coordToPoint(startCoord);
  const end = coordToPoint(endCoord);
  const dx = Math.sign(end.x - start.x);
  const dy = Math.sign(end.y - start.y);
  return directionLookup[`${dx},${dy}`] || null;
}

function createKnowledgeQuestions() {
  return [
    {
      type: "mc",
      prompt: "Was ist die korrekte Schreibweise eines Planquadrats?",
      options: ["Buchstabe zuerst, dann Zahl", "Zahl zuerst, dann Buchstabe", "Nur eine Zahl", "Nur ein Buchstabe"],
      correct: 0,
      explanation: "Ein Planquadrat wird als Buchstabe und danach als Zahl geschrieben, zum Beispiel C3.",
    },
    {
      type: "mc",
      prompt: "Wofuer nutzt man Planquadrate vor allem?",
      options: [
        "Um Orte auf Karten schnell zu finden",
        "Um Temperaturen zu messen",
        "Um Hoehenmeter zu berechnen",
        "Um Windstaerken zu bestimmen",
      ],
      correct: 0,
      explanation: "Planquadrate helfen, Orte auf Karten eindeutig zu finden und zu benennen.",
    },
    {
      type: "mc",
      prompt: "Welche Aussage ist richtig?",
      options: [
        "Buchstaben laufen links nach rechts, Zahlen unten nach oben",
        "Buchstaben laufen oben nach unten, Zahlen links nach rechts",
        "Buchstaben und Zahlen laufen beide nur waagerecht",
        "Die Reihenfolge von Buchstaben und Zahlen ist egal",
      ],
      correct: 0,
      explanation: "Die Standardorientierung ist: Buchstaben links nach rechts, Zahlen unten nach oben.",
    },
    {
      type: "mc",
      prompt: "Welche Angabe hilft am besten fuer eine klare Wegbeschreibung?",
      options: [
        "Eine Reihenfolge von Planquadraten",
        "Nur Start- und Zielort",
        "Nur die Himmelsrichtung",
        "Nur die Entfernung in Metern",
      ],
      correct: 0,
      explanation: "Mit einer Reihenfolge von Planquadraten wird der Weg eindeutig und nachvollziehbar.",
    },
  ];
}

function createPlaceToCoordQuestion() {
  const place = choose(places);
  const wrongCoords = shuffle(places.filter((entry) => entry.coord !== place.coord))
    .slice(0, 3)
    .map((entry) => entry.coord);
  const options = shuffle([place.coord, ...wrongCoords]);
  return {
    type: "mc",
    prompt: `In welchem Planquadrat liegt ${place.name}?`,
    options,
    correct: options.indexOf(place.coord),
    explanation: `${place.name} liegt in ${place.coord}.`,
  };
}

function createCoordToPlaceQuestion() {
  const place = choose(places);
  const wrongNames = shuffle(places.filter((entry) => entry.name !== place.name))
    .slice(0, 3)
    .map((entry) => entry.name);
  const options = shuffle([place.name, ...wrongNames]);
  return {
    type: "mc",
    prompt: `Welcher Ort liegt im Planquadrat ${place.coord}?`,
    options,
    correct: options.indexOf(place.name),
    explanation: `${place.name} liegt im Planquadrat ${place.coord}.`,
  };
}

function createCoordInputQuestion() {
  const place = choose(places);
  return {
    type: "coordInput",
    prompt: `Trage das Planquadrat von ${place.name} ein.`,
    answer: place.coord,
    explanation: `${place.name} liegt in ${place.coord}.`,
  };
}

function createDirectionQuestion() {
  let start = choose(places);
  let end = choose(places);
  while (end.coord === start.coord) {
    end = choose(places);
  }

  const correctDirection = directionFromCoords(start.coord, end.coord);
  if (!correctDirection) {
    return createDirectionQuestion();
  }

  const options = new Set([correctDirection]);
  shuffle(directionLabels).forEach((label) => {
    if (options.size < 4) {
      options.add(label);
    }
  });
  const optionList = shuffle([...options]);
  return {
    type: "mc",
    prompt: `In welche Richtung liegt ${end.name} von ${start.name} aus?`,
    options: optionList,
    correct: optionList.indexOf(correctDirection),
    explanation: `${end.name} liegt ${correctDirection.toLowerCase()} von ${start.name}.`,
  };
}

function createRouteQuestion() {
  const task = generateRouteTask();
  return {
    type: "routeInput",
    prompt:
      `Gib die Planquadratfolge von ${task.start.name} (${task.start.coord}) nach ${task.end.name} (${task.end.coord}) an ` +
      `(${task.orderText}).`,
    answerSequence: task.route,
    explanation: `Die passende Folge lautet: ${formatRoute(task.route)}.`,
    routePreview: task.route,
    startCoord: task.start.coord,
    endCoord: task.end.coord,
  };
}

function generateQuizSet() {
  const dynamicQuestions = [
    createPlaceToCoordQuestion(),
    createCoordToPlaceQuestion(),
    createCoordInputQuestion(),
    createDirectionQuestion(),
    createPlaceToCoordQuestion(),
    createRouteQuestion(),
  ];

  return shuffle([...createKnowledgeQuestions(), ...dynamicQuestions]).slice(0, 10);
}

function updateQuizScore() {
  pqQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  pqQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  pqQuizPrompt.textContent = question.prompt;
  pqQuizFeedback.innerHTML = "";
  pqQuizNext.disabled = true;
  pqQuizNext.textContent =
    quizState.index === quizState.questions.length - 1 ? "Ergebnis anzeigen" : "Naechste Frage";

  if (question.type === "mc") {
    renderAnswerButtons(pqQuizAnswers, question.options);
  } else if (question.type === "coordInput") {
    pqQuizAnswers.innerHTML = [
      '<div class="pq-input-row">',
      '<label for="pqQuizCoordInput">Planquadrat:</label>',
      '<input id="pqQuizCoordInput" type="text" placeholder="z. B. C3" autocomplete="off" maxlength="3">',
      '<button id="pqQuizCheck" type="button">Antwort pruefen</button>',
      "</div>",
    ].join("");
  } else if (question.type === "routeInput") {
    pqQuizAnswers.innerHTML = [
      '<div class="pq-input-row">',
      '<label for="pqQuizRouteInput">Reihenfolge:</label>',
      '<input id="pqQuizRouteInput" type="text" placeholder="z. B. B5 -> C5 -> C4 -> C3" autocomplete="off">',
      '<button id="pqQuizCheck" type="button">Antwort pruefen</button>',
      "</div>",
    ].join("");
  }

  if (question.type === "routeInput") {
    renderMap(pqQuizMap, {
      highlightCoords: question.routePreview,
      startCoord: question.startCoord,
      endCoord: question.endCoord,
    });
  } else {
    renderMap(pqQuizMap);
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

  pqQuizAnswers.querySelectorAll(".pq-answer-btn").forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === question.correct) {
      button.classList.add("is-correct");
    } else if (buttonIndex === selected) {
      button.classList.add("is-wrong");
    }
  });

  updateQuizScore();
  pqQuizNext.disabled = false;
  setFeedback(
    pqQuizFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect ? `Richtig. ${question.explanation}` : `Nicht korrekt. ${question.explanation}`
  );
}

function answerQuizInput() {
  if (!quizState.running || quizState.answered) {
    return;
  }

  const question = quizState.questions[quizState.index];
  if (question.type !== "coordInput" && question.type !== "routeInput") {
    return;
  }

  let isCorrect = false;

  if (question.type === "coordInput") {
    const input = document.getElementById("pqQuizCoordInput");
    if (!(input instanceof HTMLInputElement)) {
      return;
    }
    const userValue = normalizeCoord(input.value);
    if (!userValue) {
      setFeedback(pqQuizFeedback, "info", "Bitte gib ein gueltiges Planquadrat ein, zum Beispiel C3.");
      return;
    }
    isCorrect = userValue === question.answer;
  } else {
    const input = document.getElementById("pqQuizRouteInput");
    if (!(input instanceof HTMLInputElement)) {
      return;
    }
    const userSequence = parseCoordSequence(input.value);
    if (userSequence.length < 2) {
      setFeedback(
        pqQuizFeedback,
        "info",
        "Bitte gib eine Reihenfolge von Planquadraten ein, zum Beispiel B5 -> C5 -> C4."
      );
      return;
    }
    isCorrect = sequencesEqual(userSequence, question.answerSequence);
  }

  quizState.answered = true;
  if (isCorrect) {
    quizState.correct += 1;
  }

  const checkButton = document.getElementById("pqQuizCheck");
  if (checkButton instanceof HTMLButtonElement) {
    checkButton.disabled = true;
  }

  updateQuizScore();
  pqQuizNext.disabled = false;
  setFeedback(
    pqQuizFeedback,
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

  pqQuizStart.textContent = "Test neu starten";
  updateQuizScore();
  renderQuizQuestion();
}

function finishQuiz() {
  const percent = Math.round((quizState.correct / quizState.questions.length) * 100);
  quizState.running = false;
  pqQuizStatus.textContent = "Test beendet";
  pqQuizPrompt.textContent = `Ergebnis: ${quizState.correct}/${quizState.questions.length} (${percent}%)`;
  pqQuizAnswers.innerHTML = "";
  pqQuizNext.disabled = true;
  renderMap(pqQuizMap);

  const message =
    percent >= 80
      ? "Sehr gut. Du kannst mit Planquadraten sicher arbeiten."
      : "Gut gearbeitet. Wiederhole noch einmal die Koordinaten-Reihenfolge und die Wegaufgaben.";
  setFeedback(pqQuizFeedback, percent >= 80 ? "ok" : "info", message);
}

function nextQuizQuestion() {
  if (!quizState.running) {
    return;
  }
  if (!quizState.answered) {
    setFeedback(pqQuizFeedback, "info", "Bitte beantworte zuerst die aktuelle Frage.");
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

  renderMap(pqTrainMap);
  renderMap(pqRouteMap);
  renderMap(pqQuizMap);

  showCoordTask();
  showPlaceTask();
  showRouteTask();

  pqCoordCheck.addEventListener("click", checkCoordTask);
  pqCoordNext.addEventListener("click", showCoordTask);
  pqCoordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      checkCoordTask();
    }
  });

  pqPlaceNext.addEventListener("click", showPlaceTask);
  pqPlaceAnswers.addEventListener("click", (event) => {
    const button = event.target;
    if (!(button instanceof HTMLButtonElement) || !button.classList.contains("pq-answer-btn")) {
      return;
    }
    answerPlaceTask(button.dataset.index);
  });

  pqRouteCheck.addEventListener("click", checkRouteTask);
  pqRouteNext.addEventListener("click", showRouteTask);
  pqRouteInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      checkRouteTask();
    }
  });

  pqQuizStart.addEventListener("click", startQuiz);
  pqQuizNext.addEventListener("click", nextQuizQuestion);
  pqQuizAnswers.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target instanceof HTMLButtonElement && target.classList.contains("pq-answer-btn")) {
      answerQuizMc(target.dataset.index);
      return;
    }
    if (target instanceof HTMLButtonElement && target.id === "pqQuizCheck") {
      answerQuizInput();
    }
  });
  pqQuizAnswers.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const input = event.target;
      if (input instanceof HTMLInputElement && (input.id === "pqQuizCoordInput" || input.id === "pqQuizRouteInput")) {
        answerQuizInput();
      }
    }
  });
}

bootstrap();
