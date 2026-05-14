
const vzTabButtons = document.querySelectorAll(".vz-tab-btn");
const vzTabPanels = document.querySelectorAll(".vz-tab");
const vzGraphicButtons = document.getElementById("vzGraphicButtons");
const vzGraphicImage = document.getElementById("vzGraphicImage");
const vzGraphicKicker = document.getElementById("vzGraphicKicker");
const vzGraphicTitle = document.getElementById("vzGraphicTitle");
const vzGraphicText = document.getElementById("vzGraphicText");
const vzGraphicPrompt = document.getElementById("vzGraphicPrompt");
const vzScannerSentence = document.getElementById("vzScannerSentence");
const vzScannerCheck = document.getElementById("vzScannerCheck");
const vzScannerNext = document.getElementById("vzScannerNext");
const vzScannerFeedback = document.getElementById("vzScannerFeedback");
const vzConjCard = document.getElementById("vzConjCard");
const vzConjOptions = document.getElementById("vzConjOptions");
const vzConjNext = document.getElementById("vzConjNext");
const vzConjFeedback = document.getElementById("vzConjFeedback");
const vzTensePrompt = document.getElementById("vzTensePrompt");
const vzTenseSentence = document.getElementById("vzTenseSentence");
const vzTenseHint = document.getElementById("vzTenseHint");
const vzTenseOptions = document.getElementById("vzTenseOptions");
const vzTenseNext = document.getElementById("vzTenseNext");
const vzTenseFeedback = document.getElementById("vzTenseFeedback");
const vzDifficulty = document.getElementById("vzDifficulty");
const vzCount = document.getElementById("vzCount");
const vzTypeChecks = document.querySelectorAll(".vz-type-check");
const vzGenerate = document.getElementById("vzGenerate");
const vzCheck = document.getElementById("vzCheck");
const vzReset = document.getElementById("vzReset");
const vzTaskFeedback = document.getElementById("vzTaskFeedback");
const vzTaskList = document.getElementById("vzTaskList");
const vzQuizStart = document.getElementById("vzQuizStart");
const vzQuizNext = document.getElementById("vzQuizNext");
const vzQuizStatus = document.getElementById("vzQuizStatus");
const vzQuizScore = document.getElementById("vzQuizScore");
const vzQuizPrompt = document.getElementById("vzQuizPrompt");
const vzQuizVisual = document.getElementById("vzQuizVisual");
const vzQuizOptions = document.getElementById("vzQuizOptions");
const vzQuizFeedback = document.getElementById("vzQuizFeedback");

const graphics = [
  ["verbs", "Verben erkennen", "modul3-1-verben-erkennen.png", "Station 1", "Verben erkennen", "Suche nach Tunwoertern und Geschehenswoertern.", "Arbeitsauftrag: Erklaere, warum laeuft und regnet beides Verben sind."],
  ["conj", "Konjugieren", "modul3-2-konjugieren.png", "Station 2", "Personalformen bilden", "Verben veraendern sich je nach Person.", "Arbeitsauftrag: Konjugiere spielen fuer ich, du, er, wir."],
  ["tenses", "Zeitformen", "modul3-3-zeitformen.png", "Station 3", "Zeitformen verstehen", "Zeitformen zeigen, wann etwas passiert.", "Arbeitsauftrag: Ordne jetzt, gestern, schon und morgen passenden Zeitformen zu."],
  ["praesens", "Praesens", "modul3-4-praesens.png", "Station 4", "Praesens", "Praesens zeigt Gegenwart, Gewohnheit oder Allgemeines.", "Arbeitsauftrag: Finde zwei Signalwoerter fuer Praesens."],
  ["praet", "Praeteritum", "modul3-5-praeteritum.png", "Station 5", "Praeteritum", "Praeteritum erzaehlt von Vergangenem und steht oft in Geschichten.", "Arbeitsauftrag: Vergleiche spielte, ging und sah."],
  ["perfekt", "Perfekt", "modul3-6-perfekt.png", "Station 6", "Perfekt", "Perfekt besteht aus haben/sein und Partizip II.", "Arbeitsauftrag: Markiere Hilfsverb und Partizip II in: Ich bin gegangen."],
  ["futur", "Futur I", "modul3-7-futur.png", "Station 7", "Futur I", "Futur I besteht aus werden und Infinitiv.", "Arbeitsauftrag: Bilde Futur I mit lernen und wandern."],
  ["compare", "Vergleich", "modul3-8-vergleich.png", "Station 8", "Welche Zeitform passt?", "Signalwort, Bildung und Bedeutung helfen zusammen.", "Arbeitsauftrag: Entscheide: jeden Tag, gestern, morgen, im Gespraech."],
].map(([id, label, image, kicker, title, text, prompt]) => ({ id, label, image, kicker, title, text, prompt }));

