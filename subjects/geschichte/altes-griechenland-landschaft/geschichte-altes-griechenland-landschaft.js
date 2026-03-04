const ggTabButtons = document.querySelectorAll(".gg-tab-btn");
const ggTabPanels = document.querySelectorAll(".gg-tab");

const ggThemeButtons = document.querySelectorAll(".gg-theme-btn");
const ggThemeTitle = document.getElementById("ggThemeTitle");
const ggThemeText = document.getElementById("ggThemeText");
const ggThemeList = document.getElementById("ggThemeList");

const ggStepButtons = document.querySelectorAll(".gg-step-btn");
const ggStepTitle = document.getElementById("ggStepTitle");
const ggStepText = document.getElementById("ggStepText");

const ggAssignNewRound = document.getElementById("ggAssignNewRound");
const ggAssignCheck = document.getElementById("ggAssignCheck");
const ggAssignList = document.getElementById("ggAssignList");
const ggAssignFeedback = document.getElementById("ggAssignFeedback");

const ggOrderNewRound = document.getElementById("ggOrderNewRound");
const ggOrderCheck = document.getElementById("ggOrderCheck");
const ggOrderList = document.getElementById("ggOrderList");
const ggOrderFeedback = document.getElementById("ggOrderFeedback");

const ggTfNewRound = document.getElementById("ggTfNewRound");
const ggTfCheck = document.getElementById("ggTfCheck");
const ggTfList = document.getElementById("ggTfList");
const ggTfFeedback = document.getElementById("ggTfFeedback");

const ggQuizStart = document.getElementById("ggQuizStart");
const ggQuizNext = document.getElementById("ggQuizNext");
const ggQuizScore = document.getElementById("ggQuizScore");
const ggQuizStatus = document.getElementById("ggQuizStatus");
const ggQuizPrompt = document.getElementById("ggQuizPrompt");
const ggQuizAnswers = document.getElementById("ggQuizAnswers");
const ggQuizFeedback = document.getElementById("ggQuizFeedback");

const themeDetails = {
  gebirge: {
    title: "Gebirge und Täler",
    text: "Große Teile Griechenlands sind bergig. Viele Täler sind voneinander getrennt.",
    points: [
      "Das Relief ist stark gegliedert: Berge, kleine Ebenen und Küstenräume liegen nah beieinander.",
      "Der Landweg zwischen Regionen war oft schwierig und langsam.",
      "Dadurch entwickelten sich viele Orte eigenständig.",
      "Im Unterricht erklärt das, warum es viele Stadtstaaten (Poleis) gab.",
    ],
  },
  meer: {
    title: "Meer und Küsten",
    text: "Das Meer war für die Griechen ein zentraler Verkehrs- und Handelsraum.",
    points: [
      "Viele Küsten und Häfen erleichterten Schifffahrt und Austausch.",
      "Über das Meer wurden Waren, Wissen und Ideen verbreitet.",
      "Bei langen Landwegen war der Seeweg oft günstiger.",
      "Das Mittelmeer verband Griechenland mit anderen Regionen.",
    ],
  },
  inseln: {
    title: "Inseln und Karte",
    text: "Griechenland besteht aus Festland und vielen Inseln im Mittelmeerraum.",
    points: [
      "Inseln lagen wie Stationen auf wichtigen Seerouten.",
      "Die Lage zwischen Ägäis, Ionischem Meer und östlichem Mittelmeer war strategisch günstig.",
      "Räumliche Nähe zum Meer prägte Alltag, Ernährung und Wirtschaft.",
      "Kartenarbeit hilft, Entfernungen und Verbindungen besser zu verstehen.",
    ],
  },
  anbau: {
    title: "Anbau und Alltag",
    text: "Fruchtbares Ackerland war begrenzt. Deshalb mussten die Menschen angepasst wirtschaften.",
    points: [
      "Wichtige Produkte waren Oliven, Wein und Getreide.",
      "In einigen Küstenebenen war Landwirtschaft besser möglich als im Gebirge.",
      "Nicht alles konnte vor Ort erzeugt werden, deshalb war Handel wichtig.",
      "Geographie und Wirtschaft hingen eng zusammen.",
    ],
  },
  polis: {
    title: "Polis und Kolonisation",
    text: "Aus getrennten Landschaftsräumen entstanden viele Poleis mit eigenen Regeln.",
    points: [
      "Eine Polis war eine Stadt mit Umland und politischer Selbstständigkeit.",
      "Bevölkerungsdruck, Handel und Rohstoffsuche förderten Kolonisation.",
      "Neue Siedlungen entstanden in anderen Mittelmeergebieten.",
      "So blieb die griechische Welt trotz vieler Einzelpoleis verbunden.",
    ],
  },
};

