(() => {
  const tabButtons = document.querySelectorAll(".lm-tab-btn");
  const tabPanels = document.querySelectorAll(".lm-tab");

  const stationButtonsHost = document.getElementById("lmStationButtons");
  const stationImage = document.getElementById("lmStationImage");
  const stationKicker = document.getElementById("lmStationKicker");
  const stationTitle = document.getElementById("lmStationTitle");
  const stationText = document.getElementById("lmStationText");
  const stationFact = document.getElementById("lmStationFact");

  const classifyList = document.getElementById("lmClassifyList");
  const classifyNew = document.getElementById("lmClassifyNew");
  const classifyCheck = document.getElementById("lmClassifyCheck");
  const classifyFeedback = document.getElementById("lmClassifyFeedback");

  const termsList = document.getElementById("lmTermsList");
  const termsNew = document.getElementById("lmTermsNew");
  const termsCheck = document.getElementById("lmTermsCheck");
  const termsFeedback = document.getElementById("lmTermsFeedback");

  const reasoningList = document.getElementById("lmReasoningList");
  const reasoningNew = document.getElementById("lmReasoningNew");
  const reasoningCheck = document.getElementById("lmReasoningCheck");
  const reasoningFeedback = document.getElementById("lmReasoningFeedback");

  const quizStart = document.getElementById("lmQuizStart");
  const quizNext = document.getElementById("lmQuizNext");
  const quizScore = document.getElementById("lmQuizScore");
  const quizStatus = document.getElementById("lmQuizStatus");
  const quizPrompt = document.getElementById("lmQuizPrompt");
  const quizAnswers = document.getElementById("lmQuizAnswers");
  const quizFeedback = document.getElementById("lmQuizFeedback");

  const stations = [
    {
      id: "mythos-def",
      label: "Station 1: Was ist ein Mythos?",
      image: "slices/teil-1-was-ist-mythos.png",
      kicker: "Grundbegriff Mythos",
      title: "Mythos arbeitet mit starken Erzaehlungen.",
      text: "Mythen sind traditionelle Geschichten ueber Goetter, Helden oder besondere Ereignisse. Sie sollten Welt und Schicksal verstaendlich machen.",
      fact: "Faktencheck: Britannica beschreibt Mythen als symbolische Erzaehlungen, oft mit religioesem Bezug.",
    },
    {
      id: "mythos-funktion",
      label: "Station 2: Wozu brauchte man Mythen?",
      image: "slices/teil-2-wozu-mythen.png",
      kicker: "Funktion von Mythen",
      title: "Mythen gaben Orientierung.",
      text: "Sie beantworteten wichtige Fragen: Woher kommen Naturgewalten? Warum passiert Leid? Was erwarten die Goetter von uns?",
      fact: "Faktencheck: In der antiken Religion waren Mythos, Kult und Alltag eng miteinander verbunden.",
    },
    {
      id: "mythos-beispiele",
      label: "Station 3: Beispiele fuer Mythen",
      image: "slices/teil-3-beispiele-mythen.png",
      kicker: "Goetterbeispiele",
      title: "Zeus, Poseidon und Demeter erklaerten Natur und Leben.",
      text: "Zeus stand fuer Blitz und Donner, Poseidon fuer Meer und Erdbeben, Demeter fuer Ackerbau und Ernte.",
      fact: "Faktencheck: Diese Zuordnungen sind in den antiken Quellen und Nachschlagewerken klar belegt.",
    },
    {
      id: "logos-def",
      label: "Station 4: Was bedeutet Logos?",
      image: "slices/teil-4-was-bedeutet-logos.png",
      kicker: "Grundbegriff Logos",
      title: "Logos meint begruendetes Nachdenken.",
      text: "Beim Logos fragt man nach Gruenden: Was kann man beobachten? Welche Ursachen sind nachvollziehbar?",
      fact: "Faktencheck: Logos bedeutet im Griechischen unter anderem Wort, Vernunft und begruendende Rede.",
    },
    {
      id: "logos-weg",
      label: "Station 5: Neue Art zu denken",
      image: "slices/teil-5-neue-art-zu-denken.png",
      kicker: "Denkwandel",
      title: "Menschen suchten natuerliche Ursachen.",
      text: "Fruehe Denker wie Thales oder Anaximander erklaerten die Welt zunehmend ohne direkte Goettereingriffe.",
      fact: "Faktencheck: Britannica nennt Thales den fruehen Philosophen mit einer nicht-mythologischen Naturerklaerung.",
    },
    {
      id: "vergleich",
      label: "Station 6: Mythos und Logos im Vergleich",
      image: "slices/teil-6-vergleich.png",
      kicker: "Vergleich",
      title: "Beide erklaeren Welt, aber mit anderem Zugang.",
      text: "Mythos erzaehlt in Bildern und Handlungen von Goettern. Logos sucht pruefbare Gruende durch Beobachtung und Denken.",
      fact: "Faktencheck: In der Geschichte gab es laengere Uebergaenge, nicht einen ploetzlichen Bruch.",
    },
    {
      id: "gewitter",
      label: "Station 7: Beispiel Gewitter",
      image: "slices/teil-7-beispiel-gewitter.png",
      kicker: "Anwendungsbeispiel",
      title: "Ein Naturphaenomen - zwei Erklaerwege.",
      text: "Mythos: Zeus schleudert Blitze. Logos: elektrische Entladungen erzeugen Blitz; schnell erhitzte Luft erzeugt Donner.",
      fact: "Faktencheck: Naturwissenschaftliche Erklaerungen beschreiben Donner als Schallwelle durch stark erhitzte Luft.",
    },
    {
      id: "bedeutung",
      label: "Station 8: Warum ist das wichtig?",
      image: "slices/teil-8-warum-wichtig.png",
      kicker: "Bedeutung",
      title: "Aus Logos entwickelten sich Philosophie und Wissenschaft.",
      text: "Das Fragen nach Gruenden praegt bis heute Forschung, Technik und Schule. Gleichzeitig praegen Mythen weiter Kunst und Kultur.",
      fact: "Faktencheck: Historisch gilt der Uebergang vom Mythos zum begruendenden Denken als Grundlinie der antiken Philosophiegeschichte.",
    },
  ];

  const classifyLabels = {
    mythos: "Mythos",
    logos: "Logos",
    beides: "Beides",
  };

  const classifyPool = [
    {
      statement: "Zeus schickt den Blitz als Zeichen seiner Macht.",
      answer: "mythos",
      explanation: "Das ist eine goettliche Erzaehl- und Deutungsperspektive.",
    },
    {
      statement: "Donner entsteht, wenn erhitzte Luft sich schlagartig ausdehnt.",
      answer: "logos",
      explanation: "Das ist eine naturbezogene Ursache-Wirkung-Erklaerung.",
    },
    {
      statement: "Menschen wollen verstehen, warum etwas passiert.",
      answer: "beides",
      explanation: "Sowohl Mythos als auch Logos wollen die Welt verstaendlich machen.",
    },
    {
      statement: "Eine Geschichte ueber Goetter und Helden erklaert ein Ereignis.",
      answer: "mythos",
      explanation: "Mythos arbeitet mit Erzaehlungen und symbolischen Figuren.",
    },
    {
      statement: "Eine Beobachtung wird ueberprueft und begruendet.",
      answer: "logos",
      explanation: "Das ist der typische Schritt des Logos.",
    },
    {
      statement: "Mythos und Logos praegten beide die griechische Kultur.",
      answer: "beides",
      explanation: "Historisch existierten beide Denkweisen nebeneinander.",
    },
    {
      statement: "Poseidon erklaert Erdbeben als Gott des Meeres und der Erschuetterungen.",
      answer: "mythos",
      explanation: "Das ist eine mythische Deutung mit goettlichem Handeln.",
    },
    {
      statement: "Eine Erklaerung wird nicht nur erzaehlt, sondern als Grundkette dargestellt.",
      answer: "logos",
      explanation: "Gruende, Pruefung und Nachvollziehbarkeit gehoeren zum Logos.",
    },
  ];

  const termLabels = {
    mythos: "Mythos",
    logos: "Logos",
    thales: "Thales",
    anaximander: "Anaximander",
    ekklesia: "Ekklesia",
  };

  const termPool = [
    {
      statement: "Traditionelle Erzaehlungen ueber Goetter und Helden",
      answer: "mythos",
      explanation: "Das ist der Kernbegriff von Mythos.",
    },
    {
      statement: "Begruendetes Denken und Suchen nach nachvollziehbaren Ursachen",
      answer: "logos",
      explanation: "Das beschreibt Logos.",
    },
    {
      statement: "Frueher griechischer Denker mit nicht-mythologischer Naturerklaerung",
      answer: "thales",
      explanation: "So wird Thales oft eingeordnet.",
    },
    {
      statement: "Denker, der eine einheitliche Naturerklaerung ausbauen wollte",
      answer: "anaximander",
      explanation: "Das passt zu Anaximander.",
    },
    {
      statement: "Politische Volksversammlung in Athen (anderes Thema)",
      answer: "ekklesia",
      explanation: "Begriff aus dem Demokratie-Modul, nicht aus Mythos/Logos.",
    },
    {
      statement: "Denkweg, der pruefbare Gruende statt Goettereingriffe sucht",
      answer: "logos",
      explanation: "Das ist nochmals Logos.",
    },
    {
      statement: "Denkweg, der Welt in Geschichten und Symbolen deutet",
      answer: "mythos",
      explanation: "Das ist nochmals Mythos.",
    },
  ];

  const reasoningPool = [
    {
      prompt: "Warum donnert es?",
      options: [
        "Weil erhitzte Luft nach einem Blitz schlagartig expandiert und Schallwellen bildet.",
        "Weil ein Gott in den Wolken mit einem Wagen faehrt.",
      ],
      answer: 0,
      explanation: "Die erste Aussage folgt dem Logos: beobachtbar, begruendbar, naturbezogen.",
    },
    {
      prompt: "Warum gab es im Fruehjahr gute Ernten?",
      options: [
        "Die Menschen berichteten, Demeter schenke Fruchtbarkeit.",
        "Das Klima war guenstig, und Aussaat plus Bodenfeuchte wirkten zusammen.",
      ],
      answer: 1,
      explanation: "Beide Denkwege sind historisch wichtig; hier ist die zweite Aussage die logoshafte Erklaerung.",
    },
    {
      prompt: "Wie verhaelt man sich bei einer neuen Frage ueber die Natur?",
      options: [
        "Man sucht Hinweise, beobachtet und prueft mehrere Gruende.",
        "Man beendet jede Frage sofort mit einer festen Geschichte.",
      ],
      answer: 0,
      explanation: "Der erste Weg zeigt die Haltung des Logos.",
    },
    {
      prompt: "Was passt zur Formulierung 'Mythos erzaehlt - Logos erklaert'?",
      options: [
        "Mythos und Logos sind Gegner, einer muss verschwinden.",
        "Mythos arbeitet mit Sinnbildern, Logos mit nachvollziehbaren Gruenden.",
      ],
      answer: 1,
      explanation: "Historisch gab es eher einen Uebergang mit Ueberlappungen, nicht nur ein Entweder-oder.",
    },
    {
      prompt: "Welche Aussage ist eher Logos?",
      options: [
        "Poseidon verursacht jedes Erdbeben mit dem Dreizack.",
        "Erdbeben entstehen durch ploetzliches Verrutschen an Gesteinsbruechen.",
      ],
      answer: 1,
      explanation: "Die zweite Aussage folgt der modernen naturwissenschaftlichen Ursache-Wirkung-Erklaerung.",
    },
  ];

  const quizPool = [
    {
      prompt: "Was ist ein Mythos?",
      options: [
        "Eine traditionelle symbolische Erzaehlung, oft mit religioesem Bezug",
        "Ein naturwissenschaftliches Messverfahren",
        "Eine Liste von Gesetzen",
        "Ein Tempelbauplan",
      ],
      correct: 0,
      explanation: "Mythen sind Erzaehlungen, die Weltdeutung vermitteln.",
    },
    {
      prompt: "Wofuer steht Logos im Unterricht hier am besten?",
      options: [
        "Begruendetes Denken mit Beobachtung und Gruenden",
        "Nur ein Name fuer Tempelfeste",
        "Eine Heldensage",
        "Eine Erntegottheit",
      ],
      correct: 0,
      explanation: "Logos meint nachvollziehbare Erklaerung statt reiner Erzaehlform.",
    },
    {
      prompt: "Welche Aussage passt zu Zeus im Mythos?",
      options: [
        "Er wird mit Blitz und Donner verbunden.",
        "Er ist ein Mathematiker in Milet.",
        "Er war ein Tempel in Athen.",
        "Er bezeichnet den Rat der 500.",
      ],
      correct: 0,
      explanation: "Zeus ist im Mythos der Gott, der mit Blitz/Donner verbunden ist.",
    },
    {
      prompt: "Was ist ein Merkmal von Logos?",
      options: [
        "Erklaerungen sollen nachvollziehbar und pruefbar sein.",
        "Nur Goetter greifen ein.",
        "Es gibt keine Fragen mehr.",
        "Beobachtung ist unwichtig.",
      ],
      correct: 0,
      explanation: "Pruefbarkeit und Begruendung sind Kernmerkmale.",
    },
    {
      prompt: "Warum sind Thales und andere Vorsokratiker wichtig?",
      options: [
        "Sie suchten fruehe Naturerklaerungen ohne reine Goettergeschichten.",
        "Sie erfanden den Olymp.",
        "Sie schrieben nur Heldengedichte.",
        "Sie schafften alle Mythen sofort ab.",
      ],
      correct: 0,
      explanation: "Sie stehen fuer den Ausbau rationaler Naturfragen.",
    },
    {
      prompt: "Welche Aussage ist historisch am treffendsten?",
      options: [
        "Mythos und Logos existierten zeitweise nebeneinander.",
        "Mit einem Tag verschwand jeder Mythos.",
        "Logos gab es erst im Mittelalter.",
        "Mythos war nur in Rom wichtig.",
      ],
      correct: 0,
      explanation: "Der Wandel war ein Prozess, kein Schalter.",
    },
    {
      prompt: "Was erklaert die moderne Naturwissenschaft zu Donner?",
      options: [
        "Schnell erhitzte Luft dehnt sich aus und erzeugt Schallwellen.",
        "Nur ein Gott spricht laut.",
        "Tempelsteine kollidieren in den Wolken.",
        "Donner hat keine Ursache.",
      ],
      correct: 0,
      explanation: "Das ist die logoshafte, naturbezogene Erklaerung.",
    },
    {
      prompt: "Welche Zuordnung passt?",
      options: [
        "Demeter - Ernte und Fruchtbarkeit",
        "Demeter - Gott des Meeres",
        "Poseidon - Gottin der Ernte",
        "Zeus - nur Unterweltsgott",
      ],
      correct: 0,
      explanation: "Demeter wird als Gottin von Ackerbau/Ernte gedeutet.",
    },
    {
      prompt: "Was ist der Hauptunterschied in einem Satz?",
      options: [
        "Mythos erzaehlt in Bildern, Logos sucht Gruende.",
        "Mythos und Logos bedeuten exakt dasselbe.",
        "Nur Mythos stellt Fragen.",
        "Nur Logos kennt Geschichten.",
      ],
      correct: 0,
      explanation: "Genau dieser Unterschied ist das Lernziel des Moduls.",
    },
    {
      prompt: "Warum ist das Thema heute noch wichtig?",
      options: [
        "Weil Begruenden und Pruefen Grundlage von Wissenschaft sind.",
        "Weil Fragen verboten wurden.",
        "Weil nur Mythen wahr sein duerfen.",
        "Weil Beobachtungen keine Rolle spielen.",
      ],
      correct: 0,
      explanation: "Der Logos-Weg praegt bis heute wissenschaftliches Denken.",
    },
    {
      prompt: "Welche Aussage ist KEIN Beispiel fuer Logos?",
      options: [
        "Ein Gott steuert jede Wolke direkt.",
        "Eine Ursache wird durch Beobachtung gesucht.",
        "Eine These wird kritisch geprueft.",
        "Man fragt nach nachvollziehbaren Gruenden.",
      ],
      correct: 0,
      explanation: "Goettereingriff als Erklaerung gehoert zum Mythos.",
    },
    {
      prompt: "Welche Person passt zum Ausbau rationaler Naturerklaerungen?",
      options: ["Anaximander", "Zeus", "Poseidon", "Demeter"],
      correct: 0,
      explanation: "Anaximander ist ein frueher Naturdenker der Vorsokratik.",
    },
  ];

  let classifyTasks = [];
  let termTasks = [];
  let reasoningTasks = [];

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

  function setFeedback(element, text, isGood) {
    element.textContent = text;
    element.classList.remove("is-good", "is-bad");
    element.classList.add(isGood ? "is-good" : "is-bad");
  }

  function setupTabs() {
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.dataset.tab;
        tabButtons.forEach((btn) => btn.classList.toggle("is-active", btn === button));
        tabPanels.forEach((panel) => panel.classList.toggle("is-active", panel.id === `tab-${target}`));
      });
    });
  }

  function renderStationButtons() {
    stationButtonsHost.replaceChildren();
    stations.forEach((station) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "lm-station-btn";
      button.dataset.stationId = station.id;
      button.innerHTML = `${station.label}<small>${station.kicker}</small>`;
      button.addEventListener("click", () => setStation(station.id));
      stationButtonsHost.append(button);
    });
  }

  function setStation(stationId) {
    const station = stations.find((entry) => entry.id === stationId);
    if (!station) {
      return;
    }

    stationImage.src = station.image;
    stationKicker.textContent = station.kicker;
    stationTitle.textContent = station.title;
    stationText.textContent = station.text;
    stationFact.textContent = station.fact;

    document.querySelectorAll(".lm-station-btn").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.stationId === stationId);
    });
  }

  function renderSelectTaskList(container, tasks, labels) {
    container.replaceChildren();
    tasks.forEach((task, index) => {
      const row = document.createElement("article");
      row.className = "lm-task-row";
      row.dataset.index = String(index);

      const prompt = document.createElement("p");
      prompt.textContent = task.statement;

      const select = document.createElement("select");
      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = "Bitte auswaehlen";
      select.append(placeholder);

      Object.entries(labels).forEach(([value, label]) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = label;
        select.append(option);
      });

      row.append(prompt, select);
      container.append(row);
    });
  }

  function evaluateSelectTaskList(container, tasks, feedbackElement) {
    let correct = 0;
    const tips = [];

    [...container.children].forEach((row) => {
      const task = tasks[Number(row.dataset.index)];
      const select = row.querySelector("select");
      const isCorrect = select.value === task.answer;
      row.classList.toggle("is-correct", isCorrect);
      row.classList.toggle("is-wrong", !isCorrect);

      if (isCorrect) {
        correct += 1;
      } else if (tips.length < 2) {
        tips.push(task.explanation);
      }
    });

    setFeedback(
      feedbackElement,
      `${correct} von ${tasks.length} richtig.${tips.length ? ` Tipp: ${tips.join(" ")}` : ""}`,
      correct === tasks.length
    );
  }

  function newClassifyRound() {
    classifyTasks = shuffle(classifyPool).slice(0, 6);
    classifyFeedback.classList.remove("is-good", "is-bad");
    classifyFeedback.textContent = "";
    renderSelectTaskList(classifyList, classifyTasks, classifyLabels);
  }

  function newTermsRound() {
    termTasks = shuffle(termPool).slice(0, 6);
    termsFeedback.classList.remove("is-good", "is-bad");
    termsFeedback.textContent = "";
    renderSelectTaskList(termsList, termTasks, termLabels);
  }

  function renderReasoningTasks() {
    reasoningTasks = shuffle(reasoningPool).slice(0, 3);
    reasoningFeedback.classList.remove("is-good", "is-bad");
    reasoningFeedback.textContent = "";
    reasoningList.replaceChildren();

    reasoningTasks.forEach((task, index) => {
      const row = document.createElement("article");
      row.className = "lm-choice-row";
      row.dataset.index = String(index);

      const prompt = document.createElement("p");
      prompt.textContent = task.prompt;

      const optionsWrap = document.createElement("div");
      optionsWrap.className = "lm-choice-options";

      task.options.forEach((optionText, optionIndex) => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `reasoning-${index}`;
        input.value = String(optionIndex);
        label.append(input, document.createTextNode(` ${optionText}`));
        optionsWrap.append(label);
      });

      row.append(prompt, optionsWrap);
      reasoningList.append(row);
    });
  }

  function evaluateReasoningTasks() {
    let correct = 0;
    const tips = [];

    [...reasoningList.children].forEach((row) => {
      const task = reasoningTasks[Number(row.dataset.index)];
      const checked = row.querySelector("input:checked");
      const selected = checked ? Number(checked.value) : -1;
      const isCorrect = selected === task.answer;

      row.classList.toggle("is-correct", isCorrect);
      row.classList.toggle("is-wrong", !isCorrect);

      if (isCorrect) {
        correct += 1;
      } else if (tips.length < 2) {
        tips.push(task.explanation);
      }
    });

    setFeedback(
      reasoningFeedback,
      `${correct} von ${reasoningTasks.length} richtig.${tips.length ? ` Hinweis: ${tips.join(" ")}` : ""}`,
      correct === reasoningTasks.length
    );
  }

  function prepareQuizItem(item) {
    const options = shuffle(item.options.map((text, index) => ({
      text,
      isCorrect: index === item.correct,
    })));

    return {
      prompt: item.prompt,
      options,
      explanation: item.explanation,
    };
  }

  function startQuiz() {
    quizState.running = true;
    quizState.answered = false;
    quizState.index = 0;
    quizState.correct = 0;
    quizState.questions = shuffle(quizPool).slice(0, 10).map(prepareQuizItem);
    quizNext.disabled = true;
    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const question = quizState.questions[quizState.index];
    quizState.answered = false;

    quizStatus.textContent = `Frage ${quizState.index + 1} von ${quizState.questions.length}`;
    quizPrompt.textContent = question.prompt;
    quizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
    quizAnswers.replaceChildren();
    quizFeedback.classList.remove("is-good", "is-bad");
    quizFeedback.textContent = "";
    quizNext.disabled = true;

    question.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = option.text;
      button.addEventListener("click", () => answerQuiz(button, option));
      quizAnswers.append(button);
    });
  }

  function answerQuiz(button, option) {
    if (!quizState.running || quizState.answered) {
      return;
    }

    quizState.answered = true;
    if (option.isCorrect) {
      quizState.correct += 1;
    }

    const question = quizState.questions[quizState.index];
    [...quizAnswers.children].forEach((choice) => {
      const match = question.options.find((entry) => entry.text === choice.textContent);
      choice.disabled = true;
      if (match && match.isCorrect) {
        choice.classList.add("is-correct");
      }
    });

    if (!option.isCorrect) {
      button.classList.add("is-wrong");
    }

    setFeedback(
      quizFeedback,
      option.isCorrect ? `Richtig. ${question.explanation}` : `Noch nicht. ${question.explanation}`,
      option.isCorrect
    );

    quizScore.textContent = `Punkte: ${quizState.correct} / ${quizState.questions.length}`;
    quizNext.disabled = false;
  }

  function nextQuizQuestion() {
    if (!quizState.running || !quizState.answered) {
      return;
    }

    quizState.index += 1;

    if (quizState.index >= quizState.questions.length) {
      quizState.running = false;
      quizStatus.textContent = "Test beendet.";
      quizPrompt.textContent = `Ergebnis: ${quizState.correct} von ${quizState.questions.length} Punkten.`;
      quizAnswers.replaceChildren();
      setFeedback(
        quizFeedback,
        quizState.correct >= 8
          ? "Sehr stark. Du kannst Mythos und Logos sicher unterscheiden und anwenden."
          : "Gute Grundlage. Wiederhole vor allem: Begriffe, Gewitterbeispiel und die Rolle frueher Denker.",
        quizState.correct >= 8
      );
      quizNext.disabled = true;
      return;
    }

    renderQuizQuestion();
  }

  setupTabs();
  renderStationButtons();
  setStation("mythos-def");

  newClassifyRound();
  newTermsRound();
  renderReasoningTasks();

  classifyNew.addEventListener("click", newClassifyRound);
  classifyCheck.addEventListener("click", () => evaluateSelectTaskList(classifyList, classifyTasks, classifyFeedback));

  termsNew.addEventListener("click", newTermsRound);
  termsCheck.addEventListener("click", () => evaluateSelectTaskList(termsList, termTasks, termsFeedback));

  reasoningNew.addEventListener("click", renderReasoningTasks);
  reasoningCheck.addEventListener("click", evaluateReasoningTasks);

  quizStart.addEventListener("click", startQuiz);
  quizNext.addEventListener("click", nextQuizQuestion);
})();
