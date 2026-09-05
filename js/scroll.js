/**
 * One rAF-throttled scroll listener driving two things, same as the
 * original prototype:
 *  - parallax offsets on [data-par] elements
 *  - the active nav link, highlighted once its section crosses 40% of
 *    the viewport height
 * Smooth scrolling itself needs no JS — the nav links are real
 * `<a href="#id">` anchors and `scroll-behavior: smooth` (base.css)
 * already handles that natively.
 */
(function () {
  "use strict";

  var SECTION_IDS = ["inicio", "sobre", "experiencia", "estudos", "stacks", "projetos", "contato"];

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var layers = Array.prototype.slice.call(document.querySelectorAll("[data-par]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".navbar__link"));
  if (!layers.length && !navLinks.length) return;

  var ticking = false;
  var activeId = null;

  function updateParallax(viewportHeight) {
    if (reduced) return;
    layers.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      var distance = rect.top + rect.height / 2 - viewportHeight / 2;
      var factor = parseFloat(el.dataset.par);
      el.style.transform = "translate3d(0," + (distance * factor * -1).toFixed(2) + "px,0)";
    });
  }

  function updateActiveSection(viewportHeight) {
    var current = SECTION_IDS[0];
    SECTION_IDS.forEach(function (id) {
      var section = document.getElementById(id);
      if (section && section.getBoundingClientRect().top <= viewportHeight * 0.4) {
        current = id;
      }
    });

    if (current === activeId) return;
    activeId = current;

    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + current;
      link.classList.toggle("is-active", isActive);
    });
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var viewportHeight = window.innerHeight;
      updateParallax(viewportHeight);
      updateActiveSection(viewportHeight);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();
})();
