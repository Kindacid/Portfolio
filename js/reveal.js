/**
 * Staggered entrance animation for [data-reveal] elements as they scroll
 * into view. Falls back to revealing everything immediately when
 * IntersectionObserver isn't available or the user prefers reduced motion.
 */
(function () {
  "use strict";

  var STAGGER_MS = 60;
  var SAFETY_TIMEOUT_MS = 4000;

  var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  if (!nodes.length) return;

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function reveal(el, delayMs) {
    if (el.hasAttribute("data-revealed")) return;
    el.style.setProperty("--reveal-delay", (delayMs || 0) + "ms");
    el.setAttribute("data-revealed", "");
  }

  if (reduced || !("IntersectionObserver" in window)) {
    nodes.forEach(function (el) {
      reveal(el, 0);
    });
    return;
  }

  var order = 0;
  var observer = new IntersectionObserver(
    function (entries) {
      entries
        .filter(function (entry) {
          return entry.isIntersecting;
        })
        .forEach(function (entry) {
          reveal(entry.target, order * STAGGER_MS);
          order += 1;
          observer.unobserve(entry.target);
        });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.06 }
  );

  nodes.forEach(function (el) {
    observer.observe(el);
  });

  setTimeout(function () {
    nodes.forEach(function (el) {
      reveal(el, 0);
    });
  }, SAFETY_TIMEOUT_MS);
})();
