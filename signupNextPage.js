const emailInput = document.getElementById("email-input");
const mobileInput = document.getElementById("mobileNumber-input");
const newPasswordInput = document.getElementById("NewPassword-input");
const repeatPasswordInput = document.getElementById("RepeatPassword-input");
const signUpBtn = document.getElementById("SignupBtn");

function validateSignUpInputs() {
  const email = emailInput.value.trim();
  const mobileNumber = mobileInput.value.trim();
  const newPassword = newPasswordInput.value.trim();
  const repeatPassword = repeatPasswordInput.value.trim();
  if (
    email !== "" &&
    mobileNumber !== "" &&
    newPassword !== "" &&
    repeatPassword !== ""
  ) {
    signUpBtn.disabled = false;
    signUpBtn.classList.add("active");
  } else {
    signUpBtn.disabled = true;
    signUpBtn.classList.remove("active");
  }
}

emailInput.addEventListener("input", validateSignUpInputs);
mobileInput.addEventListener("input", validateSignUpInputs);
newPasswordInput.addEventListener("input", validateSignUpInputs);
repeatPasswordInput.addEventListener("input", validateSignUpInputs);
