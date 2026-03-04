const luTabButtons = document.querySelectorAll(".lu-tab-btn");
const luTabPanels = document.querySelectorAll(".lu-tab");

const luUnitButtons = document.querySelectorAll(".lu-unit-btn");
const luUnitTitle = document.getElementById("luUnitTitle");
const luUnitText = document.getElementById("luUnitText");
const luUnitList = document.getElementById("luUnitList");

const luEstimateList = document.getElementById("luEstimateList");
const luEstimateNewRound = document.getElementById("luEstimateNewRound");
const luEstimateCheck = document.getElementById("luEstimateCheck");
const luEstimateFeedback = document.getElementById("luEstimateFeedback");

const luGenDifficulty = document.getElementById("luGenDifficulty");
const luGenCount = document.getElementById("luGenCount");
const luGenTypes = document.querySelectorAll(".lu-gen-type");
const luGenerateTasks = document.getElementById("luGenerateTasks");
const luCheckTasks = document.getElementById("luCheckTasks");
const luTaskList = document.getElementById("luTaskList");
const luTaskFeedback = document.getElementById("luTaskFeedback");

const luQuizStart = document.getElementById("luQuizStart");
const luQuizNext = document.getElementById("luQuizNext");
const luQuizScore = document.getElementById("luQuizScore");
const luQuizStatus = document.getElementById("luQuizStatus");
const luQuizPrompt = document.getElementById("luQuizPrompt");
const luQuizAnswers = document.getElementById("luQuizAnswers");
const luQuizFeedback = document.getElementById("luQuizFeedback");

const units = ["mm", "cm", "dm", "m", "km"];
const unitToMm = {
  mm: 1,
  cm: 10,
  dm: 100,
  m: 1000,
  km: 1000000,
};

const unitNames = {
  mm: "Millimeter",
  cm: "Zentimeter",
  dm: "Dezimeter",
  m: "Meter",
  km: "Kilometer",
};

const estimatePool = [
  { prompt: "Dicke einer Münze: etwa 2 __", answer: "mm", explanation: "Sehr kleine Längen gibst du in mm an." },
  { prompt: "Länge eines Bleistifts: etwa 18 __", answer: "cm", explanation: "Das passt typischerweise zu cm." },
  { prompt: "Höhe einer Tür: etwa 2 __", answer: "m", explanation: "Türhöhen liegen ungefähr im Meterbereich." },
  { prompt: "Schulweg: etwa 3 __", answer: "km", explanation: "Längere Wege zwischen Orten gibst du in km an." },
  { prompt: "Breite eines Fingernagels: etwa 1 __", answer: "cm", explanation: "Kleine Alltagslängen passen oft zu cm." },
  { prompt: "Länge eines Fußballfelds: etwa 100 __", answer: "m", explanation: "Sportfelder werden in m angegeben." },
  { prompt: "Breite eines Radiergummis: etwa 35 __", answer: "mm", explanation: "Sehr kurze Strecken können sinnvoll in mm stehen." },
  { prompt: "Länge des Klassenraums: etwa 8 __", answer: "m", explanation: "Raumlängen gibst du typischerweise in m an." },
  { prompt: "Abstand zwischen zwei Städten: etwa 40 __", answer: "km", explanation: "Größere Entfernungen werden in km angegeben." },
  { prompt: "Länge eines Lineals: etwa 30 __", answer: "cm", explanation: "Das ist eine typische Zentimeter-Angabe." },
];

let estimateTasks = [];
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

function convertValue(value, fromUnit, toUnit) {
  return (value * unitToMm[fromUnit]) / unitToMm[toUnit];
}

function parseNumberInput(value) {
  const cleaned = String(value || "")
    .trim()
    .replace(/\s+/g, "")
    .replace(",", ".");
  if (!cleaned) {
    return Number.NaN;
  }
  return Number(cleaned);
}

function nearlyEqual(a, b) {
  const diff = Math.abs(a - b);
  const scale = Math.max(1, Math.abs(a), Math.abs(b));
  return diff <= 1e-6 * scale;
}

function formatNumber(value) {
  const rounded = Number(value.toFixed(6));
  return String(rounded).replace(".", ",");
}

