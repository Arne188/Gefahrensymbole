const msTabButtons = document.querySelectorAll(".ms-tab-btn");
const msTabPanels = document.querySelectorAll(".ms-tab");

const msConceptButtons = document.querySelectorAll(".ms-concept-btn");
const msConceptTitle = document.getElementById("msConceptTitle");
const msConceptText = document.getElementById("msConceptText");
const msConceptList = document.getElementById("msConceptList");

const msLabMapValue = document.getElementById("msLabMapValue");
const msLabMapUnit = document.getElementById("msLabMapUnit");
const msLabScale = document.getElementById("msLabScale");
const msLabTargetUnit = document.getElementById("msLabTargetUnit");
const msLabCalculate = document.getElementById("msLabCalculate");
const msLabScenario = document.getElementById("msLabScenario");
const msLabResult = document.getElementById("msLabResult");

const msMiniList = document.getElementById("msMiniList");
const msMiniNew = document.getElementById("msMiniNew");
const msMiniCheck = document.getElementById("msMiniCheck");
const msMiniFeedback = document.getElementById("msMiniFeedback");

const msGenDifficulty = document.getElementById("msGenDifficulty");
const msGenCount = document.getElementById("msGenCount");
const msGenTypes = document.querySelectorAll(".ms-gen-type");
const msGenerateTasks = document.getElementById("msGenerateTasks");
const msCheckTasks = document.getElementById("msCheckTasks");
const msTaskList = document.getElementById("msTaskList");
const msTaskFeedback = document.getElementById("msTaskFeedback");

const msQuizStart = document.getElementById("msQuizStart");
const msQuizNext = document.getElementById("msQuizNext");
const msQuizScore = document.getElementById("msQuizScore");
const msQuizStatus = document.getElementById("msQuizStatus");
const msQuizPrompt = document.getElementById("msQuizPrompt");
const msQuizAnswers = document.getElementById("msQuizAnswers");
const msQuizFeedback = document.getElementById("msQuizFeedback");

const unitToCm = {
  mm: 0.1,
  cm: 1,
  m: 100,
  km: 100000,
};

const scaleSets = {
  leicht: [100, 200, 500, 1000],
  mittel: [250, 500, 1000, 2500, 5000, 10000, 25000],
  schwer: [125, 400, 750, 1200, 2500, 7500, 12500, 25000, 50000],
};

const conceptDetails = {
  lesen: {
    title: "Maßstab 1:n richtig lesen",
    text: "Ein Maßstab vergleicht Kartenlänge und Wirklichkeitslänge in derselben Einheit.",
    points: [
      "1:500 bedeutet: 1 cm auf der Karte entspricht 500 cm in Wirklichkeit.",
      "Je kleiner n ist, desto größer und detailreicher ist die Darstellung.",
      "Je größer n ist, desto kleiner und übersichtlicher ist die Darstellung.",
      "Wichtig: Maßstabszahlen sind keine Länge, sondern ein Verhältnis.",
    ],
  },
  einheiten: {
    title: "Einheiten angleichen",
    text: "Vor jeder Maßstabsrechnung müssen beide Strecken in derselben Einheit stehen.",
    points: [
      "Für Karten nutzt man häufig cm oder mm.",
      "1 m = 100 cm, 1 km = 1000 m = 100000 cm.",
      "Beispiel: 2,5 km erst in cm umrechnen, dann mit dem Maßstab vergleichen.",
      "Typischer Fehler: n direkt mit Metern kombinieren, ohne Umrechnung.",
    ],
  },
  wege: {
    title: "Von Karte zur Wirklichkeit und zurück",
    text: "Du kannst in beide Richtungen rechnen.",
    points: [
      "Karte zu Wirklichkeit: Kartenstrecke mit n multiplizieren.",
      "Wirklichkeit zu Karte: Wirklichkeitsstrecke durch n teilen.",
      "Formel mit k als Kartenstrecke und w als Wirklichkeitsstrecke: w = k · n und k = w : n.",
      "Am Ende in die gewünschte Zieleinheit umrechnen.",
    ],
  },
  pruefen: {
    title: "Ergebnisse prüfen",
    text: "Gute Mathematik endet nicht nach dem Rechnen, sondern mit einer Plausibilitätsprüfung.",
    points: [
      "Bei großen Maßstäben (z. B. 1:500) sind Kartenstrecken vergleichsweise lang.",
      "Bei kleinen Maßstäben (z. B. 1:50000) werden große reale Strecken stark verkleinert.",
      "Kontrolle: Wenn die Karte wenige Zentimeter zeigt, kann die Wirklichkeit Kilometer lang sein.",
      "Kontrolle: Wirkt das Ergebnis unplausibel, Einheiten und Rechenweg erneut prüfen.",
    ],
  },
};

