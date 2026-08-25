# Editorial Creative & Service Commerce Platform

A **premium, mobile-first social media and content-creation service platform** that combines the simplicity of a Linktree-style profile page with the polish of an editorial creative website and the functionality of a lightweight service-commerce platform.

---

## ✨ Features

- **Editorial & Warm Luxury Visual Direction**:
  - Warm Cream (`#F4EFE7`) canvas with subtle SVG grain/noise texture.
  - Deep Charcoal (`#191817`) typography & borders with restrained Burnt Orange (`#C86432`) action accents.
  - Typography: `Cormorant Garamond` (Editorial / Display) paired with `Manrope` (Clean UI / Body).
  - Signature architectural hero banner transitioning through an arched cutout bridge into a circular creator portrait.
- **Dynamic Data-Driven Services (`/`)**:
  - Numbered editorial service cards (`01`, `02`, `03`...) with hover arrow translation (`→`).
  - Active category filter tabs and real-time count.
- **Service Detail Experience (`/services/[slug]`)**:
  - Hero banner with category tag, title, and timeline/duration badges.
  - **Interactive Payment Structure Selector** (`ONE-TIME` | `INSTALLMENTS`), updating live pricing breakdown.
  - Custom styled benefits matrix, deliverables checklist, target audience overview, and expandable FAQ accordion.
  - Sticky mobile conversion action bar with instant `Buy Access →` checkout.
- **Seamless Checkout & Payment Flow**:
  - Review plan, collect client contact details (WhatsApp/Phone/Email).
  - Integrated Paystack checkout support + built-in instant test simulation.
  - Celebration confirmation with confetti, booking schedule trigger, downloadable summary, and WhatsApp concierge.
- **Interactive Share Sheet**:
  - Mobile bottom-sheet with WhatsApp, X/Twitter, LinkedIn, and dynamic "Copy Link" with animated "Copied ✓" feedback state.
- **Direct Bespoke Inquiry Drawer**:
  - Custom collaboration brief submission modal.
- **Admin Management Console (`/admin`)**:
  - Full CRUD for services (reorder, toggle active/hidden, edit pricing, installment plans, duration, descriptions, and benefits).
  - Profile & identity editor (edit creator name, title, tagline, bio, avatar, banner, and social links).
  - Live client bookings & verified order history.
  - Supabase integration with automatic local fallback store so everything works immediately out of the box.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend & Database**: Supabase (PostgreSQL, Storage, Auth) + Resilient Client Cache
- **Payments**: Paystack / Flutterwave

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Database Setup (Optional)
If connecting to a live Supabase project:
1. Create a project on [Supabase](https://supabase.com).
2. Execute the provided `supabase-schema.sql` in the Supabase SQL Editor.
3. Add your credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxx
```

---

## 📱 Tested Mobile Viewports
- **360px · 375px · 390px · 430px** (Primary Mobile Targets)
- **768px** (Tablet)
- **1024px+** (Desktop)
