const gwTabButtons = document.querySelectorAll(".gw-tab-btn");
const gwTabPanels = document.querySelectorAll(".gw-tab");

const gwGodButtons = document.querySelectorAll(".gw-god-btn");
const gwGodTitle = document.getElementById("gwGodTitle");
const gwGodText = document.getElementById("gwGodText");
const gwGodSymbol = document.getElementById("gwGodSymbol");

const gwPracticeButtons = document.querySelectorAll(".gw-practice-btn");
const gwPracticeTitle = document.getElementById("gwPracticeTitle");
const gwPracticeText = document.getElementById("gwPracticeText");
const gwPracticeExample = document.getElementById("gwPracticeExample");

const gwGodNewRound = document.getElementById("gwGodNewRound");
const gwGodCheck = document.getElementById("gwGodCheck");
const gwGodList = document.getElementById("gwGodList");
const gwGodFeedback = document.getElementById("gwGodFeedback");

const gwPracticeNewRound = document.getElementById("gwPracticeNewRound");
const gwPracticeCheck = document.getElementById("gwPracticeCheck");
const gwPracticeList = document.getElementById("gwPracticeList");
const gwPracticeFeedback = document.getElementById("gwPracticeFeedback");

const gwMeaningNewRound = document.getElementById("gwMeaningNewRound");
const gwMeaningCheck = document.getElementById("gwMeaningCheck");
const gwMeaningList = document.getElementById("gwMeaningList");
const gwMeaningFeedback = document.getElementById("gwMeaningFeedback");

const gwQuizStart = document.getElementById("gwQuizStart");
const gwQuizNext = document.getElementById("gwQuizNext");
const gwQuizScore = document.getElementById("gwQuizScore");
const gwQuizStatus = document.getElementById("gwQuizStatus");
const gwQuizPrompt = document.getElementById("gwQuizPrompt");
const gwQuizAnswers = document.getElementById("gwQuizAnswers");
const gwQuizFeedback = document.getElementById("gwQuizFeedback");

const godDetails = {
  zeus: {
    title: "Zeus - Goettervater und Herr des Himmels",
    text:
      "Zeus galt als maechtigster Gott. Er wurde mit Ordnung, Herrschaft, Eid, Gastrecht, Wetter und Blitz verbunden. Wenn Donner und Blitz auftraten, konnten Menschen das als Zeichen goettlicher Macht deuten.",
    symbol: "Symbol: Blitz. Bedeutung: Macht, Himmel, Ordnung und Schutz von Regeln.",
  },
  athena: {
    title: "Athena - Weisheit, Strategie und Schutz der Stadt",
    text:
      "Athena stand fuer kluges Handeln, Handwerk, Strategie und Schutz. Fuer Athen war sie besonders wichtig: Die Stadt sah in ihr eine Schutzgoettin.",
    symbol: "Symbole: Eule, Helm, Schild. Bedeutung: Weisheit, Schutz, Stadt und Strategie.",
  },
  poseidon: {
    title: "Poseidon - Meer, Erdbeben und Pferde",
    text:
      "Poseidon war fuer die Griechen wichtig, weil Schifffahrt, Handel und Reisen vom Meer abhingen. Ein Sturm konnte als Zeichen seiner Macht verstanden werden.",
    symbol: "Symbol: Dreizack. Bedeutung: Meer, Wellen, Sturm, Erdbeben und Seefahrt.",
  },
  aphrodite: {
    title: "Aphrodite - Liebe und Schoenheit",
    text:
      "Aphrodite wurde mit Liebe, Schoenheit und Anziehung verbunden. Sie zeigt, dass griechische Goetter nicht nur Natur, sondern auch menschliche Gefuehle erklaerten.",
    symbol: "Symbole: Muschel, Taube, Rose. Bedeutung: Liebe, Schoenheit und Beziehungen.",
  },
  apollon: {
    title: "Apollon - Licht, Musik, Heilung und Orakel",
    text:
      "Apollon war mit Musik, Licht, Heilung und Weissagung verbunden. Das Orakel von Delphi stand unter seinem Schutz und war fuer viele Entscheidungen wichtig.",
    symbol: "Symbole: Leier, Sonne, Lorbeer. Bedeutung: Musik, Licht, Heilung, Ordnung und Orakel.",
  },
  artemis: {
    title: "Artemis - Jagd, Wildnis und Schutz junger Menschen",
    text:
      "Artemis wurde mit Jagd, Tieren, Wildnis und Schutz von Kindern und jungen Menschen verbunden. Sie zeigt die Naehe zwischen Religion, Natur und Lebensphasen.",
    symbol: "Symbole: Bogen, Hirsch. Bedeutung: Jagd, Natur, Wildnis und Schutz.",
  },
};

