'use client';

import { motion } from 'framer-motion';
import Card from './Card';
import AnimatedSection from './AnimatedSection';

export default function FeaturesSection() {
  const features = [
    {
      title: 'Career Tracks',
      description: 'Structured learning paths in high-demand fields. Not courses. Careers.',
    },
    {
      title: 'Real Client Projects',
      description: 'Work on actual projects with real clients. Every deliverable matters.',
    },
    {
      title: 'Proof Profile',
      description: 'Your portfolio is auto-built. Show employers exactly what you\'ve done.',
    },
    {
      title: 'Paid Opportunities',
      description: 'Earn income while you learn. Every project = real money in your account.',
    },
    {
      title: 'Direct Hiring Access',
      description: 'Top performers get introduced to hiring partners. Skip the resume pile.',
    },
    {
      title: 'Verified Skills',
      description: 'Skills aren\'t guessed. They\'re proven through completed projects.',
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
          Everything You Need to Get Hired
        </h2>
        <p className="text-[#9CA3AF]">
          We handle the platform. You focus on building your future.
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        className="grid md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {features.map((feature, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <Card>
              {/* Icon - simple dot */}
              <div className="w-3 h-3 bg-[#3B82F6] rounded-full mb-4" />

              <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">{feature.description}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
