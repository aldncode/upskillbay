'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Capsule {
  id: string;
  title: string;
  description: string;
  level: string;
  status: string;
}

export default function ManageCapsules() {
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('beginner');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const res = await fetch('/api/capsules');
        const data = await res.json();
        setCapsules(data);
      } catch (error) {
        toast.error('Failed to load capsules');
      } finally {
        setLoading(false);
      }
    };

    fetchCapsules();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const res = await fetch('/api/capsules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          level,
        }),
      });

      if (res.ok) {
        const capsule = await res.json();
        setCapsules([...capsules, capsule]);
        setTitle('');
        setDescription('');
        setLevel('beginner');
        toast.success('Capsule created!');
      } else {
        toast.error('Failed to create capsule');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Manage Capsules</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">All Capsules ({capsules.length})</h2>
            {capsules.length === 0 ? (
              <p className="text-gray-600">No capsules yet</p>
            ) : (
              <div className="space-y-3">
                {capsules.map((capsule) => (
                  <div key={capsule.id} className="p-4 border rounded-lg hover:border-primary">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{capsule.title}</p>
                        <p className="text-sm text-gray-600">
                          {capsule.description.substring(0, 100)}...
                        </p>
                        <div className="flex gap-2 mt-2">
                          <span className={`badge text-xs ${capsule.level === 'beginner' ? 'badge-success' : 'badge-info'}`}>
                            {capsule.level}
                          </span>
                          <span className={`badge text-xs ${capsule.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                            {capsule.status}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/admin/capsules/${capsule.id}`}
                        className="text-primary hover:underline"
                      >
                        Edit →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Create Capsule</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input"
                  placeholder="E.g., React Fundamentals"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input min-h-20"
                  placeholder="Describe the capsule..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="input"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={creating}
                className="btn btn-primary w-full"
              >
                {creating ? 'Creating...' : 'Create Capsule'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
