
 document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("productModal");
  const modalName = document.getElementById("modal-name");
  const modalImg = document.getElementById("modal-img");
  const modalPrice = document.getElementById("inline-price");

  if (!modal || !modalName || !modalImg || !modalPrice) return;

  const favBtn = document.createElement("button");
  favBtn.id = "favorite-btn";
  modalName.parentElement.appendChild(favBtn);

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  function isFavorite(id) {
    return favorites.some(item => item.id === id);
  }

  function renderHeart() {
    const id = modal.dataset.productId;  

    favBtn.innerHTML = "";
    const img = document.createElement("img");
 
    img.src = isFavorite(id)
      ? "./assets/functional-icons/Favorite-fill-orange.svg"
      : "./assets/functional-icons/Favorite Heart-icon Orange.svg";

    favBtn.appendChild(img);
  }

  
  const observer = new MutationObserver(() => {
    if (modal.style.display === "flex") {
      renderHeart();
    }
  });

  observer.observe(modal, { attributes: true, attributeFilter: ["style"] });

  // Toggle favorite
  favBtn.addEventListener("click", () => {
    const id = modal.dataset.productId;  
    if (!id) return;

    const name = modalName.textContent.trim();
    const price = Number(modalPrice.dataset.base);

    const image = modalImg.src;

    if (!isFavorite(id)) {
      favorites.push({ id, name, price, image });
    } else {
      favorites = favorites.filter(item => item.id !== id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderHeart();
  });
});

