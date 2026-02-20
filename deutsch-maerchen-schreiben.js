const dmsTabButtons = document.querySelectorAll(".dms-tab-btn");
const dmsTabPanels = document.querySelectorAll(".dms-tab");

const dmsBuildNewRound = document.getElementById("dmsBuildNewRound");
const dmsBuildCheck = document.getElementById("dmsBuildCheck");
const dmsBuildList = document.getElementById("dmsBuildList");
const dmsBuildFeedback = document.getElementById("dmsBuildFeedback");

const dmsStyleNewRound = document.getElementById("dmsStyleNewRound");
const dmsStyleCheck = document.getElementById("dmsStyleCheck");
const dmsStyleList = document.getElementById("dmsStyleList");
const dmsStyleFeedback = document.getElementById("dmsStyleFeedback");

const dmsPlotGenerate = document.getElementById("dmsPlotGenerate");
const dmsPlotPreview = document.getElementById("dmsPlotPreview");

const dmsQuizStart = document.getElementById("dmsQuizStart");
const dmsQuizNext = document.getElementById("dmsQuizNext");
const dmsQuizScore = document.getElementById("dmsQuizScore");
const dmsQuizStatus = document.getElementById("dmsQuizStatus");
const dmsQuizPrompt = document.getElementById("dmsQuizPrompt");
const dmsQuizAnswers = document.getElementById("dmsQuizAnswers");
const dmsQuizFeedback = document.getElementById("dmsQuizFeedback");

const phaseOptions = [
  { id: "planung", label: "Planung" },
  { id: "anfang", label: "Anfang" },
  { id: "hauptteil", label: "Hauptteil" },
  { id: "ende", label: "Ende" },
  { id: "ueberarbeitung", label: "Ueberarbeitung" },
];

