'use client';

import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChipProps {
  label: string;
  icon?: ReactNode;
  selected?: boolean;
  onToggle?: () => void;
  disabled?: boolean;
}

export default function Chip({ label, icon, selected, onToggle, disabled }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        'group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 disabled:cursor-not-allowed disabled:opacity-50',
        selected
          ? 'border-brand-700 bg-brand-800 text-white shadow-sm shadow-brand-900/20'
          : 'border-stone-200 bg-white text-stone-700 hover:border-brand-300 hover:bg-brand-50/40'
      )}
    >
      {selected ? (
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      ) : (
        icon && <span className="text-stone-400 group-hover:text-brand-700">{icon}</span>
      )}
      <span>{label}</span>
    </button>
  );
}
