const koTabButtons = document.querySelectorAll(".ko-tab-btn");
const koTabPanels = document.querySelectorAll(".ko-tab");

const koMapButtons = document.querySelectorAll(".ko-map-btn");
const koMapTitle = document.getElementById("koMapTitle");
const koMapText = document.getElementById("koMapText");
const koMapHint = document.getElementById("koMapHint");

const koReasonButtons = document.querySelectorAll(".ko-reason-btn");
const koReasonTitle = document.getElementById("koReasonTitle");
const koReasonText = document.getElementById("koReasonText");
const koReasonExample = document.getElementById("koReasonExample");

const koCauseNewRound = document.getElementById("koCauseNewRound");
const koCauseCheck = document.getElementById("koCauseCheck");
const koCauseList = document.getElementById("koCauseList");
const koCauseFeedback = document.getElementById("koCauseFeedback");

const koOrderNewRound = document.getElementById("koOrderNewRound");
const koOrderCheck = document.getElementById("koOrderCheck");
const koOrderList = document.getElementById("koOrderList");
const koOrderFeedback = document.getElementById("koOrderFeedback");

const koMapNewRound = document.getElementById("koMapNewRound");
const koMapCheck = document.getElementById("koMapCheck");
const koMapList = document.getElementById("koMapList");
const koMapFeedback = document.getElementById("koMapFeedback");

const koQuizStart = document.getElementById("koQuizStart");
const koQuizNext = document.getElementById("koQuizNext");
const koQuizScore = document.getElementById("koQuizScore");
const koQuizStatus = document.getElementById("koQuizStatus");
const koQuizPrompt = document.getElementById("koQuizPrompt");
const koQuizAnswers = document.getElementById("koQuizAnswers");
const koQuizFeedback = document.getElementById("koQuizFeedback");

const mapDetails = {
  ausgang: {
    title: "Ausgangsraum: Griechenland",
    text:
      "Die Karte zeigt Griechenland als Mutterland. Von dort aus gruendeten Menschen neue Siedlungen an Kuesten des Mittelmeers und am Schwarzen Meer.",
    hint: "Merke: Ausgangsraum bedeutet nicht, dass alle Griechen gemeinsam handelten. Meist gingen einzelne Poleis vor.",
  },
  ziel: {
    title: "Zielraeume: Kuesten statt Binnenland",
    text:
      "Neue Poleis entstanden besonders in Sueditalien, Sizilien, Kleinasien, Nordafrika und am Schwarzen Meer. Kuesten waren wichtig, weil Schiffe Handel und Kontakt ermoeglichten.",
    hint: "Beispiele aus den Grafiken: Syrakus, Tarent, Kyrene, Byzantion, Milet und Ephesos.",
  },
  gruende: {
    title: "Gruende: Probleme und Chancen",
    text:
      "Zu wenig Ackerland, Bevoelkerungsdruck, Handel, Rohstoffsuche und politische Konflikte konnten Menschen zum Weggehen bewegen.",
    hint: "In einer Antwort sollte man mindestens zwei Gruende nennen und kurz erklaeren.",
  },
  folgen: {
    title: "Folgen: Vernetzung im Mittelmeerraum",
    text:
      "Kolonisation verbreitete griechische Sprache, Religion, Waren, Kunst und Lebensweisen. Gleichzeitig entstanden Kontakte und Konflikte mit einheimischen Gruppen.",
    hint: "Gute Antworten nennen Austausch und Konflikt, nicht nur Erfolg und Handel.",
  },
};

