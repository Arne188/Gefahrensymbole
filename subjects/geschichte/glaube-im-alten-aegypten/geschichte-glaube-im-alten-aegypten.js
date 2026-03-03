const gaTabButtons = document.querySelectorAll(".ga-tab-btn");
const gaTabPanels = document.querySelectorAll(".ga-tab");

const gaThemeButtons = document.querySelectorAll(".ga-theme-btn");
const gaThemeTitle = document.getElementById("gaThemeTitle");
const gaThemeText = document.getElementById("gaThemeText");
const gaThemeList = document.getElementById("gaThemeList");

const gaStepButtons = document.querySelectorAll(".ga-step-btn");
const gaStepTitle = document.getElementById("gaStepTitle");
const gaStepText = document.getElementById("gaStepText");

const gaAssignNewRound = document.getElementById("gaAssignNewRound");
const gaAssignCheck = document.getElementById("gaAssignCheck");
const gaAssignList = document.getElementById("gaAssignList");
const gaAssignFeedback = document.getElementById("gaAssignFeedback");

const gaOrderNewRound = document.getElementById("gaOrderNewRound");
const gaOrderCheck = document.getElementById("gaOrderCheck");
const gaOrderList = document.getElementById("gaOrderList");
const gaOrderFeedback = document.getElementById("gaOrderFeedback");

const gaTfNewRound = document.getElementById("gaTfNewRound");
const gaTfCheck = document.getElementById("gaTfCheck");
const gaTfList = document.getElementById("gaTfList");
const gaTfFeedback = document.getElementById("gaTfFeedback");

const gaQuizStart = document.getElementById("gaQuizStart");
const gaQuizNext = document.getElementById("gaQuizNext");
const gaQuizScore = document.getElementById("gaQuizScore");
const gaQuizStatus = document.getElementById("gaQuizStatus");
const gaQuizPrompt = document.getElementById("gaQuizPrompt");
const gaQuizAnswers = document.getElementById("gaQuizAnswers");
const gaQuizFeedback = document.getElementById("gaQuizFeedback");

const themeDetails = {
  goetterwelt: {
    title: "Götterwelt (Polytheismus)",
    text: "Die Ägypter glaubten an viele Götter. Für unterschiedliche Bereiche des Lebens gab es unterschiedliche Gottheiten.",
    points: [
      "Polytheismus bedeutet: Glaube an viele Götter (im Alten Ägypten über 1.000).",
      "Beispiele: Osiris (Totenreich), Isis (Schutz und Magie), Horus (Himmelsgott), Anubis (Mumifizierung).",
      "Viele Götter wurden als Mischwesen mit Menschenkörper und Tierkopf dargestellt.",
      "In Tempeln wurden die Götter verehrt; der innerste Bereich war meist Priestern und dem Pharao vorbehalten.",
    ],
  },
  pharao: {
    title: "Pharao und Maat",
    text: "Der Pharao galt als Gottkönig und als Vermittler zwischen Menschen und Göttern.",
    points: [
      "Er wurde als Sohn des Sonnengottes Re verstanden.",
      "Seine Aufgabe war die Sicherung der Maat: Ordnung, Gerechtigkeit und Wahrheit.",
      "So wurde Herrschaft religiös begründet (Theokratie) und der Staat stabilisiert.",
    ],
  },
  jenseits: {
    title: "Jenseits und Totenkult",
    text: "Viele Ägypter glaubten an ein Weiterleben nach dem Tod. Deshalb war der Totenkult sehr wichtig.",
    points: [
      "Der Körper sollte durch Mumifizierung erhalten bleiben.",
      "Gefäße für Organe und Grabbeigaben sollten die Reise ins Jenseits sichern.",
      "Im Totengericht wurde das Herz gegen die Feder der Maat gewogen.",
    ],
  },
  pyramiden: {
    title: "Pyramiden und Gräber",
    text: "Pyramiden waren monumentale Gräber für Pharaonen und hatten eine religiöse Bedeutung.",
    points: [
      "Sie galten als 'Häuser für die Ewigkeit'.",
      "Der Bau zeigte die Macht des Pharaos und den Glauben an das Fortleben.",
      "Gräber schützten den Verstorbenen und seine Ausstattung für das Jenseits.",
    ],
  },
};

