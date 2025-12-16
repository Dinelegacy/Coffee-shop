// favorite-cart.js
import { addItemToCart , updateBagCount } from "./cart-handler.js";

 
document.addEventListener("DOMContentLoaded", () => {
  
  updateBagCount();

  const bagIcon = document.getElementById("bagIcon");
  if (bagIcon) {
    bagIcon.style.cursor = "pointer";
    bagIcon.addEventListener("click", () => {
      window.location.href = "./cart.html";
    });
  }

  const favoriteContainer = document.getElementById("favorite-container");
  if (!favoriteContainer) return;

  favoriteContainer.addEventListener("click", (buttonFavorite) => {
    const btn = buttonFavorite.target.closest(".add-favorite");
    if (!btn) return;

    const item = btn.closest(".favorite-item");
    if (!item) return;

    const index = item.dataset.index;
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favItem = favorites[index];
    if (!favItem) return;

     const id = favItem.name.trim().toLowerCase().replace(/\s+/g, "-");


    addItemToCart(
      id,
      favItem.name,
      parseFloat(favItem.price),
      favItem.image,
      1
    );
  });
});

