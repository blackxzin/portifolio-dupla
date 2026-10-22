import { OFFER } from '../data/offer.js';
import { whatsappUrl } from '../data/contact.js';
import { iconSvg } from './icon.js';
import { prefersReducedMotion } from './motion.js';

const DAYS_PER_MONTH = 30;
const PRICE_DROP_MS = 1400;
const PRICE_DROP_DELAY_MS = 500;

// Real deadline from the offer config; returns '' when unset, invalid or already past.
function deadlineText() {
  if (!OFFER.validUntil) return '';
  const end = new Date(`${OFFER.validUntil}T23:59:59`);
  if (Number.isNaN(end.getTime()) || end.getTime() < Date.now()) return '';
  return `Oferta válida até ${end.toLocaleDateString('pt-BR')}`;
}

const brl = (value) => Math.round(value).toLocaleString('pt-BR');
const brlCents = (value) => value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

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

function scarcityLines() {
  return [deadlineText(), OFFER.slotsNote].filter(Boolean);
}

function renderCard() {
  const savings = OFFER.oldPrice - OFFER.price;
  const discount = Math.round((savings / OFFER.oldPrice) * 100);
  const perDay = OFFER.monthly / DAYS_PER_MONTH;

  return `
    <article class="offer-card" id="offer-card" aria-labelledby="offer-card-title">
      <div class="offer-card-inner">
        <div class="offer-card-top">
          <span class="offer-ribbon">${OFFER.badge}</span>
          <span class="offer-discount">-${discount}%</span>
        </div>

        <h3 class="offer-card-title" id="offer-card-title">Site profissional completo</h3>

        <div class="offer-price-block">
          <span class="offer-old">De <s><span class="offer-old-value">R$ ${brl(OFFER.oldPrice)}</span></s> por</span>
          <div class="offer-price" aria-label="R$ ${brl(OFFER.price)}">
            <span class="offer-currency">R$</span>
            <span class="offer-price-value" id="offer-price-value" aria-hidden="true">${brl(OFFER.price)}</span>
          </div>
          <span class="offer-price-note">pagamento único, na criação do site</span>
          <span class="offer-savings">Você economiza R$ ${brl(savings)}</span>
        </div>

        <ol class="offer-timeline">
          <li>
            <span class="offer-timeline-dot" aria-hidden="true"></span>
            <div>
              <strong>Agora · R$ ${brl(OFFER.price)}</strong>
              <span>Criação e publicação do site</span>
            </div>
          </li>
          <li>
            <span class="offer-timeline-dot" aria-hidden="true"></span>
            <div>
              <strong>Depois · R$ ${brl(OFFER.monthly)}/mês</strong>
              <span>Cerca de R$ ${brlCents(perDay)} por dia para manter tudo funcionando</span>
            </div>
          </li>
        </ol>

        <a class="btn btn-primary btn-lg offer-cta" href="${whatsappUrl(OFFER.ctaMessage)}" target="_blank" rel="noopener noreferrer">
          ${OFFER.ctaLabel}
          <span class="offer-cta-arrow" aria-hidden="true">→</span>
        </a>
        <p class="offer-cta-note">Sem compromisso: você conversa com a gente antes de decidir.</p>
        ${scarcityLines().map((line) => `<p class="offer-slots"><span class="offer-slots-dot" aria-hidden="true"></span>${line}</p>`).join('')}
      </div>
    </article>
  `;
}

function renderDetails() {
  return `
    <div class="offer-details">
      <div class="offer-include-group">
        <h3 class="offer-group-title"><span>R$ ${brl(OFFER.price)}</span> O que vem no seu site</h3>
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

// The price "drops" from the old value to the offer value when the card shows up.
function animatePriceDrop(card) {
  const value = card.querySelector('#offer-price-value');
  if (!value || prefersReducedMotion() || !('IntersectionObserver' in window)) {
    card.classList.add('is-live', 'is-dropped');
    return;
  }

  value.textContent = brl(OFFER.oldPrice);
  const run = () => {
    card.classList.add('is-live');
    const start = performance.now() + PRICE_DROP_DELAY_MS;
    const step = (now) => {
      const t = Math.min(1, Math.max(0, (now - start) / PRICE_DROP_MS));
      const eased = 1 - Math.pow(1 - t, 4);
      value.textContent = brl(OFFER.oldPrice + (OFFER.price - OFFER.oldPrice) * eased);
      if (t < 1) requestAnimationFrame(step);
      else card.classList.add('is-dropped');
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    run();
  }, { threshold: 0.45 });
  observer.observe(card);
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

  animatePriceDrop(document.getElementById('offer-card'));
}
