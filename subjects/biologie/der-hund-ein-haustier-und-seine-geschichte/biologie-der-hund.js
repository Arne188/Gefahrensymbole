const tabButtons = document.querySelectorAll(".bdh-tab-btn");
const tabPanels = document.querySelectorAll(".bdh-tab");

const petCheckList = document.getElementById("bdhPetCheckList");
const petCheckReset = document.getElementById("bdhPetCheckReset");
const petCheckCheck = document.getElementById("bdhPetCheckCheck");
const petCheckFeedback = document.getElementById("bdhPetCheckFeedback");

const timelineSlider = document.getElementById("bdhTimelineSlider");
const timelinePrev = document.getElementById("bdhTimelinePrev");
const timelineNext = document.getElementById("bdhTimelineNext");
const timelineProgress = document.getElementById("bdhTimelineProgress");
const timelineStepButtons = document.querySelectorAll(".bdh-timeline-step");
const timelineTitle = document.getElementById("bdhTimelineTitle");
const timelineText = document.getElementById("bdhTimelineText");
const timelineFacts = document.getElementById("bdhTimelineFacts");

const senseButtons = document.querySelectorAll(".bdh-chip");
const senseTitle = document.getElementById("bdhSenseTitle");
const senseText = document.getElementById("bdhSenseText");
const senseFacts = document.getElementById("bdhSenseFacts");

const breedGoal = document.getElementById("bdhBreedGoal");
const breedChanceList = document.getElementById("bdhBreedChanceList");
const breedRiskList = document.getElementById("bdhBreedRiskList");

const trainCount = document.getElementById("bdhTrainCount");
const trainGenerate = document.getElementById("bdhTrainGenerate");
const trainCheck = document.getElementById("bdhTrainCheck");
const trainList = document.getElementById("bdhTrainList");
const trainFeedback = document.getElementById("bdhTrainFeedback");

const testStart = document.getElementById("bdhTestStart");
const testNext = document.getElementById("bdhTestNext");
const testScore = document.getElementById("bdhTestScore");
const testStatus = document.getElementById("bdhTestStatus");
const testPrompt = document.getElementById("bdhTestPrompt");
const testAnswers = document.getElementById("bdhTestAnswers");
const testFeedback = document.getElementById("bdhTestFeedback");

const petCheckItems = [
  {
    statement: "Ein Haustier lebt in enger Beziehung zum Menschen und wird von ihm versorgt.",
    answer: "typisch",
  },
  {
    statement: "Ein Tier ist schon dann ein Haustier, wenn es nur kurz im Garten auftaucht.",
    answer: "nicht",
  },
  {
    statement: "Zucht kann Merkmale von Haustieren ueber Generationen veraendern.",
    answer: "typisch",
  },
  {
    statement: "Haustiere brauchen kein Futter und keine Pflege durch Menschen.",
    answer: "nicht",
  },
  {
    statement: "Zwischen Mensch und Haustier entstehen oft feste Bindungen.",
    answer: "typisch",
  },
];

const timelineStages = [
  {
    title: "Station 1: Wolf als Ausgangspunkt",
    text: "Der Hund stammt vom Wolf ab. Beide gehoeren zur gleichen Artengruppe der Hundeartigen.",
    facts: [
      "Wolfsrudel hatten feste Sozialstrukturen.",
      "Wolfsverhalten bildet eine wichtige Grundlage fuer das Verstaendnis des Hundes.",
    ],
  },
  {
    title: "Station 2: Erste Annaeherung an den Menschen",
    text: "Vor vielen tausend Jahren naeherten sich manche Woelfe den Siedlungen von Menschen an.",
    facts: [
      "Mutigere Tiere fanden leichter Nahrung in der Naehe von Menschen.",
      "Menschen bemerkten frueh Nutzen wie Wachsamkeit und Warnverhalten.",
    ],
  },
  {
    title: "Station 3: Domestikation",
    text: "Ueber viele Generationen wurden zutraulichere Tiere bevorzugt. Daraus entstanden fruehe Hundeformen.",
    facts: [
      "Domestikation ist ein langsamer Prozess ueber lange Zeitraeume.",
      "Verhalten, Koerperform und Fell konnten sich schrittweise veraendern.",
    ],
  },
  {
    title: "Station 4: Gezielte Zuechtung bis heute",
    text: "Menschen waehlten Hunde fuer bestimmte Aufgaben aus, etwa Hueten, Jagen oder Begleiten.",
    facts: [
      "So entstanden viele Rassen mit unterschiedlichen Merkmalen.",
      "Mit Zuechtung geht immer Verantwortung fuer Gesundheit und Wohlbefinden einher.",
    ],
  },
];

