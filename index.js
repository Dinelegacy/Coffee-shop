// Hamburger Menu
const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener('click', () => {
    // Toggle hamburger menu
    const isActive = hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');

    if (isActive) {
        // Close all open product accordions
        document.querySelectorAll(".accordion-content.active").forEach(content => {
            content.style.display = "none";
            content.classList.remove("active");
        });

        // Reset all arrows
        document.querySelectorAll(".accordion-header span:last-child").forEach(arrow => {
            arrow.textContent = "▼";
        });

        // Hide any open product modal
        const modal = document.getElementById("productModal");
        if (modal) modal.style.display = "none";
    }
});

// Button Table
const buttonTable = document.querySelector("#buttonTable");
if (buttonTable) buttonTable.onclick = () => window.location.href = "menu.html";

// Button Menu
const buttonMenu = document.querySelector("#buttonMenu");
if (buttonMenu) buttonMenu.onclick = () => window.location.href = "menu.html";

// Button TakeAway
const buttonTakeAway = document.querySelector("#buttonTakeAway");
if (buttonTakeAway) buttonTakeAway.onclick = () => window.location.href = "menu.html";
