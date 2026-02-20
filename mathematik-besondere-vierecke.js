const maTabButtons = document.querySelectorAll(".ma-tab-btn");
const maTabPanels = document.querySelectorAll(".ma-tab");

const maPropertyRows = document.getElementById("maPropertyRows");
const maPropertyCheck = document.getElementById("maPropertyCheck");
const maPropertyReset = document.getElementById("maPropertyReset");
const maPropertyFeedback = document.getElementById("maPropertyFeedback");

const filterOnePairParallel = document.getElementById("filterOnePairParallel");
const filterTwoPairsParallel = document.getElementById("filterTwoPairsParallel");
const filterFourRightAngles = document.getElementById("filterFourRightAngles");
const filterFourEqualSides = document.getElementById("filterFourEqualSides");
const filterAdjacentPairsEqual = document.getElementById("filterAdjacentPairsEqual");
const maFilterApply = document.getElementById("maFilterApply");
const maFilterReset = document.getElementById("maFilterReset");
const maFilterResult = document.getElementById("maFilterResult");
const maPresetButtons = document.querySelectorAll(".ma-preset-btn");

const maRelationRows = document.getElementById("maRelationRows");
const maRelationCheck = document.getElementById("maRelationCheck");
const maRelationReset = document.getElementById("maRelationReset");
const maRelationFeedback = document.getElementById("maRelationFeedback");

const maQuizStart = document.getElementById("maQuizStart");
const maQuizNext = document.getElementById("maQuizNext");
const maQuizScore = document.getElementById("maQuizScore");
const maQuizStatus = document.getElementById("maQuizStatus");
const maQuizPrompt = document.getElementById("maQuizPrompt");
const maQuizAnswers = document.getElementById("maQuizAnswers");
const maQuizFeedback = document.getElementById("maQuizFeedback");

const propertyTasks = [
  {
    id: "p1",
    text: "Vier rechte Winkel und zwei Paare paralleler Seiten.",
    answer: "Rechteck",
  },
  {
    id: "p2",
    text: "Vier gleich lange Seiten und zwei Paare paralleler Seiten.",
    answer: "Raute",
  },
  {
    id: "p3",
    text: "Mindestens ein Paar gegenueberliegender Seiten ist parallel.",
    answer: "Trapez",
  },
  {
    id: "p4",
    text: "Zwei Paare benachbarter gleich langer Seiten.",
    answer: "Drachenviereck",
  },
  {
    id: "p5",
    text: "Vier rechte Winkel und vier gleich lange Seiten.",
    answer: "Quadrat",
  },
  {
    id: "p6",
    text: "Gegenueberliegende Seiten parallel und gleich lang.",
    answer: "Parallelogramm",
  },
];

const relationTasks = [
  {
    id: "r1",
    text: "Jedes Quadrat ist ein Rechteck.",
    correct: "ja",
  },
  {
    id: "r2",
    text: "Jedes Rechteck ist ein Quadrat.",
    correct: "nein",
  },
  {
    id: "r3",
    text: "Jede Raute ist ein Parallelogramm.",
    correct: "ja",
  },
  {
    id: "r4",
    text: "Jedes Parallelogramm ist ein Trapez (mit der Definition mindestens ein Paar parallel).",
    correct: "ja",
  },
  {
    id: "r5",
    text: "Jedes Drachenviereck ist eine Raute.",
    correct: "nein",
  },
];

