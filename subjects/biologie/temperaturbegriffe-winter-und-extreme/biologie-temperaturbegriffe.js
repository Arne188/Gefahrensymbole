const tabButtons = document.querySelectorAll(".btg-tab-btn");
const tabPanels = document.querySelectorAll(".btg-tab");

const termButtons = document.querySelectorAll(".btg-chip");
const termSlice = document.getElementById("btgTermSlice");
const termTitle = document.getElementById("btgTermTitle");
const termText = document.getElementById("btgTermText");
const termFacts = document.getElementById("btgTermFacts");

const matchList = document.getElementById("btgMatchList");
const matchReset = document.getElementById("btgMatchReset");
const matchCheck = document.getElementById("btgMatchCheck");
const matchFeedback = document.getElementById("btgMatchFeedback");

const animalType = document.getElementById("btgAnimalType");
const tempSlider = document.getElementById("btgTempSlider");
const tempValue = document.getElementById("btgTempValue");
const decisionTitle = document.getElementById("btgDecisionTitle");
const decisionText = document.getElementById("btgDecisionText");
const decisionFacts = document.getElementById("btgDecisionFacts");

const scenarioList = document.getElementById("btgScenarioList");
const scenarioReset = document.getElementById("btgScenarioReset");
const scenarioCheck = document.getElementById("btgScenarioCheck");
const scenarioFeedback = document.getElementById("btgScenarioFeedback");

const trainCount = document.getElementById("btgTrainCount");
const trainGenerate = document.getElementById("btgTrainGenerate");
const trainCheck = document.getElementById("btgTrainCheck");
const trainList = document.getElementById("btgTrainList");
const trainFeedback = document.getElementById("btgTrainFeedback");

const testStart = document.getElementById("btgTestStart");
const testNext = document.getElementById("btgTestNext");
const testScore = document.getElementById("btgTestScore");
const testStatus = document.getElementById("btgTestStatus");
const testPrompt = document.getElementById("btgTestPrompt");
const testAnswers = document.getElementById("btgTestAnswers");
const testFeedback = document.getElementById("btgTestFeedback");

const termInfo = {
  winterschlaf: {
    title: "Winterschlaf",
    text: "Tiefe Inaktivitaet ueber laengere Zeit mit stark abgesenkten Koerperfunktionen.",
    slice: "slices/teil-2-winterschlaf.png",
    facts: [
      "Koerpertemperatur sinkt deutlich.",
      "Herzschlag und Atmung sind stark reduziert.",
      "Energie aus Fettreserven.",
      "Beispiele: Igel, Siebenschlaefer, Fledermaus.",
    ],
  },
  winterruhe: {
    title: "Winterruhe",
    text: "Inaktivitaet mit regelmaessigen Wachphasen; Koerperfunktionen sinken nur moderat.",
    slice: "slices/teil-3-winterruhe.png",
    facts: [
      "Weniger tief als Winterschlaf.",
      "Tiere wachen haeufiger auf.",
      "Nahrung kann zeitweise aufgenommen werden.",
      "Beispiele: Dachs, Eichhoernchen (reduzierte Aktivitaet).",
    ],
  },
  waermestarre: {
    title: "Waermestarre",
    text: "Starrezustand durch zu hohe Temperaturen bei wechselwarmen Tieren (auch als Hitzestarre bezeichnet).",
    slice: "slices/teil-4-waermestarre.png",
    facts: [
      "Bewegung und Reaktionsfaehigkeit brechen ein.",
      "Starker Hitzestress des Organismus.",
      "Kann in Hitzetod uebergehen, wenn keine Kuehlung moeglich ist.",
    ],
  },
  hitzetod: {
    title: "Hitzetod",
    text: "Tod durch uebermaessige Erwaermung, wenn lebenswichtige Funktionen versagen.",
    slice: "slices/teil-5-hitzetod.png",
    facts: [
      "Extreme Belastung von Kreislauf, Atmung und Zellfunktionen.",
      "Risiko steigt bei fehlendem Schatten/Wasser.",
      "Praevention durch geeignete Lebensraumstrukturen.",
    ],
  },
  kaeltestarre: {
    title: "Kaeltestarre",
    text: "Starrezustand wechselwarmer Tiere bei niedrigen Temperaturen.",
    slice: "slices/teil-6-kaeltestarre.png",
    facts: [
      "Koerpertemperatur folgt der Umgebung.",
      "Bewegung und Stoffwechsel stark reduziert.",
      "Typisch bei Amphibien, Reptilien und vielen Insekten.",
    ],
  },
  kaeltetod: {
    title: "Kaeltetod",
    text: "Tod infolge extremer Kaelte, wenn Schutzmechanismen oder Rueckzugsorte fehlen.",
    slice: "slices/teil-7-kaeltetod.png",
    facts: [
      "Gefahr durch Durchfrieren und Funktionsausfall.",
      "Betroffen sind besonders ungeschuetzte Tiere.",
      "Lebensraeume mit Verstecken senken das Risiko.",
    ],
  },
};