const senseInfo = {
  geruch: {
    title: "Geruchssinn",
    text: "Der Geruchssinn des Hundes ist sehr fein ausgepraegt und hilft bei Orientierung, Suche und Kommunikation.",
    facts: [
      "Hunde koennen Geruchsspuren ueber lange Strecken verfolgen.",
      "Gerueche liefern Informationen ueber Artgenossen und Umwelt.",
    ],
  },
  gehoer: {
    title: "Gehoer",
    text: "Hunde nehmen hohe Toene gut wahr und reagieren frueh auf Geraeusche.",
    facts: [
      "Bewegliche Ohrmuscheln helfen beim Orten von Schallquellen.",
      "Das Gehoer unterstuetzt Warn- und Schutzverhalten.",
    ],
  },
  sehen: {
    title: "Sehsinn",
    text: "Der Hund erkennt Bewegungen sehr gut und kann sich auch bei wenig Licht orientieren.",
    facts: [
      "Schnelle Bewegungen werden besonders gut wahrgenommen.",
      "Das hilft bei Jagd-, Such- und Spielverhalten.",
    ],
  },
  pfoten: {
    title: "Pfoten und Bewegung",
    text: "Pfoten, Krallen und Muskulatur sind gut auf Lauf- und Ausdauerleistungen abgestimmt.",
    facts: [
      "Pfoten geben Halt auf unterschiedlichen Untergruenden.",
      "Koerperbau und Bewegungsapparat passen zur jeweiligen Aufgabe.",
    ],
  },
  tasthaare: {
    title: "Tasthaare",
    text: "Tasthaare sind empfindliche Sinneshaare und helfen bei Nahwahrnehmung und Orientierung.",
    facts: [
      "Sie reagieren auf Beruehrung und Luftbewegungen.",
      "Das ist besonders bei Dunkelheit hilfreich.",
    ],
  },
};

const breedInfo = {
  groesse: {
    chances: [
      "Anpassung an unterschiedliche Aufgaben und Lebensraeume.",
      "Leistungsprofile koennen fuer Arbeit oder Alltag sinnvoll sein.",
    ],
    risks: [
      "Sehr extreme Groessen koennen Gesundheitsprobleme verstaerken.",
      "Beduerfnisse von Bewegung und Haltung muessen zur Groesse passen.",
    ],
  },
  fell: {
    chances: [
      "Fell kann an Klima und Einsatzgebiet angepasst werden.",
      "Unterschiedliche Felltypen bieten Schutz vor Naesse oder Kaelte.",
    ],
    risks: [
      "Pflegeaufwand steigt bei manchen Fellformen deutlich.",
      "Zucht nur nach Aussehen kann wichtige Gesundheitsaspekte uebersehen.",
    ],
  },
  kopf: {
    chances: [
      "Bestimmte Kopfformen wurden fuer spezielle Funktionen ausgewaehlt.",
      "Rassenmerkmale koennen erkennbare Profile schaffen.",
    ],
    risks: [
      "Zu starke Extreme koennen Atmung, Augen oder Zaehne belasten.",
      "Funktion und Tierwohl muessen Vorrang vor reiner Optik haben.",
    ],
  },
  verhalten: {
    chances: [
      "Gezielte Auswahl kann Lernfaehigkeit und Arbeitsbereitschaft staerken.",
      "Verschiedene Aufgabenprofile sind moeglich, z. B. Hueten oder Assistenz.",
    ],
    risks: [
      "Fehlende Auslastung kann zu Verhaltensproblemen fuehren.",
      "Nicht jede Rasse passt zu jedem Haushalt und Lebensstil.",
    ],
  },
};

