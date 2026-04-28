'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function TaskDetail({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [content, setContent] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [userSubmission, setUserSubmission] = useState<any>(null);

  const user = session?.user as any;

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/tasks/${params.id}`);
        const data = await res.json();
        setTask(data);

        // Check if user has already submitted
        if (user && data.submissions) {
          const userSub = data.submissions.find((s: any) => s.userId === user.id);
          if (userSub) {
            setUserSubmission(userSub);
          }
        }
      } catch (error) {
        toast.error('Failed to load task');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [params.id, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() && !fileUrl.trim()) {
      toast.error('Please provide some content');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId: params.id,
          content,
          fileUrl,
        }),
      });

      if (res.ok) {
        toast.success('Submission sent for review!');
        setContent('');
        setFileUrl('');
        // Refetch task
        const taskRes = await fetch(`/api/tasks/${params.id}`);
        const data = await taskRes.json();
        setTask(data);
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

  if (!task) {
    return <div className="p-8 text-center">Task not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href={`/career-tracks/${task.capsule.id}`} className="text-primary hover:underline mb-4 inline-block">
        ← Back to {task.capsule.title}
      </Link>

      <div className="card mb-8">
        <h1 className="text-4xl font-bold mb-4">{task.title}</h1>
        <div className="prose max-w-none">
          <div className="whitespace-pre-wrap text-gray-700">{task.instructions}</div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-medium text-blue-900">
            📝 Submission Type:{' '}
            <span className="font-semibold">
              {task.submissionType === 'text'
                ? 'Text'
                : task.submissionType === 'file'
                ? 'File Upload'
                : 'Link'}
            </span>
          </p>
        </div>
      </div>

      {/* Submission Form */}
      {!session ? (
        <div className="card text-center">
          <p className="text-gray-600 mb-4">
            Sign in to submit this task and build your portfolio.
          </p>
          <Link href="/auth/login" className="btn btn-primary">
            Sign In
          </Link>
        </div>
      ) : (
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Submit Your Work</h2>

          {userSubmission && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
              <p className="text-sm font-medium text-blue-900">
                📌 You've already submitted this task
              </p>
              <span
                className={`badge mt-2 ${
                  userSubmission.status === 'approved'
                    ? 'badge-success'
                    : userSubmission.status === 'pending'
                    ? 'badge-warning'
                    : 'badge-error'
                }`}
              >
                {userSubmission.status}
              </span>
              {userSubmission.feedback && (
                <p className="text-sm mt-3 p-3 bg-white rounded border-l-4 border-blue-400">
                  <strong>Feedback:</strong> {userSubmission.feedback}
                </p>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {['text', 'link'].includes(task.submissionType) && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  {task.submissionType === 'text' ? 'Your Answer' : 'Link to Your Work'}
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="input min-h-48"
                  placeholder={
                    task.submissionType === 'text'
                      ? 'Write your answer here...'
                      : 'https://example.com/your-work'
                  }
                />
              </div>
            )}

            {task.submissionType === 'file' && (
              <div>
                <label className="block text-sm font-medium mb-2">File URL</label>
                <input
                  type="url"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  className="input"
                  placeholder="https://example.com/my-file.pdf"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Upload your file to a service like Uploadcare or Google Drive and paste the link here
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Additional Notes (Optional)</label>
              <textarea
                value={fileUrl && task.submissionType !== 'file' ? '' : fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                className="input min-h-24"
                placeholder="Any additional information about your submission..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting || !session}
              className="btn btn-primary w-full"
            >
              {submitting ? 'Submitting...' : 'Submit Task'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
