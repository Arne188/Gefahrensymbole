const phTabButtons = document.querySelectorAll(".ph-tab-btn");
const phTabPanels = document.querySelectorAll(".ph-tab");

const phThemeButtons = document.querySelectorAll(".ph-theme-btn");
const phThemeTitle = document.getElementById("phThemeTitle");
const phThemeText = document.getElementById("phThemeText");
const phThemeList = document.getElementById("phThemeList");

const phStepButtons = document.querySelectorAll(".ph-step-btn");
const phStepTitle = document.getElementById("phStepTitle");
const phStepText = document.getElementById("phStepText");

const phAssignNewRound = document.getElementById("phAssignNewRound");
const phAssignCheck = document.getElementById("phAssignCheck");
const phAssignList = document.getElementById("phAssignList");
const phAssignFeedback = document.getElementById("phAssignFeedback");

const phSymbolNewRound = document.getElementById("phSymbolNewRound");
const phSymbolCheck = document.getElementById("phSymbolCheck");
const phSymbolList = document.getElementById("phSymbolList");
const phSymbolFeedback = document.getElementById("phSymbolFeedback");

const phTfNewRound = document.getElementById("phTfNewRound");
const phTfCheck = document.getElementById("phTfCheck");
const phTfList = document.getElementById("phTfList");
const phTfFeedback = document.getElementById("phTfFeedback");

const phQuizStart = document.getElementById("phQuizStart");
const phQuizNext = document.getElementById("phQuizNext");
const phQuizScore = document.getElementById("phQuizScore");
const phQuizStatus = document.getElementById("phQuizStatus");
const phQuizPrompt = document.getElementById("phQuizPrompt");
const phQuizAnswers = document.getElementById("phQuizAnswers");
const phQuizFeedback = document.getElementById("phQuizFeedback");

const themeDetails = {
  goettlich: {
    title: "Göttliche Rolle des Pharaos",
    text: "Der Pharao galt als Gottkönig und als Sohn des Sonnengottes Re.",
    points: [
      "Er wurde als Stellvertreter der Götter auf Erden verstanden.",
      "Damit war er religiöse und politische Leitfigur zugleich.",
      "Als Vermittler verband er nach ägyptischer Vorstellung Götterwelt und Menschen.",
      "Eine zentrale Aufgabe war die Sicherung der Maat: Ordnung, Wahrheit und Gerechtigkeit.",
    ],
  },
  aufgaben: {
    title: "Macht und Aufgaben des Herrschers",
    text: "Der Pharao stand an der Spitze des Staates und hatte umfassende Verantwortung.",
    points: [
      "Er führte das Heer und sollte das Land schützen.",
      "Er ließ Gesetze erlassen und war oberster Richter.",
      "Er leitete große Projekte wie Dämme, Kanäle, Tempel und Grabanlagen.",
      "Er sollte das Volk versorgen und Hungerzeiten verhindern.",
    ],
  },
  insignien: {
    title: "Herrschaftssymbole (Insignien)",
    text: "Symbole machten sichtbar, dass der Pharao herrschte und göttlich legitimiert war.",
    points: [
      "Die Doppelkrone zeigte die Herrschaft über Ober- und Unterägypten.",
      "Krummstab und Wedel standen für Führung, Fürsorge und Macht.",
      "Die Uräus-Schlange an der Kopfbedeckung galt als Schutzsymbol.",
      "Auch der Ritualbart war ein Zeichen der Nähe zu den Göttern.",
    ],
  },
  ewigkeit: {
    title: "Der Pharao und die Ewigkeit",
    text: "Der Glaube an das Jenseits prägte Gräber, Rituale und Monumentalbauten.",
    points: [
      "Pyramiden und Königsgräber galten als Häuser für die Ewigkeit.",
      "Der Bau solcher Anlagen zeigte Macht und Organisation des Staates.",
      "Auch der Pharao musste sich nach dem Glauben dem Totengericht stellen.",
      "Nur mit gerechtem Handeln konnte er im Jenseits weiterbestehen.",
    ],
  },
  pharaonen: {
    title: "Bekannte Pharaonen",
    text: "Einzelne Herrscher machen das Thema besonders anschaulich.",
    points: [
      "Hatschepsut: bedeutende Pharaonin, die sich teils mit traditionellen Herrschaftszeichen darstellen ließ.",
      "Tutanchamun: bekannt durch sein gut erhaltenes Grab mit reichen Grabbeigaben.",
      "Ramses II.: betonte seine Erfolge und göttliche Abstammung besonders stark.",
      "An Beispielen wird sichtbar, wie Herrschaft inszeniert und legitimiert wurde.",
    ],
  },
};

