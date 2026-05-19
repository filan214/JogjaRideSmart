'use client';

import { useState } from 'react';
import { Save, CheckCircle, Car, Phone, Mail, MapPin } from 'lucide-react';
import { initialPricingRules, vehicleOptions as initialVehicles, type PricingRule } from '@/lib/admin-mock';
import { cn } from '@/lib/utils';

export default function AdminPengaturanPage() {
  const [rules, setRules] = useState<PricingRule[]>(initialPricingRules);
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [contact, setContact] = useState({
    waNumber: '+62 812-3456-7890',
    email: 'admin@jogjaride.id',
    address: 'Jl. Malioboro No. 50, Yogyakarta 55213',
  });
  const [saved, setSaved] = useState(false);

  const toggleRule = (id: string) =>
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );

  const updateValue = (id: string, value: number) =>
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, value } : r)));

  const toggleVehicle = (id: string) =>
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, active: !v.active } : v))
    );

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2400);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-stone-900">
            Pengaturan
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            Atur aturan harga dinamis, kendaraan, dan info kontak.
          </p>
        </div>
        <button
          onClick={handleSave}
          className={cn(
            'inline-flex items-center gap-2 self-start rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all',
            saved
              ? 'bg-emerald-600 shadow-emerald-900/20'
              : 'bg-brand-800 shadow-brand-900/20 hover:bg-brand-900'
          )}
        >
          {saved ? (
            <>
              <CheckCircle className="h-4 w-4" />
              Tersimpan
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Simpan perubahan
            </>
          )}
        </button>
      </div>

      {/* Pricing rules */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-semibold text-stone-900">
          Aturan harga
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Aturan ini diterapkan otomatis ke setiap booking sesuai kondisi.
        </p>

        <div className="mt-5 space-y-4">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className={cn(
                'rounded-2xl border p-5 transition-all',
                rule.active
                  ? 'border-brand-200 bg-brand-50/40'
                  : 'border-stone-200 bg-stone-50/40'
              )}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-stone-900">{rule.label}</h3>
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset',
                        rule.active
                          ? 'bg-emerald-100 text-emerald-800 ring-emerald-200'
                          : 'bg-stone-200 text-stone-600 ring-stone-300'
                      )}
                    >
                      {rule.active ? 'AKTIF' : 'NONAKTIF'}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-stone-600">{rule.description}</p>
                  {rule.config && (
                    <p className="mt-1 text-xs text-stone-500">
                      Berlaku: {rule.config}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={1}
                      value={rule.value}
                      onChange={(e) =>
                        updateValue(rule.id, Number(e.target.value))
                      }
                      className="w-14 bg-transparent text-right font-display text-lg font-bold text-stone-900 focus:outline-none"
                    />
                    <span className="text-sm text-stone-500">{rule.unit}</span>
                  </div>

                  <Switch
                    checked={rule.active}
                    onChange={() => toggleRule(rule.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vehicles */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Car className="h-5 w-5 text-brand-700" />
          <h2 className="font-display text-lg font-semibold text-stone-900">
            Kendaraan tersedia
          </h2>
        </div>
        <p className="mt-1 text-sm text-stone-600">
          Toggle ketersediaan kendaraan untuk dipilih oleh AI Advisor & booking.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {vehicles.map((v) => (
            <div
              key={v.id}
              className={cn(
                'flex items-center justify-between rounded-2xl border p-4 transition-all',
                v.active
                  ? 'border-stone-200 bg-white'
                  : 'border-stone-200 bg-stone-50 opacity-70'
              )}
            >
              <div>
                <div className="font-semibold text-stone-900">{v.name}</div>
                <div className="text-xs text-stone-500">{v.capacity}</div>
              </div>
              <Switch checked={v.active} onChange={() => toggleVehicle(v.id)} />
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-semibold text-stone-900">
          Info kontak
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Akan ditampilkan di footer & halaman bantuan.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <ContactField
            icon={Phone}
            label="Nomor WhatsApp"
            value={contact.waNumber}
            onChange={(v) => setContact({ ...contact, waNumber: v })}
          />
          <ContactField
            icon={Mail}
            label="Email"
            value={contact.email}
            onChange={(v) => setContact({ ...contact, email: v })}
          />
          <div className="md:col-span-2">
            <ContactField
              icon={MapPin}
              label="Alamat"
              value={contact.address}
              onChange={(v) => setContact({ ...contact, address: v })}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors',
        checked ? 'bg-brand-700' : 'bg-stone-300'
      )}
    >
      <span
        className={cn(
          'inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0.5'
        )}
      />
    </button>
  );
}

function ContactField({
  icon: Icon,
  label,
  value,
  onChange,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-stone-600">
        {label}
      </label>
      <div className="relative mt-1.5">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-10 pr-3.5 text-sm text-stone-900 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>
    </div>
  );
}
