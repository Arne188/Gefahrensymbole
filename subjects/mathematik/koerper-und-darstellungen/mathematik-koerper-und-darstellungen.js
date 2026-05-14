const kdTabButtons = document.querySelectorAll(".kd-tab-btn");
const kdTabPanels = document.querySelectorAll(".kd-tab");

const kdStationButtons = document.getElementById("kdStationButtons");
const kdStationImage = document.getElementById("kdStationImage");
const kdStationKicker = document.getElementById("kdStationKicker");
const kdStationTitle = document.getElementById("kdStationTitle");
const kdStationText = document.getElementById("kdStationText");
const kdStationFact = document.getElementById("kdStationFact");

const kdDifficulty = document.getElementById("kdDifficulty");
const kdCount = document.getElementById("kdCount");
const kdTypeChecks = document.querySelectorAll(".kd-type-check");
const kdGenerate = document.getElementById("kdGenerate");
const kdCheck = document.getElementById("kdCheck");
const kdReset = document.getElementById("kdReset");
const kdTaskList = document.getElementById("kdTaskList");
const kdTaskFeedback = document.getElementById("kdTaskFeedback");

const kdQuizStart = document.getElementById("kdQuizStart");
const kdQuizNext = document.getElementById("kdQuizNext");
const kdQuizScore = document.getElementById("kdQuizScore");
const kdQuizStatus = document.getElementById("kdQuizStatus");
const kdQuizPrompt = document.getElementById("kdQuizPrompt");
const kdQuizVisual = document.getElementById("kdQuizVisual");
const kdQuizOptions = document.getElementById("kdQuizOptions");
const kdQuizFeedback = document.getElementById("kdQuizFeedback");

const stationData = [
  {
    id: "grund",
    label: "Grundkoerper",
    kicker: "Station 1",
    title: "Grundkoerper erkennen und vergleichen",
    text: "Wuerfel, Quader, Zylinder und Kugel werden mit Flaechen, Kanten und Ecken verglichen.",
    fact: "Wuerfel und Quader haben gleich viele Ecken und Kanten, aber unterschiedliche Flaechenformen.",
    image: "slices/teil-1-grundkoerper.png",
  },
  {
    id: "kante",
    label: "Kantenmodell",
    kicker: "Station 2",
    title: "Vom Flaechenmodell zum Kantenmodell",
    text: "Kantenmodelle machen Ecken und Kanten besonders sichtbar und helfen beim raeumlichen Denken.",
    fact: "Zusammengesetzte Koerper lassen sich oft auf bekannte Quaderstrukturen zurueckfuehren.",
    image: "slices/teil-2-kantenmodell.png",
  },
  {
    id: "netz",
    label: "Netzprinzip",
    kicker: "Station 3",
    title: "Netz -> Koerper -> Modell",
    text: "Ein gueltiges Netz laesst sich ohne Luecken oder Ueberlappungen zu einem Koerper zusammenfalten.",
    fact: "Jede Flaeche im Netz entspricht genau einer Flaeche am Koerper.",
    image: "slices/teil-3-netze.png",
  },
  {
    id: "netztest",
    label: "Netztest",
    kicker: "Station 4",
    title: "Gueltige und ungueltige Netze unterscheiden",
    text: "Beim Netztest wird geprueft: Fehlt eine Flaeche? Ueberlappt etwas beim Falten?",
    fact: "Nicht jede Anordnung aus 6 Quadraten ist automatisch ein Wuerfelnetz.",
    image: "slices/teil-4-netztest.png",
  },
  {
    id: "modellbau",
    label: "Modellbau",
    kicker: "Station 5",
    title: "Roboter aus Netzen bauen",
    text: "Der Modellbau ist kein Beiwerk, sondern ein zentraler Lernweg fuer Raumvorstellung.",
    fact: "Das Bauen verbindet Netz, Koerper und Kontrollblick besonders stark.",
    image: "slices/teil-5-roboter.png",
  },
  {
    id: "schraeg",
    label: "Schraegbild",
    kicker: "Station 6",
    title: "Schraegbilder lesen und ergaenzen",
    text: "In Klasse 5 steht das Vervollstaendigen im Vordergrund: Tiefe, Richtung und verdeckte Kanten sichern.",
    fact: "Verdeckte Kanten werden gestrichelt gezeichnet.",
    image: "slices/teil-6-schraegbild.png",
  },
  {
    id: "merke",
    label: "Merkhilfen",
    kicker: "Station 7",
    title: "Sicherheitsnetz fuer Aufgaben",
    text: "Koerper ansehen, Kanten/Ecken zaehlen, Netz pruefen, Schraegbild sauber ergaenzen.",
    fact: "Vom Modell zum Netz denken ist ein Schluessel fuer spaetere Raumgeometrie.",
    image: "slices/teil-7-merkhilfen.png",
  },
];