const symbolDetails = {
  pschent: {
    title: "Doppelkrone (Pschent)",
    text: "Die Doppelkrone vereinte die Krone von Ober- und Unterägypten. Sie zeigte die Herrschaft über das gesamte Reich.",
  },
  krummstab: {
    title: "Krummstab (Heka)",
    text: "Der Krummstab steht für Führung und Fürsorge. Der Pharao sollte sein Volk wie ein guter Hirte leiten.",
  },
  wedel: {
    title: "Wedel (Nekhakha)",
    text: "Der Wedel war ein Zeichen von Autorität und Strafgewalt. Er symbolisierte die Macht zu handeln und durchzugreifen.",
  },
  uraeus: {
    title: "Uräus-Schlange",
    text: "Die aufgerichtete Schlange an der Kopfbedeckung galt als Schutzsymbol und sollte Feinde abwehren.",
  },
  ritualbart: {
    title: "Ritualbart",
    text: "Der künstliche Königsbart zeigte die Nähe des Pharaos zur göttlichen Sphäre und unterstrich seine besondere Stellung.",
  },
};

const categoryLabels = {
  goettlich: "Göttliche Rolle",
  aufgaben: "Macht und Aufgaben",
  insignien: "Herrschaftssymbole",
  ewigkeit: "Ewigkeit und Jenseits",
  pharaonen: "Bekannte Pharaonen",
};

const assignPool = [
  {
    statement: "Der Pharao gilt als Sohn des Sonnengottes Re.",
    answer: "goettlich",
    explanation: "Das beschreibt die religiöse Legitimation.",
  },
  {
    statement: "Er lässt Großprojekte wie Dämme und Kanäle organisieren.",
    answer: "aufgaben",
    explanation: "Das gehört zu seinen staatlichen Aufgaben.",
  },
  {
    statement: "Die Doppelkrone zeigt die Herrschaft über zwei Landesteile.",
    answer: "insignien",
    explanation: "Das ist ein klassisches Herrschaftssymbol.",
  },
  {
    statement: "Pyramiden sind Häuser für die Ewigkeit.",
    answer: "ewigkeit",
    explanation: "Das gehört zum Jenseitsglauben.",
  },
  {
    statement: "Tutanchamun ist durch sein Grab berühmt.",
    answer: "pharaonen",
    explanation: "Das ist ein historisches Beispiel.",
  },
  {
    statement: "Die Sicherung der Maat ist eine Kernaufgabe.",
    answer: "goettlich",
    explanation: "Maat verbindet Ordnung, Wahrheit und Gerechtigkeit.",
  },
  {
    statement: "Der Pharao ist oberster Richter im Reich.",
    answer: "aufgaben",
    explanation: "Rechtsprechung gehörte zur Herrschaft.",
  },
  {
    statement: "Uräus-Schlange, Krummstab und Wedel sind Insignien.",
    answer: "insignien",
    explanation: "Diese Zeichen visualisierten Macht.",
  },
  {
    statement: "Auch der Pharao sollte sich im Totengericht bewähren.",
    answer: "ewigkeit",
    explanation: "Das gehört zu den Jenseitsvorstellungen.",
  },
  {
    statement: "Ramses II. hob seine militärischen Erfolge stark hervor.",
    answer: "pharaonen",
    explanation: "Auch das ist ein Beispiel aus der Herrschergeschichte.",
  },
];

