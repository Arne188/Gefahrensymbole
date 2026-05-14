const tabButtons = document.querySelectorAll(".zf-tab-btn");
const tabs = document.querySelectorAll(".zf-tab");

const taskList = document.getElementById("zfTaskList");
const taskFeedback = document.getElementById("zfFeedback");
const generateBtn = document.getElementById("zfGenerate");
const checkBtn = document.getElementById("zfCheck");
const resetBtn = document.getElementById("zfReset");
const difficultySelect = document.getElementById("zfDifficulty");
const countSelect = document.getElementById("zfCount");
const typeChecks = document.querySelectorAll(".zf-type-check");

const quizStartBtn = document.getElementById("zfQuizStart");
const quizNextBtn = document.getElementById("zfQuizNext");
const quizScore = document.getElementById("zfQuizScore");
const quizStatus = document.getElementById("zfQuizStatus");
const quizPrompt = document.getElementById("zfQuizPrompt");
const quizDrawing = document.getElementById("zfQuizDrawing");
const quizOptions = document.getElementById("zfQuizOptions");
const quizFeedback = document.getElementById("zfQuizFeedback");

const demoSplit = document.getElementById("zfDemoSplit");
const demoComplete = document.getElementById("zfDemoComplete");
const demoMissing = document.getElementById("zfDemoMissing");

let currentTasks = [];
let quizQuestions = [];
let quizIndex = 0;
let quizPoints = 0;
let quizLocked = true;

const limitsByDifficulty = {
  basis: { min: 2, max: 8 },
  standard: { min: 3, max: 12 },
  profi: { min: 4, max: 18 },
};

const storyContexts = [
  {
    thing: "Gartenbeet",
    intro: "Ein Gartenbeet hat die Form eines L. Der Zaun steht nicht auf der Flaeche.",
    unit: "m",
  },
  {
    thing: "Teppich",
    intro: "Ein Teppich soll in eine L-foermige Sitzecke gelegt werden.",
    unit: "m",
  },
  {
    thing: "Pausenhof",
    intro: "Ein Teil des Pausenhofs soll neu gepflastert werden.",
    unit: "m",
  },
  {
    thing: "Plakat",
    intro: "Ein Plakat besteht aus zwei rechteckigen Papierstuecken.",
    unit: "cm",
  },
];

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(list) {
  return list[randInt(0, list.length - 1)];
}

function parseAnswer(value) {
  return Number(String(value || "").replace(",", ".").trim());
}

function formatUnit(unit) {
  return unit === "cm2" ? "cm^2" : unit;
}

function switchTab(tabName) {
  tabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === tabName);
  });
  tabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.id === `tab-${tabName}`);
  });
}

function svgText(x, y, text, anchor = "middle", color = "#203c32", size = 14) {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" fill="${color}" font-weight="700">${text}</text>`;
}

function svgArrowMarker() {
  return `
    <defs>
      <marker id="zfArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
        <path d="M 0 0 L 8 4 L 0 8 z" fill="#29483b"></path>
      </marker>
    </defs>
  `;
}

function dimensionLine(x1, y1, x2, y2) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#29483b" stroke-width="1.5" marker-start="url(#zfArrow)" marker-end="url(#zfArrow)"></line>`;
}

