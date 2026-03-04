const spTabButtons = document.querySelectorAll(".sp-tab-btn");
const spTabPanels = document.querySelectorAll(".sp-tab");

const spThemeButtons = document.querySelectorAll(".sp-theme-btn");
const spThemeTitle = document.getElementById("spThemeTitle");
const spThemeText = document.getElementById("spThemeText");
const spThemeList = document.getElementById("spThemeList");

const spWorkbenchMode = document.getElementById("spWorkbenchMode");
const spWorkbenchX = document.getElementById("spWorkbenchX");
const spWorkbenchY = document.getElementById("spWorkbenchY");
const spWorkbenchApply = document.getElementById("spWorkbenchApply");
const spWorkbenchText = document.getElementById("spWorkbenchText");
const spWorkbenchSvg = document.getElementById("spWorkbenchSvg");

const spGenDifficulty = document.getElementById("spGenDifficulty");
const spGenCount = document.getElementById("spGenCount");
const spGenTypes = document.querySelectorAll(".sp-gen-type");
const spGenerateTasks = document.getElementById("spGenerateTasks");
const spCheckTasks = document.getElementById("spCheckTasks");
const spTaskList = document.getElementById("spTaskList");
const spTaskFeedback = document.getElementById("spTaskFeedback");

const spQuizStart = document.getElementById("spQuizStart");
const spQuizNext = document.getElementById("spQuizNext");
const spQuizScore = document.getElementById("spQuizScore");
const spQuizStatus = document.getElementById("spQuizStatus");
const spQuizPrompt = document.getElementById("spQuizPrompt");
const spQuizAnswers = document.getElementById("spQuizAnswers");
const spQuizFeedback = document.getElementById("spQuizFeedback");

const themeDetails = {
  achse: {
    title: "Achsensymmetrie",
    text: "Eine Figur ist achsensymmetrisch, wenn sie an einer Geraden gespiegelt wird und genau auf sich selbst passt.",
    points: [
      "Die Spiegelgerade heißt Symmetrieachse.",
      "Alle Punkte links und rechts der Achse haben den gleichen Abstand zur Achse.",
      "Eine Figur kann eine, mehrere oder keine Symmetrieachsen haben.",
      "Beispiele: gleichschenkliges Dreieck (1), Rechteck (2), Quadrat (4).",
    ],
  },
  punkt: {
    title: "Punktsymmetrie",
    text: "Eine Figur ist punktsymmetrisch, wenn sie nach einer Drehung um 180° um ein Zentrum wieder auf sich selbst liegt.",
    points: [
      "Das Zentrum heißt Symmetriezentrum.",
      "Bei der Punktspiegelung liegt das Zentrum genau in der Mitte zwischen Originalpunkt und Bildpunkt.",
      "Punktsymmetrie entspricht einer 180°-Drehung.",
      "Beispiele: Parallelogramm, Rechteck, Quadrat, regelmäßiges Sechseck.",
    ],
  },
  vergleich: {
    title: "Achsensymmetrie und Punktsymmetrie vergleichen",
    text: "Beide Symmetriearten haben klare Regeln, aber sie arbeiten unterschiedlich.",
    points: [
      "Achsensymmetrie nutzt eine Gerade als Spiegelachse.",
      "Punktsymmetrie nutzt einen Punkt als Zentrum einer 180°-Drehung.",
      "Eine Figur kann nur achsensymmetrisch, nur punktsymmetrisch, beides oder keines von beidem sein.",
      "Beispiel: Rechteck hat 2 Achsen und ist zusätzlich punktsymmetrisch.",
    ],
  },
  figuren: {
    title: "Typische Figuren",
    text: "Mit bekannten Figuren kannst du Symmetrie schnell erkennen.",
    points: [
      "Gleichseitiges Dreieck: 3 Achsen, nicht punktsymmetrisch.",
      "Parallelogramm: keine Achse, aber punktsymmetrisch.",
      "Raute: 2 Achsen und punktsymmetrisch.",
      "Gleichschenkliges Trapez: 1 Achse, nicht punktsymmetrisch.",
    ],
  },
};

