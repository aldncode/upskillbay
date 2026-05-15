'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface FooterProps {
  variant?: 'light' | 'dark';
}

export default function Footer({ variant = 'dark' }: FooterProps) {
  const isDark = variant === 'dark';

  return (
    <footer className={`relative overflow-hidden border-t py-16 md:py-20 ${
      isDark 
        ? 'border-slate-800/50 bg-[#030712]' 
        : 'border-slate-200 bg-slate-50'
    }`}>
      {isDark && (
        <>
          <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-indigo-600/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl" />
        </>
      )}

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-12 grid gap-10 md:grid-cols-4 md:gap-16">
          <div className="md:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 text-sm font-bold text-white shadow-lg shadow-indigo-500/25">
                U
              </div>
              <span className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                UpskillBay
              </span>
            </Link>
            <p className={`mt-4 text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {isDark 
                ? 'Transform your career with AI-powered learning. Build real skills, earn from real projects, land your dream job.' 
                : 'Build skills. Earn income. Get hired.'}
            </p>
          </div>

          <div>
            <h4 className={`mb-5 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Product</h4>
            <ul className={`space-y-3 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <li><Link href="/career-tracks" className="transition-all duration-200 hover:text-indigo-400">Career Tracks</Link></li>
              <li><Link href="/gigs" className="transition-all duration-200 hover:text-indigo-400">Projects</Link></li>
              <li><Link href="/dashboard" className="transition-all duration-200 hover:text-indigo-400">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={`mb-5 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Company</h4>
            <ul className={`space-y-3 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <li><Link href="#" className="transition-all duration-200 hover:text-indigo-400">About</Link></li>
              <li><Link href="#" className="transition-all duration-200 hover:text-indigo-400">Blog</Link></li>
              <li><Link href="#" className="transition-all duration-200 hover:text-indigo-400">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={`mb-5 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Legal</h4>
            <ul className={`space-y-3 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <li><Link href="#" className="transition-all duration-200 hover:text-indigo-400">Terms</Link></li>
              <li><Link href="#" className="transition-all duration-200 hover:text-indigo-400">Privacy</Link></li>
              <li><Link href="#" className="transition-all duration-200 hover:text-indigo-400">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className={`border-t pt-8 ${isDark ? 'border-slate-800/50' : 'border-slate-200'}`}>
          <div className={`flex flex-col items-center justify-between gap-6 text-sm md:flex-row ${
            isDark ? 'text-slate-500' : 'text-slate-500'
          }`}>
            <p>&copy; {new Date().getFullYear()} UpskillBay. All rights reserved.</p>

            <div className="flex gap-6">
              <motion.a 
                href="#" 
                whileHover={{ y: -2 }}
                className="transition-colors hover:text-indigo-400"
              >
                Twitter
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -2 }}
                className="transition-colors hover:text-indigo-400"
              >
                LinkedIn
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -2 }}
                className="transition-colors hover:text-indigo-400"
              >
                Discord
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
