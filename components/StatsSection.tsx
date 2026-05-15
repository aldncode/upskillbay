'use client';

import { motion } from 'framer-motion';
import { Users, DollarSign, Star } from 'lucide-react';

const stats = [
  {
    number: '100+',
    label: 'Projects Completed',
    icon: Users,
  },
  {
    number: '₹50,000+',
    label: 'Earned by Learners',
    icon: DollarSign,
  },
  {
    number: '95%',
    label: 'Learner Satisfaction',
    icon: Star,
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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-[800px] rounded-full bg-gradient-to-b from-indigo-600/10 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Practical outcomes you can measure.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
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
              className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-indigo-500/30"
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
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
                  <stat.icon className="h-6 w-6 text-indigo-400" />
                </div>
                <div className="mb-3 text-5xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent md:text-6xl">
                  {stat.number}
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