const questionPool = [
  {
    prompt: "Welche Aussage beschreibt ein Haustier am besten?",
    options: [
      "Ein Tier, das nur zufaellig in der Naehe von Menschen lebt.",
      "Ein Tier mit enger Mensch-Tier-Beziehung und regelmaessiger Versorgung.",
      "Jedes Tier, das in Deutschland vorkommt.",
      "Nur ein Tier mit Stammbuch.",
    ],
    answer: 1,
    explain: "Haustiere leben in enger Beziehung mit Menschen und werden von ihnen versorgt.",
  },
  {
    prompt: "Der Hund stammt in Grundzuegen von welchem Wildtier ab?",
    options: ["Luchs", "Wolf", "Fuchs", "Waschbaer"],
    answer: 1,
    explain: "Die Abstammung des Hundes wird in Grundzuegen vom Wolf abgeleitet.",
  },
  {
    prompt: "Was bedeutet Domestikation?",
    options: [
      "Schnelle Veraenderung innerhalb weniger Tage",
      "Anpassung eines Tieres ueber viele Generationen in Menschennnaehe",
      "Das Aussetzen von Tieren in der Natur",
      "Einmalige Dressur",
    ],
    answer: 1,
    explain: "Domestikation ist ein langfristiger Prozess ueber viele Generationen.",
  },
  {
    prompt: "Was ist ein typisches Ziel von Zuechtung?",
    options: [
      "Merkmale gezielt ueber Generationen beeinflussen",
      "Alle Hunde sollen gleich aussehen",
      "Wilde Tiere schneller laufen lassen",
      "Nur Fellfarbe veraendern, sonst nichts",
    ],
    answer: 0,
    explain: "Zuechtung bedeutet gezielte Auswahl bestimmter Merkmale ueber Generationen.",
  },
  {
    prompt: "Warum ist der Geruchssinn fuer Hunde wichtig?",
    options: [
      "Er ersetzt den Sehsinn vollstaendig.",
      "Er hilft bei Orientierung, Suche und Kommunikation.",
      "Er funktioniert nur im Winter.",
      "Er ist fuer Hunde unwichtig.",
    ],
    answer: 1,
    explain: "Geruch ist fuer Hunde ein zentraler Sinn beim Orientieren und Suchen.",
  },
  {
    prompt: "Welche Aussage zur Verantwortung bei Zuechtung stimmt?",
    options: [
      "Nur das Aussehen ist wichtig.",
      "Gesundheit und Wohlbefinden sollen mitbedacht werden.",
      "Risiken spielen keine Rolle.",
      "Verhalten kann nicht beeinflusst werden.",
    ],
    answer: 1,
    explain: "Zuechtung braucht Verantwortung fuer Gesundheit und Tierwohl.",
  },
  {
    prompt: "Welche Kombination passt am besten zusammen?",
    options: [
      "Tasthaare - Orientierung im Nahbereich",
      "Pfoten - keinerlei Bedeutung fuer Bewegung",
      "Gehoer - nur sehr tiefe Toene",
      "Geruch - ausschliesslich bei Futter wichtig",
    ],
    answer: 0,
    explain: "Tasthaare helfen bei Nahwahrnehmung und Orientierung.",
  },
  {
    prompt: "Warum gibt es viele verschiedene Hunderassen?",
    options: [
      "Weil alle Hunde identisch gezuechtet wurden",
      "Durch zufaellige Mutation ohne menschliche Auswahl",
      "Durch unterschiedliche Zuchtziele und Aufgaben",
      "Weil Hunde nicht miteinander verwandt sind",
    ],
    answer: 2,
    explain: "Unterschiedliche Aufgaben fuehrten zu unterschiedlichen Zuchtzielen.",
  },
  {
    prompt: "Was zeigt Angepasstheit beim Hund?",
    options: [
      "Sinnesorgane und Koerperbau passen zu Aufgaben und Umwelt.",
      "Hunde koennen in jeder Umgebung gleich gut leben.",
      "Nur die Fellfarbe ist angepasst.",
      "Angepasstheit betrifft nur Welpen.",
    ],
    answer: 0,
    explain: "Angepasstheit betrifft mehrere Merkmale wie Sinne und Koerperbau.",
  },
  {
    prompt: "Welche Aussage zur Abstammung ist korrekt?",
    options: [
      "Hund und Wolf haben keinen gemeinsamen Ursprung.",
      "Der Hund wurde unabhaengig vom Menschen in wenigen Jahren gebildet.",
      "Die Entwicklung vom Wolf zum Hund verlief ueber lange Zeitraeume.",
      "Abstammung spielt in der Biologie keine Rolle.",
    ],
    answer: 2,
    explain: "Die Entwicklung verlief ueber viele Generationen.",
  },
  {
    prompt: "Welche Beurteilung passt zu guter Hundehaltung?",
    options: [
      "Nur Futter ist wichtig.",
      "Bewegung, Versorgung, Erziehung und soziale Bindung sind wichtig.",
      "Je weniger Kontakt, desto besser.",
      "Aufgaben und Rasse spielen keine Rolle.",
    ],
    answer: 1,
    explain: "Gute Haltung umfasst mehrere Bereiche und orientiert sich an Beduerfnissen.",
  },
  {
    prompt: "Was ist ein typisches Merkmal wissenschaftlichen Arbeitens im Modul?",
    options: [
      "Merkmale beobachten, vergleichen und begruendet zuordnen",
      "Antworten auswendig raten",
      "Nur Bilder anschauen ohne Begruendung",
      "Alle Tiere gleich behandeln ohne Unterschiede",
    ],
    answer: 0,
    explain: "Im Modul werden Beobachtung, Vergleich und begruendete Zuordnung trainiert.",
  },
];

