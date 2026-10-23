# Caelum Media Website

Next.js 15 implementation of the Caelum Media link-in-bio page and creative agency website.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Copy `.env.example` to `.env.local` and add your email dispatch credentials (EmailJS or SendByte).

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site.

## Routes & Pages

- `/` – Homepage featuring agency overview, service pillars, results showcase, and client review carousel.
- `/links` – Link-in-bio hub with quick access to services, portfolio, and contact channels.
- `/services` – Complete overview of core agency offerings.
- `/social-media-management-packages` – Pricing tiers and package breakdown for social management.
- `/content-bank-packages` – Content creation and production tiers.
- `/growth-marketing` – Performance and growth strategy details.
- `/brand-strategy` – Brand positioning and consulting deliverables.
- `/portfolio` & `/portfolio/[slug]` – Case studies and verified analytics evidence.
- `/about` – Agency story, founder video, and methodology.
- `/contact` – Interactive enquiry form with automated email dispatch.
- `/privacy` – Privacy policy and data handling statement.

## Data & Content

- `src/data/caelum.ts`: Brand assets, contact details, service packages, and copy.
- `src/data/results.ts`: Verified metrics and case study documentation.
- `src/lib/email-service.ts`: Server-side enquiry notification dispatcher (supports EmailJS & SendByte).
- `public/fonts/`: Self-hosted Montserrat variable font (OFL license).
- `public/`: Brand assets, optimized carousel imagery (WebP), and case study proof images.
