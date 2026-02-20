const enTabButtons = document.querySelectorAll(".en-tab-btn");
const enTabPanels = document.querySelectorAll(".en-tab");

const enDrillNewRound = document.getElementById("enDrillNewRound");
const enDrillCheck = document.getElementById("enDrillCheck");
const enDrillList = document.getElementById("enDrillList");
const enDrillFeedback = document.getElementById("enDrillFeedback");

const enDetectiveNewRound = document.getElementById("enDetectiveNewRound");
const enDetectiveCheck = document.getElementById("enDetectiveCheck");
const enDetectiveList = document.getElementById("enDetectiveList");
const enDetectiveFeedback = document.getElementById("enDetectiveFeedback");

const enQuizStart = document.getElementById("enQuizStart");
const enQuizNext = document.getElementById("enQuizNext");
const enQuizScore = document.getElementById("enQuizScore");
const enQuizStatus = document.getElementById("enQuizStatus");
const enQuizPrompt = document.getElementById("enQuizPrompt");
const enQuizAnswers = document.getElementById("enQuizAnswers");
const enQuizFeedback = document.getElementById("enQuizFeedback");

const subjects = [
  { label: "I", thirdSingular: false },
  { label: "you", thirdSingular: false },
  { label: "we", thirdSingular: false },
  { label: "they", thirdSingular: false },
  { label: "he", thirdSingular: true },
  { label: "she", thirdSingular: true },
  { label: "Tom", thirdSingular: true },
  { label: "Mia", thirdSingular: true },
  { label: "my brother", thirdSingular: true },
  { label: "our teacher", thirdSingular: true },
  { label: "it", thirdSingular: true },
];

const thirdSubjects = subjects.filter((subject) => subject.thirdSingular);

const conditionVerbs = [
  { base: "study", past: "studied", rest: "for the test" },
  { base: "practice", past: "practiced", rest: "every day" },
  { base: "do", past: "did", rest: "your homework" },
  { base: "go", past: "went", rest: "to bed early" },
  { base: "check", past: "checked", rest: "the timetable" },
  { base: "listen", past: "listened", rest: "carefully" },
  { base: "ask", past: "asked", rest: "for help" },
  { base: "pack", past: "packed", rest: "your bag" },
  { base: "drink", past: "drank", rest: "enough water" },
  { base: "train", past: "trained", rest: "every afternoon" },
  { base: "arrive", past: "arrived", rest: "on time" },
  { base: "read", past: "read", rest: "the instructions" },
];

const resultVerbs = [
  { base: "pass", past: "passed", rest: "the test" },
  { base: "finish", past: "finished", rest: "the task faster" },
  { base: "understand", past: "understood", rest: "the lesson better" },
  { base: "feel", past: "felt", rest: "more confident" },
  { base: "get", past: "got", rest: "a better result" },
  { base: "improve", past: "improved", rest: "quickly" },
  { base: "learn", past: "learned", rest: "new words" },
  { base: "win", past: "won", rest: "the game" },
  { base: "solve", past: "solved", rest: "the problem" },
  { base: "have", past: "had", rest: "more time" },
  { base: "help", past: "helped", rest: "the team" },
];

const detectiveChoiceMeta = {
  correct: {
    label: "Correct sentence",
    explanation: "Die Satzstruktur ist korrekt: if + present simple, dann will + infinitive.",
  },
  if_will: {
    label: "Error: 'will' after if",
    explanation: "Im if-Teil nutzt du in Part 1 kein will, sondern das simple present.",
  },
  main_no_will: {
    label: "Error: no will in main clause",
    explanation: "Im Ergebnis-Teil brauchst du bei Part 1 normalerweise will + Grundform.",
  },
  third_s: {
    label: "Error: missing/false 3rd person form",
    explanation: "Bei he/she/it braucht das Verb im simple present ein -s/-es.",
  },
};

const quizState = {
  running: false,
  answered: false,
  index: 0,
  correct: 0,
  questions: [],
};

