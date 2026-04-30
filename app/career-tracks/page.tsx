'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import CareerTrackCard from '@/components/CareerTrackCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface CareerTrack {
  id: string;
  title: string;
  description: string;
  outcome: string;
  duration: string;
  earningPotential: string;
  skills: string[];
  level: string;
  enrollments?: { userId: string }[];
}

export default function CareerTracksPage() {
  const { data: session } = useSession();
  const [careerTracks, setCareerTracks] = useState<CareerTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('');
  const [userEnrollments, setUserEnrollments] = useState<Set<string>>(new Set());

  // Fetch career tracks
  useEffect(() => {
    const fetchCareerTracks = async () => {
      try {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (level) params.append('level', level);

        const res = await fetch(`/api/career-tracks?${params}`);
        const data = await res.json();
        setCareerTracks(data);
      } catch (error) {
        console.error('Error fetching career tracks:', error);
        toast.error('Failed to load career tracks');
      } finally {
        setLoading(false);
      }
    };

    fetchCareerTracks();
  }, [search, level]);

  // Fetch user enrollments
  useEffect(() => {
    const fetchUserEnrollments = async () => {
      if (!session?.user) return;

      try {
        const res = await fetch('/api/enrollments');
        const data = await res.json();
        const enrolledTrackIds = new Set(
          data.enrollments?.map((e: any) => e.careerTrackId) || []
        );
        setUserEnrollments(enrolledTrackIds);
        console.log('User enrollments:', enrolledTrackIds);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      }
    };

    fetchUserEnrollments();
  }, [session]);

  // Handle enrollment
  const handleEnroll = async (trackId: string) => {
    if (!session?.user) {
      toast.error('Please sign in to enroll');
      return;
    }

    try {
      console.log('Enrolling in track:', trackId);
      const res = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ careerTrackId: trackId }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to enroll');
      }

      const data = await res.json();
      console.log('Enrollment response:', data);

      // Update local state
      setUserEnrollments((prev) => new Set([...prev, trackId]));
      toast.success('Successfully enrolled! Redirecting to dashboard...');

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    } catch (error: any) {
      console.error('Enrollment error:', error);
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            <svg
              className="w-12 h-12 text-[#3B82F6]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </motion.div>
          <p className="text-[#9CA3AF] mt-4">Loading career tracks...</p>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0B0F19]">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-b border-[#1F2937] py-16"
        >
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Career Tracks
            </h1>
            <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
              Master in-demand skills and launch your freelance career. Choose a track, complete modules, and start earning.
            </p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-12 bg-[#111827] border border-[#1F2937] rounded-xl p-6 hover:border-[#3B82F6]/50 transition-all duration-200"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-semibold text-[#E2E8F0] mb-3">
                  Search Tracks
                </label>
                <input
                  type="text"
                  placeholder="Search career tracks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1F2937] rounded-lg text-white placeholder-[#6B7280] focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/50 transition-all duration-200"
                />
              </div>

              {/* Level Filter */}
              <div>
                <label className="block text-sm font-semibold text-[#E2E8F0] mb-3">
                  Difficulty Level
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1F2937] rounded-lg text-white focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/50 transition-all duration-200"
                >
                  <option value="">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Tracks Grid */}
          {careerTracks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-6">🚀</div>
              <p className="text-lg text-[#9CA3AF] mb-8">
                No career tracks found. Try adjusting your filters.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setLevel('');
                }}
                className="px-6 py-3 bg-[#111827] border border-[#3B82F6] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#3B82F6]/20 hover:-translate-y-1 transition-all duration-200"
              >
                View All Tracks
              </button>
            </motion.div>
          ) : (
            <motion.div
              className="grid md:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {careerTracks.map((track) => (
                <motion.div key={track.id} variants={itemVariants}>
                  <CareerTrackCard
                    track={track}
                    onEnroll={handleEnroll}
                    enrolled={userEnrollments.has(track.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* CTA Section */}
          {careerTracks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 bg-[#111827] border border-[#1F2937] rounded-xl p-8 text-center"
            >
              <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">
                Ready to level up your career?
              </h3>
              <p className="text-[#9CA3AF] mb-8 max-w-2xl mx-auto leading-relaxed">
                Pick a track, complete the modules, build projects, and start earning money within weeks.
              </p>
              {!session?.user ? (
                <Link
                  href="/auth/signup"
                  className="inline-block px-8 py-3 bg-[#111827] border border-[#3B82F6] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#3B82F6]/20 hover:-translate-y-1 transition-all duration-200"
                >
                  Get Started Free
                </Link>
              ) : (
                <p className="text-[#10B981] font-medium">
                  ✓ You're all set! Start a track above.
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

