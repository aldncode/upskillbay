'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';

interface User {
  name?: string;
  email?: string;
  image?: string;
}

interface NavbarProps {
  variant?: 'light' | 'dark';
}

export default function Navbar({ variant = 'dark' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isDark = variant === 'dark';
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/me');
        const data = await res.json();
        setUser(data.user || null);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    setUser(null);
    router.push('/');
    setIsOpen(false);
  };

  const navLinkClass = (href: string) =>
    `group relative rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
      isDark
        ? pathname === href
          ? 'bg-indigo-500/20 text-indigo-400'
          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
        : pathname === href
        ? 'bg-[#EEF2FF]/80 text-[#4F46E5]'
        : 'text-slate-700 hover:text-indigo-600'
    }`;

  return (
    <nav className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
      isDark 
        ? 'border-slate-800/50 bg-[#030712]/80' 
        : 'border-slate-200/50 bg-white/80'
    }`}>
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="group flex items-center gap-3 transition-all duration-300 hover:scale-[1.02]"
            aria-label="UpskillBay Home"
          >
            <motion.div 
              whileHover={{ y: -2 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 text-sm font-bold text-white shadow-lg shadow-indigo-500/25"
            >
              U
            </motion.div>
            <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${isDark ? 'text-white group-hover:text-indigo-400' : 'text-slate-900'}`}>
              UpskillBay
            </span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            <Link href="/career-tracks" className={navLinkClass('/career-tracks')} aria-current={pathname === '/career-tracks' ? 'page' : undefined}>
              Career Tracks
            </Link>
            <Link href="/gigs" className={navLinkClass('/gigs')} aria-current={pathname === '/gigs' ? 'page' : undefined}>
              Projects
            </Link>
            {user && (
              <Link href="/dashboard" className={navLinkClass('/dashboard')} aria-current={pathname === '/dashboard' ? 'page' : undefined}>
                Dashboard
              </Link>
            )}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {!loading && user ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-semibold text-white">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className={`rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                    isDark 
                      ? 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600 hover:bg-slate-700/50 hover:text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                  aria-label="Logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                    isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-indigo-600'
                  }`}
                  aria-label="Login"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
                  className="group relative rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30"
                >
                  Get Started
                  <span className="absolute inset-0 rounded-xl ring-1 ring-indigo-400/30 group-hover:ring-indigo-400/50" />
                </Link>
              </>
            )}
          </div>

          <button
            className={`rounded-xl border p-2.5 transition-all duration-300 md:hidden ${
              isDark 
                ? 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700 hover:bg-slate-800' 
                : 'border-slate-200 bg-white/50 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`space-y-2 border-t py-4 md:hidden ${
              isDark ? 'border-slate-800/50' : 'border-slate-200'
            }`}
            role="navigation"
          >
            <Link
              href="/career-tracks"
              className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isDark ? 'text-slate-300 hover:bg-slate-800/50' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Career Tracks
            </Link>
            <Link
              href="/gigs"
              className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isDark ? 'text-slate-300 hover:bg-slate-800/50' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Projects
            </Link>
            {user && (
              <>
                <Link
                  href="/dashboard"
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isDark ? 'text-slate-300 hover:bg-slate-800/50' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Dashboard
                </Link>
                <div className={`border-t pt-4 ${isDark ? 'border-slate-800/50' : 'border-slate-200'}`}>
                  <div className="flex items-center gap-3 px-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-semibold text-white">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`mt-4 w-full rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                      isDark 
                        ? 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600 hover:bg-slate-700/50'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50'
                    }`}
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
            {!loading && !user && (
              <div className={`flex flex-col gap-3 border-t pt-4 ${isDark ? 'border-slate-800/50' : 'border-slate-200'}`}>
                <Link
                  href="/auth/login"
                  className={`block rounded-xl border px-4 py-3 text-center text-sm font-semibold transition-all duration-200 ${
                    isDark 
                      ? 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50'
                  }`}
                >
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
                  className="block rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Get Started
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
