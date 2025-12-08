const favorites = [menuData];
const favButtons = document.querySelectorAll('.favorite-btn');
const favoriteList = document.querySelector('.favorite-items');


favButtons.forEach(button => {
    button.addEventListener('click', (event)=>{

        const itemId = event.target.dataset.id;
        favorites.push(itemId);
        console.log(favorites);

      
      localStorage.setItem("favorites", JSON.stringify(favorites));
      const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    })
})



