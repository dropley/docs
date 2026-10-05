const toggle = document.querySelector("#theme-toggle");

toggle?.addEventListener("click", () => {
  const dusk = document.body.dataset.theme !== "dusk";
  document.body.dataset.theme = dusk ? "dusk" : "";
  toggle.textContent = dusk ? "Use light theme" : "Use dusk theme";
});
