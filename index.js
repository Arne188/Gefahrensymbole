const storageKey = "lernbereich_themen_v1";

const defaultTopics = [
  {
    subject: "Chemie",
    title: "Gefahrstoffkennzeichen",
    link: "chemie-gefahrstoffe.html",
    description: "GHS-Symbole verstehen und im Test sicher anwenden.",
  },
  {
    subject: "Chemie",
    title: "Laborgeraete und Sicherheit",
    link: "chemie-laborgeraete.html",
    description: "Geraetekunde, Protokoll, Quiz und Sicherheitstest.",
  },
  {
    subject: "Erdkunde",
    title: "Vom Luftbild zur Karte",
    link: "erdkunde-luftbild-karte.html",
    description: "Legende, Himmelsrichtungen, Massstab und Kartentest.",
  },
  {
    subject: "Deutsch",
    title: "Maerchenanalyse schreiben",
    link: "deutsch-maerchenanalyse.html",
    description: "Lehrplanorientierte Schrittanleitung mit Uebungen und Kurztest.",
  },
  {
    subject: "Deutsch",
    title: "Maerchen schreiben",
    link: "deutsch-maerchen-schreiben.html",
    description: "Von der Idee bis zur Reinschrift: mit Uebungspool, Feedback und Test.",
  },
  {
    subject: "Mathematik",
    title: "Besondere Vierecke",
    link: "mathematik-besondere-vierecke.html",
    description: "Vierecke erkennen, Eigenschaften vergleichen und im Test anwenden.",
  },
  {
    subject: "Englisch",
    title: "Sentences with if - Part 1",
    link: "englisch-if-sentences.html",
    description: "If-Saetze sicher bilden, Fehler verstehen und mit grossem Aufgabenpool ueben.",
  },
  {
    subject: "Geschichte",
    title: "Aegypten - Geschenk des Nils",
    link: "geschichte-aegypten-nil.html",
    description: "Hochkultur am Nil verstehen, Ursache-Folge trainieren und mit Feedback testen.",
  },
  {
    subject: "Werte und Normen",
    title: "Modul 1: Gottesvorstellungen verstehen",
    link: "werte-und-normen-glaubensrichtungen.html",
    description:
      "Polytheismus, Monotheismus und Atheismus erklaeren, vergleichen und im Test sichern.",
  },
  {
    subject: "Werte und Normen",
    title: "Modul 2: Gottesvorstellungen im Monotheismus",
    link: "werte-und-normen-monotheistische-gottesvorstellungen.html",
    description:
      "Schoepfer, Allmaechtiger, Offenbarer und Allwissender Gott verstehen und anwenden.",
  },
  {
    subject: "Werte und Normen",
    title: "Modul 3: Menschen des Glaubens",
    link: "werte-und-normen-menschen-des-glaubens.html",
    description:
      "Propheten, Religionsstifter und Heilige kennenlernen, vergleichen und im Test anwenden.",
  },
  {
    subject: "Werte und Normen",
    title: "Inhalte Klasse 5 (Niedersachsen)",
    link: "",
    description:
      "Leitthemen fuer Jahrgang 5/6 laut Kerncurriculum Gymnasium Sek. I (verbindlich ab 01.08.2017).",
    bulletPoints: [
      "Ich und meine Beziehungen (Freundschaft, Familie, Vorbilder).",
      "Glueck und Lebensgestaltung (Zukunftswuensche, Verantwortung, Erfolg/Misserfolg).",
      "Regeln fuer das Zusammenleben (Regeln und Rituale, Goldene Regel, Regelverletzungen).",
      "Leben in Vielfalt (Vorurteile, Klischees, Mobbing, Toleranz).",
      "Aspekte von Religionen und Weltanschauungen (Goettliches, Schoepfungsmythen, religioese Praxis).",
    ],
  },
];

const subjectSelect = document.getElementById("subjectSelect");
const moduleList = document.getElementById("moduleList");
const emptyState = document.getElementById("emptyState");

function normalizeTopic(topic) {
  const bulletPoints = Array.isArray(topic.bulletPoints)
    ? topic.bulletPoints
        .map((entry) => String(entry || "").trim())
        .filter(Boolean)
    : [];

  return {
    subject: String(topic.subject || "").trim(),
    title: String(topic.title || "").trim(),
    link: String(topic.link || "").trim(),
    description: String(topic.description || "").trim(),
    bulletPoints,
  };
}

