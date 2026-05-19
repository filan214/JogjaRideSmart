'use client';

import { useMemo, useState } from 'react';
import { Search, Sparkles, ArrowDownUp, X } from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import PackageCard from '@/components/packages/PackageCard';
import { packages } from '@/lib/mock-data';

const categories = [
  { slug: 'semua', label: 'Semua' },
  { slug: 'Budaya', label: 'Budaya' },
  { slug: 'Petualangan', label: 'Petualangan' },
  { slug: 'Pantai', label: 'Pantai' },
  { slug: 'Kuliner', label: 'Kuliner' },
  { slug: 'Paket Lengkap', label: 'Paket Lengkap' },
];

type SortKey = 'popular' | 'cheapest' | 'expensive' | 'rating';

const sortLabels: Record<SortKey, string> = {
  popular: 'Terpopuler',
  cheapest: 'Termurah',
  expensive: 'Termahal',
  rating: 'Rating tertinggi',
};

export default function PaketPage() {
  const [category, setCategory] = useState('semua');
  const [sort, setSort] = useState<SortKey>('popular');
  const [query, setQuery] = useState('');
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = packages.slice();
    if (category !== 'semua') list = list.filter((p) => p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case 'cheapest':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'expensive':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return list;
  }, [category, sort, query]);

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sand-100 via-sand-50 to-white" />
      <Container>
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-700">
              Katalog Paket
            </span>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl text-balance">
              Pilih paket impianmu.
            </h1>
            <p className="mt-4 max-w-xl text-stone-600">
              {packages.length} paket wisata premium di Yogyakarta — disusun oleh tim lokal,
              didukung AI Trip Advisor.
            </p>
          </div>
          <Link
            href="/trip-advisor"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 transition-all hover:bg-brand-50 md:w-auto"
          >
            <Sparkles className="h-4 w-4 text-accent-600" />
            Bingung? Tanya AI Advisor
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari paket — Borobudur, Merapi, Pantai..."
              className="block w-full rounded-xl border border-transparent bg-stone-50 py-2.5 pl-11 pr-10 text-sm text-stone-900 placeholder:text-stone-400 focus:border-brand-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-stone-200 text-stone-600 hover:bg-stone-300"
                aria-label="Hapus pencarian"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="inline-flex w-full items-center justify-between gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 hover:border-brand-300 md:w-auto"
            >
              <ArrowDownUp className="h-4 w-4" />
              <span>{sortLabels[sort]}</span>
            </button>
            {sortOpen && (
              <div className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl">
                {(Object.keys(sortLabels) as SortKey[]).map((k) => (
                  <button
                    key={k}
                    onClick={() => {
                      setSort(k);
                      setSortOpen(false);
                    }}
                    className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-stone-50 ${
                      sort === k ? 'bg-brand-50 font-semibold text-brand-800' : 'text-stone-700'
                    }`}
                  >
                    {sortLabels[k]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Category chips */}
        <div className="mb-10 -mx-4 overflow-x-auto px-4 scrollbar-hide">
          <div className="flex gap-2 pb-1">
            {categories.map((c) => {
              const active = category === c.slug;
              return (
                <button
                  key={c.slug}
                  onClick={() => setCategory(c.slug)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    active
                      ? 'bg-brand-800 text-white shadow-md'
                      : 'bg-white text-stone-700 ring-1 ring-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between text-sm text-stone-500">
          <span>
            Menampilkan <strong className="text-stone-900">{filtered.length}</strong> paket
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-stone-200 bg-white p-12 text-center">
            <p className="text-stone-600">
              Tidak ada paket yang cocok. Coba ubah filter atau{' '}
              <Link href="/trip-advisor" className="font-semibold text-brand-800 hover:underline">
                tanya AI Advisor
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
