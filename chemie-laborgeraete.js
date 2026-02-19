const svgLibrary = {
  becherglas: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M60 20h100v108a10 10 0 0 1-10 10H70a10 10 0 0 1-10-10z" class="line"/>
      <path d="M70 86h80" class="liquid"/>
      <path d="M70 86c8 6 72 6 80 0" class="meniscus"/>
      <path d="M78 40h18M78 52h18M78 64h18M78 76h18" class="mark"/>
    </svg>
  `,
  erlenmeyer: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M94 20h32v26l37 84a8 8 0 0 1-8 10H65a8 8 0 0 1-8-10l37-84z" class="line"/>
      <path d="M78 92h64" class="liquid"/>
      <path d="M78 92c10 8 54 8 64 0" class="meniscus"/>
    </svg>
  `,
  messzylinder: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M86 20h48v108H86z" class="line"/>
      <path d="M78 130h64v10H78z" class="line"/>
      <path d="M92 70h36" class="liquid"/>
      <path d="M92 70c4 4 32 4 36 0" class="meniscus"/>
      <path d="M92 34h10M92 44h10M92 54h10M92 64h10M92 74h10M92 84h10M92 94h10" class="mark"/>
    </svg>
  `,
  bunsenbrenner: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <rect x="88" y="34" width="44" height="74" class="line"/>
      <rect x="74" y="108" width="72" height="18" class="line"/>
      <path d="M110 24c12 12 12 28 0 40-12-12-12-28 0-40z" class="flame-outer"/>
      <path d="M110 36c7 7 7 15 0 23-7-8-7-16 0-23z" class="flame-inner"/>
      <circle cx="92" cy="74" r="4" class="line"/>
    </svg>
  `,
  dreifuss: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <ellipse cx="110" cy="48" rx="40" ry="14" class="line"/>
      <path d="M78 58 62 132M110 62 110 132M142 58 158 132" class="line"/>
    </svg>
  `,
  keramikdrahtnetz: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <rect x="62" y="42" width="96" height="76" class="line"/>
      <path d="M80 42v76M98 42v76M116 42v76M134 42v76M152 42v76" class="mark"/>
      <path d="M62 56h96M62 70h96M62 84h96M62 98h96M62 112h96" class="mark"/>
      <circle cx="110" cy="80" r="18" class="line"/>
    </svg>
  `,
  abdampfschale: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M62 74c6 32 90 32 96 0" class="line"/>
      <path d="M62 74c16 10 80 10 96 0" class="line"/>
      <path d="M78 94h64" class="liquid"/>
      <path d="M90 40c5 7-1 12-1 18M110 36c5 8-1 13-1 20M130 40c5 7-1 12-1 18" class="steam"/>
    </svg>
  `,
  tiegel: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M78 62h64l-8 52H86z" class="line"/>
      <ellipse cx="110" cy="56" rx="38" ry="10" class="line"/>
      <ellipse cx="110" cy="46" rx="34" ry="9" class="line"/>
      <circle cx="110" cy="46" r="4" class="line"/>
    </svg>
  `,
  trichter: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M62 34h96l-42 54v36h-12V88z" class="line"/>
    </svg>
  `,
  filterpapier: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M62 34h96l-42 54v36h-12V88z" class="line"/>
      <path d="M74 44h72l-31 40v26h-10V84z" class="paper"/>
      <path d="M104 110h12v10h-12z" class="drop"/>
    </svg>
  `,
  scheidetrichter: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M98 20h24v16c0 6 16 18 16 34 0 20-12 36-28 44v18h-8v-18c-16-8-28-24-28-44 0-16 16-28 16-34z" class="line"/>
      <path d="M86 80h48" class="liquid"/>
      <rect x="102" y="116" width="16" height="8" class="line"/>
      <rect x="108" y="124" width="4" height="14" class="line"/>
    </svg>
  `,
  woulffsche: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M72 46h76v72H72z" class="line"/>
      <path d="M84 24v22M110 20v26M136 24v22" class="line"/>
      <path d="M84 82h52" class="liquid"/>
    </svg>
  `,
  exikkator: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M64 82c8 42 84 42 92 0" class="line"/>
      <path d="M64 82h92" class="line"/>
      <path d="M78 82h64" class="mark"/>
      <path d="M74 58c6-28 66-28 72 0" class="line"/>
      <circle cx="110" cy="52" r="4" class="line"/>
    </svg>
  `,
  saugflasche: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M92 22h36v24l26 56a10 10 0 0 1-10 16H76a10 10 0 0 1-10-16l26-56z" class="line"/>
      <path d="M128 58h28" class="line"/>
      <path d="M78 90h64" class="liquid"/>
    </svg>
  `,
};

