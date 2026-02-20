const deTabButtons = document.querySelectorAll(".de-tab-btn");
const deTabPanels = document.querySelectorAll(".de-tab");

const stepSorter = document.getElementById("stepSorter");
const stepCheck = document.getElementById("stepCheck");
const stepShuffle = document.getElementById("stepShuffle");
const stepFeedback = document.getElementById("stepFeedback");

const introTitle = document.getElementById("introTitle");
const introOrigin = document.getElementById("introOrigin");
const introTheme = document.getElementById("introTheme");
const introFocus = document.getElementById("introFocus");
const introGenerate = document.getElementById("introGenerate");
const introClear = document.getElementById("introClear");
const introFeedback = document.getElementById("introFeedback");
const introPreview = document.getElementById("introPreview");

const classifyRows = document.getElementById("classifyRows");
const classifyCheck = document.getElementById("classifyCheck");
const classifyReset = document.getElementById("classifyReset");
const classifyFeedback = document.getElementById("classifyFeedback");

const deQuizStart = document.getElementById("deQuizStart");
const deQuizNext = document.getElementById("deQuizNext");
const deQuizScore = document.getElementById("deQuizScore");
const deQuizStatus = document.getElementById("deQuizStatus");
const deQuizPrompt = document.getElementById("deQuizPrompt");
const deQuizAnswers = document.getElementById("deQuizAnswers");
const deQuizFeedback = document.getElementById("deQuizFeedback");

const analysisSteps = [
  { id: "lesen", title: "Text lesen und wichtige Stellen markieren" },
  { id: "einleitung", title: "Einleitung mit Titel, Textsorte und Thema schreiben" },
  { id: "abschnitte", title: "Handlung in sinnvolle Abschnitte gliedern" },
  { id: "merkmale", title: "Typische Märchenmerkmale benennen" },
  { id: "deutung", title: "Aussage und Wirkung des Märchens deuten" },
  { id: "schluss", title: "Schluss mit Ergebnis und eigener Bewertung formulieren" },
];

const classifyItems = [
  {
    id: "a1",
    text: "Die Formulierung „Es war einmal“ ist eine typische Anfangsformel von Märchen.",
    type: "Analyse",
  },
  {
    id: "a2",
    text: "Rotkäppchen geht durch den Wald und trifft dort den Wolf.",
    type: "Nacherzählung",
  },
  {
    id: "a3",
    text: "Die Figur zeigt Mut, weil sie trotz Angst weiterhandelt.",
    type: "Analyse",
  },
  {
    id: "a4",
    text: "Am Ende besiegt das Gute das Böse.",
    type: "Märchenmerkmal",
  },
];

const quizQuestions = [
  {
    prompt: "Was gehört in die Einleitung einer Märchenanalyse?",
    options: [
      "Nur die eigene Meinung",
      "Titel, Textsorte und Thema",
      "Alle Nebenfiguren im Detail",
      "Nur das Ende des Märchens",
    ],
    correct: 1,
    explanation: "In der Einleitung nennst du die Grunddaten des Textes und das Thema.",
  },
  {
    prompt: "Welche Aussage passt zu einer Analyse?",
    options: [
      "Ich erkläre, warum ein Merkmal wichtig ist.",
      "Ich schreibe den Text Wort für Wort ab.",
      "Ich erfinde eine neue Figur.",
      "Ich nenne nur Seitenzahlen.",
    ],
    correct: 0,
    explanation: "Eine Analyse erklärt und deutet, statt nur nachzuerzählen.",
  },
  {
    prompt: "Welches ist ein typisches Märchenmerkmal?",
    options: [
      "Genaue Datumsangaben",
      "Reale Zeitungsberichte",
      "Zahlen wie 3 oder 7",
      "Naturwissenschaftliche Experimente",
    ],
    correct: 2,
    explanation: "Wiederkehrende Zauberzahlen wie 3 und 7 sind typisch für Märchen.",
  },
  {
    prompt: "Was ist der Hauptteil einer Märchenanalyse?",
    options: [
      "Nur eine Überschrift",
      "Untersuchung von Handlung, Figuren und Merkmalen",
      "Ein Dank an die Lesenden",
      "Eine Zeichnung ohne Text",
    ],
    correct: 1,
    explanation: "Der Hauptteil enthält die eigentliche Analyse des Märchens.",
  },
  {
    prompt: "Welche Formulierung ist am besten für eine Deutung?",
    options: [
      "Ich finde das Märchen cool.",
      "Hier passiert etwas.",
      "Das zeigt, dass Ehrlichkeit am Ende belohnt wird.",
      "Und dann war Ende.",
    ],
    correct: 2,
    explanation: "Deutungssätze erklären die Aussage hinter dem Geschehen.",
  },
  {
    prompt: "Wozu dient der Schluss deiner Analyse?",
    options: [
      "Er fasst die wichtigsten Ergebnisse zusammen.",
      "Er erzählt das Märchen komplett neu.",
      "Er nennt nur den Titel.",
      "Er bleibt leer.",
    ],
    correct: 0,
    explanation: "Im Schluss bündelst du deine Ergebnisse knapp und klar.",
  },
  {
    prompt: "Welche Reihenfolge ist sinnvoll?",
    options: [
      "Schluss, Einleitung, Deutung",
      "Lesen, untersuchen, deuten, zusammenfassen",
      "Nur schreiben ohne Lesen",
      "Zuerst Bewertung, dann Textsuche",
    ],
    correct: 1,
    explanation: "Erst den Text sichern, dann analysieren und zum Schluss zusammenfassen.",
  },
  {
    prompt: "Welche Frage hilft bei der Figurenanalyse?",
    options: [
      "Welche Farbe hat das Heft?",
      "Wie verändert sich die Figur im Verlauf?",
      "Wann ist Pause?",
      "Wie viele Buchstaben hat der Titel?",
    ],
    correct: 1,
    explanation: "Du untersuchst Verhalten, Motive und Entwicklung der Figur.",
  },
];

