import { OFFER } from '../data/offer.js';
import { whatsappUrl } from '../data/contact.js';
import { iconSvg } from './icon.js';

const brl = (value) => Math.round(value).toLocaleString('pt-BR');

const checkList = (items, className) => `
  <ul class="${className}">
    ${items.map((item, i) => `<li style="--li:${i}"><span class="check-icon" aria-hidden="true"></span><span>${item}</span></li>`).join('')}
  </ul>
`;

function renderComparison() {
  const column = (title, items, modifier) => `
    <div class="offer-compare-col offer-compare-col--${modifier}">
      <span class="offer-compare-title">${title}</span>
      <ul>${items.map((item) => `<li><span class="offer-compare-mark" aria-hidden="true"></span>${item}</li>`).join('')}</ul>
    </div>
  `;
  return `
    <div class="offer-compare">
      ${column('Sem site', OFFER.comparison.without, 'without')}
      ${column('Com o seu site', OFFER.comparison.with, 'with')}
    </div>
  `;
}

function renderCard() {
  return `
    <article class="offer-card is-live" id="offer-card" aria-labelledby="offer-card-title">
      <div class="offer-card-inner">
        <div class="offer-card-top">
          <span class="offer-ribbon">${OFFER.badge}</span>
        </div>

        <h3 class="offer-card-title" id="offer-card-title">${OFFER.cardTitle}</h3>

        <div class="offer-price-block">
          <span class="offer-old">${OFFER.priceLabel}</span>
          <div class="offer-price">
            <span class="offer-price-value">${OFFER.priceValue}</span>
          </div>
          <span class="offer-price-note">${OFFER.priceNote}</span>
          <span class="offer-savings">${OFFER.reassurance}</span>
        </div>

        <div class="offer-monthly">
          <span class="offer-monthly-label">Depois, todo mês</span>
          <div class="offer-monthly-row">
            <strong>R$ ${brl(OFFER.monthly)}<small>/mês</small></strong>
            <span>${OFFER.monthlyNote}</span>
          </div>
        </div>

        <ol class="offer-timeline">
          ${OFFER.steps.map((step) => `
            <li>
              <span class="offer-timeline-dot" aria-hidden="true"></span>
              <div>
                <strong>${step.title}</strong>
                <span>${step.desc}</span>
              </div>
            </li>
          `).join('')}
        </ol>

        <a class="btn btn-primary btn-lg offer-cta" href="${whatsappUrl(OFFER.ctaMessage)}" target="_blank" rel="noopener noreferrer">
          ${OFFER.ctaLabel}
          <span class="offer-cta-arrow" aria-hidden="true">→</span>
        </a>
        <p class="offer-cta-note">A conversa é pelo WhatsApp, direto com a dupla.</p>
      </div>
    </article>
  `;
}

function renderDetails() {
  return `
    <div class="offer-details">
      <div class="offer-include-group">
        <h3 class="offer-group-title"><span>Incluso</span> O que vem no seu site</h3>
        ${checkList(OFFER.siteIncludes, 'offer-list')}
      </div>
      <div class="offer-include-group">
        <h3 class="offer-group-title"><span>R$ ${brl(OFFER.monthly)}/mês</span> O que a mensalidade cobre</h3>
        ${checkList(OFFER.monthlyIncludes, 'offer-list')}
      </div>
      ${renderComparison()}
    </div>
  `;
}

function renderGuarantees() {
  return `
    <ul class="offer-guarantees">
      ${OFFER.guarantees.map((g) => `
        <li class="offer-guarantee">
          <span class="offer-guarantee-icon">${iconSvg(g.icon)}</span>
          <div><strong>${g.title}</strong><span>${g.desc}</span></div>
        </li>
      `).join('')}
    </ul>
  `;
}

export function setupOfferSection() {
  const container = document.getElementById('offer-app');
  if (!container) return;

  container.innerHTML = `
    <div class="offer-grid">
      ${renderDetails()}
      <div class="offer-card-column">${renderCard()}</div>
    </div>
    ${renderGuarantees()}
  `;
}
