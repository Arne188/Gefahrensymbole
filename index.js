const storageKey = "lernbereich_themen_v1";

const defaultTopics = [
  {
    subject: "Chemie",
    title: "Gefahrstoffkennzeichen",
    link: "subjects/chemie/gefahrstoffkennzeichen/chemie-gefahrstoffe.html",
    description: "GHS-Symbole verstehen und im Test sicher anwenden.",
  },
  {
    subject: "Chemie",
    title: "Laborgeräte und Sicherheit",
    link: "subjects/chemie/laborgeraete-und-sicherheit/chemie-laborgeraete.html",
    description: "Gerätekunde, Protokoll, Quiz und Sicherheitstest.",
  },
  {
    subject: "Erdkunde",
    title: "Vom Luftbild zur Karte",
    link: "subjects/erdkunde/vom-luftbild-zur-karte/erdkunde-luftbild-karte.html",
    description: "Legende, Himmelsrichtungen, Maßstab und Kartentest.",
  },
  {
    subject: "Deutsch",
    title: "Märchenanalyse schreiben",
    link: "subjects/deutsch/maerchenanalyse/deutsch-maerchenanalyse.html",
    description: "Lehrplanorientierte Schrittanleitung mit Übungen und Kurztest.",
  },
  {
    subject: "Deutsch",
    title: "Märchen schreiben",
    link: "subjects/deutsch/maerchen-schreiben/deutsch-maerchen-schreiben.html",
    description: "Von der Idee bis zur Reinschrift: mit Übungspool, Feedback und Test.",
  },
  {
    subject: "Mathematik",
    title: "Besondere Vierecke",
    link: "subjects/mathematik/besondere-vierecke/mathematik-besondere-vierecke.html",
    description: "Vierecke erkennen, Eigenschaften vergleichen und im Test anwenden.",
  },
  {
    subject: "Mathematik",
    title: "Längeneinheiten und Umrechnungen",
    link: "subjects/mathematik/laengeneinheiten-und-umrechnungen/mathematik-laengeneinheiten-und-umrechnungen.html",
    description: "Längeneinheiten sicher umrechnen, mit Einheitenleiter verstehen und mit unendlichem Aufgaben-Generator trainieren.",
  },
  {
    subject: "Mathematik",
    title: "Maßstab",
    link: "subjects/mathematik/massstab/mathematik-massstab.html",
    description: "Maßstäbe lesen, Karte und Wirklichkeit umrechnen und mit unendlichem Aufgaben-Generator trainieren.",
  },
  {
    subject: "Mathematik",
    title: "Achsensymmetrie und Punktsymmetrie",
    link: "subjects/mathematik/achsensymmetrie-und-punktsymmetrie/mathematik-achsensymmetrie-und-punktsymmetrie.html",
    description: "Symmetrien verstehen, Bildpunkte konstruieren und mit unendlichem Aufgaben-Generator trainieren.",
  },
  {
    subject: "Mathematik",
    title: "Das Koordinatensystem",
    link: "subjects/mathematik/das-koordinatensystem/mathematik-das-koordinatensystem.html",
    description: "Koordinaten-Labor, Quadranten verstehen und mit unendlichem Aufgaben-Generator trainieren.",
  },
  {
    subject: "Mathematik",
    title: "Rechengesetze",
    link: "subjects/mathematik/rechengesetze/mathematik-rechengesetze.html",
    description: "Distributiv-, Kommutativ- und Assoziativgesetz ausführlich lernen und mit unendlichem Aufgabenpool trainieren.",
  },
  {
    subject: "Mathematik",
    title: "Kopfrechentrainer",
    link: "subjects/mathematik/kopfrechentrainer/mathematik-kopfrechentrainer.html",
    description: "Alle wichtigen Kopfrechenarten der 5. Klasse mit unendlichem Generator, Hilfestrategien und Test trainieren.",
  },
  {
    subject: "Englisch",
    title: "Sentences with if - Part 1",
    link: "subjects/englisch/if-sentences-part-1/englisch-if-sentences.html",
    description: "If-Sätze sicher bilden, Fehler verstehen und mit großem Aufgabenpool üben.",
  },
  {
    subject: "Geschichte",
    title: "Ägypten - Geschenk des Nils",
    link: "subjects/geschichte/aegypten-geschenk-des-nils/geschichte-aegypten-nil.html",
    description: "Hochkultur am Nil verstehen, Ursache-Folge trainieren und mit Feedback testen.",
  },
  {
    subject: "Erdkunde",
    title: "Himmelsrichtungen",
    link: "subjects/erdkunde/himmelsrichtungen/erdkunde-himmelsrichtungen.html",
    description: "Kompassrose, Kartenorientierung, Lagebeziehungen und Abschlusstest interaktiv trainieren.",
  },
  {
    subject: "Chemie",
    title: "Gasbrenner",
    link: "subjects/chemie/gasbrenner/chemie-gasbrenner.html",
    description: "Aufbau, sichere Einstellung und Flammentemperaturen des Gasbrenners interaktiv lernen, trainieren und prüfen.",
  },
  {
    subject: "Biologie",
    title: "Modul 1: Der Hund - ein Haustier und seine Geschichte",
    link: "subjects/biologie/der-hund-ein-haustier-und-seine-geschichte/biologie-der-hund.html",
    description:
      "Haustiermerkmale, Züchtung und Angepasstheit am Beispiel Hund verstehen.",
    bulletPoints: [
      "Haustierbewertung: Was macht ein Tier zum Haustier?",
      "Abstammung des Hundes vom Wolf in Grundzügen erklären.",
      "Züchtung: Wie der Mensch Merkmale gezielt verändert.",
      "Angepasstheit von Sinnesorganen und Körperbau des Hundes.",
    ],
  },
  {
    subject: "Biologie",
    title: "Modul 2: Tiere im Winter",
    link: "subjects/biologie/tiere-im-winter/biologie-tiere-im-winter.html",
    description:
      "Überwinterungsstrategien vergleichen und die Begriffe gleichwarm und wechselwarm sicher anwenden.",
    bulletPoints: [
      "Unterschied zwischen gleichwarmen und wechselwarmen Tieren.",
      "Winterruhe, Winterschlaf und Winterstarre unterscheiden.",
      "Beispiele heimischer Tiere korrekt zuordnen.",
      "Anpassung von Verhalten und Körperfunktionen an Kälte.",
    ],
  },
  {
    subject: "Biologie",
    title: "Modul 3: Ordnen von Wirbeltieren",
    link: "subjects/biologie/ordnen-von-wirbeltieren/biologie-ordnen-von-wirbeltieren.html",
    description:
      "Wirbeltierklassen erkennen, beschreiben und mit Merkmalen begründet einordnen.",
    bulletPoints: [
      "Die fünf Wirbeltierklassen nennen und unterscheiden.",
      "Typische Merkmale (Körperbedeckung, Fortpflanzung, Lebensraum) vergleichen.",
      "Tiere anhand beobachtbarer Merkmale richtig klassifizieren.",
      "Einfache Bestimmungstabellen nutzen.",
    ],
  },
  {
    subject: "Biologie",
    title: "Modul 4: Der Mensch - auch ein Wirbeltier",
    link: "subjects/biologie/der-mensch-auch-ein-wirbeltier/biologie-der-mensch-wirbeltier.html",
    description:
      "Skelett, Muskeln und Bewegung des Menschen als Wirbeltier untersuchen.",
    bulletPoints: [
      "Grundaufbau des menschlichen Skeletts benennen.",
      "Zusammenspiel von Muskeln, Knochen und Gelenken erklären.",
      "Bedeutung von Bewegung und Haltung für die Gesundheit begründen.",
      "Mensch und andere Wirbeltiere vergleichend betrachten.",
    ],
  },
  {
    subject: "Biologie",
    title: "Modul 5: Ueberwinterung von Amphibien und Reptilien",
    link: "subjects/biologie/ueberwinterung-von-amphibien-und-reptilien/biologie-ueberwinterung-amphibien-und-reptilien.html",
    description:
      "Ueberwinterungsstrategien von Amphibien und Reptilien vergleichen und begruendet anwenden.",
    bulletPoints: [
      "Warum wechselwarme Tiere im Winter in Winterruhe fallen.",
      "Typische Ueberwinterungsplaetze sicher zuordnen.",
      "Gemeinsamkeiten und Unterschiede von Amphibien und Reptilien vergleichen.",
      "Naturschutzbezug: Rueckzugsorte erhalten und begruenden.",
    ],
  },
  {
    subject: "Biologie",
    title: "Modul 6: Ueberwinterungsstrategien von Igel und Eichhoernchen",
    link: "subjects/biologie/ueberwinterungsstrategien-von-igel-und-eichhoernchen/biologie-ueberwinterungsstrategien-igel-und-eichhoernchen.html",
    description:
      "Winterruhe und Winteraktivitaet von Igel und Eichhoernchen vergleichen und anwenden.",
    bulletPoints: [
      "Igel (Winterruhe) und Eichhoernchen (winteraktiv) gezielt unterscheiden.",
      "Vorbereitung, Verstecke und Nahrungssicherung vergleichen.",
      "Gemeinsamkeiten und Unterschiede fachlich begruenden.",
      "Naturschutzmassnahmen fuer den Winter ableiten.",
    ],
  },
  {
    subject: "Biologie",
    title: "Modul 7: Temperaturbegriffe verstehen",
    link: "subjects/biologie/temperaturbegriffe-winter-und-extreme/biologie-temperaturbegriffe.html",
    description:
      "Winterschlaf, Winterruhe, Waermestarre, Hitzetod, Kaeltestarre und Kaeltetod sicher unterscheiden und anwenden.",
    bulletPoints: [
      "Die sechs zentralen Begriffe fachlich korrekt definieren.",
      "Temperaturabhaengige Situationen biologisch deuten.",
      "Begriffe in Transferaufgaben sicher anwenden.",
      "Grenzbereiche und Risiken fuer Tiere begruendet erklaeren.",
    ],
  },
  {
    subject: "Biologie",
    title: "Modul 8: Diagramme beschreiben und erklaeren",
    link: "subjects/biologie/diagramme-beschreiben-und-erklaeren/biologie-diagramme-beschreiben-und-erklaeren.html",
    description:
      "Diagramme in 4 klaren Schritten beschreiben und erklaeren: mit zwei Trainingsfaellen und Testmodul.",
    bulletPoints: [
      "Diagrammtyp, Thema und Achsen mit Einheit korrekt nennen.",
      "Verlaeufe sachlich entlang der Zeitachse beschreiben.",
      "Mit Fachwissen biologische Ursachen und Zusammenhaenge erklaeren.",
      "Kernaussage als praezises Fazit formulieren.",
    ],
  },
  {
    subject: "Biologie",
    title: "Inhalte Klasse 5 (Niedersachsen)",
    link: "",
    description:
      "Lehrplanorientierte Themen für Jahrgang 5 auf Grundlage des Kerncurriculums Naturwissenschaften (Gymnasium Sek. I, verbindlich ab 01.08.2015).",
    bulletPoints: [
      "Der Hund - ein Haustier und seine Geschichte.",
      "Tiere im Winter (gleichwarm/wechselwarm).",
      "Ordnen von Wirbeltieren.",
      "Der Mensch - auch ein Wirbeltier (Skelettaufbau, Muskeln, Bewegung).",
      "Ueberwinterung von Amphibien und Reptilien.",
      "Ueberwinterungsstrategien von Igel und Eichhoernchen.",
      "Temperaturbegriffe: Winterschlaf, Winterruhe, Waermestarre, Hitzetod, Kaeltestarre, Kaeltetod.",
      "Diagramme beschreiben und erklaeren (Einleitung, Beschreibung, Erklaerung, Fazit).",
    ],
  },
  {
    subject: "Deutsch",
    title: "Groß- und Kleinschreibung",
    link: "subjects/deutsch/gross-und-kleinschreibung/deutsch-gross-und-kleinschreibung.html",
    description: "Dummy-Modul (Platzhalter) - Inhalte folgen.",
  },
  {
    subject: "Geschichte",
    title: "Glaube im Alten Ägypten",
    link: "subjects/geschichte/glaube-im-alten-aegypten/geschichte-glaube-im-alten-aegypten.html",
    description: "Dummy-Modul (Platzhalter) - Inhalte folgen.",
  },
  {
    subject: "Geschichte",
    title: "Der Staat im Alten Ägypten",
    link: "subjects/geschichte/staat-im-alten-aegypten/geschichte-staat-im-alten-aegypten.html",
    description: "Staatsaufbau, Ämter, Gesellschaft und Nilverwaltung interaktiv lernen, trainieren und prüfen.",
  },
  {
    subject: "Geschichte",
    title: "Der Pharao",
    link: "subjects/geschichte/der-pharao/geschichte-der-pharao.html",
    description: "Gottkönig, Herrschaftssymbole und Aufgaben des Pharaos interaktiv lernen, trainieren und prüfen.",
  },
  {
    subject: "Geschichte",
    title: "Das alte Griechenland - Geographie",
    link: "subjects/geschichte/altes-griechenland-landschaft/geschichte-altes-griechenland-landschaft.html",
    description: "Gebirge, Meer, Poleis und Kolonisation im alten Griechenland interaktiv lernen, trainieren und prüfen.",
  },
  {
    subject: "Werte und Normen",
    title: "Modul 1: Gottesvorstellungen verstehen",
    link: "subjects/werte-und-normen/gottesvorstellungen-grundlagen/werte-und-normen-glaubensrichtungen.html",
    description:
      "Polytheismus, Monotheismus und Atheismus erklären, vergleichen und im Test sichern.",
  },
  {
    subject: "Werte und Normen",
    title: "Modul 2: Gottesvorstellungen im Monotheismus",
    link: "subjects/werte-und-normen/gottesvorstellungen-im-monotheismus/werte-und-normen-monotheistische-gottesvorstellungen.html",
    description:
      "Schöpfer, Allmächtiger, Offenbarer und Allwissender Gott verstehen und anwenden.",
  },
  {
    subject: "Werte und Normen",
    title: "Modul 3: Menschen des Glaubens",
    link: "subjects/werte-und-normen/menschen-des-glaubens/werte-und-normen-menschen-des-glaubens.html",
    description:
      "Propheten, Religionsstifter und Heilige kennenlernen, vergleichen und im Test anwenden.",
  },
  {
    subject: "Werte und Normen",
    title: "Inhalte Klasse 5 (Niedersachsen)",
    link: "",
    description:
      "Leitthemen für Jahrgang 5/6 laut Kerncurriculum Gymnasium Sek. I (verbindlich ab 01.08.2017).",
    bulletPoints: [
      "Ich und meine Beziehungen (Freundschaft, Familie, Vorbilder).",
      "Glück und Lebensgestaltung (Zukunftswünsche, Verantwortung, Erfolg/Misserfolg).",
      "Regeln für das Zusammenleben (Regeln und Rituale, Goldene Regel, Regelverletzungen).",
      "Leben in Vielfalt (Vorurteile, Klischees, Mobbing, Toleranz).",
      "Aspekte von Religionen und Weltanschauungen (Göttliches, Schöpfungsmythen, religiöse Praxis).",
    ],
  },
];

