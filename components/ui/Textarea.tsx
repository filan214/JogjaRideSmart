import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'block w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 transition-all placeholder:text-stone-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:ring-offset-1 disabled:bg-stone-100',
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';

export default Textarea;
