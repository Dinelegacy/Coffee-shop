// Background images for each section - for the top background
const backgrounds = {
  default: "assets/menu/menu1.png",
  promotions: "assets/menu/promotions.jpg",
  coffee: "assets/menu/coffee1.jpg",
  tea: "assets/menu/tea.jpg",
  smoothies: "assets/menu/cold-drinks.jpg",
  snacks: "assets/menu/factory.jpg"
};

function setTopBackground(type) {
  const topBg = document.querySelector('.top-background');
  const imageUrl = backgrounds[type] || backgrounds.default;
  if (topBg) topBg.style.backgroundImage = `url(${imageUrl})`;
}

let currentlyOpenTab = null;

/* ---------------------------
   INITIALIZE
---------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // Initialize existing features
  generateMenu();
  setupAccordion();
  setupProductClicks();
  setupModalFunctionality();
  setupFavoriteToggle();

  setTopBackground("default");

  const addToCartBtn = document.getElementById("add-to-cart");
  if (addToCartBtn) addToCartBtn.addEventListener("click", addToCartHandler);

  // Initialize checkout sliding UI
  initCheckout();
});

/* ---------------------------
   ADD TO CART HANDLER
---------------------------- */
function addToCartHandler() {
  const name = document.getElementById("modal-name")?.textContent || "Product";
  const quantity = document.getElementById("quantity")?.textContent || "1";

  const customizePanel = document.getElementById("customize-panel");
  let customizations = [];

  if (customizePanel) {
    const sugarQty = parseInt(customizePanel.querySelector(".opt-qty[data-opt='sugar']")?.textContent || "0");
    if (sugarQty > 0) customizations.push(`${sugarQty}× Sugar`);
    const shotQty = parseInt(customizePanel.querySelector(".opt-qty[data-opt='shot']")?.textContent || "0");
    if (shotQty > 0) customizations.push(`${shotQty}× Extra Shot`);
    const iceBtn = customizePanel.querySelector(".ice-btn.active");
    if (iceBtn) customizations.push(`Ice: ${iceBtn.dataset.ice}`);
    const lactose = customizePanel.querySelector(".opt-checkbox[data-opt='lactose']")?.checked;
    if (lactose) customizations.push("Lactose-free milk");
    const whip = customizePanel.querySelector(".opt-checkbox[data-opt='whip']")?.checked;
    if (whip) customizations.push("Whipped cream");
  }

  const customizationText = customizations.length > 0 ? ` (${customizations.join(", ")})` : "";

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

  const modal = document.getElementById("productModal");
  setTimeout(() => {
    if (modal) modal.style.display = "none";
  }, 1500);
}

/* ---------------------------
   MENU DATA & GENERATE
---------------------------- */
const menuData = {
  promotions: { items: [ /* omitted for brevity, same as original */ ] },
  coffee: { items: [ /* omitted for brevity, same as original */ ] },
  tea: { items: [ /* omitted for brevity, same as original */ ] },
  smoothies: { items: [ /* omitted for brevity, same as original */ ] },
  snacks: { items: [ /* omitted for brevity, same as original */ ] }
};

/* Because the menuData is long, in this file we assume the same menuData block from your original file.
   If you replace the file, ensure the menuData object content (items arrays) is included as in your original. */

/* ---------------------------
   GENERATE MENU
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
  const accordionHeaders = container.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const arrow = header.querySelector('span:last-child');
      const categoryName = header.parentElement.dataset.category;
      const isCurrentlyOpen = content.classList.contains('active');
      if (isCurrentlyOpen) {
        content.style.display = 'none';
        content.classList.remove('active');
        arrow.textContent = '▼';
        header.classList.remove('active');
        currentlyOpenTab = null;
        let anyTabOpen = false;
        container.querySelectorAll('.accordion-content').forEach(sec => {
          if (sec.classList.contains('active')) anyTabOpen = true;
        });
        if (!anyTabOpen) setTopBackground("default");
      } else {
        container.querySelectorAll('.accordion-content').forEach(sec => {
          sec.style.display = 'none';
          sec.classList.remove('active');
        });
        container.querySelectorAll('.accordion-header').forEach(h => { h.classList.remove('active'); });
        container.querySelectorAll('.accordion-header span:last-child').forEach(a => { a.textContent = '▼'; });
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
   PRODUCT CLICKS & MODAL
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

function showModal(name, price, img) {
  const modal = document.getElementById("productModal");
  if (!modal) return;
  const modalImg = document.getElementById("modal-img");
  const modalName = document.getElementById("modal-name");
  const modalPrice = document.getElementById("modal-price");
  if (modalImg) modalImg.src = img;
  if (modalName) modalName.textContent = name;
  if (modalPrice) modalPrice.textContent = price;
  const quantity = document.getElementById("quantity");
  if (quantity) quantity.textContent = "1";
  const favoriteBtn = document.getElementById("favorite-btn");
  const heartPath = document.querySelector(".heart-path");
  if (favoriteBtn && heartPath) {
    favoriteBtn.classList.remove("favorited");
    heartPath.setAttribute("stroke", "#c67500");
    heartPath.setAttribute("fill", "none");
  }
  const panel = document.getElementById("customize-panel");
  if (panel) {
    panel.style.display = "none";
    panel.querySelectorAll(".opt-qty").forEach(el => el.textContent = "0");
    panel.querySelectorAll(".opt-checkbox").forEach(cb => cb.checked = false);
    panel.querySelectorAll(".ice-btn").forEach(btn => btn.classList.remove("active"));
  }
  modal.style.display = "flex";
}

/* ---------------------------
   FAVORITE TOGGLE
---------------------------- */
function setupFavoriteToggle() {
  const favoriteBtn = document.getElementById("favorite-btn");
  if (!favoriteBtn) return;
  favoriteBtn.addEventListener("click", function() {
    const heartPath = document.querySelector(".heart-path");
    const isFavorited = favoriteBtn.classList.contains("favorited");
    if (isFavorited) {
      favoriteBtn.classList.remove("favorited");
      if (heartPath) { heartPath.setAttribute("stroke", "#c67500"); heartPath.setAttribute("fill", "none"); }
    } else {
      favoriteBtn.classList.add("favorited");
      if (heartPath) { heartPath.setAttribute("stroke", "#ff4444"); heartPath.setAttribute("fill", "#ff4444"); }
    }
    favoriteBtn.style.transform = "scale(1.15)";
    setTimeout(() => favoriteBtn.style.transform = "scale(1)", 160);
  });
}

