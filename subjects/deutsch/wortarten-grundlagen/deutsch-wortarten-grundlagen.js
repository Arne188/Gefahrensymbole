const wgTabButtons = document.querySelectorAll(".wg-tab-btn");
const wgTabPanels = document.querySelectorAll(".wg-tab");
const wgLegend = document.getElementById("wgLegend");
const wgExploreButtons = document.getElementById("wgExploreButtons");
const wgExploreKicker = document.getElementById("wgExploreKicker");
const wgExploreTitle = document.getElementById("wgExploreTitle");
const wgExploreText = document.getElementById("wgExploreText");
const wgExploreExample = document.getElementById("wgExploreExample");
const wgExplorePrompt = document.getElementById("wgExplorePrompt");
const wgExploreOptions = document.getElementById("wgExploreOptions");
const wgExploreFeedback = document.getElementById("wgExploreFeedback");
const wgDetectiveTask = document.getElementById("wgDetectiveTask");
const wgDetectiveSentence = document.getElementById("wgDetectiveSentence");
const wgDetectiveHint = document.getElementById("wgDetectiveHint");
const wgDetectiveOptions = document.getElementById("wgDetectiveOptions");
const wgDetectiveFeedback = document.getElementById("wgDetectiveFeedback");
const wgDetectiveNext = document.getElementById("wgDetectiveNext");

const wgDifficulty = document.getElementById("wgDifficulty");
const wgCount = document.getElementById("wgCount");
const wgTypeChecks = document.querySelectorAll(".wg-type-check");
const wgGenerate = document.getElementById("wgGenerate");
const wgCheck = document.getElementById("wgCheck");
const wgReset = document.getElementById("wgReset");
const wgTaskList = document.getElementById("wgTaskList");
const wgTaskFeedback = document.getElementById("wgTaskFeedback");

const wgQuizStart = document.getElementById("wgQuizStart");
const wgQuizNext = document.getElementById("wgQuizNext");
const wgQuizScore = document.getElementById("wgQuizScore");
const wgQuizStatus = document.getElementById("wgQuizStatus");
const wgQuizPrompt = document.getElementById("wgQuizPrompt");
const wgQuizVisual = document.getElementById("wgQuizVisual");
const wgQuizOptions = document.getElementById("wgQuizOptions");
const wgQuizFeedback = document.getElementById("wgQuizFeedback");

const wordClasses = {
  nomen: {
    label: "Nomen / Substantiv",
    short: "Nomen",
    question: "Wer oder was ist gemeint?",
    function: "benennt Menschen, Tiere, Dinge, Pflanzen oder Gefuehle",
  },
  verb: {
    label: "Verb",
    short: "Verb",
    question: "Was tut jemand? Was passiert?",
    function: "zeigt eine Handlung, einen Vorgang oder einen Zustand",
  },
  adjektiv: {
    label: "Adjektiv",
    short: "Adjektiv",
    question: "Wie ist etwas?",
    function: "beschreibt ein Nomen genauer",
  },
  artikel: {
    label: "Artikel",
    short: "Artikel",
    question: "Begleitet es ein Nomen?",
    function: "begleitet ein Nomen und passt sich an dieses an",
  },
  pronomen: {
    label: "Pronomen",
    short: "Pronomen",
    question: "Ersetzt oder begleitet es ein Nomen?",
    function: "steht fuer ein Nomen oder begleitet es als Stellvertreterwort",
  },
  praeposition: {
    label: "Praeposition",
    short: "Praeposition",
    question: "Wo, wohin, womit oder wann?",
    function: "zeigt eine Beziehung, zum Beispiel Ort, Richtung oder Art",
  },
  konjunktion: {
    label: "Konjunktion",
    short: "Konjunktion",
    question: "Verbindet es Woerter oder Saetze?",
    function: "verbindet Woerter, Satzglieder oder Saetze",
  },
};

const typeLabels = {
  mark: "Markieren",
  sort: "Sortieren",
  error: "Fehlersuche",
  gap: "Luecke",
  function: "Begruenden",
  sentence: "Satzanalyse",
};

