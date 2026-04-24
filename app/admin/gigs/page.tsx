'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ManageGigs() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await fetch('/api/gigs');
        const data = await res.json();
        setGigs(data);
      } catch (error) {
        toast.error('Failed to load gigs');
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const res = await fetch('/api/gigs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          budget: parseFloat(budget),
          deadline,
        }),
      });

      if (res.ok) {
        const gig = await res.json();
        setGigs([...gigs, gig]);
        setTitle('');
        setDescription('');
        setBudget('');
        setDeadline('');
        toast.success('Gig created!');
      } else {
        toast.error('Failed to create gig');
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
      <h1 className="text-4xl font-bold mb-8">Manage Gigs</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">All Gigs ({gigs.length})</h2>
            {gigs.length === 0 ? (
              <p className="text-gray-600">No gigs yet</p>
            ) : (
              <div className="space-y-3">
                {gigs.map((gig: any) => (
                  <div key={gig.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">{gig.title}</p>
                        <p className="text-sm text-gray-600">
                          Budget: ${(gig.budget / 100).toFixed(2)} · Due:{' '}
                          {new Date(gig.deadline).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`badge ${gig.status === 'open' ? 'badge-success' : 'badge-warning'}`}>
                        {gig.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Create Gig</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input"
                  placeholder="Gig title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input min-h-20"
                  placeholder="Describe the gig..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Budget ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="input"
                  placeholder="100.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Deadline</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="input"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={creating}
                className="btn btn-primary w-full"
              >
                {creating ? 'Creating...' : 'Create Gig'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
