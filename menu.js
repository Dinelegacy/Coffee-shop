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

// Track currently open tab
let currentlyOpenTab = null;

/* ---------------------------
   INITIALIZE
---------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing...");
  
  // Test elements exist
  if (!document.querySelector('.top-background')) {
    console.error('ERROR: .top-background element not found!');
  }
  
  if (!document.getElementById("menuContainer")) {
    console.error('ERROR: menuContainer not found!');
  }
  
  if (!document.getElementById("productModal")) {
    console.error('ERROR: productModal not found!');
  }
  
  // Initialize functions
  generateMenu();           // Load images and data only
  setupAccordion();         // Setup accordion functionality
  setupProductClicks();     // Setup product click handlers
  setupModalFunctionality(); // Setup modal interactions
  setupFavoriteToggle();    // Setup favorite toggle functionality
  
  // Set default background
  setTopBackground("default");
  
  // Setup Add to Cart button - MOVED INSIDE DOMContentLoaded
  const addToCartBtn = document.getElementById("add-to-cart");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", addToCartHandler);
  } else {
    console.error("Add to Cart button not found!");
  }
  
  console.log("Initialization complete!");
});

/* ---------------------------
   ADD TO CART HANDLER (separate function)
---------------------------- */
function addToCartHandler() {
  const name = document.getElementById("modal-name")?.textContent || "Product";
  const quantity = document.getElementById("quantity")?.textContent || "1";

  const customizePanel = document.getElementById("customize-panel");
  let customizations = [];

  if (customizePanel) {
    // Sugar
    const sugarQty = parseInt(customizePanel.querySelector(".opt-qty[data-opt='sugar']")?.textContent || "0");
    if (sugarQty > 0) customizations.push(`${sugarQty}× Sugar`);

    // Extra shot
    const shotQty = parseInt(customizePanel.querySelector(".opt-qty[data-opt='shot']")?.textContent || "0");
    if (shotQty > 0) customizations.push(`${shotQty}× Extra Shot`);

    // Ice
    const iceBtn = customizePanel.querySelector(".ice-btn.active");
    if (iceBtn) customizations.push(`Ice: ${iceBtn.dataset.ice}`);

    // Lactose-free milk
    const lactose = customizePanel.querySelector(".opt-checkbox[data-opt='lactose']")?.checked;
    if (lactose) customizations.push("Lactose-free milk");

    // Whipped cream
    const whip = customizePanel.querySelector(".opt-checkbox[data-opt='whip']")?.checked;
    if (whip) customizations.push("Whipped cream");
  }

  const customizationText = customizations.length > 0 ? ` (${customizations.join(", ")})` : "";

  // Show toast message
  const toast = document.getElementById("modal-toast");
  if (toast) {
    toast.textContent = `${quantity} × ${name}${customizationText} added to cart`;
    toast.style.display = "block";

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => {
        toast.style.display = "none";
        toast.style.opacity = "1";
      }, 400);
    }, 1400);
  }

  // Close modal after a delay
  const modal = document.getElementById("productModal");
  setTimeout(() => {
    if (modal) modal.style.display = "none";
  }, 1500);
}

