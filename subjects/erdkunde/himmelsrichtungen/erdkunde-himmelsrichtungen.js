const hrTabButtons = document.querySelectorAll(".hr-tab-btn");
const hrTabPanels = document.querySelectorAll(".hr-tab");

const hrDirectionPrompt = document.getElementById("hrDirectionPrompt");
const hrRose = document.getElementById("hrRose");
const hrDirectionButtons = document.querySelectorAll(".hr-dir-btn");
const hrDirectionNext = document.getElementById("hrDirectionNext");
const hrDirectionFeedback = document.getElementById("hrDirectionFeedback");

const hrNorthSelect = document.getElementById("hrNorthSelect");
const hrLabelTop = document.getElementById("hrLabelTop");
const hrLabelRight = document.getElementById("hrLabelRight");
const hrLabelBottom = document.getElementById("hrLabelBottom");
const hrLabelLeft = document.getElementById("hrLabelLeft");
const hrNorthExplain = document.getElementById("hrNorthExplain");

const hrMethodButtons = document.querySelectorAll(".hr-method-btn");
const hrMethodTitle = document.getElementById("hrMethodTitle");
const hrMethodText = document.getElementById("hrMethodText");
const hrMethodList = document.getElementById("hrMethodList");

const hrTrainDirectionPrompt = document.getElementById("hrTrainDirectionPrompt");
const hrTrainDirectionAnswers = document.getElementById("hrTrainDirectionAnswers");
const hrTrainDirectionNext = document.getElementById("hrTrainDirectionNext");
const hrTrainDirectionFeedback = document.getElementById("hrTrainDirectionFeedback");

const hrTownMap = document.getElementById("hrTownMap");
const hrTownPrompt = document.getElementById("hrTownPrompt");
const hrTownAnswers = document.getElementById("hrTownAnswers");
const hrTownNext = document.getElementById("hrTownNext");
const hrTownFeedback = document.getElementById("hrTownFeedback");
const hrQuizTownMap = document.getElementById("hrQuizTownMap");

const hrMethodTrainPrompt = document.getElementById("hrMethodTrainPrompt");
const hrMethodTrainAnswers = document.getElementById("hrMethodTrainAnswers");
const hrMethodTrainNext = document.getElementById("hrMethodTrainNext");
const hrMethodTrainFeedback = document.getElementById("hrMethodTrainFeedback");

const hrQuizStart = document.getElementById("hrQuizStart");
const hrQuizNext = document.getElementById("hrQuizNext");
const hrQuizScore = document.getElementById("hrQuizScore");
const hrQuizStatus = document.getElementById("hrQuizStatus");
const hrQuizPrompt = document.getElementById("hrQuizPrompt");
const hrQuizAnswers = document.getElementById("hrQuizAnswers");
const hrQuizFeedback = document.getElementById("hrQuizFeedback");

const directions = [
  { key: "N", label: "Norden", short: "N", dx: 0, dy: -1 },
  { key: "NE", label: "Nordosten", short: "NO", dx: 1, dy: -1 },
  { key: "E", label: "Osten", short: "O", dx: 1, dy: 0 },
  { key: "SE", label: "Südosten", short: "SO", dx: 1, dy: 1 },
  { key: "S", label: "Süden", short: "S", dx: 0, dy: 1 },
  { key: "SW", label: "Südwesten", short: "SW", dx: -1, dy: 1 },
  { key: "W", label: "Westen", short: "W", dx: -1, dy: 0 },
  { key: "NW", label: "Nordwesten", short: "NW", dx: -1, dy: -1 },
];

const directionMap = Object.fromEntries(directions.map((entry) => [entry.key, entry]));
const directionLabels = directions.map((entry) => entry.label);

const oppositeDirection = {
  N: "S",
  NE: "SW",
  E: "W",
  SE: "NW",
  S: "N",
  SW: "NE",
  W: "E",
  NW: "SE",
};

