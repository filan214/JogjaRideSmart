import { cn } from '@/lib/utils';
import type { BookingStatus } from '@/lib/admin-mock';

const styles: Record<BookingStatus, { label: string; cls: string; dot: string }> = {
  pending: {
    label: 'Menunggu',
    cls: 'bg-amber-50 text-amber-800 ring-amber-200',
    dot: 'bg-amber-500',
  },
  confirmed: {
    label: 'Dikonfirmasi',
    cls: 'bg-blue-50 text-blue-800 ring-blue-200',
    dot: 'bg-blue-500',
  },
  selesai: {
    label: 'Selesai',
    cls: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
    dot: 'bg-emerald-500',
  },
  dibatalkan: {
    label: 'Dibatalkan',
    cls: 'bg-stone-100 text-stone-600 ring-stone-200',
    dot: 'bg-stone-400',
  },
};

export default function StatusBadge({ status }: { status: BookingStatus }) {
  const s = styles[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
        s.cls
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', s.dot)} />
      {s.label}
    </span>
  );
}
