const tabs = document.querySelectorAll(".payment-tab");
const forms = document.querySelectorAll(".payment-form");
const payBtn = document.getElementById("checkoutBtn");

let activeForm = document.querySelector(".payment-form.active");

// SWITCH PAYMENT METHOD
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    forms.forEach(f => f.classList.remove("active"));

    tab.classList.add("active");
    activeForm = document.getElementById(`${tab.dataset.method}-form`);
    activeForm.classList.add("active");

    validateForm();
  });
});

// VALIDATION
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", validateForm);
});

function validateForm() {
  const inputs = activeForm.querySelectorAll("input");
  let valid = true;

  inputs.forEach(input => {
    if (!input.checkValidity() || input.value.trim() === "") {
      valid = false;
    }
  });

  payBtn.disabled = !valid;
}

// PAY BUTTON ACTION
payBtn.addEventListener("click", () => {
  alert("Payment successful ☕");
});
