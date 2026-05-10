(() => {
  const tabButtons = document.querySelectorAll('.og-tab-btn');
  const tabPanels = document.querySelectorAll('.og-tab');

  const stationButtonsHost = document.getElementById('ogStationButtons');
  const stationImage = document.getElementById('ogStationImage');
  const stationKicker = document.getElementById('ogStationKicker');
  const stationTitle = document.getElementById('ogStationTitle');
  const stationText = document.getElementById('ogStationText');
  const stationFact = document.getElementById('ogStationFact');

  const ritualButtons = document.querySelectorAll('.og-ritual-btn');
  const ritualInfo = document.getElementById('ogRitualInfo');

  const termList = document.getElementById('ogTermList');
  const termNew = document.getElementById('ogTermNew');
  const termCheck = document.getElementById('ogTermCheck');
  const termFeedback = document.getElementById('ogTermFeedback');

  const trueFalseList = document.getElementById('ogTrueFalseList');
  const trueFalseNew = document.getElementById('ogTrueFalseNew');
  const trueFalseCheck = document.getElementById('ogTrueFalseCheck');
  const trueFalseFeedback = document.getElementById('ogTrueFalseFeedback');

  const contextList = document.getElementById('ogContextList');
  const contextNew = document.getElementById('ogContextNew');
  const contextCheck = document.getElementById('ogContextCheck');
  const contextFeedback = document.getElementById('ogContextFeedback');

  const examStart = document.getElementById('ogExamStart');
  const examNew = document.getElementById('ogExamNew');
  const examCheck = document.getElementById('ogExamCheck');
  const examScore = document.getElementById('ogExamScore');
  const examFeedback = document.getElementById('ogExamFeedback');
  const examPartA = document.getElementById('ogExamPartA');
  const examPartB = document.getElementById('ogExamPartB');
  const examPartC = document.getElementById('ogExamPartC');

  const lightbox = document.getElementById('ogLightbox');
  const lightboxImage = document.getElementById('ogLightboxImage');
  const lightboxCaption = document.getElementById('ogLightboxCaption');
  const lightboxClose = document.getElementById('ogLightboxClose');

  const stations = [
    {
      id: 'basis',
      label: 'Station 1 - Was waren die Spiele?',
      kicker: 'Grundidee',
      image: 'slices/teil-1-was-waren-die-spiele.png',
      title: 'Die Spiele waren ein panhellenisches Sportfest.',
      text: 'Athleten aus vielen Poleis kamen nach Olympia. Der Wettkampf war wichtig, aber genauso das gemeinsame Feiern und Zusammenkommen.',
      fact: 'Faktencheck: Britannica beschreibt die antiken Spiele als panhellenisches Ereignis im Vierjahresrhythmus in Olympia.',
    },
    {
      id: 'zeus',
      label: 'Station 2 - Zu Ehren von Zeus',
      kicker: 'Religion',
      image: 'slices/teil-2-zu-ehren-von-zeus.png',
      title: 'Die Olympischen Spiele waren ein religioeses Fest.',
      text: 'Im Zentrum stand die Verehrung des Gottes Zeus. Opfer, Gebete und Prozessionen waren keine Nebensache, sondern Kern des Festes.',
      fact: 'Faktencheck: Quellen ordnen Olympia klar als Zeus-Heiligtum ein; Wettkaempfe waren Teil des Kultfestes.',
    },
    {
      id: 'heiligtum',
      label: 'Station 3 - Olympia als heiliger Ort',
      kicker: 'Ort',
      image: 'slices/teil-3-olympia-heiliger-ort.png',
      title: 'Olympia war ein Heiligtum, kein normaler Stadtstaat.',
      text: 'Menschen reisten zum Heiligtum mit Tempeln, Altaren und Stadion. Dort trafen sich Religion, Politik, Handel und Sport.',
      fact: 'Faktencheck: Das Heiligtum von Olympia lag im heiligen Bezirk (Altis) mit Zeus-Tempel und Kultanlagen.',
    },
    {
      id: 'mehralssport',
      label: 'Station 4 - Mehr als Wettkampf',
      kicker: 'Festkultur',
      image: 'slices/teil-4-ausser-dem-sport.png',
      title: 'Umzuege, Opfer und Musik gehoerten dazu.',
      text: 'Olympia war ein grosses Fest mit religioesen und kulturellen Teilen. Sport war sichtbar, aber eingebettet in Ritual und Gemeinschaft.',
      fact: 'Faktencheck: Die antiken Spiele umfassten Prozessionen, Opferhandlungen und weitere kultische Programmpunkte.',
    },
    {
      id: 'disziplinen',
      label: 'Station 5 - Welche Disziplinen?',
      kicker: 'Wettkaempfe',
      image: 'slices/teil-5-disziplinen.png',
      title: 'Es gab Lauf, Ringkampf, Wurf, Sprung und Wagenrennen.',
      text: 'Die Disziplinen veraenderten sich im Lauf der Zeit. Entscheidend war nicht Geldgewinn, sondern Ruhm, Anerkennung und Ehre.',
      fact: 'Faktencheck: Die Spielprogramme entwickelten sich ueber Jahrhunderte und enthielten Lauf-, Kampf- und Reitwettkaempfe.',
    },
    {
      id: 'teilnahme',
      label: 'Station 6 - Wer durfte teilnehmen?',
      kicker: 'Gesellschaft',
      image: 'slices/teil-6-wer-durfte-teilnehmen.png',
      title: 'Teilhabe war deutlich begrenzt.',
      text: 'Athleten waren in der Regel freie griechische Maenner. Das zeigt: Das Fest war verbindend, aber nicht fuer alle gleich offen.',
      fact: 'Faktencheck: Antike Quellen und Britannica verweisen auf klare Teilnahmegrenzen; Frauen traten nicht als Athletinnen bei den Maennerwettkaempfen an.',
    },
    {
      id: 'ehre',
      label: 'Station 7 - Sieg und Ehre',
      kicker: 'Werte',
      image: 'slices/teil-7-sieg-und-ehre.png',
      title: 'Der Preis war symbolisch, die Ehre war riesig.',
      text: 'Sieger erhielten einen Kranz, Ruhm und Anerkennung fuer sich und ihre Polis. Das passte zur griechischen Idee von Ehre und Ansehen.',
      fact: 'Faktencheck: Im Mittelpunkt standen Ehrenpreis und Ruhm, nicht ein Geldpreis wie bei modernen Profisportarten.',
    },
    {
      id: 'bedeutung',
      label: 'Station 8 - Warum wichtig?',
      kicker: 'Einordnung',
      image: 'slices/teil-8-warum-wichtig.png',
      title: 'Die Spiele verbanden Religion, Sport und griechische Identitaet.',
      text: 'Mit der Ekecheiria sollte sichere Anreise moeglich sein. Das schuf Begegnung zwischen Poleis, bedeutete aber keine dauerhafte Abschaffung von Kriegen.',
      fact: 'Faktencheck: Die olympische Waffenruhe diente vor allem dem Schutz von Reisenden und Heiligtum, nicht zwingend allgemeinem Dauerfrieden.',
    },
  ];

  const ritualDetails = {
    anreise: 'Anreise ins Heiligtum: Delegationen aus Poleis reisten nach Olympia. Schon der Weg war Teil des religioesen Ereignisses.',
    opfer: 'Opfer und Gebet: Zeus wurde mit Opferhandlungen geehrt. Dank und Bitte an die Goetter standen sichtbar im Mittelpunkt.',
    wettkampf: 'Wettkampf als Ehrung: Der sportliche Kampf galt als Leistung vor Menschen und Goettern zugleich.',
    sieg: 'Sieg und Dank: Sieger wurden gefeiert, aber der Festzusammenhang blieb religioes - mit Dank, Kult und gemeinsamer Erinnerung.',
  };

  const termLabels = {
    olympia: 'Olympia',
    altis: 'Altis',
    ekecheiria: 'Ekecheiria',
    panhellenisch: 'panhellenisch',
    zeus: 'Zeus',
    opfer: 'Opferhandlung',
    olivenkranz: 'Olivenkranz',
  };

  const termPool = [
    { statement: 'Name des Heiligtums, in dem die Spiele stattfanden', answer: 'olympia', explanation: 'Das war Olympia.' },
    { statement: 'Heiliger Bezirk innerhalb von Olympia', answer: 'altis', explanation: 'Dieser Bezirk hiess Altis.' },
    { statement: 'Waffenruhe fuer sichere Reise zu den Spielen', answer: 'ekecheiria', explanation: 'So nennt man die olympische Waffenruhe.' },
    { statement: 'Begriff fuer "alle Griechen betreffend"', answer: 'panhellenisch', explanation: 'Dieser Begriff lautet panhellenisch.' },
    { statement: 'Gott, zu dessen Ehren die Spiele stattfanden', answer: 'zeus', explanation: 'Die Spiele standen im Zeichen des Zeus.' },
    { statement: 'Religioese Handlung am Altar', answer: 'opfer', explanation: 'Das ist eine Opferhandlung.' },
    { statement: 'Typischer Siegerpreis ohne Geldwert', answer: 'olivenkranz', explanation: 'Der Sieger erhielt einen Olivenkranz.' },
    { statement: 'Wichtiges Kennzeichen: viele Poleis kamen zusammen', answer: 'panhellenisch', explanation: 'Das zeigt den panhellenischen Charakter.' },
    { statement: 'Rituelle Gabe fuer die Goetter im Heiligtum', answer: 'opfer', explanation: 'Das war eine Opferhandlung.' },
    { statement: 'Symbol fuer Ruhm statt Geldpreis', answer: 'olivenkranz', explanation: 'Der Kranz stand fuer Ehre.' },
  ];

  const trueFalseLabels = {
    richtig: 'richtig',
    falsch: 'falsch',
  };

  const trueFalsePool = [
    {
      statement: 'Die antiken Olympischen Spiele waren nur Sport ohne religioese Bedeutung.',
      answer: 'falsch',
      explanation: 'Sie waren ein religioeses Fest zu Ehren des Zeus.',
    },
    {
      statement: 'Olympia war ein Heiligtum mit Tempeln, Altaren und Stadion.',
      answer: 'richtig',
      explanation: 'Genau diese Verbindung macht Olympia aus.',
    },
    {
      statement: 'Die Ekecheiria bedeutete, dass fuer immer nie mehr Krieg war.',
      answer: 'falsch',
      explanation: 'Sie schuf vor allem sichere Wege und Schutz fuer das Fest.',
    },
    {
      statement: 'Athleten kamen aus unterschiedlichen griechischen Poleis.',
      answer: 'richtig',
      explanation: 'Das ist der panhellenische Aspekt.',
    },
    {
      statement: 'Ein Sieger erhielt vor allem einen hohen Geldpreis.',
      answer: 'falsch',
      explanation: 'Im Vordergrund standen Kranz, Ruhm und Ehre.',
    },
    {
      statement: 'Rituale wie Opfer und Prozessionen waren Teil der Spiele.',
      answer: 'richtig',
      explanation: 'Religion war ein Kernbestandteil.',
    },
    {
      statement: 'Teilhabe war fuer alle Gruppen gleich offen.',
      answer: 'falsch',
      explanation: 'Die Teilnahme war gesellschaftlich stark begrenzt.',
    },
    {
      statement: 'Olympia kann man als religioes-politischen Treffpunkt verstehen.',
      answer: 'richtig',
      explanation: 'Dort begegneten sich Poleis in einem heiligen Rahmen.',
    },
  ];

  const contextPool = [
    {
      prompt: 'Warum sind die Olympischen Spiele ein gutes Beispiel fuer die Verbindung von Religion und Politik?',
      options: [
        'Weil es nur sportliche Einzelkaempfe ohne Zuschauer gab.',
        'Weil Poleis im Heiligtum aufeinandertrafen und dabei kultische Rituale teilten.',
        'Weil Zeus dort keine Rolle spielte.',
        'Weil es keine Regeln gab.',
      ],
      answer: 1,
      explanation: 'Ritual, Begegnung und gemeinsame Regeln trafen in Olympia zusammen.',
    },
    {
      prompt: 'Welche Aussage zur Ekecheiria ist am treffendsten?',
      options: [
        'Sie garantierte ewigen Weltfrieden.',
        'Sie sollte sichere An- und Abreise rund um die Spiele sichern.',
        'Sie galt nur fuer Athleten aus einer Stadt.',
        'Sie war ein Geldpreis fuer Sieger.',
      ],
      answer: 1,
      explanation: 'Die Waffenruhe bezog sich vor allem auf den Schutz der Festteilnahme.',
    },
    {
      prompt: 'Was zeigt der Vergleich mit Pythischen, Isthmischen und Nemeischen Spielen?',
      options: [
        'Sportfeste waren im antiken Griechenland oft religioes gebunden.',
        'Nur Olympia hatte irgendeinen Gott.',
        'Alle Spiele hatten exakt dieselben Disziplinen und Regeln.',
        'Die anderen Spiele waren roemisch.',
      ],
      answer: 0,
      explanation: 'Panhellenische Spiele waren generell mit Heiligtuemern und Goetterverehrung verbunden.',
    },
    {
      prompt: 'Welche Deutung passt zur Sieger-Ehre?',
      options: [
        'Der Kranz war wertlos und niemand interessierte sich fuer Sieger.',
        'Ehre war sozial und politisch bedeutsam fuer Athlet und Polis.',
        'Nur Priester durften gewinnen.',
        'Sieg hatte nichts mit Religion zu tun.',
      ],
      answer: 1,
      explanation: 'Ruhm und Ansehen waren zentrale Werte in der Poliswelt.',
    },
    {
      prompt: 'Warum sollte man die Spiele nicht als "modernes Turnier" missverstehen?',
      options: [
        'Weil Wettkampf damals verboten war.',
        'Weil Sport nur ein Teil eines groesseren religioesen Festes war.',
        'Weil es in Olympia keine Zuschauer gab.',
        'Weil nur Kinder teilnehmen durften.',
      ],
      answer: 1,
      explanation: 'Der kultische Rahmen macht den entscheidenden Unterschied.',
    },
    {
      prompt: 'Welche Aussage beschreibt Teilnahmegrenzen sachlich?',
      options: [
        'Alle Bewohner des Mittelmeerraums traten gleichberechtigt an.',
        'Die Athletenrolle war im Wesentlichen auf freie griechische Maenner beschraenkt.',
        'Frauen waren Hauptgruppe im Stadionwettkampf.',
        'Sklaven stellten die meisten Sieger.',
      ],
      answer: 1,
      explanation: 'Das zeigt die soziale Begrenzung antiker Teilhabe.',
    },
  ];

  const sequencePool = [
    {
      prompt: 'Welche Reihenfolge passt am besten zum Festcharakter?',
      options: [
        'Anreise nach Olympia -> Ritual/Opfer -> Wettkaempfe -> Siegerehrung und Ruhm',
        'Siegerehrung -> Anreise -> Opfer abschaffen -> Heimreise',
        'Kriegserklaerung -> Wettkampfverbot -> Heimreise -> Tempelbau',
        'Nur Wettkampf -> keine Rituale -> keine Feier -> Ende',
      ],
      answer: 0,
      points: 3,
      explanation: 'Diese Kette verbindet Religion und Sport im richtigen Ablauf.',
    },
    {
      prompt: 'Welche Zusammenhangskette ist historisch am sinnvollsten?',
      options: [
        'Zeus-Heiligtum -> panhellenisches Fest -> Begegnung vieler Poleis -> Staerkung gemeinsamer griechischer Kultur',
        'Zeus-Heiligtum -> Abschaffung aller Poleis -> ein Koenigreich -> Ende der Spiele',
        'Olympia -> nur Handel -> keine Religion -> nur Geldpreise',
        'Waffenruhe -> ewiger Frieden -> keine Konflikte mehr -> kein Bedarf fuer Feste',
      ],
      answer: 0,
      points: 3,
      explanation: 'So laesst sich die gesellschaftliche Wirkung der Spiele plausibel erklaeren.',
    },
    {
      prompt: 'Welche Kette passt zur kritischen Einordnung der Ekecheiria?',
      options: [
        'Waffenruhe fuer Reisende -> sichere Teilnahme am Fest -> Begegnung moeglich -> Krieg nicht automatisch beendet',
        'Waffenruhe -> alle Armeen aufgeloest -> keine Politik mehr -> ewiger Frieden',
        'Waffenruhe -> alle durften Athlet werden -> soziale Gleichheit sofort',
        'Waffenruhe -> Olympia wurde Hauptstadt -> keine Heiligtuemer mehr',
      ],
      answer: 0,
      points: 3,
      explanation: 'Die Waffenruhe war wichtig, aber begrenzt in ihrer Wirkung.',
    },
  ];

  let termTasks = [];
  let trueFalseTasks = [];
  let contextTasks = [];

  const examState = {
    partA: [],
    partB: [],
    partC: [],
    maxPoints: 24,
    running: false,
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
    element.classList.remove('is-good', 'is-bad');
    element.classList.add(good ? 'is-good' : 'is-bad');
  }

  function clearFeedback(element) {
    element.textContent = '';
    element.classList.remove('is-good', 'is-bad');
  }

  function setupTabs() {
    tabButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.tab;
        tabButtons.forEach((btn) => btn.classList.toggle('is-active', btn === button));
        tabPanels.forEach((panel) => panel.classList.toggle('is-active', panel.id === `tab-${target}`));
      });
    });
  }

  function setupLightbox() {
    const zoomables = document.querySelectorAll('.og-zoomable');
    zoomables.forEach((img) => {
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', `Bild gross anzeigen: ${img.alt || 'Grafik'}`);
      img.addEventListener('click', () => openLightbox(img));
      img.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openLightbox(img);
        }
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !lightbox.hidden) {
        closeLightbox();
      }
    });
  }

  function openLightbox(image) {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || 'Grossansicht';
    lightboxCaption.textContent = image.alt || '';
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    lightboxCaption.textContent = '';
    document.body.style.overflow = '';
  }

  function renderStationButtons() {
    stationButtonsHost.replaceChildren();
    stations.forEach((station) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'og-station-btn';
      button.dataset.stationId = station.id;
      button.innerHTML = `${station.label}<small>${station.kicker}</small>`;
      button.addEventListener('click', () => setStation(station.id));
      stationButtonsHost.append(button);
    });
  }

  function setStation(id) {
    const station = stations.find((item) => item.id === id);
    if (!station) {
      return;
    }

    stationImage.src = station.image;
    stationImage.alt = station.title;
    stationKicker.textContent = station.kicker;
    stationTitle.textContent = station.title;
    stationText.textContent = station.text;
    stationFact.textContent = station.fact;

    document.querySelectorAll('.og-station-btn').forEach((button) => {
      button.classList.toggle('is-active', button.dataset.stationId === id);
    });
  }

  function setupRitualButtons() {
    function setRitual(id) {
      ritualInfo.textContent = ritualDetails[id];
      ritualButtons.forEach((button) => {
        button.classList.toggle('is-active', button.dataset.ritual === id);
      });
    }

    ritualButtons.forEach((button) => {
      button.addEventListener('click', () => setRitual(button.dataset.ritual));
    });

    setRitual('anreise');
  }

  function renderSelectTasks(container, tasks, labels) {
    container.replaceChildren();

    tasks.forEach((task, index) => {
      const row = document.createElement('article');
      row.className = 'og-task-row';
      row.dataset.index = String(index);

      const prompt = document.createElement('p');
      prompt.textContent = task.statement;

      const select = document.createElement('select');
      const empty = document.createElement('option');
      empty.value = '';
      empty.textContent = 'Bitte auswaehlen';
      select.append(empty);

      Object.entries(labels).forEach(([value, label]) => {
        const option = document.createElement('option');
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
      const select = row.querySelector('select');
      const isCorrect = select.value === String(task.answer);

      row.classList.toggle('is-correct', isCorrect);
      row.classList.toggle('is-wrong', !isCorrect);

      if (isCorrect) {
        correct += 1;
      } else if (tips.length < 2) {
        tips.push(task.explanation);
      }
    });

    setFeedback(
      feedbackElement,
      `${correct} von ${tasks.length} richtig.${tips.length ? ` Hinweis: ${tips.join(' ')}` : ''}`,
      correct === tasks.length
    );
  }

  function renderChoiceTasks(container, tasks, prefix) {
    container.replaceChildren();

    tasks.forEach((task, index) => {
      const row = document.createElement('article');
      row.className = 'og-choice-row';
      row.dataset.index = String(index);

      const prompt = document.createElement('p');
      prompt.textContent = task.prompt;

      const optionsWrap = document.createElement('div');
      optionsWrap.className = 'og-choice-options';

      task.options.forEach((optionText, optionIndex) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `${prefix}-${index}`;
        input.value = String(optionIndex);
        label.append(input, document.createTextNode(` ${optionText}`));
        optionsWrap.append(label);
      });

      row.append(prompt, optionsWrap);
      container.append(row);
    });
  }

  function evaluateChoiceTasks(container, tasks, feedbackElement) {
    let correct = 0;
    const tips = [];

    [...container.children].forEach((row) => {
      const task = tasks[Number(row.dataset.index)];
      const checked = row.querySelector('input:checked');
      const answer = checked ? Number(checked.value) : -1;
      const isCorrect = answer === task.answer;

      row.classList.toggle('is-correct', isCorrect);
      row.classList.toggle('is-wrong', !isCorrect);

      if (isCorrect) {
        correct += 1;
      } else if (tips.length < 2) {
        tips.push(task.explanation);
      }
    });

    setFeedback(
      feedbackElement,
      `${correct} von ${tasks.length} richtig.${tips.length ? ` Hinweis: ${tips.join(' ')}` : ''}`,
      correct === tasks.length
    );
  }

  function newTermRound() {
    termTasks = shuffle(termPool).slice(0, 7);
    clearFeedback(termFeedback);
    renderSelectTasks(termList, termTasks, termLabels);
  }

  function newTrueFalseRound() {
    trueFalseTasks = shuffle(trueFalsePool).slice(0, 6);
    clearFeedback(trueFalseFeedback);
    renderSelectTasks(trueFalseList, trueFalseTasks, trueFalseLabels);
  }

  function newContextRound() {
    contextTasks = shuffle(contextPool).slice(0, 3);
    clearFeedback(contextFeedback);
    renderChoiceTasks(contextList, contextTasks, 'context');
  }

  function buildExam() {
    examState.running = true;

    examState.partA = shuffle(termPool).slice(0, 8).map((item) => ({
      statement: item.statement,
      answer: item.answer,
      explanation: item.explanation,
      points: 1,
    }));

    examState.partB = shuffle(contextPool).slice(0, 5).map((item) => ({
      prompt: item.prompt,
      options: item.options,
      answer: item.answer,
      explanation: item.explanation,
      points: 2,
    }));

    examState.partC = shuffle(sequencePool).slice(0, 2);

    clearFeedback(examFeedback);
    examScore.textContent = `Punkte: 0 / ${examState.maxPoints}`;

    renderSelectTasks(examPartA, examState.partA, termLabels);
    renderChoiceTasks(examPartB, examState.partB, 'exam-b');
    renderChoiceTasks(examPartC, examState.partC, 'exam-c');
  }

  function evaluateExam() {
    if (!examState.running) {
      setFeedback(examFeedback, 'Bitte starte zuerst eine Uebungsarbeit.', false);
      return;
    }

    let points = 0;
    const hints = [];

    [...examPartA.children].forEach((row) => {
      const task = examState.partA[Number(row.dataset.index)];
      const select = row.querySelector('select');
      const isCorrect = select.value === task.answer;
      row.classList.toggle('is-correct', isCorrect);
      row.classList.toggle('is-wrong', !isCorrect);
      if (isCorrect) {
        points += task.points;
      } else if (hints.length < 2) {
        hints.push(task.explanation);
      }
    });

    [...examPartB.children].forEach((row) => {
      const task = examState.partB[Number(row.dataset.index)];
      const checked = row.querySelector('input:checked');
      const selected = checked ? Number(checked.value) : -1;
      const isCorrect = selected === task.answer;
      row.classList.toggle('is-correct', isCorrect);
      row.classList.toggle('is-wrong', !isCorrect);
      if (isCorrect) {
        points += task.points;
      } else if (hints.length < 4) {
        hints.push(task.explanation);
      }
    });

    [...examPartC.children].forEach((row) => {
      const task = examState.partC[Number(row.dataset.index)];
      const checked = row.querySelector('input:checked');
      const selected = checked ? Number(checked.value) : -1;
      const isCorrect = selected === task.answer;
      row.classList.toggle('is-correct', isCorrect);
      row.classList.toggle('is-wrong', !isCorrect);
      if (isCorrect) {
        points += task.points;
      } else if (hints.length < 5) {
        hints.push(task.explanation);
      }
    });

    const percent = Math.round((points / examState.maxPoints) * 100);
    let rating = '';

    if (percent >= 85) {
      rating = 'Sehr stark. Du kannst die religioesen und historischen Zusammenhaenge sicher erklaeren.';
    } else if (percent >= 70) {
      rating = 'Gute Leistung. Wiederhole vor allem Ekecheiria und Teilnahmegrenzen kurz.';
    } else if (percent >= 50) {
      rating = 'Solide Basis. Geh den Boxen-Explorer und die Ritual-Kette noch einmal durch.';
    } else {
      rating = 'Bitte wiederhole den Lernteil Schritt fuer Schritt und starte dann eine neue Variante.';
    }

    examScore.textContent = `Punkte: ${points} / ${examState.maxPoints}`;
    setFeedback(
      examFeedback,
      `Ergebnis: ${points}/${examState.maxPoints} Punkte (${percent}%). ${rating}${hints.length ? ` Hinweise: ${hints.join(' ')}` : ''}`,
      percent >= 70
    );
  }

  setupTabs();
  setupLightbox();
  renderStationButtons();
  setStation('basis');
  setupRitualButtons();

  newTermRound();
  newTrueFalseRound();
  newContextRound();
  buildExam();

  termNew.addEventListener('click', newTermRound);
  termCheck.addEventListener('click', () => evaluateSelectTasks(termList, termTasks, termFeedback));

  trueFalseNew.addEventListener('click', newTrueFalseRound);
  trueFalseCheck.addEventListener('click', () => evaluateSelectTasks(trueFalseList, trueFalseTasks, trueFalseFeedback));

  contextNew.addEventListener('click', newContextRound);
  contextCheck.addEventListener('click', () => evaluateChoiceTasks(contextList, contextTasks, contextFeedback));

  examStart.addEventListener('click', buildExam);
  examNew.addEventListener('click', buildExam);
  examCheck.addEventListener('click', evaluateExam);
})();
