const tabButtons = document.querySelectorAll(".uar-tab-btn");
const tabPanels = document.querySelectorAll(".uar-tab");

const placeList = document.getElementById("uarPlaceList");
const placeReset = document.getElementById("uarPlaceReset");
const placeCheck = document.getElementById("uarPlaceCheck");
const placeFeedback = document.getElementById("uarPlaceFeedback");

const compareList = document.getElementById("uarCompareList");
const compareReset = document.getElementById("uarCompareReset");
const compareCheck = document.getElementById("uarCompareCheck");
const compareFeedback = document.getElementById("uarCompareFeedback");

const factList = document.getElementById("uarFactList");
const factReset = document.getElementById("uarFactReset");
const factCheck = document.getElementById("uarFactCheck");
const factFeedback = document.getElementById("uarFactFeedback");

const trainCount = document.getElementById("uarTrainCount");
const trainGenerate = document.getElementById("uarTrainGenerate");
const trainCheck = document.getElementById("uarTrainCheck");
const trainList = document.getElementById("uarTrainList");
const trainFeedback = document.getElementById("uarTrainFeedback");

const testStart = document.getElementById("uarTestStart");
const testNext = document.getElementById("uarTestNext");
const testScore = document.getElementById("uarTestScore");
const testStatus = document.getElementById("uarTestStatus");
const testPrompt = document.getElementById("uarTestPrompt");
const testAnswers = document.getElementById("uarTestAnswers");
const testFeedback = document.getElementById("uarTestFeedback");

const placeItemsBase = [
  { prompt: "Grasfrosch", answer: "gewaesserboden" },
  { prompt: "Teichmolch", answer: "gewaesserboden" },
  { prompt: "Erdkroete", answer: "laub-steine" },
  { prompt: "Feuersalamander", answer: "laub-steine" },
  { prompt: "Ringelnatter", answer: "erdhoehlen-ritzen" },
  { prompt: "Blindschleiche", answer: "erdhoehlen-ritzen" },
  { prompt: "Zauneidechse", answer: "erdhoehlen-ritzen" },
  { prompt: "Landschildkroete", answer: "erdhoehlen-ritzen" },
];

const compareItemsBase = [
  { prompt: "Koerpertemperatur haengt von der Umgebung ab.", answer: "gemeinsamkeit" },
  { prompt: "Atmen im Winter vor allem ueber die Haut.", answer: "amphibien" },
  { prompt: "Leben nur an Land.", answer: "reptilien" },
  { prompt: "Suchen geschuetzte Plaetze und fallen in Winterruhe.", answer: "gemeinsamkeit" },
  { prompt: "Wandern im Fruehjahr oft zu Laichgewaessern.", answer: "amphibien" },
  { prompt: "Bleiben an Land und werden bei Waerme wieder aktiv.", answer: "reptilien" },
];

const factItemsBase = [
  { prompt: "Amphibien und Reptilien erzeugen genug eigene Koerperwaerme.", answer: "falsch" },
  { prompt: "Ohne Schutz koennen schon wenige Grad ueber 0 Grad gefaehrlich sein.", answer: "richtig" },
  { prompt: "Laub-, Stein- und Totholzhaufen sind wichtige Rueckzugsorte.", answer: "richtig" },
  { prompt: "Naturschutz ist fuer die Lebensraeume von Amphibien und Reptilien unwichtig.", answer: "falsch" },
];