const discoveryCards = {
  nomen: {
    text: "Nomen geben Menschen, Tieren, Dingen, Pflanzen und Gefuehlen einen Namen. Oft kannst du einen Artikel davorstellen.",
    examples: [["die", "artikel"], ["Schule", "nomen"], ["der", "artikel"], ["Hund", "nomen"], ["die", "artikel"], ["Freude", "nomen"]],
    prompt: "Welche Wortkarte ist ein Nomen?",
    options: [
      { value: "nomen", label: "Freude" },
      { value: "verb", label: "rennt" },
      { value: "adjektiv", label: "mutig" },
    ],
  },
  verb: {
    text: "Verben sind Tu- oder Geschehenswoerter. Sie veraendern ihre Form: ich laufe, du laeufst, er laeuft.",
    examples: [["ich", "pronomen"], ["laufe", "verb"], ["du", "pronomen"], ["spielst", "verb"], ["es", "pronomen"], ["regnet", "verb"]],
    prompt: "Welche Frage passt am besten zu Verben?",
    options: [
      { value: "verb", label: "Was tut jemand? Was passiert?" },
      { value: "nomen", label: "Wer oder was ist gemeint?" },
      { value: "adjektiv", label: "Wie ist etwas?" },
    ],
  },
  adjektiv: {
    text: "Adjektive machen Nomen genauer. Sie helfen dir, Gegenstaende, Figuren und Stimmungen anschaulich zu beschreiben.",
    examples: [["der", "artikel"], ["mutige", "adjektiv"], ["Junge", "nomen"], ["eine", "artikel"], ["rote", "adjektiv"], ["Tasche", "nomen"]],
    prompt: "Welches Wort beschreibt ein Nomen genauer?",
    options: [
      { value: "adjektiv", label: "mutig" },
      { value: "artikel", label: "eine" },
      { value: "konjunktion", label: "weil" },
    ],
  },
  artikel: {
    text: "Artikel begleiten Nomen. Sie zeigen dir oft, dass gleich ein Nomen kommt oder ein Nomen gemeint ist.",
    examples: [["der", "artikel"], ["Ball", "nomen"], ["das", "artikel"], ["Heft", "nomen"], ["eine", "artikel"], ["Idee", "nomen"]],
    prompt: "Welche Wortkarte ist ein Artikel?",
    options: [
      { value: "artikel", label: "das" },
      { value: "praeposition", label: "unter" },
      { value: "verb", label: "schreibt" },
    ],
  },
  pronomen: {
    text: "Pronomen sind Stellvertreterwoerter. Sie koennen Nomen ersetzen oder Zugehoerigkeit anzeigen: er, sie, mein, seinen.",
    examples: [["Mila", "nomen"], ["sucht", "verb"], ["ihr", "pronomen"], ["Heft", "nomen"], ["weil", "konjunktion"], ["sie", "pronomen"]],
    prompt: "Welches Wort kann fuer eine Person stehen?",
    options: [
      { value: "pronomen", label: "sie" },
      { value: "artikel", label: "der" },
      { value: "adjektiv", label: "hell" },
    ],
  },
  praeposition: {
    text: "Praepositionen zeigen Beziehungen: Ort, Richtung, Zeit oder Art. Sie stehen oft vor einer Wortgruppe.",
    examples: [["auf", "praeposition"], ["dem", "artikel"], ["Tisch", "nomen"], ["durch", "praeposition"], ["den", "artikel"], ["Park", "nomen"]],
    prompt: "Welche Wortkarte zeigt einen Ort oder eine Richtung?",
    options: [
      { value: "praeposition", label: "durch" },
      { value: "konjunktion", label: "oder" },
      { value: "nomen", label: "Park" },
    ],
  },
  konjunktion: {
    text: "Konjunktionen verbinden Woerter, Satzteile oder Saetze. Mit ihnen kannst du Gedanken verknuepfen.",
    examples: [["Mia", "nomen"], ["liest", "verb"], ["und", "konjunktion"], ["Tom", "nomen"], ["schreibt", "verb"], ["weil", "konjunktion"]],
    prompt: "Welche Wortkarte verbindet zwei Gedanken?",
    options: [
      { value: "konjunktion", label: "weil" },
      { value: "nomen", label: "Tom" },
      { value: "verb", label: "liest" },
    ],
  },
};