function buildSplitSvg(data, options = {}) {
  const unit = options.unit || "cm";
  const labelMode = options.labelMode || "normal";
  const { leftW, tallH, rightW, bottomH } = data;
  const totalW = leftW + rightW;
  const scale = Math.min(30, 300 / totalW, 190 / tallH);
  const pad = 48;
  const x = pad;
  const y = pad;
  const lx = x + leftW * scale;
  const notchY = y + (tallH - bottomH) * scale;
  const rightX = x + totalW * scale;
  const bottomY = y + tallH * scale;
  const width = Math.round(totalW * scale + pad * 2 + 26);
  const height = Math.round(tallH * scale + pad * 2 + 48);
  const path = `M ${x} ${y} L ${lx} ${y} L ${lx} ${notchY} L ${rightX} ${notchY} L ${rightX} ${bottomY} L ${x} ${bottomY} Z`;
  const bottomLabels = labelMode === "missing"
    ? `
      ${dimensionLine(x, y - 22, lx, y - 22)}
      ${svgText((x + lx) / 2, y - 30, `${leftW} ${unit}`)}
      ${dimensionLine(x, bottomY + 22, rightX, bottomY + 22)}
      ${svgText((x + rightX) / 2, bottomY + 42, `${totalW} ${unit}`)}
      ${svgText((lx + rightX) / 2, bottomY + 13, "x", "middle", "#b73535", 18)}
    `
    : `
      ${dimensionLine(x, bottomY + 22, lx, bottomY + 22)}
      ${svgText((x + lx) / 2, bottomY + 42, `${leftW} ${unit}`)}
      ${dimensionLine(lx, bottomY + 22, rightX, bottomY + 22)}
      ${svgText((lx + rightX) / 2, bottomY + 42, `${rightW} ${unit}`)}
    `;

  return `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="L-Form durch Zerlegen">
      ${svgArrowMarker()}
      <path d="${path}" fill="#dff2e7" stroke="#1f7a55" stroke-width="3"></path>
      <line x1="${lx}" y1="${notchY}" x2="${lx}" y2="${bottomY}" stroke="#1f7a55" stroke-width="2" stroke-dasharray="6 5"></line>
      <rect x="${x + 6}" y="${y + 6}" width="${leftW * scale - 12}" height="${tallH * scale - 12}" fill="rgba(31,122,85,0.09)" stroke="none"></rect>
      <rect x="${lx + 6}" y="${notchY + 6}" width="${rightW * scale - 12}" height="${bottomH * scale - 12}" fill="rgba(216,95,22,0.13)" stroke="none"></rect>
      ${bottomLabels}
      ${dimensionLine(x - 20, y, x - 20, bottomY)}
      ${svgText(x - 28, (y + bottomY) / 2, `${tallH} ${unit}`, "end")}
      ${dimensionLine(rightX + 18, notchY, rightX + 18, bottomY)}
      ${svgText(rightX + 26, (notchY + bottomY) / 2, `${bottomH} ${unit}`, "start")}
      ${svgText(x + (leftW * scale) / 2, y + (tallH * scale) / 2, `${leftW} * ${tallH}`, "middle", "#1f6549", 13)}
      ${svgText(lx + (rightW * scale) / 2, notchY + (bottomH * scale) / 2, labelMode === "missing" ? "x * " + bottomH : `${rightW} * ${bottomH}`, "middle", "#9c4a15", 13)}
    </svg>
  `;
}

function buildCompleteSvg(data, options = {}) {
  const unit = options.unit || "cm";
  const labelMode = options.labelMode || "normal";
  const { outerW, outerH, cutW, cutH } = data;
  const scale = Math.min(28, 320 / outerW, 190 / outerH);
  const pad = 50;
  const x = pad;
  const y = pad;
  const rightX = x + outerW * scale;
  const bottomY = y + outerH * scale;
  const cutX = rightX - cutW * scale;
  const cutBottom = y + cutH * scale;
  const width = Math.round(outerW * scale + pad * 2 + 26);
  const height = Math.round(outerH * scale + pad * 2 + 48);
  const path = `M ${x} ${y} L ${cutX} ${y} L ${cutX} ${cutBottom} L ${rightX} ${cutBottom} L ${rightX} ${bottomY} L ${x} ${bottomY} Z`;
  const cutLabel = labelMode === "missing" ? "x" : `${cutW} ${unit}`;

  return `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="L-Form durch Ergaenzen">
      ${svgArrowMarker()}
      <path d="${path}" fill="#e2effb" stroke="#1d5fa7" stroke-width="3"></path>
      <rect x="${cutX}" y="${y}" width="${cutW * scale}" height="${cutH * scale}" fill="#fff" stroke="#1d5fa7" stroke-width="2" stroke-dasharray="7 5"></rect>
      <rect x="${x}" y="${y}" width="${outerW * scale}" height="${outerH * scale}" fill="none" stroke="#d85f16" stroke-width="2" stroke-dasharray="7 5"></rect>
      ${dimensionLine(x, bottomY + 22, rightX, bottomY + 22)}
      ${svgText((x + rightX) / 2, bottomY + 42, `${outerW} ${unit}`)}
      ${dimensionLine(x - 20, y, x - 20, bottomY)}
      ${svgText(x - 28, (y + bottomY) / 2, `${outerH} ${unit}`, "end")}
      ${dimensionLine(cutX, y - 20, rightX, y - 20)}
      ${svgText((cutX + rightX) / 2, y - 28, cutLabel, "middle", labelMode === "missing" ? "#b73535" : "#203c32")}
      ${dimensionLine(rightX + 18, y, rightX + 18, cutBottom)}
      ${svgText(rightX + 26, (y + cutBottom) / 2, `${cutH} ${unit}`, "start")}
      ${svgText(x + (outerW * scale) / 2, y + (outerH * scale) / 2 + 14, `${outerW} * ${outerH}`, "middle", "#1d5fa7", 14)}
      ${svgText(cutX + (cutW * scale) / 2, y + (cutH * scale) / 2 + 5, labelMode === "missing" ? "x * " + cutH : `${cutW} * ${cutH}`, "middle", "#b73535", 13)}
    </svg>
  `;
}

