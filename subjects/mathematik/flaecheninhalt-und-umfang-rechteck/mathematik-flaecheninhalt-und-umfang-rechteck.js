const fuTabButtons = document.querySelectorAll(".fu-tab-btn");
const fuTabPanels = document.querySelectorAll(".fu-tab");

const fuStationButtons = document.getElementById("fuStationButtons");
const fuStationImage = document.getElementById("fuStationImage");
const fuStationKicker = document.getElementById("fuStationKicker");
const fuStationTitle = document.getElementById("fuStationTitle");
const fuStationText = document.getElementById("fuStationText");
const fuStationFact = document.getElementById("fuStationFact");

const fuDifficulty = document.getElementById("fuDifficulty");
const fuCount = document.getElementById("fuCount");
const fuTypeChecks = document.querySelectorAll(".fu-type-check");
const fuGenerate = document.getElementById("fuGenerate");
const fuCheck = document.getElementById("fuCheck");
const fuReset = document.getElementById("fuReset");
const fuTaskList = document.getElementById("fuTaskList");
const fuTaskFeedback = document.getElementById("fuTaskFeedback");

const fuQuizStart = document.getElementById("fuQuizStart");
const fuQuizNext = document.getElementById("fuQuizNext");
const fuQuizScore = document.getElementById("fuQuizScore");
const fuQuizStatus = document.getElementById("fuQuizStatus");
const fuQuizPrompt = document.getElementById("fuQuizPrompt");
const fuQuizOptions = document.getElementById("fuQuizOptions");
const fuQuizFeedback = document.getElementById("fuQuizFeedback");

const stationData = [
  {
    id: "start",
    label: "Grundideen",
    kicker: "Station 1",
    title: "Begriffe klar trennen",
    text: "Die Grafik erinnert an den Startpunkt: Erst die Groesse erkennen, dann rechnen. Bei Rechtecken ist Umfang der Rand, Flaeche der Innenbereich.",
    fact: "Merksatz: Umfang hat Laengeneinheit (cm, m), Flaeche hat Quadrateinheit (cm^2, m^2).",
    image: "slices/teil-1-einheiten.png",
  },
  {
    id: "regeln",
    label: "Regelweg",
    kicker: "Station 2",
    title: "Vom Bild zur Formel",
    text: "Wie beim Umrechnen gilt auch hier ein klarer Rechenweg: Auslegen oder Skizzieren, passende Groesse waehlen, erst dann Formel einsetzen.",
    fact: "Flaecheninhalt: Reihen mal Spalten. Umfang: alle Randseiten zusammen.",
    image: "slices/teil-2-umrechnen.png",
  },
  {
    id: "einheit",
    label: "Einheitenwahl",
    kicker: "Station 3",
    title: "Einheit bewusst waehlen",
    text: "Die Einheit muss zur Fragestellung passen. Bei Umfang geht es um Laenge eines Randes, bei Flaecheninhalt um Anzahl der Einheitsquadrate.",
    fact: "Ohne passende Einheit ist selbst ein richtiges Ergebnis fachlich unvollstaendig.",
    image: "slices/teil-3-passende-einheit.png",
  },
  {
    id: "sach",
    label: "Vergleichen",
    kicker: "Station 4",
    title: "Gleicher Umfang ist nicht gleiche Flaeche",
    text: "Dieser Ausschnitt zeigt genau die zentrale Vergleichsidee: Rechtecke koennen den gleichen Umfang haben, aber unterschiedliche Flaechen. Und umgekehrt.",
    fact: "Das ist ein Kernziel im Curriculum: Zusammenhaenge verstehen statt nur Formel einsetzen.",
    image: "slices/teil-4-vergleichen.png",
  },
  {
    id: "transfer",
    label: "Anwenden",
    kicker: "Station 5",
    title: "Sachaufgaben strukturiert loesen",
    text: "In Sachaufgaben zuerst markieren: Wird Randlaenge gesucht (Umfang) oder Bedeckung (Flaecheninhalt)? Danach in gleichen Einheiten rechnen.",
    fact: "Einheiten-Check vor der Rechnung und Plausibilitaetscheck am Ende sind Pflichtschritte.",
    image: "slices/teil-4-sachaufgabe.png",
  },
  {
    id: "reflexion",
    label: "Merkhilfen",
    kicker: "Station 6",
    title: "Fehler vermeiden",
    text: "Die letzten Merkhilfen der Grafik passen direkt zum Rechteckmodul: Einheit pruefen, Weg erklaeren, Ergebnis auf Sinn pruefen.",
    fact: "Typischer Fehler: A und U vertauschen. Dagegen helfen Skizze + Satz: 'Ich suche ...'.",
    image: "slices/teil-5-merkhilfen.png",
  },
];

