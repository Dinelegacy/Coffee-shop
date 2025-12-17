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
// This event fires when the HTML document has been completely loaded and parsed
// WHY EARLY: Shows the entry point of our application logic
document.addEventListener("DOMContentLoaded", () => {
  // EXECUTION ORDER IS CRITICAL:
  // 1. generateMenu() - Creates the HTML structure first (foundation)
  // 2. setupAccordion() - Adds behavior to the created structure
  // 3. setupProductClicks() - Enables clicking on products
  // 4. setTopBackground() - Sets the initial visual background
  // 5. setupQuantityButtons() - Prepares modal quantity controls
  // 6. setupModalFunctionality() - Sets up modal closing behavior
  generateMenu();             // Build menu from data
  setupAccordion();           // Make accordions expandable
  setupProductClicks();       // Make products clickable
  setTopBackground("default"); // Set initial background image
  setupQuantityButtons();     // Setup + and - buttons in modal
  setupModalFunctionality();  // Setup modal closing functionality
});

// ============================================================================
// SECTION 3: SET TOP BACKGROUND FUNCTION
// ============================================================================
// This function changes the background image based on category
// WHY AFTER INITIALIZATION: Called by setup functions but defined before them
function setTopBackground(type) {
  // Get the background image element from the DOM
  const bgImg = document.getElementById('bg-image');
  
  // Get the URL for the requested type, fallback to default if type doesn't exist
  const url = backgrounds[type] || backgrounds.default;
  
  // Safety check: Only set src if the element exists
  if (bgImg) {
    bgImg.src = url;  // Change the image source
  }
}

