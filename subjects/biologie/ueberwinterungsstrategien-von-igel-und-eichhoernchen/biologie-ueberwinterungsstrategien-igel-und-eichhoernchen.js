const tabButtons = document.querySelectorAll(".uie-tab-btn");
const tabPanels = document.querySelectorAll(".uie-tab");

const animalList = document.getElementById("uieAnimalList");
const animalReset = document.getElementById("uieAnimalReset");
const animalCheck = document.getElementById("uieAnimalCheck");
const animalFeedback = document.getElementById("uieAnimalFeedback");

const compareList = document.getElementById("uieCompareList");
const compareReset = document.getElementById("uieCompareReset");
const compareCheck = document.getElementById("uieCompareCheck");
const compareFeedback = document.getElementById("uieCompareFeedback");

const factList = document.getElementById("uieFactList");
const factReset = document.getElementById("uieFactReset");
const factCheck = document.getElementById("uieFactCheck");
const factFeedback = document.getElementById("uieFactFeedback");

const trainCount = document.getElementById("uieTrainCount");
const trainGenerate = document.getElementById("uieTrainGenerate");
const trainCheck = document.getElementById("uieTrainCheck");
const trainList = document.getElementById("uieTrainList");
const trainFeedback = document.getElementById("uieTrainFeedback");

const testStart = document.getElementById("uieTestStart");
const testNext = document.getElementById("uieTestNext");
const testScore = document.getElementById("uieTestScore");
const testStatus = document.getElementById("uieTestStatus");
const testPrompt = document.getElementById("uieTestPrompt");
const testAnswers = document.getElementById("uieTestAnswers");
const testFeedback = document.getElementById("uieTestFeedback");

const animalItemsBase = [
  { prompt: "Haelt Winterruhe und schlaeft die meiste Zeit.", answer: "igel" },
  { prompt: "Bleibt den ganzen Winter aktiv.", answer: "eichhoernchen" },
  { prompt: "Lebt von Fettreserven und nimmt kaum Nahrung auf.", answer: "igel" },
  { prompt: "Nutzt versteckte Vorraete (Depots).", answer: "eichhoernchen" },
  { prompt: "Kobel in Baumkronen als typischer Rueckzugsort.", answer: "eichhoernchen" },
  { prompt: "Polstert ein Nest mit Laub, Moos und Gras.", answer: "igel" },
  { prompt: "Koerperfunktionen werden stark verlangsamt.", answer: "igel" },
  { prompt: "Sucht im Winter weiter Nahrung.", answer: "eichhoernchen" },
];

const compareItemsBase = [
  { prompt: "Bereiten sich im Herbst auf den Winter vor.", answer: "gemeinsamkeit" },
  { prompt: "Schlaeft die meiste Zeit im Winter.", answer: "igel" },
  { prompt: "Bleibt aktiv und sucht Nahrung.", answer: "eichhoernchen" },
  { prompt: "Brauchen Schutz vor Kaelte und Nahrungsmangel.", answer: "gemeinsamkeit" },
  { prompt: "Koerperfunktionen bleiben weitgehend normal.", answer: "eichhoernchen" },
  { prompt: "Lebt im Winter vor allem von Fettreserven.", answer: "igel" },
];

const factItemsBase = [
  { prompt: "Igel sind nachts aktiv, Eichhoernchen meist tagsueber.", answer: "richtig" },
  { prompt: "Eichhoernchen bauen oft mehrere Kobel und wechseln sie.", answer: "richtig" },
  { prompt: "Ein Igel kann in einer Nacht bis zu 100 g verlieren.", answer: "richtig" },
  { prompt: "Laubhaufen und Hecken sind fuer Tiere im Winter nutzlos.", answer: "falsch" },
];