const reasonDetails = {
  land: {
    title: "Zu wenig Ackerland",
    text:
      "Viele griechische Landschaften waren bergig. Fruchtbares Land war knapp. Wenn Familien wachsen, reicht vorhandenes Land oft nicht mehr fuer alle.",
    example: "Beispiel: Eine Gruppe sucht an einer anderen Kueste neues Ackerland fuer eine eigene Siedlung.",
  },
  druck: {
    title: "Bevoelkerungsdruck",
    text:
      "Wenn in einer Polis mehr Menschen leben, steigen Bedarf an Nahrung, Wohnraum und Arbeit. Auswanderung konnte Druck verringern.",
    example: "Beispiel: Juengere Menschen bekommen in der Heimat kaum Land und versuchen anderswo neu anzufangen.",
  },
  handel: {
    title: "Handel und neue Maerkte",
    text:
      "Neue Hafenstaedte konnten Handelsplaetze werden. Von dort aus wurden Waren verkauft, gekauft und weitertransportiert.",
    example: "Beispiel: Olivenoel, Keramik oder Wein werden gegen Getreide, Metall oder Holz getauscht.",
  },
  rohstoffe: {
    title: "Suche nach Rohstoffen",
    text:
      "Metalle, Holz, Getreide und andere Rohstoffe waren nicht ueberall verfuegbar. Kolonien konnten Zugang zu neuen Ressourcen schaffen.",
    example: "Beispiel: Eine Siedlung in Kuestennaehe erleichtert Handel mit Rohstoffen aus dem Hinterland.",
  },
  konflikte: {
    title: "Konflikte in der Polis",
    text:
      "Streit zwischen Gruppen, Familien oder politischen Gegnern konnte dazu fuehren, dass eine Gruppe die Heimat verliess.",
    example: "Beispiel: Eine unterlegene Gruppe gruendet mit einem Anfuehrer eine neue Polis.",
  },
};

const causeLabels = {
  grund: "Grund",
  ablauf: "Ablauf-Schritt",
  folge: "Folge",
  warnung: "Wichtige Einordnung",
};

const causePool = [
  { statement: "In der Heimat gab es zu wenig Ackerland.", answer: "grund", explanation: "Das ist ein typischer Grund fuer Auswanderung." },
  { statement: "Eine Gruppe fuhr mit Schiffen zu einer geeigneten Kueste.", answer: "ablauf", explanation: "Das beschreibt den Ablauf." },
  { statement: "Griechische Sprache und Kultur verbreiteten sich im Mittelmeerraum.", answer: "folge", explanation: "Das ist eine Folge der Kolonisation." },
  { statement: "In den Zielgebieten lebten bereits andere Menschen.", answer: "warnung", explanation: "Das ist eine wichtige historische Einordnung." },
  { statement: "Handel und Suche nach Rohstoffen wurden wichtiger.", answer: "grund", explanation: "Das konnte Menschen zur Gruendung neuer Orte motivieren." },
  { statement: "Eine neue Polis erhielt Hafen, Heiligtum, Regeln und Umland.", answer: "ablauf", explanation: "Das gehoert zur Gruendung." },
  { statement: "Kontakte mit Einheimischen konnten friedlich oder konfliktgeladen sein.", answer: "folge", explanation: "Das beschreibt Folgen der Begegnungen." },
  { statement: "Politische Konflikte in der Mutterstadt konnten Menschen wegtreiben.", answer: "grund", explanation: "Das ist ein moeglicher Grund." },
  { statement: "Kolonisation bedeutet nicht, dass leeres Land besiedelt wurde.", answer: "warnung", explanation: "Diesen Punkt sollte man sauber benennen." },
];

const orderPool = [
  { text: "In der Mutterpolis entstehen Probleme oder Chancen.", order: 1 },
  { text: "Eine Gruppe entscheidet sich zur Auswanderung.", order: 2 },
  { text: "Siedler fahren mit Schiffen zu einer geeigneten Kueste.", order: 3 },
  { text: "Eine neue Polis wird gegruendet.", order: 4 },
  { text: "Handel, Austausch und Konflikte veraendern den Mittelmeerraum.", order: 5 },
];

const mapLabels = {
  mutterland: "Mutterland",
  kolonie: "Kolonie / Apoikia",
  zielraum: "Zielraum",
  handel: "Handelsnetz",
};

const mapPool = [
  { statement: "Griechenland als Ausgangsraum auf der Karte.", answer: "mutterland", explanation: "Das ist das griechische Mutterland." },
  { statement: "Syrakus, Tarent, Kyrene oder Byzantion als neue Stadtgruendungen.", answer: "kolonie", explanation: "Das sind Beispiele fuer Kolonien." },
  { statement: "Sueditalien, Sizilien, Nordafrika, Kleinasien und Schwarzes Meer.", answer: "zielraum", explanation: "Das sind Zielraeume der Ausbreitung." },
  { statement: "Schiffe verbinden Kuesten, Waren und Menschen.", answer: "handel", explanation: "Das beschreibt das Handelsnetz." },
  { statement: "Eine neue Polis bleibt kulturell mit der Herkunftsregion verbunden.", answer: "kolonie", explanation: "Kolonien waren neue Poleis mit Verbindungen zur Mutterstadt." },
  { statement: "Der Mittelmeerraum wird zu einem enger vernetzten Lebensraum.", answer: "handel", explanation: "Vernetzung ist eine zentrale Folge." },
];

