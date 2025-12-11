const firstNameInput = document.getElementById("firstname-input");
const lastNameInput = document.getElementById("lastname-input");
const dateInput = document.getElementById("DateofBirth-input");
const nextBtn = document.getElementById("nextBtn");

function validateInputs() {
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const dateOfBirth = dateInput.value;

  nextBtn.addEventListener("click", () => {
    if (!nextBtn.disabled) {
      window.location.href = "signupNextPage.html";
    }
  });

  if (firstName !== "" && lastName !== "" && dateOfBirth !== "") {
    nextBtn.disabled = false;
    nextBtn.classList.add("active");
  } else {
    nextBtn.disabled = true;
    nextBtn.classList.remove("active");
  }
}
firstNameInput.addEventListener("input", validateInputs);
lastNameInput.addEventListener("input", validateInputs);
dateInput.addEventListener("input", validateInputs);
