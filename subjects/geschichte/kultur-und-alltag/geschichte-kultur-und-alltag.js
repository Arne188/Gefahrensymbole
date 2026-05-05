(() => {
  const topics = {
    theater: {
      label: "Buehne und Polis",
      title: "Theater war Fest, Religion und gemeinsames Nachdenken.",
      text: "Theaterstuecke wurden besonders bei Festen fuer Dionysos aufgefuehrt. Viele Menschen einer Polis sahen Tragoedien und Komoedien. Dabei ging es um Mythen, Schuld, Mut, Familie, Herrschaft und Kritik.",
      note: "Merksatz: Theater zeigt, worueber eine Gemeinschaft gemeinsam nachdenkt."
    },
    olympia: {
      label: "Sport und Goetter",
      title: "Olympia verband Wettkampf mit Zeus-Verehrung.",
      text: "Die Spiele in Olympia waren ein religioeses Fest. Athleten traten fuer Ruhm an, aber auch fuer Ehre ihrer Heimatstadt. Der Siegerkranz war ein Zeichen von Auszeichnung, nicht einfach eine moderne Sportmedaille.",
      note: "Merksatz: Sport war Teil von Religion, Ehre und griechischer Zusammengehoerigkeit."
    },
    schule: {
      label: "Paideia und Erziehung",
      title: "Bildung war ungleich verteilt.",
      text: "Jungen aus wohlhabenderen Familien konnten Lesen, Schreiben, Musik und Sport lernen. Maedchen, arme Kinder und Sklavenkinder hatten andere oder kaum Bildungswege. Sparta erzog anders als Athen.",
      note: "Merksatz: Frage immer, wer lernen durfte und wozu die Erziehung dienen sollte."
    },
    alltag: {
      label: "Oikos, Agora, Arbeit",
      title: "Alltag zeigt Rechte, Rollen und Abhaengigkeiten.",
      text: "Im Oikos lebte und wirtschaftete die Familie. Auf der Agora wurde gehandelt und gesprochen. Maennliche Buerger, Frauen, Fremde und versklavte Menschen hatten sehr unterschiedliche Rechte und Aufgaben.",
      note: "Merksatz: Alltag ist nicht fuer alle gleich. Frage: Wessen Alltag wird gezeigt?"
    }
  };

  const areaTasks = [
    { text: "Komoedien konnten Politiker und bekannte Personen verspotten.", answer: "Theater" },
    { text: "Der Sieger erhielt einen Olivenkranz und Ruhm fuer seine Polis.", answer: "Olympia" },
    { text: "Jungen lernten je nach Familie Schreiben, Musik und Sport.", answer: "Kindheit und Schule" },
    { text: "Auf der Agora wurde gehandelt, geredet und Neues erfahren.", answer: "Alltag und Markt" },
    { text: "Der Oikos war Haus, Familie und Wirtschaftseinheit.", answer: "Alltag und Markt" }
  ];

  const meaningTasks = [
    { text: "Olympische Spiele wurden zu Ehren des Zeus veranstaltet.", answer: "Religion praegte oeffentliche Feste" },
    { text: "Nicht alle Menschen hatten dieselben Bildungsmoeglichkeiten.", answer: "Die Gesellschaft war ungleich" },
    { text: "Theater wurde vor vielen Zuschauern aufgefuehrt.", answer: "Kultur staerkte Gemeinschaft" },
    { text: "Spartanische Erziehung zielte stark auf Disziplin und Koerper.", answer: "Erziehung hing von der Polis ab" },
    { text: "Sklaven mussten fuer andere arbeiten und hatten keine Buergerrechte.", answer: "Status bestimmte Rechte und Alltag" }
  ];

  const builderTasks = [
    {
      question: "Erklaere: Warum waren die Olympischen Spiele nicht einfach nur Sport?",
      correct: ["Sie ehrten Zeus", "Sie brachten Griechen verschiedener Poleis zusammen", "Sie gaben Siegern Ruhm und Ehre"],
      wrong: ["Sie waren moderne Profispiele", "Alle Menschen durften gleich teilnehmen"]
    },
    {
      question: "Erklaere: Was zeigt das Theater ueber die Polis?",
      correct: ["Viele Menschen dachten gemeinsam ueber Konflikte nach", "Religion und Kultur waren verbunden", "Komoedien konnten Kritik ausdruecken"],
      wrong: ["Theater war nur privater Zeitvertreib", "Es ersetzte die Volksversammlung"]
    },
    {
      question: "Erklaere: Warum muss man beim Alltag nach Gruppen unterscheiden?",
      correct: ["Buerger hatten andere Rechte als Frauen, Fremde und Sklaven", "Geschlecht und Status veraenderten den Alltag", "Der Oikos und die Agora wurden unterschiedlich erlebt"],
      wrong: ["Alle Griechen lebten gleich", "Kinder entschieden ueber Politik"]
    },
    {
      question: "Erklaere: Warum war Bildung im alten Griechenland ungleich?",
      correct: ["Reichtum beeinflusste Bildungswege", "Maedchen und Jungen wurden oft verschieden erzogen", "Athen und Sparta setzten andere Schwerpunkte"],
      wrong: ["Alle Kinder besuchten dieselbe Schule", "Bildung war unabhaengig von Status"]
    }
  ];

  const quizPool = [
    {
      q: "Was bedeutet Oikos am besten?",
      answers: ["Haus, Familie und Wirtschaftseinheit", "Ein reines Theatergebaeude", "Ein olympischer Lauf", "Ein griechischer Helm"],
      correct: 0,
      explain: "Der Oikos war der Haushalt mit Familie, Besitz, Arbeit und Vorrat."
    },
    {
      q: "Warum waren die Olympischen Spiele religioes wichtig?",
      answers: ["Sie wurden zu Ehren des Zeus gefeiert", "Sie wurden von modernen Staaten organisiert", "Sie ersetzten alle Tempel", "Sie waren nur Unterhaltung fuer Kinder"],
      correct: 0,
      explain: "Olympia war ein Zeus-Heiligtum. Sport und Religion gehoerten zusammen."
    },
    {
      q: "Welche Aussage beschreibt Tragoedien am besten?",
      answers: ["Sie behandelten ernste Konflikte, Schuld und schwere Entscheidungen", "Sie waren immer kurze Sportberichte", "Sie waren nur Einkaufslisten", "Sie durften keine Mythen zeigen"],
      correct: 0,
      explain: "Tragoedien zeigten ernste Fragen des menschlichen Handelns, oft mit Bezug zu Mythen."
    },
    {
      q: "Welche Funktion konnte eine Komoedie haben?",
      answers: ["Sie konnte spotten und Kritik ausdruecken", "Sie war ein Tempelopfer ohne Zuschauer", "Sie war eine Schulpruefung in Rechnen", "Sie war eine Koloniegruendung"],
      correct: 0,
      explain: "Komoedien arbeiteten mit Witz, Spott und Kritik."
    },
    {
      q: "Warum ist der Satz 'Kinder im alten Griechenland gingen zur Schule' zu einfach?",
      answers: ["Bildung hing von Geschlecht, Stadt, Status und Wohlstand ab", "Es gab keine Kinder", "Alle Kinder lernten exakt dasselbe", "Nur Koenige konnten lesen"],
      correct: 0,
      explain: "Athen, Sparta, Maedchen, Jungen, arme und reiche Kinder hatten sehr unterschiedliche Wege."
    },
    {
      q: "Was war die Agora?",
      answers: ["Markt- und Treffpunkt der Polis", "Ein Schlafraum nur fuer Athleten", "Ein Schiffstyp", "Ein Orakel in Aegypten"],
      correct: 0,
      explain: "Die Agora war zentraler Platz fuer Handel, Begegnung und oft politische Kommunikation."
    },
    {
      q: "Welche Gruppe stand bei politischer Mitbestimmung in Athen im Mittelpunkt?",
      answers: ["Freie maennliche Buerger", "Alle Frauen und Maedchen", "Alle Sklaven", "Jeder Mensch im Mittelmeerraum"],
      correct: 0,
      explain: "Politische Rechte waren stark eingeschraenkt. Freie maennliche Buerger standen im Mittelpunkt."
    },
    {
      q: "Was zeigt der Siegerkranz bei Olympia?",
      answers: ["Ehre und Ruhm waren wichtiger als moderne Medaillenlogik", "Der Sieger wurde automatisch Koenig", "Jeder Teilnehmer erhielt Geld", "Olympia war eine reine Schule"],
      correct: 0,
      explain: "Der Kranz war ein Ehrenzeichen. Ruhm fuer Athlet und Polis war zentral."
    },
    {
      q: "Warum ist Theater ein gutes Thema fuer Geschichte?",
      answers: ["Es zeigt Werte, Konflikte, Religion und Gemeinschaft", "Es beweist, dass alle Griechen gleich lebten", "Es hat nichts mit Gesellschaft zu tun", "Es zeigt nur Baukunst ohne Inhalt"],
      correct: 0,
      explain: "Theater macht sichtbar, was eine Gesellschaft erzaehlt, kritisiert und gemeinsam verhandelt."
    },
    {
      q: "Welche Aussage passt zu Sparta?",
      answers: ["Erziehung war stark auf Disziplin und koerperliche Tauglichkeit ausgerichtet", "Sparta war vor allem fuer demokratische Redeschulen bekannt", "Sparta hatte keine Erziehung", "Sparta lag in Aegypten"],
      correct: 0,
      explain: "Sparta setzte andere Schwerpunkte als Athen, besonders Disziplin und Koerper."
    },
    {
      q: "Warum muss man beim Alltag nach 'wessen Alltag?' fragen?",
      answers: ["Rechte und Aufgaben unterschieden sich nach Geschlecht, Herkunft und Status", "Alle Quellen sind falsch", "Es gab keine Unterschiede", "Nur Soldaten hatten einen Alltag"],
      correct: 0,
      explain: "Maennliche Buerger, Frauen, Fremde, Kinder und Sklaven erlebten die Polis sehr unterschiedlich."
    },
    {
      q: "Was verbindet Theater und Olympia?",
      answers: ["Beide waren oeffentliche Kulturformen mit religioesem Bezug", "Beide waren geheime Privatveranstaltungen", "Beide gehoerten nur zu Aegypten", "Beide verboten Gemeinschaft"],
      correct: 0,
      explain: "Beide zeigen, wie Religion, Gemeinschaft und oeffentliches Leben zusammenhaengen."
    },
    {
      q: "Welche Frage passt besonders gut zu einer Bildquelle ueber Alltag?",
      answers: ["Welche Menschen sieht man, welche fehlen, und welche Rollen werden gezeigt?", "Wie heisst der moderne Fotograf?", "Warum ist alles automatisch wahr?", "Wie viele Pixel hat das Bild?"],
      correct: 0,
      explain: "Bei Bildquellen fragt man nach Gruppen, Rollen, Darstellung und Luecken."
    }
  ];

  const areaOptions = ["Theater", "Olympia", "Kindheit und Schule", "Alltag und Markt"];
  const meaningOptions = [
    "Religion praegte oeffentliche Feste",
    "Die Gesellschaft war ungleich",
    "Kultur staerkte Gemeinschaft",
    "Erziehung hing von der Polis ab",
    "Status bestimmte Rechte und Alltag"
  ];

  let currentBuilder = null;
  let selectedBuilder = new Set();
  let quizQuestions = [];
  let quizIndex = 0;
  let quizScore = 0;
  let quizAnswered = false;

  function shuffle(items) {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function setFeedback(element, text, good) {
    element.textContent = text;
    element.classList.remove("is-good", "is-bad");
    element.classList.add(good ? "is-good" : "is-bad");
  }

  function initTabs() {
    document.querySelectorAll(".ka-tab-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const tab = button.dataset.tab;
        document.querySelectorAll(".ka-tab-btn").forEach((btn) => btn.classList.toggle("is-active", btn === button));
        document.querySelectorAll(".ka-tab").forEach((panel) => panel.classList.toggle("is-active", panel.id === `tab-${tab}`));
      });
    });
  }

  function renderTopic(topicKey) {
    const topic = topics[topicKey];
    if (!topic) return;
    byId("kaTopicLabel").textContent = topic.label;
    byId("kaTopicTitle").textContent = topic.title;
    byId("kaTopicText").textContent = topic.text;
    byId("kaTopicNote").textContent = topic.note;
    document.querySelectorAll(".ka-topic-btn").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.topic === topicKey);
    });
  }

  function initTopics() {
    document.querySelectorAll(".ka-topic-btn").forEach((button) => {
      button.addEventListener("click", () => renderTopic(button.dataset.topic));
    });
    renderTopic("theater");
  }

  function renderSelectTasks(containerId, tasks, options) {
    const container = byId(containerId);
    container.innerHTML = "";
    tasks.forEach((task, index) => {
      const row = document.createElement("div");
      row.className = "ka-task-row";

      const text = document.createElement("div");
      text.textContent = task.text;

      const select = document.createElement("select");
      select.dataset.answer = task.answer;
      select.dataset.index = String(index);

      const empty = document.createElement("option");
      empty.value = "";
      empty.textContent = "Bitte waehlen";
      select.appendChild(empty);

      options.forEach((option) => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        select.appendChild(opt);
      });

      row.append(text, select);
      container.appendChild(row);
    });
  }

  function checkSelectTasks(containerId, feedbackId) {
    const selects = Array.from(document.querySelectorAll(`#${containerId} select`));
    let correct = 0;
    let missing = 0;
    selects.forEach((select) => {
      if (!select.value) missing += 1;
      if (select.value === select.dataset.answer) correct += 1;
      select.style.borderColor = select.value === select.dataset.answer ? "#5da55d" : "#cf6159";
    });
    const feedback = byId(feedbackId);
    if (missing > 0) {
      setFeedback(feedback, `Du hast ${correct}/${selects.length} richtig. Fuell noch alle Felder aus, dann wird es klarer.`, false);
      return;
    }
    setFeedback(feedback, correct === selects.length ? `Stark: ${correct}/${selects.length} richtig.` : `${correct}/${selects.length} richtig. Schau besonders auf die Leitwoerter in den Aussagen.`, correct === selects.length);
  }

  function initSelectTasks() {
    renderSelectTasks("kaAreaTasks", areaTasks, areaOptions);
    renderSelectTasks("kaMeaningTasks", meaningTasks, meaningOptions);
    byId("kaCheckAreas").addEventListener("click", () => checkSelectTasks("kaAreaTasks", "kaAreaFeedback"));
    byId("kaCheckMeanings").addEventListener("click", () => checkSelectTasks("kaMeaningTasks", "kaMeaningFeedback"));
  }

  function renderBuilder() {
    currentBuilder = shuffle(builderTasks)[0];
    selectedBuilder = new Set();
    byId("kaBuilderQuestion").textContent = currentBuilder.question;
    byId("kaBuilderFeedback").textContent = "";
    byId("kaBuilderFeedback").classList.remove("is-good", "is-bad");
    const options = shuffle([...currentBuilder.correct, ...currentBuilder.wrong]);
    const container = byId("kaBuilderOptions");
    container.innerHTML = "";
    options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "ka-chip";
      button.textContent = option;
      button.addEventListener("click", () => {
        if (selectedBuilder.has(option)) {
          selectedBuilder.delete(option);
        } else {
          selectedBuilder.add(option);
        }
        button.classList.toggle("is-selected");
      });
      container.appendChild(button);
    });
  }

  function checkBuilder() {
    const correctSet = new Set(currentBuilder.correct);
    const selected = Array.from(selectedBuilder);
    const allCorrect = currentBuilder.correct.every((item) => selectedBuilder.has(item));
    const noWrong = selected.every((item) => correctSet.has(item));
    const good = allCorrect && noWrong;
    const feedback = byId("kaBuilderFeedback");
    if (good) {
      setFeedback(feedback, "Sehr gut: Deine Bausteine ergeben eine tragfaehige historische Erklaerung.", true);
      return;
    }
    setFeedback(feedback, "Noch nicht ganz. Eine gute Erklaerung braucht alle passenden Bausteine und keine modernen oder falschen Aussagen.", false);
  }

  function initBuilder() {
    byId("kaCheckBuilder").addEventListener("click", checkBuilder);
    byId("kaNewBuilder").addEventListener("click", renderBuilder);
    renderBuilder();
  }

  function startQuiz() {
    quizQuestions = shuffle(quizPool).slice(0, 10).map((question) => {
      const correctAnswer = question.answers[question.correct];
      const answers = shuffle(question.answers);
      return {
        ...question,
        answers,
        correct: answers.indexOf(correctAnswer)
      };
    });
    quizIndex = 0;
    quizScore = 0;
    quizAnswered = false;
    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const box = byId("kaQuizBox");
    const score = byId("kaQuizScore");
    score.textContent = `Punkte: ${quizScore}/${quizQuestions.length}`;

    if (quizIndex >= quizQuestions.length) {
      box.innerHTML = `<h3>Test beendet</h3><p>Du hast ${quizScore}/${quizQuestions.length} Punkten erreicht.</p><p>${quizScore >= 8 ? "Sehr sicher. Du kannst Zusammenhaenge erklaeren." : "Wiederhole besonders die Unterschiede zwischen Theater, Olympia, Schule und Alltag."}</p>`;
      return;
    }

    const question = quizQuestions[quizIndex];
    quizAnswered = false;
    box.innerHTML = "";

    const label = document.createElement("p");
    label.className = "ka-mini-label";
    label.textContent = `Frage ${quizIndex + 1} von ${quizQuestions.length}`;

    const title = document.createElement("h3");
    title.textContent = question.q;

    const answers = document.createElement("div");
    answers.className = "ka-answer-list";

    const feedback = document.createElement("div");
    feedback.className = "ka-feedback";
    feedback.setAttribute("aria-live", "polite");

    question.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "ka-answer-btn";
      button.textContent = answer;
      button.addEventListener("click", () => {
        if (quizAnswered) return;
        quizAnswered = true;
        const correct = index === question.correct;
        if (correct) quizScore += 1;
        button.classList.add(correct ? "is-correct" : "is-wrong");
        const correctButton = answers.children[question.correct];
        correctButton.classList.add("is-correct");
        setFeedback(feedback, `${correct ? "Richtig." : "Nicht ganz."} ${question.explain}`, correct);
        byId("kaQuizScore").textContent = `Punkte: ${quizScore}/${quizQuestions.length}`;
      });
      answers.appendChild(button);
    });

    box.append(label, title, answers, feedback);
  }

  function initQuiz() {
    byId("kaRestartQuiz").addEventListener("click", startQuiz);
    byId("kaNextQuestion").addEventListener("click", () => {
      if (!quizAnswered && quizIndex < quizQuestions.length) {
        const box = byId("kaQuizBox");
        const existing = box.querySelector(".ka-feedback");
        setFeedback(existing, "Beantworte die Frage erst, dann geht es weiter.", false);
        return;
      }
      quizIndex += 1;
      renderQuizQuestion();
    });
    startQuiz();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    initTopics();
    initSelectTasks();
    initBuilder();
    initQuiz();
  });
})();
