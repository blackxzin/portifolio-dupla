import confetti from 'canvas-confetti';
import { soundFx } from '../audio/soundFx.js';

export function setupBudgetCalculator() {
  const container = document.getElementById('budget-calculator-app');
  if (!container) return;

  const projectTypes = [
    { id: 'automation', name: 'Bot ou Automação IA', basePrice: 900, baseDays: 6, stack: 'Python, n8n, OpenAI, Scrapers' },
    { id: 'web-saas', name: 'Sistema Web / SaaS / Dashboard', basePrice: 2200, baseDays: 14, stack: 'React, TypeScript, FastAPI/Spring, PostgreSQL' },
    { id: 'api-backend', name: 'API REST / Microsserviços', basePrice: 1300, baseDays: 8, stack: 'Java Spring Boot, Python FastAPI, Docker' },
    { id: 'mobile', name: 'Aplicativo Mobile (iOS/Android)', basePrice: 2600, baseDays: 18, stack: 'SwiftUI, Kotlin, Firebase' },
    { id: 'landing', name: 'Landing Page de Alta Conversão', basePrice: 700, baseDays: 4, stack: 'HTML5, CSS3 Moderno, JavaScript, SEO' }
  ];

  const features = [
    { id: 'auth', name: 'Autenticação & Controle de Acessos', price: 350, days: 2 },
    { id: 'payments', name: 'Pagamentos (PIX, Stripe, Mercado Pago)', price: 450, days: 2 },
    { id: 'ai-agent', name: 'Agente de IA / Conexão com LLM', price: 600, days: 3 },
    { id: 'dashboard', name: 'Dashboard com Gráficos e Exportação', price: 500, days: 3 },
    { id: 'notifications', name: 'Notificações (WhatsApp / Telegram / Email)', price: 300, days: 2 },
    { id: 'security', name: 'Auditoria de Segurança & OWASP Shield', price: 400, days: 2 },
    { id: 'cloud-deploy', name: 'Deploy na Nuvem & Configuração de Domínio', price: 250, days: 1 }
  ];

  const urgencies = [
    { id: 'standard', name: 'Padrão (Cronograma Regular)', multiplier: 1.0, daysFactor: 1.0 },
    { id: 'fast', name: 'Rápido (Prioridade Máxima)', multiplier: 1.25, daysFactor: 0.7 },
    { id: 'urgent', name: 'Expresso (Entrega Imediata)', multiplier: 1.5, daysFactor: 0.5 }
  ];

  let selectedType = projectTypes[1]; // default Web/SaaS
  let selectedFeatures = new Set(['auth', 'dashboard']);
  let selectedUrgency = urgencies[0];

  function render() {
    // Calculations
    let totalPrice = selectedType.basePrice;
    let totalDays = selectedType.baseDays;

    features.forEach(f => {
      if (selectedFeatures.has(f.id)) {
        totalPrice += f.price;
        totalDays += f.days;
      }
    });

    totalPrice = Math.round(totalPrice * selectedUrgency.multiplier);
    totalDays = Math.max(3, Math.round(totalDays * selectedUrgency.daysFactor));

    const minPrice = Math.round(totalPrice * 0.9);
    const maxPrice = Math.round(totalPrice * 1.15);

    container.innerHTML = `
      <div class="calculator-grid">
        <div class="calc-inputs-column">
          <div class="calc-step-group">
            <label class="calc-step-label">
              <span class="step-num">1</span> Selecione o Tipo de Projeto:
            </label>
            <div class="calc-options-grid" id="calc-types-group">
              ${projectTypes.map(t => `
                <button type="button" class="calc-chip ${t.id === selectedType.id ? 'active' : ''}" data-type-id="${t.id}">
                  <span class="chip-title">${t.name}</span>
                  <span class="chip-stack">${t.stack.split(',')[0]}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <div class="calc-step-group">
            <label class="calc-step-label">
              <span class="step-num">2</span> Funcionalidades Desejadas:
            </label>
            <div class="calc-features-grid" id="calc-features-group">
              ${features.map(f => `
                <button type="button" class="calc-checkbox-chip ${selectedFeatures.has(f.id) ? 'active' : ''}" data-feature-id="${f.id}">
                  <span class="calc-check-box">${selectedFeatures.has(f.id) ? '✓' : ''}</span>
                  <span class="feature-text">${f.name}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <div class="calc-step-group">
            <label class="calc-step-label">
              <span class="step-num">3</span> Prazo & Urgência de Entrega:
            </label>
            <div class="calc-urgency-grid" id="calc-urgency-group">
              ${urgencies.map(u => `
                <button type="button" class="calc-chip ${u.id === selectedUrgency.id ? 'active' : ''}" data-urgency-id="${u.id}">
                  ${u.name}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="calc-results-column tilt-card">
          <div class="calc-results-card">
            <div class="calc-card-header">
              <div class="live-pulse-badge">
                <span class="pulse-dot"></span> Estimativa em Tempo Real
              </div>
              <h3 class="calc-result-title">${selectedType.name}</h3>
            </div>

            <div class="calc-price-box">
              <div class="price-label">Faixa Estimada de Investimento</div>
              <div class="price-range">
                <span class="currency">R$</span> ${minPrice.toLocaleString('pt-BR')} <span class="price-separator">—</span> <span class="currency">R$</span> ${maxPrice.toLocaleString('pt-BR')}
              </div>
              <div class="price-sub">Valor justo, sem intermediários. Negociação flexível parcelada por entregas.</div>
            </div>

            <div class="calc-metrics-row">
              <div class="calc-metric-item">
                <span class="metric-icon">⏱️</span>
                <div>
                  <div class="metric-val">~${totalDays} dias</div>
                  <div class="metric-lbl">Prazo Estimado</div>
                </div>
              </div>
              <div class="calc-metric-item">
                <span class="metric-icon">👥</span>
                <div>
                  <div class="metric-val">Dupla de Elite</div>
                  <div class="metric-lbl">Lucas & Felipe</div>
                </div>
              </div>
              <div class="calc-metric-item">
                <span class="metric-icon">🛡️</span>
                <div>
                  <div class="metric-val">100% Garantido</div>
                  <div class="metric-lbl">Código & Suporte</div>
                </div>
              </div>
            </div>

            <div class="calc-stack-suggested">
              <strong>Stack Tecnológica Sugerida:</strong>
              <div class="calc-tag-pills">
                ${selectedType.stack.split(',').map(s => `<span class="tag-pill">${s.trim()}</span>`).join('')}
                ${selectedFeatures.has('ai-agent') ? `<span class="tag-pill highlight">LLM AI</span>` : ''}
                ${selectedFeatures.has('security') ? `<span class="tag-pill highlight">OWASP Shield</span>` : ''}
              </div>
            </div>

            <div class="calc-actions">
              <button type="button" class="btn btn-primary btn-calc-copy" id="btn-copy-proposal">
                <span class="btn-icon">📋</span> Copiar Proposta para o 99Freelas
              </button>
              <a href="https://wa.me/?text=${encodeURIComponent(generateProposalText(selectedType, selectedFeatures, features, minPrice, maxPrice, totalDays))}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-calc-whatsapp">
                <span class="btn-icon">💬</span> Chamar no WhatsApp
              </a>
            </div>

            <div class="calc-copied-msg" id="calc-copied-alert" style="display: none;">
              ✅ Proposta copiada com sucesso para a sua área de transferência!
            </div>
          </div>
        </div>
      </div>
    `;

    bindCalculatorEvents();
  }

  function generateProposalText(type, featSet, allFeats, minP, maxP, days) {
    const activeFeatsNames = allFeats
      .filter(f => featSet.has(f.id))
      .map(f => `- ${f.name}`)
      .join('\n');

    return `Olá! Vi o seu projeto e tenho a solução exata para o que você precisa.

Trabalho em dupla com o Felipe Luvizotto (Engenharia e Mobile - UNICAMP/Cotuca) e eu (Lucas Gabriel / blackxzin - Full Stack & Cibersegurança).

📋 Proposta de Escopo:
Tipo: ${type.name}
Stack Tecnológica: ${type.stack}

Funcionalidades incluídas:
${activeFeatsNames || '- Escopo customizado sob demanda'}

⏱️ Prazo Estimado de Entrega: aproximadamente ${days} dias corridos
💰 Estimativa de Investimento: R$ ${minP.toLocaleString('pt-BR')} a R$ ${maxP.toLocaleString('pt-BR')} (negociável em marcos de entrega)

Diferenciais da nossa entrega:
- 2 Desenvolvedores sêniores dedicados ao projeto
- Código limpo, versionado e 100% documentado
- Demonstrações parciais para você acompanhar e aprovar durante o desenvolvimento
- Garantia de suporte pós-entrega

Confira nosso portfólio 3D com projetos reais e código no GitHub:
https://github.com/blackxzin | https://github.com/Felipe-Luvizotto

Podemos conversar no chat para fechar os detalhes e iniciar imediatamente?`;
  }

  function bindCalculatorEvents() {
    // Type selection
    container.querySelectorAll('[data-type-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-type-id');
        const found = projectTypes.find(t => t.id === id);
        if (found) {
          selectedType = found;
          soundFx.playClick();
          render();
        }
      });
    });

    // Features multi-toggle
    container.querySelectorAll('[data-feature-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-feature-id');
        if (selectedFeatures.has(id)) {
          selectedFeatures.delete(id);
        } else {
          selectedFeatures.add(id);
        }
        soundFx.playHover();
        render();
      });
    });

    // Urgency toggle
    container.querySelectorAll('[data-urgency-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-urgency-id');
        const found = urgencies.find(u => u.id === id);
        if (found) {
          selectedUrgency = found;
          soundFx.playClick();
          render();
        }
      });
    });

    // Copy button
    const copyBtn = document.getElementById('btn-copy-proposal');
    const alertMsg = document.getElementById('calc-copied-alert');

    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        let totalPrice = selectedType.basePrice;
        let totalDays = selectedType.baseDays;
        features.forEach(f => {
          if (selectedFeatures.has(f.id)) {
            totalPrice += f.price;
            totalDays += f.days;
          }
        });
        totalPrice = Math.round(totalPrice * selectedUrgency.multiplier);
        totalDays = Math.max(3, Math.round(totalDays * selectedUrgency.daysFactor));
        const minP = Math.round(totalPrice * 0.9);
        const maxP = Math.round(totalPrice * 1.15);

        const text = generateProposalText(selectedType, selectedFeatures, features, minP, maxP, totalDays);

        try {
          await navigator.clipboard.writeText(text);
          soundFx.playChime();

          // Confetti celebration
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 }
          });

          if (alertMsg) {
            alertMsg.style.display = 'block';
            setTimeout(() => {
              alertMsg.style.display = 'none';
            }, 4000);
          }
        } catch (e) {
          console.error("Clipboard write failed", e);
        }
      });
    }
  }

  // Initial render
  render();
}
