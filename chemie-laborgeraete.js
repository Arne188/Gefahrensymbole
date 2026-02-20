const svgLibrary = {
  becherglas: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M60 20h100v108a10 10 0 0 1-10 10H70a10 10 0 0 1-10-10z" class="line"/>
      <path d="M70 86h80" class="liquid"/>
      <path d="M70 86c8 6 72 6 80 0" class="meniscus"/>
      <path d="M78 40h18M78 52h18M78 64h18M78 76h18" class="mark"/>
    </svg>
  `,
  erlenmeyer: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M94 20h32v26l37 84a8 8 0 0 1-8 10H65a8 8 0 0 1-8-10l37-84z" class="line"/>
      <path d="M78 92h64" class="liquid"/>
      <path d="M78 92c10 8 54 8 64 0" class="meniscus"/>
    </svg>
  `,
  messzylinder: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M86 20h48v108H86z" class="line"/>
      <path d="M78 130h64v10H78z" class="line"/>
      <path d="M92 70h36" class="liquid"/>
      <path d="M92 70c4 4 32 4 36 0" class="meniscus"/>
      <path d="M92 34h10M92 44h10M92 54h10M92 64h10M92 74h10M92 84h10M92 94h10" class="mark"/>
    </svg>
  `,
  bunsenbrenner: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <rect x="88" y="34" width="44" height="74" class="line"/>
      <rect x="74" y="108" width="72" height="18" class="line"/>
      <path d="M110 24c12 12 12 28 0 40-12-12-12-28 0-40z" class="flame-outer"/>
      <path d="M110 36c7 7 7 15 0 23-7-8-7-16 0-23z" class="flame-inner"/>
      <circle cx="92" cy="74" r="4" class="line"/>
    </svg>
  `,
  dreifuss: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <ellipse cx="110" cy="48" rx="40" ry="14" class="line"/>
      <path d="M78 58 62 132M110 62 110 132M142 58 158 132" class="line"/>
    </svg>
  `,
  keramikdrahtnetz: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <rect x="62" y="42" width="96" height="76" class="line"/>
      <path d="M80 42v76M98 42v76M116 42v76M134 42v76M152 42v76" class="mark"/>
      <path d="M62 56h96M62 70h96M62 84h96M62 98h96M62 112h96" class="mark"/>
      <circle cx="110" cy="80" r="18" class="line"/>
    </svg>
  `,
  abdampfschale: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M62 74c6 32 90 32 96 0" class="line"/>
      <path d="M62 74c16 10 80 10 96 0" class="line"/>
      <path d="M78 94h64" class="liquid"/>
      <path d="M90 40c5 7-1 12-1 18M110 36c5 8-1 13-1 20M130 40c5 7-1 12-1 18" class="steam"/>
    </svg>
  `,
  tiegel: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M78 62h64l-8 52H86z" class="line"/>
      <ellipse cx="110" cy="56" rx="38" ry="10" class="line"/>
      <ellipse cx="110" cy="46" rx="34" ry="9" class="line"/>
      <circle cx="110" cy="46" r="4" class="line"/>
    </svg>
  `,
  trichter: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M62 34h96l-42 54v36h-12V88z" class="line"/>
    </svg>
  `,
  filterpapier: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M62 34h96l-42 54v36h-12V88z" class="line"/>
      <path d="M74 44h72l-31 40v26h-10V84z" class="paper"/>
      <path d="M104 110h12v10h-12z" class="drop"/>
    </svg>
  `,
  scheidetrichter: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M98 20h24v16c0 6 16 18 16 34 0 20-12 36-28 44v18h-8v-18c-16-8-28-24-28-44 0-16 16-28 16-34z" class="line"/>
      <path d="M86 80h48" class="liquid"/>
      <rect x="102" y="116" width="16" height="8" class="line"/>
      <rect x="108" y="124" width="4" height="14" class="line"/>
    </svg>
  `,
  woulffsche: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M72 46h76v72H72z" class="line"/>
      <path d="M84 24v22M110 20v26M136 24v22" class="line"/>
      <path d="M84 82h52" class="liquid"/>
    </svg>
  `,
  exikkator: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M64 82c8 42 84 42 92 0" class="line"/>
      <path d="M64 82h92" class="line"/>
      <path d="M78 82h64" class="mark"/>
      <path d="M74 58c6-28 66-28 72 0" class="line"/>
      <circle cx="110" cy="52" r="4" class="line"/>
    </svg>
  `,
  saugflasche: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M92 22h36v24l26 56a10 10 0 0 1-10 16H76a10 10 0 0 1-10-16l26-56z" class="line"/>
      <path d="M128 58h28" class="line"/>
      <path d="M78 90h64" class="liquid"/>
    </svg>
  `,
};

const deviceImageMap =
  typeof window !== "undefined" &&
  window.LAB_DEVICE_IMAGE_MAP &&
  typeof window.LAB_DEVICE_IMAGE_MAP === "object"
    ? window.LAB_DEVICE_IMAGE_MAP
    : {};

const fallbackSvgByCategory = {
  reaktion_gefaesse: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M62 26h96v98a10 10 0 0 1-10 10H72a10 10 0 0 1-10-10z" class="line"/>
      <path d="M74 86h72" class="liquid"/>
      <path d="M74 86c8 6 64 6 72 0" class="meniscus"/>
    </svg>
  `,
  messen: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M56 116h108" class="line"/>
      <path d="M62 40v76M78 52v64M94 46v70M110 52v64M126 46v70M142 52v64" class="mark"/>
      <path d="M158 46v70" class="line"/>
      <circle cx="176" cy="86" r="14" class="line"/>
      <path d="M176 60v52" class="mark"/>
    </svg>
  `,
  erhitzen: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <rect x="82" y="90" width="56" height="16" class="line"/>
      <rect x="96" y="44" width="28" height="46" class="line"/>
      <path d="M110 26c12 10 12 24 0 34-12-10-12-24 0-34z" class="flame-outer"/>
      <path d="M110 36c6 6 6 14 0 20-6-6-6-14 0-20z" class="flame-inner"/>
    </svg>
  `,
  trennung: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M56 34h108l-46 52v36h-16V86z" class="line"/>
      <path d="M70 44h80l-32 36v22h-8V80z" class="mark"/>
      <path d="M102 122h16v12h-16z" class="drop"/>
    </svg>
  `,
  werkzeuge: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M58 112 94 76l12 12-36 36z" class="line"/>
      <path d="M92 74c8-14 28-22 44-18l-16 16 12 12 16-16c4 16-4 36-18 44" class="line"/>
      <circle cx="154" cy="94" r="16" class="line"/>
    </svg>
  `,
  sicherheit: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <path d="M110 24 156 40v34c0 32-18 50-46 62-28-12-46-30-46-62V40z" class="line"/>
      <path d="M110 52v42M90 72h40" class="mark"/>
    </svg>
  `,
  default: `
    <svg viewBox="0 0 220 160" aria-hidden="true">
      <rect x="64" y="34" width="92" height="92" class="line"/>
      <path d="M64 70h92M64 98h92" class="mark"/>
    </svg>
  `,
};

