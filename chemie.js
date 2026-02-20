const iconVersion = "v5";

const symbols = [
  {
    code: "GHS01",
    name: "Explosiv",
    meaning: "Kann durch Schlag, Reibung, Feuer oder Wärme explodieren.",
    example: "Feuerwerkskörper, bestimmte Laborstoffe",
    tip: "Nie erhitzen, schütteln oder fallen lassen.",
  },
  {
    code: "GHS02",
    name: "Entzündbar",
    meaning: "Kann sich leicht entzünden.",
    example: "Ethanol, Aceton, Benzin",
    tip: "Von Flammen, Funken und Hitze fernhalten.",
  },
  {
    code: "GHS03",
    name: "Brandfördernd",
    meaning: "Kann Brände verursachen oder verstärken.",
    example: "Wasserstoffperoxid (hoch konzentriert)",
    tip: "Nicht mit brennbaren Stoffen mischen.",
  },
  {
    code: "GHS04",
    name: "Gas unter Druck",
    meaning: "Behälter steht unter Druck und kann bei Wärme platzen.",
    example: "Druckgasflaschen",
    tip: "Vor Sonne und Hitze schützen.",
  },
  {
    code: "GHS05",
    name: "Ätzend",
    meaning: "Kann Haut, Augen und Metalle stark schädigen.",
    example: "Starke Säuren und Laugen",
    tip: "Schutzbrille und Handschuhe tragen.",
  },
  {
    code: "GHS06",
    name: "Giftig",
    meaning: "Schon kleine Mengen können schwere Vergiftungen auslösen.",
    example: "Bestimmte Laborchemikalien",
    tip: "Niemals probieren, Dampf nicht einatmen.",
  },
  {
    code: "GHS07",
    name: "Reizend/Gesundheitsschädlich",
    meaning: "Kann Haut, Augen oder Atemwege reizen.",
    example: "Reinigungsmittel, Lösungsmittel",
    tip: "Kontakt vermeiden, gut lüften.",
  },
  {
    code: "GHS08",
    name: "Schwere Gesundheitsgefahr",
    meaning: "Kann langfristige schwere Gesundheitsschäden verursachen.",
    example: "Krebserzeugende oder organschädigende Stoffe",
    tip: "Nur mit strengen Schutzregeln verwenden.",
  },
  {
    code: "GHS09",
    name: "Umweltgefährlich",
    meaning: "Schädlich für Wasserorganismen und Umwelt.",
    example: "Pestizide, manche Industriechemikalien",
    tip: "Nicht in Abfluss oder Natur gelangen lassen.",
  },
].map((item) => ({
  ...item,
  image: `assets/ghs/${item.code}.svg?${iconVersion}`,
}));

const symbolGrid = document.getElementById("symbolGrid");
const referenceSection = document.getElementById("referenceSection");
const modeSelect = document.getElementById("modeSelect");
const questionCountSelect = document.getElementById("questionCountSelect");
const startTestBtn = document.getElementById("startTestBtn");
const nextQuestionBtn = document.getElementById("nextQuestionBtn");
const quizPrompt = document.getElementById("quizPrompt");
const questionVisual = document.getElementById("questionVisual");
const quizStatus = document.getElementById("quizStatus");
const answerArea = document.getElementById("answerArea");
const feedbackArea = document.getElementById("feedbackArea");
const scoreLabel = document.getElementById("scoreLabel");
const symbolModal = document.getElementById("symbolModal");
const symbolModalImage = document.getElementById("symbolModalImage");
const symbolModalCaption = document.getElementById("symbolModalCaption");
const symbolModalClose = document.getElementById("symbolModalClose");

const testState = {
  isRunning: false,
  mode: "mixed",
  totalQuestions: Number(questionCountSelect.value) || 10,
  currentIndex: 0,
  answeredCount: 0,
  correct: 0,
  currentQuestion: null,
  currentAnswered: false,
  typeSequence: [],
};

