const tabButtons = document.querySelectorAll(".btw-tab-btn");
const tabPanels = document.querySelectorAll(".btw-tab");

const warmthList = document.getElementById("btwWarmthList");
const warmthReset = document.getElementById("btwWarmthReset");
const warmthCheck = document.getElementById("btwWarmthCheck");
const warmthFeedback = document.getElementById("btwWarmthFeedback");

const strategyPrev = document.getElementById("btwStrategyPrev");
const strategyNext = document.getElementById("btwStrategyNext");
const strategyProgress = document.getElementById("btwStrategyProgress");
const strategyButtons = document.querySelectorAll(".btw-step-btn");
const strategyTitle = document.getElementById("btwStrategyTitle");
const strategyText = document.getElementById("btwStrategyText");
const strategyFacts = document.getElementById("btwStrategyFacts");

const assignList = document.getElementById("btwAssignList");
const assignReset = document.getElementById("btwAssignReset");
const assignCheck = document.getElementById("btwAssignCheck");
const assignFeedback = document.getElementById("btwAssignFeedback");

const trainCount = document.getElementById("btwTrainCount");
const trainGenerate = document.getElementById("btwTrainGenerate");
const trainCheck = document.getElementById("btwTrainCheck");
const trainList = document.getElementById("btwTrainList");
const trainFeedback = document.getElementById("btwTrainFeedback");

const testStart = document.getElementById("btwTestStart");
const testNext = document.getElementById("btwTestNext");
const testScore = document.getElementById("btwTestScore");
const testStatus = document.getElementById("btwTestStatus");
const testPrompt = document.getElementById("btwTestPrompt");
const testAnswers = document.getElementById("btwTestAnswers");
const testFeedback = document.getElementById("btwTestFeedback");

const warmthItems = [
  { statement: "Amsel", answer: "gleichwarm" },
  { statement: "Frosch", answer: "wechselwarm" },
  { statement: "Igel", answer: "gleichwarm" },
  { statement: "Eidechse", answer: "wechselwarm" },
  { statement: "Eichhoernchen", answer: "gleichwarm" },
  { statement: "Marienkaefer", answer: "wechselwarm" },
];

const strategyStages = [
  {
    title: "Winterruhe",
    text: "Tiere sind weniger aktiv, wachen aber regelmaessig auf. Die Koerpertemperatur sinkt nur leicht.",
    facts: [
      "Beispiele: Dachs, Waschbaer, Eichhoernchen.",
      "Nahrung wird weiterhin aufgenommen, wenn moeglich.",
      "Die Tiere bleiben reaktionsfaehiger als beim Winterschlaf.",
    ],
  },
  {
    title: "Winterschlaf",
    text: "Tiere schlafen ueber laengere Zeit. Koerpertemperatur, Herzschlag und Atmung sind stark gesenkt.",
    facts: [
      "Beispiele: Igel, Siebenschlaefer, Fledermaus.",
      "Energie kommt vor allem aus Fettreserven.",
      "Aufwachen kostet viel Energie und ist deshalb selten.",
    ],
  },
  {
    title: "Winterstarre",
    text: "Wechselwarme Tiere fallen bei Kaelte in Starre. Ihre Koerpertemperatur folgt der Umgebung.",
    facts: [
      "Beispiele: Frosch, Eidechse, viele Insekten.",
      "Kein aktiver Stoffwechsel wie bei gleichwarmen Tieren.",
      "Aktivitaet steigt erst wieder bei waermeren Temperaturen.",
    ],
  },
];

const assignItemsBase = [
  { animal: "Igel", answer: "winterschlaf" },
  { animal: "Siebenschlaefer", answer: "winterschlaf" },
  { animal: "Fledermaus", answer: "winterschlaf" },
  { animal: "Dachs", answer: "winterruhe" },
  { animal: "Eichhoernchen", answer: "winterruhe" },
  { animal: "Frosch", answer: "winterstarre" },
  { animal: "Eidechse", answer: "winterstarre" },
  { animal: "Marienkaefer", answer: "winterstarre" },
];

