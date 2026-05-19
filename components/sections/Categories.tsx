'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Mountain,
  Building2,
  UtensilsCrossed,
  Waves,
  Castle,
  Flame,
  ArrowRight,
} from 'lucide-react';
import Container from '@/components/ui/Container';

const categories = [
  {
    icon: Building2,
    name: 'Candi & Budaya',
    count: '12 paket',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-700',
    hover: 'group-hover:bg-amber-100',
  },
  {
    icon: Mountain,
    name: 'Alam & Adventure',
    count: '8 paket',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-700',
    hover: 'group-hover:bg-emerald-100',
  },
  {
    icon: UtensilsCrossed,
    name: 'Kuliner Jogja',
    count: '6 paket',
    bg: 'bg-orange-50',
    iconColor: 'text-orange-700',
    hover: 'group-hover:bg-orange-100',
  },
  {
    icon: Castle,
    name: 'Kraton & Sejarah',
    count: '5 paket',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-700',
    hover: 'group-hover:bg-purple-100',
  },
  {
    icon: Waves,
    name: 'Pantai Selatan',
    count: '7 paket',
    bg: 'bg-sky-50',
    iconColor: 'text-sky-700',
    hover: 'group-hover:bg-sky-100',
  },
  {
    icon: Flame,
    name: 'Merapi Adventure',
    count: '4 paket',
    bg: 'bg-red-50',
    iconColor: 'text-red-700',
    hover: 'group-hover:bg-red-100',
  },
];

export default function Categories() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-700">
              Eksplor Kategori
            </span>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl text-balance">
              Pilih kategori sesuai gaya wisatamu.
            </h2>
          </div>
          <Link
            href="/paket"
            className="hidden items-center gap-1 text-sm font-semibold text-brand-800 hover:text-brand-900 md:inline-flex"
          >
            Lihat semua paket
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
            >
              <Link
                href="/paket"
                className="group relative block overflow-hidden rounded-2xl border border-stone-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-stone-300"
              >
                <div
                  className={`grid h-12 w-12 place-items-center rounded-xl ${cat.bg} ${cat.hover} transition-colors`}
                >
                  <cat.icon className={`h-6 w-6 ${cat.iconColor}`} />
                </div>
                <div className="mt-4 text-sm font-semibold text-stone-900">{cat.name}</div>
                <div className="mt-0.5 text-xs text-stone-500">{cat.count}</div>
                <div className="absolute right-4 top-4 opacity-0 transition-all group-hover:right-3 group-hover:opacity-100">
                  <ArrowRight className="h-4 w-4 text-stone-400" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
