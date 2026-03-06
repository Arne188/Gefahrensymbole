const gbTabButtons = document.querySelectorAll(".gb-tab-btn");
const gbTabPanels = document.querySelectorAll(".gb-tab");

const gbPartButtons = document.querySelectorAll(".gb-part-btn");
const gbPartTitle = document.getElementById("gbPartTitle");
const gbPartText = document.getElementById("gbPartText");
const gbPartList = document.getElementById("gbPartList");

const gbStepButtons = document.querySelectorAll(".gb-step-btn");
const gbStepTitle = document.getElementById("gbStepTitle");
const gbStepText = document.getElementById("gbStepText");
const gbStepList = document.getElementById("gbStepList");

const gbAirSlider = document.getElementById("gbAirSlider");
const gbGasLevel = document.getElementById("gbGasLevel");
const gbFlameSvg = document.getElementById("gbFlameSvg");
const gbFlameType = document.getElementById("gbFlameType");
const gbTempRange = document.getElementById("gbTempRange");
const gbWhyList = document.getElementById("gbWhyList");

const gbWhyCheckList = document.getElementById("gbWhyCheckList");
const gbWhyNew = document.getElementById("gbWhyNew");
const gbWhyCheck = document.getElementById("gbWhyCheck");
const gbWhyFeedback = document.getElementById("gbWhyFeedback");

const gbTrainCount = document.getElementById("gbTrainCount");
const gbTrainGenerate = document.getElementById("gbTrainGenerate");
const gbTrainCheck = document.getElementById("gbTrainCheck");
const gbTrainList = document.getElementById("gbTrainList");
const gbTrainFeedback = document.getElementById("gbTrainFeedback");

const gbQuizStart = document.getElementById("gbQuizStart");
const gbQuizNext = document.getElementById("gbQuizNext");
const gbQuizScore = document.getElementById("gbQuizScore");
const gbQuizStatus = document.getElementById("gbQuizStatus");
const gbQuizPrompt = document.getElementById("gbQuizPrompt");
const gbQuizAnswers = document.getElementById("gbQuizAnswers");
const gbQuizFeedback = document.getElementById("gbQuizFeedback");

const partDetails = {
  brennerkopf: {
    title: "Brennerkopf",
    text: "Am Brennerkopf tritt das Gas-Luft-Gemisch aus und brennt als Flamme.",
    points: [
      "Hier siehst du direkt die Flammenform.",
      "Die heißeste Stelle liegt bei der blauen Heizflamme knapp über der inneren Flammenzone.",
      "Beim Arbeiten bleibt der Kopf frei von Gegenständen.",
    ],
  },
  mischrohr: {
    title: "Mischrohr",
    text: "Im Mischrohr treffen Gas und Luft aufeinander.",
    points: [
      "Je besser die Mischung, desto vollständiger kann die Verbrennung ablaufen.",
      "Mehr Luft im Mischrohr führt meist zu einer heißeren, blauen Flamme.",
      "Verstopfungen stören die Mischung und damit die Flamme.",
    ],
  },
  luftregler: {
    title: "Luftregler",
    text: "Mit dem Luftregler öffnest oder schließt du die Luftzufuhr.",
    points: [
      "Wenig Luft: leuchtende gelbe Flamme, kühler und rußend.",
      "Mehr Luft: blaue Heizflamme, deutlich heißer.",
      "Beim Anzünden zunächst wenig Luft einstellen.",
    ],
  },
  gasregler: {
    title: "Gasregler",
    text: "Der Gasregler bestimmt, wie viel Gas zum Brenner strömt.",
    points: [
      "Mehr Gas macht die Flamme größer und kann sie heißer machen.",
      "Zu viel Gas bei wenig Luft führt leicht zu rußiger Flamme.",
      "Nach dem Experiment zuerst Gas schließen.",
    ],
  },
  fuss: {
    title: "Brennerfuß",
    text: "Der Brennerfuß sorgt für Standfestigkeit auf dem Labortisch.",
    points: [
      "Der Brenner darf nicht wackeln.",
      "Der Schlauch wird so geführt, dass niemand hängen bleibt.",
      "Stabile Aufstellung ist eine wichtige Sicherheitsregel.",
    ],
  },
};

