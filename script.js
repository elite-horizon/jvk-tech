/* JVK Technologies — Minimal interaction layer */

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
  });
}

/* Reveal — mark all visible immediately (no scroll animation) */
document.querySelectorAll(".reveal").forEach((el) => {
  el.classList.add("is-visible");
});

/* Contact form */
const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const formData = new FormData(contactForm);
    const recipient = contactForm.dataset.recipient || "admin@jvktech.com";
    const cc = contactForm.dataset.cc || "";
    const subject = formData.get("subject") || "Website enquiry";
    const body = [
      `Name: ${formData.get("name") || ""}`,
      `Email: ${formData.get("email") || ""}`,
      "",
      "Message:",
      formData.get("message") || "",
    ].join("\n");

    const params = new URLSearchParams({
      subject: `Website enquiry: ${subject}`,
      body,
    });

    if (cc) {
      params.set("cc", cc);
    }

    window.location.href = `mailto:${recipient}?${params.toString()}`;
  });
}
