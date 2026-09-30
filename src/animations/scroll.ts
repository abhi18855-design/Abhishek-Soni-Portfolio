import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };
export function startSmoothScroll() {
  const lenis = new Lenis({ duration: 0.95, smoothWheel: true, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  return () => { gsap.ticker.remove(tick); lenis.destroy(); };
}
