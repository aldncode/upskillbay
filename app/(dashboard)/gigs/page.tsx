'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Gig {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  status: string;
  applications: any[];
}

export default function Gigs() {
  const { data: session } = useSession();
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);

  const user = session?.user as any;

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

  if (loading) {
    return <div className="p-8 text-center">Loading gigs...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Gig Marketplace 💼</h1>

      {gigs.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600 text-lg">No gigs available yet</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {gigs.map((gig) => {
            const userApplication = gig.applications.find((a: any) => a.userId === user?.id);
            return (
              <div key={gig.id} className="card">
                <h3 className="text-xl font-bold mb-2">{gig.title}</h3>
                <p className="text-gray-600 mb-4">
                  {gig.description.substring(0, 150)}...
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Budget</p>
                    <p className="text-2xl font-bold text-secondary">
                      ${(gig.budget / 100).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Deadline</p>
                    <p className="font-medium">
                      {new Date(gig.deadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {userApplication ? (
                  <div className="p-3 bg-blue-50 rounded-lg text-center">
                    <p className="text-sm text-blue-900 font-medium">
                      ✓ Application {userApplication.status}
                    </p>
                  </div>
                ) : (
                  <Link href={`/gigs/${gig.id}`} className="btn btn-primary w-full text-center block">
                    Apply for Gig
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
