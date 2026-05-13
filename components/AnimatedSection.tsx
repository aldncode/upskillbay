'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  background?: 'slate' | 'light-indigo' | 'white' | 'soft-gradient' | 'none';
}

export default function AnimatedSection({
  children,
  className = '',
  id,
  delay = 0,
  background = 'slate',
}: AnimatedSectionProps) {
  const bgClass = (() => {
    const classes: Record<typeof background, string> = {
      slate: 'bg-[#F8FAFC]',
      'light-indigo': 'bg-[#EEF2FF]',
      white: 'bg-white',
      'soft-gradient': 'bg-gradient-to-b from-[#F8FAFC] via-[#F5F7FB] to-white',
      none: '',
    };
    return classes[background] || classes.slate;
  })();

  return (
    <motion.section
      id={id}
      className={`relative py-20 md:py-28 ${bgClass} ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
    >
      <div className="container relative">
        {children}
      </div>
    </motion.section>
  );
}
