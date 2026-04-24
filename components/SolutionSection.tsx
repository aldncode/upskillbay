'use client';

import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

export default function SolutionSection() {
  const steps = [
    {
      number: '01',
      title: 'Learn Only What Matters',
      description: 'Career tracks focused on in-demand skills. No fluff, no theory nobody uses.',
    },
    {
      number: '02',
      title: 'Build Real Projects',
      description: 'Work on actual client projects. Every project becomes proof of your abilities.',
    },
    {
      number: '03',
      title: 'Create Your Proof Profile',
      description: 'Showcase completed work, earned income, and verified skills. Real evidence of impact.',
    },
    {
      number: '04',
      title: 'Get Paid & Get Hired',
      description: 'Earn from each project. Top performers get recruited by hiring partners.',
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <AnimatedSection className="bg-[#111827]">
      {/* Title */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          How UpskillBay Works
        </h2>
        <p className="text-[#9CA3AF]">Four steps from zero to hired.</p>
      </motion.div>

      {/* Steps Grid */}
      <motion.div
        className="grid md:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {steps.map((step, idx) => (
          <motion.div key={idx} className="relative" variants={itemVariants}>
            {/* Step Number Background */}
            <div className="text-6xl font-bold text-[#1F2937] mb-4">{step.number}</div>

            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
            <p className="text-[#9CA3AF] text-sm leading-relaxed">{step.description}</p>

            {/* Connector line (hidden on last item) */}
            {idx < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 -right-3 w-6 h-0.5 bg-[#374151]" />
            )}
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