const tenseLabels = { praesens: "Praesens", praeteritum: "Praeteritum", perfekt: "Perfekt", futur: "Futur I" };
const tenseHints = {
  praesens: "Passiert jetzt, regelmaessig oder allgemein.",
  praeteritum: "Vergangenheit, oft in Geschichten und Erzaehlungen.",
  perfekt: "Vergangenheit beim Sprechen: haben/sein + Partizip II.",
  futur: "Zukunft: werden + Infinitiv.",
};
const subjects = {
  ich: { label: "ich", werden: "werde", auxHaben: "habe", auxSein: "bin" },
  du: { label: "du", werden: "wirst", auxHaben: "hast", auxSein: "bist" },
  er: { label: "er", werden: "wird", auxHaben: "hat", auxSein: "ist" },
  wir: { label: "wir", werden: "werden", auxHaben: "haben", auxSein: "sind" },
  ihr: { label: "ihr", werden: "werdet", auxHaben: "habt", auxSein: "seid" },
  sie: { label: "sie", werden: "werden", auxHaben: "haben", auxSein: "sind" },
};
const verbBank = [
  { inf: "spielen", level: "basis", aux: "haben", part: "gespielt", pres: { ich: "spiele", du: "spielst", er: "spielt", wir: "spielen", ihr: "spielt", sie: "spielen" }, prat: { ich: "spielte", du: "spieltest", er: "spielte", wir: "spielten", ihr: "spieltet", sie: "spielten" } },
  { inf: "lernen", level: "basis", aux: "haben", part: "gelernt", pres: { ich: "lerne", du: "lernst", er: "lernt", wir: "lernen", ihr: "lernt", sie: "lernen" }, prat: { ich: "lernte", du: "lerntest", er: "lernte", wir: "lernten", ihr: "lerntet", sie: "lernten" } },
  { inf: "lachen", level: "basis", aux: "haben", part: "gelacht", pres: { ich: "lache", du: "lachst", er: "lacht", wir: "lachen", ihr: "lacht", sie: "lachen" }, prat: { ich: "lachte", du: "lachtest", er: "lachte", wir: "lachten", ihr: "lachtet", sie: "lachten" } },
  { inf: "gehen", level: "basis", aux: "sein", part: "gegangen", pres: { ich: "gehe", du: "gehst", er: "geht", wir: "gehen", ihr: "geht", sie: "gehen" }, prat: { ich: "ging", du: "gingst", er: "ging", wir: "gingen", ihr: "gingt", sie: "gingen" } },
  { inf: "laufen", level: "standard", aux: "sein", part: "gelaufen", pres: { ich: "laufe", du: "laeufst", er: "laeuft", wir: "laufen", ihr: "lauft", sie: "laufen" }, prat: { ich: "lief", du: "liefst", er: "lief", wir: "liefen", ihr: "lieft", sie: "liefen" } },
  { inf: "sehen", level: "standard", aux: "haben", part: "gesehen", pres: { ich: "sehe", du: "siehst", er: "sieht", wir: "sehen", ihr: "seht", sie: "sehen" }, prat: { ich: "sah", du: "sahst", er: "sah", wir: "sahen", ihr: "saht", sie: "sahen" } },
  { inf: "lesen", level: "standard", aux: "haben", part: "gelesen", pres: { ich: "lese", du: "liest", er: "liest", wir: "lesen", ihr: "lest", sie: "lesen" }, prat: { ich: "las", du: "last", er: "las", wir: "lasen", ihr: "last", sie: "lasen" } },
  { inf: "schreiben", level: "standard", aux: "haben", part: "geschrieben", pres: { ich: "schreibe", du: "schreibst", er: "schreibt", wir: "schreiben", ihr: "schreibt", sie: "schreiben" }, prat: { ich: "schrieb", du: "schriebst", er: "schrieb", wir: "schrieben", ihr: "schriebt", sie: "schrieben" } },
  { inf: "schwimmen", level: "profi", aux: "sein", part: "geschwommen", pres: { ich: "schwimme", du: "schwimmst", er: "schwimmt", wir: "schwimmen", ihr: "schwimmt", sie: "schwimmen" }, prat: { ich: "schwamm", du: "schwammst", er: "schwamm", wir: "schwammen", ihr: "schwammt", sie: "schwammen" } },
  { inf: "essen", level: "profi", aux: "haben", part: "gegessen", pres: { ich: "esse", du: "isst", er: "isst", wir: "essen", ihr: "esst", sie: "essen" }, prat: { ich: "ass", du: "assest", er: "ass", wir: "assen", ihr: "asst", sie: "assen" } },
];

