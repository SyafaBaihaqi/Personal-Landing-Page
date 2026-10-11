(function () {
  "use strict";

  var header = document.getElementById("navbar");
  var navToggle = document.querySelector(".nav-toggle");
  var navMenu = document.getElementById("nav-menu");
  var navLinks = document.querySelectorAll(".nav-link");
  var themeToggle = document.querySelector(".theme-toggle");
  var backToTop = document.querySelector(".back-to-top");
  var yearEl = document.getElementById("year");

  /* ---------- Theme toggle ---------- */
  function setThemeIcon() {
    if (!themeToggle) return;
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    themeToggle.setAttribute(
      "aria-label",
      dark ? "Switch to light theme" : "Switch to dark theme"
    );
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var root = document.documentElement;
      var next =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
      setThemeIcon();
    });
  }
  setThemeIcon();

  /* ---------- Header shadow on scroll ---------- */
  function updateHeader() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 10);
  }

  /* ---------- Back to top ---------- */
  function updateBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle("visible", window.scrollY > 600);
    backToTop.hidden = false;
  }

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    });
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  window.addEventListener(
    "scroll",
    function () {
      updateHeader();
      updateBackToTop();
    },
    { passive: true }
  );
  updateHeader();
  updateBackToTop();

  /* ---------- Mobile navigation ---------- */
  function setMenu(open) {
    if (!navToggle || !navMenu) return;
    navMenu.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      setMenu(!navMenu.classList.contains("open"));
    });

    navMenu.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setMenu(false);
    });

    document.addEventListener("click", function (event) {
      if (
        navMenu.classList.contains("open") &&
        !event.target.closest(".navbar")
      ) {
        setMenu(false);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 992) setMenu(false);
    });
  }

  /* ---------- Active nav state (scroll spy) ---------- */
  var sections = [];
  navLinks.forEach(function (link) {
    var id = link.getAttribute("href");
    if (id && id.charAt(0) === "#") {
      var section = document.querySelector(id);
      if (section) sections.push({ id: id, el: section, link: link });
    }
  });

  function updateActiveLink() {
    if (!sections.length) return;
    var offset = (header ? header.offsetHeight : 72) + 40;
    var current = sections[0];

    for (var i = 0; i < sections.length; i++) {
      if (sections[i].el.getBoundingClientRect().top <= offset) {
        current = sections[i];
      }
    }

    navLinks.forEach(function (link) {
      link.classList.toggle("active", link === current.link);
      if (link === current.link) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !prefersReducedMotion()) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Footer year ---------- */
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