const figureFacts = [
  { name: "gleichseitiges Dreieck", axisCount: 3, pointSym: false },
  { name: "gleichschenkliges Dreieck", axisCount: 1, pointSym: false },
  { name: "ungleichseitiges Dreieck", axisCount: 0, pointSym: false },
  { name: "Quadrat", axisCount: 4, pointSym: true },
  { name: "Rechteck", axisCount: 2, pointSym: true },
  { name: "Parallelogramm", axisCount: 0, pointSym: true },
  { name: "Raute", axisCount: 2, pointSym: true },
  { name: "regelmäßiges Fünfeck", axisCount: 5, pointSym: false },
  { name: "regelmäßiges Sechseck", axisCount: 6, pointSym: true },
  { name: "gleichschenkliges Trapez", axisCount: 1, pointSym: false },
  { name: "Buchstabe A (in Blockschrift)", axisCount: 1, pointSym: false },
  { name: "Buchstabe Z (in Blockschrift)", axisCount: 0, pointSym: true },
];

const propertyLabels = {
  axisOnly: "nur achsensymmetrisch",
  pointOnly: "nur punktsymmetrisch",
  both: "achsensymmetrisch und punktsymmetrisch",
  none: "weder achsensymmetrisch noch punktsymmetrisch",
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
  const diff = Math.abs(a - b);
  return diff <= 1e-6 * Math.max(1, Math.abs(a), Math.abs(b));
}

function pointLabel(x, y) {
  return `(${x}|${y})`;
}

function setupTabs() {
  spTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      spTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      spTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${target}`).classList.add("is-active");
    });
  });
}

function renderTheme(key) {
  const detail = themeDetails[key];
  if (!detail) {
    return;
  }

  spThemeTitle.textContent = detail.title;
  spThemeText.textContent = detail.text;
  spThemeList.innerHTML = detail.points.map((point) => `<li>${point}</li>`).join("");

  spThemeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.theme === key);
  });
}

function setupThemeModule() {
  spThemeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderTheme(button.dataset.theme);
    });
  });
  renderTheme("achse");
}

function reflectPoint(mode, x, y) {
  if (mode === "axisY") {
    return { x: -x, y, rule: "Spiegelung an der y-Achse: x wechselt das Vorzeichen." };
  }
  if (mode === "axisX") {
    return { x, y: -y, rule: "Spiegelung an der x-Achse: y wechselt das Vorzeichen." };
  }
  return { x: -x, y: -y, rule: "Punktspiegelung am Ursprung: x und y wechseln das Vorzeichen." };
}

function drawWorkbench(mode, x, y, imageX, imageY) {
  const size = 320;
  const padding = 24;
  const min = -8;
  const max = 8;
  const span = max - min;

  function toPixelX(value) {
    return padding + ((value - min) / span) * (size - 2 * padding);
  }

  function toPixelY(value) {
    return size - padding - ((value - min) / span) * (size - 2 * padding);
  }

  const parts = [];

  for (let i = min; i <= max; i += 1) {
    const px = toPixelX(i);
    const py = toPixelY(i);
    const major = i === 0;
    const color = major ? "#1f4f7d" : "#d7e5f2";
    const width = major ? 2 : 1;
    parts.push(`<line x1="${px}" y1="${padding}" x2="${px}" y2="${size - padding}" stroke="${color}" stroke-width="${width}"/>`);
    parts.push(`<line x1="${padding}" y1="${py}" x2="${size - padding}" y2="${py}" stroke="${color}" stroke-width="${width}"/>`);
  }

  if (mode === "axisY") {
    const ax = toPixelX(0);
    parts.push(`<line x1="${ax}" y1="${padding}" x2="${ax}" y2="${size - padding}" stroke="#2e7b5f" stroke-width="3" stroke-dasharray="4 4"/>`);
  }
  if (mode === "axisX") {
    const ay = toPixelY(0);
    parts.push(`<line x1="${padding}" y1="${ay}" x2="${size - padding}" y2="${ay}" stroke="#2e7b5f" stroke-width="3" stroke-dasharray="4 4"/>`);
  }
  if (mode === "point") {
    const ox = toPixelX(0);
    const oy = toPixelY(0);
    parts.push(`<circle cx="${ox}" cy="${oy}" r="5" fill="#2e7b5f"/>`);
  }

  const p1x = toPixelX(x);
  const p1y = toPixelY(y);
  const p2x = toPixelX(imageX);
  const p2y = toPixelY(imageY);

  parts.push(`<line x1="${p1x}" y1="${p1y}" x2="${p2x}" y2="${p2y}" stroke="#7c93a8" stroke-width="2" stroke-dasharray="5 4"/>`);
  parts.push(`<circle cx="${p1x}" cy="${p1y}" r="6" fill="#1f77c7"/>`);
  parts.push(`<circle cx="${p2x}" cy="${p2y}" r="6" fill="#d95252"/>`);
  parts.push(`<text x="${p1x + 8}" y="${p1y - 8}" font-size="12" fill="#1f77c7" font-weight="700">P</text>`);
  parts.push(`<text x="${p2x + 8}" y="${p2y - 8}" font-size="12" fill="#d95252" font-weight="700">P'</text>`);

  spWorkbenchSvg.innerHTML = parts.join("");
}

