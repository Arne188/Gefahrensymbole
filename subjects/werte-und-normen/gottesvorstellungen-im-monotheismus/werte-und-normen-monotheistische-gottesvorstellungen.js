const wmTabButtons = document.querySelectorAll(".wm-tab-btn");
const wmTabPanels = document.querySelectorAll(".wm-tab");

const wmFocusButtons = document.querySelectorAll(".wm-focus-btn");
const wmFocusTitle = document.getElementById("wmFocusTitle");
const wmFocusText = document.getElementById("wmFocusText");
const wmFocusList = document.getElementById("wmFocusList");

const wmAssignNewRound = document.getElementById("wmAssignNewRound");
const wmAssignCheck = document.getElementById("wmAssignCheck");
const wmAssignList = document.getElementById("wmAssignList");
const wmAssignFeedback = document.getElementById("wmAssignFeedback");

const wmCommonNewRound = document.getElementById("wmCommonNewRound");
const wmCommonCheck = document.getElementById("wmCommonCheck");
const wmCommonList = document.getElementById("wmCommonList");
const wmCommonFeedback = document.getElementById("wmCommonFeedback");

const wmQuizStart = document.getElementById("wmQuizStart");
const wmQuizNext = document.getElementById("wmQuizNext");
const wmQuizScore = document.getElementById("wmQuizScore");
const wmQuizStatus = document.getElementById("wmQuizStatus");
const wmQuizPrompt = document.getElementById("wmQuizPrompt");
const wmQuizAnswers = document.getElementById("wmQuizAnswers");
const wmQuizFeedback = document.getElementById("wmQuizFeedback");

const focusDetails = {
  schöpfer: {
    title: "Schöpfer Gott",
    text: "Gott gilt als Ursprung der Welt und allen Lebens.",
    points: [
      "Die Welt wird als geschaffen verstanden.",
      "Natur und Leben sind nicht zufällig.",
      "Menschen tragen Verantwortung für die Schöpfung.",
    ],
  },
  allmächtig: {
    title: "Allmächtiger Gott",
    text: "Gott wird als mächtig ohne menschliche Grenzen beschrieben.",
    points: [
      "Gottes Macht ist nicht begrenzt wie menschliche Macht.",
      "Allmacht bedeutet nicht Beliebigkeit, sondern Handeln in Gerechtigkeit.",
      "Vertrauen auf Gottes Hilfe ist eine wichtige Folge.",
    ],
  },
  offenbarer: {
    title: "Offenbarer Gott",
    text: "Gott teilt seinen Willen mit, zum Beispiel durch Propheten und Schriften.",
    points: [
      "Im Judentum: Tora.",
      "Im Christentum: Bibel.",
      "Im Islam: Koran.",
    ],
  },
  allwissend: {
    title: "Allwissender Gott",
    text: "Gott weiss alles über Vergangenheit, Gegenwart und Zukunft.",
    points: [
      "Nichts ist Gott verborgen.",
      "Allwissenheit wird mit Weisheit verbunden.",
      "Menschen werden zu verantwortlichem Handeln aufgerufen.",
    ],
  },
  beziehung: {
    title: "Beziehung zum Menschen",
    text: "Menschen sehen sich in Beziehung zu Gott, besonders durch Gebet und Vertrauen.",
    points: [
      "Gebet ist eine Form der persönlichen Beziehung.",
      "Viele gläubige Menschen suchen Schutz, Trost und Orientierung.",
      "Beziehung bedeutet auch Verantwortung gegenüber anderen Menschen.",
    ],
  },
};

const assignLabels = {
  schöpfer: "Schöpfer Gott",
  allmächtig: "Allmächtiger Gott",
  offenbarer: "Offenbarer Gott",
  allwissend: "Allwissender Gott",
  beziehung: "Beziehung zum Menschen",
};

