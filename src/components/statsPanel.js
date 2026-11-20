import { projectsData } from '../data/portfolioData.js';
import { prefersReducedMotion } from './motion.js';

// Status panel: every number here is counted from the portfolio data, so it stays true as projects are added.
const COUNT_MS = 1400;
const CATEGORY_LABELS = {
  web: 'Sites e sistemas web',
  ai: 'IA e automações',
  mobile: 'Apps, desktop e games',
  security: 'APIs e segurança'
};

const pad = (n) => String(n).padStart(2, '0');

function computeStats(projects) {
  const techs = new Set(projects.flatMap((p) => p.techs));
  const byCategory = Object.keys(CATEGORY_LABELS).map((key) => ({
    key,
    label: CATEGORY_LABELS[key],
    count: projects.filter((p) => p.category === key).length
  }));
  return {
    counters: [
      { value: projects.length, label: 'Projetos no portfólio', note: 'Missões concluídas' },
      { value: projects.filter((p) => p.demo).length, label: 'Demos ao vivo', note: 'Abra e teste agora' },
      { value: techs.size, label: 'Tecnologias usadas', note: 'Somando todos os projetos' },
      { value: 2, label: 'Desenvolvedores', note: 'Você fala direto com quem faz' }
    ],
    byCategory
  };
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function countUp(node, target) {
  if (prefersReducedMotion()) { node.textContent = pad(target); return; }
  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / COUNT_MS);
    const eased = 1 - Math.pow(1 - t, 4);
    node.textContent = pad(Math.round(target * eased));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function setupStatsPanel() {
  const grid = document.getElementById('stats-grid');
  const bars = document.getElementById('stats-bars');
  if (!grid || !bars) return;
  const { counters, byCategory } = computeStats(projectsData);
  const max = Math.max(...byCategory.map((c) => c.count), 1);

  const numbers = counters.map((item, i) => {
    const card = el('article', 'stat-tile');
    card.style.setProperty('--i', i);
    const value = el('strong', 'stat-tile-value', '00');
    value.dataset.target = item.value;
    card.append(el('span', 'stat-tile-index', pad(i + 1)), value, el('h3', 'stat-tile-label', item.label), el('p', 'stat-tile-note', item.note));
    grid.append(card);
    return value;
  });

  bars.append(el('h3', 'stats-bars-title', 'Projetos por área'));
  byCategory.forEach((cat, i) => {
    const row = el('div', 'stat-bar');
    row.style.setProperty('--fill', (cat.count / max).toFixed(3));
    row.style.setProperty('--i', i);
    const track = el('div', 'stat-bar-track');
    track.append(el('span'));
    row.append(el('span', 'stat-bar-label', cat.label), el('b', 'stat-bar-count', pad(cat.count)), track);
    bars.append(row);
  });

  const section = document.getElementById('stats');
  let played = false;
  const play = () => {
    if (played) return;
    played = true;
    section.classList.add('is-live');
    numbers.forEach((node) => countUp(node, Number(node.dataset.target)));
  };
  if (!('IntersectionObserver' in window)) { play(); return; }
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) { play(); io.disconnect(); }
  }, { threshold: 0.25 });
  io.observe(section);
}
