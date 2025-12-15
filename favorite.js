document.addEventListener("DOMContentLoaded", () => {

  //Hamburger section 

  const menu = document.querySelector(".off-screen-menu");
  const hamburger = document.querySelector(".hamburger");

  if (menu && hamburger) {
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  //Modal and favorite section

  const modal = document.getElementById("productModal");
  const modalName = document.getElementById("modal-name");
  const modalImg = document.getElementById("modal-img");
  const modalPrice = document.getElementById("inline-price");

  if (modal && modalName && modalImg && modalPrice) {

    const favBtn = document.createElement("button");
    favBtn.id = "favorite-btn";
    modalName.parentElement.appendChild(favBtn);

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

  const img = document.createElement("img");

  if (isFav) {
    
    img.src = "assets/functional-icons/Favorite-fill-orange.svg";
    img.alt = "remove from favorites";
  } else {
    
    img.src = "assets/functional-icons/Favorite-heart-orange.svg";
    img.alt = "add to favorites";
  }

  favBtn.appendChild(img);
  favBtn.classList.toggle("active", isFav);
}


    const observer = new MutationObserver(() => {
      if (modal.style.display === "flex") {
        updateHeart();
      }
    });

    observer.observe(modal, { attributes: true, attributeFilter: ["style"] });

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
  }

  // favorite page section 

  const favoriteContainer = document.getElementById("favorite-container");
  if (!favoriteContainer) return;

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  function renderFavorites() {
  if (favorites.length === 0) {
    favoriteContainer.innerHTML = `
      <p style="text-align:center; margin-top:2rem;">
        Your favorites list is empty 
      </p>
    `;
    return;
  }

  favoriteContainer.innerHTML = favorites
    .map((item, index) => `
      <div class="favorite-item" data-index="${index}">
        <img src="${item.image}" alt="${item.name}">
        <div class="favorite-info">
          <h3>${item.name}</h3>
          <p>${item.price}</p>
        </div>
        <div class="favorite-buttons">
          <button class="add-favorite">+ Add</button>
          <button class="remove-favorite">Remove</button>
        </div>
      </div>
    `)
    .join("");
}

  renderFavorites();

  favoriteContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".remove-favorite");
    if (!btn) return;

    const item = btn.closest(".favorite-item");
    const index = item.dataset.index;

    favorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  });

});


