const wnTabButtons = document.querySelectorAll(".wn-tab-btn");
const wnTabPanels = document.querySelectorAll(".wn-tab");

const wnTypeButtons = document.querySelectorAll(".wn-type-btn");
const wnTypeDetailTitle = document.getElementById("wnTypeDetailTitle");
const wnTypeDetailText = document.getElementById("wnTypeDetailText");
const wnTypeDetailList = document.getElementById("wnTypeDetailList");

const wnAssignNewRound = document.getElementById("wnAssignNewRound");
const wnAssignCheck = document.getElementById("wnAssignCheck");
const wnAssignList = document.getElementById("wnAssignList");
const wnAssignFeedback = document.getElementById("wnAssignFeedback");

const wnStatementNewRound = document.getElementById("wnStatementNewRound");
const wnStatementCheck = document.getElementById("wnStatementCheck");
const wnStatementList = document.getElementById("wnStatementList");
const wnStatementFeedback = document.getElementById("wnStatementFeedback");

const wnQuizStart = document.getElementById("wnQuizStart");
const wnQuizNext = document.getElementById("wnQuizNext");
const wnQuizScore = document.getElementById("wnQuizScore");
const wnQuizStatus = document.getElementById("wnQuizStatus");
const wnQuizPrompt = document.getElementById("wnQuizPrompt");
const wnQuizAnswers = document.getElementById("wnQuizAnswers");
const wnQuizFeedback = document.getElementById("wnQuizFeedback");

const typeDetails = {
  poly: {
    title: "Polytheismus",
    text: "Polytheismus bedeutet: Es gibt mehrere Götter. Diese Götter haben oft unterschiedliche Aufgaben oder Zuständigkeitsbereiche.",
    points: [
      "Beispiele: altgriechische, altägyptische und römische Religionen.",
      "Im Unterricht wird oft auch der Hinduismus als Beispiel genannt (vereinfacht).",
      "Merksatz: Viele Götter, viele Rollen.",
    ],
  },
  mono: {
    title: "Monotheismus",
    text: "Monotheismus bedeutet: Es gibt einen einzigen Gott.",
    points: [
      "Beispiele: Judentum, Christentum, Islam.",
      "Merksatz: Ein Gott, aber unterschiedliche Religionen.",
      "Der Begriff wird manchmal falsch als 'Menotheismus' geschrieben.",
    ],
  },
  athe: {
    title: "Atheismus",
    text: "Atheismus bedeutet: Es wird nicht an einen Gott oder mehrere Götter geglaubt.",
    points: [
      "Atheismus ist eine Weltanschauung, keine Religion.",
      "Erklärungen werden häufig ohne Gottesbezug gesucht.",
      "Merksatz: Kein Gottesglaube.",
    ],
  },
};

const categoryLabels = {
  poly: "Polytheistisch",
  mono: "Monotheistisch",
  athe: "Atheistisch / kein Gottesglaube",
  off: "Nicht eindeutig / je nach Richtung",
};

const assignPool = [
  {
    label: "Judentum",
    answer: "mono",
    explanation: "Im Judentum wird an einen einzigen Gott geglaubt.",
  },
  {
    label: "Christentum",
    answer: "mono",
    explanation: "Das Christentum ist monotheistisch.",
  },
  {
    label: "Islam",
    answer: "mono",
    explanation: "Im Islam wird an einen einzigen Gott geglaubt.",
  },
  {
    label: "Altgriechische Religion",
    answer: "poly",
    explanation: "Es gibt viele Götter mit unterschiedlichen Aufgaben.",
  },
  {
    label: "Altägyptische Religion",
    answer: "poly",
    explanation: "Auch hier werden viele Götter verehrt.",
  },
  {
    label: "Hinduismus",
    answer: "poly",
    explanation: "Oft als polytheistisches Beispiel behandelt, mit verschiedenen Richtungen.",
  },
  {
    label: "Atheismus",
    answer: "athe",
    explanation: "Kein Glaube an Gott oder Götter.",
  },
  {
    label: "Buddhismus",
    answer: "off",
    explanation: "Oft nicht-theistisch, nicht in jeder Richtung gleich einzuordnen.",
  },
  {
    label: "Weltanschauung ohne Gottesglauben",
    answer: "athe",
    explanation: "Das passt zur atheistischen Position.",
  },
  {
    label: "Glaube an einen einzigen Schöpfergott",
    answer: "mono",
    explanation: "Das ist die Grundidee des Monotheismus.",
  },
];

