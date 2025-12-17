// ============================================================================
// SECTION 1: BACKGROUND IMAGES CONFIGURATION
//   const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
});  
// This object stores all background image paths for different menu categories
// WHY AT TOP: Constants should be defined before they're used anywhere in the code
const backgrounds = {
  default: "assets/menu/menu_covers/Menu-Covers.jpg",       // Default background image
  promotions: "assets/menu/menu_covers/Promo.jpg",          // Promotions category background
  coffee: "assets/menu/menu_covers/coffee.jpg",             // Coffee category background
  tea: "assets/menu/menu_covers/tea.jpg",                   // Tea category background
  smoothies: "assets/menu/menu_covers/smoothie.jpg",        // Smoothies category background
  snacks: "assets/menu/menu_covers/snaks3.jpg"              // Snacks category background
};

// ============================================================================
// SECTION 2: MAIN INITIALIZATION - DOMContentLoaded Event
// ============================================================================
// 🚨 ABSOLUTE EXECUTION ORDER IS CRITICAL 
// This function MUST execute in this EXACT order because each step DEPENDS on the previous:
// 1. generateMenu() → Creates the HTML structure (NO HTML, NO NOTHING)
// 2. setupAccordion() → Can't add click handlers to elements that don't exist
// 3. setupProductClicks() → Products are inside accordions, which need to exist first
// 4. setupQuantityButtons() → Modal buttons need event handlers
// 5. setupModalFunctionality() → Final setup after all content exists
// Add an event listener that fires when the HTML document has been completely loaded and parsed

document.addEventListener("DOMContentLoaded", () => { // Wait for DOM to be fully loaded
  generateMenu(); // STEP 1: Create HTML menu structure first
  setupAccordion(); // STEP 2: Add accordion behavior to the structure
  setupProductClicks(); // STEP 3: Make products clickable to open modal
  setupQuantityButtons(); // STEP 4: Setup + and - buttons in modal
  setupModalFunctionality(); // STEP 5: Setup modal closing functionality
});

// ============================================================================
// SECTION 3: SET TOP BACKGROUND FUNCTION
// ============================================================================
// IMPORTANT: This function is defined here (not later) because:
// 1. generateMenu() calls it for promotions category
// 2. setupAccordion() calls it when headers are clicked
// 3. It MUST be defined before those functions execute

function setTopBackground(type) { // Function to change background image based on category
  const bgImg = document.getElementById("bg-image"); // Get background image element
  const url = backgrounds[type] || backgrounds.default; // Get URL or use default
  
  if (bgImg) { // Check if element exists
    bgImg.src = url; // Change the image source
  }
}

// ============================================================================
// SECTION 4: MENU DATA - PRODUCT INFORMATION
// ============================================================================
// ⚠️ DATA STRUCTURE DEFINITION - NO EXECUTION
// This defines the menu structure but doesn't DO anything with it yet
// Placed here because:
// 1. It's pure data (like backgrounds object)
// 2. generateMenu() depends on it
// 3. Keep data definitions together, separate from behavior