const matchItemsBase = [
  { prompt: "Tiefer Energiesparzustand mit stark reduzierter Atmung und Herzfrequenz.", answer: "winterschlaf" },
  { prompt: "Inaktiv, aber mit regelmaessigem Aufwachen.", answer: "winterruhe" },
  { prompt: "Starrezustand wechselwarmer Tiere bei Kaltbedingungen.", answer: "kaeltestarre" },
  { prompt: "Tod durch extreme Kaelte.", answer: "kaeltetod" },
  { prompt: "Starrezustand durch zu hohe Temperaturen.", answer: "waermestarre" },
  { prompt: "Tod durch uebermaessige Erwaermung.", answer: "hitzetod" },
];

const scenarioItemsBase = [
  {
    prompt: "Ein Igel schlaeft mehrere Monate im geschuetzten Nest und lebt von Fettreserven.",
    answer: "winterschlaf",
  },
  {
    prompt: "Ein Dachs ist im Winter deutlich weniger aktiv, wacht aber immer wieder auf.",
    answer: "winterruhe",
  },
  {
    prompt: "Eine Eidechse wird bei starker Kaelte unbeweglich und reagiert kaum.",
    answer: "kaeltestarre",
  },
  {
    prompt: "Ein ungeschuetztes Tier uebersteht eine lange Frostphase nicht.",
    answer: "kaeltetod",
  },
  {
    prompt: "Ein wechselwarmes Tier wird bei extremer Sommerhitze bewegungsunfaehig.",
    answer: "waermestarre",
  },
  {
    prompt: "Bei lang anhaltender extremer Hitze versagen lebenswichtige Funktionen.",
    answer: "hitzetod",
  },
];

const questionPool = [
  {
    prompt: "Was beschreibt Winterschlaf am besten?",
    options: [
      "Tiefer Ruhezustand mit stark abgesenkten Koerperfunktionen",
      "Normale Aktivitaet im Winter",
      "Tod durch Kaelte",
      "Starre durch Hitze",
    ],
    answer: 0,
    explain: "Winterschlaf bedeutet tiefe Inaktivitaet mit stark reduziertem Stoffwechsel.",
  },
  {
    prompt: "Was unterscheidet Winterruhe vom Winterschlaf?",
    options: [
      "Bei Winterruhe wachen Tiere regelmaessiger auf",
      "Bei Winterruhe sinkt die Temperatur staerker",
      "Winterruhe tritt nur bei Reptilien auf",
      "Es gibt keinen Unterschied",
    ],
    answer: 0,
    explain: "Winterruhe ist weniger tief; Tiere werden zwischendurch aktiv.",
  },
  {
    prompt: "Welche Aussage passt zur Kaeltestarre?",
    options: [
      "Wechselwarme Tiere werden bei Kaelte kaum beweglich",
      "Gleichwarme Tiere schlafen immer",
      "Das Tier stirbt sofort",
      "Es geht um Hitze",
    ],
    answer: 0,
    explain: "Kaeltestarre betrifft besonders wechselwarme Tiere.",
  },
  {
    prompt: "Welche Aussage passt zu Waermestarre?",
    options: [
      "Starrezustand durch zu hohe Temperaturen",
      "Tod durch Kaelte",
      "Normale Tagesruhe",
      "Winterschlaf bei Saeugetieren",
    ],
    answer: 0,
    explain: "Waermestarre ist ein Hitzestress-Zustand bei wechselwarmen Tieren.",
  },
  {
    prompt: "Was ist Hitzetod?",
    options: [
      "Tod durch extreme Erwaermung",
      "Starre bei moderater Temperatur",
      "Wiederaufwachen aus Winterruhe",
      "Normales Ueberwinterungsverhalten",
    ],
    answer: 0,
    explain: "Beim Hitzetod versagen lebenswichtige Funktionen durch extreme Hitze.",
  },
  {
    prompt: "Was ist Kaeltetod?",
    options: [
      "Tod durch extreme Kaelte",
      "Kaeltestarre mit spaeterem Aufwachen",
      "Winterruhe beim Dachs",
      "Aktives Sucheverhalten im Winter",
    ],
    answer: 0,
    explain: "Kaeltetod bedeutet, dass der Organismus die Kaelte nicht ueberlebt.",
  },
  {
    prompt: "Welche Gruppe ist besonders haeufig von Starrezustaenden betroffen?",
    options: ["wechselwarme Tiere", "alle Saeugetiere", "nur Voegel", "nur Menschen"],
    answer: 0,
    explain: "Starrezustaende sind typisch bei wechselwarmen Tieren.",
  },
  {
    prompt: "Welche Zuordnung ist korrekt?",
    options: [
      "Igel - Winterschlaf",
      "Igel - Hitzetod",
      "Igel - Waermestarre",
      "Igel - Kaeltestarre als Regel",
    ],
    answer: 0,
    explain: "Der Igel gilt als typisches Beispiel fuer Winterschlaf.",
  },
  {
    prompt: "Warum sind geschuetzte Rueckzugsorte biologisch wichtig?",
    options: [
      "Sie senken das Risiko von Kaelte- oder Hitzetod",
      "Sie verhindern jede Form von Aktivitaet",
      "Sie machen alle Tiere gleichwarm",
      "Sie ersetzen Nahrung",
    ],
    answer: 0,
    explain: "Verstecke puffern Extremtemperaturen und schuetzen vor Stress.",
  },
  {
    prompt: "Welche Begriffe bilden ein sinnvolles Gegensatzpaar?",
    options: [
      "Kaeltestarre und Waermestarre",
      "Winterschlaf und Winterruhe als exakt gleich",
      "Hitzetod und Winterschlaf",
      "Kaeltetod und Winterruhe als Synonyme",
    ],
    answer: 0,
    explain: "Kaeltestarre und Waermestarre beschreiben Starre durch unterschiedliche Extreme.",
  },
  {
    prompt: "Was ist fuer die Fachsprache wichtig?",
    options: [
      "Begriffe passend zur Situation nutzen",
      "Alle Begriffe als gleich behandeln",
      "Nur einen Begriff fuer alles verwenden",
      "Definitionen ignorieren",
    ],
    answer: 0,
    explain: "Biologische Begriffe muessen praezise verwendet werden.",
  },
  {
    prompt: "Welche Situation passt am besten zu Winterruhe?",
    options: [
      "Tier reduziert Aktivitaet, wacht aber regelmaessig auf",
      "Tier ist monatelang ohne Aufwachen in tiefer Inaktivitaet",
      "Tier stirbt an Kaelte",
      "Tier gerat durch Hitze in Starre",
    ],
    answer: 0,
    explain: "Winterruhe ist leichter als Winterschlaf und hat Wachphasen.",
  },
];