const figures = [
  {
    id: "trapez",
    name: "Trapez",
    description: "Mindestens ein Paar gegenueberliegender Seiten ist parallel.",
    props: {
      onePairParallel: true,
      twoPairsParallel: false,
      fourRightAngles: false,
      fourEqualSides: false,
      adjacentPairsEqual: false,
    },
  },
  {
    id: "parallelogramm",
    name: "Parallelogramm",
    description: "Zwei Paare gegenueberliegender Seiten sind parallel.",
    props: {
      onePairParallel: true,
      twoPairsParallel: true,
      fourRightAngles: false,
      fourEqualSides: false,
      adjacentPairsEqual: false,
    },
  },
  {
    id: "rechteck",
    name: "Rechteck",
    description: "Parallelogramm mit vier rechten Winkeln.",
    props: {
      onePairParallel: true,
      twoPairsParallel: true,
      fourRightAngles: true,
      fourEqualSides: false,
      adjacentPairsEqual: false,
    },
  },
  {
    id: "raute",
    name: "Raute",
    description: "Parallelogramm mit vier gleich langen Seiten.",
    props: {
      onePairParallel: true,
      twoPairsParallel: true,
      fourRightAngles: false,
      fourEqualSides: true,
      adjacentPairsEqual: true,
    },
  },
  {
    id: "drachen",
    name: "Drachenviereck",
    description: "Zwei Paare benachbarter Seiten sind gleich lang.",
    props: {
      onePairParallel: false,
      twoPairsParallel: false,
      fourRightAngles: false,
      fourEqualSides: false,
      adjacentPairsEqual: true,
    },
  },
  {
    id: "quadrat",
    name: "Quadrat",
    description: "Vier rechte Winkel und vier gleich lange Seiten.",
    props: {
      onePairParallel: true,
      twoPairsParallel: true,
      fourRightAngles: true,
      fourEqualSides: true,
      adjacentPairsEqual: true,
    },
  },
];

const presetMap = {
  trapez: ["onePairParallel"],
  parallelogramm: ["onePairParallel", "twoPairsParallel"],
  rechteck: ["onePairParallel", "twoPairsParallel", "fourRightAngles"],
  raute: ["onePairParallel", "twoPairsParallel", "fourEqualSides", "adjacentPairsEqual"],
  drachen: ["adjacentPairsEqual"],
  quadrat: ["onePairParallel", "twoPairsParallel", "fourRightAngles", "fourEqualSides", "adjacentPairsEqual"],
};