const questionPool = [
  {
    prompt: "Warum fallen Amphibien und Reptilien in Winterruhe?",
    options: [
      "Weil sie als wechselwarme Tiere von der Umgebungstemperatur abhaengig sind",
      "Weil sie im Winter mehr Energie verbrauchen wollen",
      "Weil sie warmes Blut haben",
      "Weil sie nur nachts leben",
    ],
    answer: 0,
    explain: "Wechselwarme Tiere reagieren stark auf Kaelte und verlangsamen ihre Funktionen.",
  },
  {
    prompt: "Welche Aussage passt zu Amphibien in der Ueberwinterung?",
    options: [
      "Sie suchen oft Gewaesserboden oder feuchte Verstecke auf",
      "Sie bleiben nur in Baumkronen",
      "Sie fliegen in den Sueden",
      "Sie halten ihre Temperatur konstant",
    ],
    answer: 0,
    explain: "Viele Amphibien ueberwintern im Schlamm oder in feuchten Verstecken.",
  },
  {
    prompt: "Welche Aussage passt zu Reptilien in der Ueberwinterung?",
    options: [
      "Sie suchen frostfreie Verstecke wie Erdhoehlen oder Maueritzen",
      "Sie ueberwintern nur im offenen Wasser",
      "Sie sind im Winter besonders aktiv",
      "Sie atmen im Winter nur ueber die Haut",
    ],
    answer: 0,
    explain: "Reptilien ziehen sich in geschuetzte, frostfreie Verstecke zurueck.",
  },
  {
    prompt: "Was ist eine Gemeinsamkeit von Amphibien und Reptilien?",
    options: [
      "Beide sind wechselwarm und verlangsamen lebenswichtige Funktionen im Winter",
      "Beide sind gleichwarm",
      "Beide legen nur Eier im Wasser",
      "Beide leben nur in Gewaessern",
    ],
    answer: 0,
    explain: "Beide Gruppen sind wechselwarm und sparen im Winter Energie.",
  },
  {
    prompt: "Welches Tier gehoert zu den Amphibien?",
    options: ["Ringelnatter", "Zauneidechse", "Teichmolch", "Blindschleiche"],
    answer: 2,
    explain: "Der Teichmolch ist ein Amphibium.",
  },
  {
    prompt: "Welches Tier gehoert zu den Reptilien?",
    options: ["Feuersalamander", "Erdkroete", "Ringelnatter", "Grasfrosch"],
    answer: 2,
    explain: "Die Ringelnatter ist ein Reptil.",
  },
  {
    prompt: "Was passiert in der Winterruhe?",
    options: [
      "Atmung, Herzschlag und Stoffwechsel werden langsamer",
      "Alle Funktionen werden schneller",
      "Die Tiere wachsen besonders schnell",
      "Die Tiere bleiben dauerhaft wach",
    ],
    answer: 0,
    explain: "In der Winterruhe werden Koerperfunktionen heruntergefahren.",
  },
  {
    prompt: "Warum sind Laub- und Steinhaufen wichtig?",
    options: [
      "Sie bieten geschuetzte Ueberwinterungsplaetze",
      "Sie sind nur fuer Pflanzen wichtig",
      "Sie waermen Tiere dauerhaft auf 25 Grad",
      "Sie verhindern jede Feuchtigkeit",
    ],
    answer: 0,
    explain: "Diese Strukturen bieten Schutz vor Kaelte und Austrocknung.",
  },
  {
    prompt: "Welche Aussage ist richtig?",
    options: [
      "Amphibien stehen im Winter oft mit Gewaessern in Verbindung",
      "Reptilien ueberwintern nur im Wasser",
      "Amphibien sind im Winter immer aktiv",
      "Reptilien erzeugen im Winter viel eigene Waerme",
    ],
    answer: 0,
    explain: "Amphibien nutzen haeufig feuchte oder gewaessernahen Bereiche.",
  },
  {
    prompt: "Wozu dient der Naturschutz bei Amphibien und Reptilien?",
    options: [
      "Zum Erhalt wichtiger Lebensraeume und Rueckzugsorte",
      "Nur zur Dekoration von Gaerten",
      "Er ist fuer diese Tiergruppen unnoetig",
      "Nur fuer exotische Arten",
    ],
    answer: 0,
    explain: "Ohne geeignete Lebensraeume ist Ueberwinterung kaum moeglich.",
  },
  {
    prompt: "Wann werden Amphibien und Reptilien meist wieder aktiver?",
    options: ["Im Fruehjahr bei waermeren Temperaturen", "Mitten im Winter", "Nur nachts im Januar", "Nie wieder"],
    answer: 0,
    explain: "Mit steigenden Temperaturen nimmt die Aktivitaet wieder zu.",
  },
  {
    prompt: "Welche Aussage beschreibt wechselwarm korrekt?",
    options: [
      "Die Koerpertemperatur folgt der Umgebung",
      "Die Koerpertemperatur bleibt immer konstant",
      "Nur Reptilien sind wechselwarm, Amphibien nicht",
      "Wechselwarm bedeutet gleichwarm",
    ],
    answer: 0,
    explain: "Bei wechselwarmen Tieren ist die Koerpertemperatur umgebungsabhaengig.",
  },
];

let currentPlaceItems = [];
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
    row.className = "uar-task-item";

    const label = document.createElement("label");
    label.setAttribute("for", `${targetList.id}-${index}`);
    label.textContent = item.prompt;

    const select = document.createElement("select");
    select.id = `${targetList.id}-${index}`;
    select.className = "uar-select";
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
  const rows = [...targetList.querySelectorAll(".uar-task-item")];
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

function renderPlaceTask() {
  currentPlaceItems = renderSelectTask(placeList, placeItemsBase, [
    { value: "", text: "Ueberwinterungsplatz waehlen" },
    { value: "gewaesserboden", text: "Gewaesserboden/Schlamm" },
    { value: "laub-steine", text: "Unter Laub und Steinen" },
    { value: "erdhoehlen-ritzen", text: "Erdhoehlen/Steinritzen/Kompost" },
  ]);
  placeFeedback.textContent = "Noch nicht geprueft.";
}

function renderCompareTask() {
  currentCompareItems = renderSelectTask(compareList, compareItemsBase, [
    { value: "", text: "Kategorie waehlen" },
    { value: "gemeinsamkeit", text: "Gemeinsamkeit" },
    { value: "amphibien", text: "Amphibien" },
    { value: "reptilien", text: "Reptilien" },
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
    task.className = "uar-task-item";
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
      radio.name = `uar-train-${qIndex}`;
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

  const tasks = [...trainList.querySelectorAll(".uar-task-item")];
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
    button.className = "uar-choice-btn";
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

      const buttons = [...testAnswers.querySelectorAll(".uar-choice-btn")];
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
      ? "Sehr gut. Du beherrschst die Ueberwinterung von Amphibien und Reptilien."
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
  renderPlaceTask();
  placeReset.addEventListener("click", renderPlaceTask);
  placeCheck.addEventListener("click", () => {
    checkSelectTask(placeList, currentPlaceItems.length, placeFeedback);
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
