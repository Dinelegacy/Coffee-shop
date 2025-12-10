let currentStep = 0;
const steps = document.querySelectorAll(".step");
const slider = document.querySelector(".slider-track");

// Move forward
function nextStep() {
    if (currentStep < 4) {
        currentStep++;
        updateSlider();
    }
}

// Move backward
function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        updateSlider();
    }
}

// Update slider + progress dots
function updateSlider() {
    slider.style.transform = `translateX(-${currentStep * 100}%)`;

    steps.forEach((step, index) => {
        step.classList.toggle("active", index <= currentStep);
    });
}

/* TIP SELECTION */
let selectedTip = 0;
function selectTip(amount) {
    selectedTip = amount;

    document.querySelectorAll(".tip").forEach(t => t.classList.remove("active"));
    event.target.classList.add("active");

    document.getElementById("summary-tip").innerText = `$${amount.toFixed(2)}`;

    const baseTotal = 15.40;
    document.getElementById("summary-total").innerText = `$${(baseTotal + amount).toFixed(2)}`;
}

/* Confirm order */
function confirmOrder() {
    nextStep();
    document.getElementById("orderMessage").style.display = "block";
}