const scannerSentences = [
  { level: "basis", tokens: [["Mia", "other"], ["spielt", "verb"], ["im", "other"], ["Garten", "other"], ["und", "other"], ["lacht", "verb"]] },
  { level: "basis", tokens: [["Der", "other"], ["Hund", "other"], ["laeuft", "verb"], ["schnell", "other"], ["nach", "other"], ["Hause", "other"]] },
  { level: "standard", tokens: [["Ich", "other"], ["habe", "verb"], ["ein", "other"], ["Buch", "other"], ["gelesen", "verb"]] },
  { level: "standard", tokens: [["Morgen", "signal"], ["wird", "verb"], ["Mia", "other"], ["ein", "other"], ["Buch", "other"], ["lesen", "verb"]] },
  { level: "standard", tokens: [["Frueher", "signal"], ["spielte", "verb"], ["Mia", "other"], ["oft", "signal"], ["draussen", "other"]] },
  { level: "profi", tokens: [["Wir", "other"], ["sind", "verb"], ["gestern", "signal"], ["zum", "other"], ["See", "other"], ["geschwommen", "verb"]] },
];

const tenseSentences = [
  { level: "basis", tense: "praesens", hint: "Signalwort: heute. Eine Gegenwartsform.", tokens: [["Heute", "signal"], ["spiele", "verb"], ["ich", "other"], ["im", "other"], ["Garten", "other"]] },
  { level: "basis", tense: "praeteritum", hint: "Signalwort: gestern. Eine einfache Vergangenheitsform.", tokens: [["Gestern", "signal"], ["spielte", "verb"], ["ich", "other"], ["im", "other"], ["Garten", "other"]] },
  { level: "basis", tense: "futur", hint: "werden + Infinitiv zeigt Zukunft.", tokens: [["Morgen", "signal"], ["werde", "verb"], ["ich", "other"], ["lernen", "verb"]] },
  { level: "standard", tense: "perfekt", hint: "habe + Partizip II.", tokens: [["Ich", "other"], ["habe", "verb"], ["ein", "other"], ["Buch", "other"], ["gelesen", "verb"]] },
  { level: "standard", tense: "perfekt", hint: "bin + Partizip II, oft bei Bewegung.", tokens: [["Mia", "other"], ["ist", "verb"], ["nach", "other"], ["Hause", "other"], ["gegangen", "verb"]] },
  { level: "standard", tense: "praeteritum", hint: "ging ist Praeteritum von gehen.", tokens: [["Der", "other"], ["Junge", "other"], ["ging", "verb"], ["schnell", "other"], ["nach", "other"], ["Hause", "other"]] },
  { level: "profi", tense: "futur", hint: "wird + Infinitiv.", tokens: [["Bald", "signal"], ["wird", "verb"], ["es", "other"], ["regnen", "verb"]] },
];
const signalWords = [
  { signal: "heute", tense: "praesens" }, { signal: "jetzt", tense: "praesens" }, { signal: "jeden Tag", tense: "praesens" },
  { signal: "gestern", tense: "praeteritum" }, { signal: "frueher", tense: "praeteritum" }, { signal: "damals", tense: "praeteritum" },
  { signal: "schon", tense: "perfekt" }, { signal: "gerade", tense: "perfekt" }, { signal: "eben", tense: "perfekt" },
  { signal: "morgen", tense: "futur" }, { signal: "bald", tense: "futur" }, { signal: "naechste Woche", tense: "futur" },
];
const typeLabels = { findVerb: "Verben finden", infinitive: "Grundform", conjugate: "Konjugieren", agreement: "Verbform", tenseName: "Zeitform", signal: "Signalwort", praeteritum: "Praeteritum", perfekt: "Perfekt", futur: "Futur I", transform: "Umformen" };
let currentScanner = null;
let currentConj = null;
let currentTense = null;
let generatedTasks = [];
const quizState = { questions: [], index: 0, correct: 0, answered: false };
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function choice(items) { return items[randomInt(0, items.length - 1)]; }
function shuffle(items) { const copy = [...items]; for (let i = copy.length - 1; i > 0; i -= 1) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; }
function levelRank(level) { return { basis: 1, standard: 2, profi: 3 }[level] || 2; }
function matchesLevel(item, level) { return levelRank(item.level || "basis") <= levelRank(level); }
function verbPool(level = vzDifficulty.value || "standard") { return verbBank.filter((verb) => matchesLevel(verb, level)); }
function setFeedback(el, text, tone) { el.textContent = text; el.className = `vz-feedback ${tone || ""}`.trim(); }
function normalizeAnswer(value) { return value.trim().toLowerCase().replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue").replace(/ß/g,"ss").replace(/[.!?]/g,"").replace(/\s+/g," "); }
function renderTokens(tokens, selectable = false) { return tokens.map((token, index) => { const [word, kind] = token; const classes = ["vz-token", kind === "verb" ? "verb" : kind === "signal" ? "signal" : kind === "help" ? "help" : ""].filter(Boolean).join(" "); return selectable ? `<button type="button" class="${classes}" data-token-index="${index}">${word}</button>` : `<span class="${classes}">${word}</span>`; }).join(""); }
function tenseOptions() { return Object.entries(tenseLabels).map(([value, label]) => ({ value, label })); }
function formFor(verb, subject, tense) { if (tense === "praesens") return verb.pres[subject]; if (tense === "praeteritum") return verb.prat[subject]; if (tense === "perfekt") return `${subjects[subject][verb.aux === "sein" ? "auxSein" : "auxHaben"]} ${verb.part}`; return `${subjects[subject].werden} ${verb.inf}`; }
function optionsFrom(items) { return items.map((item) => typeof item === "string" ? { value: item, label: item } : item); }
function makeChoiceTask(type, title, prompt, visual, options, expected, explanation) { return { type, title, prompt, visual, mode: "choice", options: optionsFrom(options), expected, explanation }; }
function makeTextTask(type, title, prompt, visual, expected, explanation) { return { type, title, prompt, visual, mode: "text", expected, check: (answer) => normalizeAnswer(answer) === normalizeAnswer(expected), explanation }; }

function renderGraphics() { vzGraphicButtons.innerHTML = graphics.map((graphic) => `<button type="button" data-graphic-id="${graphic.id}">${graphic.label}</button>`).join(""); setGraphic("verbs"); }
function setGraphic(id) { const graphic = graphics.find((item) => item.id === id) || graphics[0]; vzGraphicImage.src = graphic.image; vzGraphicKicker.textContent = graphic.kicker; vzGraphicTitle.textContent = graphic.title; vzGraphicText.textContent = graphic.text; vzGraphicPrompt.textContent = graphic.prompt; vzGraphicButtons.querySelectorAll("button").forEach((button) => button.classList.toggle("is-active", button.dataset.graphicId === id)); }

function renderScanner() { currentScanner = choice(scannerSentences.filter((item) => matchesLevel(item, vzDifficulty.value || "standard"))); vzScannerSentence.innerHTML = renderTokens(currentScanner.tokens, true); setFeedback(vzScannerFeedback, "Klicke alle Verbformen an. Bei Perfekt und Futur I sind es zwei Teile.", "warn"); }
function toggleScannerToken(event) { const token = event.target.closest("button[data-token-index]"); if (!token) return; token.classList.toggle("selected"); token.classList.remove("correct", "wrong"); }
function checkScanner() { let correct = 0; let total = 0; vzScannerSentence.querySelectorAll("button[data-token-index]").forEach((button) => { const index = Number(button.dataset.tokenIndex); const isVerb = currentScanner.tokens[index][1] === "verb"; const selected = button.classList.contains("selected"); button.classList.remove("correct", "wrong"); if (isVerb) total += 1; if (selected && isVerb) { correct += 1; button.classList.add("correct"); } else if (selected || isVerb) { button.classList.add("wrong"); } }); const wrongSelected = vzScannerSentence.querySelectorAll(".wrong.selected").length; const ok = correct === total && wrongSelected === 0; setFeedback(vzScannerFeedback, ok ? "Treffer: alle Verben gefunden." : `Gefunden: ${correct} von ${total}. Frage: Was tut jemand? Was geschieht?`, ok ? "good" : "bad"); }

function makeConjCard() { const verb = choice(verbPool()); const subject = choice(Object.keys(subjects)); return { verb, subject, expected: verb.pres[subject] }; }
function renderConjCard() { currentConj = makeConjCard(); const { verb, subject } = currentConj; vzConjCard.innerHTML = `<div><strong>${subjects[subject].label} ___</strong><span>Grundform: ${verb.inf}</span></div>`; const wrong = shuffle(Object.values(verb.pres).filter((form) => form !== currentConj.expected)); const options = shuffle([currentConj.expected, ...wrong.slice(0, 3)]); vzConjOptions.innerHTML = options.map((option) => `<button type="button" data-conj-answer="${option}">${option}</button>`).join(""); setFeedback(vzConjFeedback, "Welche Personalform passt?", "warn"); }
function answerConj(event) { const button = event.target.closest("button[data-conj-answer]"); if (!button) return; const ok = button.dataset.conjAnswer === currentConj.expected; vzConjOptions.querySelectorAll("button").forEach((option) => { option.disabled = true; if (option.dataset.conjAnswer === currentConj.expected) option.classList.add("correct"); }); if (!ok) button.classList.add("wrong"); setFeedback(vzConjFeedback, ok ? "Richtig konjugiert." : `Noch einmal: ${subjects[currentConj.subject].label} ${currentConj.expected}.`, ok ? "good" : "bad"); }

function renderTenseCard() { currentTense = choice(tenseSentences.filter((item) => matchesLevel(item, vzDifficulty.value || "standard"))); vzTensePrompt.textContent = "Welche Zeitform hat dieser Satz?"; vzTenseSentence.innerHTML = renderTokens(currentTense.tokens); vzTenseHint.textContent = "Tipp: Achte auf Signalwort und Verbform."; vzTenseOptions.innerHTML = tenseOptions().map((option) => `<button type="button" data-tense-answer="${option.value}">${option.label}</button>`).join(""); setFeedback(vzTenseFeedback, "Waehle eine Zeitform.", "warn"); }
function answerTense(event) { const button = event.target.closest("button[data-tense-answer]"); if (!button) return; const ok = button.dataset.tenseAnswer === currentTense.tense; vzTenseOptions.querySelectorAll("button").forEach((option) => { option.disabled = true; if (option.dataset.tenseAnswer === currentTense.tense) option.classList.add("correct"); }); if (!ok) button.classList.add("wrong"); vzTenseHint.textContent = currentTense.hint; setFeedback(vzTenseFeedback, ok ? "Richtig erkannt." : `Loesung: ${tenseLabels[currentTense.tense]}.`, ok ? "good" : "bad"); }
function selectedTypes() { const types = [...vzTypeChecks].filter((input) => input.checked).map((input) => input.value); return types.length ? types : ["findVerb", "conjugate", "tenseName"]; }
function taskFindVerb(level) { const sentence = choice(scannerSentences.filter((item) => matchesLevel(item, level))); const verbs = sentence.tokens.filter((token) => token[1] === "verb").map((token) => token[0]).join(", "); return makeTextTask("findVerb", "Verben finden", "Welche Verbform(en) stehen im Satz? Schreibe sie mit Komma getrennt ab.", `<div class="vz-token-row">${renderTokens(sentence.tokens)}</div>`, verbs, `Verbform(en): ${verbs}.`); }
function taskInfinitive(level) { const verb = choice(verbPool(level)); const subject = choice(Object.keys(subjects)); const form = choice([verb.pres[subject], verb.prat[subject], verb.part]); const wrong = shuffle(verbPool(level).filter((item) => item.inf !== verb.inf)).slice(0, 3).map((item) => item.inf); return makeChoiceTask("infinitive", "Grundform erkennen", `Welche Grundform gehoert zu "${form}"?`, `<div class="vz-token-row"><span class="vz-token verb">${form}</span></div>`, [verb.inf, ...wrong], verb.inf, `${form} gehoert zu ${verb.inf}.`); }
function taskConjugate(level) { const verb = choice(verbPool(level)); const subject = choice(Object.keys(subjects)); return makeTextTask("conjugate", "Konjugieren", `Setze ins Praesens: ${subjects[subject].label} ___ (${verb.inf})`, `<div class="vz-token-row"><span class="vz-token help">${subjects[subject].label}</span><span class="vz-token target">___</span></div>`, verb.pres[subject], `${subjects[subject].label} ${verb.pres[subject]}.`); }
function taskAgreement(level) { const verb = choice(verbPool(level)); const subject = choice(Object.keys(subjects)); const wrong = shuffle(Object.values(verb.pres).filter((form) => form !== verb.pres[subject])); return makeChoiceTask("agreement", "Passende Verbform", `Welche Form passt zu "${subjects[subject].label}"?`, `<div class="vz-token-row"><span class="vz-token help">${subjects[subject].label}</span><span class="vz-token target">?</span></div>`, [verb.pres[subject], ...wrong.slice(0, 3)], verb.pres[subject], `Subjekt und Verb muessen passen: ${subjects[subject].label} ${verb.pres[subject]}.`); }
function taskTenseName(level) { const item = choice(tenseSentences.filter((sentence) => matchesLevel(sentence, level))); return makeChoiceTask("tenseName", "Zeitform erkennen", "Welche Zeitform hat der Satz?", `<div class="vz-token-row">${renderTokens(item.tokens)}</div>`, tenseOptions(), item.tense, `${tenseLabels[item.tense]}: ${item.hint}`); }
function taskSignal() { const item = choice(signalWords); return makeChoiceTask("signal", "Signalwort zuordnen", `Zu welcher Zeitform passt das Signalwort "${item.signal}" am besten?`, `<div class="vz-token-row"><span class="vz-token signal">${item.signal}</span></div>`, tenseOptions(), item.tense, `${item.signal} passt hier zu ${tenseLabels[item.tense]}.`); }
function taskPraeteritum(level) { const verb = choice(verbPool(level)); const subject = choice(Object.keys(subjects)); return makeTextTask("praeteritum", "Praeteritum bilden", `Setze ins Praeteritum: ${subjects[subject].label} ___ (${verb.inf})`, `<div class="vz-token-row"><span class="vz-token signal">gestern</span><span class="vz-token help">${subjects[subject].label}</span><span class="vz-token target">___</span></div>`, verb.prat[subject], `${subjects[subject].label} ${verb.prat[subject]}.`); }
function taskPerfekt(level) { const verb = choice(verbPool(level)); const subject = choice(Object.keys(subjects)); const expected = formFor(verb, subject, "perfekt"); return makeTextTask("perfekt", "Perfekt bilden", `Bilde das Perfekt: ${subjects[subject].label} ___ (${verb.inf})`, `<div class="vz-token-row"><span class="vz-token help">haben/sein</span><span class="vz-token">+</span><span class="vz-token verb">Partizip II</span></div>`, expected, `${expected}: ${verb.aux} + ${verb.part}.`); }
function taskFutur(level) { const verb = choice(verbPool(level)); const subject = choice(Object.keys(subjects)); const expected = formFor(verb, subject, "futur"); return makeTextTask("futur", "Futur I bilden", `Bilde das Futur I: ${subjects[subject].label} ___ (${verb.inf})`, `<div class="vz-token-row"><span class="vz-token help">werden</span><span class="vz-token">+</span><span class="vz-token verb">Infinitiv</span></div>`, expected, `${expected}: werden + Infinitiv.`); }
function taskTransform(level) { const verb = choice(verbPool(level)); const subject = choice(Object.keys(subjects)); const target = choice(["praesens", "praeteritum", "perfekt", "futur"]); const expected = `${subjects[subject].label} ${formFor(verb, subject, target)}`; return makeTextTask("transform", "Satz umformen", `Forme um in ${tenseLabels[target]}: ${subjects[subject].label} ${verb.pres[subject]}.`, `<div class="vz-token-row"><span class="vz-token target">${tenseLabels[target]}</span><span class="vz-token verb">${verb.inf}</span></div>`, expected, `Moegliche Loesung: ${expected}.`); }
const taskBuilders = { findVerb: taskFindVerb, infinitive: taskInfinitive, conjugate: taskConjugate, agreement: taskAgreement, tenseName: taskTenseName, signal: taskSignal, praeteritum: taskPraeteritum, perfekt: taskPerfekt, futur: taskFutur, transform: taskTransform };

function buildTasks() { const level = vzDifficulty.value; const count = Number(vzCount.value); const types = selectedTypes(); generatedTasks = Array.from({ length: count }, (_, index) => taskBuilders[types[index % types.length]](level)); generatedTasks = shuffle(generatedTasks); renderTasks(); setFeedback(vzTaskFeedback, `${generatedTasks.length} neue Aufgaben erstellt.`, "good"); }
function renderAnswer(task, index) { if (task.mode === "choice") { const options = shuffle(task.options).map((option) => `<option value="${option.value}">${option.label}</option>`).join(""); return `<label>Deine Antwort<select data-task-index="${index}"><option value="">Bitte waehlen</option>${options}</select></label>`; } return `<label>Deine Antwort<input type="text" data-task-index="${index}" autocomplete="off" placeholder="Antwort eingeben"></label>`; }
function renderTasks() { vzTaskList.innerHTML = generatedTasks.map((task, index) => `<article class="vz-task" data-task-card="${index}"><div class="vz-task-head"><div><h3>${index + 1}. ${task.title}</h3><p>${task.prompt}</p></div><span class="vz-task-type">${typeLabels[task.type]}</span></div><div class="vz-task-visual">${task.visual}</div><div class="vz-task-answer">${renderAnswer(task, index)}</div><div class="vz-task-result" data-task-result="${index}">Noch nicht geprueft.</div></article>`).join(""); }
function checkTask(task, answer) { if (task.type === "findVerb") { const expected = normalizeAnswer(task.expected).split(/[,;]+/).map((item) => item.trim()).sort().join("|"); const actual = normalizeAnswer(answer).split(/[,;]+/).map((item) => item.trim()).filter(Boolean).sort().join("|"); return expected === actual; } if (typeof task.check === "function") return task.check(answer); return answer === task.expected; }
function checkTasks() { if (!generatedTasks.length) { setFeedback(vzTaskFeedback, "Erstelle zuerst eine Runde.", "warn"); return; } let correct = 0; generatedTasks.forEach((task, index) => { const card = vzTaskList.querySelector(`[data-task-card="${index}"]`); const result = vzTaskList.querySelector(`[data-task-result="${index}"]`); const input = vzTaskList.querySelector(`[data-task-index="${index}"]`); const ok = checkTask(task, input.value); card.classList.remove("is-correct", "is-wrong"); card.classList.add(ok ? "is-correct" : "is-wrong"); if (ok) correct += 1; result.textContent = `${ok ? "Richtig." : `Loesung: ${task.expected}.`} ${task.explanation}`; }); const tone = correct === generatedTasks.length ? "good" : correct >= Math.ceil(generatedTasks.length * .65) ? "warn" : "bad"; setFeedback(vzTaskFeedback, `${correct} von ${generatedTasks.length} Aufgaben richtig.`, tone); }
function resetTasks() { vzTaskList.querySelectorAll("select,input").forEach((input) => { input.value = ""; }); vzTaskList.querySelectorAll(".vz-task").forEach((task) => task.classList.remove("is-correct", "is-wrong")); vzTaskList.querySelectorAll("[data-task-result]").forEach((result) => { result.textContent = "Noch nicht geprueft."; }); setFeedback(vzTaskFeedback, "Eingaben geleert.", "warn"); }
function wrongTextOptions(task) {
  if (["perfekt", "futur", "transform"].includes(task.type)) return ["ich spielte", "ich habe gespielt", "ich werde spielen", "ich spiele"].filter((item) => normalizeAnswer(item) !== normalizeAnswer(task.expected));
  if (task.type === "praeteritum") return ["spielte", "ging", "sah", "lernte"].filter((item) => item !== task.expected);
  return ["spiele", "spielst", "spielt", "spielen"].filter((item) => item !== task.expected);
}
function makeQuizQuestions() {
  const level = vzDifficulty.value || "standard";
  return shuffle([taskTenseName(level), taskSignal(), taskAgreement(level), taskInfinitive(level), taskPraeteritum(level), taskPerfekt(level), taskFutur(level), taskTransform(level), taskTenseName(level), taskAgreement(level), taskPerfekt(level), taskSignal()]).slice(0, 10).map((task) => {
    if (task.mode === "text") {
      const wrong = shuffle(wrongTextOptions(task)).slice(0, 3);
      return { ...task, mode: "choice", options: optionsFrom(shuffle([task.expected, ...wrong])), check: undefined };
    }
    return task;
  });
}
function startQuiz() { quizState.questions = makeQuizQuestions(); quizState.index = 0; quizState.correct = 0; quizState.answered = false; vzQuizNext.disabled = true; renderQuizQuestion(); }
function renderQuizQuestion() { const q = quizState.questions[quizState.index]; vzQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`; vzQuizScore.textContent = `${quizState.correct} / ${quizState.index} richtig`; vzQuizPrompt.textContent = q.prompt; vzQuizPrompt.classList.add("is-visible"); vzQuizVisual.innerHTML = q.visual || ""; vzQuizOptions.innerHTML = shuffle(q.options).map((option) => `<button type="button" data-quiz-answer="${option.value}">${option.label}</button>`).join(""); setFeedback(vzQuizFeedback, "Waehle eine Antwort.", "warn"); quizState.answered = false; vzQuizNext.disabled = true; }
function answerQuiz(event) { const button = event.target.closest("button[data-quiz-answer]"); if (!button || quizState.answered) return; const q = quizState.questions[quizState.index]; const ok = normalizeAnswer(button.dataset.quizAnswer) === normalizeAnswer(q.expected); quizState.answered = true; if (ok) quizState.correct += 1; vzQuizOptions.querySelectorAll("button").forEach((option) => { option.disabled = true; if (normalizeAnswer(option.dataset.quizAnswer) === normalizeAnswer(q.expected)) option.classList.add("correct"); }); if (!ok) button.classList.add("wrong"); setFeedback(vzQuizFeedback, `${ok ? "Richtig." : "Noch nicht."} ${q.explanation}`, ok ? "good" : "bad"); vzQuizScore.textContent = `${quizState.correct} / ${quizState.index + 1} richtig`; vzQuizNext.disabled = false; }
function nextQuizQuestion() { if (!quizState.answered) return; quizState.index += 1; if (quizState.index >= quizState.questions.length) { const total = quizState.questions.length; vzQuizStatus.textContent = "Check abgeschlossen."; vzQuizScore.textContent = `${quizState.correct} / ${total} richtig`; vzQuizPrompt.textContent = "Auswertung"; vzQuizVisual.innerHTML = ""; vzQuizOptions.innerHTML = ""; const message = quizState.correct >= 8 ? "Sehr sicher: Verben und Zeitformen sitzen gut." : quizState.correct >= 5 ? "Solide Basis: Wiederhole besonders die falschen Zeitformen." : "Noch wackelig: Starte mit der Lernreise und Basis-Uebungen."; setFeedback(vzQuizFeedback, message, quizState.correct >= 8 ? "good" : quizState.correct >= 5 ? "warn" : "bad"); vzQuizNext.disabled = true; return; } renderQuizQuestion(); }

vzTabButtons.forEach((button) => button.addEventListener("click", () => { vzTabButtons.forEach((tabButton) => tabButton.classList.remove("is-active")); vzTabPanels.forEach((panel) => panel.classList.remove("is-active")); button.classList.add("is-active"); document.getElementById(`tab-${button.dataset.tab}`).classList.add("is-active"); }));
vzGraphicButtons.addEventListener("click", (event) => { const button = event.target.closest("button[data-graphic-id]"); if (button) setGraphic(button.dataset.graphicId); });
vzScannerSentence.addEventListener("click", toggleScannerToken);
vzScannerCheck.addEventListener("click", checkScanner);
vzScannerNext.addEventListener("click", renderScanner);
vzConjOptions.addEventListener("click", answerConj);
vzConjNext.addEventListener("click", renderConjCard);
vzTenseOptions.addEventListener("click", answerTense);
vzTenseNext.addEventListener("click", renderTenseCard);
vzGenerate.addEventListener("click", buildTasks);
vzCheck.addEventListener("click", checkTasks);
vzReset.addEventListener("click", resetTasks);
vzQuizStart.addEventListener("click", startQuiz);
vzQuizNext.addEventListener("click", nextQuizQuestion);
vzQuizOptions.addEventListener("click", answerQuiz);

renderGraphics();
renderScanner();
renderConjCard();
renderTenseCard();
buildTasks();
