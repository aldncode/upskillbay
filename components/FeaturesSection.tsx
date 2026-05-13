'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedSection from './AnimatedSection';

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

const trackData = [
  {
    title: 'Web Development',
    description: 'Build real websites and applications from scratch. Learn frontend, backend, and deployment through hands-on projects.',
    outcome: 'Build and deploy client-ready websites',
    duration: '8-12 weeks',
    earning: '₹10k-40k/project',
    level: 'Beginner',
    skills: ['React', 'Node.js', 'SQL'],
  },
  {
    title: 'Digital Marketing',
    description: 'Create and manage campaigns that drive real results. Master analytics, content strategy, and paid channels.',
    outcome: 'Run measurable campaigns for brands',
    duration: '6-10 weeks',
    earning: '₹8k-30k/project',
    level: 'Beginner',
    skills: ['Meta Ads', 'Analytics', 'SEO'],
  },
  {
    title: 'Data Analytics',
    description: 'Turn data into insights. Learn SQL, visualization, and storytelling to help businesses make better decisions.',
    outcome: 'Create decision-ready data reports',
    duration: '8-12 weeks',
    earning: '₹12k-45k/project',
    level: 'Intermediate',
    skills: ['Python', 'Tableau', 'Excel'],
  },
];

const levelConfig: Record<string, { badge: string; color: string }> = {
  beginner: { badge: 'bg-sky-100 text-sky-700', color: '#0284C7' },
  intermediate: { badge: 'bg-amber-100 text-amber-700', color: '#D97706' },
};

const iconColors: Record<string, { bg: string; icon: string }> = {
  'Web Development': { bg: 'from-[#EEF2FF] to-[#E0E7FF]', icon: '#4F46E5' },
  'Digital Marketing': { bg: 'from-[#ECFDF5] to-[#D1FAE5]', icon: '#059669' },
  'Data Analytics': { bg: 'from-[#F8FAFC] to-[#E2E8F0]', icon: '#475569' },
};

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <AnimatedSection background="slate">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#4F46E5]">
              <span className="h-px w-6 bg-[#4F46E5]" />
              Career Tracks
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
              Explore pathways to your next career
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Structured programs with real projects, clear outcomes, and earning potential.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm border border-slate-200">
              3 tracks available
            </span>
            <Link
              href="/career-tracks"
              className="rounded-full bg-[#4F46E5] px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-[#4338CA] hover:shadow-lg hover:shadow-indigo-500/25"
            >
              View All
            </Link>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {trackData.map((track, index) => {
            const colors = iconColors[track.title] || { bg: 'from-slate-100 to-slate-50', icon: '#475569' };
            const level = levelConfig[track.level.toLowerCase()] || levelConfig.beginner;

            return (
              <motion.div
                key={track.title}
                variants={itemVariants}
                className={`group relative ${index === 0 ? 'lg:col-span-1' : ''}`}
              >
                <div className={`h-full rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 ${index === 0 ? 'border-[#4F46E5]/20 ring-1 ring-[#4F46E5]/10' : 'border-slate-200'}`}>
                  {index === 0 && (
                    <div className="absolute -top-3 left-6">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-5 flex items-start gap-4">
                    <div
                      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colors.bg}`}
                      style={{ color: colors.icon }}
                    >
                      <TrackIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-[#0F172A]">{track.title}</h3>
                      <span className={`mt-1 inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${level.badge}`}>
                        {track.level}
                      </span>
                    </div>
                  </div>

                  <p className="mb-5 text-sm leading-relaxed text-slate-600">
                    {track.description}
                  </p>

                  <div className="mb-5 rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-3">
                    <p className="text-xs font-semibold text-emerald-700">
                      {track.outcome}
                    </p>
                  </div>

                  <div className="mb-5 flex flex-wrap gap-2">
                    {track.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Duration</p>
                      <p className="mt-1 text-sm font-bold text-[#0F172A]">{track.duration}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Earning</p>
                      <p className="mt-1 text-sm font-bold text-[#4F46E5]">{track.earning}</p>
                    </div>
                  </div>

                  <Link
                    href="/career-tracks"
                    className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 ${
                      index === 0
                        ? 'bg-[#4F46E5] text-white hover:bg-[#4338CA] hover:shadow-lg hover:shadow-indigo-500/25'
                        : 'border border-slate-200 text-slate-700 hover:border-[#4F46E5] hover:bg-[#4F46E5]/5'
                    }`}
                  >
                    View Track
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-10 text-center">
          <Link
            href="/career-tracks"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#4F46E5] transition-colors hover:text-[#4338CA]"
          >
            See all career tracks
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}