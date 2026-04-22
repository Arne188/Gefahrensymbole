const tabButtons = document.querySelectorAll(".bow-tab-btn");
const tabPanels = document.querySelectorAll(".bow-tab");

const classButtons = document.querySelectorAll(".bow-chip");
const classTitle = document.getElementById("bowClassTitle");
const classText = document.getElementById("bowClassText");
const classFacts = document.getElementById("bowClassFacts");

const featureList = document.getElementById("bowFeatureList");
const featureReset = document.getElementById("bowFeatureReset");
const featureCheck = document.getElementById("bowFeatureCheck");
const featureFeedback = document.getElementById("bowFeatureFeedback");

const assignList = document.getElementById("bowAssignList");
const assignReset = document.getElementById("bowAssignReset");
const assignCheck = document.getElementById("bowAssignCheck");
const assignFeedback = document.getElementById("bowAssignFeedback");

const keyQuestion = document.getElementById("bowKeyQuestion");
const keyYes = document.getElementById("bowKeyYes");
const keyNo = document.getElementById("bowKeyNo");
const keyReset = document.getElementById("bowKeyReset");
const keyResult = document.getElementById("bowKeyResult");

const observeAnimal = document.getElementById("bowObserveAnimal");
const observeHint = document.getElementById("bowObserveHint");

const trainCount = document.getElementById("bowTrainCount");
const trainGenerate = document.getElementById("bowTrainGenerate");
const trainCheck = document.getElementById("bowTrainCheck");
const trainList = document.getElementById("bowTrainList");
const trainFeedback = document.getElementById("bowTrainFeedback");

const testStart = document.getElementById("bowTestStart");
const testNext = document.getElementById("bowTestNext");
const testScore = document.getElementById("bowTestScore");
const testStatus = document.getElementById("bowTestStatus");
const testPrompt = document.getElementById("bowTestPrompt");
const testAnswers = document.getElementById("bowTestAnswers");
const testFeedback = document.getElementById("bowTestFeedback");

const vertebrateClasses = {
  saeugetiere: {
    title: "Saeugetiere",
    text: "Saeugetiere sind gleichwarm und saeugen ihre Jungen mit Milch.",
    facts: [
      "Koerperbedeckung: Haare oder Fell",
      "Fortpflanzung: lebendgebaerend (meist)",
      "Lebensraum: an Land, teils auch im Wasser",
      "Beispiele: Fuchs, Igel, Reh",
    ],
  },
  voegel: {
    title: "Voegel",
    text: "Voegel sind gleichwarm, tragen Federn und legen Eier mit harter Schale.",
    facts: [
      "Koerperbedeckung: Federn",
      "Fortpflanzung: Eier mit harter Schale",
      "Lebensraum: an Land und in der Luft",
      "Beispiele: Schwan, Amsel, Blaumeise",
    ],
  },
  reptilien: {
    title: "Reptilien",
    text: "Reptilien sind wechselwarm und besitzen trockene Schuppenhaut.",
    facts: [
      "Koerperbedeckung: trockene Schuppen",
      "Fortpflanzung: Eier mit lederartiger Schale",
      "Lebensraum: meist an Land, teils im Wasser",
      "Beispiele: Eidechse, Ringelnatter",
    ],
  },
  amphibien: {
    title: "Amphibien",
    text: "Amphibien sind wechselwarm und leben im Verlauf ihres Lebens in Wasser und an Land.",
    facts: [
      "Koerperbedeckung: feuchte, nackte Haut",
      "Fortpflanzung: Eier im Wasser, Larven im Wasser",
      "Lebensraum: Wasser und Land",
      "Beispiele: Grasfrosch, Erdkroete, Salamander",
    ],
  },
  fische: {
    title: "Fische",
    text: "Fische sind wechselwarm, leben im Wasser und atmen ueber Kiemen.",
    facts: [
      "Koerperbedeckung: Schuppen (mit Schleimschicht)",
      "Fortpflanzung: Eier im Wasser",
      "Lebensraum: nur im Wasser",
      "Beispiele: Hecht, Forelle",
    ],
  },
};

