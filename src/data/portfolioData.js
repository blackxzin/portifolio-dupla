export const duoProfile = {
  brand: "Lucas Gabriel & Felipe de Castro",
  tagline: "Desenvolvimento de software",
  headline: "Desenvolvimento feito de perto.",
  subheadline: "Criamos sistemas web, APIs, aplicativos e automações sob medida, com escopo claro e acompanhamento próximo.",
  availability: "Disponíveis para novos projetos",
  rateStatus: "Orçamentos sob medida",
  stats: [
    { label: "Desenvolvedores", value: "2" },
    { label: "Experiências", value: "Complementares" },
    { label: "Projetos", value: "Sob medida" },
    { label: "Acompanhamento", value: "Próximo" }
  ],
  services: [
    {
      id: "ai-auto",
      icon: "link",
      title: "Automações e integrações",
      desc: "Automatização de tarefas repetitivas, integrações com WhatsApp e Telegram, fluxos no n8n e coleta de dados.",
      popular: false,
      deliverables: ["Bots de atendimento", "Coleta de dados", "Fluxos n8n e webhooks", "Integrações personalizadas"]
    },
    {
      id: "fullstack-saas",
      icon: "layout",
      title: "Sistemas web",
      desc: "Aplicações e painéis administrativos feitos com React, TypeScript, FastAPI e Spring Boot, incluindo autenticação e banco de dados.",
      popular: false,
      deliverables: ["Painéis administrativos", "Plataformas SaaS", "Integração de pagamentos", "SEO técnico"]
    },
    {
      id: "apis-micro",
      icon: "server",
      title: "APIs e integrações",
      desc: "Serviços em Java (Spring Boot) e Python (FastAPI), conectando plataformas, ERPs, CRMs e meios de pagamento.",
      popular: false,
      deliverables: ["APIs documentadas", "Integração de CRMs e gateways", "Serviços em Docker", "Consultas SQL e NoSQL"]
    },
    {
      id: "mobile-apps",
      icon: "smartphone",
      title: "Aplicativos mobile",
      desc: "Aplicativos para iOS e Android com SwiftUI ou Kotlin, integrados a serviços, mapas e notificações.",
      popular: false,
      deliverables: ["Apps iOS nativos com SwiftUI", "Apps Android em Kotlin", "Integração com Firebase e APIs", "Publicação e testes"]
    },
    {
      id: "cyber-audit",
      icon: "shield-check",
      title: "Revisão de segurança",
      desc: "Análise de código e configuração de autenticação, permissões, limites de acesso e políticas de segurança.",
      popular: false,
      deliverables: ["Revisão de falhas comuns", "Autenticação JWT ou OAuth", "Registro de eventos", "Configuração de CORS"]
    },
    {
      id: "desktop-custom",
      icon: "cpu",
      title: "Aplicativos desktop",
      desc: "Ferramentas para Windows e Linux em Python e C#/.NET, incluindo utilitários e transmissão multimídia local.",
      popular: false,
      deliverables: ["Sistemas desktop em C# e Python", "Transmissão multimídia", "Automação de tarefas", "Simulações 3D"]
    }
  ],
  members: [
    {
      name: "Lucas Gabriel",
      handle: "blackxzin",
      role: "Desenvolvimento web e segurança",
      bio: "Desenvolvo APIs e sistemas web com Java (Spring Boot), Python (FastAPI) e React. Também trabalho com automações n8n e revisão de segurança.",
      avatar: "https://avatars.githubusercontent.com/u/173632812?v=4",
      github: "https://github.com/blackxzin",
      tags: ["Python", "Java", "Spring Boot", "FastAPI", "React", "Docker", "n8n", "Cibersegurança", "APIs"],
      highlights: [
        "Desenvolvimento de sistemas web e APIs",
        "Projetos com Spring Boot, FastAPI e React",
        "Automações de processos com n8n",
        "Revisão de segurança e infraestrutura"
      ]
    },
    {
      name: "Felipe de Castro",
      handle: "Felipe-Luvizotto",
      role: "Aplicativos e experiências interativas",
      bio: "Formado pelo Cotuca (Colégio Técnico de Campinas - UNICAMP). Trabalho com aplicativos iOS em SwiftUI, C#/.NET e Unity.",
      avatar: "https://avatars.githubusercontent.com/u/101439293?v=4",
      github: "https://github.com/Felipe-Luvizotto/Felipe-Luvizotto",
      tags: ["C#", ".NET", "Swift", "SwiftUI", "Python", "Machine Learning", "TypeScript", "Unity 3D", "Firebase"],
      highlights: [
        "Formação técnica em programação no COTUCA / UNICAMP",
        "Desenvolvimento de aplicativos e sistemas",
        "Projetos com Python e análise de dados",
        "Experiência com SwiftUI, Firebase e MapKit"
      ]
    }
  ]
};

