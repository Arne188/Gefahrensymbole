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
    title: "Laborgeräte und Sicherheit",
    link: "chemie-laborgeraete.html",
    description: "Gerätekunde, Protokoll, Quiz und Sicherheitstest.",
  },
  {
    subject: "Erdkunde",
    title: "Vom Luftbild zur Karte",
    link: "erdkunde-luftbild-karte.html",
    description: "Legende, Himmelsrichtungen, Maßstab und Kartentest.",
  },
  {
    subject: "Deutsch",
    title: "Märchenanalyse schreiben",
    link: "deutsch-maerchenanalyse.html",
    description: "Lehrplanorientierte Schrittanleitung mit Übungen und Kurztest.",
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
];

const subjectSelect = document.getElementById("subjectSelect");
const moduleList = document.getElementById("moduleList");
const emptyState = document.getElementById("emptyState");

function normalizeTopic(topic) {
  return {
    subject: String(topic.subject || "").trim(),
    title: String(topic.title || "").trim(),
    link: String(topic.link || "").trim(),
    description: String(topic.description || "").trim(),
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

    // Neuere Datensätze überschreiben alte Schreibweisen und ergänzen fehlende Felder.
    deduped.set(key, {
      subject: topic.subject || existing.subject,
      title: topic.title || existing.title,
      link: topic.link || existing.link,
      description: topic.description || existing.description,
    });
  });

  // Zweite Runde: gleiche Titel im selben Fach zusammenführen (falls alte Links abweichen).
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

  const description = document.createElement("p");
  description.textContent = topic.description || "Modul ohne Zusatzbeschreibung.";

  card.append(kicker, title, description);

  if (topic.link) {
    const link = document.createElement("a");
    link.className = "button-link";
    link.href = topic.link;
    link.textContent = "Modul öffnen";
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
    option.textContent = "Keine Fächer verfügbar";
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