const typeLabels = {
  concept: "Begriffscheck",
  u: "Umfang",
  a: "Flaecheninhalt",
  missingU: "Fehlende Seite aus U",
  missingA: "Fehlende Seite aus A",
  sameU: "Gleicher Umfang",
  sameA: "Gleiche Flaeche",
  story: "Sachaufgabe",
};

const conceptPrompts = [
  { prompt: "Wie viel Zaun brauchst du um den Garten?", answer: "U" },
  { prompt: "Wie viele Fliesen braucht man fuer den Boden?", answer: "A" },
  { prompt: "Wie lang ist die Linie um das Rechteck herum?", answer: "U" },
  { prompt: "Wie gross ist die rechteckige Wandflaeche?", answer: "A" },
  { prompt: "Wie viel Leiste braucht ein Bilderrahmen am Rand?", answer: "U" },
  { prompt: "Wie viel Teppichflaeche liegt im Zimmer?", answer: "A" },
];

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
  const rounded = Number(value.toFixed(6));
  return String(rounded).replace(".", ",");
}

function nearlyEqual(a, b) {
  const diff = Math.abs(a - b);
  const scale = Math.max(1, Math.abs(a), Math.abs(b));
  return diff <= 1e-6 * scale;
}

function toMixedLength(cm) {
  const m = Math.floor(cm / 100);
  const rest = cm % 100;
  if (rest === 0) {
    return `${m} m`;
  }
  return `${m} m ${rest} cm`;
}

function formatLength(cm, difficulty) {
  if (difficulty === "profi" && cm >= 100 && Math.random() < 0.65) {
    return toMixedLength(cm);
  }
  return `${cm} cm`;
}

function getSides(difficulty) {
  if (difficulty === "basis") {
    return [randomInt(2, 18), randomInt(2, 15)];
  }
  if (difficulty === "standard") {
    return [randomInt(3, 40), randomInt(3, 28)];
  }
  return [randomInt(12, 320), randomInt(8, 220)];
}

function getSelectedTypes() {
  return [...fuTypeChecks]
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
}

function createConceptTask() {
  const item = choice(conceptPrompts);
  return {
    type: "concept",
    kind: "choice",
    prompt: `${item.prompt} Rechnest du mit Umfang oder Flaecheninhalt?`,
    options: [
      { value: "U", label: "Umfang (U)" },
      { value: "A", label: "Flaecheninhalt (A)" },
    ],
    expected: item.answer,
    expectedDisplay: item.answer === "U" ? "Umfang (U)" : "Flaecheninhalt (A)",
    explanation: item.answer === "U" ? "Gesucht ist eine Randlaenge." : "Gesucht ist eine Innenflaeche.",
    visual: { kind: "concept" },
  };
}

function createPerimeterTask(difficulty) {
  const [a, b] = getSides(difficulty);
  const expected = 2 * (a + b);
  return {
    type: "u",
    kind: "numeric",
    prompt: `Rechteck mit a = ${formatLength(a, difficulty)} und b = ${formatLength(b, difficulty)}. Berechne den Umfang in cm.`,
    expected,
    answerUnit: "cm",
    expectedDisplay: `${formatNumber(expected)} cm`,
    explanation: "U = 2a + 2b. Beide Seitenlaengen muessen in derselben Einheit stehen.",
    visual: {
      kind: "single",
      a,
      b,
      unit: "cm",
      focus: "perimeter",
      unknown: "",
    },
  };
}

