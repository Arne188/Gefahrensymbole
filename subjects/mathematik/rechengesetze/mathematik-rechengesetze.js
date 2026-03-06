const rgTabButtons = document.querySelectorAll(".rg-tab-btn");
const rgTabPanels = document.querySelectorAll(".rg-tab");

const rgDemoButtons = document.querySelectorAll(".rg-demo-btn");
const rgDemoTitle = document.getElementById("rgDemoTitle");
const rgDemoText = document.getElementById("rgDemoText");
const rgDemoExample = document.getElementById("rgDemoExample");
const rgDemoTip = document.getElementById("rgDemoTip");

const rgDifficulty = document.getElementById("rgDifficulty");
const rgTaskCount = document.getElementById("rgTaskCount");
const rgLawChecks = document.querySelectorAll(".rg-law-check");
const rgGenerate = document.getElementById("rgGenerate");
const rgCheckAll = document.getElementById("rgCheckAll");
const rgTasks = document.getElementById("rgTasks");
const rgSummary = document.getElementById("rgSummary");

const rgQuizStart = document.getElementById("rgQuizStart");
const rgQuizNext = document.getElementById("rgQuizNext");
const rgQuizScore = document.getElementById("rgQuizScore");
const rgQuizStatus = document.getElementById("rgQuizStatus");
const rgQuizPrompt = document.getElementById("rgQuizPrompt");
const rgQuizAnswers = document.getElementById("rgQuizAnswers");
const rgQuizFeedback = document.getElementById("rgQuizFeedback");

const demoContent = {
  kommutativ: {
    title: "Kommutativgesetz: Reihenfolge tauschen",
    text: "Du darfst bei Plus und Mal Zahlen vertauschen. Das hilft, einfache Zahlenpaare zu bilden.",
    example: "48 + 19 + 52 = 48 + 52 + 19 = 100 + 19 = 119",
    tip: "Suche Summen wie 10, 100 oder Produkte wie 100.",
  },
  assoziativ: {
    title: "Assoziativgesetz: Klammern geschickt setzen",
    text: "Du lässt die Reihenfolge der Zahlen gleich, setzt aber die Klammern anders.",
    example: "(27 + 3) + 45 = 27 + (3 + 45) = 30 + 45 = 75",
    tip: "Klammern so setzen, dass zuerst eine leichte Rechnung entsteht.",
  },
  distributiv: {
    title: "Distributivgesetz: In die Klammer hineinverteilen",
    text: "Die Zahl vor der Klammer wird auf alle Summanden in der Klammer verteilt.",
    example: "7 × (20 + 4) = 7 × 20 + 7 × 4 = 140 + 28 = 168",
    tip: "Nimm die Klammer, wenn sie die Rechnung einfacher macht.",
  },
};