const subjectSelect = document.getElementById("subjectSelect");
const moduleList = document.getElementById("moduleList");
const emptyState = document.getElementById("emptyState");
const openSubjectDashboard = document.getElementById("openSubjectDashboard");

function repairMojibake(value) {
  return String(value || "")
    .replace(/\u00C3\u201E/g, "Ä")
    .replace(/\u00C3\u2013/g, "Ö")
    .replace(/\u00C3\u0153/g, "Ü")
    .replace(/\u00C3\u00A4/g, "ä")
    .replace(/\u00C3\u00B6/g, "ö")
    .replace(/\u00C3\u00BC/g, "ü")
    .replace(/\u00C3\u0178/g, "ß");
}

function normalizeTopic(topic) {
  const bulletPoints = Array.isArray(topic.bulletPoints)
    ? topic.bulletPoints
        .map((entry) => repairMojibake(entry).trim())
        .filter(Boolean)
    : [];

  return {
    subject: repairMojibake(topic.subject).trim(),
    title: repairMojibake(topic.title).trim(),
    link: String(topic.link || "").trim(),
    description: repairMojibake(topic.description).trim(),
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

function buildSubjectDashboardLink(subject) {
  const encoded = encodeURIComponent(subject || "");
  return `subject-dashboard.html?subject=${encoded}`;
}

function updateSubjectDashboardLink(subject) {
  if (!(openSubjectDashboard instanceof HTMLAnchorElement)) {
    return;
  }
  openSubjectDashboard.href = buildSubjectDashboardLink(subject);
}

window.LERNHUB = {
  defaultTopics,
  repairMojibake,
  normalizeTopic,
  dedupeTopics,
  loadTopics,
  saveTopics,
  getSubjects,
};

if (
  subjectSelect instanceof HTMLSelectElement &&
  moduleList instanceof HTMLDivElement &&
  emptyState instanceof HTMLParagraphElement
) {
  let topics = loadTopics();
  saveTopics(topics);
  renderSubjects(topics);
  updateSubjectDashboardLink(subjectSelect.value);

  subjectSelect.addEventListener("change", () => {
    renderModules(topics, subjectSelect.value);
    updateSubjectDashboardLink(subjectSelect.value);
  });
}