function createAreaTask(difficulty) {
  const [a, b] = getSides(difficulty);
  const expected = a * b;
  return {
    type: "a",
    kind: "numeric",
    prompt: `Rechteck mit a = ${formatLength(a, difficulty)} und b = ${formatLength(b, difficulty)}. Berechne den Flaecheninhalt in cm^2.`,
    expected,
    answerUnit: "cm^2",
    expectedDisplay: `${formatNumber(expected)} cm^2`,
    explanation: "A = a * b. Die Einheit wird quadriert: cm^2.",
    visual: {
      kind: "single",
      a,
      b,
      unit: "cm",
      focus: "area",
      unknown: "",
    },
  };
}

function createMissingFromPerimeterTask(difficulty) {
  const [a, b] = getSides(difficulty);
  const perimeter = 2 * (a + b);
  return {
    type: "missingU",
    kind: "numeric",
    prompt: `Der Umfang eines Rechtecks ist ${perimeter} cm. Eine Seite ist a = ${formatLength(a, difficulty)}. Wie lang ist die andere Seite b (in cm)?`,
    expected: b,
    answerUnit: "cm",
    expectedDisplay: `${formatNumber(b)} cm`,
    explanation: "Von U erst 2a abziehen, dann durch 2 teilen.",
    visual: {
      kind: "single",
      a,
      b,
      unit: "cm",
      focus: "perimeter",
      unknown: "b",
    },
  };
}

function createMissingFromAreaTask(difficulty) {
  const [a, b] = getSides(difficulty);
  const area = a * b;
  return {
    type: "missingA",
    kind: "numeric",
    prompt: `Der Flaecheninhalt eines Rechtecks ist ${area} cm^2. Eine Seite ist a = ${formatLength(a, difficulty)}. Wie lang ist die andere Seite b (in cm)?`,
    expected: b,
    answerUnit: "cm",
    expectedDisplay: `${formatNumber(b)} cm`,
    explanation: "A durch die bekannte Seite teilen: b = A / a.",
    visual: {
      kind: "single",
      a,
      b,
      unit: "cm",
      focus: "area",
      unknown: "b",
    },
  };
}

function createSamePerimeterCompareTask(difficulty) {
  const sum = difficulty === "basis" ? randomInt(9, 16) : randomInt(14, 34);
  let a1 = randomInt(2, sum - 2);
  let b1 = sum - a1;
  let a2 = randomInt(2, sum - 2);
  let b2 = sum - a2;

  while ((a1 === a2 && b1 === b2) || (a1 === b2 && b1 === a2)) {
    a2 = randomInt(2, sum - 2);
    b2 = sum - a2;
  }

  const area1 = a1 * b1;
  const area2 = a2 * b2;

  let expected = "=";
  if (area1 > area2) {
    expected = "A";
  } else if (area2 > area1) {
    expected = "B";
  }

  return {
    type: "sameU",
    kind: "choice",
    prompt: `Beide Rechtecke haben denselben Umfang U = ${2 * sum} cm. Rechteck A: ${a1} cm x ${b1} cm. Rechteck B: ${a2} cm x ${b2} cm. Welches hat den groesseren Flaecheninhalt?`,
    options: [
      { value: "A", label: "Rechteck A" },
      { value: "B", label: "Rechteck B" },
      { value: "=", label: "Beide gleich" },
    ],
    expected,
    expectedDisplay: expected === "=" ? "Beide gleich" : `Rechteck ${expected}`,
    explanation: "Bei gleichem Umfang kann die Flaeche unterschiedlich sein.",
    visual: {
      kind: "compare",
      focus: "area",
      unit: "cm",
      first: { label: "A", a: a1, b: b1 },
      second: { label: "B", a: a2, b: b2 },
    },
  };
}

function getFactorPairs(number) {
  const pairs = [];
  for (let i = 1; i <= Math.floor(Math.sqrt(number)); i += 1) {
    if (number % i === 0) {
      pairs.push([i, number / i]);
    }
  }
  return pairs;
}