const stepDetails = {
  vorbereiten: {
    title: "1. Vorbereiten",
    text: "Vor jedem Zünden prüfst du den Arbeitsplatz und den Brenner.",
    points: [
      "Schutzbrille aufsetzen, lange Haare zusammenbinden.",
      "Schlauch auf festen Sitz und knickfreie Lage prüfen.",
      "Luftregler zunächst eher schließen.",
      "Zündholz oder Zündgerät bereitlegen.",
    ],
  },
  zuenden: {
    title: "2. Zünden",
    text: "Sicher zünden heißt: Zündquelle zuerst, dann Gas vorsichtig öffnen.",
    points: [
      "Zündholz entzünden und an den Brennerkopf halten.",
      "Gas langsam öffnen, bis die Flamme entsteht.",
      "Ruhig bleiben und Abstand zur Flamme halten.",
      "Wenn keine Flamme entsteht: Gas schließen und neu starten.",
    ],
  },
  heizflamme: {
    title: "3. Heizflamme einstellen",
    text: "Für Heizaufgaben stellst du die Luftzufuhr passend ein.",
    points: [
      "Luftregler langsam öffnen, bis die Flamme blau wird.",
      "Gasmenge so wählen, dass die Flamme ruhig und gut sichtbar bleibt.",
      "Die blaue nichtleuchtende Flamme ist meistens die Standard-Heizflamme.",
      "Rauschende Flamme nur gezielt für sehr hohe Temperaturen verwenden.",
    ],
  },
  ausschalten: {
    title: "4. Ausschalten",
    text: "Nach dem Versuch wird der Brenner sicher außer Betrieb genommen.",
    points: [
      "Zuerst die Gaszufuhr schließen.",
      "Flamme vollständig erlöschen lassen.",
      "Brenner abkühlen lassen, nicht sofort anfassen.",
      "Arbeitsplatz kontrolliert und ordentlich hinterlassen.",
    ],
  },
};

const whyPool = [
  {
    prompt: "Warum ist die blaue Heizflamme heißer als die gelbe Flamme?",
    options: [
      "Weil mehr Sauerstoff zur Verbrennung da ist.",
      "Weil sie mehr Ruß enthält.",
      "Weil sie immer kleiner ist.",
      "Weil sie ohne Gas brennt.",
    ],
    answer: 0,
    explanation: "Mehr Sauerstoff ermöglicht eine vollständigere Verbrennung und damit mehr nutzbare Wärme.",
  },
  {
    prompt: "Was passiert bei zu wenig Luftzufuhr?",
    options: [
      "Die Verbrennung ist unvollständig und es entsteht eher Ruß.",
      "Die Flamme wird unsichtbar und kalt.",
      "Es gibt kein Gas mehr.",
      "Die Flamme wird automatisch blau und sehr heiß.",
    ],
    answer: 0,
    explanation: "Bei Sauerstoffmangel verbrennt der Brennstoff nicht vollständig, Rußteilchen können leuchten.",
  },
  {
    prompt: "Warum leuchtet die gelbe Flamme besonders stark?",
    options: [
      "Glühende Rußteilchen strahlen gelb.",
      "Die Luft ist völlig rein.",
      "Das Gas ist ohne Energie.",
      "Wasserstoff färbt jede Flamme gelb.",
    ],
    answer: 0,
    explanation: "Feine Rußteilchen glühen in der Flamme und erzeugen den gelben Farbeindruck.",
  },
  {
    prompt: "Welche Aussage passt zur rauschenden Flamme?",
    options: [
      "Viel Luft und meist hohe Temperatur.",
      "Kein Sauerstoff und deshalb kalt.",
      "Nur zum gemütlichen Beleuchten.",
      "Immer die sicherste Flamme für jede Aufgabe.",
    ],
    answer: 0,
    explanation: "Bei stark geöffneter Luftzufuhr wird die Verbrennung sehr intensiv, die Flamme wird sehr heiß.",
  },
  {
    prompt: "Was ist der Hauptgrund für unterschiedliche Flammentemperaturen?",
    options: [
      "Unterschiedliche Mischung aus Gas und Sauerstoff.",
      "Der Brennerfuß wird warm.",
      "Nur die Raumtemperatur im Labor.",
      "Die Farbe des Schlauchs.",
    ],
    answer: 0,
    explanation: "Die Temperatur hängt stark davon ab, wie viel Sauerstoff für die Verbrennung zur Verfügung steht.",
  },
  {
    prompt: "Warum sollte man zum Erhitzen eher die blaue Flamme nutzen?",
    options: [
      "Sie liefert mehr konzentrierte Wärme und rußt kaum.",
      "Sie ist nur größer, aber nicht heißer.",
      "Sie ist grundsätzlich ungefährlich.",
      "Sie braucht keinen Luftregler.",
    ],
    answer: 0,
    explanation: "Die blaue Flamme ist für Heizvorgänge besser geeignet, weil sie heißer und sauberer brennt.",
  },
];

