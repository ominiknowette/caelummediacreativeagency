import type { Metadata } from 'next';
import { SiteShell, ClosingContact } from '@/components/site';
import { ResultCard } from '@/components/result-card';
import { results } from '@/data/results';

export const metadata:Metadata={title:'Selected Work & Results',description:'Social media management, audience growth and content performance from selected experience.'};
export default function Page(){return <SiteShell>
  <section className="page-hero container"><h1>Selected Work <em>& Results</em></h1><p>A selection of social media management, content creation and audience-growth work from Rachael’s portfolio.</p></section>
  {(['Audience Growth','Content Performance'] as const).map(category=><section key={category} className="container section compact portfolio-section"><div className="section-heading"><h2>{category}</h2></div><div className="results-grid">{results.filter(item=>item.category===category).map(item=><ResultCard key={item.slug} result={item}/>)}</div></section>)}
  <ClosingContact/>
</SiteShell>}
