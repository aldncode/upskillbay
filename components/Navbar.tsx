'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from './Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#0B0F19] border-b border-[#1F2937] sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#1E40AF] bg-clip-text text-transparent">
            UpskillBay
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/capsules" className="text-[#9CA3AF] hover:text-white transition-colors">
              Career Tracks
            </Link>
            <Link href="/gigs" className="text-[#9CA3AF] hover:text-white transition-colors">
              Projects
            </Link>
            <Link href="/dashboard" className="text-[#9CA3AF] hover:text-white transition-colors">
              Dashboard
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex gap-4 items-center">
            <Link href="/auth/login" className="text-[#9CA3AF] hover:text-white transition-colors">
              Login
            </Link>
            <Button variant="primary" size="sm" href="/auth/signup">
              Sign Up
            </Button>
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
            <Link href="/capsules" className="block text-[#9CA3AF] hover:text-white py-2">
              Career Tracks
            </Link>
            <Link href="/gigs" className="block text-[#9CA3AF] hover:text-white py-2">
              Projects
            </Link>
            <Link href="/dashboard" className="block text-[#9CA3AF] hover:text-white py-2">
              Dashboard
            </Link>
            <div className="flex gap-4 pt-4">
              <Link href="/auth/login" className="flex-1 text-center btn btn-secondary">
                Login
              </Link>
              <Link href="/auth/signup" className="flex-1 btn btn-primary">
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