/* ---------------------------
   MENU DATA (Only images, names, prices)
---------------------------- */
const menuData = {
  promotions: {
    items: [
      { img: "assets/menu/Gingerbread Milkshake Mocktail.jpg", name: "Gingerbread Milkshake Mocktail", price: "45:-" },
      { img: "assets/menu/Sandman Latte with gräde.jpg", name: "Sandman latte with Gräde", price: "45:-" },
      { img: "assets/menu/xmas reindeer.jpg", name: "Xmas Reindeer", price: "45:-" },
      { img: "assets/menu/Cappuccino with ginger man.jpg", name: "Cappucciano with ginger man", price: "40:-"},
      { img: "assets/menu/Hot chocolate with marshmellow.jpg", name: "Hot Chocolate with Marshmellow", price: "45:-"},
      { img: "assets/menu/Wizard's Coffee with milk.jpg", name: "Wizard's Coffe with milk", price: "45:-"},
      { img: "assets/menu/Spiced Rum Coffee.jpg", name: "Spiced Rum coffee", price: "45:-"},
      { img: "assets/menu/Christmas Chai Latte.jpg", name: "Christmas Chai Latte", price: "40:-"},
      { img: "assets/menu/Pumpkin Spice Latte.jpg", name: "Pumpkin Spice Latte", price: "40:-"}
    ]
  },
  coffee: {
    items: [
      { img: "assets/menu/hot cocoa.jpg", name: "Hot Cocoa", price: "35:-" },
      { img: "assets/menu/Hazelnut Tiramisu Irish Coffee.jpg", name: "Hazelnut Tiramisu Irish Coffee", price: "40:-" },
      { img: "assets/menu/Classic Irish Coffee.jpg", name: "Classic Irish Coffee", price: "42:-"},
      { img: "assets/menu/Irish Coffee.jpg", name: "Irish Coffee", price: "35:-"},
      { img: "assets/menu/Coffee Americano.jpg", name: "Coffee Americano", price: "40:-"},
      { img: "assets/menu/Coffee Latte.jpg", name: "Coffee Latte", price: "42:-"},
      { img: "assets/menu/black coffee.jpg", name: "Black Coffee", price: "35:-"},
      { img: "assets/menu/Brown Sugar Shaken Espresso.jpg", name: "Brown Sugar Shaken Espresso", price: "40:-"},
      { img: "assets/menu/Cortado.jpg", name: "Cortado", price: "42:-"},
      { img: "assets/menu/Flat White.jpg", name: "Flat White", price: "35:-"},
      { img: "assets/menu/Latte Macchiato.jpg", name: "Latte Macchiato", price: "40:-"},
      { img: "assets/menu/Cinnamon Cappuccino.jpg", name: "Cinnamon Cappuccino", price: "42:-"},
      { img: "assets/menu/Hot chocolate coffe.jpg", name: "Hot chocolate coffe", price: "35:-"},
      { img: "assets/menu/Hot Mocha Coffee.jpg", name: "Hot Mocha Coffee", price: "40:-"},
      { img: "assets/menu/Espresso.jpg", name: "Espresso", price: "42:-"},
      { img: "assets/menu/Cappuccino.jpg", name: "Cappuccino", price: "42:-"}
    ]
  },
  tea: {
    items: [
      { img: "assets/menu/Orange Spiced Black Tea.jpg", name: "Orange Spiced Black Tea", price: "28:-" },
      { img: "assets/menu/Tea with lemon.jpg", name: "Tea with lemon", price: "30:-"},
      { img: "assets/menu/Green Tea.jpg", name: "Green Tea", price: "32:-"}
    ]
  },
  smoothies: {
    items: [
      { img: "assets/menu/Iced Matcha Latte.jpg", name: "Iced Matcha Latte", price: "55:-" },
      { img: "assets/menu/Iced Brown Sugar Matcha Latte.jpg", name: "Iced Brown Sugar Matcha Latte", price: "58:-"},
      { img: "assets/menu/Velvety Chocolate Hazelnut Milkshake.jpg", name: "Velvety Chocolate Hazelnut Milkshake", price: "52:-"},
      { img: "assets/menu/Peanut Butter Frappuccino.jpg", name: "Peanut Butter Frappuccino", price: "55:-"},
      { img: "assets/menu/Rich Latte.jpg", name: "Rich Latte", price: "58:-"},
      { img: "assets/menu/Caramel Iced Coffee.jpg", name: "Caramel Iced Coffee", price: "52:-"},
      { img: "assets/menu/Lincoln Mint Mocha.jpg", name: "Lincoln Mint Mocha", price: "55:-"},
      { img: "assets/menu/Black Gold Iced Coffee.jpg", name: "Black Gold Iced Coffee", price: "58:-"},
      { img: "assets/menu/Chocolate Chip Frappuccino.jpg", name: "Chocolate Chip Frappuccino", price: "52:-"},
      { img: "assets/menu/Iced Coffee Mojito.jpg", name: "Iced Coffee Mojito", price: "55:-"},
      { img: "assets/menu/Mojito Espresso.jpg", name: "Mojito Espresso", price: "58:-"},
      { img: "assets/menu/Coffee Mojito.jpg", name: "Coffee Mojito", price: "52:-"},
      { img: "assets/menu/MANGO MILKSHAKE.jpg", name: "Mango Milkshake", price: "55:-"},
      { img: "assets/menu/Whipped Dalgona Coffee.jpg", name: "Whipped Dalgona Coffee", price: "58:-"}
    ]
  },
  snacks: {
    items: [
      { img: "assets/menu/Lemon Cheesecake.jpg", name: "Lemon Cheesecake", price: "25:-" },
      { img: "assets/menu/Espresso Chocolate Cheesecake.jpg", name: "Espresso Chocolate Cheesecake", price: "22:-"},
      { img: "assets/menu/Creamy Cheesecake with strawberry.jpg", name: "Creamy Cheesecake with strawberry", price: "30:-"},
      { img: "assets/menu/Chocolate croissant.jpg", name: "Chocolate Croissant", price: "25:-"},
      { img: "assets/menu/croissant sandwich.jpg", name: "Croissant Sandwich", price: "22:-"},
      { img: "assets/menu/Ham Cheese And Lettuce Sandwich.jpg", name: "Ham Cheese And Lettuce Sandwich", price: "30:-"},
      { img: "assets/menu/Pistachio Croissant.jpg", name: "Pistachio Croissant", price: "25:-"},
      { img: "assets/menu/Coconut matcha cream pie.jpg", name: "Coconut matcha cream pie", price: "22:-"},
      { img: "assets/menu/chocolate donat.jpg", name: "Chocolate Donut", price: "30:-"},
      { img: "assets/menu/Spiced Apple Cider Donuts with Caramel Glaze.jpg", name: "Spiced Cider Donuts with Caramel Glaze", price: "25:-"},
      { img: "assets/menu/Red Velvet Strawberry Cheesecake.jpg", name: "Red Velvet Strawberry Cheesecake", price: "22:-"},
      { img: "assets/menu/Black Forest Cake Roll.jpg", name: "Black Forest Cake Roll", price: "30:-"},
      { img: "assets/menu/tiramisu mousse cake.jpg", name: "tiramisu mousse cake", price: "25:-"},
      { img: "assets/menu/Dark Chocolate Bars with Pistachio Paste Filling.jpg", name: "Dark Chocolate Bars with Pistachio", price: "22:-"},
      { img: "assets/menu/Chocolate Cake with Strawberries.jpg", name: "Chocolate Cake with Strawberries", price: "30:-"}
    ]
  }
};

