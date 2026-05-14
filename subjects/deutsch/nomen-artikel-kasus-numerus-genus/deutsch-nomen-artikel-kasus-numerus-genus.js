const ngTabButtons = document.querySelectorAll(".ng-tab-btn");
const ngTabPanels = document.querySelectorAll(".ng-tab");

const ngGraphicButtons = document.getElementById("ngGraphicButtons");
const ngGraphicImage = document.getElementById("ngGraphicImage");
const ngGraphicKicker = document.getElementById("ngGraphicKicker");
const ngGraphicTitle = document.getElementById("ngGraphicTitle");
const ngGraphicText = document.getElementById("ngGraphicText");
const ngGraphicPrompt = document.getElementById("ngGraphicPrompt");

const ngScannerSentence = document.getElementById("ngScannerSentence");
const ngScannerCheck = document.getElementById("ngScannerCheck");
const ngScannerNext = document.getElementById("ngScannerNext");
const ngScannerFeedback = document.getElementById("ngScannerFeedback");

const ngNounCard = document.getElementById("ngNounCard");
const ngGenusSelect = document.getElementById("ngGenusSelect");
const ngNumerusSelect = document.getElementById("ngNumerusSelect");
const ngNounCheck = document.getElementById("ngNounCheck");
const ngNounNext = document.getElementById("ngNounNext");
const ngNounFeedback = document.getElementById("ngNounFeedback");

const ngCasePrompt = document.getElementById("ngCasePrompt");
const ngCaseSentence = document.getElementById("ngCaseSentence");
const ngCaseHint = document.getElementById("ngCaseHint");
const ngCaseOptions = document.getElementById("ngCaseOptions");
const ngCaseNext = document.getElementById("ngCaseNext");
const ngCaseFeedback = document.getElementById("ngCaseFeedback");

const ngDifficulty = document.getElementById("ngDifficulty");
const ngCount = document.getElementById("ngCount");
const ngTypeChecks = document.querySelectorAll(".ng-type-check");
const ngGenerate = document.getElementById("ngGenerate");
const ngCheck = document.getElementById("ngCheck");
const ngReset = document.getElementById("ngReset");
const ngTaskFeedback = document.getElementById("ngTaskFeedback");
const ngTaskList = document.getElementById("ngTaskList");

const ngQuizStart = document.getElementById("ngQuizStart");
const ngQuizNext = document.getElementById("ngQuizNext");
const ngQuizStatus = document.getElementById("ngQuizStatus");
const ngQuizScore = document.getElementById("ngQuizScore");
const ngQuizPrompt = document.getElementById("ngQuizPrompt");
const ngQuizVisual = document.getElementById("ngQuizVisual");
const ngQuizOptions = document.getElementById("ngQuizOptions");
const ngQuizFeedback = document.getElementById("ngQuizFeedback");

const graphics = [
  {
    id: "overview",
    label: "Uebersicht",
    image: "modul2-uebersicht.png",
    kicker: "Station 0",
    title: "Nomen verstehen",
    text: "Die Gesamtkarte verbindet Nomen, Artikel, Genus, Numerus und Kasus.",
    prompt: "Arbeitsauftrag: Suche in der Grafik die Bereiche Artikel, Genus, Numerus und Kasus.",
  },
  {
    id: "nomen",
    label: "Nomen erkennen",
    image: "modul2-1-nomen-erkennen.png",
    kicker: "Station 1",
    title: "Nomen erkennen und grossschreiben",
    text: "Nomen sind Namen fuer Menschen, Tiere, Dinge und Gefuehle. Die Artikelprobe hilft beim Erkennen.",
    prompt: "Arbeitsauftrag: Finde je ein Beispiel fuer Mensch, Tier, Ding und Gefuehl.",
  },
  {
    id: "genus",
    label: "Genus/Numerus",
    image: "modul2-2-genus-numerus.png",
    kicker: "Station 2",
    title: "Genus und Numerus bestimmen",
    text: "Genus meint das grammatische Geschlecht, Numerus meint Singular oder Plural.",
    prompt: "Arbeitsauftrag: Erklaere den Unterschied zwischen der Hund und die Hunde.",
  },
  {
    id: "kasus",
    label: "Kasus",
    image: "modul2-3-kasus-deklination.png",
    kicker: "Station 3",
    title: "Kasus mit Fragen erkennen",
    text: "Nominativ, Genitiv, Dativ und Akkusativ erkennt man am besten mit passenden Fragen.",
    prompt: "Arbeitsauftrag: Sprich die vier Fragen laut: Wer? Wessen? Wem? Wen oder was?",
  },
];

