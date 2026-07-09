/* =========================================================
   FAB.JS — Floating contact bubble toggle
   ========================================================= */
(function () {
  "use strict";
  const fab = document.getElementById("fabWrap");
  if (!fab) return;
  const btn = fab.querySelector(".fab-btn");
  if (!btn) return;

  btn.addEventListener("click", function () {
    fab.classList.toggle("is-open");
  });

  // Close when clicking outside
  document.addEventListener("click", function (e) {
    if (!fab.contains(e.target)) {
      fab.classList.remove("is-open");
    }
  });
})();
