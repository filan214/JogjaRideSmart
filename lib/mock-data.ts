export type Package = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  groupSize: string;
  rating: number;
  reviewCount: number;
  category: string;
  categoryColor: string;
  image: string;
  highlights: string[];
};

export const packages: Package[] = [
  {
    id: '1',
    slug: 'borobudur-sunrise-kraton',
    name: 'Borobudur Sunrise + Kraton',
    description:
      'Saksikan matahari terbit di candi Buddha terbesar di dunia, dilanjutkan tur Kraton Yogyakarta dan Taman Sari.',
    price: 850000,
    duration: '1 hari',
    groupSize: '1–6 orang',
    rating: 4.9,
    reviewCount: 128,
    category: 'Budaya',
    categoryColor: '#D97706',
    image:
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=900&q=80',
    highlights: ['Sunrise Punthuk Setumbu', 'Tur Candi Borobudur', 'Kraton Yogyakarta'],
  },
  {
    id: '2',
    slug: 'merapi-jeep-adventure',
    name: 'Merapi Lava Jeep Adventure',
    description:
      'Petualangan jeep menyusuri jejak letusan Merapi 2010 — bunker Kaliadem, museum Sisa Hartaku, dan offroad track.',
    price: 650000,
    duration: '4 jam',
    groupSize: '1–4 orang',
    rating: 4.8,
    reviewCount: 94,
    category: 'Petualangan',
    categoryColor: '#DC2626',
    image:
      'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=900&q=80',
    highlights: ['Lava tour jeep', 'Bunker Kaliadem', 'The Lost World Castle'],
  },
  {
    id: '3',
    slug: 'pantai-selatan-gunungkidul',
    name: 'Pantai Selatan Gunungkidul',
    description:
      'Eksplor 3 pantai eksotis: Indrayanti, Drini, dan Timang dengan gondola legendaris di atas tebing.',
    price: 750000,
    duration: '1 hari',
    groupSize: '1–6 orang',
    rating: 4.9,
    reviewCount: 156,
    category: 'Pantai',
    categoryColor: '#0EA5E9',
    image:
      'https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=900&q=80',
    highlights: ['Pantai Indrayanti', 'Timang Gondola', 'Sunset HeHa Ocean View'],
  },
  {
    id: '4',
    slug: 'prambanan-ramayana-ballet',
    name: 'Prambanan + Ramayana Ballet',
    description:
      'Sore santai di candi Hindu terbesar di Indonesia, dilanjutkan pertunjukan Ramayana Ballet di panggung terbuka.',
    price: 950000,
    duration: '1 hari',
    groupSize: '1–6 orang',
    rating: 4.9,
    reviewCount: 87,
    category: 'Budaya',
    categoryColor: '#D97706',
    image:
      'https://images.unsplash.com/photo-1584810359583-96fc9a91fbc4?auto=format&fit=crop&w=900&q=80',
    highlights: ['Candi Prambanan', 'Ramayana Ballet', 'Makan malam tradisional'],
  },
  {
    id: '5',
    slug: 'kuliner-malioboro-night',
    name: 'Kuliner Malioboro Night Tour',
    description:
      'Jelajahi 5 spot kuliner legendaris Jogja malam hari — dari gudeg Yu Djum hingga kopi joss di Tugu.',
    price: 450000,
    duration: '5 jam',
    groupSize: '1–6 orang',
    rating: 4.7,
    reviewCount: 73,
    category: 'Kuliner',
    categoryColor: '#EA580C',
    image:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80',
    highlights: ['Gudeg Yu Djum', 'Sate Klathak Pak Pong', 'Kopi Joss Tugu'],
  },
  {
    id: '6',
    slug: 'jogja-istimewa-2-hari',
    name: 'Jogja Istimewa 2 Hari',
    description:
      'Paket lengkap 2 hari 1 malam — Borobudur, Prambanan, Malioboro, Pantai Selatan. Termasuk penginapan & makan.',
    price: 2400000,
    duration: '2 hari',
    groupSize: '2–6 orang',
    rating: 4.9,
    reviewCount: 112,
    category: 'Paket Lengkap',
    categoryColor: '#065F46',
    image:
      'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=900&q=80',
    highlights: ['4 destinasi utama', 'Hotel ★★★', 'All-in dengan makan'],
  },
];