const practiceDetails = {
  opfer: {
    title: "Opfer am Altar",
    text:
      "Menschen brachten Gaben wie Wein, Getreide, Tiere oder Rauchopfer. Damit wollten sie Dank zeigen, Schutz erbitten oder die Goetter freundlich stimmen.",
    example: "Beispiel: Vor einer Reise ueber das Meer konnte man Poseidon um Schutz bitten.",
  },
  tempel: {
    title: "Tempelbesuch",
    text:
      "Tempel waren wichtige Orte der Verehrung. Sie waren oft einem bestimmten Gott geweiht und zeigten auch den Stolz einer Polis.",
    example: "Beispiel: Ein Athena-Tempel konnte zeigen, dass eine Stadt sich unter Athenas Schutz sah.",
  },
  orakel: {
    title: "Orakel von Delphi",
    text:
      "Menschen und Poleis fragten Orakel um Rat. Die Antworten waren oft mehrdeutig und mussten gedeutet werden.",
    example: "Beispiel: Vor einer Koloniegruendung oder einem Krieg konnte eine Polis nach goettlichem Rat fragen.",
  },
  fest: {
    title: "Feste und Prozessionen",
    text:
      "Feste verbanden Religion, Musik, Sport, Theater, Opfer und Gemeinschaft. Religion war dadurch sichtbar und oeffentlich.",
    example: "Beispiel: Eine Prozession konnte zeigen, dass die Polis gemeinsam ihre Schutzgoettin verehrt.",
  },
};

const godLabels = {
  zeus: "Zeus",
  athena: "Athena",
  poseidon: "Poseidon",
  aphrodite: "Aphrodite",
  apollon: "Apollon",
  artemis: "Artemis",
};

const godPool = [
  { statement: "Blitz, Himmel, Ordnung und Goettervater.", answer: "zeus", explanation: "Das gehoert zu Zeus." },
  { statement: "Eule, Helm, Schild, Weisheit und Schutz einer Stadt.", answer: "athena", explanation: "Das gehoert zu Athena." },
  { statement: "Dreizack, Wellen, Sturm und Seefahrt.", answer: "poseidon", explanation: "Das gehoert zu Poseidon." },
  { statement: "Muschel, Taube, Rose, Liebe und Schoenheit.", answer: "aphrodite", explanation: "Das gehoert zu Aphrodite." },
  { statement: "Leier, Sonne, Musik, Heilung und Orakel.", answer: "apollon", explanation: "Das gehoert zu Apollon." },
  { statement: "Bogen, Hirsch, Jagd, Wildnis und Schutz.", answer: "artemis", explanation: "Das gehoert zu Artemis." },
  { statement: "Wichtig fuer Athen als Schutzgoettin.", answer: "athena", explanation: "Athena ist eng mit Athen verbunden." },
  { statement: "Besonders wichtig, wenn Menschen ueber das Meer reisen.", answer: "poseidon", explanation: "Seefahrt war Poseidons Bereich." },
  { statement: "Besonders eng mit Delphi und Weissagung verbunden.", answer: "apollon", explanation: "Delphi gehoert zu Apollon." },
];

const practiceLabels = {
  opfer: "Opfer",
  tempel: "Tempel",
  orakel: "Orakel",
  fest: "Fest",
};

