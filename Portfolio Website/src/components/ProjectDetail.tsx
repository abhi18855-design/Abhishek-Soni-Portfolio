import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import { Media } from './Media';
import { asset, number } from '../utils/helpers';
import { MagneticButton } from './MagneticButton';
export default function ProjectDetail() {
  const { slug } = useParams(); const index = projects.findIndex(p => p.slug === slug); const project = projects[index];
  const [videoError, setVideoError] = useState(false);
  if (!project) return <main id="main" className="not-found"><p className="mono">FRAME NOT FOUND / 404</p><h1>This story<br />isn’t here.</h1><Link className="button dark" to="/#work">RETURN TO WORK ↗</Link></main>;
  const next = projects[(index + 1) % projects.length]; const previous = projects[(index + projects.length - 1) % projects.length];
  return <main id="main" className="detail"><div className="detail-heading section"><Link to="/#work" className="back-link mono">← SELECTED WORK</Link><div className="section-kicker mono"><span>{number(index + 1)} / {project.category}</span><span>{project.year} {project.demo && ' / DEMO PROJECT'}</span></div><h1>{project.title}<br /><em>{project.subtitle}</em></h1></div>
    <div className="detail-hero"><Media src={project.hero || project.thumbnail} alt={`${project.title}: ${project.subtitle}`} fetchPriority="high" /></div>
    <section className="section detail-summary"><div><p className="eyebrow">THE IDEA</p><h2>{project.subtitle}.</h2><p className="detail-description">{project.description}</p>{project.demo && <p className="demo-disclosure">DEMO PROJECT — Independent concept imagery. No client collaboration or completed film is claimed.</p>}</div><dl><div><dt>CATEGORY</dt><dd>{project.category}</dd></div>{project.client && <div><dt>CLIENT</dt><dd>{project.client}</dd></div>}{project.role && <div><dt>ROLE</dt><dd>{project.role}</dd></div>}<div><dt>TOOLS / PRACTICE</dt><dd>{project.tools.join(' · ')}</dd></div><div><dt>YEAR</dt><dd>{project.year}</dd></div></dl></section>
    {project.video && <section className="section detail-video"><h2>The film.</h2>{videoError ? <p role="status">This film is currently unavailable. The visual concept is shown above.</p> : <video controls playsInline preload="none" poster={asset(project.hero || project.thumbnail)} src={asset(project.video)} data-cursor="PLAY" onError={() => setVideoError(true)}>{project.captions && <track default kind="captions" src={asset(project.captions)} srcLang="en" label="English" />}</video>}</section>}
    {!!project.gallery?.length && <section className="section gallery" aria-label="Project gallery">{project.gallery.map(image => <Media key={image.src} src={image.src} alt={image.alt} loading="lazy" />)}</section>}
    <section className="section detail-process"><p className="eyebrow">BEHIND THE CONCEPT</p>{project.process.map((step, i) => <article key={step.title}><span className="mono">{number(i + 1)}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</section>
    {project.projectUrl && <div className="section"><MagneticButton className="button dark" href={project.projectUrl} target="_blank" rel="noopener noreferrer">VISIT PROJECT ↗</MagneticButton></div>}
    <nav className="section project-pagination" aria-label="Project navigation"><Link to={`/project/${previous.slug}`}>← PREVIOUS PROJECT<span>{previous.title}</span></Link><MagneticButton href={`#/project/${next.slug}`} className="next-project">NEXT PROJECT ↗<span>{next.title}</span></MagneticButton></nav>
  </main>;
}
