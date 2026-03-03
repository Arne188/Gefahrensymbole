const mgTabButtons = document.querySelectorAll(".mg-tab-btn");
const mgTabPanels = document.querySelectorAll(".mg-tab");

const mgFocusButtons = document.querySelectorAll(".mg-focus-btn");
const mgFocusTitle = document.getElementById("mgFocusTitle");
const mgFocusText = document.getElementById("mgFocusText");
const mgFocusList = document.getElementById("mgFocusList");

const mgAssignNewRound = document.getElementById("mgAssignNewRound");
const mgAssignCheck = document.getElementById("mgAssignCheck");
const mgAssignList = document.getElementById("mgAssignList");
const mgAssignFeedback = document.getElementById("mgAssignFeedback");

const mgIdeaNewRound = document.getElementById("mgIdeaNewRound");
const mgIdeaCheck = document.getElementById("mgIdeaCheck");
const mgIdeaList = document.getElementById("mgIdeaList");
const mgIdeaFeedback = document.getElementById("mgIdeaFeedback");

const mgQuizStart = document.getElementById("mgQuizStart");
const mgQuizNext = document.getElementById("mgQuizNext");
const mgQuizScore = document.getElementById("mgQuizScore");
const mgQuizStatus = document.getElementById("mgQuizStatus");
const mgQuizPrompt = document.getElementById("mgQuizPrompt");
const mgQuizAnswers = document.getElementById("mgQuizAnswers");
const mgQuizFeedback = document.getElementById("mgQuizFeedback");

const focusDetails = {
  abraham: {
    title: "Abraham / Ibrahim",
    text: "Abraham gilt in Judentum, Christentum und Islam als wichtige Glaubensfigur.",
    points: [
      "Er steht für Vertrauen auf Gott.",
      "Er ist eine gemeinsame Bezugsperson der drei Religionen.",
      "Seine Geschichte verbindet verschiedene Traditionen.",
    ],
  },
  mose: {
    title: "Mose / Musa",
    text: "Mose ist eine zentrale Prophetengestalt.",
    points: [
      "Er führt Menschen aus Unterdrückung in die Freiheit.",
      "Er steht für Gebote, Orientierung und Verantwortung.",
      "Er spielt in Judentum, Christentum und Islam eine wichtige Rolle.",
    ],
  },
  jesus: {
    title: "Jesus",
    text: "Jesus ist die zentrale Figur im Christentum.",
    points: [
      "Er steht für Nächstenliebe, Vergebung und Barmherzigkeit.",
      "Im Islam wird Jesus (Isa) als Prophet geachtet.",
      "Seine Botschaft prägt christliches Handeln bis heute.",
    ],
  },
  muhammad: {
    title: "Muhammad",
    text: "Muhammad ist im Islam der Prophet, der die Botschaft des Koran übermittelt.",
    points: [
      "Er gilt als Vorbild für Glauben und Lebensführung.",
      "Seine Aufgabe wird als Übermittlung der Offenbarung verstanden.",
      "Er ist eine zentrale Orientierungsperson für Muslime.",
    ],
  },
  buddha: {
    title: "Buddha",
    text: "Buddha (Siddhartha Gautama) ist der Religionsstifter des Buddhismus.",
    points: [
      "Er sucht einen Weg zur Überwindung von Leid.",
      "Er ist ein Vorbild für Achtsamkeit und Mitgefühl.",
      "Er zeigt, wie Menschen Glaubenswege prägen können.",
    ],
  },
  martin: {
    title: "Martin von Tours",
    text: "Martin gilt in christlicher Tradition als Heiliger und Vorbild.",
    points: [
      "Bekannt ist die Mantelteilung mit einem armen Menschen.",
      "Er steht für Teilen, Hilfe und Barmherzigkeit.",
      "Er zeigt, dass Glauben auch soziales Handeln meint.",
    ],
  },
};

const personLabels = {
  abraham: "Abraham / Ibrahim",
  mose: "Mose / Musa",
  jesus: "Jesus",
  muhammad: "Muhammad",
  buddha: "Buddha",
  martin: "Martin von Tours",
};

