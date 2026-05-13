'use client';

import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

export default function SolutionSection() {
  const steps = [
    {
      number: '01',
      title: 'Choose a Track',
      description: 'Select a career path based on your goals, current skills, and earning timeline.',
    },
    {
      number: '02',
      title: 'Learn by Doing',
      description: 'Complete structured lessons and practical assignments that mirror real client work.',
    },
    {
      number: '03',
      title: 'Build Proof',
      description: 'Turn every project into portfolio evidence that shows what you can deliver.',
    },
    {
      number: '04',
      title: 'Apply and Earn',
      description: 'Use your proof profile to apply for projects, gigs, and hiring opportunities.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <AnimatedSection className="border-y border-[#E2E8F0] bg-[#EEF2FF]">
      <motion.div
        className="max-w-2xl"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.26em] text-[#4F46E5]">
          How It Works
        </p>
        <h2 className="mb-6 text-4xl font-bold tracking-tight text-[#0F172A]">
          Four simple steps from learning to opportunity.
        </h2>
        <p className="mb-10 text-[17px] leading-7 text-[#475569]">
          A practical, conversion-focused path that keeps every learner moving toward measurable results.
        </p>
      </motion.div>

      <motion.div
        className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {steps.map((step) => (
          <motion.div
            key={step.number}
            className="group rounded-[28px] border border-[#E2E8F0] bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_55px_-38px_rgba(15,23,42,0.52)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C7D2FE] hover:shadow-2xl"
            variants={itemVariants}
          >
            <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EEF2FF] to-white text-sm font-black text-[#4F46E5] shadow-[inset_0_0_0_1px_rgba(79,70,229,0.12),0_12px_30px_-22px_rgba(79,70,229,0.7)] transition-transform duration-300 group-hover:-translate-y-0.5">
              {step.number}
            </div>
            <h3 className="mb-3 text-xl font-black tracking-tight text-[#0F172A]">{step.title}</h3>
            <p className="text-[15px] leading-7 text-[#334155]">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
