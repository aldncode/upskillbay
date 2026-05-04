'use client';

import { motion } from 'framer-motion';
import Button from './Button';

export default function CtaSection() {
  return (
    <section className="bg-white py-20">
      <motion.div
        className="mx-auto max-w-[900px] px-6 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-sm md:p-12">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-[#111827] md:text-5xl">
            Start building proof of work today.
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-[#4B5563]">
            Choose a career path, complete practical projects, and build the confidence to apply for paid opportunities.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="primary" size="lg" href="/auth/signup">
              Start Free
            </Button>
            <Button variant="secondary" size="lg" href="/career-tracks">
              View Tracks
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
