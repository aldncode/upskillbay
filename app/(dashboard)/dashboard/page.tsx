'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Card from '@/components/Card';
import Button from '@/components/Button';

interface DashboardData {
  enrollments: any[];
  submissions: any[];
  applications: any[];
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData>({
    enrollments: [],
    submissions: [],
    applications: [],
  });
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
        });
      } catch (error) {
        toast.error('Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  if (loading) {
    return <div className="p-8 text-center text-[#9CA3AF]">Loading...</div>;
  }

  const user = session?.user as any;
  const approvedCount = data.submissions.filter((s) => s.status === 'approved').length;
  const pendingCount = data.submissions.filter((s) => s.status === 'pending').length;

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
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Welcome Section */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user?.name}! 👋</h1>
        <p className="text-[#9CA3AF]">Build your skills, earn from projects, and get hired</p>
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
              <div className="text-3xl font-bold text-[#3B82F6]">{data.enrollments.length}</div>
              <p className="text-[#9CA3AF] mt-2">Capsules Enrolled</p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#3B82F6]">{approvedCount}</div>
              <p className="text-[#9CA3AF] mt-2">Completed Tasks</p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#3B82F6]">{pendingCount}</div>
              <p className="text-[#9CA3AF] mt-2">Pending Review</p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#3B82F6]">$0.00</div>
              <p className="text-[#9CA3AF] mt-2">Earnings</p>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Active Capsules */}
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card>
            <h2 className="text-2xl font-bold mb-6 text-white">Your Active Capsules</h2>
            {data.enrollments.length === 0 ? (
              <p className="text-[#9CA3AF] mb-4">
                You haven't enrolled in any capsules yet.{' '}
                <Link href="/capsules" className="text-[#3B82F6] font-medium hover:underline">
                  Browse capsules
                </Link>
              </p>
            ) : (
              <div className="space-y-4">
                {data.enrollments.map((enrollment) => (
                  <motion.div
                    key={enrollment.id}
                    className="p-4 bg-[#1F2937] border border-[#374151] rounded-xl hover:border-[#3B82F6] transition-colors"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="font-semibold text-white">{enrollment.capsule.title}</h3>
                    <p className="text-sm text-[#9CA3AF] mb-3">
                      {enrollment.capsule.description.substring(0, 100)}...
                    </p>
                    <Link
                      href={`/capsules/${enrollment.capsule.id}`}
                      className="text-[#3B82F6] text-sm font-medium hover:underline"
                    >
                      Continue learning →
                    </Link>
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
            <h2 className="text-xl font-bold mb-4 text-white">Quick Actions</h2>
            <div className="space-y-3">
              <Button variant="primary" href="/capsules">
                Browse Capsules
              </Button>
              <Button variant="secondary" href="/gigs">
                Browse Projects
              </Button>
              <Button variant="outline" href={`/portfolio/${user?.id}`}>
                View Portfolio
              </Button>
            </div>
          </Card>

          {/* Recent Submissions */}
          <Card>
            <h3 className="font-bold mb-4 text-white">Recent Submissions</h3>
            {data.submissions.length === 0 ? (
              <p className="text-sm text-[#9CA3AF]">No submissions yet</p>
            ) : (
              <div className="space-y-3">
                {data.submissions.slice(0, 3).map((sub) => (
                  <motion.div
                    key={sub.id}
                    className="text-sm p-3 bg-[#1F2937] rounded-lg"
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
