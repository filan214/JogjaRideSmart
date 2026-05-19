'use client';

import { useState } from 'react';
import { Eye, EyeOff, Star, Trash2, Quote, Search } from 'lucide-react';
import { testimonials as initialTestimonials, type Testimonial } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

type TestimonialWithVisibility = Testimonial & { visible: boolean };

export default function AdminTestimoniPage() {
  const [items, setItems] = useState<TestimonialWithVisibility[]>(
    initialTestimonials.map((t) => ({ ...t, visible: true }))
  );
  const [query, setQuery] = useState('');

  const toggleVisible = (id: string) => {
    setItems((prev) =>
      prev.map((t) => (t.id === id ? { ...t, visible: !t.visible } : t))
    );
  };

  const handleDelete = (id: string) => {
    if (!confirm('Hapus testimoni ini?')) return;
    setItems((prev) => prev.filter((t) => t.id !== id));
  };

  const filtered = items.filter(
    (t) =>
      !query.trim() ||
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.text.toLowerCase().includes(query.toLowerCase())
  );

  const visibleCount = items.filter((t) => t.visible).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-stone-900">
          Testimoni
        </h1>
        <p className="mt-1 text-sm text-stone-600">
          {visibleCount} dari {items.length} testimoni ditampilkan di landing page.
        </p>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama atau isi testimoni..."
            className="block w-full rounded-xl border border-transparent bg-stone-50 py-2.5 pl-11 pr-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-brand-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((t) => (
          <article
            key={t.id}
            className={cn(
              'relative overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition-all',
              t.visible
                ? 'border-stone-200'
                : 'border-stone-200 bg-stone-50 opacity-70'
            )}
          >
            <Quote className="absolute right-5 top-5 h-7 w-7 text-stone-200" />

            <div className="flex items-start gap-3">
              <div
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full font-bold text-white"
                style={{ background: t.avatarBg }}
              >
                {t.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-stone-900">{t.name}</div>
                <div className="text-xs text-stone-500">{t.origin}</div>
                <div className="mt-1 flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-3.5 w-3.5',
                        i < t.rating
                          ? 'fill-accent-500 text-accent-500'
                          : 'text-stone-200'
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-stone-700 line-clamp-4">
              {t.text}
            </p>

            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-0.5 text-[10px] font-semibold text-brand-800 ring-1 ring-brand-100">
              {t.package}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3">
              <button
                onClick={() => toggleVisible(t.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold',
                  t.visible
                    ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200'
                    : 'bg-stone-100 text-stone-600 ring-1 ring-stone-200'
                )}
              >
                {t.visible ? (
                  <>
                    <Eye className="h-3.5 w-3.5" />
                    Tampil
                  </>
                ) : (
                  <>
                    <EyeOff className="h-3.5 w-3.5" />
                    Tersembunyi
                  </>
                )}
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                className="grid h-8 w-8 place-items-center rounded-full text-stone-500 hover:bg-red-50 hover:text-red-700"
                aria-label="Hapus"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
