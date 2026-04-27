const tabButtons = document.querySelectorAll(".bde-tab-btn");
const tabPanels = document.querySelectorAll(".bde-tab");

const stepButtons = document.querySelectorAll(".bde-step-btn");
const stepTitle = document.getElementById("bdeStepTitle");
const stepText = document.getElementById("bdeStepText");
const stepChecklist = document.getElementById("bdeStepChecklist");

const orderTask = document.getElementById("bdeOrderTask");
const orderReset = document.getElementById("bdeOrderReset");
const orderCheck = document.getElementById("bdeOrderCheck");
const orderFeedback = document.getElementById("bdeOrderFeedback");

const builderSubject = document.getElementById("bdeBuilderSubject");
const builderVerb = document.getElementById("bdeBuilderVerb");
const builderTime = document.getElementById("bdeBuilderTime");
const builderReason = document.getElementById("bdeBuilderReason");
const builderSentence = document.getElementById("bdeBuilderSentence");
const builderUseGenerated = document.getElementById("bdeBuilderUseGenerated");
const builderInput = document.getElementById("bdeBuilderInput");
const builderCheck = document.getElementById("bdeBuilderCheck");
const builderReset = document.getElementById("bdeBuilderReset");
const builderFeedback = document.getElementById("bdeBuilderFeedback");

const caseAFields = document.getElementById("bdeCaseAFields");
const caseACheck = document.getElementById("bdeCaseACheck");
const caseAReset = document.getElementById("bdeCaseAReset");
const caseAModelToggle = document.getElementById("bdeCaseAModelToggle");
const caseAFeedback = document.getElementById("bdeCaseAFeedback");
const caseAModel = document.getElementById("bdeCaseAModel");

const caseBFields = document.getElementById("bdeCaseBFields");
const caseBCheck = document.getElementById("bdeCaseBCheck");
const caseBReset = document.getElementById("bdeCaseBReset");
const caseBModelToggle = document.getElementById("bdeCaseBModelToggle");
const caseBFeedback = document.getElementById("bdeCaseBFeedback");
const caseBModel = document.getElementById("bdeCaseBModel");

const testStart = document.getElementById("bdeTestStart");
const testNext = document.getElementById("bdeTestNext");
const testScore = document.getElementById("bdeTestScore");
const testStatus = document.getElementById("bdeTestStatus");
const testPrompt = document.getElementById("bdeTestPrompt");
const testAnswers = document.getElementById("bdeTestAnswers");
const testFeedback = document.getElementById("bdeTestFeedback");

const stepInfo = {
  "1": {
    title: "1 Einleitung - Was sehe ich?",
    text: "Beginne mit den Grunddaten des Diagramms. Du nennst Diagrammtyp, Thema und die beiden Achsen mit Einheit.",
    checklist: [
      "Diagrammtyp nennen (z. B. Liniendiagramm).",
      "Thema in einem Satz nennen.",
      "x-Achse und y-Achse mit Einheit korrekt benennen.",
    ],
  },
  "2": {
    title: "2 Beschreibung - Was passiert?",
    text: "Beschreibe nur beobachtbare Verlaeufe. Noch keine Ursachen nennen. Arbeite entlang der Zeitachse.",
    checklist: [
      "Wichtige Veraenderungen nennen: steigt, sinkt, bleibt konstant.",
      "Sinnvolle Zeitpunkte oder Zeitraeume einbauen.",
      "Werte ungefaehr nennen (z. B. etwa 35 C).",
    ],
  },
  "3": {
    title: "3 Deutung/Erklaerung - Warum so?",
    text: "Hier kommt dein Fachwissen. Erklaere Ursachen und biologische Zusammenhaenge, die den Verlauf begruenden.",
    checklist: [
      "Fachbegriffe nutzen (z. B. Winterschlaf, Winterruhe, wechselwarm).",
      "Ursache-Wirkung ausdruecken (weil, deshalb, dadurch).",
      "Unterschiede zwischen Tieren klar herausarbeiten.",
    ],
  },
  "4": {
    title: "4 Fazit - Was ist die Kernaussage?",
    text: "Zum Schluss fasst du die Hauptaussage in 1 bis 2 Saetzen zusammen.",
    checklist: [
      "Kernaussage klar und kurz formulieren.",
      "Wichtigsten Unterschied oder Zusammenhang nennen.",
      "Nicht neue Details einfuehren.",
    ],
  },
};