const symbolLabels = {
  pschent: "Doppelkrone",
  krummstab: "Krummstab",
  wedel: "Wedel",
  uraeus: "Uräus-Schlange",
  ritualbart: "Ritualbart",
};

const symbolPool = [
  {
    statement: "Zeigt die Herrschaft über Ober- und Unterägypten.",
    answer: "pschent",
    explanation: "Das ist die Bedeutung der Doppelkrone.",
  },
  {
    statement: "Steht für Führung und Fürsorge des Herrschers.",
    answer: "krummstab",
    explanation: "Das ist die Grundbedeutung des Krummstabs.",
  },
  {
    statement: "Symbolisiert Autorität und Strafgewalt.",
    answer: "wedel",
    explanation: "Das trifft auf den Wedel zu.",
  },
  {
    statement: "Soll den Herrscher vor Feinden schützen.",
    answer: "uraeus",
    explanation: "Die Uräus-Schlange galt als Schutzsymbol.",
  },
  {
    statement: "Unterstreicht die göttliche Stellung des Königs.",
    answer: "ritualbart",
    explanation: "So wurde der Ritualbart verstanden.",
  },
  {
    statement: "Macht die Einheit des Reiches sichtbar.",
    answer: "pschent",
    explanation: "Das ist wieder die Doppelkrone.",
  },
  {
    statement: "Erinnert daran, dass der Herrscher sein Volk leiten soll.",
    answer: "krummstab",
    explanation: "Das passt zum Bild des Hirtenstabs.",
  },
];

const tfPool = [
  {
    statement: "Der Pharao vereinte religiöse und politische Macht.",
    answer: "richtig",
    explanation: "Genau das war das Prinzip des Gottkönigtums.",
  },
  {
    statement: "Maat steht für Chaos und Unordnung.",
    answer: "falsch",
    explanation: "Maat bedeutet das Gegenteil: Ordnung und Gerechtigkeit.",
  },
  {
    statement: "Die Doppelkrone stand für Ober- und Unterägypten.",
    answer: "richtig",
    explanation: "Das ist korrekt.",
  },
  {
    statement: "Der Pharao hatte keine Verantwortung für Bauprojekte.",
    answer: "falsch",
    explanation: "Großprojekte waren Teil seiner Herrschaft.",
  },
  {
    statement: "Hatschepsut war eine bedeutende Pharaonin.",
    answer: "richtig",
    explanation: "Sie gehört zu den bekanntesten Herrschenden.",
  },
  {
    statement: "Tutanchamun ist vor allem wegen seines Grabfundes bekannt.",
    answer: "richtig",
    explanation: "Sein Grab lieferte viele wichtige Funde.",
  },
  {
    statement: "Die Uräus-Schlange war ein Schutzsymbol.",
    answer: "richtig",
    explanation: "Sie sollte Feinde abwehren.",
  },
  {
    statement: "Pyramiden hatten keine religiöse Bedeutung.",
    answer: "falsch",
    explanation: "Sie waren eng mit Jenseitsglauben und Herrschaft verbunden.",
  },
];

