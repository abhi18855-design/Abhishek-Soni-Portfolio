import { useState } from 'react';
import { services } from '../data/services';
import { number } from '../utils/helpers';
export function Services() {
  const [active, setActive] = useState<number | null>(0);
  return <section id="services" className="section services"><div className="section-kicker mono"><span>02 / CAPABILITIES</span><span>FROM THOUGHT TO FRAME</span></div><div className="services-layout"><div className="services-intro"><h2>What<br />I <em>do.</em></h2><p>A producer’s perspective.<br />A filmmaker’s eye.<br />A new set of possibilities.</p><span className="large-asterisk" aria-hidden="true">✳</span></div><div className="service-list">{services.map(([title, description], i) => <div className={`service ${active === i ? 'active' : ''}`} key={title} onPointerEnter={e => { if (e.pointerType === 'mouse') setActive(i); }}><h3><button aria-expanded={active === i} aria-controls={`service-${i}`} onClick={() => setActive(active === i ? null : i)}><span className="mono">{number(i + 1)}</span>{title}<span>{active === i ? '−' : '+'}</span></button></h3><div id={`service-${i}`} className="service-description" hidden={active !== i}><p>{description}</p></div></div>)}</div></div></section>;
}
