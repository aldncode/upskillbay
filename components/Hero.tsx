'use client';

import { motion } from 'framer-motion';
import Button from './Button';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45 },
    },
  };

  return (
    <section className="relative overflow-hidden border-b border-[#E5E7EB] bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.14),transparent_25%),linear-gradient(180deg,#EEF2FF_0%,#F3F4F6_100%)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_40%)] opacity-90 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-20 h-72 w-72 rounded-full bg-indigo-200/20 blur-3xl" />
      <div className="pointer-events-none absolute left-[-8rem] top-32 h-80 w-80 rounded-full bg-slate-200/30 blur-3xl" />
      <motion.div
        className="mx-auto flex min-h-[calc(100vh-64px)] max-w-[1200px] flex-col justify-center px-6 py-20 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#4F46E5]"
          variants={itemVariants}
        >
          Career-focused learning
        </motion.p>

        <motion.h1
          className="mx-auto mb-6 max-w-4xl text-5xl font-bold leading-tight tracking-tight text-[#111827] md:text-7xl"
          variants={itemVariants}
        >
          Build job-ready skills and start earning through real projects.
        </motion.h1>

        <motion.p
          className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-[#4B5563] md:text-xl"
          variants={itemVariants}
        >
          UpskillBay helps beginners follow structured career paths, complete practical assignments, and turn proof of work into opportunities.
        </motion.p>

        <motion.div className="flex flex-col justify-center gap-4 sm:flex-row" variants={itemVariants}>
          <Button variant="primary" size="lg" href="/auth/signup">
            Start Learning
          </Button>
          <Button variant="secondary" size="lg" href="/career-tracks">
            Explore Career Tracks
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
