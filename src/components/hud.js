import { prefersReducedMotion } from './motion.js';
import { SECTION_IDS } from '../data/hudContent.js';

const CARD_SELECTOR = '.project-card, .developer-profile-card, .benefit-card, .process-step-card, .offer-card, .offer-include-group, .contact-card-wrapper, .terminal-card';
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_';
const SCRAMBLE_MS = 650;
const INTERACTIVE = 'a, button, input, select, textarea, [role="button"], .phone-tab, .tilt-card';

const pad = (n) => String(n).padStart(2, '0');

// Adds the four corner brackets + spotlight layer to every card, including cards rendered later (project filters).
function setupCorners(revealObserver) {
  const decorate = () => {
    document.querySelectorAll(CARD_SELECTOR).forEach((card) => {
      if (card.classList.contains('hud-card')) return;
      card.classList.add('hud-card');
      const layer = document.createElement('span');
      layer.className = 'hud-corners';
      layer.setAttribute('aria-hidden', 'true');
      layer.append(document.createElement('i'), document.createElement('i'), document.createElement('i'), document.createElement('i'));
      card.prepend(layer);
      revealObserver.observe(card);
    });
  };
  decorate();
  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; decorate(); });
  }).observe(document.querySelector('main') || document.body, { childList: true, subtree: true });
}

function setupSpotlight() {
  let frame = 0;
  document.addEventListener('pointermove', (event) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const card = event.target.closest?.('.hud-card');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const layer = card.querySelector(':scope > .hud-corners');
      if (!layer) return;
      layer.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      layer.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  }, { passive: true });
}

function scramble(node) {
  const final = node.textContent;
  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / SCRAMBLE_MS);
    const settled = Math.floor(t * final.length);
    node.textContent = [...final].map((ch, i) => (i < settled || ch === ' ' ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join('');
    if (t < 1) requestAnimationFrame(step);
    else node.textContent = final;
  };
  requestAnimationFrame(step);
}

// Numbers each section label ("03 / ORÇAMENTO SOB MEDIDA") and decodes the text when it scrolls into view.
function setupSectionLabels() {
  const reduce = prefersReducedMotion();
  const observer = reduce ? null : new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      scramble(entry.target.querySelector('.hud-label'));
    });
  }, { threshold: 0.8 });

  SECTION_IDS.forEach((id, index) => {
    const tag = document.querySelector(`#${id} .section-tag`);
    if (!tag || tag.querySelector('.hud-index')) return;
    const index$ = document.createElement('span');
    index$.className = 'hud-index';
    index$.setAttribute('aria-hidden', 'true');
    index$.textContent = pad(index + 1);
    const label = document.createElement('span');
    label.className = 'hud-label';
    label.textContent = tag.textContent;
    tag.replaceChildren(index$, label);
    observer?.observe(tag);
  });
}

function setupCursor() {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const ring = document.createElement('div');
  ring.className = 'hud-cursor';
  ring.setAttribute('aria-hidden', 'true');
  document.body.append(ring);
  let x = 0; let y = 0; let rx = 0; let ry = 0; let running = false;
  const tick = () => {
    rx += (x - rx) * 0.22; ry += (y - ry) * 0.22;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    if (Math.abs(x - rx) + Math.abs(y - ry) > 0.3) requestAnimationFrame(tick);
    else running = false;
  };
  document.addEventListener('pointermove', (event) => {
    x = event.clientX; y = event.clientY;
    ring.classList.add('is-on');
    ring.classList.toggle('is-active', Boolean(event.target.closest?.(INTERACTIVE)));
    if (!running) { running = true; requestAnimationFrame(tick); }
  }, { passive: true });
  document.addEventListener('pointerleave', () => ring.classList.remove('is-on'));
}

export function setupHud() {
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('hud-on');
      cardObserver.unobserve(entry.target);
    });
  }, { threshold: 0.25 });

  setupCorners(cardObserver);
  setupSpotlight();
  setupSectionLabels();
  if (!prefersReducedMotion()) setupCursor();
}
