import { STACK_GROUPS } from '../data/novatech.js';
import { prefersReducedMotion } from './motion.js';

// "Com o que trabalhamos": every tool floats on a 3D sphere that turns on its own and can be dragged.
// Picking a tool (or a group card) lights up its group, so the visitor sees what each tool is for.

const AUTO_SPIN = 0.18;   // rad/s
const DRAG_GAIN = 0.006;  // rad per dragged px
const FRICTION = 2.2;

const escape = (text) => text.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function spherePoints(count) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    return [Math.cos(theta) * r, y, Math.sin(theta) * r];
  });
}

function renderGroups(list) {
  list.innerHTML = STACK_GROUPS.map((group, index) => `
    <li class="stack-group" data-group="${group.id}" tabindex="0">
      <span class="stack-group-index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
      <div>
        <h3>${escape(group.label)}</h3>
        <p>${escape(group.why)}</p>
        <div class="stack-group-tools">${group.tools.map((tool) => `<span>${escape(tool)}</span>`).join('')}</div>
      </div>
    </li>`).join('');
}

function renderSphere(sphere) {
  const tools = STACK_GROUPS.flatMap((group) => group.tools.map((tool) => ({ tool, group: group.id })));
  sphere.innerHTML = tools.map(({ tool, group }) =>
    `<button type="button" class="orbit-tag" data-group="${group}">${escape(tool)}</button>`).join('');
  return [...sphere.querySelectorAll('.orbit-tag')];
}

export function setupStackOrbit() {
  const sphere = document.getElementById('stack-sphere');
  const list = document.getElementById('stack-groups');
  if (!sphere || !list) return;
  renderGroups(list);
  const tags = renderSphere(sphere);
  const points = spherePoints(tags.length);
  const reduced = prefersReducedMotion();

  const highlight = (groupId) => {
    sphere.dataset.active = groupId || '';
    tags.forEach((tag) => tag.classList.toggle('is-on', tag.dataset.group === groupId));
    list.querySelectorAll('.stack-group').forEach((item) => item.classList.toggle('is-on', item.dataset.group === groupId));
  };
  sphere.addEventListener('click', (event) => {
    const tag = event.target.closest('.orbit-tag');
    if (tag) highlight(sphere.dataset.active === tag.dataset.group ? '' : tag.dataset.group);
  });
  list.addEventListener('pointerover', (event) => {
    const item = event.target.closest('.stack-group');
    if (item) highlight(item.dataset.group);
  });
  list.addEventListener('focusin', (event) => {
    const item = event.target.closest('.stack-group');
    if (item) highlight(item.dataset.group);
  });

  let radius = 1;
  const measure = () => { radius = sphere.clientWidth * 0.42; };
  measure();
  new ResizeObserver(measure).observe(sphere);

  let angleY = 0;
  let angleX = -0.25;
  let spinY = AUTO_SPIN;
  let spinX = 0;
  let dragging = null;

  const place = () => {
    const cy = Math.cos(angleY); const sy = Math.sin(angleY);
    const cx = Math.cos(angleX); const sx = Math.sin(angleX);
    points.forEach(([px, py, pz], i) => {
      const x1 = px * cy + pz * sy;
      const z1 = -px * sy + pz * cy;
      const y2 = py * cx - z1 * sx;
      const z2 = py * sx + z1 * cx;
      const depth = (z2 + 1) / 2; // 0 back .. 1 front
      const scale = 0.62 + depth * 0.55;
      const tag = tags[i];
      // Real depth (translateZ) lets the compositor sort front and back tags, so no z-index repaint per frame.
      tag.style.transform = `translate(-50%, -50%) translate3d(${(x1 * radius).toFixed(1)}px, ${(y2 * radius).toFixed(1)}px, ${(z2 * radius).toFixed(1)}px) scale(${scale.toFixed(3)})`;
      tag.style.opacity = (0.22 + depth * 0.78).toFixed(2);
    });
  };

  sphere.addEventListener('pointerdown', (event) => {
    dragging = { x: event.clientX, y: event.clientY, id: event.pointerId, moved: 0 };
  });
  window.addEventListener('pointermove', (event) => {
    if (!dragging || event.pointerId !== dragging.id) return;
    const dx = event.clientX - dragging.x;
    const dy = event.clientY - dragging.y;
    dragging.x = event.clientX; dragging.y = event.clientY;
    dragging.moved += Math.abs(dx) + Math.abs(dy);
    spinY = dx * DRAG_GAIN * 60;
    spinX = -dy * DRAG_GAIN * 60;
  }, { passive: true });
  window.addEventListener('pointerup', () => { dragging = null; });

  place();
  if (reduced) return;

  let visible = false;
  let running = false;
  let last = 0;
  const frame = (now) => {
    if (!visible) { running = false; return; }
    const dt = Math.min(0.05, (now - last) / 1000) || 0.016;
    last = now;
    if (!dragging) {
      const k = 1 - Math.exp(-dt * FRICTION);
      spinY += (AUTO_SPIN - spinY) * k;
      spinX += (0 - spinX) * k;
    }
    angleY += spinY * dt;
    angleX = Math.max(-1.1, Math.min(1.1, angleX + spinX * dt));
    place();
    requestAnimationFrame(frame);
  };
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !running) { running = true; last = performance.now(); requestAnimationFrame(frame); }
  }).observe(sphere);
}
