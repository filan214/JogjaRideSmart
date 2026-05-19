'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, MessageCircle, Calendar, Clock, MapPin, Users, ArrowRight, Copy, Check } from 'lucide-react';
import Container from '@/components/ui/Container';
import { buildBookingMessage, buildWaUrl } from '@/lib/whatsapp';
import { formatRupiah } from '@/lib/utils';

type StoredBooking = {
  id: string;
  packageSlug: string;
  packageName: string;
  customerName: string;
  customerPhone: string;
  travelDate: string;
  departureTime: string;
  adults: number;
  children: number;
  pickupLocation: string;
  notes: string;
  estimatedPrice: number;
};

export default function BookingSuccessPage() {
  const [booking, setBooking] = useState<StoredBooking | null>(null);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const raw = sessionStorage.getItem('latest_booking');
      if (raw) {
        try {
          setBooking(JSON.parse(raw) as StoredBooking);
        } catch {
          setBooking(null);
        }
      }
    }
  }, []);

  const handleCopy = () => {
    if (!booking) return;
    navigator.clipboard.writeText(booking.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  if (!mounted) {
    return (
      <section className="relative pt-32 pb-20">
        <Container>
          <div className="mx-auto max-w-2xl rounded-3xl border border-stone-200 bg-white p-12 text-center text-stone-500">
            Memuat...
          </div>
        </Container>
      </section>
    );
  }

  if (!booking) {
    return (
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sand-100 via-sand-50 to-white" />
        <Container>
          <div className="mx-auto max-w-2xl rounded-3xl border border-stone-200 bg-white p-12 text-center shadow-soft">
            <h1 className="font-display text-2xl font-semibold text-stone-900">
              Belum ada pesanan
            </h1>
            <p className="mt-2 text-stone-600">
              Sepertinya kamu membuka halaman ini langsung. Mulai dari katalog paket dulu, ya.
            </p>
            <Link
              href="/paket"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-800 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-900"
            >
              Lihat paket
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const waMessage = buildBookingMessage({
    bookingId: booking.id,
    packageName: booking.packageName,
    customerName: booking.customerName,
    travelDate: booking.travelDate,
    departureTime: booking.departureTime,
    adults: booking.adults,
    children: booking.children,
    pickupLocation: booking.pickupLocation,
    estimatedPrice: booking.estimatedPrice,
    notes: booking.notes,
  });
  const waUrl = buildWaUrl(waMessage);

  return (
    <section className="relative pt-28 pb-20 md:pt-32 md:pb-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sand-100 via-sand-50 to-white" />
      <div className="absolute top-32 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl" />

      <Container>
        <div className="mx-auto max-w-2xl">
          {/* Success card */}
          <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl shadow-stone-900/5">
            <div className="relative bg-gradient-to-br from-brand-800 via-brand-700 to-emerald-600 px-8 py-10 text-center text-white">
              <div className="absolute inset-0 dot-pattern opacity-20" />
              <div className="relative">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/15 backdrop-blur ring-4 ring-white/20 animate-fade-in-up">
                  <CheckCircle2 className="h-10 w-10" strokeWidth={2.2} />
                </div>
                <h1 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">
                  Pesanan tercatat!
                </h1>
                <p className="mt-2 text-white/85">
                  Tinggal satu langkah lagi — konfirmasi ke admin via WhatsApp.
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 backdrop-blur ring-1 ring-white/30">
                  <span className="text-xs uppercase tracking-wider text-white/70">Ref</span>
                  <span className="font-mono text-sm font-semibold">{booking.id}</span>
                  <button
                    onClick={handleCopy}
                    aria-label="Salin nomor referensi"
                    className="ml-1 grid h-7 w-7 place-items-center rounded-full bg-white/15 hover:bg-white/25 transition-colors"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="px-8 py-8">
              <h2 className="font-display text-lg font-semibold text-stone-900">
                Ringkasan pesanan
              </h2>

              <div className="mt-4 space-y-3 rounded-2xl bg-stone-50 p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-brand-700 ring-1 ring-stone-200">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-stone-500">Paket</div>
                    <div className="font-medium text-stone-900">{booking.packageName}</div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-brand-700 ring-1 ring-stone-200">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-stone-500">Tanggal & jam</div>
                      <div className="font-medium text-stone-900">
                        {booking.travelDate} · {booking.departureTime}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-brand-700 ring-1 ring-stone-200">
                      <Users className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-stone-500">Peserta</div>
                      <div className="font-medium text-stone-900">
                        {booking.adults} dewasa
                        {booking.children > 0 ? ` + ${booking.children} anak` : ''}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-brand-700 ring-1 ring-stone-200">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-stone-500">Titik jemput</div>
                    <div className="font-medium text-stone-900">{booking.pickupLocation}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-stone-200 pt-3">
                  <span className="text-sm text-stone-600">Estimasi total</span>
                  <span className="font-display text-xl font-bold text-stone-900">
                    {formatRupiah(booking.estimatedPrice)}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition-all hover:bg-[#1ebe57] hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5" />
                Lanjutkan ke WhatsApp
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="mt-3 text-center text-xs text-stone-500">
                Pesan otomatis sudah disiapkan — tinggal klik kirim.
              </p>

              {/* Next steps */}
              <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-stone-900">Apa selanjutnya?</h3>
                <ol className="mt-3 space-y-2 text-sm text-stone-600">
                  <li className="flex gap-2.5">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-800">
                      1
                    </span>
                    Admin akan membalas via WhatsApp dalam &lt; 15 menit.
                  </li>
                  <li className="flex gap-2.5">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-800">
                      2
                    </span>
                    Lakukan pembayaran DP 30% via transfer / QRIS.
                  </li>
                  <li className="flex gap-2.5">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-800">
                      3
                    </span>
                    Driver akan datang sesuai jadwal — siap petualangan!
                  </li>
                </ol>
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Link
                  href="/paket"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50"
                >
                  Lihat paket lain
                </Link>
                <Link
                  href="/"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white hover:bg-stone-800"
                >
                  Kembali ke beranda
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