svgLibrary.trichter_glas = svgLibrary.trichter;
svgLibrary.trichter_kunststoff = svgLibrary.trichter;
svgLibrary.pulvertrichter = svgLibrary.trichter;
svgLibrary.buechnertrichter = svgLibrary.trichter;
svgLibrary.woulffsche_flasche = svgLibrary.woulffsche;

function getDeviceSvg(device) {
  return svgLibrary[device.id] || fallbackSvgByCategory[device.category] || fallbackSvgByCategory.default;
}

function getDeviceImagePath(device) {
  return deviceImageMap[device.id] || null;
}

function getDeviceVisualMarkup(device, variant) {
  const imagePath = getDeviceImagePath(device);
  if (imagePath) {
    if (variant === "quiz") {
      return `<img class="quiz-photo" src="${imagePath}" alt="${device.name}">`;
    }
    if (variant === "modal") {
      return `<img class="modal-photo" src="${imagePath}" alt="${device.name}">`;
    }
    return `<img class="device-photo" src="${imagePath}" alt="${device.name}">`;
  }

  const svg = getDeviceSvg(device);
  if (variant === "quiz") {
    return `<div class="quiz-svg">${svg}</div>`;
  }
  if (variant === "modal") {
    return `<div class="modal-svg">${svg}</div>`;
  }
  return `<div class="device-svg">${svg}</div>`;
}