const miniPool = [
  {
    prompt: "Was bedeutet der Maßstab 1:500?",
    options: [
      "1 cm auf der Karte sind 500 cm in Wirklichkeit.",
      "500 cm auf der Karte sind 1 cm in Wirklichkeit.",
      "1 cm auf der Karte sind 5 cm in Wirklichkeit.",
      "Der Maßstab sagt nichts über Längen aus.",
    ],
    answer: 0,
    explanation: "1:n bedeutet immer: 1 Längeneinheit auf der Karte entspricht n Längeneinheiten in Wirklichkeit.",
  },
  {
    prompt: "Welcher Maßstab zeigt mehr Details?",
    options: ["1:500", "1:5000", "1:50000", "Alle gleich"],
    answer: 0,
    explanation: "Die kleinere Zahl hinter dem Doppelpunkt zeigt die größere Darstellung.",
  },
  {
    prompt: "Welcher Schritt ist vor der Rechnung immer wichtig?",
    options: [
      "Einheiten auf beiden Seiten gleich machen.",
      "Immer zuerst auf km umrechnen.",
      "Immer durch 10 teilen.",
      "Immer runden, bevor gerechnet wird.",
    ],
    answer: 0,
    explanation: "Nur bei gleichen Einheiten ist die Verhältnisrechnung korrekt.",
  },
  {
    prompt: "3 cm auf der Karte bei 1:10000 entsprechen in Wirklichkeit ...",
    options: ["30 m", "300 m", "3 km", "3000 m"],
    answer: 1,
    explanation: "3 · 10000 = 30000 cm = 300 m.",
  },
  {
    prompt: "Welche Rechnung passt zu 'Wirklichkeit zu Karte'?",
    options: ["Wirklichkeit durch n teilen", "Wirklichkeit mit n multiplizieren", "n durch Wirklichkeit teilen", "Immer minus n rechnen"],
    answer: 0,
    explanation: "Für die verkleinerte Darstellung teilst du durch den Maßstabsfaktor.",
  },
  {
    prompt: "Wie viele Zentimeter sind 2 km?",
    options: ["200 cm", "2000 cm", "20000 cm", "200000 cm"],
    answer: 3,
    explanation: "2 km = 2000 m = 200000 cm.",
  },
];

const labScenarios = [
  { mapValue: 4, mapUnit: "cm", scale: 25000, targetUnit: "km" },
  { mapValue: 7.5, mapUnit: "cm", scale: 10000, targetUnit: "m" },
  { mapValue: 32, mapUnit: "mm", scale: 5000, targetUnit: "m" },
  { mapValue: 2.4, mapUnit: "cm", scale: 50000, targetUnit: "km" },
];

let miniTasks = [];
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

function formatNumber(value, maxDecimals = 4) {
  const rounded = Number(Number(value).toFixed(maxDecimals));
  return rounded.toLocaleString("de-DE", {
    maximumFractionDigits: maxDecimals,
  });
}

function formatScale(scale) {
  return Math.round(scale).toLocaleString("de-DE");
}

function nearlyEqual(a, b, tolerance = 1e-3) {
  return Math.abs(a - b) <= tolerance;
}

function toCm(value, unit) {
  return value * unitToCm[unit];
}

function fromCm(value, unit) {
  return value / unitToCm[unit];
}