const stepDetails = {
  1: {
    title: "1. Vorbereitung des Verstorbenen",
    text: "Der Körper wurde mumifiziert, damit er erhalten blieb. Danach wurde der Verstorbene mit Beigaben bestattet.",
  },
  2: {
    title: "2. Das Totengericht beginnt",
    text: "Im Jenseits tritt der Verstorbene vor das Gericht der Götter, oft unter dem Vorsitz von Osiris.",
  },
  3: {
    title: "3. Abwägung des Herzens",
    text: "Das Herz wird gegen die Feder der Maat gewogen. Die Feder steht für Wahrheit und Gerechtigkeit.",
  },
  4: {
    title: "4. Entscheidung",
    text: "Ist das Herz leicht und gerecht, erhält der Verstorbene ewiges Leben. Bei schwerem Herzen wird das Jenseits verwehrt.",
  },
};

const categoryLabels = {
  goetterwelt: "Götterwelt",
  pharao: "Pharao und Maat",
  jenseits: "Jenseits und Totenkult",
  pyramiden: "Pyramiden und Gräber",
};

const assignPool = [
  { statement: "Viele Götter mit unterschiedlichen Aufgaben.", answer: "goetterwelt", explanation: "Das ist die ägyptische Götterwelt." },
  { statement: "Sicherung von Ordnung und Gerechtigkeit (Maat).", answer: "pharao", explanation: "Das war eine Kernaufgabe des Pharaos." },
  { statement: "Mumifizierung als Vorbereitung auf das Weiterleben.", answer: "jenseits", explanation: "Das gehört zum Jenseitsglauben." },
  { statement: "Monumentale Gräber für den Gottkönig.", answer: "pyramiden", explanation: "Damit sind Pyramiden gemeint." },
  { statement: "Anubis, Isis, Horus und Osiris sind wichtige Beispiele.", answer: "goetterwelt", explanation: "Das sind zentrale Gottheiten." },
  { statement: "Der Herrscher gilt als Sohn des Re.", answer: "pharao", explanation: "So wurde die Herrschaft religiös legitimiert." },
  { statement: "Herz wird gegen die Feder der Wahrheit gewogen.", answer: "jenseits", explanation: "Das ist das Totengericht." },
  { statement: "Gräber als 'Häuser für die Ewigkeit'.", answer: "pyramiden", explanation: "So wurden Pyramiden religiös verstanden." },
];

const orderPool = [
  { statement: "Der Körper wird mumifiziert und vorbereitet.", correct: 1 },
  { statement: "Der Verstorbene tritt vor das Gericht im Jenseits.", correct: 2 },
  { statement: "Das Herz wird gegen die Feder der Maat gewogen.", correct: 3 },
  { statement: "Das Ergebnis entscheidet über das ewige Leben.", correct: 4 },
];

const tfPool = [
  {
    statement: "Polytheismus bedeutet Glaube an viele Götter.",
    answer: "richtig",
    explanation: "Genau, das ist die Definition von Polytheismus.",
  },
  {
    statement: "Der Pharao war nur ein militärischer Anführer ohne religiöse Rolle.",
    answer: "falsch",
    explanation: "Der Pharao hatte auch eine zentrale religiöse Bedeutung.",
  },
  {
    statement: "Maat steht für Ordnung, Wahrheit und Gerechtigkeit.",
    answer: "richtig",
    explanation: "Maat beschreibt die göttliche Weltordnung.",
  },
  {
    statement: "Im Totengericht spielte das Herz keine Rolle.",
    answer: "falsch",
    explanation: "Das Herz war im Totengericht zentral.",
  },
  {
    statement: "Pyramiden waren nur Wohnhäuser für einfache Bauern.",
    answer: "falsch",
    explanation: "Pyramiden waren Grabstätten der Pharaonen.",
  },
  {
    statement: "Grabbeigaben sollten den Verstorbenen im Jenseits helfen.",
    answer: "richtig",
    explanation: "Genau das war die religiöse Vorstellung.",
  },
  {
    statement: "Anubis ist mit Mumifizierung verbunden.",
    answer: "richtig",
    explanation: "Anubis ist ein wichtiger Totengott.",
  },
  {
    statement: "Die Ägypter glaubten nicht an ein Leben nach dem Tod.",
    answer: "falsch",
    explanation: "Der Jenseitsglaube war ein Kern des ägyptischen Glaubens.",
  },
];