let currentTrainingQuestions = [];
let currentTestQuestions = [];
let currentTestIndex = 0;
let currentTestScore = 0;
let hasAnsweredCurrentTestQuestion = false;
let currentTimelineIndex = 0;

function shuffle(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function sample(items, count) {
  return shuffle(items).slice(0, Math.min(count, items.length));
}

function setActiveTab(tabKey) {
  tabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === tabKey);
  });

  tabPanels.forEach((panel) => {
    const shouldShow = panel.id === `tab-${tabKey}`;
    panel.classList.toggle("is-active", shouldShow);
  });
}

function renderPetCheck() {
  petCheckList.replaceChildren();

  petCheckItems.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "bdh-task-item";

    const label = document.createElement("label");
    label.setAttribute("for", `bdh-pet-${index}`);
    label.textContent = item.statement;

    const select = document.createElement("select");
    select.id = `bdh-pet-${index}`;
    select.className = "bdh-select";
    select.dataset.answer = item.answer;

    const choices = [
      { value: "", text: "Bitte auswaehlen" },
      { value: "typisch", text: "Typisch fuer Haustier" },
      { value: "nicht", text: "Nicht zwingend fuer Haustier" },
    ];

    choices.forEach((choice) => {
      const option = document.createElement("option");
      option.value = choice.value;
      option.textContent = choice.text;
      select.append(option);
    });

    row.append(label, select);
    petCheckList.append(row);
  });

  petCheckFeedback.textContent = "Noch nicht geprueft.";
}

function checkPetCheck() {
  const rows = [...petCheckList.querySelectorAll(".bdh-task-item")];
  let correct = 0;
  let answered = 0;

  rows.forEach((row) => {
    const select = row.querySelector("select");
    if (!(select instanceof HTMLSelectElement)) {
      return;
    }

    row.classList.remove("is-correct", "is-wrong");
    if (!select.value) {
      return;
    }

    answered += 1;
    if (select.value === select.dataset.answer) {
      correct += 1;
      row.classList.add("is-correct");
    } else {
      row.classList.add("is-wrong");
    }
  });

  if (answered === 0) {
    petCheckFeedback.textContent = "Waehle zuerst mindestens eine Antwort aus.";
    return;
  }

  petCheckFeedback.textContent = `Richtig: ${correct} von ${petCheckItems.length}.`;
}

