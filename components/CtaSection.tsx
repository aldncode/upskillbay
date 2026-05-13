'use client';

import { motion } from 'framer-motion';
import Button from './Button';

export default function CtaSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <div className="cta-bg rounded-2xl px-7 py-18 text-center text-white shadow-[0_30px_80px_-36px_rgba(79,70,229,0.72)] md:px-16 md:py-20">
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white">
            Start building proof of work today.
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-[17px] leading-7 text-white">
            Choose a career path, complete practical projects, and build the confidence to apply for paid opportunities.
          </p>

          <div className="flex flex-col justify-center gap-5 sm:flex-row">
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
