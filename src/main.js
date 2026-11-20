import './style.css';
import './styles/motion.css';
import './styles/offer.css';
import './styles/polish.css';
import './styles/bot.css';
import './styles/hud.css';
import './styles/gameui.css';
import './styles/scene.css';
import './styles/strip.css';
import './styles/novatech.css';
import { projectsData, freelanceBenefits, processSteps } from './data/portfolioData.js';
import { applyTiltEffect } from './components/tiltEffect.js';
import { setupProjectModal } from './components/projectModal.js';
import { iconSvg } from './components/icon.js';
import { bindWhatsappLinks, whatsappUrl } from './data/contact.js';
import { setupOfferSection } from './components/offerSection.js';
import { setupBotDemo } from './components/botDemo.js';
import { setupHeroExamples } from './components/heroExamples.js';
import { setupHud } from './components/hud.js';
import { setupAppShell } from './components/appShell.js';
import { setupTechScene } from './components/techScene.js';
import { setupStatsPanel } from './components/statsPanel.js';
import { setupLogo3d } from './components/logo3d.js';
import { setupStackOrbit } from './components/stackOrbit.js';
import { PILLARS } from './data/novatech.js';
import {
  setupReveal, renderStackMarquee, setupHeroPhone, setupScrollEffects, setupMobileMenu
} from './components/motion.js';

const TILT_DEGREES = 5;
const FEATURED_LIMIT = 6;

// Application Controller
class PortfolioApp {
  constructor() {
    this.currentFilter = 'all';
    this.searchQuery = '';
    this.modalController = null;
    this.showAllProjects = false;
  }

  init() {
    // 2. Initialize Subcomponents
    this.modalController = setupProjectModal();

    // 3. Render Dynamic Content
    this.renderServices();
    this.renderProcessSteps();
    this.renderBenefits();
    this.renderProjects();

    // 4. Attach Interactions
    this.bindFiltersAndSearch();
    this.bindContactForm();
    this.bindScrollSpy();

    // 5. Apply 3D Tilt on initial cards
    this.refreshTiltCards();

    // 6. Offer, motion & contact links
    setupOfferSection();
    setupBotDemo();
    renderStackMarquee();
    bindWhatsappLinks();
    setupMobileMenu();
    setupScrollEffects();
    setupReveal();
    setupHeroPhone();
    setupHeroExamples();
    setupStatsPanel();
    setupLogo3d();
    setupStackOrbit();
    setupAppShell();
    setupHud();
    setupTechScene();

    // Visit counter (cookieless). Production only, loaded after the page is interactive.
    if (import.meta.env.PROD) {
      import('@vercel/analytics')
        .then(({ inject }) => inject())
        .catch(() => {});
    }
  }

  refreshTiltCards() {
    const tiltCards = document.querySelectorAll('.tilt-card');
    applyTiltEffect(tiltCards, TILT_DEGREES);
  }

  renderServices() {
    const container = document.getElementById('services-grid-container');
    if (!container) return;

    container.innerHTML = PILLARS.map((pillar, index) => `
      <article class="pillar-card tilt-card" id="pillar-${pillar.id}">
        <div class="pillar-depth" aria-hidden="true"></div>
        <header class="pillar-head">
          <span class="pillar-icon">${iconSvg(pillar.icon)}</span>
          <span class="service-index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
        </header>
        <h3 class="pillar-title">${pillar.title}</h3>
        <p class="pillar-what">${pillar.what}</p>
        <p class="pillar-for"><span>Para quem</span>${pillar.forWho}</p>
        <div class="pillar-block">
          <span class="pillar-label">O que você recebe</span>
          <ul class="service-deliverables-list">${pillar.delivers.map((d) => `<li>${d}</li>`).join('')}</ul>
        </div>
        <div class="pillar-tools" aria-label="Ferramentas">${pillar.tools.map((t) => `<span>${t}</span>`).join('')}</div>
      </article>
    `).join('');
  }

  renderProcessSteps() {
    const container = document.getElementById('process-steps-container');
    if (!container) return;

    container.innerHTML = processSteps.map(step => `
      <div class="process-step-card tilt-card">
        <div class="step-card-num">${step.step}</div>
        <h3 class="step-card-title">${step.title}</h3>
        <p class="step-card-desc">${step.desc}</p>
      </div>
    `).join('');
  }

