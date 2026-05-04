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
    <AnimatedSection className="bg-white border-y border-[#E5E7EB]">
      <motion.div
        className="mb-10 max-w-2xl"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#4F46E5]">
          How It Works
        </p>
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-[#111827] md:text-5xl">
          Four simple steps from learning to opportunity.
        </h2>
        <p className="text-lg leading-8 text-[#4B5563]">
          A practical, conversion-focused path that keeps every learner moving toward measurable results.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {steps.map((step) => (
          <motion.div
            key={step.number}
            className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            variants={itemVariants}
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#EEF2FF] text-sm font-bold text-[#4F46E5]">
              {step.number}
            </div>
            <h3 className="mb-3 text-lg font-bold text-[#111827]">{step.title}</h3>
            <p className="text-sm leading-6 text-[#4B5563]">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
