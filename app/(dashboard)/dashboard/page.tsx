'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

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
    return <div className="p-8 text-center">Loading...</div>;
  }

  const user = session?.user as any;
  const approvedCount = data.submissions.filter((s) => s.status === 'approved').length;
  const pendingCount = data.submissions.filter((s) => s.status === 'pending').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
        <p className="text-gray-600">Build your skills, earn from gigs, and get hired</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary">{data.enrollments.length}</div>
          <p className="text-gray-600">Capsules Enrolled</p>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-secondary">{approvedCount}</div>
          <p className="text-gray-600">Completed Tasks</p>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-accent">{pendingCount}</div>
          <p className="text-gray-600">Pending Review</p>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold">$0.00</div>
          <p className="text-gray-600">Earnings</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Active Capsules */}
        <div className="md:col-span-2">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Your Active Capsules</h2>
            {data.enrollments.length === 0 ? (
              <p className="text-gray-600 mb-4">
                You haven't enrolled in any capsules yet.{' '}
                <Link href="/capsules" className="text-primary font-medium">
                  Browse capsules
                </Link>
              </p>
            ) : (
              <div className="space-y-4">
                {data.enrollments.map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className="p-4 border rounded-lg hover:border-primary transition-colors"
                  >
                    <h3 className="font-semibold">{enrollment.capsule.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {enrollment.capsule.description.substring(0, 100)}...
                    </p>
                    <Link
                      href={`/capsules/${enrollment.capsule.id}`}
                      className="text-primary text-sm font-medium hover:underline"
                    >
                      Continue learning →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link href="/capsules" className="btn btn-primary w-full text-center block">
                Browse Capsules
              </Link>
              <Link href="/gigs" className="btn btn-secondary w-full text-center block">
                Browse Gigs
              </Link>
              <Link href={`/portfolio/${user?.id}`} className="btn btn-outline w-full text-center block">
                View Portfolio
              </Link>
            </div>
          </div>

          {/* Recent Submissions */}
          <div className="card mt-4">
            <h3 className="font-bold mb-3">Recent Submissions</h3>
            {data.submissions.length === 0 ? (
              <p className="text-sm text-gray-600">No submissions yet</p>
            ) : (
              <div className="space-y-2">
                {data.submissions.slice(0, 3).map((sub) => (
                  <div key={sub.id} className="text-sm p-2 bg-gray-50 rounded">
                    <p className="font-medium truncate">{sub.task.title}</p>
                    <span className={`badge text-xs ${sub.status === 'approved' ? 'badge-success' : sub.status === 'pending' ? 'badge-warning' : 'badge-error'}`}>
                      {sub.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