  renderBenefits() {
    const container = document.getElementById('benefits-grid-container');
    if (!container) return;

    container.innerHTML = freelanceBenefits.map(b => `
      <div class="benefit-card tilt-card">
        <span class="benefit-icon">${iconSvg(b.icon)}</span>
        <h3 class="benefit-title">${b.title}</h3>
        <p class="benefit-desc">${b.desc}</p>
      </div>
    `).join('');
  }

  // Cards from `animateFrom` on fade in; search keystrokes pass Infinity to avoid flicker.
  renderProjects({ animateFrom = 0 } = {}) {
    const container = document.getElementById('projects-grid-container');
    const emptyState = document.getElementById('projects-empty-state');
    if (!container) return;

    // Filter logic
    let filtered = projectsData.filter(p => {
      // Category / author filter
      let matchesFilter = true;
      if (this.currentFilter === 'duo') {
        matchesFilter = p.badge.includes('Colaboração') || p.author.includes('&');
      } else if (this.currentFilter === 'lucas') {
        matchesFilter = p.author.includes('Lucas');
      } else if (this.currentFilter === 'felipe') {
        matchesFilter = p.author.includes('Felipe');
      } else if (this.currentFilter === 'ai') {
        matchesFilter = p.category === 'ai';
      } else if (this.currentFilter === 'web') {
        matchesFilter = p.category === 'web';
      } else if (this.currentFilter === 'mobile') {
        matchesFilter = p.category === 'mobile';
      } else if (this.currentFilter === 'security') {
        matchesFilter = p.category === 'security';
      }

      // Search Query
      let matchesSearch = true;
      if (this.searchQuery.trim() !== '') {
        const q = this.searchQuery.toLowerCase();
        const inTitle = p.title.toLowerCase().includes(q);
        const inDesc = p.shortDesc.toLowerCase().includes(q) || p.longDesc.toLowerCase().includes(q);
        const inTech = p.techs.some(t => t.toLowerCase().includes(q));
        const inAuthor = p.author.toLowerCase().includes(q);
        matchesSearch = inTitle || inDesc || inTech || inAuthor;
      }

      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = '';
      this.updateProjectsToggle(false, 0);
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    // Without filter or search, lead with the featured projects.
    const isBrowsingAll = this.currentFilter === 'all' && this.searchQuery.trim() === '';
    const ordered = isBrowsingAll
      ? [...filtered].sort((a, b) => Number(b.featured) - Number(a.featured))
      : filtered;
    const visible = isBrowsingAll && !this.showAllProjects ? ordered.slice(0, FEATURED_LIMIT) : ordered;
    this.updateProjectsToggle(isBrowsingAll, filtered.length);

    container.innerHTML = visible.map((p, index) => `
      <article class="project-card tilt-card${index >= animateFrom ? ' is-entering' : ''}" data-project-id="${p.id}" style="--enter-i:${(index - animateFrom) % FEATURED_LIMIT}">
        <div class="card-top-row">
          <span class="project-author-pill">
            ${p.badge}
          </span>
          <span class="project-category-tag">${p.categoryLabel}</span>
        </div>

        <h3 class="project-card-title">${p.title}</h3>
        <p class="project-card-desc">${p.shortDesc}</p>

        <div class="project-tech-list">
          ${p.techs.slice(0, 4).map(t => `<span class="tech-tag-sm">${t}</span>`).join('')}
          ${p.techs.length > 4 ? `<span class="tech-tag-sm">+${p.techs.length - 4}</span>` : ''}
        </div>

        <div class="project-metrics-pill">
          ${iconSvg('code')}
          <span>${Object.values(p.metrics || {})[0] || p.categoryLabel}</span>
        </div>

        <div class="project-card-actions">
          <button type="button" class="btn btn-secondary btn-sm btn-open-detail" data-detail-id="${p.id}">
            Detalhes
          </button>
          <a href="${p.demo || p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
            ${p.demo ? 'Ver ao vivo ↗' : 'GitHub'}
          </a>
        </div>
      </article>
    `).join('');

    // Attach click listeners to cards
    container.querySelectorAll('.btn-open-detail').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-detail-id');
        const proj = projectsData.find(item => item.id === id);
        if (proj && this.modalController) {
          this.modalController.open(proj);
        }
      });
    });

    // Re-apply tilt
    this.refreshTiltCards();
  }

  updateProjectsToggle(isBrowsingAll, total) {
    const wrapper = document.getElementById('projects-more');
    const button = document.getElementById('projects-toggle-all');
    if (!wrapper || !button) return;
    wrapper.style.display = isBrowsingAll && total > FEATURED_LIMIT ? '' : 'none';
    button.textContent = this.showAllProjects ? 'Mostrar menos' : `Ver todos os ${total} projetos`;
    button.setAttribute('aria-expanded', String(this.showAllProjects));
  }

  bindFiltersAndSearch() {
    const toggleAll = document.getElementById('projects-toggle-all');
    if (toggleAll) {
      toggleAll.addEventListener('click', () => {
        this.showAllProjects = !this.showAllProjects;
        this.renderProjects({ animateFrom: this.showAllProjects ? FEATURED_LIMIT : Infinity });
        if (!this.showAllProjects) {
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    const filterTabs = document.querySelectorAll('.filter-tab');
    const searchInput = document.getElementById('project-search-input');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const resetFilterBtn = document.getElementById('reset-filter-btn');

    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentFilter = tab.getAttribute('data-filter') || 'all';
        this.renderProjects();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        if (clearSearchBtn) {
          clearSearchBtn.style.display = this.searchQuery ? 'block' : 'none';
        }
        this.renderProjects({ animateFrom: Infinity });
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        this.searchQuery = '';
        clearSearchBtn.style.display = 'none';
        this.renderProjects();
      });
    }

    if (resetFilterBtn) {
      resetFilterBtn.addEventListener('click', () => {
        this.currentFilter = 'all';
        this.searchQuery = '';
        if (searchInput) searchInput.value = '';
        filterTabs.forEach(t => t.classList.remove('active'));
        const allTab = document.querySelector('[data-filter="all"]');
        if (allTab) allTab.classList.add('active');
        this.renderProjects();
      });
    }
  }

  bindContactForm() {
    const form = document.getElementById('quick-contact-form');
    const feedback = document.getElementById('form-feedback-msg');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const contact = document.getElementById('form-contact').value.trim();
      const type = document.getElementById('form-type').value;
      const message = document.getElementById('form-message').value.trim();

      const text = `Olá, Lucas e Felipe! Me chamo ${name} (${contact}). Gostaria de conversar sobre um projeto de ${type}: "${message}".`;
      const url = whatsappUrl(text);
      window.open(url, '_blank', 'noopener');

      if (feedback) {
        // Built with DOM nodes: the visitor's name never goes through innerHTML.
        const intro = document.createElement('span');
        intro.textContent = `Obrigado, ${name}! O WhatsApp abriu com a sua mensagem pronta. `;
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Não abriu? Clique aqui.';
        feedback.className = 'form-feedback-message success';
        feedback.replaceChildren(intro, link);
        feedback.style.display = 'block';
      }

      form.reset();
    });
  }

  // Highlights the menu link of the section on screen. Section offsets are cached and refreshed on
  // resize, and the check runs at most once per frame.
  bindScrollSpy() {
    const sections = [...document.querySelectorAll('section[id]')];
    const navLinks = [...document.querySelectorAll('.nav-link')];
    let offsets = [];
    let queued = false;
    let currentId = '';

    const measure = () => {
      offsets = sections.map((sec) => ({ id: sec.id, top: sec.getBoundingClientRect().top + window.scrollY - 120 }));
    };
    const update = () => {
      queued = false;
      if (document.documentElement.classList.contains('app-mode')) return;
      const y = window.scrollY;
      let id = '';
      offsets.forEach((item) => { if (y >= item.top) id = item.id; });
      if (!id || id === currentId) return;
      currentId = id;
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
    };

    measure();
    window.addEventListener('load', measure);
    window.addEventListener('resize', measure, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(measure).observe(document.body);
    window.addEventListener('scroll', () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    }, { passive: true });
  }
}

// Start application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new PortfolioApp();
  app.init();
});
