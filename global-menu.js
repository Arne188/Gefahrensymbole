(function setupGlobalMenu() {
  if (document.getElementById("drawerToggle")) {
    return;
  }

  const basePrefix = (function detectBasePrefix() {
    const script = document.currentScript;
    const src = script ? script.getAttribute("src") || "" : "";
    if (!src || !src.endsWith("global-menu.js")) {
      return "";
    }
    return src.slice(0, -"global-menu.js".length);
  })();

  const storageKey = "lernbereich_themen_v1";
  const fallbackTopics = [
    { subject: "Chemie", title: "Gefahrstoffkennzeichen", link: "subjects/chemie/gefahrstoffkennzeichen/chemie-gefahrstoffe.html" },
    { subject: "Chemie", title: "Laborgeräte und Sicherheit", link: "subjects/chemie/laborgeraete-und-sicherheit/chemie-laborgeraete.html" },
    { subject: "Chemie", title: "Gasbrenner", link: "subjects/chemie/gasbrenner/chemie-gasbrenner.html" },
    { subject: "Deutsch", title: "Märchenanalyse schreiben", link: "subjects/deutsch/maerchenanalyse/deutsch-maerchenanalyse.html" },
    { subject: "Deutsch", title: "Märchen schreiben", link: "subjects/deutsch/maerchen-schreiben/deutsch-maerchen-schreiben.html" },
    { subject: "Deutsch", title: "Groß- und Kleinschreibung", link: "subjects/deutsch/gross-und-kleinschreibung/deutsch-gross-und-kleinschreibung.html" },
    { subject: "Englisch", title: "Sentences with if - Part 1", link: "subjects/englisch/if-sentences-part-1/englisch-if-sentences.html" },
    { subject: "Erdkunde", title: "Vom Luftbild zur Karte", link: "subjects/erdkunde/vom-luftbild-zur-karte/erdkunde-luftbild-karte.html" },
    { subject: "Erdkunde", title: "Himmelsrichtungen", link: "subjects/erdkunde/himmelsrichtungen/erdkunde-himmelsrichtungen.html" },
    { subject: "Geschichte", title: "Ägypten - Geschenk des Nils", link: "subjects/geschichte/aegypten-geschenk-des-nils/geschichte-aegypten-nil.html" },
    { subject: "Geschichte", title: "Glaube im Alten Ägypten", link: "subjects/geschichte/glaube-im-alten-aegypten/geschichte-glaube-im-alten-aegypten.html" },
    { subject: "Geschichte", title: "Der Staat im Alten Ägypten", link: "subjects/geschichte/staat-im-alten-aegypten/geschichte-staat-im-alten-aegypten.html" },
    { subject: "Geschichte", title: "Der Pharao", link: "subjects/geschichte/der-pharao/geschichte-der-pharao.html" },
    { subject: "Geschichte", title: "Das alte Griechenland - Geographie", link: "subjects/geschichte/altes-griechenland-landschaft/geschichte-altes-griechenland-landschaft.html" },
    { subject: "Mathematik", title: "Besondere Vierecke", link: "subjects/mathematik/besondere-vierecke/mathematik-besondere-vierecke.html" },
    { subject: "Mathematik", title: "Längeneinheiten und Umrechnungen", link: "subjects/mathematik/laengeneinheiten-und-umrechnungen/mathematik-laengeneinheiten-und-umrechnungen.html" },
    { subject: "Mathematik", title: "Maßstab", link: "subjects/mathematik/massstab/mathematik-massstab.html" },
    { subject: "Mathematik", title: "Achsensymmetrie und Punktsymmetrie", link: "subjects/mathematik/achsensymmetrie-und-punktsymmetrie/mathematik-achsensymmetrie-und-punktsymmetrie.html" },
    { subject: "Mathematik", title: "Das Koordinatensystem", link: "subjects/mathematik/das-koordinatensystem/mathematik-das-koordinatensystem.html" },
    { subject: "Werte und Normen", title: "Modul 1: Gottesvorstellungen verstehen", link: "subjects/werte-und-normen/gottesvorstellungen-grundlagen/werte-und-normen-glaubensrichtungen.html" },
    { subject: "Werte und Normen", title: "Modul 2: Gottesvorstellungen im Monotheismus", link: "subjects/werte-und-normen/gottesvorstellungen-im-monotheismus/werte-und-normen-monotheistische-gottesvorstellungen.html" },
    { subject: "Werte und Normen", title: "Modul 3: Menschen des Glaubens", link: "subjects/werte-und-normen/menschen-des-glaubens/werte-und-normen-menschen-des-glaubens.html" },
  ];

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .trim()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/\s+/g, " ");
  }

  function withPrefix(prefix, path) {
    if (!path) {
      return prefix || "";
    }
    return `${prefix}${path}`;
  }

  function getTopics() {
    if (window.LERNHUB && typeof window.LERNHUB.loadTopics === "function") {
      const loaded = window.LERNHUB.loadTopics();
      if (Array.isArray(loaded) && loaded.length > 0) {
        return loaded.filter((entry) => entry && entry.subject && entry.title && entry.link);
      }
    }

    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.filter((entry) => entry && entry.subject && entry.title && entry.link);
        }
      }
    } catch {
      return fallbackTopics;
    }

    return fallbackTopics;
  }

  function inferCurrentSubject(subjects) {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("subject");
    if (fromQuery && subjects.includes(fromQuery)) {
      return fromQuery;
    }

    const parts = window.location.pathname.split("/").filter(Boolean);
    const subjectsIndex = parts.indexOf("subjects");
    if (subjectsIndex >= 0 && parts[subjectsIndex + 1]) {
      const fromPath = normalize(parts[subjectsIndex + 1]);
      const match = subjects.find((subject) => normalize(subject) === fromPath);
      if (match) {
        return match;
      }
    }

    return subjects[0] || "";
  }

  function setDrawerOpen(isOpen, refs) {
    document.body.classList.toggle("gm-drawer-open", isOpen);
    refs.overlay.hidden = !isOpen;
    refs.drawer.setAttribute("aria-hidden", isOpen ? "false" : "true");
    refs.toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  function createLayout(prefix) {
    const toggle = document.createElement("button");
    toggle.id = "gmToggle";
    toggle.className = "gm-menu-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-controls", "gmDrawer");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = '<span class="gm-menu-bars" aria-hidden="true"></span>Menü';

    const overlay = document.createElement("div");
    overlay.id = "gmOverlay";
    overlay.className = "gm-overlay";
    overlay.hidden = true;

    const drawer = document.createElement("aside");
    drawer.id = "gmDrawer";
    drawer.className = "gm-drawer";
    drawer.setAttribute("aria-label", "Navigation");
    drawer.setAttribute("aria-hidden", "true");
    drawer.innerHTML = `
      <div class="gm-drawer-head">
        <h2>Navigation</h2>
        <button id="gmClose" type="button">Schließen</button>
      </div>
      <section class="gm-drawer-block">
        <h3>Schnellzugriff</h3>
        <div class="gm-link-list">
          <a href="${withPrefix(prefix, "index.html")}">Startseite</a>
          <a href="${withPrefix(prefix, "subject-dashboard.html")}">Fach-Dashboard</a>
        </div>
      </section>
      <section class="gm-drawer-block">
        <h3>Fächer</h3>
        <div id="gmSubjectList" class="gm-link-list"></div>
      </section>
      <section class="gm-drawer-block">
        <h3>Module im Fach</h3>
        <div id="gmModuleList" class="gm-link-list"></div>
      </section>
    `;

    document.body.append(toggle, overlay, drawer);
    return {
      toggle,
      overlay,
      drawer,
      close: drawer.querySelector("#gmClose"),
      subjectList: drawer.querySelector("#gmSubjectList"),
      moduleList: drawer.querySelector("#gmModuleList"),
    };
  }

  function init() {
    const prefix = basePrefix;
    const topics = getTopics();
    const subjects = [...new Set(topics.map((entry) => entry.subject))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, "de", { sensitivity: "base" }));

    if (subjects.length === 0) {
      return;
    }

    const currentSubject = inferCurrentSubject(subjects);
    const refs = createLayout(prefix);

    subjects.forEach((subject) => {
      const link = document.createElement("a");
      link.href = `${withPrefix(prefix, "subject-dashboard.html")}?subject=${encodeURIComponent(subject)}`;
      link.textContent = subject;
      if (subject === currentSubject) {
        link.classList.add("is-current");
      }
      refs.subjectList.append(link);
    });

    const modules = topics
      .filter((entry) => entry.subject === currentSubject && entry.link)
      .sort((a, b) => a.title.localeCompare(b.title, "de", { sensitivity: "base" }));

    if (modules.length === 0) {
      const note = document.createElement("span");
      note.className = "is-disabled";
      note.textContent = "Keine Module vorhanden";
      refs.moduleList.append(note);
    } else {
      modules.forEach((entry) => {
        const link = document.createElement("a");
        link.href = withPrefix(prefix, entry.link);
        link.textContent = entry.title;
        refs.moduleList.append(link);
      });
    }

    refs.toggle.addEventListener("click", () => setDrawerOpen(true, refs));
    refs.close.addEventListener("click", () => setDrawerOpen(false, refs));
    refs.overlay.addEventListener("click", () => setDrawerOpen(false, refs));

    refs.drawer.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLAnchorElement) {
        setDrawerOpen(false, refs);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setDrawerOpen(false, refs);
      }
    });
  }

  function ensureHubAndInit() {
    if (window.LERNHUB) {
      init();
      return;
    }

    const prefix = basePrefix;
    const script = document.createElement("script");
    script.src = withPrefix(prefix, "index.js");
    script.onload = init;
    script.onerror = init;
    document.head.append(script);
  }

  ensureHubAndInit();
})();