function taskTolerance(task) {
  if (task.unit === "n") {
    return 0.5;
  }
  return Math.max(0.01, Math.abs(task.answer) * 0.002);
}

function formatTaskAnswer(task) {
  if (task.unit === "n") {
    return `1:${formatScale(task.answer)}`;
  }
  return `${formatNumber(task.answer)} ${task.unit}`;
}

function setupTabs() {
  msTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      msTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      msTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${target}`).classList.add("is-active");
    });
  });
}

function renderConcept(key) {
  const detail = conceptDetails[key];
  if (!detail) {
    return;
  }

  msConceptTitle.textContent = detail.title;
  msConceptText.textContent = detail.text;
  msConceptList.innerHTML = detail.points.map((point) => `<li>${point}</li>`).join("");

  msConceptButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.concept === key);
  });
}

function setupConceptModule() {
  msConceptButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderConcept(button.dataset.concept);
    });
  });
  renderConcept("lesen");
}

function runLabCalculation() {
  const mapValue = parseNumberInput(msLabMapValue.value);
  const mapUnit = msLabMapUnit.value;
  const scale = Number(msLabScale.value);
  const targetUnit = msLabTargetUnit.value;

  if (!Number.isFinite(mapValue) || mapValue <= 0) {
    msLabResult.innerHTML = '<p class="feedback bad">Bitte gib eine positive Kartenstrecke ein.</p>';
    return;
  }

  if (!Number.isFinite(scale) || scale <= 1) {
    msLabResult.innerHTML = '<p class="feedback bad">Bitte gib für n eine Zahl größer als 1 ein.</p>';
    return;
  }

  const mapCm = toCm(mapValue, mapUnit);
  const realCm = mapCm * scale;
  const targetValue = fromCm(realCm, targetUnit);

  msLabResult.innerHTML = `
    <p class="ms-lab-calc-line">Ergebnis: ${formatNumber(targetValue)} ${targetUnit}</p>
    <p>Schritt 1: Kartenstrecke in cm: ${formatNumber(mapValue)} ${mapUnit} = ${formatNumber(mapCm)} cm</p>
    <p>Schritt 2: In Wirklichkeit: ${formatNumber(mapCm)} · ${formatScale(scale)} = ${formatNumber(realCm)} cm</p>
    <p>Schritt 3: Umrechnen in ${targetUnit}: ${formatNumber(realCm)} cm = ${formatNumber(targetValue)} ${targetUnit}</p>
  `;
}

function applyLabScenario(scenario) {
  msLabMapValue.value = formatNumber(scenario.mapValue, 3).replace(/\./g, "");
  msLabMapUnit.value = scenario.mapUnit;
  msLabScale.value = String(scenario.scale);
  msLabTargetUnit.value = scenario.targetUnit;
  runLabCalculation();
}

function setupLabModule() {
  msLabCalculate.addEventListener("click", runLabCalculation);
  msLabScenario.addEventListener("click", () => {
    applyLabScenario(choice(labScenarios));
  });
  runLabCalculation();
}

function generateMiniRound(count = 4) {
  return shuffle(miniPool).slice(0, count).map((task) => ({ ...task }));
}

function renderMiniRound() {
  msMiniList.replaceChildren();

  miniTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "ms-task-row";

    const prompt = document.createElement("p");
    prompt.innerHTML = `<strong>${index + 1}. ${task.prompt}</strong>`;

    const select = document.createElement("select");
    select.innerHTML = [
      "<option value=''>Antwort wählen</option>",
      ...task.options.map((option, optionIndex) => `<option value='${optionIndex}'>${option}</option>`),
    ].join("");

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";

    row.append(prompt, select, feedback);
    msMiniList.append(row);
  });
}

function checkMiniRound() {
  const rows = msMiniList.querySelectorAll(".ms-task-row");
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
    if (select.value === "") {
      return;
    }

    answered += 1;
    const selected = Number(select.value);
    const task = miniTasks[index];

    if (selected === task.answer) {
      correct += 1;
      row.classList.add("is-correct");
      feedback.innerHTML = `<p class="feedback ok">Richtig. ${task.explanation}</p>`;
      return;
    }

    row.classList.add("is-wrong");
    feedback.innerHTML = `<p class="feedback bad">Nicht korrekt. Richtige Antwort: ${task.options[task.answer]}. ${task.explanation}</p>`;
  });

  if (answered < miniTasks.length) {
    msMiniFeedback.innerHTML = '<p class="feedback info">Bitte beantworte alle Fragen.</p>';
    return;
  }

  msMiniFeedback.innerHTML = `<p class="feedback ${correct === miniTasks.length ? "ok" : "bad"}">${correct} / ${miniTasks.length} richtig.</p>`;
}

function setupMiniModule() {
  miniTasks = generateMiniRound();
  renderMiniRound();

  msMiniNew.addEventListener("click", () => {
    miniTasks = generateMiniRound();
    renderMiniRound();
    msMiniFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });

  msMiniCheck.addEventListener("click", checkMiniRound);
}

function selectedTaskTypes() {
  return [...msGenTypes].filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
}

function createMapToRealTask(difficulty) {
  if (difficulty === "leicht") {
    const scale = choice(scaleSets.leicht);
    const mapValue = randomInt(2, 30);
    const answer = (mapValue * scale) / 100;

    return {
      type: "karte-zu-wirklichkeit",
      prompt: `Auf einer Karte im Maßstab 1:${formatScale(scale)} misst eine Strecke ${mapValue} cm. Wie lang ist sie in Wirklichkeit in m?`,
      answer,
      unit: "m",
      explanation: `Karte · n: ${mapValue} · ${formatScale(scale)} = ${formatScale(mapValue * scale)} cm = ${formatNumber(answer)} m`,
    };
  }

  if (difficulty === "mittel") {
    const scale = choice(scaleSets.mittel);
    const mapUnit = Math.random() < 0.65 ? "cm" : "mm";
    const mapValue = randomInt(6, 240) / 10;
    const targetUnit = scale >= 10000 && Math.random() < 0.55 ? "km" : "m";
    const answer = fromCm(toCm(mapValue, mapUnit) * scale, targetUnit);

    return {
      type: "karte-zu-wirklichkeit",
      prompt: `Auf einer Karte im Maßstab 1:${formatScale(scale)} beträgt die Strecke ${formatNumber(mapValue)} ${mapUnit}. Wie lang ist sie in der Wirklichkeit in ${targetUnit}?`,
      answer,
      unit: targetUnit,
      explanation: `Erst in cm umrechnen, dann mit n multiplizieren und in ${targetUnit} umrechnen.`,
    };
  }

  for (let tries = 0; tries < 40; tries += 1) {
    const scale = choice(scaleSets.schwer);
    const mapUnit = Math.random() < 0.5 ? "cm" : "mm";
    const mapValue = randomInt(4, 360) / 10;
    const targetUnit = Math.random() < 0.55 ? "m" : "km";
    const answer = fromCm(toCm(mapValue, mapUnit) * scale, targetUnit);

    if (targetUnit === "km" && (answer < 0.03 || answer > 500)) {
      continue;
    }

    return {
      type: "karte-zu-wirklichkeit",
      prompt: `Eine Strecke ist auf der Karte ${formatNumber(mapValue)} ${mapUnit} lang (Maßstab 1:${formatScale(scale)}). Gib die reale Länge in ${targetUnit} an.`,
      answer,
      unit: targetUnit,
      explanation: "Kartenlänge in cm bringen, mit n multiplizieren und in die Zieleinheit umwandeln.",
    };
  }

  return createMapToRealTask("mittel");
}

function createRealToMapTask(difficulty) {
  if (difficulty === "leicht") {
    const scale = choice(scaleSets.leicht);
    const mapCm = randomInt(2, 35);
    const realM = (mapCm * scale) / 100;

    return {
      type: "wirklichkeit-zu-karte",
      prompt: `In Wirklichkeit ist eine Strecke ${formatNumber(realM)} m lang. Wie lang ist sie auf einer Karte im Maßstab 1:${formatScale(scale)} in cm?`,
      answer: mapCm,
      unit: "cm",
      explanation: `Wirklichkeit in cm: ${formatNumber(realM)} m = ${formatScale(realM * 100)} cm, dann durch ${formatScale(scale)} teilen.`,
    };
  }

  if (difficulty === "mittel") {
    const scale = choice(scaleSets.mittel);

    if (Math.random() < 0.55) {
      const mapCm = randomInt(4, 160) / 2;
      const realM = (mapCm * scale) / 100;

      return {
        type: "wirklichkeit-zu-karte",
        prompt: `Eine reale Strecke ist ${formatNumber(realM)} m lang. Welche Kartenlänge in cm ergibt sich bei 1:${formatScale(scale)}?`,
        answer: mapCm,
        unit: "cm",
        explanation: "Wirklichkeitsstrecke in cm umrechnen und durch n teilen.",
      };
    }

    const mapMm = randomInt(12, 380);
    const realM = ((mapMm / 10) * scale) / 100;

    return {
      type: "wirklichkeit-zu-karte",
      prompt: `Bei 1:${formatScale(scale)} soll eine reale Strecke von ${formatNumber(realM)} m als Planstrecke in mm dargestellt werden. Wie viele mm sind es?`,
      answer: mapMm,
      unit: "mm",
      explanation: "Erst Wirklichkeit in cm, dann durch n teilen und am Ende in mm umrechnen.",
    };
  }

  for (let tries = 0; tries < 40; tries += 1) {
    const scale = choice(scaleSets.schwer);
    const mapCm = randomInt(5, 420) / 10;
    const realKm = (mapCm * scale) / 100000;

    if (realKm < 0.08 || realKm > 600) {
      continue;
    }

    return {
      type: "wirklichkeit-zu-karte",
      prompt: `Eine reale Strecke ist ${formatNumber(realKm)} km lang. Wie groß ist die Kartenstrecke in cm bei 1:${formatScale(scale)}?`,
      answer: mapCm,
      unit: "cm",
      explanation: "km in cm umrechnen, anschließend durch den Maßstabsfaktor teilen.",
    };
  }

  return createRealToMapTask("mittel");
}

function createFindScaleTask(difficulty) {
  if (difficulty === "leicht") {
    const scale = choice([...scaleSets.leicht, 2500]);
    const mapCm = randomInt(2, 24);
    const realM = (mapCm * scale) / 100;

    return {
      type: "massstab-finden",
      prompt: `Auf einer Karte sind ${mapCm} cm eingezeichnet. In Wirklichkeit sind es ${formatNumber(realM)} m. Welcher Maßstab 1:n passt? Gib n an.`,
      answer: scale,
      unit: "n",
      explanation: "Beide Längen in cm vergleichen und Wirklichkeit durch Karte teilen.",
    };
  }

  if (difficulty === "mittel") {
    const scale = choice(scaleSets.mittel);
    const mapCm = randomInt(4, 180) / 10;
    const realKm = (mapCm * scale) / 100000;

    return {
      type: "massstab-finden",
      prompt: `Eine Kartenstrecke von ${formatNumber(mapCm)} cm entspricht ${formatNumber(realKm)} km in Wirklichkeit. Bestimme den Maßstab 1:n (nur n eingeben).`,
      answer: scale,
      unit: "n",
      explanation: "Reale Länge in cm umrechnen und durch Kartenlänge teilen.",
    };
  }

  const scale = choice(scaleSets.schwer);
  const mapMm = randomInt(8, 260);
  const realM = ((mapMm / 10) * scale) / 100;

  return {
    type: "massstab-finden",
    prompt: `In einem Plan sind ${mapMm} mm eingezeichnet. In Wirklichkeit entspricht das ${formatNumber(realM)} m. Wie lautet der Maßstab 1:n?`,
    answer: scale,
    unit: "n",
    explanation: "mm in cm umwandeln, Wirklichkeit in cm umrechnen, dann Verhältnis bilden.",
  };
}

function createTextTask(difficulty) {
  const templates = [
    () => {
      const scale = difficulty === "leicht" ? choice([5000, 10000, 25000]) : choice([10000, 25000, 50000]);
      const mapCm = difficulty === "leicht" ? randomInt(2, 18) : randomInt(6, 240) / 10;
      const answer = (mapCm * scale) / 100000;
      return {
        type: "textaufgabe",
        prompt: `Auf einer Wanderkarte (1:${formatScale(scale)}) misst der Weg zum Aussichtspunkt ${formatNumber(mapCm)} cm. Wie viele km gehst du in Wirklichkeit?`,
        answer,
        unit: "km",
        explanation: "Kartenstrecke mit n multiplizieren und von cm nach km umrechnen.",
      };
    },
    () => {
      const scale = difficulty === "schwer" ? choice([750, 1200, 2500]) : choice([100, 200, 500, 1000]);
      const mapCm = difficulty === "leicht" ? randomInt(3, 24) : randomInt(8, 220) / 10;
      const realM = (mapCm * scale) / 100;
      return {
        type: "textaufgabe",
        prompt: `Für ein Modell soll eine Allee (real ${formatNumber(realM)} m) im Maßstab 1:${formatScale(scale)} gezeichnet werden. Wie lang ist die Zeichnung in cm?`,
        answer: mapCm,
        unit: "cm",
        explanation: "Reale Länge in cm umwandeln und durch n teilen.",
      };
    },
    () => {
      const scale = difficulty === "leicht" ? choice([10000, 25000]) : choice([25000, 50000]);
      const first = difficulty === "leicht" ? randomInt(1, 9) : randomInt(4, 120) / 10;
      const second = difficulty === "leicht" ? randomInt(1, 9) : randomInt(4, 120) / 10;
      const totalCm = first + second;
      const answer = (totalCm * scale) / 1000;
      return {
        type: "textaufgabe",
        prompt: `Auf einer Karte im Maßstab 1:${formatScale(scale)} ist der Schulweg in zwei Abschnitte geteilt: ${formatNumber(first)} cm und ${formatNumber(second)} cm. Wie lang ist der gesamte Weg in m?`,
        answer,
        unit: "m",
        explanation: "Kartenabschnitte addieren, dann mit n multiplizieren und in m umrechnen.",
      };
    },
  ];

  return choice(templates)();
}

function createTaskByType(type, difficulty) {
  if (type === "karte-zu-wirklichkeit") {
    return createMapToRealTask(difficulty);
  }
  if (type === "wirklichkeit-zu-karte") {
    return createRealToMapTask(difficulty);
  }
  if (type === "massstab-finden") {
    return createFindScaleTask(difficulty);
  }
  return createTextTask(difficulty);
}

function buildTaskSet(difficulty, count, types) {
  const tasks = [];
  for (let i = 0; i < count; i += 1) {
    tasks.push(createTaskByType(choice(types), difficulty));
  }
  return tasks;
}

function renderGeneratedTasks() {
  msTaskList.replaceChildren();

  generatedTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "ms-task-row";

    const prompt = document.createElement("p");
    prompt.innerHTML = `<strong>${index + 1}. ${task.prompt}</strong>`;

    const answerLine = document.createElement("div");
    answerLine.className = "ms-answer-line";

    const input = document.createElement("input");
    input.type = "text";
    input.inputMode = "decimal";
    input.className = "ms-number-input";
    input.placeholder = task.unit === "n" ? "n eingeben" : "Antwort eingeben";

    const unit = document.createElement("span");
    unit.className = "ms-unit-chip";
    unit.textContent = task.unit === "n" ? "1:n" : task.unit;

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";

    answerLine.append(input, unit);
    row.append(prompt, answerLine, feedback);
    msTaskList.append(row);
  });
}

function generateTasks() {
  const difficulty = msGenDifficulty.value;
  const count = Number(msGenCount.value);
  const types = selectedTaskTypes();

  if (types.length === 0) {
    msTaskFeedback.innerHTML = '<p class="feedback bad">Bitte wähle mindestens einen Aufgabentyp aus.</p>';
    return;
  }

  generatedTasks = buildTaskSet(difficulty, count, types);
  renderGeneratedTasks();
  msTaskFeedback.innerHTML = '<p class="feedback info">Neue Aufgaben wurden erstellt.</p>';
}

function checkGeneratedTasks() {
  const rows = msTaskList.querySelectorAll(".ms-task-row");
  if (rows.length === 0) {
    msTaskFeedback.innerHTML = '<p class="feedback bad">Erstelle zuerst eine Aufgabengruppe.</p>';
    return;
  }

  let answered = 0;
  let correct = 0;

  rows.forEach((row, index) => {
    row.classList.remove("is-correct", "is-wrong");
    const input = row.querySelector("input");
    const feedback = row.querySelector(".task-feedback");

    if (!(input instanceof HTMLInputElement) || !(feedback instanceof HTMLDivElement)) {
      return;
    }

    feedback.innerHTML = "";
    const value = parseNumberInput(input.value);
    if (!Number.isFinite(value)) {
      return;
    }

    answered += 1;
    const task = generatedTasks[index];
    const tolerance = taskTolerance(task);

    if (nearlyEqual(value, task.answer, tolerance)) {
      correct += 1;
      row.classList.add("is-correct");
      feedback.innerHTML = `<p class="feedback ok">Richtig. ${task.explanation}</p>`;
      return;
    }

    row.classList.add("is-wrong");
    feedback.innerHTML = `<p class="feedback bad">Nicht korrekt. Richtig ist ${formatTaskAnswer(task)}. ${task.explanation}</p>`;
  });

  if (answered < generatedTasks.length) {
    msTaskFeedback.innerHTML = '<p class="feedback info">Bitte beantworte alle Aufgaben.</p>';
    return;
  }

  msTaskFeedback.innerHTML = `<p class="feedback ${correct === generatedTasks.length ? "ok" : "bad"}">${correct} / ${generatedTasks.length} richtig.</p>`;
}

function setupGeneratorModule() {
  msGenerateTasks.addEventListener("click", generateTasks);
  msCheckTasks.addEventListener("click", checkGeneratedTasks);
  generateTasks();
}

function buildNumericOptions(answer) {
  const target = Number(answer);
  const candidates = new Set([Number(target.toFixed(4))]);

  const factors = [0.5, 0.75, 1.25, 1.5, 2, 2.5];
  factors.forEach((factor) => {
    const value = Number((target * factor).toFixed(4));
    if (value > 0) {
      candidates.add(value);
    }
  });

  const span = Math.max(0.2, Math.abs(target) * 0.3);
  candidates.add(Number((target + span).toFixed(4)));
  if (target - span > 0) {
    candidates.add(Number((target - span).toFixed(4)));
  }

  const options = [...candidates].filter((value) => Number.isFinite(value) && value > 0);
  const filtered = options.filter((value) => Math.abs(value - target) > 1e-6);
  const picks = shuffle(filtered).slice(0, 3);
  const all = shuffle([target, ...picks]);

  return {
    options: all,
    correctIndex: all.findIndex((value) => nearlyEqual(value, target, 1e-8)),
  };
}

function buildScaleOptions(answer) {
  const target = Math.round(answer);
  const candidates = new Set([target]);

  [0.5, 0.8, 1.2, 1.5, 2].forEach((factor) => {
    const value = Math.max(2, Math.round(target * factor));
    candidates.add(value);
  });

  candidates.add(Math.max(2, target + randomInt(25, 300)));
  candidates.add(Math.max(2, target - randomInt(20, 200)));

  const options = [...candidates].filter((value) => value !== target && value > 1);
  const picks = shuffle(options).slice(0, 3);
  const all = shuffle([target, ...picks]);

  return {
    options: all,
    correctIndex: all.indexOf(target),
  };
}

function createQuizQuestion(difficulty) {
  const types = ["karte-zu-wirklichkeit", "wirklichkeit-zu-karte", "massstab-finden", "textaufgabe"];
  const task = createTaskByType(choice(types), difficulty);

  if (task.unit === "n") {
    const optionData = buildScaleOptions(task.answer);
    return {
      prompt: task.prompt,
      options: optionData.options.map((value) => `1:${formatScale(value)}`),
      correctIndex: optionData.correctIndex,
      explanation: `${task.explanation} Richtig ist 1:${formatScale(task.answer)}.`,
    };
  }

  const optionData = buildNumericOptions(task.answer);
  return {
    prompt: task.prompt,
    options: optionData.options.map((value) => `${formatNumber(value)} ${task.unit}`),
    correctIndex: optionData.correctIndex,
    explanation: `${task.explanation} Richtig ist ${formatNumber(task.answer)} ${task.unit}.`,
  };
}

function buildQuizSet() {
  const questions = [];
  for (let i = 0; i < 12; i += 1) {
    const difficulty = i < 4 ? "leicht" : i < 8 ? "mittel" : "schwer";
    questions.push(createQuizQuestion(difficulty));
  }
  return questions;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  if (!question) {
    return;
  }

  msQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  msQuizPrompt.textContent = question.prompt;
  msQuizFeedback.innerHTML = "";
  msQuizAnswers.replaceChildren();

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "ms-quiz-option";
    button.textContent = option;
    button.addEventListener("click", () => answerQuiz(index));
    msQuizAnswers.append(button);
  });

  msQuizNext.disabled = true;
  quizState.answered = false;
}

function answerQuiz(selectedIndex) {
  if (!quizState.running || quizState.answered) {
    return;
  }

  const question = quizState.questions[quizState.index];
  const buttons = msQuizAnswers.querySelectorAll("button");
  quizState.answered = true;

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.correctIndex) {
      button.classList.add("feedback", "ok");
    }
    if (index === selectedIndex && index !== question.correctIndex) {
      button.classList.add("feedback", "bad");
    }
  });

  if (selectedIndex === question.correctIndex) {
    quizState.correct += 1;
    msQuizFeedback.innerHTML = '<p class="feedback ok">Richtig. Gute Rechnung.</p>';
  } else {
    msQuizFeedback.innerHTML = `<p class="feedback bad">Nicht korrekt. ${question.explanation}</p>`;
  }

  msQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
  msQuizNext.disabled = false;
}

function startQuiz() {
  quizState.running = true;
  quizState.answered = false;
  quizState.index = 0;
  quizState.correct = 0;
  quizState.questions = buildQuizSet();

  msQuizScore.textContent = `Punkte: 0 / ${quizState.questions.length}`;
  msQuizNext.disabled = true;
  renderQuizQuestion();
}

function nextQuizQuestion() {
  if (!quizState.running) {
    return;
  }

  if (!quizState.answered) {
    msQuizFeedback.innerHTML = '<p class="feedback info">Bitte beantworte zuerst die aktuelle Frage.</p>';
    return;
  }

  quizState.index += 1;

  if (quizState.index >= quizState.questions.length) {
    quizState.running = false;
    msQuizStatus.textContent = "Test beendet";
    msQuizPrompt.textContent = `Du hast ${quizState.correct} von ${quizState.questions.length} Punkten erreicht.`;
    msQuizAnswers.replaceChildren();
    const rating = quizState.correct >= 10
      ? "Sehr sicher gelöst."
      : quizState.correct >= 7
        ? "Solide Leistung. Wiederhole noch einzelne Rechenschritte."
        : "Bitte trainiere Karte/Wirklichkeit und Einheiten noch einmal.";
    msQuizFeedback.innerHTML = `<p class="feedback ${quizState.correct >= 7 ? "ok" : "info"}">${rating}</p>`;
    msQuizNext.disabled = true;
    return;
  }

  renderQuizQuestion();
}

function setupQuizModule() {
  msQuizStart.addEventListener("click", startQuiz);
  msQuizNext.addEventListener("click", nextQuizQuestion);
}

function initModule() {
  setupTabs();
  setupConceptModule();
  setupLabModule();
  setupMiniModule();
  setupGeneratorModule();
  setupQuizModule();
}

initModule();
