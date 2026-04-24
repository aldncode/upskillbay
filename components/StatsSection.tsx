'use client';

import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

export default function StatsSection() {
  const stats = [
    {
      number: '100+',
      label: 'Projects Completed',
    },
    {
      number: '₹50,000+',
      label: 'Earned by Users',
    },
    {
      number: '95%',
      label: 'Job Placement Rate',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <AnimatedSection className="bg-[#111827] border-y border-[#1F2937]">
      {/* Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-white mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Proof Over Promises
      </motion.h2>

      {/* Stats Grid */}
      <motion.div
        className="grid md:grid-cols-3 gap-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {stats.map((stat, idx) => (
          <motion.div key={idx} className="text-center" variants={itemVariants}>
            <div className="text-5xl md:text-6xl font-bold text-[#3B82F6] mb-3">
              {stat.number}
            </div>
            <p className="text-lg text-[#9CA3AF] font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
