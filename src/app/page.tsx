import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SiteShell, ServiceCard, MediaTrack, TestimonialCarousel, ClosingContact } from '@/components/site';
import { ResultCard } from '@/components/result-card';
import { DecorativePattern } from '@/components/decorative-pattern';
import { brand, bookingHref, services, testimonials } from '@/data/caelum';
import { homepageResultSlugs, results } from '@/data/results';

export default function HomePage() {
  return <SiteShell>
    <section className="hero container">
      <DecorativePattern variant="hero" />
      <h1>Your brand deserves<br /><em>a stronger</em><br />digital presence</h1>
      <div className="hero-bottom"><p>{brand.heroCopy}</p><Link className="button" href={bookingHref}>BOOK A CALL <ArrowUpRight size={18}/></Link></div>
    </section>
    <MediaTrack />
    <section className="section container" id="services"><div className="section-heading"><h2>Our Services</h2></div><div className="card-grid three">{services.map(s=><ServiceCard key={s.id} service={s}/>)}</div><div className="center-action"><Link href="/services" className="button button-outline">VIEW ALL SERVICES <ArrowUpRight size={17}/></Link></div></section>
    <section className="about-intro section container"><h2>Who We Are</h2><p>{brand.aboutDraft}</p><Link href="/about" className="button">ABOUT CAELUM MEDIA <ArrowUpRight size={17}/></Link></section>
    <section className="section container homepage-results"><div className="section-heading"><h2>Selected Results</h2></div><div className="results-grid home-results-grid">{homepageResultSlugs.map(slug=>{const item=results.find(result=>result.slug===slug);return item?<ResultCard key={slug} result={item} compact/>:null})}</div><div className="center-action"><Link href="/portfolio" className="button button-outline">VIEW WORK & RESULTS <ArrowUpRight size={17}/></Link></div></section>
    {testimonials.length > 0 && <TestimonialCarousel items={testimonials}/>}<ClosingContact />
  </SiteShell>;
}
