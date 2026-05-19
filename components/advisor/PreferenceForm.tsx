'use client';

import { useState, type FormEvent } from 'react';
import {
  Building2,
  Mountain,
  UtensilsCrossed,
  Castle,
  Waves,
  Flame,
  Sparkles,
  ArrowRight,
  Minus,
  Plus,
} from 'lucide-react';
import Chip from '@/components/ui/Chip';
import Slider from '@/components/ui/Slider';
import Field from '@/components/ui/Field';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { formatRupiah } from '@/lib/utils';

export type AdvisorPreferences = {
  interests: string[];
  budget: number;
  duration: '1 hari' | '2 hari' | 'lebih dari 2 hari';
  groupSize: number;
  originCity: string;
};

const interestOptions = [
  { slug: 'budaya', label: 'Candi & Budaya', icon: <Building2 className="h-4 w-4" /> },
  { slug: 'alam', label: 'Alam & Adventure', icon: <Mountain className="h-4 w-4" /> },
  { slug: 'kuliner', label: 'Kuliner', icon: <UtensilsCrossed className="h-4 w-4" /> },
  { slug: 'kraton', label: 'Kraton & Sejarah', icon: <Castle className="h-4 w-4" /> },
  { slug: 'pantai', label: 'Pantai Selatan', icon: <Waves className="h-4 w-4" /> },
  { slug: 'merapi', label: 'Merapi', icon: <Flame className="h-4 w-4" /> },
];

const durations = ['1 hari', '2 hari', 'lebih dari 2 hari'] as const;

const BUDGET_MIN = 300_000;
const BUDGET_MAX = 5_000_000;
const BUDGET_STEP = 50_000;

export default function PreferenceForm({
  onSubmit,
}: {
  onSubmit: (prefs: AdvisorPreferences) => void;
}) {
  const [interests, setInterests] = useState<string[]>(['budaya']);
  const [budget, setBudget] = useState(1_000_000);
  const [duration, setDuration] = useState<AdvisorPreferences['duration']>('1 hari');
  const [groupSize, setGroupSize] = useState(4);
  const [originCity, setOriginCity] = useState('');

  const toggleInterest = (slug: string) => {
    setInterests((curr) =>
      curr.includes(slug) ? curr.filter((s) => s !== slug) : [...curr, slug]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (interests.length === 0) return;
    onSubmit({ interests, budget, duration, groupSize, originCity });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-stone-200 bg-white p-6 shadow-soft md:p-10"
    >
      <div className="space-y-8">
        {/* Interests */}
        <Field
          label="Minat wisata"
          hint={`Pilih satu atau lebih · ${interests.length} dipilih`}
        >
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((opt) => (
              <Chip
                key={opt.slug}
                label={opt.label}
                icon={opt.icon}
                selected={interests.includes(opt.slug)}
                onToggle={() => toggleInterest(opt.slug)}
              />
            ))}
          </div>
        </Field>

        {/* Budget */}
        <Field label="Budget per grup">
          <div className="space-y-4 pt-1">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-3xl font-semibold text-brand-800">
                {formatRupiah(budget)}
              </span>
              <span className="text-xs text-stone-500">
                untuk {groupSize} orang · {formatRupiah(Math.round(budget / groupSize))}/orang
              </span>
            </div>
            <Slider
              min={BUDGET_MIN}
              max={BUDGET_MAX}
              step={BUDGET_STEP}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              aria-label="Budget per grup"
            />
            <div className="flex justify-between text-xs text-stone-500">
              <span>{formatRupiah(BUDGET_MIN)}</span>
              <span>{formatRupiah(BUDGET_MAX)}+</span>
            </div>
          </div>
        </Field>

        {/* Duration + Group size grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Durasi">
            <div className="grid grid-cols-3 gap-2 rounded-2xl bg-stone-100 p-1">
              {durations.map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                    duration === d
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {d === 'lebih dari 2 hari' ? '> 2 hari' : d}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Jumlah orang">
            <div className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white p-1.5">
              <button
                type="button"
                onClick={() => setGroupSize((g) => Math.max(1, g - 1))}
                className="grid h-10 w-10 place-items-center rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-50"
                disabled={groupSize <= 1}
                aria-label="Kurangi"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="flex-1 text-center">
                <span className="font-display text-2xl font-semibold text-stone-900">
                  {groupSize}
                </span>
                <span className="ml-1 text-sm text-stone-500">orang</span>
              </div>
              <button
                type="button"
                onClick={() => setGroupSize((g) => Math.min(40, g + 1))}
                className="grid h-10 w-10 place-items-center rounded-xl bg-stone-100 hover:bg-stone-200"
                aria-label="Tambah"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </Field>
        </div>

        {/* Origin city */}
        <Field label="Asal kota" hint="Opsional, untuk saran waktu perjalanan">
          <Input
            type="text"
            value={originCity}
            onChange={(e) => setOriginCity(e.target.value)}
            placeholder="Mis. Jakarta, Surabaya, Bandung..."
          />
        </Field>
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 border-t border-stone-100 pt-8 sm:flex-row sm:justify-between">
        <p className="text-xs text-stone-500">
          AI akan merekomendasikan paket berdasarkan preferensimu.
        </p>
        <Button type="submit" size="lg" disabled={interests.length === 0}>
          <Sparkles className="h-4 w-4" />
          Rekomendasikan paket
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
