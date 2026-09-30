import { siteConfig } from '../data/siteConfig';
import { useEffect, useState } from 'react';
export function Loader() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let active = true;
    // Real readiness signal: font layout. No invented progress percentage or timed delay.
    Promise.resolve(document.fonts?.ready).then(() => requestAnimationFrame(() => { if (active) setReady(true); }));
    return () => { active = false; };
  }, []);
  return ready ? null : <div className="loader" role="status"><strong>{siteConfig.name.toUpperCase()}</strong><span>{siteConfig.title.toUpperCase()}</span><small>INITIALIZING VISUAL SYSTEM…</small></div>;
}
