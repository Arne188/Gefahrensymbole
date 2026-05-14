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
    subject: "Mathematik",
    title: "Modul 4: Koerper, Netze und Schraegbilder",
    link: "subjects/mathematik/koerper-und-darstellungen/mathematik-koerper-und-darstellungen.html",
    description: "Grundkoerper erkennen, Kantenmodelle lesen, Netze pruefen und Schraegbilder vervollstaendigen.",
    bulletPoints: [
      "Didaktische Kette: Objekt -> Kantenmodell -> Netz -> gebautes Modell -> Schraegbild.",
      "Altersgerechte Visualisierungen und viele neu generierbare Uebungsaufgaben.",
      "Netzpruefung (gueltig/ungueltig), Koerperzuordnung und Schraegbild-Ergaenzung.",
      "Abschluss-Check mit gemischten Fragen und direktem Feedback.",
    ],
    order: 4,
  },
  {
    subject: "Mathematik",
    title: "Modul 2: Flaecheninhalt und Umfang am Rechteck",
    link: "subjects/mathematik/flaecheninhalt-und-umfang-rechteck/mathematik-flaecheninhalt-und-umfang-rechteck.html",
    description: "Grundvorstellungen aufbauen, Formeln verstehen und Rechteckaufgaben sicher anwenden.",
    bulletPoints: [
      "Grundvorstellungen: Umfang als Randlaenge, Flaeche als Bedeckung.",
      "Formelaufbau verstehend: U = 2a + 2b und A = a * b.",
      "Aufgabentypen inkl. fehlende Seiten, Vergleiche (gleicher U / gleiche A) und Sachaufgaben.",
      "Dynamischer Diagnose-Check plus Reflexionsimpulse.",
    ],
    order: 2,
  },
  {
    subject: "Mathematik",
    title: "Modul 3: Zusammengesetzte Flaechen",
    link: "subjects/mathematik/zusammengesetzte-flaechen/mathematik-zusammengesetzte-flaechen.html",
    description: "Zerlegen und Ergaenzen bei zusammengesetzten Figuren mit Zeichnungen und unbegrenztem Uebungsgenerator.",
    bulletPoints: [
      "Strategiefragen: zerlegen, ergaenzen, fehlende Masse finden.",
      "Dynamische L-Formen mit klaren Masspfeilen und Loesungswegen.",
      "Aufgabentypen: Flaeche berechnen, fehlende Seiten, Sachaufgaben.",
      "Schnell-Check mit gemischten Aufgaben und direktem Feedback.",
    ],
    order: 3,
  },
  {
    subject: "Mathematik",
    title: "Modul 1: Einheiten und Anwenden",
    link: "subjects/mathematik/einheiten-und-anwenden/mathematik-einheiten-und-anwenden.html",
    description: "Einheiten sicher umrechnen und in Sachaufgaben anwenden (Flaeche, Masse, Zeit).",
    bulletPoints: [
      "Regel-Coach fuer Flaeche, Masse und Zeit.",
      "Unbegrenzt neue Aufgaben: Umrechnen, Vergleichen, passende Einheit, Sachaufgaben.",
      "Mehrere Schwierigkeitsstufen und direkte Auswertung mit Erklaerungen.",
      "Dynamischer Abschluss-Check mit 12 neu generierten Fragen.",
    ],
    order: 1,
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
    order: 90,
  },
  {
    subject: "Erdkunde",
    title: "Himmelsrichtungen",
    link: "subjects/erdkunde/himmelsrichtungen/erdkunde-himmelsrichtungen.html",
    description: "Kompassrose, Kartenorientierung, Lagebeziehungen und Abschlusstest interaktiv trainieren.",
  },
  {
    subject: "Erdkunde",
    title: "Planquadrate",
    link: "subjects/erdkunde/planquadrate/erdkunde-planquadrate.html",
    description: "Planquadrate benennen, Orte auf Karten finden und Wege entlang von Quadraten sicher beschreiben.",
  },
  {
    subject: "Erdkunde",
    title: "Wie kommt der Berg in die Karte?",
    link: "subjects/erdkunde/wie-kommt-der-berg-in-die-karte/erdkunde-wie-kommt-der-berg-in-die-karte.html",
    description: "Hoehenlinien (Isolinien) ausfuehrlich verstehen, interaktiv trainieren und im Test sicher anwenden.",
  },
  {
    subject: "Erdkunde",
    title: "Massstab in Karten",
    link: "subjects/erdkunde/massstab-in-karten/erdkunde-massstab-in-karten.html",
    description: "Mit klarem roten Faden den Kartenmassstab verstehen, interaktiv anwenden und in der Pruefung sichern.",
  },
  {
    subject: "Erdkunde",
    title: "Arbeiten und Ueben mit dem Atlas",
    link: "subjects/erdkunde/arbeiten-und-ueben-mit-dem-atlas/erdkunde-arbeiten-und-ueben-mit-dem-atlas.html",
    description: "Westermann-Atlas sicher nutzen: Register, Planquadrat, Kartenarten, Legende und Lage mit vielen Uebungen trainieren.",
  },
  {
    subject: "Erdkunde",
    title: "Wichtige Orte und Fluesse in Niedersachsen",
    link: "subjects/erdkunde/wichtige-orte-und-fluesse-in-niedersachsen/erdkunde-wichtige-orte-und-fluesse-in-niedersachsen.html",
    description: "Staedte, Fluesse und Landschaften in Niedersachsen interaktiv lernen, ueben und im Geographie-Quiz sichern.",
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
    order: 100,
  },
  {
    subject: "Geschichte",
    title: "Der Staat im Alten Ägypten",
    link: "subjects/geschichte/staat-im-alten-aegypten/geschichte-staat-im-alten-aegypten.html",
    description: "Staatsaufbau, Ämter, Gesellschaft und Nilverwaltung interaktiv lernen, trainieren und prüfen.",
    order: 110,
  },
  {
    subject: "Geschichte",
    title: "Der Pharao",
    link: "subjects/geschichte/der-pharao/geschichte-der-pharao.html",
    description: "Gottkönig, Herrschaftssymbole und Aufgaben des Pharaos interaktiv lernen, trainieren und prüfen.",
    order: 120,
  },
  {
    subject: "Geschichte",
    title: "Das alte Griechenland - Geographie",
    link: "subjects/geschichte/altes-griechenland-landschaft/geschichte-altes-griechenland-landschaft.html",
    description: "Gebirge, Meer, Poleis und Kolonisation im alten Griechenland interaktiv lernen, trainieren und prüfen.",
    order: 200,
  },
  {
    subject: "Geschichte",
    title: "Die Polis",
    link: "subjects/geschichte/die-polis/geschichte-die-polis.html",
    description: "Aufbau der Polis, ungleiche Rechte und Athen-Sparta-Vergleich mit Grafikarbeit, Training und Test.",
    order: 220,
  },
  {
    subject: "Geschichte",
    title: "Entstehung der Demokratie",
    link: "subjects/geschichte/entstehung-der-demokratie/geschichte-entstehung-der-demokratie.html",
    description: "Von Solon bis Kleisthenes: Entstehung der Demokratie in Athen mit Bild-Explorer, Uebungen und Pruefungsmodul.",
    order: 250,
  },
  {
    subject: "Geschichte",
    title: "Die Perserkriege",
    link: "subjects/geschichte/perserkriege/geschichte-perserkriege.html",
    description: "Ursachen, Verlauf und Bedeutung der Perserkriege mit Grafikarbeit, Trainingsaufgaben und Geschichts-Test.",
    order: 260,
  },
  {
    subject: "Geschichte",
    title: "Logos und Mythos",
    link: "subjects/geschichte/logos-und-mythos/geschichte-logos-und-mythos.html",
    description: "Mythos und Logos im Vergleich: Denkwege verstehen, ueben und im Pruefungsmodul sichern.",
    order: 270,
  },
  {
    subject: "Geschichte",
    title: "Glaube und Goetterwelt",
    link: "subjects/geschichte/glaube-und-goetterwelt/geschichte-glaube-und-goetterwelt.html",
    description: "Olympische Goetter, Symbole und Religion im Alltag mit Tempel, Opfer, Orakel, Festen, Training und Test.",
    order: 230,
  },
  {
    subject: "Geschichte",
    title: "Kultur und Alltag",
    link: "subjects/geschichte/kultur-und-alltag/geschichte-kultur-und-alltag.html",
    description: "Theater, Olympische Spiele, Erziehung und Alltag im alten Griechenland mit Grafikarbeit, Training und Test.",
    order: 240,
  },
  {
    subject: "Geschichte",
    title: "Kolonisation und Ausbreitung",
    link: "subjects/geschichte/kolonisation-und-ausbreitung/geschichte-kolonisation-und-ausbreitung.html",
    description: "Gruende, Ablauf und Folgen griechischer Kolonisation mit Kartenarbeit, Training und Test.",
    order: 210,
  },
  {
    subject: "Geschichte",
    title: "Alexander der Grosse",
    link: "subjects/geschichte/alexander-der-grosse/geschichte-alexander-der-grosse.html",
    description: "Alexander und Hellenismus mit Karte, Zeitleiste, kritischer Einordnung, Uebungen und Pruefungsmodul.",
    order: 280,
  },
  {
    subject: "Geschichte",
    title: "Zusammenfassung: Antikes Griechenland",
    link: "subjects/geschichte/zusammenfassung-antikes-griechenland/geschichte-zusammenfassung-antikes-griechenland.html",
    description: "Die 6 Leitgrafiken verknuepfen: kompakte Lernwerkstatt, umfassendes Uebungsmodul und Pruefungsarbeit mit Punkten.",
    order: 290,
  },
  {
    subject: "Geschichte",
    title: "Die Olympischen Spiele",
    link: "subjects/geschichte/olympische-spiele-im-alten-griechenland/geschichte-olympische-spiele.html",
    description: "Olympia als religioeses Fest: Zeus-Kult, Waffenruhe, Rituale, Wettkaempfe und Uebungsarbeit im historischen Kontext.",
    order: 300,
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
  const rawOrder = topic && Object.prototype.hasOwnProperty.call(topic, "order")
    ? Number(topic.order)
    : NaN;
  const order = Number.isFinite(rawOrder) ? rawOrder : null;

  return {
    subject: repairMojibake(topic.subject).trim(),
    title: repairMojibake(topic.title).trim(),
    link: String(topic.link || "").trim(),
    description: repairMojibake(topic.description).trim(),
    bulletPoints,
    order,
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
      order: Number.isFinite(topic.order) ? topic.order : existing.order,
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
      order: Number.isFinite(topic.order) ? topic.order : existing.order,
    });
  });

  return [...byTitle.values()];
}