const statementPool = [
  {
    prompt: "Es gibt viele Götter mit unterschiedlichen Bereichen.",
    answer: "poly",
    explanation: "Das beschreibt Polytheismus.",
  },
  {
    prompt: "Es gibt nur einen Gott.",
    answer: "mono",
    explanation: "Das ist die Grunddefinition von Monotheismus.",
  },
  {
    prompt: "Es wird kein Gott angenommen.",
    answer: "athe",
    explanation: "Das beschreibt Atheismus.",
  },
  {
    prompt: "Diese Tradition ist in ihren Richtungen sehr unterschiedlich und nicht immer klar einzuordnen.",
    answer: "off",
    explanation: "Bei manchen Traditionen ist eine einfache Zuordnung zu grob.",
  },
  {
    prompt: "Judentum, Christentum und Islam gehören meist in dieselbe Kategorie.",
    answer: "mono",
    explanation: "Alle drei werden im Unterricht als monotheistisch eingeordnet.",
  },
  {
    prompt: "Wenn mehrere Götter vorkommen, passt meistens diese Kategorie.",
    answer: "poly",
    explanation: "Viele Götter -> Polytheismus.",
  },
  {
    prompt: "Kein Gottesglaube, oft naturwissenschaftliche Erklärungen.",
    answer: "athe",
    explanation: "Das passt zu atheistischen Positionen.",
  },
  {
    prompt: "Buddhistische Traditionen sind nicht immer eindeutig einzuordnen.",
    answer: "off",
    explanation: "Hier ist 'nicht eindeutig' die sinnvollste Lernantwort.",
  },
];