// ============================================================================
// SECTION 4: MENU DATA - PRODUCT INFORMATION
// ============================================================================
// This object contains all menu items organized by category
// WHY AFTER BACKGROUNDS: Both are data structures, grouped together
const menuData = {
  promotions: {
    items: [
      { img: "assets/menu/new_pics/ap_squared.jpg", 
        name: "American Pancakes", 
        price: 45,
        id: "promotion1"
       },
      { img: "assets/menu/new_pics/three-cups_squared.jpg", 
        name: "Pay two, get one extra",
         price: 60, 
         id: "promotion2"
        },
      { img: "assets/menu/new_pics/ap_squared.jpg", 
        name: "1 Croissant free, for each coffee",
         price: 40,
          id: "promotion3"
        },
    ]
  },
  coffee: {
    items: [
      { img: "assets/menu/hot cocoa.jpg", name: "Hot Cocoa", price: 35, id: "coffee1"},
      { img: "assets/menu/Hazelnut Tiramisu Irish Coffee.jpg", name: "Hazelnut Tiramisu Irish Coffee", price: 40 , id: "coffee2"},
      { img: "assets/menu/Classic Irish Coffee.jpg", name: "Classic Irish Coffee", price: 42 , id: "coffee3"},
      { img: "assets/menu/Irish Coffee.jpg", name: "Irish Coffee", price: 35, id: "coffee4"},
      { img: "assets/menu/Coffee Americano.jpg", name: "Coffee Americano", price: 40, id: "coffee5"},
      { img: "assets/menu/Coffee Latte.jpg", name: "Coffee Latte", price: 42, id: "coffee6"},
      { img: "assets/menu/black coffee.jpg", name: "Black Coffee", price: 35, id: "coffee7"},
      { img: "assets/menu/Brown Sugar Shaken Espresso.jpg", name: "Brown Sugar Shaken Espresso", price: 40, id: "coffee8"},
      { img: "assets/menu/Cortado.jpg", name: "Cortado", price: 42, id: "coffee9"},
      { img: "assets/menu/Flat White.jpg", name: "Flat White", price: 35, id: "coffee10"},
      { img: "assets/menu/Latte Macchiato.jpg", name: "Latte Macchiato", price: 40, id: "coffee11"},
      { img: "assets/menu/Cinnamon Cappuccino.jpg", name: "Cinnamon Cappuccino", price: 42, id: "coffee12"},
      { img: "assets/menu/Hot chocolate coffe.jpg", name: "Hot chocolate coffe", price: 35, id: "coffee13"},
      { img: "assets/menu/Hot Mocha Coffee.jpg", name: "Hot Mocha Coffee", price: 40, id: "coffee14"},
      { img: "assets/menu/Espresso.jpg", name: "Espresso", price: 42, id: "coffee15"},
      { img: "assets/menu/Cappuccino.jpg", name: "Cappuccino", price: 42, id: "coffee16"}
    ]
  },
  tea: {
    items: [
      { img: "assets/menu/Orange Spiced Black Tea.jpg", name: "Orange Spiced Black Tea", price: 28 , id: "tea1"},
      { img: "assets/menu/Tea with lemon.jpg", name: "Tea with lemon", price: 30, id: "tea2"},
      { img: "assets/menu/Green Tea.jpg", name: "Green Tea", price: 32, id: "tea3"}
    ]
  },
  smoothies: {
    items: [
      { img: "assets/menu/Iced Matcha Latte.jpg", name: "Iced Matcha Latte", price: 55 , id: "smoothies1"},
      { img: "assets/menu/Iced Brown Sugar Matcha Latte.jpg", name: "Iced Brown Sugar Matcha Latte", price: 58, id: "smoothies2"},
      { img: "assets/menu/Velvety Chocolate Hazelnut Milkshake.jpg", name: "Velvety Chocolate Hazelnut Milkshake", price: 52, id: "smoothies3"},
      { img: "assets/menu/Peanut Butter Frappuccino.jpg", name: "Peanut Butter Frappuccino", price: 55, id: "smoothies4"},
      { img: "assets/menu/Rich Latte.jpg", name: "Rich Latte", price: 58, id: "smoothies5"},
      { img: "assets/menu/Caramel Iced Coffee.jpg", name: "Caramel Iced Coffee", price: 52, id: "smoothies6"},
      { img: "assets/menu/Lincoln Mint Mocha.jpg", name: "Lincoln Mint Mocha", price: 55, id: "smoothies7"},
      { img: "assets/menu/Black Gold Iced Coffee.jpg", name: "Black Gold Iced Coffee", price: 58, id: "smoothies8"},
      { img: "assets/menu/Chocolate Chip Frappuccino.jpg", name: "Chocolate Chip Frappuccino", price: 52, id: "smoothies9"},
      { img: "assets/menu/Iced Coffee Mojito.jpg", name: "Iced Coffee Mojito", price: 55, id: "smoothies10"},
      { img: "assets/menu/Mojito Espresso.jpg", name: "Mojito Espresso", price: 58, id: "smoothies10"},
      { img: "assets/menu/Coffee Mojito.jpg", name: "Coffee Mojito", price: 52, id: "smoothies11"},
      { img: "assets/menu/MANGO MILKSHAKE.jpg", name: "Mango Milkshake", price: 55, id: "smoothies12"},
      { img: "assets/menu/Whipped Dalgona Coffee.jpg", name: "Whipped Dalgona Coffee", price: 58, id: "smoothies13"}
    ]
  },
  snacks: {
    items: [
      { img: "assets/menu/Lemon Cheesecake.jpg", name: "Lemon Cheesecake", price: 25 , id: "snacks1"},
      { img: "assets/menu/Espresso Chocolate Cheesecake.jpg", name: "Espresso Chocolate Cheesecake", price: 22, id: "snacks2"},
      { img: "assets/menu/Creamy Cheesecake with strawberry.jpg", name: "Creamy Cheesecake with strawberry", price: 30, id: "snacks3"},
      { img: "assets/menu/Chocolate croissant.jpg", name: "Chocolate Croissant", price: 25, id: "snacks4"},
      { img: "assets/menu/croissant sandwich.jpg", name: "Croissant Sandwich", price: 22, id: "snacks5"},
      { img: "assets/menu/Ham Cheese And Lettuce Sandwich.jpg", name: "Ham Cheese And Lettuce Sandwich", price: 30, id: "snacks6"},
      { img: "assets/menu/Pistachio Croissant.jpg", name: "Pistachio Croissant", price: 25, id: "snacks7"},
      { img: "assets/menu/Coconut matcha cream pie.jpg", name: "Coconut matcha cream pie", price: 22, id: "snacks8"},
      { img: "assets/menu/chocolate donat.jpg", name: "Chocolate Donut", price: 30, id: "snacks9"},
      { img: "assets/menu/Spiced Apple Cider Donuts with Caramel Glaze.jpg", name: "Spiced Cider Donuts with Caramel Glaze", price: 25, id: "snacks10"},
      { img: "assets/menu/Red Velvet Strawberry Cheesecake.jpg", name: "Red Velvet Strawberry Cheesecake", price: 22, id: "snacks11"},
      { img: "assets/menu/Black Forest Cake Roll.jpg", name: "Black Forest Cake Roll", price: 30, id: "snacks12"},
      { img: "assets/menu/tiramisu mousse cake.jpg", name: "tiramisu mousse cake", price: 25, id: "snacks13"},
      { img: "assets/menu/Dark Chocolate Bars with Pistachio Paste Filling.jpg", name: "Dark Chocolate Bars with Pistachio", price: 22, id: "snacks14"},
      { img: "assets/menu/Chocolate Cake with Strawberries.jpg", name: "Chocolate Cake with Strawberries", price: 30, id: "snacks15"}
    ]
  }
};