const allDeviceCatalog = [
  // Gefäße, Reaktion, Mischung, Aufbewahrung
  { id: "becherglas", name: "Becherglas", category: "reaktion_gefaesse", precision: "niedrig", functionText: "Zylindrisches Gefäß zum Mischen, Erhitzen und Übertragen.", useShort: "Mischen, Erhitzen und grobes Abmessen von Flüssigkeiten." },
  { id: "erlenmeyer", name: "Erlenmeyerkolben", category: "reaktion_gefaesse", precision: "niedrig bis mittel", functionText: "Konischer Kolben mit engem Hals für schwenkendes Arbeiten.", useShort: "Reaktionen und Schwenken mit geringer Spritzgefahr." },
  { id: "reagenzglas", name: "Reagenzglas", category: "reaktion_gefaesse", precision: "niedrig", functionText: "Kleines Glasrohr für Experimente mit kleinen Stoffmengen.", useShort: "Reaktionen mit kleinsten Stoffmengen." },
  { id: "reagenzglasgestell", name: "Reagenzglasgestell", category: "reaktion_gefaesse", precision: "nicht zutreffend", functionText: "Gestell zur sicheren Aufbewahrung mehrerer Reagenzgläser.", useShort: "Reagenzgläser stabil aufstellen und ordnen." },
  { id: "rundkolben", name: "Rundkolben", category: "reaktion_gefaesse", precision: "nicht zutreffend", functionText: "Kolben mit kugelförmigem Körper, oft für Erhitzung und Destillation.", useShort: "Gleichmäßiges Erhitzen bei Reaktions- und Destillationsaufbauten." },
  { id: "mehrhalskolben", name: "Mehrhalskolben", category: "reaktion_gefaesse", precision: "nicht zutreffend", functionText: "Rundkolben mit mehreren Anschlüssen für komplexe Apparaturen.", useShort: "Gleichzeitiges Anschließen mehrerer Komponenten." },
  { id: "siedekolben_florence", name: "Siedekolben (Florence-Flasche)", category: "reaktion_gefaesse", precision: "nicht zutreffend", functionText: "Rundbodenkolben für Siede- und Erhitzungsvorgänge.", useShort: "Sieden und gleichmäßiges Erhitzen von Flüssigkeiten." },
  { id: "standzylinder", name: "Standzylinder", category: "reaktion_gefaesse", precision: "niedrig", functionText: "Hoher Zylinder für Aufbewahrung, Beobachtung und einfache Trennungen.", useShort: "Flüssigkeiten stehend aufbewahren oder Schichtungen beobachten." },
  { id: "petrischale", name: "Petrischale", category: "reaktion_gefaesse", precision: "nicht zutreffend", functionText: "Flache Schale für kleine Proben und Beobachtungen.", useShort: "Kleine Proben ausbreiten und beobachten." },
  { id: "uhrglas", name: "Uhrglas", category: "reaktion_gefaesse", precision: "nicht zutreffend", functionText: "Flache Glasform zum Verdampfen kleiner Mengen oder Abdecken.", useShort: "Kleine Mengen verdampfen oder Becher abdecken." },

  // Präzises Messen
  { id: "messzylinder", name: "Messzylinder", category: "messen", precision: "mittel bis hoch", functionText: "Skaliertes Gefäß zum genauen Abmessen von Volumina.", useShort: "Volumina deutlich genauer als im Becherglas messen." },
  { id: "messpipette", name: "Messpipette", category: "messen", precision: "hoch", functionText: "Skalierte Pipette für variable, genaue Volumenabgabe.", useShort: "Unterschiedliche kleine Volumina exakt dosieren." },
  { id: "vollpipette", name: "Vollpipette", category: "messen", precision: "sehr hoch", functionText: "Kalibrierte Pipette für ein festes Volumen.", useShort: "Ein festes Volumen sehr exakt abmessen." },
  { id: "pasteurpipette", name: "Pasteurpipette", category: "messen", precision: "niedrig bis mittel", functionText: "Tropfpipette zum Umfüllen und Dosieren kleiner Mengen.", useShort: "Kleine Flüssigkeitsmengen tropfenweise übertragen." },
  { id: "mikropipette", name: "Mikropipette", category: "messen", precision: "sehr hoch", functionText: "Präzises Dosieren sehr kleiner Volumina im Mikroliterbereich.", useShort: "Mikrolitermengen exakt dosieren." },
  { id: "buerette", name: "Bürette", category: "messen", precision: "sehr hoch", functionText: "Kalibrierte Röhre mit Hahn für Titrationen.", useShort: "Volumen bei Titrationen tropfenweise exakt zugeben." },
  { id: "messkolben", name: "Messkolben", category: "messen", precision: "sehr hoch", functionText: "Kalibriertes Gefäß zur Herstellung exakter Lösungsvolumina.", useShort: "Lösungen auf ein genaues Endvolumen einstellen." },
  { id: "waage", name: "Waage", category: "messen", precision: "hoch", functionText: "Bestimmt die Masse von Stoffen quantitativ.", useShort: "Masse von Chemikalien exakt erfassen." },
  { id: "einschlussthermometer", name: "Einschlussthermometer", category: "messen", precision: "mittel bis hoch", functionText: "Thermometer zur Temperaturbestimmung in Apparaturen.", useShort: "Temperaturen in geschlossenen/teilgeschlossenen Systemen messen." },
  { id: "stabthermometer", name: "Stabthermometer", category: "messen", precision: "mittel", functionText: "Klassisches Laborthermometer für direkte Messungen.", useShort: "Temperaturen direkt in Proben messen." },
  { id: "widerstandsthermometer", name: "Widerstandsthermometer", category: "messen", precision: "hoch", functionText: "Elektronische Temperaturmessung über Widerstandsänderung.", useShort: "Temperatur präzise elektronisch erfassen." },

  // Erhitzen und thermische Verfahren
  { id: "bunsenbrenner", name: "Bunsenbrenner", category: "erhitzen", precision: "nicht zutreffend", functionText: "Standardflamme im Labor mit Luftregulierung.", useShort: "Gezieltes Erhitzen mit regulierbarer Flamme." },
  { id: "teclubrenner", name: "Teclubrenner", category: "erhitzen", precision: "nicht zutreffend", functionText: "Brenner mit breiter Luftzufuhr für stabile Flammen.", useShort: "Stabile Laborflamme für Erhitzung." },
  { id: "knallgasbrenner", name: "Knallgasbrenner", category: "erhitzen", precision: "nicht zutreffend", functionText: "Sehr heiße Flamme aus Wasserstoff/Sauerstoff-Gemisch.", useShort: "Sehr hohe Temperaturen für Spezialanwendungen." },
  { id: "dreifuss", name: "Dreifuss", category: "erhitzen", precision: "nicht zutreffend", functionText: "Stativgerät für Gefäße über der Flamme.", useShort: "Gefäße sicher über Brenner positionieren." },
  { id: "keramikdrahtnetz", name: "Keramikdrahtnetz", category: "erhitzen", precision: "nicht zutreffend", functionText: "Hitzeverteiler zwischen Flamme und Glasgefäß.", useShort: "Hitze gleichmäßig auf Glasgefäße verteilen." },
  { id: "tondreieck", name: "Tondreieck", category: "erhitzen", precision: "nicht zutreffend", functionText: "Auflage für Tiegel am Stativring.", useShort: "Tiegel beim starken Erhitzen sicher tragen." },
  { id: "tiegel", name: "Tiegel", category: "erhitzen", precision: "nicht zutreffend", functionText: "Hitzebeständiges Gefäß für starke Erhitzung von Feststoffen.", useShort: "Feststoffe sehr stark erhitzen." },
  { id: "abdampfschale", name: "Abdampfschale", category: "erhitzen", precision: "nicht zutreffend", functionText: "Flache Schale zum Eindampfen von Lösungen.", useShort: "Lösungsmittel abtrennen und Lösungen konzentrieren." },
  { id: "trockenschrank", name: "Trockenschrank", category: "erhitzen", precision: "nicht zutreffend", functionText: "Wärmeschrank zum Trocknen von Stoffen und Geräten.", useShort: "Stoffe und Geräte unter kontrollierter Wärme trocknen." },
  { id: "exikkator", name: "Exikkator", category: "erhitzen", precision: "nicht zutreffend", functionText: "Trockenbehälter mit Trockenmittel gegen Luftfeuchtigkeit.", useShort: "Proben feuchtigkeitsarm lagern und nachtrocknen." },
  { id: "trockenpistole", name: "Trockenpistole", category: "erhitzen", precision: "nicht zutreffend", functionText: "Warmluftgerät zum schnellen Trocknen von Glasgeräten.", useShort: "Geräte gezielt mit Warmluft trocknen." },
  { id: "trockenrohr", name: "Trockenrohr", category: "erhitzen", precision: "nicht zutreffend", functionText: "Rohr mit Trockenmittel für gasförmige Ströme.", useShort: "Gase und Apparaturen gegen Feuchtigkeit schützen." },

  // Trennverfahren und Spezialapparaturen
  { id: "trichter_glas", name: "Trichter (Glas)", category: "trennung", precision: "nicht zutreffend", functionText: "Glastrichter zum Umfüllen und Filtrieren.", useShort: "Flüssigkeiten sauber umfüllen oder filtrieren." },
  { id: "trichter_kunststoff", name: "Trichter (Kunststoff)", category: "trennung", precision: "nicht zutreffend", functionText: "Chemikalienfester Trichter zum sicheren Umfüllen.", useShort: "Flüssigkeiten sicher in enge Öffnungen füllen." },
  { id: "pulvertrichter", name: "Pulvertrichter", category: "trennung", precision: "nicht zutreffend", functionText: "Breite Öffnung für Feststoffe und Pulver.", useShort: "Pulver ohne Verluste einfüllen." },
  { id: "filterpapier", name: "Filterpapier", category: "trennung", precision: "nicht zutreffend", functionText: "Poröses Papier für Feststoff-Flüssigkeit-Trennung.", useShort: "Feststoffe aus Flüssigkeiten filtrieren." },
  { id: "saugflasche", name: "Saugflasche", category: "trennung", precision: "nicht zutreffend", functionText: "Flasche mit Seitenstutzen für Vakuumfiltration.", useShort: "Filtration mit Unterdruck beschleunigen." },
  { id: "buechnertrichter", name: "Büchner-Trichter", category: "trennung", precision: "nicht zutreffend", functionText: "Spezialtrichter mit Lochplatte für Vakuumfiltration.", useShort: "Schnelle Vakuumfiltration mit Filterpapier." },
  { id: "scheidetrichter", name: "Scheidetrichter", category: "trennung", precision: "nicht zutreffend", functionText: "Trennt nicht mischbare Flüssigkeiten nach Dichte.", useShort: "Flüssigkeitsphasen gezielt trennen." },
  { id: "waschflasche", name: "Waschflasche", category: "trennung", precision: "nicht zutreffend", functionText: "Gas wird durch Flüssigkeit geleitet, um es zu reinigen.", useShort: "Gase reinigen oder absorbieren." },
  { id: "woulffsche_flasche", name: "Woulffsche Flasche", category: "trennung", precision: "nicht zutreffend", functionText: "Mehrhalsige Gaswaschflasche für mehrstufige Gasbehandlung.", useShort: "Gase mehrstufig reinigen, trocknen oder absorbieren." },
  { id: "kippscher_apparat", name: "Kipp'scher Apparat", category: "trennung", precision: "nicht zutreffend", functionText: "Apparatur zur kontrollierten Gasentwicklung.", useShort: "Gase bedarfsgerecht erzeugen." },
  { id: "pneumatische_wanne", name: "Pneumatische Wanne", category: "trennung", precision: "nicht zutreffend", functionText: "Wasserwanne zum Auffangen und Nachweis von Gasen.", useShort: "Gase über Wasser sammeln." },
  { id: "liebigkuehler", name: "Liebigkühler", category: "trennung", precision: "nicht zutreffend", functionText: "Geradliniger Kühler für Kondensation bei Destillation.", useShort: "Dämpfe bei Destillation abkühlen und verflüssigen." },
  { id: "schlangenkuehler", name: "Schlangenkühler", category: "trennung", precision: "nicht zutreffend", functionText: "Spiralförmiger Kühler mit größer Kühlfläche.", useShort: "Effiziente Kondensation über lange Kühlstrecke." },
  { id: "dimrothkuehler", name: "Dimrothkühler", category: "trennung", precision: "nicht zutreffend", functionText: "Kühler mit innenliegender Spiral-Kühlführung.", useShort: "Intensive Rückfluss- oder Destillationskühlung." },
  { id: "destillationskolonne", name: "Destillationskolonne", category: "trennung", precision: "nicht zutreffend", functionText: "Verbessert Trennleistung durch wiederholtes Verdampfen/Kondensieren.", useShort: "Flüssigkeitsgemische nach Siedepunkt trennen." },

  // Werkzeuge und Hilfsmittel
  { id: "moerser_pistill", name: "Mörser mit Pistill", category: "werkzeuge", precision: "nicht zutreffend", functionText: "Werkzeugpaar zum Zerkleinern und Verreiben von Feststoffen.", useShort: "Feststoffe zerkleinern und homogenisieren." },
  { id: "reibschale", name: "Reibschale", category: "werkzeuge", precision: "nicht zutreffend", functionText: "Schale als Basis zum Verreiben mit Pistill.", useShort: "Stoffe mechanisch verreiben." },
  { id: "spatel", name: "Spatel", category: "werkzeuge", precision: "nicht zutreffend", functionText: "Hilfsmittel zum Entnehmen kleiner Feststoffmengen.", useShort: "Kleine Mengen Feststoff aufnehmen und dosieren." },
  { id: "spatelloeffel", name: "Spatellöffel", category: "werkzeuge", precision: "nicht zutreffend", functionText: "Löffel-Spatel-Kombination für Pulver und Granulate.", useShort: "Feststoffe sicher aufnehmen und übertragen." },
  { id: "tiegelzange", name: "Tiegelzange", category: "werkzeuge", precision: "nicht zutreffend", functionText: "Zange zum Halten heißer Tiegel und Schalen.", useShort: "Heiße Geräte ohne Verbrennung greifen." },
  { id: "reagenzglasklammer", name: "Reagenzglasklammer", category: "werkzeuge", precision: "nicht zutreffend", functionText: "Klammer zum Festhalten von Reagenzgläsern beim Erhitzen.", useShort: "Reagenzgläser beim Erhitzen sicher halten." },
  { id: "reagenzglashalter", name: "Reagenzglashalter", category: "werkzeuge", precision: "nicht zutreffend", functionText: "Klammer zum sicheren Halten von Reagenzgläsern.", useShort: "Reagenzglas beim Erhitzen sicher halten." },
  { id: "stativ", name: "Stativ", category: "werkzeuge", precision: "nicht zutreffend", functionText: "Grundgerüst für den Aufbau von Apparaturen.", useShort: "Versuchsaufbauten stabil befestigen." },
  { id: "doppelmuffe", name: "Doppelmuffe", category: "werkzeuge", precision: "nicht zutreffend", functionText: "Verbindet Stativstangen und Klemmen variabel.", useShort: "Bauteile am Stativ flexibel verbinden." },
  { id: "universalklemme", name: "Universalklemme", category: "werkzeuge", precision: "nicht zutreffend", functionText: "Klemme für verschiedenste Geräteformen.", useShort: "Geräte am Stativ fixieren." },
  { id: "stativring", name: "Stativring", category: "werkzeuge", precision: "nicht zutreffend", functionText: "Ringauflage für Netze, Dreiecke oder Gefäße.", useShort: "Auflagefläche am Stativ schaffen." },
  { id: "magnetruehrer", name: "Magnetrührer", category: "werkzeuge", precision: "nicht zutreffend", functionText: "Rührgerät mit rotierendem Magnetfeld.", useShort: "Lösungen automatisch und gleichmäßig rühren." },
  { id: "ruehrfisch", name: "Rührfisch (Magnetrührstäbchen)", category: "werkzeuge", precision: "nicht zutreffend", functionText: "Magnetstäbchen für Rührung auf Magnetrührern.", useShort: "Im Gefäß rotieren und mischen." },
  { id: "glasstab", name: "Glasstab", category: "werkzeuge", precision: "nicht zutreffend", functionText: "Einfache Rührhilfe und Ausgießhilfe.", useShort: "Lösungen manuell rühren und umleiten." },
  { id: "spritzflasche", name: "Spritzflasche", category: "werkzeuge", precision: "nicht zutreffend", functionText: "Flasche (oft mit destilliertem Wasser) zum Spülen.", useShort: "Geräte und Niederschläge gezielt abspülen." },

  // Sicherheits- und Großgeräte
  { id: "abzug", name: "Abzug", category: "sicherheit", precision: "nicht zutreffend", functionText: "Geschlossener Arbeitsbereich mit Abluft für gefährliche Gase.", useShort: "Sicheres Arbeiten mit gasförmigen/flüchtigen Stoffen." },
  { id: "feuerloescher", name: "Feuerlöscher", category: "sicherheit", precision: "nicht zutreffend", functionText: "Löschgerät für Entstehungsbrände.", useShort: "Brände im Notfall löschen." },
  { id: "loeschdecke", name: "Löschdecke", category: "sicherheit", precision: "nicht zutreffend", functionText: "Erstickt kleine Brände durch Sauerstoffentzug.", useShort: "Kleine Flammen schnell ersticken." },
  { id: "augendusche", name: "Augendusche", category: "sicherheit", precision: "nicht zutreffend", functionText: "Spült Chemikalien sofort aus den Augen.", useShort: "Augen im Notfall sofort lange ausspülen." },
  { id: "notdusche", name: "Notdusche", category: "sicherheit", precision: "nicht zutreffend", functionText: "Großflächiges Abspülen bei Kontamination.", useShort: "Chemikalien vom Körper schnell entfernen." },
  { id: "gasmaske", name: "Gasmaske", category: "sicherheit", precision: "nicht zutreffend", functionText: "Atemschutz bei gefährlichen Aerosolen/Gasen (je nach Filter).", useShort: "Atemwege unter definierten Bedingungen schützen." },
  { id: "laborautoklav", name: "Laborautoklav", category: "sicherheit", precision: "nicht zutreffend", functionText: "Druckbehälter für hohe Temperaturen und Drücke.", useShort: "Stoffe unter Druck erhitzen oder sterilisieren." },
  { id: "schmelzpunktapparatur", name: "Schmelzpunktapparatur", category: "sicherheit", precision: "hoch", functionText: "Bestimmt den Schmelzpunkt fester Stoffe präzise.", useShort: "Schmelzbereiche als Stoffkennwert messen." },
  { id: "wasserstrahlpumpe", name: "Wasserstrahlpumpe", category: "sicherheit", precision: "nicht zutreffend", functionText: "Erzeugt Unterdruck mit fliessendem Wasser.", useShort: "Vakuum für Filtration oder Trocknung erzeugen." },
  { id: "membranpumpe", name: "Membranpumpe", category: "sicherheit", precision: "nicht zutreffend", functionText: "Ölfreie Vakuumpumpe für moderate Unterdrücke.", useShort: "Vakuum erzeugen ohne Ölkontakt." },
  { id: "drehschieberpumpe", name: "Drehschieberpumpe", category: "sicherheit", precision: "nicht zutreffend", functionText: "Leistungsstarke Vakuumpumpe für tiefe Unterdrücke.", useShort: "Starkes Vakuum für fortgeschrittene Anwendungen." },
];