const buildPool = [
  { text: "Heldin und Gegenspieler festlegen", phase: "planung", why: "Die Figurenplanung passiert vor dem Schreiben." },
  { text: "Magischen Ort bestimmen", phase: "planung", why: "Der Schauplatz wird in der Planung geklaert." },
  { text: "Welche Aufgabe muss geloest werden?", phase: "planung", why: "Die Mission ist der Kern des Plots und wird vorher geplant." },
  { text: "Magischen Gegenstand waehlen", phase: "planung", why: "Gegenstaende und Hilfen gehoeren in den Plotentwurf." },
  { text: "Figurenbeziehungen notieren", phase: "planung", why: "Wer hilft wem? Das wird vor dem Formulieren geklaert." },
  { text: "Spannungsbogen skizzieren", phase: "planung", why: "Der Verlauf wird als Plan vorbereitet." },
  { text: "Anfangsformel notieren", phase: "anfang", why: "Die Anfangsformel gehoert in den Anfangsteil." },
  { text: "Ausgangssituation vorstellen", phase: "anfang", why: "Lesende brauchen zuerst Ort, Zeit und Figur." },
  { text: "Hauptfigur kurz beschreiben", phase: "anfang", why: "Die Einfuehrung der Hauptfigur geschieht am Anfang." },
  { text: "Erstes Problem andeuten", phase: "anfang", why: "Das Problem wird frueh aufgebaut." },
  { text: "Sprachlich ruhig einsteigen", phase: "anfang", why: "Der Anfang bereitet auf den Konflikt vor." },
  { text: "Leserfrage erzeugen: Was wird passieren?", phase: "anfang", why: "Eine offene Frage am Anfang erzeugt Interesse." },
  { text: "Drei Pruefungen hintereinander", phase: "hauptteil", why: "Pruefungen sind typisches Material des Hauptteils." },
  { text: "Hindernis und Gegenmassnahme zeigen", phase: "hauptteil", why: "Konfliktentwicklung gehoert in den Hauptteil." },
  { text: "Magische Hilfe einsetzen", phase: "hauptteil", why: "Die entscheidende Hilfe bringt die Handlung voran." },
  { text: "Spannung steigern", phase: "hauptteil", why: "Die Spannungsspitze liegt vor der Loesung." },
  { text: "Wendepunkt vorbereiten", phase: "hauptteil", why: "Der Umschwung entsteht im Hauptteil." },
  { text: "Gegenspieler wird ueberlistet", phase: "hauptteil", why: "Die Konfrontation ist Teil der Haupthandlung." },
  { text: "Bann wird gebrochen", phase: "ende", why: "Die Loesung steht im Schlussteil." },
  { text: "Belohnung oder Versoehnung zeigen", phase: "ende", why: "Typisch fuer Maerchen ist ein loesendes Ende." },
  { text: "Folgen fuer die Figuren klar machen", phase: "ende", why: "Am Ende wird die neue Situation gezeigt." },
  { text: "Schlussformel formulieren", phase: "ende", why: "Typische Schlusssaetze gehoeren ans Ende." },
  { text: "Offene Konflikte schliessen", phase: "ende", why: "Das Ende beendet die Hauptfrage." },
  { text: "Gerechten Abschluss herstellen", phase: "ende", why: "Gut und boese werden am Schluss bewertet." },
  { text: "Maerchenmerkmale kontrollieren", phase: "ueberarbeitung", why: "Die Merkmalpruefung ist ein Ueberarbeitungsschritt." },
  { text: "Spannung und Logik pruefen", phase: "ueberarbeitung", why: "Pruefen und verbessern gehoert in die Revision." },
  { text: "Rechtschreibung korrigieren", phase: "ueberarbeitung", why: "Sprachkorrektur erfolgt nach dem Entwurf." },
  { text: "Saubere Reinschrift erstellen", phase: "ueberarbeitung", why: "Die Endfassung entsteht am Schluss der Arbeit." },
  { text: "Wortwiederholungen ersetzen", phase: "ueberarbeitung", why: "Stilverbesserung ist Teil der Ueberarbeitung." },
  { text: "Absatzstruktur kontrollieren", phase: "ueberarbeitung", why: "Textordnung wird in der Schlusskontrolle geprueft." },
  { text: "Dialoge auf Klarheit pruefen", phase: "ueberarbeitung", why: "Verstaendlichkeit wird im Ueberarbeiten verbessert." },
  { text: "Titel passend zum Maerchen suchen", phase: "ueberarbeitung", why: "Ein final passender Titel folgt oft nach dem Schreiben." },
  { text: "Welche Figuren helfen unterwegs?", phase: "planung", why: "Rollen im Plot werden bei der Planung festgelegt." },
  { text: "Wer bekommt welche Aufgabe?", phase: "planung", why: "Aufgabenverteilung wird im Entwurf vorbereitet." },
  { text: "Welche Gefahr taucht zuerst auf?", phase: "anfang", why: "Die erste Gefahrenanzeige startet den Konflikt." },
  { text: "Ein unheimlicher Hinweis erscheint", phase: "anfang", why: "Der Hinweis bringt die Ausgangslage in Bewegung." },
  { text: "Die zweite Probe ist schwerer als die erste", phase: "hauptteil", why: "Steigerung der pruefungen gehoert in den Mittelteil." },
  { text: "Die letzte Pruefung entscheidet alles", phase: "hauptteil", why: "Der Hoehepunkt der Handlung liegt im Hauptteil." },
  { text: "Das Dorf ist wieder sicher", phase: "ende", why: "Die aufgeloeste Situation wird im Ende gezeigt." },
  { text: "Die Heldin kehrt veraendert zurueck", phase: "ende", why: "Die Figurentwicklung schliesst den Text ab." },
  { text: "Sind Zeitformen durchgehend passend?", phase: "ueberarbeitung", why: "Die Tempuskontrolle ist ein typischer Revisionsschritt." },
];

const openingSubjects = ["ein armer Mueller", "eine mutige Schuelerin", "ein junger Hirte", "eine kluge Tochter", "ein einsamer Koenig"];
const places = ["in einem fernen Koenigreich", "am Rand eines dunklen Waldes", "hinter sieben Bergen", "in einem kleinen Dorf", "im Schloss am Fluss"];
const goals = ["den verlorenen Ring finden", "den Fluch loesen", "den Bruder retten", "die goldene Feder holen", "das alte Raetsel loesen"];
const helpers = ["eine sprechende Katze", "eine alte Fee", "ein geheimnisvoller Vogel", "ein freundlicher Riese", "ein leuchtender Stein"];

const quizState = {
  running: false,
  answered: false,
  index: 0,
  correct: 0,
  questions: [],
};

let buildTasks = [];
let styleTasks = [];

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickOne(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function setupTabs() {
  dmsTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      dmsTabButtons.forEach((btn) => btn.classList.remove("is-active"));
      dmsTabPanels.forEach((panel) => panel.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(`tab-${target}`).classList.add("is-active");
    });
  });
}

function getPhaseLabel(phaseId) {
  return phaseOptions.find((phase) => phase.id === phaseId)?.label || phaseId;
}

