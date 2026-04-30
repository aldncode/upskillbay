'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  clickable?: boolean;
}

export default function Card({ children, className = '', clickable = false }: CardProps) {
  const hoverClass = clickable ? 'cursor-pointer hover:border-[#3B82F6]/50 hover:shadow-lg hover:shadow-[#3B82F6]/10 hover:-translate-y-1' : '';
  return (
    <div className={`bg-[#111827] border border-[#1F2937] rounded-xl p-6 transition-all duration-200 ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}