export const projectsData = [
  {
    id: "freelahunter-ai",
    title: "FreelaHunter",
    badge: "Colaboração da Dupla",
    featured: true,
    author: "Lucas & Felipe",
    authorHandle: "blackxzin + Felipe-Luvizotto",
    authorAvatar: "https://avatars.githubusercontent.com/u/173632812?v=4",
    category: "ai",
    categoryLabel: "Automação",
    techs: ["Python", "Modelos de linguagem", "Coleta de dados", "Automação", "APIs"],
    shortDesc: "Ferramenta para reunir oportunidades de trabalho, comparar briefings com um perfil profissional e acompanhar propostas.",
    longDesc: "O projeto organiza vagas encontradas em plataformas de freelancers, registra os requisitos e ajuda a comparar cada oportunidade com as habilidades cadastradas.",
    businessValue: "Ajuda a manter oportunidades e propostas organizadas em um só lugar.",
    github: "https://github.com/blackxzin/freelahunter-ai",
    secondaryGithub: "https://github.com/Felipe-Luvizotto/freelahunter-ai",
    stars: 0,
    accentColor: "#6366f1",
    metrics: { workflow: "Busca · análise · acompanhamento" }
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
    techs: ["Java", "Spring Boot", "Webhooks", "REST API", "Docker"],
    shortDesc: "Serviço em Java para registrar eventos, aplicar regras de risco e enviar alertas por webhook.",
    longDesc: "Construído com Spring Boot, o projeto recebe eventos, avalia regras configuradas e registra ocorrências para análise. Webhooks encaminham alertas a outros serviços.",
    businessValue: "Pode servir como ponto de partida para monitoramento de eventos em aplicações web.",
    github: "https://github.com/blackxzin/sentinel-security-platform",
    stars: 0,
    accentColor: "#10b981",
    metrics: { workflow: "Eventos · regras · alertas" }
  },
  {
    id: "trading-agents",
    title: "TradingAgents",
    badge: "Felipe de Castro",
    featured: true,
    author: "Felipe de Castro",
    authorHandle: "Felipe-Luvizotto",
    authorAvatar: "https://avatars.githubusercontent.com/u/101439293?v=4",
    category: "ai",
    categoryLabel: "Análise de dados",
    techs: ["Python", "Sistemas multiagentes", "Modelos de linguagem", "Mercado financeiro"],
    shortDesc: "Experimento em Python que combina modelos de linguagem para organizar análises de mercado e notícias.",
    longDesc: "O projeto separa tarefas de análise técnica, notícias e risco em etapas, reunindo as respostas em um relatório. Os resultados servem como material de estudo, não como recomendação de investimento.",
    businessValue: "Demonstra uma forma de estruturar tarefas de análise com modelos de linguagem.",
    github: "https://github.com/Felipe-Luvizotto/TradingAgents",
    stars: 0,
    accentColor: "#f59e0b",
    metrics: { workflow: "Análise · revisão · relatório" }
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
    techs: ["Java", "Spring Boot", "REST API", "PostgreSQL"],
    shortDesc: "API REST em Java que extrai dados de currículos e compara competências com os requisitos de uma vaga.",
    longDesc: "A API recebe o conteúdo de um currículo, extrai campos de experiência e competências e compara esses dados com os requisitos de uma vaga.",
    businessValue: "Pode apoiar a organização inicial de currículos em um processo de recrutamento.",
    github: "https://github.com/blackxzin/cv-analyzer-api",
    stars: 0,
    accentColor: "#3b82f6",
    metrics: { workflow: "Extração · comparação · relatório" }
  },
  {
    id: "fraud-detection-ai",
    title: "Análise de transações",
    badge: "Felipe de Castro",
    featured: true,
    author: "Felipe de Castro",
    authorHandle: "Felipe-Luvizotto",
    authorAvatar: "https://avatars.githubusercontent.com/u/101439293?v=4",
    category: "ai",
    categoryLabel: "Dados e ML",
    techs: ["Python", "Jupyter Notebook", "Machine Learning", "Scikit-Learn", "Pandas"],
    shortDesc: "Projeto em Python que usa dados de transações para estudar padrões associados a fraude.",
    longDesc: "O notebook prepara os dados, treina um classificador e compara os resultados usando métricas de validação. É um projeto de estudo, não um serviço pronto para decisões financeiras.",
    businessValue: "Exercício prático de preparação de dados e classificação de transações.",
    github: "https://github.com/Felipe-Luvizotto/InteligenciaArtificialDeFraudes",
    stars: 0,
    accentColor: "#ec4899",
    metrics: { workflow: "Preparação · treino · avaliação" }
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
    shortDesc: "Transforma um celular Android em segunda tela para Linux pela rede local, com transmissão em H.264.",
    longDesc: "Conecta o servidor gráfico do Linux a um cliente Android por WebSocket. A tela virtual é capturada, codificada em H.264 e enviada pela rede local, sem cabos.",
    businessValue: "Mostra experiência com transmissão de vídeo em rede local e integração entre sistemas operacionais diferentes.",
    github: "https://github.com/blackxzin/linuxdesk",
    stars: 0,
    accentColor: "#8b5cf6",
    metrics: { workflow: "Captura · codificação · transmissão" }
  },
  {
    id: "swiftui-firebase",
    title: "SwiftUI & Firebase Suite",
    badge: "Felipe de Castro",
    featured: false,
    author: "Felipe de Castro",
    authorHandle: "Felipe-Luvizotto",
    authorAvatar: "https://avatars.githubusercontent.com/u/101439293?v=4",
    category: "mobile",
    categoryLabel: "iOS",
    techs: ["Swift", "SwiftUI", "iOS", "Firebase Auth", "Firestore", "MapKit"],
    shortDesc: "Aplicativos para iPhone em SwiftUI com login, dados em tempo real no Firebase e mapas com MapKit.",
    longDesc: "Aplicativos em SwiftUI que usam Firebase Authentication para login, Firestore para dados em tempo real e MapKit para exibir mapas e localização.",
    businessValue: "Base para aplicativos iOS que seguem as diretrizes de interface da Apple.",
    github: "https://github.com/Felipe-Luvizotto/SwiftUIFireBase",
    secondaryGithub: "https://github.com/Felipe-Luvizotto/mapInSwiftUI",
    stars: 0,
    accentColor: "#06b6d4",
    metrics: { workflow: "SwiftUI · Firebase · MapKit" }
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
    categoryLabel: "Automação",
    techs: ["Python", "APIs de mercado", "Indicadores técnicos", "Webhooks"],
    shortDesc: "Projeto de estudo que calcula indicadores técnicos de Bitcoin e envia alertas conforme regras configuradas.",
    longDesc: "Sistema que monitora dados de mercado, calcula indicadores (RSI, médias móveis e Volume Profile) e envia alertas por webhook conforme as regras configuradas.",
    businessValue: "Organiza tarefas financeiras repetitivas e integra dados de serviços externos.",
    github: "https://github.com/blackxzin/btc-trading-bot",
    stars: 0,
    accentColor: "#f97316",
    metrics: { workflow: "Dados · indicadores · alertas" }
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
    categoryLabel: "Automação",
    techs: ["JavaScript", "n8n", "Webhooks", "CRMs", "WhatsApp / Telegram API"],
    shortDesc: "Fluxos no n8n que recebem contatos, organizam planilhas e avisam a equipe por WhatsApp ou Telegram.",
    longDesc: "Fluxos que automatizam tarefas repetitivas: recebem contatos de formulários, validam e completam os dados com APIs públicas e avisam a equipe responsável.",
    businessValue: "Menos trabalho manual em tarefas de rotina, como cadastro e repasse de contatos.",
    github: "https://github.com/blackxzin/n8n-automation-lab",
    stars: 0,
    accentColor: "#14b8a6",
    metrics: { workflow: "Formulário · validação · aviso" }
  },
  {
    id: "marte-graphs-csharp",
    title: "Rotas Ótimas & Grafos (.NET)",
    badge: "Felipe de Castro",
    featured: false,
    author: "Felipe de Castro",
    authorHandle: "Felipe-Luvizotto",
    authorAvatar: "https://avatars.githubusercontent.com/u/101439293?v=4",
    category: "web",
    categoryLabel: "Algoritmos & .NET",
    techs: ["C#", ".NET", "Algoritmos de Grafos", "Dijkstra", "SQL Server", "APIs"],
    shortDesc: "Aplicação em C# que calcula o menor caminho entre cidades usando grafos, com visualização do trajeto.",
    longDesc: "Projeto do COTUCA/UNICAMP que implementa matriz de adjacência, buscas em profundidade e largura e caminho de custo mínimo, com interface gráfica e banco de dados relacional.",
    businessValue: "A mesma lógica serve para problemas de rota, como planejamento de entregas.",
    github: "https://github.com/Felipe-Luvizotto/apCaminhosEmMarte",
    secondaryGithub: "https://github.com/Felipe-Luvizotto/BaseCRUD_API",
    stars: 0,
    accentColor: "#0ea5e9",
    metrics: { workflow: "Dijkstra · C# · SQL Server" }
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
    categoryLabel: "Sistemas web",
    techs: ["Python", "FastAPI", "React", "PostgreSQL", "Docker"],
    shortDesc: "Base para produtos SaaS com autenticação, cobranças e processamento de dados.",
    longDesc: "Estrutura em camadas com documentação OpenAPI gerada automaticamente, migrações de banco e ambiente em Docker.",
    businessValue: "Encurta o caminho até uma primeira versão de um produto SaaS.",
    github: "https://github.com/blackxzin/jobpilot-ai",
    secondaryGithub: "https://github.com/blackxzin/saas-starter",
    stars: 0,
    accentColor: "#8b5cf6",
    metrics: { workflow: "FastAPI · React · Docker" }
  },
  {
    id: "unity-3d-sims",
    title: "Simulação 3D & Unity Engine",
    badge: "Felipe de Castro",
    featured: false,
    author: "Felipe de Castro",
    authorHandle: "Felipe-Luvizotto",
    authorAvatar: "https://avatars.githubusercontent.com/u/101439293?v=4",
    category: "mobile",
    categoryLabel: "3D & Games",
    techs: ["Unity 3D", "C#", "Física", "Game Dev"],
    shortDesc: "Simulação do sistema solar em Unity 3D com gravidade em tempo real e câmera orbital.",
    longDesc: "Feito em Unity com C#. Calcula a gravidade entre os corpos e as órbitas em tempo de execução.",
    businessValue: "Mostra experiência com 3D, física em tempo real e experiências interativas.",
    github: "https://github.com/Felipe-Luvizotto/SolarSystemInUnity",
    secondaryGithub: "https://github.com/Felipe-Luvizotto/RollerMadness22129",
    stars: 0,
    accentColor: "#e11d48",
    metrics: { workflow: "Unity · C# · física" }
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
    techs: ["HTML5", "JavaScript", "Python", "OWASP"],
    shortDesc: "Plataforma de estudo com laboratórios práticos sobre o OWASP Top 10 e boas práticas de segurança defensiva.",
    longDesc: "Material prático sobre injeção de SQL, XSS, CSRF, falhas de autenticação e vazamento de dados, com exercícios em ambiente controlado.",
    businessValue: "Reflete a atenção à segurança que levamos para os projetos que desenvolvemos.",
    github: "https://github.com/blackxzin/cybersecurity-learn",
    secondaryGithub: "https://github.com/blackxzin/cybersecurity-assistant",
    stars: 0,
    accentColor: "#059669",
    metrics: { workflow: "OWASP Top 10 · laboratórios" }
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
    categoryLabel: "Frontend",
    techs: ["TypeScript", "React", "Node.js", "CSS"],
    shortDesc: "Leitor de mangá na web com catálogo, favoritos salvos no navegador e modo noturno.",
    longDesc: "Interface simples que consome APIs de mídia, com rolagem infinita e carregamento rápido das páginas.",
    businessValue: "Interfaces confortáveis de usar no computador e no celular.",
    github: "https://github.com/Felipe-Luvizotto/my-manga-site",
    secondaryGithub: "https://github.com/blackxzin/manga-reader",
    stars: 2,
    accentColor: "#a855f7",
    metrics: { workflow: "Catálogo · leitor · favoritos" }
  }
];