const trainingPool = [
  {
    prompt: "Welcher Teil mischt Gas und Luft?",
    options: ["Mischrohr", "Brennerfuß", "Schlauch", "Dreifuß"],
    answer: 0,
    explanation: "Die Mischung entsteht im Mischrohr.",
  },
  {
    prompt: "Welcher Regler beeinflusst die Luftzufuhr?",
    options: ["Luftregler", "Brennerkopf", "Brennerfuß", "Reagenzglasklammer"],
    answer: 0,
    explanation: "Der Luftregler öffnet und schließt die Luftlöcher.",
  },
  {
    prompt: "Welche Flamme nutzt man meist zum Erhitzen?",
    options: ["Nichtleuchtende blaue Flamme", "Leuchtende gelbe Flamme", "Gar keine Flamme", "Nur Funken"],
    answer: 0,
    explanation: "Die blaue Heizflamme ist heißer und rußt deutlich weniger.",
  },
  {
    prompt: "Wofür ist die leuchtende Flamme eher geeignet?",
    options: ["Zum Anzünden und Einstellen", "Zum stärksten Erhitzen", "Zum Kühlen", "Zum Messen von Volumen"],
    answer: 0,
    explanation: "Beim Start wird oft zunächst eine leuchtende Flamme eingestellt.",
  },
  {
    prompt: "Welche Reihenfolge ist sicher beim Start?",
    options: ["Zündholz zuerst, dann Gas vorsichtig öffnen", "Gas voll aufdrehen, dann lange warten", "Luft voll öffnen, dann zünden", "Erst Erlenmeyerkolben aufsetzen"],
    answer: 0,
    explanation: "So vermeidest du, dass unverbranntes Gas austritt.",
  },
  {
    prompt: "Was spricht für eine unvollständige Verbrennung?",
    options: ["Rußbildung", "Sehr klare blaue Flamme", "Kein Geräusch", "Kalter Brennerfuß"],
    answer: 0,
    explanation: "Ruß ist ein Zeichen für Sauerstoffmangel.",
  },
  {
    prompt: "Warum ist mehr Luft oft gleichbedeutend mit höherer Temperatur?",
    options: ["Mehr Sauerstoff für die Reaktion", "Weniger Gas im Brenner", "Der Schlauch kühlt nicht", "Das Mischrohr wird kürzer"],
    answer: 0,
    explanation: "Mehr Sauerstoff erlaubt eine vollständigere Verbrennung.",
  },
  {
    prompt: "Welche Aussage zur rauschenden Flamme ist richtig?",
    options: ["Sie ist sehr heiß und nur für passende Aufgaben geeignet.", "Sie ist immer die sicherste Standardflamme.", "Sie ist die kälteste Flamme.", "Sie entsteht ohne Luft."],
    answer: 0,
    explanation: "Die rauschende Flamme wird gezielt, nicht dauerhaft für alles genutzt.",
  },
  {
    prompt: "Was machst du am Ende eines Versuchs zuerst?",
    options: ["Gaszufuhr schließen", "Luft ganz öffnen", "Schlauch abziehen", "Brenner anfassen"],
    answer: 0,
    explanation: "Zuerst wird die Gaszufuhr sicher geschlossen.",
  },
  {
    prompt: "Welche Flamme rußt am stärksten?",
    options: ["Leuchtende Flamme bei wenig Luft", "Nichtleuchtende Flamme", "Rauschende Flamme", "Alle gleich"],
    answer: 0,
    explanation: "Wenig Luft führt eher zu unvollständiger Verbrennung und Ruß.",
  },
  {
    prompt: "Welche Beobachtung passt zur blauen Heizflamme?",
    options: ["Kaum Ruß, gute Heizwirkung", "Sehr viel Ruß", "Flamme ist nur gelb", "Flamme ist sehr kalt"],
    answer: 0,
    explanation: "Die blaue Flamme ist für Heizzwecke üblich.",
  },
  {
    prompt: "Wofür sorgt der Brennerfuß hauptsächlich?",
    options: ["Für einen sicheren Stand", "Für die Sauerstoffzufuhr", "Für das Mischen von Gas", "Für die Temperaturmessung"],
    answer: 0,
    explanation: "Der Brennerfuß stabilisiert das Gerät.",
  },
  {
    prompt: "Was solltest du mit langen Haaren im Chemieraum tun?",
    options: ["Zusammenbinden", "Offen lassen", "Anzünden vermeiden reicht", "Unter den Tisch halten"],
    answer: 0,
    explanation: "Zusammengebundene Haare erhöhen die Sicherheit.",
  },
  {
    prompt: "Warum ist der Luftregler beim Start oft eher geschlossen?",
    options: ["Die Flamme lässt sich so leichter und sicherer entzünden.", "Weil dann kein Gas gebraucht wird.", "Damit die Flamme blau wird.", "Damit der Brennerfuß kalt bleibt."],
    answer: 0,
    explanation: "Zum Start ist die leuchtende Flamme einfacher zu kontrollieren.",
  },
  {
    prompt: "Welche Aussage ist fachlich richtig?",
    options: ["Flammenfarbe hängt mit der Verbrennungsart zusammen.", "Gelb ist immer heißer als blau.", "Die Luftmenge ist egal.", "Die Flamme hängt nur von der Tischhöhe ab."],
    answer: 0,
    explanation: "Farbe und Temperatur hängen stark von Luftzufuhr und Verbrennungsgrad ab.",
  },
  {
    prompt: "Woran erkennst du meist eine gut eingestellte Heizflamme?",
    options: ["Sie ist blau und rußt kaum.", "Sie ist dunkelgrau.", "Sie ist immer sehr laut.", "Sie ist unsichtbar."],
    answer: 0,
    explanation: "Die nichtleuchtende blaue Flamme ist die typische Heizflamme.",
  },
  {
    prompt: "Was bedeutet 'vollständigere Verbrennung' in diesem Zusammenhang?",
    options: ["Der Brennstoff reagiert besser mit Sauerstoff.", "Das Gas wird nicht verbrannt.", "Es entsteht immer Ruß.", "Die Flamme wird automatisch gelb."],
    answer: 0,
    explanation: "Bei genügend Sauerstoff kann der Brennstoff besser reagieren.",
  },
  {
    prompt: "Welche Regel gilt beim Arbeiten mit dem Brenner?",
    options: ["Nie unbeaufsichtigt brennen lassen", "Schlauch frei schwingen lassen", "Flamme mit der Hand testen", "Brenner zum Rand schieben"],
    answer: 0,
    explanation: "Eine brennende Flamme muss immer beaufsichtigt sein.",
  },
  {
    prompt: "Was ist beim Schlauch wichtig?",
    options: ["Knicks und Stolperstellen vermeiden", "Möglichst lang über den Tisch hängen lassen", "Direkt über die Flamme legen", "Nur einmal pro Halbjahr prüfen"],
    answer: 0,
    explanation: "Der Schlauch muss sicher verlegt sein.",
  },
  {
    prompt: "Welche Kombination passt zum stärkeren Erhitzen?",
    options: ["Mehr Luft und passende Gasmenge", "Wenig Luft und sehr wenig Gas", "Luft zu und Gas hoch", "Luft hoch und Gas komplett aus"],
    answer: 0,
    explanation: "Für hohe Temperaturen braucht es eine gute Mischung und genügend Brennstoff.",
  },
];

