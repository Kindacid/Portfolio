/**
 * Light/dark theme toggle with a circular "wipe" transition.
 * The starting theme is already applied to <html data-theme> by the
 * small inline script in <head> (before first paint, to avoid a flash
 * of the wrong theme) — this module only wires up the toggle button.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "mv-theme";
  var WIPE_DURATION_MS = 520;
  var WIPE_CLEANUP_MS = 940;

  var root = document.documentElement;
  var toggle = document.querySelector("[data-theme-toggle]");
  var wipe = document.querySelector("[data-theme-wipe]");
  if (!toggle) return;

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function currentTheme() {
    return root.dataset.theme === "light" ? "light" : "dark";
  }

  function syncIcon() {
    toggle.textContent = currentTheme() === "dark" ? "☀" : "☾";
  }

  function persist(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (err) {
      /* localStorage unavailable (private mode, disabled storage) — theme
         still applies for this session, it just won't persist. */
    }
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    persist(theme);
    syncIcon();
  }

  function runWipe(next, originX, originY) {
    var color = next === "dark" ? "#0A0A0C" : "#F5F2FA";
    wipe.style.setProperty("--wipe-color", color);
    wipe.style.setProperty("--wipe-x", originX + "px");
    wipe.style.setProperty("--wipe-y", originY + "px");
    wipe.style.setProperty("--wipe-r", "0px");
    wipe.style.setProperty("--wipe-opacity", "1");

    var maxRadius =
      Math.hypot(
        Math.max(originX, window.innerWidth - originX),
        Math.max(originY, window.innerHeight - originY)
      ) * 1.05;

    requestAnimationFrame(function () {
      wipe.style.setProperty("--wipe-r", maxRadius + "px");
    });

    setTimeout(function () {
      applyTheme(next);
      wipe.style.setProperty("--wipe-opacity", "0");
    }, WIPE_DURATION_MS);

    setTimeout(function () {
      wipe.style.setProperty("--wipe-r", "0px");
    }, WIPE_CLEANUP_MS);
  }

  toggle.addEventListener("click", function (event) {
    var next = currentTheme() === "dark" ? "light" : "dark";

    if (reduced || !wipe) {
      applyTheme(next);
      return;
    }

    var rect = toggle.getBoundingClientRect();
    runWipe(next, rect.left + rect.width / 2, rect.top + rect.height / 2);
  });

  syncIcon();
})();