const maQuizQuestions = [
  {
    prompt: "Welche Aussage beschreibt ein Parallelogramm richtig?",
    options: [
      "Es hat vier gleich lange Seiten und vier rechte Winkel.",
      "Es hat nur ein Seitenpaar, das parallel ist.",
      "Es hat zwei Paare gegenueberliegender paralleler Seiten.",
      "Es hat immer genau zwei rechte Winkel.",
    ],
    correct: 2,
    explanation: "Das definierende Merkmal sind zwei Paare paralleler Gegenueberseiten.",
    wrongReasons: {
      0: "Vier gleich lange Seiten und vier rechte Winkel beschreiben ein Quadrat.",
      1: "Ein Parallelogramm hat nicht nur ein, sondern zwei parallele Seitenpaare.",
      3: "Rechte Winkel gehoeren nicht zur Definition eines allgemeinen Parallelogramms.",
    },
  },
  {
    prompt: "Warum ist jedes Quadrat auch ein Rechteck?",
    options: [
      "Weil es vier rechte Winkel hat.",
      "Weil es immer schraeg gezeichnet wird.",
      "Weil es keine parallelen Seiten hat.",
      "Weil es nur zwei Ecken hat.",
    ],
    correct: 0,
    explanation: "Rechteck bedeutet: vier rechte Winkel. Das Quadrat erfuellt diese Bedingung.",
    wrongReasons: {
      1: "Die Lage oder Drehung einer Figur aendert ihre Eigenschaften nicht.",
      2: "Quadrate haben zwei Paare paralleler Seiten.",
      3: "Ein Quadrat hat vier Ecken wie jedes Viereck.",
    },
  },
  {
    prompt: "Welche Figur hat als Kernmerkmal zwei Paare benachbarter gleich langer Seiten?",
    options: ["Trapez", "Drachenviereck", "Rechteck", "Parallelogramm"],
    correct: 1,
    explanation: "Dieses Merkmal gehoert zum Drachenviereck.",
    wrongReasons: {
      0: "Beim Trapez ist das Kernmerkmal mindestens ein paralleles Seitenpaar.",
      2: "Beim Rechteck sind vier rechte Winkel entscheidend, nicht benachbarte gleich lange Seiten.",
      3: "Beim Parallelogramm geht es um parallele Gegenueberseiten.",
    },
  },
  {
    prompt: "Was ist mit der ueblichen Schuldefinition ein Trapez?",
    options: [
      "Ein Viereck mit mindestens einem Paar paralleler Seiten",
      "Ein Viereck mit vier rechten Winkeln",
      "Ein Viereck mit vier gleich langen Seiten",
      "Ein Viereck ohne parallele Seiten",
    ],
    correct: 0,
    explanation: "So wird Trapez in vielen Lehrwerken und im Haus der Vierecke genutzt.",
    wrongReasons: {
      1: "Vier rechte Winkel definieren ein Rechteck, nicht ein Trapez.",
      2: "Vier gleich lange Seiten definieren eine Raute (bzw. mit rechten Winkeln ein Quadrat).",
      3: "Ohne parallele Seiten ist es kein Trapez nach dieser Definition.",
    },
  },
  {
    prompt: "Welche Aussage ist falsch?",
    options: [
      "Jede Raute ist ein Parallelogramm.",
      "Jedes Rechteck ist ein Parallelogramm.",
      "Jedes Parallelogramm ist ein Rechteck.",
      "Jedes Quadrat ist eine Raute.",
    ],
    correct: 2,
    explanation: "Ein Parallelogramm braucht keine rechten Winkel, ein Rechteck schon.",
    wrongReasons: {
      0: "Diese Aussage ist richtig: Eine Raute ist ein spezielles Parallelogramm.",
      1: "Diese Aussage ist richtig: Rechtecke sind Parallelogramme mit Zusatzmerkmal.",
      3: "Diese Aussage ist richtig: Jedes Quadrat hat vier gleich lange Seiten.",
    },
  },
  {
    prompt: "Woran erkennst du ein Rechteck sicher?",
    options: [
      "Alle Seiten sind verschieden lang.",
      "Vier rechte Winkel.",
      "Nur ein Seitenpaar ist parallel.",
      "Keine Achsensymmetrie.",
    ],
    correct: 1,
    explanation: "Vier rechte Winkel sind das sichere Kernmerkmal.",
    wrongReasons: {
      0: "Die Seitenlaengen muessen beim Rechteck nicht alle verschieden sein.",
      2: "Ein Rechteck hat zwei Paare paralleler Seiten, nicht nur eines.",
      3: "Rechtecke haben Achsensymmetrien.",
    },
  },
  {
    prompt: "Welche Figur kann gleichzeitig Rechteck und Raute sein?",
    options: ["Trapez", "Drachenviereck", "Quadrat", "allgemeines Viereck"],
    correct: 2,
    explanation: "Das Quadrat vereint beide Eigenschaftspakete.",
    wrongReasons: {
      0: "Ein Trapez erfuellt normalerweise nicht gleichzeitig alle Rechteck- und Rautenmerkmale.",
      1: "Ein Drachenviereck braucht keine vier rechten Winkel und keine vier gleich langen Seiten.",
      3: "Ein allgemeines Viereck hat keine ausreichenden Zusatzmerkmale.",
    },
  },
  {
    prompt: "Welche Begruendung passt fachsprachlich?",
    options: [
      "Das ist ein Rechteck, weil es so aussieht wie eine Tuer.",
      "Das ist ein Rechteck, weil es vier rechte Winkel besitzt.",
      "Das ist ein Rechteck, weil es blau gezeichnet ist.",
      "Das ist ein Rechteck, weil ich das denke.",
    ],
    correct: 1,
    explanation: "In Mathe begruendest du mit Merkmalen, nicht mit Farbe oder Bauchgefuehl.",
    wrongReasons: {
      0: "Alltagsvergleiche helfen, sind aber keine mathematische Begruendung.",
      2: "Farbe ist kein geometrisches Merkmal.",
      3: "Eine Aussage ohne Merkmal ist keine fachliche Begruendung.",
    },
  },
];

const maQuizState = {
  running: false,
  answered: false,
  index: 0,
  correct: 0,
  questions: [],
};

