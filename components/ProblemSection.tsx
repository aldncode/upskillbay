'use client';

import { motion } from 'framer-motion';
import Card from './Card';
import AnimatedSection from './AnimatedSection';

export default function ProblemSection() {
  const problems = [
    {
      title: 'Courses don\'t get you hired',
      description: 'You finish the course, but employers have no proof you can actually do the work.',
    },
    {
      title: 'Certificates don\'t prove skills',
      description: 'Generic certificates look the same for everyone. They prove you sat through videos.',
    },
    {
      title: 'No real experience = no opportunities',
      description: 'Without a portfolio or income track record, breaking in is nearly impossible.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <AnimatedSection className="bg-[#0B0F19]">
      {/* Title */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          The Problem with Traditional Learning
        </h2>
        <p className="text-[#9CA3AF] max-w-2xl">
          Most platforms teach, but don't transform. We fix that.
        </p>
      </motion.div>

      {/* Problem Grid */}
      <motion.div
        className="grid md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {problems.map((problem, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <Card>
              <h3 className="text-lg font-bold text-white mb-3">{problem.title}</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">{problem.description}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
