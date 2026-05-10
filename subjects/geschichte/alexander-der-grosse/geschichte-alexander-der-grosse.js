(() => {
  const tabButtons = document.querySelectorAll(".ag-tab-btn");
  const tabPanels = document.querySelectorAll(".ag-tab");

  const stationButtonsHost = document.getElementById("agStationButtons");
  const stationImage = document.getElementById("agStationImage");
  const stationKicker = document.getElementById("agStationKicker");
  const stationTitle = document.getElementById("agStationTitle");
  const stationText = document.getElementById("agStationText");
  const stationFact = document.getElementById("agStationFact");

  const routeButtons = document.querySelectorAll(".ag-route-btn");
  const routeInfo = document.getElementById("agRouteInfo");

  const dateList = document.getElementById("agDateList");
  const dateNew = document.getElementById("agDateNew");
  const dateCheck = document.getElementById("agDateCheck");
  const dateFeedback = document.getElementById("agDateFeedback");

  const placeList = document.getElementById("agPlaceList");
  const placeNew = document.getElementById("agPlaceNew");
  const placeCheck = document.getElementById("agPlaceCheck");
  const placeFeedback = document.getElementById("agPlaceFeedback");

  const helList = document.getElementById("agHelList");
  const helNew = document.getElementById("agHelNew");
  const helCheck = document.getElementById("agHelCheck");
  const helFeedback = document.getElementById("agHelFeedback");

  const quizStart = document.getElementById("agQuizStart");
  const quizNext = document.getElementById("agQuizNext");
  const quizScore = document.getElementById("agQuizScore");
  const quizStatus = document.getElementById("agQuizStatus");
  const quizPrompt = document.getElementById("agQuizPrompt");
  const quizAnswers = document.getElementById("agQuizAnswers");
  const quizFeedback = document.getElementById("agQuizFeedback");

  const stations = [
    {
      id: "wer",
      label: "1 - Wer war Alexander?",
      image: "slices/teil-1-wer-war-alexander.png",
      kicker: "Person",
      title: "Alexander war Koenig von Makedonien.",
      text: "Er wurde 356 v. Chr. geboren und wurde 336 v. Chr. als junger Herrscher Koenig. Er regierte nur bis 323 v. Chr., praegte aber viele Regionen.",
      fact: "Faktencheck: Britannica nennt 356 v. Chr. (Geburt) und 336-323 v. Chr. als Regierungszeit.",
    },
    {
      id: "makedonien",
      label: "2 - Makedonien und Griechenland",
      image: "slices/teil-2-makedonien-griechenland.png",
      kicker: "Ausgangspunkt",
      title: "Von Makedonien aus begann die Expansion.",
      text: "Alexander uebernahm das militaerisch starke Reich seines Vaters Philipp II. und fuehrte den geplanten Feldzug gegen Persien fort.",
      fact: "Faktencheck: Der Asienzug startete im Fruehjahr 334 v. Chr.",
    },
    {
      id: "zug",
      label: "3 - Seine Eroberungszuege",
      image: "slices/teil-3-eroberungszuege.png",
      kicker: "Raum und Richtung",
      title: "Der Zug fuehrte von Griechenland ueber Persien bis nach Indien.",
      text: "Fruehe Siege wie am Granikos (334 v. Chr.) oeffneten den Weg nach Kleinasien. Spaeter folgten Persien, Aegypten und der Vorstoss bis Indien.",
      fact: "Faktencheck: Der Sieg am Granikos gilt als erster grosser Erfolg auf persischem Boden.",
    },
    {
      id: "heer",
      label: "4 - Warum war sein Heer erfolgreich?",
      image: "slices/teil-4-heer-erfolg.png",
      kicker: "Militaer",
      title: "Ausbildung, Taktik und Fuehrung spielten zusammen.",
      text: "Das Heer war gut organisiert und mobil. Gleichzeitig bedeuteten diese Siege fuer viele Regionen Krieg, Leid und Unterwerfung.",
      fact: "Faktencheck: Quellen zeigen, dass Alexanders Feldzuege militaerisch wirksam, aber keineswegs friedlich waren.",
    },
    {
      id: "stationen",
      label: "5 - Wichtige Stationen",
      image: "slices/teil-5-wichtige-stationen.png",
      kicker: "Etappen",
      title: "Aegypten, Persien und Indien waren Schluesselraeume.",
      text: "332 v. Chr. gruendete Alexander Alexandria in Aegypten. In Indien endete der Vormarsch, nachdem das Heer 326 v. Chr. nicht weiterziehen wollte.",
      fact: "Faktencheck: Nach Hydaspes (326 v. Chr.) meuterte das Heer und erzwang den Rueckweg.",
    },
    {
      id: "herrscher",
      label: "6 - Alexander als Herrscher",
      image: "slices/teil-6-alexander-als-herrscher.png",
      kicker: "Herrschaft",
      title: "Er verband viele Voelker in einem grossen Reich.",
      text: "Alexander uebernahm teils lokale Traditionen und setzte Vertraute als Statthalter ein. Trotzdem blieb seine Herrschaft in vielen Gebieten umstritten.",
      fact: "Faktencheck: Historische Darstellungen betonen gleichzeitig Integration und Zwang.",
    },
    {
      id: "hellenismus",
      label: "7 - Der Hellenismus",
      image: "slices/teil-7-hellenismus.png",
      kicker: "Folgen",
      title: "Im Hellenismus mischten sich griechische und andere Kulturen.",
      text: "Sprache, Wissen, Kunst und Handel verbreiteten sich in neuen Kontaktzonen. Es entstanden Nachfolgereiche mit gemischten Traditionen.",
      fact: "Faktencheck: Der Hellenismus beginnt mit Alexanders Tod 323 v. Chr. und ist eine Epoche kultureller Mischung.",
    },
    {
      id: "bedeutung",
      label: "8 - Warum ist er wichtig?",
      image: "slices/teil-8-warum-wichtig.png",
      kicker: "Einordnung",
      title: "Alexander war Ausloeser grosser Veraenderungen.",
      text: "Seine Feldzuege veraenderten Machtverhaeltnisse und schufen neue Kulturraeume. Nach seinem Tod zerfiel das Reich, aber die Folgen blieben.",
      fact: "Faktencheck: Nach 323 v. Chr. entstanden Seleukiden-, Ptolemaeer- und andere Nachfolgereiche.",
    },
  ];

  const routeDetails = {
    start: "Start in Makedonien: 336 v. Chr. wird Alexander Koenig. 334 v. Chr. beginnt er den grossen Feldzug nach Asien.",
    persien: "Gegen Persien: Nach Granikos (334) folgen weitere Siege. Bis 331 v. Chr. ist das Perserreich militaerisch entscheidend geschlagen.",
    aegypten: "Aegypten und Alexandria: 332 v. Chr. gruendet Alexander Alexandria. Die Stadt wird spaeter ein Zentrum hellenistischer Kultur.",
    indien: "Bis nach Indien: 326 v. Chr. gewinnt Alexander bei Hydaspes, doch sein Heer will nicht weiter ostwaerts ziehen und zwingt zur Umkehr.",
  };

  const dateLabels = {
    "356": "356 v. Chr.",
    "336": "336 v. Chr.",
    "334": "334 v. Chr.",
    "332": "332 v. Chr.",
    "326": "326 v. Chr.",
    "323": "323 v. Chr.",
  };

  const datePool = [
    {
      statement: "Alexander wird in Pella geboren.",
      answer: "356",
      explanation: "Geburtsjahr: 356 v. Chr.",
    },
    {
      statement: "Alexander wird mit 20 Jahren Koenig von Makedonien.",
      answer: "336",
      explanation: "Regierungsbeginn: 336 v. Chr.",
    },
    {
      statement: "Sieg am Granikos, erster grosser Erfolg gegen Persien.",
      answer: "334",
      explanation: "Granikos: 334 v. Chr.",
    },
    {
      statement: "Gruendung von Alexandria in Aegypten.",
      answer: "332",
      explanation: "Alexandria wurde 332 v. Chr. gegruendet.",
    },
    {
      statement: "Hydaspes in Indien; danach erzwungene Umkehr.",
      answer: "326",
      explanation: "Hydaspes und Meuterei: 326 v. Chr.",
    },
    {
      statement: "Tod in Babylon und Beginn der Nachfolgereiche.",
      answer: "323",
      explanation: "Tod Alexanders: 323 v. Chr.",
    },
    {
      statement: "Beginn der Epoche, die man Hellenismus nennt.",
      answer: "323",
      explanation: "Der Hellenismus beginnt mit Alexanders Tod 323 v. Chr.",
    },
  ];

  const placeLabels = {
    pella: "Pella",
    granikos: "Granikos",
    alexandria: "Alexandria",
    hydaspes: "Hydaspes",
    babylon: "Babylon",
    theben: "Theben",
  };

  const placePool = [
    {
      statement: "Geburtsort Alexanders",
      answer: "pella",
      explanation: "Alexander wurde in Pella geboren.",
    },
    {
      statement: "Erster grosser Sieg im Persienfeldzug (334 v. Chr.)",
      answer: "granikos",
      explanation: "Das war die Schlacht am Granikos.",
    },
    {
      statement: "Neu gegruendete Stadt in Aegypten",
      answer: "alexandria",
      explanation: "Das war Alexandria.",
    },
    {
      statement: "Letzte grosse Schlacht in Indien (326 v. Chr.)",
      answer: "hydaspes",
      explanation: "Das war Hydaspes.",
    },
    {
      statement: "Ort von Alexanders Tod (323 v. Chr.)",
      answer: "babylon",
      explanation: "Alexander starb in Babylon.",
    },
    {
      statement: "Stadt, die frueh in seiner Herrschaft zerstoert wurde",
      answer: "theben",
      explanation: "Das war Theben (335 v. Chr.).",
    },
    {
      statement: "Stadt, die zum spaeteren Zentrum hellenistischer Kultur wurde",
      answer: "alexandria",
      explanation: "Alexandria entwickelte sich zu einem grossen Kulturzentrum.",
    },
  ];

  const helLabels = {
    trifft: "trifft zu",
    nicht: "trifft nicht zu",
  };

  const helPool = [
    {
      statement: "Im Hellenismus mischten sich griechische und oestliche Elemente.",
      answer: "trifft",
      explanation: "Genau das ist ein Kernmerkmal der Epoche.",
    },
    {
      statement: "Der Hellenismus beginnt nach Alexanders Tod 323 v. Chr.",
      answer: "trifft",
      explanation: "So wird der Epochenbeginn meist gesetzt.",
    },
    {
      statement: "Nach Alexanders Tod blieb das Reich unveraendert zusammen.",
      answer: "nicht",
      explanation: "Nein, das Reich zerfiel in Nachfolgereiche.",
    },
    {
      statement: "Hellenismus bedeutet, dass nur Griechen Einfluss hatten.",
      answer: "nicht",
      explanation: "Nein, es ging gerade auch um Mischung mit anderen Kulturen.",
    },
    {
      statement: "Sprache, Handel und Wissen verbreiteten sich ueber grosse Raeume.",
      answer: "trifft",
      explanation: "Das ist eine wichtige Folge des Hellenismus.",
    },
    {
      statement: "Der Hellenismus hat mit Alexander nichts zu tun.",
      answer: "nicht",
      explanation: "Doch, Alexanders Feldzuege sind zentral fuer den Beginn.",
    },
    {
      statement: "Ptolemaeer in Aegypten gehoeren zu den Nachfolgereichen.",
      answer: "trifft",
      explanation: "Ja, die Ptolemaeer herrschten spaeter in Aegypten.",
    },
  ];

  const quizPool = [
    {
      prompt: "Wann wurde Alexander Koenig von Makedonien?",
      options: ["336 v. Chr.", "356 v. Chr.", "323 v. Chr.", "30 v. Chr."],
      correct: 0,
      explanation: "Alexander wurde 336 v. Chr. Koenig.",
    },
    {
      prompt: "Welche Aussage zu Granikos stimmt?",
      options: [
        "Es war 334 v. Chr. der erste grosse Sieg gegen Persien.",
        "Dort starb Alexander.",
        "Die Schlacht fand in Aegypten statt.",
        "Sie war sein letzter Kampf.",
      ],
      correct: 0,
      explanation: "Granikos war der fruehe Schluesselsieg auf dem Asienfeldzug.",
    },
    {
      prompt: "Warum ist Alexandria wichtig?",
      options: [
        "Die Stadt wurde 332 v. Chr. gegruendet und wurde spaeter ein Kulturzentrum.",
        "Dort begann die Perserherrschaft.",
        "Sie liegt in Indien.",
        "Sie war nur ein Militaerlager ohne Folgen.",
      ],
      correct: 0,
      explanation: "Alexandria wurde ein bedeutendes hellenistisches Zentrum.",
    },
    {
      prompt: "Was geschah nach der Schlacht am Hydaspes (326 v. Chr.)?",
      options: [
        "Das Heer meuterte spaeter und wollte nicht weiter ostwaerts.",
        "Alexander gab sofort den Thron ab.",
        "Das Reich wurde aufgeloest.",
        "Er kehrte direkt nach Pella zurueck.",
      ],
      correct: 0,
      explanation: "Das Heer zwang Alexander zur Umkehr.",
    },
    {
      prompt: "Welche Aussage beschreibt den Hellenismus am besten?",
      options: [
        "Mischung griechischer und anderer Kulturen in grossen Reichen",
        "Rueckkehr zu kleinen, abgeschotteten Poleis",
        "Verschwinden aller griechischen Einfluesse",
        "Nur eine Militaerreform ohne Kulturfolgen",
      ],
      correct: 0,
      explanation: "Kulturmischung ist das zentrale Merkmal.",
    },
    {
      prompt: "Wann starb Alexander?",
      options: ["323 v. Chr. in Babylon", "332 v. Chr. in Alexandria", "326 v. Chr. in Indien", "336 v. Chr. in Pella"],
      correct: 0,
      explanation: "Alexander starb 323 v. Chr. in Babylon.",
    },
    {
      prompt: "Welche kritische Einordnung ist passend?",
      options: [
        "Seine Eroberungen brachten Austausch, aber auch Gewalt und Zwang.",
        "Sein Reich war durchgehend friedlich.",
        "Es gab keinen Widerstand gegen seine Herrschaft.",
        "Nur seine Gegner fuehrten Krieg.",
      ],
      correct: 0,
      explanation: "Historisch muss man beide Seiten sehen: Folgen und Kosten.",
    },
    {
      prompt: "Was passierte mit dem Reich nach 323 v. Chr.?",
      options: [
        "Es zerfiel in Nachfolgereiche unter seinen Generaelen.",
        "Es blieb als ein Staat unter seinem Sohn bestehen.",
        "Es wurde sofort roemisch.",
        "Es schrumpfte nur auf Makedonien.",
      ],
      correct: 0,
      explanation: "Nach Alexanders Tod entstanden mehrere Nachfolgereiche.",
    },
    {
      prompt: "Warum war Theben im Thema wichtig?",
      options: [
        "Die Zerstoerung zeigt die harte Seite seiner Machtpolitik.",
        "Dort gruendete er Alexandria.",
        "Dort starb Philipp II.",
        "Dort endete der Hellenismus.",
      ],
      correct: 0,
      explanation: "Die Zerstoerung Thebens 335 v. Chr. ist ein klares Beispiel fuer Gewaltpolitik.",
    },
    {
      prompt: "Welche Reihenfolge ist richtig?",
      options: [
        "Koenig 336 -> Granikos 334 -> Hydaspes 326 -> Tod 323",
        "Hydaspes 326 -> Koenig 336 -> Tod 323 -> Granikos 334",
        "Granikos 334 -> Tod 323 -> Koenig 336 -> Hydaspes 326",
        "Tod 323 -> Koenig 336 -> Granikos 334 -> Hydaspes 326",
      ],
      correct: 0,
      explanation: "Die Reihenfolge folgt der Zeitleiste des Moduls.",
    },
    {
      prompt: "Welche Aussage zu seiner Bedeutung ist sinnvoll?",
      options: [
        "Er war Eroberer und Ausloeser grosser kultureller Veraenderungen.",
        "Er hatte kaum Folgen fuer die Geschichte.",
        "Er war nur ein lokaler Herrscher.",
        "Er spielte nur in Aegypten eine Rolle.",
      ],
      correct: 0,
      explanation: "So wird Alexander heute meist historisch eingeordnet.",
    },
    {
      prompt: "Welche Region gehoerte zum weitesten Zugziel?",
      options: ["Indien", "Spanien", "Britannien", "Skandinavien"],
      correct: 0,
      explanation: "Der Vormarsch reichte bis auf den indischen Subkontinent.",
    },
  ];

  let dateTasks = [];
  let placeTasks = [];
  let helTasks = [];

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

  function setFeedback(element, text, good) {
    element.textContent = text;
    element.classList.remove("is-good", "is-bad");
    element.classList.add(good ? "is-good" : "is-bad");
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
      button.className = "ag-station-btn";
      button.dataset.stationId = station.id;
      button.innerHTML = `${station.label}<small>${station.kicker}</small>`;
      button.addEventListener("click", () => setStation(station.id));
      stationButtonsHost.append(button);
    });
  }

  function setStation(stationId) {
    const station = stations.find((item) => item.id === stationId);
    if (!station) {
      return;
    }

    stationImage.src = station.image;
    stationKicker.textContent = station.kicker;
    stationTitle.textContent = station.title;
    stationText.textContent = station.text;
    stationFact.textContent = station.fact;

    document.querySelectorAll(".ag-station-btn").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.stationId === stationId);
    });
  }

  function setupRouteButtons() {
    function setRoute(routeId) {
      routeInfo.textContent = routeDetails[routeId];
      routeButtons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.route === routeId);
      });
    }

    routeButtons.forEach((button) => {
      button.addEventListener("click", () => setRoute(button.dataset.route));
    });

    setRoute("start");
  }

  function renderSelectTasks(container, tasks, labels) {
    container.replaceChildren();
    tasks.forEach((task, index) => {
      const row = document.createElement("article");
      row.className = "ag-task-row";
      row.dataset.index = String(index);

      const prompt = document.createElement("p");
      prompt.textContent = task.statement;

      const select = document.createElement("select");
      const empty = document.createElement("option");
      empty.value = "";
      empty.textContent = "Bitte auswaehlen";
      select.append(empty);

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

  function evaluateSelectTasks(container, tasks, feedbackElement) {
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

  function newDateRound() {
    dateTasks = shuffle(datePool).slice(0, 6);
    dateFeedback.classList.remove("is-good", "is-bad");
    dateFeedback.textContent = "";
    renderSelectTasks(dateList, dateTasks, dateLabels);
  }

  function newPlaceRound() {
    placeTasks = shuffle(placePool).slice(0, 6);
    placeFeedback.classList.remove("is-good", "is-bad");
    placeFeedback.textContent = "";
    renderSelectTasks(placeList, placeTasks, placeLabels);
  }

  function newHelRound() {
    helTasks = shuffle(helPool).slice(0, 6);
    helFeedback.classList.remove("is-good", "is-bad");
    helFeedback.textContent = "";
    renderSelectTasks(helList, helTasks, helLabels);
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
          ? "Sehr stark. Du kannst Alexander zeitlich einordnen und den Hellenismus erklaeren."
          : "Gute Basis. Wiederhole besonders die Zeitleiste 336-334-332-326-323 und die Folgen nach 323 v. Chr.",
        quizState.correct >= 8
      );
      quizNext.disabled = true;
      return;
    }

    renderQuizQuestion();
  }

  setupTabs();
  renderStationButtons();
  setStation("wer");
  setupRouteButtons();

  newDateRound();
  newPlaceRound();
  newHelRound();

  dateNew.addEventListener("click", newDateRound);
  dateCheck.addEventListener("click", () => evaluateSelectTasks(dateList, dateTasks, dateFeedback));

  placeNew.addEventListener("click", newPlaceRound);
  placeCheck.addEventListener("click", () => evaluateSelectTasks(placeList, placeTasks, placeFeedback));

  helNew.addEventListener("click", newHelRound);
  helCheck.addEventListener("click", () => evaluateSelectTasks(helList, helTasks, helFeedback));

  quizStart.addEventListener("click", startQuiz);
  quizNext.addEventListener("click", nextQuizQuestion);
})();