function buildSplitTask(difficulty, unit = "cm") {
  const limits = limitsByDifficulty[difficulty] || limitsByDifficulty.standard;
  const leftW = randInt(limits.min, Math.max(limits.min + 1, limits.max - 2));
  const tallH = randInt(limits.min + 3, limits.max + 3);
  const rightW = randInt(limits.min, limits.max);
  const bottomH = randInt(limits.min, Math.max(limits.min, tallH - 2));
  const expected = leftW * tallH + rightW * bottomH;

  return {
    type: "Zerlegen",
    title: "Flaechen addieren",
    prompt: "Berechne den Flaecheninhalt der L-Form. Zerlege in zwei Rechtecke.",
    answerLabel: "A",
    unit: `${unit}^2`,
    expected,
    svg: buildSplitSvg({ leftW, tallH, rightW, bottomH }, { unit }),
    solution: `A = ${leftW} * ${tallH} + ${rightW} * ${bottomH} = ${leftW * tallH} + ${rightW * bottomH} = ${expected} ${unit}^2`,
  };
}

function buildCompleteTask(difficulty, unit = "cm") {
  const limits = limitsByDifficulty[difficulty] || limitsByDifficulty.standard;
  const outerW = randInt(limits.min + 5, limits.max + 5);
  const outerH = randInt(limits.min + 4, limits.max + 4);
  const cutW = randInt(limits.min, Math.max(limits.min, outerW - 3));
  const cutH = randInt(limits.min, Math.max(limits.min, outerH - 3));
  const expected = outerW * outerH - cutW * cutH;

  return {
    type: "Ergaenzen",
    title: "Grosses Rechteck minus Ausschnitt",
    prompt: "Berechne den Flaecheninhalt. Denke ein grosses Rechteck und ziehe die fehlende Ecke ab.",
    answerLabel: "A",
    unit: `${unit}^2`,
    expected,
    svg: buildCompleteSvg({ outerW, outerH, cutW, cutH }, { unit }),
    solution: `A = ${outerW} * ${outerH} - ${cutW} * ${cutH} = ${outerW * outerH} - ${cutW * cutH} = ${expected} ${unit}^2`,
  };
}

function buildMissingTask(difficulty) {
  const limits = limitsByDifficulty[difficulty] || limitsByDifficulty.standard;
  const leftW = randInt(limits.min, Math.max(limits.min, limits.max - 2));
  const rightW = randInt(limits.min, limits.max);
  const tallH = randInt(limits.min + 3, limits.max + 3);
  const bottomH = randInt(limits.min, Math.max(limits.min, tallH - 2));
  const expected = rightW;
  const totalW = leftW + rightW;

  return {
    type: "Fehlendes Mass",
    title: "Welche Laenge fehlt?",
    prompt: "Bestimme die fehlende untere Teilstrecke x. Nutze: ganze Laenge minus bekannte Laenge.",
    answerLabel: "x",
    unit: "cm",
    expected,
    svg: buildSplitSvg({ leftW, tallH, rightW, bottomH }, { unit: "cm", labelMode: "missing" }),
    solution: `x = ${totalW} - ${leftW} = ${expected} cm`,
  };
}