const orderStatements = [
  {
    text: "Du nennst Diagrammtyp, Thema und Achsen mit Einheit.",
    order: 1,
  },
  {
    text: "Du beschreibst den Verlauf der Kurven sachlich entlang der Zeitachse.",
    order: 2,
  },
  {
    text: "Du erklaerst den Verlauf mit Fachwissen und Ursache-Wirkung.",
    order: 3,
  },
  {
    text: "Du formulierst die Kernaussage als kurzes Fazit.",
    order: 4,
  },
];

const builderData = {
  subjects: [
    "Die Koerpertemperatur des Igels",
    "Die Kurve des Frosches",
    "Die rote Linie (Eichhoernchen)",
    "Die gruene Linie (Eidechse)",
  ],
  verbs: [
    "steigt deutlich",
    "sinkt stark",
    "bleibt nahezu konstant",
    "veraendert sich nur wenig",
  ],
  times: [
    "von Oktober bis Dezember",
    "im Winterhalbjahr",
    "zwischen Maerz und Juni",
    "von August bis Juli",
  ],
  reasons: [
    "ohne Erklaerung",
    "weil das Tier Energie spart",
    "weil das Tier im Winter kaum aktiv ist",
    "deshalb passt sich das Tier an die Jahreszeit an",
  ],
};

const writingSteps = [
  {
    key: "intro",
    title: "1 Einleitung",
    prompt: "Nenne Diagrammtyp, Thema und Achsen mit Einheit.",
  },
  {
    key: "describe",
    title: "2 Beschreibung",
    prompt: "Beschreibe den Verlauf sachlich von links nach rechts.",
  },
  {
    key: "explain",
    title: "3 Erklaerung",
    prompt: "Erklaere den Verlauf mit Fachwissen.",
  },
  {
    key: "conclusion",
    title: "4 Fazit",
    prompt: "Formuliere die Kernaussage in 1 bis 2 Saetzen.",
  },
];