const stepDetails = {
  1: {
    title: "1. Zerteilte Landschaft",
    text: "Berge und stark gegliederte Küsten teilten den Raum in viele kleinere Regionen.",
  },
  2: {
    title: "2. Getrennte Räume",
    text: "Der Überlandverkehr war mühsam. Orte waren stärker auf ihre Umgebung ausgerichtet.",
  },
  3: {
    title: "3. Viele Poleis",
    text: "Aus den getrennten Räumen entwickelten sich unabhängige Stadtstaaten mit eigener Ordnung.",
  },
  4: {
    title: "4. Meerhandel",
    text: "Das Meer verband diese Poleis. Handel und Schifffahrt wurden zur Lebensader.",
  },
  5: {
    title: "5. Kolonisation",
    text: "Poleis gründeten neue Siedlungen im Mittelmeerraum, um Handel und Versorgung zu erweitern.",
  },
};

const categoryLabels = {
  gebirge: "Gebirge und Täler",
  meer: "Meer und Küsten",
  inseln: "Inseln und Karte",
  anbau: "Anbau und Alltag",
  polis: "Polis und Kolonisation",
};

const assignPool = [
  {
    statement: "Schwieriger Überlandverkehr zwischen Regionen.",
    answer: "gebirge",
    explanation: "Das hängt mit der bergigen Landschaft zusammen.",
  },
  {
    statement: "Wichtiger Handelsweg über Schiffe und Häfen.",
    answer: "meer",
    explanation: "Das Meer war der zentrale Verkehrsraum.",
  },
  {
    statement: "Viele Inseln als Stationen auf Seerouten.",
    answer: "inseln",
    explanation: "Inseln waren im Mittelmeerraum wichtig vernetzt.",
  },
  {
    statement: "Oliven, Wein und Getreide als typische Produkte.",
    answer: "anbau",
    explanation: "Das sind zentrale Anbauprodukte.",
  },
  {
    statement: "Unabhängige Stadtstaaten mit eigenem Umland.",
    answer: "polis",
    explanation: "Das beschreibt die Polis-Struktur.",
  },
  {
    statement: "Kleine Ebenen zwischen Bergen und Küsten.",
    answer: "gebirge",
    explanation: "Das gehört zur Reliefstruktur.",
  },
  {
    statement: "Verbindung zu fernen Regionen durch Seefahrt.",
    answer: "meer",
    explanation: "Schifffahrt erleichterte Austausch und Handel.",
  },
  {
    statement: "Fruchtbares Land war nicht überall verfügbar.",
    answer: "anbau",
    explanation: "Daher war ergänzender Handel nötig.",
  },
  {
    statement: "Neugründungen im Mittelmeerraum.",
    answer: "polis",
    explanation: "Das ist Kolonisation.",
  },
  {
    statement: "Karte zeigt Festland und Inselwelt als Einheit.",
    answer: "inseln",
    explanation: "Die geographische Lage ist zentral.",
  },
];

const orderPool = [
  { statement: "Berge und Küsten zerteilen den Raum.", correct: 1 },
  { statement: "Viele Regionen bleiben voneinander getrennt.", correct: 2 },
  { statement: "Es entstehen unabhängige Poleis.", correct: 3 },
  { statement: "Das Meer verbindet Poleis durch Handel.", correct: 4 },
  { statement: "Poleis gründen Kolonien im Mittelmeerraum.", correct: 5 },
];

