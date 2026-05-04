'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  clickable?: boolean;
}

export default function Card({ children, className = '', clickable = false }: CardProps) {
  const hoverClass = clickable ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md' : '';

  return (
    <div className={`rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition-all duration-200 ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}