// ============================================================================
// 5. GENERATE MENU FUNCTION - WHY FIRST FUNCTION: Builds HTML foundation
// ============================================================================
// THIS IS THE MOST IMPORTANT FUNCTION - it creates the entire menu structure
// Other functions CANNOT work until this runs because they need the HTML elements
function generateMenu() {
  // Get the container div where menu will be inserted
  // This element MUST exist in HTML (id="menuContainer")
  const container = document.getElementById("menuContainer");
  
  // DEFENSIVE PROGRAMMING: Check if container exists before using it
  // Prevents JavaScript errors if HTML is missing this element
  if (!container) return;  // Exit function if container doesn't exist

  // Clear any existing content in container (in case function runs multiple times)
  // This ensures we start fresh each time
  container.innerHTML = "";

  // FOR EACH CATEGORY in menuData (promotions, coffee, tea, smoothies, snacks)
  // for...in loop iterates through object properties
  for (const category in menuData) {
    // ----- CREATE ACCORDION CONTAINER -----
    // This div wraps the entire category (header + content)
    const accordion = document.createElement("div");
    // CSS class for styling - connects to navegationBar.css
    accordion.className = "accordion";
    // Store category name as data attribute for JavaScript to use later
    accordion.dataset.category = category;

    // ----- CREATE CLICKABLE HEADER -----
    // Users click this to expand/collapse the category
    const header = document.createElement("div");
    // CSS class for styling
    header.className = "accordion-header";
    // Header shows category name (UPPERCASE) and dropdown arrow (▼)
    // Two spans: first for text, second for arrow
    header.innerHTML = `<span>${category.toUpperCase()}</span><span>▼</span>`;

    // ----- CREATE COLLAPSIBLE CONTENT AREA -----
    // This holds all the products and is hidden/shown when header is clicked
    const content = document.createElement("div");
    // CSS class for styling
    content.className = "accordion-content";

    // ----- SPECIAL HANDLING FOR PROMOTIONS -----
    // Promotions category should be OPEN by default when page loads
    if (category === "promotions") {
      // Make content visible immediately (others start hidden)
      content.style.display = "block";
      // Add 'active' class for CSS styling (orange background)
      content.classList.add("active");
      // Also make header look active (orange background)
      header.classList.add("active");
      // Change arrow from ▼ (down) to ▲ (up) to show it's open
      header.querySelector("span:last-child").textContent = "▲";
      // Set background image to promotions background
      setTopBackground(category);
    }

    // ----- CREATE PRODUCT ITEMS FOR THIS CATEGORY -----
    // forEach loop processes each item in the category
    menuData[category].items.forEach(item => {
      // Create container div for this specific product
      const product = document.createElement("div");
      // CSS class for styling
      product.className = "product";
      
      // Store product data as custom HTML data attributes
      // These are accessed later when product is clicked
        product.dataset.id = item.id;
      product.dataset.name = item.name;    // Product name
      product.dataset.price = item.price;  // Product price
      product.dataset.img = item.img;      // Product image path

      // Create HTML structure for the product display
      // Uses template literal (backticks) for multi-line HTML
      product.innerHTML = `
          <div class="product-info">
          <img src="${item.img}">  <!-- Product image -->
          <span class="product-name">${item.name}</span>  <!-- Product name -->
        </div>
        <span class="product-price">${item.price}:-</span>  <!-- Product price -->
      `;
      
      // Add this product to the category content area
      content.appendChild(product);
    });

    // ----- ASSEMBLE ACCORDION -----
    // Add header first (always visible), then content (collapsible)
    accordion.appendChild(header);
    accordion.appendChild(content);
    
    // ----- ADD COMPLETE ACCORDION TO PAGE -----
    // Add the finished category to the main container
    container.appendChild(accordion);
  }
}

