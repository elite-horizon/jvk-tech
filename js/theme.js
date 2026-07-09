/* =========================================================
   THEME.JS — Dark / Light / System theme toggle
   Cycles: system → light → dark → system
   Persists choice in localStorage
   ========================================================= */
(function () {
  "use strict";

  var STORAGE_KEY = "jvk-theme";
  var btn = document.getElementById("themeToggle");
  if (!btn) return;

  var modes = ["system", "light", "dark"];
  var saved = localStorage.getItem(STORAGE_KEY) || "system";
  if (modes.indexOf(saved) === -1) saved = "system";

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function apply(mode) {
    var effective = mode === "system" ? getSystemTheme() : mode;
    document.documentElement.setAttribute("data-theme", effective);

    // Update button class
    if (mode === "system") {
      btn.classList.add("is-system");
    } else {
      btn.classList.remove("is-system");
    }

    btn.setAttribute("aria-label", "Theme: " + mode + ". Click to change.");
  }

  apply(saved);

  btn.addEventListener("click", function () {
    var idx = modes.indexOf(saved);
    saved = modes[(idx + 1) % modes.length];
    localStorage.setItem(STORAGE_KEY, saved);
    apply(saved);
  });

  // Listen for system theme changes when in system mode
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    if (saved === "system") apply("system");
  });
})();