function shuffle(items) {
  const clone = [...items];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function setupTabs() {
  maTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      maTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      maTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${target}`).classList.add("is-active");
    });
  });
}

function renderPropertyRows() {
  const options = [
    "Quadrat",
    "Rechteck",
    "Parallelogramm",
    "Raute",
    "Drachenviereck",
    "Trapez",
  ];

  maPropertyRows.innerHTML = propertyTasks
    .map(
      (task) => `
        <div class="ma-property-row" data-id="${task.id}">
          <p>${task.text}</p>
          <select data-answer="${task.answer}">
            <option value="">Bitte waehlen</option>
            ${options.map((option) => `<option value="${option}">${option}</option>`).join("")}
          </select>
        </div>
      `
    )
    .join("");

  maPropertyFeedback.innerHTML = "";
}

function checkPropertyRows() {
  const rows = maPropertyRows.querySelectorAll(".ma-property-row");
  let answered = 0;
  let correct = 0;

  rows.forEach((row) => {
    row.classList.remove("is-correct", "is-wrong");
    const select = row.querySelector("select");
    if (!(select instanceof HTMLSelectElement)) {
      return;
    }
    if (!select.value) {
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

  if (answered < propertyTasks.length) {
    maPropertyFeedback.innerHTML = '<p class="feedback info">Bitte zuerst alle Felder ausfuellen.</p>';
    return;
  }

  const isAllCorrect = correct === propertyTasks.length;
  maPropertyFeedback.innerHTML = `
    <p class="feedback ${isAllCorrect ? "ok" : "bad"}">${
      isAllCorrect
        ? "Sehr gut. Alle Zuordnungen sind korrekt."
        : `${correct}/${propertyTasks.length} richtig. Pruefe die roten Zeilen noch einmal.`
    }</p>
  `;
}

function getSelectedProperties() {
  const selected = [];
  if (filterOnePairParallel.checked) {
    selected.push("onePairParallel");
  }
  if (filterTwoPairsParallel.checked) {
    selected.push("twoPairsParallel");
  }
  if (filterFourRightAngles.checked) {
    selected.push("fourRightAngles");
  }
  if (filterFourEqualSides.checked) {
    selected.push("fourEqualSides");
  }
  if (filterAdjacentPairsEqual.checked) {
    selected.push("adjacentPairsEqual");
  }
  return selected;
}

function renderFilterResults() {
  const selected = getSelectedProperties();

  if (selected.length === 0) {
    maFilterResult.innerHTML = '<p class="feedback info">Waehle mindestens ein Merkmal aus.</p>';
    return;
  }

  const matches = figures.filter((figure) =>
    selected.every((property) => figure.props[property])
  );

  if (matches.length === 0) {
    maFilterResult.innerHTML = `
      <p class="feedback bad">
        Keine Standardfigur aus diesem Modul passt exakt zu dieser Merkmalkombination.
      </p>
    `;
    return;
  }

  maFilterResult.innerHTML = `
    <p class="feedback ok">${matches.length} passende Figur(en) gefunden.</p>
    <div class="ma-result-grid">
      ${matches
        .map(
          (match) => `
            <article class="ma-result-card">
              <h3>${match.name}</h3>
              <p>${match.description}</p>
            </article>
          `
        )
        .join("")}
    </div>
    <p class="feedback info">Hinweis: Nicht angeklickte Merkmale sind hier offen gelassen.</p>
  `;
}

function clearFilter() {
  filterOnePairParallel.checked = false;
  filterTwoPairsParallel.checked = false;
  filterFourRightAngles.checked = false;
  filterFourEqualSides.checked = false;
  filterAdjacentPairsEqual.checked = false;
  maFilterResult.innerHTML = '<p class="feedback info">Waehle Merkmale und klicke auf "Filter anwenden".</p>';
}

function setFilterFromPreset(presetId) {
  const selected = presetMap[presetId];
  if (!selected) {
    return;
  }

  clearFilter();
  filterOnePairParallel.checked = selected.includes("onePairParallel");
  filterTwoPairsParallel.checked = selected.includes("twoPairsParallel");
  filterFourRightAngles.checked = selected.includes("fourRightAngles");
  filterFourEqualSides.checked = selected.includes("fourEqualSides");
  filterAdjacentPairsEqual.checked = selected.includes("adjacentPairsEqual");
  renderFilterResults();
}

function renderRelationRows() {
  maRelationRows.innerHTML = relationTasks
    .map(
      (task) => `
        <div class="ma-relation-row" data-id="${task.id}">
          <p>${task.text}</p>
          <select data-answer="${task.correct}">
            <option value="">Bitte waehlen</option>
            <option value="ja">Stimmt</option>
            <option value="nein">Stimmt nicht</option>
          </select>
        </div>
      `
    )
    .join("");

  maRelationFeedback.innerHTML = "";
}

function checkRelationRows() {
  const rows = maRelationRows.querySelectorAll(".ma-relation-row");
  let answered = 0;
  let correct = 0;

  rows.forEach((row) => {
    row.classList.remove("is-correct", "is-wrong");
    const select = row.querySelector("select");
    if (!(select instanceof HTMLSelectElement)) {
      return;
    }
    if (!select.value) {
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

  if (answered < relationTasks.length) {
    maRelationFeedback.innerHTML = '<p class="feedback info">Bitte alle Aussagen beantworten.</p>';
    return;
  }

  const allCorrect = correct === relationTasks.length;
  maRelationFeedback.innerHTML = `
    <p class="feedback ${allCorrect ? "ok" : "bad"}">${
      allCorrect
        ? "Super. Du hast die Beziehungen im Haus der Vierecke sicher erkannt."
        : `${correct}/${relationTasks.length} richtig. Schau dir die markierten Aussagen erneut an.`
    }</p>
  `;
}

function updateQuizScore() {
  maQuizScore.textContent = `Punkte: ${maQuizState.correct} / ${maQuizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = maQuizState.questions[maQuizState.index];
  maQuizStatus.textContent = `Frage ${maQuizState.index + 1} von ${maQuizState.questions.length}`;
  maQuizPrompt.textContent = question.prompt;
  maQuizFeedback.innerHTML = "";
  maQuizNext.disabled = true;
  maQuizAnswers.innerHTML = question.options
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
  maQuizState.running = false;
  maQuizStatus.textContent = "Test abgeschlossen.";
  maQuizPrompt.textContent = "Du kannst den Test erneut starten und dein Ergebnis verbessern.";
  maQuizAnswers.innerHTML = "";
  maQuizFeedback.innerHTML = '<p class="feedback info">Vergleiche falsche Antworten mit den Erklaerungen.</p>';
  maQuizNext.disabled = true;
  maQuizStart.textContent = "Neu starten";
}

function submitQuizAnswer(optionIndex) {
  if (!maQuizState.running || maQuizState.answered) {
    return;
  }
  const question = maQuizState.questions[maQuizState.index];
  maQuizState.answered = true;
  const isCorrect = optionIndex === question.correct;
  if (isCorrect) {
    maQuizState.correct += 1;
  }

  updateQuizScore();
  maQuizAnswers.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  maQuizFeedback.innerHTML = `
    <p class="feedback ${isCorrect ? "ok" : "bad"}">${
      isCorrect
        ? `Richtig. ${question.explanation}`
        : `Nicht ganz richtig. ${question.wrongReasons?.[optionIndex] || question.explanation} Richtig waere: "${question.options[question.correct]}".`
    }</p>
  `;
  maQuizNext.disabled = false;
  maQuizNext.textContent =
    maQuizState.index === maQuizState.questions.length - 1
      ? "Ergebnis anzeigen"
      : "Naechste Frage";
}

function startQuiz() {
  maQuizState.running = true;
  maQuizState.answered = false;
  maQuizState.index = 0;
  maQuizState.correct = 0;
  maQuizState.questions = shuffle(maQuizQuestions);
  maQuizStart.textContent = "Test neu starten";
  updateQuizScore();
  renderQuizQuestion();
}

function nextQuizStep() {
  if (!maQuizState.running || !maQuizState.answered) {
    return;
  }
  if (maQuizState.index === maQuizState.questions.length - 1) {
    finishQuiz();
    return;
  }
  maQuizState.index += 1;
  maQuizState.answered = false;
  renderQuizQuestion();
}

function setupPropertyTrainer() {
  renderPropertyRows();
  maPropertyCheck.addEventListener("click", checkPropertyRows);
  maPropertyReset.addEventListener("click", renderPropertyRows);
}

function setupFilterTrainer() {
  maFilterApply.addEventListener("click", renderFilterResults);
  maFilterReset.addEventListener("click", clearFilter);
  maPresetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setFilterFromPreset(button.dataset.preset);
    });
  });
}

function setupRelationTrainer() {
  renderRelationRows();
  maRelationCheck.addEventListener("click", checkRelationRows);
  maRelationReset.addEventListener("click", renderRelationRows);
}

function setupQuiz() {
  maQuizStart.addEventListener("click", startQuiz);
  maQuizNext.addEventListener("click", nextQuizStep);
  maQuizAnswers.addEventListener("click", (event) => {
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
setupPropertyTrainer();
setupFilterTrainer();
setupRelationTrainer();
setupQuiz();
