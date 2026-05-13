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
      y: [-20, 20, -20],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className="hero-section-premium relative overflow-hidden py-20 md:py-32" aria-label="Hero section">
      {/* Clean background */}
      <div className="absolute inset-0 bg-[#F8FAFC]" />
      
      {/* Minimal subtle lighting - refined, not decorative */}
      <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-br from-[#4F46E5]/4 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#7C3AED]/3 via-transparent to-transparent blur-3xl pointer-events-none" />

      <motion.div
        className="relative mx-auto max-w-7xl px-6 md:px-8"
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

          {/* RIGHT SIDE - Premium Product Visual (5 cols) */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:flex lg:col-span-6 items-center justify-center"
          >
            <motion.div
              variants={floatingVariants}
              initial="initial"
              animate="animate"
              className="relative w-full max-w-sm"
            >
              {/* Main dashboard card - clean, realistic */}
              <div className="relative rounded-2xl border border-[#E2E8F0] bg-white shadow-2xl overflow-hidden">
                
                {/* Subtle gradient background inside */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F8FAFC] to-[#F1F5F9]" />

                {/* Content */}
                <div className="relative z-10 p-6 space-y-5">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                    <div>
                      <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1">Progress</div>
                      <div className="text-lg font-black text-[#0F172A]">Learning Dashboard</div>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Stat cards - grid layout */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] transition-colors">
                      <div className="text-xs text-[#64748B] font-medium mb-1.5">Completed</div>
                      <div className="text-2xl font-black text-[#4F46E5]">12</div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] transition-colors">
                      <div className="text-xs text-[#64748B] font-medium mb-1.5">In Progress</div>
                      <div className="text-2xl font-black text-[#7C3AED]">3</div>
                    </div>
                  </div>

                  {/* Progress section */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-[#0F172A]">Frontend Track</span>
                        <span className="text-xs font-bold text-[#4F46E5]">75%</span>
                      </div>
                      <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full transition-all duration-700" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-[#0F172A]">Projects Built</span>
                        <span className="text-xs font-bold text-[#4F46E5]">8/10</span>
                      </div>
                      <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                        <div className="h-full w-4/5 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full transition-all duration-700" />
                      </div>
                    </div>
                  </div>

                  {/* Activity indicator */}
                  <div className="pt-2 flex items-center gap-2 text-xs text-[#64748B]">
                    <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                    <span>Learning active now</span>
                  </div>

                  {/* Bottom CTA - subtle */}
                  <button className="w-full mt-1 px-4 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] text-xs font-semibold transition-all hover:bg-[#0F172A] hover:text-white hover:border-[#0F172A]">
                    View Full Dashboard →
                  </button>
                </div>
              </div>

              {/* Depth layer 1 - subtle shadow card */}
              <div className="absolute inset-0 rounded-2xl border border-[#E2E8F0]/40 bg-[#F8FAFC]/20" style={{ transform: 'translateY(10px) translateX(-6px)' }} />
              
              {/* Depth layer 2 - even more subtle */}
              <div className="absolute inset-0 rounded-2xl border border-[#E2E8F0]/20 bg-[#F1F5F9]/10" style={{ transform: 'translateY(20px) translateX(-12px)' }} />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
