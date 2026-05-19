'use client';

import Link from 'next/link';
import { ArrowRight, Clock, Users, Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Package } from '@/lib/mock-data';
import { formatRupiah } from '@/lib/utils';

interface RecommendationCardProps {
  pkg: Package;
  reason: string;
  isTopMatch?: boolean;
  delay?: number;
}

export default function RecommendationCard({
  pkg,
  reason,
  isTopMatch = false,
  delay = 0,
}: RecommendationCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-soft"
    >
      <div className="grid sm:grid-cols-[12rem_1fr]">
        <div className="relative aspect-[4/3] sm:aspect-auto">
          <img
            src={pkg.image}
            alt={pkg.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {isTopMatch && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent-500 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-md">
              <Sparkles className="h-3 w-3" /> Top match
            </span>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-brand-700">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: pkg.categoryColor }}
                />
                {pkg.category}
              </span>
              <h3 className="mt-1 font-display text-lg font-semibold leading-tight text-stone-900">
                {pkg.name}
              </h3>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[10px] text-stone-500">Mulai</div>
              <div className="font-display text-lg font-bold text-stone-900">
                {formatRupiah(pkg.price)}
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-xl bg-brand-50/60 px-3 py-2 ring-1 ring-brand-100/60">
            <div className="flex items-start gap-2">
              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-700" />
              <p className="text-xs leading-relaxed text-brand-900">{reason}</p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {pkg.duration}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5" /> {pkg.groupSize}
            </span>
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-accent-500 text-accent-500" />
              {pkg.rating} ({pkg.reviewCount})
            </span>
          </div>

          <div className="mt-4 flex gap-2">
            <Link
              href={`/booking?package=${pkg.slug}`}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-brand-800 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-brand-900 hover:gap-2.5"
            >
              Booking paket ini
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href={`/paket/${pkg.slug}`}
              className="inline-flex items-center justify-center rounded-full border border-stone-200 px-4 py-2.5 text-xs font-semibold text-stone-700 hover:border-brand-300 hover:text-brand-800"
            >
              Detail
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
