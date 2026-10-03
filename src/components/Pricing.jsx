import { useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { PRICING } from '../config.js';
import { SectionHead } from './Sections.jsx';
import Icon from './Icon.jsx';

const ADDONS = ['monitoring', 'erp', 'cctv'];

export default function Pricing() {
  const { t, f, num } = useI18n();
  const p = t.pricing;
  const [users, setUsers] = useState(10);
  const [servers, setServers] = useState(1);
  const [addons, setAddons] = useState({ monitoring: true, erp: false, cctv: false });

  const billedUsers = Math.max(users, PRICING.minUsers);
  const net = billedUsers * PRICING.perUser
    + servers * PRICING.perServer
    + ADDONS.reduce((s, k) => s + (addons[k] ? PRICING[k] : 0), 0);
  const gross = net * (1 + PRICING.vat);

  return (
    <section className="section" id="pricing">
      <div className="wrap">
        <SectionHead eyebrow={p.eyebrow} title={p.title} lead={p.lead} />
        <div className="calc">
          <div className="calc-inputs">
            <div className="field-range">
              <div className="range-head">
                <label htmlFor="calc-users">{p.users}</label>
                <output htmlFor="calc-users" className="range-val tabnum">{users}</output>
              </div>
              <input id="calc-users" type="range" min="1" max="100" value={users}
                onChange={(e) => setUsers(Number(e.target.value))} />
              <div className="range-meta">
                <span>{f(p.perUser, { price: num(PRICING.perUser) })}</span>
                <span>{f(p.min, { n: PRICING.minUsers })}</span>
              </div>
            </div>

            <div className="stepper-row">
              <div>
                <span className="stepper-label" id="calc-servers-label">{p.servers}</span>
                <span className="stepper-hint">{f(p.serversHint, { price: num(PRICING.perServer) })}</span>
              </div>
              <div className="stepper" role="group" aria-labelledby="calc-servers-label">
                <button type="button" aria-label="−" onClick={() => setServers(Math.max(0, servers - 1))}><Icon name="minus" size={16} /></button>
                <span className="tabnum" aria-live="polite">{servers}</span>
                <button type="button" aria-label="+" onClick={() => setServers(Math.min(10, servers + 1))}><Icon name="plus" size={16} /></button>
              </div>
            </div>

            <fieldset className="addons">
              <legend>{p.addonsTitle}</legend>
              {ADDONS.map((k) => (
                <label key={k} className={`addon ${addons[k] ? 'on' : ''}`} htmlFor={`addon-${k}`}>
                  <input id={`addon-${k}`} type="checkbox" checked={addons[k]}
                    onChange={() => setAddons({ ...addons, [k]: !addons[k] })} />
                  <span className="box" aria-hidden="true"><Icon name="check" size={14} /></span>
                  <span className="addon-text">
                    <span className="addon-label">{p.addons[k].label}</span>
                    <span className="addon-hint">{p.addons[k].hint}</span>
                  </span>
                  <span className="addon-price tabnum">+{num(PRICING[k])} zł</span>
                </label>
              ))}
            </fieldset>
          </div>

          <div className="calc-result">
            <span className="res-label">{p.monthly}</span>
            <div className="res-net"><span className="tabnum">{num(net)}</span> zł <small>{p.net}</small></div>
            <div className="res-gross tabnum">{num(gross)} zł {p.gross}</div>
            <ul className="res-incl">
              {p.included.map((x) => (
                <li key={x}><Icon name="check" size={16} />{f(x, { h: PRICING.responseHours })}</li>
              ))}
            </ul>
            <p className="res-note">{f(p.onsite, { price: num(PRICING.onsiteHour) })}</p>
            <p className="res-note muted">{p.notIncluded}</p>
            <a className="btn btn-primary btn-block" href="#contact">{p.cta}<Icon name="arrow" size={18} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
