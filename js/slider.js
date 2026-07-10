/* =========================================================
   SLIDER.JS — Quote / testimonial slider
   - Auto-advance with pause on hover
   - Pause when out of view (IntersectionObserver)
   - Manual prev/next arrows
   - Dot navigation
   - Keyboard arrow navigation when slider focused
   ========================================================= */
(function () {
  "use strict";

  const slider = document.getElementById("quoteSlider");
  if (!slider) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const slides = slider.querySelectorAll(".quote-slide");
  const dotsContainer = document.getElementById("quoteDots");
  const prevBtn = document.getElementById("quotePrev");
  const nextBtn = document.getElementById("quoteNext");

  let current = 0;
  let timer = null;
  const INTERVAL = 5800;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", "Slide " + (i + 1));
    if (i === 0) dot.classList.add("is-active");
    dot.addEventListener("click", () => {
      goTo(i);
      restart();
    });
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll("button");

  function goTo(idx) {
    if (!slides[current] || !dots[current]) return;
    slides[current].classList.remove("is-active");
    dots[current].classList.remove("is-active");
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add("is-active");
    dots[current].classList.add("is-active");
  }
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  function start() {
    if (!prefersReducedMotion) timer = setInterval(next, INTERVAL);
  }
  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }
  function restart() {
    stop();
    start();
  }

  if (nextBtn) nextBtn.addEventListener("click", () => { next(); restart(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { prev(); restart(); });

  start();
  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);

  // Pause when out of view
  if ("IntersectionObserver" in window) {
    const sObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? start() : stop())),
      { threshold: 0.2 }
    );
    sObs.observe(slider);
  }

  // Keyboard navigation
  slider.tabIndex = 0;
  slider.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { next(); restart(); }
    if (e.key === "ArrowLeft") { prev(); restart(); }
  });
})();
