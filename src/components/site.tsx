'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Menu, Pause, Play, Plus, X } from 'lucide-react';
import { brand, bookingHref, faqs, money, packageWhatsAppHref, type Package, type Service } from '@/data/caelum';
import { DecorativePattern } from './decorative-pattern';
export { MediaTrack } from './media-track';

const nav = [['Home', '/'], ['Portfolio', '/portfolio'], ['Services', '/services'], ['About', '/about']];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); menuRef.current?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <div className="container header-inner">
        <Link className="wordmark" href="/" aria-label="Caelum Media home">Caelum Media</Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined}>{label}</Link>)}
        </nav>
        <Link className="header-cta" href={bookingHref}><span>BOOK A CALL</span><span className="header-arrow"><ArrowUpRight size={17} /></span></Link>
        <button className="menu-toggle" ref={menuRef} type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(value => !value)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
        {nav.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined}>{label}</Link>)}
        <Link href={bookingHref}>Book a call <ArrowUpRight size={17} /></Link>
        <Link href="/contact">Contact</Link>
      </nav>}
    </header>
    <main id="main" tabIndex={-1}>{children}</main>
    <Footer />
  </>;
}

function Footer() {
  return <footer className="footer"><div className="container footer-inner">
    <small>© {new Date().getFullYear()} Caelum Media</small>
    <div className="footer-socials">
      <a href={brand.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Caelum Media on Instagram"><img src="/icons/instagram.svg" alt="" aria-hidden="true" /></a>
      <a href={brand.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Caelum Media on Facebook"><img src="/icons/facebook.svg" alt="" aria-hidden="true" /></a>
      <a href={brand.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with Caelum Media on WhatsApp"><img src="/icons/whatsapp.svg" alt="" aria-hidden="true" /></a>
    </div>
  </div></footer>;
}

export function SectionBadge({ children }: { children: React.ReactNode }) {
  return <p className="section-label">{children}</p>;
}

export function ServiceCard({ service }: { service: Service }) {
  return <article className="card service-card">
    <h3>{service.title}</h3>
    <p>{service.description}</p>
    <div className="price">{service.pricePrefix && <span>{service.pricePrefix} </span>}{money(service.price)}<small>{service.billing}</small></div>
    <ul className="feature-list">{service.features.map(feature => <li key={feature}><Check size={16} /><span>{feature}</span></li>)}</ul>
    {service.note && <p className="fineprint">{service.note}</p>}
    {service.id === 'growth-marketing' && <Link className="text-link" href="/growth-marketing">Explore Growth Marketing <ArrowRight size={15} /></Link>}
    {service.href.startsWith('http') ? <a className="card-button" href={service.href} target="_blank" rel="noopener noreferrer">{service.cta}<ArrowRight size={17} /></a> : <Link className="card-button" href={service.href}>{service.cta}<ArrowRight size={17} /></Link>}
  </article>;
}

export function PackageCard({ pkg, service }: { pkg: Package; service: string }) {
  return <article className="card package-card">
    <h2>{pkg.title}</h2>
    <p>{pkg.description}</p>
    <div className="price">{money(pkg.price)}<small>{pkg.billing}</small></div>
    <p className="package-quantity">{pkg.pieces}</p>
    <h3>What you get</h3>
    <ul className="feature-list">{pkg.features.map(feature => <li key={feature}><Check size={16} /><span>{feature}</span></li>)}</ul>
    <p className="ideal"><strong>Ideal for</strong><br />{pkg.ideal}</p>
    {pkg.note && <p className="fineprint">{pkg.note}</p>}
    <Link className="card-button" href={`/contact?service=${service}&package=${pkg.id}`}>ENQUIRE ABOUT THIS PACKAGE <ArrowRight size={17} /></Link>
    <a className="secondary-card-link" href={packageWhatsAppHref(pkg.title)} target="_blank" rel="noopener noreferrer">Chat on WhatsApp <ArrowRight size={15} /></a>
  </article>;
}

export function ClosingContact() {
  return <section className="closing-contact"><DecorativePattern variant="closing" /><div className="container">
    <h2>Let’s talk about<br /><em>your brand.</em></h2>
    <p>Tell us what you are building. We will help you find the right place to begin.</p>
    <Link className="button" href={bookingHref}>BOOK A CALL <ArrowUpRight size={18} /></Link>
  </div></section>;
}

export function Faq({ items = faqs }: { items?: { q: string; a: string }[] }) {
  const [active, setActive] = useState(0);
  return <section className="faq-section container section">
    <h2>Frequently Asked<br />Questions</h2>
    <div className="faq-list">{items.map((item, index) => <div className="faq-item" key={item.q}>
      <h3><button type="button" id={`faq-q-${index}`} aria-expanded={active === index} aria-controls={`faq-a-${index}`} onClick={() => setActive(active === index ? -1 : index)}>{item.q}<Plus size={20} className={active === index ? 'rotated' : ''} /></button></h3>
      <div id={`faq-a-${index}`} role="region" aria-labelledby={`faq-q-${index}`} hidden={active !== index}><p>{item.a}</p></div>
    </div>)}</div>
  </section>;
}

export function TestimonialCarousel({ items }: { items: { quote: string; name: string; rating?: number }[] }) {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const row = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update(); query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  function move(direction: number) {
    const el = row.current;
    const card = el?.querySelector<HTMLElement>('.testimonial-card');
    if (el && card) el.scrollBy({ left: direction * (card.offsetWidth + 18), behavior: reduced ? 'instant' : 'smooth' });
  }
  useEffect(() => {
    if (paused || reduced || items.length < 2) return;
    const timer = setInterval(() => move(1), 6000);
    return () => clearInterval(timer);
  }, [paused, reduced, items.length]);
  if (!items.length) return null;
  return <section className="section container testimonial-section" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
    <div className="section-heading"><h2>What Our Clients Say</h2><div className="carousel-buttons">
      <button type="button" aria-label="Previous testimonial" onClick={() => move(-1)}><ChevronLeft /></button>
      <button type="button" aria-label="Next testimonial" onClick={() => move(1)}><ChevronRight /></button>
      <button type="button" aria-label={paused ? 'Play testimonials' : 'Pause testimonials'} onClick={() => setPaused(value => !value)}>{paused ? <Play /> : <Pause />}</button>
    </div></div>
    <div className="testimonial-row" ref={row}>{items.map((item, index) => <article className="testimonial-card" key={`${item.name}-${index}`}><blockquote>“{item.quote}”</blockquote><strong>{item.name}</strong></article>)}</div>
  </section>;
}
