// Contato usado em todos os botões de WhatsApp do site.
export const CONTACT = {
  // DDI + DDD + número, só dígitos (ex.: '5514999999999').
  // Vazio = o WhatsApp abre para a pessoa escolher o contato.
  whatsappNumber: '5514996112048',
  greeting: 'Olá, Lucas e Felipe! Vi o portfólio de vocês e gostaria de conversar sobre um projeto.'
};

const NON_DIGITS = /\D/g;

export function whatsappUrl(message = CONTACT.greeting) {
  const number = String(CONTACT.whatsappNumber || '').replace(NON_DIGITS, '');
  const text = encodeURIComponent(message);
  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`;
}

// Any <a data-wa="mensagem opcional"> becomes a WhatsApp link.
export function bindWhatsappLinks(root = document) {
  root.querySelectorAll('[data-wa]').forEach((link) => {
    link.setAttribute('href', whatsappUrl(link.getAttribute('data-wa') || CONTACT.greeting));
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
}