function applyWorkbench() {
  const mode = spWorkbenchMode.value;
  const x = Number(spWorkbenchX.value);
  const y = Number(spWorkbenchY.value);

  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    spWorkbenchText.textContent = "Bitte gültige Koordinaten eingeben.";
    return;
  }

  const result = reflectPoint(mode, x, y);
  spWorkbenchText.textContent = `P${pointLabel(x, y)} -> P'${pointLabel(result.x, result.y)}. ${result.rule}`;
  drawWorkbench(mode, x, y, result.x, result.y);
}

function setupWorkbench() {
  spWorkbenchApply.addEventListener("click", applyWorkbench);
  [spWorkbenchMode, spWorkbenchX, spWorkbenchY].forEach((element) => {
    element.addEventListener("change", applyWorkbench);
  });
  applyWorkbench();
}

function propertyKeyForFigure(figure) {
  if (figure.axisCount > 0 && figure.pointSym) {
    return "both";
  }
  if (figure.axisCount > 0) {
    return "axisOnly";
  }
  if (figure.pointSym) {
    return "pointOnly";
  }
  return "none";
}

function createAxisPointTask(difficulty) {
  const range = difficulty === "leicht" ? 6 : difficulty === "mittel" ? 8 : 12;
  const x = randomInt(-range, range);
  const y = randomInt(-range, range);

  let mode = choice(["axisY", "axisX"]);
  let axisValue = 0;

  if (difficulty === "schwer" && Math.random() < 0.55) {
    mode = choice(["vertical", "horizontal"]);
    axisValue = randomInt(-4, 4);
  }

  let expectedX = x;
  let expectedY = y;
  let axisText = "";
  let explanation = "";

  if (mode === "axisY") {
    expectedX = -x;
    axisText = "an der y-Achse";
    explanation = "Bei der Spiegelung an der y-Achse wechselt x das Vorzeichen.";
  } else if (mode === "axisX") {
    expectedY = -y;
    axisText = "an der x-Achse";
    explanation = "Bei der Spiegelung an der x-Achse wechselt y das Vorzeichen.";
  } else if (mode === "vertical") {
    expectedX = 2 * axisValue - x;
    axisText = `an der Geraden x = ${axisValue}`;
    explanation = "Originalpunkt und Bildpunkt haben zur Spiegelgeraden denselben Abstand.";
  } else {
    expectedY = 2 * axisValue - y;
    axisText = `an der Geraden y = ${axisValue}`;
    explanation = "Originalpunkt und Bildpunkt haben zur Spiegelgeraden denselben Abstand.";
  }

  return {
    type: "pointPair",
    prompt: `Spiegele P${pointLabel(x, y)} ${axisText}. Gib P' an.`,
    expectedX,
    expectedY,
    explanation,
  };
}

