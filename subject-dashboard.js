const sdSubjectSelect = document.getElementById("sdSubjectSelect");
const sdTitle = document.getElementById("sdTitle");
const sdTag = document.getElementById("sdTag");
const sdIntro = document.getElementById("sdIntro");
const sdVisual = document.getElementById("sdVisual");
const sdVisualCode = document.getElementById("sdVisualCode");
const sdVisualText = document.getElementById("sdVisualText");
const sdModuleHead = document.getElementById("sdModuleHead");
const sdModuleCount = document.getElementById("sdModuleCount");
const sdModuleList = document.getElementById("sdModuleList");
const sdEmptyState = document.getElementById("sdEmptyState");
const sdModuleSearch = document.getElementById("sdModuleSearch");
const sdSearchClear = document.getElementById("sdSearchClear");

const drawerToggle = document.getElementById("drawerToggle");
const drawerClose = document.getElementById("drawerClose");
const drawerOverlay = document.getElementById("drawerOverlay");
const subjectDrawer = document.getElementById("subjectDrawer");
const drawerSubjectList = document.getElementById("drawerSubjectList");
const drawerModuleList = document.getElementById("drawerModuleList");

const subjectThemes = {
  Chemie: {
    code: "CHE",
    intro: "Alle Chemie-Module auf einen Blick: sicher experimentieren, beobachten und erklären.",
    accent: "#0f5ea9",
    accentSoft: "#e7f2ff",
  },
  Biologie: {
    code: "BIO",
    intro: "Alle Biologie-Module geordnet: Lebewesen untersuchen, vergleichen und Zusammenhänge verstehen.",
    accent: "#2f7d32",
    accentSoft: "#e9f6ea",
  },
  Mathematik: {
    code: "MAT",
    intro: "Alle Mathematik-Module geordnet: verstehen, trainieren und im Test sichern.",
    accent: "#1f7a55",
    accentSoft: "#e9f8f1",
  },
  Deutsch: {
    code: "DEU",
    intro: "Alle Deutsch-Module zusammengefasst: Sprache anwenden und Texte gezielt verbessern.",
    accent: "#8a4f2a",
    accentSoft: "#fceee4",
  },
  Geschichte: {
    code: "GES",
    intro: "Alle Geschichts-Module strukturiert: Quellen, Zusammenhänge und historische Lebenswelten.",
    accent: "#6a4ea8",
    accentSoft: "#efe9fb",
  },
  Erdkunde: {
    code: "ERD",
    intro: "Alle Erdkunde-Module im Fach-Dashboard: Räume verstehen und Orientierung trainieren.",
    accent: "#2d6f86",
    accentSoft: "#e8f4f8",
  },
  Englisch: {
    code: "ENG",
    intro: "Alle Englisch-Module gesammelt: Grammatik sicher anwenden und Sprache im Kontext üben.",
    accent: "#385da8",
    accentSoft: "#ebf0fb",
  },
  "Werte und Normen": {
    code: "WUN",
    intro: "Alle Werte-und-Normen-Module mit Fokus auf Fragen des Zusammenlebens und Weltanschauungen.",
    accent: "#7a5f1d",
    accentSoft: "#f9f2df",
  },
};

function subjectLink(subject) {
  return `subject-dashboard.html?subject=${encodeURIComponent(subject)}`;
}

function normalizeSearchText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseModuleTitle(title) {
  const text = String(title || "").trim();
  const match = text.match(/^modul\s*(\d+)\s*:\s*(.+)$/i);
  if (!match) {
    return {
      number: null,
      displayTitle: text,
      shortTag: null,
    };
  }
  return {
    number: Number(match[1]),
    displayTitle: match[2].trim(),
    shortTag: `M${match[1]}`,
  };
}

function moduleMatchesSearch(topic, term) {
  if (!term) {
    return true;
  }
  const haystack = normalizeSearchText(
    [
      topic.title,
      topic.description,
      ...(Array.isArray(topic.bulletPoints) ? topic.bulletPoints : []),
    ].join(" ")
  );
  return haystack.includes(term);
}

function updateSearchControls(searchTerm) {
  if (sdSearchClear instanceof HTMLButtonElement) {
    sdSearchClear.disabled = !searchTerm;
  }
}

function shortenText(text, maxLength = 110) {
  const cleaned = String(text || "").replace(/\s+/g, " ").trim();
  if (!cleaned) {
    return "";
  }
  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  const rawSlice = cleaned.slice(0, maxLength);
  const boundary = rawSlice.lastIndexOf(" ");
  const cutoff = boundary > 65 ? boundary : maxLength;
  return `${cleaned.slice(0, cutoff).trim()}...`;
}

