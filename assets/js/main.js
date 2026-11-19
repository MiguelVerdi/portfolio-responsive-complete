// Mobile menu
const toggle = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Menu';
  }));
}

// Highlight the nav link for the section on screen
const links = document.querySelectorAll('.nav__link[href^="#"]');
const byId = {};
links.forEach(l => { byId[l.getAttribute('href').slice(1)] = l; });

if ('IntersectionObserver' in window && links.length) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(l => l.classList.remove('is-active'));
      const link = byId[e.target.id];
      if (link) link.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  Object.keys(byId).forEach(id => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
}

// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