function createPointSymTask(difficulty) {
  const range = difficulty === "leicht" ? 6 : difficulty === "mittel" ? 8 : 12;
  const x = randomInt(-range, range);
  const y = randomInt(-range, range);

  let cx = 0;
  let cy = 0;
  if (difficulty !== "leicht") {
    cx = randomInt(-4, 4);
    cy = randomInt(-4, 4);
  }

  const expectedX = 2 * cx - x;
  const expectedY = 2 * cy - y;

  return {
    type: "pointPair",
    prompt: `Spiegele P${pointLabel(x, y)} punktsymmetrisch am Zentrum Z${pointLabel(cx, cy)}. Gib P' an.`,
    expectedX,
    expectedY,
    explanation: "Das Zentrum liegt genau in der Mitte zwischen P und P'.",
  };
}

function createFigurePropertyTask() {
  const figure = choice(figureFacts);
  const expected = propertyKeyForFigure(figure);

  return {
    type: "propertySelect",
    prompt: `Welche Aussage passt zur Figur "${figure.name}"?`,
    options: ["axisOnly", "pointOnly", "both", "none"],
    expected,
    explanation: `${figure.name}: ${propertyLabels[expected]}.`,
  };
}

function createAxisCountTask(difficulty) {
  let candidates = figureFacts.filter((item) => Number.isFinite(item.axisCount));
  if (difficulty === "leicht") {
    candidates = candidates.filter((item) => item.axisCount <= 4);
  }
  const figure = choice(candidates);

  return {
    type: "number",
    prompt: `Wie viele Symmetrieachsen hat die Figur "${figure.name}"?`,
    expected: figure.axisCount,
    explanation: `${figure.name} hat ${figure.axisCount} Symmetrieachsen.`,
  };
}

function getSelectedTaskTypes() {
  return [...spGenTypes].filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
}

function createTaskByType(taskType, difficulty) {
  if (taskType === "axisPoint") {
    return createAxisPointTask(difficulty);
  }
  if (taskType === "pointSym") {
    return createPointSymTask(difficulty);
  }
  if (taskType === "figureProps") {
    return createFigurePropertyTask();
  }
  return createAxisCountTask(difficulty);
}

function renderTaskRow(task, index) {
  const row = document.createElement("article");
  row.className = "sp-task-row";

  const prompt = document.createElement("p");
  prompt.innerHTML = `<strong>${index + 1}. ${task.prompt}</strong>`;

  const answerLine = document.createElement("div");
  answerLine.className = "sp-answer-line";

  if (task.type === "pointPair") {
    const labelX = document.createElement("label");
    labelX.textContent = "x'";
    const inputX = document.createElement("input");
    inputX.type = "number";
    inputX.step = "1";
    inputX.className = "sp-input-small";
    inputX.name = `task-${index}-x`;
    labelX.append(inputX);

    const labelY = document.createElement("label");
    labelY.textContent = "y'";
    const inputY = document.createElement("input");
    inputY.type = "number";
    inputY.step = "1";
    inputY.className = "sp-input-small";
    inputY.name = `task-${index}-y`;
    labelY.append(inputY);

    answerLine.append(labelX, labelY);
  } else if (task.type === "propertySelect") {
    const select = document.createElement("select");
    select.name = `task-${index}-prop`;
    select.innerHTML =
      '<option value="">Bitte wählen</option>' +
      task.options.map((option) => `<option value="${option}">${propertyLabels[option]}</option>`).join("");
    answerLine.append(select);
  } else {
    const input = document.createElement("input");
    input.type = "number";
    input.step = "1";
    input.className = "sp-input-small";
    input.name = `task-${index}-num`;
    answerLine.append(input);
  }

  const feedback = document.createElement("div");
  feedback.className = "task-feedback";

  row.append(prompt, answerLine, feedback);
  return row;
}