const allCategoryMeta = [
  { id: "reaktion_gefaesse", title: "Gefäße für Reaktion, Mischung, Aufbewahrung", intro: "Von Becherglas bis Uhrglas: typische Reaktions- und Arbeitsgefäße." },
  { id: "messen", title: "Geräte zum präzisen Messen", intro: "Volumen-, Massen- und Temperaturmessung mit geeigneten Instrumenten." },
  { id: "erhitzen", title: "Erhitzen und thermische Verfahren", intro: "Wärmequellen, Auflagen und Trocknungsgeräte." },
  { id: "trennung", title: "Trennverfahren und Spezialapparaturen", intro: "Filtration, Phasentrennung, Gasbehandlung, Kühlung und Destillation." },
  { id: "werkzeuge", title: "Werkzeuge und Hilfsmittel", intro: "Hilfsmittel zum Handhaben, Aufbauen und Mischen im Labor." },
  { id: "sicherheit", title: "Sicherheits- und Großgeräte", intro: "Sicherheitseinrichtungen und fortgeschrittene Laborgeräte." },
];

// Fokus auf typische Inhalte der Klassenstufe 5 (Gymnasium Sek I, Niedersachsen).
const grade5DeviceIds = new Set([
  "becherglas",
  "erlenmeyer",
  "reagenzglas",
  "reagenzglasgestell",
  "reagenzglasklammer",
  "messzylinder",
  "bunsenbrenner",
  "dreifuss",
  "keramikdrahtnetz",
  "abdampfschale",
  "tiegel",
  "tiegelzange",
  "trichter_glas",
  "filterpapier",
  "uhrglas",
  "spatel",
  "glasstab",
  "spritzflasche",
]);