const assignPool = [
  {
    statement: "Gott hat die Welt und alles Leben erschaffen.",
    answer: "schöpfer",
    explanation: "Das beschreibt Gott als Schöpfer.",
  },
  {
    statement: "Gott kennt Vergangenheit, Gegenwart und Zukunft.",
    answer: "allwissend",
    explanation: "Das ist die Grundidee von Allwissenheit.",
  },
  {
    statement: "Gott teilt seinen Willen durch Propheten mit.",
    answer: "offenbarer",
    explanation: "Das ist die Vorstellung vom offenbarenden Gott.",
  },
  {
    statement: "Gott ist nicht durch menschliche Grenzen begrenzt.",
    answer: "allmächtig",
    explanation: "Das entspricht der Vorstellung von Allmacht.",
  },
  {
    statement: "Menschen suchen im Gebet die Nähe Gottes.",
    answer: "beziehung",
    explanation: "Das beschreibt die Beziehung zwischen Mensch und Gott.",
  },
  {
    statement: "Tora, Bibel und Koran sind wichtige Orientierungstexte.",
    answer: "offenbarer",
    explanation: "Schriften gehören zur Offenbarungsvorstellung.",
  },
  {
    statement: "Nichts bleibt vor Gott verborgen.",
    answer: "allwissend",
    explanation: "Auch das steht für Allwissenheit.",
  },
  {
    statement: "Gott kann handeln, wo Menschen an Grenzen stossen.",
    answer: "allmächtig",
    explanation: "Das ordnet man der Allmacht zu.",
  },
  {
    statement: "Die Schöpfung gilt als Geschenk und Auftrag.",
    answer: "schöpfer",
    explanation: "Hier steht die Schöpfungsvorstellung im Zentrum.",
  },
  {
    statement: "Vertrauen und Führung sind zentrale Glaubensmotive.",
    answer: "beziehung",
    explanation: "Das gehört zur Gottesbeziehung.",
  },
];

const commonPool = [
  {
    statement: "Judentum, Christentum und Islam glauben an einen Gott.",
    answer: "ja",
    explanation: "Das ist die Kernidee monotheistischer Religionen.",
  },
  {
    statement: "In allen drei Religionen spielt Gebet eine wichtige Rolle.",
    answer: "ja",
    explanation: "Gebet gehört in allen drei Traditionen zur Praxis.",
  },
  {
    statement: "Alle drei Religionen glauben an viele Götter.",
    answer: "nein",
    explanation: "Viele Götter wären polytheistisch, nicht monotheistisch.",
  },
  {
    statement: "Propheten und Schriften haben in allen drei Religionen Bedeutung.",
    answer: "ja",
    explanation: "Offenbarung ist ein gemeinsamer Grundgedanke.",
  },
  {
    statement: "Atheismus ist eine monotheistische Religion.",
    answer: "nein",
    explanation: "Atheismus ist keine Religion und kennt keinen Gottesglauben.",
  },
  {
    statement: "Monotheismus bedeutet: Es gibt einen Gott.",
    answer: "ja",
    explanation: "Das ist die zentrale Definition.",
  },
  {
    statement: "Zwischen Judentum, Christentum und Islam gibt es überhaupt keine Unterschiede.",
    answer: "nein",
    explanation: "Es gibt Gemeinsamkeiten und Unterschiede.",
  },
  {
    statement: "Die Idee eines allwissenden Gottes kommt in monotheistischen Religionen vor.",
    answer: "ja",
    explanation: "Das ist eine wichtige Gottesvorstellung.",
  },
];

