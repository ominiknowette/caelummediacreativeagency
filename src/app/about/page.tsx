import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SiteShell, ClosingContact } from '@/components/site';
import { brand } from '@/data/caelum';
import { selectedExperience } from '@/data/results';
import { aboutVideo } from '@/data/about-video';
import { AboutContentVideo } from '@/components/about-content-video';

export const metadata:Metadata={title:'About Caelum Media',description:'Learn about Caelum Media’s approach, capabilities and selected experience.'};

const process = [
  {title:'Enquiry',copy:'Tell us about your business, the support you need and what you want to achieve.'},
  {title:'Discovery',copy:'We discuss your audience, current challenges and priorities to identify a suitable service.'},
  {title:'Proposal',copy:'We outline the scope, deliverables, fees and proposed schedule before work begins.'},
  {title:'Onboarding',copy:'We collect the brand materials, access and information needed to begin.'},
  {title:'Planning',copy:'We develop the content direction, calendar or campaign plan around the agreed goals.'},
  {title:'Creation',copy:'We produce the content and creative assets included in your selected service.'},
  {title:'Review',copy:'You review the work and share feedback according to the agreed revision allowance.'},
  {title:'Delivery / Launch',copy:'We deliver the approved assets or publish and manage them according to the agreed scope.'},
  {title:'Optimisation',copy:'For ongoing services, we review performance and use the findings to guide future work.'},
];
const capabilities = [
  {title:'Content strategy',copy:'Clear themes, messages and plans shaped around your audience and goals.'},
  {title:'Content creation',copy:'Purposeful short-form video, imagery and creative assets for digital channels.'},
  {title:'Social media management',copy:'A considered presence across the platforms included in your agreed scope.'},
  {title:'Brand direction',copy:'A consistent identity and voice that help your business stand out.'},
  {title:'Campaign planning',copy:'Ideas and content plans that connect individual pieces to a wider objective.'},
  {title:'Performance review',copy:'A clear look at results to guide the next round of work.'},
];

export default function Page(){const showVideo=Boolean(aboutVideo.src&&aboutVideo.poster);return <SiteShell>
  <section className={`container about-introduction${showVideo?' about-introduction--with-video':''}`}>
    <div className="about-introduction-copy"><p className="section-label">ABOUT US</p>
      <h1>Caelum Media</h1>
      <p className="about-tagline">Strategy. Content. Growth.</p>
      <p className="about-lead">{brand.aboutParagraphs[0]}</p></div>
    {showVideo&&<AboutContentVideo src={aboutVideo.src} poster={aboutVideo.poster}/>}
  </section>
  <section className="container about-approach section">
    <div><p className="section-label">OUR APPROACH</p><h2>Creativity with<br/><em>purpose.</em></h2></div>
    <div className="about-approach-copy"><p>{brand.aboutParagraphs[1]}</p><p>{brand.aboutParagraphs[2]}</p></div>
  </section>
  <section className="about-process section"><div className="container">
    <div className="section-heading"><div><p className="section-label">HOW WE WORK</p><h2>From conversation<br/>to creation</h2></div></div>
    <div className="process-grid">{process.map(step=><article className="process-card" key={step.title}><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>
  </div></section>
  <section className="container about-capabilities section"><div className="section-heading"><div><p className="section-label">CAPABILITIES</p><h2>What we bring<br/>to your brand</h2></div></div><div className="capabilities-grid">{capabilities.map(item=><article key={item.title}><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></section>
  <section className="container section selected-experience"><div className="section-heading"><h2>Selected experience</h2></div><div className="experience-grid">{selectedExperience.map(item=><article key={item.name}><h3>{item.name}</h3><p>{item.description}</p></article>)}</div></section>
  <section className="about-story-section section"><div className="container about-story-layout"><div className="about-story-copy"><p className="section-label">SELECTED CLIENT STORY</p><h2>Growing an audience<br/>with Amarex Surprises</h2><p>Amarex Surprises shared TikTok audience growth from 147 to 1,872 followers over three months, alongside social media management and content support.</p><Link href="/portfolio/amarex-surprises" className="button">VIEW WORK & RESULTS <ArrowUpRight size={17} aria-hidden="true"/></Link></div><div className="about-story-result"><span>TikTok audience growth</span><strong>147 <i>→</i> 1,872</strong><p>followers over three months</p></div></div></section>
  <ClosingContact/>
</SiteShell>}
