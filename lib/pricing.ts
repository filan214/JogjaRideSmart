export const PEAK_SEASON_MARKUP = 0.2;
export const NIGHT_SURCHARGE = 0.15;
export const GROUP_DISCOUNT = 0.1;
export const NIGHT_HOUR_START = 20;
export const GROUP_THRESHOLD = 6;

export type PricingInput = {
  basePrice: number;
  groupSize: number;
  travelDate: Date | null;
  departureTime: string;
};

export type PriceAdjustment = {
  label: string;
  amount: number;
  type: 'add' | 'subtract';
};

export type PriceBreakdown = {
  base: number;
  adjustments: PriceAdjustment[];
  total: number;
};

export function isPeakSeason(date: Date | null): boolean {
  if (!date) return false;
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function isNightDeparture(time: string): boolean {
  if (!time) return false;
  const hour = parseInt(time.split(':')[0] ?? '0', 10);
  return hour >= NIGHT_HOUR_START;
}

export function calculatePrice({
  basePrice,
  groupSize,
  travelDate,
  departureTime,
}: PricingInput): PriceBreakdown {
  const adjustments: PriceAdjustment[] = [];
  let total = basePrice;

  if (isPeakSeason(travelDate)) {
    const amount = basePrice * PEAK_SEASON_MARKUP;
    adjustments.push({ label: 'Peak season (weekend)', amount, type: 'add' });
    total += amount;
  }

  if (isNightDeparture(departureTime)) {
    const amount = basePrice * NIGHT_SURCHARGE;
    adjustments.push({
      label: `Keberangkatan malam (>${NIGHT_HOUR_START}:00)`,
      amount,
      type: 'add',
    });
    total += amount;
  }

  if (groupSize > GROUP_THRESHOLD) {
    const amount = total * GROUP_DISCOUNT;
    adjustments.push({
      label: `Diskon grup (>${GROUP_THRESHOLD} orang)`,
      amount,
      type: 'subtract',
    });
    total -= amount;
  }

  return { base: basePrice, adjustments, total: Math.round(total) };
}
