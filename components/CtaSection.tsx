'use client';

import { motion } from 'framer-motion';
import Button from './Button';

export default function CtaSection() {
  return (
    <section className="bg-[#F8FAFC] py-16 md:py-20">
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <div className="cta-bg rounded-2xl px-7 py-16 text-center text-white shadow-lg shadow-indigo-500/20 md:px-16 md:py-18">
          <h2 className="mb-5 text-4xl font-bold tracking-tight text-white">
            Start building proof of work today.
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-[17px] leading-7 text-white/90">
            Choose a career path, complete practical projects, and build the confidence to apply for paid opportunities.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="secondary" size="lg" href="/auth/signup" className="border-white bg-white text-[#4F46E5] hover:bg-[#F3F4F6]">
              Start Free
            </Button>
            <Button variant="ghost" size="lg" href="/career-tracks">
              View Tracks
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
