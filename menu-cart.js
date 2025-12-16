// menu-cart.js
import { addItemToCart, updateBagCount } from "./cart-handler.js";

document.addEventListener("DOMContentLoaded", () => {
  setupModalOverrides();
  setupAddToCartButton();
  updateBagCount();

  const bagIcon = document.getElementById("bagIcon");
  if (bagIcon) {
    bagIcon.style.cursor = "pointer";
    bagIcon.addEventListener("click", () => {
      window.location.href = "./cart.html";
    });
  }
});
// -------------------- Override showModal from menu.js --------------------
function setupModalOverrides() {
  const originalShowModal = window.showModal;

  window.showModal = function(id,name, price, img) {
    originalShowModal( id,name, price, img);

 const modal = document.getElementById("productModal");
    modal.dataset.productId = id;
    // Ensure base price saved

    const inlinePrice = document.getElementById("inline-price");
    inlinePrice.dataset.base = Number(price);
    inlinePrice.textContent = price + ":-";

    // Attach + and - controls once
    setupQuantityButtons();
  };
}

// -------------------- Quantity Buttons --------------------
function setupQuantityButtons() {
  const quantity = document.getElementById("quantity");
  const inlinePrice = document.getElementById("inline-price");
  const base = Number(inlinePrice.dataset.base);

  document.getElementById("increase").onclick = () => {
    let qty = Number(quantity.textContent) + 1;
    quantity.textContent = qty;
    inlinePrice.textContent = qty * base + ":-";
  };

  document.getElementById("decrease").onclick = () => {
    let qty = Number(quantity.textContent);
    if (qty > 1) qty--;
    quantity.textContent = qty;
    inlinePrice.textContent = qty * base + ":-";
  };
}

// -------------------- Add to Cart Button --------------------
 function setupAddToCartButton() {
  const btn = document.getElementById("add-to-cart");
if (!btn) return;
  btn.addEventListener("click", () => {
    const modal = document.getElementById("productModal");
    const id = modal.dataset.productId;

    const name = document.getElementById("modal-name").textContent;
    const img = document.getElementById("modal-img").src;
    const qty = Number(document.getElementById("quantity").textContent);
    const basePrice = Number(
      document.getElementById("inline-price").dataset.base
    );

    addItemToCart(id, name, basePrice, img, qty);

    modal.style.display = "none";
  });
}
