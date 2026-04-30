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
  const baseClass = 'font-medium rounded-lg transition-all duration-200 inline-flex items-center justify-center';
  
  const variantClass = {
    primary: 'bg-[#111827] border border-[#3B82F6] text-white hover:shadow-lg hover:shadow-[#3B82F6]/20 hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed',
    secondary: 'bg-[#0B0F19] border border-[#1F2937] text-[#9CA3AF] hover:border-[#3B82F6]/30',
    outline: 'bg-transparent border border-[#1F2937] text-white hover:border-[#3B82F6]',
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
