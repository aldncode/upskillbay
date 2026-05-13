'use client';

import { motion } from 'framer-motion';

export default function SocialProof() {
  const proofs = [
    '1000+ active learners',
    '50+ live projects',
    'Beginner-friendly tracks',
  ];

  return (
    <section className="border-y border-[#E2E8F0] bg-[#EEF2FF] py-16 md:py-20">
      <div className="container">
        <motion.div
          className="flex flex-col items-center justify-between gap-8 md:flex-row"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <p className="text-center text-[17px] font-semibold leading-7 text-[#475569] md:text-left">
            Trusted by learners building practical, job-ready proof.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {proofs.map((proof) => (
              <span
                key={proof}
                className="rounded-xl border border-[#C7D2FE] bg-white px-4 py-2 text-sm font-bold text-[#334155] shadow-sm"
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
