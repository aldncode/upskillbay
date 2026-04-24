'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  clickable?: boolean;
}

export default function Card({ children, className = '', clickable = false }: CardProps) {
  const hoverClass = clickable ? 'cursor-pointer hover:scale-105' : '';
  return (
    <div className={`card ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}
