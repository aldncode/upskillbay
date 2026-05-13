'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import ApplyModal from './ApplyModal';
import Card from './Card';

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
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function TrackIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 6.5h9.5A4.5 4.5 0 0 1 19 11v6.5M5 6.5V17a1 1 0 0 0 1 1h13M5 6.5 8.5 3M19 17.5 15.5 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Icon color palette for visual variation
const iconColorMap: Record<string, { bg: string; text: string; icon: string }> = {
  'Salesforce Admin': { bg: 'from-[#F0F9FF] to-[#E0F2FE]', text: '#0369A1', icon: '#0EA5E9' },
  'Data Analyst': { bg: 'from-[#F8FAFC] to-[#F1F5F9]', text: '#475569', icon: '#64748B' },
  'UX Designer': { bg: 'from-[#FEF2F2] to-[#FEE2E2]', text: '#7C2D12', icon: '#EA580C' },
  'Frontend Developer': { bg: 'from-[#EEF2FF] to-[#E0E7FF]', text: '#3730A3', icon: '#4F46E5' },
  'Backend Engineer': { bg: 'from-[#F3E8FF] to-[#F3E8FF]', text: '#5B21B6', icon: '#7C3AED' },
  'Product Manager': { bg: 'from-[#ECFDF5] to-[#D1FAE5]', text: '#065F46', icon: '#10B981' },
};

export default function CareerTrackCard({
  track,
  enrolled = false,
}: CareerTrackCardProps) {
  const [isEnrolling] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const levelClasses: Record<string, string> = {
    beginner: 'border-sky-200 bg-sky-50 text-sky-700',
    intermediate: 'border-amber-200 bg-amber-50 text-amber-700',
    advanced: 'border-rose-200 bg-rose-50 text-rose-700',
  };

  // Get icon colors with fallback
  const iconColors = iconColorMap[track.title] || {
    bg: 'from-[#EEF2FF] to-[#E0E7FF]',
    text: '#4F46E5',
    icon: '#4F46E5',
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="h-full"
      >
        <Card className="group h-full flex flex-col overflow-hidden border-[#E2E8F0] hover:shadow-2xl">
          {/* SECTION 1: IDENTITY */}
          <div className="mb-8 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3.5 flex-1">
              {/* Premium icon with gradient background */}
              <div
                className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br ${iconColors.bg} text-[${iconColors.icon}] shadow-lg shadow-black/5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl`}
                style={{ color: iconColors.icon }}
              >
                <TrackIcon />
              </div>

              {/* Title and level */}
              <div className="min-w-0 flex-1 pt-1">
                <h3 className="mb-2.5 text-xl font-black leading-tight tracking-tight text-[#0F172A]">
                  {track.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] ${
                      levelClasses[track.level.toLowerCase()] ||
                      'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  >
                    {track.level}
                  </span>
                  <span className="text-xs font-medium text-[#64748B]">
                    {track.enrollments?.length || 0} enrolled
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: OPPORTUNITY */}
          <div className="mb-8">
            <p className="line-clamp-3 text-sm leading-6 text-[#475569] font-medium">
              {track.description}
            </p>
          </div>

          {/* Skills pills - modern styling */}
          <div className="mb-8 flex flex-wrap gap-2">
            {track.skills.slice(0, 3).map((skill, idx) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-full border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#475569] shadow-sm hover:border-[#CBD5E1] transition-colors"
              >
                {skill}
              </span>
            ))}
            {track.skills.length > 3 && (
              <span className="inline-flex items-center rounded-full border border-[#C7D2FE] bg-[#EEF2FF] px-3 py-1.5 text-xs font-bold text-[#4F46E5]">
                +{track.skills.length - 3} more
              </span>
            )}
          </div>

          {/* SECTION 3: OUTCOMES & METRICS */}
          
          {/* Success/Outcome Panel - Premium emphasis */}
          <div className="mb-8 rounded-2xl border border-[#A7F3D0] bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white shadow-md">
                <svg className="h-4 w-4 text-[#047857]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-semibold leading-6 text-[#065F46]">
                {track.outcome}
              </p>
            </div>
          </div>

          {/* Duration & Earning Stats - Enhanced */}
          <div className="mb-8 grid grid-cols-2 gap-3">
            {/* Duration Card */}
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 hover:border-[#CBD5E1] transition-colors">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <DurationIcon />
                </div>
              </div>
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Duration
              </p>
              <p className="text-lg font-black text-[#0F172A]">
                {track.duration}
              </p>
            </div>

            {/* Earning Potential Card - Stronger presence */}
            <div className="rounded-xl border border-[#FCD34D] bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] p-4 hover:border-[#FBBF24] transition-colors shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-200 text-amber-700">
                  <EarningsIcon />
                </div>
              </div>
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#92400E]">
                Earning Potential
              </p>
              <p className="text-lg font-black text-[#B45309]">
                {track.earningPotential}
              </p>
            </div>
          </div>

          {/* SECTION 4: ACTION */}
          <button
            onClick={() => setIsApplyModalOpen(true)}
            disabled={isEnrolling || enrolled}
            className={`mt-auto w-full rounded-xl px-5 py-3.5 text-base font-bold transition-all duration-300 ${
              enrolled
                ? 'border border-green-300 bg-gradient-to-br from-green-50 to-green-100 text-green-700 shadow-sm'
                : 'bg-gradient-to-br from-[#4F46E5] via-[#6D28D9] to-[#7C3AED] text-white shadow-lg shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/40 active:-translate-y-0.5'
            } ${isEnrolling ? 'opacity-75' : ''}`}
          >
            {enrolled ? '✓ Enrolled' : 'Enroll Now'}
          </button>
        </Card>
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