const quizPool = [
  {
    prompt: "Was bedeutet Polytheismus?",
    options: ["Glaube an einen Gott", "Glaube an viele Götter", "Kein Glaube an Götter", "Nur Naturerklärungen"],
    correct: 1,
    explanation: "Polytheismus bedeutet Glaube an viele Götter.",
    wrongReasons: {
      0: "Das wäre Monotheismus.",
      2: "Das wäre Atheismus.",
      3: "Das ist keine Definition.",
    },
  },
  {
    prompt: "Welche Aufgabe hatte der Pharao nach ägyptischer Vorstellung?",
    options: [
      "Nur Steuern zählen",
      "Maat sichern und zwischen Göttern und Menschen vermitteln",
      "Nur Tempel putzen",
      "Ohne religiöse Bedeutung regieren",
    ],
    correct: 1,
    explanation: "Der Pharao galt als Gottkönig mit religiöser und politischer Aufgabe.",
    wrongReasons: {
      0: "Das ist zu eng gefasst.",
      2: "Das passt nicht zur Herrscherrolle.",
      3: "Religiöse Bedeutung war zentral.",
    },
  },
  {
    prompt: "Wofür steht Maat?",
    options: ["Chaos und Unordnung", "Wahrheit, Gerechtigkeit und Harmonie", "Nur militärische Stärke", "Nur Handel"],
    correct: 1,
    explanation: "Maat beschreibt die göttliche Weltordnung.",
    wrongReasons: {
      0: "Das Gegenteil ist richtig.",
      2: "Maat ist mehr als Machtpolitik.",
      3: "Das trifft Maat nicht.",
    },
  },
  {
    prompt: "Welche Gottheit ist besonders mit Mumifizierung verbunden?",
    options: ["Anubis", "Horus", "Thoth", "Isis"],
    correct: 0,
    explanation: "Anubis ist ein zentraler Totengott.",
    wrongReasons: {
      1: "Horus ist ein Himmelsgott.",
      2: "Thoth steht eher für Wissen und Schrift.",
      3: "Isis ist eine wichtige Göttin, aber nicht diese Zuordnung.",
    },
  },
  {
    prompt: "Warum wurde mumifiziert?",
    options: [
      "Nur aus hygienischen Gründen",
      "Damit der Körper für das Weiterleben erhalten bleibt",
      "Um den Körper zu bestrafen",
      "Damit Gräber leer bleiben",
    ],
    correct: 1,
    explanation: "Der Erhalt des Körpers galt als wichtig für das Jenseits.",
    wrongReasons: {
      0: "Der religiöse Grund war entscheidend.",
      2: "Das war nicht die Vorstellung.",
      3: "Das Gegenteil war der Fall.",
    },
  },
  {
    prompt: "Was geschah im Totengericht?",
    options: [
      "Der Name wurde versteckt",
      "Das Herz wurde gegen die Feder der Maat gewogen",
      "Nur der Grabstein wurde geprüft",
      "Es gab keine Entscheidung",
    ],
    correct: 1,
    explanation: "Die Herzensabwägung war der Kern des Totengerichts.",
    wrongReasons: {
      0: "Das beschreibt das Gericht nicht.",
      2: "Nicht der Grabstein war zentral.",
      3: "Es gab eine klare Entscheidung.",
    },
  },
  {
    prompt: "Welche Aussage zu Pyramiden ist richtig?",
    options: [
      "Sie waren Tempel für den Markt",
      "Sie waren Grabstätten mit religiöser Bedeutung",
      "Sie dienten als normale Wohnhäuser",
      "Sie hatten nichts mit dem Pharao zu tun",
    ],
    correct: 1,
    explanation: "Pyramiden waren monumentale Gräber der Pharaonen.",
    wrongReasons: {
      0: "Das passt nicht.",
      2: "Sie waren keine gewöhnlichen Häuser.",
      3: "Der Bezug zum Pharao war zentral.",
    },
  },
  {
    prompt: "Warum wurden Grabbeigaben mitgegeben?",
    options: [
      "Als Dekoration ohne Bedeutung",
      "Weil man ein Weiterleben im Jenseits erwartete",
      "Nur als Tauschware für Nachbarn",
      "Damit Gräber schneller gebaut wurden",
    ],
    correct: 1,
    explanation: "Grabbeigaben sollten den Verstorbenen im Jenseits versorgen.",
    wrongReasons: {
      0: "Sie hatten eine religiöse Funktion.",
      2: "Das war nicht der Zweck.",
      3: "Das passt nicht zum Glauben.",
    },
  },
  {
    prompt: "Welche Kombination ist korrekt?",
    options: [
      "Osiris - Totenreich",
      "Anubis - Sonnengott",
      "Re - Mumifizierungsgott",
      "Horus - Gott der Unterweltgerichte",
    ],
    correct: 0,
    explanation: "Osiris ist eng mit dem Totenreich verbunden.",
    wrongReasons: {
      1: "Anubis ist nicht der Sonnengott.",
      2: "Re ist der Sonnengott.",
      3: "Horus ist vor allem ein Himmelsgott.",
    },
  },
  {
    prompt: "Warum stärkte die religiöse Rolle des Pharaos den Staat?",
    options: [
      "Weil Herrschaft als gottgewollt angesehen wurde",
      "Weil Religion verboten war",
      "Weil alle Ämter abgeschafft wurden",
      "Weil es keine Regeln mehr gab",
    ],
    correct: 0,
    explanation: "Religiöse Legitimation trug zur Stabilität der Herrschaft bei.",
    wrongReasons: {
      1: "Das Gegenteil war der Fall.",
      2: "Ämter blieben wichtig.",
      3: "Ordnung war ein Kernprinzip.",
    },
  },
  {
    prompt: "Was wäre ein Beispiel für ein gerechtes Leben nach der Idee von Maat?",
    options: [
      "Lügen und Betrug",
      "Wahrhaftigkeit und verantwortliches Handeln",
      "Willkür ohne Regeln",
      "Missachtung von Recht",
    ],
    correct: 1,
    explanation: "Maat verbindet Wahrheit, Gerechtigkeit und Ordnung.",
    wrongReasons: {
      0: "Das widerspricht Maat.",
      2: "Maat steht gerade für Ordnung.",
      3: "Das passt nicht zur Idee von Gerechtigkeit.",
    },
  },
  {
    prompt: "Welche Zusammenfassung trifft am besten?",
    options: [
      "Religion war im Alten Ägypten nur Nebensache",
      "Religion prägte Herrschaft, Alltag, Tod und Jenseitsvorstellungen",
      "Es gab nur einen einzigen Gott ohne weitere Vorstellungen",
      "Pyramiden hatten nur wirtschaftliche Gründe",
    ],
    correct: 1,
    explanation: "Der Glaube war eng mit Staat, Gesellschaft und Alltag verbunden.",
    wrongReasons: {
      0: "Religion war zentral.",
      2: "Die Ägypter waren polytheistisch.",
      3: "Pyramiden hatten auch starke religiöse Bedeutung.",
    },
  },
];