const questionPool = [
  {
    prompt: "Was bedeutet gleichwarm?",
    options: [
      "Die Koerpertemperatur bleibt weitgehend konstant.",
      "Die Koerpertemperatur ist immer wie die Umgebung.",
      "Das Tier kann nicht frieren.",
      "Das Tier ist nur im Sommer aktiv.",
    ],
    answer: 0,
    explain: "Gleichwarme Tiere halten ihre Koerpertemperatur weitgehend konstant.",
  },
  {
    prompt: "Was bedeutet wechselwarm?",
    options: [
      "Das Tier ist immer gleich warm.",
      "Die Koerpertemperatur passt sich der Umgebung an.",
      "Das Tier faellt immer in Winterschlaf.",
      "Das Tier lebt nur im Wasser.",
    ],
    answer: 1,
    explain: "Wechselwarme Tiere haben eine stark umgebungsabhaengige Koerpertemperatur.",
  },
  {
    prompt: "Welche Aussage passt zu Winterruhe?",
    options: [
      "Sehr tiefer Schlaf ohne Aufwachen.",
      "Kaum Aktivitaet, aber regelmaessiges Aufwachen.",
      "Koerpertemperatur immer exakt wie Aussenluft.",
      "Nur fuer Reptilien typisch.",
    ],
    answer: 1,
    explain: "Winterruhe bedeutet reduzierte Aktivitaet mit regelmaessigen Wachphasen.",
  },
  {
    prompt: "Welche Aussage passt zu Winterschlaf?",
    options: [
      "Stoffwechsel ist stark abgesenkt.",
      "Das Tier sucht jeden Tag aktiv Futter.",
      "Nur wechselwarme Tiere schlafen so.",
      "Koerpertemperatur bleibt wie im Sommer.",
    ],
    answer: 0,
    explain: "Beim Winterschlaf sind Koerperfunktionen stark reduziert.",
  },
  {
    prompt: "Welche Aussage passt zu Winterstarre?",
    options: [
      "Nur Saeugetiere zeigen sie.",
      "Das Tier bleibt aktiv und jagt weiter.",
      "Koerpertemperatur folgt der Umgebung.",
      "Sie hat nichts mit Kaelte zu tun.",
    ],
    answer: 2,
    explain: "Winterstarre tritt bei wechselwarmen Tieren auf, deren Temperatur mit der Umgebung sinkt.",
  },
  {
    prompt: "Welches Tier ist typischer Winterschlaefer?",
    options: ["Igel", "Amsel", "Dachs", "Reh"],
    answer: 0,
    explain: "Der Igel ist ein typischer Winterschlaefer.",
  },
  {
    prompt: "Welches Tier wird meist Winterruhe zugeordnet?",
    options: ["Dachs", "Frosch", "Eidechse", "Marienkaefer"],
    answer: 0,
    explain: "Der Dachs zeigt in der Regel Winterruhe.",
  },
  {
    prompt: "Welches Tier ist typischerweise wechselwarm?",
    options: ["Igel", "Amsel", "Frosch", "Eichhoernchen"],
    answer: 2,
    explain: "Der Frosch ist wechselwarm.",
  },
  {
    prompt: "Warum sind Winterstrategien wichtig?",
    options: [
      "Sie sparen Energie bei Kaelte und Nahrungsmangel.",
      "Sie machen Tiere immer schneller.",
      "Sie verhindern jede Bewegung komplett.",
      "Sie gelten nur fuer Haustiere.",
    ],
    answer: 0,
    explain: "Winterstrategien helfen, Energie zu sparen und bis zum Fruehjahr zu ueberleben.",
  },
  {
    prompt: "Welche Kombination ist korrekt?",
    options: [
      "Winterschlaf - Igel",
      "Winterstarre - Dachs",
      "Winterruhe - Eidechse",
      "wechselwarm - Amsel",
    ],
    answer: 0,
    explain: "Igel wird dem Winterschlaf zugeordnet.",
  },
  {
    prompt: "Was unterscheidet Winterschlaf und Winterruhe besonders?",
    options: [
      "Bei Winterschlaf sind Koerperfunktionen staerker abgesenkt.",
      "Bei Winterruhe sinkt die Temperatur immer auf 0 Grad.",
      "Winterschlaf betrifft nur Fische.",
      "Es gibt keinen Unterschied.",
    ],
    answer: 0,
    explain: "Winterschlaf geht mit deutlich tieferer Absenkung der Koerperfunktionen einher.",
  },
  {
    prompt: "Welche Aussage zur Anpassung an Kaelte stimmt?",
    options: [
      "Dichtes Fell und Fettreserven koennen schuetzen.",
      "Tiere haben keine Anpassungen.",
      "Nur Pflanzen passen sich an.",
      "Anpassungen sind im Winter unnoetig.",
    ],
    answer: 0,
    explain: "Viele Tiere zeigen sowohl verhaltensbezogene als auch koerperliche Anpassungen.",
  },
];

let strategyIndex = 0;
let currentAssignItems = [];
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

function renderWarmthTask() {
  warmthList.replaceChildren();

  warmthItems.forEach((item, index) => {
    const row = document.createElement("article");
    row.className = "btw-task-item";

    const label = document.createElement("label");
    label.setAttribute("for", `btw-warm-${index}`);
    label.textContent = item.statement;

    const select = document.createElement("select");
    select.id = `btw-warm-${index}`;
    select.className = "btw-select";
    select.dataset.answer = item.answer;

    [
      { value: "", text: "Bitte auswaehlen" },
      { value: "gleichwarm", text: "gleichwarm" },
      { value: "wechselwarm", text: "wechselwarm" },
    ].forEach((choice) => {
      const option = document.createElement("option");
      option.value = choice.value;
      option.textContent = choice.text;
      select.append(option);
    });

    row.append(label, select);
    warmthList.append(row);
  });

  warmthFeedback.textContent = "Noch nicht geprueft.";
}

