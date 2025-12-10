const form = document.getElementById("form-inputs");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const errorMessage = document.getElementById("error-message");
const submitButton = document.getElementById(".login");

form.addEventListener("submit", (e) => {
  let error = [];

  error = getLoginPageErrors(emailInput.value, passwordInput.value);
  if (error.length > 0) {
    e.preventDefault();
    errorMessage.innerText = error.join(", ");
  }
});

function getLoginPageErrors(email, password) {
  let errors = [];

  if (email === "" || email == null) {
    errors.push("Email is required");
    emailInput.parentElement.classList.add("incorrect");
  }

  if (password === "" || password == null) {
    errors.push("Password is required");
    passwordInput.parentElement.classList.add("incorrect");
  }

  return errors;
}

const allInputs = [emailInput, passwordInput];
allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.parentElement.classList.remove("incorrect");
    errorMessage.innerText = "";
  });
});
