'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  disabled = false,
  className = '',
  ariaLabel,
  isLoading = false,
  ...props
}: ButtonProps) {
  const baseClass = 'btn inline-flex items-center justify-center font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60';

  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    accent: 'btn-accent',
    outline: 'btn-outline',
  }[variant];

  const sizeClass = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }[size];

  const classes = `${baseClass} ${variantClass} ${sizeClass} ${className}`;

  const commonProps = {
    className: classes,
    disabled: disabled || isLoading,
    'aria-label': ariaLabel,
    'aria-busy': isLoading,
    ...props,
  };

  if (href && !disabled) {
    return (
      <a 
        href={href} 
        className={classes}
        aria-label={ariaLabel}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center animate-pulse">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </span>
        )}
        <span className={isLoading ? 'opacity-0' : ''}>{children}</span>
      </a>
    );
  }

  return (
    <button {...commonProps}>
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </span>
      )}
      <span className={isLoading ? 'opacity-0' : ''}>{children}</span>
    </button>
  );
}