const sentenceBank = [
  {
    level: "basis",
    text: "Der kleine Hund spielt auf dem Hof.",
    tokens: [
      ["Der", "artikel"], ["kleine", "adjektiv"], ["Hund", "nomen"], ["spielt", "verb"], ["auf", "praeposition"], ["dem", "artikel"], ["Hof", "nomen"],
    ],
  },
  {
    level: "basis",
    text: "Eine rote Tasche liegt auf dem Tisch.",
    tokens: [
      ["Eine", "artikel"], ["rote", "adjektiv"], ["Tasche", "nomen"], ["liegt", "verb"], ["auf", "praeposition"], ["dem", "artikel"], ["Tisch", "nomen"],
    ],
  },
  {
    level: "basis",
    text: "Das schnelle Pferd springt.",
    tokens: [
      ["Das", "artikel"], ["schnelle", "adjektiv"], ["Pferd", "nomen"], ["springt", "verb"],
    ],
  },
  {
    level: "standard",
    text: "Der kleine Hund laeuft in den Garten, weil er seinen Ball sucht.",
    tokens: [
      ["Der", "artikel"], ["kleine", "adjektiv"], ["Hund", "nomen"], ["laeuft", "verb"], ["in", "praeposition"], ["den", "artikel"], ["Garten", "nomen"], ["weil", "konjunktion"], ["er", "pronomen"], ["seinen", "pronomen"], ["Ball", "nomen"], ["sucht", "verb"],
    ],
  },
  {
    level: "standard",
    text: "Die mutige Lena traegt einen roten Rucksack, weil sie wandern will.",
    tokens: [
      ["Die", "artikel"], ["mutige", "adjektiv"], ["Lena", "nomen"], ["traegt", "verb"], ["einen", "artikel"], ["roten", "adjektiv"], ["Rucksack", "nomen"], ["weil", "konjunktion"], ["sie", "pronomen"], ["wandern", "verb"], ["will", "verb"],
    ],
  },
  {
    level: "standard",
    text: "Wir spielen auf dem Hof, wenn die Sonne scheint.",
    tokens: [
      ["Wir", "pronomen"], ["spielen", "verb"], ["auf", "praeposition"], ["dem", "artikel"], ["Hof", "nomen"], ["wenn", "konjunktion"], ["die", "artikel"], ["Sonne", "nomen"], ["scheint", "verb"],
    ],
  },
  {
    level: "standard",
    text: "Mein Bruder liest ein spannendes Buch und er lacht.",
    tokens: [
      ["Mein", "pronomen"], ["Bruder", "nomen"], ["liest", "verb"], ["ein", "artikel"], ["spannendes", "adjektiv"], ["Buch", "nomen"], ["und", "konjunktion"], ["er", "pronomen"], ["lacht", "verb"],
    ],
  },
  {
    level: "standard",
    text: "Diese Katze schlaeft unter dem warmen Tisch.",
    tokens: [
      ["Diese", "pronomen"], ["Katze", "nomen"], ["schlaeft", "verb"], ["unter", "praeposition"], ["dem", "artikel"], ["warmen", "adjektiv"], ["Tisch", "nomen"],
    ],
  },
  {
    level: "profi",
    text: "Das Laufen macht Tom Freude, aber sein Bein schmerzt.",
    tokens: [
      ["Das", "artikel"], ["Laufen", "nomen"], ["macht", "verb"], ["Tom", "nomen"], ["Freude", "nomen"], ["aber", "konjunktion"], ["sein", "pronomen"], ["Bein", "nomen"], ["schmerzt", "verb"],
    ],
  },
  {
    level: "profi",
    text: "Der Junge, der singt, findet seine Stimme schoen.",
    tokens: [
      ["Der", "artikel"], ["Junge", "nomen"], ["der", "pronomen"], ["singt", "verb"], ["findet", "verb"], ["seine", "pronomen"], ["Stimme", "nomen"], ["schoen", "adjektiv"],
    ],
  },
  {
    level: "profi",
    text: "Mila rennt durch den Park, obwohl ihr Rucksack schwer ist.",
    tokens: [
      ["Mila", "nomen"], ["rennt", "verb"], ["durch", "praeposition"], ["den", "artikel"], ["Park", "nomen"], ["obwohl", "konjunktion"], ["ihr", "pronomen"], ["Rucksack", "nomen"], ["schwer", "adjektiv"], ["ist", "verb"],
    ],
  },
];

const wordBank = [
  { word: "Schule", kind: "nomen", level: "basis", hint: "ein Ding/Ort, grossgeschrieben" },
  { word: "Freude", kind: "nomen", level: "basis", hint: "ein Gefuehl, grossgeschrieben" },
  { word: "rennen", kind: "verb", level: "basis", hint: "man kann es tun" },
  { word: "traeumt", kind: "verb", level: "basis", hint: "was geschieht?" },
  { word: "mutig", kind: "adjektiv", level: "basis", hint: "wie ist jemand?" },
  { word: "hell", kind: "adjektiv", level: "basis", hint: "wie ist etwas?" },
  { word: "der", kind: "artikel", level: "basis", hint: "Begleiter eines Nomens" },
  { word: "eine", kind: "artikel", level: "basis", hint: "Begleiter eines Nomens" },
  { word: "wir", kind: "pronomen", level: "standard", hint: "steht fuer Personen" },
  { word: "sein", kind: "pronomen", level: "standard", hint: "zeigt Zugehoerigkeit" },
  { word: "unter", kind: "praeposition", level: "standard", hint: "zeigt einen Ort" },
  { word: "mit", kind: "praeposition", level: "standard", hint: "zeigt eine Beziehung" },
  { word: "weil", kind: "konjunktion", level: "standard", hint: "verbindet Saetze" },
  { word: "oder", kind: "konjunktion", level: "standard", hint: "verbindet Moeglichkeiten" },
  { word: "Laufen", kind: "nomen", level: "profi", hint: "mit Artikel: das Laufen" },
  { word: "der", kind: "pronomen", level: "profi", hint: "in: der singt" },
  { word: "obwohl", kind: "konjunktion", level: "profi", hint: "verbindet Haupt- und Nebensatz" },
  { word: "durch", kind: "praeposition", level: "profi", hint: "zeigt Richtung/Ort" },
];

