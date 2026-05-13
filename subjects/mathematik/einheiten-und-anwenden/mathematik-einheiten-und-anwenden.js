const eaTabButtons = document.querySelectorAll(".ea-tab-btn");
const eaTabPanels = document.querySelectorAll(".ea-tab");

const eaCoachButtons = document.querySelectorAll(".ea-domain-btn");
const eaCoachTitle = document.getElementById("eaCoachTitle");
const eaCoachText = document.getElementById("eaCoachText");
const eaCoachList = document.getElementById("eaCoachList");

const eaDifficulty = document.getElementById("eaDifficulty");
const eaCount = document.getElementById("eaCount");
const eaDomainChecks = document.querySelectorAll(".ea-domain-check");
const eaTypeChecks = document.querySelectorAll(".ea-type-check");
const eaGenerate = document.getElementById("eaGenerate");
const eaCheck = document.getElementById("eaCheck");
const eaReset = document.getElementById("eaReset");
const eaTaskList = document.getElementById("eaTaskList");
const eaTaskFeedback = document.getElementById("eaTaskFeedback");

const eaQuizStart = document.getElementById("eaQuizStart");
const eaQuizNext = document.getElementById("eaQuizNext");
const eaQuizScore = document.getElementById("eaQuizScore");
const eaQuizStatus = document.getElementById("eaQuizStatus");
const eaQuizPrompt = document.getElementById("eaQuizPrompt");
const eaQuizOptions = document.getElementById("eaQuizOptions");
const eaQuizFeedback = document.getElementById("eaQuizFeedback");

const domainConfigs = {
  area: {
    name: "Flaecheneinheiten",
    baseLabel: "mm^2",
    units: [
      { key: "mm2", label: "mm^2" },
      { key: "cm2", label: "cm^2" },
      { key: "dm2", label: "dm^2" },
      { key: "m2", label: "m^2" },
      { key: "a", label: "a" },
      { key: "ha", label: "ha" },
      { key: "km2", label: "km^2" },
    ],
    factors: {
      mm2: 1,
      cm2: 100,
      dm2: 10000,
      m2: 1000000,
      a: 100000000,
      ha: 10000000000,
      km2: 1000000000000,
    },
    coach: {
      text: "Bei Flaechen springst du pro Einheit in 100er-Schritten.",
      rules: [
        "Zu kleineren Einheiten: multiplizieren (z. B. m^2 -> dm^2 mal 100).",
        "Zu groesseren Einheiten: dividieren (z. B. cm^2 -> m^2 geteilt durch 10 000).",
        "Achte auf das Quadratzeichen: Es geht um Flaechen, nicht um Laengen.",
      ],
    },
    unitScenarios: [
      { prompt: "Die Flaeche eines Klassenraums misst man am sinnvollsten in ...", answer: "m2" },
      { prompt: "Die Flaeche eines Post-its misst man am sinnvollsten in ...", answer: "cm2" },
      { prompt: "Die Flaeche eines Fussballfelds misst man am sinnvollsten in ...", answer: "m2" },
      { prompt: "Die Flaeche eines Bundeslandes gibt man oft in ... an.", answer: "km2" },
    ],
  },
  mass: {
    name: "Masse",
    baseLabel: "mg",
    units: [
      { key: "mg", label: "mg" },
      { key: "g", label: "g" },
      { key: "kg", label: "kg" },
      { key: "t", label: "t" },
    ],
    factors: {
      mg: 1,
      g: 1000,
      kg: 1000000,
      t: 1000000000,
    },
    coach: {
      text: "Bei Massen sind die Schritte meist 1000 (mg-g-kg-t).",
      rules: [
        "Zu kleineren Einheiten: multiplizieren (kg -> g mal 1000).",
        "Zu groesseren Einheiten: dividieren (g -> kg geteilt durch 1000).",
        "Bei Sachaufgaben zuerst alle Angaben in dieselbe Einheit bringen.",
      ],
    },
    unitScenarios: [
      { prompt: "Das Gewicht eines Apfels gibt man meist in ... an.", answer: "g" },
      { prompt: "Das Gewicht eines Autos gibt man meist in ... an.", answer: "kg" },
      { prompt: "Das Gewicht einer Broeselspur misst man eher in ...", answer: "mg" },
      { prompt: "Das Gewicht eines Lastschiffs kann man in ... angeben.", answer: "t" },
    ],
  },
  time: {
    name: "Zeiteinheiten",
    baseLabel: "s",
    units: [
      { key: "s", label: "s" },
      { key: "min", label: "min" },
      { key: "h", label: "h" },
      { key: "d", label: "d" },
    ],
    factors: {
      s: 1,
      min: 60,
      h: 3600,
      d: 86400,
    },
    coach: {
      text: "Bei Zeit sind die Faktoren nicht einheitlich (60, 60, 24).",
      rules: [
        "s -> min: durch 60 teilen, min -> h: durch 60 teilen, h -> d: durch 24 teilen.",
        "In die andere Richtung multiplizierst du mit denselben Zahlen.",
        "Bei Zeitaufgaben ist ein Zwischenschritt in Minuten oft am uebersichtlichsten.",
      ],
    },
    unitScenarios: [
      { prompt: "Die Dauer einer Schulstunde gibt man meist in ... an.", answer: "min" },
      { prompt: "Die Dauer eines Tages gibt man sinnvoll in ... an.", answer: "h" },
      { prompt: "Reaktionszeit beim Start misst man eher in ...", answer: "s" },
      { prompt: "Die Dauer eines Kurztrips kann man gut in ... angeben.", answer: "d" },
    ],
  },
};