let assignTasks = [];
let orderTasks = [];
let tfTasks = [];

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
  gaTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      gaTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      gaTabPanels.forEach((panel) => panel.classList.remove("is-active"));
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
  gaThemeTitle.textContent = detail.title;
  gaThemeText.textContent = detail.text;
  gaThemeList.innerHTML = detail.points.map((point) => `<li>${point}</li>`).join("");
  gaThemeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.theme === key);
  });
}

function setupThemeModule() {
  gaThemeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderTheme(button.dataset.theme);
    });
  });
  renderTheme("goetterwelt");
}

function renderStep(stepKey) {
  const detail = stepDetails[stepKey];
  if (!detail) {
    return;
  }
  gaStepTitle.textContent = detail.title;
  gaStepText.textContent = detail.text;
  gaStepButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.step === stepKey);
  });
}

function setupStepModule() {
  gaStepButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderStep(button.dataset.step);
    });
  });
  renderStep("1");
}

function generateAssignRound(count = 7) {
  return shuffle(assignPool).slice(0, count).map((item) => ({ ...item }));
}

function renderAssignRound() {
  gaAssignList.replaceChildren();
  assignTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "ga-task-row";

    const prompt = document.createElement("p");
    prompt.innerHTML = `<strong>${index + 1}. ${task.statement}</strong>`;

    const select = document.createElement("select");
    select.className = "ga-select";
    select.name = `assign-${index}`;
    select.innerHTML = `
      <option value="">Bitte wählen</option>
      <option value="goetterwelt">${categoryLabels.goetterwelt}</option>
      <option value="pharao">${categoryLabels.pharao}</option>
      <option value="jenseits">${categoryLabels.jenseits}</option>
      <option value="pyramiden">${categoryLabels.pyramiden}</option>
    `;

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";

    row.append(prompt, select, feedback);
    gaAssignList.append(row);
  });
}