const genusLabels = {
  maskulin: "maskulin",
  feminin: "feminin",
  neutrum: "neutrum",
  plural: "Pluralform",
};

const numerusLabels = {
  singular: "Singular",
  plural: "Plural",
};

const caseData = {
  nominativ: { label: "Nominativ", question: "Wer oder was?", example: "der Hund" },
  genitiv: { label: "Genitiv", question: "Wessen?", example: "des Hundes" },
  dativ: { label: "Dativ", question: "Wem?", example: "dem Hund" },
  akkusativ: { label: "Akkusativ", question: "Wen oder was?", example: "den Hund" },
};

const nounBank = [
  { noun: "Hund", article: "der", genus: "maskulin", plural: "Hunde", pluralArticle: "die", type: "Tier", level: "basis" },
  { noun: "Katze", article: "die", genus: "feminin", plural: "Katzen", pluralArticle: "die", type: "Tier", level: "basis" },
  { noun: "Buch", article: "das", genus: "neutrum", plural: "Buecher", pluralArticle: "die", type: "Ding", level: "basis" },
  { noun: "Schule", article: "die", genus: "feminin", plural: "Schulen", pluralArticle: "die", type: "Ding", level: "basis" },
  { noun: "Ball", article: "der", genus: "maskulin", plural: "Baelle", pluralArticle: "die", type: "Ding", level: "basis" },
  { noun: "Kind", article: "das", genus: "neutrum", plural: "Kinder", pluralArticle: "die", type: "Mensch", level: "basis" },
  { noun: "Freude", article: "die", genus: "feminin", plural: "Freuden", pluralArticle: "die", type: "Gefuehl", level: "basis" },
  { noun: "Tisch", article: "der", genus: "maskulin", plural: "Tische", pluralArticle: "die", type: "Ding", level: "standard" },
  { noun: "Mädchen", article: "das", genus: "neutrum", plural: "Mädchen", pluralArticle: "die", type: "Mensch", level: "standard" },
  { noun: "Haus", article: "das", genus: "neutrum", plural: "Haeuser", pluralArticle: "die", type: "Ding", level: "standard" },
  { noun: "Blume", article: "die", genus: "feminin", plural: "Blumen", pluralArticle: "die", type: "Pflanze", level: "standard" },
  { noun: "Angst", article: "die", genus: "feminin", plural: "Aengste", pluralArticle: "die", type: "Gefuehl", level: "profi" },
  { noun: "Erlebnis", article: "das", genus: "neutrum", plural: "Erlebnisse", pluralArticle: "die", type: "Ding", level: "profi" },
  { noun: "Lehrer", article: "der", genus: "maskulin", plural: "Lehrer", pluralArticle: "die", type: "Mensch", level: "profi" },
];

const scannerSentences = [
  { level: "basis", tokens: [["Die", "article"], ["mutige", "other"], ["Mia", "noun"], ["legt", "other"], ["das", "article"], ["Buch", "noun"], ["auf", "other"], ["den", "article"], ["Tisch", "noun"], ["und", "other"], ["zeigt", "other"], ["Freude", "noun"]] },
  { level: "basis", tokens: [["Der", "article"], ["Hund", "noun"], ["sieht", "other"], ["die", "article"], ["Blume", "noun"], ["im", "other"], ["Garten", "noun"]] },
  { level: "standard", tokens: [["Ein", "article"], ["Kind", "noun"], ["findet", "other"], ["einen", "article"], ["Ball", "noun"], ["neben", "other"], ["der", "article"], ["Schule", "noun"]] },
  { level: "standard", tokens: [["Lena", "noun"], ["liest", "other"], ["ein", "article"], ["Buch", "noun"], ["und", "other"], ["spuert", "other"], ["Freude", "noun"]] },
  { level: "profi", tokens: [["Das", "article"], ["Erlebnis", "noun"], ["macht", "other"], ["dem", "article"], ["Maedchen", "noun"], ["keine", "other"], ["Angst", "noun"]] },
];

