'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarCheck,
  Package as PackageIcon,
  MessageSquareQuote,
  Settings,
  LogOut,
  Sparkles,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Ringkasan', icon: LayoutDashboard, exact: true },
  { href: '/admin/pesanan', label: 'Pesanan', icon: CalendarCheck },
  { href: '/admin/paket', label: 'Paket', icon: PackageIcon },
  { href: '/admin/testimoni', label: 'Testimoni', icon: MessageSquareQuote },
  { href: '/admin/pengaturan', label: 'Pengaturan', icon: Settings },
];

export default function AdminSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  const isActive = (item: (typeof navItems)[number]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <>
      {open && (
        <button
          onClick={onClose}
          aria-label="Tutup sidebar"
          className="fixed inset-0 z-30 bg-stone-900/40 backdrop-blur-sm lg:hidden"
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-stone-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-800 text-white shadow-md shadow-brand-900/20">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="font-display text-base font-semibold text-stone-900 leading-tight">
                Jogja Ride
              </div>
              <div className="text-[10px] uppercase tracking-wider text-stone-500">
                Admin Panel
              </div>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-stone-100 lg:hidden"
            aria-label="Tutup"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-stone-400">
            Menu utama
          </div>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                      active
                        ? 'bg-brand-800 text-white shadow-md shadow-brand-900/20'
                        : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                    )}
                  >
                    <Icon className="h-4.5 w-4.5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-stone-200 p-4">
          <div className="rounded-2xl bg-gradient-to-br from-brand-50 to-emerald-50 p-4 ring-1 ring-brand-100">
            <div className="text-xs font-semibold text-brand-900">Mode demo</div>
            <p className="mt-1 text-[11px] leading-relaxed text-brand-800/80">
              Data ditampilkan dari mock — perubahan tidak tersimpan permanen.
            </p>
          </div>
          <Link
            href="/admin/login"
            className="mt-3 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-100 hover:text-stone-900"
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </Link>
        </div>
      </aside>
    </>
  );
}
