export const duoProfile = {
  brand: "NEXUS DUO",
  tagline: "Engenharia de Software de Alta Performance & Inteligência Artificial",
  headline: "Desenvolvemos o software que escala o seu negócio.",
  subheadline: "Unimos backend robusto, automações com IA, aplicativos modernos e cibersegurança em uma única equipe de elite para entregar seus projetos no 99Freelas com rapidez e excelência.",
  availability: "Disponíveis para novos projetos no 99Freelas",
  rateStatus: "Orçamentos sob medida & Resposta em até 2 horas",
  stats: [
    { label: "Repositórios & Projetos", value: "+60" },
    { label: "Tecnologias Dominadas", value: "+15" },
    { label: "Foco em Performance", value: "100%" },
    { label: "Entrega Garantida", value: "Ágil" }
  ],
  services: [
    {
      id: "ai-auto",
      icon: "bot",
      title: "Automações & Bots com IA",
      desc: "Automação de processos repetitivos, bots para WhatsApp/Telegram, pipelines n8n, raspagem de dados (scrapers) e agentes inteligentes com LLMs para economizar tempo e dinheiro da sua empresa.",
      popular: true,
      deliverables: ["Bots de atendimento", "Scraping e extração de dados", "Pipelines n8n & Webhooks", "Agentes inteligentes personalizados"]
    },
    {
      id: "fullstack-saas",
      icon: "layout",
      title: "Sistemas Web & SaaS Modernos",
      desc: "Desenvolvimento de ponta a ponta com React, TypeScript, Next.js, FastAPI e Spring Boot. Interfaces rápidas, responsivas e painéis administrativos completos com autenticação e bancos relacionais.",
      popular: true,
      deliverables: ["Painéis administrativos (Dashboards)", "Plataformas SaaS completas", "Integração de pagamentos (PIX, Stripe, Mercado Pago)", "SEO e alta performance"]
    },
    {
      id: "apis-micro",
      icon: "server",
      title: "APIs RESTful & Microsserviços",
      desc: "Arquiteturas limpas e seguras em Java (Spring Boot) e Python (FastAPI). Integração entre sistemas terceiros (ERP, CRM, Gateways) com alta disponibilidade e documentação Swagger.",
      popular: false,
      deliverables: ["APIs escaláveis e documentadas", "Integração de CRMs e gateways", "Microsserviços em Docker", "Otimização de consultas a bancos SQL/NoSQL"]
    },
    {
      id: "mobile-apps",
      icon: "smartphone",
      title: "Aplicativos Mobile (iOS & Android)",
      desc: "Criação de aplicativos fluidos com SwiftUI e Kotlin. Integração em tempo real com Firebase, mapas, notificações push e design refinado para encantar seus usuários.",
      popular: false,
      deliverables: ["Apps iOS nativos com SwiftUI", "Apps Android em Kotlin", "Integração com Firebase e APIs", "Publicação e testes"]
    },
    {
      id: "cyber-audit",
      icon: "shield-check",
      title: "Cibersegurança & Auditoria de Código",
      desc: "Proteção contra as vulnerabilidades críticas do OWASP Top 10, autenticação JWT robusta, rate-limiting, controle de riscos e auditoria defensiva para garantir que seus dados nunca vazem.",
      popular: false,
      deliverables: ["Auditoria contra falhas comuns", "Implementação de auth segura (JWT, OAuth)", "Risk scores e logs em tempo real", "Políticas de CORS e blindagem"]
    },
    {
      id: "desktop-custom",
      icon: "cpu",
      title: "Ferramentas Desktop & Soluções Especiais",
      desc: "Softwares desktop para Windows e Linux em Python e C#/.NET, utilitários de alta velocidade, transmissão multimídia local e rotinas especializadas sob demanda.",
      popular: false,
      deliverables: ["Sistemas desktop C# / Python", "Streaming de baixa latência", "Autoclickers e automações de SO", "Simulações e gráficos 3D"]
    }
  ],
  members: [
    {
      name: "Lucas Gabriel",
      handle: "blackxzin",
      role: "Full Stack Engineer & Cibersegurança",
      bio: "Especialista em construir backends de missão crítica, APIs ultrarrápidas, integrações com IA, esteiras n8n e arquiteturas seguras. Experiência sólida com Java (Spring Boot), Python (FastAPI), React, Docker e análise defensiva.",
      avatar: "https://avatars.githubusercontent.com/u/173632812?v=4",
      github: "https://github.com/blackxzin",
      tags: ["Python", "Java", "Spring Boot", "FastAPI", "React", "Docker", "n8n", "Cibersegurança", "APIs"],
      highlights: [
        "Criador da plataforma de segurança Sentinel Platform",
        "Desenvolvedor da API de análise de currículos e matching de vagas (ATS)",
        "Especialista em automação de fluxos n8n e bots autônomos",
        "Arquiteto de produtos SaaS e microsserviços em Docker"
      ]
    },
    {
      name: "Felipe Luvizotto",
      handle: "Felipe-Luvizotto",
      role: "Software Engineer • Mobile & AI",
      bio: "Formação técnica de elite pelo Cotuca (Colégio Técnico de Campinas - UNICAMP). Especialista em desenvolvimento mobile nativo (SwiftUI/iOS), algoritmos complexos em C#/.NET, inteligência artificial com Machine Learning e Unity 3D.",
      avatar: "https://avatars.githubusercontent.com/u/101439293?v=4",
      github: "https://github.com/Felipe-Luvizotto/Felipe-Luvizotto",
      tags: ["C#", ".NET", "Swift", "SwiftUI", "Python", "Machine Learning", "TypeScript", "Unity 3D", "Firebase"],
      highlights: [
        "Formação Cotuca / UNICAMP - Excelência técnica em algoritmos",
        "Desenvolvedor de Multi-Agent LLM Trading Framework",
        "Modelos de Machine Learning para detecção de fraudes financeiras",
        "Apps iOS nativos com SwiftUI, Firebase e MapKit"
      ]
    }
  ]
};

