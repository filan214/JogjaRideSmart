'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'accent' | 'ghost' | 'outline' | 'whatsapp';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-800 text-white hover:bg-brand-900 shadow-lg shadow-brand-900/20 hover:shadow-xl hover:shadow-brand-900/30 hover:-translate-y-0.5',
  accent:
    'bg-accent-500 text-white hover:bg-accent-600 shadow-lg shadow-accent-900/20 hover:shadow-xl hover:shadow-accent-900/30 hover:-translate-y-0.5',
  ghost: 'bg-transparent text-brand-900 hover:bg-brand-50',
  outline:
    'border border-stone-300 text-stone-900 hover:border-brand-700 hover:text-brand-800 hover:bg-white bg-white/60 backdrop-blur',
  whatsapp:
    'bg-[#25D366] text-white hover:bg-[#1ebe57] shadow-lg shadow-emerald-900/20',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-14 px-7 text-base',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = 'Button';

export default Button;
