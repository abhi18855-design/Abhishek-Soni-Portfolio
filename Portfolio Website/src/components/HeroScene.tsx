import { Component, lazy, Suspense, useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useMediaQuery, useReducedMotion } from '../hooks/useMediaQuery';
import { asset } from '../utils/helpers';
const Scene = lazy(() => import('../three/Scene'));
function Still() { return <img className="aperture-still" src={asset('images/ui/aperture.webp')} alt="Sculptural optical aperture" />; }
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <Still /> : this.props.children; }
}
export function HeroScene({ progress }: { progress: React.RefObject<number> }) {
  const small = useMediaQuery('(max-width: 767px)');
  const reduced = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  useEffect(() => {
    let inView = true;
    const update = () => setActive(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); });
    if (host.current) observer.observe(host.current);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, []);
  return <div ref={host} className="hero-scene" aria-hidden="true">{small || reduced || failed ? <Still /> : <SceneBoundary><Suspense fallback={<Still />}><Scene active={active} progress={progress} onFailure={() => setFailed(true)} /></Suspense></SceneBoundary>}</div>;
}
