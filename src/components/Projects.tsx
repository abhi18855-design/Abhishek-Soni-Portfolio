import { useRef, useState, useEffect } from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { gsap } from '../animations/scroll';
import { number } from '../utils/helpers';
import { useReducedMotion } from '../hooks/useMediaQuery';
export function Projects() {
  const track = useRef<HTMLDivElement>(null); const indexButton = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(0); const [indexOpen, setIndexOpen] = useState(false);
  const programmed = useRef(false);
  const reduced = useReducedMotion(); const drag = useRef({ x: 0, scroll: 0, down: false, moved: false });
  function go(index: number) {
    const target = ((index % projects.length) + projects.length) % projects.length;
    const el = track.current?.children[target] as HTMLElement | undefined;
    if (!el || !track.current) return;
    programmed.current = true;
    track.current.style.scrollSnapType = "none";
    const left = Math.min(el.offsetLeft, track.current.scrollWidth - track.current.clientWidth);
    gsap.to(track.current, { scrollLeft: left, duration: reduced ? 0 : 0.65, ease: 'power3.inOut', overwrite: true, onComplete: () => { if (track.current) track.current.style.scrollSnapType = ""; } });
    setActive(target);
  }
  useEffect(() => () => { if (track.current) gsap.killTweensOf(track.current); }, []);
  useEffect(() => { if (indexOpen) document.getElementById('project-index')?.querySelector('button')?.focus(); }, [indexOpen]);
  if (!projects.length) return <section id="work" className="section"><h2>Selected work</h2><p>New work is in development. Check back soon.</p></section>;
  return <section id="work" className="section projects"><div className="section-kicker mono"><span>01 / SELECTED WORK</span><span>IDEAS MADE VISIBLE</span></div>
    <div className="section-heading"><h2>Selected <em>work.</em></h2><p>A few worlds I’ve imagined.<br />A few stories waiting to move.</p></div>
    <div className="project-toolbar"><span className="mono">CONCEPTS & VISUAL EXPLORATIONS</span><button ref={indexButton} aria-expanded={indexOpen} aria-controls="project-index" onClick={() => setIndexOpen(!indexOpen)}>PROJECT INDEX {indexOpen ? '↑' : '↓'}</button></div>
    {indexOpen && <div id="project-index" className="project-index" onKeyDown={e => { if (e.key === 'Escape') { setIndexOpen(false); indexButton.current?.focus(); } }}>{projects.map((p, i) => <button key={p.id} aria-current={active === i ? 'true' : undefined} onClick={() => { go(i); setIndexOpen(false); track.current?.focus({ preventScroll: true }); }}><span>{number(i + 1)}</span>{p.title} — {p.subtitle}<span>↗</span></button>)}</div>}
    <div className="project-track" ref={track} tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Selected projects. Use left and right arrow keys to browse." data-cursor="DRAG" onWheel={() => { programmed.current = false; if (track.current) gsap.killTweensOf(track.current); }} onKeyDown={e => { if (e.target !== e.currentTarget) return; if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); go(active + (e.key === 'ArrowRight' ? 1 : -1)); } }} onScroll={() => { const el = track.current; if (!el || programmed.current) return; const width = (el.children[0] as HTMLElement)?.offsetWidth || 1; const gap = parseFloat(getComputedStyle(el).gap) || 0; setActive(Math.min(projects.length - 1, Math.round(el.scrollLeft / (width + gap)))); }} onPointerDown={e => { programmed.current = false; gsap.killTweensOf(e.currentTarget); if (e.pointerType !== 'mouse') return; drag.current = { down: true, moved: false, x: e.clientX, scroll: e.currentTarget.scrollLeft }; }} onPointerMove={e => { if (!drag.current.down) return; const delta = e.clientX - drag.current.x; if (Math.abs(delta) > 6) { drag.current.moved = true; e.currentTarget.setPointerCapture(e.pointerId); e.currentTarget.style.scrollSnapType = 'none'; e.currentTarget.scrollLeft = drag.current.scroll - delta; } }} onPointerUp={e => { drag.current.down = false; e.currentTarget.style.scrollSnapType = ''; if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId); }} onPointerCancel={() => { drag.current.down = false; if (track.current) track.current.style.scrollSnapType = ''; }} onPointerLeave={() => { drag.current.down = false; }} onClickCapture={e => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; } }}>
      {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
    </div>
    <div className="carousel-controls"><button onClick={() => go(active - 1)} aria-label="Previous project">← <span>PREVIOUS</span></button><span className="mono" aria-live="polite">{number(active + 1)} <span className="muted">— {number(projects.length)}</span></span><button onClick={() => go(active + 1)} aria-label="Next project"><span>NEXT</span> →</button></div>
  </section>;
}
