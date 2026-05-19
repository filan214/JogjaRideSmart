'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, Star, Heart } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { formatRupiah } from '@/lib/utils';
import { packages } from '@/lib/mock-data';

export default function FeaturedPackages() {
  return (
    <section id="packages" className="bg-sand-50 py-20 md:py-28">
      <Container>
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-700">
              Paket Unggulan
            </span>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl text-balance">
              Paling banyak dipesan bulan ini.
            </h2>
            <p className="mt-4 max-w-xl text-stone-600">
              Dipilih dari ratusan paket berdasarkan rating, jumlah pemesanan, dan
              kepuasan tamu yang sudah pulang.
            </p>
          </div>
          <a
            href="#"
            className="hidden items-center gap-1 text-sm font-semibold text-brand-800 hover:text-brand-900 md:inline-flex"
          >
            Semua paket
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <motion.article
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-stone-900/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading={i < 3 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-stone-900/0 to-transparent" />
                <button
                  aria-label="Tambah ke favorit"
                  className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur transition-all hover:bg-white hover:scale-110"
                >
                  <Heart className="h-4 w-4 text-stone-700" />
                </button>
                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-stone-900 backdrop-blur">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: pkg.categoryColor }}
                  />
                  {pkg.category}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-xl font-semibold leading-tight text-white drop-shadow-md">
                    {pkg.name}
                  </h3>
                </div>
              </div>

              <div className="p-5">
                <p className="line-clamp-2 text-sm leading-relaxed text-stone-600">
                  {pkg.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-stone-500">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {pkg.duration}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {pkg.groupSize}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-accent-500 text-accent-500" />
                    {pkg.rating}
                    <span className="text-stone-400">({pkg.reviewCount})</span>
                  </span>
                </div>
                <div className="mt-5 flex items-end justify-between border-t border-stone-100 pt-4">
                  <div>
                    <div className="text-xs text-stone-500">Mulai dari</div>
                    <div className="font-display text-2xl font-bold leading-none text-stone-900">
                      {formatRupiah(pkg.price)}
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-1.5 rounded-full bg-brand-800 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-brand-900 hover:gap-2.5">
                    Booking
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Button variant="outline" size="lg">
            Lihat Semua Paket
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
