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

const benefits = [
  { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Real Projects', desc: 'Build portfolio pieces that prove your skills' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Career Ready', desc: 'Skills that employers and clients actually need' },
  { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Flexible Pace', desc: 'Learn at your speed, on your schedule' },
  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a4 4 0 11-8 0 4 4 0 018 0zM17 20a4 4 0 100-8 4 4 0 000 8z', title: 'Expert Support', desc: 'Guidance from industry professionals' },
];

const processSteps = [
  { num: '01', title: 'Choose Your Path', desc: 'Select a career track that matches your goals and current skill level', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { num: '02', title: 'Build Real Projects', desc: 'Complete hands-on assignments that create tangible portfolio pieces', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  { num: '03', title: 'Get Certified', desc: 'Earn credentials that validate your new skills and capabilities', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
  { num: '04', title: 'Launch Your Career', desc: 'Apply with your portfolio and proof to start earning', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
];

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
    { value: '', label: 'All' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#4F46E5]/5 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#7C3AED]/5 blur-3xl" />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
            <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#4F46E5]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#4F46E5]">
                    <span className="h-2 w-2 rounded-full bg-[#4F46E5]" />
                    Career Tracks
                  </span>
                </div>
                <h1 className="mb-6 text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl lg:text-[56px] leading-tight">
                  Transform your career with <span className="text-[#4F46E5]">real skills</span>
                </h1>
                <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-600">
                  Structured learning paths designed by industry experts. Build real projects, 
                  earn recognized credentials, and launch your career with confidence.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                    <svg className="h-4 w-4 text-[#4F46E5]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4.125-1.625a1 1 0 00.788-.38l-.003.003a1 1 0 01-.14.09l-1.975 1.02a1 1 0 00-.37.306l.002.002a1 1 0 01.37.306l1.976-1.02a1 1 0 00.14-.09l1.975-1.022a.999.999 0 01.356.257l4.125 1.625a1 1 0 00.788.38l.003-.003a1 1 0 01-.37.306l-.002.002a1 1 0 00-.37.306l1.976 1.02a1 1 0 00.14.09l1.975 1.022a.999.999 0 01-.356.257l-4.125-1.625a1 1 0 00-.788-.38l-1.976-1.022a1 1 0 01-.37-.306l.002-.002a1 1 0 00.37-.306l1.976-1.02a1 1 0 00.14-.09l1.975-1.022.003.003z" />
                    </svg>
                    {careerTracks.length} career paths
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                    <svg className="h-4 w-4 text-[#4F46E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    4-16 week programs
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                    <svg className="h-4 w-4 text-[#4F46E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Job-ready outcomes
                  </div>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="relative rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-sm">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4F46E5]/5 via-transparent to-[#7C3AED]/5" />
                  <div className="relative">
                    <h3 className="mb-5 text-lg font-bold text-[#0F172A]">Why UpskillBay?</h3>
                    <div className="space-y-4">
                      {benefits.map((item) => (
                        <div key={item.title} className="flex items-start gap-3">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#4F46E5]/10">
                            <svg className="h-4 w-4 text-[#4F46E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#0F172A]">{item.title}</p>
                            <p className="text-xs text-slate-500">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {!session?.user && (
                      <Link
                        href="/auth/signup"
                        className="mt-6 block w-full rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] py-3 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
                      >
                        Start Learning Free
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sticky top-16 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-6 py-4 md:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
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
                  placeholder="Search careers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-[#4F46E5] focus:bg-white focus:ring-4 focus:ring-[#4F46E5]/10 sm:w-72"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10 md:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">Browse Career Tracks</h2>
              <p className="mt-1 text-sm text-slate-500">
                {loading ? 'Loading...' : `Showing ${filteredTracks.length} of ${careerTracks.length} tracks`}
              </p>
            </div>
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
                onClick={() => { setSearch(''); setLevel(''); }}
                className="rounded-xl bg-[#4F46E5] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#4338CA]"
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
            <div className="mx-auto max-w-7xl px-6 py-20 md:px-8">
              <div className="mb-12 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#4F46E5]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#4F46E5]">
                  <span className="h-2 w-2 rounded-full bg-[#4F46E5]" />
                  Your Journey
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl">
                  From enrollment to career launch
                </h2>
                <p className="mt-4 text-lg text-slate-600">A clear path to measurable career growth</p>
              </div>
              
              <div className="relative">
                <div className="absolute left-1/2 top-0 bottom-0 hidden w-px bg-gradient-to-b from-transparent via-[#4F46E5]/30 to-transparent lg:block" />
                
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-8">
                  {processSteps.map((step, index) => (
                    <div key={step.num} className={`relative lg:text-center ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                      <div className="mb-4 flex items-center gap-4 lg:mb-6 lg:justify-center">
                        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-xl font-bold text-white shadow-lg shadow-indigo-500/25">
                          {step.num}
                        </div>
                      </div>
                      <div className="lg:bg-white lg:p-6 lg:rounded-2xl lg:border lg:border-slate-100 lg:shadow-sm">
                        <h3 className="mb-2 text-lg font-bold text-[#0F172A]">{step.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {!loading && careerTracks.length > 0 && (
          <section className="relative overflow-hidden bg-[#0F172A] py-20">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-[#4F46E5]/20 blur-3xl" />
              <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-[#7C3AED]/20 blur-3xl" />
            </div>
            
            <div className="relative mx-auto max-w-4xl px-6 text-center md:px-8">
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Ready to transform your career?
              </h2>
              <p className="mb-8 text-lg text-slate-300">
                Join thousands of learners who have built real skills and real careers through UpskillBay.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                {!session?.user ? (
                  <>
                    <Link
                      href="/auth/signup"
                      className="rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
                    >
                      Get Started Free
                    </Link>
                    <Link
                      href="/career-tracks"
                      className="rounded-xl border border-slate-600 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/10"
                    >
                      Browse Tracks
                    </Link>
                  </>
                ) : (
                  <p className="text-lg font-medium text-white">You're signed in. Start exploring tracks above!</p>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}