const typeLabels = {
  convert: "Direkte Umrechnung",
  mixed: "Gemischte Angaben",
  compare: "Vergleich",
  unit: "Passende Einheit",
  story: "Sachaufgabe",
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

function choice(items) {
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

function parseNumberInput(value) {
  const cleaned = String(value || "")
    .trim()
    .replace(/\s+/g, "")
    .replace(",", ".");
  if (!cleaned) {
    return Number.NaN;
  }
  return Number(cleaned);
}

function formatNumber(value) {
  const rounded = Number(value.toFixed(8));
  return String(rounded).replace(".", ",");
}

function nearlyEqual(a, b) {
  const diff = Math.abs(a - b);
  const scale = Math.max(1, Math.abs(a), Math.abs(b));
  return diff <= 1e-6 * scale;
}

function unitLabel(domain, unitKey) {
  const config = domainConfigs[domain];
  const entry = config.units.find((unit) => unit.key === unitKey);
  return entry ? entry.label : unitKey;
}

function convertValue(domain, value, fromUnit, toUnit) {
  const factors = domainConfigs[domain].factors;
  return (value * factors[fromUnit]) / factors[toUnit];
}

function getUnitKeys(domain) {
  return domainConfigs[domain].units.map((unit) => unit.key);
}

function getSelectedDomains() {
  return [...eaDomainChecks]
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
}

function getSelectedTypes() {
  return [...eaTypeChecks]
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
}

function getUnitPair(domain, difficulty) {
  const units = getUnitKeys(domain);
  const pairs = [];

  for (let i = 0; i < units.length; i += 1) {
    for (let j = 0; j < units.length; j += 1) {
      if (i === j) {
        continue;
      }
      const distance = Math.abs(i - j);
      if (difficulty === "basis" && distance !== 1) {
        continue;
      }
      if (difficulty === "standard" && distance > 2) {
        continue;
      }
      pairs.push([units[i], units[j]]);
    }
  }

  if (pairs.length === 0) {
    return [units[0], units[1]];
  }
  return choice(pairs);
}

function getConvertibleValue(domain, fromUnit, toUnit, difficulty) {
  const factors = domainConfigs[domain].factors;
  const fromFactor = factors[fromUnit];
  const toFactor = factors[toUnit];

  if (difficulty === "basis") {
    if (fromFactor < toFactor) {
      const ratio = toFactor / fromFactor;
      return randomInt(2, 24) * ratio;
    }
    return randomInt(2, 450);
  }

  if (difficulty === "standard") {
    return randomInt(10, 900) / choice([1, 10]);
  }

  return randomInt(10, 6000) / choice([1, 10, 100]);
}

function createConvertTask(domain, difficulty) {
  const [fromUnit, toUnit] = getUnitPair(domain, difficulty);
  const value = getConvertibleValue(domain, fromUnit, toUnit, difficulty);
  const expected = Number(convertValue(domain, value, fromUnit, toUnit).toFixed(8));

  return {
    type: "convert",
    domain,
    kind: "numeric",
    prompt: `${formatNumber(value)} ${unitLabel(domain, fromUnit)} = ? ${unitLabel(domain, toUnit)}`,
    expected,
    expectedDisplay: `${formatNumber(expected)} ${unitLabel(domain, toUnit)}`,
    answerUnit: unitLabel(domain, toUnit),
    explanation: `Von ${unitLabel(domain, fromUnit)} nach ${unitLabel(domain, toUnit)} umrechnen.`,
  };
}

function createMixedTask(domain, difficulty) {
  const units = getUnitKeys(domain);
  const highIndex = randomInt(1, units.length - 1);
  const highUnit = units[highIndex];
  const lowUnit = units[highIndex - 1];
  const highValue = randomInt(1, difficulty === "basis" ? 12 : 40);
  const lowValue = randomInt(1, domain === "time" ? 55 : 95);

  const toSmallExpected = Number(
    (
      highValue * convertValue(domain, 1, highUnit, lowUnit) +
      lowValue
    ).toFixed(8)
  );

  const askToLarge = difficulty === "profi" && Math.random() < 0.45;

  if (askToLarge) {
    const expected = Number(
      (
        highValue + lowValue * convertValue(domain, 1, lowUnit, highUnit)
      ).toFixed(8)
    );
    return {
      type: "mixed",
      domain,
      kind: "numeric",
      prompt: `${highValue} ${unitLabel(domain, highUnit)} ${lowValue} ${unitLabel(domain, lowUnit)} = ? ${unitLabel(domain, highUnit)}`,
      expected,
      expectedDisplay: `${formatNumber(expected)} ${unitLabel(domain, highUnit)}`,
      answerUnit: unitLabel(domain, highUnit),
      explanation: "Erst in dieselbe Einheit umrechnen, dann addieren.",
    };
  }

  return {
    type: "mixed",
    domain,
    kind: "numeric",
    prompt: `${highValue} ${unitLabel(domain, highUnit)} ${lowValue} ${unitLabel(domain, lowUnit)} = ? ${unitLabel(domain, lowUnit)}`,
    expected: toSmallExpected,
    expectedDisplay: `${formatNumber(toSmallExpected)} ${unitLabel(domain, lowUnit)}`,
    answerUnit: unitLabel(domain, lowUnit),
    explanation: "Groessere Einheit zuerst in die kleinere Einheit umrechnen.",
  };
}

function createCompareTask(domain, difficulty) {
  const units = getUnitKeys(domain);
  const factors = domainConfigs[domain].factors;

  const relation = choice(["<", ">", "="]);

  if (difficulty === "basis") {
    const unit = choice(units);
    const a = randomInt(2, 250);
    let b = a;
    if (relation === "<") {
      b = a + randomInt(1, 120);
    } else if (relation === ">") {
      b = Math.max(1, a - randomInt(1, Math.min(120, a - 1)));
    }

    return {
      type: "compare",
      domain,
      kind: "choice",
      choiceKind: "symbol",
      prompt: `${formatNumber(a)} ${unitLabel(domain, unit)} __ ${formatNumber(b)} ${unitLabel(domain, unit)}`,
      options: [
        { value: "<", label: "<" },
        { value: ">", label: ">" },
        { value: "=", label: "=" },
      ],
      expected: relation,
      expectedDisplay: relation,
      explanation: "Gleiche Einheit: Werte direkt vergleichen.",
    };
  }

  let baseA = randomInt(20, 2000);
  let baseB = baseA;

  if (relation === "<") {
    baseB = baseA + randomInt(1, 600);
  } else if (relation === ">") {
    baseB = Math.max(1, baseA - randomInt(1, Math.min(600, baseA - 1)));
  }

  const unitA = difficulty === "basis" ? choice(units.slice(0, Math.min(3, units.length))) : choice(units);
  const unitB = difficulty === "basis" ? unitA : choice(units);

  const valueA = Number((baseA / factors[unitA]).toFixed(8));
  const valueB = Number((baseB / factors[unitB]).toFixed(8));

  return {
    type: "compare",
    domain,
    kind: "choice",
    choiceKind: "symbol",
    prompt: `${formatNumber(valueA)} ${unitLabel(domain, unitA)} __ ${formatNumber(valueB)} ${unitLabel(domain, unitB)}`,
    options: [
      { value: "<", label: "<" },
      { value: ">", label: ">" },
      { value: "=", label: "=" },
    ],
    expected: relation,
    expectedDisplay: relation,
    explanation: "Beide Angaben gedanklich in dieselbe Einheit bringen und vergleichen.",
  };
}

function createUnitChoiceTask(domain) {
  const config = domainConfigs[domain];
  const scenario = choice(config.unitScenarios);
  const optionKeys = shuffle(getUnitKeys(domain)).slice(0, 4);

  if (!optionKeys.includes(scenario.answer)) {
    optionKeys[0] = scenario.answer;
  }

  return {
    type: "unit",
    domain,
    kind: "choice",
    choiceKind: "unit",
    prompt: scenario.prompt,
    options: shuffle(optionKeys).map((key) => ({ value: key, label: unitLabel(domain, key) })),
    expected: scenario.answer,
    expectedDisplay: unitLabel(domain, scenario.answer),
    explanation: "Die Einheit muss zur Groesse und zum Kontext passen.",
  };
}

function createStoryTask(domain, difficulty) {
  if (domain === "area") {
    if (Math.random() < 0.5) {
      const length = randomInt(3, 18);
      const width = randomInt(2, 12);
      const baseArea = length * width;
      const askDm2 = difficulty !== "basis";
      const expected = askDm2 ? baseArea * 100 : baseArea;
      const targetUnit = askDm2 ? "dm2" : "m2";
      return {
        type: "story",
        domain,
        kind: "numeric",
        prompt: `Ein rechteckiger Boden ist ${length} m lang und ${width} m breit. Wie gross ist die Flaeche in ${unitLabel("area", targetUnit)}?`,
        expected,
        expectedDisplay: `${formatNumber(expected)} ${unitLabel("area", targetUnit)}`,
        answerUnit: unitLabel("area", targetUnit),
        explanation: "Erst Flaeche berechnen (Laenge mal Breite), dann ggf. umrechnen.",
      };
    }

    const a = randomInt(2, 10);
    const b = randomInt(2, 8);
    const c = randomInt(2, 8);
    const d = randomInt(2, 7);
    const expected = a * b + c * d;
    return {
      type: "story",
      domain,
      kind: "numeric",
      prompt: `Eine zusammengesetzte Flaeche besteht aus zwei Rechtecken: ${a} m x ${b} m und ${c} m x ${d} m. Wie gross ist die Gesamtflaeche in m^2?`,
      expected,
      expectedDisplay: `${formatNumber(expected)} m^2`,
      answerUnit: "m^2",
      explanation: "Beide Teilflaechen berechnen und addieren.",
    };
  }

  if (domain === "mass") {
    const kgA = randomInt(1, 6);
    const gA = randomInt(100, 900);
    const kgB = randomInt(1, 5);
    const gB = randomInt(50, 850);
    const totalGrams = kgA * 1000 + gA + kgB * 1000 + gB;
    const askKg = difficulty === "profi";
    const expected = askKg ? Number((totalGrams / 1000).toFixed(8)) : totalGrams;
    const unit = askKg ? "kg" : "g";
    return {
      type: "story",
      domain,
      kind: "numeric",
      prompt: `Zwei Pakete wiegen ${kgA} kg ${gA} g und ${kgB} kg ${gB} g. Wie viel wiegen beide zusammen in ${unit}?`,
      expected,
      expectedDisplay: `${formatNumber(expected)} ${unit}`,
      answerUnit: unit,
      explanation: "Beide Massen in dieselbe Einheit umrechnen und addieren.",
    };
  }

  const hours = randomInt(1, 4);
  const minutes = randomInt(10, 55);
  if (difficulty === "basis") {
    const expected = hours * 60 + minutes;
    return {
      type: "story",
      domain,
      kind: "numeric",
      prompt: `Ein Ausflug dauert ${hours} h ${minutes} min. Wie lange ist das in Minuten?`,
      expected,
      expectedDisplay: `${formatNumber(expected)} min`,
      answerUnit: "min",
      explanation: "Stunden in Minuten umrechnen und Minuten addieren.",
    };
  }

  const expected = Number(((hours * 60 + minutes) / 60).toFixed(8));
  return {
    type: "story",
    domain,
    kind: "numeric",
    prompt: `Ein Film dauert ${hours} h ${minutes} min. Gib die Dauer in Stunden an.`,
    expected,
    expectedDisplay: `${formatNumber(expected)} h`,
    answerUnit: "h",
    explanation: "Minuten in Stunden umrechnen und zu den ganzen Stunden addieren.",
  };
}

function createTask(domain, taskType, difficulty) {
  if (taskType === "convert") {
    return createConvertTask(domain, difficulty);
  }
  if (taskType === "mixed") {
    return createMixedTask(domain, difficulty);
  }
  if (taskType === "compare") {
    return createCompareTask(domain, difficulty);
  }
  if (taskType === "unit") {
    return createUnitChoiceTask(domain);
  }
  return createStoryTask(domain, difficulty);
}

function buildTaskSet() {
  const domains = getSelectedDomains();
  const types = getSelectedTypes();
  const count = Number(eaCount.value);
  const difficulty = eaDifficulty.value;

  if (domains.length === 0) {
    eaTaskFeedback.innerHTML = '<p class="feedback bad">Bitte mindestens einen Bereich auswaehlen.</p>';
    return;
  }

  if (types.length === 0) {
    eaTaskFeedback.innerHTML = '<p class="feedback bad">Bitte mindestens einen Aufgabentyp auswaehlen.</p>';
    return;
  }

  const tasks = [];
  for (let i = 0; i < count; i += 1) {
    const domain = choice(domains);
    const type = choice(types);
    tasks.push(createTask(domain, type, difficulty));
  }

  generatedTasks = tasks;
  renderTaskSet();
  eaTaskFeedback.innerHTML =
    '<p class="feedback info">Neue Runde erstellt. Du kannst sofort pruefen oder erst rechnen.</p>';
}

function createTaskRow(task, index) {
  const row = document.createElement("article");
  row.className = "ea-task-row";

  const prompt = document.createElement("p");
  const typeLabel = typeLabels[task.type] || "Aufgabe";
  prompt.innerHTML = `<strong>${index + 1}. [${typeLabel}] ${task.prompt}</strong>`;

  const answerLine = document.createElement("div");
  answerLine.className = "ea-answer-line";

  if (task.kind === "numeric") {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "ea-input";
    input.name = `task-${index}`;
    input.placeholder = "Antwort";
    answerLine.append(input);

    if (task.answerUnit) {
      const unitNote = document.createElement("span");
      unitNote.textContent = task.answerUnit;
      answerLine.append(unitNote);
    }
  } else {
    const select = document.createElement("select");
    select.className = "ea-choice";
    select.name = `task-${index}`;
    select.innerHTML =
      '<option value="">Waehlen</option>' +
      task.options
        .map((option) => `<option value="${option.value}">${option.label}</option>`)
        .join("");
    answerLine.append(select);
  }

  const feedback = document.createElement("div");
  feedback.className = "task-feedback";

  row.append(prompt, answerLine, feedback);
  return row;
}

function renderTaskSet() {
  eaTaskList.replaceChildren();
  generatedTasks.forEach((task, index) => {
    eaTaskList.append(createTaskRow(task, index));
  });
}

function clearTaskFeedbackOnly() {
  const rows = eaTaskList.querySelectorAll(".ea-task-row");
  rows.forEach((row) => {
    row.classList.remove("is-correct", "is-wrong");
    const feedback = row.querySelector(".task-feedback");
    if (feedback instanceof HTMLDivElement) {
      feedback.innerHTML = "";
    }
  });
}

function resetTaskInputs() {
  const rows = eaTaskList.querySelectorAll(".ea-task-row");
  rows.forEach((row) => {
    row.classList.remove("is-correct", "is-wrong");
    const input = row.querySelector("input");
    if (input instanceof HTMLInputElement) {
      input.value = "";
    }
    const select = row.querySelector("select");
    if (select instanceof HTMLSelectElement) {
      select.value = "";
    }
    const feedback = row.querySelector(".task-feedback");
    if (feedback instanceof HTMLDivElement) {
      feedback.innerHTML = "";
    }
  });
  eaTaskFeedback.innerHTML = '<p class="feedback info">Eingaben geleert.</p>';
}

function checkTaskSet() {
  if (generatedTasks.length === 0) {
    eaTaskFeedback.innerHTML = '<p class="feedback info">Erstelle zuerst eine Aufgabenrunde.</p>';
    return;
  }

  const rows = eaTaskList.querySelectorAll(".ea-task-row");
  let answered = 0;
  let correct = 0;
  clearTaskFeedbackOnly();

  rows.forEach((row, index) => {
    const task = generatedTasks[index];
    const feedback = row.querySelector(".task-feedback");
    if (!(feedback instanceof HTMLDivElement)) {
      return;
    }

    if (task.kind === "numeric") {
      const input = row.querySelector("input");
      if (!(input instanceof HTMLInputElement)) {
        return;
      }

      const value = parseNumberInput(input.value);
      if (!Number.isFinite(value)) {
        return;
      }

      answered += 1;

      if (nearlyEqual(value, task.expected)) {
        correct += 1;
        row.classList.add("is-correct");
        feedback.innerHTML = `<p class="feedback ok">Richtig. ${task.explanation}</p>`;
      } else {
        row.classList.add("is-wrong");
        feedback.innerHTML = `<p class="feedback bad">Nicht korrekt. Richtige Loesung: ${task.expectedDisplay}. ${task.explanation}</p>`;
      }
      return;
    }

    const select = row.querySelector("select");
    if (!(select instanceof HTMLSelectElement)) {
      return;
    }
    if (!select.value) {
      return;
    }

    answered += 1;
    if (select.value === task.expected) {
      correct += 1;
      row.classList.add("is-correct");
      feedback.innerHTML = `<p class="feedback ok">Richtig. ${task.explanation}</p>`;
    } else {
      row.classList.add("is-wrong");
      feedback.innerHTML = `<p class="feedback bad">Nicht korrekt. Richtig ist ${task.expectedDisplay}. ${task.explanation}</p>`;
    }
  });

  if (answered < generatedTasks.length) {
    eaTaskFeedback.innerHTML = '<p class="feedback info">Bitte alle Aufgaben beantworten.</p>';
    return;
  }

  eaTaskFeedback.innerHTML = `
    <p class="feedback ${correct === generatedTasks.length ? "ok" : "bad"}">
      ${correct} / ${generatedTasks.length} richtig.
      ${correct === generatedTasks.length ? "Sehr stark." : "Nutze die Rueckmeldungen und starte danach eine neue Runde."}
    </p>
  `;
}

function renderCoach(domain) {
  const config = domainConfigs[domain];
  eaCoachTitle.textContent = config.name;
  eaCoachText.textContent = config.coach.text;
  eaCoachList.innerHTML = config.coach.rules.map((rule) => `<li>${rule}</li>`).join("");
  eaCoachButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.domain === domain);
  });
}

