'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  min: number;
  max: number;
  step?: number;
  value: number;
}

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className, min, max, value, step = 1, ...props }, ref) => {
    const percent = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
    return (
      <div className="relative w-full">
        <div className="h-2 w-full rounded-full bg-stone-200" />
        <div
          className="absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r from-brand-700 to-brand-500"
          style={{ width: `${percent}%` }}
        />
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          className={cn(
            'absolute inset-0 w-full appearance-none bg-transparent cursor-pointer',
            '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-brand-700 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110',
            '[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-brand-700 [&::-moz-range-thumb]:cursor-pointer',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Slider.displayName = 'Slider';

export default Slider;