function getTopicSortInfo(topic) {
  const moduleInfo = parseModuleTitle(topic.title);
  const hasOrder = Number.isFinite(topic.order);
  return {
    moduleNumber: Number.isFinite(moduleInfo.number) ? moduleInfo.number : null,
    hasOrder,
    order: hasOrder ? topic.order : null,
    hasLink: Boolean(topic.link),
    isMathCoreSeries: topic.subject === "Mathematik" && Number.isFinite(moduleInfo.number) && moduleInfo.number >= 1 && moduleInfo.number <= 4,
    title: topic.title,
  };
}

function parseSubjectFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("subject") || "";
}

function updateUrlSubject(subject) {
  const nextUrl = `${window.location.pathname}?subject=${encodeURIComponent(subject)}`;
  window.history.replaceState({}, "", nextUrl);
}

function createModuleCard(topic) {
  const card = document.createElement("article");
  card.className = "module-callout";
  const moduleInfo = parseModuleTitle(topic.title);

  const header = document.createElement("div");
  header.className = "sd-module-head";

  const moduleTag = document.createElement("span");
  moduleTag.className = "sd-module-tag";
  moduleTag.textContent = moduleInfo.shortTag || "Thema";
  header.append(moduleTag);

  const status = document.createElement("span");
  status.className = topic.link ? "sd-module-status is-ready" : "sd-module-status is-draft";
  status.textContent = topic.link ? "Verfügbar" : "In Vorbereitung";
  header.append(status);
  card.append(header);

  const title = document.createElement("h3");
  title.textContent = moduleInfo.displayTitle;
  card.append(title);

  if (topic.description) {
    const description = document.createElement("p");
    description.className = "sd-module-description";
    description.textContent = shortenText(topic.description);
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
    note.textContent = "Noch kein Link hinterlegt";
    card.append(note);
  }

  return card;
}

function setDrawerOpen(isOpen) {
  document.body.classList.toggle("sd-drawer-open", isOpen);
  if (drawerOverlay instanceof HTMLDivElement) {
    drawerOverlay.hidden = !isOpen;
  }
  if (subjectDrawer instanceof HTMLElement) {
    subjectDrawer.setAttribute("aria-hidden", isOpen ? "false" : "true");
  }
  if (drawerToggle instanceof HTMLButtonElement) {
    drawerToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }
}

function renderDrawerSubjects(subjects, currentSubject) {
  drawerSubjectList.replaceChildren();

  subjects.forEach((subject) => {
    const link = document.createElement("a");
    link.href = subjectLink(subject);
    link.textContent = subject;
    link.classList.toggle("is-current", subject === currentSubject);
    drawerSubjectList.append(link);
  });
}

function renderDrawerModules(topics, currentSubject) {
  drawerModuleList.replaceChildren();
  const modules = topics
    .filter((topic) => topic.subject === currentSubject)
    .sort(compareTopicsForDisplay);

  if (modules.length === 0) {
    const note = document.createElement("p");
    note.className = "card-intro";
    note.textContent = "Keine Module vorhanden.";
    drawerModuleList.append(note);
    return;
  }

  modules.forEach((topic) => {
    const moduleInfo = parseModuleTitle(topic.title);
    const label = moduleInfo.shortTag
      ? `${moduleInfo.shortTag}: ${moduleInfo.displayTitle}`
      : moduleInfo.displayTitle;

    if (topic.link) {
      const link = document.createElement("a");
      link.href = topic.link;
      link.textContent = label;
      link.title = `${topic.title} öffnen`;
      drawerModuleList.append(link);
      return;
    }

    const note = document.createElement("span");
    note.className = "is-disabled";
    note.textContent = `${label} (ohne Link)`;
    drawerModuleList.append(note);
  });
}

function applySubjectTheme(subject) {
  const theme = subjectThemes[subject] || {
    code: "FCH",
    intro: "Alle Module dieses Faches in einem einheitlichen Dashboard.",
    accent: "#0f5ea9",
    accentSoft: "#e7f2ff",
  };

  sdTag.textContent = "Fach-Dashboard Klasse 5";
  sdTitle.textContent = subject;
  sdIntro.textContent = theme.intro;
  sdModuleHead.textContent = `${subject} - Module`;
  sdVisualCode.textContent = theme.code;
  sdVisualText.textContent = `Fach: ${subject}`;

  if (sdVisual instanceof HTMLDivElement) {
    sdVisual.style.setProperty("--sd-accent", theme.accent);
    sdVisual.style.setProperty("--sd-accent-soft", theme.accentSoft);
  }

  document.documentElement.style.setProperty("--sd-accent", theme.accent);
  document.documentElement.style.setProperty("--sd-accent-soft", theme.accentSoft);
}

