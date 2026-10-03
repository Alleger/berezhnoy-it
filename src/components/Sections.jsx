import { useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { CONTACTS } from '../config.js';
import Icon from './Icon.jsx';

export function SectionHead({ eyebrow, title, lead }) {
  return (
    <div className="section-head">
      <p className="eyebrow"><span className="tag-dot" />{eyebrow}</p>
      <h2>{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}

export function Trust() {
  const { t } = useI18n();
  return (
    <div className="trust">
      <div className="wrap trust-row">
        <div className="trust-years"><b>10+</b><span>{t.trust.years}</span></div>
        <ul>
          {t.trust.items.map((x) => <li key={x}>{x}</li>)}
        </ul>
      </div>
    </div>
  );
}

export function Audience() {
  const { t } = useI18n();
  return (
    <section className="section" id="audience">
      <div className="wrap">
        <SectionHead eyebrow={t.audience.eyebrow} title={t.audience.title} />
        <div className="audience-grid">
          {t.audience.items.map((it) => (
            <article key={it.title} className="aud">
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICE_ICONS = ['cloud', 'user', 'laptop', 'network', 'backup', 'pulse', 'cart', 'doc'];

export function Services() {
  const { t } = useI18n();
  return (
    <section className="section section-alt" id="services">
      <div className="wrap">
        <SectionHead eyebrow={t.services.eyebrow} title={t.services.title} lead={t.services.lead} />
        <div className="services-grid">
          {t.services.items.map((it, i) => (
            <article key={it.title} className="svc">
              <span className="svc-icon"><Icon name={SERVICE_ICONS[i]} size={22} /></span>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  const { t } = useI18n();
  return (
    <section className="section" id="projects">
      <div className="wrap">
        <SectionHead eyebrow={t.projects.eyebrow} title={t.projects.title} lead={t.projects.lead} />
        <div className="projects-grid">
          {t.projects.items.map((it) => (
            <article key={it.title} className="prj">
              <h3>{it.title}</h3>
              <p>{it.text}</p>
              <ul className="tags">{it.tags.map((g) => <li key={g}>{g}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Compare() {
  const { t } = useI18n();
  const c = t.compare;
  return (
    <section className="section section-alt" id="compare">
      <div className="wrap">
        <SectionHead eyebrow={c.eyebrow} title={c.title} />
        <div className="table-scroll">
          <table className="compare">
            <thead>
              <tr><th scope="col"><span className="sr">—</span></th><th scope="col">{c.colIn}</th><th scope="col" className="me">{c.colMe}</th></tr>
            </thead>
            <tbody>
              {c.rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  <td><span className="x" aria-hidden="true"><Icon name="minus" size={16} /></span>{r.a}</td>
                  <td className="me"><span className="v" aria-hidden="true"><Icon name="check" size={16} /></span>{r.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const { t } = useI18n();
  return (
    <section className="section" id="process">
      <div className="wrap">
        <SectionHead eyebrow={t.process.eyebrow} title={t.process.title} />
        <ol className="steps">
          {t.process.steps.map((s, i) => (
            <li key={s.title}>
              <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const CERTS = ['CCNA Routing & Switching', 'MikroTik MTCNA', 'MikroTik MTCRE', 'MikroTik MTCWE', 'AWS Essentials for Administrators', 'TeleOptics Fujikura', 'Introduction to Cybersecurity'];
const STACK = ['MikroTik', 'Cisco', 'FortiGate', 'Proxmox VE', 'VMware vSphere', 'Hyper-V', 'Windows Server', 'Linux', 'Active Directory', 'Entra ID', 'Microsoft 365', 'Azure', 'AWS', 'Zabbix', 'Grafana', 'Docker', 'MSSQL', 'PostgreSQL', 'Comarch Optima', 'enova', 'ABONA ERP', 'Bitrix24', 'Synology', 'QNAP', 'Snipe-IT', 'n8n', 'PowerShell', 'Python'];

export function About() {
  const { t } = useI18n();
  const a = t.about;
  return (
    <section className="section section-alt" id="about">
      <div className="wrap about-grid">
        <div className="about-side">
          <dl className="facts">
            {a.facts.map((x) => (
              <div key={x.v}><dt className="tabnum">{x.k}</dt><dd>{x.v}</dd></div>
            ))}
          </dl>
          <a className="li-link" href={CONTACTS.linkedin} target="_blank" rel="noopener noreferrer">
            <Icon name="linkedin" size={18} />LinkedIn
          </a>
        </div>
        <div className="about-main">
          <SectionHead eyebrow={a.eyebrow} title={a.title} />
          <div className="prose">
            {a.paragraphs.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
          </div>
          <p className="langs-line">{a.langsLabel}</p>
          <h3 className="mini-h">{a.certsLabel}</h3>
          <ul className="chips chips-cert">{CERTS.map((c) => <li key={c}>{c}</li>)}</ul>
          <h3 className="mini-h">{a.stackLabel}</h3>
          <ul className="chips">{STACK.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="faq">
      <div className="wrap faq-grid">
        <SectionHead eyebrow={t.faq.eyebrow} title={t.faq.title} />
        <div className="faq-list">
          {t.faq.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <h3>
                  <button type="button" id={`faq-q-${i}`} aria-expanded={isOpen} aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span>{it.q}</span>
                    <Icon name={isOpen ? 'minus' : 'plus'} size={18} />
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={!isOpen}>
                  <p>{it.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