const deviceCatalog = allDeviceCatalog.filter((device) => grade5DeviceIds.has(device.id));
const visibleCategoryIds = new Set(deviceCatalog.map((device) => device.category));
const categoryMeta = allCategoryMeta.filter((category) => visibleCategoryIds.has(category.id));

const deviceSections = document.getElementById("deviceSections");
const tabButtons = document.querySelectorAll(".lab-tab-btn");
const tabPanels = document.querySelectorAll(".lab-tab");

const labQuizCount = document.getElementById("labQuizCount");
const labQuizStart = document.getElementById("labQuizStart");
const labQuizNext = document.getElementById("labQuizNext");
const labQuizScore = document.getElementById("labQuizScore");
const labQuizStatus = document.getElementById("labQuizStatus");
const labQuizPrompt = document.getElementById("labQuizPrompt");
const labQuizVisual = document.getElementById("labQuizVisual");
const labQuizAnswers = document.getElementById("labQuizAnswers");
const labQuizFeedback = document.getElementById("labQuizFeedback");

const protocolList = document.getElementById("protocolList");
const protocolCheck = document.getElementById("protocolCheck");
const protocolShuffle = document.getElementById("protocolShuffle");
const protocolFeedback = document.getElementById("protocolFeedback");

const safeStart = document.getElementById("safeStart");
const safeNext = document.getElementById("safeNext");
const safeScore = document.getElementById("safeScore");
const safeStatus = document.getElementById("safeStatus");
const safePrompt = document.getElementById("safePrompt");
const safeAnswers = document.getElementById("safeAnswers");
const safeFeedback = document.getElementById("safeFeedback");

