/* =========================================================
   MAIN.JS — Core page behaviors (loaded on every page)
   - Page loader hide on load
   - Footer year
   - Image drag prevention
   - Scroll progress bar
   - Sticky header glass effect
   - Reveal-on-scroll (IntersectionObserver, staggered)
   - Image reveal (clip-path wipe)
   - Hero title line reveal (homepage only)
   - Parallax (data-parallax)
   - Magnetic buttons ([data-magnetic])
   - Button ripple effect
   - Counter animations (data-counter)
   - Process timeline progress fill
   - Back-to-top button
   - Smooth anchor scrolling
   ========================================================= */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const isTouch = window.matchMedia(
    "(hover: none), (pointer: coarse)"
  ).matches;

  /* ---------- 1. PAGE LOADER ---------- */
  const loader = document.getElementById("pageLoader");
  if (loader) {
    const hideLoader = () => {
      setTimeout(() => {
        loader.classList.add("is-hidden");
        setTimeout(() => {
          if (loader.parentNode) loader.parentNode.removeChild(loader);
        }, 900);
      }, 600);
    };
    if (document.readyState === "complete") hideLoader();
    else window.addEventListener("load", hideLoader);
    // Safety fallback
    setTimeout(() => {
      if (loader && !loader.classList.contains("is-hidden")) {
        loader.classList.add("is-hidden");
        setTimeout(
          () => loader.parentNode && loader.parentNode.removeChild(loader),
          900
        );
      }
    }, 4000);
  }

  /* ---------- 2. FOOTER YEAR ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 3. PREVENT IMAGE DRAG ---------- */
  document.querySelectorAll("img").forEach((img) =>
    img.setAttribute("draggable", "false")
  );

  /* ---------- 4. SCROLL PROGRESS BAR ---------- */
  const progress = document.getElementById("scrollProgress");
  if (progress) {
    const updateProgress = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      progress.style.width = Math.min(100, Math.max(0, pct)) + "%";
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  /* ---------- 5. STICKY HEADER ---------- */
  const header = document.getElementById("siteHeader");
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 40) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- 6. REVEAL ON SCROLL ---------- */
  const revealEls = document.querySelectorAll(
    "[data-reveal], [data-reveal-image]"
  );
  if (revealEls.length) {
    if ("IntersectionObserver" in window && !prefersReducedMotion) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const delay = parseInt(entry.target.dataset.delay || "0", 10);
              setTimeout(
                () => entry.target.classList.add("is-visible"),
                delay * 80
              );
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      revealEls.forEach((el) => obs.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }
  }

  /* ---------- 7. HERO TITLE LINE REVEAL (homepage) ---------- */
  const titleLines = document.querySelectorAll(".title-line[data-reveal-line]");
  if (titleLines.length) {
    titleLines.forEach((line) => {
      const text = line.textContent;
      line.textContent = "";
      const inner = document.createElement("span");
      inner.className = "reveal-inner";
      inner.textContent = text;
      line.appendChild(inner);
    });
    window.addEventListener("load", () => {
      const startDelay = 300;
      titleLines.forEach((line) => {
        const idx = parseInt(line.dataset.revealLine || "0", 10);
        setTimeout(
          () => line.classList.add("is-revealed"),
          startDelay + idx * 180
        );
      });
      const heroExtras = [
        ".hero-eyebrow",
        ".hero-copy",
        ".hero-actions",
        ".hero-float-1",
        ".hero-float-2",
      ];
      heroExtras.forEach((sel, i) => {
        const el = document.querySelector(sel);
        if (el) {
          setTimeout(
            () => el.classList.add("is-revealed"),
            startDelay + titleLines.length * 180 + i * 140
          );
        }
      });
    });
  }

  /* ---------- 8. PARALLAX ---------- */
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  if (parallaxEls.length && !prefersReducedMotion && !isTouch) {
    let ticking = false;
    const update = () => {
      const scrollY = window.scrollY;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0;
        const rect = el.getBoundingClientRect();
        if (rect.bottom > -200 && rect.top < window.innerHeight + 200) {
          const offset =
            (rect.top + scrollY - window.innerHeight / 2) * speed;
          el.style.transform = `translate3d(0, ${offset}px, 0)`;
        }
      });
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
  }

  /* ---------- 9. MAGNETIC BUTTONS ---------- */
  const magnetics = document.querySelectorAll("[data-magnetic]");
  if (magnetics.length && !isTouch && !prefersReducedMotion) {
    magnetics.forEach((el) => {
      const strength = 0.3;
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* ---------- 10. BUTTON RIPPLE ---------- */
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  /* ---------- 11. COUNTER ANIMATIONS ---------- */
  const counters = document.querySelectorAll("[data-counter]");
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.counter, 10);
    const suffix = el.dataset.suffix || "";
    if (prefersReducedMotion || isNaN(target)) {
      el.textContent = target + suffix;
      return;
    }
    const duration = 1800;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (counters.length && "IntersectionObserver" in window) {
    const cObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCounter(e.target);
            cObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => cObs.observe(c));
  } else {
    counters.forEach((c) => animateCounter(c));
  }

  /* ---------- 12. PROCESS TIMELINE PROGRESS ---------- */
  const processSteps = document.querySelectorAll(".process-step");
  const processFill = document.getElementById("processFill");
  const processContainer = document.querySelector(".process-steps");
  if (processSteps.length && processFill && processContainer) {
    const update = () => {
      const rect = processContainer.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.65;
      const end = -rect.height + vh * 0.35;
      const scrolled = start - rect.top;
      const total = start - end;
      const pct = Math.min(1, Math.max(0, scrolled / total));
      processFill.style.width = pct * 100 + "%";

      let activeIdx = 0;
      if (pct > 0.45) activeIdx = 1;
      if (pct > 0.95) activeIdx = 2;
      processSteps.forEach((step, i) => {
        step.classList.toggle("is-active", i === activeIdx);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  /* ---------- 13. BACK TO TOP ---------- */
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  }

  /* ---------- 15. SMOOTH ANCHOR SCROLLING ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#" || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: top,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }
    });
  });
})();
