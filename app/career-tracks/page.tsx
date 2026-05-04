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
  const [focus, setFocus] = useState<'all' | 'high-income' | 'fast-track'>('all');
  const [userEnrollments, setUserEnrollments] = useState<Set<string>>(new Set());

  const filteredTracks = useMemo(() => {
    return careerTracks
      .filter((track) => {
        if (!level) return true;
        return track.level.toLowerCase() === level.toLowerCase();
      })
      .filter((track) => {
        if (focus === 'all') return true;
        if (focus === 'high-income') {
          return /\$|high income|high-income|earning|income/i.test(
            track.earningPotential
          );
        }
        if (focus === 'fast-track') {
          return /fast|4 weeks|6 weeks|8 weeks|short|rapid/i.test(track.duration);
        }
        return true;
      });
  }, [careerTracks, focus, level]);

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
          <div className="relative mb-12 grid gap-6 rounded-3xl border border-white/80 bg-white/90 p-6 shadow-lg shadow-slate-200/60 backdrop-blur md:grid-cols-[1.2fr_0.8fr] md:gap-8 md:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#4F46E5]">
                Start here
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#111827] md:text-4xl">
                Pick the track that fits your next career goal.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#4B5563]">
                Our career system is built for learners who want real work, fast growth, and income-ready proof. Start with the path that matches your objective.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="#tracks"
                onClick={() => {
                  setLevel('beginner');
                  setFocus('all');
                }}
                className="rounded-2xl border border-[#E5E7EB] bg-[#EEF2FF] px-5 py-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="text-sm font-semibold text-[#111827]">Build portfolio fast</p>
                <p className="mt-2 text-sm leading-6 text-[#4B5563]">
                  Ideal for beginners who want structured projects + a polished showcase.
                </p>
              </Link>
              <Link
                href="#tracks"
                onClick={() => {
                  setLevel('');
                  setFocus('high-income');
                }}
                className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="text-sm font-semibold text-[#111827]">Launch income faster</p>
                <p className="mt-2 text-sm leading-6 text-[#4B5563]">
                  Great for learners focused on freelance gigs, side income, and early pay.
                </p>
              </Link>
              <Link
                href="#tracks"
                onClick={() => {
                  setLevel('');
                  setFocus('fast-track');
                }}
                className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="text-sm font-semibold text-[#111827]">Fast-track your skill set</p>
                <p className="mt-2 text-sm leading-6 text-[#4B5563]">
                  Designed for motivated learners who want a shorter, outcome-driven path.
                </p>
              </Link>
              <Link
                href="#tracks"
                onClick={() => {
                  setLevel('intermediate');
                  setFocus('all');
                }}
                className="rounded-2xl border border-[#E5E7EB] bg-[#EEF2FF] px-5 py-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="text-sm font-semibold text-[#111827]">Improve practical skills</p>
                <p className="mt-2 text-sm leading-6 text-[#4B5563]">
                  The right choice for learners ready to move beyond basics into project work.
                </p>
              </Link>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: 'easeOut' }}
            className="relative mb-10 rounded-2xl border border-white/80 bg-white/85 p-5 shadow-lg shadow-slate-200/70 backdrop-blur md:p-6"
          >
            <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold text-[#4F46E5]">Find your next move</p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#111827]">Browse career tracks</h2>
              </div>
              <div className="flex flex-col items-start gap-2 text-sm text-[#6B7280] md:items-end">
                <p>
                  {loading
                    ? 'Loading curated paths...'
                    : `Showing ${filteredTracks.length} of ${careerTracks.length} tracks`}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setLevel('beginner');
                      setFocus('all');
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      level === 'beginner' && focus === 'all'
                        ? 'bg-[#4F46E5] text-white shadow-sm'
                        : 'bg-slate-100 text-[#475569] hover:bg-slate-200'
                    }`}
                  >
                    Beginner
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFocus('high-income');
                      setLevel('');
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      focus === 'high-income'
                        ? 'bg-[#4F46E5] text-white shadow-sm'
                        : 'bg-slate-100 text-[#475569] hover:bg-slate-200'
                    }`}
                  >
                    High income
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFocus('fast-track');
                      setLevel('');
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      focus === 'fast-track'
                        ? 'bg-[#4F46E5] text-white shadow-sm'
                        : 'bg-slate-100 text-[#475569] hover:bg-slate-200'
                    }`}
                  >
                    Fast track
                  </button>
                </div>
              </div>
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
          ) : filteredTracks.length === 0 ? (
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
              {filteredTracks.map((track) => (
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
            <>
              <section className="mt-16 rounded-3xl border border-[#E5E7EB] bg-white/90 p-8 shadow-lg shadow-slate-200/60 backdrop-blur md:p-12">
                <div className="grid gap-10 lg:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#4F46E5]">
                      What you get
                    </p>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] md:text-4xl">
                      Projects, proof, and income-ready support.
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-7 text-[#4B5563]">
                      Each career track is designed to deliver measurable progress: a portfolio, real assignments, and the confidence to turn your work into income.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      'Real project assignments that mirror client briefs',
                      'Portfolio pieces you can share with employers and clients',
                      'Income-focused guidance for gigs, internships, and freelance offers',
                      'Clear milestones that keep every week goal-directed',
                    ].map((item) => (
                      <div key={item} className="rounded-3xl border border-[#E5E7EB] bg-[#EEF2FF] p-5 text-sm text-[#334155] shadow-sm">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="mt-12 grid gap-10 lg:grid-cols-3">
                {[
                  {
                    title: 'Portfolio-ready outcomes',
                    description: 'Build real deliverables that show employers and clients you can complete work end to end.',
                  },
                  {
                    title: 'Freelance and gig momentum',
                    description: 'Use your completed projects to pitch for paid work and launch a side-income track.',
                  },
                  {
                    title: 'Internship and entry-level readiness',
                    description: 'Focus on practical skills that map directly to interviews, applications, and hiring criteria.',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                    <h3 className="mb-3 text-xl font-semibold text-[#111827]">{item.title}</h3>
                    <p className="text-sm leading-7 text-[#475569]">{item.description}</p>
                  </div>
                ))}
              </section>

              <section className="mt-12 rounded-3xl border border-[#E5E7EB] bg-[#F8FAFC] p-8 shadow-sm md:p-10">
                <div className="mb-8 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#4F46E5]">
                    FAQ
                  </p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#111827]">
                    Common questions from new learners.
                  </h2>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    {
                      question: 'Do I need prior experience?',
                      answer: 'No. Each track is built for learners starting with the basics, then adding real practice and income-ready work.',
                    },
                    {
                      question: 'Can I earn while learning?',
                      answer: 'Yes. The projects and portfolio guidance are designed to help you win freelance gigs, internships, and early paid opportunities.',
                    },
                    {
                      question: 'How long before I can apply?',
                      answer: 'Most students can share portfolio-ready outcomes in weeks, and every track includes milestones so your progress stays measurable.',
                    },
                  ].map((item) => (
                    <div key={item.question} className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
                      <p className="mb-3 text-lg font-semibold text-[#111827]">{item.question}</p>
                      <p className="text-sm leading-7 text-[#475569]">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </>
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