export type Testimonial = {
  id: string;
  name: string;
  origin: string;
  rating: number;
  text: string;
  package: string;
  avatarBg: string;
};

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    origin: 'Jakarta',
    rating: 5,
    text: 'AI Advisor benar-benar membantu! Direkomendasikan paket Borobudur Sunrise yang cocok banget untuk keluarga. Driver-nya ramah, tepat waktu, dan tahu banyak cerita di balik tiap tempat.',
    package: 'Borobudur Sunrise + Kraton',
    avatarBg: '#D97706',
  },
  {
    id: '2',
    name: 'Lina Wijaya',
    origin: 'Surabaya',
    rating: 5,
    text: 'Booking via WhatsApp super gampang, balasannya cepat. Paket Merapi Jeep seru abis — anak-anak suka, foto-foto dapat banyak. Recommended!',
    package: 'Merapi Lava Jeep',
    avatarBg: '#0F766E',
  },
  {
    id: '3',
    name: 'Ahmad Faisal',
    origin: 'Bandung',
    rating: 5,
    text: 'Bingung mau pilih paket apa, akhirnya tanya AI Advisor. Hasilnya pas banget sama budget dan minat istri saya yang suka pantai. Pelayanan premium dengan harga masuk akal.',
    package: 'Pantai Selatan Gunungkidul',
    avatarBg: '#7C3AED',
  },
  {
    id: '4',
    name: 'Sari Mahardika',
    origin: 'Bali',
    rating: 5,
    text: 'Suami saya orang Jogja, tapi kami tetap pakai Jogja Ride karena prakti dan transparan. Harga jelas dari awal, tidak ada kejutan biaya tambahan.',
    package: 'Jogja Istimewa 2 Hari',
    avatarBg: '#DC2626',
  },
  {
    id: '5',
    name: 'Reza Pratama',
    origin: 'Jakarta',
    rating: 5,
    text: 'Tur kuliner malamnya legendaris. Driver sekaligus jadi local guide, ngajak ke tempat-tempat yang nggak akan ketemu di Google. Mantap.',
    package: 'Kuliner Malioboro Night',
    avatarBg: '#EA580C',
  },
  {
    id: '6',
    name: 'Maya Anggraini',
    origin: 'Medan',
    rating: 5,
    text: 'Sekeluarga 6 orang, butuh mobil yang nyaman dan jadwal yang ringkas. Tim Jogja Ride buatkan itinerary sesuai request — semua kebagian momen.',
    package: 'Jogja Istimewa 2 Hari',
    avatarBg: '#059669',
  },
];

export type FAQ = { q: string; a: string };

export const faqs: FAQ[] = [
  {
    q: 'Bagaimana cara booking di Jogja Ride?',
    a: 'Pilih paket di katalog atau gunakan AI Trip Advisor untuk rekomendasi yang dipersonalisasi. Isi form booking singkat — data tersimpan otomatis — lalu konfirmasi via WhatsApp. Tim kami akan merespons dalam hitungan menit.',
  },
  {
    q: 'Apa itu AI Trip Advisor dan apakah berbayar?',
    a: 'AI Trip Advisor adalah chatbot pintar yang membaca preferensimu (budget, durasi, minat) lalu merekomendasikan paket wisata paling sesuai dari katalog kami. 100% gratis dan tidak butuh registrasi.',
  },
  {
    q: 'Apakah harga sudah termasuk semua biaya?',
    a: 'Harga yang tertera sudah mencakup transportasi (BBM, parkir, tol) dan driver. Tiket masuk objek wisata dan makan biasanya terpisah — semua dijelaskan transparan di halaman detail paket.',
  },
  {
    q: 'Berapa kapasitas kendaraan yang tersedia?',
    a: 'Kami menyediakan Avanza/Innova (1–6 orang), Hiace Commuter (7–14 orang), dan Elf Long (15–18 orang). Pilihan kendaraan akan disesuaikan dengan jumlah penumpang dan rute.',
  },
  {
    q: 'Bisakah membuat paket custom di luar yang tersedia?',
    a: 'Tentu. Setelah booking, sampaikan request khusus via WhatsApp — itinerary, jam jemput, atau destinasi tambahan. Tim kami akan menyesuaikan dengan biaya yang transparan.',
  },
  {
    q: 'Bagaimana kebijakan pembatalan?',
    a: 'Pembatalan H-3 atau lebih: refund penuh. H-2 sampai H-1: refund 50%. Hari-H: tidak ada refund, kecuali ada force majeure (cuaca ekstrem, dll).',
  },
];

export type Category = {
  slug: string;
  name: string;
  count: number;
  iconName: 'building' | 'mountain' | 'food' | 'castle' | 'wave' | 'flame';
};