const tfPool = [
  {
    statement: "Im alten Griechenland war das Meer für Handel unwichtig.",
    answer: "falsch",
    explanation: "Das Meer war einer der wichtigsten Verkehrswege.",
  },
  {
    statement: "Die bergige Landschaft förderte viele getrennte Siedlungsräume.",
    answer: "richtig",
    explanation: "Genau das prägte die politische Entwicklung.",
  },
  {
    statement: "Eine Polis war ein unabhängiger Stadtstaat mit Umland.",
    answer: "richtig",
    explanation: "Das ist die passende Grunddefinition.",
  },
  {
    statement: "Kolonisation bedeutet hier die Gründung neuer Siedlungen durch Poleis.",
    answer: "richtig",
    explanation: "So wird der Begriff im Themenfeld verwendet.",
  },
  {
    statement: "Landwirtschaft war überall gleich leicht möglich.",
    answer: "falsch",
    explanation: "Fruchtbare Flächen waren begrenzt.",
  },
  {
    statement: "Inseln spielten für Seerouten eine wichtige Rolle.",
    answer: "richtig",
    explanation: "Sie lagen oft günstig im Netz der Handelswege.",
  },
  {
    statement: "Gebirge erleichterten den schnellen Landverkehr zwischen allen Regionen.",
    answer: "falsch",
    explanation: "Der Überlandverkehr war oft schwierig.",
  },
  {
    statement: "Oliven und Wein gehören zu typischen Produkten der Region.",
    answer: "richtig",
    explanation: "Das ist fachlich korrekt.",
  },
];

