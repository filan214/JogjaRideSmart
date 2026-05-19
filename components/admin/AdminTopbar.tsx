'use client';

import { Menu, Bell, Search } from 'lucide-react';

export default function AdminTopbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-stone-200 bg-white/80 px-4 backdrop-blur-xl md:px-8">
      <button
        onClick={onMenu}
        aria-label="Buka menu"
        className="grid h-10 w-10 place-items-center rounded-full hover:bg-stone-100 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative hidden flex-1 max-w-md md:block">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
        <input
          type="search"
          placeholder="Cari pesanan, paket, atau pelanggan..."
          className="block w-full rounded-full border border-stone-200 bg-stone-50 py-2.5 pl-10 pr-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-brand-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <button
          aria-label="Notifikasi"
          className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-stone-100"
        >
          <Bell className="h-4.5 w-4.5 text-stone-700" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-2.5 rounded-full bg-stone-50 py-1.5 pl-1.5 pr-3 ring-1 ring-stone-200">
          <div className="grid h-7 w-7 place-items-center rounded-full bg-brand-700 text-xs font-bold text-white">
            AR
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-semibold leading-tight text-stone-900">
              Admin Ride
            </div>
            <div className="text-[10px] text-stone-500">admin@jogjaride.id</div>
          </div>
        </div>
      </div>
    </header>
  );
}
