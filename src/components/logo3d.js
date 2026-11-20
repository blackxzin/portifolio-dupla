import { prefersReducedMotion, isLiteMotion } from './motion.js';

// NovaTech emblem as a 3D object: stacked layers give it thickness, it follows the pointer,
// sways on its own and turns a little with the page scroll. Paused while off screen.

const DEPTH_LAYERS = 9;
const LAYER_GAP = 1.6;      // px between depth layers
const MAX_TURN_Y = 26;      // deg from the pointer
const MAX_TURN_X = 14;
const SWAY = 12;            // deg of idle sway
const FOLLOW = 6;           // higher = snappier follow

function buildEmblem(root) {
  const body = root.querySelector('.logo3d-body');
  if (!body || body.childElementCount) return;
  const small = matchMedia('(max-width: 768px)').matches;
  const layers = isLiteMotion() ? 3 : (small ? DEPTH_LAYERS - 4 : DEPTH_LAYERS);
  for (let i = layers; i >= 1; i -= 1) {
    const img = new Image();
    img.src = '/brand/novatech-emblem-depth.webp';
    img.alt = '';
    img.decoding = 'async';
    img.style.transform = `translateZ(${(-i * LAYER_GAP).toFixed(1)}px)`;
    body.append(img);
  }
  const face = new Image();
  face.src = '/brand/novatech-emblem.webp';
  face.alt = '';
  face.className = 'logo3d-face';
  body.append(face);
}

export function setupLogo3d() {
  const root = document.getElementById('logo3d');
  if (!root) return;
  buildEmblem(root);
  const stage = root.querySelector('.logo3d-stage');
  if (!stage || prefersReducedMotion()) return;

  let targetX = 0;
  let targetY = 0;
  let x = 0;
  let y = 0;
  let last = 0;
  let running = false;
  let visible = true;

  window.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return;
    targetX = (event.clientX / window.innerWidth - 0.5) * 2;
    targetY = (event.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  const frame = (now) => {
    if (!visible) { running = false; return; }
    const dt = Math.min(0.05, (now - last) / 1000) || 0.016;
    last = now;
    const k = 1 - Math.exp(-dt * FOLLOW);
    x += (targetX - x) * k;
    y += (targetY - y) * k;
    const sway = Math.sin(now / 2400) * SWAY;
    const bob = Math.sin(now / 1700) * 6;
    const scrollTurn = Math.min(40, window.scrollY * 0.05);
    stage.style.transform = `translate3d(0, ${bob.toFixed(2)}px, 0) rotateX(${(8 - y * MAX_TURN_X + scrollTurn * 0.4).toFixed(2)}deg) rotateY(${(x * MAX_TURN_Y + sway + scrollTurn).toFixed(2)}deg)`;
    requestAnimationFrame(frame);
  };
  const start = () => {
    if (running) return;
    running = true;
    last = performance.now();
    requestAnimationFrame(frame);
  };

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden;
      if (visible) start();
    }).observe(root);
  }
  document.addEventListener('visibilitychange', () => {
    visible = !document.hidden;
    if (visible) start();
  });
  start();
}
