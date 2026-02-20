const geoTabButtons = document.querySelectorAll(".geo-tab-btn");
const geoTabPanels = document.querySelectorAll(".geo-tab");

const stageButtons = document.querySelectorAll(".stage-btn");
const mapTransform = document.getElementById("mapTransform");
const stageExplanation = document.getElementById("stageExplanation");

const legendTrainer = document.getElementById("legendTrainer");
const legendCheck = document.getElementById("legendCheck");
const legendReset = document.getElementById("legendReset");
const legendFeedback = document.getElementById("legendFeedback");

const scaleTask = document.getElementById("scaleTask");
const scaleAnswer = document.getElementById("scaleAnswer");
const scaleCheck = document.getElementById("scaleCheck");
const scaleNext = document.getElementById("scaleNext");
const scaleFeedback = document.getElementById("scaleFeedback");
const scaleWalkthrough = document.getElementById("scaleWalkthrough");
const scaleReverseTask = document.getElementById("scaleReverseTask");
const scaleReverseAnswer = document.getElementById("scaleReverseAnswer");
const scaleReverseCheck = document.getElementById("scaleReverseCheck");
const scaleReverseNext = document.getElementById("scaleReverseNext");
const scaleReverseFeedback = document.getElementById("scaleReverseFeedback");
const scaleReverseWalkthrough = document.getElementById("scaleReverseWalkthrough");
const scaleChoiceTask = document.getElementById("scaleChoiceTask");
const scaleChoiceAnswers = document.getElementById("scaleChoiceAnswers");
const scaleChoiceNext = document.getElementById("scaleChoiceNext");
const scaleChoiceFeedback = document.getElementById("scaleChoiceFeedback");

const geoTestStart = document.getElementById("geoTestStart");
const geoTestNext = document.getElementById("geoTestNext");
const geoTestScore = document.getElementById("geoTestScore");
const geoTestStatus = document.getElementById("geoTestStatus");
const geoTestPrompt = document.getElementById("geoTestPrompt");
const geoTestAnswers = document.getElementById("geoTestAnswers");
const geoTestFeedback = document.getElementById("geoTestFeedback");

const stageTexts = {
  luftbild:
    "Luftbild: Du siehst viele echte Details (Dachformen, Schatten, Farben). Das Bild ist sehr real, aber auch unübersichtlich. Genau deshalb braucht man Karten: Sie reduzieren diese Fülle auf das Wesentliche.",
  vereinfacht:
    "Vereinfachung: Wichtige Flächen bleiben erhalten, unwichtige Details werden weggelassen. Aus Formen werden klare Flächen und Linien. Das macht späteres Orientieren viel schneller.",
  karte:
    "Karte: Objekte werden als klare Zeichen und Farben dargestellt. Legende, Nordpfeil und Maßstab machen die Karte lesbar. Erst durch diese Elemente kann jede Person die Darstellung gleich verstehen.",
};

const legendItems = [
  {
    id: "wasser",
    label: "Fluss",
    symbol: `
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M6 34c6-6 12-6 18 0s12 6 18 0" fill="none" stroke="#2a78ad" stroke-width="4" stroke-linecap="round"/>
        <path d="M6 22c6-6 12-6 18 0s12 6 18 0" fill="none" stroke="#69abd8" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `,
  },
  {
    id: "strasse",
    label: "Straße",
    symbol: `
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="5" y="18" width="38" height="12" fill="#f4cf6a" stroke="#816f33" stroke-width="2"/>
        <path d="M12 24h5M22 24h5M32 24h5" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `,
  },
  {
    id: "haus",
    label: "Haus",
    symbol: `
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="12" y="19" width="24" height="18" fill="#f5ddd8" stroke="#8d5a4c" stroke-width="2"/>
        <path d="M10 20 24 9l14 11" fill="#d98474" stroke="#8d5a4c" stroke-width="2"/>
      </svg>
    `,
  },
  {
    id: "park",
    label: "Park",
    symbol: `
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="8" y="12" width="32" height="24" rx="4" fill="#d8f0d5" stroke="#3f7f44" stroke-width="2"/>
        <circle cx="20" cy="24" r="5" fill="#4d9850"/>
        <circle cx="30" cy="24" r="5" fill="#4d9850"/>
      </svg>
    `,
  },
  {
    id: "schule",
    label: "Schule",
    symbol: `
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="10" y="10" width="28" height="28" fill="#ffffff" stroke="#44586e" stroke-width="2"/>
        <text x="24" y="30" text-anchor="middle" font-size="19" font-family="Outfit, Segoe UI, sans-serif" fill="#22384f">S</text>
      </svg>
    `,
  },
];

