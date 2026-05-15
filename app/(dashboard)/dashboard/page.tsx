'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock, Briefcase, TrendingUp, Sparkles } from 'lucide-react';

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
        return { label: 'Submitted', color: 'bg-blue-500/10 border border-blue-500/20 text-blue-400', step: 1 };
      case 'under_review':
        return { label: 'Under Review', color: 'bg-amber-500/10 border border-amber-500/20 text-amber-400', step: 2 };
      case 'shortlisted':
        return { label: 'Shortlisted', color: 'bg-purple-500/10 border border-purple-500/20 text-purple-400', step: 3 };
      case 'approved':
        return { label: 'Approved', color: 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400', step: 4 };
      case 'rejected':
        return { label: 'Rejected', color: 'bg-red-500/10 border border-red-500/20 text-red-400', step: -1 };
      default:
        return { label: status, color: 'bg-slate-500/10 border border-slate-500/20 text-slate-400', step: 0 };
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
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="animate-pulse space-y-8">
          <div className="h-48 rounded-2xl bg-slate-800" />
          <div className="grid gap-6 md:grid-cols-4">
            {[1,2,3,4].map(i => <div key={i} className="h-28 rounded-xl bg-slate-800" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      {/* Welcome Section */}
      <motion.section
        className="relative mb-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />
        
        <div className="relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium text-indigo-400">{getGreeting()}</p>
              <h1 className="mb-3 text-3xl font-bold tracking-tight text-white">
                Welcome back, <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">{userName}</span>
              </h1>
              <p className="text-base text-slate-400">{getMotivationalMessage()}</p>
            </div>
            
            {completionPercent < 100 && (
              <div className="flex items-center gap-4 rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-4">
                <div className="relative h-12 w-12">
                  <svg className="h-12 w-12 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#1E293B" strokeWidth="3" />
                    <circle 
                      cx="18" cy="18" r="16" fill="none" stroke="#F59E0B" strokeWidth="3"
                      strokeDasharray={`${completionPercent} 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-amber-400">{completionPercent}%</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber-400">Profile incomplete</p>
                  <p className="text-xs text-slate-500">{100 - completionPercent}% remaining</p>
                </div>
                <Link 
                  href="/profile/setup?step=2"
                  className="rounded-lg bg-amber-500/20 border border-amber-500/30 px-4 py-2 text-xs font-semibold text-amber-400 hover:bg-amber-500/30 transition-colors"
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
                  className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">
                    <Sparkles className="h-3 w-3 text-white" />
                  </span>
                  Continue: {enrollment.careerTrack?.title || 'Track'}
                </Link>
              ))}
              <Link
                href="/career-tracks"
                className="flex items-center gap-2 rounded-full border border-dashed border-slate-600 px-4 py-2 text-sm font-medium text-slate-500 transition-all hover:border-indigo-500 hover:text-indigo-400"
              >
                + Add new track
              </Link>
            </div>
          )}
        </div>
      </motion.section>

      {/* Stats Cards */}
      <motion.div
        className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[
          { label: 'Active Tracks', value: data.careerTrackEnrollments?.length || 0, sub: 'enrolled', icon: Briefcase, color: 'indigo' },
          { label: 'Completed', value: approvedCount, sub: 'tasks done', icon: CheckCircle2, color: 'emerald' },
          { label: 'In Review', value: data.trackApplications?.filter((a: any) => a.status !== 'approved' && a.status !== 'rejected').length || 0, sub: 'pending', icon: Clock, color: 'amber' },
          { label: 'Applications', value: applicationsCount, sub: 'submitted', icon: TrendingUp, color: 'cyan' },
        ].map((stat) => (
          <motion.div 
            key={stat.label} 
            variants={itemVariants} 
            className="group relative rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-slate-700"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{stat.label}</p>
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-${stat.color}-500/10`}>
                <stat.icon className={`h-4 w-4 text-${stat.color}-400`} />
              </div>
            </div>
            <p className={`text-3xl font-bold text-${stat.color}-400`}>{stat.value}</p>
            <p className="mt-1 text-xs text-slate-500">{stat.sub}</p>
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
          {/* Active Tracks */}
          <motion.section variants={itemVariants} className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Your Active Tracks</h2>
                <p className="text-sm text-slate-500">Continue your learning journey</p>
              </div>
            </div>
            
            {(data.careerTrackEnrollments?.length || 0) === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-700 bg-slate-800/30 p-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10">
                  <Sparkles className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="mb-2 font-semibold text-slate-300">No active tracks yet</h3>
                <p className="mb-4 text-sm text-slate-500">Start learning with a career track</p>
                <Link
                  href="/career-tracks"
                  className="inline-flex rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/25"
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
                    className="group flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-800/30 p-4 transition-all hover:border-indigo-500/30 hover:bg-slate-800/50"
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20">
                      <Sparkles className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-white truncate">{enrollment.careerTrack?.title || 'Career Track'}</h3>
                      <p className="text-sm text-slate-500">{enrollment.careerTrack?.duration || 'Duration varies'}</p>
                    </div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-500 transition-transform group-hover:translate-x-1">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </motion.section>

          {/* Applications */}
          <motion.section variants={itemVariants} className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Your Applications</h2>
                <p className="text-sm text-slate-500">Track your application status</p>
              </div>
            </div>
            
            {(data.trackApplications?.length || 0) === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-700 bg-slate-800/30 p-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10">
                  <Briefcase className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="mb-2 font-semibold text-slate-300">No applications yet</h3>
                <p className="mb-4 text-sm text-slate-500">Apply for a career track to get started</p>
                <Link
                  href="/career-tracks"
                  className="inline-flex rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/25"
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
                    <div key={app.id} className={`rounded-xl border p-4 transition-all ${isRejected ? 'border-red-500/20 bg-red-500/5' : 'border-slate-800 bg-slate-800/30'}`}>
                      <div className="mb-3 flex items-center justify-between">
                        <div className="min-w-0">
                          <p className="font-semibold text-white">{app.careerTrack?.title || app.type}</p>
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
                                <div className={`h-2 flex-1 rounded-full ${isCompleted ? 'bg-indigo-500' : 'bg-slate-700'} ${isCurrent ? 'ring-2 ring-indigo-500/30' : ''}`} />
                              </div>
                            );
                          })}
                        </div>
                      )}
                      
                      {!isRejected && (
                        <div className="mt-2 flex justify-between text-[10px] text-slate-500">
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

          {/* Recommended Tracks */}
          {(careerTracks?.length ?? 0) > 0 && (
            <motion.section variants={itemVariants} className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">Recommended for You</h2>
                  <p className="text-sm text-slate-500">Based on your profile and interests</p>
                </div>
                <Link href="/career-tracks" className="text-sm font-semibold text-indigo-400 hover:text-indigo-300">
                  View all
                </Link>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {careerTracks.slice(0, 2).map((track) => (
                  <Link
                    key={track.id}
                    href={`/career-tracks/${track.id}`}
                    className="group rounded-xl border border-slate-800 bg-slate-800/30 p-4 transition-all hover:border-indigo-500/30 hover:bg-slate-800/50"
                  >
                    <div className="mb-3 flex items-start gap-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                        <Sparkles className="h-4 w-4 text-indigo-400" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-white">{track.title}</h3>
                        <span className="text-xs text-slate-500">{track.level}</span>
                      </div>
                    </div>
                    <p className="mb-3 line-clamp-2 text-xs text-slate-400">{track.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-indigo-400">{track.duration}</span>
                      <span className="text-xs font-medium text-slate-400">{track.earningPotential}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}
        </motion.div>

        {/* Sidebar */}
        <motion.aside
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
            <h2 className="mb-4 text-lg font-bold text-white">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/career-tracks" className="flex items-center gap-3 rounded-xl border border-slate-800 bg-indigo-500/5 p-3 text-sm font-medium text-slate-300 transition-all hover:border-indigo-500/30 hover:bg-indigo-500/10">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500">
                  <Sparkles className="h-4 w-4 text-white" />
                </span>
                Explore Tracks
              </Link>
              <Link href="/profile/setup?step=2" className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/30 p-3 text-sm font-medium text-slate-300 transition-all hover:border-slate-700 hover:bg-slate-800/50">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 border border-slate-700">
                  <Briefcase className="h-4 w-4 text-slate-400" />
                </span>
                Complete Profile
              </Link>
              <Link href="/gigs" className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/30 p-3 text-sm font-medium text-slate-300 transition-all hover:border-slate-700 hover:bg-slate-800/50">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 border border-slate-700">
                  <TrendingUp className="h-4 w-4 text-slate-400" />
                </span>
                Browse Projects
              </Link>
              {(profile?.portfolioLinks?.length ?? 0) > 0 && (
                <Link href={`/portfolio/${user?.id}`} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/30 p-3 text-sm font-medium text-slate-300 transition-all hover:border-slate-700 hover:bg-slate-800/50">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 border border-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-slate-400" />
                  </span>
                  View Portfolio
                </Link>
              )}
            </div>
          </motion.div>

          {/* Recent Submissions */}
          {(data.submissions?.length || 0) > 0 && (
            <motion.div variants={itemVariants} className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
              <h2 className="mb-4 text-lg font-bold text-white">Recent Submissions</h2>
              <div className="space-y-3">
                {data.submissions?.slice(0, 3).map((sub: any) => (
                  <div key={sub.id} className="rounded-lg border border-slate-800 bg-slate-800/30 p-3">
                    <p className="truncate text-sm font-medium text-slate-300">{sub.task?.title || 'Task'}</p>
                    <span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      sub.status === 'approved' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' :
                      sub.status === 'pending' ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400' :
                      'bg-red-500/10 border border-red-500/20 text-red-400'
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Need Help */}
          <motion.div variants={itemVariants} className="rounded-xl border border-slate-800 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 p-6 backdrop-blur-xl">
            <h2 className="mb-2 text-lg font-bold text-white">Need Help?</h2>
            <p className="mb-4 text-sm text-slate-400">Our team is here to support your learning journey</p>
            <Link href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400">
              Contact Support
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.aside>
      </div>
    </main>
  );
}