const gapTasks = [
  {
    level: "basis",
    prompt: "Setze ein passendes Adjektiv ein: Der ___ Apfel liegt im Korb.",
    visual: [["Der", "artikel"], ["___", "adjektiv"], ["Apfel", "nomen"], ["liegt", "verb"], ["im", "praeposition"], ["Korb", "nomen"]],
    options: ["rote", "rennt", "der", "weil"],
    expected: "rote",
    explanation: "rote beschreibt den Apfel genauer und ist deshalb ein Adjektiv.",
  },
  {
    level: "basis",
    prompt: "Setze ein passendes Verb ein: Die Katze ___ auf dem Sofa.",
    visual: [["Die", "artikel"], ["Katze", "nomen"], ["___", "verb"], ["auf", "praeposition"], ["dem", "artikel"], ["Sofa", "nomen"]],
    options: ["schlaeft", "weiche", "eine", "und"],
    expected: "schlaeft",
    explanation: "schlaeft sagt, was die Katze tut.",
  },
  {
    level: "standard",
    prompt: "Setze eine passende Konjunktion ein: Ich freue mich, ___ du kommst.",
    visual: [["Ich", "pronomen"], ["freue", "verb"], ["mich", "pronomen"], ["___", "konjunktion"], ["du", "pronomen"], ["kommst", "verb"]],
    options: ["weil", "unter", "der", "schnell"],
    expected: "weil",
    explanation: "weil verbindet zwei Saetze und leitet hier einen Grund ein.",
  },
  {
    level: "standard",
    prompt: "Setze eine passende Praeposition ein: Das Buch liegt ___ dem Tisch.",
    visual: [["Das", "artikel"], ["Buch", "nomen"], ["liegt", "verb"], ["___", "praeposition"], ["dem", "artikel"], ["Tisch", "nomen"]],
    options: ["auf", "und", "helle", "wir"],
    expected: "auf",
    explanation: "auf zeigt den Ort des Buches.",
  },
  {
    level: "profi",
    prompt: "Setze ein passendes Pronomen ein: Nora sucht ___ Heft.",
    visual: [["Nora", "nomen"], ["sucht", "verb"], ["___", "pronomen"], ["Heft", "nomen"]],
    options: ["ihr", "weil", "unter", "gruene"],
    expected: "ihr",
    explanation: "ihr begleitet das Nomen Heft und zeigt Zugehoerigkeit: Es ist ein Possessivpronomen.",
  },
];

const functionTasks = [
  { kind: "nomen", prompt: "Welche Erkennungsfrage hilft bei Nomen?", expected: "Wer oder was ist gemeint?" },
  { kind: "verb", prompt: "Welche Frage hilft bei Verben?", expected: "Was tut jemand? Was passiert?" },
  { kind: "adjektiv", prompt: "Welche Frage hilft bei Adjektiven?", expected: "Wie ist etwas?" },
  { kind: "artikel", prompt: "Woran erkennst du einen Artikel?", expected: "Er begleitet ein Nomen." },
  { kind: "pronomen", prompt: "Was ist eine typische Aufgabe von Pronomen?", expected: "Sie ersetzen oder begleiten Nomen." },
  { kind: "praeposition", prompt: "Was zeigen Praepositionen oft an?", expected: "Ort, Richtung, Zeit oder Art." },
  { kind: "konjunktion", prompt: "Was machen Konjunktionen?", expected: "Sie verbinden Woerter oder Saetze." },
];

let generatedTasks = [];
let activeDiscoveryKind = "nomen";
let activeDetective = null;
const quizState = { questions: [], index: 0, correct: 0, answered: false };

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

function allowedKinds(level) {
  if (level === "basis") return ["nomen", "verb", "adjektiv", "artikel"];
  return Object.keys(wordClasses);
}

function levelRank(level) {
  return { basis: 1, standard: 2, profi: 3 }[level] || 2;
}

function matchesLevel(item, level) {
  return levelRank(item.level || "basis") <= levelRank(level);
}

function sentenceFor(level) {
  const allowed = sentenceBank.filter((sentence) => matchesLevel(sentence, level));
  return choice(allowed);
}

function wordsFor(level) {
  const kinds = allowedKinds(level);
  return wordBank.filter((item) => matchesLevel(item, level) && kinds.includes(item.kind));
}

function makeOptions(expected, level) {
  const options = allowedKinds(level).map((kind) => ({ value: kind, label: wordClasses[kind].label }));
  if (!options.some((option) => option.value === expected)) {
    options.push({ value: expected, label: wordClasses[expected].label });
  }
  return options;
}

function classChip([word, kind], extraClass = "") {
  return `<span class="chip ${kind} ${extraClass}">${word}</span>`;
}

