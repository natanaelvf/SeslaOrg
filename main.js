/* ============================================================
   SESLA — JavaScript
   Scroll reveal · Typewriter · Smooth scroll · Parallax
   ============================================================ */

(function () {
  "use strict";

  // --- Typewriter Effect ---
  const typewriterEl = document.getElementById("typewriter");
  const quotes = [
    "«A beleza salvará o mundo.» — Dostoiévski",
    "«Toda a arte é inútil.» — Oscar Wilde",
    "«Escrever é dar voz ao silêncio.»",
    "«O essencial é invisível aos olhos.» — Saint-Exupéry",
    "«Um livro é um sonho que seguras na mão.» — Neil Gaiman",
  ];

  let quoteIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let currentText = "";

  function typewrite() {
    if (!typewriterEl) return;

    const fullQuote = quotes[quoteIndex];

    if (isDeleting) {
      currentText = fullQuote.substring(0, charIndex - 1);
      charIndex--;
    } else {
      currentText = fullQuote.substring(0, charIndex + 1);
      charIndex++;
    }

    typewriterEl.innerHTML =
      currentText + '<span class="cursor" aria-hidden="true"></span>';

    let delay = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === fullQuote.length) {
      delay = 3000; // pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      quoteIndex = (quoteIndex + 1) % quotes.length;
      delay = 500; // pause between quotes
    }

    setTimeout(typewrite, delay);
  }

  // Start after a brief delay
  setTimeout(typewrite, 1200);

  // --- Scroll Reveal (Intersection Observer) ---
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // --- Smooth Scroll for Nav Links ---
  document.querySelectorAll('#nav a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // --- Parallax on Hero ---
  const heroBgText = document.querySelector(".hero-bg-text");
  const heroLogo = document.getElementById("hero-logo");

  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Only apply parallax in the hero region
      if (scrollY < viewportHeight * 1.5) {
        if (heroBgText) {
          heroBgText.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.3}px))`;
        }
        if (heroLogo) {
          heroLogo.style.transform = `translateY(${scrollY * 0.15}px)`;
        }
      }

      // Nav subtle background on scroll
      const nav = document.getElementById("nav");
      if (nav) {
        if (scrollY > 100) {
          nav.style.mixBlendMode = "normal";
          nav.style.background = "rgba(10, 10, 10, 0.85)";
          nav.style.backdropFilter = "blur(12px)";
        } else {
          nav.style.mixBlendMode = "difference";
          nav.style.background = "transparent";
          nav.style.backdropFilter = "none";
        }
      }

      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  // --- Hover grain effect on color blocks ---
  document.querySelectorAll(".color-block").forEach((block) => {
    block.style.transition = "border-color 0.4s ease, padding-left 0.4s ease";
    block.addEventListener("mouseenter", () => {
      block.style.paddingLeft = "1rem";
    });
    block.addEventListener("mouseleave", () => {
      block.style.paddingLeft = "0";
    });
  });
})();