function generateBuildRound(count = 10) {
  return shuffle(buildPool).slice(0, count);
}

function renderBuildRound() {
  dmsBuildList.replaceChildren();
  buildTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "dms-task-row";
    row.dataset.index = String(index);

    const text = document.createElement("p");
    text.textContent = `${index + 1}. ${task.text}`;

    const select = document.createElement("select");
    select.name = `build-${index}`;
    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = "Phase waehlen";
    select.append(emptyOption);
    phaseOptions.forEach((phase) => {
      const option = document.createElement("option");
      option.value = phase.id;
      option.textContent = phase.label;
      select.append(option);
    });

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";
    row.append(text, select, feedback);
    dmsBuildList.append(row);
  });
}

function checkBuildRound() {
  const rows = dmsBuildList.querySelectorAll(".dms-task-row");
  let answered = 0;
  let correct = 0;

  rows.forEach((row, index) => {
    row.classList.remove("is-correct", "is-wrong");
    const select = row.querySelector(`select[name="build-${index}"]`);
    const feedback = row.querySelector(".task-feedback");
    if (!(select instanceof HTMLSelectElement) || !(feedback instanceof HTMLDivElement)) {
      return;
    }
    feedback.innerHTML = "";
    if (!select.value) {
      return;
    }
    answered += 1;
    const task = buildTasks[index];
    if (select.value === task.phase) {
      correct += 1;
      row.classList.add("is-correct");
      feedback.innerHTML = `<p class="feedback ok">Richtig. ${task.why}</p>`;
    } else {
      row.classList.add("is-wrong");
      feedback.innerHTML = `
        <p class="feedback bad">
          Nicht korrekt. Richtige Phase: "${getPhaseLabel(task.phase)}". ${task.why}
        </p>
      `;
    }
  });

  if (answered < buildTasks.length) {
    dmsBuildFeedback.innerHTML = '<p class="feedback info">Bitte alle Bausteine zuordnen.</p>';
    return;
  }

  const allCorrect = correct === buildTasks.length;
  dmsBuildFeedback.innerHTML = `
    <p class="feedback ${allCorrect ? "ok" : "bad"}">
      ${correct} / ${buildTasks.length} richtig.
      ${allCorrect ? "Sehr gut geordnet." : "Arbeite die roten Erklaerungen durch und starte dann eine neue Runde."}
    </p>
  `;
}

function uniqueOptions(options, fallbackPrefix) {
  const seen = new Set();
  return options.map((option, index) => {
    let text = option.text;
    while (seen.has(text)) {
      text = `${text} (${fallbackPrefix} ${index + 1})`;
    }
    seen.add(text);
    return { ...option, text };
  });
}

function makeOpeningTask() {
  const subject = pickOne(openingSubjects);
  const place = pickOne(places);
  const correct = `Es war einmal ${subject} ${place}.`;
  const options = uniqueOptions(shuffle([
    { text: correct, isCorrect: true, wrongReason: "" },
    { text: `Heute um 7:45 Uhr in Hannover stand ${subject} an der Bushaltestelle.`, isCorrect: false, wrongReason: "Zu alltaeglich und zu genau fuer einen typischen Maerchenanfang." },
    { text: `${subject} lebt ${place}.`, isCorrect: false, wrongReason: "Praesens und knapper Bericht klingen hier nicht maerchentypisch." },
    { text: `Das ist die Geschichte von ${subject}. Ende.`, isCorrect: false, wrongReason: "Kein sinnvoller Einstieg in Handlung und Ausgangslage." },
  ]), "var");

  return {
    prompt: "Waehle den besten Maerchenanfang.",
    options,
    explanation: "Der Satz nutzt eine typische Anfangsformel und fuehrt die Figur ein.",
  };
}

function makeMainPartTask() {
  const goal = pickOne(goals);
  const helper = pickOne(helpers);
  const correct = `Beim dritten Versuch fand sie mit Hilfe von ${helper} den Weg, um ${goal}.`;
  const options = uniqueOptions(shuffle([
    { text: correct, isCorrect: true, wrongReason: "" },
    { text: `Dann war alles egal und niemand tat etwas.`, isCorrect: false, wrongReason: "Der Hauptteil braucht Entwicklung, nicht Stillstand." },
    { text: `Sie macht ${goal} und dann macht sie es nochmal.`, isCorrect: false, wrongReason: "Sprache und Spannung sind hier zu simpel und ohne Steigerung." },
    { text: `Kapitel 2: Fertig.`, isCorrect: false, wrongReason: "Kein ausgearbeiteter Handlungsschritt." },
  ]), "var");

  return {
    prompt: "Welche Formulierung passt am besten in den Hauptteil?",
    options,
    explanation: "Der Satz zeigt Pruefung, Steigerung und magische Hilfe.",
  };
}