const featureItemsBase = [
  { statement: "Federkleid und Eier mit harter Schale", answer: "voegel" },
  { statement: "Feuchte, nackte Haut; Larven im Wasser", answer: "amphibien" },
  { statement: "Haare oder Fell, saeugt Jungtiere", answer: "saeugetiere" },
  { statement: "Kiemen, lebt nur im Wasser", answer: "fische" },
  { statement: "Trockene Schuppenhaut, wechselwarm", answer: "reptilien" },
];

const assignItemsBase = [
  { animal: "Schwan", answer: "voegel" },
  { animal: "Ringelnatter", answer: "reptilien" },
  { animal: "Erdkroete", answer: "amphibien" },
  { animal: "Hecht", answer: "fische" },
  { animal: "Seehund", answer: "saeugetiere" },
  { animal: "Salamander", answer: "amphibien" },
  { animal: "Fuchs", answer: "saeugetiere" },
  { animal: "Eidechse", answer: "reptilien" },
];

const observeHints = {
  igel: "Igel -> Saeugetiere: Fell/Stacheln aus Haaren, lebendgebaerend, saeugt Jungtiere.",
  hecht: "Hecht -> Fische: lebt im Wasser, atmet ueber Kiemen, besitzt Schuppen.",
  salamander: "Salamander -> Amphibien: feuchte Haut, Entwicklung mit Larven im Wasser.",
  schwan: "Schwan -> Voegel: Federn, Schnabel, legt Eier mit harter Schale.",
  ringelnatter: "Ringelnatter -> Reptilien: trockene Schuppenhaut, wechselwarm.",
};

const trainQuestionPool = [
  {
    prompt: "Welche Wirbeltierklasse hat Federn?",
    options: ["Fische", "Amphibien", "Voegel", "Reptilien"],
    answer: 2,
    explain: "Federn sind ein typisches Merkmal der Voegel.",
  },
  {
    prompt: "Welche Aussage passt zu Saeugetieren?",
    options: [
      "legen Eier im Wasser",
      "saeugen ihre Jungen",
      "haben Kiemen",
      "haben trockene Schuppenhaut",
    ],
    answer: 1,
    explain: "Das Saeugen der Jungen ist ein Kernmerkmal der Saeugetiere.",
  },
  {
    prompt: "Welche Klasse ist wechselwarm und lebt nur im Wasser?",
    options: ["Fische", "Voegel", "Saeugetiere", "Amphibien"],
    answer: 0,
    explain: "Fische sind wechselwarm und leben im Wasser.",
  },
  {
    prompt: "Was passt zu Amphibien?",
    options: [
      "Fell und lebendgebaerend",
      "Federn und harte Eierschale",
      "feuchte Haut und Larven im Wasser",
      "Kiemen und nur Wasserleben",
    ],
    answer: 2,
    explain: "Amphibien haben feuchte Haut und entwickeln sich ueber Larven im Wasser.",
  },
  {
    prompt: "Ringelnatter gehoert zu ...",
    options: ["Reptilien", "Voegeln", "Amphibien", "Fischen"],
    answer: 0,
    explain: "Die Ringelnatter ist ein Reptil.",
  },
  {
    prompt: "Hecht gehoert zu ...",
    options: ["Amphibien", "Fischen", "Reptilien", "Saeugetieren"],
    answer: 1,
    explain: "Der Hecht ist ein Fisch.",
  },
  {
    prompt: "Welche Klasse ist gleichwarm?",
    options: ["Saeugetiere", "Reptilien", "Amphibien", "Fische"],
    answer: 0,
    explain: "Saeugetiere und Voegel sind gleichwarm.",
  },
  {
    prompt: "Welche Aussage zur Bestimmungstabelle stimmt?",
    options: [
      "Sie arbeitet mit beobachtbaren Merkmalen.",
      "Sie braucht keine Merkmale.",
      "Sie gilt nur fuer Fische.",
      "Sie ist immer Zufall.",
    ],
    answer: 0,
    explain: "Bestimmungstabellen nutzen beobachtbare Merkmale Schritt fuer Schritt.",
  },
  {
    prompt: "Welche Klasse legt in der Regel Eier mit harter Schale?",
    options: ["Voegel", "Saeugetiere", "Amphibien", "Fische"],
    answer: 0,
    explain: "Das ist typisch fuer Voegel.",
  },
  {
    prompt: "Welche Klasse passt: trockene Schuppen, wechselwarm?",
    options: ["Reptilien", "Voegel", "Saeugetiere", "Amphibien"],
    answer: 0,
    explain: "Diese Merkmalkombination passt zu Reptilien.",
  },
  {
    prompt: "Welches Tier gehoert zu den Amphibien?",
    options: ["Erdkroete", "Schwan", "Hecht", "Fuchs"],
    answer: 0,
    explain: "Die Erdkroete ist ein Amphibium.",
  },
  {
    prompt: "Warum ist die Wirbelsaeule wichtig fuer die Einordnung als Wirbeltier?",
    options: [
      "Sie ist ein gemeinsames Grundmerkmal aller Wirbeltiere.",
      "Nur Fische haben eine Wirbelsaeule.",
      "Nur Saeugetiere haben eine Wirbelsaeule.",
      "Sie ist fuer die Einordnung unwichtig.",
    ],
    answer: 0,
    explain: "Die Wirbelsaeule ist ein gemeinsames Merkmal aller Wirbeltiere.",
  },
];

