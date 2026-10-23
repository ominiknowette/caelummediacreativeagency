import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { SiteShell, ClosingContact } from '@/components/site';
import { EvidenceGallery } from '@/components/evidence-gallery';
import { results } from '@/data/results';

export function generateStaticParams(){return results.map(item=>({slug:item.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const item=results.find(result=>result.slug===slug);return {title:item?`${item.title} | Selected Results`:'Result not found'}}
export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const item=results.find(result=>result.slug===slug);
  if(!item)notFound();
  return <SiteShell>
    <section className="container result-detail">
      <Link href="/portfolio" className="back-link"><ArrowLeft size={17} aria-hidden="true"/> ALL WORK & RESULTS</Link>
      <p className="section-label">{item.context}</p><h1>{item.title}</h1><p className="result-detail-lead">{item.description}</p>
      <div className={`result-detail-grid${item.evidence?'':' result-detail-text-only'}`}>
        <div className="result-detail-copy"><strong className="result-detail-headline">{item.headline}</strong><p>{item.supporting}</p><div className="metric-list">{item.metrics.map((metric,index)=><div key={`${metric.name}-${index}`}><span>{metric.platform} · {metric.name}</span><strong>{metric.display}</strong>{metric.period&&<small>{metric.period}</small>}</div>)}</div><Link href="/contact" className="result-contact-link">DISCUSS YOUR PROJECT <ArrowUpRight size={17} aria-hidden="true"/></Link></div>
        {item.evidence&&<EvidenceGallery images={item.evidence}/>}
      </div>
    </section>
    <ClosingContact/>
  </SiteShell>;
}