const quizPool = [
  {
    prompt: "Was bedeutet Monotheismus?",
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
    prompt: "Welche Vorstellung passt zu 'Schöpfer Gott'?",
    options: [
      "Gott teilt sich nur durch Träume mit",
      "Gott hat die Welt erschaffen",
      "Gott weiss nichts über die Zukunft",
      "Gott ist nur eine Symbolfigur",
    ],
    correct: 1,
    explanation: "Schöpfer Gott bedeutet Ursprung der Welt und des Lebens.",
    wrongReasons: {
      0: "Hier fehlt der Schöpfungsbezug.",
      2: "Das widerspricht der Allwissenheitsvorstellung.",
      3: "Das passt nicht zur monotheistischen Grundidee.",
    },
  },
  {
    prompt: "Wozu passt die Aussage 'Gott kennt alles'?",
    options: [
      "Allwissender Gott",
      "Schöpfer Gott",
      "Polytheismus",
      "Atheismus",
    ],
    correct: 0,
    explanation: "Das ist die Allwissenheitsvorstellung.",
    wrongReasons: {
      1: "Schöpfer bezieht sich auf Ursprung der Welt.",
      2: "Polytheismus betrifft viele Götter.",
      3: "Atheismus kennt keinen Gottesglauben.",
    },
  },
  {
    prompt: "Welche Kombination ist korrekt?",
    options: [
      "Judentum - viele Götter",
      "Islam - kein Gott",
      "Christentum - ein Gott",
      "Atheismus - ein Gott",
    ],
    correct: 2,
    explanation: "Christentum wird monotheistisch eingeordnet.",
    wrongReasons: {
      0: "Judentum ist monotheistisch.",
      1: "Islam ist monotheistisch.",
      3: "Atheismus bedeutet kein Gottesglaube.",
    },
  },
  {
    prompt: "Was meint 'offenbarer Gott' am besten?",
    options: [
      "Gott zeigt sich durch Schriften und Propheten",
      "Gott ist nur in Sternen sichtbar",
      "Gott ist nicht ansprechbar",
      "Gott hat keinen Bezug zu Menschen",
    ],
    correct: 0,
    explanation: "Offenbarung bedeutet Mitteilung durch Propheten und Schriften.",
    wrongReasons: {
      1: "Das ist keine zentrale Offenbarungsvorstellung.",
      2: "Monotheistische Religionen kennen Gebet und Beziehung.",
      3: "Gerade die Beziehung ist wichtig.",
    },
  },
  {
    prompt: "Welche Aussage ist richtig?",
    options: [
      "Monotheistische Religionen haben keine Schriften.",
      "Gebet spielt in monotheistischen Religionen keine Rolle.",
      "Monotheistische Religionen kennen nur Naturerklärungen.",
      "Monotheistische Religionen betonen die Beziehung zu Gott.",
    ],
    correct: 3,
    explanation: "Gebet und Beziehung zu Gott sind zentrale Elemente.",
    wrongReasons: {
      0: "Es gibt wichtige heilige Schriften.",
      1: "Gebet ist in allen drei Traditionen wichtig.",
      2: "Es geht um Glaubensbeziehung, nicht nur Naturerklärung.",
    },
  },
  {
    prompt: "Welche Aussage passt zur Allmacht Gottes?",
    options: [
      "Gott handelt nur, wenn Menschen es erlauben",
      "Gott ist in seiner Macht unbegrenzt",
      "Gott kennt nur die Vergangenheit",
      "Gott spricht nie zu Menschen",
    ],
    correct: 1,
    explanation: "Allmacht bedeutet unbegrenzte Macht Gottes.",
    wrongReasons: {
      0: "Das wäre menschlich begrenzte Macht.",
      2: "Das wäre kein allwissender Gott.",
      3: "Offenbarung ist ein wichtiger Grundgedanke.",
    },
  },
  {
    prompt: "Was gehört zu den heiligen Schriften dieser drei Religionen?",
    options: [
      "Tora, Bibel, Koran",
      "Nur Mythen ohne Schrift",
      "Nur Naturgesetze",
      "Nur moderne Texte",
    ],
    correct: 0,
    explanation: "Diese drei Schriften sind zentral für die Traditionen.",
    wrongReasons: {
      1: "Alle drei Religionen haben Schriften.",
      2: "Naturgesetze sind keine heiligen Schriften.",
      3: "Die Schriften sind historisch gewachsene Glaubenstexte.",
    },
  },
  {
    prompt: "Welche Antwort beschreibt eine Gottesbeziehung?",
    options: [
      "Gebet und Vertrauen auf Gottes Führung",
      "Ablehnung jeder Form von Glauben",
      "Glaube an viele konkurrierende Götter",
      "Nur politische Regeln ohne Spiritualität",
    ],
    correct: 0,
    explanation: "Gebet und Vertrauen gehören zur Beziehungsdimension.",
    wrongReasons: {
      1: "Das beschreibt keine Gottesbeziehung.",
      2: "Das wäre polytheistisch.",
      3: "Monotheistische Religionen beinhalten mehr als Regeln.",
    },
  },
  {
    prompt: "Welche Aussage ist fachlich korrekt?",
    options: [
      "Monotheismus und Atheismus bedeuten dasselbe.",
      "Monotheismus beschreibt den Glauben an einen Gott.",
      "Monotheismus beschreibt den Glauben an gar keinen Gott.",
      "Monotheismus beschreibt den Glauben an viele Götter.",
    ],
    correct: 1,
    explanation: "Das ist die korrekte Definition.",
    wrongReasons: {
      0: "Die Begriffe meinen Unterschiedliches.",
      2: "Kein Gottesglaube wäre Atheismus.",
      3: "Viele Götter wären Polytheismus.",
    },
  },
  {
    prompt: "Warum ist die Kategorie 'allwissender Gott' sinnvoll?",
    options: [
      "Sie beschreibt Gottes Wissen über alle Zeiten.",
      "Sie beschreibt, dass Gott nichts weiss.",
      "Sie bedeutet, dass Gott nur in der Vergangenheit wirkt.",
      "Sie passt nur zu polytheistischen Religionen.",
    ],
    correct: 0,
    explanation: "Allwissenheit meint umfassendes Wissen Gottes.",
    wrongReasons: {
      1: "Das Gegenteil ist richtig.",
      2: "Die Vorstellung umfasst Vergangenheit, Gegenwart und Zukunft.",
      3: "Die Kategorie wird im monotheistischen Kontext genutzt.",
    },
  },
  {
    prompt: "Welche Zusammenfassung passt am besten?",
    options: [
      "Ein Gott, Offenbarung, Gebet und Verantwortung sind zentrale Grundideen.",
      "Monotheistische Religionen lehnen jede Ethik ab.",
      "Monotheistische Religionen kennen keine Gemeinschaft.",
      "Monotheistische Religionen haben keine Beziehung zum Menschen.",
    ],
    correct: 0,
    explanation: "Diese Zusammenfassung trifft die Kernpunkte.",
    wrongReasons: {
      1: "Ethik ist in allen drei Religionen wichtig.",
      2: "Gemeinschaft spielt eine zentrale Rolle.",
      3: "Gerade die Gottesbeziehung ist ein Hauptthema.",
    },
  },
];

