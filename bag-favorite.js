 // bag-favorite.js
import { addItemToCart, updateBagCount } from "./cart-handler.js";

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

  favoriteContainer.addEventListener("click", (favoriteButton) => {
    const btn = favoriteButton.target.closest(".add-favorite");
    if (!btn) return;

    const item = btn.closest(".favorite-item");
    if (!item) return;

    const index = Number(item.dataset.index);
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favItem = favorites[index];
    if (!favItem) return;

     
    const id = favItem.name.trim().toLowerCase().replace(/\s+/g, "-");

     
    const cleanPrice = Number(
      String(favItem.price).replace(/[^\d.]/g, "")
    );

    if (isNaN(cleanPrice)) {
      console.error("Invalid price:", favItem.price);
      return;
    }

    addItemToCart(
      id,
      favItem.name,
      cleanPrice,
      favItem.image,
      1
    );
  });
});
