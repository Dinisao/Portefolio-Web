// Modo claro/escuro
const toggle = document.getElementById("toggleMode");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  toggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
});

// Animações com ScrollReveal
ScrollReveal().reveal(".card", {
  duration: 800,
  origin: "bottom",
  distance: "50px",
  reset: false,
  interval: 200
});

ScrollReveal().reveal(".hero-content", {
  duration: 1000,
  origin: "top",
  distance: "50px"
});