const bodyData = {
  cube: { label: "Wuerfel", faces: 6, edges: 12, vertices: 8, kind: "cube" },
  cuboid: { label: "Quader", faces: 6, edges: 12, vertices: 8, kind: "cuboid" },
  cylinder: { label: "Zylinder", faces: 3, edges: 2, vertices: 0, kind: "cylinder" },
  sphere: { label: "Kugel", faces: 1, edges: 0, vertices: 0, kind: "sphere" },
  pyramid: { label: "Quadratische Pyramide", faces: 5, edges: 8, vertices: 5, kind: "pyramid" },
  triprism: { label: "Dreiecksprisma", faces: 5, edges: 9, vertices: 6, kind: "triprism" },
};

const typeLabels = {
  body: "Grundkoerper",
  parts: "Koerperteile",
  wire: "Kantenmodell",
  netcheck: "Netzcheck",
  netbody: "Netz zu Koerper",
  schraeg: "Schraegbild",
  robot: "Modellbau",
};

const schraegCases = [
  {
    prompt: "Welche Aussage passt zum gezeigten begonnenen Schraegbild?",
    options: [
      { value: "a", label: "Tiefe Kanten laufen schraeg nach hinten." },
      { value: "b", label: "Alle verdeckten Kanten muessen durchgezogen werden." },
      { value: "c", label: "Die Vorderflaeche wird immer als Kreis gezeichnet." },
    ],
    expected: "a",
    explanation: "Im Schraegbild laufen die Tiefenkanten gleichgerichtet schraeg nach hinten.",
    visual: { kind: "schraeg", variant: 1 },
  },
  {
    prompt: "Im Schraegbild sind Kanten verdeckt. Wie werden sie dargestellt?",
    options: [
      { value: "a", label: "Mit dicker Linie." },
      { value: "b", label: "Mit gestrichelter Linie." },
      { value: "c", label: "Gar nicht." },
    ],
    expected: "b",
    explanation: "Verdeckte Kanten werden gestrichelt gezeichnet.",
    visual: { kind: "schraeg", variant: 2 },
  },
  {
    prompt: "Was ist in Klasse 5 wichtiger als perfektes freies Zeichnen?",
    options: [
      { value: "a", label: "Vervollstaendigen und richtiges Deuten." },
      { value: "b", label: "Kuenstlerisches Schattieren." },
      { value: "c", label: "Moeglichst viele Farben." },
    ],
    expected: "a",
    explanation: "Curricular steht in Klasse 5 das Verstaendnis beim Ergaenzen im Vordergrund.",
    visual: { kind: "schraeg", variant: 3 },
  },
];

const netPatterns = {
  validBase: [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [1, 2],
    [1, 3],
  ],
  invalidPool: [
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
      [4, 0],
      [4, 1],
    ],
  ],
};

