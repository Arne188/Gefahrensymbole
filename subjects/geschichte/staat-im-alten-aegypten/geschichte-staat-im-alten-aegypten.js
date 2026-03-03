const saTabButtons = document.querySelectorAll(".sa-tab-btn");
const saTabPanels = document.querySelectorAll(".sa-tab");

const saThemeButtons = document.querySelectorAll(".sa-theme-btn");
const saThemeTitle = document.getElementById("saThemeTitle");
const saThemeText = document.getElementById("saThemeText");
const saThemeList = document.getElementById("saThemeList");

const saStepButtons = document.querySelectorAll(".sa-step-btn");
const saStepTitle = document.getElementById("saStepTitle");
const saStepText = document.getElementById("saStepText");

const saAssignNewRound = document.getElementById("saAssignNewRound");
const saAssignCheck = document.getElementById("saAssignCheck");
const saAssignList = document.getElementById("saAssignList");
const saAssignFeedback = document.getElementById("saAssignFeedback");

const saOrderNewRound = document.getElementById("saOrderNewRound");
const saOrderCheck = document.getElementById("saOrderCheck");
const saOrderList = document.getElementById("saOrderList");
const saOrderFeedback = document.getElementById("saOrderFeedback");

const saTfNewRound = document.getElementById("saTfNewRound");
const saTfCheck = document.getElementById("saTfCheck");
const saTfList = document.getElementById("saTfList");
const saTfFeedback = document.getElementById("saTfFeedback");

const saQuizStart = document.getElementById("saQuizStart");
const saQuizNext = document.getElementById("saQuizNext");
const saQuizScore = document.getElementById("saQuizScore");
const saQuizStatus = document.getElementById("saQuizStatus");
const saQuizPrompt = document.getElementById("saQuizPrompt");
const saQuizAnswers = document.getElementById("saQuizAnswers");
const saQuizFeedback = document.getElementById("saQuizFeedback");

const themeDetails = {
  pharao: {
    title: "Pharao als Zentrum des Staates",
    text: "Der Pharao galt als Gottkönig: politischer Herrscher und religiöse Leitfigur in einer Person.",
    points: [
      "Der Pharao wurde als Sohn des Sonnengottes Re verstanden.",
      "Er stand an der Spitze von Heer, Rechtsprechung und Gesetzgebung.",
      "Als oberster Herrscher galt er als formaler Besitzer des Landes.",
      "Seine Hauptaufgabe war die Sicherung der Maat: Ordnung, Wahrheit und Gerechtigkeit.",
    ],
  },
  verwaltung: {
    title: "Verwaltung und Ämter",
    text: "Der Staat brauchte viele Fachleute, um ein großes Reich entlang des Nils zu organisieren.",
    points: [
      "Der Wesir war der wichtigste Beamte und direkte Stellvertreter des Pharaos.",
      "Beamte organisierten Bauprojekte und erhoben Steuern, oft in Form von Getreide.",
      "Priester verwalteten Tempel und führten Kulte durch.",
      "Schreiber hielten Listen, Befehle, Vorräte und Abgaben schriftlich fest.",
    ],
  },
  nil: {
    title: "Der Staat als Antwort auf den Nil",
    text: "Die jährliche Nilschwemme brachte fruchtbaren Schlamm, machte aber Planung zwingend notwendig.",
    points: [
      "Dämme und Kanäle mussten gemeinsam gebaut und gepflegt werden.",
      "Felder wurden nach der Flut neu vermessen, damit Abgaben gerecht festgelegt werden konnten.",
      "Der Staat legte Vorräte an, um Hungerzeiten zu überbrücken.",
      "So konnten auch Menschen versorgt werden, die nicht in der Landwirtschaft arbeiteten.",
    ],
  },
  gesellschaft: {
    title: "Gesellschaftspyramide",
    text: "Die Gesellschaft war klar gegliedert. Jede Gruppe hatte Aufgaben für das Funktionieren des Staates.",
    points: [
      "Oben stand der Pharao, darunter Wesir, hohe Beamte und Priester.",
      "Schreiber waren für Verwaltung unverzichtbar, weil nur wenige lesen und schreiben konnten.",
      "Handwerker, Händler und Soldaten trugen die mittlere Ebene.",
      "Bauern bildeten die größte Gruppe und arbeiteten auf den Feldern des Staates.",
    ],
  },
};

