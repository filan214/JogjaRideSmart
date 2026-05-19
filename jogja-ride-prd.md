# Product Requirements Document
# Jogja Ride — AI Trip Advisor Website

**Versi:** 2.0  
**Tanggal:** Mei 2026  
**Status:** Draft  
**AI Engine:** Google Gemini 2.5 Flash (Free Tier)

---

## Daftar Isi

1. [Ringkasan Eksekutif](#1-ringkasan-eksekutif)
2. [Latar Belakang & Konteks Bisnis](#2-latar-belakang--konteks-bisnis)
3. [Tujuan & Sasaran](#3-tujuan--sasaran)
4. [Target Pengguna](#4-target-pengguna)
5. [Core Features](#5-core-features)
6. [Halaman & Sitemap](#6-halaman--sitemap)
7. [User Workflow](#7-user-workflow)
8. [Arsitektur Sistem](#8-arsitektur-sistem)
9. [AI Trip Advisor — Spesifikasi Detail](#9-ai-trip-advisor--spesifikasi-detail)
10. [Admin Dashboard](#10-admin-dashboard)
11. [Tech Stack](#11-tech-stack)
12. [Database Schema](#12-database-schema)
13. [API Routes](#13-api-routes)
14. [Non-Functional Requirements](#14-non-functional-requirements)
15. [Batasan & Asumsi](#15-batasan--asumsi)
16. [Roadmap Pengembangan](#16-roadmap-pengembangan)

---

## 1. Ringkasan Eksekutif

Jogja Ride adalah platform pemesanan trip dan wisata premium di Yogyakarta. Website ini dibangun untuk dua tujuan sekaligus: **operasional bisnis nyata** (menerima booking, mengelola paket) dan **portofolio pengembang** yang menampilkan kemampuan full-stack + integrasi AI.

Fitur utama yang membedakan dari website booking biasa adalah **AI Trip Advisor** berbasis Google Gemini 2.5 Flash — sebuah chatbot yang memberikan rekomendasi paket wisata yang dipersonalisasi berdasarkan preferensi, budget, dan minat pengguna, dengan data paket yang diambil langsung dari database (bukan dikarang oleh AI).

**Biaya operasional AI: Rp 0/bulan** (Google Gemini free tier: 1.500 request/hari).

---

## 2. Latar Belakang & Konteks Bisnis

### 2.1 Bisnis
Jogja Ride Premium adalah layanan transportasi dan tour berbasis di Yogyakarta yang saat ini menerima booking via WhatsApp secara manual. Proses ini tidak efisien — tidak ada pencatatan terstruktur, estimasi harga memakan waktu, dan tidak ada cara bagi calon pelanggan untuk mengeksplorasi paket secara mandiri.

### 2.2 Masalah yang Diselesaikan

| Masalah Saat Ini | Solusi Website |
|---|---|
| Tidak ada showcase paket wisata | Halaman katalog dengan foto, harga, dan detail |
| Estimasi harga manual via WA | Price estimator otomatis |
| Customer bingung pilih paket | AI Trip Advisor yang merekomendasikan sesuai kebutuhan |
| Tidak ada pencatatan booking | Form booking tersimpan ke Supabase |
| Admin kelola info via chat | Dashboard admin terpusat |

### 2.3 Nilai Portofolio
Project ini menggabungkan tiga kompetensi sekaligus:
- **Full-stack web development** — Next.js + Supabase
- **AI integration** — Google Gemini API dengan prompt engineering
- **Produk nyata** — digunakan oleh bisnis yang sudah berjalan

---

## 3. Tujuan & Sasaran

### 3.1 Tujuan Bisnis
- Mengurangi waktu respons booking dari 30+ menit menjadi instan
- Meningkatkan konversi dari pengunjung ke booker dengan bantuan AI
- Memiliki data booking yang terstruktur untuk analisis bisnis

### 3.2 Tujuan Teknis (Portofolio)
- Mendemonstrasikan integrasi AI API (Gemini) dalam produk nyata
- Menampilkan full-stack skill: frontend, backend, database, dan AI
- Deploy live dengan URL yang bisa dibagikan ke recruiter

### 3.3 Key Metrics
- Waktu dari landing ke klik booking: < 3 menit
- AI response time: < 3 detik (streaming)
- Uptime: > 99% (Vercel + Supabase)
- Biaya bulanan: Rp 0

---

## 4. Target Pengguna

### 4.1 User Utama — Calon Pelanggan

**Persona: Wisatawan Jogja**
- Usia 22–45 tahun
- Datang dari luar Jogja (solo, keluarga, rombongan)
- Tidak familiar dengan pilihan wisata lokal
- Butuh rekomendasi yang cepat dan terpercaya
- Lebih nyaman konfirmasi via WhatsApp daripada form panjang

**Jobs To Be Done:**
- "Saya mau wisata di Jogja 2 hari, budget Rp 1 juta, bawa anak kecil — paket apa yang cocok?"
- "Saya mau tahu estimasi biaya sewa mobil dari hotel ke Prambanan PP"
- "Saya mau booking untuk tanggal tertentu"

### 4.2 User Sekunder — Admin (Pemilik Bisnis)

**Persona: Filan (pemilik Jogja Ride)**
- Mengelola paket, harga, dan konten website
- Melihat pesanan masuk dan data booking
- Memantau statistik bisnis dari dashboard

---

## 5. Core Features

### 5.1 AI Trip Advisor ⭐ (Fitur Utama)

**Deskripsi:** Chatbot berbasis Gemini 2.5 Flash yang merekomendasikan paket wisata berdasarkan preferensi pengguna.

**Input dari user:**
- Budget per grup (range slider)
- Durasi wisata (1 hari / 2 hari / lebih)
- Minat wisata (chip multi-select): Candi & Budaya, Alam & Petualangan, Kuliner, Kraton & Sejarah, Pantai Selatan, Merapi
- Jumlah orang (number input)
- Asal kota (opsional, untuk saran waktu perjalanan)

**Proses:**
1. Data paket diambil dari Supabase (real-time)
2. Data di-inject ke system prompt Gemini
3. Gemini merespons dengan maks 3 rekomendasi yang relevan
4. Response di-stream ke UI (tidak menunggu selesai)

**Output:**
- Kartu rekomendasi (nama paket, alasan cocok, harga, durasi, highlights)
- Tombol "Booking paket ini" → redirect WhatsApp
- Tombol "Lihat detail" → halaman katalog

**Batasan:**
- Gemini hanya merekomendasikan paket yang ada di database — tidak boleh mengarang
- Maksimum 3 rekomendasi per percakapan
- Setiap respons diakhiri dengan ajakan booking

---

### 5.2 Price Estimator

**Deskripsi:** Kalkulator harga instan tanpa API call — murni logika frontend.

**Input:**
- Pilih paket atau rute custom
- Jenis kendaraan (Avanza, Hiace, Elf)
- Jumlah orang
- Tanggal perjalanan

**Output:**
- Harga estimasi (termasuk rule: peak season, diskon grup)
- Breakdown biaya (base + biaya tambahan jika ada)
- Tombol lanjut ke booking form

**Pricing rules (diatur dari admin):**
- Harga peak season (weekend, libur nasional): +20%
- Diskon grup (> 6 orang): -10%
- Harga malam (keberangkatan > 20.00): +15%

---

### 5.3 Booking Form

**Deskripsi:** Form pemesanan terstruktur yang menyimpan data ke Supabase dan mengarahkan user ke WhatsApp.

**Field:**
- Nama lengkap (required)
- Nomor WhatsApp (required)
- Paket yang dipilih (auto-fill dari Trip Advisor / Estimator)
- Tanggal perjalanan (date picker)
- Jam keberangkatan (time picker)
- Jumlah orang dewasa & anak
- Titik jemput
- Catatan tambahan (optional)

**After submit:**
1. Data tersimpan ke tabel `bookings` di Supabase dengan status `pending`
2. User diarahkan ke WhatsApp: `wa.me/62XXXXXX?text=...` dengan pesan terformat
3. Halaman konfirmasi ditampilkan

**Pesan WA otomatis (contoh):**
```
Halo Jogja Ride! Saya ingin booking:
📦 Paket: Prambanan Sunrise + Kraton
📅 Tanggal: 25 Mei 2026
👥 Peserta: 4 orang
📍 Jemput: Hotel Cavinton, Jogja
📞 Nama: Budi Santoso
```

---

### 5.4 Katalog Paket

**Deskripsi:** Halaman yang menampilkan semua paket wisata yang tersedia.

**Tampilan:**
- Grid kartu (2 kolom desktop, 1 kolom mobile)
- Setiap kartu: foto, nama, deskripsi singkat, harga mulai dari, durasi, badge kategori
- Filter by kategori: Semua / Budaya / Alam / Petualangan / Pantai

**Detail paket (halaman individual `/paket/[slug]`):**
- Foto gallery
- Deskripsi lengkap
- Itinerari singkat
- Harga breakdown
- Highlight & what's included
- Tombol "Booking sekarang" dan "Tanya AI Advisor"

---

### 5.5 Halaman Testimoni

**Deskripsi:** Tampilkan ulasan nyata dari pelanggan untuk membangun kepercayaan.

**Konten:**
- Rating bintang (1–5)
- Nama & asal kota pelanggan
- Foto (opsional)
- Paket yang dipesan
- Teks ulasan
- Tanggal

**Source data:** Input manual dari admin atau embed dari Google Maps review.

---

### 5.6 Admin Dashboard

Dibahas lengkap di [Section 10](#10-admin-dashboard).

---

## 6. Halaman & Sitemap

```
/                          → Landing page
/paket                     → Katalog semua paket
/paket/[slug]              → Detail paket individual
/trip-advisor              → AI Trip Advisor chat
/booking                   → Booking form
/booking/sukses            → Halaman konfirmasi
/admin                     → Dashboard admin (protected)
/admin/paket               → Kelola paket wisata
/admin/pesanan             → Daftar & kelola pesanan
/admin/testimoni           → Kelola testimoni
/admin/pengaturan          → Pricing rules & info bisnis
```

---

## 7. User Workflow

### 7.1 Alur Utama — Via AI Trip Advisor

```
Landing page
    ↓
Klik "Cari paket dengan AI"
    ↓
Halaman Trip Advisor
    ↓
Isi preferensi (chip selector + slider)
    ↓
Klik "Rekomendasikan paket"
    ↓
Gemini API → streaming response
    ↓
Kartu rekomendasi muncul (maks 3)
    ↓
User klik "Booking paket ini"
    ↓
Booking form (auto-fill nama paket)
    ↓
Submit → simpan ke Supabase
    ↓
Redirect ke WhatsApp
    ↓
Konfirmasi dari admin via WA
```

### 7.2 Alur Alternatif — Via Katalog

```
Landing page → /paket → Pilih paket → /paket/[slug] → Booking form → WhatsApp
```

### 7.3 Alur Admin

```
Login /admin
    ↓
Dashboard overview (stats, pesanan baru)
    ↓
Kelola pesanan (konfirmasi/tolak/tandai selesai)
    ↓
Kelola paket (tambah/edit/hapus)
    ↓
Atur pricing rules
```

---

## 8. Arsitektur Sistem

### 8.1 Gambaran Umum

```
┌─────────────────────────────────────────────────┐
│                   Browser (User)                 │
│              Next.js App (Vercel)                │
└──────────┬──────────────────────┬───────────────┘
           │                      │
           ▼                      ▼
┌──────────────────┐   ┌──────────────────────────┐
│  Supabase        │   │  Google Gemini API        │
│  - PostgreSQL    │   │  (AI Studio Free Tier)    │
│  - Auth          │   │  gemini-2.5-flash         │
│  - Storage       │   │  1.500 req/hari           │
└──────────────────┘   └──────────────────────────┘
           │
           ▼
┌──────────────────┐
│  WhatsApp        │
│  (wa.me redirect)│
└──────────────────┘
```

### 8.2 Alur Data AI Trip Advisor

```
User input preferensi
        ↓
POST /api/trip-advisor
        ↓
Fetch paket dari Supabase (filter by budget)
        ↓
Build system prompt (inject data paket)
        ↓
POST → Gemini API (streaming)
        ↓
Stream response ke browser
        ↓
Parse & render kartu rekomendasi
```

---

## 9. AI Trip Advisor — Spesifikasi Detail

### 9.1 API Route

**Endpoint:** `POST /api/trip-advisor`

**Request body:**
```json
{
  "budget": 800000,
  "duration": "1 hari",
  "interests": ["candi", "budaya"],
  "groupSize": 4,
  "originCity": "Jakarta"
}
```

**Response:** Server-Sent Events (streaming text)

### 9.2 Implementasi

```typescript
// app/api/trip-advisor/route.ts
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

export async function POST(req: Request) {
  const { budget, duration, interests, groupSize } = await req.json()

  // 1. Ambil paket dari Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: packages } = await supabase
    .from('packages')
    .select('name, description, price, duration, highlights, category')
    .lte('price', budget * 1.2) // toleransi 20% di atas budget
    .eq('is_active', true)

  // 2. Gemini via OpenAI-compatible endpoint
  const client = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/'
  })

  const stream = await client.chat.completions.create({
    model: 'gemini-2.5-flash',
    max_tokens: 1024,
    stream: true,
    messages: [
      { role: 'system', content: buildSystemPrompt(packages) },
      { role: 'user', content: buildUserMessage({ budget, duration, interests, groupSize }) }
    ]
  })

  // 3. Return sebagai streaming response
  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || ''
        if (text) controller.enqueue(encoder.encode(text))
      }
      controller.close()
    }
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}
```

### 9.3 System Prompt

```
Kamu adalah Trip Advisor untuk Jogja Ride Premium, layanan transportasi 
wisata premium di Yogyakarta. Tugasmu adalah merekomendasikan paket wisata 
yang paling sesuai dengan kebutuhan tamu berdasarkan data paket yang tersedia.

ATURAN PENTING:
- Hanya rekomendasikan paket yang ada di daftar di bawah ini
- Jangan mengarang paket, harga, atau fasilitas yang tidak ada
- Berikan maksimal 3 rekomendasi, urutkan dari paling relevan
- Jawab dalam Bahasa Indonesia yang ramah dan profesional
- Setiap rekomendasi harus menyebutkan MENGAPA paket itu cocok untuk user ini
- Akhiri selalu dengan satu kalimat ajakan booking via WhatsApp

PAKET YANG TERSEDIA:
[data paket dari Supabase di-inject di sini]

FORMAT SETIAP REKOMENDASI:
**[Nama Paket]**
Kenapa cocok: [alasan spesifik berdasarkan preferensi user]
Harga: Rp [harga] / grup
Durasi: [durasi]
Highlight: [2–3 poin]
```

### 9.4 User Message Builder

```typescript
function buildUserMessage({ budget, duration, interests, groupSize }: UserInput) {
  return `Saya mencari paket wisata dengan detail berikut:
- Budget: Rp ${budget.toLocaleString('id-ID')} untuk ${groupSize} orang
- Durasi: ${duration}
- Minat wisata: ${interests.join(', ')}
- Jumlah orang: ${groupSize}

Tolong rekomendasikan paket yang paling sesuai untuk kami.`
}
```

---

## 10. Admin Dashboard

### 10.1 Akses & Autentikasi

- Route: `/admin/*`
- Protected via Supabase Auth (email + password)
- Middleware Next.js untuk validasi session
- Hanya satu user admin (pemilik bisnis)

### 10.2 Modul Admin

#### 10.2.1 Overview & Analytics
- Total pesanan bulan ini
- Pendapatan berjalan (estimasi)
- Jumlah trip hari ini (selesai / berjalan)
- Rating rata-rata dari testimoni
- Grafik pesanan mingguan (Recharts)
- Top 3 paket paling sering dipesan

#### 10.2.2 Manajemen Pesanan

**Tabel pesanan dengan kolom:**
- ID pesanan, Nama pelanggan, Nomor WA
- Paket dipesan, Tanggal trip, Jumlah orang
- Status (pending / confirmed / selesai / dibatalkan)
- Waktu booking masuk

**Aksi:**
- Konfirmasi → ubah status ke `confirmed`
- Tandai selesai → ubah status ke `selesai`
- Batalkan → ubah status ke `dibatalkan`
- Export CSV (semua pesanan bulan ini)

#### 10.2.3 Kalender & Jadwal
- Tampilan kalender (monthly/weekly view)
- Blok tanggal off (kendaraan tidak tersedia)
- Lihat trip yang terjadwal per tanggal

#### 10.2.4 Kelola Paket Wisata

**Form tambah/edit paket:**
- Nama paket, slug (auto-generate)
- Deskripsi singkat & deskripsi lengkap
- Harga per grup
- Durasi (jam/hari)
- Kategori (budaya, alam, petualangan, pantai)
- Highlights (list)
- Foto (upload ke Supabase Storage)
- Status aktif/nonaktif

#### 10.2.5 Pricing Rules
- Harga peak season: toggle + persentase markup
- Diskon grup: minimum orang + persentase diskon
- Harga malam: jam mulai + persentase markup
- Kendaraan tersedia: Avanza, Hiace, Elf (toggle aktif/nonaktif)

#### 10.2.6 Kelola Testimoni
- Tambah testimoni manual
- Tampilkan/sembunyikan testimoni per review
- Rating bintang, nama, asal kota, teks, foto

---

## 11. Tech Stack

### 11.1 Frontend

| Teknologi | Versi | Fungsi |
|---|---|---|
| Next.js | 15 | Framework React full-stack |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3 | Styling utility-first |
| shadcn/ui | latest | Komponen UI |
| Recharts | 2 | Chart & grafik |
| Lucide React | latest | Icon library |

### 11.2 Backend & Database

| Teknologi | Versi | Fungsi |
|---|---|---|
| Next.js API Routes | 15 | Backend endpoints |
| Supabase | latest | PostgreSQL + Auth + Storage |
| Row Level Security | — | Keamanan data per user |

### 11.3 AI

| Teknologi | Detail |
|---|---|
| Google Gemini 2.5 Flash | Model AI utama |
| Google AI Studio | Platform API key (gratis) |
| OpenAI SDK | Client library (compatible) |
| Free tier | 1.500 req/hari, tidak perlu kartu kredit |

### 11.4 Deployment & Integrasi

| Teknologi | Fungsi |
|---|---|
| Vercel | Hosting Next.js (free tier) |
| GitHub | Version control |
| WhatsApp wa.me | Redirect booking |
| Supabase Storage | Penyimpanan foto paket |

### 11.5 Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Google Gemini (Google AI Studio)
GEMINI_API_KEY=

# WhatsApp
NEXT_PUBLIC_WA_NUMBER=62XXXXXXXXXX
```

---

## 12. Database Schema

### 12.1 Tabel `packages`

```sql
create table packages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text unique not null,
  description text,
  long_description text,
  price       integer not null,       -- dalam Rupiah
  duration    text not null,          -- "1 hari", "2 hari", dll
  category    text not null,          -- budaya, alam, petualangan, pantai
  highlights  text[],                 -- array poin highlight
  photo_url   text,
  is_active   boolean default true,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);
```

### 12.2 Tabel `bookings`

```sql
create table bookings (
  id              uuid primary key default gen_random_uuid(),
  package_id      uuid references packages(id),
  package_name    text not null,      -- snapshot nama paket
  customer_name   text not null,
  customer_phone  text not null,
  travel_date     date not null,
  departure_time  time not null,
  adults          integer not null default 1,
  children        integer not null default 0,
  pickup_location text not null,
  notes           text,
  estimated_price integer,
  status          text default 'pending',  -- pending, confirmed, selesai, dibatalkan
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);
```

### 12.3 Tabel `testimonials`

```sql
create table testimonials (
  id           uuid primary key default gen_random_uuid(),
  customer_name text not null,
  origin_city  text,
  rating       integer not null check (rating between 1 and 5),
  content      text not null,
  package_name text,
  photo_url    text,
  is_visible   boolean default true,
  created_at   timestamptz default now()
);
```

### 12.4 Tabel `pricing_rules`

```sql
create table pricing_rules (
  id          uuid primary key default gen_random_uuid(),
  rule_type   text not null,   -- peak_season, group_discount, night_surcharge
  is_active   boolean default false,
  value       integer not null,  -- persentase (20 = 20%)
  config      jsonb,             -- konfigurasi tambahan (jam mulai, min orang, dll)
  updated_at  timestamptz default now()
);
```

### 12.5 Row Level Security (RLS)

```sql
-- Packages: semua orang bisa read yang active
alter table packages enable row level security;
create policy "Public read active packages"
  on packages for select using (is_active = true);

-- Bookings: hanya admin (service role) yang bisa akses semua
alter table bookings enable row level security;
create policy "Admin full access"
  on bookings using (auth.role() = 'service_role');

-- Testimonials: semua orang bisa read yang visible
create policy "Public read visible testimonials"
  on testimonials for select using (is_visible = true);
```

---

## 13. API Routes

### 13.1 Daftar Endpoint

| Method | Route | Fungsi | Auth |
|---|---|---|---|
| POST | `/api/trip-advisor` | Streaming AI recommendation | Public |
| POST | `/api/bookings` | Simpan booking baru | Public |
| GET | `/api/packages` | Ambil semua paket aktif | Public |
| GET | `/api/packages/[slug]` | Detail satu paket | Public |
| GET | `/api/admin/bookings` | Semua pesanan (admin) | Admin |
| PATCH | `/api/admin/bookings/[id]` | Update status pesanan | Admin |
| POST | `/api/admin/packages` | Tambah paket baru | Admin |
| PATCH | `/api/admin/packages/[id]` | Edit paket | Admin |
| DELETE | `/api/admin/packages/[id]` | Hapus paket | Admin |

### 13.2 Format Booking Request

```json
POST /api/bookings
{
  "package_id": "uuid",
  "package_name": "Prambanan Sunrise + Kraton",
  "customer_name": "Budi Santoso",
  "customer_phone": "081234567890",
  "travel_date": "2026-05-25",
  "departure_time": "05:30",
  "adults": 3,
  "children": 1,
  "pickup_location": "Hotel Cavinton, Jl. Mangkubumi",
  "notes": "Ada yang alergi seafood",
  "estimated_price": 650000
}
```

---

## 14. Non-Functional Requirements

### 14.1 Performa
- **First Contentful Paint (FCP):** < 1.5 detik
- **Largest Contentful Paint (LCP):** < 2.5 detik
- **AI response time:** Stream mulai dalam < 2 detik
- **API response (non-AI):** < 500ms

### 14.2 Keamanan
- Semua admin routes dilindungi Supabase Auth
- API key Gemini tidak pernah terekspos ke client
- RLS aktif di semua tabel Supabase
- Input form divalidasi dengan Zod sebelum masuk ke database
- Environment variables tidak pernah di-commit ke Git

### 14.3 Mobile Responsiveness
- Desain mobile-first
- Semua halaman berfungsi di layar 375px ke atas
- Chip selector dan form UI dioptimalkan untuk touch

### 14.4 SEO
- Meta tags di setiap halaman (`/paket`, `/paket/[slug]`)
- Open Graph untuk sharing
- Structured data (JSON-LD) untuk paket wisata

### 14.5 Aksesibilitas
- Semua gambar memiliki alt text
- Kontras warna memenuhi WCAG AA
- Keyboard navigable untuk form

---

## 15. Batasan & Asumsi

### 15.1 Batasan AI
- Gemini free tier: **1.500 request/hari** — cukup untuk portofolio dan bisnis skala kecil
- Jika limit tercapai, tampilkan pesan ramah dan arahkan user ke form booking manual
- Gemini tidak boleh membuat janji spesifik terkait ketersediaan — hanya merekomendasikan

### 15.2 Batasan Bisnis
- Tidak ada payment gateway — konfirmasi dan pembayaran dilakukan via WhatsApp/transfer manual
- Tidak ada sistem akun untuk pelanggan (guest booking only)
- Tidak ada fitur real-time availability check kendaraan

### 15.3 Asumsi
- Admin adalah satu orang (pemilik bisnis)
- Nomor WhatsApp admin tetap dan tidak sering berubah
- Foto paket wisata tersedia untuk di-upload
- Supabase free tier (500 MB database, 50k MAU) cukup untuk skala awal

---

## 16. Roadmap Pengembangan

### Phase 1 — MVP (Minggu 1–3)

**Target:** Website bisa digunakan untuk terima booking nyata.

- [ ] Setup Next.js + Tailwind + Supabase
- [ ] Buat schema database dan seed data paket
- [ ] Landing page dengan hero + paket unggulan + CTA
- [ ] Halaman katalog paket (grid + filter)
- [ ] Booking form + redirect WhatsApp
- [ ] Deploy ke Vercel

### Phase 2 — AI Feature (Minggu 4–5)

**Target:** AI Trip Advisor live dan berfungsi.

- [ ] Integrasi Gemini API (Google AI Studio)
- [ ] Halaman `/trip-advisor` dengan chip selector
- [ ] API route `/api/trip-advisor` dengan streaming
- [ ] Kartu rekomendasi dengan tombol booking
- [ ] Error handling jika limit API tercapai

### Phase 3 — Admin Dashboard (Minggu 6–8)

**Target:** Admin bisa kelola bisnis dari dashboard.

- [ ] Setup Supabase Auth untuk admin
- [ ] Dashboard overview + statistik
- [ ] Tabel manajemen pesanan (konfirmasi, filter, export)
- [ ] Form CRUD paket wisata
- [ ] Pricing rules management
- [ ] Kalender jadwal trip

### Phase 4 — Polish (Minggu 9–10)

**Target:** Siap untuk portofolio dan penggunaan produksi.

- [ ] Halaman testimoni + kelola dari admin
- [ ] SEO meta tags + Open Graph
- [ ] Loading states + error boundaries
- [ ] Mobile optimization final
- [ ] Performance audit (Lighthouse)
- [ ] README.md untuk GitHub

---

## Lampiran

### A. Struktur Folder Next.js

```
jogja-ride/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── paket/
│   │   ├── page.tsx                # Katalog paket
│   │   └── [slug]/page.tsx         # Detail paket
│   ├── trip-advisor/
│   │   └── page.tsx                # AI Trip Advisor
│   ├── booking/
│   │   ├── page.tsx                # Booking form
│   │   └── sukses/page.tsx         # Konfirmasi
│   ├── admin/
│   │   ├── layout.tsx              # Protected layout
│   │   ├── page.tsx                # Dashboard overview
│   │   ├── pesanan/page.tsx
│   │   ├── paket/page.tsx
│   │   └── pengaturan/page.tsx
│   └── api/
│       ├── trip-advisor/route.ts   # Gemini streaming
│       ├── bookings/route.ts
│       ├── packages/route.ts
│       └── admin/
│           ├── bookings/route.ts
│           └── packages/route.ts
├── components/
│   ├── ui/                         # shadcn components
│   ├── trip-advisor/
│   │   ├── ChatInterface.tsx
│   │   ├── PreferenceForm.tsx
│   │   └── RecommendationCard.tsx
│   ├── booking/
│   │   ├── BookingForm.tsx
│   │   └── PriceEstimator.tsx
│   ├── packages/
│   │   ├── PackageCard.tsx
│   │   └── PackageGrid.tsx
│   └── admin/
│       ├── BookingTable.tsx
│       └── PackageForm.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── gemini.ts                   # Gemini API helper
│   ├── whatsapp.ts                 # WA message builder
│   └── pricing.ts                  # Pricing rules logic
├── types/
│   └── index.ts                    # TypeScript types
├── .env.local                      # Environment variables
└── supabase/
    └── schema.sql                  # Database migrations
```

### B. Estimasi Biaya Bulanan

| Layanan | Paket | Biaya |
|---|---|---|
| Vercel | Hobby (free) | Rp 0 |
| Supabase | Free (500 MB) | Rp 0 |
| Google Gemini | Free (1.500 req/hari) | Rp 0 |
| Domain | (opsional) | ~Rp 150.000/tahun |
| **Total** | | **Rp 0/bulan** |

### C. Referensi & Inspirasi
- [Supabase Docs](https://supabase.com/docs)
- [Google AI Studio](https://aistudio.google.com)
- [Next.js 15 Docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Gemini OpenAI-Compatible API](https://ai.google.dev/gemini-api/docs/openai)

---

*Dokumen ini disusun berdasarkan sesi brainstorming komprehensif mencakup: ide portofolio, eksplorasi web app, perancangan fitur admin dashboard, desain AI Trip Advisor, evaluasi AI API gratis, dan revisi arsitektur dengan Gemini API.*

*Last updated: Mei 2026*