let drillTasks = [];
let detectiveTasks = [];

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickOne(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function toThirdPerson(base) {
  const irregular = {
    have: "has",
    do: "does",
    go: "goes",
  };
  if (irregular[base]) {
    return irregular[base];
  }
  if (/[^aeiou]y$/i.test(base)) {
    return `${base.slice(0, -1)}ies`;
  }
  if (/(s|x|z|ch|sh|o)$/i.test(base)) {
    return `${base}es`;
  }
  return `${base}s`;
}

function presentForm(subject, verb) {
  return subject.thirdSingular ? toThirdPerson(verb.base) : verb.base;
}

function phrase(verbForm, rest) {
  return rest ? `${verbForm} ${rest}` : verbForm;
}

function uniqueChoiceTexts(choices, fallbackFactory) {
  const seen = new Set();
  return choices.map((choice, index) => {
    let text = choice.text;
    while (seen.has(text)) {
      text = fallbackFactory(index, text);
    }
    seen.add(text);
    return { ...choice, text };
  });
}

function makeScenario(forceThirdConditionSubject = false) {
  const conditionSubject = forceThirdConditionSubject ? pickOne(thirdSubjects) : pickOne(subjects);
  const conditionVerb = pickOne(conditionVerbs);
  const resultSubject = pickOne(subjects);
  const resultVerb = pickOne(resultVerbs);
  return {
    conditionSubject,
    conditionVerb,
    resultSubject,
    resultVerb,
  };
}

function buildCorrectSentence(scenario) {
  const conditionPart = phrase(
    presentForm(scenario.conditionSubject, scenario.conditionVerb),
    scenario.conditionVerb.rest
  );
  const resultPart = phrase(scenario.resultVerb.base, scenario.resultVerb.rest);
  return `If ${scenario.conditionSubject.label} ${conditionPart}, ${scenario.resultSubject.label} will ${resultPart}.`;
}

function makeIfVerbTask() {
  const scenario = makeScenario();
  const correct = presentForm(scenario.conditionSubject, scenario.conditionVerb);
  const wrongWill = `will ${scenario.conditionVerb.base}`;
  const wrongPast = scenario.conditionVerb.past;
  const wrongAgreement = scenario.conditionSubject.thirdSingular
    ? scenario.conditionVerb.base
    : toThirdPerson(scenario.conditionVerb.base);

  let choices = [
    { text: correct, isCorrect: true, wrongReason: "" },
    {
      text: wrongWill,
      isCorrect: false,
      wrongReason: "Nach if steht in Part 1 kein will.",
    },
    {
      text: wrongPast,
      isCorrect: false,
      wrongReason: "Die Vergangenheitsform passt hier nicht zur Part-1-Struktur.",
    },
    {
      text: wrongAgreement,
      isCorrect: false,
      wrongReason: scenario.conditionSubject.thirdSingular
        ? "Bei he/she/it brauchst du im simple present die -s/-es-Form."
        : "Bei I/you/we/they nutzt du die Grundform ohne -s.",
    },
  ];

  choices = uniqueChoiceTexts(choices, () => `to ${scenario.conditionVerb.base}`);
  choices = shuffle(choices);

  return {
    type: "ifVerb",
    prompt: `If ${scenario.conditionSubject.label} ____ ${scenario.conditionVerb.rest}, ${scenario.resultSubject.label} will ${phrase(
      scenario.resultVerb.base,
      scenario.resultVerb.rest
    )}.`,
    choices,
    successFeedback: "Richtig: Der if-Teil steht im simple present.",
  };
}

function makeMainVerbTask() {
  const scenario = makeScenario();
  const correct = `will ${scenario.resultVerb.base}`;
  const wrongPresent = presentForm(scenario.resultSubject, scenario.resultVerb);
  const wrongWould = `would ${scenario.resultVerb.base}`;
  const wrongPast = scenario.resultVerb.past;

  let choices = [
    { text: correct, isCorrect: true, wrongReason: "" },
    {
      text: wrongPresent,
      isCorrect: false,
      wrongReason: "Im Hauptsatz brauchst du hier will + Grundform.",
    },
    {
      text: wrongWould,
      isCorrect: false,
      wrongReason: "Would gehoert nicht zur grundlegenden Part-1-Form.",
    },
    {
      text: wrongPast,
      isCorrect: false,
      wrongReason: "Nur eine Vergangenheitsform ohne will passt hier nicht.",
    },
  ];

  choices = uniqueChoiceTexts(choices, () => `will ${scenario.resultVerb.past}`);
  choices = shuffle(choices);

  const ifPart = phrase(
    presentForm(scenario.conditionSubject, scenario.conditionVerb),
    scenario.conditionVerb.rest
  );

  return {
    type: "mainVerb",
    prompt: `If ${scenario.conditionSubject.label} ${ifPart}, ${scenario.resultSubject.label} ____ ${scenario.resultVerb.rest}.`,
    choices,
    successFeedback: "Richtig: Der Hauptsatz steht mit will + infinitive.",
  };
}

function makeFullSentenceTask() {
  const scenario = makeScenario();
  const correctSentence = buildCorrectSentence(scenario);
  const ifPartCorrect = phrase(
    presentForm(scenario.conditionSubject, scenario.conditionVerb),
    scenario.conditionVerb.rest
  );
  const resultPartBase = phrase(scenario.resultVerb.base, scenario.resultVerb.rest);
  const resultPartPresent = phrase(
    presentForm(scenario.resultSubject, scenario.resultVerb),
    scenario.resultVerb.rest
  );
  const wrongAgreement = scenario.conditionSubject.thirdSingular
    ? scenario.conditionVerb.base
    : toThirdPerson(scenario.conditionVerb.base);
  const wrongAgreementPart = phrase(wrongAgreement, scenario.conditionVerb.rest);

  const choices = shuffle([
    { text: correctSentence, isCorrect: true, wrongReason: "" },
    {
      text: `If ${scenario.conditionSubject.label} will ${phrase(
        scenario.conditionVerb.base,
        scenario.conditionVerb.rest
      )}, ${scenario.resultSubject.label} will ${resultPartBase}.`,
      isCorrect: false,
      wrongReason: "Will darf in dieser Struktur nicht direkt nach if stehen.",
    },
    {
      text: `If ${scenario.conditionSubject.label} ${ifPartCorrect}, ${scenario.resultSubject.label} ${resultPartPresent}.`,
      isCorrect: false,
      wrongReason: "Im Hauptsatz fehlt will + Grundform.",
    },
    {
      text: `If ${scenario.conditionSubject.label} ${wrongAgreementPart}, ${scenario.resultSubject.label} will ${resultPartBase}.`,
      isCorrect: false,
      wrongReason: "Hier ist die Verbform im if-Teil nicht korrekt angepasst.",
    },
  ]);

  return {
    type: "fullSentence",
    prompt: "Waehle den grammatisch korrekten Satz.",
    choices,
    successFeedback: "Richtig: Genau diese Option hat die komplette Part-1-Struktur korrekt.",
  };
}

function generateDrillRound(count = 12) {
  const tasks = [];
  for (let i = 0; i < count; i += 1) {
    const mod = i % 3;
    if (mod === 0) {
      tasks.push(makeIfVerbTask());
    } else if (mod === 1) {
      tasks.push(makeMainVerbTask());
    } else {
      tasks.push(makeFullSentenceTask());
    }
  }
  return shuffle(tasks);
}

function renderChoiceGrid(task, taskIndex, prefix) {
  const wrapper = document.createElement("div");
  wrapper.className = "en-choice-grid";

  task.choices.forEach((choice, choiceIndex) => {
    const label = document.createElement("label");
    label.className = "en-choice-item";
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `${prefix}-${taskIndex}`;
    radio.value = String(choiceIndex);
    label.append(radio, document.createTextNode(choice.text));
    wrapper.append(label);
  });

  return wrapper;
}

function renderTaskList(target, tasks, prefix) {
  target.replaceChildren();
  tasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "en-task-row";
    row.dataset.index = String(index);

    const prompt = document.createElement("p");
    prompt.textContent = `${index + 1}. ${task.prompt}`;

    const choices = renderChoiceGrid(task, index, prefix);
    const feedback = document.createElement("div");
    feedback.className = "task-feedback";

    row.append(prompt, choices, feedback);
    target.append(row);
  });
}

