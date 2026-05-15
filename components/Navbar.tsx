'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface User {
  name?: string;
  email?: string;
  image?: string;
}

interface NavbarProps {
  variant?: 'light' | 'dark';
}

export default function Navbar({ variant = 'light' }: NavbarProps) {
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
    `group relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
      isDark
        ? pathname === href
          ? 'bg-indigo-500/20 text-indigo-400'
          : 'text-slate-300 hover:bg-slate-800/50 hover:text-indigo-400'
        : pathname === href
        ? 'bg-[#EEF2FF]/80 text-[#4F46E5] shadow-[inset_0_0_0_1px_rgba(79,70,229,0.08)]'
        : 'text-slate-700 hover:bg-slate-100/70 hover:text-indigo-600'
    }`;

  return (
    <nav className={isDark ? 'sticky top-0 z-50 border-b border-slate-800 bg-[#030712]/95 backdrop-blur-md' : 'navbar'}>
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 transition-colors duration-200"
            aria-label="UpskillBay Home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-sm font-black text-white shadow-lg shadow-indigo-500/25 transition-transform duration-200 group-hover:-translate-y-0.5">
              U
            </span>
            <span className={`text-[1.45rem] font-black leading-none tracking-tight group-hover:text-[#4F46E5] ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>
              UpskillBay
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
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

          <div className="hidden items-center gap-2.5 md:flex">
            {!loading && user ? (
              <>
                <div className="mr-1 text-right">
                  <p className={`text-sm font-semibold leading-5 ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{user.name}</p>
                  <p className="text-xs leading-4 text-slate-500">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className={`rounded-xl border px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 ${
                    isDark 
                      ? 'border-slate-700 bg-slate-800 text-white hover:border-slate-600 hover:bg-slate-700 hover:text-indigo-400'
                      : 'border-[#CBD5E1] bg-white text-[#0F172A] hover:border-[#A5B4FC] hover:bg-[#EEF2FF] hover:text-[#4F46E5] hover:shadow-md'
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
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 hover:text-indigo-600 ${
                    isDark ? 'text-slate-300 hover:bg-slate-800/50' : 'text-slate-700 hover:bg-slate-100/70'
                  }`}
                  aria-label="Login"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            className={`rounded-xl border p-2.5 text-slate-700 shadow-sm transition-all duration-200 hover:border-[#A5B4FC] hover:bg-[#EEF2FF] hover:text-indigo-600 md:hidden ${
              isDark ? 'border-slate-800 bg-slate-900/90 text-slate-300 hover:border-slate-700 hover:bg-slate-800' : 'border-[#E2E8F0] bg-white/90'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div
            id="mobile-nav"
            className={`space-y-2 border-t py-4 shadow-lg backdrop-blur-md md:hidden ${
              isDark ? 'border-slate-800 bg-slate-900/95' : 'border-[#E2E8F0] bg-white/90'
            }`}
            role="navigation"
          >
            <Link
              href="/career-tracks"
              className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:text-indigo-600 ${
                isDark ? 'text-slate-300 hover:bg-slate-800/50' : 'text-slate-700 hover:bg-[#EEF2FF]'
              }`}
            >
              Career Tracks
            </Link>
            <Link
              href="/gigs"
              className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:text-indigo-600 ${
                isDark ? 'text-slate-300 hover:bg-slate-800/50' : 'text-slate-700 hover:bg-[#EEF2FF]'
              }`}
            >
              Projects
            </Link>
            {user && (
              <>
                <Link
                  href="/dashboard"
                  className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:text-indigo-600 ${
                    isDark ? 'text-slate-300 hover:bg-slate-800/50' : 'text-slate-700 hover:bg-[#EEF2FF]'
                  }`}
                >
                  Dashboard
                </Link>
                <div className={`border-t pt-4 ${isDark ? 'border-slate-800' : 'border-[#E2E8F0]'}`}>
                  <p className={`mb-1 text-sm font-semibold ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{user.name}</p>
                  <p className="mb-4 text-xs text-slate-500">{user.email}</p>
                  <button
                    onClick={handleLogout}
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 hover:text-indigo-600 ${
                      isDark 
                        ? 'border-slate-700 bg-slate-800 text-white hover:border-slate-600 hover:bg-slate-700'
                        : 'border-[#CBD5E1] bg-white text-[#0F172A] hover:border-[#A5B4FC] hover:bg-[#EEF2FF] hover:text-[#4F46E5]'
                    }`}
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
            {!loading && !user && (
              <div className={`flex flex-col gap-3 border-t pt-4 ${isDark ? 'border-slate-800' : 'border-[#E2E8F0]'}`}>
                <Link
                  href="/auth/login"
                  className={`block rounded-xl border px-4 py-2.5 text-center text-sm font-semibold shadow-sm transition-all duration-200 hover:text-indigo-600 ${
                    isDark 
                      ? 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-700'
                      : 'border-[#CBD5E1] bg-white text-[#0F172A] hover:border-[#A5B4FC] hover:bg-[#EEF2FF] hover:text-[#4F46E5]'
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="block rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