const caseSentences = [
  { level: "basis", text: "Der Hund schlaeft.", tokens: [["Der", "article"], ["Hund", "noun"], ["schlaeft", "other"]], target: 1, case: "nominativ", reason: "Wer oder was schlaeft? Der Hund." },
  { level: "basis", text: "Ich sehe den Hund.", tokens: [["Ich", "other"], ["sehe", "other"], ["den", "article"], ["Hund", "noun"]], target: 3, case: "akkusativ", reason: "Wen oder was sehe ich? Den Hund." },
  { level: "standard", text: "Ich gebe dem Kind den Ball.", tokens: [["Ich", "other"], ["gebe", "other"], ["dem", "article"], ["Kind", "noun"], ["den", "article"], ["Ball", "noun"]], target: 3, case: "dativ", reason: "Wem gebe ich den Ball? Dem Kind." },
  { level: "standard", text: "Ich gebe dem Kind den Ball.", tokens: [["Ich", "other"], ["gebe", "other"], ["dem", "article"], ["Kind", "noun"], ["den", "article"], ["Ball", "noun"]], target: 5, case: "akkusativ", reason: "Wen oder was gebe ich? Den Ball." },
  { level: "standard", text: "Das Halsband des Hundes ist rot.", tokens: [["Das", "article"], ["Halsband", "noun"], ["des", "article"], ["Hundes", "noun"], ["ist", "other"], ["rot", "other"]], target: 3, case: "genitiv", reason: "Wessen Halsband? Des Hundes." },
  { level: "profi", text: "Die Lehrerin hilft dem Maedchen.", tokens: [["Die", "article"], ["Lehrerin", "noun"], ["hilft", "other"], ["dem", "article"], ["Maedchen", "noun"]], target: 4, case: "dativ", reason: "Wem hilft die Lehrerin? Dem Maedchen." },
  { level: "profi", text: "Der Freund des Kindes lacht.", tokens: [["Der", "article"], ["Freund", "noun"], ["des", "article"], ["Kindes", "noun"], ["lacht", "other"]], target: 3, case: "genitiv", reason: "Wessen Freund? Des Kindes." },
];

const articleForms = [
  { level: "basis", prompt: "___ Hund bellt.", expected: "der", explanation: "Hund ist maskulin: der Hund." },
  { level: "basis", prompt: "___ Mädchen liest ___ Buch.", expected: "das;das", explanation: "Es heisst das Maedchen und das Buch." },
  { level: "basis", prompt: "___ Blume waechst im Garten.", expected: "die", explanation: "Blume ist feminin: die Blume." },
  { level: "standard", prompt: "Ich sehe ___ Ball.", expected: "den", explanation: "Frage: Wen oder was sehe ich? den Ball, Akkusativ." },
  { level: "standard", prompt: "Ich helfe ___ Kind.", expected: "dem", explanation: "Frage: Wem helfe ich? dem Kind, Dativ." },
  { level: "profi", prompt: "Das Buch ___ Lehrerin liegt dort.", expected: "der", explanation: "Wessen Buch? der Lehrerin, Genitiv feminin." },
];

const declensionSets = [
  {
    level: "basis",
    lemma: "Hund",
    start: "der Hund",
    forms: { nominativ: "der Hund", genitiv: "des Hundes", dativ: "dem Hund", akkusativ: "den Hund" },
  },
  {
    level: "basis",
    lemma: "Kind",
    start: "das Kind",
    forms: { nominativ: "das Kind", genitiv: "des Kindes", dativ: "dem Kind", akkusativ: "das Kind" },
  },
  {
    level: "standard",
    lemma: "Ball",
    start: "der Ball",
    forms: { nominativ: "der Ball", genitiv: "des Balles", dativ: "dem Ball", akkusativ: "den Ball" },
  },
  {
    level: "standard",
    lemma: "Buch",
    start: "das Buch",
    forms: { nominativ: "das Buch", genitiv: "des Buches", dativ: "dem Buch", akkusativ: "das Buch" },
  },
  {
    level: "standard",
    lemma: "Katze",
    start: "die Katze",
    forms: { nominativ: "die Katze", genitiv: "der Katze", dativ: "der Katze", akkusativ: "die Katze" },
  },
  {
    level: "profi",
    lemma: "Lehrerin",
    start: "die Lehrerin",
    forms: { nominativ: "die Lehrerin", genitiv: "der Lehrerin", dativ: "der Lehrerin", akkusativ: "die Lehrerin" },
  },
  {
    level: "profi",
    lemma: "Maedchen",
    start: "das Maedchen",
    forms: { nominativ: "das Maedchen", genitiv: "des Maedchens", dativ: "dem Maedchen", akkusativ: "das Maedchen" },
  },
];

const declensionFrames = [
  { case: "nominativ", before: "", after: " spielt im Garten.", question: "Wer oder was spielt im Garten?" },
  { case: "genitiv", before: "Das Halsband ", after: " ist rot.", question: "Wessen Halsband ist rot?" },
  { case: "dativ", before: "Ich helfe ", after: ".", question: "Wem helfe ich?" },
  { case: "akkusativ", before: "Ich sehe ", after: ".", question: "Wen oder was sehe ich?" },
];

const declensionForms = declensionSets.flatMap((set) =>
  Object.entries(set.forms).map(([caseKey, form]) => ({ form, case: caseKey, lemma: set.lemma }))
);

