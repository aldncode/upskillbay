'use client';

import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'slate' | 'light-indigo' | 'white' | 'soft-gradient' | 'eco';
  title?: string;
  subtitle?: string;
  centered?: boolean;
  ariaLabel?: string;
  compact?: boolean;
}

export default function Section({
  children,
  className = '',
  id,
  background = 'slate',
  title,
  subtitle,
  centered = false,
  ariaLabel,
  compact = false,
}: SectionProps) {
  const bgClass = (() => {
    const classes: Record<typeof background, string> = {
      slate: 'bg-[#F8FAFC]',
      'light-indigo': 'bg-[#EEF2FF]',
      white: 'bg-white',
      'soft-gradient': 'bg-gradient-to-b from-[#F8FAFC] via-[#F5F7FB] to-white',
      eco: 'bg-[#ECFDF5]',
    };
    return classes[background] || classes.slate;
  })();

  const spacing = compact ? 'py-16 md:py-20' : 'py-20 md:py-28';

  return (
    <section
      id={id}
      className={`relative ${spacing} ${bgClass} transition-colors duration-500 ${className}`}
      aria-label={ariaLabel}
    >
      <div className="container relative">
        {title && (
          <div className={`${centered ? 'text-center' : ''} ${compact ? 'mb-10' : 'mb-12'}`}>
            <h2 className={`${compact ? 'text-3xl' : 'text-4xl'} font-bold tracking-tight text-[#0F172A]`}>
              {title}
            </h2>
            {subtitle && (
              <p className={`${compact ? 'max-w-xl' : 'max-w-2xl'} mt-5 text-[17px] leading-7 text-[#475569]`}>
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