export const freelanceBenefits = [
  {
    icon: "zap",
    title: "Duas áreas de experiência",
    desc: "Lucas trabalha principalmente com backend e segurança; Felipe com aplicativos, interfaces e projetos interativos."
  },
  {
    icon: "shield",
    title: "Atenção à segurança",
    desc: "Consideramos autenticação, permissões e validação de dados durante o desenvolvimento."
  },
  {
    icon: "clock",
    title: "Acompanhamento do projeto",
    desc: "Compartilhamos o progresso e alinhamos as próximas etapas durante o desenvolvimento."
  },
  {
    icon: "award",
    title: "Orientação na entrega",
    desc: "Ao final, explicamos como executar e publicar o que foi desenvolvido."
  }
];

export const processSteps = [
  {
    step: "01",
    title: "Conversa inicial",
    desc: "Entendemos a necessidade, esclarecemos dúvidas e combinamos o que será feito."
  },
  {
    step: "02",
    title: "Escopo e planejamento",
    desc: "Definimos etapas, tecnologias e uma previsão de prazo e investimento."
  },
  {
    step: "03",
    title: "Desenvolvimento e testes",
    desc: "Dividimos as tarefas conforme o projeto e compartilhamos versões de prévia para receber comentários."
  },
  {
    step: "04",
    title: "Revisão e segurança",
    desc: "Revisamos os principais fluxos e ajustamos os problemas encontrados antes da publicação."
  },
  {
    step: "05",
    title: "Entrega e suporte",
    desc: "Entregamos o código, publicamos e explicamos como usar e manter."
  }
];