const menuData = { // Object containing all menu items organized by category
  promotions: { // Promotions category
    items: [ // Array of promotion items
      { img: "assets/menu/new_pics/ap_squared.jpg", name: "American Pancakes", price: 45 },
      { img: "assets/menu/new_pics/three-cups_squared.jpg", name: "Pay two, get one extra", price: 60 },
      { img: "assets/menu/new_pics/ap_squared.jpg", name: "1 Croissant free, for each coffe", price: 40 },
    ]
  },
  coffee: {
    items: [
      { img: "assets/menu/hot cocoa.jpg", name: "Hot Cocoa", price: 35 },
      { img: "assets/menu/Hazelnut Tiramisu Irish Coffee.jpg", name: "Hazelnut Tiramisu Irish Coffee", price: 40 },
      { img: "assets/menu/Classic Irish Coffee.jpg", name: "Classic Irish Coffee", price: 42},
      { img: "assets/menu/Irish Coffee.jpg", name: "Irish Coffee", price: 35},
      { img: "assets/menu/Coffee Americano.jpg", name: "Coffee Americano", price: 40},
      { img: "assets/menu/Coffee Latte.jpg", name: "Coffee Latte", price: 42},
      { img: "assets/menu/black coffee.jpg", name: "Black Coffee", price: 35},
      { img: "assets/menu/Brown Sugar Shaken Espresso.jpg", name: "Brown Sugar Shaken Espresso", price: 40},
      { img: "assets/menu/Cortado.jpg", name: "Cortado", price: 42},
      { img: "assets/menu/Flat White.jpg", name: "Flat White", price: 35},
      { img: "assets/menu/Latte Macchiato.jpg", name: "Latte Macchiato", price: 40},
      { img: "assets/menu/Cinnamon Cappuccino.jpg", name: "Cinnamon Cappuccino", price: 42},
      { img: "assets/menu/Hot chocolate coffe.jpg", name: "Hot chocolate coffe", price: 35},
      { img: "assets/menu/Hot Mocha Coffee.jpg", name: "Hot Mocha Coffee", price: 40},
      { img: "assets/menu/Espresso.jpg", name: "Espresso", price: 42},
      { img: "assets/menu/Cappuccino.jpg", name: "Cappuccino", price: 42}
    ]
  },
  tea: {
    items: [
      { img: "assets/menu/Orange Spiced Black Tea.jpg", name: "Orange Spiced Black Tea", price: 28 },
      { img: "assets/menu/Tea with lemon.jpg", name: "Tea with lemon", price: 30},
      { img: "assets/menu/Green Tea.jpg", name: "Green Tea", price: 32}
    ]
  },
  smoothies: {
    items: [
      { img: "assets/menu/Iced Matcha Latte.jpg", name: "Iced Matcha Latte", price: 55 },
      { img: "assets/menu/Iced Brown Sugar Matcha Latte.jpg", name: "Iced Brown Sugar Matcha Latte", price: 58},
      { img: "assets/menu/Velvety Chocolate Hazelnut Milkshake.jpg", name: "Velvety Chocolate Hazelnut Milkshake", price: 52},
      { img: "assets/menu/Peanut Butter Frappuccino.jpg", name: "Peanut Butter Frappuccino", price: 55},
      { img: "assets/menu/Rich Latte.jpg", name: "Rich Latte", price: 58},
      { img: "assets/menu/Caramel Iced Coffee.jpg", name: "Caramel Iced Coffee", price: 52},
      { img: "assets/menu/Lincoln Mint Mocha.jpg", name: "Lincoln Mint Mocha", price: 55},
      { img: "assets/menu/Black Gold Iced Coffee.jpg", name: "Black Gold Iced Coffee", price: 58},
      { img: "assets/menu/Chocolate Chip Frappuccino.jpg", name: "Chocolate Chip Frappuccino", price: 52},
      { img: "assets/menu/Iced Coffee Mojito.jpg", name: "Iced Coffee Mojito", price: 55},
      { img: "assets/menu/Mojito Espresso.jpg", name: "Mojito Espresso", price: 58},
      { img: "assets/menu/Coffee Mojito.jpg", name: "Coffee Mojito", price: 52},
      { img: "assets/menu/MANGO MILKSHAKE.jpg", name: "Mango Milkshake", price: 55},
      { img: "assets/menu/Whipped Dalgona Coffee.jpg", name: "Whipped Dalgona Coffee", price: 58}
    ]
  },
  snacks: {
    items: [
      { img: "assets/menu/Lemon Cheesecake.jpg", name: "Lemon Cheesecake", price: 25 },
      { img: "assets/menu/Espresso Chocolate Cheesecake.jpg", name: "Espresso Chocolate Cheesecake", price: 22},
      { img: "assets/menu/Creamy Cheesecake with strawberry.jpg", name: "Creamy Cheesecake with strawberry", price: 30},
      { img: "assets/menu/Chocolate croissant.jpg", name: "Chocolate Croissant", price: 25},
      { img: "assets/menu/croissant sandwich.jpg", name: "Croissant Sandwich", price: 22},
      { img: "assets/menu/Ham Cheese And Lettuce Sandwich.jpg", name: "Ham Cheese And Lettuce Sandwich", price: 30},
      { img: "assets/menu/Pistachio Croissant.jpg", name: "Pistachio Croissant", price: 25},
      { img: "assets/menu/Coconut matcha cream pie.jpg", name: "Coconut matcha cream pie", price: 22},
      { img: "assets/menu/chocolate donat.jpg", name: "Chocolate Donut", price: 30},
      { img: "assets/menu/Spiced Apple Cider Donuts with Caramel Glaze.jpg", name: "Spiced Cider Donuts with Caramel Glaze", price: 25},
      { img: "assets/menu/Red Velvet Strawberry Cheesecake.jpg", name: "Red Velvet Strawberry Cheesecake", price: 22},
      { img: "assets/menu/Black Forest Cake Roll.jpg", name: "Black Forest Cake Roll", price: 30},
      { img: "assets/menu/tiramisu mousse cake.jpg", name: "tiramisu mousse cake", price: 25},
      { img: "assets/menu/Dark Chocolate Bars with Pistachio Paste Filling.jpg", name: "Dark Chocolate Bars with Pistachio", price: 22},
      { img: "assets/menu/Chocolate Cake with Strawberries.jpg", name: "Chocolate Cake with Strawberries", price: 30}
    ]
  }
};

