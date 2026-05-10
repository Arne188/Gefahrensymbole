(() => {
  const tabButtons = document.querySelectorAll(".dm-tab-btn");
  const tabPanels = document.querySelectorAll(".dm-tab");

  const boxButtonHost = document.getElementById("dmBoxButtons");
  const boxImage = document.getElementById("dmBoxImage");
  const boxKicker = document.getElementById("dmBoxKicker");
  const boxTitle = document.getElementById("dmBoxTitle");
  const boxSummary = document.getElementById("dmBoxSummary");
  const boxFact = document.getElementById("dmBoxFact");

  const placeButtons = document.querySelectorAll(".dm-place-btn");
  const placeInfo = document.getElementById("dmPlaceInfo");

  const timelineList = document.getElementById("dmTimelineTasks");
  const timelineNew = document.getElementById("dmTimelineNew");
  const timelineCheck = document.getElementById("dmTimelineCheck");
  const timelineFeedback = document.getElementById("dmTimelineFeedback");

  const rightsList = document.getElementById("dmRightsTasks");
  const rightsNew = document.getElementById("dmRightsNew");
  const rightsCheck = document.getElementById("dmRightsCheck");
  const rightsFeedback = document.getElementById("dmRightsFeedback");

  const institutionList = document.getElementById("dmInstitutionTasks");
  const institutionNew = document.getElementById("dmInstitutionNew");
  const institutionCheck = document.getElementById("dmInstitutionCheck");
  const institutionFeedback = document.getElementById("dmInstitutionFeedback");

  const quizStart = document.getElementById("dmQuizStart");
  const quizNext = document.getElementById("dmQuizNext");
  const quizScore = document.getElementById("dmQuizScore");
  const quizStatus = document.getElementById("dmQuizStatus");
  const quizPrompt = document.getElementById("dmQuizPrompt");
  const quizAnswers = document.getElementById("dmQuizAnswers");
  const quizFeedback = document.getElementById("dmQuizFeedback");

  const boxSteps = [
    {
      id: "begriff",
      label: "1 - Was ist Demokratie?",
      date: "Grundbegriff",
      image: "slices/teil-1-demokratie-begriff.png",
      title: "Demokratie heisst: Entscheidung durch Buerger",
      summary: "In Athen entwickelte sich die Idee, dass nicht nur wenige Adlige regieren, sondern dass Buerger gemeinsam ueber wichtige Fragen abstimmen.",
      fact: "Faktencheck: In Athen meinte 'Buerger' nicht alle Einwohner, sondern freie maennliche Athener.",
    },
    {
      id: "vorher",
      label: "2 - Vorher: Wer hatte Macht?",
      date: "vor 594 v. Chr.",
      image: "slices/teil-2-vorher-macht.png",
      title: "Vor den Reformen dominierten Koenige und Adlige",
      summary: "Viele Menschen hatten wenig politischen Einfluss. Das fuehrte zu Spannungen zwischen reichen Familien und verarmten Bauern.",
      fact: "Faktencheck: Laut Quellen entstand die Demokratie in mehreren Reformschritten, nicht durch ein einzelnes Ereignis.",
    },
    {
      id: "probleme",
      label: "3 - Probleme in Athen",
      date: "7./6. Jh. v. Chr.",
      image: "slices/teil-3-probleme-athen.png",
      title: "Schulden und soziale Ungleichheit brachten Athen in eine Krise",
      summary: "Arme Bauern konnten bei Missernten in Schulden geraten. Konflikte zwischen Arm und Reich setzten die Polis unter Druck.",
      fact: "Faktencheck: Solche sozialen Konflikte gelten als ein Hauptgrund fuer Reformen durch Solon (594 v. Chr.).",
    },
    {
      id: "solon",
      label: "4 - Solon veraendert vieles",
      date: "594 v. Chr.",
      image: "slices/teil-4-solon.png",
      title: "Solon loeste akute Not und lockerte die Adelsherrschaft",
      summary: "Er liess Schulden streichen, beendete Schuldknechtschaft und ordnete Beteiligung nach Vermoegensklassen statt nur nach Herkunft.",
      fact: "Faktencheck: Solons Reformen waren ein grosser Schritt, aber noch keine volle Demokratie.",
    },
    {
      id: "kleisthenes",
      label: "5 - Kleisthenes staerkt die Demokratie",
      date: "508/507 v. Chr.",
      image: "slices/teil-5-kleisthenes.png",
      title: "Kleisthenes ordnete Athen neu",
      summary: "Mit neuen Phylen und dem Rat der 500 wurde die politische Beteiligung breiter organisiert. Viele Entscheidungen liefen ueber neue Strukturen.",
      fact: "Faktencheck: Der Rat der 500 bereitete Beschluesse fuer die Volksversammlung vor.",
    },
    {
      id: "funktion",
      label: "6 - So funktionierte die Demokratie",
      date: "5. Jh. v. Chr.",
      image: "slices/teil-6-so-funktionierte-demokratie.png",
      title: "Die Volksversammlung entschied direkt",
      summary: "In der Ekklesia konnten berechtigte Buerger reden und abstimmen. Gesetze, Krieg/Frieden und Aemter waren oeffentliche Themen.",
      fact: "Faktencheck: Frauen, Sklaven und Fremde (Metoeken) blieben politisch ausgeschlossen.",
    },
  ];

  const placeDetails = {
    agora: "Agora: Markt- und Treffpunkt. Hier wurden Nachrichten ausgetauscht, politische Diskussionen gefuehrt und Alltag sichtbar.",
    pnyx: "Pnyx: Ort der Volksversammlung (Ekklesia). Dort stimmten Buerger per Handzeichen ueber wichtige Fragen ab.",
    bouleuterion: "Bouleuterion: Sitz des Rates der 500 (Boule). Dieser Rat bereitete die Tagesordnung fuer die Volksversammlung vor.",
    akropolis: "Akropolis: Religioeses und symbolisches Zentrum Athens. Sie war kein Abstimmungsort, aber ein wichtiger Teil der Polis-Identitaet.",
  };

  const timelineOptions = [
    "ca. 621 v. Chr.",
    "594 v. Chr.",
    "508/507 v. Chr.",
    "462 v. Chr.",
    "5. Jh. v. Chr.",
  ];

  const timelinePool = [
    {
      statement: "Drakon liess Gesetze schriftlich festhalten; sie galten als sehr streng.",
      answer: "ca. 621 v. Chr.",
      explanation: "Drakon wird etwa auf 621 v. Chr. datiert.",
    },
    {
      statement: "Solon schaffte Schuldknechtschaft ab und erliess Schulden.",
      answer: "594 v. Chr.",
      explanation: "Solons zentrale Reformen datieren auf 594 v. Chr.",
    },
    {
      statement: "Kleisthenes ordnete Athen neu und staerkte den Rat der 500.",
      answer: "508/507 v. Chr.",
      explanation: "Diese Reformen setzten um 508/507 v. Chr. ein.",
    },
    {
      statement: "Ephialtes schwachte den Areopag und verlagerte Macht auf Volksorgane.",
      answer: "462 v. Chr.",
      explanation: "Die entscheidende Reformphase wird auf 462 v. Chr. datiert.",
    },
    {
      statement: "Perikles fuehrte Tagegelder ein, um Teilnahme fuer Aermere zu erleichtern.",
      answer: "5. Jh. v. Chr.",
      explanation: "Diese Entwicklung gehoert in das 5. Jahrhundert v. Chr.",
    },
    {
      statement: "Die Polis durchlief mehrere Reformschritte, statt sofort voll demokratisch zu sein.",
      answer: "5. Jh. v. Chr.",
      explanation: "Der Ausbau war ein Prozess vom 7. bis ins 5. Jahrhundert v. Chr.",
    },
  ];

  const rightsOptions = ["Mitbestimmen", "Ausgeschlossen"];
  const rightsPool = [
    {
      statement: "Freie maennliche Athener",
      answer: "Mitbestimmen",
      explanation: "Sie bildeten den politischen Buergerkoerper.",
    },
    {
      statement: "Frauen",
      answer: "Ausgeschlossen",
      explanation: "Frauen waren politisch nicht teilnahmeberechtigt.",
    },
    {
      statement: "Sklaven",
      answer: "Ausgeschlossen",
      explanation: "Sklaven hatten keine politischen Rechte.",
    },
    {
      statement: "Metoeken (Fremde ohne Buergerrecht)",
      answer: "Ausgeschlossen",
      explanation: "Metoeken lebten in Athen, konnten aber nicht abstimmen.",
    },
    {
      statement: "Athenischer Buerger, mindestens 18 Jahre alt",
      answer: "Mitbestimmen",
      explanation: "In der Ekklesia konnten maennliche Buerger ab 18 teilnehmen.",
    },
    {
      statement: "Personen ohne Buergerstatus",
      answer: "Ausgeschlossen",
      explanation: "Demokratie in Athen war an den Buergerstatus gebunden.",
    },
  ];

  const institutionOptions = ["Ekklesia", "Rat der 500", "Pnyx", "Areopag", "Bouleuterion"];
  const institutionPool = [
    {
      statement: "Versammlung der stimmberechtigten Buerger mit Abstimmungen per Handzeichen",
      answer: "Ekklesia",
      explanation: "Die Volksversammlung hiess Ekklesia.",
    },
    {
      statement: "Beratungsgremium, das Beschluesse fuer die Volksversammlung vorbereitete",
      answer: "Rat der 500",
      explanation: "Diese Aufgabe hatte die Boule, der Rat der 500.",
    },
    {
      statement: "Huegel in Athen, an dem sich die Volksversammlung traf",
      answer: "Pnyx",
      explanation: "Die Ekklesia tagte auf der Pnyx.",
    },
    {
      statement: "Traditioneller Adelsrat, dessen Macht 462 v. Chr. geschwaecht wurde",
      answer: "Areopag",
      explanation: "Das war der Areopag.",
    },
    {
      statement: "Gebaeude, in dem der Rat tagte",
      answer: "Bouleuterion",
      explanation: "Der Rat der 500 tagte im Bouleuterion.",
    },
    {
      statement: "Ort der politischen Vorberatung in Athen",
      answer: "Rat der 500",
      explanation: "Die Tagesordnung fuer Abstimmungen wurde dort vorbereitet.",
    },
  ];

  const quizPool = [
    {
      prompt: "Was trifft die Entwicklung in Athen am besten?",
      options: [
        "Demokratie entstand schrittweise durch Reformen.",
        "Demokratie wurde an einem einzigen Tag erfunden.",
        "Athen blieb immer Adelsherrschaft.",
        "Nur Koenige entschieden bis 322 v. Chr.",
      ],
      correct: 0,
      explanation: "Historiker beschreiben einen laengeren Reformprozess.",
    },
    {
      prompt: "Welche Reform gehoert zu Solon (594 v. Chr.)?",
      options: [
        "Abschaffung der Schuldknechtschaft",
        "Einfuehrung der 10 Phylen",
        "Bau der Pnyx",
        "Perserkriege",
      ],
      correct: 0,
      explanation: "Solon erliess Schulden und beendete Schuldknechtschaft.",
    },
    {
      prompt: "Wofuer ist Kleisthenes besonders wichtig?",
      options: [
        "Neuordnung in 10 Phylen und Staerkung des Rates der 500",
        "Gruendung Spartas",
        "Abschaffung aller Gerichte",
        "Einfuehrung der Monarchie",
      ],
      correct: 0,
      explanation: "Diese Reformen gelten als Grundlage der athenischen Demokratie.",
    },
    {
      prompt: "Welche Aussage zur Ekklesia ist richtig?",
      options: [
        "Sie war die Volksversammlung der Buerger.",
        "Sie war ein Tempel auf der Akropolis.",
        "Sie war ein Hafen im Piraios.",
        "Sie war nur fuer Adlige geoeffnet.",
      ],
      correct: 0,
      explanation: "In der Ekklesia wurde ueber zentrale Politik abgestimmt.",
    },
    {
      prompt: "Welche Gruppe war politisch ausgeschlossen?",
      options: ["Frauen", "Freie maennliche Buerger", "Athenische Ratsmitglieder", "Strategen"],
      correct: 0,
      explanation: "Frauen hatten in Athen keine politischen Stimmrechte.",
    },
    {
      prompt: "Was war die Aufgabe des Rates der 500?",
      options: [
        "Beschluesse fuer die Volksversammlung vorbereiten",
        "Den Parthenon bauen",
        "Die Perserkriege alleine fuehren",
        "Alle Richter ersetzen",
      ],
      correct: 0,
      explanation: "Die Boule bereitete politische Entscheidungen vor.",
    },
    {
      prompt: "Warum gilt 462 v. Chr. als wichtig?",
      options: [
        "Ephialtes schwaechte den Areopag.",
        "Solon trat erstmals auf.",
        "Kleisthenes wurde geboren.",
        "Athen verlor die Akropolis.",
      ],
      correct: 0,
      explanation: "Die Areopag-Reform verlagerte Macht zu Volksorganen.",
    },
    {
      prompt: "Wo tagte die Volksversammlung?",
      options: ["Auf der Pnyx", "Im Bouleuterion", "Auf der Agora", "Im Piraios"],
      correct: 0,
      explanation: "Die Pnyx war der bekannte Versammlungsort.",
    },
    {
      prompt: "Was bedeutet eine kritische Sicht auf die athenische Demokratie?",
      options: [
        "Sie war fortschrittlich, aber nicht fuer alle Menschen offen.",
        "Sie war modern wie heute mit allgemeinem Wahlrecht.",
        "Sie kann nicht historisch untersucht werden.",
        "Sie kannte keine sozialen Unterschiede.",
      ],
      correct: 0,
      explanation: "Politische Rechte waren auf einen Teil der Bevoelkerung begrenzt.",
    },
    {
      prompt: "Welche Aussage passt zur Agora?",
      options: [
        "Markt- und Treffpunkt mit politischem Austausch",
        "Nur militaerischer Uebungsplatz",
        "Ausschliesslich Wohnviertel der Reichen",
        "Sitz der persischen Verwaltung",
      ],
      correct: 0,
      explanation: "Die Agora verband Alltag, Handel und Kommunikation.",
    },
    {
      prompt: "Was war eine Folge von Solons Reformen?",
      options: [
        "Die Macht des Adels wurde begrenzt.",
        "Alle Menschen wurden sofort gleichberechtigt.",
        "Der Rat der 500 wurde aufgeloest.",
        "Die Volksversammlung wurde verboten.",
      ],
      correct: 0,
      explanation: "Solon begrenzte alte Privilegien, schuf aber noch keine volle Gleichheit.",
    },
    {
      prompt: "Warum waren Diaeten unter Perikles wichtig?",
      options: [
        "Auch aermere Buerger konnten eher an Politik teilnehmen.",
        "Sie machten nur den Adel reicher.",
        "Sie ersetzten alle Gesetze.",
        "Sie waren Tempelopfer.",
      ],
      correct: 0,
      explanation: "Tagegelder sollten Verdienstausfall ausgleichen.",
    },
  ];

  let timelineTasks = [];
  let rightsTasks = [];
  let institutionTasks = [];

  const quizState = {
    running: false,
    answered: false,
    index: 0,
    correct: 0,
    questions: [],
  };

  function shuffle(list) {
    const copy = [...list];
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
        const tab = button.dataset.tab;
        tabButtons.forEach((btn) => btn.classList.toggle("is-active", btn === button));
        tabPanels.forEach((panel) => panel.classList.toggle("is-active", panel.id === `tab-${tab}`));
      });
    });
  }

  function renderBoxButtons() {
    boxButtonHost.replaceChildren();
    boxSteps.forEach((step) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "dm-box-btn";
      button.dataset.stepId = step.id;
      button.innerHTML = `${step.label}<small>${step.date}</small>`;
      button.addEventListener("click", () => setActiveBox(step.id));
      boxButtonHost.append(button);
    });
  }

  function setActiveBox(stepId) {
    const step = boxSteps.find((entry) => entry.id === stepId);
    if (!step) {
      return;
    }
    boxImage.src = step.image;
    boxKicker.textContent = step.date;
    boxTitle.textContent = step.title;
    boxSummary.textContent = step.summary;
    boxFact.textContent = step.fact;
    document.querySelectorAll(".dm-box-btn").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.stepId === stepId);
    });
  }

  function setupPlaces() {
    function setPlace(placeId) {
      placeInfo.textContent = placeDetails[placeId];
      placeButtons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.place === placeId);
      });
    }

    placeButtons.forEach((button) => {
      button.addEventListener("click", () => setPlace(button.dataset.place));
    });

    setPlace("agora");
  }

  function renderSelectTasks(container, tasks, options) {
    container.replaceChildren();

    tasks.forEach((task, index) => {
      const row = document.createElement("article");
      row.className = "dm-task-row";
      row.dataset.index = String(index);

      const prompt = document.createElement("p");
      prompt.textContent = task.statement;

      const select = document.createElement("select");
      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = "Bitte auswaehlen";
      select.append(placeholder);

      options.forEach((optionText) => {
        const option = document.createElement("option");
        option.value = optionText;
        option.textContent = optionText;
        select.append(option);
      });

      row.append(prompt, select);
      container.append(row);
    });
  }

  function evaluateSelectTasks(container, tasks, feedback) {
    let correct = 0;
    const hints = [];

    [...container.children].forEach((row) => {
      const task = tasks[Number(row.dataset.index)];
      const select = row.querySelector("select");
      const isCorrect = select.value === task.answer;

      row.classList.toggle("is-correct", isCorrect);
      row.classList.toggle("is-wrong", !isCorrect);

      if (isCorrect) {
        correct += 1;
      } else if (hints.length < 2) {
        hints.push(task.explanation);
      }
    });

    const allCorrect = correct === tasks.length;
    const hintText = hints.length > 0 ? ` Tipp: ${hints.join(" ")}` : "";
    setFeedback(feedback, `${correct} von ${tasks.length} richtig.${hintText}`, allCorrect);
  }

  function newTimelineRound() {
    timelineTasks = shuffle(timelinePool).slice(0, 5);
    timelineFeedback.classList.remove("is-good", "is-bad");
    timelineFeedback.textContent = "";
    renderSelectTasks(timelineList, timelineTasks, timelineOptions);
  }

  function newRightsRound() {
    rightsTasks = shuffle(rightsPool).slice(0, 5);
    rightsFeedback.classList.remove("is-good", "is-bad");
    rightsFeedback.textContent = "";
    renderSelectTasks(rightsList, rightsTasks, rightsOptions);
  }

  function newInstitutionRound() {
    institutionTasks = shuffle(institutionPool).slice(0, 5);
    institutionFeedback.classList.remove("is-good", "is-bad");
    institutionFeedback.textContent = "";
    renderSelectTasks(institutionList, institutionTasks, institutionOptions);
  }

  function prepareQuizItem(item) {
    const options = shuffle(
      item.options.map((text, index) => ({ text, isCorrect: index === item.correct }))
    );
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
          ? "Sehr stark. Du kannst Entstehung, Institutionen und Grenzen der athenischen Demokratie sicher erklaeren."
          : "Gute Basis. Wiederhole besonders Daten (594, 508/507, 462 v. Chr.) und den Unterschied zwischen Fortschritt und Ausschluss.",
        quizState.correct >= 8
      );
      quizNext.disabled = true;
      return;
    }

    renderQuizQuestion();
  }

  setupTabs();
  renderBoxButtons();
  setActiveBox("begriff");
  setupPlaces();

  newTimelineRound();
  newRightsRound();
  newInstitutionRound();

  timelineNew.addEventListener("click", newTimelineRound);
  timelineCheck.addEventListener("click", () => evaluateSelectTasks(timelineList, timelineTasks, timelineFeedback));

  rightsNew.addEventListener("click", newRightsRound);
  rightsCheck.addEventListener("click", () => evaluateSelectTasks(rightsList, rightsTasks, rightsFeedback));

  institutionNew.addEventListener("click", newInstitutionRound);
  institutionCheck.addEventListener("click", () => evaluateSelectTasks(institutionList, institutionTasks, institutionFeedback));

  quizStart.addEventListener("click", startQuiz);
  quizNext.addEventListener("click", nextQuizQuestion);
})();
