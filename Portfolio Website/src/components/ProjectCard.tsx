import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { Media } from './Media';
import { asset, number } from '../utils/helpers';
import { useMediaQuery, useReducedMotion } from '../hooks/useMediaQuery';
import { gsap } from '../animations/scroll';
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const card = useRef<HTMLElement>(null); const video = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false); const [failed, setFailed] = useState(false);
  const reduced = useReducedMotion(); const fine = useMediaQuery('(hover: hover) and (pointer: fine)');
  const preview = project.preview || project.video;
  const reset = () => { gsap.to(card.current, { rotateX: 0, rotateY: 0, duration: 0.6, overwrite: true }); const image = card.current?.querySelector('img'); if (image) gsap.to(image, { x: 0, y: 0, duration: 0.6, overwrite: true }); video.current?.pause(); };
  return <article ref={card} className="project-card" onPointerEnter={() => { if (fine && !reduced && preview) { setLoaded(true); video.current?.play().catch(() => {}); } }} onPointerLeave={reset} onPointerMove={e => {
    if (!fine || reduced) return;
    const r = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card.current, { rotateY: x * 3, rotateX: -y * 3, duration: 0.6, overwrite: true });
    const image = card.current?.querySelector('img'); if (image) gsap.to(image, { x: -x * 7, y: -y * 7, duration: 0.6, overwrite: true });
  }}>
    <div className="card-top mono"><span>{number(index + 1)} / {project.category}</span><span>{project.year}</span></div>
    <Link className="card-image" to={`/project/${project.slug}`} data-cursor="VIEW" aria-label={`View ${project.title} — ${project.subtitle}`} draggable={false}>
      <Media src={project.thumbnail} srcSet={project.thumbnailSmall ? `${asset(project.thumbnailSmall)} 640w, ${asset(project.thumbnail)} 1400w` : undefined} sizes="(max-width: 640px) 90vw, (max-width: 1000px) 46vw, 30vw" alt={`${project.title} — ${project.subtitle}, concept artwork`} loading="lazy" draggable={false} />
      {loaded && !failed && preview && <video ref={video} className="card-video" src={asset(preview)} muted loop playsInline autoPlay preload="none" poster={asset(project.thumbnail)} onError={() => setFailed(true)} />}
      {project.demo && <span className="demo-tag">DEMO PROJECT</span>}<span className="card-open" aria-hidden="true">↗</span><span className="card-film mono" aria-hidden="true">VISUAL STUDY / {number(index + 1)}</span>
    </Link>
    <div className="card-title"><h3><Link to={`/project/${project.slug}`}>{project.title}</Link></h3><span>↗</span></div><p className="card-subtitle">{project.subtitle}</p>
    <p className="card-description">{project.description}</p><div className="card-tools mono">{project.tools.join(' / ')}</div>
    <Link className="view-project magnetic" to={`/project/${project.slug}`} data-cursor="VIEW">VIEW PROJECT <span>↗</span></Link>
  </article>;
}