const trainingData = {
  caseA: {
    fieldsNode: caseAFields,
    feedbackNode: caseAFeedback,
    modelNode: caseAModel,
    modelToggle: caseAModelToggle,
    resetBtn: caseAReset,
    checkBtn: caseACheck,
    rules: {
      intro: {
        minWords: 14,
        groups: [
          ["liniendiagramm", "diagramm"],
          ["x-achse", "monate", "monat"],
          ["y-achse", "koerpertemperatur", "c"],
        ],
        labels: [
          "Diagrammtyp fehlt.",
          "x-Achse oder Zeitangabe fehlt.",
          "y-Achse mit Einheit fehlt.",
        ],
      },
      describe: {
        minWords: 18,
        groups: [
          ["igel"],
          ["eichhoernchen"],
          ["steigt", "sinkt", "konstant", "bleibt"],
          ["winter", "dezember", "januar", "februar"],
        ],
        labels: [
          "Igel wurde nicht klar beschrieben.",
          "Eichhoernchen wurde nicht klar beschrieben.",
          "Verlaufswoerter fehlen (steigt/sinkt/bleibt).",
          "Ein saisonaler oder zeitlicher Bezug fehlt.",
        ],
      },
      explain: {
        minWords: 16,
        groups: [
          ["winterschlaf"],
          ["winterruhe", "aktiv"],
          ["energie", "nahrung"],
        ],
        labels: [
          "Der Begriff Winterschlaf fehlt.",
          "Winterruhe oder Aktivitaet des Eichhoernchens fehlt.",
          "Ursache (Energie/Nahrung) fehlt.",
        ],
      },
      conclusion: {
        minWords: 12,
        groups: [
          ["unterschied", "zeigt", "fazit"],
          ["igel"],
          ["eichhoernchen"],
        ],
        labels: [
          "Die Kernaussage ist nicht eindeutig.",
          "Igel wird im Fazit nicht genannt.",
          "Eichhoernchen wird im Fazit nicht genannt.",
        ],
      },
    },
    model: {
      intro:
        "Das Liniendiagramm zeigt die Koerpertemperatur von Igel und Eichhoernchen im Jahresverlauf. Auf der x-Achse stehen die Monate, auf der y-Achse die Koerpertemperatur in C.",
      describe:
        "Beim Igel sinkt die Temperatur vom Herbst bis in den Winter stark ab und bleibt dort sehr niedrig. Ab dem Fruehling steigt sie wieder deutlich an. Beim Eichhoernchen bleibt die Temperatur fast das ganze Jahr ueber relativ konstant.",
      explain:
        "Der Igel haelt Winterschlaf. Deshalb werden Koerperfunktionen stark heruntergefahren, um Energie zu sparen. Das Eichhoernchen haelt Winterruhe und bleibt zwischendurch aktiv, wodurch die Koerpertemperatur weniger absinkt.",
      conclusion:
        "Das Diagramm zeigt einen klaren Unterschied in der Ueberwinterungsstrategie: Der Igel spart Energie durch tiefen Winterschlaf, das Eichhoernchen bleibt deutlich aktiver.",
    },
  },
  caseB: {
    fieldsNode: caseBFields,
    feedbackNode: caseBFeedback,
    modelNode: caseBModel,
    modelToggle: caseBModelToggle,
    resetBtn: caseBReset,
    checkBtn: caseBCheck,
    rules: {
      intro: {
        minWords: 14,
        groups: [
          ["liniendiagramm", "diagramm"],
          ["x-achse", "monat", "monate"],
          ["y-achse", "koerpertemperatur", "c"],
        ],
        labels: [
          "Diagrammtyp fehlt.",
          "x-Achse oder Zeitangabe fehlt.",
          "y-Achse mit Einheit fehlt.",
        ],
      },
      describe: {
        minWords: 18,
        groups: [
          ["frosch"],
          ["eidechse"],
          ["steigt", "sinkt", "konstant", "bleibt"],
          ["sommer", "winter", "fruehling", "herbst"],
        ],
        labels: [
          "Frosch wurde nicht klar beschrieben.",
          "Eidechse wurde nicht klar beschrieben.",
          "Verlaufswoerter fehlen.",
          "Jahreszeitenbezug fehlt.",
        ],
      },
      explain: {
        minWords: 16,
        groups: [
          ["wechselwarm", "ektotherm"],
          ["waermestarre", "winterruhe", "ueberwinterung"],
          ["energie", "anpassung", "umgebung"],
        ],
        labels: [
          "Der Zusammenhang mit wechselwarm fehlt.",
          "Ueberwinterungsbegriff fehlt.",
          "Biologische Ursache fehlt.",
        ],
      },
      conclusion: {
        minWords: 12,
        groups: [
          ["kernaussage", "zeigt", "fazit", "unterschied"],
          ["frosch"],
          ["eidechse"],
        ],
        labels: [
          "Kernaussage nicht klar formuliert.",
          "Frosch fehlt im Fazit.",
          "Eidechse fehlt im Fazit.",
        ],
      },
    },
    model: {
      intro:
        "Das Liniendiagramm zeigt die Koerpertemperaturen von Frosch und Eidechse im Jahresverlauf. Die x-Achse stellt die Monate dar, die y-Achse die Koerpertemperatur in C.",
      describe:
        "Bei beiden Tieren steigen die Temperaturen vom Fruehling bis zum Sommer an und sinken im Herbst wieder ab. Die Eidechse erreicht im Sommer etwas hoehere Werte als der Frosch. Im Winter liegen beide Kurven sehr niedrig.",
      explain:
        "Frosch und Eidechse sind wechselwarm. Ihre Koerpertemperatur passt sich der Umgebung an. Im Winter sinkt die Aktivitaet stark, weil Energie gespart werden muss und kaum Nahrung verfuegbar ist.",
      conclusion:
        "Das Diagramm zeigt, dass beide Tiere stark jahreszeitlich abhaengig sind. Die Eidechse ist im Sommer waermer, im Winter fallen beide auf sehr niedrige Temperaturen.",
    },
  },
};

