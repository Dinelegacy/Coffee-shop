 import {addItemToCart} from "./cart-handler.js";
 import { updateBagCount} from "./cart-handler.js"

 


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

const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
}); 



 document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("favorite-container");

  // 🔒 Guard: run ONLY on favorites page
  if (!container) return;

  // Load favorites
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // 🧹 Clean old/broken data
  favorites = favorites.filter(item =>
    item &&
    item.id &&
    item.name &&
    item.image &&
    item.price
  );

  localStorage.setItem("favorites", JSON.stringify(favorites));

 
  function renderFavorites() {
    if (favorites.length === 0) {
      container.innerHTML = `
        <p class="empty-cart-message">
          Your favorites list is empty
        </p>
      `;
      return;
    }

    container.innerHTML = favorites.map(item => `
      <div class="favorite-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}">
        
        <div class="favorite-info">
          <h3>${item.name}</h3>
          <p>${item.price}</p>
        </div>

        <div class="favorite-buttons">
          <button type="button" class="add">+ Add</button>
          <button type="button" class="remove">Remove</button>
        </div>
      </div>
    `).join("");
  }

  renderFavorites();

 
  container.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button) return;

    const itemEl = button.closest(".favorite-item");
    if (!itemEl) return;

    const id = itemEl.dataset.id;
    const product = favorites.find(f => f.id === id);
    if (!product) return;

    
    if (button.classList.contains("remove")) {
      favorites = favorites.filter(f => f.id !== id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      renderFavorites();
      return;
    }

    
    if (button.classList.contains("add")) {
      addItemToCart(
        product.id,
        product.name,
        Number(product.price), // ensure number
        product.image,
        1
      );
    }
  });
});