// ============================================================================
// SECTION 5: GENERATE MENU FUNCTION - THE FOUNDATION
// ============================================================================
// 🔴 MUST BE FUNCTION #1 IN EXECUTION ORDER 🔴
// WHY THIS MUST RUN FIRST:
// 1. Creates ALL HTML elements from scratch
// 2. WITHOUT this, the page is EMPTY - no accordions, no products, NOTHING
// 3. Every other function depends on HTML elements that this function creates
// 4. This is the SOURCE of all DOM elements other functions will manipulate

function generateMenu() { // Function to create the entire menu structure from menuData
  const container = document.getElementById("menuContainer"); // Get the container div
  
  if (!container) return; // Exit if container doesn't exist (defensive programming)
  
  container.innerHTML = ""; // Clear any existing content

  for (const category in menuData) { // Loop through each category in menuData
    const accordion = document.createElement("div"); // Create accordion container div
    accordion.className = "accordion"; // Add CSS class for styling
    accordion.dataset.category = category; // Store category name as data attribute

    const header = document.createElement("div"); // Create clickable header div
    header.className = "accordion-header"; // Add CSS class for styling
    header.innerHTML = `<span>${category.toUpperCase()}</span><span>▼</span>`; // Add header text and arrow

    const content = document.createElement("div"); // Create collapsible content area
    content.className = "accordion-content"; // Add CSS class for styling

    if (category === "promotions") { // Special handling for promotions category
      content.style.display = "block"; // Make content visible immediately
      content.classList.add("active"); // Add 'active' class for CSS styling
      header.classList.add("active"); // Make header look active
      header.querySelector("span:last-child").textContent = "▲"; // Change arrow to up (open state)
      setTopBackground("promotions"); // Set background to promotions image
    }

    menuData[category].items.forEach(item => { // Loop through each item in this category
      const product = document.createElement("div"); // Create product container div
      product.className = "product"; // Add CSS class for styling
      product.dataset.name = item.name; // Store product name as data attribute
      product.dataset.price = item.price; // Store product price as data attribute
      product.dataset.img = item.img; // Store product image path as data attribute

      // Create HTML structure for product display
      product.innerHTML = ` 
        <div class="product-info">
          <img src="${item.img}" alt="${item.name}">              <!-- Product image -->
          <span class="product-name">${item.name}</span>          <!-- Product name -->
        </div>
        <span class="product-price">${item.price}:-</span>        <!-- Product price -->
      `;

      content.appendChild(product); // Add product to content area
    });

    accordion.appendChild(header); // Add header to accordion
    accordion.appendChild(content); // Add content to accordion
    container.appendChild(accordion); // Add accordion to main container
  }
}