const northLayouts = {
  top: {
    top: "Norden",
    right: "Osten",
    bottom: "Süden",
    left: "Westen",
    explanation: "Wenn Norden oben ist, bleibt die Standardausrichtung: Osten rechts, Süden unten, Westen links.",
  },
  right: {
    top: "Westen",
    right: "Norden",
    bottom: "Osten",
    left: "Süden",
    explanation: "Liegt Norden rechts, ist die Karte um eine Vierteldrehung gedreht.",
  },
  bottom: {
    top: "Süden",
    right: "Westen",
    bottom: "Norden",
    left: "Osten",
    explanation: "Liegt Norden unten, ist die Karte um 180 Grad gedreht.",
  },
  left: {
    top: "Osten",
    right: "Süden",
    bottom: "Westen",
    left: "Norden",
    explanation: "Liegt Norden links, ist die Karte zur anderen Seite gedreht.",
  },
};

const methodContent = {
  sonne: {
    title: "Sonne und Schatten",
    text: "Die Sonne hilft bei grober Orientierung. Mittags steht sie bei uns ungefähr im Süden.",
    points: [
      "Morgens steht die Sonne eher im Osten, abends eher im Westen.",
      "Schatten zeigen in die entgegengesetzte Richtung zur Sonne.",
      "Für sehr genaue Richtungen reicht die Sonne allein nicht aus.",
    ],
  },
  kompass: {
    title: "Kompass",
    text: "Ein Kompass zeigt die Nord-Süd-Richtung über das Erdmagnetfeld.",
    points: [
      "Die Magnetnadel richtet sich am Magnetfeld der Erde aus.",
      "Mit Norden findest du auch Osten, Süden und Westen.",
      "Für genaue Richtungsangaben ist der Kompass sehr zuverlässig.",
    ],
  },
  karte: {
    title: "Karte mit Nordpfeil",
    text: "Der Nordpfeil macht Karten lesbar und vergleichbar.",
    points: [
      "Erst den Nordpfeil suchen, dann die Richtung bestimmen.",
      "Mit Karte und Legende kannst du Wege und Orte genau beschreiben.",
      "Karten eignen sich besonders für Planung und Übersicht.",
    ],
  },
  gps: {
    title: "GPS",
    text: "GPS bestimmt deine Position mit Satelliten.",
    points: [
      "GPS ist besonders hilfreich in unbekannten Gebieten.",
      "Es zeigt deinen Standort und mögliche Routen.",
      "Bei schlechtem Empfang hilft eine Papierkarte als Ergänzung.",
    ],
  },
};

const toolOptions = ["Sonne und Schatten", "Kompass", "Karte mit Nordpfeil", "GPS"];

const methodScenarios = [
  {
    prompt: "Du wanderst im Wald und möchtest genau wissen, wo Norden ist. Was hilft am besten?",
    answer: "Kompass",
    explanation: "Der Kompass zeigt dir direkt die Nord-Süd-Richtung.",
  },
  {
    prompt: "Du planst zuhause einen Weg durch eine Stadt. Welches Mittel ist dafür am besten?",
    answer: "Karte mit Nordpfeil",
    explanation: "Auf Karten siehst du Straßen, Orte und Lagebeziehungen übersichtlich.",
  },
  {
    prompt: "Du bist in einer fremden Stadt und möchtest deinen aktuellen Standort sofort sehen.",
    answer: "GPS",
    explanation: "GPS zeigt direkt den aktuellen Standort auf dem Gerät an.",
  },
  {
    prompt: "Auf dem Pausenhof möchtest du grob abschätzen, wo Osten liegt. Welches Mittel kann helfen?",
    answer: "Sonne und Schatten",
    explanation: "Sonnenstand und Schatten geben eine grobe Orientierung.",
  },
  {
    prompt: "Du arbeitest mit einem ausgedruckten Stadtplan im Unterricht. Was brauchst du zuerst?",
    answer: "Karte mit Nordpfeil",
    explanation: "Über den Nordpfeil richtest du die Karte richtig aus.",
  },
  {
    prompt: "Dein Handy hat keinen Empfang. Du brauchst trotzdem eine genaue Richtung.",
    answer: "Kompass",
    explanation: "Ein Kompass funktioniert ohne Mobilfunk und Internet.",
  },
];

const townPlaces = [
  { name: "Schule", x: 1, y: 0 },
  { name: "Sporthalle", x: 4, y: 0 },
  { name: "Bibliothek", x: 0, y: 2 },
  { name: "Marktplatz", x: 2, y: 2 },
  { name: "Bahnhof", x: 4, y: 2 },
  { name: "Park", x: 1, y: 4 },
  { name: "Museum", x: 3, y: 4 },
];