const testQuestionPool = [...trainQuestionPool];

const keyNodes = {
  start: {
    question: "Hat das Tier Federn?",
    yes: "voegel",
    no: "q2",
  },
  q2: {
    question: "Hat das Tier Haare oder Fell und saeugt es seine Jungen?",
    yes: "saeugetiere",
    no: "q3",
  },
  q3: {
    question: "Lebt das Tier nur im Wasser und hat Kiemen?",
    yes: "fische",
    no: "q4",
  },
  q4: {
    question: "Hat das Tier trockene Schuppen und legt Eier an Land?",
    yes: "reptilien",
    no: "amphibien",
  },
};

let currentKeyNode = "start";
let currentFeatureItems = [];
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

function classLabel(key) {
  return vertebrateClasses[key] ? vertebrateClasses[key].title : key;
}

function setActiveTab(tabKey) {
  tabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === tabKey);
  });
  tabPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === `tab-${tabKey}`);
  });
}

function setClassDetails(classKey) {
  const data = vertebrateClasses[classKey] || vertebrateClasses.saeugetiere;
  classButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.class === classKey);
  });

  classTitle.textContent = data.title;
  classText.textContent = data.text;
  classFacts.replaceChildren();
  data.facts.forEach((fact) => {
    const li = document.createElement("li");
    li.textContent = fact;
    classFacts.append(li);
  });
}

function renderFeatureTask() {
  currentFeatureItems = shuffle(featureItemsBase);
  featureList.replaceChildren();

  currentFeatureItems.forEach((item, index) => {
    const row = document.createElement("article");
    row.className = "bow-task-item";

    const label = document.createElement("label");
    label.setAttribute("for", `bow-feature-${index}`);
    label.textContent = item.statement;

    const select = document.createElement("select");
    select.id = `bow-feature-${index}`;
    select.className = "bow-select";
    select.dataset.answer = item.answer;

    [
      { value: "", text: "Klasse waehlen" },
      { value: "saeugetiere", text: "Saeugetiere" },
      { value: "voegel", text: "Voegel" },
      { value: "reptilien", text: "Reptilien" },
      { value: "amphibien", text: "Amphibien" },
      { value: "fische", text: "Fische" },
    ].forEach((choice) => {
      const option = document.createElement("option");
      option.value = choice.value;
      option.textContent = choice.text;
      select.append(option);
    });

    row.append(label, select);
    featureList.append(row);
  });

  featureFeedback.textContent = "Noch nicht geprueft.";
}

function checkFeatureTask() {
  const rows = [...featureList.querySelectorAll(".bow-task-item")];
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
    featureFeedback.textContent = "Bitte zuerst mindestens eine Zuordnung waehlen.";
    return;
  }
  featureFeedback.textContent = `Richtig: ${correct} von ${currentFeatureItems.length}.`;
}

