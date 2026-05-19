import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Users,
  Star,
  MapPin,
  Check,
  Sparkles,
  Calendar,
  Camera,
  Shield,
  MessageCircle,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import { packages } from '@/lib/mock-data';
import { formatRupiah } from '@/lib/utils';

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export default function PackageDetail({ params }: { params: { slug: string } }) {
  const pkg = packages.find((p) => p.slug === params.slug);
  if (!pkg) notFound();

  const relatedPackages = packages
    .filter((p) => p.id !== pkg.id && p.category === pkg.category)
    .slice(0, 3);

  return (
    <article className="pt-24 pb-20 md:pt-28 md:pb-28">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <Link
            href="/paket"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-brand-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke katalog
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-8 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="brand">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: pkg.categoryColor }}
                />
                {pkg.category}
              </Badge>
              <span className="inline-flex items-center gap-1 text-xs text-stone-500">
                <MapPin className="h-3.5 w-3.5" /> Yogyakarta · Magelang
              </span>
            </div>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl text-balance">
              {pkg.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-stone-600 text-pretty">
              {pkg.description}
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <div className="flex items-center gap-1 md:justify-end">
              <Star className="h-5 w-5 fill-accent-500 text-accent-500" />
              <span className="font-display text-xl font-bold text-stone-900">
                {pkg.rating}
              </span>
              <span className="text-stone-500">/ 5</span>
              <span className="ml-1 text-sm text-stone-500">
                ({pkg.reviewCount} ulasan)
              </span>
            </div>
          </div>
        </header>

        {/* Gallery */}
        <div className="grid gap-3 md:grid-cols-4 md:grid-rows-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl md:col-span-2 md:row-span-2 md:aspect-auto">
            <img
              src={pkg.image}
              alt={pkg.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          {[1, 2, 3, 4].slice(0, 4).map((i) => (
            <div
              key={i}
              className="relative hidden aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-stone-200 to-stone-100 md:block"
            >
              <img
                src={`${pkg.image}&sig=${i}`}
                alt={`${pkg.name} gallery ${i}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {i === 4 && (
                <div className="absolute inset-0 grid place-items-center bg-stone-900/40 text-white backdrop-blur-sm">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
                    <Camera className="h-4 w-4" /> Lihat semua foto
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main body grid */}
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          {/* Left - content */}
          <div className="space-y-10 lg:col-span-8">
            {/* Highlights */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-stone-900">
                Highlights
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {pkg.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-white p-4"
                  >
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-stone-800">{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Itinerary */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-stone-900">
                Itinerari
              </h2>
              <ol className="mt-5 space-y-4">
                {[
                  {
                    time: '04:00',
                    title: 'Penjemputan di lokasi',
                    desc: 'Tim Jogja Ride menjemput tepat waktu sesuai titik yang Anda pilih.',
                  },
                  {
                    time: '05:30',
                    title: pkg.highlights[0] || 'Destinasi pertama',
                    desc: 'Saksikan momen terbaik di destinasi utama paket ini.',
                  },
                  {
                    time: '09:00',
                    title: pkg.highlights[1] || 'Destinasi kedua',
                    desc: 'Lanjut ke lokasi berikutnya — driver/local guide bantu jelaskan cerita.',
                  },
                  {
                    time: '13:00',
                    title: 'Makan siang khas Jogja',
                    desc: 'Rekomendasi tempat makan terbaik di sekitar rute.',
                  },
                  {
                    time: '17:00',
                    title: 'Kembali ke titik antar',
                    desc: 'Trip selesai, kembali ke hotel atau lokasi pilihan Anda.',
                  },
                ].map((step, i, arr) => (
                  <li key={i} className="relative flex gap-4 pl-2">
                    {i < arr.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-[1.4rem] top-12 h-full w-px bg-stone-200"
                      />
                    )}
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-xs font-bold text-brand-800 ring-1 ring-brand-100">
                      {step.time}
                    </div>
                    <div className="flex-1 rounded-2xl border border-stone-200 bg-white p-4">
                      <h3 className="font-semibold text-stone-900">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-stone-600">
                        {step.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* What's included */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-stone-900">
                Termasuk dalam paket
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                    <Check className="h-4 w-4" strokeWidth={3} /> Sudah termasuk
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-stone-700">
                    {[
                      'Mobil + BBM + parkir + tol',
                      'Driver tersertifikasi sebagai local guide',
                      'Air mineral & snack ringan',
                      'Asuransi perjalanan',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" strokeWidth={3} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-stone-50/40 p-5">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-stone-700">
                    Belum termasuk
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-stone-600">
                    {['Tiket masuk objek wisata', 'Biaya makan tambahan', 'Pengeluaran pribadi'].map(
                      (item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-stone-400" />
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Right - sticky booking */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-soft">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-xs text-stone-500">Mulai dari</div>
                    <div className="font-display text-3xl font-bold text-stone-900">
                      {formatRupiah(pkg.price)}
                    </div>
                    <div className="text-xs text-stone-500">per grup</div>
                  </div>
                  <Badge tone="success">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Tersedia
                  </Badge>
                </div>

                <ul className="mt-5 space-y-2.5 border-t border-stone-100 pt-5 text-sm">
                  <li className="flex items-center justify-between">
                    <span className="text-stone-500">Durasi</span>
                    <span className="font-medium text-stone-900 inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {pkg.duration}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-stone-500">Kapasitas</span>
                    <span className="font-medium text-stone-900 inline-flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" /> {pkg.groupSize}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-stone-500">Rating</span>
                    <span className="font-medium text-stone-900 inline-flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-accent-500 text-accent-500" />
                      {pkg.rating} ({pkg.reviewCount})
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-stone-500">Mulai dari</span>
                    <span className="font-medium text-stone-900 inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> Besok
                    </span>
                  </li>
                </ul>

                <div className="mt-6 grid gap-2">
                  <Link
                    href={`/booking?package=${pkg.slug}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-800 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/20 transition-all hover:bg-brand-900 hover:-translate-y-0.5"
                  >
                    Booking sekarang
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/trip-advisor"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-700 hover:border-brand-300 hover:text-brand-800"
                  >
                    <Sparkles className="h-4 w-4 text-accent-600" />
                    Tanya AI Advisor
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-stone-200 bg-sand-50 p-5">
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900">
                      Garansi harga terbaik
                    </h4>
                    <p className="mt-1 text-xs text-stone-600">
                      Jika ada paket sejenis lebih murah di tempat lain, kami cocokkan
                      harganya.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="#"
                className="flex items-center gap-3 rounded-3xl border border-stone-200 bg-white p-5 transition-colors hover:border-brand-200"
              >
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-stone-900">
                    Tanya admin via WhatsApp
                  </h4>
                  <p className="text-xs text-stone-500">Respon biasanya &lt; 3 menit</p>
                </div>
              </a>
            </div>
          </aside>
        </div>

        {/* Related packages */}
        {relatedPackages.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl font-semibold text-stone-900">
              Paket serupa
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPackages.map((p) => (
                <Link
                  key={p.id}
                  href={`/paket/${p.slug}`}
                  className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-stone-900">{p.name}</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-display text-lg font-bold text-stone-900">
                        {formatRupiah(p.price)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-stone-500">
                        <Star className="h-3.5 w-3.5 fill-accent-500 text-accent-500" />
                        {p.rating}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>
    </article>
  );
}
