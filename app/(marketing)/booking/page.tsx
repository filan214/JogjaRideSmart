import { Suspense } from 'react';
import Container from '@/components/ui/Container';
import BookingForm from '@/components/booking/BookingForm';

export const metadata = {
  title: 'Booking — Jogja Ride',
  description: 'Isi form booking, terhubung langsung ke WhatsApp admin Jogja Ride.',
};

export default function BookingPage() {
  return (
    <section className="relative pt-28 pb-20 md:pt-32 md:pb-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sand-100 via-sand-50 to-white" />
      <Container>
        <div className="mb-10 max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-700">
            Booking
          </span>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl text-balance">
            Selesaikan pesananmu.
          </h1>
          <p className="mt-4 text-stone-600">
            Isi data berikut — pesanan akan tercatat otomatis, lalu kamu akan diarahkan ke
            WhatsApp admin untuk konfirmasi.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="rounded-3xl border border-stone-200 bg-white p-12 text-center text-stone-500">
              Memuat form...
            </div>
          }
        >
          <BookingForm />
        </Suspense>
      </Container>
    </section>
  );
}
