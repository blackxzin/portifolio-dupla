// Screens of the desktop "system" interface and the quest text shown for each section.
export const VIEWS = [
  { id: 'welcome', label: 'Início', sections: ['intro'] },
  { id: 'examples', label: 'Exemplos', sections: ['hero', 'bot'] },
  { id: 'skills', label: 'O que fazemos', sections: ['services', 'stack', 'process'] },
  { id: 'quests', label: 'Missões', sections: ['stats', 'projects'] },
  { id: 'budget', label: 'Orçamento', sections: ['pricing'] },
  { id: 'team', label: 'A dupla', sections: ['duo-team', 'benefits'] },
  { id: 'contact', label: 'Contato', sections: ['contact'] }
];

export const SECTION_IDS = VIEWS.flatMap((view) => view.sections);

// [mission name, objective, rewards]
export const QUESTS = {
  intro: ['Conhecer a NovaTech', 'Ver quem somos e as quatro frentes em que trabalhamos.', ['Visão geral']],
  hero: ['Seu site no ar', 'Ver como um site leva clientes para o seu WhatsApp.', ['Mais contatos']],
  bot: ['Automação em ação', 'Ver o caminho de uma mensagem: do WhatsApp até a sua equipe.', ['Tempo livre']],
  services: ['Escolher a frente', 'Sites, sistemas, automações e cloud, explicados um a um.', ['Sob medida']],
  stack: ['Abrir a caixa de ferramentas', 'Ver com quais tecnologias construímos e para que serve cada uma.', ['Clareza']],
  process: ['Planejar a missão', 'Entender as etapas, do primeiro contato ao site no ar.', ['Sem surpresas']],
  stats: ['Ler o painel', 'Ver os números da dupla, contados do próprio portfólio.', ['Transparência']],
  projects: ['Ver missões concluídas', 'Abrir os projetos e testar os demos ao vivo.', ['Prova real']],
  pricing: ['Pedir orçamento', 'Contar o que precisa e quanto pretende investir.', ['Proposta justa']],
  'duo-team': ['Conhecer os jogadores', 'Saber quem vai construir o seu projeto.', ['Contato direto']],
  benefits: ['Rotina de trabalho', 'Ver como a dupla trabalha no dia a dia.', ['Confiança']],
  contact: ['Aceitar a missão', 'Chamar no WhatsApp e começar o seu projeto.', ['Orçamento grátis']]
};
