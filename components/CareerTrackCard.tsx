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
  'Data Analyst': { bg: 'from-[#F8FAFC] to-[#E2E8F0]', icon: '#64748B' },
  'UX Designer': { bg: 'from-[#FEF2F2] to-[#FEE2E2]', icon: '#EA580C' },
  'Frontend Developer': { bg: 'from-[#EEF2FF] to-[#E0E7FF]', icon: '#4F46E5' },
  'Backend Engineer': { bg: 'from-[#F3E8FF] to-[#EDE9FE]', icon: '#7C3AED' },
  'Product Manager': { bg: 'from-[#ECFDF5] to-[#D1FAE5]', icon: '#059669' },
  'Web Developer': { bg: 'from-[#EEF2FF] to-[#E0E7FF]', icon: '#4F46E5' },
  'Web Development': { bg: 'from-[#EEF2FF] to-[#E0E7FF]', icon: '#4F46E5' },
  'Digital Marketing': { bg: 'from-[#ECFDF5] to-[#D1FAE5]', icon: '#059669' },
  'Data Analytics': { bg: 'from-[#F8FAFC] to-[#E2E8F0]', icon: '#64748B' },
};

const levelConfig: Record<string, { badge: string; color: string }> = {
  beginner: { badge: 'bg-sky-100 text-sky-700', color: '#0284C7' },
  intermediate: { badge: 'bg-amber-100 text-amber-700', color: '#D97706' },
  advanced: { badge: 'bg-rose-100 text-rose-700', color: '#E11D48' },
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

  const level = levelConfig[track.level.toLowerCase()] || levelConfig.beginner;

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="group relative h-full"
      >
        <div className={`h-full rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 ${featured ? 'border-[#4F46E5]/30 ring-2 ring-[#4F46E5]/10' : 'border-slate-200'}`}>
          {featured && (
            <div className="absolute -top-3 left-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Most Popular
              </span>
            </div>
          )}

          <div className="mb-5 flex items-start gap-4">
            <div
              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${iconColors.bg}`}
              style={{ color: iconColors.icon }}
            >
              <TrackIcon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="mb-2 text-lg font-bold text-[#0F172A]">{track.title}</h3>
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${level.badge}`}>
                {track.level}
              </span>
            </div>
          </div>

          <p className="mb-5 text-sm leading-relaxed text-slate-600">
            {track.description}
          </p>

          <div className="mb-5 rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-3">
            <p className="text-xs font-semibold text-emerald-700">
              <span className="mr-1">✓</span>
              {track.outcome}
            </p>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="h-3.5 w-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Duration</p>
              </div>
              <p className="text-sm font-bold text-[#0F172A]">{track.duration}</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="h-3.5 w-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Earning</p>
              </div>
              <p className="text-sm font-bold text-[#4F46E5]">{track.earningPotential}</p>
            </div>
          </div>

          <div className="mb-5">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Tools & Technologies</p>
            <div className="flex flex-wrap gap-1.5">
              {track.skills.slice(0, 5).map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600"
                >
                  {skill}
                </span>
              ))}
              {track.skills.length > 5 && (
                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500">
                  +{track.skills.length - 5} more
                </span>
              )}
            </div>
          </div>

          {(track.enrollments?.length ?? 0) > 0 && (
            <div className="mb-4 flex items-center gap-2 text-xs text-slate-500">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              {track.enrollments?.length} learners enrolled
            </div>
          )}

          <button
            onClick={() => setIsApplyModalOpen(true)}
            disabled={enrolled}
            className={`mt-auto flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
              enrolled
                ? 'border border-green-200 bg-green-50 text-green-700'
                : 'bg-[#4F46E5] text-white hover:bg-[#4338CA] hover:shadow-lg hover:shadow-indigo-500/25'
            }`}
          >
            {enrolled ? (
              <>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Enrolled
              </>
            ) : (
              <>
                Enroll Now
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </>
            )}
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
          toast.success('Application submitted successfully!');
        }}
      />
    </>
  );
}