let learningDirectionTarget = null;
let trainDirectionTask = null;
let trainDirectionAnswered = false;
let townTask = null;
let townAnswered = false;
let methodTrainTask = null;
let methodTrainAnswered = false;

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

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function choose(items) {
  return items[randomInt(0, items.length - 1)];
}

function buildOptions(correctLabel) {
  const optionSet = new Set([correctLabel]);
  const shuffledLabels = shuffle(directionLabels);
  for (let i = 0; i < shuffledLabels.length && optionSet.size < 4; i += 1) {
    optionSet.add(shuffledLabels[i]);
  }
  const options = shuffle([...optionSet]);
  return {
    options,
    correctIndex: options.indexOf(correctLabel),
  };
}

function setFeedback(element, kind, text) {
  element.innerHTML = `<p class="feedback ${kind}">${text}</p>`;
}

function setupTabs() {
  hrTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;
      hrTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      hrTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${tab}`).classList.add("is-active");
    });
  });
}

function nextLearningDirectionTask() {
  learningDirectionTarget = choose(directions);
  hrDirectionPrompt.textContent = `Klicke auf: ${learningDirectionTarget.label}`;
  hrDirectionButtons.forEach((button) => {
    button.classList.remove("is-correct", "is-wrong");
  });
  hrDirectionFeedback.innerHTML = "";
}

function checkLearningDirection(button) {
  if (!(button instanceof HTMLButtonElement) || !learningDirectionTarget) {
    return;
  }

  const selectedKey = button.dataset.dir;
  const isCorrect = selectedKey === learningDirectionTarget.key;

  hrDirectionButtons.forEach((item) => {
    item.classList.remove("is-correct", "is-wrong");
    if (item.dataset.dir === learningDirectionTarget.key) {
      item.classList.add("is-correct");
    }
  });

  if (!isCorrect) {
    button.classList.add("is-wrong");
  }

  setFeedback(
    hrDirectionFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect
      ? `Richtig. ${learningDirectionTarget.label} passt zu dieser Position in der Kompassrose.`
      : `Noch nicht richtig. ${learningDirectionTarget.label} liegt hier ${learningDirectionTarget.short}.`
  );
}

function updateNorthLayout() {
  const selected = hrNorthSelect.value;
  const layout = northLayouts[selected];
  if (!layout) {
    return;
  }

  hrLabelTop.textContent = layout.top;
  hrLabelRight.textContent = layout.right;
  hrLabelBottom.textContent = layout.bottom;
  hrLabelLeft.textContent = layout.left;
  hrNorthExplain.textContent = layout.explanation;
}

function setMethod(methodKey) {
  const method = methodContent[methodKey];
  if (!method) {
    return;
  }

  hrMethodButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.method === methodKey);
  });

  hrMethodTitle.textContent = method.title;
  hrMethodText.textContent = method.text;
  hrMethodList.innerHTML = method.points.map((entry) => `<li>${entry}</li>`).join("");
}

function renderAnswerButtons(container, options) {
  container.innerHTML = options
    .map((option, index) => `<button type="button" class="hr-answer-btn" data-index="${index}">${option}</button>`)
    .join("");
}

function generateDirectionTrainingTask() {
  const variant = randomInt(0, 2);

  if (variant === 0) {
    const item = choose(directions);
    const optionData = buildOptions(item.label);
    return {
      prompt: `Welche Richtung meint die Abkürzung "${item.short}"?`,
      options: optionData.options,
      correct: optionData.correctIndex,
      explanation: `${item.short} steht für ${item.label}.`,
    };
  }

  if (variant === 1) {
    const item = choose(directions);
    const oppositeKey = oppositeDirection[item.key];
    const correctLabel = directionMap[oppositeKey].label;
    const optionData = buildOptions(correctLabel);
    return {
      prompt: `Welche Richtung liegt ${item.label} genau gegenüber?`,
      options: optionData.options,
      correct: optionData.correctIndex,
      explanation: `Gegenüber von ${item.label} liegt ${correctLabel}.`,
    };
  }

  const diagonalPairs = [
    { a: "N", b: "E", mid: "NE" },
    { a: "E", b: "S", mid: "SE" },
    { a: "S", b: "W", mid: "SW" },
    { a: "W", b: "N", mid: "NW" },
  ];
  const pair = choose(diagonalPairs);
  const correctLabel = directionMap[pair.mid].label;
  const optionData = buildOptions(correctLabel);
  return {
    prompt: `Welche Richtung liegt zwischen ${directionMap[pair.a].label} und ${directionMap[pair.b].label}?`,
    options: optionData.options,
    correct: optionData.correctIndex,
    explanation: `Zwischen ${directionMap[pair.a].label} und ${directionMap[pair.b].label} liegt ${correctLabel}.`,
  };
}

function showDirectionTrainingTask() {
  trainDirectionTask = generateDirectionTrainingTask();
  trainDirectionAnswered = false;
  hrTrainDirectionPrompt.textContent = trainDirectionTask.prompt;
  renderAnswerButtons(hrTrainDirectionAnswers, trainDirectionTask.options);
  hrTrainDirectionFeedback.innerHTML = "";
}

function answerDirectionTraining(index) {
  if (!trainDirectionTask || trainDirectionAnswered) {
    return;
  }

  const selected = Number(index);
  const isCorrect = selected === trainDirectionTask.correct;
  trainDirectionAnswered = true;

  hrTrainDirectionAnswers.querySelectorAll(".hr-answer-btn").forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === trainDirectionTask.correct) {
      button.classList.add("is-correct");
    } else if (buttonIndex === selected) {
      button.classList.add("is-wrong");
    }
  });

  setFeedback(
    hrTrainDirectionFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect
      ? `Richtig. ${trainDirectionTask.explanation}`
      : `Nicht korrekt. ${trainDirectionTask.explanation}`
  );
}

function renderTownMap(targetMap) {
  if (!(targetMap instanceof HTMLDivElement)) {
    return;
  }
  targetMap.replaceChildren();
  const placeByPosition = new Map();
  townPlaces.forEach((place) => {
    placeByPosition.set(`${place.x},${place.y}`, place);
  });

  for (let y = 0; y < 5; y += 1) {
    for (let x = 0; x < 5; x += 1) {
      const cell = document.createElement("div");
      const place = placeByPosition.get(`${x},${y}`);
      if (place) {
        cell.className = "hr-place";
        cell.textContent = place.name;
      } else {
        cell.className = "hr-cell";
      }
      targetMap.append(cell);
    }
  }
}

function directionFromDelta(dx, dy) {
  const key = `${Math.sign(dx)},${Math.sign(dy)}`;
  const lookup = {
    "0,-1": "N",
    "1,-1": "NE",
    "1,0": "E",
    "1,1": "SE",
    "0,1": "S",
    "-1,1": "SW",
    "-1,0": "W",
    "-1,-1": "NW",
  };
  return lookup[key] || null;
}

function generateTownTask() {
  let start = choose(townPlaces);
  let target = choose(townPlaces);

  while (target.name === start.name) {
    target = choose(townPlaces);
  }

  const directionKey = directionFromDelta(target.x - start.x, target.y - start.y);
  if (!directionKey) {
    return generateTownTask();
  }

  const correctLabel = directionMap[directionKey].label;
  const optionData = buildOptions(correctLabel);
  return {
    prompt: `In welche Richtung liegt ${target.name} von ${start.name} aus?`,
    options: optionData.options,
    correct: optionData.correctIndex,
    explanation: `${target.name} liegt ${correctLabel.toLowerCase()} von ${start.name}.`,
  };
}

function showTownTask() {
  townTask = generateTownTask();
  townAnswered = false;
  hrTownPrompt.textContent = townTask.prompt;
  renderAnswerButtons(hrTownAnswers, townTask.options);
  hrTownFeedback.innerHTML = "";
}

function answerTownTask(index) {
  if (!townTask || townAnswered) {
    return;
  }

  const selected = Number(index);
  const isCorrect = selected === townTask.correct;
  townAnswered = true;

  hrTownAnswers.querySelectorAll(".hr-answer-btn").forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === townTask.correct) {
      button.classList.add("is-correct");
    } else if (buttonIndex === selected) {
      button.classList.add("is-wrong");
    }
  });

  setFeedback(
    hrTownFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect
      ? `Richtig. ${townTask.explanation}`
      : `Nicht korrekt. ${townTask.explanation}`
  );
}

function generateMethodTask() {
  const scenario = choose(methodScenarios);
  const options = shuffle([...toolOptions]);
  return {
    prompt: scenario.prompt,
    options,
    correct: options.indexOf(scenario.answer),
    explanation: scenario.explanation,
  };
}

function showMethodTask() {
  methodTrainTask = generateMethodTask();
  methodTrainAnswered = false;
  hrMethodTrainPrompt.textContent = methodTrainTask.prompt;
  renderAnswerButtons(hrMethodTrainAnswers, methodTrainTask.options);
  hrMethodTrainFeedback.innerHTML = "";
}

function answerMethodTask(index) {
  if (!methodTrainTask || methodTrainAnswered) {
    return;
  }

  const selected = Number(index);
  const isCorrect = selected === methodTrainTask.correct;
  methodTrainAnswered = true;

  hrMethodTrainAnswers.querySelectorAll(".hr-answer-btn").forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === methodTrainTask.correct) {
      button.classList.add("is-correct");
    } else if (buttonIndex === selected) {
      button.classList.add("is-wrong");
    }
  });

  setFeedback(
    hrMethodTrainFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect
      ? `Richtig. ${methodTrainTask.explanation}`
      : `Nicht korrekt. ${methodTrainTask.explanation}`
  );
}

function createNorthQuestion() {
  const orientation = choose(Object.keys(northLayouts));
  const layout = northLayouts[orientation];
  const askFor = choose(["top", "right", "bottom", "left"]);
  const expected = layout[askFor];
  const options = shuffle(["Norden", "Osten", "Süden", "Westen"]);
  const sideNames = {
    top: "oben",
    right: "rechts",
    bottom: "unten",
    left: "links",
  };
  return {
    prompt: `Wenn Norden auf der Karte ${sideNames[orientation]} liegt: Welche Richtung liegt dann ${sideNames[askFor]}?`,
    options,
    correct: options.indexOf(expected),
    explanation: `Bei dieser Drehung liegt ${expected} ${sideNames[askFor]}.`,
  };
}

function createKnowledgeQuestions() {
  return [
    {
      prompt: "Welche vier Haupthimmelsrichtungen gehören zusammen?",
      options: [
        "Norden, Osten, Süden, Westen",
        "Nord, Süd, Berg, Tal",
        "Links, rechts, oben, unten",
        "Sonne, Mond, Sterne, Wolken",
      ],
      correct: 0,
      explanation: "Die Haupthimmelsrichtungen sind Norden, Osten, Süden und Westen.",
    },
    {
      prompt: "Welche Richtung liegt zwischen Norden und Osten?",
      options: ["Nordosten", "Südosten", "Nordwesten", "Südwesten"],
      correct: 0,
      explanation: "Zwischen Norden und Osten liegt Nordosten.",
    },
    {
      prompt: "Was zeigt ein Nordpfeil auf einer Karte?",
      options: [
        "Er zeigt die Nordrichtung",
        "Er zeigt nur den Kartenmaßstab",
        "Er markiert die größte Stadt",
        "Er zeigt den Sonnenaufgang",
      ],
      correct: 0,
      explanation: "Der Nordpfeil zeigt, in welche Richtung Norden liegt.",
    },
    {
      prompt: "Warum kann ein Kompass Richtungen anzeigen?",
      options: [
        "Die Nadel richtet sich am Erdmagnetfeld aus",
        "Der Kompass misst die Entfernung in Kilometern",
        "Die Nadel zeigt immer zur Sonne",
        "Der Kompass funktioniert nur mit Internet",
      ],
      correct: 0,
      explanation: "Die Magnetnadel richtet sich an der Magnetfeldrichtung der Erde aus.",
    },
  ];
}

function generateQuizSet() {
  const dynamic = [
    generateDirectionTrainingTask(),
    generateDirectionTrainingTask(),
    generateTownTask(),
    generateTownTask(),
    generateMethodTask(),
    generateMethodTask(),
    createNorthQuestion(),
  ];
  return shuffle([...createKnowledgeQuestions(), ...dynamic]).slice(0, 10);
}

function updateQuizScore() {
  hrQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  hrQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  hrQuizPrompt.textContent = question.prompt;
  hrQuizFeedback.innerHTML = "";
  hrQuizNext.disabled = true;
  hrQuizNext.textContent =
    quizState.index === quizState.questions.length - 1 ? "Ergebnis anzeigen" : "Nächste Frage";

  renderAnswerButtons(hrQuizAnswers, question.options);
}

function answerQuizQuestion(index) {
  if (!quizState.running || quizState.answered) {
    return;
  }

  const question = quizState.questions[quizState.index];
  const selected = Number(index);
  const isCorrect = selected === question.correct;
  quizState.answered = true;

  if (isCorrect) {
    quizState.correct += 1;
  }

  hrQuizAnswers.querySelectorAll(".hr-answer-btn").forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === question.correct) {
      button.classList.add("is-correct");
    } else if (buttonIndex === selected) {
      button.classList.add("is-wrong");
    }
  });

  updateQuizScore();
  hrQuizNext.disabled = false;
  setFeedback(
    hrQuizFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect
      ? `Richtig. ${question.explanation}`
      : `Nicht korrekt. ${question.explanation}`
  );
}

function startQuiz() {
  quizState.running = true;
  quizState.answered = false;
  quizState.index = 0;
  quizState.correct = 0;
  quizState.questions = generateQuizSet();
  hrQuizStart.textContent = "Test neu starten";
  updateQuizScore();
  renderQuizQuestion();
}

function finishQuiz() {
  const percent = Math.round((quizState.correct / quizState.questions.length) * 100);
  quizState.running = false;
  hrQuizStatus.textContent = "Test beendet";
  hrQuizPrompt.textContent = `Ergebnis: ${quizState.correct}/${quizState.questions.length} (${percent}%)`;
  hrQuizAnswers.innerHTML = "";
  hrQuizNext.disabled = true;

  const message =
    percent >= 80
      ? "Sehr gut. Du kannst dich mit Himmelsrichtungen und Karten sicher orientieren."
      : "Gut gearbeitet. Wiederhole vor allem die Kompassrose und die Kartenaufgaben im Training.";

  setFeedback(hrQuizFeedback, percent >= 80 ? "ok" : "info", message);
}

function nextQuizQuestion() {
  if (!quizState.running) {
    return;
  }
  if (!quizState.answered) {
    setFeedback(hrQuizFeedback, "info", "Bitte zuerst eine Antwort auswählen.");
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

  nextLearningDirectionTask();
  hrDirectionNext.addEventListener("click", nextLearningDirectionTask);
  hrRose.addEventListener("click", (event) => {
    const button = event.target;
    if (!(button instanceof HTMLButtonElement) || !button.classList.contains("hr-dir-btn")) {
      return;
    }
    checkLearningDirection(button);
  });

  updateNorthLayout();
  hrNorthSelect.addEventListener("change", updateNorthLayout);

  setMethod("sonne");
  hrMethodButtons.forEach((button) => {
    button.addEventListener("click", () => setMethod(button.dataset.method));
  });

  renderTownMap(hrTownMap);
  renderTownMap(hrQuizTownMap);
  showDirectionTrainingTask();
  showTownTask();
  showMethodTask();

  hrTrainDirectionNext.addEventListener("click", showDirectionTrainingTask);
  hrTownNext.addEventListener("click", showTownTask);
  hrMethodTrainNext.addEventListener("click", showMethodTask);

  hrTrainDirectionAnswers.addEventListener("click", (event) => {
    const button = event.target;
    if (!(button instanceof HTMLButtonElement) || !button.classList.contains("hr-answer-btn")) {
      return;
    }
    answerDirectionTraining(button.dataset.index);
  });

  hrTownAnswers.addEventListener("click", (event) => {
    const button = event.target;
    if (!(button instanceof HTMLButtonElement) || !button.classList.contains("hr-answer-btn")) {
      return;
    }
    answerTownTask(button.dataset.index);
  });

  hrMethodTrainAnswers.addEventListener("click", (event) => {
    const button = event.target;
    if (!(button instanceof HTMLButtonElement) || !button.classList.contains("hr-answer-btn")) {
      return;
    }
    answerMethodTask(button.dataset.index);
  });

  hrQuizStart.addEventListener("click", startQuiz);
  hrQuizNext.addEventListener("click", nextQuizQuestion);
  hrQuizAnswers.addEventListener("click", (event) => {
    const button = event.target;
    if (!(button instanceof HTMLButtonElement) || !button.classList.contains("hr-answer-btn")) {
      return;
    }
    answerQuizQuestion(button.dataset.index);
  });
}

bootstrap();