const practicePool = [
  { statement: "Menschen bringen Gaben an einem Altar dar.", answer: "opfer", explanation: "Das ist ein Opfer." },
  { statement: "Eine Familie betritt respektvoll ein heiliges Gebaeude mit Saeulen.", answer: "tempel", explanation: "Das beschreibt einen Tempelbesuch." },
  { statement: "Eine Polis bittet vor einer Entscheidung um goettlichen Rat.", answer: "orakel", explanation: "Das ist die Funktion eines Orakels." },
  { statement: "Menschen feiern gemeinsam mit Prozession, Musik und Opfer.", answer: "fest", explanation: "Das ist ein religioeses Fest." },
  { statement: "Eine Antwort ist mehrdeutig und muss gedeutet werden.", answer: "orakel", explanation: "Orakelsprueche waren oft auslegungsbeduerftig." },
  { statement: "Die Gemeinschaft zeigt oeffentlich, welchen Gott sie verehrt.", answer: "fest", explanation: "Feste waren oeffentliche Gemeinschaftsrituale." },
  { statement: "Ein Bauwerk zeigt die Bedeutung eines Gottes fuer die Polis.", answer: "tempel", explanation: "Tempel waren sichtbare Zeichen von Verehrung." },
  { statement: "Menschen hoffen, durch eine Gabe Schutz oder Hilfe zu erhalten.", answer: "opfer", explanation: "Das gehoert zur Logik des Opfers." },
];

const meaningLabels = {
  welt: "Weltdeutung",
  stadt: "Schutz der Stadt",
  alltag: "Alltag / Ritual",
  rat: "Orakel / Rat",
};

const meaningPool = [
  { statement: "Blitz und Sturm konnten als Wirken eines Gottes verstanden werden.", answer: "welt", explanation: "Das erklaert Natur durch Goetter." },
  { statement: "Athena galt als besondere Schutzgoettin Athens.", answer: "stadt", explanation: "Das ist Stadtschutz." },
  { statement: "Menschen brachten Gaben an einem Altar dar.", answer: "alltag", explanation: "Das ist Alltagspraxis." },
  { statement: "Eine Polis fragt vor einer Gruendung in Delphi nach Rat.", answer: "rat", explanation: "Das ist Orakel/Rat." },
  { statement: "Feste mit Prozessionen staerkten die Gemeinschaft.", answer: "alltag", explanation: "Feste waren Rituale im oeffentlichen Leben." },
  { statement: "Goettergeschichten halfen, menschliche Gefuehle wie Liebe oder Streit zu deuten.", answer: "welt", explanation: "Das ist Weltdeutung." },
  { statement: "Ein Tempel zeigt, dass eine Polis einen Gott besonders verehrt.", answer: "stadt", explanation: "Das ist ein Zeichen fuer Schutzbeziehung und Identitaet." },
  { statement: "Ein mehrdeutiger Spruch muss von Menschen ausgelegt werden.", answer: "rat", explanation: "Das passt zum Orakel." },
];

