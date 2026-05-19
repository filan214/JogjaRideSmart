'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-950 via-brand-800 to-brand-700 p-10 text-white md:p-16 lg:p-20"
        >
          {/* Decorations */}
          <div className="absolute inset-0 -z-0 opacity-50">
            <div className="absolute -top-20 right-0 h-[28rem] w-[28rem] rounded-full bg-accent-500/30 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-brand-300/20 blur-3xl" />
          </div>
          <div className="absolute inset-0 dot-pattern opacity-[0.08]" />

          {/* Decorative SVG arc */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 text-accent-400/30"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="0.5" />
          </svg>

          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
              <Sparkles className="h-4 w-4 text-accent-400" />
              Siap memulai?
            </span>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl text-balance">
              Petualangan Jogja-mu menanti.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-stone-200 text-pretty">
              Tanya AI Advisor, dapatkan rekomendasi instan, dan booking via WhatsApp.
              Gratis konsultasi, tanpa kartu kredit.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" variant="accent">
                <Sparkles className="h-4 w-4" />
                Tanya AI Advisor
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:border-white/60 hover:bg-white/20 hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Kami
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone-300">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Konsultasi gratis
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Tanpa registrasi
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Respons &lt; 3 menit
              </span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
