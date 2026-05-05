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

  const title = document.createElement("h3");
  title.textContent = topic.title;
  card.append(title);

  if (topic.description) {
    const description = document.createElement("p");
    description.textContent = topic.description;
    card.append(description);
  }

  if (topic.link) {
    const link = document.createElement("a");
    link.className = "button-link";
    link.href = topic.link;
    link.textContent = "Modul öffnen";
    card.append(link);
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
    .filter((topic) => topic.subject === currentSubject && topic.link)
    .sort(compareTopicsForDisplay);

  if (modules.length === 0) {
    const note = document.createElement("p");
    note.className = "card-intro";
    note.textContent = "Keine Module vorhanden.";
    drawerModuleList.append(note);
    return;
  }

  modules.forEach((topic) => {
    const link = document.createElement("a");
    link.href = topic.link;
    link.textContent = topic.title;
    link.title = `${topic.title} öffnen`;
    drawerModuleList.append(link);
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

function renderModules(topics, subject) {
  const modules = topics
    .filter((topic) => topic.subject === subject && topic.link)
    .sort(compareTopicsForDisplay);
  sdModuleList.replaceChildren();

  if (modules.length === 0) {
    sdEmptyState.hidden = false;
    sdModuleCount.textContent = "0 Lernmodule";
    return;
  }

  sdEmptyState.hidden = true;
  sdModuleCount.textContent = `${modules.length} Lernmodule`;
  modules.forEach((topic) => {
    sdModuleList.append(createModuleCard(topic));
  });
}

function compareTopicsForDisplay(a, b) {
  const hasOrderA = Number.isFinite(a.order);
  const hasOrderB = Number.isFinite(b.order);

  if (hasOrderA && hasOrderB && a.order !== b.order) {
    return a.order - b.order;
  }

  if (hasOrderA && !hasOrderB) {
    return -1;
  }

  if (!hasOrderA && hasOrderB) {
    return 1;
  }

  return a.title.localeCompare(b.title, "de", { sensitivity: "base", numeric: true });
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
    renderModules(topics, currentSubject);
    renderDrawerSubjects(subjects, currentSubject);
    renderDrawerModules(topics, currentSubject);
    updateUrlSubject(currentSubject);
  }

  sdSubjectSelect.addEventListener("change", () => {
    currentSubject = sdSubjectSelect.value;
    renderCurrentSubject();
  });

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