const stepDetails = {
  1: {
    title: "1. Nilschwemme verändert die Landschaft",
    text: "Jedes Jahr überflutete der Nil weite Flächen. Das brachte Fruchtbarkeit, aber auch Unsicherheit für Dörfer und Felder.",
  },
  2: {
    title: "2. Planung und gemeinsame Arbeit",
    text: "Damit Wasser sinnvoll verteilt wurde, mussten Dämme, Kanäle und Wege geplant werden. Das konnte nur gemeinsam gelingen.",
  },
  3: {
    title: "3. Verwaltung regelt Abgaben und Vorräte",
    text: "Beamte und Schreiber erfassten Erträge, organisierten Abgaben und füllten zentrale Speicherhäuser.",
  },
  4: {
    title: "4. Versorgung schafft Stabilität",
    text: "Mit Vorräten konnten Hungerzeiten überbrückt und Menschen in Verwaltung, Handwerk und Heer versorgt werden.",
  },
};

const categoryLabels = {
  pharao: "Pharao und Herrschaft",
  verwaltung: "Verwaltung und Ämter",
  gesellschaft: "Gesellschaftspyramide",
  nil: "Staat und Nil",
};

const assignPool = [
  {
    statement: "Sichert Maat, spricht Recht und führt das Heer.",
    answer: "pharao",
    explanation: "Das sind Kernaufgaben des Pharaos.",
  },
  {
    statement: "Leitet als wichtigster Beamter die gesamte Verwaltung.",
    answer: "verwaltung",
    explanation: "Das beschreibt den Wesir.",
  },
  {
    statement: "Schreiber dokumentieren Vorräte, Befehle und Steuern.",
    answer: "verwaltung",
    explanation: "Ohne Schreiber wäre Verwaltung kaum möglich gewesen.",
  },
  {
    statement: "Bauern stellen die größte Bevölkerungsgruppe.",
    answer: "gesellschaft",
    explanation: "In der Gesellschaftspyramide standen sie weit unten, aber waren unverzichtbar.",
  },
  {
    statement: "Dämme und Kanäle müssen geplant und instand gehalten werden.",
    answer: "nil",
    explanation: "Das hängt direkt mit der Nilschwemme zusammen.",
  },
  {
    statement: "Religiöse Legitimation stärkt die Herrschaft.",
    answer: "pharao",
    explanation: "Die Herrschaft galt als gottgewollt.",
  },
  {
    statement: "Vorratshäuser helfen in Jahren mit schlechter Ernte.",
    answer: "nil",
    explanation: "Die Vorratshaltung war eine zentrale Staatsaufgabe.",
  },
  {
    statement: "Handwerker, Händler und Soldaten bilden die mittlere Schicht.",
    answer: "gesellschaft",
    explanation: "Das gehört zur sozialen Gliederung des Staates.",
  },
];

const orderPool = [
  { statement: "Der Nil überflutet Felder und verändert Grenzen.", correct: 1 },
  { statement: "Dämme, Kanäle und Vermessung werden organisiert.", correct: 2 },
  { statement: "Schreiber und Beamte erfassen Erträge und Abgaben.", correct: 3 },
  { statement: "Vorräte sichern Versorgung und Ordnung im Reich.", correct: 4 },
];

