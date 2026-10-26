import { HERO_EXAMPLES } from '../data/examples.js';
import { prefersReducedMotion } from './motion.js';

const FADE_MS = 180;

// Lets visitors flip the hero phone between the example sites.
export function setupHeroExamples() {
  const phone = document.getElementById('hero-phone');
  const image = document.getElementById('phone-scroll');
  const chip = document.getElementById('phone-chip');
  const link = document.getElementById('phone-link');
  if (!phone || !image || !chip || !link) return;
  const tabs = [...phone.querySelectorAll('.phone-tab')];
  if (!tabs.length) return;

  const apply = (example) => {
    image.src = example.image;
    image.width = example.width;
    image.height = example.height;
    image.alt = example.alt;
    image.dataset.example = example.id;
    image.style.setProperty('--scroll-duration', `${example.duration}s`);
    // Restart the scroll animation from the top for the new screenshot.
    image.style.animation = 'none';
    void image.offsetWidth;
    image.style.animation = '';
    chip.textContent = example.chip;
    link.textContent = example.linkText;
    link.href = example.href;
  };

  const select = (id) => {
    const example = HERO_EXAMPLES.find((item) => item.id === id);
    if (!example || image.dataset.example === id) return;
    tabs.forEach((tab) => tab.setAttribute('aria-pressed', String(tab.dataset.example === id)));

    if (prefersReducedMotion()) {
      apply(example);
      return;
    }
    image.classList.add('is-swapping');
    window.setTimeout(() => {
      image.addEventListener('load', () => image.classList.remove('is-swapping'), { once: true });
      apply(example);
      if (image.complete) image.classList.remove('is-swapping');
    }, FADE_MS);
  };

  tabs.forEach((tab) => tab.addEventListener('click', () => select(tab.dataset.example)));

  // Warm the cache so the first switch does not wait for the network.
  const warm = () => HERO_EXAMPLES.slice(1).forEach((example) => { new Image().src = example.image; });
  if ('requestIdleCallback' in window) window.requestIdleCallback(warm, { timeout: 4000 });
  else window.setTimeout(warm, 2000);
}
