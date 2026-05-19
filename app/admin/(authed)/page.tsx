import Link from 'next/link';
import {
  CalendarCheck,
  Wallet,
  Car,
  Star,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import WeeklyChart from '@/components/admin/WeeklyChart';
import StatusBadge from '@/components/admin/StatusBadge';
import { adminStats, adminBookings, topPackages } from '@/lib/admin-mock';
import { formatRupiah, formatRupiahShort } from '@/lib/utils';

export default function AdminDashboardPage() {
  const recent = adminBookings.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-stone-900">
            Selamat datang kembali ✨
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            Ringkasan performa Jogja Ride hari ini, {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}.
          </p>
        </div>
        <Link
          href="/admin/pesanan"
          className="inline-flex items-center gap-2 self-start rounded-full bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-900/20 hover:bg-brand-900"
        >
          Kelola pesanan
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Pesanan bulan ini"
          value={String(adminStats.bookingsThisMonth)}
          icon={CalendarCheck}
          delta={adminStats.bookingsThisMonthDelta}
          tone="brand"
        />
        <StatCard
          label="Revenue"
          value={formatRupiahShort(adminStats.revenue)}
          icon={Wallet}
          delta={adminStats.revenueDelta}
          tone="success"
        />
        <StatCard
          label="Trip hari ini"
          value={String(adminStats.tripsToday)}
          icon={Car}
          hint={`${adminStats.tripsTodayDone} sudah selesai`}
          tone="accent"
        />
        <StatCard
          label="Rating rata-rata"
          value={adminStats.avgRating.toFixed(1)}
          icon={Star}
          hint={`Dari ${adminStats.ratingCount} review`}
          tone="neutral"
        />
      </div>

      {/* Chart + top packages */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <WeeklyChart />
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-brand-700" />
            <h3 className="font-display text-lg font-semibold text-stone-900">
              Paket terlaris
            </h3>
          </div>
          <ul className="space-y-3">
            {topPackages.map((p, i) => (
              <li
                key={p.name}
                className="flex items-center gap-3 rounded-xl bg-stone-50 p-3"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-sm font-bold text-brand-800 ring-1 ring-stone-200">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-stone-900">
                    {p.name}
                  </div>
                  <div className="text-xs text-stone-500">
                    {p.bookings} pesanan · {formatRupiahShort(p.revenue)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent bookings */}
      <div className="rounded-2xl border border-stone-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <div>
            <h3 className="font-display text-lg font-semibold text-stone-900">
              Pesanan terbaru
            </h3>
            <p className="text-xs text-stone-500">5 pesanan paling baru</p>
          </div>
          <Link
            href="/admin/pesanan"
            className="text-xs font-semibold text-brand-800 hover:underline"
          >
            Lihat semua →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-left text-xs uppercase tracking-wider text-stone-500">
                <th className="px-5 py-3 font-medium">ID</th>
                <th className="px-5 py-3 font-medium">Pelanggan</th>
                <th className="px-5 py-3 font-medium">Paket</th>
                <th className="px-5 py-3 font-medium">Tanggal</th>
                <th className="px-5 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-stone-100 last:border-0 hover:bg-stone-50/50"
                >
                  <td className="px-5 py-4 font-mono text-xs text-stone-700">
                    {b.id}
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-medium text-stone-900">
                      {b.customerName}
                    </div>
                    <div className="text-xs text-stone-500">
                      {b.customerPhone}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-stone-700">{b.packageName}</td>
                  <td className="px-5 py-4 text-stone-700">{b.travelDate}</td>
                  <td className="px-5 py-4 font-semibold text-stone-900">
                    {formatRupiah(b.estimatedPrice)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={b.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
