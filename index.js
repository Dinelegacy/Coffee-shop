// Button Table
document.querySelector("#buttonTable").onclick = (event) => {
    window.location.href = "menu.html";
};

// Button Menu
document.querySelector("#buttonMenu").onclick = (event) => {
    window.location.href = "menu.html";
};


// Button TakeAway
document.querySelector("#buttonTakeAway").onclick = (event) => {
    window.location.href = "menu.html";
};


// Hamburger Menu
const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
}); 