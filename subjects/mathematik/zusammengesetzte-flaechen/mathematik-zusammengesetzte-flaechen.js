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

const demoAdd = document.getElementById("zfDemoAdd");
const demoSubtract = document.getElementById("zfDemoSubtract");

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

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(list) {
  return list[randInt(0, list.length - 1)];
}

function switchTab(tabName) {
  tabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === tabName);
  });
  tabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.id === `tab-${tabName}`);
  });
}

function buildAddSvg(task) {
  const { w1, h1, w2, h2 } = task;
  const totalWidth = w1 + w2;
  const totalHeight = Math.max(h1, h2);
  const scale = Math.min(26, 280 / totalWidth, 170 / totalHeight);
  const pad = 24;
  const x0 = pad;
  const y0 = pad + (totalHeight - h1) * scale;
  const x1 = pad + w1 * scale;
  const y1 = pad + (totalHeight - h2) * scale;
  const width = Math.round(totalWidth * scale + pad * 2 + 6);
  const height = Math.round(totalHeight * scale + pad * 2 + 46);

  return `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Zusammengesetzte Flaeche aus zwei Rechtecken">
      <rect x="${x0}" y="${y0}" width="${Math.round(w1 * scale)}" height="${Math.round(h1 * scale)}" fill="#d8efe2" stroke="#3a7f5f" stroke-width="2"></rect>
      <rect x="${x1}" y="${y1}" width="${Math.round(w2 * scale)}" height="${Math.round(h2 * scale)}" fill="#bee4d0" stroke="#3a7f5f" stroke-width="2"></rect>
      <text x="${x0 + Math.round((w1 * scale) / 2)}" y="${height - 16}" text-anchor="middle" font-size="14" fill="#234738">${w1} cm</text>
      <text x="${x1 + Math.round((w2 * scale) / 2)}" y="${height - 16}" text-anchor="middle" font-size="14" fill="#234738">${w2} cm</text>
      <text x="${x0 - 10}" y="${y0 + Math.round((h1 * scale) / 2)}" text-anchor="end" font-size="14" fill="#234738">${h1} cm</text>
      <text x="${x1 + Math.round(w2 * scale) + 10}" y="${y1 + Math.round((h2 * scale) / 2)}" font-size="14" fill="#234738">${h2} cm</text>
    </svg>
  `;
}

function buildSubtractSvg(task) {
  const { outerW, outerH, cutW, cutH } = task;
  const scale = Math.min(24, 290 / outerW, 180 / outerH);
  const pad = 24;
  const width = Math.round(outerW * scale + pad * 2 + 8);
  const height = Math.round(outerH * scale + pad * 2 + 46);
  const x = pad;
  const y = pad;
  const cutX = x + Math.round((outerW - cutW) * scale);
  const cutY = y;

  return `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="L-Form fuer Ergaenzen">
      <rect x="${x}" y="${y}" width="${Math.round(outerW * scale)}" height="${Math.round(outerH * scale)}" fill="#d9eefb" stroke="#2e6f97" stroke-width="2"></rect>
      <rect x="${cutX}" y="${cutY}" width="${Math.round(cutW * scale)}" height="${Math.round(cutH * scale)}" fill="#ffffff" stroke="#2e6f97" stroke-width="2" stroke-dasharray="5 4"></rect>
      <text x="${x + Math.round((outerW * scale) / 2)}" y="${height - 16}" text-anchor="middle" font-size="14" fill="#244b66">${outerW} cm</text>
      <text x="${x - 10}" y="${y + Math.round((outerH * scale) / 2)}" text-anchor="end" font-size="14" fill="#244b66">${outerH} cm</text>
      <text x="${cutX + Math.round((cutW * scale) / 2)}" y="${y - 6}" text-anchor="middle" font-size="13" fill="#244b66">${cutW} cm</text>
      <text x="${cutX + Math.round(cutW * scale) + 8}" y="${cutY + Math.round((cutH * scale) / 2)}" font-size="13" fill="#244b66">${cutH} cm</text>
    </svg>
  `;
}

function buildAddTask(difficulty) {
  const limits = limitsByDifficulty[difficulty] || limitsByDifficulty.standard;
  const w1 = randInt(limits.min + 1, limits.max);
  const h1 = randInt(limits.min, limits.max - 1);
  const w2 = randInt(limits.min, limits.max - 1);
  const h2 = randInt(limits.min, h1);
  const expected = w1 * h1 + w2 * h2;

  return {
    type: "Zerlegen",
    prompt: "Berechne den Flaecheninhalt der Figur. Tipp: in 2 Rechtecke zerlegen.",
    expected,
    svg: buildAddSvg({ w1, h1, w2, h2 }),
  };
}

