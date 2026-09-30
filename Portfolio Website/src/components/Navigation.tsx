import { siteConfig } from '../data/siteConfig';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
const links = ['Work', 'Services', 'About', 'Contact'];
export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => { const update = () => setScrolled(window.scrollY > 30); update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update); }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menu.current?.querySelector('a')?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
      if (e.key === 'Tab') {
        const items = [toggle.current!, ...Array.from(menu.current!.querySelectorAll<HTMLAnchorElement>('a'))];
        const index = items.indexOf(document.activeElement as HTMLButtonElement & HTMLAnchorElement);
        if (e.shiftKey && index <= 0) { e.preventDefault(); items.at(-1)?.focus(); }
        if (!e.shiftKey && index === items.length - 1) { e.preventDefault(); items[0].focus(); }
      }
    };
    document.addEventListener('keydown', key);
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', key); };
  }, [open]);
  return <header className={`navigation ${scrolled ? 'scrolled' : ''}`}>
    <Link to="/" className="brand" aria-label={`${siteConfig.name} home`}>AS<span className="brand-dot">✳</span></Link>
    <span className="nav-caption">{siteConfig.name.toUpperCase()}<br /><small>INDEPENDENT CREATIVE PRODUCER</small></span>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <Link key={link} className={link === 'Contact' ? 'magnetic' : undefined} to={`/#${link.toLowerCase()}`}>{link}{link === 'Contact' && <span aria-hidden="true"> ↗</span>}</Link>)}</nav>
    <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? 'CLOSE −' : 'MENU +'}</button>
    {open && <div id="mobile-menu" className="mobile-menu" ref={menu}><nav aria-label="Mobile navigation">{links.map((link, i) => <Link key={link} to={`/#${link.toLowerCase()}`} onClick={() => setOpen(false)}><small>0{i + 1}</small>{link}<span>↗</span></Link>)}</nav><p>CINEMA × AI × STORYTELLING</p></div>}
  </header>;
}
