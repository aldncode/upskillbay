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
  featured?: boolean;
}

function TrackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

const iconColorMap: Record<string, { bg: string; icon: string }> = {
  'Salesforce Admin': { bg: 'from-[#F0F9FF] to-[#E0F2FE]', icon: '#0EA5E9' },
  'Data Analyst': { bg: 'from-[#F8FAFC] to-[#F1F5F9]', icon: '#64748B' },
  'UX Designer': { bg: 'from-[#FEF2F2] to-[#FEE2E2]', icon: '#EA580C' },
  'Frontend Developer': { bg: 'from-[#EEF2FF] to-[#E0E7FF]', icon: '#4F46E5' },
  'Backend Engineer': { bg: 'from-[#F3E8FF] to-[#F3E8FF]', icon: '#7C3AED' },
  'Product Manager': { bg: 'from-[#ECFDF5] to-[#D1FAE5]', icon: '#10B981' },
};

const levelConfig: Record<string, { badge: string; label: string }> = {
  beginner: { badge: 'bg-sky-100 text-sky-700', label: 'Beginner' },
  intermediate: { badge: 'bg-amber-100 text-amber-700', label: 'Intermediate' },
  advanced: { badge: 'bg-rose-100 text-rose-700', label: 'Advanced' },
};

export default function CareerTrackCard({
  track,
  enrolled = false,
  featured = false,
}: CareerTrackCardProps) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const iconColors = iconColorMap[track.title] || {
    bg: 'from-[#EEF2FF] to-[#E0E7FF]',
    icon: '#4F46E5',
  };

  const level = levelConfig[track.level.toLowerCase()] || {
    badge: 'bg-slate-100 text-slate-600',
    label: track.level,
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`group relative h-full ${featured ? 'lg:col-span-2' : ''}`}
      >
        <div className={`h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg ${featured ? 'ring-2 ring-[#4F46E5]/20' : ''}`}>
          {featured && (
            <div className="absolute -top-3 left-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4F46E5] px-3 py-1 text-xs font-semibold text-white">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Most Popular
              </span>
            </div>
          )}

          <div className="mb-4 flex items-start gap-4">
            <div
              className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${iconColors.bg}`}
              style={{ color: iconColors.icon }}
            >
              <TrackIcon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="mb-1.5 text-lg font-bold text-[#0F172A]">{track.title}</h3>
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${level.badge}`}>
                {level.label}
              </span>
            </div>
          </div>

          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600">
            {track.description}
          </p>

          <div className="mb-4 rounded-xl bg-slate-50 px-4 py-3">
            <p className="text-sm font-medium text-[#0F172A]">
              <span className="text-slate-500">Outcome:</span> {track.outcome}
            </p>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
              <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Duration</p>
              <p className="text-sm font-bold text-[#0F172A]">{track.duration}</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
              <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Earning</p>
              <p className="text-sm font-bold text-[#4F46E5]">{track.earningPotential}</p>
            </div>
          </div>

          <div className="mb-5 flex flex-wrap gap-1.5">
            {track.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-600"
              >
                {skill}
              </span>
            ))}
            {track.skills.length > 4 && (
              <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500">
                +{track.skills.length - 4}
              </span>
            )}
          </div>

          <button
            onClick={() => setIsApplyModalOpen(true)}
            disabled={enrolled}
            className={`w-full rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
              enrolled
                ? 'border border-green-200 bg-green-50 text-green-700'
                : 'bg-[#4F46E5] text-white hover:bg-[#4338CA]'
            }`}
          >
            {enrolled ? '✓ Enrolled' : 'Enroll Now'}
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