function makeEndingTask() {
  const subject = pickOne(openingSubjects);
  const correct = `So war der Bann gebrochen, und ${subject} lebte von da an gluecklich und zufrieden.`;
  const options = uniqueOptions(shuffle([
    { text: correct, isCorrect: true, wrongReason: "" },
    { text: `Naja, mal sehen, vielleicht geht die Geschichte irgendwann weiter.`, isCorrect: false, wrongReason: "Das Ende bleibt offen statt den Konflikt zu loesen." },
    { text: `Und dann ist Schluss, weil ich keine Idee mehr hatte.`, isCorrect: false, wrongReason: "Metakommentar passt nicht zum Maerchenstil." },
    { text: `Die Klassenarbeit begann am naechsten Morgen.`, isCorrect: false, wrongReason: "Der Schlusssatz fuehrt aus dem Maerchen heraus." },
  ]), "var");

  return {
    prompt: "Waehle den passenden Maerchenschluss.",
    options,
    explanation: "Der Konflikt wird geloest und das Maerchen endet geschlossen.",
  };
}

function makeRevisionTask() {
  const options = shuffle([
    { text: "Ich pruefe Logik, Maerchenmerkmale, Rechtschreibung und ueberarbeite den Entwurf.", isCorrect: true, wrongReason: "" },
    { text: "Ich gebe direkt ab, damit ich nichts mehr aendern muss.", isCorrect: false, wrongReason: "Ohne Ueberarbeitung bleiben oft Logik- und Sprachfehler." },
    { text: "Ich veraendere nur die Ueberschrift, der Rest bleibt.", isCorrect: false, wrongReason: "Revision umfasst deutlich mehr als nur den Titel." },
    { text: "Ich streiche zufaellig Saetze, ohne zu pruefen warum.", isCorrect: false, wrongReason: "Ueberarbeitung braucht klare Kriterien, nicht Zufall." },
  ]);

  return {
    prompt: "Welche Aussage beschreibt eine gute Ueberarbeitung?",
    options,
    explanation: "Ueberarbeitung ist ein geplanter Pruef- und Verbesserungsschritt.",
  };
}

function generateStyleRound(count = 10) {
  const taskFactories = [makeOpeningTask, makeMainPartTask, makeEndingTask, makeRevisionTask];
  const tasks = [];
  for (let i = 0; i < count; i += 1) {
    tasks.push(taskFactories[i % taskFactories.length]());
  }
  return shuffle(tasks);
}

function renderStyleRound() {
  dmsStyleList.replaceChildren();
  styleTasks.forEach((task, index) => {
    const row = document.createElement("article");
    row.className = "dms-task-row";
    row.dataset.index = String(index);

    const prompt = document.createElement("p");
    prompt.textContent = `${index + 1}. ${task.prompt}`;

    const choiceGrid = document.createElement("div");
    choiceGrid.className = "dms-choice-grid";
    task.options.forEach((option, optionIndex) => {
      const label = document.createElement("label");
      label.className = "dms-choice-item";
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `style-${index}`;
      radio.value = String(optionIndex);
      label.append(radio, document.createTextNode(option.text));
      choiceGrid.append(label);
    });

    const feedback = document.createElement("div");
    feedback.className = "task-feedback";
    row.append(prompt, choiceGrid, feedback);
    dmsStyleList.append(row);
  });
}