function sentenceVisual(tokens, targetIndex = -1, reveal = false) {
  return `<div class="wg-word-row">${tokens.map((token, index) => {
    const shownKind = reveal ? token[1] : "";
    const target = index === targetIndex ? "target" : "";
    return classChip([token[0], shownKind], target);
  }).join("")}</div>`;
}

function setFeedback(el, text, tone) {
  el.textContent = text;
  el.className = `wg-feedback ${tone || ""}`.trim();
}

function buildLegend() {
  if (!wgLegend) return;
  wgLegend.innerHTML = Object.entries(wordClasses).map(([kind, data]) => (
    `<span class="wg-legend-item"><span class="chip ${kind}">${data.short}</span>${data.question}</span>`
  )).join("");
}

function buildDiscoveryButtons() {
  if (!wgExploreButtons) return;
  wgExploreButtons.innerHTML = Object.entries(wordClasses).map(([kind, data]) => (
    `<button type="button" data-discovery-kind="${kind}">${data.short}</button>`
  )).join("");
}

function renderDiscovery(kind) {
  if (!wgExploreTitle || !discoveryCards[kind]) return;
  activeDiscoveryKind = kind;
  const card = discoveryCards[kind];
  wgExploreButtons.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.discoveryKind === kind);
  });
  wgExploreKicker.textContent = `Entdeckerkarte: ${wordClasses[kind].short}`;
  wgExploreTitle.textContent = wordClasses[kind].label;
  wgExploreText.textContent = card.text;
  wgExploreExample.innerHTML = card.examples.map((token) => classChip(token)).join("");
  wgExplorePrompt.textContent = card.prompt;
  wgExploreOptions.innerHTML = shuffle(card.options).map((option) => (
    `<button type="button" data-discovery-answer="${option.value}">${option.label}</button>`
  )).join("");
  setFeedback(wgExploreFeedback, "Waehle eine Antwort und pruefe deine Idee.", "warn");
}

function answerDiscovery(event) {
  const button = event.target.closest("button[data-discovery-answer]");
  if (!button) return;
  const answer = button.dataset.discoveryAnswer;
  const isCorrect = answer === activeDiscoveryKind;
  wgExploreOptions.querySelectorAll("button").forEach((option) => {
    option.disabled = true;
    if (option.dataset.discoveryAnswer === activeDiscoveryKind) option.classList.add("correct");
  });
  if (!isCorrect) button.classList.add("wrong");
  const text = isCorrect
    ? `Richtig. ${wordClasses[activeDiscoveryKind].function}.`
    : `Noch einmal mit der Erkennungsfrage pruefen: ${wordClasses[activeDiscoveryKind].question}`;
  setFeedback(wgExploreFeedback, text, isCorrect ? "good" : "bad");
}

function makeDetectiveCard() {
  const sentence = sentenceFor("standard");
  const candidates = sentence.tokens
    .map((token, index) => ({ token, index }))
    .filter(({ token }) => Object.keys(wordClasses).includes(token[1]));
  const picked = choice(candidates);
  return { sentence, picked };
}

function renderDetectiveCard() {
  if (!wgDetectiveSentence) return;
  activeDetective = makeDetectiveCard();
  const { sentence, picked } = activeDetective;
  wgDetectiveTask.textContent = `Welche Wortart hat "${picked.token[0]}"?`;
  wgDetectiveSentence.innerHTML = sentenceVisual(sentence.tokens, picked.index);
  wgDetectiveHint.textContent = `Detektivhinweis: ${wordClasses[picked.token[1]].question}`;
  wgDetectiveOptions.innerHTML = shuffle(Object.entries(wordClasses)).map(([kind, data]) => (
    `<button type="button" data-detective-answer="${kind}">${data.label}</button>`
  )).join("");
  setFeedback(wgDetectiveFeedback, "Begruende innerlich, bevor du klickst.", "warn");
}

function answerDetective(event) {
  const button = event.target.closest("button[data-detective-answer]");
  if (!button || !activeDetective) return;
  const expected = activeDetective.picked.token[1];
  const answer = button.dataset.detectiveAnswer;
  const isCorrect = answer === expected;
  wgDetectiveOptions.querySelectorAll("button").forEach((option) => {
    option.disabled = true;
    if (option.dataset.detectiveAnswer === expected) option.classList.add("correct");
  });
  if (!isCorrect) button.classList.add("wrong");
  const pickedWord = activeDetective.picked.token[0];
  const text = isCorrect
    ? `Treffer. "${pickedWord}" ist ${wordClasses[expected].label}: ${wordClasses[expected].function}.`
    : `Fast. "${pickedWord}" ist ${wordClasses[expected].label}. Frage: ${wordClasses[expected].question}`;
  setFeedback(wgDetectiveFeedback, text, isCorrect ? "good" : "bad");
}

