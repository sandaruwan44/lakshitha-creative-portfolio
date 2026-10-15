const products = [
  {
    id: "midnight-oud", name: "Midnight Oud", category: "woody",
    mood: "Oud \u00b7 Rose \u00b7 Musk", price: 12900, rating: "4.9",
    image: "img/midnight oud.png", url: "midnight-oud.html"
  },
  {
    id: "velvet-smoke", name: "Velvet Smoke", category: "spicy",
    mood: "Smoke \u00b7 Spice \u00b7 Vanilla", price: 11500, rating: "4.8",
    image: "img/velvet.png", url: "velvet-smoke.html"
  },
  {
    id: "moon-amber", name: "Moon Amber", category: "amber",
    mood: "Amber \u00b7 Bergamot \u00b7 Musk", price: 10900, rating: "4.7",
    image: "img/moon.png", url: "moon-amber.html"
  },
  {
    id: "cedar-eclipse", name: "Cedar Eclipse", category: "woody",
    mood: "Cedar \u00b7 Oud \u00b7 Smoke", price: 13800, rating: "4.9",
    image: "img/collection/cedar-eclipse.png", url: "product.html?id=cedar-eclipse",
    description: "Dry cedar and luminous bergamot descend into smoky oud and dark amber. Architectural, warm and quietly commanding.",
    notes: ["Bergamot", "Cedar \u00b7 Smoke", "Oud \u00b7 Amber"]
  },
  {
    id: "forest-veil", name: "Forest Veil", category: "woody",
    mood: "Pine \u00b7 Vetiver \u00b7 Moss", price: 12400, rating: "4.7",
    image: "img/collection/forest-veil.png", url: "product.html?id=forest-veil",
    description: "Cool pine air and green vetiver wrapped in moss, soft woods and a subtle mineral shadow.",
    notes: ["Pine", "Vetiver \u00b7 Moss", "Cedarwood"]
  },
  {
    id: "santal-noir", name: "Santal Noir", category: "woody",
    mood: "Sandalwood \u00b7 Tonka \u00b7 Musk", price: 13200, rating: "4.8",
    image: "img/collection/santal-noir.png", url: "product.html?id=santal-noir",
    description: "Creamy sandalwood polished with tonka bean and skin-soft musk. Smooth, intimate and modern.",
    notes: ["Black Pepper", "Sandalwood \u00b7 Tonka", "Soft Musk"]
  },
  {
    id: "moss-obsidian", name: "Moss Obsidian", category: "woody",
    mood: "Moss \u00b7 Patchouli \u00b7 Cedar", price: 12900, rating: "4.8",
    image: "img/collection/moss-obsidian.png", url: "product.html?id=moss-obsidian",
    description: "A mineral-green composition of damp moss, refined patchouli and faceted cedarwood.",
    notes: ["Juniper", "Moss \u00b7 Patchouli", "Cedar \u00b7 Mineral Musk"]
  },
  {
    id: "saffron-ember", name: "Saffron Ember", category: "spicy",
    mood: "Saffron \u00b7 Leather \u00b7 Amber", price: 14100, rating: "4.9",
    image: "img/collection/saffron-ember.png", url: "product.html?id=saffron-ember",
    description: "Glowing saffron and polished leather burn slowly over a rich amber base. Opulent and unforgettable.",
    notes: ["Saffron", "Rose \u00b7 Leather", "Amber \u00b7 Woods"]
  },
  {
    id: "pepper-rouge", name: "Pepper Rouge", category: "spicy",
    mood: "Pink Pepper \u00b7 Rose \u00b7 Woods", price: 12600, rating: "4.7",
    image: "img/collection/pepper-rouge.png", url: "product.html?id=pepper-rouge",
    description: "Electric pink pepper cuts through a dark rose heart, settling into smooth red woods.",
    notes: ["Pink Pepper", "Dark Rose", "Red Woods"]
  },
  {
    id: "cardamom-night", name: "Cardamom Night", category: "spicy",
    mood: "Cardamom \u00b7 Incense \u00b7 Vanilla", price: 13500, rating: "4.8",
    image: "img/collection/cardamom-night.png", url: "product.html?id=cardamom-night",
    description: "A violet night of green cardamom, floating incense and velvety vanilla.",
    notes: ["Cardamom", "Incense", "Vanilla \u00b7 Tonka"]
  },
  {
    id: "golden-resin", name: "Golden Resin", category: "amber",
    mood: "Labdanum \u00b7 Benzoin \u00b7 Vanilla", price: 13900, rating: "4.9",
    image: "img/collection/golden-resin.png", url: "product.html?id=golden-resin",
    description: "Luminous labdanum and benzoin melt into vanilla and polished woods. Dense, golden and addictive.",
    notes: ["Mandarin", "Labdanum \u00b7 Benzoin", "Vanilla \u00b7 Woods"]
  },
  {
    id: "amber-halo", name: "Amber Halo", category: "amber",
    mood: "Amber \u00b7 Iris \u00b7 Musk", price: 12100, rating: "4.8",
    image: "img/collection/amber-halo.png", url: "product.html?id=amber-halo",
    description: "A soft glow of amber and iris surrounded by clean musk. Radiant, calm and close to the skin.",
    notes: ["Pear", "Amber \u00b7 Iris", "White Musk"]
  },
  {
    id: "solar-myrrh", name: "Solar Myrrh", category: "amber",
    mood: "Myrrh \u00b7 Orange \u00b7 Tonka", price: 13400, rating: "4.7",
    image: "img/collection/solar-myrrh.png", url: "product.html?id=solar-myrrh",
    description: "Sunlit orange illuminates sacred myrrh, warm tonka and a trace of mineral incense.",
    notes: ["Bitter Orange", "Myrrh \u00b7 Incense", "Tonka \u00b7 Amber"]
  }
];