const typeLabels = {
  findNouns: "Nomen finden",
  capital: "Grossschreibung",
  article: "Artikel",
  genus: "Genus",
  plural: "Plural",
  caseQuestion: "Kasusfrage",
  caseSentence: "Fall im Satz",
  decline: "Deklination",
};

let currentScanner = null;
let currentNoun = null;
let currentCase = null;
let generatedTasks = [];
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

function levelRank(level) {
  return { basis: 1, standard: 2, profi: 3 }[level] || 2;
}

function matchesLevel(item, level) {
  return levelRank(item.level || "basis") <= levelRank(level);
}

function setFeedback(el, text, tone) {
  el.textContent = text;
  el.className = `ng-feedback ${tone || ""}`.trim();
}

function normalizeAnswer(value) {
  return value.trim().toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss");
}

function answerParts(value) {
  return normalizeAnswer(value).split(/[^a-z]+/).filter(Boolean);
}

function renderTokens(tokens, target = -1, selectable = false) {
  return tokens.map((token, index) => {
    const [word, kind] = token;
    const classes = ["ng-token", kind === "noun" ? "noun" : kind === "article" ? "article" : "", index === target ? "target" : ""].filter(Boolean).join(" ");
    if (selectable) {
      return `<button type="button" class="${classes}" data-token-index="${index}">${word}</button>`;
    }
    return `<span class="${classes}">${word}</span>`;
  }).join("");
}

function renderGraphics() {
  ngGraphicButtons.innerHTML = graphics.map((graphic) => `<button type="button" data-graphic-id="${graphic.id}">${graphic.label}</button>`).join("");
  setGraphic("overview");
}

function setGraphic(id) {
  const graphic = graphics.find((item) => item.id === id) || graphics[0];
  ngGraphicImage.src = graphic.image;
  ngGraphicKicker.textContent = graphic.kicker;
  ngGraphicTitle.textContent = graphic.title;
  ngGraphicText.textContent = graphic.text;
  ngGraphicPrompt.textContent = graphic.prompt;
  ngGraphicButtons.querySelectorAll("button").forEach((button) => button.classList.toggle("is-active", button.dataset.graphicId === id));
}

function scannerPool() {
  return scannerSentences.filter((item) => matchesLevel(item, ngDifficulty.value || "standard"));
}

function renderScanner() {
  currentScanner = choice(scannerPool());
  ngScannerSentence.innerHTML = renderTokens(currentScanner.tokens, -1, true);
  setFeedback(ngScannerFeedback, "Klicke alle Nomen an und pruefe danach.", "warn");
}

function toggleScannerToken(event) {
  const token = event.target.closest("button[data-token-index]");
  if (!token) return;
  token.classList.toggle("selected");
  token.classList.remove("correct", "wrong");
}

function checkScanner() {
  let correct = 0;
  let totalNouns = 0;
  ngScannerSentence.querySelectorAll("button[data-token-index]").forEach((button) => {
    const index = Number(button.dataset.tokenIndex);
    const isNoun = currentScanner.tokens[index][1] === "noun";
    const selected = button.classList.contains("selected");
    button.classList.remove("correct", "wrong");
    if (isNoun) totalNouns += 1;
    if (selected && isNoun) {
      correct += 1;
      button.classList.add("correct");
    } else if (selected && !isNoun) {
      button.classList.add("wrong");
    } else if (isNoun) {
      button.classList.add("wrong");
    }
  });
  const selectedWrong = ngScannerSentence.querySelectorAll(".ng-token.wrong.selected").length;
  const allRight = correct === totalNouns && selectedWrong === 0;
  setFeedback(ngScannerFeedback, allRight ? "Stark: Alle Nomen gefunden." : `Gefunden: ${correct} von ${totalNouns}. Suche nach Namen fuer Menschen, Tiere, Dinge oder Gefuehle.`, allRight ? "good" : "bad");
}

function nounPool(level = ngDifficulty.value || "standard") {
  return nounBank.filter((item) => matchesLevel(item, level));
}

function declensionPool(level = ngDifficulty.value || "standard") {
  return declensionSets.filter((item) => matchesLevel(item, level));
}

function renderNounCard() {
  const noun = choice(nounPool());
  const showPlural = Math.random() > 0.52;
  currentNoun = showPlural
    ? { ...noun, shown: `${noun.pluralArticle} ${noun.plural}`, shownGenus: "plural", shownNumerus: "plural" }
    : { ...noun, shown: `${noun.article} ${noun.noun}`, shownGenus: noun.genus, shownNumerus: "singular" };
  ngNounCard.innerHTML = `<div><strong>${currentNoun.shown}</strong><span>${currentNoun.type} bestimmen</span></div>`;
  ngGenusSelect.value = "";
  ngNumerusSelect.value = "";
  setFeedback(ngNounFeedback, "Bestimme Genus und Numerus.", "warn");
}

