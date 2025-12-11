 export function enableSwipe() {
  let startX = 0;
  let currentX = 0;

  document.querySelectorAll(".cart-item").forEach(item => {

    item.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      currentX = startX;
    });

    item.addEventListener("touchmove", (e) => {
      currentX = e.touches[0].clientX;
    });

    item.addEventListener("touchend", (e) => {
      const diff = startX - currentX;

      // 1️⃣ If touching inside PLUS or MINUS → DO NOT CLOSE SWIPE
      if (e.target.closest(".plus") || e.target.closest(".minus")) {
        return; 
      }

      // 2️⃣ Ignore tiny finger movement (tap)
      if (Math.abs(diff) < 40) return;

      // 3️⃣ Swipe left → open actions
      if (diff > 40) {
        item.classList.add("show-actions");
      }

      // 4️⃣ Swipe right → close actions
      if (diff < -50) {
        item.classList.remove("show-actions");
      }
    });
  });
}
