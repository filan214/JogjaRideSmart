import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'block w-full rounded-xl border bg-white px-4 py-3 text-sm text-stone-900 transition-all placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:bg-stone-100 disabled:text-stone-500',
        hasError
          ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
          : 'border-stone-200 focus:border-brand-600 focus:ring-brand-200',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export default Input;