const assignPool = [
  {
    statement: "Gemeinsame Glaubensfigur in Judentum, Christentum und Islam.",
    answer: "abraham",
    explanation: "Das beschreibt Abraham / Ibrahim.",
  },
  {
    statement: "Führt Menschen in die Freiheit und steht für Gebote.",
    answer: "mose",
    explanation: "Das passt zu Mose / Musa.",
  },
  {
    statement: "Zentrale Figur des Christentums, steht für Nächstenliebe.",
    answer: "jesus",
    explanation: "Das beschreibt Jesus.",
  },
  {
    statement: "Prophet im Islam, übermittelt die Botschaft des Koran.",
    answer: "muhammad",
    explanation: "Das ist Muhammad.",
  },
  {
    statement: "Religionsstifter des Buddhismus.",
    answer: "buddha",
    explanation: "Das ist Buddha (Siddhartha Gautama).",
  },
  {
    statement: "Bekannt durch das Teilen des Mantels mit einem armen Menschen.",
    answer: "martin",
    explanation: "Das ist Martin von Tours.",
  },
  {
    statement: "Steht als Heiliger für Barmherzigkeit und Teilen.",
    answer: "martin",
    explanation: "Das passt zu Martin von Tours.",
  },
  {
    statement: "Wird im Islam als Prophet geehrt und ist im Christentum zentral.",
    answer: "jesus",
    explanation: "Das beschreibt Jesus in den beiden Traditionen.",
  },
  {
    statement: "Wichtige Gestalt für Vertrauen auf Gott in drei Religionen.",
    answer: "abraham",
    explanation: "Das passt zu Abraham / Ibrahim.",
  },
  {
    statement: "Steht für einen Weg zur Überwindung von Leid.",
    answer: "buddha",
    explanation: "Das beschreibt Buddha.",
  },
];

const ideaPool = [
  {
    statement: "Menschen des Glaubens können als Vorbilder für gerechtes Handeln wirken.",
    answer: "ja",
    explanation: "Viele religiöse Figuren werden als Vorbilder verstanden.",
  },
  {
    statement: "Nur eine einzige Religion kennt Propheten.",
    answer: "nein",
    explanation: "Mehrere Religionen kennen Prophetenfiguren.",
  },
  {
    statement: "Religiosität kann Orientierung und Halt im Alltag geben.",
    answer: "ja",
    explanation: "Das nennt das Kerncurriculum als wichtigen Aspekt.",
  },
  {
    statement: "Alle Religionen meinen mit denselben Figuren immer exakt dasselbe.",
    answer: "nein",
    explanation: "Es gibt Gemeinsamkeiten, aber auch Unterschiede.",
  },
  {
    statement: "Heilige und Vorbilder können Menschen zu sozialem Handeln motivieren.",
    answer: "ja",
    explanation: "Beispiele wie Martin zeigen diese Wirkung.",
  },
  {
    statement: "Menschen des Glaubens sind für den Religionsunterricht ohne Bedeutung.",
    answer: "nein",
    explanation: "Sie sind ein zentraler Lerninhalt.",
  },
  {
    statement: "Religiöse Figuren spielen für Gemeinschaft und Tradition eine Rolle.",
    answer: "ja",
    explanation: "Sie verbinden Glaubensgeschichte und Alltag.",
  },
  {
    statement: "Atheismus beschreibt den Glauben an viele Götter.",
    answer: "nein",
    explanation: "Atheismus bedeutet kein Gottesglaube.",
  },
];

