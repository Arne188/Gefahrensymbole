const pkTabButtons = document.querySelectorAll(".pk-tab-btn");
const pkTabPanels = document.querySelectorAll(".pk-tab");

const pkTimeButtons = document.querySelectorAll(".pk-time-btn");
const pkTimeTitle = document.getElementById("pkTimeTitle");
const pkTimeText = document.getElementById("pkTimeText");
const pkTimeMeaning = document.getElementById("pkTimeMeaning");

const pkGraphicNewRound = document.getElementById("pkGraphicNewRound");
const pkGraphicCheck = document.getElementById("pkGraphicCheck");
const pkGraphicList = document.getElementById("pkGraphicList");
const pkGraphicFeedback = document.getElementById("pkGraphicFeedback");

const pkMeaningNewRound = document.getElementById("pkMeaningNewRound");
const pkMeaningCheck = document.getElementById("pkMeaningCheck");
const pkMeaningList = document.getElementById("pkMeaningList");
const pkMeaningFeedback = document.getElementById("pkMeaningFeedback");

const pkReasonNewRound = document.getElementById("pkReasonNewRound");
const pkReasonCheck = document.getElementById("pkReasonCheck");
const pkReasonList = document.getElementById("pkReasonList");
const pkReasonFeedback = document.getElementById("pkReasonFeedback");

const pkQuizStart = document.getElementById("pkQuizStart");
const pkQuizNext = document.getElementById("pkQuizNext");
const pkQuizScore = document.getElementById("pkQuizScore");
const pkQuizStatus = document.getElementById("pkQuizStatus");
const pkQuizPrompt = document.getElementById("pkQuizPrompt");
const pkQuizAnswers = document.getElementById("pkQuizAnswers");
const pkQuizFeedback = document.getElementById("pkQuizFeedback");

const timeDetails = {
  ionien: {
    title: "Ionischer Aufstand: Der Konflikt beginnt",
    text:
      "In Kleinasien lebten griechisch gepraegte Staedte unter persischem Einfluss. Als es dort Aufstaende gab, unterstuetzte Athen einzelne Staedte. Fuer die persischen Koenige war das ein Eingriff in ihren Machtbereich.",
    meaning:
      "Bedeutung: Die Perserkriege hatten eine Vorgeschichte. Sie begannen nicht einfach mit einer einzelnen Schlacht.",
  },
  marathon: {
    title: "Marathon 490 v. Chr.: Athen gewinnt Selbstvertrauen",
    text:
      "Ein persisches Heer landete bei Marathon. Die Athener konnten die Perser schlagen. In der Grafik steht deshalb: schneller Sieg der Athener.",
    meaning:
      "Bedeutung: Marathon wurde fuer Athen ein Zeichen, dass eine Polis gegen ein grosses Reich bestehen konnte.",
  },
  thermopylen: {
    title: "Thermopylen 480 v. Chr.: Widerstand am Engpass",
    text:
      "Beim engen Pass der Thermopylen versuchten griechische Truppen, den Vormarsch des persischen Heeres aufzuhalten. Der Pass ist wichtig, weil wenige Verteidiger dort laenger Widerstand leisten konnten.",
    meaning:
      "Bedeutung: Thermopylen war militaerisch eine Niederlage, wurde aber als Beispiel fuer Widerstand erinnert.",
  },
  salamis: {
    title: "Salamis 480 v. Chr.: Entscheidung auf dem Wasser",
    text:
      "Bei Salamis kaempften Flotten. Die Griechen nutzten die Enge des Meeresraums und konnten die persische Flotte schlagen.",
    meaning:
      "Bedeutung: Salamis zeigt, dass Strategie und Raum eine Rolle spielten. Athen gewann durch seine Flotte an Bedeutung.",
  },
  plataiai: {
    title: "Plataiai 479 v. Chr.: Der Angriff wird beendet",
    text:
      "Bei Plataiai wurde das persische Landheer geschlagen. Damit war die unmittelbare Bedrohung fuer das griechische Festland stark verringert.",
    meaning:
      "Bedeutung: Nach den Siegen wurde die Abwehr der Perser oft als gemeinsamer Erfolg der Griechen gedeutet.",
  },
};

const graphicLabels = {
  ursache: "Ursache / Ausgangslage",
  ereignis: "Schluesselereignis",
  folge: "Folge / Bedeutung",
  merksatz: "Merksatz der Grafik",
};

