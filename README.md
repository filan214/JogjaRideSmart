# Jogja Ride — AI Trip Advisor

Frontend implementation untuk **Jogja Ride**, layanan trip & wisata premium di Yogyakarta dengan AI Trip Advisor. Dibangun dengan Next.js 15, TypeScript, Tailwind CSS, dan Framer Motion.

> Implementasi frontend untuk landing page, mengikuti PRD `jogja-ride-prd.md`. Belum termasuk integrasi backend (Supabase, Gemini API) — saat ini menggunakan mock data.

## Stack

- **Next.js 15** (App Router)
- **React 19** + **TypeScript 5**
- **Tailwind CSS 3** dengan custom theme (brand emerald + accent amber)
- **Framer Motion** untuk scroll-triggered animations
- **Lucide React** untuk ikon
- **Google Fonts**: Plus Jakarta Sans (body) + Fraunces (display)

## Quick start

```bash
# Install dependencies
npm install

# Jalankan dev server
npm run dev

# Build untuk production
npm run build
npm run start
```

Buka [http://localhost:3000](http://localhost:3000).

## Struktur

```
app/
├── layout.tsx          # Root layout + fonts + metadata
├── page.tsx            # Landing page
├── globals.css         # Tailwind + custom utilities
└── icon.svg            # Favicon

components/
├── layout/
│   ├── Navbar.tsx      # Sticky nav dengan blur + mobile menu
│   └── Footer.tsx
├── sections/
│   ├── Hero.tsx              # Hero dengan AI badge floating
│   ├── TrustBar.tsx          # Strip 4 keunggulan
│   ├── AIShowcase.tsx        # Mock chat AI Trip Advisor
│   ├── Categories.tsx        # 6 kategori wisata
│   ├── FeaturedPackages.tsx  # Grid 6 paket unggulan
│   ├── HowItWorks.tsx        # 3 langkah booking
│   ├── WhyChooseUs.tsx       # 4 keunggulan + stats
│   ├── Testimonials.tsx      # 6 testimoni
│   ├── FAQ.tsx               # Accordion FAQ
│   └── FinalCTA.tsx          # CTA akhir
└── ui/
    ├── Button.tsx      # 5 varian (primary/accent/ghost/outline/whatsapp)
    ├── Container.tsx
    └── Logo.tsx

lib/
├── utils.ts            # cn() helper + formatRupiah()
└── mock-data.ts        # Mock packages, testimonials, FAQs
```

## Highlight UX

- **Mobile-first responsive** — semua section bekerja di 375px ke atas
- **Smooth scroll** ke anchor section
- **Sticky navbar** dengan blur backdrop saat scroll
- **Scroll-triggered reveals** via `whileInView` (sekali, hemat performa)
- **Floating UI elements** di hero (AI chat preview, booking notification)
- **Accessible**: skip link, ARIA labels, focus rings, semantic HTML
- **Reduced-motion support** — animations otomatis disabled saat user prefers reduced motion

## Design system

| Token        | Value                              |
| ------------ | ---------------------------------- |
| Background   | `sand-50` (#FDFBF6) — warm cream   |
| Brand        | `brand-800` (#065F46) — emerald    |
| Accent       | `accent-500/600` (amber/orange)    |
| Display font | Fraunces (italic untuk highlight)  |
| Body font    | Plus Jakarta Sans                  |

## Roadmap selanjutnya

Sesuai PRD, langkah berikutnya:

1. **AI Trip Advisor page** (`/trip-advisor`) — implementasi PreferenceForm + streaming response dari Gemini API
2. **Katalog Paket** (`/paket`, `/paket/[slug]`)
3. **Booking flow** (`/booking`)
4. **Admin Dashboard** (`/admin/*`) dengan Supabase Auth
5. **Integrasi Supabase** untuk data paket, bookings, testimonials