const quizPool = [
  {
    prompt: "Warum wurde der Pharao als Gottkönig bezeichnet?",
    options: [
      "Weil er als Sohn des Re und Stellvertreter der Götter galt",
      "Weil er nur Tempeldiener war",
      "Weil er keine politische Macht hatte",
      "Weil er auf Gesetze verzichten konnte",
    ],
    correct: 0,
    explanation: "Seine Herrschaft wurde religiös legitimiert.",
    wrongReasons: {
      1: "Das war nicht seine Hauptrolle.",
      2: "Er hatte sehr viel politische Macht.",
      3: "Es gab Regeln und Ordnung.",
    },
  },
  {
    prompt: "Welche Aufgabe passt zum Pharao?",
    options: [
      "Heer führen, Recht sprechen und Bauprojekte organisieren",
      "Nur Getreide auf dem Feld ernten",
      "Nur in Tempeln beten",
      "Keine Verantwortung für das Reich",
    ],
    correct: 0,
    explanation: "Der Pharao hatte umfassende Regierungsaufgaben.",
    wrongReasons: {
      1: "Das war nicht die zentrale Herrscheraufgabe.",
      2: "Er hatte deutlich mehr Aufgaben.",
      3: "Das Gegenteil war der Fall.",
    },
  },
  {
    prompt: "Wofür stand die Doppelkrone?",
    options: [
      "Für die Einheit von Ober- und Unterägypten",
      "Nur für den Tempeldienst",
      "Nur für den Nilhandel",
      "Für das Ende der Herrschaft",
    ],
    correct: 0,
    explanation: "Sie symbolisierte die Herrschaft über beide Landesteile.",
    wrongReasons: {
      1: "Die Bedeutung war politisch-territorial.",
      2: "Das passt nicht.",
      3: "Das Gegenteil ist richtig.",
    },
  },
  {
    prompt: "Was bedeutet Maat im Zusammenhang mit dem Pharao?",
    options: [
      "Ordnung, Wahrheit und Gerechtigkeit im Reich",
      "Nur militärische Stärke",
      "Nur reicher Handel",
      "Chaos im Staat",
    ],
    correct: 0,
    explanation: "Maat war ein zentrales Leitprinzip der Herrschaft.",
    wrongReasons: {
      1: "Das ist zu eng.",
      2: "Maat umfasst mehr als Wirtschaft.",
      3: "Das Gegenteil ist richtig.",
    },
  },
  {
    prompt: "Welches Symbol galt als Schutzzeichen am Kopfschmuck?",
    options: ["Uräus-Schlange", "Doppelkrone", "Wedel", "Ritualbart"],
    correct: 0,
    explanation: "Die Uräus-Schlange sollte Feinde abwehren.",
    wrongReasons: {
      1: "Die Doppelkrone steht für die Einheit des Reiches.",
      2: "Der Wedel hatte eine andere Bedeutung.",
      3: "Der Ritualbart war ein anderes Zeichen.",
    },
  },
  {
    prompt: "Welche Aussage zu Krummstab und Wedel passt?",
    options: [
      "Sie sind Herrschaftszeichen des Pharaos",
      "Sie waren Werkzeuge einfacher Bauern",
      "Sie hatten keine Bedeutung",
      "Sie gehörten nur Priestern",
    ],
    correct: 0,
    explanation: "Beide gehörten zu den zentralen Insignien.",
    wrongReasons: {
      1: "Das war nicht ihre Hauptfunktion.",
      2: "Sie hatten klare symbolische Bedeutung.",
      3: "Sie waren auf den Pharao bezogen.",
    },
  },
  {
    prompt: "Warum wurden große Grabanlagen wie Pyramiden gebaut?",
    options: [
      "Sie sollten das Fortleben des Königs im Jenseits sichern",
      "Nur als Lagerhallen für Getreide",
      "Nur als Wohnhäuser für Beamte",
      "Ohne religiösen Hintergrund",
    ],
    correct: 0,
    explanation: "Pyramiden waren eng mit Jenseitsglauben und Herrschaft verbunden.",
    wrongReasons: {
      1: "Das war nicht der Hauptzweck.",
      2: "Das passt nicht.",
      3: "Es gab einen starken religiösen Bezug.",
    },
  },
  {
    prompt: "Welche Pharaonin gehört zu den bekannten Beispielen?",
    options: ["Hatschepsut", "Nofretete", "Sappho", "Helena"],
    correct: 0,
    explanation: "Hatschepsut wird häufig im Unterricht behandelt.",
    wrongReasons: {
      1: "Nofretete war eine bedeutende Königin, aber keine Pharaonin.",
      2: "Das ist keine Pharaonin.",
      3: "Das ist keine Pharaonin.",
    },
  },
  {
    prompt: "Warum ist Tutanchamun besonders bekannt?",
    options: [
      "Wegen seines fast unversehrt gefundenen Grabes",
      "Wegen der Erfindung der Hieroglyphen",
      "Wegen der Gründung von Rom",
      "Wegen seiner Rolle als griechischer Feldherr",
    ],
    correct: 0,
    explanation: "Die Grabfunde geben wichtige Einblicke in die Zeit.",
    wrongReasons: {
      1: "Hieroglyphen gab es schon viel früher.",
      2: "Das gehört nicht zum Alten Ägypten.",
      3: "Das passt historisch nicht.",
    },
  },
  {
    prompt: "Welche Aussage zu Ramses II. ist passend?",
    options: [
      "Er stellte seine Erfolge und göttliche Abstammung stark heraus",
      "Er war nur Schreiber ohne politische Rolle",
      "Er lehnte Herrschaftssymbole ab",
      "Er ist nur durch ein einziges kleines Grab bekannt",
    ],
    correct: 0,
    explanation: "Ramses II. nutzte Inszenierung seiner Herrschaft sehr bewusst.",
    wrongReasons: {
      1: "Das stimmt nicht.",
      2: "Herrschaftssymbole waren wichtig.",
      3: "Das trifft nicht zu.",
    },
  },
  {
    prompt: "Was zeigt religiöse Legitimation der Herrschaft?",
    options: [
      "Macht wird als gottgewollt begründet",
      "Herrschaft ohne jede Verantwortung",
      "Kein Zusammenhang zwischen Religion und Staat",
      "Nur Priester entscheiden alles allein",
    ],
    correct: 0,
    explanation: "So wurde die Stellung des Pharaos abgesichert.",
    wrongReasons: {
      1: "Der Pharao hatte klare Pflichten.",
      2: "Im Alten Ägypten war das eng verbunden.",
      3: "Das vereinfacht zu stark.",
    },
  },
  {
    prompt: "Welche Zusammenfassung trifft am besten?",
    options: [
      "Beim Pharao waren Religion, Staat und Symbole eng miteinander verbunden",
      "Der Pharao war nur ein religiöser Priester ohne Macht",
      "Symbole hatten im Alten Ägypten keine Rolle",
      "Bauwerke hatten nur wirtschaftliche Bedeutung",
    ],
    correct: 0,
    explanation: "Herrschaft wurde durch Glauben, Aufgaben und Zeichen gemeinsam getragen.",
    wrongReasons: {
      1: "Er hatte auch politische Macht.",
      2: "Symbole waren zentral.",
      3: "Auch religiöse Gründe waren wichtig.",
    },
  },
];