function createSameAreaCompareTask(difficulty) {
  const candidates = difficulty === "basis"
    ? [12, 18, 20, 24, 30, 36]
    : [24, 30, 36, 40, 48, 54, 60, 72, 84];

  let area = choice(candidates);
  let pairs = getFactorPairs(area).filter(([x, y]) => x !== y && x >= 2 && y >= 2);

  while (pairs.length < 2) {
    area = choice(candidates);
    pairs = getFactorPairs(area).filter(([x, y]) => x !== y && x >= 2 && y >= 2);
  }

  const first = choice(pairs);
  let second = choice(pairs);
  while ((first[0] === second[0] && first[1] === second[1]) || (first[0] === second[1] && first[1] === second[0])) {
    second = choice(pairs);
  }

  const [a1, b1] = first;
  const [a2, b2] = second;
  const u1 = 2 * (a1 + b1);
  const u2 = 2 * (a2 + b2);

  let expected = "=";
  if (u1 < u2) {
    expected = "A";
  } else if (u2 < u1) {
    expected = "B";
  }

  return {
    type: "sameA",
    kind: "choice",
    prompt: `Beide Rechtecke haben dieselbe Flaeche A = ${area} cm^2. Rechteck A: ${a1} cm x ${b1} cm. Rechteck B: ${a2} cm x ${b2} cm. Welches hat den kleineren Umfang?`,
    options: [
      { value: "A", label: "Rechteck A" },
      { value: "B", label: "Rechteck B" },
      { value: "=", label: "Beide gleich" },
    ],
    expected,
    expectedDisplay: expected === "=" ? "Beide gleich" : `Rechteck ${expected}`,
    explanation: "Bei gleicher Flaeche kann der Umfang unterschiedlich sein.",
    visual: {
      kind: "compare",
      focus: "perimeter",
      unit: "cm",
      first: { label: "A", a: a1, b: b1 },
      second: { label: "B", a: a2, b: b2 },
    },
  };
}

function createStoryTask(difficulty) {
  const templates = [];

  templates.push(() => {
    const a = randomInt(4, difficulty === "basis" ? 14 : 30);
    const b = randomInt(3, difficulty === "basis" ? 11 : 24);
    return {
      type: "story",
      kind: "numeric",
      prompt: `Ein Schulgarten ist ${a} m lang und ${b} m breit. Wie viele Meter Zaun braucht man insgesamt?`,
      expected: 2 * (a + b),
      answerUnit: "m",
      expectedDisplay: `${formatNumber(2 * (a + b))} m`,
      explanation: "Zaun bedeutet Randlaenge, also Umfang.",
      visual: {
        kind: "single",
        a,
        b,
        unit: "m",
        focus: "perimeter",
        unknown: "",
      },
    };
  });

  templates.push(() => {
    const a = randomInt(5, difficulty === "basis" ? 14 : 28);
    const b = randomInt(4, difficulty === "basis" ? 12 : 25);
    return {
      type: "story",
      kind: "numeric",
      prompt: `Ein rechteckiger Boden ist ${a} m x ${b} m gross. Pro m^2 wird eine Fliese benoetigt. Wie viele Fliesen braucht man?`,
      expected: a * b,
      answerUnit: "Fliesen",
      expectedDisplay: `${formatNumber(a * b)} Fliesen`,
      explanation: "Fliesen decken die Flaeche, also A = a * b.",
      visual: {
        kind: "single",
        a,
        b,
        unit: "m",
        focus: "area",
        unknown: "",
      },
    };
  });

  if (difficulty === "profi") {
    templates.push(() => {
      const a = randomInt(8, 22) * 10;
      const b = randomInt(5, 15) * 10;
      const mode = choice(["U", "A"]);
      if (mode === "U") {
        return {
          type: "story",
          kind: "numeric",
          prompt: `Ein Poster ist ${a} cm lang und ${b} cm breit. Wie lang ist das Randband fuer einmal herum in m?`,
          expected: Number((2 * (a + b) / 100).toFixed(6)),
          answerUnit: "m",
          expectedDisplay: `${formatNumber(Number((2 * (a + b) / 100).toFixed(6)))} m`,
          explanation: "Zuerst Umfang in cm berechnen, danach in Meter umrechnen.",
          visual: {
            kind: "single",
            a,
            b,
            unit: "cm",
            focus: "perimeter",
            unknown: "",
          },
        };
      }
      return {
        type: "story",
        kind: "numeric",
        prompt: `Ein Poster ist ${a} cm lang und ${b} cm breit. Wie gross ist die Flaeche in m^2?`,
        expected: Number((a * b / 10000).toFixed(6)),
        answerUnit: "m^2",
        expectedDisplay: `${formatNumber(Number((a * b / 10000).toFixed(6)))} m^2`,
        explanation: "Flaeche in cm^2 berechnen und durch 10 000 in m^2 umrechnen.",
        visual: {
          kind: "single",
          a,
          b,
          unit: "cm",
          focus: "area",
          unknown: "",
        },
      };
    });
  }

  templates.push(() => {
    const area = choice([24, 30, 36, 40, 48, 56]);
    const pairs = getFactorPairs(area).filter(([x, y]) => x >= 2 && y >= 2);
    const width = choice(pairs)[0];
    const length = area / width;
    return {
      type: "story",
      kind: "numeric",
      prompt: `Ein Rechteck hat die Flaeche ${area} m^2 und die Breite ${width} m. Wie lang ist es?`,
      expected: length,
      answerUnit: "m",
      expectedDisplay: `${formatNumber(length)} m`,
      explanation: "Laenge = Flaeche / Breite.",
      visual: {
        kind: "single",
        a: length,
        b: width,
        unit: "m",
        focus: "area",
        unknown: "a",
      },
    };
  });

  return choice(templates)();
}