const deviceModal = document.getElementById("deviceModal");
const deviceModalClose = document.getElementById("deviceModalClose");
const deviceModalSvg = document.getElementById("deviceModalSvg");
const deviceModalCaption = document.getElementById("deviceModalCaption");

const protocolTargetOrder = ["Hypothese", "Durchführung", "Beobachtung", "Deutung"];
let protocolState = [];

const labQuizState = {
  running: false,
  questions: [],
  index: 0,
  correct: 0,
  answered: false,
};

const safetyQuestions = [
  {
    prompt: "Was bedeutet GHS02 (Flamme)?",
    options: ["Entzündbar", "Ätzend", "Umweltgefährlich", "Giftig"],
    correct: 0,
    explanation: "GHS02 weist auf entzündbare Stoffe hin.",
  },
  {
    prompt: "Welche Schutzmassnahme ist bei langen Haaren korrekt?",
    options: ["Offen tragen", "Nur Mütze tragen", "Zusammenbinden", "Egal, solange Handschuhe da sind"],
    correct: 2,
    explanation: "Lange Haare immer zusammenbinden, damit sie nicht in Flamme/Chemikalien geraten.",
  },
  {
    prompt: "Wofür steht GHS05?",
    options: ["Leicht entzündlich", "Ätzwirkung", "Explosiv", "Gas unter Druck"],
    correct: 1,
    explanation: "GHS05 steht für ätzende Stoffe.",
  },
  {
    prompt: "Was ist bei unbekanntem Geruch im Labor richtig?",
    options: ["Direkt tief einatmen", "Vorsichtig anwedeln", "Nase ins Gefäß halten", "Mitschüler riechen lassen"],
    correct: 1,
    explanation: "Nur vorsichtig anwedeln, nie direkt einatmen.",
  },
  {
    prompt: "Welche Aussage passt zu GHS07?",
    options: ["Harmlos für Haut und Augen", "Reizend/gesundheitsschädlich", "Nur für Metalle gefährlich", "Nur in der Natur gefährlich"],
    correct: 1,
    explanation: "GHS07 warnt vor reizenden/gesundheitsschädlichen Wirkungen.",
  },
  {
    prompt: "Was machst du bei einem Unfall im Labor?",
    options: ["Nichts sagen", "Sofort melden", "Erst aufräumen", "Fenster auf und weiterarbeiten"],
    correct: 1,
    explanation: "Unfälle sofort der Lehrkraft melden.",
  },
  {
    prompt: "Welche Kombination ist richtig?",
    options: [
      "Schutzbrille + ruhiges Arbeiten",
      "Keine Brille + schnelle Bewegungen",
      "Essen + Trinken am Platz",
      "Chemikalien probieren",
    ],
    correct: 0,
    explanation: "Schutzbrille und ruhiges Arbeiten sind Grundregeln.",
  },
  {
    prompt: "Wozu dienen Handschuhe bei ätzenden Stoffen?",
    options: ["Nur gegen Kälte", "Nur für bessere Griffigkeit", "Zum Schutz der Haut", "Nicht notwendig"],
    correct: 2,
    explanation: "Handschuhe schützen vor Hautkontakt mit gefährlichen Stoffen.",
  },
];

const safetyState = {
  running: false,
  questions: [],
  index: 0,
  correct: 0,
  answered: false,
};

