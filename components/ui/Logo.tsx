import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Logo({
  className = '',
  variant = 'default',
}: {
  className?: string;
  variant?: 'default' | 'light';
}) {
  return (
    <Link
      href="/"
      className={cn('group flex items-center gap-2.5', className)}
      aria-label="Jogja Ride beranda"
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-800 text-sand-50 shadow-lg shadow-brand-900/20 transition-transform group-hover:rotate-6">
        <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
          <circle cx="22" cy="10" r="3.5" fill="#F59E0B" />
          <path d="M3 26 L10 13 L17 21 L22 16 L29 26 Z" fill="currentColor" />
        </svg>
      </span>
      <span
        className={cn(
          'font-display text-xl font-semibold tracking-tight',
          variant === 'light' ? 'text-white' : 'text-stone-900'
        )}
      >
        <span className="italic">Jogja</span> Ride
      </span>
    </Link>
  );
}
