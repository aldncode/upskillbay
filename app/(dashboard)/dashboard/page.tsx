'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Card from '@/components/Card';
import CareerTrackCard from '@/components/CareerTrackCard';

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

interface DashboardData {
  enrollments: any[];
  submissions: any[];
  applications: any[];
  careerTrackEnrollments?: any[];
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData>({
    enrollments: [],
    submissions: [],
    applications: [],
    careerTrackEnrollments: [],
  });
  const [careerTracks, setCareerTracks] = useState<CareerTrack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/user');
        const userData = await res.json();

        setData({
          enrollments: userData.enrollments || [],
          submissions: userData.submissions || [],
          applications: userData.applications || [],
          careerTrackEnrollments: userData.careerTrackEnrollments || [],
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await fetch('/api/enrollments');
        const enrollmentsData = await res.json();

        setData((prev) => ({
          ...prev,
          careerTrackEnrollments: enrollmentsData.enrollments || [],
        }));
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      }
    };

    if (session) {
      fetchEnrollments();
    }
  }, [session]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch('/api/apply');
        const applications = await res.json();

        setData((prev) => ({
          ...prev,
          applications: applications || [],
        }));
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    if (session) {
      fetchApplications();
    }
  }, [session]);

  useEffect(() => {
    const fetchCareerTracks = async () => {
      try {
        const res = await fetch('/api/career-tracks');
        const tracks = await res.json();
        setCareerTracks(tracks.slice(0, 3));
      } catch (error) {
        console.error('Error fetching career tracks:', error);
      }
    };

    fetchCareerTracks();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-12 text-center shadow-sm">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#E5E7EB] border-t-[#4F46E5]" />
          <p className="font-medium text-[#6B7280]">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const user = session?.user as any;
  const approvedCount = data.submissions.filter((s) => s.status === 'approved').length;
  const pendingCount = data.submissions.filter((s) => s.status === 'pending').length;
  const enrolledTracksSet = new Set(
    data.careerTrackEnrollments?.map((e: any) => e.careerTrackId) || []
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35 },
    },
  };

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-10">
      <motion.section
        className="mb-10 rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-sm"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#4F46E5]">
          Dashboard
        </p>
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-[#111827]">
          Welcome back, {user?.name || 'Learner'}
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-[#4B5563]">
          Track your course progress, review applications, and keep moving toward paid work.
        </p>
      </motion.section>

      <motion.section
        className="mb-10 grid gap-6 md:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card>
            <p className="text-sm font-semibold text-[#6B7280]">Career Tracks</p>
            <div className="mt-3 text-4xl font-bold text-[#4F46E5]">{(data.careerTrackEnrollments?.length) ?? 0}</div>
            <p className="mt-2 text-sm text-[#6B7280]">Enrolled paths</p>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <p className="text-sm font-semibold text-[#6B7280]">Completed</p>
            <div className="mt-3 text-4xl font-bold text-green-700">{approvedCount}</div>
            <p className="mt-2 text-sm text-[#6B7280]">Approved tasks</p>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <p className="text-sm font-semibold text-[#6B7280]">In Review</p>
            <div className="mt-3 text-4xl font-bold text-amber-600">{pendingCount}</div>
            <p className="mt-2 text-sm text-[#6B7280]">Pending tasks</p>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <p className="text-sm font-semibold text-[#6B7280]">Applications</p>
            <div className="mt-3 text-4xl font-bold text-[#111827]">{(data.applications?.length) ?? 0}</div>
            <p className="mt-2 text-sm text-[#6B7280]">Submitted total</p>
          </Card>
        </motion.div>
      </motion.section>

      {careerTracks.length > 0 && (
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#111827]">
                Recommended Tracks
              </h2>
              <p className="mt-2 text-[#6B7280]">
                Popular paths to build skills, portfolio proof, and earning potential.
              </p>
            </div>
            <Link
              href="/career-tracks"
              className="font-semibold text-[#4F46E5] transition-colors duration-200 hover:text-[#4338CA]"
            >
              View All
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {careerTracks.map((track) => (
              <CareerTrackCard
                key={track.id}
                track={track}
                enrolled={enrolledTracksSet.has(track.id)}
              />
            ))}
          </div>
        </motion.section>
      )}

      <div className="grid gap-8 md:grid-cols-3">
        <motion.div
          className="space-y-8 md:col-span-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          <Card>
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-[#111827]">Your Active Tracks</h2>
                <p className="mt-1 text-sm text-[#6B7280]">Continue where you left off.</p>
              </div>
              <Link href="/career-tracks" className="text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA]">
                Browse
              </Link>
            </div>
            {(data.careerTrackEnrollments?.length ?? 0) === 0 ? (
              <p className="text-[#6B7280]">
                You have not enrolled in any career tracks yet.{' '}
                <Link href="/career-tracks" className="font-semibold text-[#4F46E5] hover:underline">
                  Explore tracks
                </Link>
              </p>
            ) : (
              <div className="space-y-4">
                {(data.careerTrackEnrollments || []).map((enrollment: any) => (
                  <motion.div
                    key={enrollment.id}
                    className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                    whileHover={{ scale: 1.005 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="font-semibold text-[#111827]">{enrollment.careerTrack?.title || 'Career Track'}</h3>
                    <p className="mt-2 mb-3 text-sm leading-6 text-[#6B7280]">
                      {enrollment.careerTrack?.description ? enrollment.careerTrack.description.substring(0, 100) + '...' : 'No description'}
                    </p>
                    <Link
                      href={`/career-tracks/${enrollment.careerTrackId}`}
                      className="text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA]"
                    >
                      Continue learning
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>

          <Card>
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-[#111827]">My Applications</h2>
            {(data.applications?.length ?? 0) === 0 ? (
              <p className="text-[#6B7280]">
                You have not applied to any career tracks yet.{' '}
                <Link href="/career-tracks" className="font-semibold text-[#4F46E5] hover:underline">
                  Explore tracks
                </Link>
              </p>
            ) : (
              <div className="space-y-4">
                {(data.applications || []).map((app: any) => (
                  <motion.div
                    key={app.id}
                    className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                    whileHover={{ scale: 1.005 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-[#111827]">{app.type === 'track' ? 'Career Track' : 'Project'} Application</h3>
                        <p className="mt-1 text-sm text-[#6B7280]">ID: {app.targetId?.substring(0, 8) ?? 'N/A'}...</p>
                      </div>
                      <span
                        className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-semibold ${
                          app.status === 'approved'
                            ? 'bg-green-50 text-green-700 border border-green-100'
                            : app.status === 'pending'
                            ? 'bg-amber-50 text-amber-700 border border-amber-100'
                            : 'bg-red-50 text-red-700 border border-red-100'
                        }`}
                      >
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-[#6B7280]">Applied on {new Date(app.createdAt).toLocaleDateString()}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>

        <motion.aside
          className="space-y-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
        >
          <Card>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-[#111827]">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/career-tracks"
                className="block w-full rounded-lg bg-[#4F46E5] px-4 py-3 text-center font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#4338CA] hover:shadow-md"
              >
                Explore Tracks
              </Link>
              <Link
                href="/gigs"
                className="block w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-center font-semibold text-[#374151] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                Browse Projects
              </Link>
              <Link
                href={`/portfolio/${user?.id}`}
                className="block w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-center font-semibold text-[#374151] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                View Portfolio
              </Link>
            </div>
          </Card>

          <Card>
            <h3 className="mb-4 font-bold tracking-tight text-[#111827]">Recent Submissions</h3>
            {data.submissions.length === 0 ? (
              <p className="text-sm text-[#6B7280]">No submissions yet</p>
            ) : (
              <div className="space-y-3">
                {data.submissions.slice(0, 3).map((sub) => (
                  <motion.div
                    key={sub.id}
                    className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-3 text-sm"
                    whileHover={{ y: -2 }}
                  >
                    <p className="truncate font-semibold text-[#111827]">{sub.task.title}</p>
                    <span
                      className={`badge mt-2 ${
                        sub.status === 'approved'
                          ? 'badge-success'
                          : sub.status === 'pending'
                          ? 'badge-warning'
                          : 'badge-error'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        </motion.aside>
      </div>
    </main>
  );
}