const quizPool = [
  {
    prompt: "Welche Schreibweise ist richtig?",
    options: ["Menotheismus", "Monotheismus", "Monotismus", "Monoatheismus"],
    correct: 1,
    explanation: "Richtig ist Monotheismus.",
    wrongReasons: {
      0: "Das ist ein häufiger Schreibfehler.",
      2: "Dieser Begriff ist fachlich nicht korrekt.",
      3: "Das ist kein fachlicher Begriff.",
    },
  },
  {
    prompt: "Welche Aussage beschreibt Monotheismus?",
    options: [
      "Glaube an mehrere Götter",
      "Kein Gottesglaube",
      "Glaube an einen einzigen Gott",
      "Nur Naturerklärungen ohne Glauben",
    ],
    correct: 2,
    explanation: "Monotheismus bedeutet Glaube an einen einzigen Gott.",
    wrongReasons: {
      0: "Das wäre Polytheismus.",
      1: "Das beschreibt Atheismus.",
      3: "Das passt eher zu atheistischen Positionen.",
    },
  },
  {
    prompt: "Welche Religion wird monotheistisch eingeordnet?",
    options: ["Islam", "Altgriechische Religion", "Altägyptische Religion", "Römische Mythologie"],
    correct: 0,
    explanation: "Der Islam ist monotheistisch.",
    wrongReasons: {
      1: "Hier gibt es mehrere Götter.",
      2: "Hier gibt es mehrere Götter.",
      3: "Mythologische Götterwelt ist polytheistisch.",
    },
  },
  {
    prompt: "Was trifft auf Atheismus zu?",
    options: [
      "Glaube an einen Gott",
      "Glaube an viele Götter",
      "Kein Glaube an Götter",
      "Glaube an nur antike Götter",
    ],
    correct: 2,
    explanation: "Atheismus bedeutet kein Gottesglaube.",
    wrongReasons: {
      0: "Das ist monotheistisch.",
      1: "Das ist polytheistisch.",
      3: "Das ist keine fachliche Kategorie.",
    },
  },
  {
    prompt: "Welche Zuordnung ist korrekt?",
    options: [
      "Judentum -> Polytheismus",
      "Christentum -> Monotheismus",
      "Islam -> Atheismus",
      "Atheismus -> Monotheismus",
    ],
    correct: 1,
    explanation: "Christentum wird monotheistisch eingeordnet.",
    wrongReasons: {
      0: "Judentum ist monotheistisch.",
      2: "Islam ist monotheistisch, nicht atheistisch.",
      3: "Atheismus bedeutet gerade kein Gottesglaube.",
    },
  },
  {
    prompt: "Welche Aussage ist korrekt?",
    options: [
      "Atheismus ist eine Religion mit vielen Göttern.",
      "Polytheismus bedeutet ein Gott.",
      "Monotheismus bedeutet ein Gott.",
      "Monotheismus und Atheismus sind dasselbe.",
    ],
    correct: 2,
    explanation: "Monotheismus = Glaube an einen Gott.",
    wrongReasons: {
      0: "Atheismus ist keine Religion und hat keinen Gottesglauben.",
      1: "Polytheismus bedeutet viele Götter.",
      3: "Die Begriffe sind klar verschieden.",
    },
  },
  {
    prompt: "Welche Kategorie passt am ehesten zur altgriechischen Religion?",
    options: ["Monotheismus", "Polytheismus", "Atheismus", "Nicht-theistisch"],
    correct: 1,
    explanation: "Die altgriechische Religion kennt viele Götter.",
    wrongReasons: {
      0: "Es geht nicht um einen einzigen Gott.",
      2: "Es gibt dort Gottesglauben.",
      3: "Die zu lernende Kategorie ist hier Polytheismus.",
    },
  },
  {
    prompt: "Warum gibt es manchmal die Kategorie 'nicht eindeutig'?",
    options: [
      "Weil alle Religionen dasselbe glauben.",
      "Weil manche Traditionen mehrere Richtungen haben.",
      "Weil Kategorien nie helfen.",
      "Weil es keine Begriffe gibt.",
    ],
    correct: 1,
    explanation: "Einige Traditionen sind vielfältig und nicht mit einem Wort erklärt.",
    wrongReasons: {
      0: "Religionen und Weltanschauungen unterscheiden sich.",
      2: "Kategorien helfen, wenn man ihre Grenzen kennt.",
      3: "Die Begriffe sind vorhanden und nützlich.",
    },
  },
  {
    prompt: "Welche Aussage passt zu Polytheismus?",
    options: [
      "Ein Gott, eine Offenbarung",
      "Kein Glaube an Götter",
      "Viele Götter mit unterschiedlichen Rollen",
      "Nur wissenschaftliche Erklärungen",
    ],
    correct: 2,
    explanation: "Viele Götter mit Rollen ist die Kernidee.",
    wrongReasons: {
      0: "Das passt eher zu monotheistischen Traditionen.",
      1: "Das beschreibt Atheismus.",
      3: "Das beschreibt eher atheistische Positionen.",
    },
  },
  {
    prompt: "Welche Aussage ist fachlich sinnvoll?",
    options: [
      "Alle Traditionen lassen sich immer perfekt in drei Schubladen einordnen.",
      "Einfache Kategorien helfen beim Start, aber manche Fälle bleiben offen.",
      "Nur Atheismus ist eine Religion.",
      "Monotheismus bedeutet viele Götter.",
    ],
    correct: 1,
    explanation: "So lernst du klar und bleibst trotzdem fachlich fair.",
    wrongReasons: {
      0: "Zuordnungen sind hilfreich, aber nicht immer vollständig.",
      2: "Atheismus ist eine Weltanschauung, keine Religion.",
      3: "Monotheismus bedeutet ein Gott.",
    },
  },
  {
    prompt: "Welche Zeile ist komplett korrekt?",
    options: [
      "Judentum - monotheistisch",
      "Islam - polytheistisch",
      "Altägyptische Religion - monotheistisch",
      "Atheismus - polytheistisch",
    ],
    correct: 0,
    explanation: "Judentum wird als monotheistisch eingeordnet.",
    wrongReasons: {
      1: "Der Islam ist monotheistisch.",
      2: "Altägyptische Religion ist polytheistisch.",
      3: "Atheismus bedeutet kein Gottesglaube.",
    },
  },
  {
    prompt: "Welche Antwort ist fachlich am genauesten?",
    options: [
      "Buddhismus ist immer streng polytheistisch.",
      "Buddhismus ist immer streng monotheistisch.",
      "Buddhismus ist je nach Richtung nicht eindeutig einzuordnen.",
      "Buddhismus ist immer Atheismus.",
    ],
    correct: 2,
    explanation: "Im Unterricht ist hier die vorsichtige, differenzierte Antwort sinnvoll.",
    wrongReasons: {
      0: "Das ist zu pauschal.",
      1: "Das ist zu pauschal.",
      3: "Das ist zu pauschal.",
    },
  },
];

