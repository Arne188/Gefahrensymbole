const plTabButtons = document.querySelectorAll(".pl-tab-btn");
const plTabPanels = document.querySelectorAll(".pl-tab");

const plPartButtons = document.querySelectorAll(".pl-part-btn");
const plPartTitle = document.getElementById("plPartTitle");
const plPartText = document.getElementById("plPartText");
const plPartExample = document.getElementById("plPartExample");

const plPartNewRound = document.getElementById("plPartNewRound");
const plPartCheck = document.getElementById("plPartCheck");
const plPartList = document.getElementById("plPartList");
const plPartFeedback = document.getElementById("plPartFeedback");

const plRightsNewRound = document.getElementById("plRightsNewRound");
const plRightsCheck = document.getElementById("plRightsCheck");
const plRightsList = document.getElementById("plRightsList");
const plRightsFeedback = document.getElementById("plRightsFeedback");

const plCompareNewRound = document.getElementById("plCompareNewRound");
const plCompareCheck = document.getElementById("plCompareCheck");
const plCompareList = document.getElementById("plCompareList");
const plCompareFeedback = document.getElementById("plCompareFeedback");

const plQuizStart = document.getElementById("plQuizStart");
const plQuizNext = document.getElementById("plQuizNext");
const plQuizScore = document.getElementById("plQuizScore");
const plQuizStatus = document.getElementById("plQuizStatus");
const plQuizPrompt = document.getElementById("plQuizPrompt");
const plQuizAnswers = document.getElementById("plQuizAnswers");
const plQuizFeedback = document.getElementById("plQuizFeedback");

const partDetails = {
  akropolis: {
    title: "Akropolis",
    text: "Die Akropolis lag meist erhoeht. Sie war Festungshuegel, Schutzort und oft Standort wichtiger Tempel.",
    example: "Merke: Oben bedeutete Schutz und Sichtbarkeit. Religion und Verteidigung lagen hier nah beieinander.",
  },
  agora: {
    title: "Agora",
    text: "Die Agora war Marktplatz und Treffpunkt. Dort wurde gehandelt, geredet und politisches Leben sichtbar.",
    example: "Merke: Die Agora ist ein guter Ort, um Alltag, Handel und Mitbestimmung zusammenzudenken.",
  },
  wohnen: {
    title: "Wohngebiete",
    text: "In den Wohngebieten lebten Familien, Handwerker, Haendler und viele Menschen ohne politische Rechte.",
    example: "Merke: Nicht jeder Bewohner war automatisch Buerger.",
  },
  mauer: {
    title: "Stadtmauer",
    text: "Die Stadtmauer schuetzte die Polis vor Angriffen und zeigte zugleich: Das ist ein eigener politischer Raum.",
    example: "Merke: Schutz und Selbststaendigkeit gehoeren bei der Polis zusammen.",
  },
  hafen: {
    title: "Hafen",
    text: "Der Hafen verband viele Poleis mit dem Mittelmeer. Handel, Schiffe und Nachrichten kamen hier an.",
    example: "Merke: Besonders fuer Athen waren Schifffahrt und Handel sehr wichtig.",
  },
  umland: {
    title: "Umland",
    text: "Zur Polis gehoerte nicht nur die Stadt, sondern auch das Umland mit Feldern, Olivenbaeumen und Doerfern.",
    example: "Merke: Eine Polis war Stadt plus Umland plus gemeinsame Regeln.",
  },
};

const partLabels = {
  akropolis: "Akropolis",
  agora: "Agora",
  wohnen: "Wohngebiete",
  mauer: "Stadtmauer",
  hafen: "Hafen",
  umland: "Umland",
};

const partPool = [
  { statement: "Erhoehter Festungshuegel mit Tempeln und Schutzfunktion.", answer: "akropolis", explanation: "Das beschreibt die Akropolis." },
  { statement: "Marktplatz, Treffpunkt und Ort fuer Handel und Gespraeche.", answer: "agora", explanation: "Das ist die Agora." },
  { statement: "Bereich, in dem Familien, Handwerker und andere Bewohner lebten.", answer: "wohnen", explanation: "Das sind die Wohngebiete." },
  { statement: "Sie schuetze die Polis und markierte den eigenen Stadtbereich.", answer: "mauer", explanation: "Das ist die Stadtmauer." },
  { statement: "Ort fuer Schiffe, Handel und Verbindung ueber das Meer.", answer: "hafen", explanation: "Das ist der Hafen." },
  { statement: "Felder, Doerfer und Landwirtschaft ausserhalb der eigentlichen Stadt.", answer: "umland", explanation: "Das ist das Umland." },
  { statement: "Hier konnte man Waren kaufen und Menschen treffen.", answer: "agora", explanation: "Handel und Treffen gehoeren zur Agora." },
  { statement: "Dieser Bereich zeigt: Die Polis war mehr als nur die Innenstadt.", answer: "umland", explanation: "Das Umland gehoert zur Polis dazu." },
];