// ============================================================================
// SECTION 6: SETUP ACCORDION FUNCTION - ADD BEHAVIOR TO STRUCTURE
// ============================================================================
// 🔴 MUST BE FUNCTION #2 IN EXECUTION ORDER 🔴
// WHY THIS MUST RUN SECOND:
// 1. DEPENDS ON generateMenu() - needs HTML elements to exist
// 2. Adds click event listeners to headers created in Step 1
// 3. WITHOUT this, accordions won't expand/collapse (static page)
// 4. Must run BEFORE setupProductClicks() because products are inside accordions

function setupAccordion() { // Function to add click behavior to accordion headers
  const container = document.getElementById("menuContainer"); // Get the container
  
  if (!container) return; // Exit if container doesn't exist
  
  container.querySelectorAll(".accordion-header").forEach(header => { // Select all headers
    header.addEventListener("click", () => { // Add click event listener to each header
      const content = header.nextElementSibling; // Get content (next element after header)
      const arrow = header.querySelector("span:last-child"); // Get arrow element
      const category = header.parentElement.dataset.category; // Get category name
      const isOpen = content.classList.contains("active"); // Check if accordion is open

      if (isOpen) { // If clicking an open accordion, close it
        content.style.display = "none"; // Hide content
        content.classList.remove("active"); // Remove active styling
        header.classList.remove("active"); // Remove active styling from header
        arrow.textContent = "▼"; // Change arrow to down (closed state)
        
        if (category === "promotions") { // If closing promotions
          setTopBackground("default"); // Set background to default
        } else { // If closing another category
          const promotionsAccordion = container.querySelector('[data-category="promotions"]'); // Find promotions
          if (promotionsAccordion) { // If promotions exists
            const promotionsContent = promotionsAccordion.querySelector(".accordion-content"); // Get promotions content
            if (promotionsContent.classList.contains("active")) { // If promotions is open
              setTopBackground("promotions"); // Set background to promotions
            } else { // If promotions is closed
              setTopBackground("default"); // Set background to default
            }
          }
        }
        return; // Exit function early
      }

      // Close all other accordions first
      container.querySelectorAll(".accordion-content").forEach(c => { // Loop through all content areas
        c.style.display = "none"; // Hide content
        c.classList.remove("active"); // Remove active styling
      });

      container.querySelectorAll(".accordion-header").forEach(h => { // Loop through all headers
        h.classList.remove("active"); // Remove active styling
        h.querySelector("span:last-child").textContent = "▼"; // Reset all arrows to down
      });

      // Open clicked accordion
      content.style.display = "block"; // Show content
      content.classList.add("active"); // Add active styling
      header.classList.add("active"); // Add active styling to header
      arrow.textContent = "▲"; // Change arrow to up (open state)
      setTopBackground(category); // Set background based on category
    });
  });
}

// ============================================================================
// SECTION 7: SETUP PRODUCT CLICKS - PRODUCT INTERACTION
// ============================================================================
// 🔴 MUST BE FUNCTION #3 IN EXECUTION ORDER 🔴
// WHY THIS MUST RUN THIRD:
// 1. DEPENDS ON generateMenu() - needs product elements to exist
// 2. DEPENDS ON setupAccordion() - products are inside accordion content
// 3. Uses event delegation on the container (efficient for many items)
// 4. Must run BEFORE modal setup because clicking products opens modal

function setupProductClicks() {
  document.getElementById("menuContainer").addEventListener("click", e => {
    const product = e.target.closest(".product");
    if (!product) return;   // Ignore clicks not on products

     //  EXTRACT DATA FROM HTML ATTRIBUTES (set in generateMenu())
    showModal(product.dataset.name, product.dataset.price, product.dataset.img);
  });
}

// ============================================================================
// SECTION 8: SHOW MODAL FUNCTION - DISPLAY PRODUCT DETAILS
// ============================================================================
// 🔴 MUST BE DEFINED BEFORE setupModalFunctionality() 🔴
// WHY THIS ORDER MATTERS:
// 1. Called by setupProductClicks() (Function #3)
// 2. setupModalFunctionality() sets up closing for THIS modal
// 3. This is the ACTION, setupModalFunctionality() is the REACTION 

