'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ArrowRight, Send, Check } from 'lucide-react';
import Container from '@/components/ui/Container';

const features = [
  'Rekomendasi berdasarkan data paket nyata',
  'Pertimbangkan budget, durasi & minat',
  'Maksimal 3 rekomendasi paling relevan',
  'Langsung lanjut ke booking WhatsApp',
];

export default function AIShowcase() {
  return (
    <section
      id="ai-advisor"
      className="relative overflow-hidden py-24 md:py-32 text-white"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800" />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-[0.06]" />
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute top-0 left-1/4 h-[28rem] w-[28rem] rounded-full bg-accent-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl" />
      </div>

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
              <Sparkles className="h-4 w-4 text-accent-400" />
              Powered by Google Gemini
            </span>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem] text-balance">
              Bingung pilih paket? Tanya{' '}
              <span className="italic text-accent-400">AI Advisor</span>.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-200 text-pretty">
              Ceritakan budget, durasi, dan minatmu — AI kami akan memilihkan paket wisata
              terbaik dari katalog Jogja Ride. Bukan rekomendasi karangan, tapi paket yang
              benar-benar tersedia.
            </p>
            <ul className="mt-9 space-y-3.5">
              {features.map((item) => (
                <li key={item} className="flex items-start gap-3 text-stone-100">
                  <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-500/20 ring-1 ring-accent-400/40">
                    <Check className="h-3.5 w-3.5 text-accent-400" strokeWidth={3} />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link
                href="/trip-advisor"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-accent-500 px-7 text-base font-semibold text-white shadow-lg shadow-accent-900/20 transition-all hover:bg-accent-600 hover:-translate-y-0.5"
              >
                <Sparkles className="h-4 w-4" />
                Coba AI Advisor Sekarang
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right — mock chat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-gradient-to-br from-accent-500/30 via-brand-400/20 to-brand-700/0 blur-3xl" />
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white shadow-2xl">
              {/* Chat header */}
              <div className="flex items-center gap-3 bg-gradient-to-r from-brand-800 to-brand-700 px-5 py-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur">
                  <Sparkles className="h-5 w-5 text-accent-300" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">
                    Jogja Ride AI Advisor
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-xs text-brand-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                    Online · biasanya menjawab dalam &lt; 3 detik
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-4 bg-sand-50 p-5 max-h-[26rem] overflow-hidden">
                {/* User msg */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-brand-800 px-4 py-3 text-sm text-white shadow-sm">
                    Budget 1jt untuk 4 orang, 1 hari, suka budaya &amp; sejarah
                  </div>
                </div>

                {/* AI msg */}
                <div className="flex gap-2">
                  <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-800">
                    <Sparkles className="h-4 w-4 text-accent-300" />
                  </div>
                  <div className="max-w-[85%] space-y-3">
                    <div className="rounded-2xl rounded-tl-md border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 shadow-sm">
                      Saya menemukan <strong>2 paket</strong> yang cocok untuk Anda:
                    </div>

                    {/* Recommendation card */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-amber-300 to-orange-500">
                          <span className="absolute inset-0 grid place-items-center text-2xl">
                            🛕
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-semibold text-stone-900">
                              Borobudur Sunrise + Kraton
                            </h4>
                            <span className="shrink-0 rounded-full bg-accent-50 px-2 py-0.5 text-[10px] font-semibold text-accent-700">
                              Top match
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs leading-relaxed text-stone-500">
                            Cocok karena fokus budaya & sesuai budget — sunrise + Kraton.
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-sm font-bold text-brand-800">
                              Rp 850.000
                            </span>
                            <Link
                              href="/booking?package=borobudur-sunrise-kraton"
                              className="inline-flex items-center gap-1 rounded-full bg-brand-800 px-3 py-1 text-[11px] font-semibold text-white hover:bg-brand-900"
                            >
                              Booking <ArrowRight className="h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Recommendation card 2 */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-purple-300 to-purple-600">
                          <span className="absolute inset-0 grid place-items-center text-2xl">
                            🏯
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-semibold text-stone-900">
                            Prambanan + Ramayana Ballet
                          </h4>
                          <p className="mt-0.5 text-xs leading-relaxed text-stone-500">
                            Candi Hindu + pertunjukan budaya — pas untuk pecinta sejarah.
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-sm font-bold text-brand-800">
                              Rp 950.000
                            </span>
                            <Link
                              href="/paket/prambanan-ramayana-ballet"
                              className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-3 py-1 text-[11px] font-semibold text-stone-700 hover:bg-stone-200"
                            >
                              Detail
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Typing indicator */}
                    <div className="flex gap-1 px-2">
                      <span className="h-2 w-2 rounded-full bg-brand-300 animate-bounce [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 rounded-full bg-brand-300 animate-bounce [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 rounded-full bg-brand-300 animate-bounce" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 border-t border-stone-200 bg-white px-4 py-3">
                <input
                  type="text"
                  placeholder="Tanyakan paket impianmu..."
                  disabled
                  className="flex-1 rounded-full bg-stone-100 px-4 py-2.5 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none"
                />
                <button
                  className="grid h-10 w-10 place-items-center rounded-full bg-brand-800 text-white hover:bg-brand-900"
                  aria-label="Kirim"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