function buildSubtractTask(difficulty) {
  const limits = limitsByDifficulty[difficulty] || limitsByDifficulty.standard;
  const outerW = randInt(limits.min + 4, limits.max + 3);
  const outerH = randInt(limits.min + 3, limits.max + 2);
  const cutW = randInt(limits.min, Math.max(limits.min, outerW - 2));
  const cutH = randInt(limits.min, Math.max(limits.min, outerH - 2));
  const expected = outerW * outerH - cutW * cutH;

  return {
    type: "Ergaenzen",
    prompt: "Berechne den Flaecheninhalt der Figur. Tipp: Aussenrechteck minus Ausschnitt.",
    expected,
    svg: buildSubtractSvg({ outerW, outerH, cutW, cutH }),
  };
}

function getSelectedTypes() {
  const selected = [...typeChecks]
    .filter((input) => input.checked)
    .map((input) => input.value);
  return selected.length > 0 ? selected : ["add", "subtract"];
}

function createTaskByType(type, difficulty) {
  if (type === "subtract") {
    return buildSubtractTask(difficulty);
  }
  return buildAddTask(difficulty);
}

function generateTaskRound() {
  const difficulty = difficultySelect.value;
  const count = Number(countSelect.value);
  const types = getSelectedTypes();

  currentTasks = Array.from({ length: count }, () => {
    const randomType = pickRandom(types);
    return createTaskByType(randomType, difficulty);
  });

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

    const head = document.createElement("div");
    head.className = "zf-task-head";

    const title = document.createElement("h3");
    title.textContent = `Aufgabe ${index + 1}`;

    const type = document.createElement("span");
    type.className = "zf-task-type";
    type.textContent = task.type;
    head.append(title, type);

    const prompt = document.createElement("p");
    prompt.textContent = task.prompt;

    const drawing = document.createElement("div");
    drawing.className = "zf-task-drawing";
    drawing.innerHTML = task.svg;

    const label = document.createElement("label");
    label.innerHTML = `A = <input type="number" data-answer="${task.expected}" step="1"> cm^2`;

    card.append(head, prompt, drawing, label);
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
    const input = card.querySelector("input[type='number']");
    const expected = Number(input?.dataset.answer || NaN);
    const value = Number(input?.value || NaN);
    const isRight = Number.isFinite(value) && value === expected;
    card.classList.remove("is-correct", "is-wrong");
    card.classList.add(isRight ? "is-correct" : "is-wrong");
    if (isRight) {
      correct += 1;
    }
  });

  const total = currentTasks.length;
  const text = `Ergebnis: ${correct} von ${total} richtig.`;
  taskFeedback.textContent = text;
  taskFeedback.className = correct === total ? "zf-feedback ok" : "zf-feedback bad";
}

function resetTaskInputs() {
  taskList.querySelectorAll("input[type='number']").forEach((input) => {
    input.value = "";
  });
  taskList.querySelectorAll(".zf-task").forEach((card) => {
    card.classList.remove("is-correct", "is-wrong");
  });
  taskFeedback.textContent = "";
  taskFeedback.className = "zf-feedback";
}

function createQuizQuestion() {
  const source = Math.random() < 0.5 ? buildAddTask("standard") : buildSubtractTask("standard");
  const correct = source.expected;
  const offsetA = randInt(2, 12);
  const offsetB = randInt(3, 14);
  const options = Array.from(new Set([correct, correct + offsetA, Math.max(1, correct - offsetB), correct + offsetB]));
  while (options.length < 4) {
    options.push(correct + randInt(1, 10));
  }
  options.sort(() => Math.random() - 0.5);

  return {
    prompt: "Wie gross ist der Flaecheninhalt?",
    drawing: source.svg,
    correct,
    options: options.slice(0, 4),
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
    button.textContent = `${option} cm^2`;
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
    quizFeedback.textContent = "Richtig.";
    quizFeedback.className = "zf-feedback ok";
  } else {
    quizFeedback.textContent = `Nicht ganz. Richtig ist ${current.correct} cm^2.`;
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
  quizQuestions = Array.from({ length: 8 }, () => createQuizQuestion());
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
  demoAdd.innerHTML = buildAddSvg({ w1: 7, h1: 5, w2: 4, h2: 3 });
  demoSubtract.innerHTML = buildSubtractSvg({ outerW: 10, outerH: 7, cutW: 3, cutH: 2 });
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