let whyTasks = [];
let trainingTasks = [];

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

function randomizeTaskOptions(task) {
  const markedOptions = task.options.map((option, index) => ({
    option,
    correct: index === task.answer,
  }));
  const shuffledOptions = shuffle(markedOptions);

  return {
    ...task,
    options: shuffledOptions.map((entry) => entry.option),
    answer: shuffledOptions.findIndex((entry) => entry.correct),
  };
}

function pickRandomTasks(pool, count) {
  if (count <= pool.length) {
    return shuffle(pool).slice(0, count).map((task) => randomizeTaskOptions(task));
  }

  const result = [];
  while (result.length < count) {
    result.push(randomizeTaskOptions(pool[randomInt(0, pool.length - 1)]));
  }
  return result;
}

function setupTabs() {
  gbTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      gbTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      gbTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${target}`).classList.add("is-active");
    });
  });
}

function renderPart(partKey) {
  const detail = partDetails[partKey];
  if (!detail) {
    return;
  }

  gbPartTitle.textContent = detail.title;
  gbPartText.textContent = detail.text;
  gbPartList.innerHTML = detail.points.map((point) => `<li>${point}</li>`).join("");

  gbPartButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.part === partKey);
  });
}

function setupPartModule() {
  gbPartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderPart(button.dataset.part);
    });
  });
  renderPart("brennerkopf");
}

function renderStep(stepKey) {
  const detail = stepDetails[stepKey];
  if (!detail) {
    return;
  }

  gbStepTitle.textContent = detail.title;
  gbStepText.textContent = detail.text;
  gbStepList.innerHTML = detail.points.map((point) => `<li>${point}</li>`).join("");

  gbStepButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.step === stepKey);
  });
}

function setupStepModule() {
  gbStepButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderStep(button.dataset.step);
    });
  });
  renderStep("vorbereiten");
}

function computeFlameState(airValue, gasLevel) {
  const gasShift = gasLevel === "niedrig" ? -120 : gasLevel === "hoch" ? 120 : 0;

  if (airValue < 20) {
    return {
      type: "Leuchtende Flamme",
      tempMin: 450 + gasShift,
      tempMax: 650 + gasShift,
      oxygen: "gering",
      combustion: "eher unvollständig",
      soot: "deutlich möglich",
      why: [
        "Wenig Luft bedeutet: wenig Sauerstoff im Mischrohr.",
        "Der Brennstoff verbrennt nicht vollständig.",
        "Glühende Rußteilchen erzeugen das gelbe Leuchten.",
      ],
      colors: { outer: "#f39635", inner: "#ffd777", title: "#a65315" },
      outerScale: 0.92,
      innerScale: 0.82,
    };
  }

  if (airValue < 70) {
    return {
      type: "Nichtleuchtende Flamme",
      tempMin: 1000 + gasShift,
      tempMax: 1250 + gasShift,
      oxygen: "mittel bis hoch",
      combustion: "weitgehend vollständig",
      soot: "gering",
      why: [
        "Mehr Luft liefert mehr Sauerstoff für die Reaktion.",
        "Das Gas-Luft-Gemisch verbrennt sauberer.",
        "Die blaue Flamme ist deshalb meist heißer und gut zum Erhitzen.",
      ],
      colors: { outer: "#4f8de7", inner: "#b9e8ff", title: "#205e9d" },
      outerScale: 1.05,
      innerScale: 0.9,
    };
  }

  return {
    type: "Rauschende Flamme",
    tempMin: 1300 + gasShift,
    tempMax: 1550 + gasShift,
    oxygen: "hoch",
    combustion: "sehr intensiv und nahezu vollständig",
    soot: "sehr gering",
    why: [
      "Sehr viel Luft sorgt für viel Sauerstoff im Gemisch.",
      "Die Reaktion läuft sehr schnell und energiereich ab.",
      "Die Flamme ist sehr heiß und nur für passende Aufgaben gedacht.",
    ],
    colors: { outer: "#2fa6c8", inner: "#b8fff4", title: "#17677f" },
    outerScale: 1.16,
    innerScale: 0.98,
  };
}

function drawFlame(state) {
  const outerTop = Math.round(140 - 108 * state.outerScale);
  const innerTop = Math.round(150 - 88 * state.innerScale);

  gbFlameSvg.innerHTML = `
    <rect x="0" y="0" width="360" height="280" fill="url(#gbBg)"></rect>
    <defs>
      <linearGradient id="gbBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#eef6ff"></stop>
        <stop offset="100%" stop-color="#ffffff"></stop>
      </linearGradient>
    </defs>
    <rect x="150" y="142" width="60" height="92" rx="12" ry="12" fill="#9bb4ce" stroke="#325069" stroke-width="3"></rect>
    <rect x="132" y="232" width="96" height="24" rx="10" ry="10" fill="#88a4c2" stroke="#325069" stroke-width="3"></rect>
    <circle cx="160" cy="178" r="7" fill="#c1d3e6" stroke="#325069" stroke-width="2"></circle>
    <path d="M180 ${outerTop} C150 ${outerTop + 45}, 108 136, 130 178 C146 214, 214 214, 230 178 C252 136, 210 ${outerTop + 45}, 180 ${outerTop} Z" fill="${state.colors.outer}" opacity="0.96"></path>
    <path d="M180 ${innerTop} C161 ${innerTop + 34}, 140 152, 152 177 C162 198, 198 198, 208 177 C220 152, 199 ${innerTop + 34}, 180 ${innerTop} Z" fill="${state.colors.inner}" opacity="0.96"></path>
  `;
}

function renderFlameLab() {
  const airValue = Number(gbAirSlider.value);
  const state = computeFlameState(airValue, gbGasLevel.value);

  const minTemp = Math.max(250, state.tempMin);
  const maxTemp = Math.max(minTemp + 80, state.tempMax);

  gbFlameType.textContent = `${state.type} (Luft ${airValue}%)`;
  gbFlameType.style.color = state.colors.title;
  gbTempRange.textContent = `Temperatur: ca. ${minTemp} bis ${maxTemp} °C`;

  gbWhyList.innerHTML = [
    `<li>Sauerstoffangebot: ${state.oxygen}</li>`,
    `<li>Verbrennung: ${state.combustion}</li>`,
    `<li>Rußbildung: ${state.soot}</li>`,
    ...state.why.map((item) => `<li>${item}</li>`),
  ].join("");

  drawFlame(state);
}

function setupFlameLab() {
  gbAirSlider.addEventListener("input", renderFlameLab);
  gbGasLevel.addEventListener("change", renderFlameLab);
  renderFlameLab();
}

function renderSelectTasks(targetElement, tasks) {
  targetElement.replaceChildren();

  tasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "gb-task-row";

    const prompt = document.createElement("p");
    prompt.innerHTML = `<strong>${index + 1}. ${task.prompt}</strong>`;

    const select = document.createElement("select");
    select.className = "gb-select";
    select.innerHTML = [
      "<option value=''>Antwort wählen</option>",
      ...task.options.map((option, optionIndex) => `<option value='${optionIndex}'>${option}</option>`),
    ].join("");

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";

    row.append(prompt, select, feedback);
    targetElement.append(row);
  });
}

function checkSelectTasks(targetElement, tasks, feedbackElement) {
  const rows = targetElement.querySelectorAll(".gb-task-row");
  let answered = 0;
  let correct = 0;

  rows.forEach((row, index) => {
    row.classList.remove("is-correct", "is-wrong");
    const select = row.querySelector("select");
    const feedback = row.querySelector(".task-feedback");

    if (!(select instanceof HTMLSelectElement) || !(feedback instanceof HTMLDivElement)) {
      return;
    }

    feedback.innerHTML = "";
    if (select.value === "") {
      return;
    }

    answered += 1;
    const task = tasks[index];
    const selected = Number(select.value);

    if (selected === task.answer) {
      correct += 1;
      row.classList.add("is-correct");
      feedback.innerHTML = `<p class="feedback ok">Richtig. ${task.explanation}</p>`;
      return;
    }

    row.classList.add("is-wrong");
    feedback.innerHTML = `<p class="feedback bad">Nicht korrekt. Richtige Antwort: ${task.options[task.answer]}. ${task.explanation}</p>`;
  });

  if (answered < tasks.length) {
    feedbackElement.innerHTML = '<p class="feedback info">Bitte beantworte alle Fragen.</p>';
    return;
  }

  feedbackElement.innerHTML = `<p class="feedback ${correct === tasks.length ? "ok" : "bad"}">${correct} / ${tasks.length} richtig.</p>`;
}

function setupWhyCheck() {
  whyTasks = pickRandomTasks(whyPool, 3);
  renderSelectTasks(gbWhyCheckList, whyTasks);

  gbWhyNew.addEventListener("click", () => {
    whyTasks = pickRandomTasks(whyPool, 3);
    renderSelectTasks(gbWhyCheckList, whyTasks);
    gbWhyFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });

  gbWhyCheck.addEventListener("click", () => {
    checkSelectTasks(gbWhyCheckList, whyTasks, gbWhyFeedback);
  });
}

function setupTraining() {
  function generateTraining() {
    const count = Number(gbTrainCount.value);
    trainingTasks = pickRandomTasks(trainingPool, count);
    renderSelectTasks(gbTrainList, trainingTasks);
    gbTrainFeedback.innerHTML = '<p class="feedback info">Neue Aufgaben wurden erstellt.</p>';
  }

  gbTrainGenerate.addEventListener("click", generateTraining);
  gbTrainCheck.addEventListener("click", () => {
    checkSelectTasks(gbTrainList, trainingTasks, gbTrainFeedback);
  });

  generateTraining();
}

function buildQuizSet() {
  const baseTasks = pickRandomTasks(trainingPool, 6);
  const whyTasksForQuiz = pickRandomTasks(whyPool, 4);
  return shuffle([...baseTasks, ...whyTasksForQuiz]).slice(0, 10);
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  if (!question) {
    return;
  }

  gbQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  gbQuizPrompt.textContent = question.prompt;
  gbQuizAnswers.replaceChildren();
  gbQuizFeedback.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gb-quiz-option";
    button.textContent = option;
    button.addEventListener("click", () => answerQuiz(index));
    gbQuizAnswers.append(button);
  });

  gbQuizNext.disabled = true;
  quizState.answered = false;
}

function answerQuiz(selectedIndex) {
  if (!quizState.running || quizState.answered) {
    return;
  }

  const question = quizState.questions[quizState.index];
  const buttons = gbQuizAnswers.querySelectorAll("button");
  quizState.answered = true;

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.answer) {
      button.classList.add("feedback", "ok");
    }
    if (index === selectedIndex && index !== question.answer) {
      button.classList.add("feedback", "bad");
    }
  });

  if (selectedIndex === question.answer) {
    quizState.correct += 1;
    gbQuizFeedback.innerHTML = '<p class="feedback ok">Richtig.</p>';
  } else {
    gbQuizFeedback.innerHTML = `<p class="feedback bad">Nicht korrekt. ${question.explanation}</p>`;
  }

  gbQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
  gbQuizNext.disabled = false;
}

function startQuiz() {
  quizState.running = true;
  quizState.answered = false;
  quizState.index = 0;
  quizState.correct = 0;
  quizState.questions = buildQuizSet();

  gbQuizScore.textContent = `Punkte: 0 / ${quizState.questions.length}`;
  gbQuizNext.disabled = true;
  renderQuizQuestion();
}

function nextQuizQuestion() {
  if (!quizState.running) {
    return;
  }

  if (!quizState.answered) {
    gbQuizFeedback.innerHTML = '<p class="feedback info">Bitte beantworte zuerst die aktuelle Frage.</p>';
    return;
  }

  quizState.index += 1;

  if (quizState.index >= quizState.questions.length) {
    quizState.running = false;
    gbQuizStatus.textContent = "Prüfung beendet";
    gbQuizPrompt.textContent = `Du hast ${quizState.correct} von ${quizState.questions.length} Punkten erreicht.`;
    gbQuizAnswers.replaceChildren();

    const rating = quizState.correct >= 9
      ? "Sehr sicher."
      : quizState.correct >= 7
        ? "Gut. Einzelne Punkte noch einmal wiederholen."
        : "Bitte Aufbau, Flammenwahl und Sicherheitsregeln noch einmal trainieren.";

    gbQuizFeedback.innerHTML = `<p class="feedback ${quizState.correct >= 7 ? "ok" : "info"}">${rating}</p>`;
    gbQuizNext.disabled = true;
    return;
  }

  renderQuizQuestion();
}

function setupQuiz() {
  gbQuizStart.addEventListener("click", startQuiz);
  gbQuizNext.addEventListener("click", nextQuizQuestion);
}

function initModule() {
  setupTabs();
  setupPartModule();
  setupStepModule();
  setupFlameLab();
  setupWhyCheck();
  setupTraining();
  setupQuiz();
}

initModule();
