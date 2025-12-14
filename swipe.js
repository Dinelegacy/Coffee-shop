 export function enableSwipe() {
  let startX = 0;
  let currentX = 0;

  document.querySelectorAll(".cart-item").forEach(item => {

    item.addEventListener("touchstart", (swipeLeftRight) => {
      startX = swipeLeftRight.touches[0].clientX;
      currentX = startX;
    });

    item.addEventListener("touchmove", (swipeLeftRight) => {
      currentX = swipeLeftRight.touches[0].clientX;
    });

    item.addEventListener("touchend", (swipeLeftRight) => {
      const diff = startX - currentX;

      // 1️⃣ If touching inside PLUS or MINUS → DO NOT CLOSE SWIPE
      if (swipeLeftRight.target.closest(".plus") || swipeLeftRight.target.closest(".minus")) {
        return; 
      }

      // 2️⃣ Ignore small swipes
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