const graphicPool = [
  {
    statement: "Das Persische Reich wollte seine Macht nach Westen ausweiten.",
    answer: "ursache",
    explanation: "Das erklaert, warum der Konflikt ueberhaupt entsteht.",
  },
  {
    statement: "Die roten Pfeile zeigen die persische Bedrohung aus Richtung Kleinasien/Persien.",
    answer: "ursache",
    explanation: "Die Pfeile stehen nicht fuer eine Quizroute, sondern fuer die Bedrohungslage.",
  },
  {
    statement: "Marathon: schneller Sieg der Athener.",
    answer: "ereignis",
    explanation: "Das ist eines der drei Ereignisfelder in der Grafik.",
  },
  {
    statement: "Thermopylen: enger Pass und spartanischer Widerstand.",
    answer: "ereignis",
    explanation: "Das beschreibt einen konkreten Schauplatz und seine historische Rolle.",
  },
  {
    statement: "Salamis: Seeschlacht.",
    answer: "ereignis",
    explanation: "Salamis ist das Beispiel fuer den Kampf auf dem Meer.",
  },
  {
    statement: "Die Griechen konnten ihre Freiheit bewahren.",
    answer: "folge",
    explanation: "Das ist im rechten Kasten als Bedeutung formuliert.",
  },
  {
    statement: "Die Perserkriege staerkten Zusammenhalt und Selbstbewusstsein der Griechen.",
    answer: "folge",
    explanation: "Das beschreibt die historische Bedeutung, nicht nur den Ablauf.",
  },
  {
    statement: "Viele Poleis fuehlten sich durch die Perserbedrohung staerker als Griechen verbunden.",
    answer: "merksatz",
    explanation: "Das ist der zentrale Merksatz am unteren Rand der Grafik.",
  },
];

const meaningLabels = {
  ursache: "Ursache",
  verlauf: "Verlauf / Ereignis",
  folge: "Folge",
  deutung: "Deutung / Erinnerung",
};

const meaningPool = [
  { statement: "Das Perserreich wollte seinen Einfluss nach Westen ausweiten.", answer: "ursache", explanation: "Das ist ein Grund fuer den Konflikt." },
  { statement: "Griechische Poleis verteidigten ihre Freiheit gegen die Perser.", answer: "ursache", explanation: "Das beschreibt die Konfliktlage." },
  { statement: "Bei Marathon schlugen die Athener ein persisches Heer zurueck.", answer: "verlauf", explanation: "Das ist ein konkretes Ereignis." },
  { statement: "Bei Thermopylen hielten Leonidas und seine Spartaner den Persern an einem engen Pass stand.", answer: "verlauf", explanation: "Das gehoert zum Verlauf." },
  { statement: "Bei Salamis besiegten die Griechen die persische Flotte.", answer: "verlauf", explanation: "Das ist ein Ereignis der Kriege." },
  { statement: "Athen gewann durch seine Flotte an Ansehen und Einfluss.", answer: "folge", explanation: "Das ist eine Folge der Seestrategie." },
  { statement: "Viele Poleis fuehlten sich danach staerker als Griechen verbunden.", answer: "folge", explanation: "Das ist eine Folge fuer das Zusammengehoerigkeitsgefuehl." },
  { statement: "Thermopylen wurde spaeter als Beispiel fuer Opferbereitschaft erzaehlt.", answer: "deutung", explanation: "Das ist eine spaetere Erinnerung und Bewertung." },
  { statement: "Die Abwehr wurde als gemeinsamer griechischer Erfolg gedeutet.", answer: "deutung", explanation: "Das beschreibt, welchen Sinn man dem Ereignis gab." },
];

