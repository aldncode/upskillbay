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
      label: 'Learner Satisfaction',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <AnimatedSection className="bg-white">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="mb-6 text-4xl font-bold tracking-tight text-[#0F172A]">
          Practical outcomes learners can measure.
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-[17px] leading-7 text-[#475569]">
          UpskillBay is built around project completion, earning potential, and career readiness.
        </p>
      </motion.div>

      <motion.div
        className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            className="rounded-2xl border border-[#E2E8F0] bg-white p-9 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#C7D2FE] hover:shadow-lg"
            variants={itemVariants}
          >
            <div className="mx-auto mb-5 h-1.5 w-10 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]" />
            <div className="mb-4 text-5xl font-black tracking-tight text-[#4F46E5] md:text-6xl">
              {stat.number}
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#64748B]">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
