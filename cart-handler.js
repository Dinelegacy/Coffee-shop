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

 export function updateBagCount() {
    const bagCountElement = document.getElementById("bagCount");
    const bagContainer = document.getElementById("bagIcon");
    const bagImage = document.getElementById("bagImage");

    if (!bagCountElement || !bagContainer || !bagImage) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    bagCountElement.textContent = totalItems;

    if (totalItems === 0) {
        // Empty bag
        bagContainer.classList.remove("filled");
        bagImage.src = "./assets/functional-icons/bag-icons/icon-empty_bag.svg";

    } else {
        // Filled bag
        bagContainer.classList.add("filled");
        bagImage.src = "./assets/functional-icons/bag-icons/icon-filled_bag.svg";
    }
}