function buildStoryTask(difficulty) {
  const context = pickRandom(storyContexts);
  const unit = context.unit;
  const useComplete = Math.random() < 0.65;
  const task = useComplete ? buildCompleteTask(difficulty, unit) : buildSplitTask(difficulty, unit);
  task.type = "Sachaufgabe";
  task.title = context.thing;
  task.prompt = `${context.intro} Wie gross ist die Flaeche?`;
  task.solution = `${context.thing}: ${task.solution}. Antwort: Die Flaeche betraegt ${task.expected} ${unit}^2.`;
  return task;
}

function getSelectedTypes() {
  const selected = [...typeChecks]
    .filter((input) => input.checked)
    .map((input) => input.value);
  return selected.length > 0 ? selected : ["split", "complete", "missing", "story"];
}

function createTaskByType(type, difficulty) {
  if (type === "complete") {
    return buildCompleteTask(difficulty);
  }
  if (type === "missing") {
    return buildMissingTask(difficulty);
  }
  if (type === "story") {
    return buildStoryTask(difficulty);
  }
  return buildSplitTask(difficulty);
}

function generateTaskRound() {
  const difficulty = difficultySelect.value;
  const count = Number(countSelect.value);
  const types = getSelectedTypes();

  currentTasks = Array.from({ length: count }, () => createTaskByType(pickRandom(types), difficulty));
  renderTaskRound();
}

function renderTaskRound() {
  taskList.replaceChildren();
  taskFeedback.textContent = "";
  taskFeedback.className = "zf-feedback";

  currentTasks.forEach((task, index) => {
    const card = document.createElement("article");
    card.className = "zf-task";
    card.dataset.index = String(index);

    const main = document.createElement("div");
    main.className = "zf-task-main";

    const head = document.createElement("div");
    head.className = "zf-task-head";

    const title = document.createElement("h3");
    title.textContent = `Aufgabe ${index + 1}: ${task.title}`;

    const type = document.createElement("span");
    type.className = "zf-task-type";
    type.textContent = task.type;
    head.append(title, type);

    const prompt = document.createElement("p");
    prompt.textContent = task.prompt;

    const answer = document.createElement("label");
    answer.className = "zf-answer-row";
    answer.innerHTML = `${task.answerLabel} = <input type="text" inputmode="decimal" data-answer="${task.expected}" aria-label="Antwort fuer Aufgabe ${index + 1}"> ${formatUnit(task.unit)}`;

    const details = document.createElement("details");
    details.className = "zf-solution";
    details.innerHTML = `<summary>Loesungsweg</summary><p>${task.solution}</p>`;

    const drawing = document.createElement("div");
    drawing.className = "zf-task-drawing";
    drawing.innerHTML = task.svg;

    main.append(head, prompt, answer, details);
    card.append(main, drawing);
    taskList.append(card);
  });
}

function checkTaskRound() {
  if (currentTasks.length === 0) {
    taskFeedback.textContent = "Bitte erst eine Runde erzeugen.";
    taskFeedback.className = "zf-feedback bad";
    return;
  }

  let correct = 0;
  const cards = taskList.querySelectorAll(".zf-task");
  cards.forEach((card) => {
    const input = card.querySelector("input");
    const expected = Number(input?.dataset.answer || NaN);
    const value = parseAnswer(input?.value);
    const isRight = Number.isFinite(value) && Math.abs(value - expected) < 0.001;
    card.classList.remove("is-correct", "is-wrong");
    card.classList.add(isRight ? "is-correct" : "is-wrong");
    if (!isRight) {
      const details = card.querySelector("details");
      if (details) {
        details.open = true;
      }
    }
    if (isRight) {
      correct += 1;
    }
  });

  const total = currentTasks.length;
  taskFeedback.textContent = `Ergebnis: ${correct} von ${total} richtig.`;
  taskFeedback.className = correct === total ? "zf-feedback ok" : "zf-feedback bad";
}

