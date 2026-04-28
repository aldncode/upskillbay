'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CapsuleRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to career tracks page
    router.push('/career-tracks');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin">
          <svg
            className="w-12 h-12 text-[#3B82F6]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <p className="text-[#9CA3AF] mt-4">Redirecting to Career Tracks...</p>
      </div>
    </div>
  );
}
