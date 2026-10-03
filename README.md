# berezhnoy.it — сайт IT-обслуживания компаний

React 19 + Vite. Одностраничный сайт на 4 языках (PL / EN / UA / RU).

## Запуск
```bash
npm install
npm run dev      # локально http://localhost:5173
npm run build    # готовый сайт в папке dist/
```

## Что где менять
| Что | Файл |
|---|---|
| Контакты, WhatsApp, Telegram, LinkedIn | `src/config.js` → `CONTACTS` |
| Цены калькулятора (PLN netto) | `src/config.js` → `PRICING` |
| Куда отправлять форму (вебхук n8n / Formspree) | `src/config.js` → `FORM_ENDPOINT` |
| Тексты на каждом языке | `src/i18n/pl.js`, `en.js`, `uk.js`, `ru.js` (одинаковая структура) |
| Сертификаты и стек технологий | `src/components/Sections.jsx` → `CERTS`, `STACK` |
| Цвета и шрифты | `src/styles.css` → блок `:root` |

## Форма
Если `FORM_ENDPOINT` пустой, форма показывает готовый текст письма с кнопкой «Копировать».
Если указать URL (например вебхук n8n), форма шлёт POST JSON:
`{ name, company, email, phone, message, consent, lang, source }`.

## Публикация на GitHub Pages
1. Создать репозиторий (например `Alleger/berezhnoy-it`), залить код в ветку `main`.
2. Settings → Pages → Source: **GitHub Actions**.
3. Workflow `.github/workflows/deploy.yml` соберёт и опубликует сайт при каждом push.
`base: './'` в `vite.config.js` — сайт работает и по адресу `/repo-name/`, и на своём домене.