// ============================================================================
// 6. SETUP ACCORDION FUNCTION - WHY AFTER GENERATE: Needs HTML to exist
// ============================================================================
// This function adds CLICK BEHAVIOR to the accordion headers created by generateMenu()
// It CANNOT run before generateMenu() because there's nothing to click yet
function setupAccordion() {
  // Get the container that holds all accordions
  const container = document.getElementById("menuContainer");
  
  // SAFETY CHECK: If container doesn't exist, stop immediately
  if (!container) return;

  // Select ALL accordion headers (one for each category)
  // forEach processes each header individually
  container.querySelectorAll(".accordion-header").forEach(header => {
    // Add click event listener to each header
    header.addEventListener("click", () => {
      // ----- GET RELATED ELEMENTS -----
      // Content is the very next element after header (sibling)
      const content = header.nextElementSibling;
      // Arrow is the last span inside the header (▼ or ▲)
      const arrow = header.querySelector("span:last-child");
      // Get category name from parent accordion's data attribute
      const category = header.parentElement.dataset.category;
      
      // Check if this accordion is currently open
      // 'active' class indicates open state
      const open = content.classList.contains("active");

      // ----- STEP 1: CLOSE ALL ACCORDIONS -----
      // Only one accordion can be open at a time (like a FAQ page)
      container.querySelectorAll(".accordion-content").forEach(c => {
        c.style.display = "none";       // Hide the content
        c.classList.remove("active");   // Remove active styling
      });

      // ----- STEP 2: REMOVE ACTIVE STYLING FROM ALL HEADERS -----
      container.querySelectorAll(".accordion-header").forEach(h => {
        h.classList.remove("active");   // Remove orange background
      });

      // ----- STEP 3: RESET ALL ARROWS TO "CLOSED" POSITION -----
      container.querySelectorAll(".accordion-header span:last-child").forEach(a => {
        a.textContent = "▼";  // Down arrow means "closed"
      });

      // ----- STEP 4: TOGGLE THIS ACCORDION -----
      if (!open) {
        // If it was CLOSED, OPEN it
        content.style.display = "block";    // Show content
        content.classList.add("active");    // Mark as active
        header.classList.add("active");     // Style header as active
        arrow.textContent = "▲";           // Change to up arrow
        setTopBackground(category);        // Change page background
      } else {
        // If it was OPEN, closing it resets to default background
        setTopBackground("default");
      }
    });
  });
}

// ============================================================================
// 7. SETUP PRODUCT CLICKS - WHY AFTER ACCORDION: Products inside accordions
// ============================================================================
// This makes individual PRODUCTS clickable to open the modal
// It depends on products existing (created by generateMenu())
function setupProductClicks() {
  // Add ONE event listener to the entire menu container
  // This is called "event delegation" - efficient for many items
  document.getElementById("menuContainer").addEventListener("click", (e) => {
    // Find the nearest .product element to the click
    // closest() works even if user clicks on image or text inside product
    const product = e.target.closest(".product");
    
    // If click wasn't on/in a product, do nothing
    if (!product) return;
    
    // Get product data from the HTML data attributes we set in generateMenu()
    // These were stored: data-name, data-price, data-img
    showModal(product.dataset.id,product.dataset.name, product.dataset.price, product.dataset.img);
  });
}

