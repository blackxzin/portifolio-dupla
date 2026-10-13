import './style.css';
import confetti from 'canvas-confetti';
import { duoProfile, projectsData, freelanceBenefits, processSteps } from './data/portfolioData.js';
import { Portfolio3DScene } from './three/scene.js';
import { soundFx } from './audio/soundFx.js';
import { applyTiltEffect } from './components/tiltEffect.js';
import { setupProjectModal } from './components/projectModal.js';
import { setupBudgetCalculator } from './components/budgetCalculator.js';

// Application Controller
class PortfolioApp {
  constructor() {
    this.currentFilter = 'all';
    this.searchQuery = '';
    this.modalController = null;
    this.scene3d = null;
  }

  init() {
    // 1. Initialize Three.js 3D Background
    const canvasContainer = document.getElementById('webgl-canvas-container');
    if (canvasContainer) {
      this.scene3d = new Portfolio3DScene(canvasContainer);
    }

    // 2. Initialize Subcomponents
    this.modalController = setupProjectModal();
    setupBudgetCalculator();

    // 3. Render Dynamic Content
    this.renderServices();
    this.renderProcessSteps();
    this.renderBenefits();
    this.renderProjects();

    // 4. Attach Interactions
    this.bindThemeSwitcher();
    this.bindSoundToggle();
    this.bindFiltersAndSearch();
    this.bindContactForm();
    this.bindScrollSpy();

    // 5. Apply 3D Tilt on initial cards
    this.refreshTiltCards();
  }

  refreshTiltCards() {
    const tiltCards = document.querySelectorAll('.tilt-card');
    applyTiltEffect(tiltCards, 10);
  }

  renderServices() {
    const container = document.getElementById('services-grid-container');
    if (!container) return;

    const iconMap = {
      'bot': '🤖',
      'layout': '💻',
      'server': '⚡',
      'smartphone': '📱',
      'shield-check': '🛡️',
      'cpu': '⚙️'
    };

    container.innerHTML = duoProfile.services.map(svc => `
      <div class="service-card ${svc.popular ? 'popular-badge' : ''} tilt-card">
        ${svc.popular ? '<span class="popular-tag">🔥 Mais Solicitado</span>' : ''}
        <span class="service-icon">${iconMap[svc.icon] || '⚡'}</span>
        <h3 class="service-title">${svc.title}</h3>
        <p class="service-desc">${svc.desc}</p>
        <ul class="service-deliverables-list">
          ${svc.deliverables.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>
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

    const benefitIcons = {
      'zap': '⚡',
      'shield': '🛡️',
      'clock': '⏱️',
      'award': '🏆'
    };

    container.innerHTML = freelanceBenefits.map(b => `
      <div class="benefit-card tilt-card">
        <span class="benefit-icon">${benefitIcons[b.icon] || '✨'}</span>
        <h3 class="benefit-title">${b.title}</h3>
        <p class="benefit-desc">${b.desc}</p>
      </div>
    `).join('');
  }

  renderProjects() {
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
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    container.innerHTML = filtered.map(p => `
      <article class="project-card tilt-card" data-project-id="${p.id}">
        <div class="card-top-row">
          <span class="project-author-pill" style="background: ${p.accentColor}20; color: ${p.accentColor}; border: 1px solid ${p.accentColor}44;">
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
          <span>📊</span>
          <span>${Object.values(p.metrics || {})[0] || 'Otimizado para Produção'}</span>
        </div>

        <div class="project-card-actions">
          <button type="button" class="btn btn-secondary btn-sm btn-open-detail" data-detail-id="${p.id}">
            Detalhes
          </button>
          <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
            GitHub
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

  bindFiltersAndSearch() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const searchInput = document.getElementById('project-search-input');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const resetFilterBtn = document.getElementById('reset-filter-btn');

    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentFilter = tab.getAttribute('data-filter') || 'all';
        soundFx.playClick();
        this.renderProjects();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        if (clearSearchBtn) {
          clearSearchBtn.style.display = this.searchQuery ? 'block' : 'none';
        }
        this.renderProjects();
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

  bindThemeSwitcher() {
    const themeButtons = document.querySelectorAll('.theme-mode-btn');
    themeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        themeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.body.setAttribute('data-active-theme', theme);
        if (this.scene3d) {
          this.scene3d.setTheme(theme);
        }
        soundFx.playModeSwitch();
      });
    });
  }

  bindSoundToggle() {
    const soundBtn = document.getElementById('btn-sound-toggle');
    const soundIcon = document.getElementById('sound-icon');
    if (!soundBtn) return;

    soundBtn.addEventListener('click', () => {
      const isEnabled = soundFx.toggleSound();
      if (soundIcon) {
        soundIcon.textContent = isEnabled ? '🔊' : '🔇';
      }
      soundBtn.setAttribute('title', isEnabled ? 'Efeitos Sonoros Ativados' : 'Efeitos Sonoros Desativados');
    });
  }

  bindContactForm() {
    const form = document.getElementById('quick-contact-form');
    const feedback = document.getElementById('form-feedback-msg');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const contact = document.getElementById('form-contact').value;
      const type = document.getElementById('form-type').value;
      const message = document.getElementById('form-message').value;

      const formattedMsg = `Olá Lucas e Felipe! Me chamo ${name} (${contact}). Gostaria de conversar sobre um projeto de ${type}: "${message}".`;
      const waUrl = `https://wa.me/?text=${encodeURIComponent(formattedMsg)}`;

      soundFx.playChime();
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.8 }
      });

      if (feedback) {
        feedback.className = 'form-feedback-message success';
        feedback.innerHTML = `
          ✅ Obrigado, <strong>${name}</strong>! Mensagem preparada.<br>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; font-weight: bold; text-decoration: underline; margin-top: 6px; display: inline-block;">
            Clique aqui para abrir no WhatsApp com a mensagem pronta →
          </a>
        `;
        feedback.style.display = 'block';
      }

      form.reset();
    });
  }

  bindScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollY = window.scrollY;

      sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          currentSectionId = sec.getAttribute('id');
        }
      });

      if (currentSectionId) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    }, { passive: true });
  }
}

// Start application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new PortfolioApp();
  app.init();
});
