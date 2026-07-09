/* =========================================================
   NAVIGATION.JS — Header navigation behaviors
   - Mobile drawer open/close (button, ESC, outside click)
   - Mega menu keyboard accessibility
   - Active page indicator (sets aria-current based on URL)
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 1. ACTIVE PAGE INDICATOR ---------- */
  // Match current path against nav links to set aria-current
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll('a[data-navlink]').forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return;
    // Strip leading ./ or /
    const target = href.replace(/^\.?\//, "");
    if (target === path) {
      link.setAttribute("aria-current", "page");
      link.classList.add("is-active");
    }
  });

  /* ---------- 2. MOBILE DRAWER ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuToggle && mobileMenu) {
    const openMenu = () => {
      menuToggle.setAttribute("aria-expanded", "true");
      mobileMenu.classList.add("is-open");
      mobileMenu.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };
    const closeMenu = () => {
      menuToggle.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("is-open");
      mobileMenu.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });

    // Close on link click
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) {
        closeMenu();
      }
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (
        mobileMenu.classList.contains("is-open") &&
        !mobileMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        closeMenu();
      }
    });
  }

  /* ---------- 3. MEGA MENU KEYBOARD A11Y ---------- */
  const megaTrigger = document.querySelector(".has-mega > .nav-link");
  if (megaTrigger) {
    const mega = document.querySelector(".has-mega .mega-menu");
    megaTrigger.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (mega) {
          mega.setAttribute("aria-hidden", "false");
          const firstItem = mega.querySelector("a");
          if (firstItem) firstItem.focus();
        }
      }
    });
    if (mega) {
      mega.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          mega.setAttribute("aria-hidden", "true");
          megaTrigger.focus();
        }
      });
      // Close on blur (with small delay to allow moving into it)
      let blurTimer;
      const megaWrap = document.querySelector(".has-mega");
      megaWrap.addEventListener("focusout", () => {
        blurTimer = setTimeout(() => {
          mega.setAttribute("aria-hidden", "true");
        }, 100);
      });
      megaWrap.addEventListener("focusin", () => clearTimeout(blurTimer));
    }
  }
})();