let currentScaleTask = null;
let currentScaleReverseTask = null;
let currentScaleChoiceTask = null;

const geoTestState = {
  running: false,
  questions: [],
  index: 0,
  correct: 0,
  answered: false,
};

const scaleChoiceState = {
  answered: false,
};

function shuffle(items) {
  const clone = [...items];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setupGeoTabs() {
  geoTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.dataset.tab;
      geoTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      geoTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${tabId}`).classList.add("is-active");
    });
  });
}

function setStage(stage) {
  mapTransform.dataset.stage = stage;
  stageExplanation.textContent = stageTexts[stage];
  stageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.stage === stage);
  });
}

function setupStageModule() {
  stageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setStage(button.dataset.stage);
    });
  });
  setStage("luftbild");
}

function renderLegendTrainer() {
  const options = shuffle(legendItems.map((item) => item.label));

  legendTrainer.innerHTML = legendItems
    .map(
      (item) => `
        <div class="legend-row" data-id="${item.id}">
          <div class="symbol-chip">${item.symbol}</div>
          <label for="legend_${item.id}">Welcher Begriff passt zu diesem Symbol?</label>
          <select id="legend_${item.id}" data-correct="${item.label}">
            <option value="">Bitte wählen</option>
            ${options.map((option) => `<option value="${option}">${option}</option>`).join("")}
          </select>
        </div>
      `
    )
    .join("");
  legendFeedback.innerHTML = "";
}

function checkLegendTrainer() {
  const rows = legendTrainer.querySelectorAll(".legend-row");
  let correct = 0;
  let answered = 0;

  rows.forEach((row) => {
    row.classList.remove("is-correct", "is-wrong");
    const select = row.querySelector("select");
    if (!(select instanceof HTMLSelectElement)) {
      return;
    }
    const userValue = select.value;
    if (!userValue) {
      return;
    }
    answered += 1;
    if (userValue === select.dataset.correct) {
      correct += 1;
      row.classList.add("is-correct");
    } else {
      row.classList.add("is-wrong");
    }
  });

  if (answered < legendItems.length) {
    legendFeedback.innerHTML = `<p class="feedback info">Bitte alle Symbole zuordnen.</p>`;
    return;
  }

  const allCorrect = correct === legendItems.length;
  const solutions = legendItems.map((item) => `${item.label}`).join(", ");
  legendFeedback.innerHTML = `
    <p class="feedback ${allCorrect ? "ok" : "bad"}">${
      allCorrect
        ? "Stark. Alle Legendenbegriffe sind korrekt."
        : `${correct}/${legendItems.length} korrekt. Schau dir die falschen Felder noch einmal an.`
    }</p>
    <p class="feedback info">Lösungsbegriffe in diesem Set: ${solutions}.</p>
  `;
}

function buildScaleTask() {
  const scale = [5000, 10000, 25000, 50000][randomInt(0, 3)];
  const mapDistanceCm = randomInt(2, 8);
  const realDistanceM = (mapDistanceCm * scale) / 100;
  return { scale, mapDistanceCm, realDistanceM };
}

function buildScaleReverseTask() {
  const scale = [5000, 10000, 25000, 50000][randomInt(0, 3)];
  const mapDistanceCm = randomInt(2, 9);
  const realDistanceM = (mapDistanceCm * scale) / 100;
  return { scale, mapDistanceCm, realDistanceM };
}

function renderScaleTask() {
  currentScaleTask = buildScaleTask();
  scaleTask.textContent = `Maßstab 1:${currentScaleTask.scale}. Auf der Karte misst du ${currentScaleTask.mapDistanceCm} cm. Wie viele Meter sind das in Wirklichkeit?`;
  scaleAnswer.value = "";
  scaleFeedback.innerHTML = "";
  scaleWalkthrough.textContent =
    "Rechenhilfe: Kartenstrecke (cm) x Maßstabszahl = Realstrecke in cm. Danach cm in m umrechnen (durch 100 teilen).";
}

function checkScaleTask() {
  if (!currentScaleTask) {
    return;
  }
  if (scaleAnswer.value.trim() === "") {
    scaleFeedback.innerHTML = `<p class="feedback info">Bitte eine Zahl in Metern eingeben.</p>`;
    return;
  }
  const value = Number(scaleAnswer.value);
  if (!Number.isFinite(value)) {
    scaleFeedback.innerHTML = `<p class="feedback info">Bitte eine Zahl in Metern eingeben.</p>`;
    return;
  }

  if (value === currentScaleTask.realDistanceM) {
    scaleFeedback.innerHTML = `<p class="feedback ok">Richtig. ${currentScaleTask.mapDistanceCm} cm entsprechen ${currentScaleTask.realDistanceM} m.</p>`;
  } else {
    scaleFeedback.innerHTML = `<p class="feedback bad">Noch nicht richtig. Lösung: ${currentScaleTask.realDistanceM} m.</p>`;
  }
  scaleWalkthrough.textContent =
    `Rechenweg: ${currentScaleTask.mapDistanceCm} cm x ${currentScaleTask.scale} = ${
      currentScaleTask.mapDistanceCm * currentScaleTask.scale
    } cm. Dann durch 100 teilen: ${currentScaleTask.realDistanceM} m.`;
}

function renderScaleReverseTask() {
  currentScaleReverseTask = buildScaleReverseTask();
  scaleReverseTask.textContent = `Maßstab 1:${currentScaleReverseTask.scale}. In Wirklichkeit ist eine Strecke ${currentScaleReverseTask.realDistanceM} m lang. Wie viele Zentimeter sind das auf der Karte?`;
  scaleReverseAnswer.value = "";
  scaleReverseFeedback.innerHTML = "";
  scaleReverseWalkthrough.textContent =
    "Rechenhilfe: Reale Strecke erst in cm umrechnen. Danach durch die Maßstabszahl teilen.";
}

function checkScaleReverseTask() {
  if (!currentScaleReverseTask) {
    return;
  }
  if (scaleReverseAnswer.value.trim() === "") {
    scaleReverseFeedback.innerHTML = `<p class="feedback info">Bitte eine Zahl in Zentimetern eingeben.</p>`;
    return;
  }
  const value = Number(scaleReverseAnswer.value);
  if (!Number.isFinite(value)) {
    scaleReverseFeedback.innerHTML = `<p class="feedback info">Bitte eine gültige Zahl eingeben.</p>`;
    return;
  }

  const expected = currentScaleReverseTask.mapDistanceCm;
  const isCorrect = Math.abs(value - expected) < 0.01;
  if (isCorrect) {
    scaleReverseFeedback.innerHTML = `<p class="feedback ok">Richtig. Auf der Karte sind das ${expected} cm.</p>`;
  } else {
    scaleReverseFeedback.innerHTML = `<p class="feedback bad">Noch nicht richtig. Lösung: ${expected} cm.</p>`;
  }

  scaleReverseWalkthrough.textContent =
    `Rechenweg: ${currentScaleReverseTask.realDistanceM} m = ${
      currentScaleReverseTask.realDistanceM * 100
    } cm. Dann ${currentScaleReverseTask.realDistanceM * 100} : ${currentScaleReverseTask.scale} = ${expected} cm.`;
}

function buildScaleChoiceTask() {
  const variant = randomInt(0, 1);
  if (variant === 0) {
    const baseOptions = [5000, 10000, 25000, 50000];
    const correctScale = baseOptions[randomInt(0, baseOptions.length - 1)];
    const mapDistanceCm = randomInt(2, 8);
    const realDistanceM = (mapDistanceCm * correctScale) / 100;
    const optionSet = new Set([correctScale]);
    while (optionSet.size < 4) {
      optionSet.add(baseOptions[randomInt(0, baseOptions.length - 1)]);
    }
    const options = shuffle([...optionSet]);
    return {
      prompt: `Welche Maßstabsangabe passt? Auf der Karte misst du ${mapDistanceCm} cm, in Wirklichkeit sind es ${realDistanceM} m.`,
      options: options.map((item) => `1:${item}`),
      correct: options.indexOf(correctScale),
      explanation: `Rechnung: ${realDistanceM} m = ${realDistanceM * 100} cm. ${
        realDistanceM * 100
      } : ${mapDistanceCm} = ${correctScale}. Also 1:${correctScale}.`,
    };
  }

  const options = shuffle([5000, 10000, 25000, 50000]);
  const correctScale = Math.min(...options);
  return {
    prompt: "Mit welchem Maßstab siehst du für den gleichen Ort die meisten Details?",
    options: options.map((item) => `1:${item}`),
    correct: options.indexOf(correctScale),
    explanation: `Der kleinste Nenner zeigt den größten Detailgrad. Deshalb ist 1:${correctScale} hier richtig.`,
  };
}

function renderScaleChoiceTask() {
  currentScaleChoiceTask = buildScaleChoiceTask();
  scaleChoiceState.answered = false;
  scaleChoiceFeedback.innerHTML = "";
  scaleChoiceTask.textContent = currentScaleChoiceTask.prompt;
  scaleChoiceAnswers.innerHTML = currentScaleChoiceTask.options
    .map((option, index) => `<button type="button" class="answer-btn" data-index="${index}">${option}</button>`)
    .join("");
}

function answerScaleChoiceTask(index) {
  if (!currentScaleChoiceTask || scaleChoiceState.answered) {
    return;
  }
  const selectedIndex = Number(index);
  const isCorrect = selectedIndex === currentScaleChoiceTask.correct;
  scaleChoiceState.answered = true;

  scaleChoiceAnswers.querySelectorAll(".answer-btn").forEach((button, optionIndex) => {
    button.disabled = true;
    if (optionIndex === currentScaleChoiceTask.correct) {
      button.classList.add("is-correct");
    } else if (optionIndex === selectedIndex) {
      button.classList.add("is-wrong");
    }
  });

  scaleChoiceFeedback.innerHTML = `<p class="feedback ${isCorrect ? "ok" : "bad"}">${currentScaleChoiceTask.explanation}</p>`;
}

function createScaleQuestion() {
  const task = buildScaleTask();
  const correct = task.realDistanceM;
  const wrongSet = new Set();
  while (wrongSet.size < 3) {
    const offset = randomInt(40, 220) * (Math.random() > 0.5 ? 1 : -1);
    const candidate = Math.max(10, correct + offset);
    if (candidate !== correct) {
      wrongSet.add(candidate);
    }
  }
  const options = shuffle([correct, ...wrongSet]);
  return {
    prompt: `Maßstab 1:${task.scale}. Strecke auf der Karte: ${task.mapDistanceCm} cm. Welche reale Strecke passt?`,
    options: options.map((value) => `${value} m`),
    correct: options.indexOf(correct),
    explanation: `Rechnung: ${task.mapDistanceCm} cm x ${task.scale} = ${task.mapDistanceCm * task.scale} cm. Danach in Meter umrechnen (durch 100 teilen) = ${correct} m.`,
  };
}

function createDirectionQuestion() {
  const moves = [
    { text: "nach oben", correct: "Norden" },
    { text: "nach unten", correct: "Süden" },
    { text: "nach rechts", correct: "Osten" },
    { text: "nach links", correct: "Westen" },
  ];
  const move = moves[randomInt(0, moves.length - 1)];
  const options = shuffle(["Norden", "Osten", "Süden", "Westen"]);
  return {
    prompt: `Der Nordpfeil zeigt nach oben. Du gehst im Plan ${move.text}. In welche Himmelsrichtung gehst du?`,
    options,
    correct: options.indexOf(move.correct),
    explanation: `Wenn Norden oben ist, liegt Osten rechts, Süden unten und Westen links. Daher gilt hier: ${move.text} -> ${move.correct}.`,
  };
}

function buildGeoTestQuestions(totalCount) {
  const base = [
    {
      prompt: "Was zeigt ein Luftbild zuerst?",
      options: [
        "Die Wirklichkeit von oben mit vielen Details",
        "Nur vereinfachte Symbole",
        "Nur politische Grenzen",
        "Nur Höhenlinien",
      ],
      correct: 0,
      explanation:
        "Ein Luftbild ist ein echtes Foto aus der Vogelperspektive. Es zeigt viele Details der Wirklichkeit und ist die Ausgangsbasis für die spätere Vereinfachung in einer Karte.",
    },
    {
      prompt: "Wozu dient die Legende auf einer Karte?",
      options: [
        "Sie erklärt Zeichen, Farben und Linien",
        "Sie vergrößert den Kartenmaßstab",
        "Sie ersetzt den Nordpfeil",
        "Sie zeigt nur Ortsnamen",
      ],
      correct: 0,
      explanation:
        "Die Legende ist das Wörterbuch der Kartensymbole. Erst durch sie kannst du Farben und Zeichen eindeutig deuten, zum Beispiel Wasser, Straße oder Grünfläche.",
    },
    {
      prompt: "Welche Aussage zur Karte ist richtig?",
      options: [
        "Eine Karte wählt wichtige Informationen aus",
        "Eine Karte zeigt alle Details wie ein Foto",
        "Eine Karte braucht keinen Maßstab",
        "Eine Karte zeigt keine Richtungen",
      ],
      correct: 0,
      explanation:
        "Karten vereinfachen Wirklichkeit und lassen Unwichtiges weg. Genau diese Reduktion sorgt für Übersicht und macht Orientierung möglich.",
    },
    {
      prompt: "Welche Farbe steht in Schulatlanten häufig für Wasser?",
      options: ["Blau", "Rot", "Braun", "Orange"],
      correct: 0,
      explanation:
        "Wasserflächen und Flüsse sind meist blau dargestellt. Standardisierte Farben helfen, Karten schneller und sicherer zu lesen.",
    },
    {
      prompt: "Was hilft dir am besten, wenn du Wege beschreiben willst?",
      options: ["Nordpfeil und Himmelsrichtungen", "Nur das Kartenpapier", "Nur der Titel", "Nur der Rand"],
      correct: 0,
      explanation:
        "Mit Nordpfeil und Himmelsrichtungen kannst du Lage klar beschreiben, zum Beispiel: 'Die Schule liegt östlich vom Park'.",
    },
    {
      prompt: "Was bedeutet der Maßstab 1:10.000?",
      options: [
        "1 cm auf der Karte entspricht 10.000 cm in Wirklichkeit",
        "10.000 cm auf der Karte sind 1 cm in Wirklichkeit",
        "Die Karte ist 10.000-mal größer als die Wirklichkeit",
        "Der Maßstab sagt nichts über Entfernungen",
      ],
      correct: 0,
      explanation:
        "Der Maßstab ist ein Verhältnis von Kartenstrecke zur Realstrecke. Bei 1:10.000 gilt deshalb 1 cm auf der Karte = 100 m in der Wirklichkeit.",
    },
  ];

  const dynamic = [createScaleQuestion(), createDirectionQuestion(), createScaleQuestion(), createDirectionQuestion()];
  return shuffle([...base, ...dynamic]).slice(0, totalCount);
}

function updateGeoTestScore() {
  geoTestScore.textContent = `Punkte: ${geoTestState.correct} / ${geoTestState.questions.length}`;
}

function renderGeoTestQuestion() {
  const question = geoTestState.questions[geoTestState.index];
  geoTestState.answered = false;
  geoTestStatus.textContent = `Frage ${geoTestState.index + 1} von ${geoTestState.questions.length}`;
  geoTestPrompt.textContent = question.prompt;
  geoTestFeedback.innerHTML = "";
  geoTestNext.disabled = true;
  geoTestNext.textContent =
    geoTestState.index === geoTestState.questions.length - 1 ? "Ergebnis anzeigen" : "Nächste Frage";

  geoTestAnswers.innerHTML = question.options
    .map((option, index) => `<button type="button" class="answer-btn" data-index="${index}">${option}</button>`)
    .join("");
}

function finishGeoTest() {
  geoTestState.running = false;
  geoTestNext.disabled = true;
  const percent = Math.round((geoTestState.correct / geoTestState.questions.length) * 100);
  geoTestStatus.textContent = "Kartentest beendet";
  geoTestPrompt.textContent = `Ergebnis: ${geoTestState.correct}/${geoTestState.questions.length} (${percent}%)`;
  geoTestAnswers.innerHTML = "";
  geoTestFeedback.innerHTML = `<p class="feedback ${percent >= 75 ? "ok" : "bad"}">${
    percent >= 75
      ? "Sehr gut. Du kannst Karten schon sicher lesen und Entfernungen gut einschätzen."
      : "Noch etwas üben: Legende, Richtung und Maßstab wiederholen. Nutze dafür den Üben-Tab mit Legenden- und Maßstab-Trainer."
  }</p>`;
  geoTestStart.textContent = "Test erneut starten";
}

function startGeoTest() {
  geoTestState.running = true;
  geoTestState.questions = buildGeoTestQuestions(8);
  geoTestState.index = 0;
  geoTestState.correct = 0;
  geoTestState.answered = false;
  geoTestStart.textContent = "Test neu starten";
  updateGeoTestScore();
  renderGeoTestQuestion();
}

function answerGeoTestQuestion(index) {
  if (!geoTestState.running || geoTestState.answered) {
    return;
  }
  const question = geoTestState.questions[geoTestState.index];
  const selectedIndex = Number(index);
  const isCorrect = selectedIndex === question.correct;
  geoTestState.answered = true;

  if (isCorrect) {
    geoTestState.correct += 1;
  }

  geoTestAnswers.querySelectorAll(".answer-btn").forEach((button, optionIndex) => {
    button.disabled = true;
    if (optionIndex === question.correct) {
      button.classList.add("is-correct");
    } else if (optionIndex === selectedIndex) {
      button.classList.add("is-wrong");
    }
  });

  updateGeoTestScore();
  geoTestNext.disabled = false;
  geoTestFeedback.innerHTML = `<p class="feedback ${isCorrect ? "ok" : "bad"}">${question.explanation}</p>`;
}

function nextGeoTestQuestion() {
  if (!geoTestState.running) {
    return;
  }
  if (!geoTestState.answered) {
    geoTestFeedback.innerHTML = `<p class="feedback info">Bitte erst eine Antwort auswählen.</p>`;
    return;
  }
  if (geoTestState.index >= geoTestState.questions.length - 1) {
    finishGeoTest();
    return;
  }
  geoTestState.index += 1;
  renderGeoTestQuestion();
}

function setupGeoTest() {
  geoTestStart.addEventListener("click", startGeoTest);
  geoTestNext.addEventListener("click", nextGeoTestQuestion);
  geoTestAnswers.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.classList.contains("answer-btn")) {
      return;
    }
    answerGeoTestQuestion(target.dataset.index);
  });
}

function bootstrap() {
  setupGeoTabs();
  setupStageModule();

  renderLegendTrainer();
  legendCheck.addEventListener("click", checkLegendTrainer);
  legendReset.addEventListener("click", renderLegendTrainer);

  renderScaleTask();
  scaleCheck.addEventListener("click", checkScaleTask);
  scaleNext.addEventListener("click", renderScaleTask);
  renderScaleReverseTask();
  scaleReverseCheck.addEventListener("click", checkScaleReverseTask);
  scaleReverseNext.addEventListener("click", renderScaleReverseTask);
  renderScaleChoiceTask();
  scaleChoiceNext.addEventListener("click", renderScaleChoiceTask);
  scaleChoiceAnswers.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.classList.contains("answer-btn")) {
      return;
    }
    answerScaleChoiceTask(target.dataset.index);
  });

  setupGeoTest();
}

bootstrap();
