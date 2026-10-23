# Local assets and provenance

The original Caelum CM image is `public/brand/caelum-media-logo.png`, copied without altering its dark background or proportions from the supplied attachment. The source PDF is preserved at `assets/source/rachael-portfolio-original.pdf`. Embedded page-8 screenshots are preserved in `assets/source/pdf-images/` and copied without cropping or recolouring to `public/evidence/`.

The newer `Caelum_Media_Analytics_Evidence.pdf` is preserved at `assets/source/caelum-analytics-evidence-original.pdf`. All 20 original embedded PNGs are in `assets/source/caelum-analytics-evidence/`, one per page. Pages 2–4 contain the same embedded image. Public copies of selected exact matches are in `public/images/results/`:

| Public file | New PDF page | Result |
| --- | --- | --- |
| `tiktok-account-53k-views.png` | 1 | 53K post views; 6,720 profile views |
| `tiktok-video-1049479-views.png` | 6 | 1,049,479 video views; 1,549 new followers |
| `tiktok-video-11173-views.png` | 7 | 11,173 video views; 1,024 likes |
| `tiktok-followers-3141-total.png` | 15 | 3,141 total followers; 56 net for period (source retained, not used as a growth case study) |
| `instagram-reel-496687-overview.png` | 16 | Second view of the same Reel |
| `instagram-reel-496687-insights.png` | 17 | 496,687 views; 248,084 reach; 9,806 interactions |
| `tiktok-carousel-90335-views.png` | 19 | 90,335 post views; 1,183 saves; 123 new followers |

Montserrat variable font and its OFL licence are in `public/fonts/`, from the [Google Fonts repository](https://github.com/google/fonts/tree/main/ofl/montserrat). The local Instagram, Facebook and WhatsApp SVGs in `public/icons/` come from [Simple Icons](https://github.com/simple-icons/simple-icons); see its [licence and disclaimer](https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md).

The static content-creation watermark pattern uses the installed [Lucide](https://lucide.dev/license) outline icon family, distributed under the ISC licence in `node_modules/lucide-react/LICENSE`. The phone-on-tripod outline is a small original composite drawn to the same 24px, rounded-stroke specification. The three user-supplied silhouette images guided subject selection only; their artwork is not copied into the site.

The user-supplied `WhatsApp Video 2026-10-23 at 18.53.09.mp4` is preserved as `assets/about-source/supplied-whatsapp-video-2026-10-23.mp4` and used on the About page as `public/about/rachael-content.mp4`. The temporary poster uses the supplied Caelum Media logo artwork.

| Public evidence file | PDF image | Supported result |
| --- | --- | --- |
| `tiktok-video-1049479-views.png` | page 8, xref 297 | 1,049,479 video views; 4,450h 47m 50s total play time |
| `tiktok-carousel-90335-views.png` | page 8, xref 302 | 90,335 post views; 1,183 saves |
| `instagram-reel-799918-views.png` | page 8, xref 309 | 799,918 video views |
| `instagram-172182-views-13-percent-ads.png` | page 8, xref 312 | 172,182 views; 13% from ads; 77,353 accounts reached |

The seven homepage carousel photos are illustrative stock material. They are **not** Caelum Media portfolio work or images of its clients. Original downloads are retained in `assets/source/lifestyle-carousel/`; smaller web copies are in `public/carousel/`. No analytics screenshot is used in the carousel. Full photographs and simulated 245 × 412 portrait crops were visually inspected before selection; `scripts/preview-carousel.py` can regenerate the local contact sheet.

| Web copy | Photographer / source page | Licence |
| --- | --- | --- |
| `phone-tripod.webp` | [George Milton / Pexels](https://www.pexels.com/photo/black-female-filming-beauty-blog-on-smartphone-6954135/) | [Pexels licence](https://www.pexels.com/legal-pages/license/) |
| `cafe-creator.webp` | [Anete Lusina / Pexels](https://www.pexels.com/photo/unrecognizable-black-woman-messaging-on-phone-at-cafe-5239923/) | [Pexels licence](https://www.pexels.com/legal-pages/license/) |
| `lifestyle-shoot.webp` | [Jaycee300s / Pexels](https://www.pexels.com/photo/woman-on-a-bed-13711167/) | [Pexels licence](https://www.pexels.com/legal-pages/license/) |
| `talking-head.webp` | [Miriam Alonso / Pexels](https://www.pexels.com/photo/stylish-black-woman-recording-video-on-smartphone-in-light-room-7585664/) | [Pexels licence](https://www.pexels.com/legal-pages/license/) |
| `content-planning.webp` | [Antoni Shkraba / Pexels](https://www.pexels.com/photo/a-woman-using-a-smartphone-5244048/) | [Pexels licence](https://www.pexels.com/legal-pages/license/) |
| `street-style.webp` | [Stephen Tettey Atsu / Pexels](https://www.pexels.com/photo/outdoor-portrait-of-fashionable-black-woman-32651426/) | [Pexels licence](https://www.pexels.com/legal-pages/license/) |
| `client-review.webp` | [PNW Production / Pexels](https://www.pexels.com/photo/women-using-a-laptop-8091337/) | [Pexels licence](https://www.pexels.com/legal-pages/license/) |

The selected Pexels pages were inspected on 22 October 2026. Each listed page identified its photo as free to use under the linked licence. `scripts/download-carousel.py` records the verified image URLs; `scripts/prepare-assets.py` creates resized WebP copies without changing the originals. Earlier product-photography originals remain archived in `assets/source/` but are no longer used by the homepage.
