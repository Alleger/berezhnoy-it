import { useEffect, useState } from 'react';
import { useI18n, LANG_LABELS } from '../i18n/index.jsx';
import { BRAND, LANGS } from '../config.js';
import Icon from './Icon.jsx';

export function Logo() {
  return (
    <a href="#top" className="logo" aria-label={BRAND.name}>
      <span className="logo-mark" aria-hidden="true">
        <i /><i /><i /><i />
      </span>
      <span className="logo-text">berezhnoy<b>.it</b></span>
    </a>
  );
}

export function LangSwitch() {
  const { lang, setLang } = useI18n();
  return (
    <div className="lang" role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button key={l} type="button" className={l === lang ? 'on' : ''} aria-pressed={l === lang}
          onClick={() => setLang(l)}>{LANG_LABELS[l]}</button>
      ))}
    </div>
  );
}

export default function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const links = ['services', 'pricing', 'projects', 'process', 'about', 'faq'];

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="wrap header-row">
        <Logo />
        <nav className={`nav ${open ? 'open' : ''}`} aria-label="Main">
          {links.map((k) => (
            <a key={k} href={`#${k}`} onClick={() => setOpen(false)}>{t.nav[k]}</a>
          ))}
          <div className="nav-mobile-extra"><LangSwitch /></div>
        </nav>
        <div className="header-actions">
          <LangSwitch />
          <a className="btn btn-sm btn-primary" href="#contact">{t.nav.cta}</a>
          <button type="button" className="burger" aria-expanded={open} aria-label={t.nav.menu}
            onClick={() => setOpen(!open)}>
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
