'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function GigDetail({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const [gig, setGig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const user = session?.user as any;

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await fetch(`/api/gigs/${params.id}`);
        const data = await res.json();
        setGig(data);

        if (user && data.applications) {
          setHasApplied(data.applications.some((a: any) => a.userId === user.id));
        }
      } catch (error) {
        toast.error('Failed to load gig');
      } finally {
        setLoading(false);
      }
    };

    fetchGig();
  }, [params.id, user]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error('Please write a message');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gigId: params.id,
          message,
        }),
      });

      if (res.ok) {
        toast.success('Application submitted!');
        setMessage('');
        setHasApplied(true);
      } else {
        const data = await res.json();
        toast.error(data.error);
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!gig) {
    return <div className="p-8 text-center">Gig not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/gigs" className="text-primary hover:underline mb-4 inline-block">
        ← Back to Gigs
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-6">{gig.title}</h1>

          <div className="card mb-6">
            <h2 className="text-2xl font-bold mb-4">About this Gig</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{gig.description}</p>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Applicants</h2>
            {(gig.applications?.length ?? 0) > 0 ? (
              <div className="space-y-3">
                {gig.applications.map((app: any) => (
                  <div key={app.id} className="p-3 border rounded-lg">
                    <p className="font-medium">{app.user.name}</p>
                    <p className="text-sm text-gray-600">{app.user.email}</p>
                    <p className="text-sm mt-2">{app.message.substring(0, 100)}...</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No applicants yet</p>
            )}
          </div>
        </div>

        <div>
          <div className="card sticky top-8">
            <div className="mb-4">
              <p className="text-sm text-gray-600">Budget</p>
              <p className="text-4xl font-bold text-secondary">
                ${(gig.budget / 100).toFixed(2)}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600">Deadline</p>
              <p className="font-semibold">
                {new Date(gig.deadline).toLocaleDateString()}
              </p>
            </div>

            <div className="h-px bg-gray-200 mb-6"></div>

            {!session ? (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">Sign in to apply</p>
                <Link href="/auth/login" className="btn btn-primary w-full text-center block">
                  Sign In
                </Link>
              </div>
            ) : hasApplied ? (
              <div className="p-4 bg-green-50 rounded-lg text-center border border-green-200">
                <p className="font-medium text-green-900">✓ Application submitted</p>
                <p className="text-sm text-green-800 mt-1">Waiting for response</p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-3">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell the employer why you're a great fit for this gig..."
                  className="input min-h-24"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary w-full"
                >
                  {submitting ? 'Submitting...' : 'Apply for Gig'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