function checkNounCard() {
  const genusCorrect = ngGenusSelect.value === currentNoun.shownGenus;
  const numerusCorrect = ngNumerusSelect.value === currentNoun.shownNumerus;
  if (genusCorrect && numerusCorrect) {
    setFeedback(ngNounFeedback, `Richtig: ${currentNoun.shown} ist ${genusLabels[currentNoun.shownGenus]} und ${numerusLabels[currentNoun.shownNumerus]}.`, "good");
  } else {
    setFeedback(ngNounFeedback, `Pruefe den Artikel und die Zahlform: ${genusLabels[currentNoun.shownGenus]}, ${numerusLabels[currentNoun.shownNumerus]}.`, "bad");
  }
}

function casePool(level = ngDifficulty.value || "standard") {
  return caseSentences.filter((item) => matchesLevel(item, level));
}

function renderCaseCard() {
  currentCase = choice(casePool());
  ngCasePrompt.textContent = `Bestimme den Fall von "${currentCase.tokens[currentCase.target][0]}".`;
  ngCaseSentence.innerHTML = renderTokens(currentCase.tokens, currentCase.target, false);
  ngCaseHint.textContent = "Tipp: Stelle eine Kasusfrage, bevor du klickst.";
  ngCaseOptions.innerHTML = Object.entries(caseData).map(([key, data]) => `<button type="button" data-case-answer="${key}">${data.label}: ${data.question}</button>`).join("");
  setFeedback(ngCaseFeedback, "Waehle den passenden Fall.", "warn");
}

function answerCase(event) {
  const button = event.target.closest("button[data-case-answer]");
  if (!button) return;
  const answer = button.dataset.caseAnswer;
  const correct = answer === currentCase.case;
  ngCaseOptions.querySelectorAll("button").forEach((option) => {
    option.disabled = true;
    if (option.dataset.caseAnswer === currentCase.case) option.classList.add("correct");
  });
  if (!correct) button.classList.add("wrong");
  ngCaseHint.textContent = currentCase.reason;
  setFeedback(ngCaseFeedback, correct ? "Richtig bestimmt." : `Noch einmal mit der Frage pruefen: ${caseData[currentCase.case].question}`, correct ? "good" : "bad");
}

function selectedTypes() {
  const types = [...ngTypeChecks].filter((input) => input.checked).map((input) => input.value);
  return types.length ? types : ["findNouns", "article", "caseSentence"];
}

function optionsFrom(items) {
  return items.map((item) => typeof item === "string" ? { value: item, label: item } : item);
}

function taskFindNouns(level) {
  const sentence = choice(scannerSentences.filter((item) => matchesLevel(item, level)));
  const nouns = sentence.tokens.filter((token) => token[1] === "noun").map((token) => token[0]).join(", ");
  return {
    type: "findNouns",
    title: "Nomen finden",
    prompt: "Welche Woerter im Satz sind Nomen? Schreibe sie mit Komma getrennt ab.",
    visual: `<div class="ng-token-row">${renderTokens(sentence.tokens)}</div>`,
    mode: "text",
    expected: nouns,
    check: (answer) => normalizeAnswer(answer).split(/[,;]+/).map((item) => item.trim()).filter(Boolean).sort().join("|") === normalizeAnswer(nouns).split(/[,;]+/).map((item) => item.trim()).sort().join("|"),
    explanation: `Nomen: ${nouns}.`,
  };
}

function taskCapital(level) {
  const noun = choice(nounPool(level));
  return {
    type: "capital",
    title: "Grossschreibung",
    prompt: `Schreibe genau dieses Wort mit richtiger Grossschreibung: ${noun.noun.toLowerCase()}`,
    visual: `<div class="ng-token-row"><span class="ng-token">Kategorie: ${noun.type}</span><span class="ng-token article">Artikelprobe: ${noun.article} ${noun.noun}</span></div>`,
    mode: "text",
    expected: noun.noun,
    check: (answer) => normalizeAnswer(answer) === normalizeAnswer(noun.noun),
    explanation: `Richtig ist ${noun.noun}, denn Nomen schreibt man gross.`,
  };
}

function taskArticle(level) {
  const pool = articleForms.filter((item) => matchesLevel(item, level));
  const item = choice(pool);
  return {
    type: "article",
    title: "Artikel einsetzen",
    prompt: item.prompt,
    visual: `<div class="ng-token-row"><span class="ng-token article">Artikel gesucht</span><span class="ng-token">Achte auf Genus oder Kasus.</span></div>`,
    mode: "text",
    expected: item.expected,
    check: (answer) => answerParts(answer).join("|") === answerParts(item.expected).join("|"),
    explanation: item.explanation,
  };
}