function checkAssignRound() {
  const rows = gaAssignList.querySelectorAll(".ga-task-row");
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
    gaAssignFeedback.innerHTML = '<p class="feedback info">Bitte alle Aufgaben in Training A beantworten.</p>';
    return;
  }

  gaAssignFeedback.innerHTML = `
    <p class="feedback ${correct === assignTasks.length ? "ok" : "bad"}">
      ${correct} / ${assignTasks.length} richtig.
      ${correct === assignTasks.length ? "Sehr gut." : "Lies die Rückmeldungen und starte eine neue Runde."}
    </p>
  `;
}

function setupAssignTraining() {
  assignTasks = generateAssignRound();
  renderAssignRound();
  gaAssignFeedback.innerHTML = "";

  gaAssignNewRound.addEventListener("click", () => {
    assignTasks = generateAssignRound();
    renderAssignRound();
    gaAssignFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });

  gaAssignCheck.addEventListener("click", checkAssignRound);
}

function generateOrderRound() {
  return shuffle(orderPool).map((item) => ({ ...item }));
}

function renderOrderRound() {
  gaOrderList.replaceChildren();
  orderTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "ga-task-row";

    const prompt = document.createElement("p");
    prompt.innerHTML = `<strong>${index + 1}. ${task.statement}</strong>`;

    const select = document.createElement("select");
    select.className = "ga-select";
    select.name = `order-${index}`;
    select.innerHTML = `
      <option value="">Position wählen</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    `;

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";

    row.append(prompt, select, feedback);
    gaOrderList.append(row);
  });
}

function checkOrderRound() {
  const rows = gaOrderList.querySelectorAll(".ga-task-row");
  const chosenPositions = [];
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
    chosenPositions.push(select.value);

    const task = orderTasks[index];
    if (Number(select.value) === task.correct) {
      correct += 1;
      row.classList.add("is-correct");
      feedback.innerHTML = '<p class="feedback ok">Position passt.</p>';
      return;
    }

    row.classList.add("is-wrong");
    feedback.innerHTML = `<p class="feedback bad">Nicht korrekt. Richtige Position: ${task.correct}.</p>`;
  });

  if (answered < orderTasks.length) {
    gaOrderFeedback.innerHTML = '<p class="feedback info">Bitte alle Schritte in Training B einordnen.</p>';
    return;
  }

  if (new Set(chosenPositions).size !== chosenPositions.length) {
    gaOrderFeedback.innerHTML = '<p class="feedback info">Jede Position 1 bis 4 darf nur einmal vergeben werden.</p>';
    return;
  }

  gaOrderFeedback.innerHTML = `
    <p class="feedback ${correct === orderTasks.length ? "ok" : "bad"}">
      ${correct} / ${orderTasks.length} richtig.
      ${correct === orderTasks.length ? "Sehr gut." : "Prüfe die Reihenfolge und starte eine neue Runde."}
    </p>
  `;
}

function setupOrderTraining() {
  orderTasks = generateOrderRound();
  renderOrderRound();
  gaOrderFeedback.innerHTML = "";

  gaOrderNewRound.addEventListener("click", () => {
    orderTasks = generateOrderRound();
    renderOrderRound();
    gaOrderFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });

  gaOrderCheck.addEventListener("click", checkOrderRound);
}

function generateTfRound(count = 6) {
  return shuffle(tfPool).slice(0, count).map((item) => ({ ...item }));
}

function renderTfRound() {
  gaTfList.replaceChildren();
  tfTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "ga-task-row";

    const prompt = document.createElement("p");
    prompt.textContent = `${index + 1}. ${task.statement}`;

    const choiceGrid = document.createElement("div");
    choiceGrid.className = "ga-choice-grid";

    [
      { value: "richtig", label: "Richtig" },
      { value: "falsch", label: "Falsch" },
    ].forEach((option) => {
      const label = document.createElement("label");
      label.className = "ga-choice-item";
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `tf-${index}`;
      radio.value = option.value;
      label.append(radio, document.createTextNode(option.label));
      choiceGrid.append(label);
    });

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";

    row.append(prompt, choiceGrid, feedback);
    gaTfList.append(row);
  });
}

