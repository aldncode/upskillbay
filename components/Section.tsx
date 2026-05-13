'use client';

import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'default' | 'alt' | 'card' | 'gradient' | 'eco';
  title?: string;
  subtitle?: string;
  centered?: boolean;
  ariaLabel?: string;
}

export default function Section({
  children,
  className = '',
  id,
  background = 'default',
  title,
  subtitle,
  centered = false,
  ariaLabel,
}: SectionProps) {
  const bgClass = {
    default: 'bg-[#F3F4F6]',
    alt: 'bg-[#EEF2FF]',
    card: 'bg-white',
    gradient: 'bg-gradient-to-b from-white to-[#EEF2FF]',
    eco: 'bg-[#ECFDF5]',
  }[background];

  return (
    <section
      id={id}
      className={`py-24 md:py-32 ${bgClass} transition-colors duration-300 ${className}`}
      aria-label={ariaLabel}
    >
      <div className="container">
        {title && (
          <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-[#0F172A]">
              {title}
            </h2>
            {subtitle && (
              <p className="mb-10 max-w-2xl text-[17px] leading-7 text-[#475569]">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}

