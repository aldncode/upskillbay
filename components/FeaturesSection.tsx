'use client';

import { motion } from 'framer-motion';
import Card from './Card';
import AnimatedSection from './AnimatedSection';
import Button from './Button';

export default function FeaturesSection() {
  const paths = [
    {
      title: 'Web Development',
      description: 'Learn frontend, backend, deployment, and project delivery through practical builds.',
      outcome: 'Build and ship client-ready websites',
      duration: '8-12 weeks',
      earning: '₹10k-₹40k/project',
    },
    {
      title: 'Digital Marketing',
      description: 'Master campaign setup, content funnels, analytics, and growth experiments.',
      outcome: 'Run measurable campaigns for brands',
      duration: '6-10 weeks',
      earning: '₹8k-₹30k/project',
    },
    {
      title: 'Data Analytics',
      description: 'Use spreadsheets, dashboards, SQL, and storytelling to solve business problems.',
      outcome: 'Create decision-ready reports',
      duration: '8-12 weeks',
      earning: '₹12k-₹45k/project',
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
    <AnimatedSection className="bg-[#F9FAFB]">
      <motion.div
        className="mb-10 max-w-2xl"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#4F46E5]">
          Choose Your Career Path
        </p>
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-[#111827] md:text-5xl">
          Pick a path built around outcomes, not lectures.
        </h2>
        <p className="text-lg leading-8 text-[#4B5563]">
          Each track includes a focused curriculum, portfolio assignments, and clear earning potential.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {paths.map((path) => (
          <motion.div key={path.title} variants={itemVariants}>
            <Card className="flex h-full flex-col">
              <h3 className="mb-3 text-xl font-bold text-[#111827]">{path.title}</h3>
              <p className="mb-5 flex-grow text-sm leading-6 text-[#4B5563]">{path.description}</p>
              <div className="mb-5 rounded-lg bg-green-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-green-700">Outcome</p>
                <p className="mt-1 text-sm font-semibold text-green-700">{path.outcome}</p>
              </div>
              <div className="mb-6 grid grid-cols-2 gap-4 border-t border-[#E5E7EB] pt-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">Duration</p>
                  <p className="mt-1 text-sm font-bold text-[#111827]">{path.duration}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">Earning</p>
                  <p className="mt-1 text-sm font-bold text-green-700">{path.earning}</p>
                </div>
              </div>
              <Button href="/career-tracks" className="w-full">
                View Track
              </Button>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
