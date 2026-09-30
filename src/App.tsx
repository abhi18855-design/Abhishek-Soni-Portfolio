import { lazy, Suspense, useEffect, useLayoutEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useMagnetic } from './hooks/useMagnetic';
import { Navigation } from './components/Navigation';
import { CustomCursor } from './components/CustomCursor';
import { Loader } from './components/Loader';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { About } from './components/About';
import { Contact, Footer } from './components/Contact';
import { gsap, startSmoothScroll, ScrollTrigger } from './animations/scroll';
import { useMediaQuery, useReducedMotion } from './hooks/useMediaQuery';
import { projects } from './data/projects';
import { siteConfig } from './data/siteConfig';
const ProjectDetail = lazy(() => import('./components/ProjectDetail'));
function Home() { return <main id="main"><Hero /><Projects /><Services /><Process /><About /><Contact /></main>; }
export default function App() {
  useMagnetic();
  const location = useLocation(); const reduced = useReducedMotion(); const desktop = useMediaQuery('(min-width: 1024px) and (pointer: fine)'); const root = useRef<HTMLDivElement>(null);
  useEffect(() => { document.documentElement.style.setProperty('--accent', siteConfig.accent); document.documentElement.style.setProperty('--accent-contrast', siteConfig.accentContrast); }, []);
  useEffect(() => { if (!reduced && desktop) return startSmoothScroll(); }, [reduced, desktop]);
  useLayoutEffect(() => {
    const title = projects.find(p => location.pathname === `/project/${p.slug}`);
    document.title = title ? `${title.title} — ${siteConfig.name}` : siteConfig.seo.title;
    const ctx = gsap.context(() => { if (!reduced && !location.hash) gsap.fromTo('.route-content', { opacity: 0, y: 24, clipPath: 'inset(5% 0 0 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.65, ease: 'power3.out' }); }, root);
    const timer = window.setTimeout(() => {
      if (location.hash) { const target = document.getElementById(location.hash.slice(1)); if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 90, behavior: 'instant' }); }
      else window.scrollTo({ top: 0, behavior: 'instant' });
      const main = document.getElementById('main'); if (main && location.pathname !== '/') { main.setAttribute('tabindex', '-1'); main.focus({ preventScroll: true }); }
      ScrollTrigger.refresh();
    }, 80);
    return () => { ctx.revert(); clearTimeout(timer); };
  }, [location.pathname, location.hash, location.key, reduced]);
  return <div ref={root}><a href="#main" className="skip-link" onClick={e => { e.preventDefault(); const main = document.getElementById('main'); main?.setAttribute('tabindex', '-1'); main?.focus(); }}>Skip to content</a><Loader /><Navigation /><CustomCursor /><div className="route-content"><Suspense fallback={<div className="route-loading" role="status">OPENING THE NEXT FRAME…</div>}><Routes><Route path="/" element={<Home />} /><Route path="/project/:slug" element={<ProjectDetail key={location.pathname} />} /><Route path="*" element={<ProjectDetail />} /></Routes></Suspense></div><Footer /></div>;
}