const questionPool = [
  {
    prompt: "Welcher Arbeitsschritt kommt als Erstes?",
    options: [
      "Einleitung: Diagrammtyp, Thema, Achsen nennen",
      "Direkt erklaeren, warum etwas passiert",
      "Nur ein Fazit schreiben",
      "Werte ohne Zusammenhang aufzaehlen",
    ],
    answer: 0,
    explain: "Der erste Schritt ist immer die Einleitung mit den Grunddaten.",
  },
  {
    prompt: "Was gehoert in die reine Beschreibung?",
    options: [
      "Sachlicher Verlauf: steigt, sinkt, bleibt konstant",
      "Nur Vermutungen ohne Diagrammbezug",
      "Nur Ursachen, keine Verlaeufe",
      "Nur das Fazit",
    ],
    answer: 0,
    explain: "In der Beschreibung werden beobachtbare Verlaeufe genannt.",
  },
  {
    prompt: "Wann werden Ursachen und Fachwissen eingebracht?",
    options: ["Im Schritt Erklaerung/Deutung", "Schon vor der Einleitung", "Nur im Titel", "Gar nicht"],
    answer: 0,
    explain: "Die Deutung folgt nach der sachlichen Beschreibung.",
  },
  {
    prompt: "Welche Angabe darf in der Einleitung nicht fehlen?",
    options: ["Achsen mit Einheit", "Lieblingstier", "Eigene Meinung", "Nur Farbennamen"],
    answer: 0,
    explain: "Achsenangaben mit Einheit sind grundlegend.",
  },
  {
    prompt: "Welche Formulierung passt zu einer Beschreibung?",
    options: [
      "Von Dezember bis Februar bleibt die Temperatur niedrig.",
      "Das ist bestimmt unfair fuer das Tier.",
      "Ich mag das Diagramm.",
      "Wahrscheinlich hat jemand falsch gemessen.",
    ],
    answer: 0,
    explain: "Beschreibungen bleiben sachlich und am Verlauf orientiert.",
  },
  {
    prompt: "Welche Verbindung ist fuer Erklaerungen typisch?",
    options: ["weil / deshalb / dadurch", "vielleicht / irgendwie", "haha / wow", "ganz egal"],
    answer: 0,
    explain: "Ursache-Wirkung wird sprachlich klar verbunden.",
  },
  {
    prompt: "Was ist ein gutes Fazit?",
    options: [
      "Kurze Kernaussage in 1 bis 2 Saetzen",
      "Neue Daten ohne Bezug",
      "Nur Achsen erneut aufschreiben",
      "Beliebige Zusatzgeschichte",
    ],
    answer: 0,
    explain: "Ein Fazit fasst das Wichtigste knapp zusammen.",
  },
  {
    prompt: "Welcher Fehler ist typisch und sollte vermieden werden?",
    options: [
      "Direkt erklaeren, ohne den Verlauf zu beschreiben",
      "Achsen richtig benennen",
      "Werte ungefaehr angeben",
      "Fachbegriffe passend nutzen",
    ],
    answer: 0,
    explain: "Die Reihenfolge ist wichtig: erst beschreiben, dann erklaeren.",
  },
  {
    prompt: "Welche Aussage trifft auf ein Liniendiagramm im Jahresverlauf zu?",
    options: [
      "Es zeigt Veraenderungen ueber die Zeit.",
      "Es zeigt nur einen einzelnen Messwert.",
      "Es hat keine Achsen.",
      "Es braucht keine Einheit.",
    ],
    answer: 0,
    explain: "Liniendiagramme sind besonders gut fuer Verlaeufe ueber Zeit geeignet.",
  },
  {
    prompt: "Was sollte in einer guten Diagrammbeschreibung vorkommen?",
    options: [
      "Zeitangaben und Verlaufswoerter",
      "Nur Vermutungen",
      "Nur Fachwoerter ohne Kontext",
      "Keine Zahlen oder Bereiche",
    ],
    answer: 0,
    explain: "Zeitbezug und Verlauf sind Kern einer Beschreibung.",
  },
  {
    prompt: "Welche Aussage passt zum Fachbegriff wechselwarm?",
    options: [
      "Die Koerpertemperatur haengt stark von der Umgebung ab.",
      "Die Koerpertemperatur ist immer exakt gleich.",
      "Das Tier hat nie Aktivitaetsschwankungen.",
      "Der Begriff hat nichts mit Temperatur zu tun.",
    ],
    answer: 0,
    explain: "Wechselwarme Tiere passen ihre Koerpertemperatur der Umgebung an.",
  },
  {
    prompt: "Wie gehst du bei zwei Kurven im Diagramm am besten vor?",
    options: [
      "Beide Verlaeufe getrennt beschreiben und dann vergleichen",
      "Nur eine Kurve betrachten",
      "Direkt Schluss ohne Vergleich",
      "Achsen ignorieren",
    ],
    answer: 0,
    explain: "Erst strukturieren, dann Unterschiede klar vergleichen.",
  },
];