const formatYen = value => `\u00a5${Number(value).toLocaleString("en-US")}`;

const productCard = product => `
  <article class="catalogue-card reveal" data-category="${product.category}">
    <a href="${product.url}"><img src="${product.image}" alt="${product.name}" loading="lazy"></a>
    <p class="product-type">${product.category} \u00b7 Eau de Parfum</p>
    <h3>${product.name}</h3>
    <div class="price-row"><strong>${formatYen(product.price)}</strong><span>\u2605 ${product.rating}</span></div>
    <button class="quick-add" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">Add to bag</button>
  </article>`;

const shopCard = product => `
  <article class="shop-card reveal" data-category="${product.category}">
    <a href="${product.url}"><img src="${product.image}" alt="${product.name}" loading="lazy"></a>
    <p class="product-type">${product.mood}</p>
    <h2>${product.name}</h2>
    <div class="price-row"><strong>${formatYen(product.price)}</strong><span>\u2605 ${product.rating}</span></div>
    <div class="shop-actions">
      <a href="${product.url}">Details</a>
      <button class="quick-add" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">Add to bag</button>
    </div>
  </article>`;

const catalogueGrid = document.getElementById("catalogueGrid");
const shopGrid = document.getElementById("shopGrid");
if (catalogueGrid) catalogueGrid.innerHTML = products.map(productCard).join("");
if (shopGrid) shopGrid.innerHTML = products.map(shopCard).join("");

const getBag = () => {
  try {
    return JSON.parse(localStorage.getItem("noireBag")) || [];
  } catch {
    return [];
  }
};

const updateBagCount = () => {
  const count = getBag().reduce((sum, item) => sum + (item.qty || 1), 0);
  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = count;
  });
};

const showToast = message => {
  const toast = document.querySelector(".toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.noireToastTimer);
  window.noireToastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
};

function addToBag(name, price, image, redirect = false) {
  const bag = getBag();
  const existing = bag.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    bag.push({ name, price: Number(price), image, qty: 1 });
  }
  localStorage.setItem("noireBag", JSON.stringify(bag));
  localStorage.setItem("productName", name);
  localStorage.setItem("productPrice", String(price));
  localStorage.setItem("productImage", image);
  updateBagCount();
  showToast(`${name} added to your bag`);
  if (redirect) window.location.href = "cart.html";
}

