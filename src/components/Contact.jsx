import { useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { CONTACTS, FORM_ENDPOINT, PRICING } from '../config.js';
import { SectionHead } from './Sections.jsx';
import Icon from './Icon.jsx';

function CopyButton({ text, label, done }) {
  const [ok, setOk] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setOk(true);
      setTimeout(() => setOk(false), 1600);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); setOk(true); setTimeout(() => setOk(false), 1600); } catch (_) { /* ignore */ }
      ta.remove();
    }
  };
  return (
    <button type="button" className="copy-btn" onClick={copy} aria-label={`${label}: ${text}`}>
      <Icon name={ok ? 'check' : 'copy'} size={15} />{ok ? done : label}
    </button>
  );
}

export default function Contact() {
  const { t, f, lang } = useI18n();
  const c = t.contact;
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '', consent: false });
  const [state, setState] = useState('idle'); // idle | sending | sent | fallback | error
  const [err, setErr] = useState('');

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const composed = [
    `${c.name}: ${form.name}`,
    form.company ? `${c.company}: ${form.company}` : null,
    `${c.email}: ${form.email}`,
    form.phone ? `${c.phone}: ${form.phone}` : null,
    '',
    form.message,
  ].filter((x) => x !== null).join('\n');

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim() || !form.consent) {
      setErr(c.required);
      return;
    }
    setErr('');
    if (!FORM_ENDPOINT) { setState('fallback'); return; }
    setState('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang, source: 'website' }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('sent');
    } catch (e2) {
      setState('error');
    }
  };

  return (
    <section className="section section-contact" id="contact">
      <div className="wrap contact-grid">
        <div className="contact-info">
          <SectionHead eyebrow={c.eyebrow} title={c.title} lead={f(c.lead, { h: PRICING.responseHours })} />
          <h3 className="mini-h">{c.direct}</h3>
          <ul className="direct">
            <li>
              <Icon name="phone" />
              <a href={`tel:${CONTACTS.phoneHref}`} className="sel">{CONTACTS.phone}</a>
              <CopyButton text={CONTACTS.phone} label={c.copy} done={c.copied} />
            </li>
            <li>
              <Icon name="mail" />
              <a href={`mailto:${CONTACTS.email}`} className="sel">{CONTACTS.email}</a>
              <CopyButton text={CONTACTS.email} label={c.copy} done={c.copied} />
            </li>
            <li><Icon name="clock" /><span>{c.hours}</span></li>
            <li><Icon name="pin" /><span>{c.area}</span></li>
          </ul>
          <div className="messengers">
            <a className="btn btn-primary" href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" />WhatsApp</a>
            {CONTACTS.telegram && (
              <a className="btn btn-ghost" href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer"><Icon name="send" />Telegram</a>
            )}
          </div>
        </div>

        <div className="contact-card">
          {state === 'sent' ? (
            <div className="form-done" role="status"><Icon name="check" size={28} /><p>{c.success}</p></div>
          ) : state === 'fallback' || state === 'error' ? (
            <div className="form-fallback" role="status">
              <h3>{state === 'error' ? c.error : c.fallbackTitle}</h3>
              {state === 'fallback' && <p>{c.fallbackText}</p>}
              <pre className="composed">{composed}</pre>
              <div className="fallback-actions">
                <CopyButton text={composed} label={c.copy} done={c.copied} />
                <span className="sel">{CONTACTS.email}</span>
              </div>
              <button type="button" className="link-btn" onClick={() => setState('idle')}>←</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="cf-name">{c.name} *</label>
                  <input id="cf-name" autoComplete="name" value={form.name} onChange={set('name')} />
                </div>
                <div className="field">
                  <label htmlFor="cf-company">{c.company}</label>
                  <input id="cf-company" autoComplete="organization" value={form.company} onChange={set('company')} />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="cf-email">{c.email} *</label>
                  <input id="cf-email" type="email" autoComplete="email" value={form.email} onChange={set('email')} />
                </div>
                <div className="field">
                  <label htmlFor="cf-phone">{c.phone}</label>
                  <input id="cf-phone" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} />
                </div>
              </div>
              <div className="field">
                <label htmlFor="cf-message">{c.message} *</label>
                <textarea id="cf-message" rows="5" placeholder={c.messagePh} value={form.message} onChange={set('message')} />
              </div>
              <label className="consent" htmlFor="cf-consent">
                <input id="cf-consent" type="checkbox" checked={form.consent} onChange={set('consent')} />
                <span>{c.consent}</span>
              </label>
              {err && <p className="form-err" role="alert">{err}</p>}
              <button type="submit" className="btn btn-primary btn-block" disabled={state === 'sending'}>
                <Icon name="send" size={18} />{state === 'sending' ? c.sending : c.send}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
