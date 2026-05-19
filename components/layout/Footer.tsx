import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import { Instagram, MessageCircle, Mail, MapPin, Phone, Facebook, Youtube } from 'lucide-react';

const sections = [
  {
    title: 'Jelajahi',
    links: [
      { label: 'Beranda', href: '#' },
      { label: 'Paket Wisata', href: '#packages' },
      { label: 'AI Advisor', href: '#ai-advisor' },
      { label: 'Testimoni', href: '#testimonials' },
    ],
  },
  {
    title: 'Kategori',
    links: [
      { label: 'Candi & Budaya', href: '#' },
      { label: 'Alam & Adventure', href: '#' },
      { label: 'Kuliner Jogja', href: '#' },
      { label: 'Pantai Selatan', href: '#' },
    ],
  },
  {
    title: 'Bantuan',
    links: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Cara Booking', href: '#how-it-works' },
      { label: 'Kebijakan Privasi', href: '#' },
      { label: 'Syarat & Ketentuan', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-stone-950 text-stone-300">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-brand-700/30 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-accent-600/20 blur-3xl" />
      </div>
      <Container className="relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-stone-400">
              Layanan trip &amp; wisata premium di Yogyakarta. Didukung AI Trip Advisor untuk
              rekomendasi paket yang dipersonalisasi sesuai kebutuhan Anda.
            </p>
            <div className="mt-6 space-y-2.5 text-sm text-stone-400">
              <a href="#" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Phone className="h-4 w-4 text-brand-400" />
                +62 812-3456-7890
              </a>
              <a
                href="mailto:halo@jogjaride.id"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 text-brand-400" />
                halo@jogjaride.id
              </a>
              <p className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-brand-400" />
                Yogyakarta, Indonesia
              </p>
            </div>
            <div className="mt-6 flex gap-2">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: MessageCircle, label: 'WhatsApp' },
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Youtube, label: 'YouTube' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-stone-800 text-stone-300 hover:bg-brand-800 hover:text-white transition-all hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:col-start-6 lg:grid-cols-3">
            {sections.map((s) => (
              <div key={s.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                  {s.title}
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {s.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-stone-400 hover:text-white transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-4 border-t border-stone-800 pt-8 text-sm text-stone-500 sm:flex-row">
          <p>© 2026 Jogja Ride. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Made in <span className="font-medium text-stone-300">Yogyakarta</span> · Powered by{' '}
            <span className="font-medium text-accent-400">AI</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
