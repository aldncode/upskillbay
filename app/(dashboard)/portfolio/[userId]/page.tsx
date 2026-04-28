'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Portfolio({ params }: { params: { userId: string } }) {
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch(`/api/portfolio/${params.userId}`);
        const data = await res.json();
        setPortfolio(data);
      } catch (error) {
        toast.error('Portfolio not found');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [params.userId]);

  if (loading) {
    return <div className="p-8 text-center">Loading portfolio...</div>;
  }

  if (!portfolio) {
    return <div className="p-8 text-center">Portfolio not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/career-tracks" className="text-primary hover:underline mb-4 inline-block">
        ← Back
      </Link>

      {/* Portfolio Header */}
      <div className="card mb-8">
        <div className="flex items-start gap-6 mb-6">
          {portfolio.user.image && (
            <img
              src={portfolio.user.image}
              alt={portfolio.user.name}
              className="w-24 h-24 rounded-full"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold">{portfolio.user.name}</h1>
            <p className="text-gray-600 mt-2">{portfolio.title}</p>
            {portfolio.bio && (
              <p className="text-gray-700 mt-4 max-w-2xl">{portfolio.bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* Completed Works */}
      <div className="card">
        <h2 className="text-3xl font-bold mb-6">Completed Works</h2>

        {portfolio.submissions && portfolio.submissions.length > 0 ? (
          <div className="space-y-6">
            {portfolio.submissions.map((submission: any) => (
              <div
                key={submission.id}
                className="p-4 border rounded-lg hover:border-primary transition-colors"
              >
                <h3 className="text-xl font-bold mb-2">{submission.task.title}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Capsule: {submission.task.capsule.title}
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-3 max-h-32 overflow-y-auto">
                  <p className="text-sm whitespace-pre-wrap">{submission.content}</p>
                </div>
                {submission.fileUrl && (
                  <a
                    href={submission.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    📎 View submission file →
                  </a>
                )}
                <p className="text-xs text-gray-500 mt-3">
                  Completed: {new Date(submission.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No completed works yet</p>
        )}
      </div>
    </div>
  );
}