function setupTabs() {
  eaTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      eaTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      eaTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${target}`).classList.add("is-active");
    });
  });
}

function setupCoach() {
  eaCoachButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderCoach(button.dataset.domain);
    });
  });
  renderCoach("area");
}

function numberOptions(correct) {
  const step = Math.max(1, Math.abs(correct) * 0.2);
  const candidates = [
    correct,
    correct + step,
    correct - step,
    correct * 10,
    correct / 10,
    correct + 1,
    correct - 1,
  ]
    .filter((value) => Number.isFinite(value) && value >= 0)
    .map((value) => Number(value.toFixed(8)));

  const unique = [...new Set(candidates)];
  return unique;
}

function toQuizQuestion(task) {
  if (task.kind === "choice") {
    let options = task.options.map((option) => option.label);
    let correctLabel = task.options.find((option) => option.value === task.expected)?.label || "";

    if (options.length < 3) {
      options = [...options, "..."];
    }

    return {
      prompt: task.type === "compare" ? `Setze das richtige Zeichen ein: ${task.prompt}` : task.prompt,
      options: shuffle(options),
      correctLabel,
      explanation: task.explanation,
    };
  }

  const numericOptions = numberOptions(task.expected).slice(0, 8);
  const correctLabel = `${formatNumber(task.expected)} ${task.answerUnit || ""}`.trim();
  const labels = numericOptions.map((value) => `${formatNumber(value)} ${task.answerUnit || ""}`.trim());
  const withCorrect = new Set(labels);
  withCorrect.add(correctLabel);

  while (withCorrect.size < 4) {
    const randomOffset = randomInt(-40, 40) / 10;
    const alternative = Math.max(0, Number((task.expected + randomOffset).toFixed(8)));
    withCorrect.add(`${formatNumber(alternative)} ${task.answerUnit || ""}`.trim());
  }

  const options = shuffle([...withCorrect]).slice(0, 4);
  if (!options.includes(correctLabel)) {
    options[0] = correctLabel;
  }

  return {
    prompt: task.prompt,
    options: shuffle(options),
    correctLabel,
    explanation: task.explanation,
  };
}

function createQuizSet(count = 12) {
  const domains = ["area", "mass", "time"];
  const types = ["convert", "mixed", "compare", "unit", "story"];
  const difficulties = ["basis", "standard", "profi"];
  const questions = [];

  for (let i = 0; i < count; i += 1) {
    const domain = domains[i % domains.length];
    const type = types[i % types.length];
    const difficulty = difficulties[randomInt(0, difficulties.length - 1)];
    const task = createTask(domain, type, difficulty);
    questions.push(toQuizQuestion(task));
  }

  return shuffle(questions);
}

function updateQuizScore() {
  eaQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  eaQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  eaQuizPrompt.textContent = question.prompt;
  eaQuizFeedback.innerHTML = "";
  eaQuizNext.disabled = true;

  eaQuizOptions.innerHTML = question.options
    .map(
      (option, optionIndex) => `
      <button class="choice-btn" type="button" data-option="${optionIndex}">
        ${option}
      </button>
    `
    )
    .join("");
}

function startQuiz() {
  quizState.running = true;
  quizState.answered = false;
  quizState.index = 0;
  quizState.correct = 0;
  quizState.questions = createQuizSet(12);
  eaQuizStart.textContent = "Check neu starten";
  updateQuizScore();
  renderQuizQuestion();
}

function submitQuizAnswer(optionIndex) {
  if (!quizState.running || quizState.answered) {
    return;
  }

  const question = quizState.questions[quizState.index];
  const selectedLabel = question.options[optionIndex];
  const isCorrect = selectedLabel === question.correctLabel;
  quizState.answered = true;

  if (isCorrect) {
    quizState.correct += 1;
  }
  updateQuizScore();

  eaQuizOptions.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  eaQuizFeedback.innerHTML = `
    <p class="feedback ${isCorrect ? "ok" : "bad"}">
      ${isCorrect
        ? `Richtig. ${question.explanation}`
        : `Nicht korrekt. Richtige Antwort: "${question.correctLabel}". ${question.explanation}`}
    </p>
  `;

  eaQuizNext.disabled = false;
  eaQuizNext.textContent =
    quizState.index === quizState.questions.length - 1 ? "Ergebnis anzeigen" : "Naechste Frage";
}

function finishQuiz() {
  quizState.running = false;
  eaQuizStatus.textContent = "Abschluss-Check beendet.";
  eaQuizPrompt.textContent = "Du kannst den Check neu starten.";
  eaQuizOptions.innerHTML = "";
  eaQuizFeedback.innerHTML =
    '<p class="feedback info">Nutze eine neue Runde, um mit anderen Zahlenkonstellationen weiter zu trainieren.</p>';
  eaQuizNext.disabled = true;
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

function setupQuiz() {
  eaQuizStart.addEventListener("click", startQuiz);
  eaQuizNext.addEventListener("click", nextQuizStep);
  eaQuizOptions.addEventListener("click", (event) => {
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

function setupGenerator() {
  buildTaskSet();
  eaGenerate.addEventListener("click", buildTaskSet);
  eaCheck.addEventListener("click", checkTaskSet);
  eaReset.addEventListener("click", resetTaskInputs);
}

setupTabs();
setupCoach();
setupGenerator();
setupQuiz();
