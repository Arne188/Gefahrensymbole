const storageKey = "lernbereich_themen_v1";

const defaultTopics = [
  {
    subject: "Chemie",
    title: "Gefahrstoffkennzeichen",
    link: "chemie-gefahrstoffe.html",
  },
  {
    subject: "Chemie",
    title: "Laborgeraete und Sicherheit",
    link: "chemie-laborgeraete.html",
  },
  {
    subject: "Erdkunde",
    title: "Vom Luftbild zur Karte",
    link: "erdkunde-luftbild-karte.html",
  },
];

const topicForm = document.getElementById("topicForm");
const topicList = document.getElementById("topicList");

function loadTopics() {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      return defaultTopics;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return defaultTopics;
    }

    // Merge gespeicherte Themen mit neuen Standard-Themen.
    const existingKeys = new Set(parsed.map((topic) => `${topic.subject}|${topic.title}|${topic.link || ""}`));
    const missingDefaults = defaultTopics.filter(
      (topic) => !existingKeys.has(`${topic.subject}|${topic.title}|${topic.link || ""}`)
    );
    return [...parsed, ...missingDefaults];
  } catch {
    return defaultTopics;
  }
}

function saveTopics(topics) {
  localStorage.setItem(storageKey, JSON.stringify(topics));
}

function createTopicMarkup(topic) {
  const safeLink = (topic.link || "").trim();
  const linkMarkup = safeLink
    ? `<a class="button-link topic-link" href="${safeLink}">Modul oeffnen</a>`
    : `<p class="topic-note">Kein Link hinterlegt</p>`;

  return `
    <article class="topic-entry">
      <p class="module-kicker">${topic.subject}</p>
      <h3>${topic.title}</h3>
      ${linkMarkup}
    </article>
  `;
}

function renderTopics(topics) {
  if (topics.length === 0) {
    topicList.innerHTML = `<p>Noch keine Themen angelegt.</p>`;
    return;
  }

  topicList.innerHTML = topics.map(createTopicMarkup).join("");
}

let topics = loadTopics();
saveTopics(topics);
renderTopics(topics);

topicForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(topicForm);

  const subject = String(formData.get("subject") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const link = String(formData.get("link") || "").trim();

  if (!subject || !title) {
    return;
  }

  topics = [...topics, { subject, title, link }];
  saveTopics(topics);
  renderTopics(topics);
  topicForm.reset();
});