let assignTasks = [];
let symbolTasks = [];
let tfTasks = [];

const quizState = {
  running: false,
  answered: false,
  index: 0,
  correct: 0,
  questions: [],
};

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function shuffleQuizOptions(question) {
  const order = shuffle(question.options.map((_, index) => index));
  const options = order.map((index) => question.options[index]);
  const correct = order.indexOf(question.correct);
  const wrongReasons = {};

  order.forEach((originalIndex, newIndex) => {
    if (question.wrongReasons && question.wrongReasons[originalIndex]) {
      wrongReasons[newIndex] = question.wrongReasons[originalIndex];
    }
  });

  return {
    ...question,
    options,
    correct,
    wrongReasons,
  };
}

function setupTabs() {
  phTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      phTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      phTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${target}`).classList.add("is-active");
    });
  });
}

function renderTheme(key) {
  const detail = themeDetails[key];
  if (!detail) {
    return;
  }
  phThemeTitle.textContent = detail.title;
  phThemeText.textContent = detail.text;
  phThemeList.innerHTML = detail.points.map((point) => `<li>${point}</li>`).join("");
  phThemeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.theme === key);
  });
}

function setupThemeModule() {
  phThemeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderTheme(button.dataset.theme);
    });
  });
  renderTheme("goettlich");
}

function renderSymbol(symbolKey) {
  const detail = symbolDetails[symbolKey];
  if (!detail) {
    return;
  }
  phStepTitle.textContent = detail.title;
  phStepText.textContent = detail.text;
  phStepButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.step === symbolKey);
  });
}

function setupSymbolModule() {
  phStepButtons.forEach((button) => {
    button.addEventListener("click", () => {
      renderSymbol(button.dataset.step);
    });
  });
  renderSymbol("pschent");
}

function generateAssignRound(count = 8) {
  return shuffle(assignPool).slice(0, count).map((item) => ({ ...item }));
}

function renderAssignRound() {
  phAssignList.replaceChildren();
  assignTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "ph-task-row";

    const prompt = document.createElement("p");
    prompt.innerHTML = `<strong>${index + 1}. ${task.statement}</strong>`;

    const select = document.createElement("select");
    select.className = "ph-select";
    select.name = `assign-${index}`;
    select.innerHTML = `
      <option value="">Bitte wählen</option>
      <option value="goettlich">${categoryLabels.goettlich}</option>
      <option value="aufgaben">${categoryLabels.aufgaben}</option>
      <option value="insignien">${categoryLabels.insignien}</option>
      <option value="ewigkeit">${categoryLabels.ewigkeit}</option>
      <option value="pharaonen">${categoryLabels.pharaonen}</option>
    `;

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";

    row.append(prompt, select, feedback);
    phAssignList.append(row);
  });
}

function checkAssignRound() {
  const rows = phAssignList.querySelectorAll(".ph-task-row");
  let answered = 0;
  let correct = 0;

  rows.forEach((row, index) => {
    row.classList.remove("is-correct", "is-wrong");
    const select = row.querySelector("select");
    const feedback = row.querySelector(".task-feedback");
    if (!(select instanceof HTMLSelectElement) || !(feedback instanceof HTMLDivElement)) {
      return;
    }

    feedback.innerHTML = "";
    if (!select.value) {
      return;
    }

    answered += 1;
    const task = assignTasks[index];
    if (select.value === task.answer) {
      correct += 1;
      row.classList.add("is-correct");
      feedback.innerHTML = `<p class="feedback ok">Richtig. ${task.explanation}</p>`;
      return;
    }

    row.classList.add("is-wrong");
    feedback.innerHTML = `
      <p class="feedback bad">
        Noch nicht passend. Richtige Zuordnung: ${categoryLabels[task.answer]}.
        ${task.explanation}
      </p>
    `;
  });

  if (answered < assignTasks.length) {
    phAssignFeedback.innerHTML = '<p class="feedback info">Bitte alle Aufgaben in Training A beantworten.</p>';
    return;
  }

  phAssignFeedback.innerHTML = `
    <p class="feedback ${correct === assignTasks.length ? "ok" : "bad"}">
      ${correct} / ${assignTasks.length} richtig.
      ${correct === assignTasks.length ? "Sehr gut." : "Lies die Rückmeldungen und starte eine neue Runde."}
    </p>
  `;
}

function setupAssignTraining() {
  assignTasks = generateAssignRound();
  renderAssignRound();
  phAssignFeedback.innerHTML = "";

  phAssignNewRound.addEventListener("click", () => {
    assignTasks = generateAssignRound();
    renderAssignRound();
    phAssignFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });

  phAssignCheck.addEventListener("click", checkAssignRound);
}

function generateSymbolRound(count = 6) {
  return shuffle(symbolPool).slice(0, count).map((item) => ({ ...item }));
}

function renderSymbolRound() {
  phSymbolList.replaceChildren();
  symbolTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "ph-task-row";

    const prompt = document.createElement("p");
    prompt.innerHTML = `<strong>${index + 1}. ${task.statement}</strong>`;

    const select = document.createElement("select");
    select.className = "ph-select";
    select.name = `symbol-${index}`;
    select.innerHTML = `
      <option value="">Symbol wählen</option>
      <option value="pschent">${symbolLabels.pschent}</option>
      <option value="krummstab">${symbolLabels.krummstab}</option>
      <option value="wedel">${symbolLabels.wedel}</option>
      <option value="uraeus">${symbolLabels.uraeus}</option>
      <option value="ritualbart">${symbolLabels.ritualbart}</option>
    `;

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";

    row.append(prompt, select, feedback);
    phSymbolList.append(row);
  });
}

function checkSymbolRound() {
  const rows = phSymbolList.querySelectorAll(".ph-task-row");
  let answered = 0;
  let correct = 0;

  rows.forEach((row, index) => {
    row.classList.remove("is-correct", "is-wrong");
    const select = row.querySelector("select");
    const feedback = row.querySelector(".task-feedback");
    if (!(select instanceof HTMLSelectElement) || !(feedback instanceof HTMLDivElement)) {
      return;
    }

    feedback.innerHTML = "";
    if (!select.value) {
      return;
    }

    answered += 1;
    const task = symbolTasks[index];
    if (select.value === task.answer) {
      correct += 1;
      row.classList.add("is-correct");
      feedback.innerHTML = `<p class="feedback ok">Richtig. ${task.explanation}</p>`;
      return;
    }

    row.classList.add("is-wrong");
    feedback.innerHTML = `
      <p class="feedback bad">
        Noch nicht passend. Richtige Lösung: ${symbolLabels[task.answer]}.
        ${task.explanation}
      </p>
    `;
  });

  if (answered < symbolTasks.length) {
    phSymbolFeedback.innerHTML = '<p class="feedback info">Bitte alle Aufgaben in Training B beantworten.</p>';
    return;
  }

  phSymbolFeedback.innerHTML = `
    <p class="feedback ${correct === symbolTasks.length ? "ok" : "bad"}">
      ${correct} / ${symbolTasks.length} richtig.
      ${correct === symbolTasks.length ? "Sehr gut." : "Wiederhole die Symbolbedeutungen und starte eine neue Runde."}
    </p>
  `;
}

function setupSymbolTraining() {
  symbolTasks = generateSymbolRound();
  renderSymbolRound();
  phSymbolFeedback.innerHTML = "";

  phSymbolNewRound.addEventListener("click", () => {
    symbolTasks = generateSymbolRound();
    renderSymbolRound();
    phSymbolFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });

  phSymbolCheck.addEventListener("click", checkSymbolRound);
}

function generateTfRound(count = 6) {
  return shuffle(tfPool).slice(0, count).map((item) => ({ ...item }));
}

function renderTfRound() {
  phTfList.replaceChildren();
  tfTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "ph-task-row";

    const prompt = document.createElement("p");
    prompt.textContent = `${index + 1}. ${task.statement}`;

    const choiceGrid = document.createElement("div");
    choiceGrid.className = "ph-choice-grid";

    [
      { value: "richtig", label: "Richtig" },
      { value: "falsch", label: "Falsch" },
    ].forEach((option) => {
      const label = document.createElement("label");
      label.className = "ph-choice-item";
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `tf-${index}`;
      radio.value = option.value;
      label.append(radio, document.createTextNode(option.label));
      choiceGrid.append(label);
    });

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";

    row.append(prompt, choiceGrid, feedback);
    phTfList.append(row);
  });
}

function checkTfRound() {
  const rows = phTfList.querySelectorAll(".ph-task-row");
  let answered = 0;
  let correct = 0;

  rows.forEach((row, index) => {
    row.classList.remove("is-correct", "is-wrong");
    const feedback = row.querySelector(".task-feedback");
    if (!(feedback instanceof HTMLDivElement)) {
      return;
    }
    feedback.innerHTML = "";

    const selected = row.querySelector(`input[name="tf-${index}"]:checked`);
    if (!(selected instanceof HTMLInputElement)) {
      return;
    }
    answered += 1;

    const task = tfTasks[index];
    if (selected.value === task.answer) {
      correct += 1;
      row.classList.add("is-correct");
      feedback.innerHTML = `<p class="feedback ok">Richtig. ${task.explanation}</p>`;
      return;
    }

    row.classList.add("is-wrong");
    feedback.innerHTML = `
      <p class="feedback bad">
        Nicht korrekt. Richtige Antwort: ${task.answer === "richtig" ? "Richtig" : "Falsch"}.
        ${task.explanation}
      </p>
    `;
  });

  if (answered < tfTasks.length) {
    phTfFeedback.innerHTML = '<p class="feedback info">Bitte alle Aufgaben in Training C beantworten.</p>';
    return;
  }

  phTfFeedback.innerHTML = `
    <p class="feedback ${correct === tfTasks.length ? "ok" : "bad"}">
      ${correct} / ${tfTasks.length} richtig.
      ${correct === tfTasks.length ? "Sehr gut." : "Prüfe die Erklärungen und starte eine neue Runde."}
    </p>
  `;
}

function setupTfTraining() {
  tfTasks = generateTfRound();
  renderTfRound();
  phTfFeedback.innerHTML = "";

  phTfNewRound.addEventListener("click", () => {
    tfTasks = generateTfRound();
    renderTfRound();
    phTfFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });

  phTfCheck.addEventListener("click", checkTfRound);
}

function updateQuizScore() {
  phQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  phQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  phQuizPrompt.textContent = question.prompt;
  phQuizFeedback.innerHTML = "";
  phQuizNext.disabled = true;
  phQuizAnswers.innerHTML = question.options
    .map(
      (option, optionIndex) => `
        <button class="choice-btn" type="button" data-option="${optionIndex}">
          ${option}
        </button>
      `
    )
    .join("");
}

function finishQuiz() {
  quizState.running = false;
  phQuizStatus.textContent = "Test abgeschlossen.";
  phQuizPrompt.textContent = "Du kannst den Test neu starten.";
  phQuizAnswers.innerHTML = "";
  phQuizFeedback.innerHTML = '<p class="feedback info">Nutze die Fehlererklärungen zur Wiederholung.</p>';
  phQuizNext.disabled = true;
  phQuizStart.textContent = "Neu starten";
}

function submitQuizAnswer(optionIndex) {
  if (!quizState.running || quizState.answered) {
    return;
  }

  const question = quizState.questions[quizState.index];
  quizState.answered = true;
  const isCorrect = optionIndex === question.correct;
  if (isCorrect) {
    quizState.correct += 1;
  }
  updateQuizScore();

  phQuizAnswers.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  const wrongReason = question.wrongReasons?.[optionIndex] || "Bitte die Begriffe nochmals vergleichen.";
  phQuizFeedback.innerHTML = `
    <p class="feedback ${isCorrect ? "ok" : "bad"}">
      ${isCorrect
        ? `Richtig. ${question.explanation}`
        : `Nicht korrekt. ${wrongReason} Richtige Antwort: "${question.options[question.correct]}". ${question.explanation}`}
    </p>
  `;

  phQuizNext.disabled = false;
  phQuizNext.textContent =
    quizState.index === quizState.questions.length - 1 ? "Ergebnis anzeigen" : "Nächste Frage";
}

function startQuiz() {
  quizState.running = true;
  quizState.answered = false;
  quizState.index = 0;
  quizState.correct = 0;
  quizState.questions = shuffle(quizPool)
    .slice(0, 10)
    .map((question) => shuffleQuizOptions(question));
  phQuizStart.textContent = "Test neu starten";
  updateQuizScore();
  renderQuizQuestion();
}

function nextQuizStep() {
  if (!quizState.running || !quizState.answered) {
    return;
  }

  if (quizState.index === quizState.questions.length - 1) {
    finishQuiz();
    return;
  }

  quizState.index += 1;
  quizState.answered = false;
  renderQuizQuestion();
}

function setupQuiz() {
  phQuizStart.addEventListener("click", startQuiz);
  phQuizNext.addEventListener("click", nextQuizStep);
  phQuizAnswers.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }
    const optionIndex = Number(button.dataset.option);
    if (!Number.isInteger(optionIndex)) {
      return;
    }
    submitQuizAnswer(optionIndex);
  });
}

setupTabs();
setupThemeModule();
setupSymbolModule();
setupAssignTraining();
setupSymbolTraining();
setupTfTraining();
setupQuiz();
