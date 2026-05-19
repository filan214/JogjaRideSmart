'use client';

import { weeklyBookings } from '@/lib/admin-mock';

export default function WeeklyChart() {
  const max = Math.max(...weeklyBookings.map((d) => d.count));
  const padding = { top: 20, right: 16, bottom: 28, left: 16 };
  const w = 600;
  const h = 240;
  const innerW = w - padding.left - padding.right;
  const innerH = h - padding.top - padding.bottom;
  const stepX = innerW / (weeklyBookings.length - 1);

  const points = weeklyBookings.map((d, i) => ({
    x: padding.left + i * stepX,
    y: padding.top + innerH - (d.count / max) * innerH,
    label: d.label,
    count: d.count,
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${
    padding.top + innerH
  } L ${points[0].x} ${padding.top + innerH} Z`;

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-stone-900">
            Pesanan minggu ini
          </h3>
          <p className="text-xs text-stone-500">
            Total {weeklyBookings.reduce((s, d) => s + d.count, 0)} pesanan dalam 7 hari
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full bg-brand-700" />
          <span className="text-stone-600">Pesanan</span>
        </div>
      </div>

      <div className="relative">
        <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full overflow-visible">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#065F46" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#065F46" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
            <line
              key={i}
              x1={padding.left}
              x2={w - padding.right}
              y1={padding.top + innerH * t}
              y2={padding.top + innerH * t}
              stroke="#E7E5E4"
              strokeDasharray="4 4"
              strokeWidth="1"
            />
          ))}

          <path d={areaPath} fill="url(#areaGrad)" />
          <path
            d={linePath}
            fill="none"
            stroke="#065F46"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="4.5" fill="#fff" stroke="#065F46" strokeWidth="2.5" />
              <text
                x={p.x}
                y={p.y - 12}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="#1C1917"
              >
                {p.count}
              </text>
              <text
                x={p.x}
                y={h - 6}
                textAnchor="middle"
                fontSize="11"
                fill="#78716C"
              >
                {p.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