export const projectsData = [
  {
    id: "freelahunter-ai",
    title: "FreelaHunter AI",
    badge: "Colaboração da Dupla",
    featured: true,
    author: "Lucas & Felipe",
    authorHandle: "blackxzin + Felipe-Luvizotto",
    authorAvatar: "https://avatars.githubusercontent.com/u/173632812?v=4",
    category: "ai",
    categoryLabel: "Automação & IA",
    techs: ["Python", "OpenAI / LLMs", "Web Scraping", "Automação", "Analytics"],
    shortDesc: "Plataforma inteligente para caçar oportunidades de freelancing (99Freelas, Upwork, Workana), analisar briefings de vagas e gerar propostas persuasivas sob medida com rastreabilidade.",
    longDesc: "Desenvolvida pela dupla para automatizar o processo de captação e análise de projetos freelancer. A ferramenta extrai descrições em tempo real, avalia compatibilidade de habilidades, calcula score de viabilidade do projeto e gera propostas altamente persuasivas personalizadas para cada cliente.",
    businessValue: "Ideal para empresas e prestadores de serviço que desejam captar clientes no piloto automático, filtrando apenas leads com alta probabilidade de fechamento.",
    github: "https://github.com/blackxzin/freelahunter-ai",
    secondaryGithub: "https://github.com/Felipe-Luvizotto/freelahunter-ai",
    stars: 0,
    accentColor: "#6366f1",
    metrics: { efficiency: "+300% vel. de propostas", accuracy: "95% match de vagas" }
  },
  {
    id: "sentinel-security",
    title: "Sentinel Security Platform",
    badge: "Lucas Gabriel",
    featured: true,
    author: "Lucas Gabriel",
    authorHandle: "blackxzin",
    authorAvatar: "https://avatars.githubusercontent.com/u/173632812?v=4",
    category: "security",
    categoryLabel: "APIs & Cibersegurança",
    techs: ["Java", "Spring Boot", "Risk Engine", "Webhooks", "REST API", "Docker"],
    shortDesc: "Plataforma corporativa de monitoramento e detecção de atividades anômalas com motor de regras, cálculo dinâmico de Risk Score e alertas instantâneos de invasão.",
    longDesc: "Sistema defensivo robusto construído em Java e Spring Boot com arquitetura orientada a eventos. Processa logs e requisições suspeitas, calcula o grau de risco em milissegundos e dispara gatilhos de segurança com webhooks e notificações em tempo real.",
    businessValue: "Garante que o seu sistema ou e-commerce esteja blindado contra abusos, tentativas de força bruta, acessos não autorizados e comportamentos fraudulentos.",
    github: "https://github.com/blackxzin/sentinel-security-platform",
    stars: 0,
    accentColor: "#10b981",
    metrics: { latency: "< 5ms por análise", alerts: "Tempo Real" }
  },
  {
    id: "trading-agents",
    title: "TradingAgents Multi-LLM",
    badge: "Felipe Luvizotto",
    featured: true,
    author: "Felipe Luvizotto",
    authorHandle: "Felipe-Luvizotto",
    authorAvatar: "https://avatars.githubusercontent.com/u/101439293?v=4",
    category: "ai",
    categoryLabel: "Automação & IA",
    techs: ["Python", "Multi-Agent AI", "LLMs", "Quant Finance", "Prompt Eng."],
    shortDesc: "Framework financeiro multi-agente baseado em Large Language Models para análise coordenada de mercados, consolidação de notícias e hipóteses de investimento.",
    longDesc: "Sistema avançado onde múltiplos agentes de IA desempenham papéis especializados (analista técnico, analista fundamentalista, gestor de risco e tomador de decisão), debatendo cenários de mercado para gerar relatórios sintetizados de altíssima precisão.",
    businessValue: "Demonstra domínio prático sobre as arquiteturas de agentes de IA mais modernas do mundo, aplicáveis a qualquer tipo de consultoria, CRM analítico ou automação de processos complexos.",
    github: "https://github.com/Felipe-Luvizotto/TradingAgents",
    stars: 0,
    accentColor: "#f59e0b",
    metrics: { agents: "Multi-Agentes Colaborativos", domain: "Finanças & IA" }
  },
  {
    id: "cv-analyzer",
    title: "CV Analyzer API & ATS",
    badge: "Lucas Gabriel",
    featured: true,
    author: "Lucas Gabriel",
    authorHandle: "blackxzin",
    authorAvatar: "https://avatars.githubusercontent.com/u/173632812?v=4",
    category: "web",
    categoryLabel: "APIs & Microsserviços",
    techs: ["Java", "Spring Boot", "Text Parsing", "ATS Engine", "REST API", "PostgreSQL"],
    shortDesc: "API REST em Java para extração automática de dados de currículos, comparação semântica com vagas de emprego e geração de relatórios de compatibilidade para RH.",
    longDesc: "Microsserviço de alta performance capaz de digerir dezenas de formatos de currículos, indexar competências técnicas, experiência profissional e calcular com precisão a aderência do candidato aos requisitos da vaga solicitada.",
    businessValue: "Economiza centenas de horas de triagem manual para plataformas de recrutamento, agências de RH e empresas em expansão.",
    github: "https://github.com/blackxzin/cv-analyzer-api",
    stars: 0,
    accentColor: "#3b82f6",
    metrics: { speed: "Processamento instantâneo", format: "Padrão ATS Internacional" }
  },
  {
    id: "fraud-detection-ai",
    title: "AI Fraude Detection Engine",
    badge: "Felipe Luvizotto",
    featured: true,
    author: "Felipe Luvizotto",
    authorHandle: "Felipe-Luvizotto",
    authorAvatar: "https://avatars.githubusercontent.com/u/101439293?v=4",
    category: "ai",
    categoryLabel: "Data Science & ML",
    techs: ["Python", "Jupyter Notebook", "Machine Learning", "Scikit-Learn", "Pandas"],
    shortDesc: "Modelo preditivo de Machine Learning para identificação em tempo real de transações financeiras fraudulentas com alta taxa de acerto e minimização de falsos positivos.",
    longDesc: "Projeto construído com rigor estatístico sobre bases de dados bancárias com classes desbalanceadas. Aplica engenharia de atributos avançada, algoritmos ensemble e validação cruzada para sinalizar comportamentos atípicos em pagamentos.",
    businessValue: "Redução direta de prejuízos financeiros por chargeback e proteção ao cliente final em plataformas de checkout e gateways de pagamento.",
    github: "https://github.com/Felipe-Luvizotto/InteligenciaArtificialDeFraudes",
    stars: 0,
    accentColor: "#ec4899",
    metrics: { accuracy: "Score ROC-AUC Otimizado", domain: "Fintech & Antifraude" }
  },
  {
    id: "linuxdesk",
    title: "LinuxDesk Video Bridge",
    badge: "Lucas Gabriel",
    featured: true,
    author: "Lucas Gabriel",
    authorHandle: "blackxzin",
    authorAvatar: "https://avatars.githubusercontent.com/u/173632812?v=4",
    category: "mobile",
    categoryLabel: "Mobile & Desktop",
    techs: ["Python", "WebSocket", "Android", "H.264 Streaming", "Linux Display"],
    shortDesc: "Software que transforma dispositivos móveis Android em monitores secundários estendidos para Linux via rede local (WiFi), com baixa latência usando compressão H.264.",
    longDesc: "Solução que conecta o display server do Linux a um cliente móvel via WebSockets de alto débito. Captura a tela virtual em tempo real, codifica em H.264 por hardware e entrega taxa de quadros suave sem cabos.",
    businessValue: "Demonstra competência avançada em protocolos de rede de baixa latência, streaming multimídia e integração entre diferentes sistemas operacionais.",
    github: "https://github.com/blackxzin/linuxdesk",
    stars: 0,
    accentColor: "#8b5cf6",
    metrics: { latency: "Baixa latência WiFi", codec: "Hardware H.264" }
  },
  {
    id: "swiftui-firebase",
    title: "SwiftUI & Firebase Suite",
    badge: "Felipe Luvizotto",
    featured: false,
    author: "Felipe Luvizotto",
    authorHandle: "Felipe-Luvizotto",
    authorAvatar: "https://avatars.githubusercontent.com/u/101439293?v=4",
    category: "mobile",
    categoryLabel: "Mobile Nativo (iOS)",
    techs: ["Swift", "SwiftUI", "iOS", "Firebase Auth", "Firestore", "MapKit"],
    shortDesc: "Aplicações nativas para ecossistema Apple em SwiftUI, com autenticação na nuvem, banco de dados em tempo real, suporte a geolocalização interativa e design Apple HIG.",
    longDesc: "Aplicativos desenvolvidos com os padrões mais modernos da Apple, integrando Firebase Firestore para dados em tempo real, Firebase Authentication, permissões de sistema e renderização vetorial de mapas com MapKit.",
    businessValue: "Desenvolvimento de aplicativos iOS rápidos, elegantes e prontos para publicação na App Store com conformidade total às diretrizes da Apple.",
    github: "https://github.com/Felipe-Luvizotto/SwiftUIFireBase",
    secondaryGithub: "https://github.com/Felipe-Luvizotto/mapInSwiftUI",
    stars: 0,
    accentColor: "#06b6d4",
    metrics: { platform: "iOS Nativo 100%", backend: "Firebase Cloud" }
  },
  {
    id: "btc-trading-bot",
    title: "BTC Quantitative Bot",
    badge: "Lucas Gabriel",
    featured: false,
    author: "Lucas Gabriel",
    authorHandle: "blackxzin",
    authorAvatar: "https://avatars.githubusercontent.com/u/173632812?v=4",
    category: "ai",
    categoryLabel: "Automação & Finanças",
    techs: ["Python", "Crypto API", "Backtesting", "Risk Management", "Fast Execution"],
    shortDesc: "Laboratório de pesquisa para geração de sinais técnicos e execução controlada de estratégias em Bitcoin com limites rigorosos de risco e validação estatística.",
    longDesc: "Sistema autônomo com monitoramento de book de ofertas, cálculo de indicadores (RSI, Médias Móveis, Volume Profile), gatilhos de Stop Loss / Trailing Stop e disparo de alertas instantâneos via webhook.",
    businessValue: "Automação sem falhas de rotinas financeiras, integração com APIs de terceiros e tolerância zero a erros de execução.",
    github: "https://github.com/blackxzin/btc-trading-bot",
    stars: 0,
    accentColor: "#f97316",
    metrics: { protection: "Stop-Loss Automático", uptime: "24/7 Execução" }
  },
  {
    id: "n8n-automation-lab",
    title: "n8n Workflow Hub",
    badge: "Lucas Gabriel",
    featured: false,
    author: "Lucas Gabriel",
    authorHandle: "blackxzin",
    authorAvatar: "https://avatars.githubusercontent.com/u/173632812?v=4",
    category: "ai",
    categoryLabel: "Automações Corporativas",
    techs: ["JavaScript", "n8n", "Webhooks", "CRMs", "WhatsApp / Telegram API"],
    shortDesc: "Laboratório de integrações digitais e automação corporativa com n8n, sincronizando leads, planilhas, bancos de dados e canais de comunicação corporativos.",
    longDesc: "Fluxos de trabalho que eliminam tarefas operacionais manuais: recebimento de leads de formulários, validação, enriquecimento de dados via APIs públicas e notificação imediata do time comercial.",
    businessValue: "Redução de até 80% do trabalho manual em setores comerciais e administrativos de empresas que nos contratam no 99Freelas.",
    github: "https://github.com/blackxzin/n8n-automation-lab",
    stars: 0,
    accentColor: "#14b8a6",
    metrics: { integration: "Zero Código Inútil", speed: "Notificação < 2s" }
  },
  {
    id: "marte-graphs-csharp",
    title: "Rotas Ótimas & Grafos (.NET)",
    badge: "Felipe Luvizotto",
    featured: false,
    author: "Felipe Luvizotto",
    authorHandle: "Felipe-Luvizotto",
    authorAvatar: "https://avatars.githubusercontent.com/u/101439293?v=4",
    category: "web",
    categoryLabel: "Engenharia de Software & .NET",
    techs: ["C#", ".NET", "Algoritmos de Grafos", "Dijkstra", "SQL Server", "APIs"],
    shortDesc: "Software de engenharia em C# para cálculo do menor caminho entre pontos geográficos utilizando algoritmos avançados de grafos e renderização visual bidimensional.",
    longDesc: "Aplicação fundamentada na sólida base acadêmica do Cotuca/UNICAMP. Implementa matrizes de adjacência, buscas em profundidade/largura e caminho de custo mínimo com interface gráfica fluida e banco de dados relacional.",
    businessValue: "Capacidade de resolver problemas lógicos e matemáticos de alta complexidade em logística, roteirização de entregas e otimização de frotas.",
    github: "https://github.com/Felipe-Luvizotto/apCaminhosEmMarte",
    secondaryGithub: "https://github.com/Felipe-Luvizotto/BaseCRUD_API",
    stars: 0,
    accentColor: "#0ea5e9",
    metrics: { complexity: "O(V + E log V)", engine: ".NET Framework & C#" }
  },
  {
    id: "jobpilot-saas",
    title: "JobPilot & SaaS Starter",
    badge: "Lucas Gabriel",
    featured: false,
    author: "Lucas Gabriel",
    authorHandle: "blackxzin",
    authorAvatar: "https://avatars.githubusercontent.com/u/173632812?v=4",
    category: "web",
    categoryLabel: "Sistemas Web & SaaS",
    techs: ["Python", "FastAPI", "React", "PostgreSQL", "Docker", "Tailored SaaS"],
    shortDesc: "Boilerplate de arquitetura para produtos SaaS modernos com autenticação, cobranças, pipeline de dados e inteligência artificial acoplada.",
    longDesc: "Base sólida para lançamento veloz de produtos no mercado. Contém estrutura modular em camadas, documentação OpenAPI automática, migrações de banco seguras e isolamento com Docker.",
    businessValue: "Entrega do seu produto SaaS pronto para testes de validação com clientes reais em semanas, não meses.",
    github: "https://github.com/blackxzin/jobpilot-ai",
    secondaryGithub: "https://github.com/blackxzin/saas-starter",
    stars: 0,
    accentColor: "#8b5cf6",
    metrics: { architecture: "Clean Architecture", ready: "Pronto para Escala" }
  },
  {
    id: "unity-3d-sims",
    title: "Simulação 3D & Unity Engine",
    badge: "Felipe Luvizotto",
    featured: false,
    author: "Felipe Luvizotto",
    authorHandle: "Felipe-Luvizotto",
    authorAvatar: "https://avatars.githubusercontent.com/u/101439293?v=4",
    category: "mobile",
    categoryLabel: "Interatividade 3D & Games",
    techs: ["Unity 3D", "C#", "Física Gravitacional", "Render Pipelines", "Game Dev"],
    shortDesc: "Simulação espacial interativa em Unity 3D com física newtoniana de corpos celestes em tempo real, iluminação dinâmica e controles de câmera orbitais.",
    longDesc: "Desenvolvido com o motor Unity e programação orientada a objetos em C#. Trabalha com equações gravitacionais, cálculo de trajetórias orbitais em tempo de execução e shaders de superfície.",
    businessValue: "Demonstra competência técnica em programação tridimensional, física em tempo real e criação de experiências imersivas.",
    github: "https://github.com/Felipe-Luvizotto/SolarSystemInUnity",
    secondaryGithub: "https://github.com/Felipe-Luvizotto/RollerMadness22129",
    stars: 0,
    accentColor: "#e11d48",
    metrics: { fps: "60 FPS Cravados", engine: "Unity 3D Engine" }
  },
  {
    id: "cyber-security-hub",
    title: "Cybersecurity Defense Hub",
    badge: "Lucas Gabriel",
    featured: false,
    author: "Lucas Gabriel",
    authorHandle: "blackxzin",
    authorAvatar: "https://avatars.githubusercontent.com/u/173632812?v=4",
    category: "security",
    categoryLabel: "Cibersegurança",
    techs: ["HTML5", "JavaScript", "Python", "OWASP 2025", "Defense in Depth"],
    shortDesc: "Plataforma interativa com 72 laboratórios práticos cobrindo o OWASP Top 10 2025, auditoria de vulnerabilidades e assistente inteligente de segurança defensiva.",
    longDesc: "Hub educacional e prático criado para disseminar boas práticas de segurança defensiva e testes controlados contra injeções SQL, XSS, CSRF, quebra de autenticação e vazamento de dados confidenciais.",
    businessValue: "Segurança não é opcional: todo código desenvolvido pela dupla já nasce com princípios de Security by Design e validações rigorosas.",
    github: "https://github.com/blackxzin/cybersecurity-learn",
    secondaryGithub: "https://github.com/blackxzin/cybersecurity-assistant",
    stars: 0,
    accentColor: "#059669",
    metrics: { modules: "72 Aulas Práticas", standards: "OWASP Top 10" }
  },
  {
    id: "manga-ecosystem",
    title: "Manga Hub & Reader WebApp",
    badge: "Lucas & Felipe",
    featured: false,
    author: "Lucas & Felipe",
    authorHandle: "blackxzin + Felipe-Luvizotto",
    authorAvatar: "https://avatars.githubusercontent.com/u/101439293?v=4",
    category: "web",
    categoryLabel: "Frontend & Web Apps",
    techs: ["TypeScript", "React", "Node.js", "CSS3 Moderno", "Cache Local"],
    shortDesc: "Ecossistema web completo com catálogo digital, leitor dinâmico de páginas em alta resolução, sistema de favoritos offline e modo noturno.",
    longDesc: "Plataforma focada em experiência do usuário com interface minimalista, consumo de APIs de mídia, paginação infinita e renderização veloz sem engasgos.",
    businessValue: "Criação de interfaces elegantes, responsivas e confortáveis tanto no computador quanto no celular.",
    github: "https://github.com/Felipe-Luvizotto/my-manga-site",
    secondaryGithub: "https://github.com/blackxzin/manga-reader",
    stars: 2,
    accentColor: "#a855f7",
    metrics: { ui: "Dark Mode Nativo", mobile: "100% Responsivo" }
  }
];

