export type BookingStatus = 'pending' | 'confirmed' | 'selesai' | 'dibatalkan';

export type AdminBooking = {
  id: string;
  customerName: string;
  customerPhone: string;
  packageName: string;
  travelDate: string;
  departureTime: string;
  adults: number;
  children: number;
  pickupLocation: string;
  estimatedPrice: number;
  status: BookingStatus;
  createdAt: string;
  notes?: string;
};

export const adminBookings: AdminBooking[] = [
  {
    id: 'JR-26051601',
    customerName: 'Budi Santoso',
    customerPhone: '+62 812-3456-7890',
    packageName: 'Borobudur Sunrise + Kraton',
    travelDate: '2026-05-25',
    departureTime: '04:30',
    adults: 3,
    children: 1,
    pickupLocation: 'Hotel Cavinton, Jl. Mangkubumi',
    estimatedPrice: 850000,
    status: 'pending',
    createdAt: '2026-05-16T10:23:00',
    notes: 'Ada yang alergi seafood',
  },
  {
    id: 'JR-26051602',
    customerName: 'Lina Wijaya',
    customerPhone: '+62 851-9876-5432',
    packageName: 'Merapi Lava Jeep Adventure',
    travelDate: '2026-05-22',
    departureTime: '06:00',
    adults: 4,
    children: 0,
    pickupLocation: 'Tugu Yogyakarta',
    estimatedPrice: 650000,
    status: 'confirmed',
    createdAt: '2026-05-15T19:41:00',
  },
  {
    id: 'JR-26051603',
    customerName: 'Ahmad Faisal',
    customerPhone: '+62 813-2222-1111',
    packageName: 'Pantai Selatan Gunungkidul',
    travelDate: '2026-05-20',
    departureTime: '07:00',
    adults: 2,
    children: 2,
    pickupLocation: 'Hotel Royal Ambarrukmo',
    estimatedPrice: 900000,
    status: 'confirmed',
    createdAt: '2026-05-15T14:12:00',
  },
  {
    id: 'JR-26051604',
    customerName: 'Sari Mahardika',
    customerPhone: '+62 819-7654-3210',
    packageName: 'Jogja Istimewa 2 Hari',
    travelDate: '2026-05-18',
    departureTime: '05:00',
    adults: 6,
    children: 0,
    pickupLocation: 'Stasiun Tugu',
    estimatedPrice: 2400000,
    status: 'selesai',
    createdAt: '2026-05-14T09:05:00',
  },
  {
    id: 'JR-26051605',
    customerName: 'Reza Pratama',
    customerPhone: '+62 877-1234-5678',
    packageName: 'Kuliner Malioboro Night Tour',
    travelDate: '2026-05-17',
    departureTime: '18:00',
    adults: 2,
    children: 0,
    pickupLocation: 'Malioboro Mall',
    estimatedPrice: 450000,
    status: 'selesai',
    createdAt: '2026-05-13T20:30:00',
  },
  {
    id: 'JR-26051606',
    customerName: 'Maya Anggraini',
    customerPhone: '+62 856-9999-8888',
    packageName: 'Prambanan + Ramayana Ballet',
    travelDate: '2026-05-30',
    departureTime: '15:00',
    adults: 5,
    children: 1,
    pickupLocation: 'Hotel Tentrem',
    estimatedPrice: 950000,
    status: 'pending',
    createdAt: '2026-05-16T08:11:00',
  },
  {
    id: 'JR-26051607',
    customerName: 'Dewi Kartika',
    customerPhone: '+62 822-3333-4444',
    packageName: 'Borobudur Sunrise + Kraton',
    travelDate: '2026-05-19',
    departureTime: '04:00',
    adults: 2,
    children: 0,
    pickupLocation: 'Hotel Phoenix',
    estimatedPrice: 850000,
    status: 'dibatalkan',
    createdAt: '2026-05-12T16:42:00',
  },
  {
    id: 'JR-26051608',
    customerName: 'Hendro Wibowo',
    customerPhone: '+62 815-2222-7777',
    packageName: 'Jogja Istimewa 2 Hari',
    travelDate: '2026-06-02',
    departureTime: '06:00',
    adults: 4,
    children: 2,
    pickupLocation: 'Bandara YIA',
    estimatedPrice: 2400000,
    status: 'confirmed',
    createdAt: '2026-05-16T13:25:00',
  },
];

export const adminStats = {
  bookingsThisMonth: 87,
  bookingsThisMonthDelta: 12,
  revenue: 68_400_000,
  revenueDelta: 8,
  tripsToday: 3,
  tripsTodayDone: 1,
  avgRating: 4.9,
  ratingCount: 320,
};

export const weeklyBookings = [
  { label: 'Sen', count: 8 },
  { label: 'Sel', count: 12 },
  { label: 'Rab', count: 6 },
  { label: 'Kam', count: 14 },
  { label: 'Jum', count: 18 },
  { label: 'Sab', count: 23 },
  { label: 'Min', count: 16 },
];

export const topPackages = [
  { name: 'Borobudur Sunrise + Kraton', bookings: 23, revenue: 19_550_000 },
  { name: 'Jogja Istimewa 2 Hari', bookings: 18, revenue: 43_200_000 },
  { name: 'Pantai Selatan Gunungkidul', bookings: 15, revenue: 11_250_000 },
];

export type PricingRule = {
  id: string;
  type: 'peak_season' | 'group_discount' | 'night_surcharge';
  label: string;
  description: string;
  active: boolean;
  value: number;
  unit: '%';
  config?: string;
};

export const initialPricingRules: PricingRule[] = [
  {
    id: 'peak',
    type: 'peak_season',
    label: 'Markup Peak Season',
    description: 'Tambahan harga otomatis pada weekend & libur nasional.',
    active: true,
    value: 20,
    unit: '%',
    config: 'Sabtu, Minggu, hari libur nasional',
  },
  {
    id: 'group',
    type: 'group_discount',
    label: 'Diskon Rombongan',
    description: 'Diskon untuk grup besar.',
    active: true,
    value: 10,
    unit: '%',
    config: 'Minimum 7 orang',
  },
  {
    id: 'night',
    type: 'night_surcharge',
    label: 'Surcharge Malam',
    description: 'Tambahan biaya untuk keberangkatan malam.',
    active: false,
    value: 15,
    unit: '%',
    config: 'Mulai pukul 20.00',
  },
];

export const vehicleOptions = [
  { id: 'avanza', name: 'Avanza / Innova', capacity: '1–6 orang', active: true },
  { id: 'hiace', name: 'Hiace Commuter', capacity: '7–14 orang', active: true },
  { id: 'elf', name: 'Elf Long', capacity: '15–18 orang', active: true },
  { id: 'bus', name: 'Bus Medium', capacity: '19–35 orang', active: false },
];
