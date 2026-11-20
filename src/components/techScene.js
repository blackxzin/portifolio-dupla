import { prefersReducedMotion, isLiteMotion } from './motion.js';

// Generated "video" behind the page: a wireframe terrain the camera flies over, data particles and a rotating core.
// Scroll drives it: on phones the page scroll moves the camera forward; on the desktop strip it also pans sideways.

const RED = '236, 75, 75';
const SOFT = '255, 123, 117';
const FOV = 320;
const DEPTH_STEP = 34;
const FLIGHT = 1400;      // camera travel (world units) over the whole page
const PAN_PER_VIEW = 180; // sideways camera shift per screen width of strip
const SMOOTHING = 5.5;
const MOBILE_WIDTH = 768;

const LITE = isLiteMotion();
const LITE_FPS = 30;           // battery saver / weaker phones: every frame still moves, just at 30 fps

function sceneSize(width) {
  const small = width < MOBILE_WIDTH;
  const base = { cols: small ? 18 : 28, rows: small ? 18 : 26, particles: small ? 55 : 110, spacing: small ? 46 : 40 };
  return LITE ? { cols: small ? 14 : 22, rows: small ? 14 : 20, particles: small ? 30 : 60, spacing: base.spacing + 8 } : base;
}

function terrainHeight(x, z) {
  const valley = Math.min(1, Math.abs(x) / 260);
  return (Math.sin(x * 0.011 + z * 0.006) * 34 + Math.sin(z * 0.017 - x * 0.004) * 22 + Math.cos(x * 0.023) * 10) * valley * valley;
}

function icosahedron() {
  const t = (1 + Math.sqrt(5)) / 2;
  const v = [[-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]];
  const edges = [];
  for (let a = 0; a < v.length; a += 1) {
    for (let b = a + 1; b < v.length; b += 1) {
      const d = Math.hypot(v[a][0] - v[b][0], v[a][1] - v[b][1], v[a][2] - v[b][2]);
      if (d < 2.1) edges.push([a, b]);
    }
  }
  return { vertices: v, edges };
}

function seededParticles(count) {
  let seed = 7;
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  return Array.from({ length: count }, () => ({ x: (rand() - 0.5) * 900, y: -40 - rand() * 260, z: rand() * 900, size: 0.6 + rand() * 1.4 }));
}

const IDLE_FPS = 30;          // when nothing scrolls, the slow drift does not need 60 fps
const SETTLED = 0.00005;

