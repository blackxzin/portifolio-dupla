const REVEAL_GROUPS = [
  '.section-header',
  '.team-cards-grid > *',
  '.synergy-banner',
  '.services-grid > *',
  '.projects-filter-bar',
  '.projects-grid',
  '.offer-details > *',
  '.offer-card-column',
  '.offer-guarantees > *',
  '.process-steps-grid > *',
  '.benefits-grid > *',
  '.contact-card-wrapper',
  '.footer-container > *'
];

const STACK = [
  'Python', 'Java', 'Spring Boot', 'FastAPI', 'React', 'TypeScript', 'Node.js', 'Swift', 'SwiftUI',
  'C#', '.NET', 'Docker', 'PostgreSQL', 'Firebase', 'n8n', 'Unity 3D'
];

const TYPE_DELAY_MS = 45;
const LINE_PAUSE_MS = 380;
const TERMINAL_START_MS = 900;

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Fades/slides elements in as they enter the viewport, staggered per parent.
export function setupReveal(root = document) {
  const targets = [];
  REVEAL_GROUPS.forEach((selector) => {
    root.querySelectorAll(selector).forEach((el) => {
      if (el.hasAttribute('data-reveal')) return;
      const siblings = el.parentElement ? [...el.parentElement.children] : [el];
      el.setAttribute('data-reveal', '');
      el.style.setProperty('--reveal-i', String(Math.max(0, siblings.indexOf(el))));
      targets.push(el);
    });
  });

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  targets.forEach((el) => observer.observe(el));
}

export function renderStackMarquee() {
  const track = document.getElementById('stack-marquee-track');
  if (!track) return;
  const row = STACK.map((tech) => `<span>${tech}</span>`).join('<i aria-hidden="true">/</i>');
  // Two copies keep the CSS loop seamless.
  track.innerHTML = `<div class="stack-marquee-group">${row}<i aria-hidden="true">/</i></div>`
    + `<div class="stack-marquee-group" aria-hidden="true">${row}<i aria-hidden="true">/</i></div>`;
}

// Types the hero terminal commands one after another.
export async function typeTerminal() {
  const terminal = document.getElementById('hero-terminal');
  if (!terminal) return;
  const commands = [...terminal.querySelectorAll('[data-type]')];
  const outputs = [...terminal.querySelectorAll('[data-out]')];

  if (prefersReducedMotion()) {
    commands.forEach((el) => { el.textContent = el.dataset.type; });
    outputs.forEach((el) => el.classList.add('is-shown'));
    return;
  }

  terminal.classList.add('is-typing');
  await wait(TERMINAL_START_MS);
  for (let i = 0; i < commands.length; i += 1) {
    const text = commands[i].dataset.type;
    for (let c = 1; c <= text.length; c += 1) {
      commands[i].textContent = text.slice(0, c);
      await wait(TYPE_DELAY_MS);
    }
    await wait(LINE_PAUSE_MS);
    outputs[i]?.classList.add('is-shown');
  }
  terminal.classList.remove('is-typing');
}

// Header shadow, scroll progress bar, floating button and 3D parallax in one rAF.
export function setupScrollEffects() {
  const header = document.getElementById('main-header');
  const bar = document.getElementById('scroll-progress-bar');
  const floating = document.getElementById('floating-wa');
  const webgl = document.getElementById('webgl-canvas-container');
  const hero = document.getElementById('hero');
  const isStatic = prefersReducedMotion();
  let frame = null;

  const update = () => {
    frame = null;
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header?.classList.toggle('is-scrolled', y > 12);
    if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    if (floating && hero) floating.classList.toggle('is-visible', y > hero.offsetHeight * 0.6);
    if (webgl && !isStatic) {
      const fade = Math.min(1, y / 700);
      webgl.style.setProperty('--scroll-fade', fade.toFixed(3));
    }
  };

  window.addEventListener('scroll', () => {
    if (!frame) frame = requestAnimationFrame(update);
  }, { passive: true });
  update();
}

export function setupMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('mobile-nav');
  if (!toggle || !nav) return;

  const setOpen = (isOpen) => {
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', isOpen);
  };

  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  toggle.addEventListener('click', () => setOpen(!isOpen()));
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  window.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !isOpen()) return;
    setOpen(false);
    toggle.focus();
  });
  document.addEventListener('click', (event) => {
    if (isOpen() && !nav.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
  });
}
