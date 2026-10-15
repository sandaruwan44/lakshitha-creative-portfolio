const cards = document.querySelectorAll(".parfait-card");
const modal = document.getElementById("detailModal");
const closeBtn = document.getElementById("closeBtn");

const modalTitle = document.getElementById("modalTitle");
const modalName = document.getElementById("modalName");
const modalSub = document.getElementById("modalSub");
const modalImg = document.getElementById("modalImg");
const reserveBtn = document.getElementById("reserveBtn");

let currentParfait = "";

cards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
  });

  card.querySelector("button").addEventListener("click", () => {
    modal.className = "detail-modal show " + card.dataset.theme;
    modal.setAttribute("aria-hidden", "false");

    modalTitle.innerHTML = card.dataset.title;
    modalName.textContent = card.dataset.name;
    modalSub.textContent = card.dataset.sub;
    modalImg.src = card.dataset.img;
    modalImg.alt = card.dataset.name;
    currentParfait = card.dataset.name;
  });
});

reserveBtn.addEventListener("click", () => {
  const item = encodeURIComponent(currentParfait || modalName.textContent);
  window.location.href = `order.html?item=${item}`;
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
});

window.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }
});