const rightsLabels = {
  buerger: "Buerger",
  frauen: "Frauen",
  metoeken: "Fremde / Metoeken",
  sklaven: "Sklaven",
};

const rightsPool = [
  { statement: "Freie maennliche Mitglieder der Polis mit politischen Rechten.", answer: "buerger", explanation: "Politische Mitbestimmung war den Buergern vorbehalten." },
  { statement: "Wichtige Aufgaben in Haushalt und Familie, aber keine politische Mitbestimmung.", answer: "frauen", explanation: "Frauen gehoerten zur Gesellschaft, hatten aber keine politischen Rechte." },
  { statement: "Lebten und arbeiteten in der Polis, hatten aber weniger Rechte als Buerger.", answer: "metoeken", explanation: "Das beschreibt Fremde bzw. Metoeken." },
  { statement: "Unfrei, mussten fuer andere arbeiten und hatten keine Rechte.", answer: "sklaven", explanation: "Das beschreibt Sklaven." },
  { statement: "Konnten je nach Polis an Versammlungen teilnehmen oder politische Entscheidungen beeinflussen.", answer: "buerger", explanation: "Mitbestimmung gehoerte zu den Buergerrechten." },
  { statement: "Waren oft im Handel oder Handwerk taetig, aber keine vollberechtigten Buerger.", answer: "metoeken", explanation: "Metoeken konnten wirtschaftlich wichtig sein, politisch aber ausgeschlossen bleiben." },
  { statement: "Ihre Arbeit war fuer die Polis wichtig, trotzdem waren sie politisch ausgeschlossen.", answer: "frauen", explanation: "Die Grafik betont wichtige Aufgaben, aber keine politische Mitbestimmung." },
  { statement: "Sie wurden als Eigentum behandelt und waren unfrei.", answer: "sklaven", explanation: "Unfreiheit ist der zentrale Punkt." },
];

const compareLabels = {
  athen: "Athen",
  sparta: "Sparta",
};

const comparePool = [
  { statement: "Handel, Hafen und Seefahrt waren besonders wichtig.", answer: "athen", explanation: "Das passt zu Athen." },
  { statement: "Diskussion, Mitbestimmung, Bildung und Kultur werden betont.", answer: "athen", explanation: "Das sind typische Unterrichtsmerkmale Athens." },
  { statement: "Militaerische Ausbildung und Disziplin standen stark im Mittelpunkt.", answer: "sparta", explanation: "Das passt zu Sparta." },
  { statement: "Ein starkes Heer und Schutz der Gemeinschaft waren besonders wichtig.", answer: "sparta", explanation: "Das ist ein Kernmerkmal Spartas." },
  { statement: "Theater, Philosophie und Debatten passen besonders gut hierher.", answer: "athen", explanation: "Das gehoert zu Athen." },
  { statement: "Einfache Lebensweise, Pflicht und Gehorsam werden betont.", answer: "sparta", explanation: "Das gehoert zu Sparta." },
  { statement: "Die Agora als Diskussionsort passt besonders gut zu dieser Polis.", answer: "athen", explanation: "Athen wird als Diskussionsstadt dargestellt." },
  { statement: "Harte Erziehung sollte die Gemeinschaft stark machen.", answer: "sparta", explanation: "Das passt zu Spartas militaerischer Praegung." },
];