let assignTasks = [];
let statementTasks = [];

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
  wnTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      wnTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      wnTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${target}`).classList.add("is-active");
    });
  });
}

function renderType(typeKey) {
  const detail = typeDetails[typeKey];
  if (!detail) {
    return;
  }
  wnTypeDetailTitle.textContent = detail.title;
  wnTypeDetailText.textContent = detail.text;
  wnTypeDetailList.innerHTML = detail.points.map((point) => `<li>${point}</li>`).join("");
  wnTypeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.type === typeKey);
  });
}

function setupTypeCards() {
  wnTypeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderType(button.dataset.type);
    });
  });
  renderType("poly");
}

function generateAssignRound(count = 7) {
  return shuffle(assignPool).slice(0, count).map((item) => ({ ...item }));
}

function renderAssignRound() {
  wnAssignList.replaceChildren();
  assignTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "wn-task-row";

    const prompt = document.createElement("p");
    prompt.innerHTML = `<strong>${index + 1}. ${task.label}</strong>`;

    const select = document.createElement("select");
    select.className = "wn-select";
    select.name = `assign-${index}`;
    select.innerHTML = `
      <option value="">Bitte wählen</option>
      <option value="poly">${categoryLabels.poly}</option>
      <option value="mono">${categoryLabels.mono}</option>
      <option value="athe">${categoryLabels.athe}</option>
      <option value="off">${categoryLabels.off}</option>
    `;

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";

    row.append(prompt, select, feedback);
    wnAssignList.append(row);
  });
}

function checkAssignRound() {
  const rows = wnAssignList.querySelectorAll(".wn-task-row");
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
        Noch nicht passend. Richtige Zuordnung: ${categoryLabels[task.answer]}.
        ${task.explanation}
      </p>
    `;
  });

  if (answered < assignTasks.length) {
    wnAssignFeedback.innerHTML = `<p class="feedback info">Bitte alle Aufgaben in Training A beantworten.</p>`;
    return;
  }

  wnAssignFeedback.innerHTML = `
    <p class="feedback ${correct === assignTasks.length ? "ok" : "bad"}">
      ${correct} / ${assignTasks.length} richtig.
      ${correct === assignTasks.length ? "Sehr gut." : "Lies die roten Rückmeldungen und starte danach eine neue Runde."}
    </p>
  `;
}

function setupAssignTraining() {
  assignTasks = generateAssignRound();
  renderAssignRound();
  wnAssignFeedback.innerHTML = "";

  wnAssignNewRound.addEventListener("click", () => {
    assignTasks = generateAssignRound();
    renderAssignRound();
    wnAssignFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });

  wnAssignCheck.addEventListener("click", checkAssignRound);
}

function generateStatementRound(count = 6) {
  return shuffle(statementPool).slice(0, count).map((item) => ({ ...item }));
}

function renderStatementRound() {
  wnStatementList.replaceChildren();
  statementTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "wn-task-row";

    const prompt = document.createElement("p");
    prompt.textContent = `${index + 1}. ${task.prompt}`;

    const choiceGrid = document.createElement("div");
    choiceGrid.className = "wn-choice-grid";

    Object.entries(categoryLabels).forEach(([key, label]) => {
      const choiceLabel = document.createElement("label");
      choiceLabel.className = "wn-choice-item";
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `statement-${index}`;
      radio.value = key;
      choiceLabel.append(radio, document.createTextNode(label));
      choiceGrid.append(choiceLabel);
    });

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";
    row.append(prompt, choiceGrid, feedback);
    wnStatementList.append(row);
  });
}

