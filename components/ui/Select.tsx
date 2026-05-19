import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          'block w-full appearance-none rounded-xl border border-stone-200 bg-white px-4 py-3 pr-10 text-sm text-stone-900 transition-all focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-offset-1 disabled:bg-stone-100',
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
    </div>
  )
);
Select.displayName = 'Select';

export default Select;
