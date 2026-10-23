'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Check, Share2 } from 'lucide-react';
import { bookingHref, brand } from '@/data/caelum';

export function LinksProfile(){
  const [message,setMessage]=useState('');
  async function share(){
    try{
      if(navigator.share){await navigator.share({title:'Caelum Media',url:location.href});return}
      if(navigator.clipboard){await navigator.clipboard.writeText(location.href);setMessage('Link copied');return}
      setMessage('Copy the page address from your browser.');
    }catch{setMessage('Copy the page address from your browser.')}
    setTimeout(()=>setMessage(''),4000);
  }
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <main id="main" tabIndex={-1} className="links-canvas"><div className="links-panel">
      <div className="links-utility"><Link className="wordmark links-wordmark" href="/" aria-label="Caelum Media home">Caelum Media</Link><button type="button" onClick={share} aria-label="Share this page"><Share2 size={18}/> Share</button></div>
      <img className="links-logo" src={brand.logo} alt="Caelum Media Creative Agency CM logo"/>
      <h1>Caelum Media</h1><p className="links-positioning">{brand.positioning}</p><p className="links-description">{brand.linkDescription}</p>
      <div className="links-social"><a href={brand.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a><a href={brand.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a><a href={brand.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a></div>
      <div className="links-list"><Link href={bookingHref}>BOOK A CONSULTATION <ArrowUpRight size={19}/></Link><a href={brand.whatsapp} target="_blank" rel="noopener noreferrer">CHAT ON WHATSAPP <ArrowUpRight size={19}/></a><Link href="/">EXPLORE OUR WEBSITE <ArrowUpRight size={19}/></Link></div>
      {message&&<p role="status" className="share-message"><Check size={15}/>{message}</p>}
      <div className="links-footer"><a href={`mailto:${brand.email}`}>Email</a><a href={brand.phoneHref}>{brand.phoneDisplay}</a><Link href="/privacy">Privacy</Link></div>
    </div></main>
  </>;
}
