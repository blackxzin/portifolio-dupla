// Oferta da seção de preço. Mude valores e textos aqui.
//
// Gatilhos de venda só funcionam enquanto forem verdadeiros. Por isso:
// - `validUntil`: data real (AAAA-MM-DD). Aparece como "válida até dd/mm/aaaa" e some sozinha
//   quando a data passa. Deixe '' se a oferta não tem prazo.
// - `slotsNote`: só preencha se o limite de vagas for real (ex.: 'Vagas para novembro: 3').
export const OFFER = {
  badge: 'Oferta especial',
  oldPrice: 2000,
  price: 997,
  monthly: 147,
  ctaLabel: 'Quero meu site por R$\u00a0997',
  ctaMessage: 'Olá, Lucas e Felipe! Vi a oferta no portfólio e quero meu site por R$ 997 + R$ 147/mês. Podemos conversar?',
  validUntil: '',
  slotsNote: '',
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
