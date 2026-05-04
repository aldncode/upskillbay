'use client';

import { motion } from 'framer-motion';

export default function SocialProof() {
  const proofs = [
    '1000+ active learners',
    '50+ live projects',
    'Beginner-friendly tracks',
  ];

  return (
    <section className="border-b border-[#E5E7EB] bg-[#EEF2FF] py-10">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          className="flex flex-col items-center justify-between gap-6 md:flex-row"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <p className="text-center font-semibold text-[#4B5563] md:text-left">
            Trusted by learners building practical, job-ready proof.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {proofs.map((proof) => (
              <span
                key={proof}
                className="rounded-lg border border-[#E5E7EB] bg-white/90 px-4 py-2 text-sm font-semibold text-[#374151]"
              >
                {proof}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
