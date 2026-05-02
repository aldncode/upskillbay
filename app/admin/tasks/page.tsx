'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ManageTasks() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Note: We don't have a general tasks endpoint, but you can implement one
        toast.success('Tasks are managed per capsule. Go to a capsule to manage its tasks.');
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load tasks');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Manage Tasks</h1>

      <div className="card text-center py-12">
        <p className="text-lg text-gray-600 mb-6">
          Tasks are managed at the capsule level. Here's how to manage tasks:
        </p>
        <div className="space-y-3 text-left max-w-2xl mx-auto mb-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="font-semibold text-blue-900">📚 Step 1: Go to Manage Capsules</p>
            <p className="text-sm text-blue-800 mt-1">Visit the Manage Capsules page to see all your capsules</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="font-semibold text-blue-900">✏️ Step 2: Edit a Capsule</p>
            <p className="text-sm text-blue-800 mt-1">Click "Edit" on any capsule to manage its tasks</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="font-semibold text-blue-900">➕ Step 3: Add Tasks</p>
            <p className="text-sm text-blue-800 mt-1">Use the "Add Task" form on the right side to create new tasks</p>
          </div>
        </div>

        <Link href="/admin/capsules" className="btn btn-primary">
          Go to Manage Capsules
        </Link>
      </div>
    </div>
  );
}