const lawNames = {
  kommutativ: "Kommutativgesetz",
  assoziativ: "Assoziativgesetz",
  distributiv: "Distributivgesetz",
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

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function choose(items) {
  return items[randomInt(0, items.length - 1)];
}

function parseNumberInput(value) {
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
  rgTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;
      rgTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      rgTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${tab}`).classList.add("is-active");
    });
  });
}

function setDemoLaw(lawKey) {
  const content = demoContent[lawKey];
  if (!content) {
    return;
  }
  rgDemoButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.law === lawKey);
  });
  rgDemoTitle.textContent = content.title;
  rgDemoText.textContent = content.text;
  rgDemoExample.textContent = content.example;
  rgDemoTip.textContent = content.tip;
}

function setupDemo() {
  rgDemoButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setDemoLaw(button.dataset.law);
    });
  });
  setDemoLaw("kommutativ");
}

function getSelectedLaws() {
  return [...rgLawChecks]
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
}

function buildKommutativTask(difficulty) {
  const variant = randomInt(0, 2);
  if (variant === 0) {
    let a = randomInt(10, 90);
    let c = 100 - a;
    let b = randomInt(5, difficulty === "leicht" ? 20 : difficulty === "mittel" ? 60 : 120);
    if (difficulty === "leicht") {
      a = randomInt(20, 70);
      c = 100 - a;
      b = randomInt(5, 25);
    }
    return {
      law: "kommutativ",
      type: "numeric",
      prompt: `Rechne geschickt: ${a} + ${b} + ${c} = ?`,
      answer: a + b + c,
      help: [
        "Suche zwei Summanden, die zusammen 100 ergeben.",
        `Hier passen ${a} und ${c} gut zusammen.`,
        "Rechne zuerst dieses leichte Paar, dann den Rest.",
      ],
      explanation: `Mit Vertauschen: ${a} + ${b} + ${c} = ${a} + ${c} + ${b}.`,
    };
  }

  if (variant === 1) {
    const a = choose([4, 5, 8, 25]);
    const c = choose([4, 5, 8, 25]);
    const b = difficulty === "leicht" ? choose([2, 3, 10]) : randomInt(2, 12);
    const answer = a * b * c;
    return {
      law: "kommutativ",
      type: "numeric",
      prompt: `Nutze Tauschen beim Multiplizieren: ${a} × ${b} × ${c} = ?`,
      answer,
      help: [
        "Vertausche die Faktoren so, dass ein leichtes Produkt entsteht.",
        `Zum Beispiel ${a} × ${c} zuerst.`,
        "Danach mit dem dritten Faktor multiplizieren.",
      ],
      explanation: "Beim Multiplizieren darfst du die Reihenfolge vertauschen.",
    };
  }

  const expression = choose([
    "34 + 18 = 18 + 34",
    "7 × 9 = 9 × 7",
    "19 - 4 = 4 - 19",
    "36 : 6 = 6 : 36",
  ]);
  const answer = expression.includes("+") || expression.includes("×") ? "ja" : "nein";
  return {
    law: "kommutativ",
    type: "choice",
    prompt: `Gilt hier das Kommutativgesetz? ${expression}`,
    options: ["ja", "nein"],
    answer,
    help: [
      "Frage dich zuerst: Ist es Plus oder Mal?",
      "Nur bei Plus und Mal gilt das Vertauschen.",
    ],
    explanation: answer === "ja" ? "Ja, hier ist Vertauschen erlaubt." : "Nein, bei Minus oder Division gilt das nicht.",
  };
}

function buildAssoziativTask(difficulty) {
  const variant = randomInt(0, 2);
  if (variant === 0) {
    const a = randomInt(10, difficulty === "leicht" ? 40 : 90);
    const b = randomInt(1, 9);
    const c = 10 - b;
    return {
      law: "assoziativ",
      type: "numeric",
      prompt: `Setze Klammern geschickt: (${a} + ${b}) + ${c} = ?`,
      answer: a + b + c,
      help: [
        "Reihenfolge der Zahlen bleibt gleich.",
        `Setze gedanklich so: ${a} + (${b} + ${c}).`,
        `Rechne ${b} + ${c} zuerst.`,
      ],
      explanation: "Beim Assoziativgesetz änderst du nur die Klammern.",
    };
  }

  if (variant === 1) {
    const a = choose([2, 4, 5, 10]);
    const b = randomInt(3, difficulty === "leicht" ? 6 : 12);
    const c = choose([5, 10]);
    return {
      law: "assoziativ",
      type: "numeric",
      prompt: `Rechne mit Klammern: (${a} × ${b}) × ${c} = ?`,
      answer: a * b * c,
      help: [
        "Du darfst nur die Klammern verschieben, nicht die Reihenfolge.",
        `Rechne lieber ${b} × ${c} zuerst, wenn das leichter ist.`,
      ],
      explanation: "Assoziativ heißt: gleiche Reihenfolge, andere Klammerung.",
    };
  }

  return {
    law: "assoziativ",
    type: "choice",
    prompt: "Welche Umformung nutzt das Assoziativgesetz richtig?",
    options: [
      "(18 + 7) + 3 -> 18 + (7 + 3)",
      "18 + 7 + 3 -> 7 + 18 + 3",
      "18 - (7 + 3) -> (18 - 7) + 3",
      "(18 : 3) : 2 -> 18 : (3 : 2)",
    ],
    answer: "(18 + 7) + 3 -> 18 + (7 + 3)",
    help: [
      "Assoziativgesetz ändert nur Klammern.",
      "Es gilt in Klasse 5 bei Addition und Multiplikation.",
    ],
    explanation: "Nur die erste Option zeigt korrektes Umklammern bei Plus.",
  };
}

function buildDistributivTask(difficulty) {
  const variant = randomInt(0, 2);
  if (variant === 0) {
    const a = randomInt(2, difficulty === "leicht" ? 6 : 12);
    const b = randomInt(10, difficulty === "leicht" ? 30 : 60);
    const c = randomInt(2, difficulty === "leicht" ? 9 : 20);
    return {
      law: "distributiv",
      type: "numeric",
      prompt: `Multipliziere aus: ${a} × (${b} + ${c}) = ?`,
      answer: a * (b + c),
      help: [
        `Verteile ${a} auf beide Summanden in der Klammer.`,
        `Rechne ${a} × ${b} und ${a} × ${c}.`,
        "Addiere beide Ergebnisse.",
      ],
      explanation: `${a} × (${b} + ${c}) = ${a * b} + ${a * c}.`,
    };
  }

  if (variant === 1) {
    const a = randomInt(2, 12);
    const b = randomInt(5, difficulty === "leicht" ? 12 : 20);
    const c = randomInt(2, difficulty === "leicht" ? 8 : 15);
    return {
      law: "distributiv",
      type: "numeric",
      prompt: `Fasse in eine Klammer: ${a} × ${b} + ${a} × ${c} = ?`,
      answer: a * (b + c),
      help: [
        `Suche den gemeinsamen Faktor: ${a}.`,
        `Ziehe ihn vor die Klammer: ${a} × (${b} + ${c}).`,
        "Rechne dann die Klammer aus.",
      ],
      explanation: `Rückwärts genutzt: ${a} × ${b} + ${a} × ${c} = ${a} × (${b} + ${c}).`,
    };
  }

  const statements = [
    { text: "5 × (12 + 3) = 5 × 12 + 5 × 3", valid: "ja" },
    { text: "5 × (12 + 3) = 5 × 12 + 3", valid: "nein" },
    { text: "7 × (20 - 4) = 7 × 20 - 7 × 4", valid: "ja" },
    { text: "7 × (20 - 4) = 7 × 20 - 4", valid: "nein" },
  ];
  const selected = choose(statements);
  return {
    law: "distributiv",
    type: "choice",
    prompt: `Ist die Umformung richtig? ${selected.text}`,
    options: ["ja", "nein"],
    answer: selected.valid,
    help: [
      "Bei Distributiv muss die Zahl vor der Klammer auf jeden Teil verteilt werden.",
      "Prüfe, ob jeder Summand oder Differenzteil multipliziert wurde.",
    ],
    explanation: selected.valid === "ja" ? "Hier wurde korrekt auf alle Teile verteilt." : "Hier fehlt mindestens ein richtiger Teil der Verteilung.",
  };
}

function buildTask(law, difficulty) {
  if (law === "kommutativ") {
    return buildKommutativTask(difficulty);
  }
  if (law === "assoziativ") {
    return buildAssoziativTask(difficulty);
  }
  return buildDistributivTask(difficulty);
}

function renderTasks() {
  rgTasks.innerHTML = generatedTasks
    .map((task, index) => {
      const answerInput =
        task.type === "numeric"
          ? `<input type="text" data-role="answer" placeholder="Antwort eingeben">`
          : `
            <select data-role="answer">
              <option value="">Bitte wählen</option>
              ${task.options.map((option) => `<option value="${option}">${option}</option>`).join("")}
            </select>
          `;

      return `
        <article class="rg-task-row" data-index="${index}">
          <p class="rg-task-head">Aufgabe ${index + 1} (${lawNames[task.law]})</p>
          <p>${task.prompt}</p>
          <div class="rg-answer-line">${answerInput}</div>
          <div class="rg-row-buttons">
            <button type="button" data-action="help">Hilfe anzeigen</button>
            <button type="button" data-action="check">Aufgabe prüfen</button>
          </div>
          <div class="rg-help-box" data-role="help" hidden>
            <p><strong>Lösungsstrategie:</strong></p>
            <ol>${task.help.map((step) => `<li>${step}</li>`).join("")}</ol>
          </div>
          <div data-role="feedback"></div>
        </article>
      `;
    })
    .join("");
}

function createTaskSet() {
  const selectedLaws = getSelectedLaws();
  if (selectedLaws.length === 0) {
    setFeedback(rgSummary, "bad", "Bitte mindestens ein Gesetz auswählen.");
    return;
  }
  const difficulty = rgDifficulty.value;
  const count = Number(rgTaskCount.value);
  const tasks = [];
  while (tasks.length < count) {
    const law = choose(selectedLaws);
    tasks.push(buildTask(law, difficulty));
  }
  generatedTasks = tasks;
  renderTasks();
  setFeedback(rgSummary, "info", "Neue Aufgaben erstellt. Nutze „Hilfe anzeigen“, wenn du Unterstützung brauchst.");
}

function evaluateTask(index) {
  const task = generatedTasks[index];
  const row = rgTasks.querySelector(`.rg-task-row[data-index="${index}"]`);
  if (!task || !(row instanceof HTMLElement)) {
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
    const value = parseNumberInput(answerField.value);
    if (!Number.isFinite(value)) {
      setFeedback(feedback, "info", "Bitte zuerst eine Zahl eingeben.");
      return { answered: false, correct: false };
    }
    const isCorrect = Math.abs(value - task.answer) < 0.000001;
    row.classList.add(isCorrect ? "is-correct" : "is-wrong");
    setFeedback(
      feedback,
      isCorrect ? "ok" : "bad",
      isCorrect
        ? `Richtig. ${task.explanation}`
        : `Noch nicht korrekt. Richtige Lösung: ${task.answer}. ${task.explanation}`
    );
    return { answered: true, correct: isCorrect };
  }

  if (!(answerField instanceof HTMLSelectElement) || !answerField.value) {
    setFeedback(feedback, "info", "Bitte zuerst eine Antwort auswählen.");
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

function checkAllTasks() {
  if (generatedTasks.length === 0) {
    setFeedback(rgSummary, "info", "Erstelle zuerst Aufgaben.");
    return;
  }
  let answered = 0;
  let correct = 0;
  for (let index = 0; index < generatedTasks.length; index += 1) {
    const result = evaluateTask(index);
    if (result.answered) {
      answered += 1;
    }
    if (result.correct) {
      correct += 1;
    }
  }
  if (answered < generatedTasks.length) {
    setFeedback(rgSummary, "info", `Du hast ${answered}/${generatedTasks.length} Aufgaben beantwortet.`);
    return;
  }
  setFeedback(
    rgSummary,
    correct === generatedTasks.length ? "ok" : "bad",
    `${correct}/${generatedTasks.length} richtig. ${
      correct === generatedTasks.length
        ? "Sehr stark gelöst."
        : "Nutze die Hilfefelder bei den schwierigen Aufgaben und erstelle danach neue Aufgaben."
    }`
  );
}

function setupTraining() {
  rgGenerate.addEventListener("click", createTaskSet);
  rgCheckAll.addEventListener("click", checkAllTasks);

  rgTasks.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) {
      return;
    }
    const row = target.closest(".rg-task-row");
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
      evaluateTask(index);
    }
  });

  createTaskSet();
}

function buildNumericQuizQuestion() {
  const law = choose(["kommutativ", "assoziativ", "distributiv"]);
  const difficulty = choose(["leicht", "mittel", "schwer"]);
  let task = buildTask(law, difficulty);
  while (task.type !== "numeric") {
    task = buildTask(law, difficulty);
  }

  const correct = Number(task.answer);
  const optionSet = new Set([correct]);
  while (optionSet.size < 4) {
    const spread = Math.max(2, Math.round(Math.abs(correct) * 0.2));
    const candidate = correct + randomInt(-spread, spread);
    if (candidate !== correct) {
      optionSet.add(candidate);
    }
  }
  const options = shuffle([...optionSet]).map((value) => String(value));
  return {
    prompt: task.prompt,
    options,
    correct: options.indexOf(String(correct)),
    explanation: `${task.explanation} Lösung: ${correct}.`,
  };
}

function buildChoiceQuizQuestion() {
  const fixed = [
    {
      prompt: "Bei welchem Rechenzeichen gilt das Kommutativgesetz?",
      options: ["Bei + und ×", "Nur bei -", "Nur bei :", "Bei - und :"],
      correct: 0,
      explanation: "Vertauschen ist nur bei Addition und Multiplikation erlaubt.",
    },
    {
      prompt: "Was verändert das Assoziativgesetz?",
      options: ["Die Klammern", "Die Zahlen", "Das Rechenzeichen", "Das Ergebnis immer auf 0"],
      correct: 0,
      explanation: "Assoziativ bedeutet: gleiche Reihenfolge, andere Klammerung.",
    },
    {
      prompt: "Welche Umformung ist distributiv richtig?",
      options: [
        "8 × (10 + 2) = 8 × 10 + 8 × 2",
        "8 × (10 + 2) = 8 × 10 + 2",
        "8 × (10 + 2) = 10 + 2 × 8",
        "8 × (10 + 2) = 80 + 2",
      ],
      correct: 0,
      explanation: "Beim Distributivgesetz wird auf jeden Summanden verteilt.",
    },
    {
      prompt: "Welche Aussage stimmt?",
      options: [
        "Kommutativ-, Assoziativ- und Distributivgesetz helfen beim geschickten Rechnen.",
        "Diese Gesetze sind nur in der Geometrie wichtig.",
        "Diese Gesetze gelten nur für sehr große Zahlen.",
        "Diese Gesetze ändern das Rechenzeichen von selbst.",
      ],
      correct: 0,
      explanation: "Die drei Gesetze sind zentrale Rechenstrategien für Terme.",
    },
  ];
  return choose(fixed);
}

function buildQuizSet() {
  const questions = [buildChoiceQuizQuestion(), buildChoiceQuizQuestion(), buildChoiceQuizQuestion()];
  while (questions.length < 10) {
    questions.push(Math.random() < 0.6 ? buildNumericQuizQuestion() : buildChoiceQuizQuestion());
  }
  return shuffle(questions);
}

function updateQuizScore() {
  rgQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  rgQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  rgQuizPrompt.textContent = question.prompt;
  rgQuizFeedback.innerHTML = "";
  rgQuizNext.disabled = true;
  rgQuizNext.textContent =
    quizState.index === quizState.questions.length - 1 ? "Ergebnis anzeigen" : "Nächste Frage";
  rgQuizAnswers.innerHTML = question.options
    .map((option, index) => `<button class="choice-btn" type="button" data-option="${index}">${option}</button>`)
    .join("");
}

function finishQuiz() {
  const percent = Math.round((quizState.correct / quizState.questions.length) * 100);
  quizState.running = false;
  rgQuizStatus.textContent = "Test beendet";
  rgQuizPrompt.textContent = `Ergebnis: ${quizState.correct}/${quizState.questions.length} (${percent}%)`;
  rgQuizAnswers.innerHTML = "";
  rgQuizNext.disabled = true;
  setFeedback(
    rgQuizFeedback,
    percent >= 80 ? "ok" : "info",
    percent >= 80
      ? "Sehr gut. Du setzt die Rechengesetze sicher ein."
      : "Gute Basis. Wiederhole im Training die Aufgaben mit Hilfe-Strategie."
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
  rgQuizAnswers.querySelectorAll("button").forEach((button, index) => {
    button.disabled = true;
    if (index === question.correct) {
      button.classList.add("is-correct");
    } else if (index === optionIndex) {
      button.classList.add("is-wrong");
    }
  });
  updateQuizScore();
  rgQuizNext.disabled = false;
  setFeedback(
    rgQuizFeedback,
    isCorrect ? "ok" : "bad",
    isCorrect
      ? `Richtig. ${question.explanation}`
      : `Nicht korrekt. ${question.explanation}`
  );
}

function startQuiz() {
  quizState.running = true;
  quizState.answered = false;
  quizState.index = 0;
  quizState.correct = 0;
  quizState.questions = buildQuizSet();
  rgQuizStart.textContent = "Test neu starten";
  updateQuizScore();
  renderQuizQuestion();
}

function nextQuiz() {
  if (!quizState.running) {
    return;
  }
  if (!quizState.answered) {
    setFeedback(rgQuizFeedback, "info", "Bitte erst eine Antwort auswählen.");
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
  rgQuizStart.addEventListener("click", startQuiz);
  rgQuizNext.addEventListener("click", nextQuiz);
  rgQuizAnswers.addEventListener("click", (event) => {
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
setupDemo();
setupTraining();
setupQuiz();
