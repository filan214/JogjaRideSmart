'use client';

import { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowLeft, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { packages, type Package } from '@/lib/mock-data';
import { formatRupiah } from '@/lib/utils';
import RecommendationCard from './RecommendationCard';
import type { AdvisorPreferences } from './PreferenceForm';

const INTEREST_TO_CATEGORY: Record<string, string[]> = {
  budaya: ['Budaya', 'Paket Lengkap'],
  alam: ['Petualangan', 'Pantai'],
  kuliner: ['Kuliner'],
  kraton: ['Budaya'],
  pantai: ['Pantai'],
  merapi: ['Petualangan'],
};

function getRecommendations(prefs: AdvisorPreferences): Package[] {
  const allowedCategories = new Set(
    prefs.interests.flatMap((i) => INTEREST_TO_CATEGORY[i] ?? [])
  );
  const matched = packages.filter(
    (p) => p.price <= prefs.budget * 1.25 && allowedCategories.has(p.category)
  );
  const sorted = matched.sort((a, b) => b.rating - a.rating);
  if (sorted.length >= 2) return sorted.slice(0, 3);
  // Fallback if filter too narrow
  return packages
    .filter((p) => p.price <= prefs.budget * 1.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
}

function buildReason(pkg: Package, prefs: AdvisorPreferences): string {
  const reasons: string[] = [];
  if (pkg.price <= prefs.budget) reasons.push('pas dengan budget');
  else if (pkg.price <= prefs.budget * 1.2) reasons.push('sedikit di atas budget tapi worth it');
  if (prefs.interests.includes('budaya') && pkg.category === 'Budaya')
    reasons.push('fokus pada budaya & sejarah');
  if (prefs.interests.includes('alam') && pkg.category === 'Petualangan')
    reasons.push('petualangan alam yang seru');
  if (prefs.interests.includes('pantai') && pkg.category === 'Pantai')
    reasons.push('view pantai yang ikonik');
  if (prefs.interests.includes('kuliner') && pkg.category === 'Kuliner')
    reasons.push('eksplor kuliner legendaris');
  if (prefs.groupSize > 6) reasons.push(`cocok untuk rombongan ${prefs.groupSize} orang`);
  if (prefs.duration === '1 hari' && pkg.duration.includes('hari'))
    reasons.push('selesai dalam 1 hari');
  return reasons.length > 0
    ? `Cocok karena ${reasons.slice(0, 2).join(' dan ')} — paket ini punya rating ${pkg.rating}/5.`
    : `Paket populer dengan rating tinggi (${pkg.rating}/5) — banyak ditemukan tamu sebelumnya.`;
}

function buildSummary(prefs: AdvisorPreferences, count: number): string {
  const interestLabels = prefs.interests.join(', ');
  return `Berdasarkan preferensimu — budget ${formatRupiah(prefs.budget)} untuk ${
    prefs.groupSize
  } orang, durasi ${prefs.duration}, dan minat ${interestLabels} — saya menemukan ${count} paket yang paling cocok. Berikut rekomendasi terbaik:`;
}

export default function ChatPanel({
  preferences,
  onReset,
}: {
  preferences: AdvisorPreferences;
  onReset: () => void;
}) {
  const recommendations = getRecommendations(preferences);
  const fullSummary = buildSummary(preferences, recommendations.length);

  const [streamedText, setStreamedText] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulate streaming
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i >= fullSummary.length) {
        clearInterval(interval);
        setTimeout(() => setShowRecommendations(true), 400);
        return;
      }
      i += 2;
      setStreamedText(fullSummary.slice(0, i));
    }, 18);
    return () => clearInterval(interval);
  }, [fullSummary]);

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [streamedText, showRecommendations]);

  const userSummary = `Budget ${formatRupiah(preferences.budget)} untuk ${
    preferences.groupSize
  } orang, ${preferences.duration}${
    preferences.originCity ? ` dari ${preferences.originCity}` : ''
  }, minat: ${preferences.interests.join(', ')}.`;

  return (
    <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-soft">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-stone-200 bg-gradient-to-r from-brand-800 to-brand-700 px-5 py-4">
        <button
          onClick={onReset}
          className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Tanya lagi"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="relative grid h-10 w-10 place-items-center rounded-full bg-white/15">
          <Sparkles className="h-5 w-5 text-accent-300" />
          <span className="absolute -bottom-0.5 -right-0.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-green-500 ring-2 ring-brand-800">
            <span className="block h-1.5 w-1.5 rounded-full bg-white" />
          </span>
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-white">Jogja Ride AI Advisor</div>
          <div className="text-xs text-brand-100">Online · Powered by Gemini</div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="space-y-4 bg-sand-50 p-5 max-h-[60vh] overflow-y-auto md:p-6"
      >
        {/* User message */}
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-brand-800 px-4 py-3 text-sm text-white shadow-sm">
            {userSummary}
          </div>
        </div>

        {/* AI message */}
        <div className="flex gap-2">
          <div className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-800">
            <Sparkles className="h-4 w-4 text-accent-300" />
          </div>
          <div className="flex-1 max-w-[85%] space-y-3">
            <div className="rounded-2xl rounded-tl-md border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 shadow-sm">
              {streamedText}
              {streamedText.length < fullSummary.length && (
                <span className="ml-0.5 inline-block h-4 w-1 -mb-0.5 animate-pulse bg-brand-700" />
              )}
            </div>

            {showRecommendations && (
              <>
                <div className="space-y-3">
                  {recommendations.map((pkg, i) => (
                    <RecommendationCard
                      key={pkg.id}
                      pkg={pkg}
                      reason={buildReason(pkg, preferences)}
                      isTopMatch={i === 0}
                      delay={i * 0.15}
                    />
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="rounded-2xl rounded-tl-md border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 shadow-sm"
                >
                  Mau saya carikan opsi lain atau langsung lanjut ke booking salah satu paket
                  di atas? 😊
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 border-t border-stone-200 bg-white px-4 py-3">
        <input
          type="text"
          placeholder="Tanyakan paket lain, atau cek detail..."
          disabled
          className="flex-1 rounded-full bg-stone-100 px-4 py-2.5 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none disabled:cursor-not-allowed"
        />
        <button
          className="grid h-10 w-10 place-items-center rounded-full bg-brand-800 text-white hover:bg-brand-900 disabled:opacity-50"
          aria-label="Kirim"
          disabled
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