const quizPool = [
  {
    prompt: "Welche Landschaftsform prägte große Teile Griechenlands?",
    options: ["Gebirge", "Wüste", "Tundra", "Regenwald"],
    correct: 0,
    explanation: "Die bergige Struktur ist ein Kernmerkmal.",
    wrongReasons: {
      1: "Das passt nicht zur Region.",
      2: "Das Klima und Relief sind anders.",
      3: "Das ist unpassend.",
    },
  },
  {
    prompt: "Warum entwickelten sich viele Poleis?",
    options: [
      "Weil Berge und Täler viele Regionen trennten",
      "Weil es keine Küsten gab",
      "Weil alle in einer Hauptstadt wohnten",
      "Weil Schiffe verboten waren",
    ],
    correct: 0,
    explanation: "Getrennte Räume begünstigten eigenständige Stadtstaaten.",
    wrongReasons: {
      1: "Küsten gab es viele.",
      2: "Es gab mehrere Zentren.",
      3: "Schifffahrt war wichtig.",
    },
  },
  {
    prompt: "Welche Bedeutung hatte das Meer für Griechenland?",
    options: [
      "Es war ein zentraler Handels- und Verkehrsraum",
      "Es trennte alle Orte vollständig",
      "Es wurde kaum genutzt",
      "Es diente nur der Fischerei",
    ],
    correct: 0,
    explanation: "Das Meer verband Regionen und erleichterte Austausch.",
    wrongReasons: {
      1: "Es konnte auch verbinden.",
      2: "Das Gegenteil ist richtig.",
      3: "Die Funktion war breiter.",
    },
  },
  {
    prompt: "Was beschreibt eine Polis am besten?",
    options: [
      "Ein Stadtstaat mit Umland und eigener Ordnung",
      "Ein großer Gebirgszug",
      "Eine Schiffsart",
      "Ein Tempeltyp",
    ],
    correct: 0,
    explanation: "So wird die Polis im Unterricht erklärt.",
    wrongReasons: {
      1: "Das ist kein Stadtstaat.",
      2: "Das ist ein anderes Thema.",
      3: "Das ist kein politischer Begriff.",
    },
  },
  {
    prompt: "Welche Produkte waren im Mittelmeerraum besonders wichtig?",
    options: ["Oliven und Wein", "Kakao und Kaffee", "Reis und Tee", "Mais und Kartoffeln"],
    correct: 0,
    explanation: "Oliven und Wein zählen zu den typischen Erzeugnissen.",
    wrongReasons: {
      1: "Das passt nicht zum antiken Griechenland.",
      2: "Das ist hier nicht typisch.",
      3: "Das gehört in andere Regionen/Epochen.",
    },
  },
  {
    prompt: "Was meint Kolonisation im Kontext der Griechen?",
    options: [
      "Gründung neuer Siedlungen durch Poleis",
      "Bau von Pyramiden",
      "Abschaffung der Schifffahrt",
      "Aufgabe aller Handelswege",
    ],
    correct: 0,
    explanation: "Kolonien erweiterten Netzwerke und Versorgung.",
    wrongReasons: {
      1: "Das gehört zu Ägypten.",
      2: "Das Gegenteil war der Fall.",
      3: "Handel blieb zentral.",
    },
  },
  {
    prompt: "Warum war Überlandverkehr oft schwierig?",
    options: [
      "Wegen Gebirgen und stark gegliederter Landschaft",
      "Wegen fehlender Wege auf dem Meer",
      "Weil nur ein Tal existierte",
      "Weil Städte direkt nebeneinander lagen",
    ],
    correct: 0,
    explanation: "Relief und Entfernungen erschwerten Landverbindungen.",
    wrongReasons: {
      1: "Die Frage bezieht sich auf Landwege.",
      2: "Es gab viele Täler und Regionen.",
      3: "Viele Orte waren nicht direkt verbunden.",
    },
  },
  {
    prompt: "Welche Aussage zu Inseln ist passend?",
    options: [
      "Sie lagen auf wichtigen Seerouten",
      "Sie hatten keine Verbindung zum Handel",
      "Sie waren für Schifffahrt bedeutungslos",
      "Sie verhinderten jede Form von Austausch",
    ],
    correct: 0,
    explanation: "Inseln waren häufig Teil von Handels- und Verkehrsnetzen.",
    wrongReasons: {
      1: "Das stimmt nicht.",
      2: "Das Gegenteil ist richtig.",
      3: "Austausch fand intensiv statt.",
    },
  },
  {
    prompt: "Welche Kette ist fachlich sinnvoll?",
    options: [
      "Gebirge -> getrennte Räume -> viele Poleis",
      "Meer -> keine Schifffahrt -> keine Kontakte",
      "Viele Inseln -> keine Häfen -> keine Wege",
      "Fruchtbare Ebenen überall -> kein Handel nötig",
    ],
    correct: 0,
    explanation: "Diese Kette erklärt einen zentralen Zusammenhang.",
    wrongReasons: {
      1: "Das widerspricht der historischen Entwicklung.",
      2: "Inseln und Häfen förderten Verkehr.",
      3: "Handel war dennoch wichtig.",
    },
  },
  {
    prompt: "Was ist eine passende Zusammenfassung?",
    options: [
      "Geographie beeinflusste Politik, Wirtschaft und Verkehr stark",
      "Landschaft hatte kaum Einfluss auf die Entwicklung",
      "Nur Religion erklärte die Entstehung der Poleis",
      "Meer und Land waren getrennte Welten ohne Verbindung",
    ],
    correct: 0,
    explanation: "Im alten Griechenland wirkten Raum und Gesellschaft eng zusammen.",
    wrongReasons: {
      1: "Der Einfluss war deutlich.",
      2: "Es gab mehrere Faktoren.",
      3: "Das Meer verband viele Räume.",
    },
  },
  {
    prompt: "Welcher Begriff gehört zum KC-Thema 'Die Welt der Griechen'?",
    options: ["Polis", "Lehnswesen", "Industrialisierung", "Reformation"],
    correct: 0,
    explanation: "Polis ist ein Kernbegriff dieses Themenfelds.",
    wrongReasons: {
      1: "Das gehört eher zum Mittelalter.",
      2: "Das ist Neuzeit.",
      3: "Das ist Frühe Neuzeit.",
    },
  },
  {
    prompt: "Welche Rolle spielte das Mittelmeer für die Griechen?",
    options: [
      "Es verband Handelsräume und Kolonien",
      "Es war eine unüberwindbare Grenze",
      "Es wurde kaum befahren",
      "Es hatte keine wirtschaftliche Funktion",
    ],
    correct: 0,
    explanation: "Das Mittelmeer war zentrale Verbindungsachse.",
    wrongReasons: {
      1: "Die Schifffahrt überwand Entfernungen.",
      2: "Es wurde intensiv genutzt.",
      3: "Wirtschaftlich war es sehr wichtig.",
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
  ggTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      ggTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      ggTabPanels.forEach((panel) => panel.classList.remove("is-active"));
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
  ggThemeTitle.textContent = detail.title;
  ggThemeText.textContent = detail.text;
  ggThemeList.innerHTML = detail.points.map((point) => `<li>${point}</li>`).join("");
  ggThemeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.theme === key);
  });
}

