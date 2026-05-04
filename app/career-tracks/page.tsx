'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { motion, type Variants } from 'framer-motion';
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

  useEffect(() => {
    const fetchCareerTracks = async () => {
      try {
        setLoading(true);
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

  useEffect(() => {
    const fetchUserEnrollments = async () => {
      if (!session?.user) return;

      try {
        const res = await fetch('/api/enrollments');
        const data = await res.json();
        const enrolledTrackIds = new Set<string>(
          (data.enrollments?.map((e: any) => e.careerTrackId as string) || []) as string[]
        );
        setUserEnrollments(enrolledTrackIds);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      }
    };

    fetchUserEnrollments();
  }, [session]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' },
    },
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen overflow-hidden bg-[#F8FAFC]">
        <section className="relative border-b border-indigo-100/70 bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.14),_transparent_32%),linear-gradient(135deg,_#FFFFFF_0%,_#F8FAFC_52%,_#EEF2FF_100%)]">
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
          <div className="relative mx-auto max-w-[1200px] px-6 pb-20 pt-20 md:pb-24 md:pt-24">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="max-w-3xl"
            >
              <p className="mb-4 inline-flex rounded-full border border-indigo-200 bg-white/80 px-4 py-2 text-sm font-semibold text-[#4F46E5] shadow-sm backdrop-blur">
                Career Tracks
              </p>
              <h1 className="mb-5 text-4xl font-bold tracking-tight text-[#111827] md:text-6xl">
                Learn job-ready skills from structured career paths.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[#4B5563] md:text-xl">
                Choose a track, build practical projects, and move toward paid work with clear outcomes and timelines.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="#tracks"
                  className="inline-flex rounded-xl bg-[#4F46E5] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#4338CA] hover:shadow-xl hover:shadow-indigo-500/30"
                >
                  Explore Tracks
                </Link>
                {!session?.user && (
                  <Link
                    href="/auth/signup"
                    className="inline-flex rounded-xl border border-[#E5E7EB] bg-white/90 px-6 py-3 text-sm font-semibold text-[#111827] shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-indigo-200 hover:shadow-md"
                  >
                    Start Free
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="tracks" className="relative mx-auto max-w-[1200px] px-6 py-12 md:py-16">
          <div className="pointer-events-none absolute -right-40 top-24 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: 'easeOut' }}
            className="relative mb-10 rounded-2xl border border-white/80 bg-white/85 p-5 shadow-lg shadow-slate-200/70 backdrop-blur md:p-6"
          >
            <div className="mb-5 flex flex-col justify-between gap-2 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold text-[#4F46E5]">Find your next move</p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#111827]">Browse career tracks</h2>
              </div>
              <p className="text-sm text-[#6B7280]">
                {loading ? 'Loading curated paths...' : `${careerTracks.length} track${careerTracks.length === 1 ? '' : 's'} available`}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#111827]">
                  Search tracks
                </label>
                <input
                  type="text"
                  placeholder="Search by skill or title"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input rounded-xl border-slate-200 bg-white/90 shadow-sm focus:shadow-md"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#111827]">
                  Difficulty level
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="input rounded-xl border-slate-200 bg-white/90 shadow-sm focus:shadow-md"
                >
                  <option value="">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </motion.div>

          {loading ? (
            <div className="relative rounded-2xl border border-white/80 bg-white/85 p-12 text-center shadow-lg shadow-slate-200/70 backdrop-blur">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#E5E7EB] border-t-[#4F46E5]" />
              <p className="font-medium text-[#6B7280]">Loading career tracks...</p>
            </div>
          ) : careerTracks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="relative rounded-2xl border border-white/80 bg-white/85 p-12 text-center shadow-lg shadow-slate-200/70 backdrop-blur"
            >
              <h2 className="mb-3 text-2xl font-bold text-[#111827]">
                No matching tracks found
              </h2>
              <p className="mx-auto mb-6 max-w-md text-[#6B7280]">
                Try a broader search or reset the difficulty filter to see every available path.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setLevel('');
                }}
                className="rounded-xl bg-[#4F46E5] px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#4338CA] hover:shadow-xl hover:shadow-indigo-500/30"
              >
                View All Tracks
              </button>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {careerTracks.map((track) => (
                <motion.div key={track.id} variants={itemVariants}>
                  <CareerTrackCard
                    track={track}
                    enrolled={userEnrollments.has(track.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && careerTracks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
              className="relative mt-16 overflow-hidden rounded-3xl bg-[linear-gradient(135deg,_#312E81_0%,_#4F46E5_48%,_#06B6D4_100%)] p-8 text-center shadow-2xl shadow-indigo-500/25 md:p-12"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.28),_transparent_30%)]" />
              <div className="relative">
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Ready to start learning?
              </h2>
              <p className="mx-auto mb-7 max-w-2xl leading-7 text-indigo-50">
                Join a structured path, complete real assignments, and build proof of work you can show clients or employers.
              </p>
              {!session?.user ? (
                <Link
                  href="/auth/signup"
                  className="inline-flex rounded-xl bg-white px-8 py-3 font-semibold text-[#312E81] shadow-lg shadow-slate-950/20 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl"
                >
                  Get Started Free
                </Link>
              ) : (
                <p className="font-semibold text-white">
                  You are signed in. Pick a track above to continue.
                </p>
              )}
              </div>
            </motion.div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
