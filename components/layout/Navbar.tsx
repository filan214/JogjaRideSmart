'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';

type NavItem = {
  label: string;
  href: string;
  anchor?: string;
  highlight?: boolean;
};

const navItems: NavItem[] = [
  { label: 'AI Advisor', href: '/trip-advisor', highlight: true },
  { label: 'Paket', href: '/paket', anchor: 'packages' },
  { label: 'Cara Kerja', href: '/', anchor: 'how-it-works' },
  { label: 'Testimoni', href: '/', anchor: 'testimonials' },
  { label: 'FAQ', href: '/', anchor: 'faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isLanding = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Resolve nav item to actual href: if on landing and item has anchor, scroll;
  // otherwise route to page
  const resolveHref = (item: NavItem) => {
    if (item.anchor) {
      return isLanding ? `#${item.anchor}` : item.href === '/' ? `/#${item.anchor}` : item.href;
    }
    return item.href;
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || mobileOpen || !isLanding
          ? 'bg-sand-50/85 backdrop-blur-xl border-b border-stone-200/60 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between md:h-20">
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const href = resolveHref(item);
              const isAnchor = href.startsWith('#');
              const className = cn(
                'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                item.highlight
                  ? 'text-brand-800 hover:bg-brand-50'
                  : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
              );
              const inner = (
                <>
                  {item.highlight && <Sparkles className="h-3.5 w-3.5 text-accent-600" />}
                  {item.label}
                </>
              );
              return (
                <li key={item.label}>
                  {isAnchor ? (
                    <a href={href} className={className}>
                      {inner}
                    </a>
                  ) : (
                    <Link href={href} className={className}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/admin/login"
              className="text-sm font-medium text-stone-700 hover:text-stone-900"
            >
              Masuk
            </Link>
            <Link
              href="/booking"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-brand-800 px-4 text-sm font-semibold text-white shadow-lg shadow-brand-900/20 transition-all hover:bg-brand-900 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" />
              Booking
            </Link>
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
              {navItems.map((item) => {
                const href = resolveHref(item);
                const isAnchor = href.startsWith('#');
                const className =
                  'flex items-center gap-2 rounded-xl px-4 py-3 text-base font-medium text-stone-800 hover:bg-stone-100';
                const inner = (
                  <>
                    {item.highlight && <Sparkles className="h-4 w-4 text-accent-600" />}
                    {item.label}
                  </>
                );
                return (
                  <li key={item.label}>
                    {isAnchor ? (
                      <a
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className={className}
                      >
                        {inner}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className={className}
                      >
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 grid gap-2">
              <Link
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-800 px-6 text-sm font-semibold text-white shadow-lg shadow-brand-900/20"
              >
                <MessageCircle className="h-4 w-4" />
                Booking Sekarang
              </Link>
              <Link
                href="/admin/login"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-stone-300 bg-white/60 px-6 text-sm font-semibold text-stone-900 backdrop-blur"
              >
                Masuk
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
