'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [pendingSubmissions, setPendingSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/submissions/pending');
        const data = await res.json();
        setPendingSubmissions(data);
      } catch (error) {
        toast.error('Failed to load submissions');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard 👨‍💼</h1>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Link href="/admin/capsules" className="card hover:shadow-lg text-center">
          <div className="text-4xl mb-2">📚</div>
          <h3 className="font-bold">Manage Capsules</h3>
          <p className="text-sm text-gray-600 mt-1">Create and manage skill capsules</p>
        </Link>
        <Link href="/admin/tasks" className="card hover:shadow-lg text-center">
          <div className="text-4xl mb-2">✅</div>
          <h3 className="font-bold">Manage Tasks</h3>
          <p className="text-sm text-gray-600 mt-1">Create and manage tasks</p>
        </Link>
        <Link href="/admin/gigs" className="card hover:shadow-lg text-center">
          <div className="text-4xl mb-2">💼</div>
          <h3 className="font-bold">Manage Gigs</h3>
          <p className="text-sm text-gray-600 mt-1">Create and manage gigs</p>
        </Link>
      </div>

      {/* Pending Submissions */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">
          Pending Submissions ({pendingSubmissions.length})
        </h2>

        {pendingSubmissions.length === 0 ? (
          <p className="text-gray-600">All submissions have been reviewed</p>
        ) : (
          <div className="space-y-3">
            {pendingSubmissions.map((submission: any) => (
              <Link
                key={submission.id}
                href={`/admin/submissions/${submission.id}`}
                className="p-4 border rounded-lg hover:border-primary transition-colors hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{submission.task.title}</p>
                    <p className="text-sm text-gray-600">
                      By {submission.user.name} · {submission.task.capsule.title}
                    </p>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
