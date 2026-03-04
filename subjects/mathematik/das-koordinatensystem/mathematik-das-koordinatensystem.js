const ksTabButtons = document.querySelectorAll(".ks-tab-btn");
const ksTabPanels = document.querySelectorAll(".ks-tab");

const ksTopicButtons = document.querySelectorAll(".ks-topic-btn");
const ksTopicTitle = document.getElementById("ksTopicTitle");
const ksTopicText = document.getElementById("ksTopicText");
const ksTopicList = document.getElementById("ksTopicList");

const ksLabInputX = document.getElementById("ksLabInputX");
const ksLabInputY = document.getElementById("ksLabInputY");
const ksLabDrawPoint = document.getElementById("ksLabDrawPoint");
const ksLabNewTarget = document.getElementById("ksLabNewTarget");
const ksLabHint = document.getElementById("ksLabHint");
const ksLabSvg = document.getElementById("ksLabSvg");

const ksGenDifficulty = document.getElementById("ksGenDifficulty");
const ksGenCount = document.getElementById("ksGenCount");
const ksGenTypes = document.querySelectorAll(".ks-gen-type");
const ksGenerateTasks = document.getElementById("ksGenerateTasks");
const ksCheckTasks = document.getElementById("ksCheckTasks");
const ksTaskList = document.getElementById("ksTaskList");
const ksTaskFeedback = document.getElementById("ksTaskFeedback");

const ksQuizStart = document.getElementById("ksQuizStart");
const ksQuizNext = document.getElementById("ksQuizNext");
const ksQuizScore = document.getElementById("ksQuizScore");
const ksQuizStatus = document.getElementById("ksQuizStatus");
const ksQuizPrompt = document.getElementById("ksQuizPrompt");
const ksQuizAnswers = document.getElementById("ksQuizAnswers");
const ksQuizFeedback = document.getElementById("ksQuizFeedback");

const topicDetails = {
  achsen: {
    title: "x-Achse und y-Achse",
    text: "Die x-Achse ist waagerecht, die y-Achse senkrecht. Ihr Schnittpunkt ist der Ursprung O(0|0).",
    points: [
      "Auf der x-Achse gilt immer y = 0.",
      "Auf der y-Achse gilt immer x = 0.",
      "Positive x-Werte liegen rechts, negative links.",
      "Positive y-Werte liegen oben, negative unten.",
    ],
  },
  koordinatenpaar: {
    title: "Koordinatenpaar (x|y)",
    text: "Ein Punkt wird als Paar notiert: zuerst x, dann y.",
    points: [
      "P(3|2) bedeutet: 3 nach rechts, 2 nach oben.",
      "P(-4|1) bedeutet: 4 nach links, 1 nach oben.",
      "Die Reihenfolge ist wichtig: (x|y), nicht (y|x).",
      "Zwischen den Zahlen steht ein Trennzeichen, häufig ein Strich: (x|y).",
    ],
  },
  quadranten: {
    title: "Quadranten",
    text: "Die Achsen teilen die Ebene in vier Quadranten.",
    points: [
      "I: x > 0 und y > 0",
      "II: x < 0 und y > 0",
      "III: x < 0 und y < 0",
      "IV: x > 0 und y < 0",
    ],
  },
  lage: {
    title: "Lagebeziehungen",
    text: "Mit Koordinaten beschreibst du, wo Punkte liegen und wie sich Figuren zusammensetzen.",
    points: [
      "Gleicher y-Wert: Punkte liegen waagerecht auf einer Linie.",
      "Gleicher x-Wert: Punkte liegen senkrecht auf einer Linie.",
      "Über Eckpunkte kannst du Strecken und einfache Figuren beschreiben.",
      "Vorzeichen helfen, die Lage schnell zu prüfen.",
    ],
  },
};

const axisLabels = {
  xAxis: "auf der x-Achse",
  yAxis: "auf der y-Achse",
  origin: "im Ursprung",
  none: "auf keiner Achse",
};

const figureLabels = {
  square: "Quadrat",
  rectangle: "Rechteck (kein Quadrat)",
  none: "keins von beidem",
  parallelogram: "Parallelogramm",
};

const labState = {
  min: -10,
  max: 10,
  point: { x: 3, y: 2 },
  lastClick: null,
  target: null,
  solvedTarget: false,
};

let generatedTasks = [];

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

function choice(items) {
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
  const cleaned = String(value || "").trim().replace(",", ".");
  if (!cleaned) {
    return Number.NaN;
  }
  return Number(cleaned);
}

