/* =========================================================
   CONTACT.JS — Forms and interactive UI
   - Contact form (mailto composition)
   - Newsletter form (demo confirmation)
   - FAQ accordion (single-open, accessible)
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 1. CONTACT FORM (mailto composition) ---------- */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      const formData = new FormData(contactForm);
      const recipient = contactForm.dataset.recipient || "admin@jvktech.com";
      const cc = contactForm.dataset.cc || "";
      const subject = formData.get("subject") || "Website enquiry";
      const body = [
        "Name: " + (formData.get("name") || ""),
        "Email: " + (formData.get("email") || ""),
        "",
        "Message:",
        formData.get("message") || "",
      ].join("\n");

      const params = new URLSearchParams({
        subject: "Website enquiry: " + subject,
        body: body,
      });
      if (cc) params.set("cc", cc);

      window.location.href =
        "mailto:" + recipient + "?" + params.toString();

      const note = contactForm.querySelector(".form-note");
      if (note) {
        note.textContent =
          "Opening your email app — if nothing happens, write to admin@jvktech.com directly.";
      }
    });
  }

  /* ---------- 2. NEWSLETTER FORM (demo) ---------- */
  const newsletter = document.getElementById("newsletterForm");
  if (newsletter) {
    newsletter.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsletter.querySelector("input");
      if (!input || !input.value || !input.checkValidity()) return;
      // Swap to confirmation state
      newsletter.innerHTML =
        '<p class="newsletter-confirm" style="font-family:var(--font-serif);font-style:italic;font-size:15px;color:var(--gold);margin:0;">Thank you — you are on the list.</p>';
    });
  }

  /* ---------- 3. FAQ ACCORDION ---------- */
  const faqList = document.getElementById("faqList");
  if (faqList) {
    const items = faqList.querySelectorAll(".faq-item");
    items.forEach((item) => {
      const btn = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      if (!btn || !answer) return;
      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        // Close all
        items.forEach((other) => {
          other.classList.remove("is-open");
          const oBtn = other.querySelector(".faq-question");
          const oAnswer = other.querySelector(".faq-answer");
          if (oBtn) oBtn.setAttribute("aria-expanded", "false");
          if (oAnswer) oAnswer.style.maxHeight = null;
        });
        // Open this
        if (!isOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });
  }
})();