function goCart(name, price, image) {
  const numericPrice = Number(String(price).replace(/[^\d]/g, ""));
  addToBag(name, numericPrice, image, true);
}

document.addEventListener("click", event => {
  const button = event.target.closest(".quick-add");
  if (!button) return;
  addToBag(button.dataset.name, button.dataset.price, button.dataset.image);
});

const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .06 });
document.querySelectorAll(".reveal").forEach(item => observer.observe(item));

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const cards = document.querySelectorAll(".catalogue-card, .shop-card");
    let visibleCount = 0;
    cards.forEach(card => {
      const shouldShow = button.dataset.filter === "all" || card.dataset.category === button.dataset.filter;
      card.classList.toggle("is-hidden", !shouldShow);
      if (shouldShow) visibleCount += 1;
    });
    const count = document.querySelector(".catalogue-count");
    if (count && catalogueGrid) count.textContent = `${visibleCount} fragrances`;
  });
});

const requestedProduct = new URLSearchParams(window.location.search).get("id");
const detailProduct = products.find(product => product.id === requestedProduct);
if (detailProduct && document.getElementById("productVisual")) {
  document.title = `${detailProduct.name} | NOIR\u00c9`;
  document.getElementById("productVisual").src = detailProduct.image;
  document.getElementById("productVisual").alt = detailProduct.name;
  document.getElementById("productEyebrow").textContent = `${detailProduct.category} \u00b7 Eau de Parfum`;
  document.getElementById("productTitle").innerHTML = detailProduct.name.replace(" ", "<br>");
  document.getElementById("productPrice").textContent = formatYen(detailProduct.price);
  document.getElementById("productDescription").textContent = detailProduct.description;
  document.getElementById("productTop").textContent = detailProduct.notes[0];
  document.getElementById("productHeart").textContent = detailProduct.notes[1];
  document.getElementById("productBase").textContent = detailProduct.notes[2];
  const addButton = document.getElementById("productAdd");
  addButton.textContent = `Add to bag \u00b7 ${formatYen(detailProduct.price)}`;
  addButton.addEventListener("click", () => {
    goCart(detailProduct.name, detailProduct.price, detailProduct.image);
  });
}

const cartName = document.getElementById("cartName");
const cartPrice = document.getElementById("cartPrice");
const cartImage = document.getElementById("cartImage");
const qtyElement = document.getElementById("qty");
const totalElement = document.getElementById("totalPrice");
let qty = 1;
let unitPrice = Number(localStorage.getItem("productPrice")) || 12900;

function renderCart() {
  if (cartName) cartName.textContent = localStorage.getItem("productName") || "Midnight Oud";
  if (cartPrice) cartPrice.textContent = formatYen(unitPrice);
  if (cartImage) cartImage.src = localStorage.getItem("productImage") || "img/midnight oud.png";
  if (qtyElement) qtyElement.textContent = qty;
  if (totalElement) totalElement.textContent = `Total \u00b7 ${formatYen(unitPrice * qty)}`;
}

function increaseQty() {
  qty += 1;
  renderCart();
}

function decreaseQty() {
  if (qty > 1) qty -= 1;
  renderCart();
}

function goCheckout() {
  localStorage.setItem("checkoutQty", String(qty));
  window.location.href = "checkout.html";
}

const checkoutImage = document.getElementById("checkoutImage");
const checkoutProduct = document.getElementById("checkoutProduct");
if (checkoutImage) checkoutImage.src = localStorage.getItem("productImage") || "img/midnight oud.png";
if (checkoutProduct) checkoutProduct.textContent = localStorage.getItem("productName") || "Midnight Oud";

function placeOrder() {
  const requiredInputs = [...document.querySelectorAll(".checkout-form input[required]")];
  const incomplete = requiredInputs.some(input => !input.value.trim());
  if (incomplete) {
    showToast("Please complete all checkout details");
    requiredInputs.find(input => !input.value.trim())?.focus();
    return;
  }
  localStorage.removeItem("noireBag");
  alert("Thank you. Your NOIR\u00c9 order has been placed.");
  window.location.href = "index.html";
}

renderCart();
updateBagCount();
