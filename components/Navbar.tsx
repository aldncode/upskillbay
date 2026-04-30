'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

  return (
    <nav className="bg-[#0B0F19] border-b border-[#1F2937] sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white hover:text-[#3B82F6] transition-colors duration-200">
            UpskillBay
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/career-tracks" className="text-[#9CA3AF] hover:text-white transition-colors duration-200">
              Career Tracks
            </Link>
            <Link href="/gigs" className="text-[#9CA3AF] hover:text-white transition-colors duration-200">
              Projects
            </Link>
            {user && (
              <Link href="/dashboard" className="text-[#9CA3AF] hover:text-white transition-colors duration-200">
                Dashboard
              </Link>
            )}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex gap-3 items-center">
            {!loading && user ? (
              <>
                <div className="text-right">
                  <p className="text-white font-medium text-sm">{user.name}</p>
                  <p className="text-[#9CA3AF] text-xs">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-[#111827] border border-[#1F2937] text-[#9CA3AF] rounded-lg hover:border-[#3B82F6]/30 hover:text-white transition-all duration-200 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="px-6 py-2 text-[#9CA3AF] hover:text-white transition-colors duration-200">
                  Login
                </Link>
                <Link href="/auth/signup" className="px-6 py-2 bg-[#111827] border border-[#3B82F6] text-white rounded-lg hover:shadow-lg hover:shadow-[#3B82F6]/20 hover:-translate-y-1 transition-all duration-200 font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-[#1F2937]">
            <Link href="/career-tracks" className="block text-[#9CA3AF] hover:text-white py-2 transition-colors duration-200">
              Career Tracks
            </Link>
            <Link href="/gigs" className="block text-[#9CA3AF] hover:text-white py-2 transition-colors duration-200">
              Projects
            </Link>
            {user && (
              <>
                <Link href="/dashboard" className="block text-[#9CA3AF] hover:text-white py-2 transition-colors duration-200">
                  Dashboard
                </Link>
                <div className="py-4 border-t border-[#1F2937]">
                  <p className="text-white font-medium text-sm mb-2">{user.name}</p>
                  <p className="text-[#9CA3AF] text-xs mb-4">{user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-[#111827] border border-[#1F2937] text-[#9CA3AF] rounded-lg hover:border-[#3B82F6]/30 transition-all duration-200 font-medium text-sm"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
            {!loading && !user && (
              <div className="flex flex-col gap-3 pt-4 border-t border-[#1F2937]">
                <Link href="/auth/login" className="block text-center px-4 py-2 border border-[#1F2937] text-white rounded-lg hover:border-[#3B82F6]/30 transition-all duration-200">
                  Login
                </Link>
                <Link href="/auth/signup" className="block text-center px-4 py-2 bg-[#111827] border border-[#3B82F6] text-white rounded-lg hover:shadow-lg hover:shadow-[#3B82F6]/20 transition-all duration-200 font-medium">
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
