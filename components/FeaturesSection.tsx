'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

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
    title: 'AI Engineering',
    description: 'Build intelligent applications using machine learning and AI tools that companies actually need.',
    outcome: 'Build and deploy AI-powered applications',
    duration: '16 weeks',
    earning: '₹8L - 18L/yr',
    level: 'Intermediate',
    skills: ['Python', 'TensorFlow', 'OpenAI API', 'LangChain'],
    color: 'from-violet-500 to-purple-600',
    icon: TrackIcon,
    gradient: 'violet',
  },
  {
    title: 'Data Analytics',
    description: 'Turn data into insights. Learn SQL, visualization, and storytelling to help businesses make better decisions.',
    outcome: 'Create decision-ready data reports',
    duration: '12 weeks',
    earning: '₹6L - 12L/yr',
    level: 'Beginner',
    skills: ['Excel', 'SQL', 'Python', 'Tableau'],
    color: 'from-cyan-500 to-blue-600',
    icon: TrackIcon,
    gradient: 'cyan',
  },
  {
    title: 'DevOps Engineer',
    description: 'Learn to build and manage cloud infrastructure that powers modern apps and websites.',
    outcome: 'Deploy and manage production systems',
    duration: '14 weeks',
    earning: '₹9L - 16L/yr',
    level: 'Intermediate',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    color: 'from-orange-500 to-red-600',
    icon: TrackIcon,
    gradient: 'orange',
  },
];

const glowColors: Record<string, string> = {
  violet: 'rgba(139, 92, 246, 0.4)',
  cyan: 'rgba(6, 182, 212, 0.4)',
  orange: 'rgba(249, 115, 22, 0.4)',
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
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
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
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5">
            <span className="h-px w-4 bg-indigo-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Career Tracks</span>
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Explore pathways to your next career
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Structured programs with real projects, clear outcomes, and earning potential.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {trackData.map((track, index) => {
            return (
              <motion.div
                key={track.title}
                variants={itemVariants}
                className="group relative"
              >
                <div 
                  className="h-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-500 hover:border-slate-700"
                  style={{
                    boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                  }}
                >
                  {/* Gradient Background */}
                  <div 
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg, ${glowColors[track.gradient]}10 0%, transparent 50%, ${glowColors[track.gradient]}05 100%)`,
                    }}
                  />

                  {/* Glowing Border */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg, ${glowColors[track.gradient]}40, transparent 50%, ${glowColors[track.gradient]}20)`,
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude',
                      padding: '1px',
                    }}
                  />

                  {index === 0 && (
                    <div className="absolute -top-3 left-6 z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25">
                        <CheckCircle2 className="h-3 w-3" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="relative">
                    {/* Header */}
                    <div className="mb-5 flex items-start gap-4">
                      <div
                        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${track.color}`}
                      >
                        <track.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xl font-bold text-white">{track.title}</h3>
                        <span className={`mt-1 inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                          track.level === 'Beginner' 
                            ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                            : track.level === 'Intermediate'
                            ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                            : 'bg-red-500/10 border border-red-500/20 text-red-400'
                        }`}>
                          {track.level}
                        </span>
                      </div>
                    </div>

                    <p className="mb-5 text-sm leading-relaxed text-slate-400">
                      {track.description}
                    </p>

                    <div className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <p className="text-xs font-semibold text-emerald-400">
                          {track.outcome}
                        </p>
                      </div>
                    </div>

                    <div className="mb-5 flex flex-wrap gap-2">
                      {track.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-slate-700 bg-slate-800/50 px-2.5 py-1 text-[11px] font-medium text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 border-t border-slate-800 pt-4">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Duration</p>
                        <p className="mt-1 text-sm font-bold text-white">{track.duration}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Earning</p>
                        <p className="mt-1 text-sm font-bold text-indigo-400">{track.earning}</p>
                      </div>
                    </div>

                    <Link
                      href="/career-tracks"
                      className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
                        index === 0
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25'
                          : 'border border-slate-700 text-slate-300 hover:border-indigo-500 hover:bg-indigo-500/5'
                      }`}
                    >
                      View Track
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/career-tracks"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
          >
            See all career tracks
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}