function renderTimeline(index) {
  const stage = timelineStages[index] || timelineStages[0];
  timelineTitle.textContent = stage.title;
  timelineText.textContent = stage.text;
  timelineFacts.replaceChildren();

  stage.facts.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    timelineFacts.append(li);
  });
}

function setTimelineIndex(nextIndex) {
  const maxIndex = timelineStages.length - 1;
  const clampedIndex = Math.max(0, Math.min(maxIndex, nextIndex));
  currentTimelineIndex = clampedIndex;

  timelineSlider.value = String(clampedIndex);
  renderTimeline(clampedIndex);

  if (timelineProgress instanceof HTMLElement) {
    timelineProgress.textContent = `Station ${clampedIndex + 1} von ${timelineStages.length}`;
  }

  if (timelinePrev instanceof HTMLButtonElement) {
    timelinePrev.disabled = clampedIndex === 0;
  }

  if (timelineNext instanceof HTMLButtonElement) {
    timelineNext.disabled = clampedIndex === maxIndex;
  }

  timelineStepButtons.forEach((button) => {
    const buttonIndex = Number(button.dataset.timelineIndex);
    button.classList.toggle("is-active", buttonIndex === clampedIndex);
  });
}

function setSense(key) {
  const info = senseInfo[key] || senseInfo.geruch;
  senseButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.sense === key);
  });

  senseTitle.textContent = info.title;
  senseText.textContent = info.text;
  senseFacts.replaceChildren();
  info.facts.forEach((fact) => {
    const li = document.createElement("li");
    li.textContent = fact;
    senseFacts.append(li);
  });
}

function renderBreedInfo(key) {
  const info = breedInfo[key] || breedInfo.groesse;
  breedChanceList.replaceChildren();
  breedRiskList.replaceChildren();

  info.chances.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    breedChanceList.append(li);
  });

  info.risks.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    breedRiskList.append(li);
  });
}

function renderTraining() {
  const count = Number(trainCount.value) || 10;
  currentTrainingQuestions = sample(questionPool, count);
  trainList.replaceChildren();

  currentTrainingQuestions.forEach((question, qIndex) => {
    const task = document.createElement("article");
    task.className = "bdh-task-item";
    task.dataset.index = String(qIndex);

    const label = document.createElement("label");
    label.textContent = `${qIndex + 1}. ${question.prompt}`;
    task.append(label);

    question.options.forEach((option, oIndex) => {
      const wrapper = document.createElement("label");
      wrapper.style.display = "block";
      wrapper.style.marginTop = "0.25rem";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `bdh-train-${qIndex}`;
      radio.value = String(oIndex);
      radio.style.marginRight = "0.45rem";
      wrapper.append(radio, document.createTextNode(option));
      task.append(wrapper);
    });

    trainList.append(task);
  });

  trainFeedback.textContent = `${currentTrainingQuestions.length} Aufgaben erzeugt.`;
}

function checkTraining() {
  if (currentTrainingQuestions.length === 0) {
    trainFeedback.textContent = "Bitte zuerst Aufgaben erstellen.";
    return;
  }

  let correct = 0;
  let answered = 0;

  const tasks = [...trainList.querySelectorAll(".bdh-task-item")];
  tasks.forEach((task) => {
    task.classList.remove("is-correct", "is-wrong");

    const index = Number(task.dataset.index);
    const question = currentTrainingQuestions[index];
    if (!question) {
      return;
    }

    const picked = task.querySelector("input[type='radio']:checked");
    if (!(picked instanceof HTMLInputElement)) {
      return;
    }

    answered += 1;
    if (Number(picked.value) === question.answer) {
      correct += 1;
      task.classList.add("is-correct");
    } else {
      task.classList.add("is-wrong");
    }
  });

  if (answered === 0) {
    trainFeedback.textContent = "Bitte antworte zuerst mindestens auf eine Frage.";
    return;
  }

  trainFeedback.textContent = `Training: ${correct} von ${currentTrainingQuestions.length} richtig.`;
}

function updateTestScore() {
  testScore.textContent = `Punkte: ${currentTestScore} / ${currentTestQuestions.length || 10}`;
}

