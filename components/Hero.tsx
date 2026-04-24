'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from './Button';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#0B0F19] relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/10 via-transparent to-transparent pointer-events-none" />
      
      <motion.div
        className="max-w-4xl mx-auto px-6 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Headline */}
        <motion.h1
          className="text-6xl md:text-7xl font-bold tracking-tight mb-6 text-white leading-tight"
          variants={itemVariants}
        >
          Stop Learning.<br />
          <span className="bg-gradient-to-r from-[#3B82F6] to-[#1E40AF] bg-clip-text text-transparent">
            Start Proving.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-xl md:text-2xl text-[#9CA3AF] mb-8 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Build real projects, earn your first income, and become hireable — all in one platform.
        </motion.p>

        {/* Trust Line */}
        <motion.p className="text-sm text-[#6B7280] mb-12" variants={itemVariants}>
          No experience needed • Beginner-friendly • Real outcomes
        </motion.p>

        {/* CTA Buttons */}
        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center mb-16" variants={itemVariants}>
          <Button variant="primary" size="lg" href="/auth/signup">
            Start Your First Project
          </Button>
          <Button variant="outline" size="lg" href="/capsules">
            Explore Career Tracks
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
