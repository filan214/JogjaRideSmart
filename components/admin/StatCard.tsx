import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StatCard({
  label,
  value,
  icon: Icon,
  delta,
  tone = 'brand',
  hint,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  delta?: number;
  tone?: 'brand' | 'accent' | 'success' | 'neutral';
  hint?: string;
}) {
  const toneClasses: Record<typeof tone, string> = {
    brand: 'bg-brand-50 text-brand-700 ring-brand-100',
    accent: 'bg-accent-50 text-accent-700 ring-accent-100',
    success: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    neutral: 'bg-stone-100 text-stone-700 ring-stone-200',
  };

  const positive = (delta ?? 0) >= 0;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-medium text-stone-500">{label}</div>
          <div className="mt-2 font-display text-3xl font-bold text-stone-900">
            {value}
          </div>
          {hint && <div className="mt-1 text-xs text-stone-500">{hint}</div>}
        </div>
        <div
          className={cn(
            'grid h-11 w-11 place-items-center rounded-xl ring-1 ring-inset',
            toneClasses[tone]
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {typeof delta === 'number' && (
        <div className="mt-4 flex items-center gap-1.5 text-xs">
          <span
            className={cn(
              'inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 font-semibold',
              positive
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-red-50 text-red-700'
            )}
          >
            {positive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {Math.abs(delta)}%
          </span>
          <span className="text-stone-500">vs bulan lalu</span>
        </div>
      )}
    </div>
  );
}