let currentMatchItems = [];
let currentScenarioItems = [];
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

function setTerm(termKey) {
  const info = termInfo[termKey] || termInfo.winterschlaf;
  termButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.term === termKey);
  });

  termTitle.textContent = info.title;
  termText.textContent = info.text;
  if (termSlice instanceof HTMLImageElement) {
    termSlice.src = info.slice;
    termSlice.alt = `Grafikausschnitt: ${info.title}`;
  }
  termFacts.replaceChildren();
  info.facts.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    termFacts.append(li);
  });
}

function renderSelectTask(targetList, sourceItems, choices) {
  const selected = shuffle(sourceItems);
  targetList.replaceChildren();

  selected.forEach((item, index) => {
    const row = document.createElement("article");
    row.className = "btg-task-item";

    const label = document.createElement("label");
    label.setAttribute("for", `${targetList.id}-${index}`);
    label.textContent = item.prompt;

    const select = document.createElement("select");
    select.id = `${targetList.id}-${index}`;
    select.className = "btg-select";
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

  return selected;
}

function checkSelectTask(targetList, count, feedbackNode) {
  const rows = [...targetList.querySelectorAll(".btg-task-item")];
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
  feedbackNode.textContent = `Richtig: ${correct} von ${count}.`;
}

function renderMatchTask() {
  currentMatchItems = renderSelectTask(matchList, matchItemsBase, [
    { value: "", text: "Begriff waehlen" },
    { value: "winterschlaf", text: "Winterschlaf" },
    { value: "winterruhe", text: "Winterruhe" },
    { value: "waermestarre", text: "Waermestarre" },
    { value: "hitzetod", text: "Hitzetod" },
    { value: "kaeltestarre", text: "Kaeltestarre" },
    { value: "kaeltetod", text: "Kaeltetod" },
  ]);
  matchFeedback.textContent = "Noch nicht geprueft.";
}

function renderScenarioTask() {
  currentScenarioItems = renderSelectTask(scenarioList, scenarioItemsBase, [
    { value: "", text: "Begriff waehlen" },
    { value: "winterschlaf", text: "Winterschlaf" },
    { value: "winterruhe", text: "Winterruhe" },
    { value: "waermestarre", text: "Waermestarre" },
    { value: "hitzetod", text: "Hitzetod" },
    { value: "kaeltestarre", text: "Kaeltestarre" },
    { value: "kaeltetod", text: "Kaeltetod" },
  ]);
  scenarioFeedback.textContent = "Noch nicht geprueft.";
}

function updateTemperatureDecision() {
  const t = Number(tempSlider.value);
  const type = animalType.value;
  tempValue.textContent = `${t} C`;

  let result = {
    title: "Normale Aktivitaet",
    text: "Keine typische Starre- oder Todessituation.",
    facts: ["Beobachte immer Art und Situation im Kontext."],
  };

  if (type === "gleichwarm") {
    if (t <= -15) {
      result = {
        title: "Kaeltetod (Risikozone)",
        text: "Ohne Schutz kann extreme Kaelte lebensbedrohlich werden.",
        facts: ["Rueckzugsorte und Energieversorgung sind entscheidend."],
      };
    } else if (t <= 5) {
      result = {
        title: "Winterschlaf / Winterruhe moeglich",
        text: "Viele gleichwarme Tiere senken Aktivitaet und Energieverbrauch.",
        facts: ["Je nach Art tiefer Winterschlaf oder leichtere Winterruhe."],
      };
    } else if (t >= 40) {
      result = {
        title: "Hitzetod (Risikozone)",
        text: "Sehr hohe Temperaturen koennen lebenswichtige Funktionen ueberlasten.",
        facts: ["Schatten, Wasser und Verhalten zur Kuehlung sind wichtig."],
      };
    }
  } else {
    if (t <= -5) {
      result = {
        title: "Kaeltetod (Risikozone)",
        text: "Zu starke Auskuehlung kann ueber das tolerierbare Mass hinausgehen.",
        facts: ["Ungeschuetzte Tiere sind besonders gefaehrdet."],
      };
    } else if (t <= 8) {
      result = {
        title: "Kaeltestarre",
        text: "Wechselwarme Tiere koennen in Kaeltestarre fallen.",
        facts: ["Bewegung und Stoffwechsel werden stark reduziert."],
      };
    } else if (t >= 34 && t < 42) {
      result = {
        title: "Waermestarre",
        text: "Zu hohe Temperaturen fuehren bei manchen wechselwarmen Tieren zu Starrezustaenden.",
        facts: ["Ohne Kuehlung steigt das Risiko schwerer Schaeden."],
      };
    } else if (t >= 42) {
      result = {
        title: "Hitzetod (Risikozone)",
        text: "Extreme Hitze kann lebenswichtige Prozesse entgleisen lassen.",
        facts: ["Hitzetod ist moeglich, wenn keine Flucht in kuehlere Bereiche gelingt."],
      };
    }
  }

  decisionTitle.textContent = result.title;
  decisionText.textContent = result.text;
  decisionFacts.replaceChildren();
  result.facts.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    decisionFacts.append(li);
  });
}

