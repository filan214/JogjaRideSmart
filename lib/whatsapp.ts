export const ADMIN_WA_NUMBER = '6281234567890';

export function buildWaUrl(message: string, phone: string = ADMIN_WA_NUMBER): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export type BookingMessageInput = {
  bookingId?: string;
  packageName: string;
  customerName: string;
  travelDate: string;
  departureTime?: string;
  adults: number;
  children: number;
  pickupLocation: string;
  estimatedPrice?: number;
  notes?: string;
};

export function buildBookingMessage(input: BookingMessageInput): string {
  const lines = [
    `Halo Jogja Ride! Saya ingin booking:`,
    '',
    `📦 Paket: ${input.packageName}`,
    `📅 Tanggal: ${input.travelDate}`,
  ];
  if (input.departureTime) lines.push(`⏰ Jam: ${input.departureTime}`);
  const peserta = `${input.adults} dewasa${input.children > 0 ? ` + ${input.children} anak` : ''}`;
  lines.push(`👥 Peserta: ${peserta}`);
  lines.push(`📍 Jemput: ${input.pickupLocation}`);
  lines.push(`📞 Nama: ${input.customerName}`);
  if (input.estimatedPrice) {
    lines.push(`💰 Estimasi: Rp ${input.estimatedPrice.toLocaleString('id-ID')}`);
  }
  if (input.notes) {
    lines.push('', `📝 Catatan: ${input.notes}`);
  }
  if (input.bookingId) {
    lines.push('', `🆔 Ref: ${input.bookingId}`);
  }
  return lines.join('\n');
}