function taskMark(level) {
  const sentence = sentenceFor(level);
  const validTokens = sentence.tokens
    .map((token, index) => ({ token, index }))
    .filter(({ token }) => allowedKinds(level).includes(token[1]));
  const picked = choice(validTokens);
  return {
    type: "mark",
    title: "Wortart im Satz bestimmen",
    prompt: `Bestimme die Wortart von "${picked.token[0]}" im Satz.`,
    visual: sentenceVisual(sentence.tokens, picked.index),
    answerMode: "single",
    options: makeOptions(picked.token[1], level),
    expected: picked.token[1],
    explanation: `${picked.token[0]} ist ${wordClasses[picked.token[1]].label}: ${wordClasses[picked.token[1]].function}.`,
  };
}

function taskSort(level) {
  const word = choice(wordsFor(level));
  return {
    type: "sort",
    title: "Wortkarte sortieren",
    prompt: `Sortiere die Wortkarte "${word.word}" richtig ein.`,
    visual: `<div class="wg-word-row"><span class="chip ${word.kind} target">${word.word}</span><span class="wg-legend-item">Tipp: ${word.hint}</span></div>`,
    answerMode: "single",
    options: makeOptions(word.kind, level),
    expected: word.kind,
    explanation: `${word.word} gehoert zu ${wordClasses[word.kind].label}, denn ${word.hint}.`,
  };
}

function taskError(level) {
  const sentence = sentenceFor(level);
  const tokens = sentence.tokens.filter((token) => allowedKinds(level).includes(token[1]));
  const shuffledTokens = shuffle(tokens);
  const correct = shuffledTokens[0];
  const otherA = shuffledTokens[1] || correct;
  const otherB = shuffledTokens[2] || correct;
  const wrongKinds = allowedKinds(level).filter((kind) => kind !== correct[1]);
  const wrong = choice(wrongKinds);
  const cards = shuffle([
    { label: `${correct[0]} -> ${wordClasses[correct[1]].short}`, value: "ok1" },
    { label: `${otherA[0]} -> ${wordClasses[otherA[1]].short}`, value: "ok2" },
    { label: `${otherB[0]} -> ${wordClasses[otherB[1]].short}`, value: "ok3" },
    { label: `${correct[0]} -> ${wordClasses[wrong].short}`, value: "wrong" },
  ]);
  return {
    type: "error",
    title: "Falsche Zuordnung finden",
    prompt: "Welche Zuordnung ist falsch?",
    visual: sentenceVisual(sentence.tokens),
    answerMode: "choiceText",
    options: cards,
    expected: "wrong",
    explanation: `${correct[0]} ist nicht ${wordClasses[wrong].label}, sondern ${wordClasses[correct[1]].label}.`,
  };
}

function taskGap(level) {
  const task = choice(gapTasks.filter((item) => matchesLevel(item, level)));
  return {
    type: "gap",
    title: "Passendes Wort einsetzen",
    prompt: task.prompt,
    visual: `<div class="wg-word-row">${task.visual.map(([word, kind]) => word === "___" ? `<span class="chip blank ${kind}">___</span>` : classChip([word, kind])).join("")}</div>`,
    answerMode: "choiceText",
    options: shuffle(task.options.map((option) => ({ value: option, label: option }))),
    expected: task.expected,
    explanation: task.explanation,
  };
}

function taskFunction(level) {
  const kinds = allowedKinds(level);
  const task = choice(functionTasks.filter((item) => kinds.includes(item.kind)));
  const wrongOptions = shuffle(functionTasks.filter((item) => item.kind !== task.kind)).slice(0, 3).map((item) => item.expected);
  const options = shuffle([task.expected, ...wrongOptions]).map((label) => ({ value: label, label }));
  return {
    type: "function",
    title: "Erkennungsfrage nutzen",
    prompt: task.prompt,
    visual: `<div class="wg-word-row"><span class="chip ${task.kind}">${wordClasses[task.kind].label}</span><span class="wg-legend-item">Funktion statt Auswendigliste</span></div>`,
    answerMode: "choiceText",
    options,
    expected: task.expected,
    explanation: `${wordClasses[task.kind].label}: ${wordClasses[task.kind].function}.`,
  };
}

function taskSentence(level) {
  const sentence = sentenceFor(level);
  const tokens = sentence.tokens.filter((token) => allowedKinds(level).includes(token[1]));
  return {
    type: "sentence",
    title: "Ganzen Satz untersuchen",
    prompt: "Bestimme die Wortarten der markierten Woerter. Gehe Wort fuer Wort vor.",
    visual: sentenceVisual(tokens),
    answerMode: "multi",
    tokens,
    options: allowedKinds(level).map((kind) => ({ value: kind, label: wordClasses[kind].short })),
    expected: tokens.map((token) => token[1]),
    explanation: "Im ganzen Satz hilft der Wortarten-Kompass: Name, Handlung, Beschreibung, Begleiter, Stellvertreter oder Verbindungswort?",
  };
}