function nearlyEqual(a, b) {
  return Math.abs(a - b) <= 1e-6 * Math.max(1, Math.abs(a), Math.abs(b));
}

function pointLabel(x, y) {
  return `(${x}|${y})`;
}

function setupTabs() {
  ksTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      ksTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      ksTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${target}`).classList.add("is-active");
    });
  });
}

function renderTopic(key) {
  const detail = topicDetails[key];
  if (!detail) {
    return;
  }

  ksTopicTitle.textContent = detail.title;
  ksTopicText.textContent = detail.text;
  ksTopicList.innerHTML = detail.points.map((point) => `<li>${point}</li>`).join("");

  ksTopicButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.topic === key);
  });
}

function setupTopicModule() {
  ksTopicButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderTopic(button.dataset.topic);
    });
  });
  renderTopic("achsen");
}

function labScale() {
  const padding = 28;
  const size = 420;
  const span = labState.max - labState.min;
  return { padding, size, span };
}

function toPixelX(x) {
  const { padding, size, span } = labScale();
  return padding + ((x - labState.min) / span) * (size - 2 * padding);
}

function toPixelY(y) {
  const { padding, size, span } = labScale();
  return size - padding - ((y - labState.min) / span) * (size - 2 * padding);
}

function toCoordX(px) {
  const { padding, size, span } = labScale();
  const ratio = (px - padding) / (size - 2 * padding);
  return Math.round(labState.min + ratio * span);
}

function toCoordY(py) {
  const { padding, size, span } = labScale();
  const ratio = (size - padding - py) / (size - 2 * padding);
  return Math.round(labState.min + ratio * span);
}

function clampCoord(value) {
  return Math.max(labState.min, Math.min(labState.max, value));
}

function drawLab() {
  const { padding, size } = labScale();
  const parts = [];

  for (let i = labState.min; i <= labState.max; i += 1) {
    const px = toPixelX(i);
    const py = toPixelY(i);
    const major = i === 0;
    const color = major ? "#245d8a" : "#d7e5f2";
    const width = major ? 2.2 : 1;
    parts.push(`<line x1="${px}" y1="${padding}" x2="${px}" y2="${size - padding}" stroke="${color}" stroke-width="${width}"/>`);
    parts.push(`<line x1="${padding}" y1="${py}" x2="${size - padding}" y2="${py}" stroke="${color}" stroke-width="${width}"/>`);

    if (i % 2 === 0 && i !== 0) {
      parts.push(`<text x="${px}" y="${size - padding + 16}" fill="#5a7186" font-size="11" text-anchor="middle">${i}</text>`);
      parts.push(`<text x="${padding - 12}" y="${py + 4}" fill="#5a7186" font-size="11" text-anchor="middle">${i}</text>`);
    }
  }

  parts.push(`<text x="${size - padding + 8}" y="${toPixelY(0) - 8}" fill="#245d8a" font-size="12" font-weight="700">x</text>`);
  parts.push(`<text x="${toPixelX(0) + 8}" y="${padding - 6}" fill="#245d8a" font-size="12" font-weight="700">y</text>`);

  if (labState.point) {
    const px = toPixelX(labState.point.x);
    const py = toPixelY(labState.point.y);
    parts.push(`<circle cx="${px}" cy="${py}" r="6" fill="#1f77c7"/>`);
    parts.push(`<text x="${px + 8}" y="${py - 8}" fill="#1f77c7" font-size="12" font-weight="700">P${pointLabel(labState.point.x, labState.point.y)}</text>`);
  }

  if (labState.lastClick) {
    const px = toPixelX(labState.lastClick.x);
    const py = toPixelY(labState.lastClick.y);
    parts.push(`<circle cx="${px}" cy="${py}" r="8" fill="none" stroke="#d94e4e" stroke-width="2"/>`);
  }

  if (labState.target && labState.solvedTarget) {
    const px = toPixelX(labState.target.x);
    const py = toPixelY(labState.target.y);
    parts.push(`<polygon points="${px},${py - 10} ${px + 4},${py - 2} ${px + 12},${py - 2} ${px + 6},${py + 3} ${px + 8},${py + 11} ${px},${py + 6} ${px - 8},${py + 11} ${px - 6},${py + 3} ${px - 12},${py - 2} ${px - 4},${py - 2}" fill="#29a36a"/>`);
    parts.push(`<text x="${px + 10}" y="${py - 12}" fill="#29a36a" font-size="12" font-weight="700">Ziel</text>`);
  }

  ksLabSvg.innerHTML = parts.join("");
}

function setLabHint(text) {
  ksLabHint.textContent = text;
}

function applyInputPoint() {
  const x = clampCoord(Number(ksLabInputX.value));
  const y = clampCoord(Number(ksLabInputY.value));

  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    setLabHint("Bitte gültige Zahlen zwischen -10 und 10 eingeben.");
    return;
  }

  ksLabInputX.value = String(x);
  ksLabInputY.value = String(y);
  labState.point = { x, y };
  labState.lastClick = { x, y };
  setLabHint(`Punkt eingetragen: P${pointLabel(x, y)}.`);
  drawLab();
}

function newTarget() {
  let tx = randomInt(labState.min, labState.max);
  let ty = randomInt(labState.min, labState.max);
  while (tx === 0 && ty === 0) {
    tx = randomInt(labState.min, labState.max);
    ty = randomInt(labState.min, labState.max);
  }
  labState.target = { x: tx, y: ty };
  labState.solvedTarget = false;
  setLabHint(`Zielpunkt: Klicke T${pointLabel(tx, ty)} im Raster.`);
  drawLab();
}

function onLabClick(event) {
  const rect = ksLabSvg.getBoundingClientRect();
  const px = event.clientX - rect.left;
  const py = event.clientY - rect.top;

  const x = clampCoord(toCoordX(px));
  const y = clampCoord(toCoordY(py));

  labState.lastClick = { x, y };
  labState.point = { x, y };
  ksLabInputX.value = String(x);
  ksLabInputY.value = String(y);

  if (labState.target) {
    if (x === labState.target.x && y === labState.target.y) {
      labState.solvedTarget = true;
      setLabHint(`Treffer! Du hast den Zielpunkt T${pointLabel(x, y)} richtig geklickt.`);
    } else {
      setLabHint(`Du hast ${pointLabel(x, y)} geklickt. Ziel ist T${pointLabel(labState.target.x, labState.target.y)}.`);
    }
  } else {
    setLabHint(`Geklickter Punkt: ${pointLabel(x, y)}.`);
  }

  drawLab();
}

function setupLab() {
  ksLabDrawPoint.addEventListener("click", applyInputPoint);
  ksLabNewTarget.addEventListener("click", newTarget);
  ksLabSvg.addEventListener("click", onLabClick);
  setLabHint("Setze einen Punkt über Eingabe oder Klick ins Raster.");
  drawLab();
}

function getDifficultyRange(difficulty) {
  if (difficulty === "leicht") {
    return 5;
  }
  if (difficulty === "mittel") {
    return 8;
  }
  return 10;
}

function randomPointNoAxis(range) {
  let x = randomInt(-range, range);
  let y = randomInt(-range, range);
  while (x === 0 || y === 0) {
    x = randomInt(-range, range);
    y = randomInt(-range, range);
  }
  return { x, y };
}

function quadrantOfPoint(x, y) {
  if (x > 0 && y > 0) {
    return "I";
  }
  if (x < 0 && y > 0) {
    return "II";
  }
  if (x < 0 && y < 0) {
    return "III";
  }
  return "IV";
}

function createQuadrantTask(difficulty) {
  const range = getDifficultyRange(difficulty);
  const point = randomPointNoAxis(range);

  return {
    type: "choice",
    prompt: `In welchem Quadranten liegt P${pointLabel(point.x, point.y)}?`,
    options: [
      { value: "I", label: "I" },
      { value: "II", label: "II" },
      { value: "III", label: "III" },
      { value: "IV", label: "IV" },
    ],
    expected: quadrantOfPoint(point.x, point.y),
    explanation: `Vorzeichenregel prüfen: x = ${point.x}, y = ${point.y}.`,
  };
}

function createMoveTask(difficulty) {
  const range = getDifficultyRange(difficulty);
  const start = difficulty === "leicht"
    ? { x: 0, y: 0 }
    : { x: randomInt(-range, range), y: randomInt(-range, range) };

  const dx = randomInt(-range, range);
  const dy = randomInt(-range, range);
  const target = { x: start.x + dx, y: start.y + dy };

  const dirX = dx >= 0 ? `${dx} nach rechts` : `${Math.abs(dx)} nach links`;
  const dirY = dy >= 0 ? `${dy} nach oben` : `${Math.abs(dy)} nach unten`;

  return {
    type: "pair",
    prompt: `Starte bei S${pointLabel(start.x, start.y)}. Gehe ${dirX} und ${dirY}. Wo liegt der Endpunkt E?`,
    expectedX: target.x,
    expectedY: target.y,
    explanation: `E liegt bei ${pointLabel(target.x, target.y)}.`,
  };
}

function createAxisTask(difficulty) {
  const range = getDifficultyRange(difficulty);
  const variant = choice(["xAxis", "yAxis", "origin", "none"]);
  let point;

  if (variant === "origin") {
    point = { x: 0, y: 0 };
  } else if (variant === "xAxis") {
    point = { x: randomInt(-range, range), y: 0 };
    if (point.x === 0) {
      point.x = 1;
    }
  } else if (variant === "yAxis") {
    point = { x: 0, y: randomInt(-range, range) };
    if (point.y === 0) {
      point.y = -1;
    }
  } else {
    point = randomPointNoAxis(range);
  }

  return {
    type: "choice",
    prompt: `Wo liegt P${pointLabel(point.x, point.y)}?`,
    options: [
      { value: "xAxis", label: axisLabels.xAxis },
      { value: "yAxis", label: axisLabels.yAxis },
      { value: "origin", label: axisLabels.origin },
      { value: "none", label: axisLabels.none },
    ],
    expected: variant,
    explanation: `Hier gilt: x = ${point.x}, y = ${point.y}.`,
  };
}

function createFigureTask(difficulty) {
  const range = getDifficultyRange(difficulty);
  const variant = choice(["square", "rectangle", "none"]);

  let A;
  let B;
  let C;
  let D;

  if (variant === "square") {
    const side = randomInt(2, difficulty === "leicht" ? 4 : 6);
    const x = randomInt(-range, range - side);
    const y = randomInt(-range, range - side);
    A = { x, y };
    B = { x: x + side, y };
    C = { x: x + side, y: y + side };
    D = { x, y: y + side };
  } else if (variant === "rectangle") {
    const width = randomInt(2, 7);
    let height = randomInt(2, 7);
    while (height === width) {
      height = randomInt(2, 7);
    }
    const x = randomInt(-range, range - width);
    const y = randomInt(-range, range - height);
    A = { x, y };
    B = { x: x + width, y };
    C = { x: x + width, y: y + height };
    D = { x, y: y + height };
  } else {
    const x = randomInt(-range + 1, range - 5);
    const y = randomInt(-range + 1, range - 5);
    const w = randomInt(3, 6);
    const h = randomInt(2, 5);
    A = { x, y };
    B = { x: x + w, y };
    C = { x: x + w + 1, y: y + h };
    D = { x: x + 1, y: y + h };
  }

  return {
    type: "choice",
    prompt: `Welche Figur entsteht aus A${pointLabel(A.x, A.y)}, B${pointLabel(B.x, B.y)}, C${pointLabel(C.x, C.y)}, D${pointLabel(D.x, D.y)}?`,
    options: [
      { value: "square", label: figureLabels.square },
      { value: "rectangle", label: figureLabels.rectangle },
      { value: "none", label: figureLabels.none },
      { value: "parallelogram", label: figureLabels.parallelogram },
    ],
    expected: variant,
    explanation: `Passende Zuordnung: ${figureLabels[variant]}.`,
  };
}

function createTaskByType(type, difficulty) {
  if (type === "quadrant") {
    return createQuadrantTask(difficulty);
  }
  if (type === "move") {
    return createMoveTask(difficulty);
  }
  if (type === "axis") {
    return createAxisTask(difficulty);
  }
  return createFigureTask(difficulty);
}

function getSelectedTaskTypes() {
  return [...ksGenTypes].filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
}

function renderTaskRow(task, index) {
  const row = document.createElement("article");
  row.className = "ks-task-row";

  const prompt = document.createElement("p");
  prompt.innerHTML = `<strong>${index + 1}. ${task.prompt}</strong>`;

  const answerLine = document.createElement("div");
  answerLine.className = "ks-answer-line";

  if (task.type === "pair") {
    const labelX = document.createElement("label");
    labelX.textContent = "x";
    const inputX = document.createElement("input");
    inputX.type = "number";
    inputX.step = "1";
    inputX.className = "ks-input-small";
    inputX.name = `task-${index}-x`;
    labelX.append(inputX);

    const labelY = document.createElement("label");
    labelY.textContent = "y";
    const inputY = document.createElement("input");
    inputY.type = "number";
    inputY.step = "1";
    inputY.className = "ks-input-small";
    inputY.name = `task-${index}-y`;
    labelY.append(inputY);

    answerLine.append(labelX, labelY);
  } else {
    const select = document.createElement("select");
    select.name = `task-${index}-choice`;
    select.innerHTML = '<option value="">Bitte wählen</option>' +
      task.options.map((option) => `<option value="${option.value}">${option.label}</option>`).join("");
    answerLine.append(select);
  }

  const feedback = document.createElement("div");
  feedback.className = "task-feedback";

  row.append(prompt, answerLine, feedback);
  return row;
}

function renderTaskSet() {
  ksTaskList.replaceChildren();
  generatedTasks.forEach((task, index) => {
    ksTaskList.append(renderTaskRow(task, index));
  });
}

function generateTaskSet() {
  const difficulty = ksGenDifficulty.value;
  const count = Number(ksGenCount.value);
  const selectedTypes = getSelectedTaskTypes();

  if (selectedTypes.length === 0) {
    ksTaskFeedback.innerHTML = '<p class="feedback bad">Bitte mindestens einen Aufgabentyp auswählen.</p>';
    return;
  }

  const tasks = [];
  while (tasks.length < count) {
    tasks.push(createTaskByType(choice(selectedTypes), difficulty));
  }

  generatedTasks = tasks;
  renderTaskSet();
  ksTaskFeedback.innerHTML = '<p class="feedback info">Neue Aufgaben erstellt.</p>';
}

function checkGeneratedTasks() {
  if (generatedTasks.length === 0) {
    ksTaskFeedback.innerHTML = '<p class="feedback info">Erstelle zuerst eine Aufgabenrunde.</p>';
    return;
  }

  const rows = ksTaskList.querySelectorAll(".ks-task-row");
  let answered = 0;
  let correct = 0;

  rows.forEach((row, index) => {
    const task = generatedTasks[index];
    row.classList.remove("is-correct", "is-wrong");
    const feedback = row.querySelector(".task-feedback");
    if (!(feedback instanceof HTMLDivElement)) {
      return;
    }
    feedback.innerHTML = "";

    if (task.type === "pair") {
      const inputX = row.querySelector(`input[name="task-${index}-x"]`);
      const inputY = row.querySelector(`input[name="task-${index}-y"]`);
      if (!(inputX instanceof HTMLInputElement) || !(inputY instanceof HTMLInputElement)) {
        return;
      }

      const userX = parseNumberInput(inputX.value);
      const userY = parseNumberInput(inputY.value);
      if (!Number.isFinite(userX) || !Number.isFinite(userY)) {
        return;
      }

      answered += 1;
      if (nearlyEqual(userX, task.expectedX) && nearlyEqual(userY, task.expectedY)) {
        correct += 1;
        row.classList.add("is-correct");
        feedback.innerHTML = `<p class="feedback ok">Richtig. ${task.explanation}</p>`;
      } else {
        row.classList.add("is-wrong");
        feedback.innerHTML = `<p class="feedback bad">Nicht korrekt. Richtig: ${pointLabel(task.expectedX, task.expectedY)}. ${task.explanation}</p>`;
      }
      return;
    }

    const select = row.querySelector(`select[name="task-${index}-choice"]`);
    if (!(select instanceof HTMLSelectElement) || !select.value) {
      return;
    }

    answered += 1;
    if (select.value === task.expected) {
      correct += 1;
      row.classList.add("is-correct");
      feedback.innerHTML = `<p class="feedback ok">Richtig. ${task.explanation}</p>`;
    } else {
      row.classList.add("is-wrong");
      feedback.innerHTML = `<p class="feedback bad">Nicht korrekt. ${task.explanation}</p>`;
    }
  });

  if (answered < generatedTasks.length) {
    ksTaskFeedback.innerHTML = '<p class="feedback info">Bitte alle Aufgaben beantworten.</p>';
    return;
  }

  ksTaskFeedback.innerHTML = `
    <p class="feedback ${correct === generatedTasks.length ? "ok" : "bad"}">
      ${correct} / ${generatedTasks.length} richtig.
      ${correct === generatedTasks.length ? "Sehr gut." : "Nutze die Rückmeldungen und starte eine neue Runde."}
    </p>
  `;
}

function setupTaskGenerator() {
  generateTaskSet();
  ksGenerateTasks.addEventListener("click", generateTaskSet);
  ksCheckTasks.addEventListener("click", checkGeneratedTasks);
}

function pairTaskOptions(task) {
  const correct = pointLabel(task.expectedX, task.expectedY);
  const candidates = [
    pointLabel(-task.expectedX, task.expectedY),
    pointLabel(task.expectedX, -task.expectedY),
    pointLabel(-task.expectedX, -task.expectedY),
    pointLabel(task.expectedY, task.expectedX),
    pointLabel(task.expectedX + 1, task.expectedY),
    pointLabel(task.expectedX, task.expectedY + 1),
    pointLabel(task.expectedX - 1, task.expectedY),
    pointLabel(task.expectedX, task.expectedY - 1),
  ].filter((label) => label !== correct);

  const options = [correct];
  while (options.length < 4) {
    const pick = choice(candidates);
    if (!options.includes(pick)) {
      options.push(pick);
    }
  }

  return {
    options: shuffle(options),
    correctLabel: correct,
  };
}

function taskToQuizQuestion(task) {
  if (task.type === "pair") {
    const optionData = pairTaskOptions(task);
    return {
      prompt: task.prompt,
      options: optionData.options,
      correct: optionData.options.indexOf(optionData.correctLabel),
      explanation: task.explanation,
    };
  }

  const options = shuffle(task.options.map((option) => option.label));
  const correctLabel = task.options.find((option) => option.value === task.expected)?.label || "";

  return {
    prompt: task.prompt,
    options,
    correct: options.indexOf(correctLabel),
    explanation: task.explanation,
  };
}

function createQuizSet(count = 12) {
  const types = ["quadrant", "move", "axis", "figure"];
  const tasks = [];

  while (tasks.length < count) {
    const type = types[tasks.length % types.length];
    tasks.push(createTaskByType(type, choice(["leicht", "mittel", "schwer"])));
  }

  return shuffle(tasks).map((task) => taskToQuizQuestion(task));
}

function updateQuizScore() {
  ksQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  ksQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  ksQuizPrompt.textContent = question.prompt;
  ksQuizFeedback.innerHTML = "";
  ksQuizNext.disabled = true;
  ksQuizAnswers.innerHTML = question.options
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
  quizState.running = false;
  ksQuizStatus.textContent = "Test abgeschlossen.";
  ksQuizPrompt.textContent = "Du kannst den Test neu starten.";
  ksQuizAnswers.innerHTML = "";
  ksQuizFeedback.innerHTML = '<p class="feedback info">Starte neu für einen neuen Fragensatz.</p>';
  ksQuizNext.disabled = true;
  ksQuizStart.textContent = "Neu starten";
}

function submitQuizAnswer(optionIndex) {
  if (!quizState.running || quizState.answered) {
    return;
  }

  const question = quizState.questions[quizState.index];
  quizState.answered = true;
  const isCorrect = optionIndex === question.correct;

  if (isCorrect) {
    quizState.correct += 1;
  }

  updateQuizScore();

  ksQuizAnswers.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  ksQuizFeedback.innerHTML = `
    <p class="feedback ${isCorrect ? "ok" : "bad"}">
      ${isCorrect
        ? `Richtig. ${question.explanation}`
        : `Nicht korrekt. Richtige Antwort: "${question.options[question.correct]}". ${question.explanation}`}
    </p>
  `;

  ksQuizNext.disabled = false;
  ksQuizNext.textContent =
    quizState.index === quizState.questions.length - 1 ? "Ergebnis anzeigen" : "Nächste Frage";
}

function startQuiz() {
  quizState.running = true;
  quizState.answered = false;
  quizState.index = 0;
  quizState.correct = 0;
  quizState.questions = createQuizSet(12);

  ksQuizStart.textContent = "Test neu starten";
  updateQuizScore();
  renderQuizQuestion();
}

function nextQuizStep() {
  if (!quizState.running || !quizState.answered) {
    return;
  }

  if (quizState.index === quizState.questions.length - 1) {
    finishQuiz();
    return;
  }

  quizState.index += 1;
  quizState.answered = false;
  renderQuizQuestion();
}

function setupQuiz() {
  ksQuizStart.addEventListener("click", startQuiz);
  ksQuizNext.addEventListener("click", nextQuizStep);
  ksQuizAnswers.addEventListener("click", (event) => {
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
setupTopicModule();
setupLab();
setupTaskGenerator();
setupQuiz();
