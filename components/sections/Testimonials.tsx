'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Container from '@/components/ui/Container';
import { testimonials } from '@/lib/mock-data';

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 md:py-28">
      <Container>
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-700">
            Testimoni
          </span>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl text-balance">
            Cerita dari yang sudah jalan-jalan.
          </h2>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-50 px-4 py-1.5 text-sm font-medium text-accent-800 ring-1 ring-accent-100">
            <Star className="h-4 w-4 fill-accent-500 text-accent-500" />
            4.9/5 dari 320+ ulasan
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
              className={`relative rounded-3xl border border-stone-200 bg-white p-7 transition-all hover:shadow-xl hover:-translate-y-1 ${
                i % 3 === 1 ? 'lg:translate-y-6' : ''
              }`}
            >
              <Quote className="h-9 w-9 text-brand-100" strokeWidth={1.5} />
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="h-4 w-4 fill-accent-500 text-accent-500"
                  />
                ))}
              </div>
              <blockquote className="mt-4 text-stone-700 leading-relaxed text-pretty">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-stone-100 pt-5">
                <div
                  className="grid h-11 w-11 place-items-center rounded-full text-sm font-semibold text-white shadow"
                  style={{ background: t.avatarBg }}
                  aria-hidden="true"
                >
                  {t.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-stone-900">{t.name}</div>
                  <div className="truncate text-xs text-stone-500">
                    {t.origin} · {t.package}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
