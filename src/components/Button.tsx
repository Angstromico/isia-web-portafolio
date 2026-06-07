import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'white';
  size?: 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-on-primary hover:bg-primary/90',
      outline: 'bg-transparent border border-white/20 text-white hover:bg-white/10',
      white: 'bg-white text-on-surface hover:bg-white/90',
    };

    const sizes = {
      md: 'px-6 py-2 text-sm',
      lg: 'px-10 py-5 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'rounded-lg font-display font-bold uppercase tracking-wider transition-expo scale-100 hover:scale-105 active:scale-95',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