const robotSteps = [
  "Netz anschauen",
  "Falten planen",
  "Zusammenkleben",
  "Modell pruefen",
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
  const cleaned = String(value || "").trim().replace(",", ".").replace(/\s+/g, "");
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

function getBodiesForDifficulty(difficulty) {
  if (difficulty === "basis") {
    return ["cube", "cuboid", "cylinder", "sphere"];
  }
  if (difficulty === "standard") {
    return ["cube", "cuboid", "cylinder", "sphere", "pyramid"];
  }
  return ["cube", "cuboid", "cylinder", "sphere", "pyramid", "triprism"];
}

function getSelectedTypes() {
  return [...kdTypeChecks]
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
}

function rotateCells90(cells) {
  return cells.map(([x, y]) => [-y, x]);
}

function mirrorCells(cells) {
  return cells.map(([x, y]) => [-x, y]);
}

function normalizeCells(cells) {
  const minX = Math.min(...cells.map(([x]) => x));
  const minY = Math.min(...cells.map(([, y]) => y));
  return cells.map(([x, y]) => [x - minX, y - minY]);
}

function transformValidNet() {
  let cells = netPatterns.validBase.map(([x, y]) => [x, y]);
  const rotations = randomInt(0, 3);
  for (let i = 0; i < rotations; i += 1) {
    cells = rotateCells90(cells);
  }
  if (Math.random() < 0.5) {
    cells = mirrorCells(cells);
  }
  return normalizeCells(cells);
}

function createBodyTask(difficulty) {
  const pool = getBodiesForDifficulty(difficulty);
  const bodyKey = choice(pool);
  const body = bodyData[bodyKey];
  const wrong = shuffle(pool.filter((entry) => entry !== bodyKey)).slice(0, 3);
  const options = shuffle([bodyKey, ...wrong]).map((key) => ({
    value: key,
    label: bodyData[key].label,
  }));

  return {
    type: "body",
    kind: "choice",
    prompt: "Welcher Grundkoerper ist dargestellt?",
    options,
    expected: bodyKey,
    expectedDisplay: body.label,
    explanation: `${body.label} korrekt erkannt.`,
    visual: { kind: "body", body: body.kind, wire: false },
  };
}

function createPartsTask(difficulty) {
  const pool = getBodiesForDifficulty(difficulty);
  const bodyKey = choice(pool);
  const body = bodyData[bodyKey];
  const property = choice(["faces", "edges", "vertices"]);
  const labelMap = {
    faces: "Flaechen",
    edges: "Kanten",
    vertices: "Ecken",
  };

  return {
    type: "parts",
    kind: "numeric",
    prompt: `Wie viele ${labelMap[property]} hat ein ${body.label}?`,
    expected: body[property],
    answerUnit: "",
    expectedDisplay: `${body[property]}`,
    explanation: `${body.label}: ${body.faces} Flaechen, ${body.edges} Kanten, ${body.vertices} Ecken.`,
    visual: { kind: "body", body: body.kind, wire: true },
  };
}

function createWireTask(difficulty) {
  const pool = getBodiesForDifficulty(difficulty).filter((entry) =>
    ["cube", "cuboid", "pyramid", "triprism"].includes(entry)
  );
  const bodyKey = choice(pool);
  const body = bodyData[bodyKey];
  const options = shuffle(pool).slice(0, Math.min(4, pool.length)).map((entry) => ({
    value: entry,
    label: bodyData[entry].label,
  }));
  if (!options.some((option) => option.value === bodyKey)) {
    options[0] = { value: bodyKey, label: body.label };
  }

  return {
    type: "wire",
    kind: "choice",
    prompt: "Zu welchem Koerper gehoert dieses Kantenmodell?",
    options: shuffle(options),
    expected: bodyKey,
    expectedDisplay: body.label,
    explanation: "Kantenmodell richtig zugeordnet.",
    visual: { kind: "body", body: body.kind, wire: true },
  };
}

function createNetCheckTask(difficulty) {
  const useValid = Math.random() < 0.5;
  const invalidPool = difficulty === "basis"
    ? netPatterns.invalidPool.slice(0, 2)
    : netPatterns.invalidPool;
  const cells = useValid ? transformValidNet() : choice(invalidPool);
  return {
    type: "netcheck",
    kind: "choice",
    prompt: "Ist dieses Netz ein gueltiges Wuerfelnetz?",
    options: [
      { value: "yes", label: "Ja, gueltig" },
      { value: "no", label: "Nein, ungueltig" },
    ],
    expected: useValid ? "yes" : "no",
    expectedDisplay: useValid ? "Ja, gueltig" : "Nein, ungueltig",
    explanation: useValid
      ? "Dieses Netz laesst sich ohne Ueberlappung zu einem Wuerfel falten."
      : "Dieses Netz ist ungueltig (z. B. Ueberlappung, Formbruch oder fehlender Anschluss).",
    visual: { kind: "net", cells },
  };
}

function createNetBodyTask(difficulty) {
  const items = [
    {
      key: "cube",
      statement: "Das Netz besteht aus 6 gleich grossen Quadraten.",
      label: "Wuerfel",
    },
    {
      key: "cuboid",
      statement: "Das Netz besteht aus 6 Rechtecken, jeweils gegenueberliegende Flaechen sind gleich gross.",
      label: "Quader",
    },
    {
      key: "triprism",
      statement: "Das Netz besteht aus 2 Dreiecken und 3 Rechtecken.",
      label: "Dreiecksprisma",
    },
    {
      key: "pyramid",
      statement: "Das Netz besteht aus 1 Quadrat und 4 Dreiecken.",
      label: "Quadratische Pyramide",
    },
  ];

  const allowed = difficulty === "basis" ? items.slice(0, 2) : items;
  const picked = choice(allowed);
  const optionPool = shuffle(allowed).slice(0, Math.min(4, allowed.length));
  if (!optionPool.some((entry) => entry.key === picked.key)) {
    optionPool[0] = picked;
  }

  return {
    type: "netbody",
    kind: "choice",
    prompt: `${picked.statement} Welcher Koerper passt?`,
    options: shuffle(optionPool).map((entry) => ({
      value: entry.key,
      label: entry.label,
    })),
    expected: picked.key,
    expectedDisplay: picked.label,
    explanation: `${picked.label} korrekt ueber die Flaechenzusammensetzung erkannt.`,
    visual: { kind: "body", body: bodyData[picked.key].kind, wire: false },
  };
}

function createSchraegTask(difficulty) {
  const pool = difficulty === "basis" ? schraegCases.slice(0, 2) : schraegCases;
  const item = choice(pool);
  return {
    type: "schraeg",
    kind: "choice",
    prompt: item.prompt,
    options: item.options,
    expected: item.expected,
    expectedDisplay: item.options.find((option) => option.value === item.expected)?.label || "",
    explanation: item.explanation,
    visual: item.visual,
  };
}

function createRobotTask() {
  const index = randomInt(0, robotSteps.length - 2);
  const currentStep = robotSteps[index];
  const expectedStep = robotSteps[index + 1];
  const options = shuffle(robotSteps).slice(0, 4).map((step) => ({
    value: step,
    label: step,
  }));
  if (!options.some((entry) => entry.value === expectedStep)) {
    options[0] = { value: expectedStep, label: expectedStep };
  }

  return {
    type: "robot",
    kind: "choice",
    prompt: `Beim Modellbau bist du bei "${currentStep}". Welcher Schritt kommt als naechstes?`,
    options: shuffle(options),
    expected: expectedStep,
    expectedDisplay: expectedStep,
    explanation: "Die Reihenfolge hilft, Fehler beim Falten und Kleben zu vermeiden.",
    visual: { kind: "robot" },
  };
}

function createTask(taskType, difficulty) {
  if (taskType === "body") {
    return createBodyTask(difficulty);
  }
  if (taskType === "parts") {
    return createPartsTask(difficulty);
  }
  if (taskType === "wire") {
    return createWireTask(difficulty);
  }
  if (taskType === "netcheck") {
    return createNetCheckTask(difficulty);
  }
  if (taskType === "netbody") {
    return createNetBodyTask(difficulty);
  }
  if (taskType === "schraeg") {
    return createSchraegTask(difficulty);
  }
  return createRobotTask();
}

function buildTaskSet() {
  const selectedTypes = getSelectedTypes();
  const difficulty = kdDifficulty.value;
  const count = Number(kdCount.value);

  if (selectedTypes.length === 0) {
    kdTaskFeedback.innerHTML = '<p class="feedback bad">Bitte mindestens einen Aufgabentyp auswaehlen.</p>';
    return;
  }

  generatedTasks = [];
  for (let i = 0; i < count; i += 1) {
    const taskType = selectedTypes[i % selectedTypes.length];
    generatedTasks.push(createTask(taskType, difficulty));
  }
  generatedTasks = shuffle(generatedTasks);
  renderTaskSet();
  kdTaskFeedback.innerHTML = '<p class="feedback info">Neue Runde erzeugt. Alle Aufgaben sind frisch generiert.</p>';
}

function bodySvg(kind, wire = false) {
  const fillOpacity = wire ? "0.08" : "1";
  const faceStroke = wire ? "2.6" : "2";
  const hidden = wire ? "stroke-dasharray=\"6 5\"" : "";
  const defs = `
    <defs>
      <filter id="kdShapeShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="4" flood-color="#16324a" flood-opacity="0.16"></feDropShadow>
      </filter>
      <linearGradient id="kdGreenFace" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#e8f8db"></stop>
        <stop offset="100%" stop-color="#94d179"></stop>
      </linearGradient>
      <linearGradient id="kdBlueFace" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#e8f3ff"></stop>
        <stop offset="100%" stop-color="#8fbff2"></stop>
      </linearGradient>
      <linearGradient id="kdOrangeFace" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#fff1d6"></stop>
        <stop offset="100%" stop-color="#f0a24b"></stop>
      </linearGradient>
      <radialGradient id="kdSphereFace" cx="32%" cy="28%" r="72%">
        <stop offset="0%" stop-color="#ffe0e0"></stop>
        <stop offset="100%" stop-color="#d84646"></stop>
      </radialGradient>
    </defs>
  `;

  if (kind === "cube") {
    return `
      <svg viewBox="0 0 260 150" aria-hidden="true">
        ${defs}
        <g filter="url(#kdShapeShadow)">
          <polygon points="70,48 146,48 185,26 109,26" fill="url(#kdGreenFace)" fill-opacity="${fillOpacity}" stroke="#2f7a44" stroke-width="${faceStroke}"></polygon>
          <polygon points="70,48 109,26 109,96 70,118" fill="#bde6a7" fill-opacity="${fillOpacity}" stroke="#2f7a44" stroke-width="${faceStroke}"></polygon>
          <polygon points="146,48 185,26 185,96 146,118" fill="#98d27f" fill-opacity="${fillOpacity}" stroke="#2f7a44" stroke-width="${faceStroke}"></polygon>
          <polygon points="70,48 146,48 146,118 70,118" fill="#d8f2c8" fill-opacity="${fillOpacity}" stroke="#2f7a44" stroke-width="${faceStroke}"></polygon>
          <line x1="109" y1="96" x2="185" y2="96" stroke="#2f7a44" stroke-width="2" ${hidden}></line>
          <line x1="109" y1="26" x2="109" y2="96" stroke="#2f7a44" stroke-width="2" ${hidden}></line>
        </g>
        <text x="128" y="140" text-anchor="middle" class="kd-svg-label">${wire ? "Kantenmodell: Wuerfel" : "Wuerfel"}</text>
      </svg>
    `;
  }

  if (kind === "cuboid") {
    return `
      <svg viewBox="0 0 260 150" aria-hidden="true">
        ${defs}
        <g filter="url(#kdShapeShadow)">
          <polygon points="48,56 166,56 208,34 90,34" fill="url(#kdBlueFace)" fill-opacity="${fillOpacity}" stroke="#2f5d95" stroke-width="${faceStroke}"></polygon>
          <polygon points="48,56 90,34 90,96 48,118" fill="#c8e1ff" fill-opacity="${fillOpacity}" stroke="#2f5d95" stroke-width="${faceStroke}"></polygon>
          <polygon points="166,56 208,34 208,96 166,118" fill="#9fc6f2" fill-opacity="${fillOpacity}" stroke="#2f5d95" stroke-width="${faceStroke}"></polygon>
          <polygon points="48,56 166,56 166,118 48,118" fill="#d9ebff" fill-opacity="${fillOpacity}" stroke="#2f5d95" stroke-width="${faceStroke}"></polygon>
          <line x1="90" y1="96" x2="208" y2="96" stroke="#2f5d95" stroke-width="2" ${hidden}></line>
          <line x1="90" y1="34" x2="90" y2="96" stroke="#2f5d95" stroke-width="2" ${hidden}></line>
        </g>
        <text x="128" y="140" text-anchor="middle" class="kd-svg-label">${wire ? "Kantenmodell: Quader" : "Quader"}</text>
      </svg>
    `;
  }

  if (kind === "cylinder") {
    return `
      <svg viewBox="0 0 260 150" aria-hidden="true">
        ${defs}
        <g filter="url(#kdShapeShadow)">
          <path d="M 88 42 C 88 24, 172 24, 172 42 L 172 104 C 172 122, 88 122, 88 104 Z" fill="url(#kdOrangeFace)" fill-opacity="${fillOpacity}" stroke="#b38513" stroke-width="2"></path>
          <ellipse cx="130" cy="42" rx="42" ry="15" fill="#fff0bc" fill-opacity="${fillOpacity}" stroke="#b38513" stroke-width="2"></ellipse>
          <path d="M 88 104 C 88 122, 172 122, 172 104" fill="none" stroke="#b38513" stroke-width="2"></path>
          <path d="M 88 104 C 88 88, 172 88, 172 104" fill="none" stroke="#b38513" stroke-width="2" stroke-dasharray="6 5"></path>
        </g>
        <text x="130" y="140" text-anchor="middle" class="kd-svg-label">Zylinder</text>
      </svg>
    `;
  }

  if (kind === "sphere") {
    return `
      <svg viewBox="0 0 260 150" aria-hidden="true">
        ${defs}
        <g filter="url(#kdShapeShadow)">
          <circle cx="130" cy="74" r="48" fill="${wire ? "#ffffff" : "url(#kdSphereFace)"}" stroke="#a32d2d" stroke-width="2"></circle>
          <ellipse cx="130" cy="74" rx="48" ry="15" fill="none" stroke="#a32d2d" stroke-width="2" stroke-dasharray="6 5"></ellipse>
          <ellipse cx="130" cy="74" rx="15" ry="48" fill="none" stroke="#a32d2d" stroke-width="1.8" stroke-dasharray="6 5"></ellipse>
        </g>
        <text x="130" y="140" text-anchor="middle" class="kd-svg-label">Kugel</text>
      </svg>
    `;
  }

  if (kind === "pyramid") {
    return `
      <svg viewBox="0 0 260 150" aria-hidden="true">
        ${defs}
        <g filter="url(#kdShapeShadow)">
          <polygon points="64,104 158,104 206,80 112,80" fill="#ffe5bf" fill-opacity="${fillOpacity}" stroke="#b56a14" stroke-width="2"></polygon>
          <polygon points="132,24 64,104 158,104" fill="#ffd397" fill-opacity="${fillOpacity}" stroke="#b56a14" stroke-width="2"></polygon>
          <polygon points="132,24 158,104 206,80" fill="#f0b564" fill-opacity="${fillOpacity}" stroke="#b56a14" stroke-width="2"></polygon>
          <line x1="132" y1="24" x2="112" y2="80" stroke="#b56a14" stroke-width="2" ${hidden}></line>
          <line x1="132" y1="24" x2="206" y2="80" stroke="#b56a14" stroke-width="2"></line>
        </g>
        <text x="130" y="140" text-anchor="middle" class="kd-svg-label">quadratische Pyramide</text>
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 260 150" aria-hidden="true">
      ${defs}
      <g filter="url(#kdShapeShadow)">
        <polygon points="58,102 136,102 178,78 100,78" fill="#e4dcff" fill-opacity="${fillOpacity}" stroke="#5b49a6" stroke-width="2"></polygon>
        <polygon points="58,102 30,68 108,68 136,102" fill="#d1c2ff" fill-opacity="${fillOpacity}" stroke="#5b49a6" stroke-width="2"></polygon>
        <polygon points="100,78 178,78 150,44 72,44" fill="#c2adff" fill-opacity="${fillOpacity}" stroke="#5b49a6" stroke-width="2"></polygon>
        <polygon points="30,68 72,44 150,44 108,68" fill="#eee8ff" fill-opacity="${fillOpacity}" stroke="#5b49a6" stroke-width="2"></polygon>
        <polygon points="136,102 178,78 150,44 108,68" fill="#b89dff" fill-opacity="${fillOpacity}" stroke="#5b49a6" stroke-width="2"></polygon>
      </g>
      <text x="130" y="140" text-anchor="middle" class="kd-svg-label">Dreiecksprisma</text>
    </svg>
  `;
}

function netSvg(cells) {
  const size = 34;
  const normalized = normalizeCells(cells);
  const maxX = Math.max(...normalized.map(([x]) => x));
  const maxY = Math.max(...normalized.map(([, y]) => y));
  const width = (maxX + 1) * size + 34;
  const height = (maxY + 1) * size + 42;
  const palette = ["#f7f2ff", "#e9f5ff", "#fef0d6", "#e8f7ee", "#fff0f0", "#eef2ff"];

  const rects = normalized
    .map(([x, y], index) => {
      const rx = 17 + x * size;
      const ry = 13 + y * size;
      return `
        <rect x="${rx}" y="${ry}" width="${size}" height="${size}" rx="3" fill="${palette[index % palette.length]}" stroke="#5b49a6" stroke-width="2"></rect>
        <text x="${rx + size / 2}" y="${ry + size / 2 + 5}" text-anchor="middle" class="kd-svg-label">${index + 1}</text>
      `;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${width} ${height}" aria-hidden="true">
      <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="10" fill="#ffffff" stroke="#d7ddea"></rect>
      ${rects}
      <text x="${width / 2}" y="${height - 9}" text-anchor="middle" class="kd-svg-hint">Netz aus ${normalized.length} Flaechen</text>
    </svg>
  `;
}

function schraegSvg(variant) {
  const defs = `
    <defs>
      <linearGradient id="kdSketchFace" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#f5fbff"></stop>
        <stop offset="100%" stop-color="#dceeff"></stop>
      </linearGradient>
    </defs>
  `;
  if (variant === 2) {
    return `
      <svg viewBox="0 0 260 150" aria-hidden="true">
        ${defs}
        <polygon points="60,50 150,50 190,28 100,28" fill="#eef6ff" stroke="#2c4f78" stroke-width="2"></polygon>
        <polygon points="150,50 190,28 190,92 150,114" fill="#d7eaff" stroke="#2c4f78" stroke-width="2"></polygon>
        <rect x="60" y="50" width="90" height="64" fill="url(#kdSketchFace)" stroke="#2c4f78" stroke-width="2"></rect>
        <line x1="60" y1="114" x2="100" y2="92" stroke="#2c4f78" stroke-dasharray="6 5" stroke-width="2.4"></line>
        <line x1="100" y1="28" x2="100" y2="92" stroke="#2c4f78" stroke-dasharray="6 5" stroke-width="2"></line>
        <line x1="100" y1="92" x2="190" y2="92" stroke="#2c4f78" stroke-dasharray="6 5" stroke-width="2"></line>
        <text x="130" y="138" text-anchor="middle" class="kd-svg-hint">verdeckte Kanten werden gestrichelt</text>
      </svg>
    `;
  }

  if (variant === 3) {
    return `
      <svg viewBox="0 0 260 150" aria-hidden="true">
        ${defs}
        <rect x="58" y="52" width="90" height="62" fill="url(#kdSketchFace)" stroke="#2c4f78" stroke-width="2.4"></rect>
        <line x1="148" y1="52" x2="190" y2="30" stroke="#2c4f78" stroke-width="2.4"></line>
        <line x1="148" y1="114" x2="190" y2="92" stroke="#2c4f78" stroke-width="2.4"></line>
        <line x1="190" y1="30" x2="190" y2="92" stroke="#2c4f78" stroke-width="2.4"></line>
        <circle cx="100" cy="30" r="5" fill="#d85f16"></circle>
        <circle cx="58" cy="52" r="5" fill="#d85f16"></circle>
        <text x="130" y="138" text-anchor="middle" class="kd-svg-hint">Welche Kanten fehlen noch?</text>
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 260 150" aria-hidden="true">
      ${defs}
      <polygon points="58,52 148,52 190,30 100,30" fill="#eef6ff" stroke="#2c4f78" stroke-width="2.4"></polygon>
      <polygon points="148,52 190,30 190,92 148,114" fill="#d7eaff" stroke="#2c4f78" stroke-width="2.4"></polygon>
      <rect x="58" y="52" width="90" height="62" fill="url(#kdSketchFace)" stroke="#2c4f78" stroke-width="2.4"></rect>
      <line x1="58" y1="52" x2="100" y2="30" stroke="#d85f16" stroke-width="3"></line>
      <line x1="148" y1="52" x2="190" y2="30" stroke="#d85f16" stroke-width="3"></line>
      <line x1="148" y1="114" x2="190" y2="92" stroke="#d85f16" stroke-width="3"></line>
      <text x="130" y="138" text-anchor="middle" class="kd-svg-hint">Tiefenkanten laufen parallel schraeg nach hinten</text>
    </svg>
  `;
}

function robotSvg() {
  const circles = robotSteps
    .map((step, index) => {
      const x = 36 + index * 62;
      return `
        <rect x="${x - 22}" y="13" width="44" height="36" rx="9" fill="#e8f7ee" stroke="#2c7a45" stroke-width="2"></rect>
        <text x="${x}" y="36" text-anchor="middle" class="kd-svg-label">${index + 1}</text>
        <text x="${x}" y="68" text-anchor="middle" class="kd-svg-hint">${step.split(" ")[0]}</text>
      `;
    })
    .join("");

  return `
    <svg viewBox="0 0 280 88" aria-hidden="true">
      ${circles}
      <line x1="58" y1="31" x2="76" y2="31" stroke="#2c7a45" stroke-width="2"></line>
      <line x1="120" y1="31" x2="138" y2="31" stroke="#2c7a45" stroke-width="2"></line>
      <line x1="182" y1="31" x2="200" y2="31" stroke="#2c7a45" stroke-width="2"></line>
    </svg>
  `;
}

function createTaskVisual(task) {
  if (!task.visual) {
    return null;
  }
  const wrap = document.createElement("div");
  wrap.className = "kd-task-visual";

  if (task.visual.kind === "body") {
    wrap.innerHTML = bodySvg(task.visual.body, task.visual.wire);
    return wrap;
  }
  if (task.visual.kind === "net") {
    wrap.innerHTML = netSvg(task.visual.cells);
    return wrap;
  }
  if (task.visual.kind === "schraeg") {
    wrap.innerHTML = schraegSvg(task.visual.variant);
    return wrap;
  }
  if (task.visual.kind === "robot") {
    wrap.innerHTML = robotSvg();
    return wrap;
  }
  return null;
}

function createTaskRow(task, index) {
  const row = document.createElement("article");
  row.className = "kd-task-row";

  const prompt = document.createElement("p");
  prompt.innerHTML = `<strong>${index + 1}. [${typeLabels[task.type]}] ${task.prompt}</strong>`;

  const answerLine = document.createElement("div");
  answerLine.className = "kd-answer-line";

  if (task.kind === "numeric") {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "kd-input";
    input.placeholder = "Antwort";
    input.name = `task-${index}`;
    answerLine.append(input);
  } else {
    const select = document.createElement("select");
    select.className = "kd-choice";
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
  kdTaskList.replaceChildren();
  generatedTasks.forEach((task, index) => {
    kdTaskList.append(createTaskRow(task, index));
  });
}

function clearRows() {
  kdTaskList.querySelectorAll(".kd-task-row").forEach((row) => {
    row.classList.remove("is-correct", "is-wrong");
    const feedback = row.querySelector(".task-feedback");
    if (feedback instanceof HTMLDivElement) {
      feedback.innerHTML = "";
    }
  });
}

function resetInputs() {
  kdTaskList.querySelectorAll(".kd-task-row").forEach((row) => {
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
  kdTaskFeedback.innerHTML = '<p class="feedback info">Eingaben geleert.</p>';
}

function checkTaskSet() {
  if (generatedTasks.length === 0) {
    kdTaskFeedback.innerHTML = '<p class="feedback info">Erstelle zuerst eine Aufgabenrunde.</p>';
    return;
  }

  clearRows();

  const rows = kdTaskList.querySelectorAll(".kd-task-row");
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
    kdTaskFeedback.innerHTML = '<p class="feedback info">Bitte alle Aufgaben beantworten.</p>';
    return;
  }

  kdTaskFeedback.innerHTML = `
    <p class="feedback ${correct === generatedTasks.length ? "ok" : "bad"}">
      ${correct} / ${generatedTasks.length} richtig.
      ${correct === generatedTasks.length ? "Sehr gut." : "Nutze die Rueckmeldungen und starte eine neue Runde."}
    </p>
  `;
}

function createStationButtons() {
  kdStationButtons.replaceChildren();
  stationData.forEach((station, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "kd-station-btn";
    button.textContent = station.label;
    button.dataset.stationId = station.id;
    if (index === 0) {
      button.classList.add("is-active");
    }
    kdStationButtons.append(button);
  });
}

function renderStation(stationId) {
  const station = stationData.find((entry) => entry.id === stationId) || stationData[0];
  kdStationImage.src = station.image;
  kdStationKicker.textContent = station.kicker;
  kdStationTitle.textContent = station.title;
  kdStationText.textContent = station.text;
  kdStationFact.textContent = station.fact;
  kdStationButtons.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.stationId === station.id);
  });
}

function setupStations() {
  createStationButtons();
  renderStation(stationData[0].id);
  kdStationButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }
    renderStation(button.dataset.stationId);
  });
}

function setupTabs() {
  kdTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      kdTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      kdTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${target}`).classList.add("is-active");
    });
  });
}

