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
  if (kind === "cube") {
    return `
      <svg viewBox="0 0 240 130" aria-hidden="true">
        <polygon points="60,45 130,45 165,25 95,25" fill="${wire ? "#ffffff" : "#d7f4c6"}" stroke="#2f7a44" stroke-width="2"></polygon>
        <polygon points="60,45 95,25 95,85 60,105" fill="${wire ? "#ffffff" : "#b6e8a0"}" stroke="#2f7a44" stroke-width="2"></polygon>
        <polygon points="130,45 165,25 165,85 130,105" fill="${wire ? "#ffffff" : "#a1de8a"}" stroke="#2f7a44" stroke-width="2"></polygon>
        <polygon points="60,45 130,45 130,105 60,105" fill="${wire ? "#ffffff" : "#c6ecb3"}" stroke="#2f7a44" stroke-width="2"></polygon>
      </svg>
    `;
  }

  if (kind === "cuboid") {
    return `
      <svg viewBox="0 0 240 130" aria-hidden="true">
        <polygon points="40,50 145,50 180,32 75,32" fill="${wire ? "#ffffff" : "#d7e9ff"}" stroke="#2f5d95" stroke-width="2"></polygon>
        <polygon points="40,50 75,32 75,88 40,106" fill="${wire ? "#ffffff" : "#c2ddff"}" stroke="#2f5d95" stroke-width="2"></polygon>
        <polygon points="145,50 180,32 180,88 145,106" fill="${wire ? "#ffffff" : "#adcfff"}" stroke="#2f5d95" stroke-width="2"></polygon>
        <polygon points="40,50 145,50 145,106 40,106" fill="${wire ? "#ffffff" : "#cfe5ff"}" stroke="#2f5d95" stroke-width="2"></polygon>
      </svg>
    `;
  }

  if (kind === "cylinder") {
    return `
      <svg viewBox="0 0 240 130" aria-hidden="true">
        <ellipse cx="110" cy="32" rx="35" ry="12" fill="#ffe8a8" stroke="#b38513" stroke-width="2"></ellipse>
        <rect x="75" y="32" width="70" height="58" fill="${wire ? "#ffffff" : "#ffe69a"}" stroke="#b38513" stroke-width="2"></rect>
        <ellipse cx="110" cy="90" rx="35" ry="12" fill="${wire ? "#ffffff" : "#ffd96e"}" stroke="#b38513" stroke-width="2"></ellipse>
      </svg>
    `;
  }

  if (kind === "sphere") {
    return `
      <svg viewBox="0 0 240 130" aria-hidden="true">
        <defs>
          <radialGradient id="ballGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#ffd9d9"></stop>
            <stop offset="100%" stop-color="#e14646"></stop>
          </radialGradient>
        </defs>
        <circle cx="110" cy="65" r="38" fill="${wire ? "#ffffff" : "url(#ballGrad)"}" stroke="#a32d2d" stroke-width="2"></circle>
      </svg>
    `;
  }

  if (kind === "pyramid") {
    return `
      <svg viewBox="0 0 240 130" aria-hidden="true">
        <polygon points="60,88 152,88 185,72 93,72" fill="${wire ? "#ffffff" : "#ffe5bf"}" stroke="#b56a14" stroke-width="2"></polygon>
        <polygon points="105,30 60,88 152,88" fill="${wire ? "#ffffff" : "#ffd49b"}" stroke="#b56a14" stroke-width="2"></polygon>
        <line x1="105" y1="30" x2="93" y2="72" stroke="#b56a14" stroke-width="2"></line>
        <line x1="105" y1="30" x2="185" y2="72" stroke="#b56a14" stroke-width="2"></line>
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 240 130" aria-hidden="true">
      <polygon points="60,88 110,88 145,70 95,70" fill="${wire ? "#ffffff" : "#e1d7ff"}" stroke="#5b49a6" stroke-width="2"></polygon>
      <polygon points="60,88 35,68 85,68 110,88" fill="${wire ? "#ffffff" : "#d1c2ff"}" stroke="#5b49a6" stroke-width="2"></polygon>
      <polygon points="95,70 145,70 120,50 70,50" fill="${wire ? "#ffffff" : "#c2adff"}" stroke="#5b49a6" stroke-width="2"></polygon>
      <polygon points="35,68 70,50 120,50 85,68" fill="${wire ? "#ffffff" : "#e8ddff"}" stroke="#5b49a6" stroke-width="2"></polygon>
      <polygon points="110,88 145,70 120,50 85,68" fill="${wire ? "#ffffff" : "#b89dff"}" stroke="#5b49a6" stroke-width="2"></polygon>
    </svg>
  `;
}