let assignTasks = [];
let commonTasks = [];

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
  wmTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      wmTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      wmTabPanels.forEach((panel) => panel.classList.remove("is-active"));
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
  wmFocusTitle.textContent = detail.title;
  wmFocusText.textContent = detail.text;
  wmFocusList.innerHTML = detail.points.map((point) => `<li>${point}</li>`).join("");
  wmFocusButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.focus === key);
  });
}

function setupFocusModule() {
  wmFocusButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderFocus(button.dataset.focus);
    });
  });
  renderFocus("schöpfer");
}

function generateAssignRound(count = 7) {
  return shuffle(assignPool).slice(0, count).map((item) => ({ ...item }));
}

function renderAssignRound() {
  wmAssignList.replaceChildren();
  assignTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "wm-task-row";

    const prompt = document.createElement("p");
    prompt.innerHTML = `<strong>${index + 1}. ${task.statement}</strong>`;

    const select = document.createElement("select");
    select.className = "wm-select";
    select.name = `assign-${index}`;
    select.innerHTML = `
      <option value="">Bitte wählen</option>
      <option value="schöpfer">${assignLabels.schöpfer}</option>
      <option value="allmächtig">${assignLabels.allmächtig}</option>
      <option value="offenbarer">${assignLabels.offenbarer}</option>
      <option value="allwissend">${assignLabels.allwissend}</option>
      <option value="beziehung">${assignLabels.beziehung}</option>
    `;

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";

    row.append(prompt, select, feedback);
    wmAssignList.append(row);
  });
}

