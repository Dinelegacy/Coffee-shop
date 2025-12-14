document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     HAMBURGER MENU
  ========================== */
  const menu = document.querySelector(".off-screen-menu");
  const hamburger = document.querySelector(".hamburger");

  if (menu && hamburger) {
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  /* =========================
     MODAL + FAVORITES
  ========================== */
  const modal = document.getElementById("productModal");
  const modalName = document.getElementById("modal-name");
  const modalImg = document.getElementById("modal-img");
  const modalPrice = document.getElementById("inline-price");

  if (!modal || !modalName || !modalImg || !modalPrice) return;

  // Create favorite button
  const favBtn = document.createElement("button");
  favBtn.id = "favorite-btn";

  // Insert favorite button next to modal name
  modalName.parentElement.appendChild(favBtn);

  // Load favorites
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter(item => item && item !== "null");
  localStorage.setItem("favorites", JSON.stringify(favorites));

  function isFavorite(name) {
    return favorites.some(item => item.name === name);
  }

  function updateHeart() {
    const name = modalName.textContent.trim();
    const isFav = isFavorite(name);

    favBtn.innerHTML = "";

    if (isFav) {
      favBtn.textContent = "❤️";
    } else {
      const img = document.createElement("img");
      img.src = "assets/functional-icons/Favorite-heart-orange.svg";
      img.alt = "favorite";
      favBtn.appendChild(img);
    }

    favBtn.classList.toggle("active", isFav);
  }

  // Watch modal open
  const observer = new MutationObserver(() => {
    if (modal.style.display === "flex") {
      updateHeart();
    }
  });

  observer.observe(modal, {
    attributes: true,
    attributeFilter: ["style"]
  });

  // Toggle favorite
  favBtn.addEventListener("click", () => {
    const name = modalName.textContent.trim();
    const price = modalPrice.textContent.trim();
    const image = modalImg.src;

    if (!name) return;

    if (!isFavorite(name)) {
      favorites.push({ name, price, image });
    } else {
      favorites = favorites.filter(item => item.name !== name);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateHeart();
  });

});