function setupThemeModule() {
  ggThemeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderTheme(button.dataset.theme);
    });
  });
  renderTheme("gebirge");
}

function renderStep(stepKey) {
  const detail = stepDetails[stepKey];
  if (!detail) {
    return;
  }
  ggStepTitle.textContent = detail.title;
  ggStepText.textContent = detail.text;
  ggStepButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.step === stepKey);
  });
}

function setupStepModule() {
  ggStepButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderStep(button.dataset.step);
    });
  });
  renderStep("1");
}

function generateAssignRound(count = 8) {
  return shuffle(assignPool).slice(0, count).map((item) => ({ ...item }));
}

function renderAssignRound() {
  ggAssignList.replaceChildren();
  assignTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "gg-task-row";

    const prompt = document.createElement("p");
    prompt.innerHTML = `<strong>${index + 1}. ${task.statement}</strong>`;

    const select = document.createElement("select");
    select.className = "gg-select";
    select.name = `assign-${index}`;
    select.innerHTML = `
      <option value="">Bitte wählen</option>
      <option value="gebirge">${categoryLabels.gebirge}</option>
      <option value="meer">${categoryLabels.meer}</option>
      <option value="inseln">${categoryLabels.inseln}</option>
      <option value="anbau">${categoryLabels.anbau}</option>
      <option value="polis">${categoryLabels.polis}</option>
    `;

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";

    row.append(prompt, select, feedback);
    ggAssignList.append(row);
  });
}

function checkAssignRound() {
  const rows = ggAssignList.querySelectorAll(".gg-task-row");
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
    ggAssignFeedback.innerHTML = '<p class="feedback info">Bitte alle Aufgaben in Training A beantworten.</p>';
    return;
  }

  ggAssignFeedback.innerHTML = `
    <p class="feedback ${correct === assignTasks.length ? "ok" : "bad"}">
      ${correct} / ${assignTasks.length} richtig.
      ${correct === assignTasks.length ? "Sehr gut." : "Lies die Rückmeldungen und starte eine neue Runde."}
    </p>
  `;
}

function setupAssignTraining() {
  assignTasks = generateAssignRound();
  renderAssignRound();
  ggAssignFeedback.innerHTML = "";

  ggAssignNewRound.addEventListener("click", () => {
    assignTasks = generateAssignRound();
    renderAssignRound();
    ggAssignFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });

  ggAssignCheck.addEventListener("click", checkAssignRound);
}

function generateOrderRound() {
  return shuffle(orderPool).map((item) => ({ ...item }));
}

function renderOrderRound() {
  ggOrderList.replaceChildren();
  orderTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "gg-task-row";

    const prompt = document.createElement("p");
    prompt.innerHTML = `<strong>${index + 1}. ${task.statement}</strong>`;

    const select = document.createElement("select");
    select.className = "gg-select";
    select.name = `order-${index}`;
    select.innerHTML = `
      <option value="">Position wählen</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    `;

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";

    row.append(prompt, select, feedback);
    ggOrderList.append(row);
  });
}

