const productSelect = document.getElementById("product");
const orderForm = document.getElementById("orderForm");
const orderTitle = document.getElementById("orderTitle");
const orderIntro = document.getElementById("orderIntro");
const orderSummary = document.getElementById("orderSummary");
const copyOrderBtn = document.getElementById("copyOrderBtn");

const params = new URLSearchParams(window.location.search);
const selectedProduct = params.get("item");

if (selectedProduct) {
  [...productSelect.options].forEach(option => {
    if (option.value === selectedProduct) {
      option.selected = true;
    }
  });
}

let currentMessage = "";

function buildOrderMessage(data) {
  const orderId = "2415-" + Date.now().toString().slice(-6);
  return [
    "【24:15 Reservation】",
    `Order ID: ${orderId}`,
    `Parfait: ${data.product}`,
    `Quantity: ${data.quantity}`,
    `Pickup Time: ${data.pickupTime}`,
    `Name: ${data.customerName}`,
    `Contact: ${data.contactInfo}`,
    `Notes: ${data.notes || "None"}`,
    "Location: Yushima, Bunkyo-ku"
  ].join("\n");
}

orderForm.addEventListener("submit", event => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(orderForm).entries());
  currentMessage = buildOrderMessage(data);
  localStorage.setItem("last2415Order", currentMessage);

  orderTitle.textContent = "Order message is ready";
  orderIntro.textContent = "下の内容をコピーして、SNSまたは電話でお店に送信してください。";
  orderSummary.innerHTML = `<pre>${currentMessage}</pre>`;
  copyOrderBtn.disabled = false;
});

copyOrderBtn.addEventListener("click", async () => {
  if (!currentMessage) return;

  try {
    await navigator.clipboard.writeText(currentMessage);
    copyOrderBtn.textContent = "Copied";
    setTimeout(() => {
      copyOrderBtn.textContent = "Copy Message";
    }, 1800);
  } catch {
    copyOrderBtn.textContent = "Select & Copy";
  }
});