const deviceCatalog = [
  {
    id: "becherglas",
    name: "Becherglas",
    category: "volumetrie",
    precision: "niedrig",
    functionText: "Mischen und Erhitzen, Volumen nur grob abschaetzen.",
    useShort: "Grobe Volumenabschaetzung und Mischen von Loesungen.",
  },
  {
    id: "erlenmeyer",
    name: "Erlenmeyerkolben",
    category: "volumetrie",
    precision: "niedrig bis mittel",
    functionText: "Schwenken ohne starkes Spritzen, Reaktionen und Loesungen.",
    useShort: "Reaktionsgefaess zum sicheren Schwenken von Fluessigkeiten.",
  },
  {
    id: "messzylinder",
    name: "Messzylinder",
    category: "volumetrie",
    precision: "mittel bis hoch",
    functionText: "Praezises Abmessen von Fluessigkeitsvolumina.",
    useShort: "Moeglichst genaues Messen von Fluessigkeitsvolumen.",
  },
  {
    id: "bunsenbrenner",
    name: "Bunsenbrenner",
    category: "erhitzen",
    precision: "nicht zutreffend",
    functionText: "Gezielte Erhitzung im Labor mit regelbarer Flamme.",
    useShort: "Erhitzen von Stoffen mit regelbarer Flamme.",
  },
  {
    id: "dreifuss",
    name: "Dreifuss",
    category: "erhitzen",
    precision: "nicht zutreffend",
    functionText: "Stabiler Stand ueber dem Brenner fuer Gefaesse.",
    useShort: "Tragt Gefaesse stabil ueber einem Brenner.",
  },
  {
    id: "keramikdrahtnetz",
    name: "Keramikdrahtnetz",
    category: "erhitzen",
    precision: "nicht zutreffend",
    functionText: "Verteilt Hitze gleichmaessiger und schuetzt Glasgefaesse.",
    useShort: "Verteilt die Hitze zwischen Flamme und Gefaess.",
  },
  {
    id: "abdampfschale",
    name: "Abdampfschale",
    category: "erhitzen",
    precision: "nicht zutreffend",
    functionText: "Eindampfen von Loesungen zum Entfernen von Loesungsmittel.",
    useShort: "Loesungen eindampfen, um Stoffe zu konzentrieren.",
  },
  {
    id: "tiegel",
    name: "Tiegel",
    category: "erhitzen",
    precision: "nicht zutreffend",
    functionText: "Sehr starkes Erhitzen kleiner Feststoffmengen.",
    useShort: "Kleine Feststoffproben stark erhitzen.",
  },
  {
    id: "trichter",
    name: "Trichter",
    category: "trennverfahren",
    precision: "nicht zutreffend",
    functionText: "Sauberes Umfuellen und als Basis fuer Filtration.",
    useShort: "Fluessigkeiten sicher umfuellen oder filtrieren.",
  },
  {
    id: "filterpapier",
    name: "Filterpapier",
    category: "trennverfahren",
    precision: "nicht zutreffend",
    functionText: "Haltet Feststoffe beim Filtrieren zurueck.",
    useShort: "Trennt Feststoff von Fluessigkeit durch Filtration.",
  },
  {
    id: "scheidetrichter",
    name: "Scheidetrichter",
    category: "trennverfahren",
    precision: "nicht zutreffend",
    functionText: "Trennt zwei nicht mischbare Fluessigkeiten nach Dichte.",
    useShort: "Trennt zwei nicht mischbare Fluessigkeiten.",
  },
  {
    id: "woulffsche",
    name: "Woulffsche Flasche",
    category: "spezialgeraete",
    precision: "nicht zutreffend",
    functionText: "Waschflasche fuer Gase, oft zum Reinigen oder Trocknen.",
    useShort: "Leitet Gase durch Fluessigkeiten zur Reinigung/Trocknung.",
  },
  {
    id: "exikkator",
    name: "Exikkator",
    category: "spezialgeraete",
    precision: "nicht zutreffend",
    functionText: "Lagert Stoffe trocken, schuetzt vor Luftfeuchtigkeit.",
    useShort: "Trockene Lagerung und Nachtrocknen empfindlicher Stoffe.",
  },
  {
    id: "saugflasche",
    name: "Saugflasche",
    category: "spezialgeraete",
    precision: "nicht zutreffend",
    functionText: "Vakuumfiltration mit Seitenstutzen und Unterdruck.",
    useShort: "Schnelle Filtration unter Unterdruck.",
  },
];

