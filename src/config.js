// ============================================================
//  Всё, что нужно менять без правки вёрстки: бренд, контакты, цены.
// ============================================================

export const BRAND = {
  name: 'Berezhnoy IT',
  person: 'Alexey Berezhnoy',
  city: 'Wrocław',
};

export const CONTACTS = {
  phone: '+48 975 627 790',
  phoneHref: '+48975627790',
  email: 'aleksej.berezhnoy@gmail.com',
  whatsapp: 'https://wa.me/48975627790',
  telegram: '', // например 'https://t.me/username' — пусто = кнопка скрыта
  linkedin: 'https://www.linkedin.com/in/alexey-berezhnoy-a3734113b',
};

// Куда отправлять форму (POST JSON). Например вебхук n8n или Formspree.
// Пусто = форма покажет готовый текст письма для копирования.
export const FORM_ENDPOINT = '';

// Цены в PLN netto — ЧЕРНОВЫЕ, поправьте под себя
export const PRICING = {
  perUser: 89,          // абонемент за 1 рабочее место / мес.
  minUsers: 3,          // минимальный абонемент
  perServer: 249,       // сервер / виртуализация, за 1 сервер / мес.
  monitoring: 149,      // мониторинг Zabbix + алерты, / мес.
  erp: 199,             // поддержка ERP (Optima, enova, ABONA), / мес.
  cctv: 149,            // CCTV / VoIP / контроль доступа, / мес.
  onsiteHour: 150,      // выезд, за час
  vat: 0.23,
  responseHours: 4,
};

export const LANGS = ['pl', 'en', 'uk', 'ru'];