const taskBuilders = {
  mark: taskMark,
  sort: taskSort,
  error: taskError,
  gap: taskGap,
  function: taskFunction,
  sentence: taskSentence,
};

function selectedTypes() {
  const types = [...wgTypeChecks].filter((input) => input.checked).map((input) => input.value);
  return types.length ? types : ["mark", "sort", "function"];
}

function buildTasks() {
  const level = wgDifficulty.value;
  const count = Number(wgCount.value);
  const types = selectedTypes();
  generatedTasks = Array.from({ length: count }, (_, index) => {
    const type = types[index % types.length];
    return taskBuilders[type](level);
  });
  generatedTasks = shuffle(generatedTasks);
  renderTasks();
  setFeedback(wgTaskFeedback, `${generatedTasks.length} neue Aufgaben erstellt.`, "good");
}

function renderSingleTask(task, index) {
  const options = task.options.map((option) => `<option value="${option.value}">${option.label}</option>`).join("");
  return `
    <label>
      Deine Antwort
      <select data-task-index="${index}">
        <option value="">Bitte waehlen</option>
        ${options}
      </select>
    </label>
  `;
}

function renderMultiTask(task, index) {
  const options = task.options.map((option) => `<option value="${option.value}">${option.label}</option>`).join("");
  return `<div class="wg-sentence-answer">${task.tokens.map((token, tokenIndex) => `
    <label class="wg-token-select">
      <span>${token[0]}</span>
      <select data-task-index="${index}" data-token-index="${tokenIndex}">
        <option value="">?</option>
        ${options}
      </select>
    </label>
  `).join("")}</div>`;
}

function renderTasks() {
  wgTaskList.innerHTML = generatedTasks.map((task, index) => `
    <article class="wg-task" data-task-card="${index}">
      <div class="wg-task-head">
        <div>
          <h3>${index + 1}. ${task.title}</h3>
          <p>${task.prompt}</p>
        </div>
        <span class="wg-task-type">${typeLabels[task.type]}</span>
      </div>
      <div class="wg-task-visual">${task.visual}</div>
      <div class="wg-task-select">
        ${task.answerMode === "multi" ? renderMultiTask(task, index) : renderSingleTask(task, index)}
      </div>
      <div class="wg-task-result" data-task-result="${index}">Noch nicht geprueft.</div>
    </article>
  `).join("");
}

function checkTasks() {
  if (!generatedTasks.length) {
    setFeedback(wgTaskFeedback, "Erstelle zuerst eine neue Runde.", "warn");
    return;
  }
  let correct = 0;
  generatedTasks.forEach((task, index) => {
    const card = wgTaskList.querySelector(`[data-task-card="${index}"]`);
    const result = wgTaskList.querySelector(`[data-task-result="${index}"]`);
    card.classList.remove("is-correct", "is-wrong");
    let isCorrect = false;
    if (task.answerMode === "multi") {
      const answers = [...wgTaskList.querySelectorAll(`select[data-task-index="${index}"]`)].map((select) => select.value);
      isCorrect = answers.every((answer, tokenIndex) => answer === task.expected[tokenIndex]);
    } else {
      const answer = wgTaskList.querySelector(`select[data-task-index="${index}"]`).value;
      isCorrect = answer === task.expected;
    }
    if (isCorrect) {
      correct += 1;
      card.classList.add("is-correct");
      result.textContent = `Richtig. ${task.explanation}`;
    } else {
      card.classList.add("is-wrong");
      result.textContent = `Noch einmal pruefen. Loesung: ${solutionText(task)} ${task.explanation}`;
    }
  });
  const tone = correct === generatedTasks.length ? "good" : correct >= Math.ceil(generatedTasks.length * 0.65) ? "warn" : "bad";
  setFeedback(wgTaskFeedback, `${correct} von ${generatedTasks.length} Aufgaben richtig.`, tone);
}

function solutionText(task) {
  if (task.answerMode === "multi") {
    return task.tokens.map((token) => `${token[0]} = ${wordClasses[token[1]].short}`).join(", ") + ".";
  }
  if (wordClasses[task.expected]) return wordClasses[task.expected].label + ".";
  return task.expected + ".";
}

function resetTasks() {
  wgTaskList.querySelectorAll("select").forEach((select) => { select.value = ""; });
  wgTaskList.querySelectorAll(".wg-task").forEach((task) => task.classList.remove("is-correct", "is-wrong"));
  wgTaskList.querySelectorAll("[data-task-result]").forEach((result) => { result.textContent = "Noch nicht geprueft."; });
  setFeedback(wgTaskFeedback, "Eingaben geleert.", "warn");
}

