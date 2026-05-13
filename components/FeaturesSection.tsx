'use client';

import { motion } from 'framer-motion';
import Card from './Card';
import AnimatedSection from './AnimatedSection';
import Button from './Button';
import OutcomeBox from './OutcomeBox';

function PathIcon({ index }: { index: number }) {
  const paths = [
    'M5 7h14M7 12h10M9 17h6',
    'M5 18V8l7-4 7 4v10M9 18v-6h6v6',
    'M5 19V9M12 19V5M19 19v-8',
  ];

  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={paths[index] || paths[0]}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <AnimatedSection className="bg-white">
      <motion.div
        className="max-w-2xl"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.26em] text-[#4F46E5]">
          Choose Your Career Path
        </p>
        <h2 className="mb-6 text-4xl font-bold tracking-tight text-[#0F172A]">
          Pick a path built around outcomes, not lectures.
        </h2>
        <p className="mb-10 text-[17px] leading-7 text-[#475569]">
          Each track includes a focused curriculum, portfolio assignments, and clear earning potential.
        </p>
      </motion.div>

      <motion.div
        className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {paths.map((path, index) => (
          <motion.div key={path.title} variants={itemVariants}>
            <Card className="group flex h-full flex-col gap-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EEF2FF] to-white text-[#4F46E5] shadow-[inset_0_0_0_1px_rgba(79,70,229,0.12),0_12px_30px_-22px_rgba(79,70,229,0.7)] transition-transform duration-300 group-hover:-translate-y-0.5">
                    <PathIcon index={index} />
                  </span>
                  <h3 className="text-2xl font-black tracking-tight text-[#0F172A]">{path.title}</h3>
                </div>
                {index === 0 ? (
                  <span className="badge badge-purple">Popular</span>
                ) : index === 1 ? (
                  <span className="badge badge-green">High demand</span>
                ) : null}
              </div>
              <p className="text-[16px] leading-7 text-[#334155]">{path.description}</p>
              <OutcomeBox>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#047857]">Outcome</p>
                <p className="mt-1 text-sm font-bold leading-7 text-[#065F46]">{path.outcome}</p>
              </OutcomeBox>
              <div className="grid grid-cols-2 gap-3 border-t border-[#E2E8F0] pt-5 text-sm">
                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#64748B]">Duration</p>
                  <p className="mt-2 font-black text-[#0F172A]">{path.duration}</p>
                </div>
                <div className="rounded-2xl border border-[#C7D2FE] bg-[#EEF2FF]/70 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#64748B]">Earning</p>
                  <p className="mt-2 font-black text-[#4F46E5]">{path.earning}</p>
                </div>
              </div>
              <Button href="/career-tracks" className="w-full py-3.5 shadow-lg shadow-indigo-500/25">
                View Track
              </Button>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
