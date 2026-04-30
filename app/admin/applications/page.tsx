'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Card from '@/components/Card';

interface Application {
  id: string;
  userId: string;
  type: string;
  targetId: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  motivation: string;
  status: string;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
}

export default function AdminApplications() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'track' | 'project'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const user = session?.user as any;

  // Check if user is admin
  useEffect(() => {
    if (user && user.role !== 'ADMIN') {
      toast.error('You do not have permission to view this page');
      window.location.href = '/dashboard';
    }
  }, [user]);

  // Fetch applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        let url = '/api/admin/applications';
        const params = new URLSearchParams();
        if (filter !== 'all') params.append('type', filter);
        if (statusFilter !== 'all') params.append('status', statusFilter);
        if (params.toString()) url += '?' + params.toString();

        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setApplications(data);
      } catch (error) {
        toast.error('Failed to load applications');
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'ADMIN') {
      fetchApplications();
    }
  }, [user, filter, statusFilter]);

  const handleStatusUpdate = async (appId: string, newStatus: string) => {
    try {
      setUpdatingId(appId);
      const res = await fetch('/api/admin/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: appId, status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update');
      const data = await res.json();

      setApplications((prev) =>
        prev.map((app) => (app.id === appId ? data.application : app))
      );
      toast.success(`Application ${newStatus}!`);
    } catch (error) {
      toast.error('Failed to update application');
    } finally {
      setUpdatingId(null);
    }
  };

  if (!user || user.role !== 'ADMIN') {
    return <div className="p-8 text-center text-[#9CA3AF]">Loading...</div>;
  }

  if (loading) {
    return <div className="p-8 text-center text-[#9CA3AF]">Loading applications...</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-[#10B981]/10 text-[#10B981]';
      case 'pending':
        return 'bg-[#F59E0B]/10 text-[#F59E0B]';
      case 'rejected':
        return 'bg-[#EF4444]/10 text-[#EF4444]';
      default:
        return 'bg-[#6B7280]/10 text-[#6B7280]';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">Track Applications</h1>
        <p className="text-[#9CA3AF]">Review and manage career track and project applications</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="grid md:grid-cols-3 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div>
          <label className="block text-sm font-medium text-white mb-2">Type</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="w-full px-4 py-2 bg-[#0B0F19] border border-[#1F2937] rounded-lg text-white focus:border-[#3B82F6] outline-none"
          >
            <option value="all">All Types</option>
            <option value="track">Career Tracks</option>
            <option value="project">Projects</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full px-4 py-2 bg-[#0B0F19] border border-[#1F2937] rounded-lg text-white focus:border-[#3B82F6] outline-none"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Total</label>
          <div className="px-4 py-2 bg-[#0B0F19] border border-[#1F2937] rounded-lg text-white">
            {applications.length} applications
          </div>
        </div>
      </motion.div>

      {/* Applications List */}
      <motion.div
        className="space-y-4"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        {applications.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-[#9CA3AF] text-lg">No applications found</p>
            </div>
          </Card>
        ) : (
          applications.map((app) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111827] border border-[#1F2937] rounded-lg p-6 hover:border-[#3B82F6]/50 transition-all"
            >
              <div className="grid md:grid-cols-4 gap-6">
                {/* Applicant Info */}
                <div>
                  <p className="text-xs text-[#6B7280] font-semibold uppercase mb-2">Applicant</p>
                  <p className="text-white font-medium">{app.name}</p>
                  <p className="text-sm text-[#9CA3AF]">{app.email}</p>
                  <p className="text-sm text-[#9CA3AF]">{app.phone}</p>
                </div>

                {/* Application Details */}
                <div>
                  <p className="text-xs text-[#6B7280] font-semibold uppercase mb-2">Details</p>
                  <p className="text-white font-medium">
                    {app.type === 'track' ? '📚 Career Track' : '💼 Project'}
                  </p>
                  <p className="text-sm text-[#9CA3AF]">Applied {new Date(app.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm text-[#9CA3AF]">ID: {app.targetId?.substring(0, 8) ?? 'N/A'}...</p>
                </div>

                {/* Motivation */}
                <div>
                  <p className="text-xs text-[#6B7280] font-semibold uppercase mb-2">Motivation</p>
                  <p className="text-sm text-[#9CA3AF] line-clamp-3">{app.motivation}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-[#6B7280] font-semibold uppercase mb-2">Status</p>
                    <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(app.status)}`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusUpdate(app.id, 'approved')}
                      disabled={updatingId === app.id || app.status === 'approved'}
                      className="px-3 py-2 text-xs bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 rounded hover:bg-[#10B981]/20 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(app.id, 'rejected')}
                      disabled={updatingId === app.id || app.status === 'rejected'}
                      className="px-3 py-2 text-xs bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/30 rounded hover:bg-[#EF4444]/20 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>

              {/* Experience Section */}
              <div className="mt-4 pt-4 border-t border-[#1F2937]">
                <p className="text-xs text-[#6B7280] font-semibold uppercase mb-2">Experience</p>
                <p className="text-sm text-[#9CA3AF] line-clamp-2">{app.experience}</p>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
