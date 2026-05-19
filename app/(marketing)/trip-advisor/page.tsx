'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';
import PreferenceForm, { type AdvisorPreferences } from '@/components/advisor/PreferenceForm';
import ChatPanel from '@/components/advisor/ChatPanel';
import { motion, AnimatePresence } from 'framer-motion';

export default function TripAdvisorPage() {
  const [prefs, setPrefs] = useState<AdvisorPreferences | null>(null);

  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-sand-100 via-sand-50 to-white" />
        <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand-100/40 blur-3xl" />
        <div className="absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-accent-100/40 blur-3xl" />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>

      <Container className="max-w-3xl">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200/70 bg-white/70 px-4 py-1.5 text-sm font-medium text-brand-900 backdrop-blur">
            <Sparkles className="h-4 w-4 text-accent-600" />
            AI Trip Advisor
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-stone-900 sm:text-5xl text-balance">
            Ceritakan keinginanmu, <span className="italic gradient-text">AI yang pilihkan</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-stone-600 text-pretty">
            Isi preferensi singkat, AI kami akan merekomendasikan paket wisata Jogja yang paling
            cocok dari katalog kami.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!prefs ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <PreferenceForm onSubmit={setPrefs} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChatPanel preferences={prefs} onReset={() => setPrefs(null)} />
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-8 text-center text-xs text-stone-500">
          AI hanya merekomendasikan paket yang ada di katalog — tidak ada paket fiktif.
        </p>
      </Container>
    </section>
  );
}