function checkTfRound() {
  const rows = gaTfList.querySelectorAll(".ga-task-row");
  let answered = 0;
  let correct = 0;

  rows.forEach((row, index) => {
    row.classList.remove("is-correct", "is-wrong");
    const feedback = row.querySelector(".task-feedback");
    if (!(feedback instanceof HTMLDivElement)) {
      return;
    }
    feedback.innerHTML = "";

    const selected = row.querySelector(`input[name="tf-${index}"]:checked`);
    if (!(selected instanceof HTMLInputElement)) {
      return;
    }
    answered += 1;

    const task = tfTasks[index];
    if (selected.value === task.answer) {
      correct += 1;
      row.classList.add("is-correct");
      feedback.innerHTML = `<p class="feedback ok">Richtig. ${task.explanation}</p>`;
      return;
    }

    row.classList.add("is-wrong");
    feedback.innerHTML = `
      <p class="feedback bad">
        Nicht korrekt. Richtige Antwort: ${task.answer === "richtig" ? "Richtig" : "Falsch"}.
        ${task.explanation}
      </p>
    `;
  });

  if (answered < tfTasks.length) {
    gaTfFeedback.innerHTML = '<p class="feedback info">Bitte alle Aufgaben in Training C beantworten.</p>';
    return;
  }

  gaTfFeedback.innerHTML = `
    <p class="feedback ${correct === tfTasks.length ? "ok" : "bad"}">
      ${correct} / ${tfTasks.length} richtig.
      ${correct === tfTasks.length ? "Sehr gut." : "Prüfe die Erklärungen und starte eine neue Runde."}
    </p>
  `;
}

function setupTfTraining() {
  tfTasks = generateTfRound();
  renderTfRound();
  gaTfFeedback.innerHTML = "";

  gaTfNewRound.addEventListener("click", () => {
    tfTasks = generateTfRound();
    renderTfRound();
    gaTfFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });

  gaTfCheck.addEventListener("click", checkTfRound);
}

function updateQuizScore() {
  gaQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  gaQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  gaQuizPrompt.textContent = question.prompt;
  gaQuizFeedback.innerHTML = "";
  gaQuizNext.disabled = true;
  gaQuizAnswers.innerHTML = question.options
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
  gaQuizStatus.textContent = "Test abgeschlossen.";
  gaQuizPrompt.textContent = "Du kannst den Test neu starten.";
  gaQuizAnswers.innerHTML = "";
  gaQuizFeedback.innerHTML = '<p class="feedback info">Nutze die Fehlererklärungen zur Wiederholung.</p>';
  gaQuizNext.disabled = true;
  gaQuizStart.textContent = "Neu starten";
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

  gaQuizAnswers.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  const wrongReason = question.wrongReasons?.[optionIndex] || "Bitte die Begriffe nochmals vergleichen.";
  gaQuizFeedback.innerHTML = `
    <p class="feedback ${isCorrect ? "ok" : "bad"}">
      ${isCorrect
        ? `Richtig. ${question.explanation}`
        : `Nicht korrekt. ${wrongReason} Richtige Antwort: "${question.options[question.correct]}". ${question.explanation}`}
    </p>
  `;

  gaQuizNext.disabled = false;
  gaQuizNext.textContent =
    quizState.index === quizState.questions.length - 1 ? "Ergebnis anzeigen" : "Nächste Frage";
}

function startQuiz() {
  quizState.running = true;
  quizState.answered = false;
  quizState.index = 0;
  quizState.correct = 0;
  quizState.questions = shuffle(quizPool).slice(0, 10);
  gaQuizStart.textContent = "Test neu starten";
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
  gaQuizStart.addEventListener("click", startQuiz);
  gaQuizNext.addEventListener("click", nextQuizStep);
  gaQuizAnswers.addEventListener("click", (event) => {
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
setupStepModule();
setupAssignTraining();
setupOrderTraining();
setupTfTraining();
setupQuiz();