function renderTaskSet() {
  spTaskList.replaceChildren();
  generatedTasks.forEach((task, index) => {
    spTaskList.append(renderTaskRow(task, index));
  });
}

function generateTaskSet() {
  const difficulty = spGenDifficulty.value;
  const count = Number(spGenCount.value);
  const selectedTypes = getSelectedTaskTypes();

  if (selectedTypes.length === 0) {
    spTaskFeedback.innerHTML = '<p class="feedback bad">Bitte mindestens einen Aufgabentyp auswählen.</p>';
    return;
  }

  const tasks = [];
  while (tasks.length < count) {
    const taskType = choice(selectedTypes);
    tasks.push(createTaskByType(taskType, difficulty));
  }

  generatedTasks = tasks;
  renderTaskSet();
  spTaskFeedback.innerHTML = '<p class="feedback info">Neue Aufgaben erstellt.</p>';
}

function checkGeneratedTasks() {
  if (generatedTasks.length === 0) {
    spTaskFeedback.innerHTML = '<p class="feedback info">Erstelle zuerst eine Aufgabenrunde.</p>';
    return;
  }

  const rows = spTaskList.querySelectorAll(".sp-task-row");
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

    if (task.type === "pointPair") {
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
        feedback.innerHTML = `<p class="feedback bad">Nicht korrekt. Richtig ist P'${pointLabel(task.expectedX, task.expectedY)}. ${task.explanation}</p>`;
      }
      return;
    }

    if (task.type === "propertySelect") {
      const select = row.querySelector("select");
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
      return;
    }

    const input = row.querySelector(`input[name="task-${index}-num"]`);
    if (!(input instanceof HTMLInputElement)) {
      return;
    }
    const user = parseNumberInput(input.value);
    if (!Number.isFinite(user)) {
      return;
    }

    answered += 1;
    if (nearlyEqual(user, task.expected)) {
      correct += 1;
      row.classList.add("is-correct");
      feedback.innerHTML = `<p class="feedback ok">Richtig. ${task.explanation}</p>`;
    } else {
      row.classList.add("is-wrong");
      feedback.innerHTML = `<p class="feedback bad">Nicht korrekt. Richtige Zahl: ${task.expected}. ${task.explanation}</p>`;
    }
  });

  if (answered < generatedTasks.length) {
    spTaskFeedback.innerHTML = '<p class="feedback info">Bitte alle Aufgaben beantworten.</p>';
    return;
  }

  spTaskFeedback.innerHTML = `
    <p class="feedback ${correct === generatedTasks.length ? "ok" : "bad"}">
      ${correct} / ${generatedTasks.length} richtig.
      ${correct === generatedTasks.length ? "Sehr gut." : "Prüfe die Erklärungen und erstelle eine neue Runde."}
    </p>
  `;
}

function setupTaskGenerator() {
  generateTaskSet();
  spGenerateTasks.addEventListener("click", generateTaskSet);
  spCheckTasks.addEventListener("click", checkGeneratedTasks);
}