function getCheckedValue(row, prefix, index) {
  const checked = row.querySelector(`input[name="${prefix}-${index}"]:checked`);
  if (!(checked instanceof HTMLInputElement)) {
    return null;
  }
  return Number(checked.value);
}

function checkDrillRound() {
  const rows = enDrillList.querySelectorAll(".en-task-row");
  let answered = 0;
  let correctCount = 0;

  rows.forEach((row, index) => {
    row.classList.remove("is-correct", "is-wrong");
    const feedback = row.querySelector(".task-feedback");
    if (!(feedback instanceof HTMLDivElement)) {
      return;
    }
    feedback.innerHTML = "";

    const value = getCheckedValue(row, "drill", index);
    if (!Number.isInteger(value)) {
      return;
    }
    answered += 1;

    const task = drillTasks[index];
    const selectedChoice = task.choices[value];
    if (selectedChoice?.isCorrect) {
      correctCount += 1;
      row.classList.add("is-correct");
      feedback.innerHTML = `<p class="feedback ok">${task.successFeedback}</p>`;
    } else {
      row.classList.add("is-wrong");
      const correctChoice = task.choices.find((choice) => choice.isCorrect);
      feedback.innerHTML = `
        <p class="feedback bad">
          Nicht korrekt. ${selectedChoice?.wrongReason || "Pruefe die Struktur erneut."}
          Richtige Loesung: "${correctChoice?.text || ""}".
        </p>
      `;
    }
  });

  if (answered < drillTasks.length) {
    enDrillFeedback.innerHTML = '<p class="feedback info">Bitte alle Aufgaben beantworten.</p>';
    return;
  }

  const allCorrect = correctCount === drillTasks.length;
  enDrillFeedback.innerHTML = `
    <p class="feedback ${allCorrect ? "ok" : "bad"}">
      ${correctCount} / ${drillTasks.length} richtig.
      ${allCorrect ? "Sehr stark." : "Nutze die Erklaerungen bei den roten Aufgaben und starte danach eine neue Runde."}
    </p>
  `;
}

