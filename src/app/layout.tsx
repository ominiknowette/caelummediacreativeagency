import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';
import { NoiseTexture } from '@/components/NoiseTexture';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#F4EFE7',
};

export const metadata: Metadata = {
  title: 'Amara Vance · Social Media & Content Director',
  description: 'Editorial social media strategies, mobile videography, and creative direction for luxury and lifestyle brands.',
  openGraph: {
    title: 'Amara Vance · Social Media & Content Director',
    description: 'Editorial social media strategies, mobile videography, and creative direction.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-cream text-charcoal selection:bg-burntOrange selection:text-white relative font-sans antialiased">
        <NoiseTexture />
        <div className="relative z-10 mx-auto max-w-[560px] md:max-w-[720px] lg:max-w-[880px] min-h-screen bg-cream shadow-subtle border-x border-sand/40 flex flex-col justify-between">
          <main className="flex-1 w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
