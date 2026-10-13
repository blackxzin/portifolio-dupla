import { iconSvg } from './icon.js';

export function setupProjectModal() {
  const modal = document.getElementById('project-detail-modal');
  const modalContent = document.getElementById('modal-dynamic-content');
  const modalClose = document.getElementById('modal-close-btn');
  const modalOverlay = document.getElementById('modal-backdrop');

  if (!modal || !modalContent) return;

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  return {
    open(project) {
      modalContent.innerHTML = `
        <div class="modal-header-section">
          <div class="modal-tags-row">
            <span class="project-badge">
              ${project.badge}
            </span>
            <span class="modal-cat-badge">${project.categoryLabel}</span>
          </div>
          <h2 class="modal-title">${project.title}</h2>
          <p class="modal-subtitle">${project.shortDesc}</p>
        </div>

        <div class="modal-meta-grid">
          <div class="modal-meta-card">
            <span class="meta-icon">${iconSvg('people')}</span>
            <div>
              <div class="meta-label">Desenvolvedor(es)</div>
              <div class="meta-value">${project.author}</div>
            </div>
          </div>
          <div class="modal-meta-card">
            <span class="meta-icon">${iconSvg('zap')}</span>
            <div>
              <div class="meta-label">Características</div>
              <div class="meta-value">${Object.values(project.metrics || {}).join(' · ') || project.categoryLabel}</div>
            </div>
          </div>
        </div>

        <div class="modal-body-section">
          <h4 class="section-subheading">Sobre este projeto</h4>
          <p class="modal-body-text">${project.longDesc}</p>

          <h4 class="section-subheading">Como essa solução ajuda:</h4>
          <div class="modal-business-card">
            <p>${project.businessValue}</p>
          </div>

          <h4 class="section-subheading">Tecnologias Utilizadas:</h4>
          <div class="modal-tech-pills">
            ${project.techs.map(t => `<span class="tech-pill">${t}</span>`).join('')}
          </div>
        </div>

        <div class="modal-footer-actions">
          <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            Ver repositório no GitHub
          </a>
          ${project.secondaryGithub ? `
            <a href="${project.secondaryGithub}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
              Repositório complementar
            </a>
          ` : ''}
          <a href="#budget-calculator" class="btn btn-secondary" id="modal-want-similar">
            Quero conversar sobre algo parecido
          </a>
        </div>
      `;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      const wantSimilarBtn = document.getElementById('modal-want-similar');
      if (wantSimilarBtn) {
        wantSimilarBtn.addEventListener('click', () => {
          closeModal();
          const target = document.getElementById('budget-calculator');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    }
  };
}
