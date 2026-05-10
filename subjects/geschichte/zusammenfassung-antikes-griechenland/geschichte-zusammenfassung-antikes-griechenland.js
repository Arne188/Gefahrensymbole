(() => {
  const tabButtons = document.querySelectorAll('.zg-tab-btn');
  const tabPanels = document.querySelectorAll('.zg-tab');

  const stationButtonsHost = document.getElementById('zgStationButtons');
  const stationImage = document.getElementById('zgStationImage');
  const stationKicker = document.getElementById('zgStationKicker');
  const stationTitle = document.getElementById('zgStationTitle');
  const stationText = document.getElementById('zgStationText');
  const stationFact = document.getElementById('zgStationFact');

  const termList = document.getElementById('zgTermList');
  const termNew = document.getElementById('zgTermNew');
  const termCheck = document.getElementById('zgTermCheck');
  const termFeedback = document.getElementById('zgTermFeedback');

  const causeList = document.getElementById('zgCauseList');
  const causeNew = document.getElementById('zgCauseNew');
  const causeCheck = document.getElementById('zgCauseCheck');
  const causeFeedback = document.getElementById('zgCauseFeedback');

  const trueFalseList = document.getElementById('zgTrueFalseList');
  const trueFalseNew = document.getElementById('zgTrueFalseNew');
  const trueFalseCheck = document.getElementById('zgTrueFalseCheck');
  const trueFalseFeedback = document.getElementById('zgTrueFalseFeedback');

  const transferList = document.getElementById('zgTransferList');
  const transferNew = document.getElementById('zgTransferNew');
  const transferCheck = document.getElementById('zgTransferCheck');
  const transferFeedback = document.getElementById('zgTransferFeedback');

  const examStart = document.getElementById('zgExamStart');
  const examNew = document.getElementById('zgExamNew');
  const examCheck = document.getElementById('zgExamCheck');
  const examScore = document.getElementById('zgExamScore');
  const examFeedback = document.getElementById('zgExamFeedback');
  const examPartA = document.getElementById('zgExamPartA');
  const examPartB = document.getElementById('zgExamPartB');
  const examPartC = document.getElementById('zgExamPartC');
  const lightbox = document.getElementById('zgLightbox');
  const lightboxImage = document.getElementById('zgLightboxImage');
  const lightboxCaption = document.getElementById('zgLightboxCaption');
  const lightboxClose = document.getElementById('zgLightboxClose');

  const stations = [
    {
      id: 'hellenen',
      label: 'Baustein 1 - Hellenen',
      kicker: 'Begriff',
      image: 'slices/01-hellenen.png',
      title: 'Die Griechen nannten sich oft Hellenen.',
      text: 'Obwohl sie in vielen Poleis lebten, sahen sie sich als kulturell verwandt: durch Sprache, Goetterkult, Feste und Mythen.',
      fact: 'Faktencheck: Britannica beschreibt die Griechen als Kulturraum mit gemeinsamer Sprache und Religion, nicht als einheitlichen Staat.',
    },
    {
      id: 'polis',
      label: 'Baustein 2 - Polis',
      kicker: 'Politik',
      image: 'slices/12-polis-stadt-und-umland.png',
      title: 'Die Polis war die Grundform des politischen Lebens.',
      text: 'Zu einer Polis gehoerten Stadt und Umland. Jede Polis regelte viele Fragen selbst und war deshalb in vielem unabhaengig.',
      fact: 'Faktencheck: Laut Britannica war die Polis ein Stadtstaat mit Stadtkern, Umland und eigenen Institutionen.',
    },
    {
      id: 'goetter',
      label: 'Baustein 3 - Glaube an Goetter',
      kicker: 'Religion',
      image: 'slices/08-verband-goetter.png',
      title: 'Viele Griechen verehrten dieselben Goetter.',
      text: 'Zeus, Athene und Poseidon sind Beispiele fuer einen gemeinsamen religioesen Bezugsrahmen in der griechischen Welt.',
      fact: 'Faktencheck: Greek religion und mythology sind eng verbunden; viele Kulte waren lokal verschieden, aber zentrale Goetter waren ueberregional bekannt.',
    },
    {
      id: 'mythos',
      label: 'Baustein 4 - Mythen erklaeren Welt',
      kicker: 'Weltdeutung',
      image: 'slices/20-mythen-erklaerung-der-welt.png',
      title: 'Mythen erklaerten Natur und Ordnung.',
      text: 'Mythen gaben Antworten auf Fragen nach Blitz, Jahreszeiten, Ursprung der Welt und richtigem Verhalten.',
      fact: 'Faktencheck: Britannica beschreibt Mythen als traditionelle Erzaehlungen mit Deutungsfunktion fuer Natur, Werte und Gemeinschaft.',
    },
    {
      id: 'delphi',
      label: 'Baustein 5 - Orakel von Delphi',
      kicker: 'Delphi',
      image: 'slices/25-delphi-was-ist-orakel.png',
      title: 'Delphi war das bekannteste Orakel Griechenlands.',
      text: 'Menschen fragten dort bei schwierigen Entscheidungen nach goettlichem Rat. Die Antworten wurden oft mehrdeutig verstanden.',
      fact: 'Faktencheck: Britannica nennt Delphi das beruehmteste Orakel des Apollo; seine Bedeutung war besonders zwischen dem 7. und 6. Jh. v. Chr. panhellenisch.',
    },
    {
      id: 'olympia',
      label: 'Baustein 6 - Olympische Spiele',
      kicker: 'Feste',
      image: 'slices/05-olympia.png',
      title: 'Die Spiele in Olympia verbanden viele Griechen.',
      text: 'Die antiken Olympischen Spiele waren Teil eines religioesen Festes zu Ehren des Zeus und fanden im Vierjahresrhythmus statt.',
      fact: 'Faktencheck: Britannica datiert den Beginn auf 776 v. Chr. in Olympia; die Spiele waren Teil eines Zeus-Festes.',
    },
    {
      id: 'meer',
      label: 'Baustein 7 - Das Meer verbindet',
      kicker: 'Raum',
      image: 'slices/31-handel-meer-verbindet.png',
      title: 'Das Meer war Verkehrsraum statt Grenze.',
      text: 'Die Kuestenlage ermoeglichte Austausch zwischen Regionen, Staedten und Inseln. Schiffe waren zentral fuer Kontakt und Handel.',
      fact: 'Faktencheck: In der griechischen Welt spielte Seeverkehr eine Schluesselrolle fuer Wirtschaft und Vernetzung.',
    },
    {
      id: 'handel',
      label: 'Baustein 8 - Handel mit Waren',
      kicker: 'Wirtschaft',
      image: 'slices/32-handel-waren.png',
      title: 'Handel sicherte Versorgung und Austausch.',
      text: 'Getauscht wurden unter anderem Keramik, Oel und Wein gegen andere benoetigte Gueter, zum Beispiel Getreide.',
      fact: 'Faktencheck: Griechenland war durch Handel eng in den Mittelmeerraum eingebunden.',
    },
    {
      id: 'kolonien',
      label: 'Baustein 9 - Kolonien',
      kicker: 'Ausbreitung',
      image: 'slices/33-handel-kolonien.png',
      title: 'Gruendungen neuer Siedlungen erweiterten den Handlungsraum.',
      text: 'Kolonien entstanden an anderen Kuesten und schufen neue Kontakte, Handelswege und politische Bindungen.',
      fact: 'Faktencheck: Britannica beschreibt eine Ausbreitung griechischer Stadtstaaten im Mittelmeer- und Schwarzmeerraum, vor allem ca. 750-550 v. Chr.',
    },
    {
      id: 'athen-sparta',
      label: 'Baustein 10 - Athen und Sparta',
      kicker: 'Vergleich',
      image: 'slices/15-polis-athen-sparta.png',
      title: 'Poleis gehoerten zur gleichen Kultur, waren aber verschieden.',
      text: 'Athen und Sparta zeigen: gemeinsame Sprache und Religion bedeuteten nicht gleiche Politik oder gleiche Lebensformen.',
      fact: 'Faktencheck: Antikes Griechenland bestand aus vielen Poleis mit unterschiedlichen Verfassungen und Interessen.',
    },
    {
      id: 'merke-verband',
      label: 'Baustein 11 - Merksatz Verbundenheit',
      kicker: 'Merke',
      image: 'slices/11-merke-verband.png',
      title: 'Verbunden durch Kultur, getrennt in Politik.',
      text: 'Die Formel hilft beim Zusammenfassen: viele Poleis, aber starke gemeinsame kulturelle Elemente.',
      fact: 'Faktencheck: Genau diese Doppelstruktur nennt Britannica fuer das antike Griechenland.',
    },
    {
      id: 'merke-handel',
      label: 'Baustein 12 - Merksatz Handel/Kolonien',
      kicker: 'Merke',
      image: 'slices/34-merke-handel-kolonien.png',
      title: 'Landschaft und Meer praegten das Leben stark.',
      text: 'Bergland, begrenztes Ackerland und Kuestenlage erklaeren, warum Handel und Koloniegruendungen so wichtig wurden.',
      fact: 'Faktencheck: Verknuepfung von Naturraum und Wirtschaftsweise ist eine zentrale Erklaerungslinie fuer die griechische Geschichte.',
    },
  ];

  const termLabels = {
    hellenen: 'Hellenen',
    polis: 'Polis',
    mythos: 'Mythos',
    orakel: 'Orakel',
    olympia: 'Olympische Spiele',
    kolonie: 'Kolonie',
  };

  const termPool = [
    {
      statement: 'So nannten sich die Griechen selbst in kulturellem Sinn.',
      answer: 'hellenen',
      explanation: 'Der passende Begriff ist Hellenen.',
    },
    {
      statement: 'Ein griechischer Stadtstaat mit Stadt und Umland.',
      answer: 'polis',
      explanation: 'Das ist die Polis.',
    },
    {
      statement: 'Erzaehlung ueber Goetter oder Helden zur Weltdeutung.',
      answer: 'mythos',
      explanation: 'Das beschreibt einen Mythos.',
    },
    {
      statement: 'Goettliche Botschaft auf eine Frage, oft an einem heiligen Ort.',
      answer: 'orakel',
      explanation: 'Das ist ein Orakel.',
    },
    {
      statement: 'Grosses Fest in Olympia zu Ehren von Zeus.',
      answer: 'olympia',
      explanation: 'Das sind die Olympischen Spiele.',
    },
    {
      statement: 'Neue griechische Siedlung an einer anderen Kueste.',
      answer: 'kolonie',
      explanation: 'Das nennt man Kolonie.',
    },
    {
      statement: 'Politische Grundeinheit des antiken Griechenlands.',
      answer: 'polis',
      explanation: 'Die Grundeinheit war die Polis.',
    },
    {
      statement: 'Gemeinsame kulturelle Bezeichnung vieler Griechen.',
      answer: 'hellenen',
      explanation: 'Die Griechen sahen sich als Hellenen.',
    },
    {
      statement: 'Durch diesen Erklaerweg wurden Naturereignisse und Werte in Geschichten gedeutet.',
      answer: 'mythos',
      explanation: 'Mythen deuten Natur und Werte symbolisch.',
    },
  ];

  const causeEffectPool = [
    {
      statement: 'Viele Berge und wenig Ackerland',
      options: [
        'mehr Seefahrt, Handel und Suche nach neuen Siedlungsraeumen',
        'alle Poleis wurden sofort ein Staat',
        'die Griechen gaben den Handel ganz auf',
        'nur Sparta durfte Landwirtschaft betreiben',
      ],
      answer: 0,
      explanation: 'Raumbedingungen foerderten Seehandel und Koloniegruendungen.',
    },
    {
      statement: 'Lage am Meer',
      options: [
        'Verbindungen zwischen Inseln, Kuesten und Staedten wurden einfacher',
        'es gab keinen Austausch mehr',
        'jede Polis wurde automatisch gleich regiert',
        'Orakel verloren sofort ihre Bedeutung',
      ],
      answer: 0,
      explanation: 'Das Meer war Verkehrsraum und Kontaktzone.',
    },
    {
      statement: 'Gemeinsame Feste wie die Olympischen Spiele',
      options: [
        'staerkten das Gefuehl kultureller Zusammengehoerigkeit',
        'beendeten alle Konflikte fuer immer',
        'ersetzten die Politik jeder Polis',
        'machten Sprache unwichtig',
      ],
      answer: 0,
      explanation: 'Feste schufen Verbindung, aber keine politische Einheit.',
    },
    {
      statement: 'Viele Poleis mit eigenen Regeln',
      options: [
        'groesse Vielfalt in Regierungsformen und Interessen',
        'eine einzige Hauptstadt fuer alle Griechen',
        'kein Unterschied zwischen Athen und Sparta',
        'keine Bedeutung von Ort und Umland',
      ],
      answer: 0,
      explanation: 'Jede Polis war in zentralen Fragen eigenstaendig.',
    },
    {
      statement: 'Orakelantworten waren oft mehrdeutig',
      options: [
        'Menschen deuteten sie unterschiedlich',
        'nur noch schriftliche Gesetze galten',
        'Delphi wurde dadurch unbedeutend',
        'Fragen durften nicht mehr gestellt werden',
      ],
      answer: 0,
      explanation: 'Mehrdeutigkeit fuehrte zu verschiedenen Interpretationen.',
    },
    {
      statement: 'Wachsende Bevoelkerung und Handel',
      options: [
        'Auswanderung und Gruendung weiterer Siedlungen',
        'vollstaendiger Rueckzug in Gebirge',
        'Abschaffung der Schifffahrt',
        'Ende aller religioesen Feste',
      ],
      answer: 0,
      explanation: 'Kolonisation hing auch mit Wachstum und Handel zusammen.',
    },
    {
      statement: 'Gemeinsame Sprache und Goetterglaube',
      options: [
        'kulturelle Naehe trotz politischer Trennung',
        'ein sofortiger Zentralstaat',
        'keine Bedeutung von Mythen',
        'Ausschliesslich Binnenhandel',
      ],
      answer: 0,
      explanation: 'Kultur konnte verbinden, ohne politische Einheit zu schaffen.',
    },
  ];

  const trueFalseLabels = {
    richtig: 'richtig',
    falsch: 'falsch',
  };

  const trueFalsePool = [
    {
      statement: 'Antikes Griechenland war ein einziges Land mit einer Regierung.',
      answer: 'falsch',
      explanation: 'Es war ein Kulturraum mit vielen Poleis.',
    },
    {
      statement: 'Eine Polis bestand nur aus einer Stadt ohne Umland.',
      answer: 'falsch',
      explanation: 'Zur Polis gehoerten Stadt und Umland.',
    },
    {
      statement: 'Die Olympischen Spiele waren mit der Verehrung des Zeus verbunden.',
      answer: 'richtig',
      explanation: 'Sie waren Teil eines religioesen Festes.',
    },
    {
      statement: 'Delphi war in der griechischen Welt fuer Orakel sehr bekannt.',
      answer: 'richtig',
      explanation: 'Es galt als das beruehmteste Orakel des Apollo.',
    },
    {
      statement: 'Mythen konnten fuer Werte und Orientierung wichtig sein.',
      answer: 'richtig',
      explanation: 'Sie gaben Deutungen und Vorbilder.',
    },
    {
      statement: 'Kolonien entstanden nie an Kuesten, sondern nur im Inland.',
      answer: 'falsch',
      explanation: 'Viele Gruendungen lagen an Kuesten und Handelswegen.',
    },
    {
      statement: 'Athen und Sparta zeigen, dass Poleis unterschiedlich sein konnten.',
      answer: 'richtig',
      explanation: 'Genau darum ist der Vergleich wichtig.',
    },
    {
      statement: 'Wenn alle dieselben Goetter kannten, gab es keine Konflikte.',
      answer: 'falsch',
      explanation: 'Gemeinsamer Glaube bedeutete nicht automatisch Frieden.',
    },
  ];

  const transferPool = [
    {
      prompt: 'Welche Aussage verbindet Raum und Wirtschaft am besten?',
      options: [
        'Durch Berge und Kuestenlage wurde Seefahrt fuer viele Poleis wichtig.',
        'Durch Berge entstanden ueberall riesige Getreidefelder.',
        'Das Meer trennte alle Poleis vollstaendig voneinander.',
        'Handel spielte im antiken Griechenland kaum eine Rolle.',
      ],
      answer: 0,
      explanation: 'Raumbedingungen und Meer erklaeren die Bedeutung von Handel und Schifffahrt.',
    },
    {
      prompt: 'Welche Deutung passt am besten zu Delphi?',
      options: [
        'Delphi war ein Theater ohne religioese Funktion.',
        'Delphi war ein bekanntes Heiligtum mit Orakel des Apollo.',
        'Delphi war die Hauptstadt aller Griechen.',
        'In Delphi fanden keine politischen Fragen statt.',
      ],
      answer: 1,
      explanation: 'Das Orakel von Delphi wurde auch in Staatsfragen befragt.',
    },
    {
      prompt: 'Was zeigt der Vergleich von Athen und Sparta?',
      options: [
        'Alle Poleis waren gleich organisiert.',
        'Polis bedeutete immer dieselbe Verfassung.',
        'Poleis konnten kulturell verbunden, politisch aber verschieden sein.',
        'Athen und Sparta lagen ausserhalb Griechenlands.',
      ],
      answer: 2,
      explanation: 'Kulturelle Gemeinsamkeit und politische Vielfalt gehoeren zusammen.',
    },
    {
      prompt: 'Welche Aussage erklaert den Nutzen von Mythen am besten?',
      options: [
        'Mythen waren nur Unterhaltung ohne Bedeutung.',
        'Mythen gaben Weltdeutung, Werte und Gemeinschaftsgefuehl.',
        'Mythen ersetzten jede Form von Politik.',
        'Mythen verboten religioese Feste.',
      ],
      answer: 1,
      explanation: 'Mythen hatten soziale und religioese Funktionen.',
    },
    {
      prompt: 'Was passt am besten zur griechischen Kolonisation?',
      options: [
        'Sie war immer ein einziger Plan aller Griechen gleichzeitig.',
        'Sie hatte oft mit Handel, Wachstum und neuen Chancen zu tun.',
        'Sie fand nur auf dem Festland statt.',
        'Sie beendete den Seehandel.',
      ],
      answer: 1,
      explanation: 'Kolonisation war vielfaeltig und eng mit Handel verbunden.',
    },
  ];

  const examSequencePool = [
    {
      prompt: 'Welche Reihenfolge passt zur Erklaerkette "Raum -> Wirtschaft"?',
      options: [
        'viele Berge -> wenig Ackerland -> mehr Seefahrt -> Handel und Kolonien',
        'viele Berge -> zentrale Einheitsregierung -> Ende der Schifffahrt -> keine Kolonien',
        'viel Ackerland -> weniger Handel -> keine Staedte -> keine Poleis',
        'Orakel in Delphi -> sofort Demokratie fuer alle -> nur Binnenhandel -> keine Kuestenstaedte',
      ],
      answer: 0,
      points: 3,
      explanation: 'So laesst sich die Kette aus Naturraum und Folgen richtig begruenden.',
    },
    {
      prompt: 'Welche Reihenfolge passt zum kulturellen Zusammenhang?',
      options: [
        'gemeinsame Sprache -> gemeinsame Feste -> staerkeres Zusammengehoerigkeitsgefuehl -> Hellenen-Bewusstsein',
        'gemeinsame Sprache -> keine Kontakte -> keine Feste -> keine Kultur',
        'gemeinsame Feste -> Abschaffung aller Poleis -> ein Weltreich -> Ende von Athen und Sparta',
        'Kolonien -> keine Seefahrt -> keine Kontakte -> keine Religion',
      ],
      answer: 0,
      points: 3,
      explanation: 'Die kulturelle Verbindung laeuft ueber Sprache, Feste und gemeinsame Deutungen.',
    },
    {
      prompt: 'Welche Abfolge ist fuer Delphi am sinnvollsten?',
      options: [
        'Frage stellen -> Orakelantwort erhalten -> Antwort deuten -> Entscheidung treffen',
        'Entscheidung treffen -> Frage verbieten -> Delphi zerstoeren -> keine Deutung',
        'Frage stellen -> keine Antwort -> sofort Krieg -> keine Beratung',
        'Nur Priester fragen -> niemals deuten -> keine Folgen -> keine Entscheidungen',
      ],
      answer: 0,
      points: 3,
      explanation: 'Orakel funktionierte ueber Anfrage, Antwort und Deutung.',
    },
  ];

  let termTasks = [];
  let causeTasks = [];
  let trueFalseTasks = [];
  let transferTasks = [];

  const examState = {
    partA: [],
    partB: [],
    partC: [],
    running: false,
    maxPoints: 20,
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

  function setupImageLightbox() {
    const zoomables = document.querySelectorAll('.zg-cover-grid img, .zg-figure img');
    zoomables.forEach((img) => {
      img.classList.add('zg-zoomable');
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', `Bild gross anzeigen: ${img.alt || 'Grafik'}`);
      img.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openLightbox(img);
        }
      });
    });

    document.addEventListener('click', (event) => {
      const targetImage = event.target.closest('.zg-zoomable');
      if (targetImage) {
        openLightbox(targetImage);
      }
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
    if (!image || !lightbox || !lightboxImage || !lightboxCaption) {
      return;
    }

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || 'Grossansicht';
    lightboxCaption.textContent = image.alt || '';
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImage || !lightboxCaption) {
      return;
    }
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
      button.className = 'zg-station-btn';
      button.dataset.stationId = station.id;
      button.innerHTML = `${station.label}<small>${station.kicker}</small>`;
      button.addEventListener('click', () => setStation(station.id));
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

    document.querySelectorAll('.zg-station-btn').forEach((button) => {
      button.classList.toggle('is-active', button.dataset.stationId === stationId);
    });
  }

  function renderSelectTasks(container, tasks, labels) {
    container.replaceChildren();
    tasks.forEach((task, index) => {
      const row = document.createElement('article');
      row.className = 'zg-task-row';
      row.dataset.index = String(index);

      const prompt = document.createElement('p');
      prompt.textContent = task.statement;

      const select = document.createElement('select');
      const empty = document.createElement('option');
      empty.value = '';
      empty.textContent = 'Bitte auswaehlen';
      select.append(empty);

      if (Array.isArray(labels)) {
        labels.forEach((label, value) => {
          const option = document.createElement('option');
          option.value = String(value);
          option.textContent = label;
          select.append(option);
        });
      } else {
        Object.entries(labels).forEach(([value, label]) => {
          const option = document.createElement('option');
          option.value = value;
          option.textContent = label;
          select.append(option);
        });
      }

      row.append(prompt, select);
      container.append(row);
    });
  }

  function evaluateSelectTasks(container, tasks, feedbackElement) {
    let correct = 0;
    const hints = [];

    [...container.children].forEach((row) => {
      const task = tasks[Number(row.dataset.index)];
      const select = row.querySelector('select');
      const value = select.value;
      const target = String(task.answer);
      const isCorrect = value === target;

      row.classList.toggle('is-correct', isCorrect);
      row.classList.toggle('is-wrong', !isCorrect);

      if (isCorrect) {
        correct += 1;
      } else if (hints.length < 2) {
        hints.push(task.explanation);
      }
    });

    const text = `${correct} von ${tasks.length} richtig.${hints.length ? ` Hinweis: ${hints.join(' ')}` : ''}`;
    setFeedback(feedbackElement, text, correct === tasks.length);
  }

  function renderChoiceTasks(container, tasks, groupPrefix) {
    container.replaceChildren();

    tasks.forEach((task, index) => {
      const row = document.createElement('article');
      row.className = 'zg-choice-row';
      row.dataset.index = String(index);

      const prompt = document.createElement('p');
      prompt.textContent = task.prompt;

      const optionsWrap = document.createElement('div');
      optionsWrap.className = 'zg-choice-options';

      task.options.forEach((optionText, optionIndex) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `${groupPrefix}-${index}`;
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
    const hints = [];

    [...container.children].forEach((row) => {
      const task = tasks[Number(row.dataset.index)];
      const checked = row.querySelector('input:checked');
      const answer = checked ? Number(checked.value) : -1;
      const isCorrect = answer === task.answer;

      row.classList.toggle('is-correct', isCorrect);
      row.classList.toggle('is-wrong', !isCorrect);

      if (isCorrect) {
        correct += 1;
      } else if (hints.length < 2) {
        hints.push(task.explanation);
      }
    });

    const text = `${correct} von ${tasks.length} richtig.${hints.length ? ` Hinweis: ${hints.join(' ')}` : ''}`;
    setFeedback(feedbackElement, text, correct === tasks.length);
  }

  function newTermRound() {
    termTasks = shuffle(termPool).slice(0, 7);
    clearFeedback(termFeedback);
    renderSelectTasks(termList, termTasks, termLabels);
  }

  function newCauseRound() {
    causeTasks = shuffle(causeEffectPool).slice(0, 6).map((item) => ({
      statement: item.statement,
      answer: item.answer,
      explanation: item.explanation,
      options: item.options,
    }));
    clearFeedback(causeFeedback);
    renderSelectTasks(
      causeList,
      causeTasks.map((task) => ({
        statement: task.statement,
        answer: task.answer,
        explanation: task.explanation,
      })),
      causeTasks[0].options
    );

    [...causeList.children].forEach((row, index) => {
      const select = row.querySelector('select');
      select.replaceChildren();
      const empty = document.createElement('option');
      empty.value = '';
      empty.textContent = 'Bitte auswaehlen';
      select.append(empty);

      causeTasks[index].options.forEach((optionText, optionIndex) => {
        const option = document.createElement('option');
        option.value = String(optionIndex);
        option.textContent = optionText;
        select.append(option);
      });
    });
  }

  function newTrueFalseRound() {
    trueFalseTasks = shuffle(trueFalsePool).slice(0, 6);
    clearFeedback(trueFalseFeedback);
    renderSelectTasks(trueFalseList, trueFalseTasks, trueFalseLabels);
  }

  function newTransferRound() {
    transferTasks = shuffle(transferPool).slice(0, 3);
    clearFeedback(transferFeedback);
    renderChoiceTasks(transferList, transferTasks, 'transfer');
  }

  function buildExam() {
    examState.running = true;
    examState.partA = shuffle(termPool).slice(0, 6).map((item) => ({
      statement: item.statement,
      answer: item.answer,
      explanation: item.explanation,
      points: 1,
    }));

    examState.partB = shuffle(transferPool).slice(0, 4).map((item) => ({
      prompt: item.prompt,
      options: item.options,
      answer: item.answer,
      explanation: item.explanation,
      points: 2,
    }));

    examState.partC = shuffle(examSequencePool).slice(0, 2).map((item) => ({
      prompt: item.prompt,
      options: item.options,
      answer: item.answer,
      explanation: item.explanation,
      points: 3,
    }));

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
      } else if (hints.length < 3) {
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
      } else if (hints.length < 4) {
        hints.push(task.explanation);
      }
    });

    const percent = Math.round((points / examState.maxPoints) * 100);
    let rating = '';
    if (percent >= 85) {
      rating = 'Sehr gut vorbereitet. Du kannst die Zusammenhaenge sicher erklaeren.';
    } else if (percent >= 70) {
      rating = 'Gute Leistung. Wiederhole gezielt noch Orakel/Polis und Ursache-Folge-Ketten.';
    } else if (percent >= 50) {
      rating = 'Solide Basis. Gehe die Merkkarten und den Baustein-Explorer noch einmal durch.';
    } else {
      rating = 'Bitte wiederhole die Lernwerkstatt systematisch und starte danach eine neue Variante.';
    }

    examScore.textContent = `Punkte: ${points} / ${examState.maxPoints}`;
    setFeedback(
      examFeedback,
      `Ergebnis: ${points}/${examState.maxPoints} Punkte (${percent}%). ${rating}${hints.length ? ` Hinweise: ${hints.join(' ')}` : ''}`,
      percent >= 70
    );
  }

  setupTabs();
  setupImageLightbox();
  renderStationButtons();
  setStation('hellenen');

  newTermRound();
  newCauseRound();
  newTrueFalseRound();
  newTransferRound();
  buildExam();

  termNew.addEventListener('click', newTermRound);
  termCheck.addEventListener('click', () => evaluateSelectTasks(termList, termTasks, termFeedback));

  causeNew.addEventListener('click', newCauseRound);
  causeCheck.addEventListener('click', () => evaluateSelectTasks(causeList, causeTasks, causeFeedback));

  trueFalseNew.addEventListener('click', newTrueFalseRound);
  trueFalseCheck.addEventListener('click', () => evaluateSelectTasks(trueFalseList, trueFalseTasks, trueFalseFeedback));

  transferNew.addEventListener('click', newTransferRound);
  transferCheck.addEventListener('click', () => evaluateChoiceTasks(transferList, transferTasks, transferFeedback));

  examStart.addEventListener('click', buildExam);
  examNew.addEventListener('click', buildExam);
  examCheck.addEventListener('click', evaluateExam);
})();