function resetTaskInputs() {
  taskList.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
  taskList.querySelectorAll(".zf-task").forEach((card) => {
    card.classList.remove("is-correct", "is-wrong");
    const details = card.querySelector("details");
    if (details) {
      details.open = false;
    }
  });
  taskFeedback.textContent = "";
  taskFeedback.className = "zf-feedback";
}

function createQuizQuestion() {
  const task = createTaskByType(pickRandom(["split", "complete", "missing", "story"]), "standard");
  const correct = task.expected;
  const spread = task.unit === "cm" ? [1, 2, 3, 4] : [4, 6, 8, 10, 12];
  const options = new Set([correct]);
  while (options.size < 4) {
    const offset = pickRandom(spread);
    const sign = Math.random() < 0.5 ? -1 : 1;
    const next = Math.max(1, correct + sign * offset);
    options.add(next);
  }

  return {
    prompt: `${task.title}: ${task.answerLabel} berechnen`,
    drawing: task.svg,
    correct,
    unit: task.unit,
    options: [...options].sort(() => Math.random() - 0.5),
    solution: task.solution,
  };
}

function renderQuizQuestion() {
  const current = quizQuestions[quizIndex];
  quizStatus.textContent = `Frage ${quizIndex + 1} von ${quizQuestions.length}`;
  quizPrompt.textContent = current.prompt;
  quizDrawing.innerHTML = current.drawing;
  quizFeedback.textContent = "";
  quizFeedback.className = "zf-feedback";
  quizOptions.replaceChildren();
  quizLocked = false;

  current.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-btn";
    button.textContent = `${option} ${formatUnit(current.unit)}`;
    button.addEventListener("click", () => handleQuizAnswer(option));
    quizOptions.append(button);
  });
}

function handleQuizAnswer(value) {
  if (quizLocked) {
    return;
  }
  quizLocked = true;

  const current = quizQuestions[quizIndex];
  const isCorrect = value === current.correct;
  if (isCorrect) {
    quizPoints += 1;
    quizFeedback.textContent = `Richtig. ${current.solution}`;
    quizFeedback.className = "zf-feedback ok";
  } else {
    quizFeedback.textContent = `Nicht ganz. Richtig ist ${current.correct} ${formatUnit(current.unit)}. ${current.solution}`;
    quizFeedback.className = "zf-feedback bad";
  }

  quizScore.textContent = `Punkte: ${quizPoints} / ${quizQuestions.length}`;
  quizOptions.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  const lastQuestion = quizIndex >= quizQuestions.length - 1;
  quizNextBtn.disabled = lastQuestion;
  if (lastQuestion) {
    quizStatus.textContent = `Fertig. Endstand: ${quizPoints} von ${quizQuestions.length}`;
  }
}

function startQuiz() {
  quizQuestions = Array.from({ length: 10 }, () => createQuizQuestion());
  quizIndex = 0;
  quizPoints = 0;
  quizScore.textContent = `Punkte: 0 / ${quizQuestions.length}`;
  quizNextBtn.disabled = false;
  renderQuizQuestion();
}

function nextQuizQuestion() {
  if (quizIndex >= quizQuestions.length - 1) {
    return;
  }
  quizIndex += 1;
  renderQuizQuestion();
}

function renderDemos() {
  demoSplit.innerHTML = buildSplitSvg({ leftW: 3, tallH: 5, rightW: 3, bottomH: 2 }, { unit: "cm" });
  demoComplete.innerHTML = buildCompleteSvg({ outerW: 6, outerH: 5, cutW: 2, cutH: 3 }, { unit: "cm" });
  demoMissing.innerHTML = buildSplitSvg({ leftW: 4, tallH: 7, rightW: 3, bottomH: 3 }, { unit: "cm", labelMode: "missing" });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    switchTab(button.dataset.tab);
  });
});

generateBtn?.addEventListener("click", generateTaskRound);
checkBtn?.addEventListener("click", checkTaskRound);
resetBtn?.addEventListener("click", resetTaskInputs);
quizStartBtn?.addEventListener("click", startQuiz);
quizNextBtn?.addEventListener("click", nextQuizQuestion);

renderDemos();
generateTaskRound();
