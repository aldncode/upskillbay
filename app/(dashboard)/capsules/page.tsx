'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Capsule {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  level: string;
  tasks: any[];
  enrollments: any[];
}

export default function CapsulesList() {
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (level) params.append('level', level);

        const res = await fetch(`/api/capsules?${params}`);
        const data = await res.json();
        setCapsules(data);
      } catch (error) {
        toast.error('Failed to load capsules');
      } finally {
        setLoading(false);
      }
    };

    fetchCapsules();
  }, [search, level]);

  if (loading) {
    return <div className="p-8 text-center">Loading capsules...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Skill Capsules 📚</h1>

      {/* Filters */}
      <div className="card mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
            <input
              type="text"
              placeholder="Search capsules..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="input"
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Capsules Grid */}
      {capsules.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No capsules found</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {capsules.map((capsule) => (
            <div key={capsule.id} className="card flex flex-col">
              {capsule.imageUrl && (
                <img
                  src={capsule.imageUrl}
                  alt={capsule.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-bold mb-2">{capsule.title}</h3>
              <p className="text-gray-600 text-sm mb-4 flex-grow">
                {capsule.description.substring(0, 100)}...
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className={`badge ${capsule.level === 'beginner' ? 'badge-success' : capsule.level === 'intermediate' ? 'badge-info' : 'badge-warning'}`}>
                  {capsule.level}
                </span>
                <span className="text-sm text-gray-600">
                  {capsule.tasks.length} tasks
                </span>
              </div>
              <Link href={`/capsules/${capsule.id}`} className="btn btn-primary w-full text-center">
                View Capsule
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