function createTask(type, difficulty) {
  if (type === "concept") {
    return createConceptTask();
  }
  if (type === "u") {
    return createPerimeterTask(difficulty);
  }
  if (type === "a") {
    return createAreaTask(difficulty);
  }
  if (type === "missingU") {
    return createMissingFromPerimeterTask(difficulty);
  }
  if (type === "missingA") {
    return createMissingFromAreaTask(difficulty);
  }
  if (type === "sameU") {
    return createSamePerimeterCompareTask(difficulty);
  }
  if (type === "sameA") {
    return createSameAreaCompareTask(difficulty);
  }
  return createStoryTask(difficulty);
}

function buildTaskSet() {
  const selectedTypes = getSelectedTypes();
  const difficulty = fuDifficulty.value;
  const count = Number(fuCount.value);

  if (selectedTypes.length === 0) {
    fuTaskFeedback.innerHTML = '<p class="feedback bad">Bitte mindestens einen Aufgabentyp auswaehlen.</p>';
    return;
  }

  generatedTasks = [];
  for (let i = 0; i < count; i += 1) {
    const taskType = selectedTypes[i % selectedTypes.length];
    generatedTasks.push(createTask(taskType, difficulty));
  }
  generatedTasks = shuffle(generatedTasks);

  renderTaskSet();
  fuTaskFeedback.innerHTML = '<p class="feedback info">Neue Runde erzeugt. Du kannst direkt rechnen oder zuerst Aufgaben durchgehen.</p>';
}

function buildRectSvg(a, b, unit, focus, unknown) {
  const totalWidth = 250;
  const totalHeight = 140;
  const maxRectWidth = 160;
  const maxRectHeight = 90;
  const safeA = Math.max(1, Number(a));
  const safeB = Math.max(1, Number(b));
  const scale = Math.min(maxRectWidth / safeA, maxRectHeight / safeB);
  const rw = safeA * scale;
  const rh = safeB * scale;
  const rx = 44;
  const ry = 24;
  const topLabel = unknown === "a" ? "a = ?" : `a = ${formatNumber(safeA)} ${unit}`;
  const sideLabel = unknown === "b" ? "b = ?" : `b = ${formatNumber(safeB)} ${unit}`;
  const fillColor = focus === "area" ? "#daf3df" : "#f7edd8";
  const strokeColor = focus === "perimeter" ? "#db7d24" : "#2263a7";
  const markerLabel = focus === "perimeter" ? "U: Randlaenge" : "A: Innenflaeche";

  return `
    <svg viewBox="0 0 ${totalWidth} ${totalHeight}" aria-hidden="true">
      <rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="3" rx="3"></rect>
      <text x="${rx + rw / 2}" y="${ry - 7}" text-anchor="middle" class="fu-svg-label">${topLabel}</text>
      <text x="${rx - 7}" y="${ry + rh / 2}" text-anchor="end" dominant-baseline="middle" class="fu-svg-label">${sideLabel}</text>
      <text x="${rx + rw + 12}" y="${ry + rh + 6}" class="fu-svg-hint">${markerLabel}</text>
      <line x1="${rx}" y1="${ry + rh + 10}" x2="${rx + rw}" y2="${ry + rh + 10}" stroke="#4d6784" stroke-width="1.5"></line>
      <line x1="${rx}" y1="${ry + rh + 6}" x2="${rx}" y2="${ry + rh + 14}" stroke="#4d6784" stroke-width="1.5"></line>
      <line x1="${rx + rw}" y1="${ry + rh + 6}" x2="${rx + rw}" y2="${ry + rh + 14}" stroke="#4d6784" stroke-width="1.5"></line>
    </svg>
  `;
}