function numericOptions(expected) {
  const base = Number(expected.toFixed(6));
  const candidates = new Set();
  const step = Math.max(1, Math.abs(base) * 0.25);
  candidates.add(base);
  candidates.add(Math.max(0, Number((base + step).toFixed(6))));
  candidates.add(Math.max(0, Number((base - step).toFixed(6))));
  candidates.add(Math.max(0, Number((base + 2).toFixed(6))));
  candidates.add(Math.max(0, Number((base - 2).toFixed(6))));

  const options = [...candidates].map((value) => `${formatNumber(value)}`);
  const correctLabel = `${formatNumber(base)}`;

  while (options.length < 4) {
    const rnd = formatNumber(Math.max(0, base + randomInt(-4, 4)));
    if (!options.includes(rnd)) {
      options.push(rnd);
    }
  }

  const limited = shuffle(options).slice(0, 4);
  if (!limited.includes(correctLabel)) {
    limited[0] = correctLabel;
  }
  return { options: shuffle(limited), correctLabel };
}

function toQuizQuestion(task) {
  if (task.kind === "choice") {
    const labels = task.options.map((option) => option.label);
    const correctLabel = task.options.find((option) => option.value === task.expected)?.label || "";
    return {
      prompt: task.prompt,
      options: shuffle(labels),
      correctLabel,
      explanation: task.explanation,
      visual: task.visual,
    };
  }

  const optionData = numericOptions(task.expected);
  return {
    prompt: task.prompt,
    options: optionData.options,
    correctLabel: optionData.correctLabel,
    explanation: task.explanation,
    visual: task.visual,
  };
}