function renderTraining() {
  const count = Number(trainCount.value) || 10;
  currentTrainingQuestions = sample(questionPool, count);
  trainList.replaceChildren();

  currentTrainingQuestions.forEach((question, qIndex) => {
    const task = document.createElement("article");
    task.className = "btg-task-item";
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
      radio.name = `btg-train-${qIndex}`;
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

  const tasks = [...trainList.querySelectorAll(".btg-task-item")];
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
    button.className = "btg-choice-btn";
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

      const buttons = [...testAnswers.querySelectorAll(".btg-choice-btn")];
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
      ? "Sehr gut. Du verwendest die Temperaturbegriffe sicher."
      : "Gute Basis. Wiederhole die Begriffsdefinitionen und teste dich erneut.";
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

function initTermExplorer() {
  setTerm("winterschlaf");
  termButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setTerm(button.dataset.term || "winterschlaf");
    });
  });
}

function initLearnTasks() {
  renderMatchTask();
  matchReset.addEventListener("click", renderMatchTask);
  matchCheck.addEventListener("click", () => {
    checkSelectTask(matchList, currentMatchItems.length, matchFeedback);
  });

  updateTemperatureDecision();
  animalType.addEventListener("change", updateTemperatureDecision);
  tempSlider.addEventListener("input", updateTemperatureDecision);

  renderScenarioTask();
  scenarioReset.addEventListener("click", renderScenarioTask);
  scenarioCheck.addEventListener("click", () => {
    checkSelectTask(scenarioList, currentScenarioItems.length, scenarioFeedback);
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
initTermExplorer();
initLearnTasks();
initTraining();
initTest();