function shuffle(items) {
  const clone = [...items];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function pickMany(items, count) {
  return shuffle(items).slice(0, count);
}

function getDeviceById(id) {
  return deviceCatalog.find((device) => device.id === id);
}

function renderLearningSection() {
  const sectionsMarkup = categoryMeta
    .map((category) => {
      const devices = deviceCatalog.filter((device) => device.category === category.id);
      const cards = devices
        .map(
          (device) => `
            <article class="device-card">
              <button class="device-zoom-btn" type="button" data-device-id="${device.id}">
                ${getDeviceVisualMarkup(device, "card")}
              </button>
              <h4>${device.name}</h4>
              <p><strong>Funktion:</strong> ${device.functionText}</p>
              <p><strong>Präzision:</strong> ${device.precision}</p>
            </article>
          `
        )
        .join("");

      return `
        <section class="device-section">
          <h3>${category.title}</h3>
          <p class="device-intro">${category.intro}</p>
          <div class="device-grid">${cards}</div>
        </section>
      `;
    })
    .join("");

  deviceSections.innerHTML = sectionsMarkup;
}

function setupTabs() {
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.dataset.tab;
      tabButtons.forEach((btn) => btn.classList.remove("is-active"));
      tabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${tabId}`).classList.add("is-active");
    });
  });
}

function openDeviceModal(deviceId) {
  const device = getDeviceById(deviceId);
  if (!device) {
    return;
  }
  deviceModalSvg.innerHTML = getDeviceVisualMarkup(device, "modal");
  deviceModalCaption.textContent = `${device.name}: ${device.functionText}`;
  deviceModal.classList.add("is-open");
  deviceModal.setAttribute("aria-hidden", "false");
}

function closeDeviceModal() {
  deviceModal.classList.remove("is-open");
  deviceModal.setAttribute("aria-hidden", "true");
  deviceModalSvg.innerHTML = "";
  deviceModalCaption.textContent = "";
}

function setupDeviceModal() {
  deviceSections.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const button = target.closest(".device-zoom-btn");
    if (!(button instanceof HTMLElement)) {
      return;
    }
    openDeviceModal(button.dataset.deviceId);
  });

  deviceModalClose.addEventListener("click", closeDeviceModal);
  deviceModal.addEventListener("click", (event) => {
    if (event.target === deviceModal) {
      closeDeviceModal();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && deviceModal.classList.contains("is-open")) {
      closeDeviceModal();
    }
  });
}

function randomWrongDevices(correctId, count = 3) {
  return pickMany(
    deviceCatalog.filter((device) => device.id !== correctId),
    count
  );
}

function buildNameToUseQuestion(device) {
  const wrongOptions = randomWrongDevices(device.id).map((item) => item.useShort);
  const options = shuffle([device.useShort, ...wrongOptions]);
  return {
    prompt: `Wofür wird ${device.name} hauptsächlich verwendet?`,
    options,
    correct: options.indexOf(device.useShort),
    explanation: `${device.name}: ${device.useShort}`,
  };
}

function buildUseToNameQuestion(device) {
  const wrongOptions = randomWrongDevices(device.id).map((item) => item.name);
  const options = shuffle([device.name, ...wrongOptions]);
  return {
    prompt: `Welches Gerät passt zu dieser Beschreibung? ${device.useShort}`,
    options,
    correct: options.indexOf(device.name),
    explanation: `Richtig ist ${device.name}.`,
  };
}

function buildImageToNameQuestion(device) {
  const wrongOptions = randomWrongDevices(device.id).map((item) => item.name);
  const options = shuffle([device.name, ...wrongOptions]);
  return {
    prompt: "Wie heißt das gezeigte Gerät?",
    options,
    correct: options.indexOf(device.name),
    explanation: `Das Bild zeigt ${device.name}.`,
    visualHtml: getDeviceVisualMarkup(device, "quiz"),
  };
}

function buildLabQuizQuestions(totalCount) {
  const modes = ["nameToUse", "useToName", "imageToName"];
  const imageDevicePool = deviceCatalog.filter((device) => Boolean(getDeviceImagePath(device)));
  const questions = [];
  for (let i = 0; i < totalCount; i += 1) {
    const mode = modes[i % modes.length];
    const device =
      mode === "imageToName" && imageDevicePool.length > 0
        ? imageDevicePool[Math.floor(Math.random() * imageDevicePool.length)]
        : deviceCatalog[Math.floor(Math.random() * deviceCatalog.length)];
    if (mode === "nameToUse") {
      questions.push(buildNameToUseQuestion(device));
    } else if (mode === "useToName") {
      questions.push(buildUseToNameQuestion(device));
    } else {
      questions.push(buildImageToNameQuestion(device));
    }
  }
  return shuffle(questions);
}

function updateLabQuizScore() {
  labQuizScore.textContent = `Punkte: ${labQuizState.correct} / ${labQuizState.questions.length}`;
}

function renderLabQuizQuestion() {
  const question = labQuizState.questions[labQuizState.index];
  labQuizState.answered = false;
  labQuizStatus.textContent = `Frage ${labQuizState.index + 1} von ${labQuizState.questions.length}`;
  labQuizPrompt.textContent = question.prompt;
  labQuizVisual.innerHTML = question.visualHtml || "";
  labQuizFeedback.innerHTML = "";
  labQuizNext.disabled = true;
  labQuizNext.textContent =
    labQuizState.index === labQuizState.questions.length - 1 ? "Ergebnis anzeigen" : "Nächste Frage";

  labQuizAnswers.innerHTML = question.options
    .map((option, index) => `<button type="button" class="answer-btn" data-index="${index}">${option}</button>`)
    .join("");
}

function finishLabQuiz() {
  labQuizState.running = false;
  labQuizNext.disabled = true;
  const percent = Math.round((labQuizState.correct / labQuizState.questions.length) * 100);
  labQuizStatus.textContent = "Quiz beendet";
  labQuizPrompt.textContent = `Ergebnis: ${labQuizState.correct}/${labQuizState.questions.length} (${percent}%)`;
  labQuizAnswers.innerHTML = "";
  labQuizVisual.innerHTML = "";
  labQuizFeedback.innerHTML = `<p class="feedback ${percent >= 70 ? "ok" : "bad"}">Bewertung: ${
    percent >= 90 ? "Sehr stark" : percent >= 70 ? "Gut gearbeitet" : "Weiter üben"
  }.</p>`;
  labQuizStart.textContent = "Quiz erneut starten";
}

function startLabQuiz() {
  const total = Number(labQuizCount.value) || 10;
  labQuizState.running = true;
  labQuizState.questions = buildLabQuizQuestions(total);
  labQuizState.index = 0;
  labQuizState.correct = 0;
  labQuizState.answered = false;
  labQuizStart.textContent = "Quiz neu starten";
  updateLabQuizScore();
  renderLabQuizQuestion();
}

function answerLabQuiz(selectedIndex) {
  if (!labQuizState.running || labQuizState.answered) {
    return;
  }
  const question = labQuizState.questions[labQuizState.index];
  const isCorrect = Number(selectedIndex) === question.correct;
  labQuizState.answered = true;
  if (isCorrect) {
    labQuizState.correct += 1;
  }

  labQuizAnswers.querySelectorAll(".answer-btn").forEach((button, index) => {
    const optionIndex = Number(index);
    button.disabled = true;
    if (optionIndex === question.correct) {
      button.classList.add("is-correct");
    } else if (optionIndex === Number(selectedIndex)) {
      button.classList.add("is-wrong");
    }
  });

  updateLabQuizScore();
  labQuizNext.disabled = false;
  labQuizFeedback.innerHTML = `<p class="feedback ${isCorrect ? "ok" : "bad"}">${question.explanation}</p>`;
}

function nextLabQuizQuestion() {
  if (!labQuizState.running) {
    return;
  }
  if (!labQuizState.answered) {
    labQuizFeedback.innerHTML = `<p class="feedback bad">Bitte erst eine Antwort auswählen.</p>`;
    return;
  }
  if (labQuizState.index >= labQuizState.questions.length - 1) {
    finishLabQuiz();
    return;
  }
  labQuizState.index += 1;
  renderLabQuizQuestion();
}

function setupLabQuiz() {
  labQuizStart.addEventListener("click", startLabQuiz);
  labQuizNext.addEventListener("click", nextLabQuizQuestion);
  labQuizAnswers.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.classList.contains("answer-btn")) {
      return;
    }
    answerLabQuiz(target.dataset.index);
  });
}

function renderProtocolList() {
  protocolList.innerHTML = protocolState
    .map(
      (item, index) => `
        <div class="protocol-item" data-index="${index}">
          <p>${item}</p>
          <div class="protocol-move">
            <button type="button" class="move-btn" data-direction="up" data-index="${index}">Hoch</button>
            <button type="button" class="move-btn" data-direction="down" data-index="${index}">Runter</button>
          </div>
        </div>
      `
    )
    .join("");
}

function shuffleProtocol() {
  protocolState = shuffle([...protocolTargetOrder]);
  renderProtocolList();
  protocolFeedback.innerHTML = "";
}

function moveProtocolItem(index, direction) {
  const newIndex = direction === "up" ? index - 1 : index + 1;
  if (newIndex < 0 || newIndex >= protocolState.length) {
    return;
  }
  [protocolState[index], protocolState[newIndex]] = [protocolState[newIndex], protocolState[index]];
  renderProtocolList();
}

function checkProtocolOrder() {
  const correctPositions = protocolState.filter((item, index) => item === protocolTargetOrder[index]).length;
  if (correctPositions === protocolTargetOrder.length) {
    protocolFeedback.innerHTML = `<p class="feedback ok">Perfekt. Dein Protokoll ist korrekt geordnet.</p>`;
  } else {
    protocolFeedback.innerHTML = `<p class="feedback bad">${correctPositions}/4 Positionen sind korrekt. Ordne weiter.</p>`;
  }
}

function setupProtocolModule() {
  shuffleProtocol();
  protocolList.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.classList.contains("move-btn")) {
      return;
    }
    moveProtocolItem(Number(target.dataset.index), target.dataset.direction);
  });
  protocolCheck.addEventListener("click", checkProtocolOrder);
  protocolShuffle.addEventListener("click", shuffleProtocol);
}

function updateSafetyScore() {
  safeScore.textContent = `Punkte: ${safetyState.correct} / ${safetyState.questions.length}`;
}

function renderSafetyQuestion() {
  const question = safetyState.questions[safetyState.index];
  safetyState.answered = false;
  safeStatus.textContent = `Frage ${safetyState.index + 1} von ${safetyState.questions.length}`;
  safePrompt.textContent = question.prompt;
  safeFeedback.innerHTML = "";
  safeNext.disabled = true;
  safeNext.textContent =
    safetyState.index === safetyState.questions.length - 1 ? "Ergebnis anzeigen" : "Nächste Frage";

  safeAnswers.innerHTML = question.options
    .map((option, index) => `<button type="button" class="answer-btn" data-index="${index}">${option}</button>`)
    .join("");
}

function finishSafetyTest() {
  safetyState.running = false;
  safeNext.disabled = true;
  const percent = Math.round((safetyState.correct / safetyState.questions.length) * 100);
  safeStatus.textContent = "Sicherheitstest beendet";
  safePrompt.textContent = `Ergebnis: ${safetyState.correct}/${safetyState.questions.length} (${percent}%)`;
  safeAnswers.innerHTML = "";
  safeFeedback.innerHTML = `<p class="feedback ${percent >= 75 ? "ok" : "bad"}">${
    percent >= 75 ? "Sicherheitswissen solide." : "Bitte Sicherheitsregeln wiederholen."
  }</p>`;
  safeStart.textContent = "Sicherheitstest erneut starten";
}

function startSafetyTest() {
  safetyState.running = true;
  safetyState.questions = shuffle([...safetyQuestions]);
  safetyState.index = 0;
  safetyState.correct = 0;
  safetyState.answered = false;
  safeStart.textContent = "Sicherheitstest neu starten";
  updateSafetyScore();
  renderSafetyQuestion();
}

function answerSafetyQuestion(selectedIndex) {
  if (!safetyState.running || safetyState.answered) {
    return;
  }
  const question = safetyState.questions[safetyState.index];
  const isCorrect = Number(selectedIndex) === question.correct;
  safetyState.answered = true;
  if (isCorrect) {
    safetyState.correct += 1;
  }

  safeAnswers.querySelectorAll(".answer-btn").forEach((button, index) => {
    const optionIndex = Number(index);
    button.disabled = true;
    if (optionIndex === question.correct) {
      button.classList.add("is-correct");
    } else if (optionIndex === Number(selectedIndex)) {
      button.classList.add("is-wrong");
    }
  });

  updateSafetyScore();
  safeNext.disabled = false;
  safeFeedback.innerHTML = `<p class="feedback ${isCorrect ? "ok" : "bad"}">${question.explanation}</p>`;
}

function nextSafetyQuestion() {
  if (!safetyState.running) {
    return;
  }
  if (!safetyState.answered) {
    safeFeedback.innerHTML = `<p class="feedback bad">Bitte erst eine Antwort auswählen.</p>`;
    return;
  }
  if (safetyState.index >= safetyState.questions.length - 1) {
    finishSafetyTest();
    return;
  }
  safetyState.index += 1;
  renderSafetyQuestion();
}

function setupSafetyTest() {
  safeStart.addEventListener("click", startSafetyTest);
  safeNext.addEventListener("click", nextSafetyQuestion);
  safeAnswers.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.classList.contains("answer-btn")) {
      return;
    }
    answerSafetyQuestion(target.dataset.index);
  });
}

function bootstrap() {
  renderLearningSection();
  setupTabs();
  setupDeviceModal();
  setupLabQuiz();
  setupProtocolModule();
  setupSafetyTest();
}

bootstrap();