function renderModules(topics, subject, searchTerm = "") {
  const subjectModules = topics
    .filter((topic) => topic.subject === subject)
    .sort(compareTopicsForDisplay);
  const normalizedSearchTerm = normalizeSearchText(searchTerm);
  updateSearchControls(normalizedSearchTerm);
  const modules = subjectModules.filter((topic) => moduleMatchesSearch(topic, normalizedSearchTerm));
  sdModuleList.replaceChildren();

  if (subjectModules.length === 0) {
    sdEmptyState.hidden = false;
    sdEmptyState.textContent = "Für dieses Fach sind aktuell keine Module hinterlegt.";
    sdModuleCount.textContent = "0 Lernmodule";
    return;
  }

  if (modules.length === 0) {
    sdEmptyState.hidden = false;
    sdEmptyState.textContent = "Kein Modul passt zum aktuellen Filter.";
    sdModuleCount.textContent = `0 von ${subjectModules.length} Lernmodulen`;
    return;
  }

  sdEmptyState.hidden = true;
  sdModuleCount.textContent = normalizedSearchTerm
    ? `${modules.length} von ${subjectModules.length} Lernmodulen`
    : `${modules.length} Lernmodule`;
  modules.forEach((topic) => {
    sdModuleList.append(createModuleCard(topic));
  });
}

function compareTopicsForDisplay(a, b) {
  const infoA = getTopicSortInfo(a);
  const infoB = getTopicSortInfo(b);

  if (infoA.isMathCoreSeries !== infoB.isMathCoreSeries) {
    return infoA.isMathCoreSeries ? 1 : -1;
  }

  if (infoA.isMathCoreSeries && infoB.isMathCoreSeries && infoA.moduleNumber !== infoB.moduleNumber) {
    return infoA.moduleNumber - infoB.moduleNumber;
  }

  if (infoA.moduleNumber !== null && infoB.moduleNumber !== null && infoA.moduleNumber !== infoB.moduleNumber) {
    return infoA.moduleNumber - infoB.moduleNumber;
  }

  if (infoA.moduleNumber !== null && infoB.moduleNumber === null) {
    return -1;
  }

  if (infoA.moduleNumber === null && infoB.moduleNumber !== null) {
    return 1;
  }

  if (infoA.hasOrder && infoB.hasOrder && infoA.order !== infoB.order) {
    return infoA.order - infoB.order;
  }

  if (infoA.hasOrder && !infoB.hasOrder) {
    return -1;
  }

  if (!infoA.hasOrder && infoB.hasOrder) {
    return 1;
  }

  if (infoA.hasLink !== infoB.hasLink) {
    return infoA.hasLink ? -1 : 1;
  }

  return infoA.title.localeCompare(infoB.title, "de", { sensitivity: "base", numeric: true });
}

function initDashboard() {
  const hub = window.LERNHUB;
  if (!hub || typeof hub.loadTopics !== "function" || typeof hub.getSubjects !== "function") {
    sdTitle.textContent = "Fach-Dashboard";
    sdIntro.textContent = "Die Moduldaten konnten nicht geladen werden.";
    return;
  }

  const topics = hub.loadTopics();
  hub.saveTopics(topics);

  const subjects = hub.getSubjects(topics);
  if (subjects.length === 0) {
    sdTitle.textContent = "Fach-Dashboard";
    sdIntro.textContent = "Es sind aktuell keine Fächer hinterlegt.";
    return;
  }

  let currentSubject = parseSubjectFromQuery();
  if (!subjects.includes(currentSubject)) {
    currentSubject = subjects[0];
  }

  subjects.forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    sdSubjectSelect.append(option);
  });

  function renderCurrentSubject() {
    sdSubjectSelect.value = currentSubject;
    applySubjectTheme(currentSubject);
    const searchTerm = sdModuleSearch instanceof HTMLInputElement ? sdModuleSearch.value : "";
    renderModules(topics, currentSubject, searchTerm);
    renderDrawerSubjects(subjects, currentSubject);
    renderDrawerModules(topics, currentSubject);
    updateUrlSubject(currentSubject);
  }

  sdSubjectSelect.addEventListener("change", () => {
    currentSubject = sdSubjectSelect.value;
    renderCurrentSubject();
  });

  if (sdModuleSearch instanceof HTMLInputElement) {
    sdModuleSearch.addEventListener("input", () => {
      renderCurrentSubject();
    });
  }

  if (sdSearchClear instanceof HTMLButtonElement && sdModuleSearch instanceof HTMLInputElement) {
    sdSearchClear.addEventListener("click", () => {
      sdModuleSearch.value = "";
      renderCurrentSubject();
      sdModuleSearch.focus();
    });
  }

  renderCurrentSubject();
}

if (drawerToggle instanceof HTMLButtonElement) {
  drawerToggle.addEventListener("click", () => setDrawerOpen(true));
}

if (drawerClose instanceof HTMLButtonElement) {
  drawerClose.addEventListener("click", () => setDrawerOpen(false));
}

if (drawerOverlay instanceof HTMLDivElement) {
  drawerOverlay.addEventListener("click", () => setDrawerOpen(false));
}

if (drawerModuleList instanceof HTMLDivElement) {
  drawerModuleList.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      setDrawerOpen(false);
    }
  });
}

if (drawerSubjectList instanceof HTMLDivElement) {
  drawerSubjectList.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      setDrawerOpen(false);
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setDrawerOpen(false);
  }
});

initDashboard();