let currentStepOrder = [];

const quizState = {
  running: false,
  answered: false,
  index: 0,
  correct: 0,
  questions: [],
};

function shuffle(items) {
  const clone = [...items];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function setupTabs() {
  deTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      deTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      deTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${target}`).classList.add("is-active");
    });
  });
}

function renderStepSorter() {
  stepSorter.innerHTML = currentStepOrder
    .map(
      (step, index) => `
        <div class="step-row">
          <div class="step-number">${index + 1}</div>
          <p class="step-title">${step.title}</p>
          <div class="step-controls">
            <button
              class="move-btn"
              type="button"
              data-action="up"
              data-index="${index}"
              ${index === 0 ? "disabled" : ""}
            >Hoch</button>
            <button
              class="move-btn"
              type="button"
              data-action="down"
              data-index="${index}"
              ${index === currentStepOrder.length - 1 ? "disabled" : ""}
            >Runter</button>
          </div>
        </div>
      `
    )
    .join("");
}

function moveStep(index, direction) {
  const target = index + direction;
  if (target < 0 || target >= currentStepOrder.length) {
    return;
  }
  [currentStepOrder[index], currentStepOrder[target]] = [currentStepOrder[target], currentStepOrder[index]];
  renderStepSorter();
}

function checkStepOrder() {
  const isCorrect = currentStepOrder.every((step, index) => step.id === analysisSteps[index].id);
  stepFeedback.innerHTML = `
    <p class="feedback ${isCorrect ? "ok" : "bad"}">${
      isCorrect
        ? "Sehr gut. Die Reihenfolge ist korrekt."
        : "Fast. Ordne die Schritte noch einmal von der Texterfassung bis zum Schluss."
    }</p>
  `;
}

function resetStepSorter() {
  currentStepOrder = shuffle(analysisSteps);
  renderStepSorter();
  stepFeedback.innerHTML = "";
}

function setupStepSorter() {
  resetStepSorter();
  stepSorter.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }
    const index = Number(button.dataset.index);
    if (!Number.isInteger(index)) {
      return;
    }
    if (button.dataset.action === "up") {
      moveStep(index, -1);
    }
    if (button.dataset.action === "down") {
      moveStep(index, 1);
    }
  });

  stepCheck.addEventListener("click", checkStepOrder);
  stepShuffle.addEventListener("click", resetStepSorter);
}

function buildIntroText(title, origin, theme, focus) {
  return `Im Märchen „${title}“ (${origin}) geht es vor allem um ${theme}. `
    + `In meiner Analyse untersuche ich besonders ${focus}. `
    + "Dazu betrachte ich die Handlung, die Figuren und typische Märchenmerkmale.";
}

function generateIntro() {
  const title = introTitle.value.trim();
  const origin = introOrigin.value.trim();
  const theme = introTheme.value.trim();
  const focus = introFocus.value.trim();

  if (!title || !origin || !theme || !focus) {
    introFeedback.innerHTML = '<p class="feedback info">Bitte alle vier Felder ausfüllen.</p>';
    return;
  }

  introPreview.textContent = buildIntroText(title, origin, theme, focus);
  introFeedback.innerHTML = '<p class="feedback ok">Einleitung erstellt. Du kannst sie jetzt weiter verbessern.</p>';
}

function clearIntroFields() {
  introTitle.value = "";
  introOrigin.value = "";
  introTheme.value = "";
  introFocus.value = "";
  introFeedback.innerHTML = "";
  introPreview.textContent = "Hier erscheint deine Einleitung.";
}

function setupIntroGenerator() {
  introGenerate.addEventListener("click", generateIntro);
  introClear.addEventListener("click", clearIntroFields);
}

function renderClassifyRows() {
  classifyRows.innerHTML = classifyItems
    .map(
      (item) => `
        <div class="classify-row" data-id="${item.id}">
          <p>${item.text}</p>
          <select data-correct="${item.type}">
            <option value="">Bitte wählen</option>
            <option value="Märchenmerkmal">Märchenmerkmal</option>
            <option value="Analyse">Analyse</option>
            <option value="Nacherzählung">Nacherzählung</option>
          </select>
        </div>
      `
    )
    .join("");
  classifyFeedback.innerHTML = "";
}

function checkClassifyRows() {
  const rows = classifyRows.querySelectorAll(".classify-row");
  let answered = 0;
  let correct = 0;

  rows.forEach((row) => {
    row.classList.remove("is-correct", "is-wrong");
    const select = row.querySelector("select");
    if (!(select instanceof HTMLSelectElement)) {
      return;
    }
    if (!select.value) {
      return;
    }
    answered += 1;
    if (select.value === select.dataset.correct) {
      correct += 1;
      row.classList.add("is-correct");
    } else {
      row.classList.add("is-wrong");
    }
  });

  if (answered < classifyItems.length) {
    classifyFeedback.innerHTML = '<p class="feedback info">Bitte alle Aussagen zuordnen.</p>';
    return;
  }

  const allCorrect = correct === classifyItems.length;
  classifyFeedback.innerHTML = `
    <p class="feedback ${allCorrect ? "ok" : "bad"}">${
      allCorrect
        ? "Stark. Alle Zuordnungen sind richtig."
        : `${correct}/${classifyItems.length} richtig. Prüfe die markierten Zeilen.`
    }</p>
  `;
}

function setupClassifier() {
  renderClassifyRows();
  classifyCheck.addEventListener("click", checkClassifyRows);
  classifyReset.addEventListener("click", renderClassifyRows);
}

function updateQuizScore() {
  deQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  deQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  deQuizPrompt.textContent = question.prompt;
  deQuizFeedback.innerHTML = "";
  deQuizNext.disabled = true;
  deQuizAnswers.innerHTML = question.options
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
  deQuizStatus.textContent = "Test abgeschlossen.";
  deQuizPrompt.textContent = "Du kannst den Test neu starten und dein Ergebnis verbessern.";
  deQuizAnswers.innerHTML = "";
  deQuizFeedback.innerHTML = '<p class="feedback info">Gut gemacht. Vergleiche deine Fehler mit den Erklärungen.</p>';
  deQuizNext.disabled = true;
  deQuizStart.textContent = "Neu starten";
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

  deQuizAnswers.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  deQuizFeedback.innerHTML = `
    <p class="feedback ${isCorrect ? "ok" : "bad"}">${isCorrect ? "Richtig." : "Nicht ganz richtig."} ${question.explanation}</p>
  `;
  deQuizNext.disabled = false;
  deQuizNext.textContent = quizState.index === quizState.questions.length - 1 ? "Ergebnis anzeigen" : "Nächste Frage";
}

function startQuiz() {
  quizState.running = true;
  quizState.answered = false;
  quizState.index = 0;
  quizState.correct = 0;
  quizState.questions = shuffle(quizQuestions);
  deQuizStart.textContent = "Test neu starten";
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
  deQuizStart.addEventListener("click", startQuiz);
  deQuizNext.addEventListener("click", nextQuizStep);
  deQuizAnswers.addEventListener("click", (event) => {
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
setupStepSorter();
setupIntroGenerator();
setupClassifier();
setupQuiz();