function renderCurrentTestQuestion() {
  const current = currentTestQuestions[currentTestIndex];
  if (!current) {
    testStatus.textContent = "Test beendet.";
    testPrompt.textContent = "Du hast alle Fragen bearbeitet.";
    testAnswers.replaceChildren();
    testFeedback.textContent = "";
    testNext.disabled = true;
    return;
  }

  hasAnsweredCurrentTestQuestion = false;
  testStatus.textContent = `Frage ${currentTestIndex + 1} von ${currentTestQuestions.length}`;
  testPrompt.textContent = current.prompt;
  testFeedback.textContent = "";
  testAnswers.replaceChildren();
  testNext.disabled = true;

  current.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "bdh-choice-btn";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => {
      if (hasAnsweredCurrentTestQuestion) {
        return;
      }
      hasAnsweredCurrentTestQuestion = true;

      const isCorrect = index === current.answer;
      if (isCorrect) {
        currentTestScore += 1;
      }

      const allButtons = [...testAnswers.querySelectorAll(".bdh-choice-btn")];
      allButtons.forEach((btn, btnIndex) => {
        btn.disabled = true;
        if (btnIndex === current.answer) {
          btn.classList.add("is-correct");
        } else if (btnIndex === index && !isCorrect) {
          btn.classList.add("is-wrong");
        }
      });

      updateTestScore();
      testFeedback.textContent = `${isCorrect ? "Richtig." : "Nicht ganz."} ${current.explain}`;
      testNext.disabled = false;
    });
    testAnswers.append(button);
  });
}

function startTest() {
  currentTestQuestions = sample(questionPool, 10);
  currentTestIndex = 0;
  currentTestScore = 0;
  updateTestScore();
  renderCurrentTestQuestion();
}

function nextTestQuestion() {
  if (!hasAnsweredCurrentTestQuestion) {
    return;
  }

  currentTestIndex += 1;
  if (currentTestIndex >= currentTestQuestions.length) {
    testStatus.textContent = `Test abgeschlossen: ${currentTestScore} von ${currentTestQuestions.length} Punkten.`;
    testPrompt.textContent = "Klicke auf Test starten, um einen neuen Lauf zu beginnen.";
    testAnswers.replaceChildren();
    testFeedback.textContent = currentTestScore >= 7
      ? "Sehr gut! Du hast die zentralen Inhalte sicher verstanden."
      : "Gut gearbeitet. Wiederhole die Lernkarten und starte danach einen neuen Test.";
    testNext.disabled = true;
    return;
  }

  renderCurrentTestQuestion();
}

function initTabs() {
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveTab(button.dataset.tab || "lernen");
    });
  });
}

function initPetCheck() {
  renderPetCheck();
  petCheckReset.addEventListener("click", renderPetCheck);
  petCheckCheck.addEventListener("click", checkPetCheck);
}

function initTimeline() {
  setTimelineIndex(0);
  timelineSlider.addEventListener("input", () => {
    setTimelineIndex(Number(timelineSlider.value));
  });

  if (timelinePrev instanceof HTMLButtonElement) {
    timelinePrev.addEventListener("click", () => {
      setTimelineIndex(currentTimelineIndex - 1);
    });
  }

  if (timelineNext instanceof HTMLButtonElement) {
    timelineNext.addEventListener("click", () => {
      setTimelineIndex(currentTimelineIndex + 1);
    });
  }

  timelineStepButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setTimelineIndex(Number(button.dataset.timelineIndex));
    });
  });
}

function initSenses() {
  setSense("geruch");
  senseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setSense(button.dataset.sense || "geruch");
    });
  });
}

function initBreedInfo() {
  renderBreedInfo("groesse");
  breedGoal.addEventListener("change", () => {
    renderBreedInfo(breedGoal.value);
  });
}

function initTraining() {
  renderTraining();
  trainGenerate.addEventListener("click", renderTraining);
  trainCheck.addEventListener("click", checkTraining);
}

function initTest() {
  testStart.addEventListener("click", startTest);
  testNext.addEventListener("click", nextTestQuestion);
  updateTestScore();
}

initTabs();
initPetCheck();
initTimeline();
initSenses();
initBreedInfo();
initTraining();
initTest();
