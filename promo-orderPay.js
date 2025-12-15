 import { addItemToCart } from "./cart-handler.js";
import { updateBagCount } from "./cart-handler.js";

document.addEventListener("DOMContentLoaded", () => {
  updateBagCount();

  const bagIcon = document.getElementById("bagIcon");
  if (bagIcon) {
    bagIcon.style.cursor = "pointer";
    bagIcon.addEventListener("click", () => {
      window.location.href = "./cart.html";
    });
  }
  
});

 document.getElementById("button1").addEventListener("click", (e) => {
  const btn = e.currentTarget;

  addItemToCart(
    btn.dataset.id,
  btn.dataset.name,
  btn.dataset.price,
  btn.dataset.img,
  1
  );

  window.location.href = "./cart.html";
});
