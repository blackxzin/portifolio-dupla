// Conteúdo da seção de orçamento. O valor não é fixo: é combinado com o orçamento de cada cliente.
export const OFFER = {
  badge: 'Orçamento sob medida',
  cardTitle: 'Site profissional completo',
  priceLabel: 'Criação do site',
  priceValue: 'A negociar',
  priceNote: 'valor combinado com você, de acordo com o seu orçamento e com o que o seu negócio precisa',
  monthly: 147,
  monthlyNote: 'só a partir do 3º mês, para manter tudo no ar',
  reassurance: 'Orçamento sem compromisso',
  ctaLabel: 'Pedir meu orçamento',
  ctaMessage: 'Olá, Lucas e Felipe! Vi o portfólio e quero um orçamento de site para o meu negócio. Podemos conversar?',
  // Linha do tempo de pagamento: o 2º mês não tem mensalidade.
  steps: [
    { tag: 'Mês 1', title: 'Criação do site', desc: 'Valor negociado de acordo com o seu orçamento. Você aprova a prévia antes de publicar.' },
    { tag: 'Mês 2', title: 'Sem mensalidade', desc: 'O site já está no ar e você não paga nada neste mês.' },
    { tag: 'Mês 3 em diante', title: 'R$ 147 por mês', desc: 'Hospedagem, manutenção e suporte para manter tudo funcionando.' }
  ],
  siteIncludes: [
    'Site profissional feito sob medida para o seu negócio',
    'Layout que funciona no celular, tablet e computador',
    'Botão de WhatsApp para o cliente falar com você em um toque',
    'Estrutura pronta para aparecer no Google',
    'Domínio próprio e cadeado de segurança (HTTPS)'
  ],
  monthlyIncludes: [
    'Hospedagem rápida e site sempre no ar',
    'Manutenção e atualizações de segurança',
    'Ajustes de texto e fotos quando precisar',
    'Suporte direto com quem fez o site'
  ],
  guarantees: [
    { icon: 'shield', title: 'Você aprova antes', desc: 'Mostramos uma prévia e só publicamos quando você gostar.' },
    { icon: 'people', title: 'Fala com quem faz', desc: 'Sem intermediário: o contato é direto com a dupla.' },
    { icon: 'zap', title: 'Pensado para vender', desc: 'Cada seção leva o visitante até o seu WhatsApp.' }
  ],
  comparison: {
    without: [
      'O cliente procura no Google e encontra o concorrente',
      'Você depende só de rede social para ser achado',
      'Fica difícil passar confiança para quem não te conhece'
    ],
    with: [
      'Seu negócio aparece quando o cliente procura',
      'Um endereço profissional para mandar para qualquer pessoa',
      'Contatos chegando no WhatsApp a qualquer hora'
    ]
  }
};
