import Link from 'next/link';
import { SiteShell } from '@/components/site';
export default function NotFound(){return <SiteShell><section className="page-hero container"><span className="card-index">404 / PAGE NOT FOUND</span><h1>That page is<br/>out of view</h1><p>The page you were looking for could not be found.</p><Link className="button" href="/">BACK TO HOME</Link></section></SiteShell>}
