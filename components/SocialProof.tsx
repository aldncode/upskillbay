'use client';

import { motion, type Variants } from 'framer-motion';
import { Users, DollarSign, Trophy, Briefcase } from 'lucide-react';

const float1Variants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

const float2Variants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [6, -6, 6],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

const pillVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

const metrics = [
  { value: '2,400+', label: 'Projects Completed', icon: Briefcase, highlight: false },
  { value: '₹12.5L', label: 'Earned by Learners', icon: DollarSign, highlight: true },
  { value: '850+', label: 'Skills Mastered', icon: Trophy, highlight: false },
  { value: '1,000+', label: 'Career Transformed', icon: Users, highlight: false },
];

const tools = [
  'React', 'Python', 'SQL', 'Figma', 'Node.js', 'Meta Ads', 'Tableau', 'Next.js'
];

const avatars = [
  { initials: 'AK', color: 'from-indigo-500 to-purple-500' },
  { initials: 'RJ', color: 'from-purple-500 to-pink-500' },
  { initials: 'MP', color: 'from-emerald-500 to-teal-500' },
  { initials: 'SK', color: 'from-orange-500 to-red-500' },
  { initials: 'DV', color: 'from-cyan-500 to-blue-500' },
];

export default function SocialProof() {
  return (
    <section className="relative overflow-hidden border-y border-slate-800/50 bg-[#030712]/50 py-10 md:py-12">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* LEFT: Trust + Avatars */}
          <div className="lg:col-span-3 flex items-center gap-4">
            <div className="flex -space-x-3">
              {avatars.map((avatar, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatar.color} flex items-center justify-center text-[10px] font-bold text-white border-2 border-[#030712] shadow-lg`}
                >
                  {avatar.initials}
                </motion.div>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">1,000+ learners</p>
              <p className="text-xs text-slate-500">trust UpskillBay</p>
            </div>
          </div>

          {/* CENTER: Animated Metrics */}
          <div className="lg:col-span-6">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {metrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  variants={i % 2 === 0 ? float1Variants : float2Variants}
                  initial="initial"
                  animate="animate"
                  className="relative"
                >
                  <div 
                    className={`flex items-center gap-3 px-5 py-3 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                      metric.highlight
                        ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-500/30 shadow-lg shadow-indigo-500/10'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      metric.highlight
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-500'
                        : 'bg-slate-800'
                    }`}>
                      <metric.icon className={`w-4 h-4 ${metric.highlight ? 'text-white' : 'text-indigo-400'}`} />
                    </div>
                    <div>
                      <p className={`text-base font-bold ${metric.highlight ? 'text-indigo-400' : 'text-white'}`}>
                        {metric.value}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">{metric.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: Tech Stack Pills */}
          <div className="lg:col-span-3 flex flex-wrap justify-center lg:justify-end gap-2">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                variants={pillVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="px-3 py-1.5 rounded-full text-[11px] font-medium text-slate-400 bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 hover:text-indigo-400 transition-all duration-200 cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