const tfPool = [
  {
    statement: "Der Pharao vereinte religiöse und politische Macht.",
    answer: "richtig",
    explanation: "Genau das beschreibt das Gottkönigtum.",
  },
  {
    statement: "Der Wesir war der direkte Stellvertreter des Pharaos.",
    answer: "richtig",
    explanation: "Der Wesir war der höchste Beamte im Staat.",
  },
  {
    statement: "Die Nilschwemme hatte keinen Einfluss auf den Staat.",
    answer: "falsch",
    explanation: "Sie war ein Hauptgrund für zentrale Planung und Verwaltung.",
  },
  {
    statement: "Schreiber waren verzichtbar, weil alle lesen konnten.",
    answer: "falsch",
    explanation: "Nur ein kleiner Teil der Bevölkerung konnte lesen und schreiben.",
  },
  {
    statement: "Maat steht für Ordnung und Gerechtigkeit.",
    answer: "richtig",
    explanation: "Maat war ein Grundprinzip von Herrschaft und Zusammenleben.",
  },
  {
    statement: "Bauern gehörten zur kleinsten Gruppe der Gesellschaft.",
    answer: "falsch",
    explanation: "Bauern waren die größte Bevölkerungsgruppe.",
  },
  {
    statement: "Steuern konnten im Alten Ägypten auch in Getreide gezahlt werden.",
    answer: "richtig",
    explanation: "Abgaben in Naturalien waren üblich.",
  },
  {
    statement: "Priester hatten nur mit Handel zu tun.",
    answer: "falsch",
    explanation: "Priester waren vor allem für Tempel und Kulte zuständig.",
  },
];

