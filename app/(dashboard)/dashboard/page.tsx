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

  // Fetch dashboard data
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

  // Fetch user's career track enrollments
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await fetch('/api/enrollments');
        const data = await res.json();
        console.log('Career track enrollments:', data.enrollments);

        setData((prev) => ({
          ...prev,
          careerTrackEnrollments: data.enrollments || [],
        }));
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      }
    };

    if (session) {
      fetchEnrollments();
    }
  }, [session]);

  // Fetch user's applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch('/api/apply');
        const applications = await res.json();
        console.log('Track applications:', applications);

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

  // Fetch career tracks
  useEffect(() => {
    const fetchCareerTracks = async () => {
      try {
        const res = await fetch('/api/career-tracks');
        const tracks = await res.json();
        // Show top 3 career tracks
        setCareerTracks(tracks.slice(0, 3));
      } catch (error) {
        console.error('Error fetching career tracks:', error);
      }
    };

    fetchCareerTracks();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-[#9CA3AF]">Loading...</div>;
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
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Welcome Section */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Welcome back, {user?.name}! 👋</h1>
        <p className="text-lg text-[#9CA3AF]">Build your skills, earn from projects, and get hired</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid md:grid-cols-4 gap-6 mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#3B82F6]">{(data.careerTrackEnrollments?.length) ?? 0}</div>
              <p className="text-[#9CA3AF] mt-3 text-sm">Career Tracks Enrolled</p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#10B981]">{approvedCount}</div>
              <p className="text-[#9CA3AF] mt-3 text-sm">Completed Tasks</p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#F59E0B]">{pendingCount}</div>
              <p className="text-[#9CA3AF] mt-3 text-sm">Pending Review</p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#EC4899]">{(data.applications?.length) ?? 0}</div>
              <p className="text-[#9CA3AF] mt-3 text-sm">Applications Sent</p>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Recommended Career Tracks Section */}
      {careerTracks.length > 0 && (
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                Recommended Tracks
              </h2>
              <p className="text-[#9CA3AF]">
                Build skills, complete projects, and start earning
              </p>
            </div>
            <Link
              href="/career-tracks"
              className="text-[#3B82F6] font-medium hover:text-[#60A5FA] transition-colors duration-200"
            >
              View All →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {careerTracks.map((track) => (
              <CareerTrackCard
                key={track.id}
                track={track}
                enrolled={enrolledTracksSet.has(track.id)}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Active Tracks & Applications */}
        <motion.div
          className="md:col-span-2 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Your Active Tracks */}
          <Card>
            <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">Your Active Tracks</h2>
            {(data.careerTrackEnrollments?.length ?? 0) === 0 ? (
              <p className="text-[#9CA3AF] mb-4">
                You haven't enrolled in any career tracks yet.{' '}
                <Link href="/career-tracks" className="text-[#3B82F6] font-medium hover:underline">
                  Browse career tracks
                </Link>
              </p>
            ) : (
              <div className="space-y-4">
                {(data.careerTrackEnrollments || []).map((enrollment: any) => (
                  <motion.div
                    key={enrollment.id}
                    className="p-4 bg-[#0B0F19] border border-[#1F2937] rounded-lg hover:border-[#3B82F6]/50 transition-all duration-200 group cursor-pointer"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="font-semibold text-white group-hover:text-[#3B82F6] transition-colors">{enrollment.careerTrack?.title || 'Career Track'}</h3>
                    <p className="text-sm text-[#9CA3AF] mt-2 mb-3">
                      {enrollment.careerTrack?.description ? enrollment.careerTrack.description.substring(0, 100) + '...' : 'No description'}
                    </p>
                    <Link
                      href={`/career-tracks/${enrollment.careerTrackId}`}
                      className="text-[#3B82F6] text-sm font-medium hover:text-[#60A5FA] transition-colors"
                    >
                      Continue learning →
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>

          {/* My Applications */}
          <Card>
            <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">My Applications</h2>
            {(data.applications?.length ?? 0) === 0 ? (
              <p className="text-[#9CA3AF]">
                You haven't applied to any career tracks yet.{' '}
                <Link href="/career-tracks" className="text-[#3B82F6] font-medium hover:underline">
                  Explore tracks
                </Link>
              </p>
            ) : (
              <div className="space-y-4">
                {(data.applications || []).map((app: any) => (
                  <motion.div
                    key={app.id}
                    className="p-4 bg-[#0B0F19] border border-[#1F2937] rounded-lg hover:border-[#3B82F6]/50 transition-all duration-200"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-white">{app.type === 'track' ? 'Career Track' : 'Project'} Application</h3>
                        <p className="text-sm text-[#9CA3AF] mt-1">ID: {app.targetId?.substring(0, 8) ?? 'N/A'}...</p>
                      </div>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${
                          app.status === 'approved'
                            ? 'bg-[#10B981]/10 text-[#10B981]'
                            : app.status === 'pending'
                            ? 'bg-[#F59E0B]/10 text-[#F59E0B]'
                            : 'bg-[#EF4444]/10 text-[#EF4444]'
                        }`}
                      >
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-[#9CA3AF] mt-2">Applied on {new Date(app.createdAt).toLocaleDateString()}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Right Sidebar */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {/* Quick Actions */}
          <Card>
            <h2 className="text-xl font-bold mb-4 text-white tracking-tight">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/career-tracks"
                className="block w-full px-4 py-3 bg-[#111827] border border-[#3B82F6] text-white rounded-lg hover:shadow-lg hover:shadow-[#3B82F6]/20 hover:-translate-y-1 transition-all duration-200 font-medium text-center"
              >
                Explore Tracks
              </Link>
              <Link
                href="/gigs"
                className="block w-full px-4 py-3 bg-[#111827] border border-[#1F2937] text-[#9CA3AF] rounded-lg hover:border-[#3B82F6]/30 transition-all duration-200 font-medium text-center"
              >
                Browse Projects
              </Link>
              <Link
                href={`/portfolio/${user?.id}`}
                className="block w-full px-4 py-3 bg-[#111827] border border-[#1F2937] text-[#9CA3AF] rounded-lg hover:border-[#3B82F6]/30 transition-all duration-200 font-medium text-center"
              >
                View Portfolio
              </Link>
            </div>
          </Card>

          {/* Recent Submissions */}
          <Card>
            <h3 className="font-bold mb-4 text-white tracking-tight">Recent Submissions</h3>
            {data.submissions.length === 0 ? (
              <p className="text-sm text-[#9CA3AF]">No submissions yet</p>
            ) : (
              <div className="space-y-3">
                {data.submissions.slice(0, 3).map((sub) => (
                  <motion.div
                    key={sub.id}
                    className="text-sm p-3 bg-[#0B0F19] border border-[#1F2937] rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="font-medium text-white truncate">{sub.task.title}</p>
                    <span
                      className={`badge text-xs mt-2 ${
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
        </motion.div>
      </div>
    </div>
  );
}
