import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import pl from './pl.js';
import en from './en.js';
import ru from './ru.js';
import uk from './uk.js';
import { LANGS } from '../config.js';

const DICTS = { pl, en, ru, uk };
const LOCALES = { pl: 'pl-PL', en: 'en-GB', ru: 'ru-RU', uk: 'uk-UA' };
export const LANG_LABELS = { pl: 'PL', en: 'EN', uk: 'UA', ru: 'RU' };
const KEY = 'site-lang';

function initialLang() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved && LANGS.includes(saved)) return saved;
  } catch (e) { /* storage недоступен */ }
  const nav = (typeof navigator !== 'undefined' && navigator.language || 'pl').slice(0, 2).toLowerCase();
  return LANGS.includes(nav) ? nav : 'pl';
}

const Ctx = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem(KEY, l); } catch (e) { /* ignore */ }
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'uk' ? 'uk' : lang;
    document.title = DICTS[lang].meta.title;
  }, [lang]);

  const value = useMemo(() => {
    const locale = LOCALES[lang];
    const nf = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
    return {
      lang,
      setLang,
      t: DICTS[lang],
      // подстановка {key} в строку
      f: (str, vars = {}) => str.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : `{${k}}`)),
      num: (n) => nf.format(Math.round(n)),
    };
  }, [lang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
