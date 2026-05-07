import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'bg-slate-800 border border-gray-700 rounded-lg p-6 shadow-lg',
        className
      )}
      {...props}
    />
  );
};