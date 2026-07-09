// Theme toggle — persists choice in localStorage
(function() {
  const root = document.documentElement;
  const saved = localStorage.getItem('jn-theme');
  if (saved) root.setAttribute('data-theme', saved);

  window.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        const next = current === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', next);
        localStorage.setItem('jn-theme', next);
      });
    }

    const burger = document.querySelector('.nav-burger');
    const navlinks = document.querySelector('.navlinks');
    if (burger && navlinks) {
      burger.addEventListener('click', () => navlinks.classList.toggle('mobile-open'));
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); } });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  });
})();
