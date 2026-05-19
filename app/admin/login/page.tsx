'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@jogjaride.id');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push('/admin'), 600);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left panel */}
      <div className="relative hidden overflow-hidden bg-brand-900 text-white lg:flex">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-emerald-700" />
        <div className="absolute inset-0 dot-pattern opacity-15" />
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-accent-500/20 blur-3xl" />

        <div className="relative flex flex-col justify-between p-12">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 backdrop-blur ring-1 ring-white/30">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-lg font-semibold leading-tight">
                Jogja Ride
              </div>
              <div className="text-xs text-white/70">Admin Panel</div>
            </div>
          </Link>

          <div>
            <h2 className="font-display text-4xl font-semibold leading-tight">
              Kelola perjalanan,
              <br />
              <span className="italic text-accent-300">satu dashboard.</span>
            </h2>
            <p className="mt-4 max-w-md text-white/75">
              Pantau pesanan, kelola paket, dan atur kebijakan harga — semua dari panel
              modern yang dirancang khusus untuk tim Jogja Ride.
            </p>

            <div className="mt-8 grid gap-3">
              {[
                'Real-time monitoring pesanan',
                'AI Trip Advisor analytics',
                'Kelola harga dinamis tanpa kode',
              ].map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm">
                  <div className="grid h-6 w-6 place-items-center rounded-full bg-white/15 ring-1 ring-white/30">
                    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6.5L5 9.5L10 3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-white/85">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-white/60">
            © 2026 Jogja Ride. Made in Yogyakarta.
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="relative flex items-center justify-center bg-sand-50 p-6 md:p-12">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sand-100 to-sand-50" />

        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 lg:hidden"
          >
            ← Kembali ke beranda
          </Link>

          <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-xl shadow-stone-900/5 md:p-10">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800 ring-1 ring-brand-100">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-700" />
              Admin Login
            </div>
            <h1 className="mt-3 font-display text-3xl font-semibold text-stone-900">
              Selamat datang kembali.
            </h1>
            <p className="mt-2 text-sm text-stone-600">
              Masuk untuk mengelola pesanan & paket wisata.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-wider text-stone-600"
                >
                  Email
                </label>
                <div className="relative mt-1.5">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-xl border border-stone-200 bg-white py-3 pl-10 pr-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-200"
                    placeholder="admin@jogjaride.id"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold uppercase tracking-wider text-stone-600"
                  >
                    Password
                  </label>
                  <a href="#" className="text-xs font-medium text-brand-700 hover:underline">
                    Lupa password?
                  </a>
                </div>
                <div className="relative mt-1.5">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-xl border border-stone-200 bg-white py-3 pl-10 pr-12 text-sm text-stone-900 placeholder:text-stone-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-200"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-stone-500 hover:bg-stone-100"
                    aria-label={showPassword ? 'Sembunyikan' : 'Tampilkan'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2.5 pt-1 text-sm text-stone-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-stone-300 text-brand-700 focus:ring-brand-200"
                  defaultChecked
                />
                Ingat saya selama 30 hari
              </label>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-800 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/20 transition-all hover:bg-brand-900 hover:-translate-y-0.5 disabled:opacity-60"
              >
                {loading ? 'Memproses...' : (
                  <>
                    Masuk dashboard
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 rounded-xl border border-dashed border-stone-300 bg-stone-50 p-3 text-xs text-stone-600">
              <strong className="text-stone-900">Mode demo:</strong> Form sudah terisi.
              Klik <em>Masuk dashboard</em> untuk masuk.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