function taskGenus(level) {
  const noun = choice(nounPool(level));
  return {
    type: "genus",
    title: "Genus bestimmen",
    prompt: `Welches Genus hat "${noun.article} ${noun.noun}"?`,
    visual: `<div class="ng-token-row"><span class="ng-token article">${noun.article}</span><span class="ng-token noun">${noun.noun}</span></div>`,
    mode: "choice",
    options: optionsFrom(["maskulin", "feminin", "neutrum"]),
    expected: noun.genus,
    explanation: `${noun.article} ${noun.noun} ist ${genusLabels[noun.genus]}.`,
  };
}

function taskPlural(level) {
  const noun = choice(nounPool(level));
  return {
    type: "plural",
    title: "Mehrzahl bilden",
    prompt: `Bilde die Mehrzahl mit Artikel: ${noun.article} ${noun.noun}`,
    visual: `<div class="ng-token-row"><span class="ng-token noun">${noun.article} ${noun.noun}</span><span class="ng-token">-> ?</span></div>`,
    mode: "text",
    expected: `${noun.pluralArticle} ${noun.plural}`,
    check: (answer) => normalizeAnswer(answer) === normalizeAnswer(`${noun.pluralArticle} ${noun.plural}`),
    explanation: `Die Mehrzahl lautet: ${noun.pluralArticle} ${noun.plural}.`,
  };
}

function taskCaseQuestion() {
  const key = choice(Object.keys(caseData));
  return {
    type: "caseQuestion",
    title: "Kasusfrage zuordnen",
    prompt: `Welche Frage gehoert zum ${caseData[key].label}?`,
    visual: `<div class="ng-token-row"><span class="ng-token target">${caseData[key].label}</span></div>`,
    mode: "choice",
    options: optionsFrom(Object.values(caseData).map((item) => item.question)),
    expected: caseData[key].question,
    explanation: `${caseData[key].label}: ${caseData[key].question}`,
  };
}

function taskCaseSentence(level) {
  const item = choice(casePool(level));
  return {
    type: "caseSentence",
    title: "Fall im Satz bestimmen",
    prompt: `Bestimme den Fall von "${item.tokens[item.target][0]}".`,
    visual: `<div class="ng-token-row">${renderTokens(item.tokens, item.target)}</div>`,
    mode: "choice",
    options: optionsFrom(Object.keys(caseData).map((key) => ({ value: key, label: caseData[key].label }))),
    expected: item.case,
    explanation: item.reason,
  };
}

function uniqueForms(forms) {
  return [...new Set(forms)];
}

function declensionOptions(set) {
  return optionsFrom(uniqueForms(Object.values(set.forms)));
}

function taskDecline(level) {
  const set = choice(declensionPool(level));
  const caseKey = choice(Object.keys(caseData));
  const variant = choice(["chooseForm", "fillSentence", "transform"]);
  const expected = set.forms[caseKey];

  if (variant === "fillSentence") {
    const frame = declensionFrames.find((item) => item.case === caseKey);
    return {
      type: "decline",
      title: "Deklination im Satz",
      prompt: `Ergaenze die passende Form von "${set.start}".`,
      visual: `<div class="ng-token-row">${frame.before ? `<span class="ng-token">${frame.before}</span>` : ""}<span class="ng-token target">___</span><span class="ng-token">${frame.after}</span></div><div class="ng-prompt-box">${frame.question}</div>`,
      mode: "text",
      expected,
      check: (answer) => normalizeAnswer(answer) === normalizeAnswer(expected),
      explanation: `${frame.question} Deshalb passt: ${expected}.`,
    };
  }

  if (variant === "transform") {
    return {
      type: "decline",
      title: "Form umwandeln",
      prompt: `Setze "${set.start}" in den ${caseData[caseKey].label}.`,
      visual: `<div class="ng-token-row"><span class="ng-token noun">${set.start}</span><span class="ng-token">-></span><span class="ng-token target">${caseData[caseKey].question}</span></div>`,
      mode: "text",
      expected,
      check: (answer) => normalizeAnswer(answer) === normalizeAnswer(expected),
      explanation: `${caseData[caseKey].label} fragt man mit "${caseData[caseKey].question}". Die Form lautet: ${expected}.`,
    };
  }

  return {
    type: "decline",
    title: "Passende Deklinationsform waehlen",
    prompt: `Welche Form passt zum ${caseData[caseKey].label}?`,
    visual: `<div class="ng-token-row"><span class="ng-token target">${caseData[caseKey].question}</span><span class="ng-token noun">${set.lemma}</span></div>`,
    mode: "choice",
    options: declensionOptions(set),
    expected,
    explanation: `${caseData[caseKey].label}: ${expected}.`,
  };
}

