'use client';

import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'purple' | 'green' | 'yellow';
  className?: string;
}

export default function Badge({ children, variant = 'purple', className = '' }: BadgeProps) {
  const variantClass = {
    purple: 'bg-purple-50 text-purple-700 border border-purple-200',
    green: 'bg-green-50 text-green-700 border border-green-200',
    yellow: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  }[variant];

  return (
    <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${variantClass} ${className}`}>
      {children}
    </span>
  );
}