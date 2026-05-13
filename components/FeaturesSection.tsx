'use client';

import { motion } from 'framer-motion';
import Card from './Card';
import AnimatedSection from './AnimatedSection';
import Button from './Button';

function TrackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 6.5h9.5A4.5 4.5 0 0 1 19 11v6.5M5 6.5V17a1 1 0 0 0 1 1h13M5 6.5 8.5 3M19 17.5 15.5 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const levelClasses: Record<string, string> = {
  beginner: 'border-sky-200 bg-sky-50 text-sky-700',
  intermediate: 'border-amber-200 bg-amber-50 text-amber-700',
  advanced: 'border-rose-200 bg-rose-50 text-rose-700',
};

const iconColorMap: Record<string, { bg: string; icon: string }> = {
  'Web Development': { bg: 'from-[#EEF2FF] to-[#E0E7FF]', icon: '#4F46E5' },
  'Digital Marketing': { bg: 'from-[#ECFDF5] to-[#D1FAE5]', icon: '#10B981' },
  'Data Analytics': { bg: 'from-[#F8FAFC] to-[#F1F5F9]', icon: '#64748B' },
};

export default function FeaturesSection() {
  const paths = [
    {
      title: 'Web Development',
      description: 'Build real websites and applications from scratch. Learn frontend, backend, and deployment through hands-on projects.',
      outcome: 'Build and deploy client-ready websites',
      duration: '8-12 weeks',
      earning: '₹10k-40k/project',
      level: 'Beginner',
    },
    {
      title: 'Digital Marketing',
      description: 'Create and manage campaigns that drive real results. Master analytics, content strategy, and paid channels.',
      outcome: 'Run measurable campaigns for brands',
      duration: '6-10 weeks',
      earning: '₹8k-30k/project',
      level: 'Beginner',
    },
    {
      title: 'Data Analytics',
      description: 'Turn data into insights. Learn SQL, visualization, and storytelling to help businesses make better decisions.',
      outcome: 'Create decision-ready data reports',
      duration: '8-12 weeks',
      earning: '₹12k-45k/project',
      level: 'Intermediate',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <AnimatedSection background="white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#4F46E5]/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 bg-[#7C3AED]/2 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.26em] text-[#4F46E5]">
            Career Tracks
          </p>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-[#0F172A]">
            Structured paths to job-ready skills.
          </h2>
          <p className="mb-8 text-[17px] leading-7 text-[#475569]">
            Each track includes real projects, clear outcomes, and earning potential. Start with the path that matches your goals.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 lg:grid-cols-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {paths.map((path, index) => {
            const iconColors = iconColorMap[path.title] || { bg: 'from-[#EEF2FF] to-[#E0E7FF]', icon: '#4F46E5' };
            const levelClass = levelClasses[path.level.toLowerCase()] || 'border-slate-200 bg-slate-50 text-slate-600';

            return (
              <motion.div
                key={path.title}
                variants={itemVariants}
                className={index === 0 ? 'lg:col-span-5' : index === 1 ? 'lg:col-span-4 lg:mt-8' : 'lg:col-span-3'}
              >
                <Card className={`group flex h-full flex-col transition-all duration-300 hover:-translate-y-1 ${
                  index === 0
                    ? 'relative border-[#4F46E5]/20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#EEF2FF] shadow-lg shadow-indigo-500/8 hover:shadow-xl'
                    : 'border-[#E2E8F0] hover:shadow-lg'
                }`}>
                  {index === 0 && (
                    <div className="absolute -top-px -right-px z-10">
                      <span className="inline-flex items-center gap-1 rounded-bl-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-5 flex items-start gap-3.5">
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br ${iconColors.bg}`}
                      style={{ color: iconColors.icon }}
                    >
                      <TrackIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <h3 className="mb-2 text-lg font-black tracking-tight text-[#0F172A]">{path.title}</h3>
                      <span className={`inline-flex rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] ${levelClass}`}>
                        {path.level}
                      </span>
                    </div>
                  </div>

                  <p className="mb-5 text-sm leading-6 text-[#475569]">{path.description}</p>

                  <div className="mb-5 rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] px-4 py-3">
                    <p className="text-xs font-semibold text-[#065F46]">{path.outcome}</p>
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-3 border-t border-[#E2E8F0] pt-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#64748B]">Duration</p>
                      <p className="mt-1 font-black text-[#0F172A]">{path.duration}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#64748B]">Earning</p>
                      <p className="mt-1 font-black text-[#4F46E5]">{path.earning}</p>
                    </div>
                  </div>

                  <Button href="/career-tracks" className="mt-4 w-full py-3">
                    View Track
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
