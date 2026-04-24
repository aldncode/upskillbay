'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ReviewSubmission({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [submission, setSubmission] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [approving, setApproving] = useState(false);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const res = await fetch(`/api/submissions/${params.id}`);
        const data = await res.json();
        setSubmission(data);
      } catch (error) {
        toast.error('Failed to load submission');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [params.id]);

  const handleReview = async (status: 'approved' | 'rejected') => {
    setApproving(true);
    try {
      const res = await fetch(`/api/submissions/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          feedback,
        }),
      });

      if (res.ok) {
        toast.success(`Submission ${status}!`);
        router.push('/admin');
      } else {
        toast.error('Failed to review submission');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setApproving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!submission) {
    return <div className="p-8 text-center">Submission not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/admin" className="text-primary hover:underline mb-4 inline-block">
        ← Back to Admin
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* User Info */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Submission Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">From</p>
                <p className="font-semibold">{submission.user.name}</p>
                <p className="text-sm text-gray-600">{submission.user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Task</p>
                <p className="font-semibold">{submission.task.title}</p>
                <p className="text-sm text-gray-600">{submission.task.capsule.title}</p>
              </div>
            </div>
          </div>

          {/* Submission Content */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Submission Content</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
              <p className="whitespace-pre-wrap text-sm">{submission.content}</p>
            </div>
            {submission.fileUrl && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">File:</p>
                <a
                  href={submission.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline break-all"
                >
                  {submission.fileUrl}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Review Panel */}
        <div>
          <div className="card sticky top-8">
            <h3 className="text-xl font-bold mb-4">Review</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Feedback</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="input min-h-24"
                  placeholder="Provide feedback to the user..."
                />
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => handleReview('approved')}
                  disabled={approving}
                  className="btn btn-secondary w-full"
                >
                  ✓ Approve
                </button>
                <button
                  onClick={() => handleReview('rejected')}
                  disabled={approving}
                  className="btn btn-outline w-full border-red-500 text-red-600 hover:bg-red-50"
                >
                  ✗ Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