export function setupTechScene() {
  const canvas = document.createElement('canvas');
  canvas.className = 'tech-scene';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
  if (!ctx) { canvas.remove(); return; }

  const core = icosahedron();
  const corePts = core.vertices.map(() => [0, 0, 0]);
  const reduced = prefersReducedMotion();
  const main = document.getElementById('main-content');
  const state = { progress: 0, pan: 0, speed: 0 };
  const target = { progress: 0, pan: 0 };
  const cam = { x: 0, y: 0, z: 0, horizon: 0.42 };
  let width = 0;
  let height = 0;
  let size = sceneSize(window.innerWidth);
  let particles = seededParticles(size.particles);
  let sky = null;
  let glow = null;
  let last = performance.now();
  let lastPaint = 0;
  let clock = 0;
  let running = false;
  let dirty = true;
  // Scroll limits are cached: reading them every frame would force a layout on every frame.
  let maxY = 1;
  let maxX = 1;
  let stripW = 1;

  const isApp = () => document.documentElement.classList.contains('app-mode');

  const measure = () => {
    maxY = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (main) { maxX = Math.max(1, main.scrollWidth - main.clientWidth); stripW = Math.max(1, main.clientWidth); }
    readScroll();
  };

  const readScroll = () => {
    if (isApp() && main) {
      target.progress = Math.min(1, main.scrollLeft / maxX);
      target.pan = main.scrollLeft / stripW;
    } else {
      target.progress = Math.min(1, window.scrollY / maxY);
      target.pan = 0;
    }
    dirty = true;
  };

  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h || (w === width && h === height)) return;
    width = w; height = h;
    const small = w < MOBILE_WIDTH;
    const dpr = Math.min(window.devicePixelRatio || 1, LITE ? 1 : (small ? 1.25 : 1.75));
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const next = sceneSize(w);
    if (next.particles !== size.particles) particles = seededParticles(next.particles);
    size = next;
    // Gradients are built once per size and moved with translate() while drawing.
    const band = h * 0.3;
    sky = ctx.createLinearGradient(0, 0, 0, band * 2);
    sky.addColorStop(0, `rgba(${RED}, 0)`);
    sky.addColorStop(0.55, `rgba(${RED}, 0.07)`);
    sky.addColorStop(1, `rgba(${RED}, 0)`);
    const radius = Math.min(w, h) * (small ? 0.2 : 0.14) * 1.6;
    glow = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
    glow.addColorStop(0, `rgba(${RED}, 0.18)`);
    glow.addColorStop(1, `rgba(${RED}, 0)`);
    measure();
  };

  const drawTerrain = () => {
    const { cols, rows, spacing } = size;
    const startZ = Math.floor(cam.z / DEPTH_STEP) * DEPTH_STEP;
    const maxDepth = rows * DEPTH_STEP;
    const xOffset = Math.round(cam.x / spacing) * spacing;
    const cx = width / 2;
    const cy = height * cam.horizon;
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgb(${RED})`;
    for (let r = rows; r >= 1; r -= 1) {
      const z = startZ + r * DEPTH_STEP;
      const dz = z - cam.z;
      if (dz < 8) continue;
      const scale = FOV / dz;
      ctx.globalAlpha = 0.05 + (1 - dz / maxDepth) * 0.32;
      ctx.beginPath();
      for (let c = 0; c <= cols; c += 1) {
        const x = xOffset + (c - cols / 2) * spacing;
        const px = cx + (x - cam.x) * scale;
        const py = cy + (90 - terrainHeight(x, z) - cam.y) * scale;
        if (c === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 0.12;
    ctx.beginPath();
    for (let c = 0; c <= cols; c += 2) {
      const x = xOffset + (c - cols / 2) * spacing;
      let started = false;
      for (let r = 1; r <= rows; r += 1) {
        const z = startZ + r * DEPTH_STEP;
        const dz = z - cam.z;
        if (dz < 8) continue;
        const scale = FOV / dz;
        const px = cx + (x - cam.x) * scale;
        const py = cy + (90 - terrainHeight(x, z) - cam.y) * scale;
        if (!started) { ctx.moveTo(px, py); started = true; } else ctx.lineTo(px, py);
      }
    }
    ctx.stroke();
  };

  const drawParticles = () => {
    const streak = Math.min(60, Math.abs(state.speed) * 900);
    const cx = width / 2;
    const cy = height * cam.horizon;
    ctx.fillStyle = `rgb(${SOFT})`;
    ctx.strokeStyle = `rgb(${SOFT})`;
    for (let i = 0; i < particles.length; i += 1) {
      const pt = particles[i];
      const z = cam.z + ((pt.z - cam.z) % 900 + 900) % 900 + 10;
      const x = pt.x + Math.round((cam.x - pt.x) / 900) * 900;
      const dz = z - cam.z;
      const scale = FOV / dz;
      const px = cx + (x - cam.x) * scale;
      const py = cy + (pt.y - cam.y) * scale;
      ctx.globalAlpha = Math.min(0.85, (1 - dz / 920) * 0.9);
      if (streak > 2) {
        const tailScale = FOV / (dz + streak);
        ctx.lineWidth = Math.max(0.6, pt.size * scale * 0.6);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(cx + (x - cam.x) * tailScale, cy + (pt.y - cam.y) * tailScale);
        ctx.stroke();
      } else {
        const s = pt.size * scale * 1.4 + 0.6;
        ctx.fillRect(px, py, s, s);
      }
    }
  };

  const drawCore = () => {
    const small = width < MOBILE_WIDTH;
    const radius = Math.min(width, height) * (small ? 0.2 : 0.14);
    const cx = width * (small ? 0.78 : 0.8) - state.pan * 6;
    const cy = height * (small ? 0.2 : 0.3);
    const ay = state.progress * Math.PI * 4 + clock * 0.25;
    const ax = state.progress * Math.PI * 1.5 + 0.4;
    const cosY = Math.cos(ay); const sinY = Math.sin(ay);
    const cosX = Math.cos(ax); const sinX = Math.sin(ax);
    core.vertices.forEach(([x, y, z], i) => {
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      const s = (3.2 / (z2 + 5)) * radius;
      corePts[i][0] = cx + x1 * s; corePts[i][1] = cy + y1 * s; corePts[i][2] = z2;
    });
    ctx.globalAlpha = 1;
    ctx.translate(cx, cy);
    ctx.fillStyle = glow;
    ctx.fillRect(-radius * 1.6, -radius * 1.6, radius * 3.2, radius * 3.2);
    ctx.translate(-cx, -cy);
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgb(${SOFT})`;
    core.edges.forEach(([a, b]) => {
      ctx.globalAlpha = Math.max(0.05, 0.35 - (corePts[a][2] + corePts[b][2]) * 0.06);
      ctx.beginPath(); ctx.moveTo(corePts[a][0], corePts[a][1]); ctx.lineTo(corePts[b][0], corePts[b][1]); ctx.stroke();
    });
    ctx.fillStyle = `rgb(${SOFT})`;
    corePts.forEach(([x, y, z]) => {
      ctx.globalAlpha = Math.max(0.1, 0.7 - z * 0.15);
      ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
    });
    ctx.globalAlpha = 1;
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    cam.x = state.pan * PAN_PER_VIEW + Math.sin(state.progress * Math.PI * 2) * 40;
    cam.y = -30 - state.progress * 25;
    cam.z = state.progress * FLIGHT + clock * 14;
    cam.horizon = 0.42 + state.progress * 0.06;
    const band = height * 0.3;
    const top = height * cam.horizon - band;
    ctx.translate(0, top);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, band * 2);
    ctx.translate(0, -top);
    drawTerrain();
    drawParticles();
    drawCore();
  };

  const frame = (now) => {
    if (!running) return;
    requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!width) return;
    if (reduced) {
      if (!dirty) return;
      state.progress = target.progress; state.pan = target.pan;
      draw();
      dirty = false;
      return;
    }
    const moving = Math.abs(target.progress - state.progress) > SETTLED || Math.abs(target.pan - state.pan) > SETTLED * 20;
    clock += dt;
    // Idle: only the slow drift is left, so paint at a lower rate to save battery.
    if (now - lastPaint < 1000 / (moving && !LITE ? 120 : (LITE ? LITE_FPS : IDLE_FPS)) - 4) return;
    const k = 1 - Math.exp(-dt * SMOOTHING);
    const before = state.progress;
    state.progress += (target.progress - state.progress) * k;
    state.pan += (target.pan - state.pan) * k;
    state.speed = dt > 0 ? (state.progress - before) / dt / 60 : 0;
    lastPaint = now;
    draw();
  };

  const start = () => {
    if (running) return;
    running = true;
    last = performance.now();
    requestAnimationFrame(frame);
  };
  const stop = () => { running = false; };

  window.addEventListener('scroll', readScroll, { passive: true });
  main?.addEventListener('scroll', readScroll, { passive: true });
  window.addEventListener('resize', resize, { passive: true });
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(() => { resize(); measure(); });
    ro.observe(canvas);
    if (main) { ro.observe(main); main.querySelectorAll('.app-view').forEach((view) => ro.observe(view)); }
    ro.observe(document.body);
  }
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  resize();
  start();
}