function buildCompareSvg(first, second, focus, unit) {
  const maxW = 100;
  const maxH = 62;
  const aMax = Math.max(first.a, second.a);
  const bMax = Math.max(first.b, second.b);
  const scale = Math.min(maxW / aMax, maxH / bMax);

  function rectPart(rect, offsetX, fill) {
    const rw = rect.a * scale;
    const rh = rect.b * scale;
    const rx = offsetX + (100 - rw) / 2;
    const ry = 34 + (62 - rh) / 2;
    return `
      <rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" fill="${fill}" stroke="#315c88" stroke-width="2"></rect>
      <text x="${offsetX + 50}" y="20" text-anchor="middle" class="fu-svg-head">${rect.label}</text>
      <text x="${offsetX + 50}" y="114" text-anchor="middle" class="fu-svg-label">${formatNumber(rect.a)} x ${formatNumber(rect.b)} ${unit}</text>
    `;
  }

  const focusNote = focus === "area" ? "Vergleich: Flaecheninhalt" : "Vergleich: Umfang";

  return `
    <svg viewBox="0 0 250 130" aria-hidden="true">
      ${rectPart(first, 18, "#dcebff")}
      ${rectPart(second, 132, "#f3e6ff")}
      <text x="125" y="127" text-anchor="middle" class="fu-svg-hint">${focusNote}</text>
    </svg>
  `;
}

function createTaskVisual(task) {
  if (!task.visual) {
    return null;
  }

  const wrap = document.createElement("div");
  wrap.className = "fu-task-visual";

  if (task.visual.kind === "concept") {
    wrap.innerHTML = `
      <svg viewBox="0 0 250 110" aria-hidden="true">
        <rect x="16" y="18" width="92" height="60" fill="#fff9ee" stroke="#d07b1f" stroke-width="3"></rect>
        <rect x="142" y="18" width="92" height="60" fill="#e7f6eb" stroke="#2f7e44" stroke-width="3"></rect>
        <text x="62" y="52" text-anchor="middle" class="fu-svg-head">U</text>
        <text x="188" y="52" text-anchor="middle" class="fu-svg-head">A</text>
        <text x="62" y="94" text-anchor="middle" class="fu-svg-hint">aussen herum</text>
        <text x="188" y="94" text-anchor="middle" class="fu-svg-hint">innen drin</text>
      </svg>
    `;
    return wrap;
  }

  if (task.visual.kind === "single") {
    wrap.innerHTML = buildRectSvg(
      task.visual.a,
      task.visual.b,
      task.visual.unit,
      task.visual.focus,
      task.visual.unknown
    );
    return wrap;
  }

  if (task.visual.kind === "compare") {
    wrap.innerHTML = buildCompareSvg(task.visual.first, task.visual.second, task.visual.focus, task.visual.unit);
    return wrap;
  }

  return null;
}

function createTaskRow(task, index) {
  const row = document.createElement("article");
  row.className = "fu-task-row";

  const prompt = document.createElement("p");
  prompt.innerHTML = `<strong>${index + 1}. [${typeLabels[task.type]}] ${task.prompt}</strong>`;

  const answerLine = document.createElement("div");
  answerLine.className = "fu-answer-line";

  if (task.kind === "numeric") {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "fu-input";
    input.name = `task-${index}`;
    input.placeholder = "Antwort";
    answerLine.append(input);

    if (task.answerUnit) {
      const unit = document.createElement("span");
      unit.textContent = task.answerUnit;
      answerLine.append(unit);
    }
  } else {
    const select = document.createElement("select");
    select.className = "fu-choice";
    select.name = `task-${index}`;
    select.innerHTML =
      '<option value="">Waehlen</option>' +
      task.options.map((option) => `<option value="${option.value}">${option.label}</option>`).join("");
    answerLine.append(select);
  }

  const feedback = document.createElement("div");
  feedback.className = "task-feedback";

  const visual = createTaskVisual(task);
  if (visual instanceof HTMLDivElement) {
    row.append(prompt, visual, answerLine, feedback);
  } else {
    row.append(prompt, answerLine, feedback);
  }
  return row;
}