function setupTabs() {
  luTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      luTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      luTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${target}`).classList.add("is-active");
    });
  });
}

function renderUnit(unit) {
  const index = units.indexOf(unit);
  const points = [];

  if (index > 0) {
    const smaller = units[index - 1];
    const factor = unitToMm[unit] / unitToMm[smaller];
    points.push(`1 ${unit} = ${factor} ${smaller}`);
  } else {
    points.push("Kleinste Einheit in diesem Modul.");
  }

  if (index < units.length - 1) {
    const bigger = units[index + 1];
    const factor = unitToMm[bigger] / unitToMm[unit];
    points.push(`${factor} ${unit} = 1 ${bigger}`);
  } else {
    points.push("Größte Einheit in diesem Modul.");
  }

  points.push(`Bezug zu Meter: 1 ${unit} = ${formatNumber(convertValue(1, unit, "m"))} m`);
  points.push(`Merkhilfe: Nach rechts auf der Leiter teilst du, nach links multiplizierst du.`);

  luUnitTitle.textContent = `${unit} - ${unitNames[unit]}`;
  luUnitText.textContent = `So rechnest du mit ${unit} in der Einheitenleiter.`;
  luUnitList.innerHTML = points.map((entry) => `<li>${entry}</li>`).join("");

  luUnitButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.unit === unit);
  });
}

function setupUnitExplorer() {
  luUnitButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderUnit(button.dataset.unit);
    });
  });
  renderUnit("mm");
}

function generateEstimateRound(count = 6) {
  return shuffle(estimatePool).slice(0, count).map((item) => ({ ...item }));
}

function renderEstimateRound() {
  luEstimateList.replaceChildren();
  estimateTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "lu-task-row";

    const prompt = document.createElement("p");
    prompt.innerHTML = `<strong>${index + 1}. ${task.prompt}</strong>`;

    const select = document.createElement("select");
    select.className = "lu-select";
    select.name = `estimate-${index}`;
    select.innerHTML = `
      <option value="">Einheit wählen</option>
      <option value="mm">mm</option>
      <option value="cm">cm</option>
      <option value="dm">dm</option>
      <option value="m">m</option>
      <option value="km">km</option>
    `;

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";

    row.append(prompt, select, feedback);
    luEstimateList.append(row);
  });
}

function checkEstimateRound() {
  const rows = luEstimateList.querySelectorAll(".lu-task-row");
  let answered = 0;
  let correct = 0;

  rows.forEach((row, index) => {
    row.classList.remove("is-correct", "is-wrong");
    const select = row.querySelector("select");
    const feedback = row.querySelector(".task-feedback");
    if (!(select instanceof HTMLSelectElement) || !(feedback instanceof HTMLDivElement)) {
      return;
    }

    feedback.innerHTML = "";
    if (!select.value) {
      return;
    }

    answered += 1;
    const task = estimateTasks[index];

    if (select.value === task.answer) {
      correct += 1;
      row.classList.add("is-correct");
      feedback.innerHTML = `<p class="feedback ok">Richtig. ${task.explanation}</p>`;
      return;
    }

    row.classList.add("is-wrong");
    feedback.innerHTML = `<p class="feedback bad">Nicht korrekt. Passend ist ${task.answer}. ${task.explanation}</p>`;
  });

  if (answered < estimateTasks.length) {
    luEstimateFeedback.innerHTML = '<p class="feedback info">Bitte alle Aufgaben beantworten.</p>';
    return;
  }

  luEstimateFeedback.innerHTML = `
    <p class="feedback ${correct === estimateTasks.length ? "ok" : "bad"}">
      ${correct} / ${estimateTasks.length} richtig.
      ${correct === estimateTasks.length ? "Sehr gut." : "Prüfe die Einheitenwahl noch einmal."}
    </p>
  `;
}

function setupEstimateModule() {
  estimateTasks = generateEstimateRound();
  renderEstimateRound();

  luEstimateNewRound.addEventListener("click", () => {
    estimateTasks = generateEstimateRound();
    renderEstimateRound();
    luEstimateFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });

  luEstimateCheck.addEventListener("click", checkEstimateRound);
}

function getSelectedTaskTypes() {
  return [...luGenTypes]
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
}

function randomUnitPair(difficulty) {
  let pairs;
  if (difficulty === "leicht") {
    pairs = [
      ["mm", "cm"],
      ["cm", "mm"],
      ["cm", "dm"],
      ["dm", "cm"],
      ["dm", "m"],
      ["m", "dm"],
      ["m", "km"],
      ["km", "m"],
    ];
  } else if (difficulty === "mittel") {
    pairs = [
      ["mm", "cm"],
      ["cm", "mm"],
      ["cm", "m"],
      ["m", "cm"],
      ["dm", "m"],
      ["m", "dm"],
      ["m", "km"],
      ["km", "m"],
      ["cm", "dm"],
      ["dm", "cm"],
    ];
  } else {
    pairs = [];
    units.forEach((from) => {
      units.forEach((to) => {
        if (from !== to) {
          pairs.push([from, to]);
        }
      });
    });
  }
  return choice(pairs);
}

function createConversionTask(difficulty) {
  const [fromUnit, toUnit] = randomUnitPair(difficulty);
  let value;

  if (difficulty === "leicht") {
    if (unitToMm[fromUnit] < unitToMm[toUnit]) {
      const factor = unitToMm[toUnit] / unitToMm[fromUnit];
      value = randomInt(2, 180) * factor;
    } else {
      value = randomInt(2, 300);
    }
  } else if (difficulty === "mittel") {
    if (Math.random() < 0.5) {
      value = randomInt(5, 900);
    } else {
      value = randomInt(10, 600) / 10;
    }
  } else {
    if (fromUnit === "mm" && toUnit === "km") {
      value = randomInt(1, 600) * 1000;
    } else {
      value = randomInt(10, 3000) / choice([1, 10, 100]);
    }
  }

  const expected = Number(convertValue(value, fromUnit, toUnit).toFixed(6));

  return {
    type: "numeric",
    prompt: `${formatNumber(value)} ${fromUnit} = ? ${toUnit}`,
    expected,
    expectedUnit: toUnit,
    explanation: `Umrechnung von ${fromUnit} nach ${toUnit}.`,
  };
}

function createUnitChoiceTask() {
  const item = choice(estimatePool);
  return {
    type: "choice",
    prompt: item.prompt,
    options: units,
    expected: item.answer,
    explanation: item.explanation,
  };
}

function createTextTask(difficulty) {
  const templates = [];

  templates.push(() => {
    const meters = randomInt(1, difficulty === "leicht" ? 12 : 40);
    const centimeters = randomInt(0, 99);
    return {
      type: "numeric",
      prompt: `${meters} m ${centimeters} cm = ? cm`,
      expected: meters * 100 + centimeters,
      expectedUnit: "cm",
      explanation: "Erst Meter in Zentimeter umrechnen, dann addieren.",
    };
  });

  templates.push(() => {
    const km = randomInt(1, difficulty === "leicht" ? 6 : 25);
    const m = randomInt(0, 999);
    return {
      type: "numeric",
      prompt: `${km} km ${m} m = ? m`,
      expected: km * 1000 + m,
      expectedUnit: "m",
      explanation: "Kilometer in Meter umrechnen und den Rest hinzufügen.",
    };
  });

  templates.push(() => {
    const cm = randomInt(120, difficulty === "leicht" ? 900 : 5000);
    return {
      type: "numeric",
      prompt: `Ein Seil ist ${cm} cm lang. Wie viele m sind das?`,
      expected: Number((cm / 100).toFixed(6)),
      expectedUnit: "m",
      explanation: "Von cm zu m teilst du durch 100.",
    };
  });

  if (difficulty !== "leicht") {
    templates.push(() => {
      const m1 = randomInt(1, 9) + randomInt(1, 9) / 10;
      const cm2 = randomInt(20, 95);
      const expected = Number((m1 * 100 + cm2).toFixed(6));
      return {
        type: "numeric",
        prompt: `Eine Strecke ist ${formatNumber(m1)} m und zusätzlich ${cm2} cm lang. Wie lang ist sie in cm?`,
        expected,
        expectedUnit: "cm",
        explanation: "Meter zuerst in Zentimeter umrechnen, dann addieren.",
      };
    });
  }

  return choice(templates)();
}

function createGeneratedTask(taskType, difficulty) {
  if (taskType === "umrechnen") {
    return createConversionTask(difficulty);
  }
  if (taskType === "einheit") {
    return createUnitChoiceTask();
  }
  return createTextTask(difficulty);
}

function buildTaskSet() {
  const difficulty = luGenDifficulty.value;
  const count = Number(luGenCount.value);
  const selectedTypes = getSelectedTaskTypes();

  if (selectedTypes.length === 0) {
    luTaskFeedback.innerHTML = '<p class="feedback bad">Bitte mindestens einen Aufgabentyp auswählen.</p>';
    return;
  }

  const tasks = [];
  selectedTypes.forEach((taskType) => {
    if (tasks.length < count) {
      tasks.push(createGeneratedTask(taskType, difficulty));
    }
  });

  while (tasks.length < count) {
    const taskType = choice(selectedTypes);
    tasks.push(createGeneratedTask(taskType, difficulty));
  }

  generatedTasks = shuffle(tasks);
  renderGeneratedTasks();
  luTaskFeedback.innerHTML = '<p class="feedback info">Neue Aufgaben wurden erstellt. Komma oder Punkt sind als Dezimaltrennzeichen erlaubt.</p>';
}

function renderGeneratedTasks() {
  luTaskList.replaceChildren();

  generatedTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "lu-task-row";

    const prompt = document.createElement("p");
    prompt.innerHTML = `<strong>${index + 1}. ${task.prompt}</strong>`;

    const answerLine = document.createElement("div");
    answerLine.className = "lu-answer-line";

    if (task.type === "numeric") {
      const input = document.createElement("input");
      input.type = "text";
      input.className = "lu-number-input";
      input.name = `task-${index}`;
      input.placeholder = "Antwort";
      answerLine.append(input);

      if (task.expectedUnit) {
        const unitText = document.createElement("span");
        unitText.textContent = task.expectedUnit;
        answerLine.append(unitText);
      }
    } else {
      const select = document.createElement("select");
      select.className = "lu-select";
      select.name = `task-${index}`;
      select.innerHTML =
        '<option value="">Wählen</option>' +
        task.options.map((option) => `<option value="${option}">${option}</option>`).join("");
      answerLine.append(select);
    }

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";

    row.append(prompt, answerLine, feedback);
    luTaskList.append(row);
  });
}

function checkGeneratedTasks() {
  const rows = luTaskList.querySelectorAll(".lu-task-row");
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

    if (task.type === "numeric") {
      const input = row.querySelector("input");
      if (!(input instanceof HTMLInputElement)) {
        return;
      }
      const value = parseNumberInput(input.value);
      if (!Number.isFinite(value)) {
        return;
      }
      answered += 1;

      if (nearlyEqual(value, task.expected)) {
        correct += 1;
        row.classList.add("is-correct");
        feedback.innerHTML = `<p class="feedback ok">Richtig. ${task.explanation}</p>`;
      } else {
        row.classList.add("is-wrong");
        feedback.innerHTML = `<p class="feedback bad">Nicht korrekt. Richtige Lösung: ${formatNumber(task.expected)} ${task.expectedUnit || ""}. ${task.explanation}</p>`;
      }
      return;
    }

    const select = row.querySelector("select");
    if (!(select instanceof HTMLSelectElement)) {
      return;
    }
    if (!select.value) {
      return;
    }

    answered += 1;
    if (select.value === task.expected) {
      correct += 1;
      row.classList.add("is-correct");
      feedback.innerHTML = `<p class="feedback ok">Richtig. ${task.explanation}</p>`;
    } else {
      row.classList.add("is-wrong");
      feedback.innerHTML = `<p class="feedback bad">Nicht korrekt. Richtig ist ${task.expected}. ${task.explanation}</p>`;
    }
  });

  if (generatedTasks.length === 0) {
    luTaskFeedback.innerHTML = '<p class="feedback info">Erstelle zuerst eine Aufgabenrunde.</p>';
    return;
  }

  if (answered < generatedTasks.length) {
    luTaskFeedback.innerHTML = '<p class="feedback info">Bitte alle Aufgaben beantworten.</p>';
    return;
  }

  luTaskFeedback.innerHTML = `
    <p class="feedback ${correct === generatedTasks.length ? "ok" : "bad"}">
      ${correct} / ${generatedTasks.length} richtig.
      ${correct === generatedTasks.length ? "Stark gelöst." : "Nutze die Rückmeldungen und erstelle neue Aufgaben."}
    </p>
  `;
}

function setupTaskGenerator() {
  buildTaskSet();
  luGenerateTasks.addEventListener("click", buildTaskSet);
  luCheckTasks.addEventListener("click", checkGeneratedTasks);
}

function createNumericOptions(correct, unit) {
  const candidates = [
    correct,
    correct * 10,
    correct / 10,
    correct * 100,
    correct / 100,
    correct + 1,
    correct - 1,
  ]
    .filter((value) => Number.isFinite(value) && value >= 0)
    .map((value) => Number(value.toFixed(6)));

  const unique = [...new Set(candidates)].slice(0, 8);
  const withLabels = unique.map((value) => `${formatNumber(value)} ${unit}`.trim());
  const correctLabel = `${formatNumber(Number(correct.toFixed(6)))} ${unit}`.trim();

  const optionSet = new Set(withLabels);
  optionSet.add(correctLabel);

  while (optionSet.size < 4) {
    const randomValue = Number((correct + randomInt(-12, 12) / 10).toFixed(3));
    if (randomValue >= 0) {
      optionSet.add(`${formatNumber(randomValue)} ${unit}`.trim());
    }
  }

  const options = shuffle([...optionSet]).slice(0, 4);
  if (!options.includes(correctLabel)) {
    options[0] = correctLabel;
  }

  return {
    options: shuffle(options),
    correctLabel,
  };
}

function createConversionQuizQuestion() {
  const task = createConversionTask(choice(["leicht", "mittel", "schwer"]));
  const optionData = createNumericOptions(task.expected, task.expectedUnit || "");
  return {
    prompt: task.prompt,
    options: optionData.options,
    correct: optionData.options.indexOf(optionData.correctLabel),
    explanation: task.explanation,
  };
}

function createUnitQuizQuestion() {
  const task = createUnitChoiceTask();
  const options = shuffle([...units]);
  return {
    prompt: `Welche Einheit passt am besten? ${task.prompt}`,
    options,
    correct: options.indexOf(task.expected),
    explanation: task.explanation,
  };
}

function createTextQuizQuestion() {
  const task = createTextTask(choice(["leicht", "mittel", "schwer"]));
  const optionData = createNumericOptions(task.expected, task.expectedUnit || "");
  return {
    prompt: task.prompt,
    options: optionData.options,
    correct: optionData.options.indexOf(optionData.correctLabel),
    explanation: task.explanation,
  };
}

function createQuizSet(count = 12) {
  const generators = [createConversionQuizQuestion, createUnitQuizQuestion, createTextQuizQuestion];
  const questions = [];

  while (questions.length < count) {
    const generator = generators[questions.length % generators.length];
    questions.push(generator());
  }

  return shuffle(questions);
}

function updateQuizScore() {
  luQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  luQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  luQuizPrompt.textContent = question.prompt;
  luQuizFeedback.innerHTML = "";
  luQuizNext.disabled = true;
  luQuizAnswers.innerHTML = question.options
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
  luQuizStatus.textContent = "Test abgeschlossen.";
  luQuizPrompt.textContent = "Du kannst den Test neu starten.";
  luQuizAnswers.innerHTML = "";
  luQuizFeedback.innerHTML = '<p class="feedback info">Starte neu für einen anderen Fragensatz.</p>';
  luQuizNext.disabled = true;
  luQuizStart.textContent = "Neu starten";
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

  luQuizAnswers.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  luQuizFeedback.innerHTML = `
    <p class="feedback ${isCorrect ? "ok" : "bad"}">
      ${isCorrect
        ? `Richtig. ${question.explanation}`
        : `Nicht korrekt. Richtige Antwort: "${question.options[question.correct]}". ${question.explanation}`}
    </p>
  `;

  luQuizNext.disabled = false;
  luQuizNext.textContent =
    quizState.index === quizState.questions.length - 1 ? "Ergebnis anzeigen" : "Nächste Frage";
}

function startQuiz() {
  quizState.running = true;
  quizState.answered = false;
  quizState.index = 0;
  quizState.correct = 0;
  quizState.questions = createQuizSet(12);

  luQuizStart.textContent = "Test neu starten";
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
  luQuizStart.addEventListener("click", startQuiz);
  luQuizNext.addEventListener("click", nextQuizStep);
  luQuizAnswers.addEventListener("click", (event) => {
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
setupUnitExplorer();
setupEstimateModule();
setupTaskGenerator();
setupQuiz();