function createQuizSet(count = 12) {
  const typePool = ["body", "parts", "wire", "netcheck", "netbody", "schraeg", "robot"];
  const difficultyPool = ["basis", "standard", "profi"];
  const questions = [];
  for (let i = 0; i < count; i += 1) {
    const type = typePool[i % typePool.length];
    const task = createTask(type, choice(difficultyPool));
    questions.push(toQuizQuestion(task));
  }
  return shuffle(questions);
}

function updateQuizScore() {
  kdQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  kdQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  kdQuizPrompt.textContent = question.prompt;
  if (kdQuizVisual instanceof HTMLDivElement) {
    kdQuizVisual.innerHTML = "";
    const visualTask = { visual: question.visual };
    const visual = createTaskVisual(visualTask);
    if (visual instanceof HTMLDivElement) {
      kdQuizVisual.append(visual);
    }
  }
  kdQuizFeedback.innerHTML = "";
  kdQuizNext.disabled = true;
  kdQuizOptions.innerHTML = question.options
    .map(
      (option, index) => `
      <button class="choice-btn" type="button" data-option="${index}">
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
  kdQuizStart.textContent = "Check neu starten";
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
  kdQuizOptions.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  kdQuizFeedback.innerHTML = `
    <p class="feedback ${isCorrect ? "ok" : "bad"}">
      ${isCorrect
        ? `Richtig. ${question.explanation}`
        : `Nicht korrekt. Richtige Antwort: "${question.correctLabel}". ${question.explanation}`}
    </p>
  `;

  kdQuizNext.disabled = false;
  kdQuizNext.textContent =
    quizState.index === quizState.questions.length - 1 ? "Ergebnis anzeigen" : "Naechste Frage";
}

function finishQuiz() {
  quizState.running = false;
  kdQuizStatus.textContent = "Abschluss-Check beendet.";
  kdQuizPrompt.textContent = "Du kannst den Check neu starten.";
  if (kdQuizVisual instanceof HTMLDivElement) {
    kdQuizVisual.innerHTML = "";
  }
  kdQuizOptions.innerHTML = "";
  kdQuizFeedback.innerHTML =
    '<p class="feedback info">Starte neu, um mit neuen Koerper-/Netzkonstellationen weiter zu trainieren.</p>';
  kdQuizNext.disabled = true;
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
  kdQuizStart.addEventListener("click", startQuiz);
  kdQuizNext.addEventListener("click", nextQuizStep);
  kdQuizOptions.addEventListener("click", (event) => {
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
  kdGenerate.addEventListener("click", buildTaskSet);
  kdCheck.addEventListener("click", checkTaskSet);
  kdReset.addEventListener("click", resetInputs);
}

setupTabs();
setupStations();
setupGenerator();
setupQuiz();