const taskBuilders = { findNouns: taskFindNouns, capital: taskCapital, article: taskArticle, genus: taskGenus, plural: taskPlural, caseQuestion: taskCaseQuestion, caseSentence: taskCaseSentence, decline: taskDecline };

function buildTasks() {
  const level = ngDifficulty.value;
  const count = Number(ngCount.value);
  const types = selectedTypes();
  const weightedTypes = types.includes("decline") ? [...types, "decline", "decline"] : types;
  generatedTasks = Array.from({ length: count }, (_, index) => {
    const type = weightedTypes[index % weightedTypes.length];
    return taskBuilders[type](level);
  });
  generatedTasks = shuffle(generatedTasks);
  renderTasks();
  setFeedback(ngTaskFeedback, `${generatedTasks.length} neue Aufgaben erstellt.`, "good");
}

function renderAnswer(task, index) {
  if (task.mode === "choice") {
    const options = task.options.map((option) => `<option value="${option.value}">${option.label}</option>`).join("");
    return `<label>Deine Antwort<select data-task-index="${index}"><option value="">Bitte waehlen</option>${options}</select></label>`;
  }
  return `<label>Deine Antwort<input type="text" data-task-index="${index}" autocomplete="off" placeholder="Antwort eingeben"></label>`;
}

function renderTasks() {
  ngTaskList.innerHTML = generatedTasks.map((task, index) => `
    <article class="ng-task" data-task-card="${index}">
      <div class="ng-task-head"><div><h3>${index + 1}. ${task.title}</h3><p>${task.prompt}</p></div><span class="ng-task-type">${typeLabels[task.type]}</span></div>
      <div class="ng-task-visual">${task.visual}</div>
      <div class="ng-task-answer">${renderAnswer(task, index)}</div>
      <div class="ng-task-result" data-task-result="${index}">Noch nicht geprueft.</div>
    </article>
  `).join("");
}

function checkTask(task, answer) {
  if (typeof task.check === "function") return task.check(answer);
  return answer === task.expected;
}

function checkTasks() {
  if (!generatedTasks.length) {
    setFeedback(ngTaskFeedback, "Erstelle zuerst eine Runde.", "warn");
    return;
  }
  let correct = 0;
  generatedTasks.forEach((task, index) => {
    const card = ngTaskList.querySelector(`[data-task-card="${index}"]`);
    const result = ngTaskList.querySelector(`[data-task-result="${index}"]`);
    const input = ngTaskList.querySelector(`[data-task-index="${index}"]`);
    const answer = input.value;
    const isCorrect = checkTask(task, answer);
    card.classList.remove("is-correct", "is-wrong");
    card.classList.add(isCorrect ? "is-correct" : "is-wrong");
    if (isCorrect) correct += 1;
    result.textContent = `${isCorrect ? "Richtig." : `Loesung: ${task.expected}.`} ${task.explanation}`;
  });
  const tone = correct === generatedTasks.length ? "good" : correct >= Math.ceil(generatedTasks.length * 0.65) ? "warn" : "bad";
  setFeedback(ngTaskFeedback, `${correct} von ${generatedTasks.length} Aufgaben richtig.`, tone);
}

function resetTasks() {
  ngTaskList.querySelectorAll("select,input").forEach((input) => { input.value = ""; });
  ngTaskList.querySelectorAll(".ng-task").forEach((task) => task.classList.remove("is-correct", "is-wrong"));
  ngTaskList.querySelectorAll("[data-task-result]").forEach((result) => { result.textContent = "Noch nicht geprueft."; });
  setFeedback(ngTaskFeedback, "Eingaben geleert.", "warn");
}

function makeQuizQuestions() {
  const level = ngDifficulty.value || "standard";
  return shuffle([
    taskGenus(level), taskPlural(level), taskCaseSentence(level), taskCaseQuestion(level), taskArticle(level), taskDecline(),
    taskGenus(level), taskCaseSentence(level), taskCapital(level), taskArticle(level), taskPlural(level), taskCaseQuestion(level),
  ]).slice(0, 10).map((task) => {
    if (task.mode === "text") {
      const wrongOptions = shuffle(wrongTextOptions(task)).slice(0, 3);
      return {
        prompt: task.prompt,
        visual: task.visual,
        options: shuffle([task.expected, ...wrongOptions]).map((item) => ({ value: item, label: item })),
        expected: task.expected,
        explanation: task.explanation,
      };
    }
    return task;
  });
}

