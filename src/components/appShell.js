import { VIEWS, QUESTS } from '../data/hudContent.js';
import { projectsData } from '../data/portfolioData.js';
import { prefersReducedMotion } from './motion.js';

const APP_QUERY = '(min-width: 1100px) and (min-height: 600px)';
const ENTER_MS = 650;
const WHEEL_STEP = 40;

const pad = (n) => String(n).padStart(2, '0');

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function field(label, value) {
  const row = el('div', 'hud-field');
  row.append(el('span', '', label), el('strong', '', value));
  return row;
}

function viewOfSection(id) {
  return VIEWS.find((view) => view.sections.includes(id));
}

// Groups the page sections into screens. On narrow screens the wrappers have no styling, so the page scrolls as before.
function buildViews() {
  const main = document.getElementById('main-content');
  const views = new Map();
  VIEWS.forEach((view) => {
    const wrapper = el('div', 'app-view');
    wrapper.dataset.view = view.id;
    view.sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) wrapper.append(section);
    });
    views.set(view.id, wrapper);
    main.append(wrapper);
  });
  const marquee = main.querySelector('.stack-marquee');
  if (marquee) views.get('examples').insertBefore(marquee, views.get('examples').children[1] || null);
  const footer = document.querySelector('.site-footer');
  if (footer) views.get('contact').append(footer);
  return views;
}

function buildTopBar() {
  const bar = el('div', 'app-top');
  bar.setAttribute('role', 'navigation');
  bar.setAttribute('aria-label', 'Telas do site');

  const brand = el('a', 'app-brand');
  brand.href = '#intro';
  brand.append('Lucas ', el('span', '', '& Felipe'));

  const tabs = el('div', 'app-tabs');
  VIEWS.forEach((view, index) => {
    const tab = el('a', 'app-tab');
    tab.href = `#${view.sections[0]}`;
    tab.dataset.view = view.id;
    tab.append(el('i', '', pad(index + 1)), view.label);
    tabs.append(tab);
  });

  const stats = el('div', 'app-stats');
  stats.innerHTML = `<span><b>02</b> devs</span><span><b>${pad(projectsData.length)}</b> projetos</span>`
    + '<span class="app-stat-time">Sessão <b data-t="session">00:00</b></span><span>Hora local <b data-t="clock">--:--</b></span>';
  bar.append(brand, tabs, stats);
  return bar;
}

function buildPlayerPanel() {
  const panel = el('aside', 'hud-panel hud-player');
  panel.setAttribute('aria-hidden', 'true');
  const portraits = el('div', 'hud-portraits');
  document.querySelectorAll('.dev-avatar').forEach((img) => {
    const frame = el('div', 'hud-portrait');
    const copy = el('img');
    copy.src = img.currentSrc || img.src; copy.alt = ''; copy.loading = 'lazy'; copy.decoding = 'async';
    frame.append(copy);
    portraits.append(frame);
  });
  const availability = field('Disponibilidade', '');
  availability.lastChild.replaceWith(el('span', 'hud-open', 'Abertos a projetos'));
  panel.append(portraits, field('Dupla', 'Lucas & Felipe'), field('Ocupação', 'Devs web e sistemas'), field('Classe', 'Sites + automações'), availability);
  panel.append(el('p', 'hud-motto', 'Lema: site que traz cliente.'));
  return panel;
}

function buildQuestPanel() {
  const panel = el('aside', 'hud-panel hud-quest');
  panel.setAttribute('aria-hidden', 'true');
  const head = el('div', 'hud-quest-head');
  head.append(el('b', '', 'Missão ativa'), el('span'));
  head.lastChild.dataset.q = 'section';
  const name = field('Nome da missão', ''); name.lastChild.dataset.q = 'name';
  const goal = el('div', 'hud-field'); goal.append(el('span', '', 'Objetivo'), el('p')); goal.lastChild.dataset.q = 'goal';
  const rewards = el('div', 'hud-field'); rewards.append(el('span', '', 'Recompensa'), el('div', 'hud-rewards')); rewards.lastChild.dataset.q = 'rewards';
  const talk = el('a', 'hud-talk', 'Aceitar missão');
  talk.href = document.querySelector('[data-wa]')?.getAttribute('href') || '#contact';
  talk.target = '_blank'; talk.rel = 'noopener noreferrer'; talk.tabIndex = -1;
  panel.append(head, name, goal, rewards, talk);
  return panel;
}

