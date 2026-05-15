'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface UserProfile {
  interest?: string;
  experienceLevel?: string;
  goal?: string;
  skills?: string[];
  toolsKnown?: string[];
  availability?: number;
  portfolioLinks?: string[];
  pastWorkDescription?: string;
  resumeURL?: string;
  linkedinURL?: string;
  location?: string;
  expectedSalary?: number;
}

interface CareerTrack {
  id: string;
  title: string;
  description: string;
  outcome: string;
  duration: string;
  earningPotential: string;
  skills: string[];
  level: string;
}

interface DashboardData {
  enrollments: any[];
  submissions: any[];
  applications: any[];
  trackApplications: any[];
  careerTrackEnrollments?: any[];
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData>({
    enrollments: [],
    submissions: [],
    applications: [],
    trackApplications: [],
    careerTrackEnrollments: [],
  });
  const [profile, setProfile] = useState<UserProfile>({});
  const [careerTracks, setCareerTracks] = useState<CareerTrack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, profileRes] = await Promise.all([
          fetch('/api/user'),
          fetch('/api/profile'),
        ]);
        
        const userData = await userRes.json();
        const profileData = profileRes.ok ? await profileRes.json() : {};

        setProfile(profileData);
        
        setData({
          enrollments: userData.enrollments || [],
          submissions: userData.submissions || [],
          applications: userData.applications || [],
          trackApplications: userData.trackApplications || [],
          careerTrackEnrollments: userData.careerTrackEnrollments || [],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  useEffect(() => {
    const fetchCareerTracks = async () => {
      try {
        const res = await fetch('/api/career-tracks');
        const tracks = await res.json();
        setCareerTracks(tracks.slice(0, 4));
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };
    fetchCareerTracks();
  }, []);

  const user = session?.user as any;
  const userName = user?.name?.split(' ')[0] || 'Learner';
  
  const profileCompleteness = () => {
    const fields = ['interest', 'experienceLevel', 'goal', 'skills', 'location', 'linkedinURL', 'portfolioLinks'];
    let filled = 0;
    fields.forEach(f => {
      if (f === 'skills' && (profile.skills?.length ?? 0) > 0) filled++;
      else if (f === 'portfolioLinks' && (profile.portfolioLinks?.length ?? 0) > 0) filled++;
      else if (profile[f as keyof UserProfile]) filled++;
    });
    return Math.round((filled / fields.length) * 100);
  };

  const completionPercent = profileCompleteness();
  const hasEnrollments = (data.careerTrackEnrollments?.length || 0) > 0;
  const approvedCount = data.submissions?.filter((s) => s.status === 'approved').length || 0;
  const applicationsCount = data.trackApplications?.length || 0;
  
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'submitted':
        return { label: 'Submitted', color: 'bg-blue-100 text-blue-700', step: 1 };
      case 'under_review':
        return { label: 'Under Review', color: 'bg-amber-100 text-amber-700', step: 2 };
      case 'shortlisted':
        return { label: 'Shortlisted', color: 'bg-purple-100 text-purple-700', step: 3 };
      case 'approved':
        return { label: 'Approved', color: 'bg-emerald-100 text-emerald-700', step: 4 };
      case 'rejected':
        return { label: 'Rejected', color: 'bg-red-100 text-red-700', step: -1 };
      default:
        return { label: status, color: 'bg-slate-100 text-slate-700', step: 0 };
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getMotivationalMessage = () => {
    if (completionPercent < 50) return 'Complete your profile to get personalized recommendations';
    if (!hasEnrollments) return 'Start your learning journey with a career track';
    return 'Keep up the momentum! You\'re making progress';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="animate-pulse space-y-8">
          <div className="h-40 rounded-2xl bg-slate-200" />
          <div className="grid gap-6 md:grid-cols-4">
            {[1,2,3,4].map(i => <div key={i} className="h-28 rounded-xl bg-slate-200" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <motion.section
        className="relative mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/5 via-transparent to-[#7C3AED]/5" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#4F46E5]/5 blur-3xl" />
        
        <div className="relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium text-[#4F46E5]">{getGreeting()}</p>
              <h1 className="mb-3 text-3xl font-bold tracking-tight text-[#0F172A]">
                Welcome back, <span className="text-[#4F46E5]">{userName}</span>
              </h1>
              <p className="text-base text-slate-600">{getMotivationalMessage()}</p>
            </div>
            
            {completionPercent < 100 && (
              <div className="flex items-center gap-4 rounded-xl border border-amber-200 bg-amber-50/50 px-5 py-4">
                <div className="relative h-12 w-12">
                  <svg className="h-12 w-12 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                    <circle 
                      cx="18" cy="18" r="16" fill="none" stroke="#F59E0B" strokeWidth="3"
                      strokeDasharray={`${completionPercent} 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-amber-700">{completionPercent}%</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber-900">Profile incomplete</p>
                  <p className="text-xs text-amber-700">{100 - completionPercent}% remaining</p>
                </div>
                <Link 
                  href="/profile/setup?step=2"
                  className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-600"
                >
                  Complete
                </Link>
              </div>
            )}
          </div>

          {hasEnrollments && (
            <div className="mt-6 flex flex-wrap gap-3">
              {data.careerTrackEnrollments?.slice(0, 2).map((enrollment: any) => (
                <Link
                  key={enrollment.id}
                  href={`/career-tracks/${enrollment.careerTrackId}`}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:border-[#4F46E5] hover:bg-[#4F46E5]/5"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4F46E5]">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Continue: {enrollment.careerTrack?.title || 'Track'}
                </Link>
              ))}
              <Link
                href="/career-tracks"
                className="flex items-center gap-2 rounded-full border border-dashed border-slate-300 px-4 py-2 text-sm font-medium text-slate-500 transition-all hover:border-[#4F46E5] hover:text-[#4F46E5]"
              >
                + Add new track
              </Link>
            </div>
          )}
        </div>
      </motion.section>

      <motion.div
        className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[
          { label: 'Active Tracks', value: data.careerTrackEnrollments?.length || 0, sub: 'enrolled', color: '[#4F46E5]' },
          { label: 'Completed', value: approvedCount, sub: 'tasks done', color: 'emerald-600' },
          { label: 'In Review', value: data.trackApplications?.filter((a: any) => a.status !== 'approved' && a.status !== 'rejected').length || 0, sub: 'pending', color: 'amber-600' },
          { label: 'Applications', value: applicationsCount, sub: 'submitted', color: 'slate-700' },
        ].map((stat) => (
          <motion.div key={stat.label} variants={itemVariants} className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{stat.label}</p>
            <p className={`mt-2 text-3xl font-bold text-${stat.color}`}>{stat.value}</p>
            <p className="mt-1 text-xs text-slate-400">{stat.sub}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div
          className="space-y-6 lg:col-span-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.section variants={itemVariants} className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#0F172A]">Your Active Tracks</h2>
                <p className="text-sm text-slate-500">Continue your learning journey</p>
              </div>
            </div>
            
            {(data.careerTrackEnrollments?.length || 0) === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#4F46E5]/10">
                  <svg className="h-6 w-6 text-[#4F46E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="mb-2 font-semibold text-slate-700">No active tracks yet</h3>
                <p className="mb-4 text-sm text-slate-500">Start learning with a career track</p>
                <Link
                  href="/career-tracks"
                  className="inline-flex rounded-xl bg-[#4F46E5] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#4338CA]"
                >
                  Browse Tracks
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {data.careerTrackEnrollments?.map((enrollment: any) => (
                  <Link
                    key={enrollment.id}
                    href={`/career-tracks/${enrollment.careerTrackId}`}
                    className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-[#4F46E5]/30 hover:bg-white hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF]">
                      <svg className="h-5 w-5 text-[#4F46E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-900 truncate">{enrollment.careerTrack?.title || 'Career Track'}</h3>
                      <p className="text-sm text-slate-500">{enrollment.careerTrack?.duration || 'Duration varies'}</p>
                    </div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-transform group-hover:translate-x-1">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </motion.section>

          <motion.section variants={itemVariants} className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#0F172A]">Your Applications</h2>
                <p className="text-sm text-slate-500">Track your application status</p>
              </div>
            </div>
            
            {(data.trackApplications?.length || 0) === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#4F46E5]/10">
                  <svg className="h-6 w-6 text-[#4F46E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="mb-2 font-semibold text-slate-700">No applications yet</h3>
                <p className="mb-4 text-sm text-slate-500">Apply for a career track to get started</p>
                <Link
                  href="/career-tracks"
                  className="inline-flex rounded-xl bg-[#4F46E5] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#4338CA]"
                >
                  Browse Tracks
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {data.trackApplications?.map((app: any) => {
                  const statusConfig = getStatusConfig(app.status);
                  const isRejected = app.status === 'rejected';
                  return (
                    <div key={app.id} className={`rounded-xl border p-4 transition-all ${isRejected ? 'border-red-200 bg-red-50/50' : 'border-slate-200 bg-slate-50/50'}`}>
                      <div className="mb-3 flex items-center justify-between">
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900">{app.careerTrack?.title || app.type}</p>
                          <p className="text-xs text-slate-500">Applied {new Date(app.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusConfig.color}`}>
                          {statusConfig.label}
                        </span>
                      </div>
                      
                      {!isRejected && app.status !== 'approved' && (
                        <div className="flex items-center gap-1">
                          {['submitted', 'under_review', 'shortlisted', 'approved'].map((step, idx) => {
                            const stepNum = idx + 1;
                            const isCompleted = statusConfig.step >= stepNum;
                            const isCurrent = statusConfig.step === stepNum;
                            return (
                              <div key={step} className="flex flex-1 items-center">
                                <div className={`h-2 flex-1 rounded-full ${isCompleted ? 'bg-[#4F46E5]' : 'bg-slate-200'} ${isCurrent ? 'ring-2 ring-[#4F46E5]/30' : ''}`} />
                              </div>
                            );
                          })}
                        </div>
                      )}
                      
                      {!isRejected && (
                        <div className="mt-2 flex justify-between text-[10px] text-slate-400">
                          <span>Submitted</span>
                          <span>Review</span>
                          <span>Shortlist</span>
                          <span>Approved</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </motion.section>

          {careerTracks.length > 0 && (
            <motion.section variants={itemVariants} className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#0F172A]">Recommended for You</h2>
                  <p className="text-sm text-slate-500">Based on your profile and interests</p>
                </div>
                <Link href="/career-tracks" className="text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA]">
                  View all
                </Link>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {careerTracks.slice(0, 2).map((track) => (
                  <Link
                    key={track.id}
                    href={`/career-tracks/${track.id}`}
                    className="group rounded-xl border border-slate-200 p-4 transition-all hover:border-[#4F46E5]/30 hover:shadow-md"
                  >
                    <div className="mb-3 flex items-start gap-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#4F46E5]/10">
                        <svg className="h-4 w-4 text-[#4F46E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-slate-900">{track.title}</h3>
                        <span className="text-xs text-slate-500">{track.level}</span>
                      </div>
                    </div>
                    <p className="mb-3 line-clamp-2 text-xs text-slate-500">{track.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#4F46E5]">{track.duration}</span>
                      <span className="text-xs font-medium text-slate-600">{track.earningPotential}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}
        </motion.div>

        <motion.aside
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-bold text-[#0F172A]">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/career-tracks" className="flex items-center gap-3 rounded-xl border border-slate-200 bg-[#4F46E5]/5 p-3 text-sm font-medium text-slate-700 transition-all hover:border-[#4F46E5] hover:bg-[#4F46E5]/10">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4F46E5]">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </span>
                Explore Tracks
              </Link>
              <Link href="/profile/setup?step=2" className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                  <svg className="h-4 w-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                Complete Profile
              </Link>
              <Link href="/gigs" className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                  <svg className="h-4 w-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                Browse Projects
              </Link>
              {profile?.portfolioLinks?.length > 0 && (
                <Link href={`/portfolio/${user?.id}`} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                    <svg className="h-4 w-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  View Portfolio
                </Link>
              )}
            </div>
          </motion.div>

          {(data.submissions?.length || 0) > 0 && (
            <motion.div variants={itemVariants} className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-bold text-[#0F172A]">Recent Submissions</h2>
              <div className="space-y-3">
                {data.submissions?.slice(0, 3).map((sub: any) => (
                  <div key={sub.id} className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
                    <p className="truncate text-sm font-medium text-slate-900">{sub.task?.title || 'Task'}</p>
                    <span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      sub.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                      sub.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="rounded-xl border border-slate-200 bg-gradient-to-br from-[#4F46E5]/5 to-[#7C3AED]/5 p-6">
            <h2 className="mb-2 text-lg font-bold text-[#0F172A]">Need Help?</h2>
            <p className="mb-4 text-sm text-slate-600">Our team is here to support your learning journey</p>
            <Link href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-[#4F46E5]">
              Contact Support
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </motion.aside>
      </div>
    </main>
  );
}