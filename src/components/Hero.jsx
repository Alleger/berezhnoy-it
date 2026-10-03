import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { CONTACTS, PRICING } from '../config.js';
import Icon from './Icon.jsx';

// Задержка до шлюза: случайное блуждание, чтобы панель «жила»
function useLatency(n = 32) {
  const [pts, setPts] = useState(() => {
    const a = []; let v = 4;
    for (let i = 0; i < n; i++) { v = Math.max(2, Math.min(9, v + (Math.random() - 0.5) * 1.6)); a.push(v); }
    return a;
  });
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      setPts((p) => {
        const last = p[p.length - 1];
        const v = Math.max(2, Math.min(9, last + (Math.random() - 0.5) * 1.6));
        return [...p.slice(1), v];
      });
    }, 1500);
    return () => clearInterval(id);
  }, []);
  return pts;
}

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function StatusPanel() {
  const { t } = useI18n();
  const pts = useLatency();
  const now = useClock();
  const w = 280, h = 56, max = 10;
  const step = w / (pts.length - 1);
  const line = pts.map((v, i) => `${(i * step).toFixed(1)},${(h - (v / max) * h).toFixed(1)}`).join(' ');
  const last = pts[pts.length - 1];
  const warnIdx = 5; // «Обновления» — жёлтый статус

  return (
    <aside className="noc" aria-label={t.status.title}>
      <div className="noc-head">
        <span className="noc-title">{t.status.title}</span>
        <span className="noc-sample">{t.status.sample}</span>
      </div>
      <ul className="noc-list">
        {t.status.items.map((it, i) => (
          <li key={it.label} className={i === warnIdx ? 'warn' : 'ok'}>
            <span className="led" aria-hidden="true" />
            <span className="noc-label">{it.label}</span>
            <span className="noc-val">{it.value}</span>
          </li>
        ))}
      </ul>
      <div className="noc-chart">
        <div className="noc-chart-head">
          <span>ping gw-01</span>
          <span className="tabnum">{last.toFixed(1)} ms</span>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" role="img" aria-label="latency">
          <line x1="0" x2={w} y1={h / 2} y2={h / 2} className="grid" />
          <polygon points={`0,${h} ${line} ${w},${h}`} className="area" />
          <polyline points={line} className="stroke" />
          <circle cx={w} cy={h - (last / max) * h} r="3" className="dot" />
        </svg>
      </div>
      <div className="noc-foot">
        <span className="live"><span className="led pulse" aria-hidden="true" />{t.status.live}</span>
        <span className="tabnum">{t.status.footer} {now.toLocaleTimeString('pl-PL')}</span>
      </div>
    </aside>
  );
}

export default function Hero() {
  const { t, f } = useI18n();
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="tag-dot" />{t.hero.eyebrow}</p>
          <h1>
            {t.hero.title}
            <span className="accent">{t.hero.titleAccent}</span>
          </h1>
          <p className="lead">{t.hero.lead}</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" />{t.hero.ctaPrimary}
            </a>
            <a className="btn btn-ghost" href="#pricing">{t.hero.ctaSecondary}<Icon name="arrow" size={18} /></a>
          </div>
          <p className="hero-note">{f(t.hero.note, { h: PRICING.responseHours })}</p>
        </div>
        <StatusPanel />
      </div>
    </section>
  );
}
