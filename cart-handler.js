// cart-handler.js

// Add item to cart or update quantity
export function addItemToCart(name, price, img, quantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.name === name && item.img === img);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      name,
      img,
      price: Number(price),
      quantity: Number(quantity)
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateBagCount();
}

// Update the bag icon count
export function updateBagCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const badge = document.querySelector(".bag-item-count");
  if (badge) badge.textContent = count;
}
