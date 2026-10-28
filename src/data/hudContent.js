// Screens of the desktop "system" interface and the quest text shown for each section.
export const VIEWS = [
  { id: 'welcome', label: 'Boas-vindas', sections: ['intro'] },
  { id: 'examples', label: 'Exemplos', sections: ['hero', 'bot'] },
  { id: 'skills', label: 'Habilidades', sections: ['services', 'process'] },
  { id: 'quests', label: 'Missões', sections: ['projects'] },
  { id: 'budget', label: 'Orçamento', sections: ['pricing'] },
  { id: 'team', label: 'A dupla', sections: ['duo-team', 'benefits'] },
  { id: 'contact', label: 'Contato', sections: ['contact'] }
];

export const SECTION_IDS = VIEWS.flatMap((view) => view.sections);

// [mission name, objective, rewards]
export const QUESTS = {
  intro: ['Entrar no sistema', 'Conhecer a dupla e o que ela constrói.', ['Visão geral']],
  hero: ['Seu site no ar', 'Ver como um site leva clientes para o seu WhatsApp.', ['Mais contatos']],
  bot: ['Atendimento sozinho', 'Ver o bot respondendo e anotando um pedido no WhatsApp.', ['Tempo livre']],
  services: ['Escolher a habilidade', 'Ver o que a dupla faz: sites, bots, sistemas e apps.', ['Sob medida']],
  process: ['Planejar a missão', 'Entender as etapas, do primeiro contato ao site no ar.', ['Sem surpresas']],
  projects: ['Ver missões concluídas', 'Abrir os projetos e testar os demos ao vivo.', ['Prova real']],
  pricing: ['Pedir orçamento', 'Contar o que precisa e quanto pretende investir.', ['Proposta justa']],
  'duo-team': ['Conhecer os jogadores', 'Saber quem vai construir o seu projeto.', ['Contato direto']],
  benefits: ['Rotina de trabalho', 'Ver como a dupla trabalha no dia a dia.', ['Confiança']],
  contact: ['Aceitar a missão', 'Chamar no WhatsApp e começar o seu projeto.', ['Orçamento grátis']]
};
