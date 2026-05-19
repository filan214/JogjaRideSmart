'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Minus, Plus, ArrowRight, MessageCircle, Star, Clock, Users } from 'lucide-react';
import Field from '@/components/ui/Field';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Badge from '@/components/ui/Badge';
import { packages } from '@/lib/mock-data';
import { calculatePrice } from '@/lib/pricing';
import { formatRupiah } from '@/lib/utils';

function nextDayISO(daysAhead = 1): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().slice(0, 10);
}

function generateBookingId(): string {
  const d = new Date();
  const seq = Math.floor(Math.random() * 99) + 1;
  const yy = String(d.getFullYear()).slice(-2);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `JR-${yy}${mm}${dd}${String(seq).padStart(2, '0')}`;
}

export default function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSlug = searchParams.get('package') || packages[0].slug;

  const [packageSlug, setPackageSlug] = useState(initialSlug);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [travelDate, setTravelDate] = useState(nextDayISO(2));
  const [departureTime, setDepartureTime] = useState('07:00');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [pickupLocation, setPickupLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const selectedPackage =
    packages.find((p) => p.slug === packageSlug) ?? packages[0];

  const breakdown = useMemo(
    () =>
      calculatePrice({
        basePrice: selectedPackage.price,
        groupSize: adults + children,
        travelDate: travelDate ? new Date(travelDate) : null,
        departureTime,
      }),
    [selectedPackage.price, adults, children, travelDate, departureTime]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const booking = {
      id: generateBookingId(),
      packageSlug: selectedPackage.slug,
      packageName: selectedPackage.name,
      customerName,
      customerPhone,
      travelDate,
      departureTime,
      adults,
      children,
      pickupLocation,
      notes,
      estimatedPrice: breakdown.total,
    };

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('latest_booking', JSON.stringify(booking));
    }

    setTimeout(() => router.push('/booking/sukses'), 400);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-12">
      {/* Left - Form */}
      <div className="space-y-6 lg:col-span-7">
        <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-soft md:p-8">
          <h2 className="font-display text-xl font-semibold text-stone-900">
            Paket pilihan
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            Pilih paket atau biarkan tetap dengan rekomendasi.
          </p>

          <div className="mt-5">
            <Field label="Paket" htmlFor="package">
              <Select
                id="package"
                value={packageSlug}
                onChange={(e) => setPackageSlug(e.target.value)}
              >
                {packages.map((p) => (
                  <option key={p.id} value={p.slug}>
                    {p.name} — {formatRupiah(p.price)}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
        </section>

        <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-soft md:p-8">
          <h2 className="font-display text-xl font-semibold text-stone-900">
            Data pemesan
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Nama lengkap" required htmlFor="name">
              <Input
                id="name"
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Mis. Budi Santoso"
              />
            </Field>
            <Field label="Nomor WhatsApp" required htmlFor="phone">
              <Input
                id="phone"
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="0812xxxxxxxx"
                pattern="^(\+62|0)[0-9]{9,13}$"
              />
            </Field>
          </div>
        </section>

        <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-soft md:p-8">
          <h2 className="font-display text-xl font-semibold text-stone-900">
            Detail perjalanan
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Tanggal perjalanan" required htmlFor="date">
              <Input
                id="date"
                type="date"
                required
                min={nextDayISO(1)}
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
              />
            </Field>
            <Field label="Jam keberangkatan" required htmlFor="time">
              <Input
                id="time"
                type="time"
                required
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
              />
            </Field>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Dewasa" htmlFor="adults">
              <div className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white p-1.5">
                <button
                  type="button"
                  onClick={() => setAdults((v) => Math.max(1, v - 1))}
                  className="grid h-10 w-10 place-items-center rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-50"
                  disabled={adults <= 1}
                  aria-label="Kurangi dewasa"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="flex-1 text-center font-display text-xl font-semibold">
                  {adults}
                </span>
                <button
                  type="button"
                  onClick={() => setAdults((v) => v + 1)}
                  className="grid h-10 w-10 place-items-center rounded-lg bg-stone-100 hover:bg-stone-200"
                  aria-label="Tambah dewasa"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </Field>
            <Field label="Anak" htmlFor="children" hint="< 12 tahun">
              <div className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white p-1.5">
                <button
                  type="button"
                  onClick={() => setChildren((v) => Math.max(0, v - 1))}
                  className="grid h-10 w-10 place-items-center rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-50"
                  disabled={children <= 0}
                  aria-label="Kurangi anak"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="flex-1 text-center font-display text-xl font-semibold">
                  {children}
                </span>
                <button
                  type="button"
                  onClick={() => setChildren((v) => v + 1)}
                  className="grid h-10 w-10 place-items-center rounded-lg bg-stone-100 hover:bg-stone-200"
                  aria-label="Tambah anak"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </Field>
          </div>

          <div className="mt-5">
            <Field
              label="Titik jemput"
              required
              htmlFor="pickup"
              hint="Hotel, alamat, atau lokasi spesifik"
            >
              <Input
                id="pickup"
                type="text"
                required
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder="Mis. Hotel Phoenix, Jl. Jenderal Sudirman"
              />
            </Field>
          </div>

          <div className="mt-5">
            <Field label="Catatan tambahan" htmlFor="notes" hint="Opsional">
              <Textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mis. ada penumpang lansia, alergi makanan, request rute khusus..."
              />
            </Field>
          </div>
        </section>
      </div>

      {/* Right - Summary */}
      <aside className="lg:col-span-5">
        <div className="sticky top-24 space-y-4">
          <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-soft">
            <div className="relative aspect-[16/9]">
              <img
                src={selectedPackage.image}
                alt={selectedPackage.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <Badge tone="brand" className="bg-white/95 text-stone-900">
                  {selectedPackage.category}
                </Badge>
                <h3 className="mt-1 font-display text-lg font-semibold text-white">
                  {selectedPackage.name}
                </h3>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 text-xs text-stone-500">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {selectedPackage.duration}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {selectedPackage.groupSize}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-accent-500 text-accent-500" />
                  {selectedPackage.rating}
                </span>
              </div>

              <div className="mt-5 space-y-2 border-t border-stone-100 pt-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-600">Harga dasar</span>
                  <span className="font-medium text-stone-900">
                    {formatRupiah(breakdown.base)}
                  </span>
                </div>
                {breakdown.adjustments.map((adj, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm"
                  >
                    <span
                      className={
                        adj.type === 'subtract'
                          ? 'text-emerald-700'
                          : 'text-amber-700'
                      }
                    >
                      {adj.label}
                    </span>
                    <span
                      className={`font-medium ${
                        adj.type === 'subtract'
                          ? 'text-emerald-700'
                          : 'text-amber-700'
                      }`}
                    >
                      {adj.type === 'subtract' ? '−' : '+'}
                      {formatRupiah(Math.round(adj.amount))}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-end justify-between border-t border-stone-200 pt-5">
                <div>
                  <div className="text-xs text-stone-500">Total estimasi</div>
                  <div className="font-display text-3xl font-bold text-stone-900">
                    {formatRupiah(breakdown.total)}
                  </div>
                </div>
                <span className="text-xs text-stone-500">
                  untuk {adults + children} orang
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-800 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-brand-900/20 transition-all hover:bg-brand-900 hover:-translate-y-0.5 disabled:opacity-60"
              >
                {submitting ? 'Memproses...' : (
                  <>
                    <MessageCircle className="h-4 w-4" />
                    Lanjut ke WhatsApp
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
              <p className="mt-3 text-center text-xs text-stone-500">
                Pesanan akan tercatat & pesan otomatis ke WhatsApp admin.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </form>
  );
}