function buildDetectiveTask(type) {
  const scenario = makeScenario(type === "third_s");
  const correctSentence = buildCorrectSentence(scenario);

  const ifPart = phrase(
    presentForm(scenario.conditionSubject, scenario.conditionVerb),
    scenario.conditionVerb.rest
  );
  const resultPartBase = phrase(scenario.resultVerb.base, scenario.resultVerb.rest);
  const resultPartPresent = phrase(
    presentForm(scenario.resultSubject, scenario.resultVerb),
    scenario.resultVerb.rest
  );

  if (type === "correct") {
    return {
      sentence: correctSentence,
      correctType: "correct",
      corrected: correctSentence,
    };
  }

  if (type === "if_will") {
    return {
      sentence: `If ${scenario.conditionSubject.label} will ${phrase(
        scenario.conditionVerb.base,
        scenario.conditionVerb.rest
      )}, ${scenario.resultSubject.label} will ${resultPartBase}.`,
      correctType: "if_will",
      corrected: correctSentence,
    };
  }

  if (type === "main_no_will") {
    return {
      sentence: `If ${scenario.conditionSubject.label} ${ifPart}, ${scenario.resultSubject.label} ${resultPartPresent}.`,
      correctType: "main_no_will",
      corrected: correctSentence,
    };
  }

  const wrongConditionVerb = scenario.conditionSubject.thirdSingular
    ? scenario.conditionVerb.base
    : toThirdPerson(scenario.conditionVerb.base);

  return {
    sentence: `If ${scenario.conditionSubject.label} ${phrase(
      wrongConditionVerb,
      scenario.conditionVerb.rest
    )}, ${scenario.resultSubject.label} will ${resultPartBase}.`,
    correctType: "third_s",
    corrected: correctSentence,
  };
}

function generateDetectiveRound(count = 10) {
  const types = ["correct", "if_will", "main_no_will", "third_s"];
  const tasks = [];
  for (let i = 0; i < count; i += 1) {
    tasks.push(buildDetectiveTask(types[i % types.length]));
  }
  return shuffle(tasks);
}

function renderDetectiveRound() {
  enDetectiveList.replaceChildren();
  detectiveTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "en-task-row";
    row.dataset.index = String(index);

    const prompt = document.createElement("p");
    prompt.textContent = `${index + 1}. ${task.sentence}`;

    const choiceGrid = document.createElement("div");
    choiceGrid.className = "en-choice-grid";

    Object.entries(detectiveChoiceMeta).forEach(([key, meta]) => {
      const label = document.createElement("label");
      label.className = "en-choice-item";
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `detective-${index}`;
      radio.value = key;
      label.append(radio, document.createTextNode(meta.label));
      choiceGrid.append(label);
    });

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";

    row.append(prompt, choiceGrid, feedback);
    enDetectiveList.append(row);
  });
}

