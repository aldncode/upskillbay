'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import ApplyModal from './ApplyModal';

interface CareerTrack {
  id: string;
  title: string;
  description: string;
  outcome: string;
  duration: string;
  earningPotential: string;
  skills: string[];
  level: string;
  enrollments?: { userId: string }[];
}

interface CareerTrackCardProps {
  track: CareerTrack;
  enrolled?: boolean;
}

function DurationIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EarningsIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v18M17 7.5c-.7-1.2-2.1-2-4-2h-1.5C9.6 5.5 8 6.8 8 8.4c0 1.3.9 2.4 2.3 2.8l3.8 1.1c1.4.4 2.3 1.5 2.3 2.8 0 1.8-1.6 3.4-3.6 3.4H11c-1.9 0-3.3-.8-4-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OutcomeIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CareerTrackCard({
  track,
  enrolled = false,
}: CareerTrackCardProps) {
  const [isEnrolling] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const levelClasses: Record<string, string> = {
    beginner: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    intermediate: 'bg-amber-50 text-amber-700 border-amber-100',
    advanced: 'bg-rose-50 text-rose-700 border-rose-100',
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        whileHover={{ y: -6, scale: 1.01 }}
        className="h-full"
      >
        <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/80 bg-white p-6 shadow-lg shadow-slate-200/60 transition-all duration-300 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-100/80">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4F46E5] via-[#06B6D4] to-emerald-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="mb-6 flex items-start justify-between gap-4">
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                levelClasses[track.level.toLowerCase()] || 'bg-gray-50 text-gray-700 border-gray-100'
              }`}
            >
              {track.level}
            </span>
            <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-[#6B7280]">
              {track.enrollments?.length || 0} enrolled
            </span>
          </div>

          <h3 className="mb-3 text-xl font-bold leading-snug text-[#111827]">
            {track.title}
          </h3>

          <p className="mb-6 line-clamp-3 flex-grow text-sm leading-6 text-[#4B5563]">
            {track.description}
          </p>

          <div className="mb-6 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-emerald-700">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm">
                <OutcomeIcon />
              </span>
              <p className="text-xs font-semibold uppercase tracking-wide">
                Outcome
              </p>
            </div>
            <p className="text-sm font-semibold leading-6 text-emerald-800">
              {track.outcome}
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {track.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-2.5 py-1 text-xs font-medium text-[#374151]"
              >
                {skill}
              </span>
            ))}
            {track.skills.length > 3 && (
              <span className="rounded-lg bg-[#EEF2FF] px-2.5 py-1 text-xs font-semibold text-[#4F46E5]">
                +{track.skills.length - 3}
              </span>
            )}
          </div>

          <div className="mb-6 grid grid-cols-2 gap-3 border-t border-[#E5E7EB] pt-5">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                <span className="text-[#4F46E5]">
                  <DurationIcon />
                </span>
                Duration
              </p>
              <p className="text-sm font-bold text-[#111827]">
                {track.duration}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                <span className="text-emerald-600">
                  <EarningsIcon />
                </span>
                Earning
              </p>
              <p className="text-sm font-bold text-emerald-700">
                {track.earningPotential}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsApplyModalOpen(true)}
            disabled={isEnrolling || enrolled}
            className={`mt-auto w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
              enrolled
                ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'bg-[#4F46E5] text-white shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#4338CA] hover:shadow-xl hover:shadow-indigo-500/30'
            } ${isEnrolling ? 'opacity-75' : ''}`}
          >
            {enrolled ? 'Enrolled' : 'Enroll Now'}
          </button>
        </div>
      </motion.article>

      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        type="track"
        targetId={track.id}
        targetName={track.title}
        onSuccess={() => {
          toast.success('Application received!');
        }}
      />
    </>
  );
}
