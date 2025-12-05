import { cafeMenuData } from "./productData.js";

 
function toggleCategory(categoryName) {
  const categoryDiv = document.getElementById(categoryName);
  if (!categoryDiv) return;
 
  if (categoryDiv.innerHTML.trim() === "") {
    generateCategory(categoryName);
  }

  
  categoryDiv.classList.toggle("active");
}


// -------------------- Generate Products --------------------
function generateCategory(categoryName) {
  const categoryList = document.getElementById(categoryName);
  if (!categoryList) return;

  const data = cafeMenuData[categoryName];
  if (!data) return;

  categoryList.innerHTML = data
    .map((item) => {
      const { id, name, price, imgSrc } = item;
      return `
        <div id="product-id-${id}" class="item">
          <img src="${imgSrc}">
          <div class="details">
            <h3>${name}</h3>
            <div class="price-quantity">
              <h2>$ ${price}</h2>
              <div class="buttons">
                <i class="fa-sharp-duotone fa-regular fa-minus"></i>
                <div id="${id}" class="quantity">0</div>
                <i class="fa-sharp-duotone fa-regular fa-plus"></i>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

    
  data.forEach((item) => {
    const incBtn = document.querySelector(
      `#product-id-${item.id} .fa-plus`
    );
    const decBtn = document.querySelector(
      `#product-id-${item.id} .fa-minus`
    );

    if (incBtn) incBtn.addEventListener("click", () => increment(item.id));
    if (decBtn) decBtn.addEventListener("click", () => decrement(item.id));
  });
}

// -------------------- Increment / Decrement --------------------
function increment(id) {
  const order = document.getElementById(id);
  if (!order) return;
  let quantity = parseInt(order.innerText);
  quantity++;
  order.innerText = quantity;
  updateCart();
}

function decrement(id) {
  const order = document.getElementById(id);
  if (!order) return;
  let quantity = parseInt(order.innerText);
  if (quantity > 0) quantity--;
  order.innerText = quantity;
  updateCart();
}

// -------------------- Update Cart Total --------------------
function updateCart() {
  let total = 0;
  Object.values(cafeMenuData).forEach((category) => {
    category.forEach((item) => {
      const order = document.getElementById(item.id);
      if (order) total += parseInt(order.innerText) ;
    });
  });
  const cartAmountEl = document.querySelector(".cartAmount");
  if (cartAmountEl) cartAmountEl.innerText = total;
}

// -------------------- Attach Event Listeners to Categories --------------------
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".menu-category").forEach((div) => {
    div.addEventListener("click", () => {
      const categoryName = div.querySelector("h3").innerText.toLowerCase();
      toggleCategory(categoryName);
    });
  });
});



 
  