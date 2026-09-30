import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { MagneticButton } from './MagneticButton';
export function Contact() {
  const socials = [['Instagram', siteConfig.instagram], ['LinkedIn', siteConfig.linkedin], ['YouTube', siteConfig.youtube]].filter(([, url]) => !!url);
  return <section id="contact" className="section contact"><div className="section-kicker mono"><span>05 / LET’S MAKE SOMETHING MATTER</span><span>THE NEXT STORY COULD BE YOURS</span></div><div className="contact-main"><h2>Have a story<br /><em>to build?</em></h2>{siteConfig.email ? <MagneticButton className="contact-orbit" href={`mailto:${siteConfig.email}?subject=Let%E2%80%99s%20build%20a%20story`}><span>START A<br />PROJECT</span><b>↗</b></MagneticButton> : <div className="contact-note"><span className="mono">CONTACT DETAILS COMING SOON</span><p>A new conversation.<br />A new possibility.</p></div>}</div><div className="contact-bottom">{siteConfig.email && <a className="email-link" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>}<div className="socials">{socials.map(([label, url]) => <a key={label} href={url} target="_blank" rel="noopener noreferrer">{label} ↗</a>)}</div></div></section>;
}
export function Footer() { return <footer className="footer mono"><span>© {new Date().getFullYear()} {siteConfig.name.toUpperCase()}</span><span>HUMAN IMAGINATION. NEW POSSIBILITIES.</span><Link to="/">BACK TO TOP ↑</Link></footer>; }