const quizPool = [
  {
    prompt: "Wofür steht der Begriff Monotheismus?",
    options: [
      "Glaube an viele Götter",
      "Glaube an einen Gott",
      "Kein Gottesglaube",
      "Nur Naturerklärungen",
    ],
    correct: 1,
    explanation: "Monotheismus bedeutet Glaube an einen Gott.",
    wrongReasons: {
      0: "Das wäre Polytheismus.",
      2: "Das beschreibt Atheismus.",
      3: "Das ist keine Definition von Monotheismus.",
    },
  },
  {
    prompt: "Welche Figur ist in Judentum, Christentum und Islam wichtig?",
    options: ["Abraham / Ibrahim", "Nur Buddha", "Nur Martin", "Keine"],
    correct: 0,
    explanation: "Abraham / Ibrahim ist eine gemeinsame Bezugsperson.",
    wrongReasons: {
      1: "Buddha gehört zum Buddhismus.",
      2: "Martin ist eine christliche Heiligenfigur.",
      3: "Es gibt gemeinsame Figuren.",
    },
  },
  {
    prompt: "Welche Aussage passt zu Mose / Musa?",
    options: [
      "Führung in die Freiheit und Gebote",
      "Religionsstifter des Buddhismus",
      "Heiliger mit Mantelteilung",
      "Kein Bezug zu Religion",
    ],
    correct: 0,
    explanation: "Mose / Musa steht für Führung und Orientierung.",
    wrongReasons: {
      1: "Das wäre Buddha.",
      2: "Das wäre Martin von Tours.",
      3: "Mose ist eine zentrale religiöse Figur.",
    },
  },
  {
    prompt: "Welche Zuordnung ist korrekt?",
    options: [
      "Muhammad - Prophet im Islam",
      "Muhammad - Religionsstifter des Buddhismus",
      "Muhammad - christlicher Heiliger",
      "Muhammad - atheistische Figur",
    ],
    correct: 0,
    explanation: "Muhammad ist Prophet im Islam.",
    wrongReasons: {
      1: "Der Buddhismus geht auf Buddha zurück.",
      2: "Muhammad wird im Islam als Prophet verstanden.",
      3: "Das passt fachlich nicht.",
    },
  },
  {
    prompt: "Welche Figur steht besonders für Nächstenliebe im Christentum?",
    options: ["Jesus", "Nur Mose", "Nur Abraham", "Niemand"],
    correct: 0,
    explanation: "Jesus ist die zentrale Figur des Christentums.",
    wrongReasons: {
      1: "Mose ist wichtig, aber nicht die zentrale christliche Figur.",
      2: "Abraham ist wichtig, aber nicht diese Zuordnung.",
      3: "Die Aussage ist falsch.",
    },
  },
  {
    prompt: "Wofür ist Martin von Tours bekannt?",
    options: [
      "Mantelteilung und Barmherzigkeit",
      "Übermittlung des Koran",
      "Führung aus Ägypten",
      "Gründung des Buddhismus",
    ],
    correct: 0,
    explanation: "Martin gilt als Beispiel für Teilen und Hilfe.",
    wrongReasons: {
      1: "Das gehört zu Muhammad.",
      2: "Das gehört zu Mose.",
      3: "Das gehört zu Buddha.",
    },
  },
  {
    prompt: "Welche Aussage ist fachlich richtig?",
    options: [
      "Religiöse Figuren können Vorbilder sein.",
      "Religiöse Figuren sind für Menschen bedeutungslos.",
      "Nur eine Religion kennt Vorbilder.",
      "Vorbilder spielen nie eine Rolle im Alltag.",
    ],
    correct: 0,
    explanation: "Viele Menschen orientieren sich an solchen Figuren.",
    wrongReasons: {
      1: "Das widerspricht der Bedeutung von Glaubensfiguren.",
      2: "Mehrere Religionen kennen solche Figuren.",
      3: "Gerade im Alltag kann Orientierung wichtig sein.",
    },
  },
  {
    prompt: "Welche Person ist Religionsstifter des Buddhismus?",
    options: ["Buddha", "Mose", "Muhammad", "Martin"],
    correct: 0,
    explanation: "Siddhartha Gautama wird als Buddha bezeichnet.",
    wrongReasons: {
      1: "Mose ist Prophetengestalt.",
      2: "Muhammad ist Prophet im Islam.",
      3: "Martin ist Heiligenfigur.",
    },
  },
  {
    prompt: "Welche Aussage passt zum Thema Religiosität?",
    options: [
      "Sie kann Menschen Orientierung geben.",
      "Sie hat nur mit Zahlen zu tun.",
      "Sie schliesst Gemeinschaft aus.",
      "Sie verbietet jede Form von Hilfe.",
    ],
    correct: 0,
    explanation: "Religiosität kann Orientierung und Halt geben.",
    wrongReasons: {
      1: "Das ist fachlich falsch.",
      2: "Gemeinschaft ist oft ein wichtiger Teil.",
      3: "Viele Traditionen betonen Hilfe und Mitgefühl.",
    },
  },
  {
    prompt: "Welche Zusammenfassung passt am besten?",
    options: [
      "Menschen des Glaubens zeigen Vorbilder, Orientierung und Verantwortung.",
      "Menschen des Glaubens haben keine Bedeutung für Ethik.",
      "Menschen des Glaubens sind immer in allen Religionen gleich.",
      "Menschen des Glaubens gibt es nur in alten Geschichten.",
    ],
    correct: 0,
    explanation: "Das fasst die Kernidee des Moduls korrekt zusammen.",
    wrongReasons: {
      1: "Religiöse Figuren sind oft eng mit Ethik verbunden.",
      2: "Es gibt Gemeinsamkeiten und Unterschiede.",
      3: "Sie spielen auch heute noch eine Rolle.",
    },
  },
  {
    prompt: "Welche Aussage zu Jesus ist korrekt?",
    options: [
      "Im Christentum zentral, im Islam als Prophet geehrt.",
      "Nur im Buddhismus wichtig.",
      "Nur als politische Figur bekannt.",
      "Hat keine religiöse Bedeutung.",
    ],
    correct: 0,
    explanation: "Diese Aussage beschreibt die Grundlinie passend.",
    wrongReasons: {
      1: "Das ist fachlich nicht richtig.",
      2: "Jesus ist eine religiöse Figur.",
      3: "Er hat große religiöse Bedeutung.",
    },
  },
  {
    prompt: "Warum behandelt der Unterricht Menschen des Glaubens?",
    options: [
      "Weil sie Glaubensgeschichte, Werte und Orientierung zeigen.",
      "Nur um Namen auswendig zu lernen.",
      "Weil andere Themen nicht wichtig sind.",
      "Ohne Bezug zum Alltag.",
    ],
    correct: 0,
    explanation: "Die Figuren helfen, Glaube und Werte praktisch zu verstehen.",
    wrongReasons: {
      1: "Es geht um Verstehen, nicht nur Auswendiglernen.",
      2: "Der Unterricht verbindet mehrere wichtige Themen.",
      3: "Die Bedeutung für den Alltag ist zentral.",
    },
  },
];

