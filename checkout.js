/* ---------------------------
   CHECKOUT FORM HANDLER
---------------------------- */
const checkoutForm = document.getElementById("checkoutForm");
const orderMessage = document.getElementById("orderMessage");

if (checkoutForm) {
  checkoutForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Get form values
    const customerData = {
      name: this.name.value,
      email: this.email.value,
      phone: this.phone.value,
      address: this.address.value,
      city: this.city.value,
      postal: this.postal.value
    };

    // For demo: display success message
    orderMessage.textContent = `Thank you, ${customerData.name}! Your order will be delivered to ${customerData.address}, ${customerData.city} (${customerData.postal}).`;
    orderMessage.style.display = "block";

    // Reset form
    this.reset();

    // Optionally scroll to message
    orderMessage.scrollIntoView({ behavior: "smooth" });
  });
}