const categoryMeta = [
  {
    id: "volumetrie",
    title: "Volumetrie",
    intro: "Becherglas, Erlenmeyerkolben und Messzylinder im Praezisionsvergleich.",
  },
  {
    id: "erhitzen",
    title: "Erhitzen",
    intro: "Korrektes Erhitzen mit Bunsenbrenner, Dreifuss, Netz, Schale und Tiegel.",
  },
  {
    id: "trennverfahren",
    title: "Trennverfahren",
    intro: "Trichter, Filterpapier und Scheidetrichter fuer Trennung und Aufreinigung.",
  },
  {
    id: "spezialgeraete",
    title: "Spezialgeraete",
    intro: "Woulffsche Flasche, Exikkator und Saugflasche fuer spezielle Aufgaben.",
  },
];

const deviceSections = document.getElementById("deviceSections");
const tabButtons = document.querySelectorAll(".lab-tab-btn");
const tabPanels = document.querySelectorAll(".lab-tab");

const labQuizCount = document.getElementById("labQuizCount");
const labQuizStart = document.getElementById("labQuizStart");
const labQuizNext = document.getElementById("labQuizNext");
const labQuizScore = document.getElementById("labQuizScore");
const labQuizStatus = document.getElementById("labQuizStatus");
const labQuizPrompt = document.getElementById("labQuizPrompt");
const labQuizVisual = document.getElementById("labQuizVisual");
const labQuizAnswers = document.getElementById("labQuizAnswers");
const labQuizFeedback = document.getElementById("labQuizFeedback");

const protocolList = document.getElementById("protocolList");
const protocolCheck = document.getElementById("protocolCheck");
const protocolShuffle = document.getElementById("protocolShuffle");
const protocolFeedback = document.getElementById("protocolFeedback");

const safeStart = document.getElementById("safeStart");
const safeNext = document.getElementById("safeNext");
const safeScore = document.getElementById("safeScore");
const safeStatus = document.getElementById("safeStatus");
const safePrompt = document.getElementById("safePrompt");
const safeAnswers = document.getElementById("safeAnswers");
const safeFeedback = document.getElementById("safeFeedback");

const deviceModal = document.getElementById("deviceModal");
const deviceModalClose = document.getElementById("deviceModalClose");
const deviceModalSvg = document.getElementById("deviceModalSvg");
const deviceModalCaption = document.getElementById("deviceModalCaption");

const protocolTargetOrder = ["Hypothese", "Durchfuehrung", "Beobachtung", "Deutung"];
let protocolState = [];

const labQuizState = {
  running: false,
  questions: [],
  index: 0,
  correct: 0,
  answered: false,
};

