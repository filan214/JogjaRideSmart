'use client';

import { motion } from 'framer-motion';
import { Search, MessageCircle, MapPinned } from 'lucide-react';
import Container from '@/components/ui/Container';

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Cari atau tanya AI',
    desc: 'Browse katalog paket atau biarkan AI Trip Advisor memilihkan paket terbaik untukmu.',
  },
  {
    num: '02',
    icon: MessageCircle,
    title: 'Booking via WhatsApp',
    desc: 'Isi form singkat — data tersimpan otomatis — lalu konfirmasi langsung ke admin lewat WhatsApp.',
  },
  {
    num: '03',
    icon: MapPinned,
    title: 'Nikmati Jogja',
    desc: 'Driver tersertifikasi menjemput tepat waktu di lokasi pilihanmu. Perjalanan dimulai!',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 md:py-28">
      <Container>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-700">
            Mudah & Cepat
          </span>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl text-balance">
            Tiga langkah, langsung jalan.
          </h2>
          <p className="mt-4 text-lg text-stone-600 text-pretty">
            Dari pencarian sampai duduk di mobil — semua bisa selesai dalam 5 menit.
          </p>
        </div>

        <div className="relative grid gap-10 md:grid-cols-3 md:gap-6">
          {/* Connecting line */}
          <div
            aria-hidden="true"
            className="absolute left-[16.6%] right-[16.6%] top-12 hidden h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent md:block"
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="relative inline-grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-brand-800 to-brand-700 text-white shadow-xl shadow-brand-900/25">
                <step.icon className="h-10 w-10" strokeWidth={1.5} />
                <span className="absolute -right-2 -top-2 grid h-9 w-9 place-items-center rounded-full bg-accent-500 text-xs font-bold text-white shadow-md ring-4 ring-sand-50">
                  {step.num}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-stone-900">
                {step.title}
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-stone-600 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
