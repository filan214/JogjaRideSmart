'use client';

import { useMemo, useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Phone,
  X,
  MapPin,
  Users,
  Clock,
  Calendar,
  StickyNote,
} from 'lucide-react';
import StatusBadge from '@/components/admin/StatusBadge';
import {
  adminBookings as initialBookings,
  type AdminBooking,
  type BookingStatus,
} from '@/lib/admin-mock';
import { formatRupiah } from '@/lib/utils';
import { cn } from '@/lib/utils';

type Filter = 'all' | BookingStatus;

const filters: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Semua' },
  { key: 'pending', label: 'Menunggu' },
  { key: 'confirmed', label: 'Dikonfirmasi' },
  { key: 'selesai', label: 'Selesai' },
  { key: 'dibatalkan', label: 'Dibatalkan' },
];

export default function AdminPesananPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>(initialBookings);
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<AdminBooking | null>(null);

  const filtered = useMemo(() => {
    let list = bookings;
    if (filter !== 'all') list = list.filter((b) => b.status === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (b) =>
          b.customerName.toLowerCase().includes(q) ||
          b.id.toLowerCase().includes(q) ||
          b.packageName.toLowerCase().includes(q)
      );
    }
    return list;
  }, [bookings, filter, query]);

  const countBy = (s: Filter) =>
    s === 'all'
      ? bookings.length
      : bookings.filter((b) => b.status === s).length;

  const updateStatus = (id: string, status: BookingStatus) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    setSelected((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-stone-900">
            Pesanan
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            Kelola seluruh pesanan dari satu tempat — total {bookings.length} pesanan.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 self-start rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50">
          <Download className="h-4 w-4" />
          Ekspor CSV
        </button>
      </div>

      {/* Filter chips */}
      <div className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama, ID pesanan, atau paket..."
            className="block w-full rounded-xl border border-transparent bg-stone-50 py-2.5 pl-11 pr-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-brand-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="h-4 w-4 shrink-0 text-stone-400" />
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all',
                filter === f.key
                  ? 'bg-brand-800 text-white shadow-md'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              )}
            >
              {f.label}
              <span
                className={cn(
                  'ml-1.5 rounded-full px-1.5 py-0.5 text-[10px]',
                  filter === f.key ? 'bg-white/20' : 'bg-white text-stone-600'
                )}
              >
                {countBy(f.key)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-left text-xs uppercase tracking-wider text-stone-500">
                <th className="px-5 py-3 font-medium">ID</th>
                <th className="px-5 py-3 font-medium">Pelanggan</th>
                <th className="px-5 py-3 font-medium">Paket</th>
                <th className="px-5 py-3 font-medium">Tanggal</th>
                <th className="px-5 py-3 font-medium">Peserta</th>
                <th className="px-5 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 text-right font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-stone-500">
                    Tidak ada pesanan yang cocok dengan filter.
                  </td>
                </tr>
              ) : (
                filtered.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b border-stone-100 last:border-0 transition-colors hover:bg-stone-50/50"
                  >
                    <td className="px-5 py-4 font-mono text-xs text-stone-700">
                      {b.id}
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-stone-900">
                        {b.customerName}
                      </div>
                      <div className="text-xs text-stone-500">{b.customerPhone}</div>
                    </td>
                    <td className="px-5 py-4 text-stone-700">{b.packageName}</td>
                    <td className="px-5 py-4 text-stone-700">
                      {b.travelDate}
                      <div className="text-xs text-stone-500">{b.departureTime}</div>
                    </td>
                    <td className="px-5 py-4 text-stone-700">
                      {b.adults}
                      {b.children > 0 ? `+${b.children}` : ''} org
                    </td>
                    <td className="px-5 py-4 font-semibold text-stone-900">
                      {formatRupiah(b.estimatedPrice)}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelected(b)}
                        className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 hover:border-brand-300 hover:text-brand-800"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Detail
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50">
          <button
            onClick={() => setSelected(null)}
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
            aria-label="Tutup"
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-y-auto bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
              <div>
                <div className="text-xs text-stone-500">Detail pesanan</div>
                <div className="font-mono text-sm font-semibold text-stone-900">
                  {selected.id}
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-stone-100"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 px-6 py-5">
              <div className="rounded-2xl bg-gradient-to-br from-brand-50 to-emerald-50 p-4">
                <StatusBadge status={selected.status} />
                <h3 className="mt-2 font-display text-lg font-semibold text-stone-900">
                  {selected.packageName}
                </h3>
                <p className="text-xs text-stone-500">
                  Dibuat {new Date(selected.createdAt).toLocaleString('id-ID')}
                </p>
              </div>

              <div className="space-y-3 rounded-2xl border border-stone-200 p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Pelanggan
                </div>
                <div className="font-medium text-stone-900">{selected.customerName}</div>
                <a
                  href={`https://wa.me/${selected.customerPhone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-brand-800 hover:underline"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {selected.customerPhone}
                </a>
              </div>

              <div className="space-y-3 rounded-2xl border border-stone-200 p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Detail perjalanan
                </div>
                <Row icon={Calendar} label="Tanggal" value={selected.travelDate} />
                <Row icon={Clock} label="Jam jemput" value={selected.departureTime} />
                <Row
                  icon={Users}
                  label="Peserta"
                  value={`${selected.adults} dewasa${
                    selected.children > 0 ? ` + ${selected.children} anak` : ''
                  }`}
                />
                <Row icon={MapPin} label="Jemput di" value={selected.pickupLocation} />
                {selected.notes && (
                  <Row icon={StickyNote} label="Catatan" value={selected.notes} />
                )}
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-stone-200 p-4">
                <span className="text-sm text-stone-600">Estimasi total</span>
                <span className="font-display text-xl font-bold text-stone-900">
                  {formatRupiah(selected.estimatedPrice)}
                </span>
              </div>

              {/* Status actions */}
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Aksi cepat
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {selected.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(selected.id, 'confirmed')}
                        className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-800 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-900"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Konfirmasi pesanan
                      </button>
                      <button
                        onClick={() => updateStatus(selected.id, 'dibatalkan')}
                        className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50"
                      >
                        <XCircle className="h-4 w-4" />
                        Batalkan
                      </button>
                    </>
                  )}
                  {selected.status === 'confirmed' && (
                    <>
                      <button
                        onClick={() => updateStatus(selected.id, 'selesai')}
                        className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Tandai selesai
                      </button>
                      <button
                        onClick={() => updateStatus(selected.id, 'dibatalkan')}
                        className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50"
                      >
                        <XCircle className="h-4 w-4" />
                        Batalkan
                      </button>
                    </>
                  )}
                  {(selected.status === 'selesai' ||
                    selected.status === 'dibatalkan') && (
                    <div className="col-span-2 rounded-xl bg-stone-50 px-4 py-3 text-center text-xs text-stone-500">
                      Pesanan sudah {selected.status}. Tidak ada aksi yang tersedia.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5 text-sm">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
      <div className="min-w-0 flex-1">
        <div className="text-xs text-stone-500">{label}</div>
        <div className="text-stone-900">{value}</div>
      </div>
    </div>
  );
}