const quizPool = [
  {
    prompt: "Warum hatte der Pharao im Staat eine so starke Stellung?",
    options: [
      "Er galt als Gottkönig und oberster Herrscher",
      "Er war nur Sprecher der Bauern",
      "Er durfte keine Gesetze erlassen",
      "Er hatte keine religiöse Rolle",
    ],
    correct: 0,
    explanation: "Die Verbindung von religiöser und politischer Macht stärkte seine Position.",
    wrongReasons: {
      1: "Das war nicht seine Hauptrolle.",
      2: "Gesetzgebung gehörte zu seinen Aufgaben.",
      3: "Die religiöse Rolle war zentral.",
    },
  },
  {
    prompt: "Welche Aufgabe hatte der Wesir?",
    options: [
      "Er führte den Staat als höchster Beamter für den Pharao",
      "Er war nur Tempelsänger",
      "Er durfte nichts entscheiden",
      "Er war ausschließlich Soldat",
    ],
    correct: 0,
    explanation: "Der Wesir koordinierte die Verwaltung des Reiches.",
    wrongReasons: {
      1: "Das trifft die Rolle nicht.",
      2: "Der Wesir hatte große Verantwortung.",
      3: "Das war nicht seine Hauptaufgabe.",
    },
  },
  {
    prompt: "Warum waren Schreiber wichtig?",
    options: [
      "Sie dokumentierten Verwaltung, Vorräte und Abgaben",
      "Sie ersetzten alle Priester",
      "Sie arbeiteten nur auf Feldern",
      "Sie bauten ausschließlich Tempel",
    ],
    correct: 0,
    explanation: "Schrift war für Organisation des Staates unverzichtbar.",
    wrongReasons: {
      1: "Das war nicht ihre Aufgabe.",
      2: "Das passt nicht zur Tätigkeit von Schreibern.",
      3: "Bauleitung war nicht ihre Hauptrolle.",
    },
  },
  {
    prompt: "Was beschreibt Maat am besten?",
    options: [
      "Ordnung, Wahrheit und Gerechtigkeit",
      "Beliebige Herrschaft ohne Regeln",
      "Nur militärische Stärke",
      "Nur Handel und Preise",
    ],
    correct: 0,
    explanation: "Maat war die Vorstellung einer gerechten Weltordnung.",
    wrongReasons: {
      1: "Das Gegenteil ist richtig.",
      2: "Maat ist umfassender als Militär.",
      3: "Das ist zu eng gefasst.",
    },
  },
  {
    prompt: "Welche Gruppe war zahlenmäßig am größten?",
    options: ["Bauern", "Wesire", "Schreiber", "Priester"],
    correct: 0,
    explanation: "Die Landwirtschaft trug die Versorgung des Reiches.",
    wrongReasons: {
      1: "Es gab nur sehr wenige Wesire.",
      2: "Schreiber waren wichtig, aber zahlenmäßig klein.",
      3: "Priester waren nicht die größte Gruppe.",
    },
  },
  {
    prompt: "Warum brauchte Ägypten wegen des Nils eine starke Organisation?",
    options: [
      "Für Bewässerung, Vermessung und gemeinsame Bauarbeiten",
      "Damit niemand mehr Felder brauchte",
      "Um den Nil trocken zu legen",
      "Weil es keine Ernten gab",
    ],
    correct: 0,
    explanation: "Die Nilschwemme erforderte jährliche Planung und Zusammenarbeit.",
    wrongReasons: {
      1: "Felder blieben zentral.",
      2: "Das war weder möglich noch das Ziel.",
      3: "Ernten waren möglich, aber nur mit Organisation.",
    },
  },
  {
    prompt: "Wozu dienten zentrale Speicherhäuser?",
    options: [
      "Zur Vorratshaltung und Versorgung in schlechten Jahren",
      "Nur als Wohnhaus für Priester",
      "Als Schule für Soldaten",
      "Als Ort für Theateraufführungen",
    ],
    correct: 0,
    explanation: "Vorräte machten den Staat krisenfester.",
    wrongReasons: {
      1: "Das war nicht die Hauptfunktion.",
      2: "Das passt nicht.",
      3: "Das hat mit dem Zweck nichts zu tun.",
    },
  },
  {
    prompt: "Welche Aussage passt zur Gesellschaftspyramide?",
    options: [
      "Jede Gruppe hatte klar geregelte Aufgaben",
      "Alle hatten genau die gleichen Aufgaben",
      "Es gab keine Verwaltung",
      "Nur Priester arbeiteten",
    ],
    correct: 0,
    explanation: "Arbeitsteilung war ein Merkmal der Hochkultur.",
    wrongReasons: {
      1: "Die Gesellschaft war klar gegliedert.",
      2: "Verwaltung war zentral.",
      3: "Viele Gruppen trugen den Staat.",
    },
  },
  {
    prompt: "Wie wurden Steuern häufig erhoben?",
    options: ["Als Naturalien wie Getreide", "Nur in Münzen", "Nur als Arbeitsverbote", "Gar nicht"],
    correct: 0,
    explanation: "Abgaben in Getreide waren typisch für einen Agrarstaat.",
    wrongReasons: {
      1: "Münzsysteme spielten hier nicht die Hauptrolle.",
      2: "Das ist keine Steuerform.",
      3: "Der Staat erhob Abgaben.",
    },
  },
  {
    prompt: "Welche Zusammenfassung trifft am besten?",
    options: [
      "Staat, Religion und Wirtschaft waren eng miteinander verbunden",
      "Der Staat war vom Glauben vollständig getrennt",
      "Der Nil spielte kaum eine Rolle",
      "Schrift war für den Staat unwichtig",
    ],
    correct: 0,
    explanation: "Im Alten Ägypten griffen Herrschaft, Religion und Verwaltung ineinander.",
    wrongReasons: {
      1: "Religiöse Legitimation war wichtig.",
      2: "Der Nil war zentral.",
      3: "Schrift war ein Schlüssel der Organisation.",
    },
  },
  {
    prompt: "Was bedeutet religiöse Legitimation der Herrschaft?",
    options: [
      "Herrschaft wird als gottgewollt begründet",
      "Herrschaft braucht keine Regeln",
      "Priester wählen jedes Jahr einen neuen Staat",
      "Gesetze gelten nur im Tempel",
    ],
    correct: 0,
    explanation: "So wurde die Position des Pharaos zusätzlich abgesichert.",
    wrongReasons: {
      1: "Regeln waren zentral.",
      2: "Das passt nicht zum ägyptischen Staat.",
      3: "Gesetze galten im Reich, nicht nur im Tempel.",
    },
  },
  {
    prompt: "Welche Gruppe gehört zur mittleren Ebene der Gesellschaftspyramide?",
    options: ["Handwerker und Händler", "Nur der Pharao", "Nur Wesir und Priester", "Nur Bauern"],
    correct: 0,
    explanation: "Handwerker, Händler und Soldaten bilden die mittlere Schicht.",
    wrongReasons: {
      1: "Der Pharao steht an der Spitze.",
      2: "Diese Gruppen gehören weiter oben.",
      3: "Bauern stehen weiter unten, nicht in der Mitte.",
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

function shuffleQuizOptions(question) {
  const order = shuffle(question.options.map((_, index) => index));
  const options = order.map((index) => question.options[index]);
  const correct = order.indexOf(question.correct);
  const wrongReasons = {};

  order.forEach((originalIndex, newIndex) => {
    if (question.wrongReasons && question.wrongReasons[originalIndex]) {
      wrongReasons[newIndex] = question.wrongReasons[originalIndex];
    }
  });

  return {
    ...question,
    options,
    correct,
    wrongReasons,
  };
}

function setupTabs() {
  saTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      saTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      saTabPanels.forEach((panel) => panel.classList.remove("is-active"));
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
  saThemeTitle.textContent = detail.title;
  saThemeText.textContent = detail.text;
  saThemeList.innerHTML = detail.points.map((point) => `<li>${point}</li>`).join("");
  saThemeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.theme === key);
  });
}

