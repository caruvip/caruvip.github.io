// YEAR FOOTER
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  // CONTACT FORM SUBMIT
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const statusEl = document.getElementById("contact-status");

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        if (statusEl) {
          statusEl.textContent = "Fill in all fields before submitting.";
          statusEl.className = "form-status error";
        }
        return;
      }

      if (statusEl) {
        statusEl.textContent = "Sending...";
        statusEl.className = "form-status pending";
      }

      try {
        const res = await fetch(contactForm.action, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ name, email, message }),
        });

        if (res.ok) {
          if (statusEl) {
            statusEl.textContent =
              "Message sent, I will reply as soon as possible.";
            statusEl.className = "form-status success";
          }
          contactForm.reset();
        } else {
          let data = {};
          try {
            data = await res.json();
          } catch (_) {}
          if (statusEl) {
            statusEl.textContent =
              data.error || "Something went wrong. Please try again.";
            statusEl.className = "form-status error";
          }
        }
      } catch (err) {
        console.error(err);
        if (statusEl) {
          statusEl.textContent =
            "Network error. Check your connection and try again.";
          statusEl.className = "form-status error";
        }
      }
    });
  }

  // MOBILE NAV TOGGLE
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }

  // FADE UP ON SCROLL
  const fadeEls = document.querySelectorAll(".fade-up");
  if ("IntersectionObserver" in window && fadeEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    fadeEls.forEach((el) => observer.observe(el));
  } else {
    fadeEls.forEach((el) => el.classList.add("visible"));
  }

  // WORKS FILTERS
  const filterChips = document.querySelectorAll(".filter-chip");
  const workCards = document.querySelectorAll(".works-grid .work-card");

  if (filterChips.length && workCards.length) {
    filterChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const type = chip.getAttribute("data-filter");

        filterChips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");

        workCards.forEach((card) => {
          const cardType = card.getAttribute("data-type");
          if (type === "all" || type === cardType) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }
});
