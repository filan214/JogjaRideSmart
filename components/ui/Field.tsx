import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FieldProps {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
}

export default function Field({
  label,
  hint,
  error,
  required,
  htmlFor,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label htmlFor={htmlFor} className="flex items-center justify-between text-sm font-medium text-stone-800">
          <span>
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </span>
          {hint && !error && <span className="text-xs font-normal text-stone-500">{hint}</span>}
        </label>
      )}
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