const questionPool = [
  {
    prompt: "Welche Strategie nutzt der Igel im Winter?",
    options: ["Winterruhe", "Winteraktivitaet", "Winterstarre", "Sommerschlaf"],
    answer: 0,
    explain: "Igel halten Winterruhe und senken ihre Koerperfunktionen deutlich.",
  },
  {
    prompt: "Welche Aussage passt zum Eichhoernchen?",
    options: [
      "Es bleibt aktiv und nutzt Nahrungsvorraete.",
      "Es schlaeft den ganzen Winter durch.",
      "Es lebt nur von Fettreserven.",
      "Es atmet im Winter nur ueber die Haut.",
    ],
    answer: 0,
    explain: "Eichhoernchen bleiben aktiv und nutzen Depots.",
  },
  {
    prompt: "Was ist ein typisches Igelversteck?",
    options: ["Laubhaufen", "Kobel in Baumkronen", "Offenes Feld", "Teichmitte"],
    answer: 0,
    explain: "Igel ueberwintern haeufig in Laub-, Reisig- oder Holzhaeufen.",
  },
  {
    prompt: "Was ist ein typischer Rueckzugsort fuer Eichhoernchen?",
    options: ["Kobel in Baumkronen", "Schlamm am Gewaesserboden", "Erdhoehle im Acker", "Steinritze unter Wasser"],
    answer: 0,
    explain: "Eichhoernchen nutzen Kobel und Baumhoehlen.",
  },
  {
    prompt: "Welche Gemeinsamkeit stimmt?",
    options: [
      "Beide bereiten sich im Herbst auf den Winter vor.",
      "Beide schlafen den ganzen Winter.",
      "Beide leben nur von Fettreserven.",
      "Beide bleiben durchgehend gleich aktiv.",
    ],
    answer: 0,
    explain: "Beide Arten muessen sich auf Kaelte und Nahrungsmangel vorbereiten.",
  },
  {
    prompt: "Welche Aussage beschreibt einen Unterschied korrekt?",
    options: [
      "Igel halten Winterruhe, Eichhoernchen bleiben aktiv.",
      "Igel und Eichhoernchen ueberwintern gleich.",
      "Eichhoernchen halten Winterruhe, Igel bleiben aktiv.",
      "Beide suchen keine Nahrung im Herbst.",
    ],
    answer: 0,
    explain: "Das ist der zentrale Unterschied im Ueberwinterungsverhalten.",
  },
  {
    prompt: "Warum frisst der Igel im Herbst besonders viel?",
    options: [
      "Um Fettreserven fuer den Winter aufzubauen",
      "Um schneller zu wachsen",
      "Um den Winter aktiv zu bleiben",
      "Um seine Nester zu fuellen",
    ],
    answer: 0,
    explain: "Der Igel braucht Fettreserven fuer die Winterruhe.",
  },
  {
    prompt: "Was kann Menschen im Winter zum Tierschutz beitragen?",
    options: [
      "Laubhaufen liegen lassen und Hecken schuetzen",
      "Alle Verstecke entfernen",
      "Gaerten komplett aufraeumen",
      "Salz in Futterstellen mischen",
    ],
    answer: 0,
    explain: "Naturnahe Strukturen helfen beiden Arten beim Ueberleben.",
  },
  {
    prompt: "Wann wird der Igel meist wieder aktiver?",
    options: ["Im Fruehjahr bei waermeren Temperaturen", "Mitten im Dezember", "Nur nachts im Januar", "Gar nicht mehr"],
    answer: 0,
    explain: "Mit steigenden Temperaturen wird der Igel wieder aktiv.",
  },
  {
    prompt: "Welche Aussage zu Eichhoernchen ist richtig?",
    options: [
      "Es speichert Nahrung in mehreren Depots.",
      "Es nimmt im Winter gar keine Nahrung auf.",
      "Es schlaeft den Winter dauerhaft.",
      "Es nutzt nur ein einziges Nest.",
    ],
    answer: 0,
    explain: "Eichhoernchen legen mehrere Vorratsdepots an.",
  },
  {
    prompt: "Warum ist Ueberwinterung fuer beide Arten wichtig?",
    options: [
      "Um Zeiten mit Kaelte und wenig Nahrung zu ueberstehen",
      "Um schneller Nachwuchs zu bekommen",
      "Um groeßer zu werden",
      "Um im Winter zu wandern",
    ],
    answer: 0,
    explain: "Ueberwinterung ist eine Anpassung an schwierige Umweltbedingungen.",
  },
  {
    prompt: "Was passiert bei Winterruhe (Igel)?",
    options: [
      "Herzschlag und Atmung werden langsamer",
      "Herzschlag und Atmung werden schneller",
      "Koerpertemperatur steigt stark an",
      "Igel bleiben dauerhaft auf Nahrungssuche",
    ],
    answer: 0,
    explain: "In der Winterruhe werden Koerperfunktionen reduziert.",
  },
];

let currentAnimalItems = [];
let currentCompareItems = [];
let currentFactItems = [];
let currentTrainingQuestions = [];
let currentTestQuestions = [];
let currentTestIndex = 0;
let currentTestScore = 0;
let hasAnsweredCurrentTestQuestion = false;

