// cart.js
import { updateBagCount } from "./cart-handler.js";


const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
}); 







let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  cart = JSON.parse(localStorage.getItem("cart")) || [];

  updateBagCount();
  renderCart();
});

// -------------------- Save --------------------
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// -------------------- Render Cart --------------------
function renderCart() {
  const container = document.querySelector(".cart-items");
  const totalEl = document.getElementById("total-sum");
  const vatEl = document.getElementById("vat-sum");

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
    totalEl.textContent = "00.00 SEK";
    vatEl.textContent = "00.00 SEK";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.quantity * item.price;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div class="cart-header">
        <img class="cart-item-img" src="${item.img}">
        <div class="cart-item-info">
          <p>${item.name}</p>
          <p class="price-line">${item.quantity} × ${item.price}:-</p>
        </div>
      </div>

      <div class="cart-actions">
        <button class="minus" data-index="${index}">−</button>
        <span class="qty">${item.quantity}</span>
        <button class="plus" data-index="${index}">+</button>
      </div>
    `;

    container.appendChild(div);
  });

  updateTotals(total);
  attachQuantityButtons();
}

// -------------------- Totals --------------------
function updateTotals(total) {
  document.getElementById("total-sum").textContent = `${total.toFixed(2)} SEK`;
  document.getElementById("vat-sum").textContent = `${(total * 0.12).toFixed(2)} SEK`;
}

// -------------------- + and - Buttons --------------------
function attachQuantityButtons() {
  document.querySelectorAll(".plus").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = btn.dataset.index;
      cart[i].quantity++;
      saveAndRefresh();
    });
  });

  document.querySelectorAll(".minus").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = btn.dataset.index;
      cart[i].quantity--;

      if (cart[i].quantity < 1) {
        cart.splice(i, 1);
      }

      saveAndRefresh();
    });
  });
}

function saveAndRefresh() {
  saveCart();
  updateBagCount();
  renderCart();
}

 