function showModal(name, price, img) { // Function to display modal with product details
  const modal = document.getElementById("productModal"); // Get modal container
  const modalImg = document.getElementById("modal-img"); // Get modal image element
  const modalName = document.getElementById("modal-name"); // Get modal name element
  const inlinePrice = document.getElementById("inline-price"); // Get price display element
  const quantity = document.getElementById("quantity"); // Get quantity display element

  if (!modal || !modalImg || !modalName || !inlinePrice || !quantity) return; // Exit if elements missing

  modal.style.display = "flex"; // Make modal visible
  modalImg.src = img; // Set modal image source
  modalImg.alt = name; // Set image alt text for accessibility
  modalName.textContent = name; // Set modal name text
  inlinePrice.dataset.base = price; // Store base price for quantity calculations
  inlinePrice.textContent = price + ":-"; // Display initial price
  quantity.textContent = "1"; // Reset quantity to 1
}

// ============================================================================
// SECTION 9: SETUP MODAL FUNCTIONALITY - CLOSE BEHAVIOR
// ============================================================================
// 🔴 MUST BE FUNCTION #5 IN EXECUTION ORDER 🔴
// WHY THIS MUST RUN LAST:
// 1. DEPENDS ON modal existing in HTML (outside menuContainer)
// 2. Sets up closing behavior AFTER modal can be opened
// 3. Handles X button, outside clicks, and ESC key
// 4. Final piece of user interaction chain

function setupModalFunctionality() { // Function to handle modal closing behavior
  const modal = document.getElementById("productModal"); // Get modal element
  
  if (!modal) return; // Exit if modal doesn't exist
  
  const closeBtn = modal.querySelector(".close"); // Get X (close) button
  
  if (closeBtn) { // If close button exists
    closeBtn.addEventListener("click", () => { // Add click event listener
      modal.style.display = "none"; // Hide modal
    });
  }

  window.addEventListener("click", e => { // Add click event listener to window
    if (e.target === modal) { // If click target is the modal overlay
      modal.style.display = "none"; // Hide modal
    }
  });

  document.addEventListener("keydown", e => { // Add keydown event listener to document
    if (e.key === "Escape" && modal.style.display === "flex") { // If ESC key pressed and modal is visible
      modal.style.display = "none"; // Hide modal
    }
  });
}

// ============================================================================
// SECTION 10: SETUP QUANTITY BUTTONS - MODAL INTERACTION
// ============================================================================
// 🔴 MUST BE FUNCTION #4 IN EXECUTION ORDER 🔴
// WHY THIS MUST RUN BEFORE setupModalFunctionality():
// 1. DEPENDS ON modal elements existing in HTML
// 2. Sets up + and - buttons INSIDE the modal
// 3. Must run AFTER showModal() is defined (modal can be opened)
// 4. Runs BEFORE setupModalFunctionality() because quantity is part of modal

function setupQuantityButtons() { // Function to handle + and - buttons in modal
  const quantity = document.getElementById("quantity"); // Get quantity number display
  const inlinePrice = document.getElementById("inline-price"); // Get price display
  const increaseBtn = document.getElementById("increase"); // Get + button
  const decreaseBtn = document.getElementById("decrease"); // Get - button

  if (!quantity || !inlinePrice || !increaseBtn || !decreaseBtn) return; // Exit if elements missing

  increaseBtn.addEventListener("click", () => { // Add click event to + button
    const qty = Number(quantity.textContent) + 1; // Increase quantity by 1
    quantity.textContent = qty; // Update quantity display
    inlinePrice.textContent = (qty * Number(inlinePrice.dataset.base)) + ":-"; // Update price
  });

  decreaseBtn.addEventListener("click", () => { // Add click event to - button
    let qty = Number(quantity.textContent); // Get current quantity
    if (qty > 1) qty--; // Decrease by 1 if more than 1
    quantity.textContent = qty; // Update quantity display
    inlinePrice.textContent = (qty * Number(inlinePrice.dataset.base)) + ":-"; // Update price
  });
}