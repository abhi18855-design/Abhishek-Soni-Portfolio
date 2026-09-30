import { useEffect } from 'react';
import { gsap } from '../animations/scroll';
import { useMediaQuery, useReducedMotion } from './useMediaQuery';
/** One delegated listener covers both router links and standard anchor CTAs. */
export function useMagnetic() {
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)'); const reduced = useReducedMotion();
  useEffect(() => {
    if (!fine || reduced) return;
    let active: HTMLElement | null = null;
    const reset = () => { if (active) gsap.to(active, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)', overwrite: true }); active = null; };
    const move = (e: PointerEvent) => { const target = (e.target as HTMLElement).closest<HTMLElement>('.magnetic'); if (target !== active) reset(); if (!target) return; active = target; const rect = target.getBoundingClientRect(); gsap.to(target, { x: Math.max(-10, Math.min(10, (e.clientX - rect.left - rect.width / 2) * 0.12)), y: Math.max(-8, Math.min(8, (e.clientY - rect.top - rect.height / 2) * 0.16)), duration: 0.4, overwrite: true }); };
    window.addEventListener('pointermove', move); document.addEventListener('mouseleave', reset);
    return () => { if (active) { gsap.killTweensOf(active); gsap.set(active, { x: 0, y: 0 }); } window.removeEventListener('pointermove', move); document.removeEventListener('mouseleave', reset); };
  }, [fine, reduced]);
}