let currentOrderItems = [];
let currentTestQuestions = [];
let currentTestIndex = 0;
let currentTestScore = 0;
let testAnswered = false;

function shuffle(items) {
  const list = [...items];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function sample(items, count) {
  return shuffle(items).slice(0, Math.min(count, items.length));
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\u00e4/g, "ae")
    .replace(/\u00f6/g, "oe")
    .replace(/\u00fc/g, "ue")
    .replace(/\u00df/g, "ss")
    .replace(/Ã¤/g, "ae")
    .replace(/Ã¶/g, "oe")
    .replace(/Ã¼/g, "ue")
    .replace(/ÃŸ/g, "ss")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function setActiveTab(tabKey) {
  tabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === tabKey);
  });
  tabPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === `tab-${tabKey}`);
  });
}

function setStep(stepKey) {
  const info = stepInfo[stepKey] || stepInfo["1"];
  stepButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.step === stepKey);
  });
  stepTitle.textContent = info.title;
  stepText.textContent = info.text;
  stepChecklist.replaceChildren();
  info.checklist.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    stepChecklist.append(li);
  });
}

function renderOrderTask() {
  currentOrderItems = shuffle(orderStatements);
  orderTask.replaceChildren();

  currentOrderItems.forEach((item, index) => {
    const row = document.createElement("article");
    row.className = "bde-task-item";

    const label = document.createElement("label");
    label.setAttribute("for", `bde-order-${index}`);
    label.textContent = item.text;

    const select = document.createElement("select");
    select.id = `bde-order-${index}`;
    select.className = "bde-select";
    select.dataset.correct = String(item.order);

    [
      { value: "", text: "Schritt waehlen" },
      { value: "1", text: "1 Einleitung" },
      { value: "2", text: "2 Beschreibung" },
      { value: "3", text: "3 Erklaerung" },
      { value: "4", text: "4 Fazit" },
    ].forEach((optionData) => {
      const option = document.createElement("option");
      option.value = optionData.value;
      option.textContent = optionData.text;
      select.append(option);
    });

    row.append(label, select);
    orderTask.append(row);
  });

  orderFeedback.textContent = "Noch nicht geprueft.";
}

function checkOrderTask() {
  const rows = [...orderTask.querySelectorAll(".bde-task-item")];
  let correct = 0;
  let answered = 0;

  rows.forEach((row) => {
    row.classList.remove("is-correct", "is-wrong");
    const select = row.querySelector("select");
    if (!(select instanceof HTMLSelectElement) || !select.value) {
      return;
    }
    answered += 1;
    if (select.value === select.dataset.correct) {
      correct += 1;
      row.classList.add("is-correct");
    } else {
      row.classList.add("is-wrong");
    }
  });

  if (answered === 0) {
    orderFeedback.textContent = "Bitte zuerst mindestens eine Zuordnung waehlen.";
    return;
  }
  orderFeedback.textContent = `Richtig: ${correct} von ${rows.length}.`;
}

function fillSelect(node, values) {
  node.replaceChildren();
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    node.append(option);
  });
}

function updateBuilderSentence() {
  const subject = builderSubject.value;
  const verb = builderVerb.value;
  const time = builderTime.value;
  const reason = builderReason.value;

  const withReason =
    reason && reason !== "ohne Erklaerung"
      ? `${subject} ${verb} ${time}, ${reason}.`
      : `${subject} ${verb} ${time}.`;

  builderSentence.textContent = withReason;
}

function getSubjectKeywords(selectedSubject) {
  const normalized = normalizeText(selectedSubject);
  if (normalized.includes("igel")) {
    return ["igel", "koerpertemperatur"];
  }
  if (normalized.includes("eichhoernchen")) {
    return ["eichhoernchen", "linie", "kurve"];
  }
  if (normalized.includes("frosch")) {
    return ["frosch", "kurve", "linie"];
  }
  if (normalized.includes("eidechse")) {
    return ["eidechse", "linie", "kurve"];
  }
  return ["kurve", "temperatur"];
}