function shuffle(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function sample(items, count) {
  return shuffle(items).slice(0, Math.min(count, items.length));
}

function setActiveTab(tabKey) {
  tabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === tabKey);
  });
  tabPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === `tab-${tabKey}`);
  });
}

function renderSelectTask(targetList, sourceItems, choices) {
  const selectedItems = shuffle(sourceItems);
  targetList.replaceChildren();

  selectedItems.forEach((item, index) => {
    const row = document.createElement("article");
    row.className = "uie-task-item";

    const label = document.createElement("label");
    label.setAttribute("for", `${targetList.id}-${index}`);
    label.textContent = item.prompt;

    const select = document.createElement("select");
    select.id = `${targetList.id}-${index}`;
    select.className = "uie-select";
    select.dataset.answer = item.answer;

    choices.forEach((choice) => {
      const option = document.createElement("option");
      option.value = choice.value;
      option.textContent = choice.text;
      select.append(option);
    });

    row.append(label, select);
    targetList.append(row);
  });

  return selectedItems;
}

function checkSelectTask(targetList, itemsCount, feedbackNode) {
  const rows = [...targetList.querySelectorAll(".uie-task-item")];
  let correct = 0;
  let answered = 0;

  rows.forEach((row) => {
    row.classList.remove("is-correct", "is-wrong");
    const select = row.querySelector("select");
    if (!(select instanceof HTMLSelectElement) || !select.value) {
      return;
    }

    answered += 1;
    if (select.value === select.dataset.answer) {
      correct += 1;
      row.classList.add("is-correct");
    } else {
      row.classList.add("is-wrong");
    }
  });

  if (answered === 0) {
    feedbackNode.textContent = "Bitte zuerst mindestens eine Zuordnung waehlen.";
    return;
  }
  feedbackNode.textContent = `Richtig: ${correct} von ${itemsCount}.`;
}

function renderAnimalTask() {
  currentAnimalItems = renderSelectTask(animalList, animalItemsBase, [
    { value: "", text: "Tier waehlen" },
    { value: "igel", text: "Igel" },
    { value: "eichhoernchen", text: "Eichhoernchen" },
  ]);
  animalFeedback.textContent = "Noch nicht geprueft.";
}

function renderCompareTask() {
  currentCompareItems = renderSelectTask(compareList, compareItemsBase, [
    { value: "", text: "Kategorie waehlen" },
    { value: "gemeinsamkeit", text: "Gemeinsamkeit" },
    { value: "igel", text: "Igel" },
    { value: "eichhoernchen", text: "Eichhoernchen" },
  ]);
  compareFeedback.textContent = "Noch nicht geprueft.";
}

function renderFactTask() {
  currentFactItems = renderSelectTask(factList, factItemsBase, [
    { value: "", text: "Bewertung waehlen" },
    { value: "richtig", text: "Richtig" },
    { value: "falsch", text: "Falsch" },
  ]);
  factFeedback.textContent = "Noch nicht geprueft.";
}

function renderTraining() {
  const count = Number(trainCount.value) || 10;
  currentTrainingQuestions = sample(questionPool, count);
  trainList.replaceChildren();

  currentTrainingQuestions.forEach((question, qIndex) => {
    const task = document.createElement("article");
    task.className = "uie-task-item";
    task.dataset.index = String(qIndex);

    const label = document.createElement("label");
    label.textContent = `${qIndex + 1}. ${question.prompt}`;
    task.append(label);

    question.options.forEach((option, oIndex) => {
      const wrapper = document.createElement("label");
      wrapper.style.display = "block";
      wrapper.style.marginTop = "0.25rem";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `uie-train-${qIndex}`;
      radio.value = String(oIndex);
      radio.style.marginRight = "0.45rem";
      wrapper.append(radio, document.createTextNode(option));
      task.append(wrapper);
    });

    trainList.append(task);
  });

  trainFeedback.textContent = `${currentTrainingQuestions.length} Aufgaben erzeugt.`;
}