function checkAssignRound() {
  const rows = wmAssignList.querySelectorAll(".wm-task-row");
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
        Noch nicht passend. Richtige Zuordnung: ${assignLabels[task.answer]}.
        ${task.explanation}
      </p>
    `;
  });

  if (answered < assignTasks.length) {
    wmAssignFeedback.innerHTML = '<p class="feedback info">Bitte alle Aufgaben in Training A beantworten.</p>';
    return;
  }

  wmAssignFeedback.innerHTML = `
    <p class="feedback ${correct === assignTasks.length ? "ok" : "bad"}">
      ${correct} / ${assignTasks.length} richtig.
      ${correct === assignTasks.length ? "Sehr gut." : "Arbeite die Rückmeldungen durch und starte eine neue Runde."}
    </p>
  `;
}

function setupAssignTraining() {
  assignTasks = generateAssignRound();
  renderAssignRound();
  wmAssignFeedback.innerHTML = "";

  wmAssignNewRound.addEventListener("click", () => {
    assignTasks = generateAssignRound();
    renderAssignRound();
    wmAssignFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });

  wmAssignCheck.addEventListener("click", checkAssignRound);
}

function generateCommonRound(count = 6) {
  return shuffle(commonPool).slice(0, count).map((item) => ({ ...item }));
}

function renderCommonRound() {
  wmCommonList.replaceChildren();
  commonTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "wm-task-row";

    const prompt = document.createElement("p");
    prompt.textContent = `${index + 1}. ${task.statement}`;

    const choiceGrid = document.createElement("div");
    choiceGrid.className = "wm-choice-grid";

    [
      { value: "ja", label: "Ja, passt als Grundidee" },
      { value: "nein", label: "Nein, passt nicht als Grundidee" },
    ].forEach((option) => {
      const label = document.createElement("label");
      label.className = "wm-choice-item";
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `common-${index}`;
      radio.value = option.value;
      label.append(radio, document.createTextNode(option.label));
      choiceGrid.append(label);
    });

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";

    row.append(prompt, choiceGrid, feedback);
    wmCommonList.append(row);
  });
}

function checkCommonRound() {
  const rows = wmCommonList.querySelectorAll(".wm-task-row");
  let answered = 0;
  let correct = 0;

  rows.forEach((row, index) => {
    row.classList.remove("is-correct", "is-wrong");
    const feedback = row.querySelector(".task-feedback");
    if (!(feedback instanceof HTMLDivElement)) {
      return;
    }
    feedback.innerHTML = "";

    const selected = row.querySelector(`input[name="common-${index}"]:checked`);
    if (!(selected instanceof HTMLInputElement)) {
      return;
    }
    answered += 1;

    const task = commonTasks[index];
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

  if (answered < commonTasks.length) {
    wmCommonFeedback.innerHTML = '<p class="feedback info">Bitte alle Aufgaben in Training B beantworten.</p>';
    return;
  }

  wmCommonFeedback.innerHTML = `
    <p class="feedback ${correct === commonTasks.length ? "ok" : "bad"}">
      ${correct} / ${commonTasks.length} richtig.
      ${correct === commonTasks.length ? "Sehr gut." : "Prüfe die Erklärungen und starte eine neue Runde."}
    </p>
  `;
}

function setupCommonTraining() {
  commonTasks = generateCommonRound();
  renderCommonRound();
  wmCommonFeedback.innerHTML = "";

  wmCommonNewRound.addEventListener("click", () => {
    commonTasks = generateCommonRound();
    renderCommonRound();
    wmCommonFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });

  wmCommonCheck.addEventListener("click", checkCommonRound);
}

function updateQuizScore() {
  wmQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  wmQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  wmQuizPrompt.textContent = question.prompt;
  wmQuizFeedback.innerHTML = "";
  wmQuizNext.disabled = true;
  wmQuizAnswers.innerHTML = question.options
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
  wmQuizStatus.textContent = "Test abgeschlossen.";
  wmQuizPrompt.textContent = "Du kannst den Test neu starten.";
  wmQuizAnswers.innerHTML = "";
  wmQuizFeedback.innerHTML = '<p class="feedback info">Nutze die Fehlererklärungen zur Wiederholung.</p>';
  wmQuizNext.disabled = true;
  wmQuizStart.textContent = "Neu starten";
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

  wmQuizAnswers.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  const wrongReason = question.wrongReasons?.[optionIndex] || "Bitte die Kernbegriffe nochmals vergleichen.";
  wmQuizFeedback.innerHTML = `
    <p class="feedback ${isCorrect ? "ok" : "bad"}">
      ${isCorrect
        ? `Richtig. ${question.explanation}`
        : `Nicht korrekt. ${wrongReason} Richtige Antwort: "${question.options[question.correct]}". ${question.explanation}`}
    </p>
  `;

  wmQuizNext.disabled = false;
  wmQuizNext.textContent =
    quizState.index === quizState.questions.length - 1 ? "Ergebnis anzeigen" : "Nächste Frage";
}

function startQuiz() {
  quizState.running = true;
  quizState.answered = false;
  quizState.index = 0;
  quizState.correct = 0;
  quizState.questions = shuffle(quizPool).slice(0, 10);
  wmQuizStart.textContent = "Test neu starten";
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
  wmQuizStart.addEventListener("click", startQuiz);
  wmQuizNext.addEventListener("click", nextQuizStep);
  wmQuizAnswers.addEventListener("click", (event) => {
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
setupCommonTraining();
setupQuiz();



