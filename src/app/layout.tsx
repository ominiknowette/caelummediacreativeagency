import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#ffffff' };
const publicSiteUrl = process.env.CAELUM_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  title: { default: 'Caelum Media | Creative strategy & content', template: '%s | Caelum Media' },
  description: 'Social media management, content production, growth marketing and brand strategy for businesses ready to strengthen their digital presence.',
  icons: { icon: '/brand/caelum-media-logo.png' },
  ...(publicSiteUrl ? { metadataBase: new URL(publicSiteUrl) } : {}),
  openGraph: { type: 'website', title: 'Caelum Media', description: 'Strategy, content and growth for ambitious brands.', ...(publicSiteUrl ? { images: [{ url: '/brand/caelum-media-logo.png', width: 1024, height: 1024, alt: 'Caelum Media Creative Agency logo' }] } : {}) },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en-GB"><body>{children}</body></html>;
}
