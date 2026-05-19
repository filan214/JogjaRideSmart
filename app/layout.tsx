import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Fraunces } from 'next/font/google';
import './globals.css';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jogja Ride — Trip Advisor AI untuk Wisata Jogja',
  description:
    'Booking paket wisata Jogja jadi mudah. AI Trip Advisor memilih paket terbaik sesuai budget, durasi, dan minatmu — terhubung langsung via WhatsApp.',
  keywords: ['Jogja', 'Yogyakarta', 'wisata', 'paket tour', 'AI trip advisor', 'Borobudur', 'Prambanan'],
  openGraph: {
    title: 'Jogja Ride — Trip Advisor AI',
    description: 'Jelajahi Jogja dengan AI. Booking paket wisata premium dalam hitungan menit.',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