const quizPool = [
  {
    prompt: "Was bedeutet polytheistisch?",
    options: [
      "Glaube an viele Goetter",
      "Glaube an genau einen Gott",
      "Glaube ohne Rituale",
      "Glaube nur an Menschen",
    ],
    correct: 0,
    explanation: "Die griechische Religion war polytheistisch.",
  },
  {
    prompt: "Welcher Gott ist mit Blitz und Himmel verbunden?",
    options: ["Zeus", "Poseidon", "Aphrodite", "Artemis"],
    correct: 0,
    explanation: "Zeus wird mit Blitz, Himmel und Ordnung verbunden.",
  },
  {
    prompt: "Welche Goettin war besonders wichtig fuer Athen?",
    options: ["Athena", "Aphrodite", "Artemis", "Hera"],
    correct: 0,
    explanation: "Athena galt als Schutzgoettin Athens.",
  },
  {
    prompt: "Welcher Gott passt zu Meer, Wellen und Dreizack?",
    options: ["Poseidon", "Apollon", "Zeus", "Hermes"],
    correct: 0,
    explanation: "Poseidon war Gott des Meeres.",
  },
  {
    prompt: "Warum war Apollon fuer Delphi wichtig?",
    options: [
      "Das Orakel von Delphi stand unter seinem Schutz.",
      "Er war ausschliesslich Gott des Meeres.",
      "Er war nur fuer Stadtmauern zustaendig.",
      "Er war eine Polis.",
    ],
    correct: 0,
    explanation: "Apollon ist eng mit Orakel und Weissagung verbunden.",
  },
  {
    prompt: "Was war ein Opfer im griechischen Alltag?",
    options: [
      "Eine Gabe an die Goetter, um Dank, Bitte oder Verehrung auszudruecken",
      "Eine Abstimmung in der Volksversammlung",
      "Ein Hafenbau",
      "Eine reine Sportuebung ohne Religion",
    ],
    correct: 0,
    explanation: "Opfer waren wichtige Rituale.",
  },
  {
    prompt: "Warum besuchten Menschen ein Orakel?",
    options: [
      "Sie suchten goettlichen Rat fuer schwierige Entscheidungen.",
      "Sie wollten nur Waren kaufen.",
      "Sie mussten dort Steuern zahlen.",
      "Sie wollten eine Stadtmauer messen.",
    ],
    correct: 0,
    explanation: "Orakel wurden bei Unsicherheit um Rat gefragt.",
  },
  {
    prompt: "Warum war Religion nicht nur Privatsache?",
    options: [
      "Feste, Tempel und Opfer waren oeffentliche Teile des Polislebens.",
      "Religion gab es nur zuhause.",
      "Tempel waren verboten.",
      "Goetter hatten nichts mit Staedten zu tun.",
    ],
    correct: 0,
    explanation: "Religion war oeffentlich und gemeinschaftlich.",
  },
  {
    prompt: "Welche Aussage erklaert, warum es viele Goetter gab?",
    options: [
      "Verschiedene Lebensbereiche wurden mit verschiedenen Goettern verbunden.",
      "Alle Goetter hatten exakt dieselbe Aufgabe.",
      "Die Griechen kannten keine Geschichten.",
      "Goetter spielten im Alltag keine Rolle.",
    ],
    correct: 0,
    explanation: "Viele Goetter passten zu vielen Lebensbereichen.",
  },
  {
    prompt: "Welche Aussage passt zu Artemis?",
    options: [
      "Bogen, Hirsch, Jagd und Wildnis",
      "Dreizack und Meer",
      "Blitz und Himmel",
      "Leier und Orakel",
    ],
    correct: 0,
    explanation: "Artemis wird mit Jagd und Wildnis verbunden.",
  },
  {
    prompt: "Welche Aussage ist eine gute historische Erklaerung?",
    options: [
      "Religion half Menschen, Natur, Unsicherheit, Gemeinschaft und Entscheidungen zu deuten.",
      "Religion bestand nur aus erfundenen Namen ohne Bedeutung.",
      "Religion war fuer Poleis unwichtig.",
      "Alle Menschen glaubten an genau denselben einzigen Gott.",
    ],
    correct: 0,
    explanation: "Diese Antwort erklaert die Funktion von Religion.",
  },
  {
    prompt: "Welche Aussage passt zu Festen?",
    options: [
      "Sie verbanden Verehrung, Gemeinschaft, Musik, Prozessionen und Opfer.",
      "Sie waren immer geheim und ohne Zuschauer.",
      "Sie hatten nichts mit Goettern zu tun.",
      "Sie fanden nur auf Schiffen statt.",
    ],
    correct: 0,
    explanation: "Feste machten Religion oeffentlich sichtbar.",
  },
];