function checkStyleRound() {
  const rows = dmsStyleList.querySelectorAll(".dms-task-row");
  let answered = 0;
  let correct = 0;

  rows.forEach((row, index) => {
    row.classList.remove("is-correct", "is-wrong");
    const feedback = row.querySelector(".task-feedback");
    if (!(feedback instanceof HTMLDivElement)) {
      return;
    }
    feedback.innerHTML = "";

    const checked = row.querySelector(`input[name="style-${index}"]:checked`);
    if (!(checked instanceof HTMLInputElement)) {
      return;
    }
    answered += 1;

    const optionIndex = Number(checked.value);
    const task = styleTasks[index];
    const selected = task.options[optionIndex];
    const correctOption = task.options.find((option) => option.isCorrect);

    if (selected?.isCorrect) {
      correct += 1;
      row.classList.add("is-correct");
      feedback.innerHTML = `<p class="feedback ok">Richtig. ${task.explanation}</p>`;
    } else {
      row.classList.add("is-wrong");
      feedback.innerHTML = `
        <p class="feedback bad">
          Nicht korrekt. ${selected?.wrongReason || "Pruefe den Maerchenstil erneut."}
          Richtige Loesung: "${correctOption?.text || ""}".
        </p>
      `;
    }
  });

  if (answered < styleTasks.length) {
    dmsStyleFeedback.innerHTML = '<p class="feedback info">Bitte alle Aufgaben beantworten.</p>';
    return;
  }

  const allCorrect = correct === styleTasks.length;
  dmsStyleFeedback.innerHTML = `
    <p class="feedback ${allCorrect ? "ok" : "bad"}">
      ${correct} / ${styleTasks.length} richtig.
      ${allCorrect ? "Sehr gut formuliert." : "Lies die roten Erklaerungen und wiederhole die Runde."}
    </p>
  `;
}

function generatePlot() {
  const hero = pickOne(openingSubjects);
  const place = pickOne(places);
  const mission = pickOne(goals);
  const helper = pickOne(helpers);
  const obstacleA = "eine verschlossene Bruecke";
  const obstacleB = "ein listiger Gegenspieler";

  dmsPlotPreview.innerHTML = `
    <strong>Plotvorschlag:</strong><br>
    Anfang: Es war einmal ${hero} ${place}.<br>
    Auftrag: ${hero} soll ${mission}.<br>
    Hauptteil: Zuerst taucht ${obstacleA} auf, dann ${obstacleB}. Beim dritten Versuch hilft ${helper}.<br>
    Ende: Der Auftrag gelingt, der Konflikt loest sich, und alle leben gluecklich und zufrieden.
  `;
}

function fixedQuizQuestions() {
  return [
    {
      prompt: "Welcher Schritt kommt vor dem Schreiben des Entwurfs?",
      options: ["Reinschrift erstellen", "Planung von Figuren, Ort und Aufgabe", "Nur den Schluss schreiben", "Sofort abgeben"],
      correct: 1,
      explanation: "Ein geplanter Entwurf ist Grundlage fuer einen klaren Text.",
      wrongReasons: {
        0: "Reinschrift ist ein spaeter Schritt.",
        2: "Ein einzelner Schluss ohne Planung reicht nicht.",
        3: "Ohne Entwurf und Ueberarbeitung fehlen zentrale Schritte.",
      },
    },
    {
      prompt: "Welche Formulierung ist typisch fuer den Maerchenanfang?",
      options: ["Breaking News aus der Stadt", "Es war einmal ...", "Heute um 8:10 Uhr ...", "Kapitel 1: Ende"],
      correct: 1,
      explanation: "Die Formel signalisiert sofort die Textsorte Maerchen.",
      wrongReasons: {
        0: "Das klingt nach Nachricht, nicht nach Maerchen.",
        2: "Zu exakte Alltagszeit passt selten zum Maerchenstil.",
        3: "Das ist kein sinnvoller Anfang.",
      },
    },
    {
      prompt: "Wozu dient die Ueberarbeitung?",
      options: ["Nur Kommas zaehlen", "Text absichtlich verkuerzen", "Logik, Sprache und Merkmale verbessern", "Schreibprozess beenden ohne Pruefung"],
      correct: 2,
      explanation: "Ueberarbeitung prueft Inhalt, Aufbau und Sprache.",
      wrongReasons: {
        0: "Revision ist mehr als Zeichensetzung.",
        1: "Verkuerzen allein loest keine inhaltlichen Probleme.",
        3: "Ohne Pruefung fehlt ein zentraler Kompetenzschritt.",
      },
    },
    {
      prompt: "Was macht den Hauptteil eines Maerchens stark?",
      options: ["Nur eine Liste von Namen", "Steigende Spannung mit Hindernissen", "Nur der Titel", "Ein sofortiges Ende"],
      correct: 1,
      explanation: "Spannungsaufbau durch Konflikte traegt den Hauptteil.",
      wrongReasons: {
        0: "Namen ohne Handlung erzeugen keine Geschichte.",
        2: "Der Titel ersetzt keine Handlung.",
        3: "Ein sofortiges Ende nimmt dem Maerchen den Mittelteil.",
      },
    },
  ];
}