export function setupAppShell() {
  const main = document.getElementById('main-content');
  if (!main) return;

  const views = buildViews();
  const frame = el('div', 'hud-frame');
  frame.setAttribute('aria-hidden', 'true');
  frame.append(el('i'), el('i'), el('i'), el('i'));
  const top = buildTopBar();
  const player = buildPlayerPanel();
  const quest = buildQuestPanel();
  document.body.append(frame, top, player, quest);

  const q = (key) => quest.querySelector(`[data-q="${key}"]`);
  const tabs = [...top.querySelectorAll('.app-tab')];
  const mq = window.matchMedia(APP_QUERY);
  let activeId = null;
  let shownSection = null;

  const updateQuest = () => {
    const view = views.get(activeId);
    if (!view) return;
    const probe = view.getBoundingClientRect().top + view.clientHeight * 0.4;
    const sections = [...view.querySelectorAll(':scope > section')];
    let current = sections[0];
    sections.forEach((section) => { if (section.getBoundingClientRect().top <= probe) current = section; });
    if (!current || current.id === shownSection) return;
    shownSection = current.id;
    const [name, goal, rewards] = QUESTS[current.id];
    q('section').textContent = VIEWS.find((v) => v.id === activeId).label;
    q('name').textContent = name;
    q('goal').textContent = goal;
    q('rewards').replaceChildren(...rewards.map((text) => el('em', '', text)));
    quest.classList.remove('is-swap');
    void quest.offsetWidth;
    if (!prefersReducedMotion()) quest.classList.add('is-swap');
  };

  const activate = (viewId, targetId) => {
    if (!views.has(viewId)) return;
    const changed = viewId !== activeId;
    activeId = viewId;
    views.forEach((wrapper, id) => {
      wrapper.classList.toggle('is-active', id === viewId);
      if (id === viewId && changed && !prefersReducedMotion()) {
        wrapper.classList.add('is-entering');
        setTimeout(() => wrapper.classList.remove('is-entering'), ENTER_MS);
      }
    });
    tabs.forEach((tab) => {
      const isCurrent = tab.dataset.view === viewId;
      tab.classList.toggle('is-active', isCurrent);
      if (isCurrent) tab.setAttribute('aria-current', 'page'); else tab.removeAttribute('aria-current');
    });
    top.dataset.index = pad(VIEWS.findIndex((v) => v.id === viewId) + 1);
    const wrapper = views.get(viewId);
    const target = targetId && document.getElementById(targetId);
    if (target && wrapper.contains(target) && target !== wrapper.firstElementChild) target.scrollIntoView({ block: 'start' });
    else wrapper.scrollTop = 0;
    shownSection = null;
    updateQuest();
  };

  const goTo = (id, { push = true } = {}) => {
    const view = viewOfSection(id);
    if (!view) return false;
    activate(view.id, id);
    if (push) history.replaceState(null, '', `#${id}`);
    return true;
  };

  // In screen mode every in-page link opens the screen that holds its target section.
  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[href^="#"]');
    if (!link || !document.documentElement.classList.contains('app-mode')) return;
    const id = link.getAttribute('href').slice(1);
    if (!id || !goTo(id)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);

  views.forEach((wrapper) => wrapper.addEventListener('scroll', () => requestAnimationFrame(updateQuest), { passive: true }));

  // The welcome screen has nothing to scroll: a wheel gesture moves on to the next screen.
  views.get('welcome').addEventListener('wheel', (event) => {
    if (event.deltaY > WHEEL_STEP && document.documentElement.classList.contains('app-mode')) goTo('hero');
  }, { passive: true });

  const startedAt = Date.now();
  const clock = top.querySelector('[data-t="clock"]');
  const session = top.querySelector('[data-t="session"]');
  const tick = () => {
    clock.textContent = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const secs = Math.floor((Date.now() - startedAt) / 1000);
    session.textContent = `${pad(Math.floor(secs / 60) % 100)}:${pad(secs % 60)}`;
  };
  tick();
  setInterval(tick, 1000);

  const sync = () => {
    const on = mq.matches;
    document.documentElement.classList.toggle('app-mode', on);
    if (!on) return;
    const hash = decodeURIComponent(location.hash.slice(1));
    if (!goTo(hash || 'intro', { push: false })) activate('welcome');
  };
  mq.addEventListener('change', sync);
  window.addEventListener('hashchange', () => { if (mq.matches) goTo(decodeURIComponent(location.hash.slice(1)), { push: false }); });
  sync();
}
