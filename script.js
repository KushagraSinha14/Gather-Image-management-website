const events = [
  {
    id: 1, title: "The Future Forum", category: "Technology",
    date: "November 14, 2026", shortDate: "NOV 14, 2026", venue: "The Foundry, Bhubaneswar",
    description: "A day of big ideas, practical conversations, and fresh perspectives on the technology shaping tomorrow.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 2, title: "Green Notes Festival", category: "Music",
    date: "November 21, 2026", shortDate: "NOV 21, 2026", venue: "Ekamra Park, Bhubaneswar",
    description: "An open-air music gathering with local artists, good food, and an easygoing atmosphere.",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 3, title: "The Creative Edit", category: "Art",
    date: "December 02, 2026", shortDate: "DEC 02, 2026", venue: "Kala Bhoomi, Bhubaneswar",
    description: "Explore independent art, thoughtful design, and the people turning imagination into something real.",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 4, title: "Mindful Mornings", category: "Wellness",
    date: "December 06, 2026", shortDate: "DEC 06, 2026", venue: "Forest Park, Bhubaneswar",
    description: "Slow down with a morning of guided yoga, breathing exercises, and a little time outdoors.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 5, title: "Build It Weekend", category: "Technology",
    date: "December 12, 2026", shortDate: "DEC 12, 2026", venue: "Startup Hub, Bhubaneswar",
    description: "Bring an idea, meet a team, and spend a weekend building a small project from the ground up.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 6, title: "Acoustic Evenings", category: "Music",
    date: "December 19, 2026", shortDate: "DEC 19, 2026", venue: "The Courtyard, Bhubaneswar",
    description: "An intimate evening of acoustic sets, warm lights, and music worth staying a little longer for.",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=85"
  }
];

const grid = document.getElementById("eventsGrid");
const searchInput = document.getElementById("searchInput");
const filters = document.querySelectorAll(".filter");
const noResults = document.getElementById("noResults");
const eventCount = document.getElementById("eventCount");
const detailsDialog = document.getElementById("detailsDialog");
const registerDialog = document.getElementById("registerDialog");
let activeCategory = "All";
let selectedEvent = null;

function renderEvents() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = events.filter(event => {
    const matchesCategory = activeCategory === "All" || event.category === activeCategory;
    const matchesSearch = `${event.title} ${event.category} ${event.venue} ${event.description}`.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  eventCount.textContent = String(filtered.length).padStart(2, "0");
  noResults.hidden = filtered.length !== 0;
  grid.innerHTML = filtered.map(event => `
    <article class="event-card">
      <div class="event-image">
        <img src="${event.image}" alt="${event.title}" loading="lazy">
        <span class="category-tag">${event.category}</span>
      </div>
      <div class="event-body">
        <div class="event-date">${event.shortDate}</div>
        <h3>${event.title}</h3>
        <p class="event-description">${event.description}</p>
        <div class="event-meta">
          <span>⌖ &nbsp;${event.venue}</span>
          <button class="details-link" data-event="${event.id}">Details ↗</button>
        </div>
      </div>
    </article>
  `).join("");
}

function showDetails(eventId) {
  selectedEvent = events.find(event => event.id === Number(eventId));
  if (!selectedEvent) return;
  document.getElementById("detailsContent").innerHTML = `
    <img class="dialog-event-image" src="${selectedEvent.image}" alt="${selectedEvent.title}">
    <div class="eyebrow section-eyebrow">${selectedEvent.category.toUpperCase()} · UPCOMING EVENT</div>
    <h2>${selectedEvent.title}</h2>
    <p>${selectedEvent.description}</p>
    <div class="dialog-details"><span>▦ ${selectedEvent.date}</span><span>⌖ ${selectedEvent.venue}</span></div>
    <button class="button button-green" id="openRegistration">Register for this event <span>↗</span></button>
  `;
  detailsDialog.showModal();
  document.getElementById("openRegistration").addEventListener("click", () => {
    detailsDialog.close();
    openRegistration(selectedEvent);
  });
}

function openRegistration(event) {
  selectedEvent = event;
  document.getElementById("selectedEvent").value = event.title;
  document.getElementById("registrationForm").hidden = false;
  document.getElementById("successMessage").hidden = true;
  document.getElementById("registrationForm").reset();
  document.getElementById("selectedEvent").value = event.title;
  clearErrors();
  registerDialog.showModal();
}

grid.addEventListener("click", event => {
  const button = event.target.closest("[data-event]");
  if (button) showDetails(button.dataset.event);
});

filters.forEach(button => button.addEventListener("click", () => {
  filters.forEach(item => item.classList.remove("active"));
  button.classList.add("active");
  activeCategory = button.dataset.category;
  renderEvents();
}));

searchInput.addEventListener("input", renderEvents);

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => button.closest("dialog").close());
});
[detailsDialog, registerDialog].forEach(dialog => {
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
});

function clearErrors() {
  ["nameError", "emailError", "phoneError"].forEach(id => document.getElementById(id).textContent = "");
}

document.getElementById("registrationForm").addEventListener("submit", event => {
  event.preventDefault();
  clearErrors();

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  let valid = true;

  if (name.length < 2 || !/^[A-Za-z][A-Za-z .'-]*$/.test(name)) {
    document.getElementById("nameError").textContent = "Please enter a valid name (at least 2 characters).";
    valid = false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    document.getElementById("emailError").textContent = "Please enter a valid email address.";
    valid = false;
  }
  if (!/^[6-9]\d{9}$/.test(phone)) {
    document.getElementById("phoneError").textContent = "Enter a valid 10-digit Indian mobile number.";
    valid = false;
  }
  if (!valid) return;

  const registrations = JSON.parse(localStorage.getItem("gatherRegistrations") || "[]");
  registrations.push({
    name, email, phone,
    event: selectedEvent.title,
    registeredAt: new Date().toISOString()
  });
  localStorage.setItem("gatherRegistrations", JSON.stringify(registrations));

  document.getElementById("registrationForm").hidden = true;
  document.getElementById("successMessage").hidden = false;
});

renderEvents();