function renderAssignTask() {
  currentAssignItems = shuffle(assignItemsBase);
  assignList.replaceChildren();

  currentAssignItems.forEach((item, index) => {
    const row = document.createElement("article");
    row.className = "bow-task-item";

    const label = document.createElement("label");
    label.setAttribute("for", `bow-assign-${index}`);
    label.textContent = item.animal;

    const select = document.createElement("select");
    select.id = `bow-assign-${index}`;
    select.className = "bow-select";
    select.dataset.answer = item.answer;

    [
      { value: "", text: "Klasse waehlen" },
      { value: "saeugetiere", text: "Saeugetiere" },
      { value: "voegel", text: "Voegel" },
      { value: "reptilien", text: "Reptilien" },
      { value: "amphibien", text: "Amphibien" },
      { value: "fische", text: "Fische" },
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
  const rows = [...assignList.querySelectorAll(".bow-task-item")];
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

function renderKeyNode() {
  const node = keyNodes[currentKeyNode];
  if (!node) {
    keyQuestion.textContent = "Fehler im Schluessel.";
    keyYes.disabled = true;
    keyNo.disabled = true;
    return;
  }

  keyQuestion.textContent = node.question;
  keyResult.textContent = "Treffe eine Entscheidung mit Ja oder Nein.";
  keyYes.disabled = false;
  keyNo.disabled = false;
}

function resolveKey(target) {
  if (vertebrateClasses[target]) {
    keyResult.textContent = `Ergebnis: ${classLabel(target)}. Begruendung: Merkmale passen zur Klasse.`;
    keyYes.disabled = true;
    keyNo.disabled = true;
    return;
  }

  currentKeyNode = target;
  renderKeyNode();
}

function chooseKeyAnswer(answer) {
  const node = keyNodes[currentKeyNode];
  if (!node) {
    return;
  }
  resolveKey(answer === "yes" ? node.yes : node.no);
}

function resetKey() {
  currentKeyNode = "start";
  renderKeyNode();
}

function updateObserveHint() {
  observeHint.textContent = observeHints[observeAnimal.value] || "";
}

function renderTraining() {
  const count = Number(trainCount.value) || 10;
  currentTrainingQuestions = sample(trainQuestionPool, count);
  trainList.replaceChildren();

  currentTrainingQuestions.forEach((question, qIndex) => {
    const task = document.createElement("article");
    task.className = "bow-task-item";
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
      radio.name = `bow-train-${qIndex}`;
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

  const tasks = [...trainList.querySelectorAll(".bow-task-item")];
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
    button.className = "bow-choice-btn";
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

      const buttons = [...testAnswers.querySelectorAll(".bow-choice-btn")];
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
  currentTestQuestions = sample(testQuestionPool, 10);
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
    testPrompt.textContent = "Klicke auf Test starten, um einen neuen Lauf zu beginnen.";
    testAnswers.replaceChildren();
    testFeedback.textContent = currentTestScore >= 7
      ? "Sehr gut. Du kannst Wirbeltiere sicher klassifizieren."
      : "Gute Grundlage. Wiederhole die Lernteile und teste dich erneut.";
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

function initClassExplorer() {
  setClassDetails("saeugetiere");
  classButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setClassDetails(button.dataset.class || "saeugetiere");
    });
  });
}

function initFeatures() {
  renderFeatureTask();
  featureReset.addEventListener("click", renderFeatureTask);
  featureCheck.addEventListener("click", checkFeatureTask);
}

function initAssign() {
  renderAssignTask();
  assignReset.addEventListener("click", renderAssignTask);
  assignCheck.addEventListener("click", checkAssignTask);
}

function initKey() {
  resetKey();
  keyYes.addEventListener("click", () => chooseKeyAnswer("yes"));
  keyNo.addEventListener("click", () => chooseKeyAnswer("no"));
  keyReset.addEventListener("click", resetKey);
}

function initObserve() {
  updateObserveHint();
  observeAnimal.addEventListener("change", updateObserveHint);
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
initClassExplorer();
initFeatures();
initAssign();
initKey();
initObserve();
initTraining();
initTest();
