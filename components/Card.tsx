'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  clickable?: boolean;
  gradient?: boolean;
  editorial?: boolean;
  eco?: boolean;
  ariaLabel?: string;
}

export default function Card({
  children,
  className = '',
  clickable = false,
  gradient = false,
  editorial = false,
  eco = false,
  ariaLabel,
}: CardProps) {
  const hoverClass = clickable ? 'cursor-pointer' : '';
  
  const baseClass = gradient 
    ? 'bg-gradient-to-br from-white to-[#FAFAFF]' 
    : eco
    ? 'bg-[#ECFDF5]'
    : 'bg-white';
  
  const editorialClass = editorial 
    ? 'p-8 border-0 bg-gradient-to-br from-[#EEF2FF] via-white to-[#F5F3FF]'
    : 'p-7';

  const cardClass = 'card transition-all duration-300';

  return (
    <div
      className={`${cardClass} ${baseClass} ${editorialClass} ${hoverClass} ${className}`}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}
