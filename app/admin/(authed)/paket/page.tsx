'use client';

import { useMemo, useState } from 'react';
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  X,
  Clock,
  Users,
  Star,
  Tag,
  ImageIcon,
} from 'lucide-react';
import { packages as initialPackages, type Package } from '@/lib/mock-data';
import { formatRupiah } from '@/lib/utils';
import { cn } from '@/lib/utils';

type FormState = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  groupSize: string;
  category: string;
  image: string;
  highlights: string;
};

const emptyForm: FormState = {
  id: '',
  slug: '',
  name: '',
  description: '',
  price: 0,
  duration: '1 hari',
  groupSize: '1–6 orang',
  category: 'Budaya',
  image: '',
  highlights: '',
};

export default function AdminPaketPage() {
  const [packages, setPackages] = useState<Package[]>(initialPackages);
  const [query, setQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return packages;
    const q = query.toLowerCase();
    return packages.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [packages, query]);

  const startCreate = () => {
    setEditId(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const startEdit = (p: Package) => {
    setEditId(p.id);
    setForm({
      id: p.id,
      slug: p.slug,
      name: p.name,
      description: p.description,
      price: p.price,
      duration: p.duration,
      groupSize: p.groupSize,
      category: p.category,
      image: p.image,
      highlights: p.highlights.join(', '),
    });
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Hapus paket ini?')) return;
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const highlights = form.highlights
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editId) {
      setPackages((prev) =>
        prev.map((p) =>
          p.id === editId
            ? {
                ...p,
                slug: form.slug,
                name: form.name,
                description: form.description,
                price: Number(form.price),
                duration: form.duration,
                groupSize: form.groupSize,
                category: form.category,
                image: form.image,
                highlights,
              }
            : p
        )
      );
    } else {
      const newId = String(Math.max(0, ...packages.map((p) => Number(p.id))) + 1);
      setPackages((prev) => [
        ...prev,
        {
          id: newId,
          slug: form.slug || newId,
          name: form.name,
          description: form.description,
          price: Number(form.price),
          duration: form.duration,
          groupSize: form.groupSize,
          rating: 4.8,
          reviewCount: 0,
          category: form.category,
          categoryColor: '#065F46',
          image:
            form.image ||
            'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=900&q=80',
          highlights,
        },
      ]);
    }
    setFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-stone-900">
            Paket Wisata
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            {packages.length} paket aktif — tambah, edit, atau hapus paket sesuai kebutuhan.
          </p>
        </div>
        <button
          onClick={startCreate}
          className="inline-flex items-center gap-2 self-start rounded-full bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-900/20 hover:bg-brand-900"
        >
          <Plus className="h-4 w-4" />
          Tambah paket
        </button>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari paket atau kategori..."
            className="block w-full rounded-xl border border-transparent bg-stone-50 py-2.5 pl-11 pr-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-brand-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <article
            key={p.id}
            className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all hover:shadow-md"
          >
            <div className="relative aspect-[4/3]">
              <img
                src={p.image}
                alt={p.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute left-3 top-3">
                <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-stone-800 backdrop-blur">
                  {p.category}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-display text-base font-semibold text-stone-900 line-clamp-1">
                {p.name}
              </h3>
              <div className="mt-2 flex items-center gap-3 text-xs text-stone-500">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {p.duration}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {p.groupSize}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3 w-3 fill-accent-500 text-accent-500" />
                  {p.rating}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-3">
                <div className="font-display text-lg font-bold text-stone-900">
                  {formatRupiah(p.price)}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => startEdit(p)}
                    className="grid h-8 w-8 place-items-center rounded-full border border-stone-200 text-stone-700 hover:border-brand-300 hover:text-brand-800"
                    aria-label="Edit"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="grid h-8 w-8 place-items-center rounded-full border border-stone-200 text-stone-700 hover:border-red-300 hover:text-red-700"
                    aria-label="Hapus"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center text-stone-500">
          Tidak ada paket yang cocok.
        </div>
      )}

      {/* Form Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setFormOpen(false)}
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
            aria-label="Tutup"
          />
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200 bg-white/95 px-6 py-4 backdrop-blur">
              <h2 className="font-display text-xl font-semibold text-stone-900">
                {editId ? 'Edit paket' : 'Tambah paket baru'}
              </h2>
              <button
                onClick={() => setFormOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-stone-100"
                aria-label="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
              <FormField label="Nama paket" required>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputCls}
                  placeholder="Mis. Borobudur Sunrise + Kraton"
                />
              </FormField>

              <FormField label="Slug" hint="Otomatis dari nama jika kosong">
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className={inputCls}
                  placeholder="borobudur-sunrise-kraton"
                />
              </FormField>

              <FormField label="Deskripsi" required>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className={inputCls}
                  placeholder="Deskripsi singkat tentang paket..."
                />
              </FormField>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Harga (Rp)" required>
                  <input
                    type="number"
                    required
                    min={0}
                    step={50000}
                    value={form.price || ''}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className={inputCls}
                    placeholder="850000"
                  />
                </FormField>
                <FormField label="Kategori" required>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className={inputCls}
                  >
                    <option value="Budaya">Budaya</option>
                    <option value="Petualangan">Petualangan</option>
                    <option value="Pantai">Pantai</option>
                    <option value="Kuliner">Kuliner</option>
                    <option value="Paket Lengkap">Paket Lengkap</option>
                  </select>
                </FormField>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Durasi" required>
                  <input
                    type="text"
                    required
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className={inputCls}
                    placeholder="1 hari"
                  />
                </FormField>
                <FormField label="Kapasitas grup" required>
                  <input
                    type="text"
                    required
                    value={form.groupSize}
                    onChange={(e) => setForm({ ...form, groupSize: e.target.value })}
                    className={inputCls}
                    placeholder="1–6 orang"
                  />
                </FormField>
              </div>

              <FormField label="URL Gambar" hint="Link gambar (jpg/png/webp)">
                <div className="relative">
                  <ImageIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className={cn(inputCls, 'pl-10')}
                    placeholder="https://..."
                  />
                </div>
              </FormField>

              <FormField label="Highlights" hint="Pisahkan dengan koma">
                <div className="relative">
                  <Tag className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-stone-400" />
                  <textarea
                    rows={2}
                    value={form.highlights}
                    onChange={(e) => setForm({ ...form, highlights: e.target.value })}
                    className={cn(inputCls, 'pl-10')}
                    placeholder="Sunrise Punthuk Setumbu, Tur Candi Borobudur, Kraton"
                  />
                </div>
              </FormField>

              <div className="flex items-center justify-end gap-2 border-t border-stone-200 pt-5">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-900"
                >
                  {editId ? 'Simpan perubahan' : 'Tambah paket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const inputCls =
  'block w-full rounded-xl border border-stone-200 bg-white py-2.5 px-3.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-200';

function FormField({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-stone-600">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {hint && <p className="mt-1 text-xs text-stone-500">{hint}</p>}
    </div>
  );
}