function checkWarmthTask() {
  const rows = [...warmthList.querySelectorAll(".btw-task-item")];
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
    warmthFeedback.textContent = "Bitte zuerst mindestens eine Zuordnung waehlen.";
    return;
  }
  warmthFeedback.textContent = `Richtig: ${correct} von ${warmthItems.length}.`;
}

function renderStrategy(index) {
  const stage = strategyStages[index] || strategyStages[0];
  strategyTitle.textContent = stage.title;
  strategyText.textContent = stage.text;
  strategyFacts.replaceChildren();

  stage.facts.forEach((fact) => {
    const li = document.createElement("li");
    li.textContent = fact;
    strategyFacts.append(li);
  });
}

function setStrategyIndex(nextIndex) {
  const maxIndex = strategyStages.length - 1;
  strategyIndex = Math.max(0, Math.min(maxIndex, nextIndex));
  renderStrategy(strategyIndex);

  if (strategyProgress instanceof HTMLElement) {
    strategyProgress.textContent = `Strategie ${strategyIndex + 1} von ${strategyStages.length}`;
  }
  if (strategyPrev instanceof HTMLButtonElement) {
    strategyPrev.disabled = strategyIndex === 0;
  }
  if (strategyNext instanceof HTMLButtonElement) {
    strategyNext.disabled = strategyIndex === maxIndex;
  }

  strategyButtons.forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.strategyIndex) === strategyIndex);
  });
}

function renderAssignTask() {
  assignList.replaceChildren();
  currentAssignItems = shuffle(assignItemsBase);

  currentAssignItems.forEach((item, index) => {
    const row = document.createElement("article");
    row.className = "btw-task-item";
    row.dataset.index = String(index);

    const label = document.createElement("label");
    label.setAttribute("for", `btw-assign-${index}`);
    label.textContent = item.animal;

    const select = document.createElement("select");
    select.id = `btw-assign-${index}`;
    select.className = "btw-select";
    select.dataset.answer = item.answer;

    [
      { value: "", text: "Strategie waehlen" },
      { value: "winterruhe", text: "Winterruhe" },
      { value: "winterschlaf", text: "Winterschlaf" },
      { value: "winterstarre", text: "Winterstarre" },
    ].forEach((choice) => {
      const option = document.createElement("option");
      option.value = choice.value;
      option.textContent = choice.text;
      select.append(option);
    });

    row.append(label, select);
    assignList.append(row);
  });

  assignFeedback.textContent = "Noch nicht geprueft.";
}

function checkAssignTask() {
  const rows = [...assignList.querySelectorAll(".btw-task-item")];
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
    assignFeedback.textContent = "Bitte zuerst mindestens eine Zuordnung waehlen.";
    return;
  }
  assignFeedback.textContent = `Richtig: ${correct} von ${currentAssignItems.length}.`;
}

function renderTraining() {
  const count = Number(trainCount.value) || 10;
  currentTrainingQuestions = sample(questionPool, count);
  trainList.replaceChildren();

  currentTrainingQuestions.forEach((question, qIndex) => {
    const task = document.createElement("article");
    task.className = "btw-task-item";
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
      radio.name = `btw-train-${qIndex}`;
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

  const tasks = [...trainList.querySelectorAll(".btw-task-item")];
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
    trainFeedback.textContent = "Bitte zuerst mindestens eine Antwort auswaehlen.";
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
    button.className = "btw-choice-btn";
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

      const buttons = [...testAnswers.querySelectorAll(".btw-choice-btn")];
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
      ? "Sehr gut. Du kannst die Winterstrategien sicher unterscheiden."
      : "Gute Basis. Wiederhole die Lernstationen und starte den Test erneut.";
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

function initWarmth() {
  renderWarmthTask();
  warmthReset.addEventListener("click", renderWarmthTask);
  warmthCheck.addEventListener("click", checkWarmthTask);
}

function initStrategy() {
  setStrategyIndex(0);

  strategyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setStrategyIndex(Number(button.dataset.strategyIndex));
    });
  });

  if (strategyPrev instanceof HTMLButtonElement) {
    strategyPrev.addEventListener("click", () => {
      setStrategyIndex(strategyIndex - 1);
    });
  }

  if (strategyNext instanceof HTMLButtonElement) {
    strategyNext.addEventListener("click", () => {
      setStrategyIndex(strategyIndex + 1);
    });
  }
}

function initAssign() {
  renderAssignTask();
  assignReset.addEventListener("click", renderAssignTask);
  assignCheck.addEventListener("click", checkAssignTask);
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
initWarmth();
initStrategy();
initAssign();
initTraining();
initTest();
