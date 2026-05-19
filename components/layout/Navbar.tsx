'use client';

import { useEffect, useState } from 'react';
import { Menu, X, Sparkles, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';

const navItems = [
  { label: 'AI Advisor', href: '#ai-advisor', highlight: true },
  { label: 'Paket', href: '#packages' },
  { label: 'Cara Kerja', href: '#how-it-works' },
  { label: 'Testimoni', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || mobileOpen
          ? 'bg-sand-50/85 backdrop-blur-xl border-b border-stone-200/60 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between md:h-20">
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    item.highlight
                      ? 'text-brand-800 hover:bg-brand-50'
                      : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                  )}
                >
                  {item.highlight && <Sparkles className="h-3.5 w-3.5 text-accent-600" />}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#"
              className="text-sm font-medium text-stone-700 hover:text-stone-900"
            >
              Masuk
            </a>
            <Button size="sm">
              <MessageCircle className="h-4 w-4" />
              Booking
            </Button>
          </div>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/60 backdrop-blur hover:bg-stone-100 lg:hidden"
            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          className={cn(
            'overflow-hidden transition-[max-height,opacity] duration-300 ease-out lg:hidden',
            mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="border-t border-stone-200/60 py-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-4 py-3 text-base font-medium text-stone-800 hover:bg-stone-100"
                  >
                    {item.highlight && <Sparkles className="h-4 w-4 text-accent-600" />}
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid gap-2">
              <Button className="w-full" size="md">
                <MessageCircle className="h-4 w-4" />
                Booking Sekarang
              </Button>
              <Button className="w-full" variant="outline" size="md">
                Masuk
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