function netSvg(cells) {
  const size = 24;
  const normalized = normalizeCells(cells);
  const maxX = Math.max(...normalized.map(([x]) => x));
  const maxY = Math.max(...normalized.map(([, y]) => y));
  const width = (maxX + 1) * size + 20;
  const height = (maxY + 1) * size + 20;

  const rects = normalized
    .map(([x, y]) => {
      const rx = 10 + x * size;
      const ry = 10 + y * size;
      return `<rect x="${rx}" y="${ry}" width="${size}" height="${size}" fill="#f7f2ff" stroke="#5b49a6" stroke-width="2"></rect>`;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${width} ${height}" aria-hidden="true">
      ${rects}
    </svg>
  `;
}

function schraegSvg(variant) {
  if (variant === 2) {
    return `
      <svg viewBox="0 0 240 130" aria-hidden="true">
        <rect x="50" y="45" width="80" height="55" fill="#ffffff" stroke="#2c4f78" stroke-width="2"></rect>
        <line x1="130" y1="45" x2="170" y2="25" stroke="#2c4f78" stroke-width="2"></line>
        <line x1="130" y1="100" x2="170" y2="80" stroke="#2c4f78" stroke-width="2"></line>
        <line x1="170" y1="25" x2="170" y2="80" stroke="#2c4f78" stroke-width="2"></line>
        <line x1="50" y1="100" x2="90" y2="80" stroke="#2c4f78" stroke-dasharray="5 4" stroke-width="2"></line>
        <text x="18" y="118" class="kd-svg-hint">verdeckte Kante</text>
      </svg>
    `;
  }

  if (variant === 3) {
    return `
      <svg viewBox="0 0 240 130" aria-hidden="true">
        <rect x="48" y="44" width="84" height="56" fill="#ffffff" stroke="#2c4f78" stroke-width="2"></rect>
        <line x1="132" y1="44" x2="170" y2="24" stroke="#2c4f78" stroke-width="2"></line>
        <line x1="132" y1="100" x2="170" y2="80" stroke="#2c4f78" stroke-width="2"></line>
        <line x1="170" y1="24" x2="170" y2="80" stroke="#2c4f78" stroke-width="2"></line>
        <line x1="48" y1="44" x2="86" y2="24" stroke="#2c4f78" stroke-width="2"></line>
        <text x="16" y="118" class="kd-svg-hint">begonnenes Schraegbild</text>
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 240 130" aria-hidden="true">
      <rect x="50" y="45" width="84" height="56" fill="#ffffff" stroke="#2c4f78" stroke-width="2"></rect>
      <line x1="134" y1="45" x2="172" y2="25" stroke="#2c4f78" stroke-width="2"></line>
      <line x1="134" y1="101" x2="172" y2="81" stroke="#2c4f78" stroke-width="2"></line>
      <line x1="172" y1="25" x2="172" y2="81" stroke="#2c4f78" stroke-width="2"></line>
      <line x1="50" y1="45" x2="88" y2="25" stroke="#2c4f78" stroke-width="2"></line>
      <line x1="88" y1="25" x2="172" y2="25" stroke="#2c4f78" stroke-width="2"></line>
      <text x="18" y="118" class="kd-svg-hint">Tiefe laeuft schraeg nach hinten</text>
    </svg>
  `;
}

function robotSvg() {
  const circles = robotSteps
    .map((step, index) => {
      const x = 32 + index * 58;
      return `
        <circle cx="${x}" cy="32" r="14" fill="#e8f7ee" stroke="#2c7a45" stroke-width="2"></circle>
        <text x="${x}" y="37" text-anchor="middle" class="kd-svg-label">${index + 1}</text>
        <text x="${x}" y="62" text-anchor="middle" class="kd-svg-hint">${step.split(" ")[0]}</text>
      `;
    })
    .join("");

  return `
    <svg viewBox="0 0 250 80" aria-hidden="true">
      ${circles}
      <line x1="46" y1="32" x2="74" y2="32" stroke="#2c7a45" stroke-width="2"></line>
      <line x1="104" y1="32" x2="132" y2="32" stroke="#2c7a45" stroke-width="2"></line>
      <line x1="162" y1="32" x2="190" y2="32" stroke="#2c7a45" stroke-width="2"></line>
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
    };
  }

  const optionData = numericOptions(task.expected);
  return {
    prompt: task.prompt,
    options: optionData.options,
    correctLabel: optionData.correctLabel,
    explanation: task.explanation,
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