function checkDetectiveRound() {
  const rows = enDetectiveList.querySelectorAll(".en-task-row");
  let answered = 0;
  let correctCount = 0;

  rows.forEach((row, index) => {
    row.classList.remove("is-correct", "is-wrong");
    const feedback = row.querySelector(".task-feedback");
    if (!(feedback instanceof HTMLDivElement)) {
      return;
    }
    feedback.innerHTML = "";

    const checked = row.querySelector(`input[name="detective-${index}"]:checked`);
    if (!(checked instanceof HTMLInputElement)) {
      return;
    }
    answered += 1;

    const selected = checked.value;
    const task = detectiveTasks[index];
    const expected = task.correctType;

    if (selected === expected) {
      correctCount += 1;
      row.classList.add("is-correct");
      feedback.innerHTML = `<p class="feedback ok">Richtig. ${detectiveChoiceMeta[expected].explanation}</p>`;
    } else {
      row.classList.add("is-wrong");
      feedback.innerHTML = `
        <p class="feedback bad">
          Nicht korrekt. Richtige Kategorie: "${detectiveChoiceMeta[expected].label}".
          ${detectiveChoiceMeta[expected].explanation}
          Korrektur: "${task.corrected}"
        </p>
      `;
    }
  });

  if (answered < detectiveTasks.length) {
    enDetectiveFeedback.innerHTML = '<p class="feedback info">Bitte alle Saetze markieren.</p>';
    return;
  }

  const allCorrect = correctCount === detectiveTasks.length;
  enDetectiveFeedback.innerHTML = `
    <p class="feedback ${allCorrect ? "ok" : "bad"}">
      ${correctCount} / ${detectiveTasks.length} richtig.
      ${allCorrect ? "Sehr gut erkannt." : "Arbeite die roten Hinweise durch und starte eine neue Runde."}
    </p>
  `;
}

function fixedQuizQuestions() {
  return [
    {
      prompt: "Welche Struktur passt fuer Part 1 am besten?",
      options: [
        "If + present simple, ... will + infinitive",
        "If + will, ... present simple",
        "If + past simple, ... will + infinitive",
        "If + infinitive, ... would + infinitive",
      ],
      correct: 0,
      explanation: "Diese Form wird fuer reale/moegliche Folgen verwendet.",
      wrongReasons: {
        1: "Will steht in Part 1 nicht im if-Teil.",
        2: "Past simple gehoert nicht zur Grundform von Part 1.",
        3: "Diese Struktur passt nicht zur Einstiegseinheit.",
      },
    },
    {
      prompt: "Welche Version ist korrekt?",
      options: [
        "If she will train, she will improve.",
        "If she trains, she improves.",
        "If she trains, she will improve.",
        "If she train, she will improve.",
      ],
      correct: 2,
      explanation: "Der if-Teil steht im simple present, der Hauptteil mit will + Grundform.",
      wrongReasons: {
        0: "Nach if steht hier kein will.",
        1: "Im Hauptsatz fehlt will + infinitive.",
        3: "Bei she braucht das Verb im if-Teil die -s-Form.",
      },
    },
    {
      prompt: "Welche Aussage zu if-Saetzen in Part 1 ist richtig?",
      options: [
        "Im if-Teil steht immer will.",
        "Die Reihenfolge der Teilsaetze kann variieren.",
        "Ein if-Satz hat nur einen Teilsatz.",
        "Im Hauptsatz steht nie will.",
      ],
      correct: 1,
      explanation: "If-Clause und main clause koennen in beiden Reihenfolgen stehen.",
      wrongReasons: {
        0: "Das ist genau eine typische Fehlerfalle.",
        2: "If-Saetze bestehen aus Bedingung und Folge.",
        3: "Im Einstiegsmuster steht im Hauptsatz will + infinitive.",
      },
    },
    {
      prompt: "Was ist der Fehler in: If he play hard, he will win.?",
      options: [
        "Der Hauptsatz hat kein will.",
        "Nach if fehlt die 3rd-person-Form.",
        "Es fehlt ein past tense.",
        "Es darf kein Komma stehen.",
      ],
      correct: 1,
      explanation: "Bei he/she/it brauchst du im simple present die -s/-es-Form.",
      wrongReasons: {
        0: "Der Hauptsatz ist korrekt mit will + win.",
        2: "Hier wird kein past tense benoetigt.",
        3: "Das Komma ist in dieser Reihenfolge sinnvoll.",
      },
    },
  ];
}

