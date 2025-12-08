const favorites = [];
const favButtons = document.querySelectorAll('.favorite-btn');

favButtons.forEach(button => {
    button.addEventListener('click', (event)=>{

        const itemId = event.target.dataset.id;
        favorites.push(itemId);
        console.log(favorites);

      
      localStorage.setItem("favorites", JSON.stringify(favorites));
      const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    })
})