const quizPool = [
  {
    prompt: "Was war eine Polis?",
    options: [
      "Eine Stadt mit Umland, eigenen Regeln und Gemeinschaft",
      "Nur ein einzelner Tempel",
      "Ein persisches Heer",
      "Ein moderner Nationalstaat",
    ],
    correct: 0,
    explanation: "Die Polis war Stadt, Umland und politische Gemeinschaft.",
  },
  {
    prompt: "Welche Aussage zur Akropolis passt?",
    options: [
      "Sie lag erhoeht und verband Schutz mit Religion.",
      "Sie war ausschliesslich ein Hafen.",
      "Sie war nur ein Wohnviertel.",
      "Sie war ein persischer Koenigshof.",
    ],
    correct: 0,
    explanation: "Die Akropolis war Festungshuegel und Tempelbereich.",
  },
  {
    prompt: "Was war die Agora?",
    options: [
      "Marktplatz, Treffpunkt und Ort des oeffentlichen Lebens",
      "Ein Gefaengnis fuer Fremde",
      "Ein Gebirge in Sparta",
      "Ein Schiffstyp",
    ],
    correct: 0,
    explanation: "Die Agora verbindet Handel, Austausch und Politik.",
  },
  {
    prompt: "Warum gehoerte das Umland zur Polis?",
    options: [
      "Weil Felder, Doerfer und Versorgung zur Gemeinschaft gehoerten.",
      "Weil eine Polis nur aus Tempeln bestand.",
      "Weil Landwirtschaft in Griechenland verboten war.",
      "Weil dort nur Perser lebten.",
    ],
    correct: 0,
    explanation: "Die Polis war nicht nur Innenstadt, sondern Stadt mit Umland.",
  },
  {
    prompt: "Wer durfte in vielen Poleis politisch mitbestimmen?",
    options: [
      "Freie maennliche Buerger",
      "Alle Frauen und Kinder",
      "Alle Sklaven",
      "Alle Fremden automatisch",
    ],
    correct: 0,
    explanation: "Politische Rechte waren stark eingeschraenkt.",
  },
  {
    prompt: "Welche Gruppe hatte wichtige Aufgaben, aber keine politische Mitbestimmung?",
    options: ["Frauen", "Buerger", "Rat der 500", "Strategen"],
    correct: 0,
    explanation: "Frauen waren wichtig fuer Alltag und Familie, aber politisch ausgeschlossen.",
  },
  {
    prompt: "Was trifft auf Metoeken/Fremde zu?",
    options: [
      "Sie lebten und arbeiteten in der Polis, hatten aber weniger Rechte.",
      "Sie waren automatisch Koenige.",
      "Sie durften immer alle politischen Aemter uebernehmen.",
      "Sie waren die Stadtmauer.",
    ],
    correct: 0,
    explanation: "Metoeken konnten wirtschaftlich wichtig sein, hatten aber keine vollen Buergerrechte.",
  },
  {
    prompt: "Welche Aussage passt zu Sparta?",
    options: [
      "Militaerische Ausbildung, Disziplin und Pflicht wurden stark betont.",
      "Sparta war vor allem als Diskussions- und Handelsstadt bekannt.",
      "Sparta hatte keine Armee.",
      "Sparta war ein Hafen im Perserreich.",
    ],
    correct: 0,
    explanation: "Sparta wird im Unterricht als militaerisch gepraegte Polis behandelt.",
  },
  {
    prompt: "Welche Aussage passt zu Athen?",
    options: [
      "Handel, Diskussion, Bildung und Mitbestimmung spielten eine grosse Rolle.",
      "Athen war nur ein Ausbildungslager fuer Soldaten.",
      "Athen hatte keine Agora.",
      "Athen gehoerte nicht zur griechischen Welt.",
    ],
    correct: 0,
    explanation: "Athen steht fuer Handel, Kultur und politische Diskussion.",
  },
  {
    prompt: "Warum ist der Satz 'Bewohner = Buerger' falsch?",
    options: [
      "Weil viele Bewohner der Polis keine politischen Rechte hatten.",
      "Weil niemand in der Polis wohnen durfte.",
      "Weil Buerger nur Sklaven waren.",
      "Weil Frauen immer alle Aemter hatten.",
    ],
    correct: 0,
    explanation: "Frauen, Metoeken und Sklaven gehoerten zur Polis, hatten aber keine vollen Buergerrechte.",
  },
  {
    prompt: "Was ist ein guter Merksatz zur Polis?",
    options: [
      "Eine Polis war Stadt, Umland, Regeln und Gemeinschaft.",
      "Eine Polis war nur ein Schiff.",
      "Eine Polis war immer gleich aufgebaut wie Persien.",
      "Eine Polis hatte keine Bewohner.",
    ],
    correct: 0,
    explanation: "Der Merksatz fasst Raum und Gemeinschaft zusammen.",
  },
  {
    prompt: "Was ist beim Vergleich Athen-Sparta wichtig?",
    options: [
      "Beide waren Poleis, aber mit unterschiedlicher Lebensweise.",
      "Athen und Sparta waren dasselbe.",
      "Nur Sparta lag in Griechenland.",
      "Athen hatte keine Politik.",
    ],
    correct: 0,
    explanation: "Der Vergleich zeigt Gemeinsamkeit und Unterschied zugleich.",
  },
];