function drillTaskToQuizQuestion(task) {
  const options = task.choices.map((choice) => choice.text);
  const correct = task.choices.findIndex((choice) => choice.isCorrect);
  const wrongReasons = {};
  task.choices.forEach((choice, index) => {
    if (!choice.isCorrect) {
      wrongReasons[index] = choice.wrongReason || "Diese Option passt nicht zur Part-1-Struktur.";
    }
  });

  return {
    prompt: task.prompt,
    options,
    correct,
    explanation: task.successFeedback,
    wrongReasons,
  };
}

function buildQuizPool() {
  const pool = [...fixedQuizQuestions()];
  const generated = generateDrillRound(40).map(drillTaskToQuizQuestion);
  return [...pool, ...generated];
}

function updateQuizScore() {
  enQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  enQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  enQuizPrompt.textContent = question.prompt;
  enQuizFeedback.innerHTML = "";
  enQuizNext.disabled = true;
  enQuizAnswers.innerHTML = question.options
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
  enQuizStatus.textContent = "Test abgeschlossen.";
  enQuizPrompt.textContent = "Du kannst den Test neu starten und erneut ueben.";
  enQuizAnswers.innerHTML = "";
  enQuizFeedback.innerHTML = '<p class="feedback info">Nutze die Fehlererklaerungen als Lernhilfe fuer die naechste Runde.</p>';
  enQuizNext.disabled = true;
  enQuizStart.textContent = "Neu starten";
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

  enQuizAnswers.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  const wrongReason = question.wrongReasons?.[optionIndex] || "Pruefe die Grundregel: if + present simple, will + infinitive.";
  enQuizFeedback.innerHTML = `
    <p class="feedback ${isCorrect ? "ok" : "bad"}">${
      isCorrect
        ? `Richtig. ${question.explanation}`
        : `Nicht korrekt. ${wrongReason} Richtige Antwort: "${question.options[question.correct]}".`
    }</p>
  `;

  enQuizNext.disabled = false;
  enQuizNext.textContent = quizState.index === quizState.questions.length - 1
    ? "Ergebnis anzeigen"
    : "Naechste Frage";
}

function startQuiz() {
  const pool = shuffle(buildQuizPool());
  quizState.running = true;
  quizState.answered = false;
  quizState.index = 0;
  quizState.correct = 0;
  quizState.questions = pool.slice(0, 10);
  enQuizStart.textContent = "Test neu starten";
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

function setupTabs() {
  enTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      enTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      enTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${target}`).classList.add("is-active");
    });
  });
}

function setupDrill() {
  drillTasks = generateDrillRound();
  renderTaskList(enDrillList, drillTasks, "drill");
  enDrillFeedback.innerHTML = "";

  enDrillNewRound.addEventListener("click", () => {
    drillTasks = generateDrillRound();
    renderTaskList(enDrillList, drillTasks, "drill");
    enDrillFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });

  enDrillCheck.addEventListener("click", checkDrillRound);
}

function setupDetective() {
  detectiveTasks = generateDetectiveRound();
  renderDetectiveRound();
  enDetectiveFeedback.innerHTML = "";

  enDetectiveNewRound.addEventListener("click", () => {
    detectiveTasks = generateDetectiveRound();
    renderDetectiveRound();
    enDetectiveFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });

  enDetectiveCheck.addEventListener("click", checkDetectiveRound);
}

function setupQuiz() {
  enQuizStart.addEventListener("click", startQuiz);
  enQuizNext.addEventListener("click", nextQuizStep);
  enQuizAnswers.addEventListener("click", (event) => {
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
setupDrill();
setupDetective();
setupQuiz();