function renderTaskSet() {
  fuTaskList.replaceChildren();
  generatedTasks.forEach((task, index) => {
    fuTaskList.append(createTaskRow(task, index));
  });
}

function clearRows() {
  fuTaskList.querySelectorAll(".fu-task-row").forEach((row) => {
    row.classList.remove("is-correct", "is-wrong");
    const feedback = row.querySelector(".task-feedback");
    if (feedback instanceof HTMLDivElement) {
      feedback.innerHTML = "";
    }
  });
}

function resetInputs() {
  fuTaskList.querySelectorAll(".fu-task-row").forEach((row) => {
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
  fuTaskFeedback.innerHTML = '<p class="feedback info">Eingaben geleert.</p>';
}

function checkTaskSet() {
  if (generatedTasks.length === 0) {
    fuTaskFeedback.innerHTML = '<p class="feedback info">Erstelle zuerst eine Aufgabenrunde.</p>';
    return;
  }

  clearRows();

  const rows = fuTaskList.querySelectorAll(".fu-task-row");
  let answered = 0;
  let correct = 0;

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
      const userValue = parseNumberInput(input.value);
      if (!Number.isFinite(userValue)) {
        return;
      }
      answered += 1;
      if (nearlyEqual(userValue, task.expected)) {
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
    if (!(select instanceof HTMLSelectElement) || !select.value) {
      return;
    }
    answered += 1;
    if (select.value === task.expected) {
      correct += 1;
      row.classList.add("is-correct");
      feedback.innerHTML = `<p class="feedback ok">Richtig. ${task.explanation}</p>`;
    } else {
      row.classList.add("is-wrong");
      feedback.innerHTML = `<p class="feedback bad">Nicht korrekt. Richtig ist: ${task.expectedDisplay}. ${task.explanation}</p>`;
    }
  });

  if (answered < generatedTasks.length) {
    fuTaskFeedback.innerHTML = '<p class="feedback info">Bitte alle Aufgaben beantworten.</p>';
    return;
  }

  fuTaskFeedback.innerHTML = `
    <p class="feedback ${correct === generatedTasks.length ? "ok" : "bad"}">
      ${correct} / ${generatedTasks.length} richtig.
      ${correct === generatedTasks.length ? "Sehr gut." : "Nutze die Rueckmeldungen und starte eine neue Runde."}
    </p>
  `;
}

function createStationButtons() {
  fuStationButtons.replaceChildren();
  stationData.forEach((station, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "fu-station-btn";
    button.textContent = station.label;
    button.dataset.stationId = station.id;
    if (index === 0) {
      button.classList.add("is-active");
    }
    fuStationButtons.append(button);
  });
}

function renderStation(stationId) {
  const station = stationData.find((item) => item.id === stationId) || stationData[0];
  fuStationImage.src = station.image;
  fuStationKicker.textContent = station.kicker;
  fuStationTitle.textContent = station.title;
  fuStationText.textContent = station.text;
  fuStationFact.textContent = station.fact;

  fuStationButtons.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.stationId === station.id);
  });
}

function setupStations() {
  createStationButtons();
  renderStation(stationData[0].id);

  fuStationButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }
    renderStation(button.dataset.stationId);
  });
}

