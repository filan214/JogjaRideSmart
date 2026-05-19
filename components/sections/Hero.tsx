'use client';

import { motion } from 'framer-motion';
import { Sparkles, Star, ArrowRight, MapPin, Calendar, Users, Check } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-sand-100 via-sand-50 to-white" />
        <div className="absolute -top-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute top-40 -left-32 h-96 w-96 rounded-full bg-accent-100/50 blur-3xl" />
        <div className="absolute inset-0 dot-pattern opacity-25" />
      </div>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* LEFT — content */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200/70 bg-white/70 px-4 py-1.5 text-sm font-medium text-brand-900 backdrop-blur">
                <Sparkles className="h-4 w-4 text-accent-600" />
                <span>Trip Advisor AI</span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent-500 animate-pulse" />
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 font-display text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-stone-900 sm:text-6xl lg:text-[4.25rem] text-balance"
            >
              Jelajahi pesona{' '}
              <span className="relative inline-block">
                <span className="italic">Jogja</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 12"
                  className="absolute inset-x-0 -bottom-2 h-2.5 w-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9 C 60 -2, 140 -2, 198 9"
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              dengan <span className="gradient-text">cerdas</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-stone-600 text-pretty"
            >
              Biarkan AI memilih paket wisata terbaik sesuai budget, durasi, dan minatmu —
              booking dalam hitungan menit, langsung terhubung ke WhatsApp.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button size="lg" className="group">
                <Sparkles className="h-4 w-4" />
                Mulai dengan AI
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline">
                Lihat Katalog Paket
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['#FED7AA', '#FEF3C7', '#D1FAE5', '#DBEAFE'].map((c, i) => (
                    <div
                      key={i}
                      className="grid h-9 w-9 place-items-center rounded-full text-xs font-semibold text-stone-700 ring-2 ring-sand-50"
                      style={{ background: c }}
                    >
                      {['B', 'L', 'A', 'S'][i]}
                    </div>
                  ))}
                </div>
                <div className="text-sm leading-tight">
                  <div className="font-semibold text-stone-900">1.500+ wisatawan</div>
                  <div className="text-stone-600">memilih Jogja Ride</div>
                </div>
              </div>
              <div className="h-10 w-px bg-stone-200/80 hidden sm:block" />
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-accent-500 text-accent-500"
                    />
                  ))}
                </div>
                <div className="text-sm leading-tight">
                  <span className="font-semibold text-stone-900">4.9/5</span>
                  <span className="text-stone-600"> · 320+ ulasan</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative lg:col-span-6"
          >
            <div className="relative">
              {/* Main hero card */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 shadow-2xl shadow-brand-900/30 ring-1 ring-brand-900/10">
                <img
                  src="https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=1200&q=80"
                  alt="Pemandangan Candi Borobudur saat sunrise"
                  className="absolute inset-0 h-full w-full object-cover opacity-90"
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-900/30 via-transparent to-transparent mix-blend-multiply" />

                {/* Top location pill */}
                <div className="absolute top-6 left-6 flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-medium text-stone-900 shadow-lg backdrop-blur">
                  <MapPin className="h-3.5 w-3.5 text-brand-700" />
                  Magelang · Yogyakarta
                </div>

                {/* Top right rating */}
                <div className="absolute top-6 right-6 flex items-center gap-1 rounded-full bg-stone-950/40 backdrop-blur px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/20">
                  <Star className="h-3.5 w-3.5 fill-accent-400 text-accent-400" />
                  4.9
                </div>

                {/* Bottom package card */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="rounded-2xl bg-white/95 p-5 shadow-2xl backdrop-blur">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-accent-700">
                          Paket Unggulan
                        </div>
                        <h3 className="mt-1 font-display text-lg font-semibold leading-tight text-stone-900">
                          Borobudur Sunrise + Kraton
                        </h3>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-[10px] text-stone-500">Mulai</div>
                        <div className="font-display text-xl font-bold text-stone-900">
                          Rp 850rb
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3">
                      <div className="flex items-center gap-4 text-xs text-stone-600">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          1 hari
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5" />
                          1–6 orang
                        </span>
                      </div>
                      <button className="inline-flex items-center gap-1 rounded-full bg-brand-800 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-brand-900">
                        Booking
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating AI advisor card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-3 top-16 hidden md:block lg:-left-10"
              >
                <div className="w-64 rounded-2xl border border-brand-100/80 bg-white/95 p-4 shadow-2xl backdrop-blur">
                  <div className="flex items-center gap-2.5">
                    <div className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-700 to-brand-900">
                      <Sparkles className="h-4 w-4 text-accent-300" />
                      <span className="absolute -bottom-0.5 -right-0.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-green-500 ring-2 ring-white">
                        <span className="block h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-stone-900">
                        AI Trip Advisor
                      </div>
                      <div className="text-[10px] text-green-700">Online sekarang</div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-stone-600">
                    "Untuk budget 1jt &amp; minat budaya, saya rekomendasikan paket{' '}
                    <span className="font-semibold text-brand-800">
                      Borobudur Sunrise + Kraton
                    </span>
                    ..."
                  </p>
                  <div className="mt-3 flex gap-1">
                    <span className="h-1 w-1.5 rounded-full bg-stone-300" />
                    <span className="h-1 w-3 rounded-full bg-stone-300" />
                    <span className="h-1 w-2 rounded-full bg-stone-300" />
                  </div>
                </div>
              </motion.div>

              {/* Floating booking notif */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -right-2 bottom-40 hidden md:block lg:-right-6"
              >
                <div className="flex items-center gap-3 rounded-2xl border border-stone-100 bg-white px-4 py-3 shadow-xl">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-green-50 ring-1 ring-green-100">
                    <Check className="h-5 w-5 text-green-600" strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-stone-900">
                      Budi baru saja booking
                    </div>
                    <div className="text-[10px] text-stone-500">2 menit yang lalu</div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative dots top-right */}
              <div className="absolute -top-6 -right-6 grid grid-cols-4 gap-1.5 opacity-50">
                {Array.from({ length: 16 }).map((_, i) => (
                  <span
                    key={i}
                    className="block h-1.5 w-1.5 rounded-full bg-brand-700"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
