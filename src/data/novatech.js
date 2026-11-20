// NovaTech: the four pillars from the logo and the tools behind each one.
// Every tool listed here was used in a real project of the portfolio or by one of the two devs.

export const PILLARS = [
  {
    id: 'sites',
    icon: 'globe',
    title: 'Sites Profissionais',
    what: 'Landing pages, sites institucionais e lojas virtuais rápidos, bonitos no celular e feitos para levar o cliente direto para o seu WhatsApp.',
    forWho: 'Comércios, prestadores de serviço, profissionais liberais e quem precisa aparecer no Google.',
    delivers: [
      'Landing page ou site institucional completo',
      'Loja virtual com catálogo, carrinho e cupons',
      'Agendamento e botão de WhatsApp com mensagem pronta',
      'SEO técnico para ser encontrado no Google',
      'Domínio, hospedagem e manutenção mensal'
    ],
    tools: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vite']
  },
  {
    id: 'sistemas',
    icon: 'code',
    title: 'Sistemas Personalizados',
    what: 'Painéis, plataformas, APIs e aplicativos feitos para o jeito que o seu negócio funciona: cadastros, agenda, estoque, pedidos e relatórios.',
    forWho: 'Empresas que vivem de planilha, sistemas que não conversam entre si ou ideias que precisam virar produto.',
    delivers: [
      'Painel administrativo com login e permissões',
      'APIs integradas a ERPs, CRMs e pagamentos',
      'Aplicativos para iPhone e Android',
      'Programas desktop para Windows e Linux',
      'Banco de dados modelado para o seu negócio'
    ],
    tools: ['Python', 'FastAPI', 'Java', 'Spring Boot', 'C# / .NET', 'SwiftUI', 'PostgreSQL']
  },
  {
    id: 'automacoes',
    icon: 'gear',
    title: 'Automações Inteligentes',
    what: 'Robôs que fazem o trabalho repetitivo por você: atendimento no WhatsApp, respostas automáticas, coleta de dados e fluxos que ligam suas ferramentas.',
    forWho: 'Quem perde horas respondendo as mesmas perguntas, copiando dados ou avisando a equipe na mão.',
    delivers: [
      'Bot de atendimento no WhatsApp e Telegram',
      'Fluxos no n8n e webhooks entre sistemas',
      'Coleta e organização de dados automáticas',
      'IA para responder, resumir e classificar mensagens',
      'Avisos automáticos para a sua equipe'
    ],
    tools: ['n8n', 'Python', 'Node.js', 'Webhooks', 'WhatsApp API', 'Modelos de IA']
  },
  {
    id: 'cloud',
    icon: 'cloud',
    title: 'Soluções em Cloud',
    what: 'Colocamos e mantemos tudo no ar: hospedagem, banco de dados, backups e segurança, sem você precisar entender de servidor.',
    forWho: 'Quem quer o site ou sistema funcionando 24h, rápido e protegido, com alguém cuidando por trás.',
    delivers: [
      'Hospedagem com publicação automática',
      'Banco de dados e arquivos na nuvem',
      'Serviços em Docker e servidores Linux',
      'HTTPS, login seguro e controle de acesso',
      'Revisão de segurança com base no OWASP'
    ],
    tools: ['Vercel', 'Docker', 'Firebase', 'PostgreSQL', 'Linux', 'OWASP']
  }
];

// Grouped by what each layer does for the client, in plain words.
export const STACK_GROUPS = [
  { id: 'front', label: 'Front-end e sites', why: 'As telas que o seu cliente vê e usa, leves e rápidas no celular.', tools: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vite'] },
  { id: 'back', label: 'Back-end e APIs', why: 'O que ninguém vê: regras do negócio, login, pagamentos e integrações.', tools: ['Python', 'FastAPI', 'Java', 'Spring Boot', 'Node.js', 'C#', '.NET'] },
  { id: 'mobile', label: 'Apps e desktop', why: 'Aplicativos para iPhone e Android e programas para o computador.', tools: ['Swift', 'SwiftUI', 'Android', 'Unity 3D'] },
  { id: 'auto', label: 'Automação e IA', why: 'Robôs e fluxos que trabalham sozinhos, 24 horas por dia.', tools: ['n8n', 'Webhooks', 'WhatsApp API', 'Modelos de IA', 'Machine Learning', 'Pandas'] },
  { id: 'cloud', label: 'Dados e cloud', why: 'Onde tudo fica guardado, com backup, e no ar o tempo todo.', tools: ['PostgreSQL', 'SQL Server', 'Firebase', 'Docker', 'Vercel', 'Linux'] },
  { id: 'sec', label: 'Segurança', why: 'Proteção de dados, senhas e acessos desde o primeiro dia.', tools: ['OWASP', 'JWT', 'OAuth', 'HTTPS'] }
];
