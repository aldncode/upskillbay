'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#030712]" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.26em] text-indigo-400">
            How It Works
          </p>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Four simple steps from learning to opportunity.
          </h2>
          <p className="mb-10 text-lg leading-7 text-slate-400">
            A practical, conversion-focused path that keeps every learner moving toward measurable results.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-indigo-500/30"
              variants={itemVariants}
              style={{
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              }}
            >
              {/* Gradient overlay on hover */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, transparent 50%, rgba(139, 92, 246, 0.05) 100%)',
                }}
              />

              <div className="relative">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-sm font-bold text-indigo-400 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                  {step.number}
                </div>
                <h3 className="mb-3 text-xl font-bold tracking-tight text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{step.description}</p>
                
                <div className="mt-4 flex items-center gap-1 text-indigo-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-xs font-medium">Learn more</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
