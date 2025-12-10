// Get elements
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const loginBtn = document.getElementById("login");

// Function to validate fields
function validateForm() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email !== "" && password !== "") {
        loginBtn.disabled = false;
        loginBtn.classList.add("active");
    } else {
        loginBtn.disabled = true;
        loginBtn.classList.remove("active");
    }
}

// Attach listeners
emailInput.addEventListener("input", validateForm);
passwordInput.addEventListener("input", validateForm);