function setupThemeModule() {
  saThemeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderTheme(button.dataset.theme);
    });
  });
  renderTheme("pharao");
}

function renderStep(stepKey) {
  const detail = stepDetails[stepKey];
  if (!detail) {
    return;
  }
  saStepTitle.textContent = detail.title;
  saStepText.textContent = detail.text;
  saStepButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.step === stepKey);
  });
}

function setupStepModule() {
  saStepButtons.forEach((button) => {
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
  saAssignList.replaceChildren();
  assignTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "sa-task-row";

    const prompt = document.createElement("p");
    prompt.innerHTML = `<strong>${index + 1}. ${task.statement}</strong>`;

    const select = document.createElement("select");
    select.className = "sa-select";
    select.name = `assign-${index}`;
    select.innerHTML = `
      <option value="">Bitte wählen</option>
      <option value="pharao">${categoryLabels.pharao}</option>
      <option value="verwaltung">${categoryLabels.verwaltung}</option>
      <option value="gesellschaft">${categoryLabels.gesellschaft}</option>
      <option value="nil">${categoryLabels.nil}</option>
    `;

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";

    row.append(prompt, select, feedback);
    saAssignList.append(row);
  });
}

function checkAssignRound() {
  const rows = saAssignList.querySelectorAll(".sa-task-row");
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
    saAssignFeedback.innerHTML = '<p class="feedback info">Bitte alle Aufgaben in Training A beantworten.</p>';
    return;
  }

  saAssignFeedback.innerHTML = `
    <p class="feedback ${correct === assignTasks.length ? "ok" : "bad"}">
      ${correct} / ${assignTasks.length} richtig.
      ${correct === assignTasks.length ? "Sehr gut." : "Lies die Rückmeldungen und starte eine neue Runde."}
    </p>
  `;
}

function setupAssignTraining() {
  assignTasks = generateAssignRound();
  renderAssignRound();
  saAssignFeedback.innerHTML = "";

  saAssignNewRound.addEventListener("click", () => {
    assignTasks = generateAssignRound();
    renderAssignRound();
    saAssignFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });

  saAssignCheck.addEventListener("click", checkAssignRound);
}

function generateOrderRound() {
  return shuffle(orderPool).map((item) => ({ ...item }));
}

function renderOrderRound() {
  saOrderList.replaceChildren();
  orderTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "sa-task-row";

    const prompt = document.createElement("p");
    prompt.innerHTML = `<strong>${index + 1}. ${task.statement}</strong>`;

    const select = document.createElement("select");
    select.className = "sa-select";
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
    saOrderList.append(row);
  });
}

function checkOrderRound() {
  const rows = saOrderList.querySelectorAll(".sa-task-row");
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
    saOrderFeedback.innerHTML = '<p class="feedback info">Bitte alle Schritte in Training B einordnen.</p>';
    return;
  }

  if (new Set(chosenPositions).size !== chosenPositions.length) {
    saOrderFeedback.innerHTML = '<p class="feedback info">Jede Position 1 bis 4 darf nur einmal vergeben werden.</p>';
    return;
  }

  saOrderFeedback.innerHTML = `
    <p class="feedback ${correct === orderTasks.length ? "ok" : "bad"}">
      ${correct} / ${orderTasks.length} richtig.
      ${correct === orderTasks.length ? "Sehr gut." : "Prüfe die Reihenfolge und starte eine neue Runde."}
    </p>
  `;
}

