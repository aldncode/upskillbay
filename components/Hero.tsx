'use client';

import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Target, TrendingUp } from 'lucide-react';

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  const floatingCards = [
    { title: 'AI Engineer', color: 'violet', delay: 0 },
    { title: 'Data Analyst', color: 'cyan', delay: 0.1 },
    { title: 'DevOps', color: 'orange', delay: 0.2 },
    { title: 'Cloud', color: 'emerald', delay: 0.3 },
  ];

  const glowColors: Record<string, string> = {
    violet: 'rgba(139, 92, 246, 0.4)',
    cyan: 'rgba(6, 182, 212, 0.4)',
    orange: 'rgba(249, 115, 22, 0.4)',
    emerald: 'rgba(16, 185, 129, 0.4)',
  };

  return (
    <section className="relative min-h-screen overflow-hidden" aria-label="Hero section">
      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#030712]/80 to-[#030712]" />
        </div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-20 left-1/4 h-[600px] w-[600px] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/15 blur-[120px]" />
        <div className="absolute bottom-20 left-1/3 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[100px]" />
      </div>

      <motion.div
        className="relative mx-auto max-w-7xl px-6 pt-32 pb-24 md:px-8 md:pt-40 md:pb-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE - Content */}
          <motion.div className="lg:col-span-7 flex flex-col justify-start">
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-400" />
                </span>
                <span className="text-xs font-medium text-indigo-300">AI-Powered Career Platform</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="mb-8 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white"
            >
              Build skills
              <br />
              that land{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                jobs
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="mb-10 max-w-xl text-lg md:text-xl leading-relaxed text-slate-400"
            >
              AI-personalized learning meets real projects. Learn by doing, build your portfolio, and get hired by top companies.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                href="/auth/signup"
                className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/30"
              >
                Start Free Today
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/career-tracks"
                className="group inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-slate-600 hover:bg-slate-800"
              >
                Explore Tracks
                <Sparkles className="h-4 w-4 text-amber-400" />
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                  <Zap className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">AI-Powered</p>
                  <p className="text-xs text-slate-500">Personalized learning</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <Target className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Real Projects</p>
                  <p className="text-xs text-slate-500">Build portfolio</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <TrendingUp className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Get Hired</p>
                  <p className="text-xs text-slate-500">Career ready</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - Floating Career Cards */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:flex lg:col-span-5 items-center justify-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Main Visual */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative z-20"
              >
                <div 
                  className="rounded-2xl border border-slate-800/50 bg-slate-900/80 backdrop-blur-xl p-6 overflow-hidden"
                  style={{
                    boxShadow: '0 0 60px rgba(139, 92, 246, 0.15), 0 25px 50px rgba(0,0,0,0.4)',
                  }}
                >
                  <div 
                    className="absolute inset-0 opacity-50"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, transparent 50%, rgba(6, 182, 212, 0.05) 100%)',
                    }}
                  />
                  
                  <div className="relative">
                    <div className="mb-6">
                      <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">Your Progress</div>
                      <div className="text-2xl font-bold text-white">AI Engineering Track</div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Completed</div>
                        <div className="text-xl font-bold text-indigo-400">12</div>
                      </div>
                      <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">In Progress</div>
                        <div className="text-xl font-bold text-purple-400">3</div>
                      </div>
                      <div className="rounded-xl border border-emerald-800/30 bg-emerald-950/20 p-3">
                        <div className="text-[10px] text-emerald-500 uppercase tracking-wider">Earned</div>
                        <div className="text-xl font-bold text-emerald-400">₹25k</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-medium text-slate-300">Python & ML</span>
                          <span className="text-xs font-bold text-indigo-400">85%</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full w-[85%] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-medium text-slate-300">AI Agents</span>
                          <span className="text-xs font-bold text-indigo-400">60%</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full w-[60%] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                      </span>
                      <span>Active learning • AI Mentor available</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Cards */}
              {floatingCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="absolute cursor-pointer"
                  style={{
                    transform: `translateY(${Math.sin(index * 45) * 15}px)`,
                    zIndex: 10 + index,
                  }}
                >
                  <div 
                    className="rounded-xl border border-slate-700/50 bg-slate-900/90 backdrop-blur-md px-4 py-2.5 transition-all duration-300 hover:scale-105"
                    style={{
                      boxShadow: `0 0 25px ${glowColors[card.color]}20`,
                    }}
                  >
                    <span className="text-sm font-medium text-slate-300">{card.title}</span>
                  </div>
                </motion.div>
              ))}

              {/* Position floating cards around the main card */}
              <motion.div
                className="absolute -top-4 -right-8"
                style={{ zIndex: 25 }}
              >
                <div className="rounded-xl border border-violet-500/30 bg-violet-950/30 backdrop-blur-md px-4 py-2.5">
                  <span className="text-sm font-medium text-violet-300">AI Engineer</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-6"
                style={{ zIndex: 25 }}
              >
                <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/30 backdrop-blur-md px-4 py-2.5">
                  <span className="text-sm font-medium text-cyan-300">Data Analyst</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-12"
                style={{ zIndex: 25, transform: 'translateY(-50%)' }}
              >
                <div className="rounded-xl border border-orange-500/30 bg-orange-950/30 backdrop-blur-md px-4 py-2.5">
                  <span className="text-sm font-medium text-orange-300">DevOps</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
