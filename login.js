const form = document.getElementById("form");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", (e) => {
  let error = [];

  error = getLoginPageErrors(emailInput, passwordInput.value);
  if (error.lenght > 0) {
    e.preventDefault();
    errorMessage.innerText = error.join(", ");
  }
});

function getLoginPageErrors() {}

