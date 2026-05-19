'use client';

import { motion } from 'framer-motion';
import { Sparkles, Wallet, ShieldCheck, Clock } from 'lucide-react';
import Container from '@/components/ui/Container';

const features = [
  {
    icon: Sparkles,
    title: 'AI Trip Advisor',
    desc: 'Satu-satunya layanan trip Jogja dengan AI yang merekomendasikan paket sesuai kebutuhanmu — bukan generic.',
    accent: 'bg-accent-50 text-accent-700 ring-accent-100',
  },
  {
    icon: Wallet,
    title: 'Transparan & Tanpa Kejutan',
    desc: 'Harga jelas di awal, semua biaya tampak terang. Tidak ada biaya tersembunyi di tengah jalan.',
    accent: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  },
  {
    icon: ShieldCheck,
    title: 'Driver Lokal Tersertifikasi',
    desc: 'Bukan sembarang driver — mengenal Jogja luar dalam, ramah, dan profesional sebagai local guide.',
    accent: 'bg-blue-50 text-blue-700 ring-blue-100',
  },
  {
    icon: Clock,
    title: 'Respons Cepat 24/7',
    desc: 'Booking diproses instan, tim siap merespons kapan pun via WhatsApp — bahkan tengah malam.',
    accent: 'bg-purple-50 text-purple-700 ring-purple-100',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="border-y border-stone-200 bg-sand-50 py-20 md:py-28">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-700">
              Mengapa Kami
            </span>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl text-balance">
              Bukan sekadar antar-jemput, tapi pengalaman.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-stone-600 text-pretty">
              Jogja Ride menggabungkan teknologi AI dengan keahlian guide lokal — agar
              setiap perjalananmu bermakna, hemat, dan bebas pusing.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <div className="font-display text-4xl font-bold text-brand-800">1.5K+</div>
                <div className="mt-1 text-sm text-stone-600">Trip selesai</div>
              </div>
              <div>
                <div className="font-display text-4xl font-bold text-brand-800">4.9</div>
                <div className="mt-1 text-sm text-stone-600">Rating rata-rata</div>
              </div>
              <div>
                <div className="font-display text-4xl font-bold text-brand-800">98%</div>
                <div className="mt-1 text-sm text-stone-600">Booking ulang</div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-stone-300"
              >
                <div
                  className={`grid h-12 w-12 place-items-center rounded-2xl ring-1 ${f.accent}`}
                >
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-stone-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
