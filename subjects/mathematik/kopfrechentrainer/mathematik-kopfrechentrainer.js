const krTabButtons = document.querySelectorAll(".kr-tab-btn");
const krTabPanels = document.querySelectorAll(".kr-tab");

const krDemoButtons = document.querySelectorAll(".kr-demo-btn");
const krDemoTitle = document.getElementById("krDemoTitle");
const krDemoText = document.getElementById("krDemoText");
const krDemoExample = document.getElementById("krDemoExample");
const krDemoTip = document.getElementById("krDemoTip");

const krDifficulty = document.getElementById("krDifficulty");
const krCount = document.getElementById("krCount");
const krTopics = document.querySelectorAll(".kr-topic");
const krGenerate = document.getElementById("krGenerate");
const krCheckAll = document.getElementById("krCheckAll");
const krTaskList = document.getElementById("krTaskList");
const krTaskSummary = document.getElementById("krTaskSummary");

const krQuizStart = document.getElementById("krQuizStart");
const krQuizNext = document.getElementById("krQuizNext");
const krQuizScore = document.getElementById("krQuizScore");
const krQuizStatus = document.getElementById("krQuizStatus");
const krQuizPrompt = document.getElementById("krQuizPrompt");
const krQuizAnswers = document.getElementById("krQuizAnswers");
const krQuizFeedback = document.getElementById("krQuizFeedback");

const strategyContent = {
  ergaenzen: {
    title: "Ergänzen zur vollen Zahl",
    text: "Ergänze erst auf 10, 100 oder 1000 und rechne danach den Rest.",
    example: "398 + 27 = 400 + 25 = 425",
    tip: "Vollzahlen machen Kopfrechnen schnell und sicher.",
  },
  zerlegen: {
    title: "Zerlegen in einfache Teile",
    text: "Zerlege eine Zahl in Zehner und Einer oder Hunderter und Rest.",
    example: "560 - 190 = 560 - 200 + 10 = 370",
    tip: "Große Schritte zuerst, kleine Korrektur danach.",
  },
  gesetz: {
    title: "Rechengesetze nutzen",
    text: "Vertauschen, Klammern oder Verteilen hilft bei schwierigen Aufgaben.",
    example: "25 × 16 = 25 × (10 + 6) = 250 + 150 = 400",
    tip: "Suche eine Umformung, die auf einfache Zahlen führt.",
  },
  reihenfolge: {
    title: "Reihenfolge beachten",
    text: "Zuerst Klammern, dann Punkt-vor-Strich, dann Plus und Minus.",
    example: "8 + 3 × 4 = 8 + 12 = 20",
    tip: "Arbeite Schritt für Schritt und notiere Zwischenergebnisse.",
  },
};

const topicNames = {
  addsub: "Addition / Subtraktion",
  multdiv: "Multiplikation / Division",
  term: "Terme / Reihenfolge",
  laws: "Rechengesetze",
};

let generatedTasks = [];

