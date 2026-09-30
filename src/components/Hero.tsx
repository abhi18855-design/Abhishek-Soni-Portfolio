import { siteConfig } from '../data/siteConfig';
import { useLayoutEffect, useRef } from 'react';
import { HeroScene } from './HeroScene';
import { MagneticButton } from './MagneticButton';
import { useReducedMotion, useMediaQuery } from '../hooks/useMediaQuery';
import { gsap } from '../animations/scroll';
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const reduced = useReducedMotion();
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)');
  useLayoutEffect(() => {
    if (reduced) { progress.current = 0; return; }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1, onUpdate: self => { progress.current = self.progress; } } });
      tl.to('.hero-name', { y: -65, x: -20, letterSpacing: '-0.035em', ease: 'none' }, 0).to('.hero-scene', { y: 80, ease: 'none' }, 0).to('.hero-meta', { y: -30, opacity: 0.25, ease: 'none' }, 0);
    }, root);
    return () => ctx.revert();
  }, [reduced]);
  return <section className="hero" ref={root} onPointerMove={e => {
    if (!fine || reduced) return;
    const r = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to('.hero-name-inner', { x: x * 10, y: y * 8, duration: 0.8, overwrite: true });
    gsap.to('.hero-grid', { x: -x * 12, y: -y * 10, duration: 1, overwrite: true });
    const focus = root.current?.querySelector('[data-focus]'); if (focus) focus.textContent = `${Math.round(78 + x * 12)}%`;
  }} onPointerLeave={() => { gsap.to('.hero-name-inner,.hero-grid', { x: 0, y: 0, duration: 0.8, overwrite: true }); }}>
    <div className="hero-grid" aria-hidden="true" />
    <div className="hero-top mono"><span><i className="rec-dot" /> INDEPENDENT VISION. INFINITE POSSIBILITIES.</span><span>SCENE 01 / INTRODUCTION</span></div>
    <div className="hero-name"><div className="hero-name-inner"><h1>{siteConfig.name.split(' ')[0].toUpperCase()}<br /><span>{siteConfig.name.split(' ').slice(1).join(' ').toUpperCase()}<span className="name-star" aria-hidden="true">✳</span></span></h1></div></div>
    <HeroScene progress={progress} />
    <div className="object-label mono" aria-hidden="true"><span>OPTICAL STUDY — 001</span><span>50MM / FOCUS <b data-focus>78%</b></span><span className="object-rule" /></div>
    <div className="hero-bottom"><div><p className="eyebrow">{siteConfig.title.toUpperCase()}</p><p className="hero-description">AI advertisements.<br />Films. Visual experiences.</p></div><div className="hero-note"><p>Human imagination.<br />Artificial intelligence.<br /><em>Extraordinary possibilities.</em></p><MagneticButton href="#/#work" className="button dark">EXPLORE WORK <span>↘</span></MagneticButton></div></div>
    <div className="hero-meta mono"><span>CINEMA × AI × ADVERTISING</span><span>SCROLL TO EXPLORE ↓</span><span>FRAME 001 — 024</span></div>
  </section>;
}