let partTasks = [];
let rightsTasks = [];
let compareTasks = [];

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
  plTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      plTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      plTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${target}`).classList.add("is-active");
    });
  });
}

function setPart(partId) {
  const detail = partDetails[partId];
  plPartTitle.textContent = detail.title;
  plPartText.textContent = detail.text;
  plPartExample.textContent = detail.example;
  plPartButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.part === partId);
  });
}

function setupPartDetails() {
  plPartButtons.forEach((button) => {
    button.addEventListener("click", () => setPart(button.dataset.part));
  });
  setPart("akropolis");
}

function setFeedback(element, text, isGood) {
  element.className = `pl-feedback ${isGood ? "good" : "bad"}`;
  element.textContent = text;
}

function renderSelectTask(container, tasks, labels) {
  container.replaceChildren();
  tasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "pl-task-row";
    row.dataset.index = String(index);

    const prompt = document.createElement("p");
    prompt.textContent = task.statement;

    const select = document.createElement("select");
    select.className = "pl-select";
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

function renderPartTasks() {
  partTasks = shuffle(partPool).slice(0, 6);
  plPartFeedback.textContent = "";
  plPartFeedback.className = "";
  renderSelectTask(plPartList, partTasks, partLabels);
}

function renderRightsTasks() {
  rightsTasks = shuffle(rightsPool).slice(0, 6);
  plRightsFeedback.textContent = "";
  plRightsFeedback.className = "";
  renderSelectTask(plRightsList, rightsTasks, rightsLabels);
}

function renderCompareTasks() {
  compareTasks = shuffle(comparePool).slice(0, 6);
  plCompareFeedback.textContent = "";
  plCompareFeedback.className = "";
  renderSelectTask(plCompareList, compareTasks, compareLabels);
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
  plQuizNext.disabled = true;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  quizState.answered = false;
  plQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  plQuizPrompt.textContent = question.prompt;
  plQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
  plQuizAnswers.replaceChildren();
  plQuizFeedback.textContent = "";
  plQuizFeedback.className = "";
  plQuizNext.disabled = true;

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option.text;
    button.addEventListener("click", () => answerQuiz(button, option));
    plQuizAnswers.append(button);
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

  [...plQuizAnswers.children].forEach((choice) => {
    const matchingOption = quizState.questions[quizState.index].options.find((entry) => entry.text === choice.textContent);
    choice.disabled = true;
    choice.classList.toggle("is-correct", Boolean(matchingOption && matchingOption.isCorrect));
  });
  button.classList.toggle("is-wrong", !option.isCorrect);

  const question = quizState.questions[quizState.index];
  setFeedback(
    plQuizFeedback,
    option.isCorrect ? `Richtig. ${question.explanation}` : `Nicht ganz. ${question.explanation}`,
    option.isCorrect
  );
  plQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
  plQuizNext.disabled = false;
}

function nextQuizQuestion() {
  if (!quizState.running || !quizState.answered) {
    return;
  }

  quizState.index += 1;
  if (quizState.index >= quizState.questions.length) {
    quizState.running = false;
    plQuizStatus.textContent = "Test beendet.";
    plQuizPrompt.textContent = `Ergebnis: ${quizState.correct} von ${quizState.questions.length} Punkten.`;
    plQuizAnswers.replaceChildren();
    setFeedback(
      plQuizFeedback,
      quizState.correct >= 8
        ? "Sehr sicher. Du kannst Aufbau, Rechte und Athen-Sparta-Vergleich gut erklaeren."
        : "Wiederhole besonders: Polis = Stadt + Umland + Regeln, aber nicht alle Bewohner hatten gleiche Rechte.",
      quizState.correct >= 8
    );
    plQuizNext.disabled = true;
    return;
  }

  renderQuizQuestion();
}

setupTabs();
setupPartDetails();
renderPartTasks();
renderRightsTasks();
renderCompareTasks();

plPartNewRound.addEventListener("click", renderPartTasks);
plPartCheck.addEventListener("click", () => checkSelectTasks(plPartList, partTasks, plPartFeedback));
plRightsNewRound.addEventListener("click", renderRightsTasks);
plRightsCheck.addEventListener("click", () => checkSelectTasks(plRightsList, rightsTasks, plRightsFeedback));
plCompareNewRound.addEventListener("click", renderCompareTasks);
plCompareCheck.addEventListener("click", () => checkSelectTasks(plCompareList, compareTasks, plCompareFeedback));
plQuizStart.addEventListener("click", startQuiz);
plQuizNext.addEventListener("click", nextQuizQuestion);
