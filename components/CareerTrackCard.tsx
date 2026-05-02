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

export default function CareerTrackCard({
  track,
  enrolled = false,
}: CareerTrackCardProps) {
  const [isEnrolling] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);


  const levelColors: Record<string, string> = {
    beginner: 'text-[#10B981]',
    intermediate: 'text-[#F59E0B]',
    advanced: 'text-[#EF4444]',
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -4 }}
        className="h-full"
      >
        <div className="relative h-full bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden group hover:border-[#3B82F6]/50 hover:shadow-lg hover:shadow-[#3B82F6]/10 transition-all duration-200 p-6 flex flex-col">
          {/* Level Badge */}
          <div className="absolute top-4 right-4 z-10">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                levelColors[track.level.toLowerCase()] || 'text-[#9CA3AF]'
              } bg-[#0B0F19] border border-[#1F2937]`}
            >
              {track.level}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2 pr-16">
            {track.title}
          </h3>

          {/* Description */}
          <p className="text-[#9CA3AF] text-sm mb-6 line-clamp-2 flex-grow">
            {track.description}
          </p>

          {/* Outcome */}
          <div className="mb-6 pb-6 border-b border-[#1F2937]">
            <p className="text-xs text-[#6B7280] font-semibold mb-2 uppercase tracking-wide">
              Outcome
            </p>
            <p className="text-sm text-[#E2E8F0] font-medium">
              {track.outcome}
            </p>
          </div>

          {/* Skills */}
          <div className="mb-6 pb-6 border-b border-[#1F2937]">
            <p className="text-xs text-[#6B7280] font-semibold mb-3 uppercase tracking-wide">
              Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {track.skills.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-block px-3 py-1 bg-[#0B0F19] text-[#3B82F6] text-xs font-medium rounded-lg border border-[#1F2937]"
                >
                  {skill}
                </span>
              ))}
              {track.skills.length > 3 && (
                <span className="text-xs text-[#6B7280] flex items-center">
                  +{track.skills.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-[#1F2937]">
            <div>
              <p className="text-xs text-[#6B7280] font-semibold uppercase tracking-wide mb-2">
                Duration
              </p>
              <p className="text-sm font-bold text-white">
                {track.duration}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#6B7280] font-semibold uppercase tracking-wide mb-2">
                Earning
              </p>
              <p className="text-sm font-bold text-[#10B981]">
                {track.earningPotential}
              </p>
            </div>
          </div>

          {/* Enrollment Count */}
          <p className="text-xs text-[#6B7280] mb-6">
            {track.enrollments?.length || 0} people enrolled
          </p>

          {/* CTA Button */}
          <button
            onClick={() => setIsApplyModalOpen(true)}
            disabled={isEnrolling}
            className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              enrolled
                ? 'bg-[#0B0F19] border border-[#1F2937] text-[#10B981] cursor-default'
                : 'bg-[#111827] border border-[#3B82F6] text-white hover:shadow-lg hover:shadow-[#3B82F6]/20 hover:-translate-y-1'
            } ${isEnrolling ? 'opacity-75' : ''}`}
          >
            {enrolled ? '✓ Applied' : 'Apply Now'}
          </button>
        </div>
      </motion.div>

      {/* Apply Modal */}
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        type="track"
        targetId={track.id}
        targetName={track.title}
        onSuccess={() => {
          // Optionally refresh or update state
          toast.success('Application received!');
        }}
      />
    </>
  );
}