function taskToQuizQuestion(task) {
  if (task.type === "pointPair") {
    const correctLabel = pointLabel(task.expectedX, task.expectedY);
    const distractors = [
      pointLabel(-task.expectedX, task.expectedY),
      pointLabel(task.expectedX, -task.expectedY),
      pointLabel(-task.expectedX, -task.expectedY),
      pointLabel(task.expectedY, task.expectedX),
      pointLabel(task.expectedX + 1, task.expectedY),
      pointLabel(task.expectedX, task.expectedY + 1),
    ].filter((label) => label !== correctLabel);

    const options = [correctLabel];
    while (options.length < 4 && distractors.length > 0) {
      const pick = choice(distractors);
      if (!options.includes(pick)) {
        options.push(pick);
      }
      distractors.splice(distractors.indexOf(pick), 1);
    }

    while (options.length < 4) {
      const dx = randomInt(-2, 2);
      const dy = randomInt(-2, 2);
      const extra = pointLabel(task.expectedX + dx, task.expectedY + dy);
      if (!options.includes(extra)) {
        options.push(extra);
      }
    }

    return {
      prompt: task.prompt,
      options: shuffle(options),
      correctLabel,
      explanation: task.explanation,
    };
  }

  if (task.type === "propertySelect") {
    const options = task.options.map((key) => propertyLabels[key]);
    return {
      prompt: task.prompt,
      options: shuffle(options),
      correctLabel: propertyLabels[task.expected],
      explanation: task.explanation,
    };
  }

  const correctLabel = String(task.expected);
  const optionSet = new Set([
    correctLabel,
    String(task.expected + 1),
    String(Math.max(0, task.expected - 1)),
    String(task.expected + 2),
  ]);

  while (optionSet.size < 4) {
    const extra = String(Math.max(0, task.expected + randomInt(-3, 4)));
    optionSet.add(extra);
  }

  return {
    prompt: task.prompt,
    options: shuffle([...optionSet]).slice(0, 4),
    correctLabel,
    explanation: task.explanation,
  };
}

function createQuizSet(count = 12) {
  const types = ["axisPoint", "pointSym", "figureProps", "axisCount"];
  const difficulty = choice(["leicht", "mittel", "schwer"]);
  const tasks = [];

  while (tasks.length < count) {
    const type = types[tasks.length % types.length];
    tasks.push(createTaskByType(type, difficulty));
  }

  return shuffle(tasks).map((task) => {
    const q = taskToQuizQuestion(task);
    const correct = q.options.indexOf(q.correctLabel);
    return {
      prompt: q.prompt,
      options: q.options,
      correct,
      explanation: q.explanation,
    };
  });
}

function updateQuizScore() {
  spQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  spQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  spQuizPrompt.textContent = question.prompt;
  spQuizFeedback.innerHTML = "";
  spQuizNext.disabled = true;
  spQuizAnswers.innerHTML = question.options
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
  spQuizStatus.textContent = "Test abgeschlossen.";
  spQuizPrompt.textContent = "Du kannst den Test neu starten.";
  spQuizAnswers.innerHTML = "";
  spQuizFeedback.innerHTML = '<p class="feedback info">Starte neu für einen neuen Fragensatz.</p>';
  spQuizNext.disabled = true;
  spQuizStart.textContent = "Neu starten";
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

  spQuizAnswers.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  spQuizFeedback.innerHTML = `
    <p class="feedback ${isCorrect ? "ok" : "bad"}">
      ${isCorrect
        ? `Richtig. ${question.explanation}`
        : `Nicht korrekt. Richtige Antwort: "${question.options[question.correct]}". ${question.explanation}`}
    </p>
  `;

  spQuizNext.disabled = false;
  spQuizNext.textContent =
    quizState.index === quizState.questions.length - 1 ? "Ergebnis anzeigen" : "Nächste Frage";
}

function startQuiz() {
  quizState.running = true;
  quizState.answered = false;
  quizState.index = 0;
  quizState.correct = 0;
  quizState.questions = createQuizSet(12);
  spQuizStart.textContent = "Test neu starten";
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
  spQuizStart.addEventListener("click", startQuiz);
  spQuizNext.addEventListener("click", nextQuizStep);
  spQuizAnswers.addEventListener("click", (event) => {
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
setupThemeModule();
setupWorkbench();
setupTaskGenerator();
setupQuiz();