/* ---------------------------
   GENERATE MENU (Only loads images/data)
---------------------------- */
function generateMenu() {
  const container = document.getElementById("menuContainer");
  if (!container) return;
  
  container.innerHTML = "";
  
  for (const category in menuData) {
    const accordion = document.createElement("div");
    accordion.className = "accordion";
    accordion.dataset.category = category;
    
    const header = document.createElement("div");
    header.className = "accordion-header";
    header.innerHTML = `<span>${category.toUpperCase()}</span><span>▼</span>`;
    
    const content = document.createElement("div");
    content.className = "accordion-content";
    
    menuData[category].items.forEach(item => {
      const product = document.createElement("div");
      product.className = "product";
      product.dataset.name = item.name;
      product.dataset.price = item.price;
      product.dataset.img = item.img;
      
      product.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <span>${item.name}</span>
        <span>${item.price}</span>
      `;
      content.appendChild(product);
    });
    
    accordion.appendChild(header);
    accordion.appendChild(content);
    container.appendChild(accordion);
  }
}

/* ---------------------------
   SETUP ACCORDION
---------------------------- */
function setupAccordion() {
  const container = document.getElementById("menuContainer");
  if (!container) return;
  
  // Get headers AFTER generateMenu() created them
  const accordionHeaders = container.querySelectorAll('.accordion-header');
  
  // Accordion click functionality
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const arrow = header.querySelector('span:last-child');
      const categoryName = header.parentElement.dataset.category;
      
      const isCurrentlyOpen = content.classList.contains('active');
      
      if (isCurrentlyOpen) {
        // Close this tab
        content.style.display = 'none';
        content.classList.remove('active');
        arrow.textContent = '▼';
        header.classList.remove('active');
        currentlyOpenTab = null;
        
        // Check if any tab is still open
        let anyTabOpen = false;
        container.querySelectorAll('.accordion-content').forEach(sec => {
          if (sec.classList.contains('active')) anyTabOpen = true;
        });
        
        if (!anyTabOpen) {
          setTopBackground("default");
        }
      } else {
        // Close all other accordions
        container.querySelectorAll('.accordion-content').forEach(sec => {
          sec.style.display = 'none';
          sec.classList.remove('active');
        });
        
        // Reset all headers and arrows
        container.querySelectorAll('.accordion-header').forEach(h => {
          h.classList.remove('active');
        });
        
        container.querySelectorAll('.accordion-header span:last-child').forEach(a => {
          a.textContent = '▼';
        });
        
        // Open clicked accordion
        content.style.display = 'block';
        content.classList.add('active');
        arrow.textContent = '▲';
        header.classList.add('active');
        currentlyOpenTab = categoryName;
        setTopBackground(categoryName);
      }
    });
  });
}

/* ---------------------------
   SETUP PRODUCT CLICKS
---------------------------- */
function setupProductClicks() {
  const container = document.getElementById("menuContainer");
  if (!container) return;
  
  container.addEventListener("click", (e) => {
    const product = e.target.closest(".product");
    if (!product) return;
    
    const name = product.dataset.name;
    const price = product.dataset.price;
    const img = product.dataset.img;
    
    showModal(name, price, img);
  });
}

/* ---------------------------
   SHOW MODAL
---------------------------- */
function showModal(name, price, img) {
  const modal = document.getElementById("productModal");
  if (!modal) return;
  
  // Update modal content
  const modalImg = document.getElementById("modal-img");
  const modalName = document.getElementById("modal-name");
  const modalPrice = document.getElementById("modal-price");
  
  if (modalImg) modalImg.src = img;
  if (modalName) modalName.textContent = name;
  if (modalPrice) modalPrice.textContent = price;
  
  // Reset quantity
  const quantity = document.getElementById("quantity");
  if (quantity) quantity.textContent = "1";
  
  // Reset favorite button for this product
  const favoriteBtn = document.getElementById("favorite-btn");
  const heartPath = document.querySelector(".heart-path");
  if (favoriteBtn && heartPath) {
    favoriteBtn.classList.remove("favorited");
    heartPath.setAttribute("stroke", "#c67500");
    heartPath.setAttribute("fill", "none");
  }
  
  // Reset customization panel
  const panel = document.getElementById("customize-panel");
  if (panel) {
    panel.style.display = "none";
    panel.querySelectorAll(".opt-qty").forEach(el => el.textContent = "0");
    panel.querySelectorAll(".opt-checkbox").forEach(cb => cb.checked = false);
    panel.querySelectorAll(".ice-btn").forEach(btn => btn.classList.remove("active"));
  }
  
  // Show modal
  modal.style.display = "flex";
}

/* ---------------------------
   SETUP FAVORITE TOGGLE FUNCTIONALITY
---------------------------- */
function setupFavoriteToggle() {
  const favoriteBtn = document.getElementById("favorite-btn");
  if (!favoriteBtn) return;
  
  favoriteBtn.addEventListener("click", function() {
    const heartPath = document.querySelector(".heart-path");
    if (!heartPath) return;
    
    // Check if currently favorited
    const isFavorited = favoriteBtn.classList.contains("favorited");
    
    if (isFavorited) {
      // Even click - remove from favorites
      favoriteBtn.classList.remove("favorited");
      heartPath.setAttribute("stroke", "#c67500");
      heartPath.setAttribute("fill", "none");
      console.log("Product removed from favorites");
    } else {
      // Odd click - add to favorites
      favoriteBtn.classList.add("favorited");
      heartPath.setAttribute("stroke", "#ff4444");
      heartPath.setAttribute("fill", "#ff4444");
      console.log("Product added to favorites");
    }
    
    // Optional: Add animation effect
    favoriteBtn.style.transform = "scale(1.2)";
    setTimeout(() => {
      favoriteBtn.style.transform = "scale(1)";
    }, 200);
  });
}

/* ---------------------------
   SETUP MODAL FUNCTIONALITY
---------------------------- */
function setupModalFunctionality() {
  const modal = document.getElementById("productModal");
  if (!modal) {
    console.error("Modal not found!");
    return;
  }
  
  // Close modal
  const closeBtn = modal.querySelector(".close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  } else {
    console.error("Close button not found!");
  }
  
  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
  
  // Quantity controls
  const increaseBtn = document.getElementById("increase");
  const decreaseBtn = document.getElementById("decrease");
  const quantity = document.getElementById("quantity");
  
  if (increaseBtn && quantity) {
    increaseBtn.addEventListener("click", () => {
      quantity.textContent = parseInt(quantity.textContent) + 1;
    });
  } else {
    console.error("Increase button or quantity element not found!");
  }
  
  if (decreaseBtn && quantity) {
    decreaseBtn.addEventListener("click", () => {
      const val = parseInt(quantity.textContent) - 1;
      quantity.textContent = val < 1 ? 1 : val;
    });
  } else {
    console.error("Decrease button or quantity element not found!");
  }
  
  // Toggle customize panel
  const customizeToggle = document.getElementById("customize-toggle");
  const customizePanel = document.getElementById("customize-panel");
  
  if (customizeToggle && customizePanel) {
    customizeToggle.addEventListener("click", () => {
      if (customizePanel.style.display === "none" || customizePanel.style.display === "") {
        customizePanel.style.display = "block";
      } else {
        customizePanel.style.display = "none";
      }
    });
  }
  
  // Customization controls
  if (customizePanel) {
    customizePanel.addEventListener("click", (e) => {
      // Sugar controls
      if (e.target.classList.contains("opt-plus") && e.target.dataset.opt === "sugar") {
        const qty = customizePanel.querySelector(".opt-qty[data-opt='sugar']");
        const checkbox = customizePanel.querySelector(".opt-checkbox[data-opt='sugar']");

        if (qty) qty.textContent = parseInt(qty.textContent) + 1;
        if (checkbox) checkbox.checked = true;
      }
      
      if (e.target.classList.contains("opt-minus") && e.target.dataset.opt === "sugar") {
        const qty = customizePanel.querySelector(".opt-qty[data-opt='sugar']");
        const checkbox = customizePanel.querySelector(".opt-checkbox[data-opt='sugar']");

        if (qty) {
          const val = parseInt(qty.textContent) - 1;
          qty.textContent = val < 0 ? 0 : val;

          if (val <= 0 && checkbox) checkbox.checked = false;
        }
      }
      
      // Shot controls
      if (e.target.classList.contains("opt-plus") && e.target.dataset.opt === "shot") {
        const qty = customizePanel.querySelector(".opt-qty[data-opt='shot']");
        const checkbox = customizePanel.querySelector(".opt-checkbox[data-opt='shot']");

        if (qty) qty.textContent = parseInt(qty.textContent) + 1;
        if (checkbox) checkbox.checked = true;
      }
      
      if (e.target.classList.contains("opt-minus") && e.target.dataset.opt === "shot") {
        const qty = customizePanel.querySelector(".opt-qty[data-opt='shot']");
        const checkbox = customizePanel.querySelector(".opt-checkbox[data-opt='shot']");

        if (qty) {
          const val = parseInt(qty.textContent) - 1;
          qty.textContent = val < 0 ? 0 : val;

          if (val <= 0 && checkbox) checkbox.checked = false;
        }
      }
      
      // Ice buttons
      if (e.target.closest(".ice-btn")) {
        const btn = e.target.closest(".ice-btn");
        customizePanel.querySelectorAll(".ice-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      }
    });
  }
}