const reasonPool = [
  {
    prompt: "Warum gehoert Marathon in der Grafik zu den Schluesselereignissen?",
    options: [
      { text: "Weil Athen dort 490 v. Chr. ein persisches Heer schlug und Selbstvertrauen gewann.", correct: true },
      { text: "Weil dort die Perser ihre Hauptstadt gruendeten.", correct: false },
      { text: "Weil dort die Seeschlacht des Krieges stattfand.", correct: false },
    ],
    explanation: "Marathon steht fuer den fruehen athenischen Erfolg gegen ein persisches Heer.",
  },
  {
    prompt: "Warum ist Thermopylen trotz griechischer Niederlage wichtig?",
    options: [
      { text: "Weil der Widerstand am engen Pass spaeter stark erinnert wurde.", correct: true },
      { text: "Weil die Perser dort endgueltig besiegt wurden.", correct: false },
      { text: "Weil Thermopylen eine athenische Volksversammlung war.", correct: false },
    ],
    explanation: "Thermopylen zeigt, dass Bedeutung nicht nur vom Sieg abhaengt, sondern auch von Erinnerung.",
  },
  {
    prompt: "Warum ist Salamis mehr als nur ein Ort auf der Karte?",
    options: [
      { text: "Weil die Seeschlacht den weiteren Verlauf stark beeinflusste.", correct: true },
      { text: "Weil dort der ionische Aufstand begann.", correct: false },
      { text: "Weil dort alle Poleis gegruendet wurden.", correct: false },
    ],
    explanation: "Salamis steht fuer die Bedeutung der griechischen Flotte und der Strategie im engen Meerraum.",
  },
  {
    prompt: "Welche Begruendung passt zum Merksatz unten in der Grafik?",
    options: [
      { text: "Eine gemeinsame Bedrohung konnte getrennte Poleis zeitweise verbinden.", correct: true },
      { text: "Alle Griechen lebten schon vorher in einem einheitlichen Nationalstaat.", correct: false },
      { text: "Die Perserkriege hatten nichts mit Selbstbewusstsein zu tun.", correct: false },
    ],
    explanation: "Der Merksatz erklaert das Zusammengehoerigkeitsgefuehl trotz vieler einzelner Poleis.",
  },
  {
    prompt: "Warum waere ein reines Kartenquiz fuer dieses Thema zu wenig?",
    options: [
      { text: "Weil man Ursachen, Verlauf, Folgen und Bedeutung erklaeren muss.", correct: true },
      { text: "Weil Orte in Geschichte grundsaetzlich nie wichtig sind.", correct: false },
      { text: "Weil die Perserkriege nur aus Jahreszahlen bestehen.", correct: false },
    ],
    explanation: "Die Karte hilft, aber die historische Erklaerung ist der Kern.",
  },
];

const quizPool = [
  {
    prompt: "Was ist die wichtigste Ausgangslage der Perserkriege?",
    options: [
      "Das Perserreich wollte seine Macht nach Westen ausweiten.",
      "Alle griechischen Poleis waren ein einziger Staat.",
      "Salamis lag im Perserreich.",
      "Marathon war eine persische Hauptstadt.",
    ],
    correct: 0,
    explanation: "Die Grafik nennt die Machtausweitung nach Westen als Kern der Ausgangslage.",
  },
  {
    prompt: "Was bedeutet Polis im Zusammenhang der Perserkriege?",
    options: [
      "Ein griechischer Stadtstaat mit eigener Ordnung.",
      "Ein persischer Koenigstitel.",
      "Ein Schiffstyp.",
      "Eine Provinz ohne eigene Regeln.",
    ],
    correct: 0,
    explanation: "Die Griechen lebten in vielen einzelnen Poleis.",
  },
  {
    prompt: "Welche Aussage zu Marathon passt zur Grafik?",
    options: [
      "490 v. Chr. schlugen die Athener das persische Heer in der Ebene von Marathon zurueck.",
      "480 v. Chr. besiegten die Griechen dort die persische Flotte.",
      "Dort hielten Spartaner einen engen Pass.",
      "Dort entstand das Perserreich.",
    ],
    correct: 0,
    explanation: "Marathon steht in der Grafik fuer den schnellen Sieg der Athener.",
  },
  {
    prompt: "Welche Aussage zu Thermopylen passt?",
    options: [
      "Ein enger Pass wurde mit spartanischem Widerstand verbunden.",
      "Dort fand die entscheidende Seeschlacht statt.",
      "Dort wurde Athen gegruendet.",
      "Dort wurden die Perser 490 v. Chr. von Athenern geschlagen.",
    ],
    correct: 0,
    explanation: "Thermopylen steht fuer den engen Pass und den Widerstand.",
  },
  {
    prompt: "Was war Salamis?",
    options: [
      "Eine Seeschlacht 480 v. Chr.",
      "Der Beginn des ionischen Aufstands.",
      "Ein persischer Koenig.",
      "Eine spartanische Erziehungsschule.",
    ],
    correct: 0,
    explanation: "Salamis ist in der Grafik klar als Seeschlacht markiert.",
  },
  {
    prompt: "Welche Folge nennt die Grafik ausdruecklich?",
    options: [
      "Die Perserkriege staerkten Zusammenhalt und Selbstbewusstsein der Griechen.",
      "Die Griechen wurden Teil eines persischen Nationalstaats.",
      "Athen verlor jede Bedeutung.",
      "Die Poleis hoerten auf zu existieren.",
    ],
    correct: 0,
    explanation: "Der rechte Kasten erklaert genau diese Bedeutung.",
  },
  {
    prompt: "Was meint der Merksatz unten?",
    options: [
      "Viele Poleis fuehlten sich durch die Bedrohung staerker als Griechen verbunden.",
      "Die Perser wurden Teil der griechischen Poleis.",
      "Alle Poleis hatten immer dieselbe Meinung.",
      "Die Kriege trennten die Griechen dauerhaft voneinander.",
    ],
    correct: 0,
    explanation: "Der Merksatz ist die zentrale Deutung des Moduls.",
  },
  {
    prompt: "Welche Antwort ist eine Ursache, keine Folge?",
    options: [
      "Das Perserreich wollte seine Macht ausweiten.",
      "Das Selbstbewusstsein der Griechen wurde gestaerkt.",
      "Salamis wurde spaeter erinnert.",
      "Athen gewann Ansehen durch die Flotte.",
    ],
    correct: 0,
    explanation: "Machtausweitung erklaert, warum der Konflikt entsteht.",
  },
  {
    prompt: "Welche Antwort ist eine historische Deutung?",
    options: [
      "Thermopylen wurde spaeter als Beispiel fuer Widerstand erzaehlt.",
      "Marathon fand 490 v. Chr. statt.",
      "Persische Pfeile zeigen die Angriffsrichtung.",
      "Salamis war eine Seeschlacht.",
    ],
    correct: 0,
    explanation: "Deutung meint die spaetere Sinngebung und Erinnerung.",
  },
  {
    prompt: "Was macht eine gute Klassenarbeitsantwort zu den Perserkriegen aus?",
    options: [
      "Sie erklaert Ursache, Verlauf, Folge und Bedeutung.",
      "Sie nennt nur drei Orte ohne Zusammenhang.",
      "Sie beschreibt nur die Farben der Karte.",
      "Sie vermeidet Jahreszahlen und Begriffe komplett.",
    ],
    correct: 0,
    explanation: "Geschichte braucht Zusammenhaenge, nicht nur Ortsnamen.",
  },
  {
    prompt: "Warum sind die roten Pfeile in der Grafik wichtig?",
    options: [
      "Sie verdeutlichen die persische Bedrohung Richtung Griechenland.",
      "Sie zeigen griechische Handelswege nach Norden.",
      "Sie markieren Fluesse in Kleinasien.",
      "Sie zeigen die Reihenfolge der griechischen Kolonisation.",
    ],
    correct: 0,
    explanation: "Die Legende nennt die Pfeile als persische Bedrohung.",
  },
  {
    prompt: "Warum ist die gemeinsame Abwehr bemerkenswert?",
    options: [
      "Weil viele einzelne Poleis trotz Unterschieden zeitweise zusammenstanden.",
      "Weil die Griechen schon ein moderner Nationalstaat waren.",
      "Weil Persien keine grosse Macht war.",
      "Weil es keine Konflikte zwischen griechischen Poleis gab.",
    ],
    correct: 0,
    explanation: "Gerade die vielen eigenstaendigen Poleis machen die gemeinsame Abwehr wichtig.",
  },
];

