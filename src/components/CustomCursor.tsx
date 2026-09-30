import { useEffect, useRef } from 'react';
import { useMediaQuery, useReducedMotion } from '../hooks/useMediaQuery';
export function CustomCursor() {
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!fine || reduced) return;
    let frame = 0, x = -100, y = -100, tx = -100, ty = -100;
    const cursor = ref.current!;
    const move = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      const target = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor],a,button,video');
      const label = target?.dataset.cursor || (target ? 'OPEN' : '');
      cursor.textContent = label; cursor.dataset.active = String(!!label); cursor.style.opacity = '1';
    };
    const down = () => { if (cursor.textContent === 'DRAG') cursor.dataset.dragging = 'true'; };
    const up = () => { cursor.dataset.dragging = 'false'; };
    const hide = () => { cursor.style.opacity = '0'; };
    const tick = () => { x += (tx - x) * 0.23; y += (ty - y) * 0.23; cursor.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`; frame = requestAnimationFrame(tick); };
    document.documentElement.classList.add('custom-pointer');
    window.addEventListener('pointermove', move); window.addEventListener('pointerdown', down); window.addEventListener('pointerup', up); document.addEventListener('mouseleave', hide); tick();
    return () => { cancelAnimationFrame(frame); document.documentElement.classList.remove('custom-pointer'); window.removeEventListener('pointermove', move); window.removeEventListener('pointerdown', down); window.removeEventListener('pointerup', up); document.removeEventListener('mouseleave', hide); };
  }, [fine, reduced]);
  return fine && !reduced ? <div ref={ref} className="custom-cursor" aria-hidden="true" /> : null;
}