const quizState = {
  running: false,
  answered: false,
  index: 0,
  correct: 0,
  questions: [],
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choose(items) {
  return items[randomInt(0, items.length - 1)];
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function parseNumber(value) {
  const cleaned = String(value || "").trim().replace(",", ".");
  if (!cleaned) {
    return Number.NaN;
  }
  return Number(cleaned);
}

function setFeedback(target, kind, text) {
  target.innerHTML = `<p class="feedback ${kind}">${text}</p>`;
}

function setupTabs() {
  krTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;
      krTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      krTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${tab}`).classList.add("is-active");
    });
  });
}

function setStrategy(key) {
  const content = strategyContent[key];
  if (!content) {
    return;
  }
  krDemoButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.strategy === key);
  });
  krDemoTitle.textContent = content.title;
  krDemoText.textContent = content.text;
  krDemoExample.textContent = content.example;
  krDemoTip.textContent = content.tip;
}

function setupStrategyDemo() {
  krDemoButtons.forEach((button) => {
    button.addEventListener("click", () => setStrategy(button.dataset.strategy));
  });
  setStrategy("ergaenzen");
}

function buildAddSubTask(difficulty) {
  const variant = randomInt(0, 2);
  if (variant === 0) {
    let base = randomInt(20, difficulty === "leicht" ? 90 : 900);
    let target = base < 100 ? 100 : 1000;
    if (difficulty === "schwer") {
      base = randomInt(120, 980);
      target = 1000;
    }
    const add = randomInt(6, difficulty === "leicht" ? 35 : 180);
    const taskA = base;
    const taskB = add;
    return {
      topic: "addsub",
      type: "numeric",
      prompt: `Rechne geschickt: ${taskA} + ${taskB} = ?`,
      answer: taskA + taskB,
      help: [
        `Ergänze ${taskA} zuerst auf ${target}.`,
        `Ziehe den Ergänzungsteil von ${taskB} ab.`,
        "Addiere dann Vollzahl und Rest.",
      ],
      explanation: "Mit Ergänzen auf eine volle Zahl geht es schneller.",
    };
  }

  if (variant === 1) {
    const a = randomInt(difficulty === "leicht" ? 80 : 200, difficulty === "leicht" ? 600 : 3000);
    const b = randomInt(difficulty === "leicht" ? 19 : 90, difficulty === "leicht" ? 99 : 490);
    return {
      topic: "addsub",
      type: "numeric",
      prompt: `Nutze Ausgleich: ${a} - ${b} = ?`,
      answer: a - b,
      help: [
        "Runde den Subtrahenden auf den nächsten Zehner oder Hunderter.",
        "Rechne die leichtere Subtraktion.",
        "Korrigiere mit dem Differenzteil.",
      ],
      explanation: "Ausgleichsrechnen hilft bei schwierigen Subtraktionen.",
    };
  }

  const a = randomInt(100, difficulty === "leicht" ? 500 : 2500);
  const b = randomInt(10, difficulty === "leicht" ? 90 : 900);
  const op = Math.random() < 0.5 ? "+" : "-";
  return {
    topic: "addsub",
    type: "numeric",
    prompt: `Kopfrechnen: ${a} ${op} ${b} = ?`,
    answer: op === "+" ? a + b : a - b,
    help: [
      "Zerlege die zweite Zahl in Hunderter, Zehner und Einer.",
      "Rechne in mehreren kleinen Schritten.",
    ],
    explanation: "Zerlegen macht große Zahlen übersichtlich.",
  };
}

function buildMultDivTask(difficulty) {
  const variant = randomInt(0, 2);
  if (variant === 0) {
    const base = randomInt(2, difficulty === "leicht" ? 40 : 250);
    const factor = choose([10, 100, 5, 25]);
    return {
      topic: "multdiv",
      type: "numeric",
      prompt: `Rechne im Kopf: ${base} × ${factor} = ?`,
      answer: base * factor,
      help: [
        "Nutze Stellenwert oder Zerlegung des Faktors.",
        "Bei 25 ist 100 : 4 oft hilfreich.",
      ],
      explanation: "Stellenwert und bekannte Faktoren sparen Zeit.",
    };
  }

  if (variant === 1) {
    const divisor = choose([2, 4, 5, 8, 10]);
    const quotient = randomInt(3, difficulty === "leicht" ? 50 : 180);
    const dividend = divisor * quotient;
    return {
      topic: "multdiv",
      type: "numeric",
      prompt: `Teile geschickt: ${dividend} : ${divisor} = ?`,
      answer: quotient,
      help: [
        "Denke um: Welche Zahl mal Divisor ergibt den Dividend?",
        "Nutze Einmaleins und Verdoppeln/Halbieren.",
      ],
      explanation: "Division ist die Umkehraufgabe der Multiplikation.",
    };
  }

  const c = randomInt(2, 10);
  const factor = randomInt(2, difficulty === "leicht" ? 6 : 12);
  const a = randomInt(4, 20) * c;
  return {
    topic: "multdiv",
    type: "numeric",
    prompt: `Rechne über Zwischenschritt: (${a} × ${factor}) : ${c} = ?`,
    answer: (a * factor) / c,
    help: [
      "Rechne zuerst die Multiplikation.",
      "Teile danach durch den letzten Wert.",
      "Prüfe, ob ein ganzzahliges Ergebnis plausibel ist.",
    ],
    explanation: "Zwischenschritte verhindern Fehler im Kopf.",
  };
}

function buildTermTask(difficulty) {
  const variant = randomInt(0, 1);
  if (variant === 0) {
    const a = randomInt(5, 40);
    const b = randomInt(2, difficulty === "leicht" ? 8 : 12);
    const c = randomInt(2, difficulty === "leicht" ? 9 : 15);
    return {
      topic: "term",
      type: "numeric",
      prompt: `Beachte Punkt vor Strich: ${a} + ${b} × ${c} = ?`,
      answer: a + b * c,
      help: [
        "Rechne zuerst die Multiplikation.",
        "Addiere danach den ersten Summanden.",
      ],
      explanation: "Punktrechnungen kommen vor Strichrechnungen.",
    };
  }

  const a = randomInt(2, 12);
  const b = randomInt(4, 25);
  const c = randomInt(3, difficulty === "leicht" ? 10 : 20);
  return {
    topic: "term",
    type: "numeric",
    prompt: `Rechne mit Klammer: ${a} × (${b} + ${c}) = ?`,
    answer: a * (b + c),
    help: [
      "Klammer immer zuerst rechnen.",
      "Dann das Ergebnis mit der Zahl davor multiplizieren.",
    ],
    explanation: "Klammern haben Vorrang vor allen anderen Rechenarten.",
  };
}

function buildLawTask() {
  const variant = randomInt(0, 2);
  if (variant === 0) {
    const questions = [
      {
        prompt: "Welches Gesetz wird genutzt? 17 + 25 = 25 + 17",
        answer: "Kommutativgesetz",
      },
      {
        prompt: "Welches Gesetz wird genutzt? (8 + 2) + 35 = 8 + (2 + 35)",
        answer: "Assoziativgesetz",
      },
      {
        prompt: "Welches Gesetz wird genutzt? 6 × (30 + 4) = 6 × 30 + 6 × 4",
        answer: "Distributivgesetz",
      },
    ];
    const q = choose(questions);
    return {
      topic: "laws",
      type: "choice",
      prompt: q.prompt,
      options: ["Kommutativgesetz", "Assoziativgesetz", "Distributivgesetz"],
      answer: q.answer,
      help: [
        "Prüfe: Wird vertauscht, geklammert oder verteilt?",
        "Vertauschen -> Kommutativ, Klammern -> Assoziativ, Verteilen -> Distributiv.",
      ],
      explanation: `Richtig ist ${q.answer}.`,
    };
  }

  if (variant === 1) {
    const a = choose([4, 5, 6, 8, 12, 25]);
    const b = randomInt(10, 40);
    const c = randomInt(2, 9);
    return {
      topic: "laws",
      type: "numeric",
      prompt: `Nutze das Distributivgesetz: ${a} × (${b} + ${c}) = ?`,
      answer: a * (b + c),
      help: [
        `Multipliziere ${a} mit ${b} und ${c}.`,
        "Addiere die beiden Produkte.",
      ],
      explanation: `${a} × (${b} + ${c}) = ${a * b} + ${a * c}.`,
    };
  }

  const statements = [
    { text: "Das Kommutativgesetz gilt bei + und ×.", answer: "ja" },
    { text: "Das Assoziativgesetz gilt auch bei -.", answer: "nein" },
    { text: "Beim Distributivgesetz wird auf alle Summanden verteilt.", answer: "ja" },
    { text: "Bei Division darf man immer beliebig vertauschen.", answer: "nein" },
  ];
  const s = choose(statements);
  return {
    topic: "laws",
    type: "choice",
    prompt: `Stimmt die Aussage? ${s.text}`,
    options: ["ja", "nein"],
    answer: s.answer,
    help: [
      "Erinnere dich an die genaue Regel jedes Gesetzes.",
      "Teste kurz mit einem Zahlenbeispiel.",
    ],
    explanation: s.answer === "ja" ? "Die Aussage ist korrekt." : "Die Aussage ist nicht korrekt.",
  };
}

function buildTask(topic, difficulty) {
  if (topic === "addsub") {
    return buildAddSubTask(difficulty);
  }
  if (topic === "multdiv") {
    return buildMultDivTask(difficulty);
  }
  if (topic === "term") {
    return buildTermTask(difficulty);
  }
  return buildLawTask(difficulty);
}

function getSelectedTopics() {
  return [...krTopics]
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
}

function renderTaskRows() {
  krTaskList.innerHTML = generatedTasks
    .map((task, index) => {
      const answerField =
        task.type === "numeric"
          ? '<input type="text" data-role="answer" placeholder="Antwort">'
          : `
            <select data-role="answer">
              <option value="">Bitte wählen</option>
              ${task.options.map((option) => `<option value="${option}">${option}</option>`).join("")}
            </select>
          `;
      return `
        <article class="kr-task-row" data-index="${index}">
          <p class="kr-task-head">Aufgabe ${index + 1} (${topicNames[task.topic]})</p>
          <p>${task.prompt}</p>
          <div class="kr-answer-line">${answerField}</div>
          <div class="kr-row-buttons">
            <button type="button" data-action="help">Hilfe anzeigen</button>
            <button type="button" data-action="check">Aufgabe prüfen</button>
          </div>
          <div class="kr-help-box" data-role="help" hidden>
            <p><strong>Lösungsstrategie:</strong></p>
            <ol>${task.help.map((item) => `<li>${item}</li>`).join("")}</ol>
          </div>
          <div data-role="feedback"></div>
        </article>
      `;
    })
    .join("");
}

function createTasks() {
  const selectedTopics = getSelectedTopics();
  if (selectedTopics.length === 0) {
    setFeedback(krTaskSummary, "bad", "Bitte mindestens einen Aufgabentyp auswählen.");
    return;
  }
  const count = Number(krCount.value);
  const difficulty = krDifficulty.value;
  const tasks = [];
  while (tasks.length < count) {
    tasks.push(buildTask(choose(selectedTopics), difficulty));
  }
  generatedTasks = tasks;
  renderTaskRows();
  setFeedback(krTaskSummary, "info", "Neue Aufgaben erstellt. Hilfe kannst du bei jeder Aufgabe einzeln öffnen.");
}

function evaluateRow(index) {
  const row = krTaskList.querySelector(`.kr-task-row[data-index="${index}"]`);
  const task = generatedTasks[index];
  if (!(row instanceof HTMLElement) || !task) {
    return { answered: false, correct: false };
  }
  const answerField = row.querySelector('[data-role="answer"]');
  const feedback = row.querySelector('[data-role="feedback"]');
  if (!(feedback instanceof HTMLDivElement)) {
    return { answered: false, correct: false };
  }

  row.classList.remove("is-correct", "is-wrong");

  if (task.type === "numeric") {
    if (!(answerField instanceof HTMLInputElement)) {
      return { answered: false, correct: false };
    }
    const value = parseNumber(answerField.value);
    if (!Number.isFinite(value)) {
      setFeedback(feedback, "info", "Bitte gib zuerst eine Zahl ein.");
      return { answered: false, correct: false };
    }
    const isCorrect = Math.abs(value - task.answer) < 0.000001;
    row.classList.add(isCorrect ? "is-correct" : "is-wrong");
    setFeedback(
      feedback,
      isCorrect ? "ok" : "bad",
      isCorrect
        ? `Richtig. ${task.explanation}`
        : `Noch nicht korrekt. Lösung: ${task.answer}. ${task.explanation}`
    );
    return { answered: true, correct: isCorrect };
  }

  if (!(answerField instanceof HTMLSelectElement) || !answerField.value) {
    setFeedback(feedback, "info", "Bitte wähle zuerst eine Antwort aus.");
    return { answered: false, correct: false };
  }
  const isCorrect = answerField.value === task.answer;
  row.classList.add(isCorrect ? "is-correct" : "is-wrong");
  setFeedback(
    feedback,
    isCorrect ? "ok" : "bad",
    isCorrect
      ? `Richtig. ${task.explanation}`
      : `Noch nicht korrekt. Richtige Antwort: ${task.answer}. ${task.explanation}`
  );
  return { answered: true, correct: isCorrect };
}

function checkAllRows() {
  if (generatedTasks.length === 0) {
    setFeedback(krTaskSummary, "info", "Erstelle zuerst Aufgaben.");
    return;
  }
  let answered = 0;
  let correct = 0;
  for (let i = 0; i < generatedTasks.length; i += 1) {
    const result = evaluateRow(i);
    if (result.answered) {
      answered += 1;
    }
    if (result.correct) {
      correct += 1;
    }
  }
  if (answered < generatedTasks.length) {
    setFeedback(krTaskSummary, "info", `Du hast ${answered}/${generatedTasks.length} Aufgaben beantwortet.`);
    return;
  }
  setFeedback(
    krTaskSummary,
    correct === generatedTasks.length ? "ok" : "bad",
    `${correct}/${generatedTasks.length} richtig. ${
      correct === generatedTasks.length ? "Super Leistung." : "Nutze die Hilfe bei den schwierigen Aufgaben."
    }`
  );
}

function setupTraining() {
  krGenerate.addEventListener("click", createTasks);
  krCheckAll.addEventListener("click", checkAllRows);

  krTaskList.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) {
      return;
    }
    const row = target.closest(".kr-task-row");
    if (!(row instanceof HTMLElement)) {
      return;
    }
    const index = Number(row.dataset.index);
    if (!Number.isInteger(index)) {
      return;
    }
    if (target.dataset.action === "help") {
      const help = row.querySelector('[data-role="help"]');
      if (!(help instanceof HTMLDivElement)) {
        return;
      }
      help.hidden = !help.hidden;
      target.textContent = help.hidden ? "Hilfe anzeigen" : "Hilfe ausblenden";
      return;
    }
    if (target.dataset.action === "check") {
      evaluateRow(index);
    }
  });

  createTasks();
}

function buildChoiceQuizQuestion() {
  const fixed = [
    {
      prompt: "Welches Gesetz erlaubt das Vertauschen bei Multiplikation?",
      options: ["Kommutativgesetz", "Assoziativgesetz", "Distributivgesetz", "Punkt-vor-Strich"],
      correct: 0,
      explanation: "Vertauschen gehört zum Kommutativgesetz.",
    },
    {
      prompt: "Was rechnest du zuerst bei 12 + 3 × 4?",
      options: ["12 + 3", "3 × 4", "immer von links nach rechts", "gar nichts, erst schätzen"],
      correct: 1,
      explanation: "Punktrechnung vor Strichrechnung.",
    },
    {
      prompt: "Welche Umformung ist distributiv richtig?",
      options: [
        "5 × (20 + 3) = 5 × 20 + 5 × 3",
        "5 × (20 + 3) = 5 × 20 + 3",
        "5 × (20 + 3) = 20 + 3 × 5",
        "5 × (20 + 3) = 100 + 3",
      ],
      correct: 0,
      explanation: "Die Zahl vor der Klammer wird auf alle Summanden verteilt.",
    },
    {
      prompt: "Was bedeutet Assoziativgesetz bei Addition?",
      options: [
        "Reihenfolge tauschen",
        "Klammern anders setzen",
        "Rechenzeichen ändern",
        "Zahl verdoppeln",
      ],
      correct: 1,
      explanation: "Assoziativ bedeutet: gleiche Reihenfolge, andere Klammerung.",
    },
  ];
  return choose(fixed);
}

function toNumericQuizQuestion(task) {
  const correct = Number(task.answer);
  const spread = Math.max(2, Math.round(Math.abs(correct) * 0.2));
  const set = new Set([correct]);
  while (set.size < 4) {
    const candidate = correct + randomInt(-spread, spread);
    if (candidate !== correct) {
      set.add(candidate);
    }
  }
  const options = shuffle([...set]).map((value) => String(value));
  return {
    prompt: task.prompt,
    options,
    correct: options.indexOf(String(correct)),
    explanation: `${task.explanation} Lösung: ${correct}.`,
  };
}

function buildQuizSet() {
  const questions = [buildChoiceQuizQuestion(), buildChoiceQuizQuestion(), buildChoiceQuizQuestion()];
  while (questions.length < 12) {
    const topic = choose(["addsub", "multdiv", "term", "laws"]);
    let task = buildTask(topic, choose(["leicht", "mittel", "schwer"]));
    if (task.type === "choice") {
      questions.push({
        prompt: task.prompt,
        options: task.options,
        correct: task.options.indexOf(task.answer),
        explanation: task.explanation,
      });
    } else {
      questions.push(toNumericQuizQuestion(task));
    }
  }
  return shuffle(questions).slice(0, 12);
}

function updateQuizScore() {
  krQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  krQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  krQuizPrompt.textContent = question.prompt;
  krQuizFeedback.innerHTML = "";
  krQuizNext.disabled = true;
  krQuizNext.textContent =
    quizState.index === quizState.questions.length - 1 ? "Ergebnis anzeigen" : "Nächste Frage";
  krQuizAnswers.innerHTML = question.options
    .map((option, index) => `<button class="choice-btn" type="button" data-option="${index}">${option}</button>`)
    .join("");
}

function finishQuiz() {
  const percent = Math.round((quizState.correct / quizState.questions.length) * 100);
  quizState.running = false;
  krQuizStatus.textContent = "Test beendet";
  krQuizPrompt.textContent = `Ergebnis: ${quizState.correct}/${quizState.questions.length} (${percent}%)`;
  krQuizAnswers.innerHTML = "";
  krQuizNext.disabled = true;
  setFeedback(
    krQuizFeedback,
    percent >= 80 ? "ok" : "info",
    percent >= 80
      ? "Sehr gut. Dein Kopfrechnen ist stark."
      : "Gute Basis. Übe weiter mit Aufgabenpool und Hilfe-Strategie."
  );
}

function answerQuiz(optionIndex) {
  if (!quizState.running || quizState.answered) {
    return;
  }
  const question = quizState.questions[quizState.index];
  const isCorrect = optionIndex === question.correct;
  quizState.answered = true;
  if (isCorrect) {
    quizState.correct += 1;
  }

  krQuizAnswers.querySelectorAll("button").forEach((button, index) => {
    button.disabled = true;
    if (index === question.correct) {
      button.classList.add("is-correct");
    } else if (index === optionIndex) {
      button.classList.add("is-wrong");
    }
  });
  updateQuizScore();
  krQuizNext.disabled = false;
  setFeedback(
    krQuizFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect ? `Richtig. ${question.explanation}` : `Nicht korrekt. ${question.explanation}`
  );
}

function startQuiz() {
  quizState.running = true;
  quizState.answered = false;
  quizState.index = 0;
  quizState.correct = 0;
  quizState.questions = buildQuizSet();
  krQuizStart.textContent = "Test neu starten";
  updateQuizScore();
  renderQuizQuestion();
}

function nextQuizQuestion() {
  if (!quizState.running) {
    return;
  }
  if (!quizState.answered) {
    setFeedback(krQuizFeedback, "info", "Bitte zuerst eine Antwort auswählen.");
    return;
  }
  if (quizState.index >= quizState.questions.length - 1) {
    finishQuiz();
    return;
  }
  quizState.index += 1;
  quizState.answered = false;
  renderQuizQuestion();
}

function setupQuiz() {
  krQuizStart.addEventListener("click", startQuiz);
  krQuizNext.addEventListener("click", nextQuizQuestion);
  krQuizAnswers.addEventListener("click", (event) => {
    const button = event.target;
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }
    const optionIndex = Number(button.dataset.option);
    if (!Number.isInteger(optionIndex)) {
      return;
    }
    answerQuiz(optionIndex);
  });
}

setupTabs();
setupStrategyDemo();
setupTraining();
setupQuiz();