const quizPool = [
  {
    prompt: "Was meint griechische Kolonisation in diesem Modul?",
    options: [
      "Gruendung neuer griechischer Siedlungen und Poleis an Kuesten",
      "Eroberung ganz Europas durch einen griechischen Nationalstaat",
      "Nur eine einzelne Reise nach Sparta",
      "Der Bau einer Stadtmauer in Athen",
    ],
    correct: 0,
    explanation: "Es geht um neue Stadtgruendungen ausserhalb des Mutterlands.",
  },
  {
    prompt: "Welcher Zeitraum passt grob zur grossen griechischen Kolonisation?",
    options: ["ca. 750-550 v. Chr.", "ca. 1500-1700 n. Chr.", "ca. 30-10 v. Chr.", "ca. 1914-1918"],
    correct: 0,
    explanation: "Die zweite Grafik nennt ca. 750-550 v. Chr.",
  },
  {
    prompt: "Welcher Punkt war ein wichtiger Grund fuer Kolonisation?",
    options: ["Zu wenig Ackerland", "Verbot der Schifffahrt", "Ende aller Handelskontakte", "Abschaffung aller Poleis"],
    correct: 0,
    explanation: "Landknappheit ist ein klassischer Grund.",
  },
  {
    prompt: "Warum entstanden viele Kolonien an Kuesten?",
    options: [
      "Weil Schiffe, Handel und Kontakt ueber das Meer wichtig waren",
      "Weil Griechen nie Landwirtschaft betrieben",
      "Weil alle Kuesten unbewohnt waren",
      "Weil Stadtmauern nur am Wasser gebaut werden durften",
    ],
    correct: 0,
    explanation: "Das Meer verband viele Orte des Mittelmeerraums.",
  },
  {
    prompt: "Was ist eine Mutterstadt?",
    options: [
      "Die Polis, aus der Siedler kamen",
      "Eine Stadt nur fuer Frauen",
      "Eine persische Provinz",
      "Ein Handelsschiff",
    ],
    correct: 0,
    explanation: "Die Mutterstadt ist der Herkunftsort der Siedler.",
  },
  {
    prompt: "Welche Aussage ist eine wichtige Einordnung?",
    options: [
      "In den Zielgebieten lebten oft bereits andere Menschen.",
      "Alle Zielgebiete waren menschenleer.",
      "Kolonisation hatte keine Folgen.",
      "Kolonien hatten niemals Kontakt zur Mutterstadt.",
    ],
    correct: 0,
    explanation: "Kontakte mit Einheimischen sind fuer historische Einordnung wichtig.",
  },
  {
    prompt: "Welche Folge hatte die Kolonisation?",
    options: [
      "Der Mittelmeerraum wurde staerker durch Handel und Kultur verbunden.",
      "Griechische Sprache verschwand sofort.",
      "Alle Poleis loesten sich auf.",
      "Schifffahrt wurde unwichtig.",
    ],
    correct: 0,
    explanation: "Vernetzung ist die zentrale Folge.",
  },
  {
    prompt: "Welche Reihe beschreibt den Ablauf am besten?",
    options: [
      "Problem in der Mutterpolis - Auswanderung - Fahrt - neue Polis - Folgen",
      "Neue Polis - Problem - keine Fahrt - Mutterpolis verschwindet - Ende",
      "Orakel - Perserkriege - Demokratie - Alexander - Rom",
      "Ackerland - kein Handel - keine Schiffe - kein Kontakt",
    ],
    correct: 0,
    explanation: "So laesst sich der Vorgang als Kette erklaeren.",
  },
  {
    prompt: "Welche Orte koennen als Beispiele fuer griechische Kolonien gelten?",
    options: ["Syrakus, Tarent, Kyrene oder Byzantion", "Hannover und Braunschweig", "Paris und London", "Memphis und Theben"],
    correct: 0,
    explanation: "Diese Beispiele erscheinen in den Grafiken.",
  },
  {
    prompt: "Warum reicht eine reine Kartenbeschreibung fuer eine gute Antwort nicht?",
    options: [
      "Weil Gruende, Ablauf und Folgen erklaert werden muessen",
      "Weil Karten in Geschichte nie genutzt werden",
      "Weil Kolonisation nur ein Bildthema ist",
      "Weil Orte unwichtig sind",
    ],
    correct: 0,
    explanation: "Die Karte ist ein Hilfsmittel; die historische Erklaerung ist der Kern.",
  },
  {
    prompt: "Was konnte neben Handel auch entstehen?",
    options: [
      "Konflikte mit einheimischen Gruppen",
      "Ein Ende aller Kontakte",
      "Ein Verbot von Sprache",
      "Eine automatische Gleichheit aller Menschen",
    ],
    correct: 0,
    explanation: "Austausch und Konflikt gehoeren beide zur historischen Betrachtung.",
  },
  {
    prompt: "Was bedeutet Vernetzung im Mittelmeerraum?",
    options: [
      "Kuesten, Menschen und Waren wurden durch Schifffahrt und Handel verbunden.",
      "Alle Menschen lebten an einem einzigen Ort.",
      "Das Meer trennte alle Kontakte dauerhaft.",
      "Nur Gebirge waren wichtig.",
    ],
    correct: 0,
    explanation: "Schiffe machten den Mittelmeerraum zu einem Kontakt- und Handelsraum.",
  },
];

