import Container from '@/components/ui/Container';
import { Award, ShieldCheck, MessageCircle, Clock } from 'lucide-react';

const items = [
  {
    icon: ShieldCheck,
    title: 'Garansi Harga Terbaik',
    subtitle: 'Cocok atau uang kembali',
  },
  {
    icon: Award,
    title: 'Driver Tersertifikasi',
    subtitle: 'Lokal, ramah & profesional',
  },
  {
    icon: MessageCircle,
    title: 'Respons Instan',
    subtitle: 'Konfirmasi via WhatsApp',
  },
  {
    icon: Clock,
    title: 'Booking 24/7',
    subtitle: 'Kapan saja, di mana saja',
  },
];

export default function TrustBar() {
  return (
    <section
      aria-label="Keunggulan Jogja Ride"
      className="relative border-y border-stone-200 bg-white/70 backdrop-blur"
    >
      <Container className="py-8 md:py-10">
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-4">
          {items.map(({ icon: Icon, title, subtitle }) => (
            <li key={title} className="flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 ring-1 ring-brand-100">
                <Icon className="h-5 w-5 text-brand-800" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm text-stone-900 leading-tight">
                  {title}
                </div>
                <div className="mt-0.5 text-xs text-stone-600">{subtitle}</div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
