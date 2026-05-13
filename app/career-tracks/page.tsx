'use client';

import { useEffect, useMemo, useState } from 'react';
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

  const filteredTracks = useMemo(() => {
    return careerTracks.filter((track) => {
      if (search && !track.title.toLowerCase().includes(search.toLowerCase()) && 
          !track.description.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (level && track.level.toLowerCase() !== level.toLowerCase()) {
        return false;
      }
      return true;
    });
  }, [careerTracks, search, level]);

  useEffect(() => {
    const fetchCareerTracks = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/career-tracks');
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
  }, []);

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
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: 'easeOut' },
    },
  };

  const filterTabs = [
    { value: '', label: 'All Tracks' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <section className="bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:gap-12">
              <div>
                <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[#4F46E5]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#4F46E5]/10">
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4.125-1.625a1 1 0 00.788-.38l-.003.003a1 1 0 01-.14.09l-1.975 1.02a1 1 0 00-.37.306l.002.002a1 1 0 01.37.307l1.976-1.02a1 1 0 00.14-.09l1.975-1.022a.999.999 0 01.356.257l4.125 1.625a1 1 0 00.788.38l.003-.003a1 1 0 01-.37.306l-.002.002a1 1 0 00-.37.306l1.976 1.02a1 1 0 00.14.09l1.975 1.022a.999.999 0 01-.356.257l-4.125 1.625a1 1 0 00-.788.38l1.975 1.022a1 1 0 01.37.306l-.002.002a1 1 0 00-.37.306l-1.976 1.02a1 1 0 00-.14.09l-1.975 1.022a.999.999 0 01-.356.257l-4.125-1.625a1 1 0 00-.788-.38l-1.976-1.022a1 1 0 01-.37-.306l.002-.002a1 1 0 00.37-.306l1.976-1.02a1 1 0 00.14-.09l1.975-1.022.003.003zM6.894 9.06a1 1 0 00-1.788 0l-3.5 2a1 1 0 000 1.788l3.5 2a1 1 0 001.788 0l3.5-2a1 1 0 000-1.788l-3.5-2zM10.5 7.5a1 1 0 10-2 0v2.268a3 3 0 00-.879 2.098l1.536 2.98a1 1 0 001.756-.233l1.5-2.866A3 3 0 0012.5 9.768V7.5a1 1 0 00-2 0zM13.106 9.06a1 1 0 00-1.788 0l-3.5 2a1 1 0 000 1.788l3.5 2a1 1 0 001.788 0l3.5-2a1 1 0 000-1.788l-3.5-2z" />
                    </svg>
                  </span>
                  Career Tracks
                </div>
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl lg:text-[42px]">
                  Find your path to a new career
                </h1>
                <p className="mb-6 max-w-2xl text-base leading-relaxed text-slate-600">
                  Structured learning paths with real projects, portfolio outcomes, and earning potential. Choose a track and start building your future.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                    <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a4 4 0 11-8 0 4 4 0 018 0zM17 20a4 4 0 100-8 4 4 0 000 8z" />
                    </svg>
                    {careerTracks.length} tracks available
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                    <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    4-12 week programs
                  </div>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-[#4F46E5]/5 to-[#7C3AED]/5 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-[#0F172A]">Why UpskillBay?</h3>
                  <ul className="space-y-3">
                    {[
                      'Real client projects',
                      'Portfolio-ready outcomes',
                      'Flexible learning schedule',
                      'Career support & guidance',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4F46E5]">
                          <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {!session?.user && (
                    <Link
                      href="/auth/signup"
                      className="mt-6 block w-full rounded-xl bg-[#4F46E5] py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#4338CA]"
                    >
                      Get Started Free
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sticky top-16 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6 py-4 md:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setLevel(tab.value)}
                    className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      level === tab.value
                        ? 'bg-[#4F46E5] text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search tracks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-[#4F46E5] focus:bg-white sm:w-64"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-8 md:px-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              {loading ? (
                'Loading...'
              ) : (
                <>
                  Showing <span className="font-semibold text-[#0F172A]">{filteredTracks.length}</span> of{' '}
                  <span className="font-semibold text-[#0F172A]">{careerTracks.length}</span> tracks
                </>
              )}
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-[#4F46E5]" />
            </div>
          ) : filteredTracks.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#0F172A]">No tracks found</h3>
              <p className="mb-6 text-slate-600">Try adjusting your filters or search terms</p>
              <button
                onClick={() => {
                  setSearch('');
                  setLevel('');
                }}
                className="rounded-lg bg-[#4F46E5] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA]"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredTracks.map((track, index) => (
                <motion.div key={track.id} variants={itemVariants}>
                  <CareerTrackCard
                    track={track}
                    enrolled={userEnrollments.has(track.id)}
                    featured={index === 0}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>

        {!loading && careerTracks.length > 0 && (
          <section className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
              <div className="mb-10 text-center">
                <h2 className="mb-3 text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">
                  How it works
                </h2>
                <p className="text-slate-600">Your journey from enrollment to earning</p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                {[
                  { step: '01', title: 'Choose a Track', desc: 'Pick a path that matches your goals and schedule' },
                  { step: '02', title: 'Build Projects', desc: 'Complete real assignments that build your portfolio' },
                  { step: '03', title: 'Get Certified', desc: 'Earn credentials that prove your skills' },
                  { step: '04', title: 'Start Earning', desc: 'Apply for gigs with your portfolio and proof' },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#4F46E5]/10 text-lg font-bold text-[#4F46E5]">
                      {item.step}
                    </div>
                    <h3 className="mb-2 font-semibold text-[#0F172A]">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {!loading && careerTracks.length > 0 && (
          <section className="bg-[#0F172A] py-16">
            <div className="mx-auto max-w-7xl px-6 text-center md:px-8">
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
                Ready to start learning?
              </h2>
              <p className="mb-8 text-slate-300">
                Join learners who are building real skills and real careers
              </p>
              {!session?.user ? (
                <Link
                  href="/auth/signup"
                  className="inline-flex rounded-xl bg-[#4F46E5] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#4338CA]"
                >
                  Get Started Free
                </Link>
              ) : (
                <p className="font-medium text-white">You're signed in. Browse tracks above to continue.</p>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}