let godTasks = [];
let practiceTasks = [];
let meaningTasks = [];

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
  gwTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      gwTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      gwTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${target}`).classList.add("is-active");
    });
  });
}

function setGod(godId) {
  const detail = godDetails[godId];
  gwGodTitle.textContent = detail.title;
  gwGodText.textContent = detail.text;
  gwGodSymbol.textContent = detail.symbol;
  gwGodButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.god === godId);
  });
}

function setupGodDetails() {
  gwGodButtons.forEach((button) => {
    button.addEventListener("click", () => setGod(button.dataset.god));
  });
  setGod("zeus");
}

function setPractice(practiceId) {
  const detail = practiceDetails[practiceId];
  gwPracticeTitle.textContent = detail.title;
  gwPracticeText.textContent = detail.text;
  gwPracticeExample.textContent = detail.example;
  gwPracticeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.practice === practiceId);
  });
}

function setupPracticeDetails() {
  gwPracticeButtons.forEach((button) => {
    button.addEventListener("click", () => setPractice(button.dataset.practice));
  });
  setPractice("opfer");
}

function setFeedback(element, text, isGood) {
  element.className = `gw-feedback ${isGood ? "good" : "bad"}`;
  element.textContent = text;
}

function renderSelectTask(container, tasks, labels) {
  container.replaceChildren();
  tasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "gw-task-row";
    row.dataset.index = String(index);

    const prompt = document.createElement("p");
    prompt.textContent = task.statement;

    const select = document.createElement("select");
    select.className = "gw-select";
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

function renderGodTasks() {
  godTasks = shuffle(godPool).slice(0, 6);
  gwGodFeedback.textContent = "";
  gwGodFeedback.className = "";
  renderSelectTask(gwGodList, godTasks, godLabels);
}

function renderPracticeTasks() {
  practiceTasks = shuffle(practicePool).slice(0, 6);
  gwPracticeFeedback.textContent = "";
  gwPracticeFeedback.className = "";
  renderSelectTask(gwPracticeList, practiceTasks, practiceLabels);
}

function renderMeaningTasks() {
  meaningTasks = shuffle(meaningPool).slice(0, 6);
  gwMeaningFeedback.textContent = "";
  gwMeaningFeedback.className = "";
  renderSelectTask(gwMeaningList, meaningTasks, meaningLabels);
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
  gwQuizNext.disabled = true;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  quizState.answered = false;
  gwQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  gwQuizPrompt.textContent = question.prompt;
  gwQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
  gwQuizAnswers.replaceChildren();
  gwQuizFeedback.textContent = "";
  gwQuizFeedback.className = "";
  gwQuizNext.disabled = true;

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option.text;
    button.addEventListener("click", () => answerQuiz(button, option));
    gwQuizAnswers.append(button);
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

  [...gwQuizAnswers.children].forEach((choice) => {
    const matchingOption = quizState.questions[quizState.index].options.find((entry) => entry.text === choice.textContent);
    choice.disabled = true;
    choice.classList.toggle("is-correct", Boolean(matchingOption && matchingOption.isCorrect));
  });
  button.classList.toggle("is-wrong", !option.isCorrect);

  const question = quizState.questions[quizState.index];
  setFeedback(
    gwQuizFeedback,
    option.isCorrect ? `Richtig. ${question.explanation}` : `Nicht ganz. ${question.explanation}`,
    option.isCorrect
  );
  gwQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
  gwQuizNext.disabled = false;
}

function nextQuizQuestion() {
  if (!quizState.running || !quizState.answered) {
    return;
  }

  quizState.index += 1;
  if (quizState.index >= quizState.questions.length) {
    quizState.running = false;
    gwQuizStatus.textContent = "Test beendet.";
    gwQuizPrompt.textContent = `Ergebnis: ${quizState.correct} von ${quizState.questions.length} Punkten.`;
    gwQuizAnswers.replaceChildren();
    setFeedback(
      gwQuizFeedback,
      quizState.correct >= 8
        ? "Sehr sicher. Du kannst Goetter, Symbole und Bedeutung der Religion gut erklaeren."
        : "Wiederhole besonders: Goetterbereiche, Alltag mit Opfer/Tempel/Orakel/Fest und warum Religion Gemeinschaft staerkte.",
      quizState.correct >= 8
    );
    gwQuizNext.disabled = true;
    return;
  }

  renderQuizQuestion();
}

setupTabs();
setupGodDetails();
setupPracticeDetails();
renderGodTasks();
renderPracticeTasks();
renderMeaningTasks();

gwGodNewRound.addEventListener("click", renderGodTasks);
gwGodCheck.addEventListener("click", () => checkSelectTasks(gwGodList, godTasks, gwGodFeedback));
gwPracticeNewRound.addEventListener("click", renderPracticeTasks);
gwPracticeCheck.addEventListener("click", () => checkSelectTasks(gwPracticeList, practiceTasks, gwPracticeFeedback));
gwMeaningNewRound.addEventListener("click", renderMeaningTasks);
gwMeaningCheck.addEventListener("click", () => checkSelectTasks(gwMeaningList, meaningTasks, gwMeaningFeedback));
gwQuizStart.addEventListener("click", startQuiz);
gwQuizNext.addEventListener("click", nextQuizQuestion);