function checkBuilderSentence() {
  if (!(builderInput instanceof HTMLTextAreaElement) || !(builderFeedback instanceof HTMLElement)) {
    return;
  }

  const normalized = normalizeText(builderInput.value);
  const words = normalized.split(" ").filter(Boolean).length;
  const subjectKeywords = getSubjectKeywords(builderSubject.value);
  const needsReason = builderReason.value !== "ohne Erklaerung";

  let score = 0;
  const max = 5;
  const missing = [];

  if (words >= 8) {
    score += 1;
  } else {
    missing.push("mindestens 8 Woerter");
  }

  if (subjectKeywords.some((word) => normalized.includes(word))) {
    score += 1;
  } else {
    missing.push("passender Bezug zum gewaehlten Subjekt");
  }

  if (["steigt", "sinkt", "bleibt", "veraendert"].some((word) => normalized.includes(word))) {
    score += 1;
  } else {
    missing.push("Verlaufswort (steigt/sinkt/bleibt/veraendert)");
  }

  if (
    ["von", "bis", "im", "zwischen", "januar", "februar", "maerz", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "dezember"].some((word) =>
      normalized.includes(word)
    )
  ) {
    score += 1;
  } else {
    missing.push("Zeitraumbezug");
  }

  if (!needsReason || ["weil", "deshalb", "dadurch"].some((word) => normalized.includes(word))) {
    score += 1;
  } else {
    missing.push("Erklaerungsteil mit weil/deshalb/dadurch");
  }

  builderFeedback.classList.remove(
    "bde-builder-feedback-good",
    "bde-builder-feedback-mid",
    "bde-builder-feedback-low"
  );

  const percent = Math.round((score / max) * 100);
  if (percent >= 80) {
    builderFeedback.classList.add("bde-builder-feedback-good");
    builderFeedback.textContent = `Sehr gut: ${score}/${max} Kriterien erfuellt (${percent}%).`;
  } else if (percent >= 60) {
    builderFeedback.classList.add("bde-builder-feedback-mid");
    builderFeedback.textContent = `Gute Basis: ${score}/${max} Kriterien erfuellt (${percent}%). Noch verbessern: ${missing.join(", ")}.`;
  } else {
    builderFeedback.classList.add("bde-builder-feedback-low");
    builderFeedback.textContent = `Noch nicht sicher: ${score}/${max} Kriterien erfuellt (${percent}%). Fehlt: ${missing.join(", ")}.`;
  }
}

function resetBuilderInput() {
  if (!(builderInput instanceof HTMLTextAreaElement) || !(builderFeedback instanceof HTMLElement)) {
    return;
  }
  builderInput.value = "";
  builderFeedback.classList.remove(
    "bde-builder-feedback-good",
    "bde-builder-feedback-mid",
    "bde-builder-feedback-low"
  );
  builderFeedback.textContent = "Noch nicht geprueft.";
}

function createWritingFields(caseConfig) {
  const container = caseConfig.fieldsNode;
  container.replaceChildren();

  writingSteps.forEach((step) => {
    const item = document.createElement("article");
    item.className = "bde-writing-item";
    item.dataset.field = step.key;

    const title = document.createElement("h3");
    title.textContent = step.title;

    const prompt = document.createElement("p");
    prompt.textContent = step.prompt;

    const area = document.createElement("textarea");
    area.dataset.field = step.key;
    area.placeholder = "Schreibe hier deine Antwort ...";

    const feedback = document.createElement("p");
    feedback.className = "bde-field-feedback";
    feedback.textContent = "Noch nicht bewertet.";

    item.append(title, prompt, area, feedback);
    container.append(item);
  });
}

