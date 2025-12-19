 document.querySelector('#button2').onclick = (event) => {
    window.location.href = "menu.html";
};

// Hamburger Menu
const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener('click', () => {
    // Toggle hamburger menu
    const isActive = hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
}