/* ---------------------------
   MODAL FUNCTIONALITY
---------------------------- */
function setupModalFunctionality() {
  const modal = document.getElementById("productModal");
  if (!modal) return;
  const closeBtn = modal.querySelector(".close");
  if (closeBtn) closeBtn.addEventListener("click", () => { modal.style.display = "none"; });
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });
  const increaseBtn = document.getElementById("increase");
  const decreaseBtn = document.getElementById("decrease");
  const quantity = document.getElementById("quantity");
  if (increaseBtn && quantity) increaseBtn.addEventListener("click", () => { quantity.textContent = parseInt(quantity.textContent) + 1; });
  if (decreaseBtn && quantity) decreaseBtn.addEventListener("click", () => {
    const val = parseInt(quantity.textContent) - 1;
    quantity.textContent = val < 1 ? 1 : val;
  });
  const customizeToggle = document.getElementById("customize-toggle");
  const customizePanel = document.getElementById("customize-panel");
  if (customizeToggle && customizePanel) customizeToggle.addEventListener("click", () => {
    customizePanel.style.display = (customizePanel.style.display === "block") ? "none" : "block";
  });

  if (customizePanel) {
    customizePanel.addEventListener("click", (e) => {
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
      if (e.target.closest(".ice-btn")) {
        const btn = e.target.closest(".ice-btn");
        customizePanel.querySelectorAll(".ice-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      }
    });
  }
}

/* =========================================================
   CHECKOUT SLIDER + FORMS
   ========================================================= */
function initCheckout() {
  const sliderTrack = document.getElementById("sliderTrack");
  const steps = Array.from(document.querySelectorAll(".step"));
  const cards = Array.from(document.querySelectorAll(".card"));
  const totalCards = cards.length;
  let index = 0;

  const header = document.getElementById("header");
  const scheduleRow = document.getElementById("scheduleRow");
  const whenRadios = document.getElementsByName("when");
  const orderTypeRadios = document.getElementsByName("orderType");
  const pickupBlock = document.getElementById("pickupBlock");
  const deliveryBlock = document.getElementById("deliveryBlock");
  const paymentRadios = document.getElementsByName("paymentMethod");
  const cardFields = document.getElementById("cardFields");
  const confirmationMessage = document.getElementById("confirmationMessage");

  // helpers
  function updateSlider() {
    sliderTrack.style.transform = `translateX(-${index * 100}%)`;
    steps.forEach(s => s.classList.remove("active"));
    const activeStep = document.querySelector(`.step[data-step="${index}"]`);
    if (activeStep) activeStep.classList.add("active");
  }

  function validateStep(i) {
    // Basic validation for required fields per step
    if (i === 0) {
      // nothing required on order type
      return true;
    }
    if (i === 1) {
      const name = document.getElementById("custName").value.trim();
      const email = document.getElementById("custEmail").value.trim();
      const phone = document.getElementById("custPhone").value.trim();
      return name && email && phone;
    }
    if (i === 2) {
      const orderType = document.querySelector('input[name="orderType"]:checked')?.value;
      if (orderType === "pickup") {
        const pick = document.getElementById("pickupLocation").value;
        return !!pick;
      } else {
        const st = document.getElementById("street").value.trim();
        const city = document.getElementById("city").value.trim();
        const postal = document.getElementById("postal").value.trim();
        return st && city && postal;
      }
    }
    if (i === 3) {
      const method = document.querySelector('input[name="paymentMethod"]:checked')?.value;
      if (!method) return false;
      if (method === "card") {
        const cardNum = document.getElementById("cardNumber").value.replace(/\s/g,'');
        const name = document.getElementById("cardName").value.trim();
        const exp = document.getElementById("cardExp").value;
        const cvv = document.getElementById("cardCvv").value.trim();
        return cardNum.length >= 13 && name && exp && (cvv.length >= 3);
      }
      return true; // cash or apple/google pay
    }
    return true;
  }

  // Next / Back button clicks
  document.querySelectorAll('.next-button').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!validateStep(index)) {
        flashValidation(index);
        return;
      }
      index = Math.min(totalCards - 1, index + 1);
      // If arriving to review, update totals & delivery fee
      if (index === totalCards - 1) updateReview();
      updateSlider();
    });
  });

  document.querySelectorAll('.back-button').forEach(btn => {
    btn.addEventListener('click', () => {
      index = Math.max(0, index - 1);
      updateSlider();
    });
  });

  // Confirm button
  const confirmBtn = document.querySelector('.confirm-button');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (!validateStep(index)) { flashValidation(index); return; }
      // Build confirmation text
      const name = document.getElementById("custName").value.trim();
      const orderType = document.querySelector('input[name="orderType"]:checked')?.value;
      const when = document.querySelector('input[name="when"]:checked')?.value;
      const address = orderType === "delivery" ? `${document.getElementById("street").value}, ${document.getElementById("city").value}` : document.getElementById("pickupLocation").value;
      confirmationMessage.textContent = `Thanks ${name}! Your ${orderType} order${when === 'schedule' ? ' (scheduled)' : ''} will be prepared. We will deliver to: ${address}. Order #${Math.floor(Math.random()*9000)+1000}`;
      confirmationMessage.style.display = "block";
      // Simulate clear / go to start after a short delay
      setTimeout(() => {
        // optionally reset forms
        // document.getElementById('customerForm').reset(); // keep for now
        // go back to start
        index = 0;
        updateSlider();
      }, 2200);
    });
  }

  // order type change shows / hides pickup/delivery block
  orderTypeRadios.forEach(r => r.addEventListener('change', () => {
    const val = document.querySelector('input[name="orderType"]:checked')?.value;
    if (val === 'delivery') {
      pickupBlock.classList.add('hidden');
      deliveryBlock.classList.remove('hidden');
      document.getElementById("deliveryFee").textContent = "20:-";
    } else {
      pickupBlock.classList.remove('hidden');
      deliveryBlock.classList.add('hidden');
      document.getElementById("deliveryFee").textContent = "0:-";
    }
  }));

  // when (ASAP or Schedule)
  whenRadios.forEach(r => r.addEventListener('change', () => {
    const val = document.querySelector('input[name="when"]:checked')?.value;
    if (val === 'schedule') scheduleRow.classList.remove('hidden');
    else scheduleRow.classList.add('hidden');
  }));

  // payment method toggles card fields
  paymentRadios.forEach(r => r.addEventListener('change', () => {
    const val = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    if (val === 'card') cardFields.classList.remove('hidden');
    else cardFields.classList.add('hidden');
  }));

  // tip buttons
  document.querySelectorAll('.tip').forEach(t => {
    t.addEventListener('click', (e) => {
      document.querySelectorAll('.tip').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      document.getElementById('customTip').value = '';
      updateReview();
    });
  });
  document.getElementById('customTip').addEventListener('input', (e) => {
    document.querySelectorAll('.tip').forEach(b => b.classList.remove('active'));
    updateReview();
  });

  // card number formatting (simple)
  const cardNumberInput = document.getElementById('cardNumber');
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').substring(0,16);
      const parts = [];
      for (let i = 0; i < v.length; i += 4) parts.push(v.substring(i, i+4));
      e.target.value = parts.join(' ');
    });
  }

  // initial update
  updateSlider();

  // small helpers for totals (demo values)
  function updateReview() {
    // demo subtotal/tax values — in real app compute from cart
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    let subtotal = 142; // demo
    let tax = Math.round(subtotal * 0.10);
    let delivery = document.getElementById("deliveryFee").textContent.includes("20") ? 20 : 0;
    // tip
    let tipVal = 0;
    const activeTip = document.querySelector('.tip.active');
    if (activeTip) {
      tipVal = Math.round(subtotal * (parseInt(activeTip.dataset.tip) / 100));
    } else {
      const custom = parseFloat(document.getElementById('customTip').value || 0);
      tipVal = isNaN(custom) ? 0 : Math.round(custom);
    }
    subtotalEl.textContent = `${subtotal}:-`;
    taxEl.textContent = `${tax}:-`;
    document.getElementById('deliveryFee').textContent = `${delivery}:-`;
    totalEl.textContent = `${subtotal + tax + delivery + tipVal}:-`;
  }

  // flash validation state
  function flashValidation(i) {
    const card = cards[i];
    if (!card) return;
    card.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' }, { transform: 'translateX(0)' }], { duration: 300 });
  }
}
