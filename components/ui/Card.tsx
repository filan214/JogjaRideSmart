import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-3xl border border-stone-200 bg-white shadow-soft',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

export default Card;
