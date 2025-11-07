// Mobile Menu Toggle
const mobileToggle = document.getElementById("mobileToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileClose = document.getElementById("mobileClose");

mobileToggle.addEventListener("click", () => {
  mobileMenu.classList.add("open");
});

mobileClose.addEventListener("click", () => {
  mobileMenu.classList.remove("open");
});