function checkOrderRound() {
  const rows = ggOrderList.querySelectorAll(".gg-task-row");
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
    ggOrderFeedback.innerHTML = '<p class="feedback info">Bitte alle Schritte in Training B einordnen.</p>';
    return;
  }

  if (new Set(chosenPositions).size !== chosenPositions.length) {
    ggOrderFeedback.innerHTML = '<p class="feedback info">Jede Position 1 bis 5 darf nur einmal vergeben werden.</p>';
    return;
  }

  ggOrderFeedback.innerHTML = `
    <p class="feedback ${correct === orderTasks.length ? "ok" : "bad"}">
      ${correct} / ${orderTasks.length} richtig.
      ${correct === orderTasks.length ? "Sehr gut." : "Prüfe die Reihenfolge und starte eine neue Runde."}
    </p>
  `;
}

function setupOrderTraining() {
  orderTasks = generateOrderRound();
  renderOrderRound();
  ggOrderFeedback.innerHTML = "";

  ggOrderNewRound.addEventListener("click", () => {
    orderTasks = generateOrderRound();
    renderOrderRound();
    ggOrderFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });

  ggOrderCheck.addEventListener("click", checkOrderRound);
}

function generateTfRound(count = 6) {
  return shuffle(tfPool).slice(0, count).map((item) => ({ ...item }));
}

function renderTfRound() {
  ggTfList.replaceChildren();
  tfTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "gg-task-row";

    const prompt = document.createElement("p");
    prompt.textContent = `${index + 1}. ${task.statement}`;

    const choiceGrid = document.createElement("div");
    choiceGrid.className = "gg-choice-grid";

    [
      { value: "richtig", label: "Richtig" },
      { value: "falsch", label: "Falsch" },
    ].forEach((option) => {
      const label = document.createElement("label");
      label.className = "gg-choice-item";
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
    ggTfList.append(row);
  });
}

function checkTfRound() {
  const rows = ggTfList.querySelectorAll(".gg-task-row");
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
    ggTfFeedback.innerHTML = '<p class="feedback info">Bitte alle Aufgaben in Training C beantworten.</p>';
    return;
  }

  ggTfFeedback.innerHTML = `
    <p class="feedback ${correct === tfTasks.length ? "ok" : "bad"}">
      ${correct} / ${tfTasks.length} richtig.
      ${correct === tfTasks.length ? "Sehr gut." : "Prüfe die Erklärungen und starte eine neue Runde."}
    </p>
  `;
}

function setupTfTraining() {
  tfTasks = generateTfRound();
  renderTfRound();
  ggTfFeedback.innerHTML = "";

  ggTfNewRound.addEventListener("click", () => {
    tfTasks = generateTfRound();
    renderTfRound();
    ggTfFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });

  ggTfCheck.addEventListener("click", checkTfRound);
}

function updateQuizScore() {
  ggQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  ggQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  ggQuizPrompt.textContent = question.prompt;
  ggQuizFeedback.innerHTML = "";
  ggQuizNext.disabled = true;
  ggQuizAnswers.innerHTML = question.options
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
  ggQuizStatus.textContent = "Test abgeschlossen.";
  ggQuizPrompt.textContent = "Du kannst den Test neu starten.";
  ggQuizAnswers.innerHTML = "";
  ggQuizFeedback.innerHTML = '<p class="feedback info">Nutze die Fehlererklärungen zur Wiederholung.</p>';
  ggQuizNext.disabled = true;
  ggQuizStart.textContent = "Neu starten";
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

  ggQuizAnswers.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  const wrongReason = question.wrongReasons?.[optionIndex] || "Bitte die Begriffe nochmals vergleichen.";
  ggQuizFeedback.innerHTML = `
    <p class="feedback ${isCorrect ? "ok" : "bad"}">
      ${isCorrect
        ? `Richtig. ${question.explanation}`
        : `Nicht korrekt. ${wrongReason} Richtige Antwort: "${question.options[question.correct]}". ${question.explanation}`}
    </p>
  `;

  ggQuizNext.disabled = false;
  ggQuizNext.textContent =
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
  ggQuizStart.textContent = "Test neu starten";
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
  ggQuizStart.addEventListener("click", startQuiz);
  ggQuizNext.addEventListener("click", nextQuizStep);
  ggQuizAnswers.addEventListener("click", (event) => {
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
