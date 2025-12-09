/* const favorites = [];
const favButtons = document.querySelectorAll('.favorite-btn');
const favoriteList = document.querySelector('.favorite-items');
const modalFavoriteBtn = document.getElementById("modalFavoriteBtn");



favButtons.forEach(button => {
    button.addEventListener('click', (event)=>{

        const itemId = event.target.dataset.id;
        favorites.push(itemId);
        console.log(favorites);

      
      localStorage.setItem("favorites", JSON.stringify(favorites));
      const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    })
})
 */// ===== FAVORITES FEATURE =====

// Load existing favorites from localStorage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Function to attach click listeners to all favorite buttons
function setupFavoriteButtons() {
  const favButtons = document.querySelectorAll('.favorite-btn');

  favButtons.forEach(button => {
    const itemId = button.dataset.id;

    // Set initial heart state
    if (favorites.includes(itemId)) {
      button.textContent = "❤️";
    } else {
      button.textContent = "♡";
    }

    // Add click listener
    button.addEventListener('click', () => {
      const index = favorites.indexOf(itemId);

      if (index > -1) {
        // Remove from favorites
        favorites.splice(index, 1);
        button.textContent = "♡";
      } else {
        // Add to favorites
        favorites.push(itemId);
        button.textContent = "❤️";
      }

      // Save updated favorites
      localStorage.setItem("favorites", JSON.stringify(favorites));
      console.log("Favorites:", favorites);
    });
  });
}

// Initialize after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setupFavoriteButtons();
});