function normalizeKeyPart(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function createTopicKey(topic) {
  const subjectKey = normalizeKeyPart(topic.subject);
  const linkKey = normalizeKeyPart(topic.link);
  if (linkKey) {
    return `${subjectKey}|link:${linkKey}`;
  }
  return `${subjectKey}|title:${normalizeKeyPart(topic.title)}`;
}

function dedupeTopics(topics) {
  const deduped = new Map();
  topics.forEach((rawTopic) => {
    const topic = normalizeTopic(rawTopic);
    if (!topic.subject || !topic.title) {
      return;
    }

    const key = createTopicKey(topic);
    const existing = deduped.get(key);
    if (!existing) {
      deduped.set(key, topic);
      return;
    }

    deduped.set(key, {
      subject: topic.subject || existing.subject,
      title: topic.title || existing.title,
      link: topic.link || existing.link,
      description: topic.description || existing.description,
      bulletPoints:
        topic.bulletPoints.length > 0 ? topic.bulletPoints : existing.bulletPoints,
    });
  });

  const byTitle = new Map();
  deduped.forEach((topic) => {
    const titleKey = `${normalizeKeyPart(topic.subject)}|title:${normalizeKeyPart(topic.title)}`;
    const existing = byTitle.get(titleKey);
    if (!existing) {
      byTitle.set(titleKey, topic);
      return;
    }

    byTitle.set(titleKey, {
      subject: topic.subject || existing.subject,
      title: topic.title || existing.title,
      link: topic.link || existing.link,
      description: topic.description || existing.description,
      bulletPoints:
        topic.bulletPoints.length > 0 ? topic.bulletPoints : existing.bulletPoints,
    });
  });

  return [...byTitle.values()];
}

function loadTopics() {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      return dedupeTopics(defaultTopics);
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return dedupeTopics(defaultTopics);
    }

    return dedupeTopics([...parsed, ...defaultTopics]);
  } catch {
    return dedupeTopics(defaultTopics);
  }
}

function saveTopics(topics) {
  localStorage.setItem(storageKey, JSON.stringify(topics));
}

function getSubjects(topics) {
  return [...new Set(topics.map((topic) => topic.subject).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "de", { sensitivity: "base" })
  );
}

function createModuleCard(topic) {
  const card = document.createElement("article");
  card.className = "module-callout";

  const kicker = document.createElement("p");
  kicker.className = "module-kicker";
  kicker.textContent = topic.subject;

  const title = document.createElement("h3");
  title.textContent = topic.title;

  card.append(kicker, title);

  if (topic.description) {
    const description = document.createElement("p");
    description.textContent = topic.description;
    card.append(description);
  }

  if (topic.bulletPoints.length > 0) {
    const bulletList = document.createElement("ul");
    bulletList.className = "module-bullet-list";

    topic.bulletPoints.forEach((item) => {
      const bullet = document.createElement("li");
      bullet.textContent = item;
      bulletList.append(bullet);
    });

    card.append(bulletList);
  } else if (!topic.description) {
    const description = document.createElement("p");
    description.textContent = "Modul ohne Zusatzbeschreibung.";
    card.append(description);
  }

  if (topic.link) {
    const link = document.createElement("a");
    link.className = "button-link";
    link.href = topic.link;
    link.textContent = "Modul oeffnen";
    card.append(link);
  } else {
    const note = document.createElement("p");
    note.className = "topic-note";
    note.textContent = "Kein Link hinterlegt";
    card.append(note);
  }

  return card;
}

function renderModules(topics, subject) {
  const filteredTopics = topics.filter((topic) => topic.subject === subject);
  moduleList.replaceChildren();

  if (filteredTopics.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;
  filteredTopics.forEach((topic) => {
    moduleList.append(createModuleCard(topic));
  });
}

function renderSubjects(topics) {
  const subjects = getSubjects(topics);
  subjectSelect.replaceChildren();

  if (subjects.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Keine Faecher verfuegbar";
    subjectSelect.append(option);
    subjectSelect.disabled = true;
    renderModules(topics, "");
    return;
  }

  subjects.forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    subjectSelect.append(option);
  });

  subjectSelect.disabled = false;
  renderModules(topics, subjects[0]);
}

let topics = loadTopics();
saveTopics(topics);
renderSubjects(topics);

subjectSelect.addEventListener("change", () => {
  renderModules(topics, subjectSelect.value);
});