// ============================================================================
// 8. SHOW MODAL FUNCTION - WHY AFTER CLICKS: Called when product is clicked
// ============================================================================
// This displays the popup modal with product details
// It's triggered by setupProductClicks() when a product is clicked
function showModal(id,name, price, img) {
  // Get ALL modal elements from HTML
  const modal = document.getElementById("productModal");      // Main modal container
  const modalImg = document.getElementById("modal-img");      // Image element inside modal
  const modalName = document.getElementById("modal-name");    // Name element inside modal
  const inlinePrice = document.getElementById("inline-price"); // Price display
  const quantity = document.getElementById("quantity");       // Quantity number display
 modal.dataset.productId = id;
  // Make modal visible - "flex" centers it nicely
  modal.style.display = "flex";

  // ----- SET MODAL CONTENT -----
  // Update image source to show product picture
  modalImg.src = img;
  // Update text to show product name
  modalName.textContent = name;

  // ----- SET UP PRICE CALCULATIONS -----
  // Store original price in data attribute for quantity calculations
  // When quantity changes, we multiply by this base price
  inlinePrice.dataset.base = price;
  
  // Display initial price (quantity 1 × base price)
  inlinePrice.textContent = price + ":-";

  // ----- RESET QUANTITY -----
  // Always start at 1 when modal opens
  quantity.textContent = "1";
}

// ============================================================================
// 9. SETUP MODAL FUNCTIONALITY - WHY LAST: Modal is final interactive element
// ============================================================================
// This handles CLOSING the modal (X button, outside click, ESC key)
// It's separate from showModal() to keep responsibilities clear
function setupModalFunctionality() {
  // Get the modal element from HTML
  const modal = document.getElementById("productModal");
  
  // Get the X (close) button inside the modal
  const closeBtn = modal.querySelector(".close");

  // ----- X BUTTON CLICK -----
  // When user clicks the X in top-right corner
  closeBtn.addEventListener("click", () => {
    // Hide the modal by setting display to "none"
    modal.style.display = "none";
  });

  // ----- CLICK OUTSIDE MODAL -----
  // When user clicks on the dark overlay (outside white modal content)
  window.addEventListener("click", (e) => {
    // Check if click target is the modal itself (not its children)
    if (e.target === modal) {
      // Hide the modal
      modal.style.display = "none";
    }
  });

  // ----- ESC KEY PRESS -----
  // When user presses Escape key on keyboard
  document.addEventListener("keydown", (e) => {
    // Check if Escape key was pressed AND modal is currently visible
    if (e.key === "Escape") {
      // Hide the modal
      modal.style.display = "none";
    }
  });
}

// ============================================================================
// 10. SETUP QUANTITY BUTTONS - WHY BEFORE MODAL: Buttons are inside modal
// ============================================================================
// This handles the + and - buttons INSIDE the modal
// Quantity controls are part of modal functionality
function setupQuantityButtons() {
  // Get elements that show quantity and price
  const quantity = document.getElementById("quantity");       // The number (1, 2, 3...)
  const inlinePrice = document.getElementById("inline-price"); // Price display

  // ----- + BUTTON (INCREASE) -----
  document.getElementById("increase").addEventListener("click", () => {
    // Get current quantity and add 1
    let qty = parseInt(quantity.textContent) + 1;
    
    // Update the displayed quantity
    quantity.textContent = qty;

    // Calculate new price: quantity × base price
    // base price was stored in data-base attribute in showModal()
    let newPrice = qty * Number(inlinePrice.dataset.base);
    
    // Update price display
    inlinePrice.textContent = newPrice + ":-";
  });

  // ----- - BUTTON (DECREASE) -----
  document.getElementById("decrease").addEventListener("click", () => {
    // Get current quantity
    let qty = parseInt(quantity.textContent);
    
    // Only decrease if more than 1 (can't have 0 or negative)
    if (qty > 1) qty--;
    
    // Update the displayed quantity
    quantity.textContent = qty;

    // Calculate new price: quantity × base price
    let newPrice = qty * Number(inlinePrice.dataset.base);
    
    // Update price display
    inlinePrice.textContent = newPrice + ":-";
  });
}
