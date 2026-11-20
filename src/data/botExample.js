// Exemplo ilustrativo de uma automação no WhatsApp (negócio fictício).
// `from`: 'client' ou 'bot'. `options` aparecem como botões de resposta rápida.
// `step` acende a etapa correspondente do fluxo ao lado do celular (1 a 4).
export const BOT_EXAMPLE = {
  businessName: 'Academia Exemplo',
  avatarLetter: 'A',
  messages: [
    { from: 'client', time: '19:02', step: 1, text: 'Oi! Tem aula de jiu-jitsu para iniciante?' },
    {
      from: 'bot', time: '19:02', step: 2,
      text: 'Oi! Tem sim 🥋 A turma de iniciantes treina seg, qua e sex às 19h, e a primeira aula é grátis. Quer agendar?',
      options: ['Agendar aula grátis', 'Ver preços', 'Falar com o professor']
    },
    { from: 'client', time: '19:03', step: 1, text: 'Agendar aula grátis' },
    {
      from: 'bot', time: '19:03', step: 2,
      text: 'Show! Qual dia fica melhor para você?',
      options: ['Segunda, 19h', 'Quarta, 19h', 'Sexta, 19h']
    },
    { from: 'client', time: '19:03', step: 1, text: 'Quarta, 19h' },
    { from: 'bot', time: '19:04', step: 3, text: 'Pronto! Sua aula experimental está marcada para quarta, às 19h. No dia eu te mando um lembrete. 💪' }
  ],
  notification: {
    title: 'Nova aula agendada',
    detail: 'Jiu-jitsu iniciante · quarta, 19h'
  }
};

// The path of one message, shown next to the phone.
export const BOT_FLOW = [
  { step: 1, title: 'A mensagem chega', text: 'O cliente chama no WhatsApp a qualquer hora, até de madrugada.' },
  { step: 2, title: 'O robô entende e responde', text: 'Em segundos: horários, preços, cardápio, estoque. Com IA quando precisa.' },
  { step: 3, title: 'O sistema registra', text: 'Agenda, pedido ou cadastro vão direto para a planilha, o CRM ou o seu sistema.' },
  { step: 4, title: 'A sua equipe é avisada', text: 'Chega um alerta com tudo organizado. Assunto delicado? Passa para uma pessoa.' }
];
