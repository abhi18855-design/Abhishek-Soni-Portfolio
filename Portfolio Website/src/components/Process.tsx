import { useLayoutEffect, useRef, useState } from 'react';
import { process } from '../data/services';
import { gsap } from '../animations/scroll';
import { useReducedMotion } from '../hooks/useMediaQuery';
import { number } from '../utils/helpers';
export function Process() {
  const root = useRef<HTMLElement>(null); const [active, setActive] = useState(0); const reduced = useReducedMotion();
  useLayoutEffect(() => { if (reduced) return; const ctx = gsap.context(() => { gsap.to('.process-progress', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 45%', scrub: true, onUpdate: self => setActive(Math.min(4, Math.floor(self.progress * 5))) } }); }, root); return () => ctx.revert(); }, [reduced]);
  return <section className="section process" ref={root}><div className="section-kicker mono"><span>03 / THE PROCESS</span><span>INTENTION IN EVERY FRAME</span></div><div className="section-heading"><h2>From a spark.<br /><em>To the screen.</em></h2><p>Technology is the medium.<br />The story is always the starting point.</p></div><div className="process-line" aria-hidden="true"><div className="process-progress" /></div><div className="process-steps">{process.map(([title, subtitle, description], i) => <article className={i <= active || reduced ? 'active' : ''} key={title}><span className="step-number mono">{number(i + 1)}</span><h3>{title}</h3><strong>{subtitle}</strong><p>{description}</p></article>)}</div></section>;
}