function checkStatementRound() {
  const rows = wnStatementList.querySelectorAll(".wn-task-row");
  let answered = 0;
  let correct = 0;

  rows.forEach((row, index) => {
    row.classList.remove("is-correct", "is-wrong");
    const feedback = row.querySelector(".task-feedback");
    if (!(feedback instanceof HTMLDivElement)) {
      return;
    }
    feedback.innerHTML = "";

    const selected = row.querySelector(`input[name="statement-${index}"]:checked`);
    if (!(selected instanceof HTMLInputElement)) {
      return;
    }
    answered += 1;

    const task = statementTasks[index];
    if (selected.value === task.answer) {
      correct += 1;
      row.classList.add("is-correct");
      feedback.innerHTML = `<p class="feedback ok">Richtig. ${task.explanation}</p>`;
      return;
    }

    row.classList.add("is-wrong");
    feedback.innerHTML = `
      <p class="feedback bad">
        Noch nicht passend. Richtige Lösung: ${categoryLabels[task.answer]}.
        ${task.explanation}
      </p>
    `;
  });

  if (answered < statementTasks.length) {
    wnStatementFeedback.innerHTML = '<p class="feedback info">Bitte alle Aussagen in Training B beantworten.</p>';
    return;
  }

  wnStatementFeedback.innerHTML = `
    <p class="feedback ${correct === statementTasks.length ? "ok" : "bad"}">
      ${correct} / ${statementTasks.length} richtig.
      ${correct === statementTasks.length ? "Sehr gut." : "Arbeite die Rückmeldungen durch und starte eine neue Runde."}
    </p>
  `;
}

function setupStatementTraining() {
  statementTasks = generateStatementRound();
  renderStatementRound();
  wnStatementFeedback.innerHTML = "";

  wnStatementNewRound.addEventListener("click", () => {
    statementTasks = generateStatementRound();
    renderStatementRound();
    wnStatementFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });

  wnStatementCheck.addEventListener("click", checkStatementRound);
}

function updateQuizScore() {
  wnQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  wnQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  wnQuizPrompt.textContent = question.prompt;
  wnQuizFeedback.innerHTML = "";
  wnQuizNext.disabled = true;
  wnQuizAnswers.innerHTML = question.options
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
  wnQuizStatus.textContent = "Test abgeschlossen.";
  wnQuizPrompt.textContent = "Du kannst den Test neu starten.";
  wnQuizAnswers.innerHTML = "";
  wnQuizFeedback.innerHTML = '<p class="feedback info">Nutze die Fehlererklärungen für die Wiederholung.</p>';
  wnQuizNext.disabled = true;
  wnQuizStart.textContent = "Neu starten";
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

  wnQuizAnswers.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  const wrongReason = question.wrongReasons?.[optionIndex] || "Bitte die Begriffe nochmals vergleichen.";
  wnQuizFeedback.innerHTML = `
    <p class="feedback ${isCorrect ? "ok" : "bad"}">
      ${isCorrect
        ? `Richtig. ${question.explanation}`
        : `Nicht korrekt. ${wrongReason} Richtige Antwort: "${question.options[question.correct]}". ${question.explanation}`}
    </p>
  `;

  wnQuizNext.disabled = false;
  wnQuizNext.textContent =
    quizState.index === quizState.questions.length - 1 ? "Ergebnis anzeigen" : "Nächste Frage";
}

function startQuiz() {
  quizState.running = true;
  quizState.answered = false;
  quizState.index = 0;
  quizState.correct = 0;
  quizState.questions = shuffle(quizPool).slice(0, 10);
  wnQuizStart.textContent = "Test neu starten";
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
  wnQuizStart.addEventListener("click", startQuiz);
  wnQuizNext.addEventListener("click", nextQuizStep);
  wnQuizAnswers.addEventListener("click", (event) => {
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
setupTypeCards();
setupAssignTraining();
setupStatementTraining();
setupQuiz();