function wrongTextOptions(task) {
  if (task.type === "plural") return ["der Hunde", "die Hund", "das Hund"];
  if (task.type === "article") return ["der", "die", "das", "dem", "den"].filter((item) => item !== task.expected);
  if (task.type === "capital") return [task.expected.toLowerCase(), `das ${task.expected}`, "Verb"];
  if (task.type === "decline") {
    return uniqueForms(declensionForms.map((item) => item.form)).filter((item) => item !== task.expected);
  }
  return ["der Hund", "dem Hund", "den Hund", "des Hundes"].filter((item) => item !== task.expected);
}

function startQuiz() {
  quizState.questions = makeQuizQuestions();
  quizState.index = 0;
  quizState.correct = 0;
  quizState.answered = false;
  ngQuizNext.disabled = true;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  ngQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  ngQuizScore.textContent = `${quizState.correct} / ${quizState.index} richtig`;
  ngQuizPrompt.textContent = question.prompt;
  ngQuizPrompt.classList.add("is-visible");
  ngQuizVisual.innerHTML = question.visual || "";
  ngQuizOptions.innerHTML = question.options.map((option) => `<button type="button" data-quiz-answer="${option.value}">${option.label}</button>`).join("");
  setFeedback(ngQuizFeedback, "Waehle eine Antwort.", "warn");
  quizState.answered = false;
  ngQuizNext.disabled = true;
}

function answerQuiz(event) {
  const button = event.target.closest("button[data-quiz-answer]");
  if (!button || quizState.answered) return;
  const question = quizState.questions[quizState.index];
  const correct = button.dataset.quizAnswer === question.expected;
  quizState.answered = true;
  if (correct) quizState.correct += 1;
  ngQuizOptions.querySelectorAll("button").forEach((option) => {
    option.disabled = true;
    if (option.dataset.quizAnswer === question.expected) option.classList.add("correct");
  });
  if (!correct) button.classList.add("wrong");
  setFeedback(ngQuizFeedback, `${correct ? "Richtig." : "Noch nicht."} ${question.explanation}`, correct ? "good" : "bad");
  ngQuizScore.textContent = `${quizState.correct} / ${quizState.index + 1} richtig`;
  ngQuizNext.disabled = false;
}

function nextQuizQuestion() {
  if (!quizState.answered) return;
  quizState.index += 1;
  if (quizState.index >= quizState.questions.length) {
    const total = quizState.questions.length;
    ngQuizStatus.textContent = "Check abgeschlossen.";
    ngQuizScore.textContent = `${quizState.correct} / ${total} richtig`;
    ngQuizPrompt.textContent = "Auswertung";
    ngQuizVisual.innerHTML = "";
    ngQuizOptions.innerHTML = "";
    const message = quizState.correct >= 8
      ? "Sehr sicher: Nomen, Artikel und Faelle sitzen gut."
      : quizState.correct >= 5
        ? "Solide Grundlage: Wiederhole besonders Genus/Numerus oder Kasusfragen."
        : "Noch wackelig: Starte mit der Lernreise und waehle danach Basis-Uebungen.";
    setFeedback(ngQuizFeedback, message, quizState.correct >= 8 ? "good" : quizState.correct >= 5 ? "warn" : "bad");
    ngQuizNext.disabled = true;
    return;
  }
  renderQuizQuestion();
}

ngTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    ngTabButtons.forEach((tabButton) => tabButton.classList.remove("is-active"));
    ngTabPanels.forEach((panel) => panel.classList.remove("is-active"));
    button.classList.add("is-active");
    document.getElementById(`tab-${button.dataset.tab}`).classList.add("is-active");
  });
});

ngGraphicButtons.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-graphic-id]");
  if (button) setGraphic(button.dataset.graphicId);
});
ngScannerSentence.addEventListener("click", toggleScannerToken);
ngScannerCheck.addEventListener("click", checkScanner);
ngScannerNext.addEventListener("click", renderScanner);
ngNounCheck.addEventListener("click", checkNounCard);
ngNounNext.addEventListener("click", renderNounCard);
ngCaseOptions.addEventListener("click", answerCase);
ngCaseNext.addEventListener("click", renderCaseCard);
ngGenerate.addEventListener("click", buildTasks);
ngCheck.addEventListener("click", checkTasks);
ngReset.addEventListener("click", resetTasks);
ngQuizStart.addEventListener("click", startQuiz);
ngQuizNext.addEventListener("click", nextQuizQuestion);
ngQuizOptions.addEventListener("click", answerQuiz);

renderGraphics();
renderScanner();
renderNounCard();
renderCaseCard();
buildTasks();
