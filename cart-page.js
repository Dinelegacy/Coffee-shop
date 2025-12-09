const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
});

 
 
// -------------------- Increment / Decrement --------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  const container = document.querySelector(".cart-items");
  let total = 0;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<p>Your cart is empty.</p>`;
    document.getElementById("cartAmount").textContent = "00.00 SEK";
    document.querySelector(".vat").textContent = "00.00 SEK";
    return;
  }

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    container.innerHTML += `
      <div class="cart-item">
        <div class="cart-header">
            <img class="cart-item-img" src="${item.img}" alt=""/>
            <div class="cart-item-info">
                <p>${item.name}</p>
                <p class="price-line">${item.quantity} × ${item.price}:-</p>
            </div>
        </div>

        <div class="cart-actions">
            <button class="minus" data-id="${item.userId}">−</button>
            <span class="qty">${item.quantity}</span>
            <button class="plus" data-id="${item.userId}">+</button>
        </div>
      </div>
    `;
  });

  updateTotals(total);
  setupButtons();
}


function updateTotals(total) {
  const vat = total * 0.12;
  document.getElementById("cartAmount").textContent = `${total.toFixed(2)} SEK`;
  document.querySelector(".vat").textContent = `${vat.toFixed(2)} SEK`;
}

function setupButtons() {
  document.querySelectorAll(".plus").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const item = cart.find(i => i.userId === id);
      item.quantity++;
      saveCart();
      renderCart();
    });
  });

  document.querySelectorAll(".minus").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const item = cart.find(i => i.userId === id);
      item.quantity--;

      if (item.quantity <= 0) {
        cart = cart.filter(i => i.userId !== id);
      }

      saveCart();
      renderCart();
    });
  });
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
