'use client';

import { motion } from 'framer-motion';
import Button from './Button';

export default function CtaSection() {
  return (
    <section className="py-24 bg-[#0B0F19]">
      <motion.div
        className="max-w-4xl mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
          Your First ₹10,000 Starts Here
        </h2>
        <p className="text-xl text-[#9CA3AF] mb-12 max-w-2xl mx-auto">
          Top performers on UpskillBay earn real money from their first project.
        </p>

        <Button variant="primary" size="lg" href="/auth/signup">
          Start Now
        </Button>
      </motion.div>
    </section>
  );
}
