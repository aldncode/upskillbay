'use client';

import { motion } from 'framer-motion';

export default function SocialProof() {
  const proofs = [
    '1000+ Active Learners',
    '50+ Projects Live',
    'Top Tech Skills',
  ];

  return (
    <section className="bg-[#111827] border-y border-[#1F2937] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[#9CA3AF] font-medium">
            Trusted by students building real-world skills
          </p>
        </motion.div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8">
          {proofs.map((proof, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <span className="w-2 h-2 bg-[#3B82F6] rounded-full" />
              <span className="text-[#9CA3AF] text-sm font-medium">{proof}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
