
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("productModal");
    const modalName = document.getElementById("modal-name");
    const modalImg = document.getElementById("modal-img");
    const modalPrice = document.getElementById("inline-price");

    
    const favBtn = document.createElement("button");
    favBtn.id = "favorite-btn";
    favBtn.innerHTML = "♡";
    

    // Insert favorite button next to modal name
    // modalName.parentElement.appendChild(favBtn);
    
    document.querySelector(".modal-top-row").appendChild(favBtn);   //Changed by Raheel

    // Load saved favorites and remove null values once
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(item => item && item !== "null");
    localStorage.setItem("favorites", JSON.stringify(favorites));

    function updateHeart() {
    const isFav = favorites.includes(modalName.textContent.trim());
    favBtn.innerHTML = isFav ? "❤️" : "♡";
    favBtn.classList.toggle("active", isFav);  
}


    // Detect when modal opens update heart
    const observer = new MutationObserver(() => {
        if (modal.style.display === "flex") {
            updateHeart();
        }
    });
    observer.observe(modal, { attributes: true, attributeFilter: ["style"] });

    
    favBtn.addEventListener("click", () => {
        const name = modalName.textContent.trim();
        if (!name) return;  // Prevent null from being stored

        if (!favorites.includes(name)) {
            favorites.push(name);
        } else {
            favorites = favorites.filter(item => item !== name);
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
        updateHeart();
    });
});




