# Icon inventory

Browser verification checklist for the Caelum Media site. Lucide provides the interface SVGs; the three brand marks are local Simple Icons SVGs in `public/icons/`.

| UI element | Source | Route / component |
| --- | --- | --- |
| Header booking arrow | Lucide ArrowUpRight | `SiteShell` |
| Standard CTA arrows | Lucide ArrowRight / ArrowUpRight | Home, service/package cards, About, closing contact |
| Mobile menu and close | Lucide Menu / X | `SiteShell` |
| Instagram | Local branded SVG | Footer, Contact |
| Facebook | Local branded SVG | Footer, Contact |
| WhatsApp | Local branded SVG | Contact |
| Email and telephone | Lucide Mail / Phone | Contact |
| Portfolio back arrow | Lucide ArrowLeft | Result detail |
| Evidence modal close | Lucide X | EvidenceGallery |
| Carousel pause/play | Lucide Pause / Play | MediaTrack |
| FAQ expand/collapse | Lucide Plus, rotated when expanded | Faq |
| Package feature checks | Lucide Check | PackageCard |

Icon-only controls have accessible names. Decorative icons in the evidence gallery, result CTA and footer are hidden from screen readers where their surrounding text or link label provides the meaning.

Verified in the local browser on 22 October 2026: the footer brand SVGs and Contact-page WhatsApp, Instagram and Facebook SVGs loaded; the mobile menu opened and closed; the evidence modal opened, switched images and closed; and the carousel pause control stopped movement. The other Lucide controls rendered in the inspected header, package, FAQ and result views.
