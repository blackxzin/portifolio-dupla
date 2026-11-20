import { prefersReducedMotion } from './motion.js';

// Desktop "screen mode": the sections sit side by side on one horizontal strip.
// The mouse wheel moves the strip sideways (eased), each section's content slides in as it enters,
// and sections taller than the screen are scaled down to fit, so nothing ever needs a vertical scroll.

const WHEEL_GAIN = 1.15;
const EASE = 9;            // higher = snappier follow of the wheel target
const SETTLE_PX = 0.4;
const MIN_ZOOM = 0.62;
const VELOCITY_CAP = 4000; // px/s mapped to the full skew of the content

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

function canScrollInside(node, stop, dy) {
  for (let el = node; el && el !== stop; el = el.parentElement) {
    const style = getComputedStyle(el);
    if (!/(auto|scroll)/.test(style.overflowY) || el.scrollHeight <= el.clientHeight + 1) continue;
    if (dy > 0 ? el.scrollTop + el.clientHeight < el.scrollHeight - 1 : el.scrollTop > 0) return true;
  }
  return false;
}

export function createSideTrack(main, { isOn, onMove }) {
  const sections = () => [...main.querySelectorAll('.app-view > section')];
  const reduced = prefersReducedMotion();
  let target = 0;
  let animating = false;
  let last = 0;
  let lastLeft = 0;
  let velocity = 0;
  let paintQueued = false;

  const maxLeft = () => main.scrollWidth - main.clientWidth;

  // Each section's entry progress (0 = just appearing on the right, 1 = fully in) drives its slide-in.
  // Styles are written inline on the few moving elements only, and only when a value really changes,
  // so the browser never has to restyle the whole page during the motion.
  const movers = new Map();
  const moversOf = (section) => {
    if (!movers.has(section)) {
      const box = section.querySelector(':scope > .container');
      const parts = box ? [...box.children] : [];
      movers.set(section, { box, parts, enter: -1, skew: 0 });
    }
    return movers.get(section);
  };

  const paint = () => {
    paintQueued = false;
    const box = main.getBoundingClientRect();
    const skew = reduced ? 0 : clamp(velocity / VELOCITY_CAP, -1, 1) * -2.5;
    sections().forEach((section) => {
      const rect = section.getBoundingClientRect();
      const visible = rect.right > box.left - 40 && rect.left < box.right + 40;
      const m = moversOf(section);
      const enter = reduced ? 1 : Math.round(clamp((box.right - rect.left) / (box.width * 0.85), 0, 1) * 500) / 500;
      if (enter !== m.enter) {
        m.enter = enter;
        const done = enter === 1;
        m.parts.forEach((part) => {
          const isHeader = part.classList.contains('section-header');
          part.style.translate = done ? '' : `${((1 - enter) * (isHeader ? 160 : 320)).toFixed(1)}px 0`;
          part.style.opacity = done ? '' : (isHeader ? 0.15 + enter * 0.85 : 0.1 + enter * 0.9).toFixed(3);
        });
      }
      const nextSkew = visible ? Math.round(skew * 20) / 20 : 0;
      if (m.box && nextSkew !== m.skew) {
        m.skew = nextSkew;
        m.box.style.transform = nextSkew ? `skewX(${nextSkew}deg)` : '';
      }
    });
    onMove();
  };
  const queuePaint = () => {
    if (paintQueued) return;
    paintQueued = true;
    requestAnimationFrame(paint);
  };

  const step = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000) || 0.016;
    last = now;
    const current = main.scrollLeft;
    const next = current + (target - current) * (1 - Math.exp(-dt * EASE));
    main.scrollLeft = Math.abs(target - next) < SETTLE_PX ? target : next;
    velocity = (main.scrollLeft - lastLeft) / dt;
    lastLeft = main.scrollLeft;
    if (main.scrollLeft !== target) { queuePaint(); requestAnimationFrame(step); return; }
    animating = false;
    velocity = 0;
    queuePaint();
  };

  const moveTo = (left) => {
    target = clamp(Math.round(left), 0, maxLeft());
    if (reduced) { main.scrollLeft = target; return; }
    if (animating) return;
    animating = true;
    last = performance.now();
    lastLeft = main.scrollLeft;
    requestAnimationFrame(step);
  };

  main.addEventListener('wheel', (event) => {
    if (!isOn() || event.ctrlKey) return;
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? main.clientWidth : 1;
    const dx = event.deltaX * unit;
    const dy = event.deltaY * unit;
    // Sideways trackpad swipes scroll natively; boxes that scroll on their own (a long text field) keep the wheel.
    if (Math.abs(dx) > Math.abs(dy) || canScrollInside(event.target, main, dy)) return;
    event.preventDefault();
    if (!animating) target = main.scrollLeft;
    moveTo(target + dy * WHEEL_GAIN);
  }, { passive: false });

  main.addEventListener('scroll', () => {
    if (!animating) target = main.scrollLeft;
    queuePaint();
  }, { passive: true });

  const sectionLeft = (section) => main.scrollLeft + section.getBoundingClientRect().left - main.getBoundingClientRect().left;

  const scrollToSection = (section, { instant = false } = {}) => {
    if (!section) return;
    if (instant) { target = clamp(sectionLeft(section), 0, maxLeft()); main.scrollLeft = target; queuePaint(); return; }
    moveTo(sectionLeft(section));
  };

  // Keyboard: arrows / Page keys jump a whole section.
  document.addEventListener('keydown', (event) => {
    if (!isOn() || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.target.closest?.('input, textarea, select, [contenteditable], .project-modal')) return;
    const forward = ['ArrowRight', 'PageDown', 'ArrowDown'].includes(event.key);
    const backward = ['ArrowLeft', 'PageUp', 'ArrowUp'].includes(event.key);
    if (!forward && !backward) return;
    const lefts = sections().map(sectionLeft);
    const now = animating ? target : main.scrollLeft;
    const next = forward ? lefts.find((l) => l > now + 4) : [...lefts].reverse().find((l) => l < now - 4);
    if (next === undefined) return;
    event.preventDefault();
    moveTo(next);
  });

  // Sections keep the screen's height: content that is taller gets scaled down instead of scrolling.
  const fit = () => {
    if (!isOn()) return;
    main.style.setProperty('--panel-w', `${main.clientWidth}px`);
    sections().forEach((section) => {
      const box = section.querySelector(':scope > .container');
      if (!box) return;
      box.style.zoom = '';
      const styles = getComputedStyle(section);
      const room = section.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom);
      const needed = box.offsetHeight;
      box.style.zoom = needed > room ? Math.max(MIN_ZOOM, room / needed).toFixed(3) : '';
    });
    target = clamp(main.scrollLeft, 0, maxLeft());
    queuePaint();
  };
  const clear = () => {
    movers.forEach((m) => {
      m.parts.forEach((part) => { part.style.translate = ''; part.style.opacity = ''; });
      if (m.box) { m.box.style.transform = ''; m.box.style.zoom = ''; }
    });
    movers.clear();
  };

  let fitQueued = false;
  const queueFit = () => {
    if (fitQueued) return;
    fitQueued = true;
    requestAnimationFrame(() => { fitQueued = false; fit(); });
  };
  window.addEventListener('resize', queueFit, { passive: true });
  document.fonts?.ready.then(queueFit);
  window.addEventListener('load', queueFit);
  // Re-rendered lists (project filters, "ver todos") change a section's size.
  const refit = new MutationObserver(queueFit);
  ['projects-grid-container', 'services-grid-container', 'offer-app'].forEach((id) => {
    const node = document.getElementById(id);
    if (node) refit.observe(node, { childList: true });
  });

  return { fit, clear, scrollToSection, queuePaint };
}