function buildTaskToQuizQuestion(task) {
  const options = phaseOptions.map((phase) => phase.label);
  const correct = phaseOptions.findIndex((phase) => phase.id === task.phase);
  const wrongReasons = {};
  phaseOptions.forEach((phase, index) => {
    if (index === correct) {
      return;
    }
    wrongReasons[index] = `Dieser Baustein gehoert zu "${getPhaseLabel(task.phase)}", weil: ${task.why}`;
  });

  return {
    prompt: `Zu welcher Phase gehoert dieser Baustein? ${task.text}`,
    options,
    correct,
    explanation: task.why,
    wrongReasons,
  };
}

function styleTaskToQuizQuestion(task) {
  const options = task.options.map((option) => option.text);
  const correct = task.options.findIndex((option) => option.isCorrect);
  const wrongReasons = {};
  task.options.forEach((option, index) => {
    if (index !== correct) {
      wrongReasons[index] = option.wrongReason || "Diese Option passt nicht zum Maerchenstil.";
    }
  });
  return {
    prompt: task.prompt,
    options,
    correct,
    explanation: task.explanation,
    wrongReasons,
  };
}

function buildQuizPool() {
  const fixed = fixedQuizQuestions();
  const generatedBuild = generateBuildRound(20).map(buildTaskToQuizQuestion);
  const generatedStyle = generateStyleRound(20).map(styleTaskToQuizQuestion);
  return [...fixed, ...generatedBuild, ...generatedStyle];
}

function updateQuizScore() {
  dmsQuizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.index];
  dmsQuizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
  dmsQuizPrompt.textContent = question.prompt;
  dmsQuizFeedback.innerHTML = "";
  dmsQuizNext.disabled = true;
  dmsQuizAnswers.innerHTML = question.options
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
  dmsQuizStatus.textContent = "Test abgeschlossen.";
  dmsQuizPrompt.textContent = "Du kannst den Test neu starten und dein Ergebnis verbessern.";
  dmsQuizAnswers.innerHTML = "";
  dmsQuizFeedback.innerHTML = '<p class="feedback info">Nutze die Fehlererklaerungen fuer die naechste Runde.</p>';
  dmsQuizNext.disabled = true;
  dmsQuizStart.textContent = "Neu starten";
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

  dmsQuizAnswers.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  const wrongReason = question.wrongReasons?.[optionIndex] || "Pruefe noch einmal die Schritte und Maerchenmerkmale.";
  dmsQuizFeedback.innerHTML = `
    <p class="feedback ${isCorrect ? "ok" : "bad"}">${
      isCorrect
        ? `Richtig. ${question.explanation}`
        : `Nicht korrekt. ${wrongReason} Richtige Antwort: "${question.options[question.correct]}".`
    }</p>
  `;
  dmsQuizNext.disabled = false;
  dmsQuizNext.textContent = quizState.index === quizState.questions.length - 1
    ? "Ergebnis anzeigen"
    : "Naechste Frage";
}

function startQuiz() {
  const pool = shuffle(buildQuizPool());
  quizState.running = true;
  quizState.answered = false;
  quizState.index = 0;
  quizState.correct = 0;
  quizState.questions = pool.slice(0, 10);
  dmsQuizStart.textContent = "Test neu starten";
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

function setupBuildModule() {
  buildTasks = generateBuildRound();
  renderBuildRound();
  dmsBuildFeedback.innerHTML = "";

  dmsBuildNewRound.addEventListener("click", () => {
    buildTasks = generateBuildRound();
    renderBuildRound();
    dmsBuildFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });
  dmsBuildCheck.addEventListener("click", checkBuildRound);
}

function setupStyleModule() {
  styleTasks = generateStyleRound();
  renderStyleRound();
  dmsStyleFeedback.innerHTML = "";

  dmsStyleNewRound.addEventListener("click", () => {
    styleTasks = generateStyleRound();
    renderStyleRound();
    dmsStyleFeedback.innerHTML = '<p class="feedback info">Neue Runde erstellt.</p>';
  });
  dmsStyleCheck.addEventListener("click", checkStyleRound);
}

function setupPlotGenerator() {
  dmsPlotGenerate.addEventListener("click", generatePlot);
  generatePlot();
}

function setupQuiz() {
  dmsQuizStart.addEventListener("click", startQuiz);
  dmsQuizNext.addEventListener("click", nextQuizStep);
  dmsQuizAnswers.addEventListener("click", (event) => {
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
setupBuildModule();
setupStyleModule();
setupPlotGenerator();
setupQuiz();
