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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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
    `rounded-full px-3 py-2 text-sm font-semibold transition-all duration-200 ${
      pathname === href
        ? 'bg-[#EEF2FF] text-[#4F46E5]'
        : 'text-[#4B5563] hover:bg-slate-50 hover:text-[#4F46E5]'
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/70 bg-white/85 shadow-sm shadow-slate-200/70 backdrop-blur-xl">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-[#111827] transition-colors duration-200 hover:text-[#4F46E5]">
            UpskillBay
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-[#E5E7EB]/80 bg-white/70 p-1 shadow-sm md:flex">
            <Link href="/career-tracks" className={navLinkClass('/career-tracks')}>
              Career Tracks
            </Link>
            <Link href="/gigs" className={navLinkClass('/gigs')}>
              Projects
            </Link>
            {user && (
              <Link href="/dashboard" className={navLinkClass('/dashboard')}>
                Dashboard
              </Link>
            )}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {!loading && user ? (
              <>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#111827]">{user.name}</p>
                  <p className="text-xs text-[#6B7280]">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-[#E5E7EB] bg-white px-5 py-2 text-sm font-semibold text-[#374151] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-[#D1D5DB] hover:shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="px-4 py-2 text-sm font-semibold text-[#4B5563] transition-colors duration-200 hover:text-[#4F46E5]">
                  Login
                </Link>
                <Link href="/auth/signup" className="rounded-xl bg-[#4F46E5] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#4338CA] hover:shadow-xl hover:shadow-indigo-500/30">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            className="rounded-xl border border-[#E5E7EB] bg-white p-2 text-[#374151] shadow-sm md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="space-y-2 border-t border-[#E5E7EB]/80 bg-white/90 py-4 shadow-sm md:hidden">
            <Link href="/career-tracks" className="block rounded-xl px-3 py-2 text-sm font-semibold text-[#4B5563] hover:bg-slate-50 hover:text-[#4F46E5]">
              Career Tracks
            </Link>
            <Link href="/gigs" className="block rounded-xl px-3 py-2 text-sm font-semibold text-[#4B5563] hover:bg-slate-50 hover:text-[#4F46E5]">
              Projects
            </Link>
            {user && (
              <>
                <Link href="/dashboard" className="block rounded-xl px-3 py-2 text-sm font-semibold text-[#4B5563] hover:bg-slate-50 hover:text-[#4F46E5]">
                  Dashboard
                </Link>
                <div className="border-t border-[#E5E7EB] pt-4">
                  <p className="mb-1 text-sm font-semibold text-[#111827]">{user.name}</p>
                  <p className="mb-4 text-xs text-[#6B7280]">{user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-semibold text-[#374151] shadow-sm transition-all duration-200 hover:shadow-md"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
            {!loading && !user && (
              <div className="flex flex-col gap-3 border-t border-[#E5E7EB] pt-4">
                <Link href="/auth/login" className="block rounded-xl border border-[#E5E7EB] bg-white px-4 py-2 text-center text-sm font-semibold text-[#374151] shadow-sm">
                  Login
                </Link>
                <Link href="/auth/signup" className="block rounded-xl bg-[#4F46E5] px-4 py-2 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-500/25">
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
