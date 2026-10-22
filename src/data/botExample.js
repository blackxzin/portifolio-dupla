// Exemplo ilustrativo de conversa com o atendimento automático (negócio fictício).
// `from`: 'client' ou 'bot'. `options` aparecem como botões de resposta rápida.
export const BOT_EXAMPLE = {
  businessName: 'Pizzaria Exemplo',
  avatarLetter: 'P',
  messages: [
    { from: 'client', time: '20:14', text: 'Boa noite! Vocês estão abertos?' },
    {
      from: 'bot', time: '20:14',
      text: 'Boa noite! Estamos abertos até as 23h. Como posso ajudar?',
      options: ['Ver cardápio', 'Fazer pedido', 'Falar com atendente']
    },
    { from: 'client', time: '20:15', text: 'Fazer pedido' },
    {
      from: 'bot', time: '20:15',
      text: 'Perfeito! Qual sabor você quer?',
      options: ['Calabresa', 'Margherita', 'Portuguesa']
    },
    { from: 'client', time: '20:15', text: 'Calabresa grande' },
    { from: 'bot', time: '20:16', text: 'Anotado: 1 calabresa grande, R$ 45. Qual o endereço de entrega?' },
    { from: 'client', time: '20:16', text: 'Rua Sete de Setembro, 120' },
    { from: 'bot', time: '20:16', text: 'Pedido enviado para a cozinha. Tempo médio: 40 minutos. 🍕' }
  ],
  notification: {
    title: 'Novo pedido recebido',
    detail: '1 calabresa grande · Rua Sete de Setembro, 120'
  }
};