function evaluateField(value, rule) {
  const normalized = normalizeText(value);
  const words = normalized.split(" ").filter(Boolean).length;

  let matches = 0;
  const missing = [];
  rule.groups.forEach((group, index) => {
    const hasGroup = group.some((term) => normalized.includes(normalizeText(term)));
    if (hasGroup) {
      matches += 1;
    } else {
      missing.push(rule.labels[index]);
    }
  });

  const coverage = matches / rule.groups.length;
  const enoughWords = words >= rule.minWords;
  let level = "low";
  if (coverage >= 0.8 && enoughWords) {
    level = "good";
  } else if (coverage >= 0.5) {
    level = "mid";
  }

  let message = `Treffer: ${matches}/${rule.groups.length}.`;
  if (!enoughWords) {
    message += ` Etwas ausfuehrlicher schreiben (mind. ${rule.minWords} Woerter).`;
  }
  if (missing.length > 0) {
    message += ` Fehlt noch: ${missing.join(" ")}`;
  }

  return {
    level,
    message,
    score: matches,
    max: rule.groups.length,
  };
}

function checkCase(caseConfig) {
  const rows = [...caseConfig.fieldsNode.querySelectorAll(".bde-writing-item")];
  let totalScore = 0;
  let totalMax = 0;

  rows.forEach((row) => {
    row.classList.remove("is-good", "is-mid", "is-low");
    const key = row.dataset.field;
    if (!key || !caseConfig.rules[key]) {
      return;
    }
    const area = row.querySelector("textarea");
    const feedback = row.querySelector(".bde-field-feedback");
    if (!(area instanceof HTMLTextAreaElement) || !(feedback instanceof HTMLElement)) {
      return;
    }

    const result = evaluateField(area.value, caseConfig.rules[key]);
    totalScore += result.score;
    totalMax += result.max;
    row.classList.add(
      result.level === "good" ? "is-good" : result.level === "mid" ? "is-mid" : "is-low"
    );
    feedback.textContent = result.message;
  });

  if (totalMax === 0) {
    caseConfig.feedbackNode.textContent = "Noch keine Bewertung moeglich.";
    return;
  }

  const percent = Math.round((totalScore / totalMax) * 100);
  if (percent >= 80) {
    caseConfig.feedbackNode.textContent = `Sehr stark: ${totalScore}/${totalMax} Kriterien getroffen (${percent}%).`;
  } else if (percent >= 55) {
    caseConfig.feedbackNode.textContent = `Gute Basis: ${totalScore}/${totalMax} Kriterien getroffen (${percent}%).`;
  } else {
    caseConfig.feedbackNode.textContent = `Weiter ueben: ${totalScore}/${totalMax} Kriterien getroffen (${percent}%).`;
  }
}

function resetCase(caseConfig) {
  const rows = [...caseConfig.fieldsNode.querySelectorAll(".bde-writing-item")];
  rows.forEach((row) => {
    row.classList.remove("is-good", "is-mid", "is-low");
    const area = row.querySelector("textarea");
    const feedback = row.querySelector(".bde-field-feedback");
    if (area instanceof HTMLTextAreaElement) {
      area.value = "";
    }
    if (feedback instanceof HTMLElement) {
      feedback.textContent = "Noch nicht bewertet.";
    }
  });
  caseConfig.feedbackNode.textContent = "Noch nicht geprueft.";
}

function renderModel(caseConfig) {
  caseConfig.modelNode.replaceChildren();
  const title = document.createElement("h3");
  title.textContent = "Musterloesung (Orientierung)";
  caseConfig.modelNode.append(title);

  writingSteps.forEach((step) => {
    const paragraph = document.createElement("p");
    paragraph.innerHTML = `<strong>${step.title}:</strong> ${caseConfig.model[step.key]}`;
    caseConfig.modelNode.append(paragraph);
  });
}

function toggleModel(caseConfig) {
  if (caseConfig.modelNode.hidden) {
    renderModel(caseConfig);
    caseConfig.modelNode.hidden = false;
    caseConfig.modelToggle.textContent = "Musterloesung ausblenden";
  } else {
    caseConfig.modelNode.hidden = true;
    caseConfig.modelToggle.textContent = "Musterloesung anzeigen";
  }
}

function updateTestScore() {
  testScore.textContent = `Punkte: ${currentTestScore} / ${currentTestQuestions.length || 10}`;
}

