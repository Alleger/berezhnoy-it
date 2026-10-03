import { useI18n } from '../i18n/index.jsx';
import { BRAND, CONTACTS } from '../config.js';
import { Logo } from './Header.jsx';

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>{t.footer.tagline}</p>
        </div>
        <div>
          <h4>{t.footer.services}</h4>
          <ul>
            <li><a href="#services">{t.nav.services}</a></li>
            <li><a href="#projects">{t.nav.projects}</a></li>
            <li><a href="#pricing">{t.nav.pricing}</a></li>
          </ul>
        </div>
        <div>
          <h4>{t.footer.company}</h4>
          <ul>
            <li><a href="#about">{t.nav.about}</a></li>
            <li><a href="#process">{t.nav.process}</a></li>
            <li><a href="#faq">{t.nav.faq}</a></li>
          </ul>
        </div>
        <div>
          <h4>{t.nav.contact}</h4>
          <ul>
            <li className="sel">{CONTACTS.phone}</li>
            <li className="sel">{CONTACTS.email}</li>
            <li>{BRAND.city}</li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {year} {BRAND.name} · {BRAND.person}. {t.footer.rights}</span>
        <span>{t.footer.privacy}</span>
      </div>
    </footer>
  );
}