let causeTasks = [];
let orderTasks = [];
let mapTasks = [];

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
  koTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      koTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      koTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${target}`).classList.add("is-active");
    });
  });
}

function setMapDetail(mapId) {
  const detail = mapDetails[mapId];
  koMapTitle.textContent = detail.title;
  koMapText.textContent = detail.text;
  koMapHint.textContent = detail.hint;
  koMapButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.map === mapId);
  });
}

function setupMapDetails() {
  koMapButtons.forEach((button) => {
    button.addEventListener("click", () => setMapDetail(button.dataset.map));
  });
  setMapDetail("ausgang");
}

function setReason(reasonId) {
  const detail = reasonDetails[reasonId];
  koReasonTitle.textContent = detail.title;
  koReasonText.textContent = detail.text;
  koReasonExample.textContent = detail.example;
  koReasonButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.reason === reasonId);
  });
}

function setupReasons() {
  koReasonButtons.forEach((button) => {
    button.addEventListener("click", () => setReason(button.dataset.reason));
  });
  setReason("land");
}

function setFeedback(element, text, isGood) {
  element.className = `ko-feedback ${isGood ? "good" : "bad"}`;
  element.textContent = text;
}

function renderSelectTask(container, tasks, labels) {
  container.replaceChildren();
  tasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "ko-task-row";
    row.dataset.index = String(index);

    const prompt = document.createElement("p");
    prompt.textContent = task.statement;

    const select = document.createElement("select");
    select.className = "ko-select";
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = "Bitte auswaehlen";
    select.append(empty);

    Object.entries(labels).forEach(([value, label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      select.append(option);
    });

    row.append(prompt, select);
    container.append(row);
  });
}

function checkSelectTasks(container, tasks, feedbackElement) {
  let correct = 0;
  [...container.children].forEach((row) => {
    const task = tasks[Number(row.dataset.index)];
    const select = row.querySelector("select");
    const isCorrect = select.value === task.answer;
    row.classList.toggle("is-correct", isCorrect);
    row.classList.toggle("is-wrong", !isCorrect);
    if (isCorrect) {
      correct += 1;
    }
  });

  const missed = tasks
    .filter((task, index) => {
      const row = container.children[index];
      return row.querySelector("select").value !== task.answer;
    })
    .slice(0, 2)
    .map((task) => task.explanation)
    .join(" ");

  setFeedback(
    feedbackElement,
    `${correct} von ${tasks.length} richtig.${missed ? ` Tipp: ${missed}` : ""}`,
    correct === tasks.length
  );
}

function renderCauseTasks() {
  causeTasks = shuffle(causePool).slice(0, 6);
  koCauseFeedback.textContent = "";
  koCauseFeedback.className = "";
  renderSelectTask(koCauseList, causeTasks, causeLabels);
}

function renderOrderTasks() {
  orderTasks = shuffle(orderPool);
  koOrderList.replaceChildren();
  koOrderFeedback.textContent = "";
  koOrderFeedback.className = "";

  orderTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "ko-task-row";
    row.dataset.index = String(index);

    const prompt = document.createElement("p");
    prompt.textContent = task.text;

    const input = document.createElement("input");
    input.className = "ko-number";
    input.type = "number";
    input.min = "1";
    input.max = "5";
    input.placeholder = "1-5";

    row.append(prompt, input);
    koOrderList.append(row);
  });
}

function checkOrderTasks() {
  let correct = 0;
  [...koOrderList.children].forEach((row) => {
    const task = orderTasks[Number(row.dataset.index)];
    const input = row.querySelector("input");
    const isCorrect = Number(input.value) === task.order;
    row.classList.toggle("is-correct", isCorrect);
    row.classList.toggle("is-wrong", !isCorrect);
    if (isCorrect) {
      correct += 1;
    }
  });

  setFeedback(
    koOrderFeedback,
    `${correct} von ${orderTasks.length} richtig. Merke: Problem -> Entscheidung -> Fahrt -> Gruendung -> Folgen.`,
    correct === orderTasks.length
  );
}

function renderMapTasks() {
  mapTasks = shuffle(mapPool).slice(0, 5);
  koMapFeedback.textContent = "";
  koMapFeedback.className = "";
  renderSelectTask(koMapList, mapTasks, mapLabels);
}

function prepareQuizQuestion(item) {
  const options = shuffle(item.options.map((text, index) => ({
    text,
    isCorrect: index === item.correct,
  })));
  return {
    prompt: item.prompt,
    explanation: item.explanation,
    options,
  };
}

function startQuiz() {
  quizState.running = true;
  quizState.answered = false;
  quizState.index = 0;
  quizState.correct = 0;
  quizState.questions = shuffle(quizPool).slice(0, 10).map(prepareQuizQuestion);
  koQuizNext.disabled = true;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  quizState.answered = false;
  koQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  koQuizPrompt.textContent = question.prompt;
  koQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
  koQuizAnswers.replaceChildren();
  koQuizFeedback.textContent = "";
  koQuizFeedback.className = "";
  koQuizNext.disabled = true;

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option.text;
    button.addEventListener("click", () => answerQuiz(button, option));
    koQuizAnswers.append(button);
  });
}

function answerQuiz(button, option) {
  if (!quizState.running || quizState.answered) {
    return;
  }
  quizState.answered = true;
  if (option.isCorrect) {
    quizState.correct += 1;
  }

  [...koQuizAnswers.children].forEach((choice) => {
    const matchingOption = quizState.questions[quizState.index].options.find((entry) => entry.text === choice.textContent);
    choice.disabled = true;
    choice.classList.toggle("is-correct", Boolean(matchingOption && matchingOption.isCorrect));
  });
  button.classList.toggle("is-wrong", !option.isCorrect);

  const question = quizState.questions[quizState.index];
  setFeedback(
    koQuizFeedback,
    option.isCorrect ? `Richtig. ${question.explanation}` : `Nicht ganz. ${question.explanation}`,
    option.isCorrect
  );
  koQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
  koQuizNext.disabled = false;
}

function nextQuizQuestion() {
  if (!quizState.running || !quizState.answered) {
    return;
  }

  quizState.index += 1;
  if (quizState.index >= quizState.questions.length) {
    quizState.running = false;
    koQuizStatus.textContent = "Test beendet.";
    koQuizPrompt.textContent = `Ergebnis: ${quizState.correct} von ${quizState.questions.length} Punkten.`;
    koQuizAnswers.replaceChildren();
    setFeedback(
      koQuizFeedback,
      quizState.correct >= 8
        ? "Sehr sicher. Du kannst Gruende, Ablauf und Folgen der Kolonisation gut erklaeren."
        : "Wiederhole besonders: Gruende in der Heimat, Gruendung an Kuesten, Folgen fuer Handel und Kontakte.",
      quizState.correct >= 8
    );
    koQuizNext.disabled = true;
    return;
  }

  renderQuizQuestion();
}

setupTabs();
setupMapDetails();
setupReasons();
renderCauseTasks();
renderOrderTasks();
renderMapTasks();

koCauseNewRound.addEventListener("click", renderCauseTasks);
koCauseCheck.addEventListener("click", () => checkSelectTasks(koCauseList, causeTasks, koCauseFeedback));
koOrderNewRound.addEventListener("click", renderOrderTasks);
koOrderCheck.addEventListener("click", checkOrderTasks);
koMapNewRound.addEventListener("click", renderMapTasks);
koMapCheck.addEventListener("click", () => checkSelectTasks(koMapList, mapTasks, koMapFeedback));
koQuizStart.addEventListener("click", startQuiz);
koQuizNext.addEventListener("click", nextQuizQuestion);
