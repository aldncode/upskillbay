'use client';

import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseClass = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60';

  const variantClass = {
    primary: 'bg-[#4F46E5] text-white shadow-lg shadow-indigo-500/25 hover:bg-[#4338CA] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/30 disabled:hover:scale-100 disabled:hover:translate-y-0 disabled:hover:shadow-lg',
    secondary: 'bg-white text-[#111827] border border-[#E5E7EB] shadow-sm hover:border-[#D1D5DB] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md disabled:hover:scale-100 disabled:hover:translate-y-0 disabled:hover:shadow-sm',
    outline: 'bg-white border border-[#4F46E5] text-[#4F46E5] hover:bg-[#EEF2FF] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-sm disabled:hover:scale-100 disabled:hover:translate-y-0',
  }[variant];

  const sizeClass = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }[size];

  const classes = `${baseClass} ${variantClass} ${sizeClass} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
