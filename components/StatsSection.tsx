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
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <AnimatedSection className="bg-[#F9FAFB]">
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-[#111827] md:text-5xl">
          Practical outcomes learners can measure.
        </h2>
        <p className="mx-auto max-w-2xl text-lg leading-8 text-[#4B5563]">
          UpskillBay is built around project completion, earning potential, and career readiness.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            className="rounded-xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm"
            variants={itemVariants}
          >
            <div className="mb-3 text-5xl font-bold tracking-tight text-[#4F46E5]">
              {stat.number}
            </div>
            <p className="font-semibold text-[#4B5563]">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
