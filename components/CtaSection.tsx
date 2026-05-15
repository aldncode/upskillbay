'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-indigo-600/5 via-purple-600/5 to-cyan-600/5 blur-3xl" />
      </div>

      <motion.div
        className="relative mx-auto max-w-4xl px-6 md:px-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div 
          className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 px-8 py-16 text-center backdrop-blur-xl md:px-16 md:py-20"
          style={{
            boxShadow: '0 0 80px rgba(99, 102, 241, 0.2), 0 25px 50px rgba(0,0,0,0.4)',
          }}
        >
          {/* Animated gradient background */}
          <div 
            className="absolute inset-0 opacity-50"
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, transparent 40%, rgba(139, 92, 246, 0.1) 100%)',
            }}
          />

          {/* Glowing border effect */}
          <div 
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.5), transparent 50%, rgba(139, 92, 246, 0.3))',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              padding: '1px',
            }}
          />

          <div className="relative">
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Start building proof of work today.
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400">
              Choose a career path, complete practical projects, and build the confidence to apply for paid opportunities.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/auth/signup"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/30"
              >
                Start Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/career-tracks"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-slate-600 hover:bg-slate-800"
              >
                View Tracks
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
