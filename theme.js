(function () {
  'use strict';

  var root = document.documentElement;
  var STORAGE_KEY = 'jordanos-theme';
  var BOOT_KEY = 'jordanos-booted';

  /* ---------- Theme (persisted via Local Storage) ---------- */
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* storage unavailable */ }
  }

  var savedTheme = null;
  try { savedTheme = localStorage.getItem(STORAGE_KEY); } catch (e) { /* storage unavailable */ }
  if (savedTheme === 'dark' || savedTheme === 'light') {
    applyTheme(savedTheme);
  }

  var themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------- Mobile nav ---------- */
  var burger = document.querySelector('.nav-burger');
  var navlinks = document.querySelector('.navlinks');
  if (burger && navlinks) {
    burger.addEventListener('click', function () {
      navlinks.classList.toggle('mobile-open');
      var isOpen = navlinks.classList.contains('mobile-open');
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  /* ---------- Scroll reveals ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Boot sequence (once per browser session) ---------- */
  var bootOverlay = document.getElementById('bootOverlay');
  if (bootOverlay) {
    var alreadyBooted = false;
    try { alreadyBooted = sessionStorage.getItem(BOOT_KEY) === 'true'; } catch (e) { /* storage unavailable */ }
    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (alreadyBooted || reducedMotion) {
      bootOverlay.classList.add('hidden');
      bootOverlay.setAttribute('aria-hidden', 'true');
    } else {
      window.setTimeout(function () {
        bootOverlay.classList.add('hidden');
        bootOverlay.setAttribute('aria-hidden', 'true');
        try { sessionStorage.setItem(BOOT_KEY, 'true'); } catch (e) { /* storage unavailable */ }
      }, 1700);
    }
  }
})();