function loadTopics() {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      return getDisplayTopics(dedupeTopics(defaultTopics));
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return getDisplayTopics(dedupeTopics(defaultTopics));
    }

    return getDisplayTopics(dedupeTopics([...parsed, ...defaultTopics]));
  } catch {
    return getDisplayTopics(dedupeTopics(defaultTopics));
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

function isMathBlankModule(topic) {
  if (topic.subject !== "Mathematik") {
    return false;
  }

  const searchableText = normalizeKeyPart(
    [
      topic.title,
      topic.description,
      ...(Array.isArray(topic.bulletPoints) ? topic.bulletPoints : []),
    ].join(" ")
  );

  return (
    !topic.link ||
    searchableText.includes("blanko") ||
    searchableText.includes("platzhalter") ||
    searchableText.includes("dummy modul") ||
    searchableText.includes("in vorbereitung")
  );
}

function getDisplayTopics(topics) {
  return topics.filter((topic) => !isMathBlankModule(topic));
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
    description.textContent = shortenText(topic.description);
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

function parseModuleSortNumber(title) {
  const match = String(title || "").trim().match(/^modul\s*(\d+)\s*:/i);
  return match ? Number(match[1]) : null;
}

function isMathCoreSeriesModule(topic) {
  if (topic.subject !== "Mathematik") {
    return false;
  }
  const title = String(topic.title || "").trim();
  return /^modul\s*[1-4]\s*:/i.test(title);
}

function compareTopicsForDisplay(a, b) {
  const moduleNumberA = parseModuleSortNumber(a.title);
  const moduleNumberB = parseModuleSortNumber(b.title);
  const hasOrderA = Number.isFinite(a.order);
  const hasOrderB = Number.isFinite(b.order);
  const hasLinkA = Boolean(a.link);
  const hasLinkB = Boolean(b.link);
  const isSeriesA = isMathCoreSeriesModule(a);
  const isSeriesB = isMathCoreSeriesModule(b);

  if (isSeriesA !== isSeriesB) {
    return isSeriesA ? 1 : -1;
  }

  if (isSeriesA && isSeriesB && moduleNumberA !== null && moduleNumberB !== null && moduleNumberA !== moduleNumberB) {
    return moduleNumberA - moduleNumberB;
  }

  if (moduleNumberA !== null && moduleNumberB !== null && moduleNumberA !== moduleNumberB) {
    return moduleNumberA - moduleNumberB;
  }

  if (moduleNumberA !== null && moduleNumberB === null) {
    return -1;
  }

  if (moduleNumberA === null && moduleNumberB !== null) {
    return 1;
  }

  if (hasOrderA && hasOrderB && a.order !== b.order) {
    return a.order - b.order;
  }

  if (hasOrderA && !hasOrderB) {
    return -1;
  }

  if (!hasOrderA && hasOrderB) {
    return 1;
  }

  if (hasLinkA !== hasLinkB) {
    return hasLinkA ? -1 : 1;
  }

  return a.title.localeCompare(b.title, "de", { sensitivity: "base", numeric: true });
}

function renderModules(topics, subject) {
  const filteredTopics = getDisplayTopics(topics)
    .filter((topic) => topic.subject === subject)
    .sort(compareTopicsForDisplay);
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
  getDisplayTopics,
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