function renderCurrentTestQuestion() {
  const current = currentTestQuestions[currentTestIndex];
  if (!current) {
    testStatus.textContent = "Test beendet.";
    testPrompt.textContent = "Du hast alle Fragen bearbeitet.";
    testAnswers.replaceChildren();
    testFeedback.textContent = "";
    testNext.disabled = true;
    return;
  }

  testAnswered = false;
  testStatus.textContent = `Frage ${currentTestIndex + 1} von ${currentTestQuestions.length}`;
  testPrompt.textContent = current.prompt;
  testFeedback.textContent = "";
  testAnswers.replaceChildren();
  testNext.disabled = true;

  current.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "bde-choice-btn";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => {
      if (testAnswered) {
        return;
      }
      testAnswered = true;

      const isCorrect = index === current.answer;
      if (isCorrect) {
        currentTestScore += 1;
      }

      const buttons = [...testAnswers.querySelectorAll(".bde-choice-btn")];
      buttons.forEach((btn, btnIndex) => {
        btn.disabled = true;
        if (btnIndex === current.answer) {
          btn.classList.add("is-correct");
        } else if (btnIndex === index && !isCorrect) {
          btn.classList.add("is-wrong");
        }
      });

      updateTestScore();
      testFeedback.textContent = `${isCorrect ? "Richtig." : "Nicht ganz."} ${current.explain}`;
      testNext.disabled = false;
    });
    testAnswers.append(button);
  });
}

function startTest() {
  currentTestQuestions = sample(questionPool, 10);
  currentTestIndex = 0;
  currentTestScore = 0;
  updateTestScore();
  renderCurrentTestQuestion();
}

function nextTestQuestion() {
  if (!testAnswered) {
    return;
  }

  currentTestIndex += 1;
  if (currentTestIndex >= currentTestQuestions.length) {
    testStatus.textContent = `Test abgeschlossen: ${currentTestScore} von ${currentTestQuestions.length} Punkten.`;
    testPrompt.textContent = "Klicke auf Test starten, um neu zu testen.";
    testAnswers.replaceChildren();
    testFeedback.textContent =
      currentTestScore >= 7
        ? "Sehr gut. Du beschreibst und erklaerst Diagramme sicher."
        : "Gute Grundlage. Wiederhole die 4 Schritte und probiere den Test erneut.";
    testNext.disabled = true;
    return;
  }

  renderCurrentTestQuestion();
}

function initTabs() {
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveTab(button.dataset.tab || "lernen");
    });
  });
}

function initStepExplorer() {
  setStep("1");
  stepButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setStep(button.dataset.step || "1");
    });
  });
}

function initOrderTask() {
  renderOrderTask();
  orderReset.addEventListener("click", renderOrderTask);
  orderCheck.addEventListener("click", checkOrderTask);
}

function initBuilder() {
  fillSelect(builderSubject, builderData.subjects);
  fillSelect(builderVerb, builderData.verbs);
  fillSelect(builderTime, builderData.times);
  fillSelect(builderReason, builderData.reasons);
  updateBuilderSentence();
  [builderSubject, builderVerb, builderTime, builderReason].forEach((node) => {
    node.addEventListener("change", updateBuilderSentence);
  });
  if (builderUseGenerated instanceof HTMLButtonElement && builderInput instanceof HTMLTextAreaElement) {
    builderUseGenerated.addEventListener("click", () => {
      builderInput.value = builderSentence.textContent || "";
      builderInput.focus();
    });
  }
  if (builderCheck instanceof HTMLButtonElement) {
    builderCheck.addEventListener("click", checkBuilderSentence);
  }
  if (builderReset instanceof HTMLButtonElement) {
    builderReset.addEventListener("click", resetBuilderInput);
  }
}

function initTrainingCases() {
  Object.values(trainingData).forEach((caseConfig) => {
    createWritingFields(caseConfig);
    caseConfig.checkBtn.addEventListener("click", () => checkCase(caseConfig));
    caseConfig.resetBtn.addEventListener("click", () => resetCase(caseConfig));
    caseConfig.modelToggle.addEventListener("click", () => toggleModel(caseConfig));
  });
}

function initTest() {
  updateTestScore();
  testStart.addEventListener("click", startTest);
  testNext.addEventListener("click", nextTestQuestion);
}

initTabs();
initStepExplorer();
initOrderTask();
initBuilder();
initTrainingCases();
initTest();