export const freelanceBenefits = [
  {
    icon: "zap",
    title: "Dois Especialistas pelo Custo de Um",
    desc: "Ao contratar nossa dupla no 99Freelas, você ganha a velocidade de dois desenvolvedores complementares (Backend/Segurança e Frontend/Mobile/IA) trabalhando em paralelo sem gargalos."
  },
  {
    icon: "shield",
    title: "Código Seguro e Blindado",
    desc: "Não fazemos gambiarras. Nosso código segue padrões limpos, autenticação segura, proteção contra falhas e testes de robustez antes de qualquer entrega."
  },
  {
    icon: "clock",
    title: "Comunicação Ágil & Sem Enrolação",
    desc: "Atualizações constantes de progresso com links de demonstração para você testar durante o desenvolvimento. Sem surpresas no dia da entrega."
  },
  {
    icon: "award",
    title: "Suporte e Garantia Pós-Entrega",
    desc: "Garantimos o funcionamento do que foi entregue e oferecemos suporte para eventuais dúvidas de implantação, hospedagem e operação."
  }
];

export const processSteps = [
  {
    step: "01",
    title: "Briefing & Entendimento",
    desc: "Analisamos sua demanda no 99Freelas ou WhatsApp, tiramos dúvidas técnicas e definimos o escopo exato do que vai gerar mais resultado para você."
  },
  {
    step: "02",
    title: "Arquitetura & Proposta Clara",
    desc: "Apresentamos o plano de execução, tecnologias ideais e cronograma detalhado de entregas com valores justos e transparentes."
  },
  {
    step: "03",
    title: "Desenvolvimento & Testes",
    desc: "Lucas cuida da infraestrutura e APIs robustas enquanto Felipe desenvolve interfaces e integrações. Você recebe links de prévia para validar o projeto em andamento."
  },
  {
    step: "04",
    title: "Homologação & Segurança",
    desc: "Testamos todos os fluxos: pagamentos, responsividade em celular, tempos de resposta e blindagem de segurança."
  },
  {
    step: "05",
    title: "Entrega Final & Suporte",
    desc: "Subimos o projeto em produção na sua nuvem, entregamos o código-fonte completo documentado e realizamos o treinamento se necessário."
  }
];
