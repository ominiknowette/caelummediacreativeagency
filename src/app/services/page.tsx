import type { Metadata } from 'next';
import { SiteShell, Faq, ClosingContact } from '@/components/site';
import { ServiceTabs } from '@/components/service-tabs';
export const metadata:Metadata={title:'Our Services',description:'Explore Caelum Media social media management, content production, growth marketing and brand strategy services.'};
export default function ServicesPage(){return <SiteShell><div className="page-hero container"><h1>Our Services</h1><p>Choose the support that meets your brand where it is today. Explore ongoing management, ready-to-post content and focused strategy services.</p></div><section className="container section compact"><ServiceTabs/></section><Faq/><ClosingContact/></SiteShell>}
