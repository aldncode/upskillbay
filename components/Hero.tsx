'use client';

import { motion } from 'framer-motion';
import Button from './Button';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-12, 12, -12],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const float2Variants = {
    initial: { y: 0 },
    animate: {
      y: [8, -8, 8],
      transition: {
        duration: 7,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className="hero-section-premium relative overflow-hidden pb-24 md:pb-32" aria-label="Hero section">
      <div className="absolute inset-0 bg-[#F8FAFC]" />
      
      <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-br from-[#4F46E5]/4 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#7C3AED]/3 via-transparent to-transparent blur-3xl pointer-events-none" />

      <motion.div
        className="relative mx-auto max-w-7xl px-6 md:px-8 pt-12 md:pt-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main grid layout - asymmetrical, balanced */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* LEFT SIDE - Content (7 cols) */}
          <motion.div className="lg:col-span-6 flex flex-col justify-start">
            
            {/* Badge/Indicator */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#CBD5E1] bg-white/60 backdrop-blur-sm text-xs font-semibold text-[#475569] hover:border-[#A5B4FC] transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
                Launching Career Tracks 2026
              </div>
            </motion.div>

            {/* Oversized Editorial Headline */}
            <motion.h1
              variants={itemVariants}
              className="mb-7 text-7xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1] text-[#0F172A] max-w-2xl"
            >
              Build skills
              <br />
              that land{' '}
              <span className="bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#6D28D9] bg-clip-text text-transparent">
                jobs
              </span>
            </motion.h1>

            {/* Supporting subheading */}
            <motion.p
              variants={itemVariants}
              className="mb-9 max-w-xl text-base md:text-lg leading-7 md:leading-8 text-[#475569] font-medium"
            >
              AI-personalized learning meets real projects. Learn by doing, build your portfolio, and get hired.
            </motion.p>

            {/* CTA Buttons - Premium styling */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 mb-12"
            >
              <Button variant="primary" size="lg" href="/auth/signup" className="group shadow-lg hover:shadow-xl px-8 py-3.5 text-base">
                <span className="relative z-10">Start Free Today</span>
              </Button>
              <button className="px-8 py-3.5 rounded-xl border border-[#0F172A]/40 bg-transparent text-[#0F172A] font-semibold text-base transition-all duration-200 hover:bg-[#0F172A] hover:text-white hover:border-[#0F172A] active:-translate-y-0.5 flex items-center justify-center gap-2.5">
                Explore Paths
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </motion.div>

            {/* Minimalist Trust Indicators */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-8 text-sm font-medium text-[#475569]">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#4F46E5]/8 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-[#4F46E5]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>AI-powered</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#4F46E5]/8 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-[#4F46E5]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Real projects</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#4F46E5]/8 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-[#4F46E5]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Get hired</span>
              </div>
            </motion.div>
          </motion.div>

{/* RIGHT SIDE - Premium Multi-Panel Workspace */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:flex lg:col-span-6 items-center justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Panel 1: Main Progress Dashboard - Center, floating */}
              <motion.div
                variants={floatingVariants}
                initial="initial"
                animate="animate"
                className="relative z-20"
              >
                <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F8FAFC] to-[#F1F5F9]" />
                  <div className="relative z-10 p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-0.5">Your Progress</div>
                        <div className="text-base font-black text-[#0F172A]">Web Dev Track</div>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center shadow-md">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                        <div className="text-[10px] text-[#64748B] font-medium">Completed</div>
                        <div className="text-lg font-black text-[#4F46E5]">12</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                        <div className="text-[10px] text-[#64748B] font-medium">In Progress</div>
                        <div className="text-lg font-black text-[#7C3AED]">3</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0]">
                        <div className="text-[10px] text-[#047857] font-medium">Earned</div>
                        <div className="text-lg font-black text-[#059669]">₹8.5k</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-semibold text-[#0F172A]">Frontend</span>
                          <span className="text-xs font-bold text-[#4F46E5]">75%</span>
                        </div>
                        <div className="h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                          <div className="h-full w-[75%] bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-semibold text-[#0F172A]">Backend</span>
                          <span className="text-xs font-bold text-[#4F46E5]">40%</span>
                        </div>
                        <div className="h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                          <div className="h-full w-[40%] bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                      <span>Active learning</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Panel 2: Skill Timeline - Top right, offset */}
              <motion.div
                variants={float2Variants}
                initial="initial"
                animate="animate"
                className="absolute -top-2 -right-4 z-30"
              >
                <div className="w-44 rounded-xl border border-[#E2E8F0] bg-white/95 shadow-lg backdrop-blur overflow-hidden">
                  <div className="p-3.5 border-b border-[#E2E8F0]">
                    <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Skill Timeline</div>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                      <span className="text-xs font-semibold text-[#0F172A]">HTML/CSS</span>
                      <span className="text-[10px] text-[#10B981] ml-auto">Done</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                      <span className="text-xs font-semibold text-[#0F172A]">JavaScript</span>
                      <span className="text-[10px] text-[#10B981] ml-auto">Done</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#4F46E5] animate-pulse" />
                      <span className="text-xs font-semibold text-[#0F172A]">React</span>
                      <span className="text-[10px] text-[#4F46E5] ml-auto">In Progress</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-40">
                      <div className="w-2 h-2 rounded-full bg-[#CBD5E1]" />
                      <span className="text-xs font-semibold text-[#64748B]">Node.js</span>
                      <span className="text-[10px] text-[#94A3B8] ml-auto">Next</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Panel 3: Job Opportunity - Bottom left, offset */}
              <motion.div
                variants={float2Variants}
                initial="initial"
                animate="animate"
                className="absolute -bottom-2 -left-4 z-25"
              >
                <div className="w-40 rounded-xl border border-[#C7D2FE]/60 bg-gradient-to-br from-[#EEF2FF] to-white/95 shadow-lg backdrop-blur overflow-hidden">
                  <div className="p-3 border-b border-[#C7D2FE]/30">
                    <div className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-wider">Job Ready</div>
                  </div>
                  <div className="p-3.5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-md bg-[#4F46E5]/10 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-[#4F46E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-black text-[#0F172A]">Frontend Dev</div>
                        <div className="text-[10px] text-[#64748B]">Ready to apply</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="flex-1 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-[#4F46E5] to-[#10B981] rounded-full" />
                      </div>
                      <span className="text-[10px] font-bold text-[#059669]">100%</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Panel 4: AI Mentor - Top left, small */}
              <motion.div
                variants={floatingVariants}
                initial="initial"
                animate="animate"
                className="absolute top-8 -left-6 z-15"
              >
                <div className="w-32 rounded-lg border border-[#E2E8F0] bg-white/90 shadow-md backdrop-blur p-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#8B5CF6] to-[#A855F7] flex items-center justify-center shadow-sm">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                        <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-[#0F172A] truncate">AI Mentor</div>
                      <div className="text-[9px] text-[#64748B]">Analyzing...</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Depth layers for premium feel */}
              <div className="absolute inset-0 rounded-2xl border border-[#E2E8F0]/30 bg-[#F8FAFC]/30" style={{ transform: 'translateY(8px) translateX(-8px)' }} />
              <div className="absolute inset-0 rounded-2xl border border-[#E2E8F0]/15 bg-[#F1F5F9]/15" style={{ transform: 'translateY(16px) translateX(-16px)' }} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
