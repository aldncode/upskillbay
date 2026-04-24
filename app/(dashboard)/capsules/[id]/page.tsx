'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function CapsuleDetail({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const [capsule, setCapsule] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  const user = session?.user as any;

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const res = await fetch(`/api/capsules/${params.id}`);
        const data = await res.json();
        setCapsule(data);

        // Check if user is enrolled
        if (user && data.enrollments) {
          setIsEnrolled(data.enrollments.some((e: any) => e.userId === user.id));
        }
      } catch (error) {
        toast.error('Failed to load capsule');
      } finally {
        setLoading(false);
      }
    };

    fetchCapsule();
  }, [params.id, user]);

  const handleEnroll = async () => {
    if (!session) {
      toast.error('Please sign in first');
      return;
    }

    setEnrolling(true);
    try {
      const res = await fetch(`/api/capsules/${params.id}/enroll`, {
        method: 'POST',
      });

      if (res.ok) {
        toast.success('Enrolled successfully!');
        setIsEnrolled(true);
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to enroll');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!capsule) {
    return <div className="p-8 text-center">Capsule not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link href="/capsules" className="text-primary hover:underline mb-4 inline-block">
        ← Back to Capsules
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{capsule.title}</h1>
          <div className="flex items-center gap-4 mb-6">
            <span className={`badge ${capsule.level === 'beginner' ? 'badge-success' : 'badge-info'}`}>
              {capsule.level}
            </span>
            <span className="text-gray-600">{capsule.tasks?.length || 0} tasks</span>
            <span className="text-gray-600">
              {capsule.enrollments?.length || 0} students enrolled
            </span>
          </div>

          <p className="text-lg text-gray-600 mb-8">{capsule.description}</p>

          <h2 className="text-2xl font-bold mb-4">Tasks</h2>
          {isEnrolled && capsule.tasks && capsule.tasks.length > 0 ? (
            <div className="space-y-3">
              {capsule.tasks.map((task: any, idx: number) => (
                <Link
                  key={task.id}
                  href={`/tasks/${task.id}`}
                  className="card hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="inline-block w-8 h-8 rounded-full bg-primary text-white text-center leading-8 mr-3 font-bold">
                        {idx + 1}
                      </span>
                      <span className="font-semibold">{task.title}</span>
                    </div>
                    <span className="text-primary">→</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {task.instructions.substring(0, 80)}...
                  </p>
                </Link>
              ))}
            </div>
          ) : isEnrolled ? (
            <p className="text-gray-600">No tasks yet</p>
          ) : (
            <div className="p-6 bg-gray-100 rounded-lg text-center">
              <p className="text-gray-600 mb-4">Enroll in this capsule to see and submit tasks</p>
            </div>
          )}
        </div>

        <div>
          <div className="card sticky top-8">
            {isEnrolled ? (
              <div className="text-center">
                <p className="text-lg font-semibold text-green-600 mb-4">✓ You're enrolled!</p>
                <p className="text-sm text-gray-600">
                  Start completing tasks and build your portfolio.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-4">Ready to learn?</h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Enroll in this skill capsule and start completing tasks to build your
                  portfolio.
                </p>
                <button
                  onClick={handleEnroll}
                  disabled={enrolling || !session}
                  className="btn-primary w-full"
                >
                  {enrolling ? 'Enrolling...' : 'Enroll Now'}
                </button>
                {!session && (
                  <p className="text-sm text-gray-600 mt-4">
                    <Link href="/auth/login" className="text-primary font-medium">
                      Sign in
                    </Link>{' '}
                    to enroll
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