function checkTraining() {
  if (currentTrainingQuestions.length === 0) {
    trainFeedback.textContent = "Bitte zuerst Aufgaben erstellen.";
    return;
  }

  const tasks = [...trainList.querySelectorAll(".uie-task-item")];
  let correct = 0;
  let answered = 0;

  tasks.forEach((task) => {
    task.classList.remove("is-correct", "is-wrong");
    const index = Number(task.dataset.index);
    const question = currentTrainingQuestions[index];
    const picked = task.querySelector("input[type='radio']:checked");
    if (!question || !(picked instanceof HTMLInputElement)) {
      return;
    }

    answered += 1;
    if (Number(picked.value) === question.answer) {
      correct += 1;
      task.classList.add("is-correct");
    } else {
      task.classList.add("is-wrong");
    }
  });

  if (answered === 0) {
    trainFeedback.textContent = "Bitte zuerst mindestens eine Antwort waehlen.";
    return;
  }
  trainFeedback.textContent = `Training: ${correct} von ${currentTrainingQuestions.length} richtig.`;
}

function updateTestScore() {
  testScore.textContent = `Punkte: ${currentTestScore} / ${currentTestQuestions.length || 10}`;
}

function renderCurrentTestQuestion() {
  const current = currentTestQuestions[currentTestIndex];
  if (!current) {
    testStatus.textContent = "Test beendet.";
    testPrompt.textContent = "Du hast alle Fragen bearbeitet.";
    testAnswers.replaceChildren();
    testFeedback.textContent = "";
    testNext.disabled = true;
    return;
  }

  hasAnsweredCurrentTestQuestion = false;
  testStatus.textContent = `Frage ${currentTestIndex + 1} von ${currentTestQuestions.length}`;
  testPrompt.textContent = current.prompt;
  testFeedback.textContent = "";
  testAnswers.replaceChildren();
  testNext.disabled = true;

  current.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "uie-choice-btn";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => {
      if (hasAnsweredCurrentTestQuestion) {
        return;
      }
      hasAnsweredCurrentTestQuestion = true;

      const isCorrect = index === current.answer;
      if (isCorrect) {
        currentTestScore += 1;
      }

      const buttons = [...testAnswers.querySelectorAll(".uie-choice-btn")];
      buttons.forEach((btn, btnIndex) => {
        btn.disabled = true;
        if (btnIndex === current.answer) {
          btn.classList.add("is-correct");
        } else if (btnIndex === index && !isCorrect) {
          btn.classList.add("is-wrong");
        }
      });

      updateTestScore();
      testFeedback.textContent = `${isCorrect ? "Richtig." : "Nicht ganz."} ${current.explain}`;
      testNext.disabled = false;
    });
    testAnswers.append(button);
  });
}

function startTest() {
  currentTestQuestions = sample(questionPool, 10);
  currentTestIndex = 0;
  currentTestScore = 0;
  updateTestScore();
  renderCurrentTestQuestion();
}

function nextTestQuestion() {
  if (!hasAnsweredCurrentTestQuestion) {
    return;
  }

  currentTestIndex += 1;
  if (currentTestIndex >= currentTestQuestions.length) {
    testStatus.textContent = `Test abgeschlossen: ${currentTestScore} von ${currentTestQuestions.length} Punkten.`;
    testPrompt.textContent = "Klicke auf Test starten, um einen neuen Durchgang zu machen.";
    testAnswers.replaceChildren();
    testFeedback.textContent = currentTestScore >= 7
      ? "Sehr gut. Du kannst die Winterstrategien von Igel und Eichhoernchen sicher vergleichen."
      : "Gute Basis. Wiederhole die Lernabschnitte und teste dich erneut.";
    testNext.disabled = true;
    return;
  }

  renderCurrentTestQuestion();
}

function initTabs() {
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveTab(button.dataset.tab || "lernen");
    });
  });
}

function initLearnTasks() {
  renderAnimalTask();
  animalReset.addEventListener("click", renderAnimalTask);
  animalCheck.addEventListener("click", () => {
    checkSelectTask(animalList, currentAnimalItems.length, animalFeedback);
  });

  renderCompareTask();
  compareReset.addEventListener("click", renderCompareTask);
  compareCheck.addEventListener("click", () => {
    checkSelectTask(compareList, currentCompareItems.length, compareFeedback);
  });

  renderFactTask();
  factReset.addEventListener("click", renderFactTask);
  factCheck.addEventListener("click", () => {
    checkSelectTask(factList, currentFactItems.length, factFeedback);
  });
}

function initTraining() {
  renderTraining();
  trainGenerate.addEventListener("click", renderTraining);
  trainCheck.addEventListener("click", checkTraining);
}

function initTest() {
  updateTestScore();
  testStart.addEventListener("click", startTest);
  testNext.addEventListener("click", nextTestQuestion);
}

initTabs();
initLearnTasks();
initTraining();
initTest();