function setupOrderTraining() {
  orderTasks = generateOrderRound();
  renderOrderRound();
  saOrderFeedback.innerHTML = "";

  saOrderNewRound.addEventListener("click", () => {
    orderTasks = generateOrderRound();
    renderOrderRound();
    saOrderFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });

  saOrderCheck.addEventListener("click", checkOrderRound);
}

function generateTfRound(count = 6) {
  return shuffle(tfPool).slice(0, count).map((item) => ({ ...item }));
}

function renderTfRound() {
  saTfList.replaceChildren();
  tfTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "sa-task-row";

    const prompt = document.createElement("p");
    prompt.textContent = `${index + 1}. ${task.statement}`;

    const choiceGrid = document.createElement("div");
    choiceGrid.className = "sa-choice-grid";

    [
      { value: "richtig", label: "Richtig" },
      { value: "falsch", label: "Falsch" },
    ].forEach((option) => {
      const label = document.createElement("label");
      label.className = "sa-choice-item";
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
    saTfList.append(row);
  });
}

function checkTfRound() {
  const rows = saTfList.querySelectorAll(".sa-task-row");
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
    saTfFeedback.innerHTML = '<p class="feedback info">Bitte alle Aufgaben in Training C beantworten.</p>';
    return;
  }

  saTfFeedback.innerHTML = `
    <p class="feedback ${correct === tfTasks.length ? "ok" : "bad"}">
      ${correct} / ${tfTasks.length} richtig.
      ${correct === tfTasks.length ? "Sehr gut." : "Prüfe die Erklärungen und starte eine neue Runde."}
    </p>
  `;
}

function setupTfTraining() {
  tfTasks = generateTfRound();
  renderTfRound();
  saTfFeedback.innerHTML = "";

  saTfNewRound.addEventListener("click", () => {
    tfTasks = generateTfRound();
    renderTfRound();
    saTfFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });

  saTfCheck.addEventListener("click", checkTfRound);
}

function updateQuizScore() {
  saQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  saQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  saQuizPrompt.textContent = question.prompt;
  saQuizFeedback.innerHTML = "";
  saQuizNext.disabled = true;
  saQuizAnswers.innerHTML = question.options
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
  saQuizStatus.textContent = "Test abgeschlossen.";
  saQuizPrompt.textContent = "Du kannst den Test neu starten.";
  saQuizAnswers.innerHTML = "";
  saQuizFeedback.innerHTML = '<p class="feedback info">Nutze die Fehlererklärungen zur Wiederholung.</p>';
  saQuizNext.disabled = true;
  saQuizStart.textContent = "Neu starten";
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

  saQuizAnswers.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  const wrongReason = question.wrongReasons?.[optionIndex] || "Bitte die Begriffe nochmals vergleichen.";
  saQuizFeedback.innerHTML = `
    <p class="feedback ${isCorrect ? "ok" : "bad"}">
      ${isCorrect
        ? `Richtig. ${question.explanation}`
        : `Nicht korrekt. ${wrongReason} Richtige Antwort: "${question.options[question.correct]}". ${question.explanation}`}
    </p>
  `;

  saQuizNext.disabled = false;
  saQuizNext.textContent =
    quizState.index === quizState.questions.length - 1 ? "Ergebnis anzeigen" : "Nächste Frage";
}

function startQuiz() {
  quizState.running = true;
  quizState.answered = false;
  quizState.index = 0;
  quizState.correct = 0;
  quizState.questions = shuffle(quizPool)
    .slice(0, 10)
    .map((question) => shuffleQuizOptions(question));
  saQuizStart.textContent = "Test neu starten";
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
  saQuizStart.addEventListener("click", startQuiz);
  saQuizNext.addEventListener("click", nextQuizStep);
  saQuizAnswers.addEventListener("click", (event) => {
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