function setupTabs() {
  fuTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      fuTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      fuTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${target}`).classList.add("is-active");
    });
  });
}

function numericOptions(expected, unit) {
  const options = new Set();
  const base = Number(expected.toFixed(6));
  const jump = Math.max(1, Math.abs(base) * 0.2);

  options.add(`${formatNumber(base)} ${unit}`.trim());
  options.add(`${formatNumber(Number((base + jump).toFixed(6)))} ${unit}`.trim());
  options.add(`${formatNumber(Math.max(0, Number((base - jump).toFixed(6))))} ${unit}`.trim());
  options.add(`${formatNumber(Number((base * 2).toFixed(6)))} ${unit}`.trim());
  options.add(`${formatNumber(Number((base / 2).toFixed(6)))} ${unit}`.trim());

  while (options.size < 4) {
    const randomAlternative = Math.max(0, Number((base + randomInt(-20, 20)).toFixed(6)));
    options.add(`${formatNumber(randomAlternative)} ${unit}`.trim());
  }

  const finalOptions = shuffle([...options]).slice(0, 4);
  const correctLabel = `${formatNumber(base)} ${unit}`.trim();
  if (!finalOptions.includes(correctLabel)) {
    finalOptions[0] = correctLabel;
  }
  return { options: shuffle(finalOptions), correctLabel };
}

function taskToQuizQuestion(task) {
  if (task.kind === "choice") {
    const labels = task.options.map((option) => option.label);
    const correctLabel = task.options.find((option) => option.value === task.expected)?.label || "";
    return {
      prompt: task.prompt,
      options: shuffle(labels),
      correctLabel,
      explanation: task.explanation,
    };
  }

  const optionData = numericOptions(task.expected, task.answerUnit || "");
  return {
    prompt: task.prompt,
    options: optionData.options,
    correctLabel: optionData.correctLabel,
    explanation: task.explanation,
  };
}

function createQuizSet(count = 12) {
  const taskTypes = ["concept", "u", "a", "missingU", "missingA", "sameU", "sameA", "story"];
  const levels = ["basis", "standard", "profi"];
  const questions = [];

  for (let i = 0; i < count; i += 1) {
    const task = createTask(taskTypes[i % taskTypes.length], levels[i % levels.length]);
    questions.push(taskToQuizQuestion(task));
  }
  return shuffle(questions);
}

function updateQuizScore() {
  fuQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  fuQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  fuQuizPrompt.textContent = question.prompt;
  fuQuizFeedback.innerHTML = "";
  fuQuizNext.disabled = true;
  fuQuizOptions.innerHTML = question.options
    .map(
      (option, idx) => `
        <button class="choice-btn" type="button" data-option="${idx}">
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
  fuQuizStart.textContent = "Check neu starten";
  updateQuizScore();
  renderQuizQuestion();
}

function submitQuizAnswer(optionIndex) {
  if (!quizState.running || quizState.answered) {
    return;
  }

  const question = quizState.questions[quizState.index];
  const selected = question.options[optionIndex];
  const isCorrect = selected === question.correctLabel;
  quizState.answered = true;

  if (isCorrect) {
    quizState.correct += 1;
  }
  updateQuizScore();

  fuQuizOptions.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  fuQuizFeedback.innerHTML = `
    <p class="feedback ${isCorrect ? "ok" : "bad"}">
      ${isCorrect
        ? `Richtig. ${question.explanation}`
        : `Nicht korrekt. Richtige Antwort: "${question.correctLabel}". ${question.explanation}`}
    </p>
  `;

  fuQuizNext.disabled = false;
  fuQuizNext.textContent =
    quizState.index === quizState.questions.length - 1 ? "Ergebnis anzeigen" : "Naechste Frage";
}

function finishQuiz() {
  quizState.running = false;
  fuQuizStatus.textContent = "Diagnose-Check abgeschlossen.";
  fuQuizPrompt.textContent = "Du kannst den Check neu starten.";
  fuQuizOptions.innerHTML = "";
  fuQuizFeedback.innerHTML =
    '<p class="feedback info">Starte neu fuer einen frischen Fragensatz mit anderen Zahlen.</p>';
  fuQuizNext.disabled = true;
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
  fuQuizStart.addEventListener("click", startQuiz);
  fuQuizNext.addEventListener("click", nextQuizStep);
  fuQuizOptions.addEventListener("click", (event) => {
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
  fuGenerate.addEventListener("click", buildTaskSet);
  fuCheck.addEventListener("click", checkTaskSet);
  fuReset.addEventListener("click", resetInputs);
}

setupTabs();
setupStations();
setupGenerator();
setupQuiz();