const safetyQuestions = [
  {
    prompt: "Was bedeutet GHS02 (Flamme)?",
    options: ["Entzuendbar", "Aetzend", "Umweltgefaehrlich", "Giftig"],
    correct: 0,
    explanation: "GHS02 weist auf entzuendbare Stoffe hin.",
  },
  {
    prompt: "Welche Schutzmassnahme ist bei langen Haaren korrekt?",
    options: ["Offen tragen", "Nur Muetze tragen", "Zusammenbinden", "Egal, solange Handschuhe da sind"],
    correct: 2,
    explanation: "Lange Haare immer zusammenbinden, damit sie nicht in Flamme/Chemikalien geraten.",
  },
  {
    prompt: "Wofuer steht GHS05?",
    options: ["Leicht entzuendlich", "Aetzwirkung", "Explosiv", "Gas unter Druck"],
    correct: 1,
    explanation: "GHS05 steht fuer aetzende Stoffe.",
  },
  {
    prompt: "Was ist bei unbekanntem Geruch im Labor richtig?",
    options: ["Direkt tief einatmen", "Vorsichtig anwedeln", "Nase ins Gefaess halten", "Mitschueler riechen lassen"],
    correct: 1,
    explanation: "Nur vorsichtig anwedeln, nie direkt einatmen.",
  },
  {
    prompt: "Welche Aussage passt zu GHS07?",
    options: ["Harmlos fuer Haut und Augen", "Reizend/gesundheitsschaedlich", "Nur fuer Metalle gefaehrlich", "Nur in der Natur gefaehrlich"],
    correct: 1,
    explanation: "GHS07 warnt vor reizenden/gesundheitsschaedlichen Wirkungen.",
  },
  {
    prompt: "Was machst du bei einem Unfall im Labor?",
    options: ["Nichts sagen", "Sofort melden", "Erst aufraeumen", "Fenster auf und weiterarbeiten"],
    correct: 1,
    explanation: "Unfaelle sofort der Lehrkraft melden.",
  },
  {
    prompt: "Welche Kombination ist richtig?",
    options: [
      "Schutzbrille + ruhiges Arbeiten",
      "Keine Brille + schnelle Bewegungen",
      "Essen + Trinken am Platz",
      "Chemikalien probieren",
    ],
    correct: 0,
    explanation: "Schutzbrille und ruhiges Arbeiten sind Grundregeln.",
  },
  {
    prompt: "Wozu dienen Handschuhe bei aetzenden Stoffen?",
    options: ["Nur gegen Kaelte", "Nur fuer bessere Griffigkeit", "Zum Schutz der Haut", "Nicht notwendig"],
    correct: 2,
    explanation: "Handschuhe schuetzen vor Hautkontakt mit gefaehrlichen Stoffen.",
  },
];

const safetyState = {
  running: false,
  questions: [],
  index: 0,
  correct: 0,
  answered: false,
};

