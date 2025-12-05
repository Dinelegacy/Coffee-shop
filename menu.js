// Background images for each section - for the top background
const backgrounds = {
  default: "assets/menu/menu1.png", // Default when no tab is open
  promotions: "assets/menu/promotions.jpg",
  coffee: "assets/menu/coffee1.jpg",
  tea: "assets/menu/tea.jpg",
  smoothies: "assets/menu/cold-drinks.jpg",
  snacks: "assets/menu/factory.jpg"
};

// Apply background ONLY to top section
function setTopBackground(type) {
  const topBg = document.querySelector('.top-background');
  const imageUrl = backgrounds[type] || backgrounds.default;
  topBg.style.backgroundImage = `url(${imageUrl})`;
}

// Set default background initially
setTopBackground("default");

// Accordion logic with color change
const accordionHeaders = document.querySelectorAll('.accordion-header');

// Store original colors for resetting
const originalBgColor = 'rgba(0,0,0,0.8)';
const activeBgColor = '#d4801f'; // Orange color for active tab

// Track currently open tab
let currentlyOpenTab = 'promotions'; // Default open tab

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    const arrow = header.querySelector('span');
    const categoryName = header.textContent.trim().split(" ")[0].toLowerCase();

    // Check if this tab is already open
    const isCurrentlyOpen = (content.style.display === 'block');

    // If this tab is already open, close it
    if (isCurrentlyOpen) {
      content.style.display = 'none';
      arrow.textContent = '▼';
      header.style.background = originalBgColor;
      currentlyOpenTab = null;
      
      // Check if any tab is still open
      let anyTabOpen = false;
      document.querySelectorAll('.accordion-content').forEach(sec => {
        if (sec.style.display === 'block') anyTabOpen = true;
      });
      
      // If no tabs are open, show default background
      if (!anyTabOpen) {
        setTopBackground("default");
      }
    } 
    // If this tab is closed, open it and close others
    else {
      // Close all other accordions
      document.querySelectorAll('.accordion-content').forEach(sec => {
        sec.style.display = 'none';
      });
      
      // Reset all arrows and backgrounds
      document.querySelectorAll('.accordion-header span').forEach(a => {
        a.textContent = '▼';
      });
      accordionHeaders.forEach(h => {
        h.style.background = originalBgColor;
      });
      
      // Open this tab
      content.style.display = 'block';
      arrow.textContent = '▲';
      header.style.background = activeBgColor;
      currentlyOpenTab = categoryName;
      
      // Set background for this tab
      setTopBackground(categoryName);
    }
  });
});

// Initialize first accordion (PROMOTIONS) as open by default
document.querySelector('.accordion-content').style.display = 'block';
document.querySelector('.accordion-header').style.background = activeBgColor;
document.querySelector('.accordion-header span').textContent = '▲';
setTopBackground("promotions");