let assignTasks = [];
let ideaTasks = [];

const quizState = {
  running: false,
  answered: false,
  index: 0,
  correct: 0,
  questions: [],
};

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function setupTabs() {
  mgTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      mgTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      mgTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${target}`).classList.add("is-active");
    });
  });
}

function renderFocus(key) {
  const detail = focusDetails[key];
  if (!detail) {
    return;
  }
  mgFocusTitle.textContent = detail.title;
  mgFocusText.textContent = detail.text;
  mgFocusList.innerHTML = detail.points.map((point) => `<li>${point}</li>`).join("");
  mgFocusButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.focus === key);
  });
}

function setupFocusModule() {
  mgFocusButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderFocus(button.dataset.focus);
    });
  });
  renderFocus("abraham");
}

function generateAssignRound(count = 7) {
  return shuffle(assignPool).slice(0, count).map((item) => ({ ...item }));
}

function renderAssignRound() {
  mgAssignList.replaceChildren();
  assignTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "mg-task-row";

    const prompt = document.createElement("p");
    prompt.innerHTML = `<strong>${index + 1}. ${task.statement}</strong>`;

    const select = document.createElement("select");
    select.className = "mg-select";
    select.name = `assign-${index}`;
    select.innerHTML = `
      <option value="">Bitte wählen</option>
      <option value="abraham">${personLabels.abraham}</option>
      <option value="mose">${personLabels.mose}</option>
      <option value="jesus">${personLabels.jesus}</option>
      <option value="muhammad">${personLabels.muhammad}</option>
      <option value="buddha">${personLabels.buddha}</option>
      <option value="martin">${personLabels.martin}</option>
    `;

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";

    row.append(prompt, select, feedback);
    mgAssignList.append(row);
  });
}

function checkAssignRound() {
  const rows = mgAssignList.querySelectorAll(".mg-task-row");
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
    const task = assignTasks[index];
    if (select.value === task.answer) {
      correct += 1;
      row.classList.add("is-correct");
      feedback.innerHTML = `<p class="feedback ok">Richtig. ${task.explanation}</p>`;
      return;
    }

    row.classList.add("is-wrong");
    feedback.innerHTML = `
      <p class="feedback bad">
        Noch nicht passend. Richtige Zuordnung: ${personLabels[task.answer]}.
        ${task.explanation}
      </p>
    `;
  });

  if (answered < assignTasks.length) {
    mgAssignFeedback.innerHTML = '<p class="feedback info">Bitte alle Aufgaben in Training A beantworten.</p>';
    return;
  }

  mgAssignFeedback.innerHTML = `
    <p class="feedback ${correct === assignTasks.length ? "ok" : "bad"}">
      ${correct} / ${assignTasks.length} richtig.
      ${correct === assignTasks.length ? "Sehr gut." : "Lies die Rückmeldungen und starte eine neue Runde."}
    </p>
  `;
}

function setupAssignTraining() {
  assignTasks = generateAssignRound();
  renderAssignRound();
  mgAssignFeedback.innerHTML = "";

  mgAssignNewRound.addEventListener("click", () => {
    assignTasks = generateAssignRound();
    renderAssignRound();
    mgAssignFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });

  mgAssignCheck.addEventListener("click", checkAssignRound);
}

function generateIdeaRound(count = 6) {
  return shuffle(ideaPool).slice(0, count).map((item) => ({ ...item }));
}

function renderIdeaRound() {
  mgIdeaList.replaceChildren();
  ideaTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "mg-task-row";

    const prompt = document.createElement("p");
    prompt.textContent = `${index + 1}. ${task.statement}`;

    const choiceGrid = document.createElement("div");
    choiceGrid.className = "mg-choice-grid";

    [
      { value: "ja", label: "Ja, passt" },
      { value: "nein", label: "Nein, passt nicht" },
    ].forEach((option) => {
      const label = document.createElement("label");
      label.className = "mg-choice-item";
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `idea-${index}`;
      radio.value = option.value;
      label.append(radio, document.createTextNode(option.label));
      choiceGrid.append(label);
    });

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";

    row.append(prompt, choiceGrid, feedback);
    mgIdeaList.append(row);
  });
}

function checkIdeaRound() {
  const rows = mgIdeaList.querySelectorAll(".mg-task-row");
  let answered = 0;
  let correct = 0;

  rows.forEach((row, index) => {
    row.classList.remove("is-correct", "is-wrong");
    const feedback = row.querySelector(".task-feedback");
    if (!(feedback instanceof HTMLDivElement)) {
      return;
    }
    feedback.innerHTML = "";

    const selected = row.querySelector(`input[name="idea-${index}"]:checked`);
    if (!(selected instanceof HTMLInputElement)) {
      return;
    }
    answered += 1;

    const task = ideaTasks[index];
    if (selected.value === task.answer) {
      correct += 1;
      row.classList.add("is-correct");
      feedback.innerHTML = `<p class="feedback ok">Richtig. ${task.explanation}</p>`;
      return;
    }

    row.classList.add("is-wrong");
    feedback.innerHTML = `
      <p class="feedback bad">
        Noch nicht passend. Richtige Antwort: ${task.answer === "ja" ? "Ja" : "Nein"}.
        ${task.explanation}
      </p>
    `;
  });

  if (answered < ideaTasks.length) {
    mgIdeaFeedback.innerHTML = '<p class="feedback info">Bitte alle Aufgaben in Training B beantworten.</p>';
    return;
  }

  mgIdeaFeedback.innerHTML = `
    <p class="feedback ${correct === ideaTasks.length ? "ok" : "bad"}">
      ${correct} / ${ideaTasks.length} richtig.
      ${correct === ideaTasks.length ? "Sehr gut." : "Prüfe die Erklärungen und starte eine neue Runde."}
    </p>
  `;
}

function setupIdeaTraining() {
  ideaTasks = generateIdeaRound();
  renderIdeaRound();
  mgIdeaFeedback.innerHTML = "";

  mgIdeaNewRound.addEventListener("click", () => {
    ideaTasks = generateIdeaRound();
    renderIdeaRound();
    mgIdeaFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });

  mgIdeaCheck.addEventListener("click", checkIdeaRound);
}

function updateQuizScore() {
  mgQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  mgQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  mgQuizPrompt.textContent = question.prompt;
  mgQuizFeedback.innerHTML = "";
  mgQuizNext.disabled = true;
  mgQuizAnswers.innerHTML = question.options
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
  mgQuizStatus.textContent = "Test abgeschlossen.";
  mgQuizPrompt.textContent = "Du kannst den Test neu starten.";
  mgQuizAnswers.innerHTML = "";
  mgQuizFeedback.innerHTML = '<p class="feedback info">Nutze die Fehlererklärungen zur Wiederholung.</p>';
  mgQuizNext.disabled = true;
  mgQuizStart.textContent = "Neu starten";
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

  mgQuizAnswers.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  const wrongReason = question.wrongReasons?.[optionIndex] || "Bitte die Schlüsselbegriffe nochmals vergleichen.";
  mgQuizFeedback.innerHTML = `
    <p class="feedback ${isCorrect ? "ok" : "bad"}">
      ${isCorrect
        ? `Richtig. ${question.explanation}`
        : `Nicht korrekt. ${wrongReason} Richtige Antwort: "${question.options[question.correct]}". ${question.explanation}`}
    </p>
  `;

  mgQuizNext.disabled = false;
  mgQuizNext.textContent =
    quizState.index === quizState.questions.length - 1 ? "Ergebnis anzeigen" : "Nächste Frage";
}

function startQuiz() {
  quizState.running = true;
  quizState.answered = false;
  quizState.index = 0;
  quizState.correct = 0;
  quizState.questions = shuffle(quizPool).slice(0, 10);
  mgQuizStart.textContent = "Test neu starten";
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
  mgQuizStart.addEventListener("click", startQuiz);
  mgQuizNext.addEventListener("click", nextQuizStep);
  mgQuizAnswers.addEventListener("click", (event) => {
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
setupFocusModule();
setupAssignTraining();
setupIdeaTraining();
setupQuiz();