function shuffle(items) {
  const clone = [...items];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function pickMany(items, count) {
  return shuffle(items).slice(0, count);
}

function getDeviceById(id) {
  return deviceCatalog.find((device) => device.id === id);
}

function renderLearningSection() {
  const sectionsMarkup = categoryMeta
    .map((category) => {
      const devices = deviceCatalog.filter((device) => device.category === category.id);
      const cards = devices
        .map(
          (device) => `
            <article class="device-card">
              <button class="device-zoom-btn" type="button" data-device-id="${device.id}">
                <div class="device-svg">${svgLibrary[device.id]}</div>
              </button>
              <h4>${device.name}</h4>
              <p><strong>Funktion:</strong> ${device.functionText}</p>
              <p><strong>Praezision:</strong> ${device.precision}</p>
            </article>
          `
        )
        .join("");

      return `
        <section class="device-section">
          <h3>${category.title}</h3>
          <p class="device-intro">${category.intro}</p>
          <div class="device-grid">${cards}</div>
        </section>
      `;
    })
    .join("");

  deviceSections.innerHTML = sectionsMarkup;
}

function setupTabs() {
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.dataset.tab;
      tabButtons.forEach((btn) => btn.classList.remove("is-active"));
      tabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${tabId}`).classList.add("is-active");
    });
  });
}

function openDeviceModal(deviceId) {
  const device = getDeviceById(deviceId);
  if (!device) {
    return;
  }
  deviceModalSvg.innerHTML = svgLibrary[device.id];
  deviceModalCaption.textContent = `${device.name}: ${device.functionText}`;
  deviceModal.classList.add("is-open");
  deviceModal.setAttribute("aria-hidden", "false");
}

function closeDeviceModal() {
  deviceModal.classList.remove("is-open");
  deviceModal.setAttribute("aria-hidden", "true");
  deviceModalSvg.innerHTML = "";
  deviceModalCaption.textContent = "";
}

function setupDeviceModal() {
  deviceSections.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const button = target.closest(".device-zoom-btn");
    if (!(button instanceof HTMLElement)) {
      return;
    }
    openDeviceModal(button.dataset.deviceId);
  });

  deviceModalClose.addEventListener("click", closeDeviceModal);
  deviceModal.addEventListener("click", (event) => {
    if (event.target === deviceModal) {
      closeDeviceModal();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && deviceModal.classList.contains("is-open")) {
      closeDeviceModal();
    }
  });
}

function randomWrongDevices(correctId, count = 3) {
  return pickMany(
    deviceCatalog.filter((device) => device.id !== correctId),
    count
  );
}

function buildNameToUseQuestion(device) {
  const wrongOptions = randomWrongDevices(device.id).map((item) => item.useShort);
  const options = shuffle([device.useShort, ...wrongOptions]);
  return {
    prompt: `Wofuer wird ${device.name} hauptsaechlich verwendet?`,
    options,
    correct: options.indexOf(device.useShort),
    explanation: `${device.name}: ${device.useShort}`,
  };
}

function buildUseToNameQuestion(device) {
  const wrongOptions = randomWrongDevices(device.id).map((item) => item.name);
  const options = shuffle([device.name, ...wrongOptions]);
  return {
    prompt: `Welches Geraet passt zu dieser Beschreibung? ${device.useShort}`,
    options,
    correct: options.indexOf(device.name),
    explanation: `Richtig ist ${device.name}.`,
  };
}

function buildImageToNameQuestion(device) {
  const wrongOptions = randomWrongDevices(device.id).map((item) => item.name);
  const options = shuffle([device.name, ...wrongOptions]);
  return {
    prompt: "Wie heisst das gezeigte Geraet?",
    options,
    correct: options.indexOf(device.name),
    explanation: `Das Bild zeigt ${device.name}.`,
    image: svgLibrary[device.id],
  };
}

function buildLabQuizQuestions(totalCount) {
  const modes = ["nameToUse", "useToName", "imageToName"];
  const questions = [];
  for (let i = 0; i < totalCount; i += 1) {
    const mode = modes[i % modes.length];
    const device = deviceCatalog[Math.floor(Math.random() * deviceCatalog.length)];
    if (mode === "nameToUse") {
      questions.push(buildNameToUseQuestion(device));
    } else if (mode === "useToName") {
      questions.push(buildUseToNameQuestion(device));
    } else {
      questions.push(buildImageToNameQuestion(device));
    }
  }
  return shuffle(questions);
}

function updateLabQuizScore() {
  labQuizScore.textContent = `Punkte: ${labQuizState.correct} / ${labQuizState.questions.length}`;
}

function renderLabQuizQuestion() {
  const question = labQuizState.questions[labQuizState.index];
  labQuizState.answered = false;
  labQuizStatus.textContent = `Frage ${labQuizState.index + 1} von ${labQuizState.questions.length}`;
  labQuizPrompt.textContent = question.prompt;
  labQuizVisual.innerHTML = question.image ? `<div class="quiz-svg">${question.image}</div>` : "";
  labQuizFeedback.innerHTML = "";
  labQuizNext.disabled = true;
  labQuizNext.textContent =
    labQuizState.index === labQuizState.questions.length - 1 ? "Ergebnis anzeigen" : "Naechste Frage";

  labQuizAnswers.innerHTML = question.options
    .map((option, index) => `<button type="button" class="answer-btn" data-index="${index}">${option}</button>`)
    .join("");
}

function finishLabQuiz() {
  labQuizState.running = false;
  labQuizNext.disabled = true;
  const percent = Math.round((labQuizState.correct / labQuizState.questions.length) * 100);
  labQuizStatus.textContent = "Quiz beendet";
  labQuizPrompt.textContent = `Ergebnis: ${labQuizState.correct}/${labQuizState.questions.length} (${percent}%)`;
  labQuizAnswers.innerHTML = "";
  labQuizVisual.innerHTML = "";
  labQuizFeedback.innerHTML = `<p class="feedback ${percent >= 70 ? "ok" : "bad"}">Bewertung: ${
    percent >= 90 ? "Sehr stark" : percent >= 70 ? "Gut gearbeitet" : "Weiter ueben"
  }.</p>`;
  labQuizStart.textContent = "Quiz erneut starten";
}

function startLabQuiz() {
  const total = Number(labQuizCount.value) || 10;
  labQuizState.running = true;
  labQuizState.questions = buildLabQuizQuestions(total);
  labQuizState.index = 0;
  labQuizState.correct = 0;
  labQuizState.answered = false;
  labQuizStart.textContent = "Quiz neu starten";
  updateLabQuizScore();
  renderLabQuizQuestion();
}

function answerLabQuiz(selectedIndex) {
  if (!labQuizState.running || labQuizState.answered) {
    return;
  }
  const question = labQuizState.questions[labQuizState.index];
  const isCorrect = Number(selectedIndex) === question.correct;
  labQuizState.answered = true;
  if (isCorrect) {
    labQuizState.correct += 1;
  }

  labQuizAnswers.querySelectorAll(".answer-btn").forEach((button, index) => {
    const optionIndex = Number(index);
    button.disabled = true;
    if (optionIndex === question.correct) {
      button.classList.add("is-correct");
    } else if (optionIndex === Number(selectedIndex)) {
      button.classList.add("is-wrong");
    }
  });

  updateLabQuizScore();
  labQuizNext.disabled = false;
  labQuizFeedback.innerHTML = `<p class="feedback ${isCorrect ? "ok" : "bad"}">${question.explanation}</p>`;
}

function nextLabQuizQuestion() {
  if (!labQuizState.running) {
    return;
  }
  if (!labQuizState.answered) {
    labQuizFeedback.innerHTML = `<p class="feedback bad">Bitte erst eine Antwort auswaehlen.</p>`;
    return;
  }
  if (labQuizState.index >= labQuizState.questions.length - 1) {
    finishLabQuiz();
    return;
  }
  labQuizState.index += 1;
  renderLabQuizQuestion();
}

function setupLabQuiz() {
  labQuizStart.addEventListener("click", startLabQuiz);
  labQuizNext.addEventListener("click", nextLabQuizQuestion);
  labQuizAnswers.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.classList.contains("answer-btn")) {
      return;
    }
    answerLabQuiz(target.dataset.index);
  });
}

function renderProtocolList() {
  protocolList.innerHTML = protocolState
    .map(
      (item, index) => `
        <div class="protocol-item" data-index="${index}">
          <p>${item}</p>
          <div class="protocol-move">
            <button type="button" class="move-btn" data-direction="up" data-index="${index}">Hoch</button>
            <button type="button" class="move-btn" data-direction="down" data-index="${index}">Runter</button>
          </div>
        </div>
      `
    )
    .join("");
}

function shuffleProtocol() {
  protocolState = shuffle([...protocolTargetOrder]);
  renderProtocolList();
  protocolFeedback.innerHTML = "";
}

function moveProtocolItem(index, direction) {
  const newIndex = direction === "up" ? index - 1 : index + 1;
  if (newIndex < 0 || newIndex >= protocolState.length) {
    return;
  }
  [protocolState[index], protocolState[newIndex]] = [protocolState[newIndex], protocolState[index]];
  renderProtocolList();
}

function checkProtocolOrder() {
  const correctPositions = protocolState.filter((item, index) => item === protocolTargetOrder[index]).length;
  if (correctPositions === protocolTargetOrder.length) {
    protocolFeedback.innerHTML = `<p class="feedback ok">Perfekt. Dein Protokoll ist korrekt geordnet.</p>`;
  } else {
    protocolFeedback.innerHTML = `<p class="feedback bad">${correctPositions}/4 Positionen sind korrekt. Ordne weiter.</p>`;
  }
}

function setupProtocolModule() {
  shuffleProtocol();
  protocolList.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.classList.contains("move-btn")) {
      return;
    }
    moveProtocolItem(Number(target.dataset.index), target.dataset.direction);
  });
  protocolCheck.addEventListener("click", checkProtocolOrder);
  protocolShuffle.addEventListener("click", shuffleProtocol);
}

function updateSafetyScore() {
  safeScore.textContent = `Punkte: ${safetyState.correct} / ${safetyState.questions.length}`;
}

function renderSafetyQuestion() {
  const question = safetyState.questions[safetyState.index];
  safetyState.answered = false;
  safeStatus.textContent = `Frage ${safetyState.index + 1} von ${safetyState.questions.length}`;
  safePrompt.textContent = question.prompt;
  safeFeedback.innerHTML = "";
  safeNext.disabled = true;
  safeNext.textContent =
    safetyState.index === safetyState.questions.length - 1 ? "Ergebnis anzeigen" : "Naechste Frage";

  safeAnswers.innerHTML = question.options
    .map((option, index) => `<button type="button" class="answer-btn" data-index="${index}">${option}</button>`)
    .join("");
}

function finishSafetyTest() {
  safetyState.running = false;
  safeNext.disabled = true;
  const percent = Math.round((safetyState.correct / safetyState.questions.length) * 100);
  safeStatus.textContent = "Sicherheitstest beendet";
  safePrompt.textContent = `Ergebnis: ${safetyState.correct}/${safetyState.questions.length} (${percent}%)`;
  safeAnswers.innerHTML = "";
  safeFeedback.innerHTML = `<p class="feedback ${percent >= 75 ? "ok" : "bad"}">${
    percent >= 75 ? "Sicherheitswissen solide." : "Bitte Sicherheitsregeln wiederholen."
  }</p>`;
  safeStart.textContent = "Sicherheitstest erneut starten";
}

function startSafetyTest() {
  safetyState.running = true;
  safetyState.questions = shuffle([...safetyQuestions]);
  safetyState.index = 0;
  safetyState.correct = 0;
  safetyState.answered = false;
  safeStart.textContent = "Sicherheitstest neu starten";
  updateSafetyScore();
  renderSafetyQuestion();
}

function answerSafetyQuestion(selectedIndex) {
  if (!safetyState.running || safetyState.answered) {
    return;
  }
  const question = safetyState.questions[safetyState.index];
  const isCorrect = Number(selectedIndex) === question.correct;
  safetyState.answered = true;
  if (isCorrect) {
    safetyState.correct += 1;
  }

  safeAnswers.querySelectorAll(".answer-btn").forEach((button, index) => {
    const optionIndex = Number(index);
    button.disabled = true;
    if (optionIndex === question.correct) {
      button.classList.add("is-correct");
    } else if (optionIndex === Number(selectedIndex)) {
      button.classList.add("is-wrong");
    }
  });

  updateSafetyScore();
  safeNext.disabled = false;
  safeFeedback.innerHTML = `<p class="feedback ${isCorrect ? "ok" : "bad"}">${question.explanation}</p>`;
}

function nextSafetyQuestion() {
  if (!safetyState.running) {
    return;
  }
  if (!safetyState.answered) {
    safeFeedback.innerHTML = `<p class="feedback bad">Bitte erst eine Antwort auswaehlen.</p>`;
    return;
  }
  if (safetyState.index >= safetyState.questions.length - 1) {
    finishSafetyTest();
    return;
  }
  safetyState.index += 1;
  renderSafetyQuestion();
}

function setupSafetyTest() {
  safeStart.addEventListener("click", startSafetyTest);
  safeNext.addEventListener("click", nextSafetyQuestion);
  safeAnswers.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.classList.contains("answer-btn")) {
      return;
    }
    answerSafetyQuestion(target.dataset.index);
  });
}

function bootstrap() {
  renderLearningSection();
  setupTabs();
  setupDeviceModal();
  setupLabQuiz();
  setupProtocolModule();
  setupSafetyTest();
}

bootstrap();
