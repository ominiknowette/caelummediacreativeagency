import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ResultRecord } from '@/data/results';

export function ResultCard({result, compact=false}:{result:ResultRecord;compact?:boolean}){
  return <article className={`result-card${compact?' result-card-compact':''}`}>
    {result.evidence&&<div className="result-preview"><img src={result.evidence[0].src} alt={result.evidence[0].alt} loading="lazy"/></div>}
    <div className="result-card-body">
      <p className="result-context">{result.context}</p>
      <h3>{result.title}</h3>
      <strong className="result-number">{result.headline}</strong>
      <p className="result-supporting">{result.supporting}</p>
      {!compact&&<p className="result-description">{result.description}</p>}
      <Link href={`/portfolio/${result.slug}`} className="result-link">VIEW RESULTS <ArrowUpRight size={17}/></Link>
    </div>
  </article>;
}