let graphicTasks = [];
let meaningTasks = [];
let reasonTasks = [];

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
  pkTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      pkTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      pkTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${target}`).classList.add("is-active");
    });
  });
}

function setTimeline(eventId) {
  const detail = timeDetails[eventId];
  pkTimeTitle.textContent = detail.title;
  pkTimeText.textContent = detail.text;
  pkTimeMeaning.textContent = detail.meaning;
  pkTimeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.event === eventId);
  });
}

function setupTimeline() {
  pkTimeButtons.forEach((button) => {
    button.addEventListener("click", () => setTimeline(button.dataset.event));
  });
  setTimeline("ionien");
}

function setFeedback(element, text, isGood) {
  element.className = `pk-feedback ${isGood ? "good" : "bad"}`;
  element.textContent = text;
}

function renderSelectTask(container, tasks, labels) {
  container.replaceChildren();
  tasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "pk-task-row";
    row.dataset.index = String(index);

    const prompt = document.createElement("p");
    prompt.textContent = task.statement;

    const select = document.createElement("select");
    select.className = "pk-select";
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

function renderGraphicTasks() {
  graphicTasks = shuffle(graphicPool).slice(0, 6);
  pkGraphicFeedback.textContent = "";
  pkGraphicFeedback.className = "";
  renderSelectTask(pkGraphicList, graphicTasks, graphicLabels);
}

function renderMeaningTasks() {
  meaningTasks = shuffle(meaningPool).slice(0, 6);
  pkMeaningFeedback.textContent = "";
  pkMeaningFeedback.className = "";
  renderSelectTask(pkMeaningList, meaningTasks, meaningLabels);
}

function renderReasonTasks() {
  reasonTasks = shuffle(reasonPool).slice(0, 4).map((task) => ({
    ...task,
    options: shuffle(task.options),
  }));
  pkReasonList.replaceChildren();
  pkReasonFeedback.textContent = "";
  pkReasonFeedback.className = "";

  reasonTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "pk-task-row";
    row.dataset.index = String(index);

    const prompt = document.createElement("p");
    prompt.textContent = task.prompt;
    row.append(prompt);

    const select = document.createElement("select");
    select.className = "pk-select";
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = "Beste Begruendung waehlen";
    select.append(empty);

    task.options.forEach((option, optionIndex) => {
      const item = document.createElement("option");
      item.value = String(optionIndex);
      item.textContent = option.text;
      select.append(item);
    });

    row.append(select);
    pkReasonList.append(row);
  });
}

function checkReasonTasks() {
  let correct = 0;
  [...pkReasonList.children].forEach((row) => {
    const task = reasonTasks[Number(row.dataset.index)];
    const select = row.querySelector("select");
    const chosen = task.options[Number(select.value)];
    const isCorrect = Boolean(chosen && chosen.correct);
    row.classList.toggle("is-correct", isCorrect);
    row.classList.toggle("is-wrong", !isCorrect);
    if (isCorrect) {
      correct += 1;
    }
  });

  const hint = reasonTasks
    .filter((task, index) => {
      const row = pkReasonList.children[index];
      const chosen = task.options[Number(row.querySelector("select").value)];
      return !chosen || !chosen.correct;
    })
    .slice(0, 1)
    .map((task) => task.explanation)
    .join(" ");

  setFeedback(
    pkReasonFeedback,
    `${correct} von ${reasonTasks.length} richtig.${hint ? ` Hinweis: ${hint}` : ""}`,
    correct === reasonTasks.length
  );
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
  pkQuizNext.disabled = true;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  quizState.answered = false;
  pkQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  pkQuizPrompt.textContent = question.prompt;
  pkQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
  pkQuizAnswers.replaceChildren();
  pkQuizFeedback.textContent = "";
  pkQuizFeedback.className = "";
  pkQuizNext.disabled = true;

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option.text;
    button.addEventListener("click", () => answerQuiz(button, option));
    pkQuizAnswers.append(button);
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

  [...pkQuizAnswers.children].forEach((choice) => {
    const matchingOption = quizState.questions[quizState.index].options.find((entry) => entry.text === choice.textContent);
    choice.disabled = true;
    choice.classList.toggle("is-correct", Boolean(matchingOption && matchingOption.isCorrect));
  });
  button.classList.toggle("is-wrong", !option.isCorrect);

  const question = quizState.questions[quizState.index];
  setFeedback(
    pkQuizFeedback,
    option.isCorrect ? `Richtig. ${question.explanation}` : `Nicht ganz. ${question.explanation}`,
    option.isCorrect
  );
  pkQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
  pkQuizNext.disabled = false;
}

function nextQuizQuestion() {
  if (!quizState.running || !quizState.answered) {
    return;
  }

  quizState.index += 1;
  if (quizState.index >= quizState.questions.length) {
    quizState.running = false;
    pkQuizStatus.textContent = "Test beendet.";
    pkQuizPrompt.textContent = `Ergebnis: ${quizState.correct} von ${quizState.questions.length} Punkten.`;
    pkQuizAnswers.replaceChildren();
    setFeedback(
      pkQuizFeedback,
      quizState.correct >= 8
        ? "Sehr sicher. Du erkennst Ursachen, Verlauf, Folgen und Bedeutung der Perserkriege."
        : "Wiederhole die Grafik: Worum ging es, was geschah bei Marathon/Thermopylen/Salamis, warum war das wichtig?",
      quizState.correct >= 8
    );
    pkQuizNext.disabled = true;
    return;
  }

  renderQuizQuestion();
}

setupTabs();
setupTimeline();
renderGraphicTasks();
renderMeaningTasks();
renderReasonTasks();

pkGraphicNewRound.addEventListener("click", renderGraphicTasks);
pkGraphicCheck.addEventListener("click", () => checkSelectTasks(pkGraphicList, graphicTasks, pkGraphicFeedback));
pkMeaningNewRound.addEventListener("click", renderMeaningTasks);
pkMeaningCheck.addEventListener("click", () => checkSelectTasks(pkMeaningList, meaningTasks, pkMeaningFeedback));
pkReasonNewRound.addEventListener("click", renderReasonTasks);
pkReasonCheck.addEventListener("click", checkReasonTasks);
pkQuizStart.addEventListener("click", startQuiz);
pkQuizNext.addEventListener("click", nextQuizQuestion);
