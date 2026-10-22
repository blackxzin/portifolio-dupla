import { BOT_EXAMPLE } from '../data/botExample.js';
import { prefersReducedMotion } from './motion.js';

const TYPING_MS = 1100;
const READ_MS = 800;
const AFTER_MESSAGE_MS = 650;
const LOOP_PAUSE_MS = 5200;
const NOTIFY_DELAY_MS = 450;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function buildBubble(message) {
  const bubble = el('div', `wa-bubble wa-bubble--${message.from}`);
  bubble.append(message.text, el('span', 'wa-time', message.from === 'client' ? `${message.time} ✓✓` : message.time));
  return bubble;
}

function buildOptions(options) {
  const list = el('div', 'wa-options');
  options.forEach((label) => list.append(el('span', '', label)));
  return list;
}

function buildTyping() {
  const typing = el('div', 'wa-typing');
  typing.append(el('i'), el('i'), el('i'));
  return typing;
}

// Animated WhatsApp-style conversation: typing dots, quick replies and a "new order" alert.
export function setupBotDemo() {
  const visual = document.getElementById('bot-visual');
  const log = document.getElementById('wa-chat-log');
  const alert = document.getElementById('bot-toast');
  if (!visual || !log || !alert) return;

  const { messages, notification } = BOT_EXAMPLE;
  alert.querySelector('.bot-toast-text strong').textContent = notification.title;
  alert.querySelector('.bot-toast-text span').textContent = notification.detail;

  const append = (node, smooth = true) => {
    log.append(node);
    log.scrollTo({ top: log.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
  };

  const renderAll = () => {
    log.replaceChildren();
    messages.forEach((message) => {
      append(buildBubble(message), false);
      if (message.options) append(buildOptions(message.options), false);
    });
    alert.classList.add('is-shown');
  };

  if (prefersReducedMotion()) {
    renderAll();
    return;
  }

  let runId = 0;

  const playOnce = async (id) => {
    log.replaceChildren();
    alert.classList.remove('is-shown');
    await wait(500);
    for (const message of messages) {
      if (id !== runId) return false;
      if (message.from === 'bot') {
        const typing = buildTyping();
        append(typing);
        await wait(TYPING_MS);
        typing.remove();
      } else {
        await wait(READ_MS);
      }
      if (id !== runId) return false;
      append(buildBubble(message));
      if (message.options) {
        await wait(220);
        append(buildOptions(message.options));
      }
      await wait(AFTER_MESSAGE_MS);
    }
    await wait(NOTIFY_DELAY_MS);
    if (id !== runId) return false;
    alert.classList.add('is-shown');
    await wait(LOOP_PAUSE_MS);
    return id === runId;
  };

  const start = async () => {
    runId += 1;
    const id = runId;
    while (await playOnce(id)) { /* loop while this run is still the active one */ }
  };

  const observer = new IntersectionObserver(([entry]) => {
    visual.classList.toggle('is-paused', !entry.isIntersecting);
    if (entry.isIntersecting) start();
    else runId += 1;
  }, { threshold: 0.35 });
  observer.observe(visual);
}
