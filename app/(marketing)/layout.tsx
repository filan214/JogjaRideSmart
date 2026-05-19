import type { ReactNode } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-brand-800 focus:px-4 focus:py-2 focus:text-white"
      >
        Lewati ke konten
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