function makeQuizQuestions() {
  const level = wgDifficulty.value || "standard";
  const mix = [
    taskMark(level), taskSort(level), taskFunction(level), taskGap(level),
    taskMark(level), taskError(level), taskSort(level), taskFunction(level),
    taskGap(level), taskMark(level), taskSentence(level), taskSort(level),
  ];
  return shuffle(mix).slice(0, 10).map((task) => {
    if (task.answerMode === "multi") {
      const tokenIndex = randomInt(0, task.tokens.length - 1);
      const expected = task.tokens[tokenIndex][1];
      return {
        prompt: `Welche Wortart hat "${task.tokens[tokenIndex][0]}"?`,
        visual: sentenceVisual(task.tokens, tokenIndex),
        options: makeOptions(expected, level),
        expected,
        explanation: `${task.tokens[tokenIndex][0]} ist ${wordClasses[expected].label}.`,
      };
    }
    return task;
  });
}

function startQuiz() {
  quizState.questions = makeQuizQuestions();
  quizState.index = 0;
  quizState.correct = 0;
  quizState.answered = false;
  wgQuizNext.disabled = true;
  setFeedback(wgQuizFeedback, "", "");
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  wgQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  wgQuizScore.textContent = `${quizState.correct} / ${quizState.index} richtig`;
  wgQuizPrompt.textContent = question.prompt;
  wgQuizPrompt.classList.add("is-visible");
  wgQuizVisual.innerHTML = question.visual || "";
  wgQuizOptions.innerHTML = question.options.map((option) => `<button type="button" data-quiz-answer="${option.value}">${option.label}</button>`).join("");
  setFeedback(wgQuizFeedback, "Waehle eine Antwort.", "warn");
  quizState.answered = false;
  wgQuizNext.disabled = true;
}

function answerQuiz(event) {
  const button = event.target.closest("button[data-quiz-answer]");
  if (!button || quizState.answered) return;
  const question = quizState.questions[quizState.index];
  const answer = button.dataset.quizAnswer;
  const correct = answer === question.expected;
  quizState.answered = true;
  if (correct) quizState.correct += 1;
  [...wgQuizOptions.querySelectorAll("button")].forEach((option) => {
    option.disabled = true;
    if (option.dataset.quizAnswer === question.expected) option.classList.add("correct");
  });
  if (!correct) button.classList.add("wrong");
  setFeedback(wgQuizFeedback, `${correct ? "Richtig." : "Noch nicht."} ${question.explanation}`, correct ? "good" : "bad");
  wgQuizNext.disabled = false;
  wgQuizScore.textContent = `${quizState.correct} / ${quizState.index + 1} richtig`;
}

function nextQuizQuestion() {
  if (!quizState.answered) return;
  quizState.index += 1;
  if (quizState.index >= quizState.questions.length) {
    const total = quizState.questions.length;
    wgQuizStatus.textContent = "Check abgeschlossen.";
    wgQuizScore.textContent = `${quizState.correct} / ${total} richtig`;
    wgQuizPrompt.textContent = "Auswertung";
    wgQuizVisual.innerHTML = "";
    wgQuizOptions.innerHTML = "";
    const message = quizState.correct >= 8
      ? "Sehr sicher: Du kannst Wortarten benennen und begruenden."
      : quizState.correct >= 5
        ? "Solide Basis: Wiederhole besonders die falsch beantworteten Wortarten."
        : "Noch wackelig: Starte eine Basis-Uebungsrunde und nutze die Erkennungsfragen.";
    setFeedback(wgQuizFeedback, message, quizState.correct >= 8 ? "good" : quizState.correct >= 5 ? "warn" : "bad");
    wgQuizNext.disabled = true;
    return;
  }
  renderQuizQuestion();
}

wgTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    wgTabButtons.forEach((tabButton) => tabButton.classList.remove("is-active"));
    wgTabPanels.forEach((panel) => panel.classList.remove("is-active"));
    button.classList.add("is-active");
    document.getElementById(`tab-${button.dataset.tab}`).classList.add("is-active");
  });
});

wgGenerate.addEventListener("click", buildTasks);
wgCheck.addEventListener("click", checkTasks);
wgReset.addEventListener("click", resetTasks);
wgQuizStart.addEventListener("click", startQuiz);
wgQuizNext.addEventListener("click", nextQuizQuestion);
wgQuizOptions.addEventListener("click", answerQuiz);
wgExploreButtons.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-discovery-kind]");
  if (button) renderDiscovery(button.dataset.discoveryKind);
});
wgExploreOptions.addEventListener("click", answerDiscovery);
wgDetectiveOptions.addEventListener("click", answerDetective);
wgDetectiveNext.addEventListener("click", renderDetectiveCard);

buildLegend();
buildDiscoveryButtons();
renderDiscovery("nomen");
renderDetectiveCard();
buildTasks();
