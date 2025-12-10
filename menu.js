const backgrounds = {
  default: "assets/menu/menu_covers/Menu-Covers.jpg",
  promotions: "assets/menu/menu_covers/Promo.jpg",
  coffee: "assets/menu/menu_covers/coffee.jpg",
  tea: "assets/menu/menu_covers/tea.jpg",
  smoothies: "assets/menu/menu_covers/smoothie.jpg",
  snacks: "assets/menu/menu_covers/snaks3.jpg"
};

document.addEventListener("DOMContentLoaded", () => {
  generateMenu();
  setupAccordion();
  setupProductClicks();
  setupModalFunctionality();
  setTopBackground("default");
});

function setTopBackground(type) {
  const topBg = document.querySelector('.top-background');
  if(topBg) topBg.style.backgroundImage = `url(${backgrounds[type] || backgrounds.default})`;
}

/* ---------------------------
   MENU DATA (Only images, names, prices)
---------------------------- */
const menuData = {
  promotions: {
    items: [
      { img: "assets/menu/new_pics/ap_squared.jpg", name: "Gingerbread Milkshake Mocktail", price: "45:-" },
      { img: "assets/menu/new_pics/three-cups_squared.jpg", name: "By two, get third for free", price: "45:-" },
      { img: "assets/menu/new_pics/croissant_squared.jpg", name: "Xmas Reindeer", price: "45:-" },
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

// -------- Generate Menu --------
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
        <img src="${item.img}">
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

// -------- Accordion --------
function setupAccordion() {
  const container = document.getElementById("menuContainer");
  if (!container) return;

  container.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const arrow = header.querySelector("span:last-child");
      const category = header.parentElement.dataset.category;

      const open = content.classList.contains("active");

      container.querySelectorAll(".accordion-content").forEach(c => {
        c.style.display = "none";
        c.classList.remove("active");
      });

      container.querySelectorAll(".accordion-header span:last-child").forEach(a => {
        a.textContent = "▼";
      });

      if (!open) {
        content.style.display = "block";
        content.classList.add("active");
        arrow.textContent = "▲";
        setTopBackground(category);
      } else {
        setTopBackground("default");
      }
    });
  });
}

// -------- Product Clicks --------
function setupProductClicks() {
  document.getElementById("menuContainer").addEventListener("click", (e) => {
    const product = e.target.closest(".product");
    if (!product) return;
    showModal(product.dataset.name, product.dataset.price, product.dataset.img);
  });
}

// -------- Modal --------
function showModal(name, price, img) {
  const modal = document.getElementById("productModal");
  modal.style.display = "flex";

  document.getElementById("modal-img").src = img;
  document.getElementById("modal-name").textContent = name;
  document.getElementById("inline-price").textContent = price;

  document.getElementById("quantity").textContent = "1";
}

function setupModalFunctionality() {
  const modal = document.getElementById("productModal");

  modal.querySelector(".close").addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  const quantity = document.getElementById("quantity");

  document.getElementById("increase").addEventListener("click", () => {
    quantity.textContent = parseInt(quantity.textContent) + 1;
  });

  document.getElementById("decrease").addEventListener("click", () => {
    const val = parseInt(quantity.textContent) - 1;
    quantity.textContent = val < 1 ? 1 : val;
  });
}