function shuffle(items) {
  const clone = [...items];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function pickOne(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function renderSymbols() {
  symbolGrid.innerHTML = symbols
    .map(
      (item) => `
        <article class="symbol-card">
          <div class="symbol-head">
            <img class="symbol-image" src="${item.image}" alt="${item.code} ${item.name}">
            <div>
              <h3>${item.name}</h3>
              <p>${item.code}</p>
            </div>
          </div>
          <div class="symbol-meta">
            <p><strong>Bedeutung:</strong> ${item.meaning}</p>
            <p><strong>Beispiel:</strong> ${item.example}</p>
            <p><strong>Merksatz:</strong> ${item.tip}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function setFeedback(kind, text) {
  feedbackArea.innerHTML = `<p class="feedback ${kind}">${text}</p>`;
}

function updateScoreLabel() {
  scoreLabel.textContent = `Punkte: ${testState.correct} / ${testState.totalQuestions}`;
}

function uniqueWrongAnswers(correctValue, allValues, count = 3) {
  return shuffle(allValues.filter((value) => value !== correctValue)).slice(0, count);
}

function buildMeaningQuestion() {
  const symbol = pickOne(symbols);
  const allMeanings = symbols.map((item) => item.meaning);
  const options = shuffle([symbol.meaning, ...uniqueWrongAnswers(symbol.meaning, allMeanings)]);

  return {
    prompt: "Was bedeutet dieses Kennzeichen?",
    image: symbol.image,
    imageAlt: `${symbol.code} ${symbol.name}`,
    options,
    check(answer) {
      const ok = answer === symbol.meaning;
      return { ok };
    },
  };
}

function buildSymbolQuestion() {
  const symbol = pickOne(symbols);
  const wrongOptions = shuffle(symbols.filter((item) => item.code !== symbol.code)).slice(0, 3);
  const options = shuffle([symbol, ...wrongOptions]).map((item) => ({
    value: item.code,
    label: `${item.code} (${item.name})`,
    image: item.image,
  }));

  return {
    prompt: `Welches Kennzeichen passt zu dieser Aussage? ${symbol.meaning}`,
    optionType: "symbol",
    options,
    check(answerCode) {
      const ok = answerCode === symbol.code;
      return { ok };
    },
  };
}

function getQuestionByType(type) {
  if (type === "meaning") {
    return buildMeaningQuestion();
  }
  return buildSymbolQuestion();
}

function buildTypeSequence(mode, totalQuestions) {
  if (mode !== "mixed") {
    return Array.from({ length: totalQuestions }, () => mode);
  }

  const baseTypes = ["meaning", "symbol"];
  const sequence = [];
  for (let i = 0; i < totalQuestions; i += 1) {
    sequence.push(baseTypes[i % baseTypes.length]);
  }
  return shuffle(sequence);
}

function lockAnswerArea() {
  answerArea.querySelectorAll("button, input").forEach((element) => {
    element.disabled = true;
  });
}

function submitAnswer(answer) {
  if (!testState.isRunning || testState.currentAnswered || !testState.currentQuestion) {
    return;
  }

  const result = testState.currentQuestion.check(answer);
  testState.currentAnswered = true;
  testState.answeredCount += 1;
  if (result.ok) {
    testState.correct += 1;
  }

  lockAnswerArea();
  updateScoreLabel();
  nextQuestionBtn.disabled = false;
  nextQuestionBtn.textContent =
    testState.currentIndex === testState.totalQuestions - 1 ? "Ergebnis anzeigen" : "Nächste Frage";

  setFeedback(
    result.ok ? "ok" : "bad",
    `${result.ok ? "Richtig." : "Falsch."} Klicke auf "${nextQuestionBtn.textContent}".`
  );
}

function renderChoiceQuestion(question) {
  if (question.optionType === "symbol") {
    const symbolChoices = question.options
      .map(
        (option) => `
          <button type="button" class="choice-btn choice-symbol" data-answer="${option.value}">
            <img src="${option.image}" alt="${option.label}">
            <span>${option.label}</span>
          </button>
        `
      )
      .join("");

    answerArea.innerHTML = `<div class="choice-list">${symbolChoices}</div>`;
  } else {
    const choices = question.options
      .map(
        (option) =>
          `<button type="button" class="choice-btn" data-answer="${option.replaceAll('"', "&quot;")}">${option}</button>`
      )
      .join("");

    answerArea.innerHTML = `<div class="choice-list">${choices}</div>`;
  }

  answerArea.querySelectorAll(".choice-btn").forEach((button) => {
    button.addEventListener("click", () => submitAnswer(button.dataset.answer || ""));
  });
}

function renderCurrentQuestion() {
  const questionType = testState.typeSequence[testState.currentIndex];
  testState.currentQuestion = getQuestionByType(questionType);
  testState.currentAnswered = false;

  quizStatus.textContent = `Frage ${testState.currentIndex + 1} von ${testState.totalQuestions}`;
  quizPrompt.textContent = testState.currentQuestion.prompt;
  nextQuestionBtn.disabled = true;
  nextQuestionBtn.textContent =
    testState.currentIndex === testState.totalQuestions - 1 ? "Ergebnis anzeigen" : "Nächste Frage";
  feedbackArea.innerHTML = "";

  if (testState.currentQuestion.image) {
    questionVisual.innerHTML = `<img class="question-image" src="${testState.currentQuestion.image}" alt="${testState.currentQuestion.imageAlt || "Kennzeichen"}">`;
  } else {
    questionVisual.innerHTML = "";
  }

  if (Array.isArray(testState.currentQuestion.options)) {
    renderChoiceQuestion(testState.currentQuestion);
    return;
  }
  answerArea.innerHTML = "";
}

function getRating(percent) {
  if (percent >= 90) {
    return "Sehr stark";
  }
  if (percent >= 75) {
    return "Gut";
  }
  if (percent >= 60) {
    return "Ordentlich";
  }
  return "Weiter üben";
}

function finishTest() {
  testState.isRunning = false;
  modeSelect.disabled = false;
  questionCountSelect.disabled = false;
  nextQuestionBtn.disabled = true;
  setReferenceLocked(false);

  const percent = Math.round((testState.correct / testState.totalQuestions) * 100);
  const wrong = testState.totalQuestions - testState.correct;
  const rating = getRating(percent);

  quizStatus.textContent = `Test beendet: ${testState.answeredCount}/${testState.totalQuestions} Fragen beantwortet`;
  quizPrompt.textContent = `Ergebnis: ${testState.correct} von ${testState.totalQuestions} Punkten (${percent}%)`;
  questionVisual.innerHTML = "";
  answerArea.innerHTML = "";
  setFeedback(
    percent >= 60 ? "ok" : "bad",
    `Bewertung: ${rating}. Richtige Antworten: ${testState.correct}, falsche Antworten: ${wrong}.`
  );

  startTestBtn.textContent = "Test erneut starten";
}

function startTest() {
  testState.isRunning = true;
  testState.mode = modeSelect.value;
  testState.totalQuestions = Number(questionCountSelect.value) || 10;
  testState.currentIndex = 0;
  testState.answeredCount = 0;
  testState.correct = 0;
  testState.currentQuestion = null;
  testState.currentAnswered = false;
  testState.typeSequence = buildTypeSequence(testState.mode, testState.totalQuestions);

  modeSelect.disabled = true;
  questionCountSelect.disabled = true;
  startTestBtn.textContent = "Test neu starten";
  setReferenceLocked(true);

  updateScoreLabel();
  renderCurrentQuestion();
}

function handleNextQuestion() {
  if (!testState.isRunning) {
    return;
  }

  if (!testState.currentAnswered) {
    setFeedback("bad", "Bitte zuerst eine Antwort abgeben.");
    return;
  }

  if (testState.currentIndex >= testState.totalQuestions - 1) {
    finishTest();
    return;
  }

  testState.currentIndex += 1;
  renderCurrentQuestion();
}

function setReferenceLocked(locked) {
  referenceSection.classList.toggle("is-test-locked", locked);
}

function openSymbolModal(imageSrc, caption) {
  symbolModalImage.src = imageSrc;
  symbolModalImage.alt = caption;
  symbolModalCaption.textContent = caption;
  symbolModal.classList.add("is-open");
  symbolModal.setAttribute("aria-hidden", "false");
}

function closeSymbolModal() {
  symbolModal.classList.remove("is-open");
  symbolModal.setAttribute("aria-hidden", "true");
  symbolModalImage.src = "";
  symbolModalImage.alt = "";
}

function setupZoomHandlers() {
  symbolGrid.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLImageElement)) {
      return;
    }
    if (!target.classList.contains("symbol-image")) {
      return;
    }
    openSymbolModal(target.src, target.alt || "Gefahrstoffkennzeichen");
  });

  questionVisual.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLImageElement)) {
      return;
    }
    if (!target.classList.contains("question-image")) {
      return;
    }
    openSymbolModal(target.src, target.alt || "Gefahrstoffkennzeichen");
  });

  symbolModalClose.addEventListener("click", closeSymbolModal);
  symbolModal.addEventListener("click", (event) => {
    if (event.target === symbolModal) {
      closeSymbolModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && symbolModal.classList.contains("is-open")) {
      closeSymbolModal();
    }
  });
}

startTestBtn.addEventListener("click", startTest);
nextQuestionBtn.addEventListener("click", handleNextQuestion);
questionCountSelect.addEventListener("change", () => {
  if (testState.isRunning) {
    return;
  }
  testState.totalQuestions = Number(questionCountSelect.value) || 10;
  updateScoreLabel();
});

renderSymbols();
updateScoreLabel();
setReferenceLocked(false);
setupZoomHandlers();
