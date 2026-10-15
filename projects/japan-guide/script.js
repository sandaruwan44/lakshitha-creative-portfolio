// Mobile menu toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav__link").forEach((a) => {
  a.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Modal for spot details
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalAddress = document.getElementById("modalAddress");
const modalHours = document.getElementById("modalHours");
const modalAccess = document.getElementById("modalAccess");
const modalNote = document.getElementById("modalNote");
const modalClose = document.getElementById("modalClose");
const modalMaps = document.getElementById("modalMaps");

function openModal(data) {
  modalTitle.textContent = data.title;
  modalAddress.textContent = data.address;
  modalHours.textContent = data.hours;
  modalAccess.textContent = data.access;
  modalNote.textContent = "Tip: " + data.note;

  const mapQuery = encodeURIComponent(data.address);
  modalMaps.href = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".spotBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    openModal({
      title: btn.dataset.title || "",
      address: btn.dataset.address || "",
      hours: btn.dataset.hours || "",
      access: btn.dataset.access || "",
      note: btn.dataset.note || "",
    });
  });
});

modalClose?.addEventListener("click", closeModal);

modal?.addEventListener("click", (e) => {
  const target = e.target;
  if (target?.dataset?.close === "true") closeModal();
});

// ESC to close modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

// Simple form validation
const form = document.getElementById("contactForm");
const hint = document.getElementById("formHint");

function setError(id, message) {
  const el = document.querySelector(`[data-error-for="${id}"]`);
  if (el) el.textContent = message || "";
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  let ok = true;

  setError("name", "");
  setError("email", "");
  setError("message", "");
  hint.textContent = "";
  hint.style.color = "";

  if (name.length < 2) {
    setError("name", "Please enter your name (min 2 characters).");
    ok = false;
  }
  if (!validateEmail(email)) {
    setError("email", "Please enter a valid email address.");
    ok = false;
  }
  if (message.length < 10) {
    setError("message", "Message should be at least 10 characters.");
    ok = false;
  }

  if (!ok) return;

  // Demo submit (front-end only)
  hint.textContent = "✅ Message ready to send! (Demo) You can connect this to a backend later.";
  hint.style.color = "var(--good)";
  form.reset();
});
