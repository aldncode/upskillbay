'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Button from '@/components/Button';
import SkillBadge from '@/components/SkillBadge';

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
  onEnroll?: (trackId: string) => Promise<void>;
  enrolled?: boolean;
}

export default function CareerTrackCard({
  track,
  onEnroll,
  enrolled = false,
}: CareerTrackCardProps) {
  const [isEnrolling, setIsEnrolling] = useState(false);

  const handleEnroll = async () => {
    if (!onEnroll) return;

    try {
      setIsEnrolling(true);
      await onEnroll(track.id);
      toast.success('Successfully enrolled in this career track!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to enroll');
    } finally {
      setIsEnrolling(false);
    }
  };

  const levelColors: Record<string, string> = {
    beginner: 'text-[#10B981]',
    intermediate: 'text-[#F59E0B]',
    advanced: 'text-[#EF4444]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)' }}
      className="h-full"
    >
      <div className="relative h-full bg-gradient-to-br from-[#0F172A] to-[#0B0F19] border border-[#1E293B] rounded-xl overflow-hidden group hover:border-[#3B82F6] transition-all duration-300">
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 via-transparent to-[#8B5CF6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Level Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              levelColors[track.level.toLowerCase()] || 'text-[#9CA3AF]'
            } bg-[#1E293B]/80 backdrop-blur-sm border border-[#334155]`}
          >
            {track.level}
          </span>
        </div>

        {/* Content */}
        <div className="relative p-6 flex flex-col h-full">
          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 pr-20 group-hover:text-[#3B82F6] transition-colors duration-300">
            {track.title}
          </h3>

          {/* Description */}
          <p className="text-[#9CA3AF] text-sm mb-4 line-clamp-2 flex-grow">
            {track.description}
          </p>

          {/* Outcome - Highlighted */}
          <div className="mb-6 p-4 bg-[#1E293B]/60 border-l-4 border-[#3B82F6] rounded-lg">
            <p className="text-xs text-[#64748B] font-semibold mb-1 uppercase tracking-wide">
              🎯 Your Outcome
            </p>
            <p className="text-sm font-bold text-[#E2E8F0]">
              {track.outcome}
            </p>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <p className="text-xs text-[#64748B] font-semibold mb-2 uppercase tracking-wide">
              Skills You'll Learn
            </p>
            <div className="flex flex-wrap gap-2">
              {track.skills.slice(0, 3).map((skill, idx) => (
                <SkillBadge key={idx} skill={skill} variant="default" />
              ))}
              {track.skills.length > 3 && (
                <span className="text-xs text-[#64748B] flex items-center">
                  +{track.skills.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6 pb-6 border-b border-[#1E293B]">
            <div>
              <p className="text-xs text-[#64748B] font-semibold uppercase tracking-wide mb-1">
                Duration
              </p>
              <p className="text-sm font-bold text-[#E2E8F0]">
                {track.duration}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-semibold uppercase tracking-wide mb-1">
                Earning Potential
              </p>
              <p className="text-sm font-bold text-[#10B981]">
                {track.earningPotential}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-auto">
            <Button
              onClick={handleEnroll}
              disabled={enrolled || isEnrolling}
              variant={enrolled ? 'secondary' : 'primary'}
              className="w-full justify-center"
            >
              {isEnrolling && (
                <span className="inline-block animate-spin mr-2">⚙️</span>
              )}
              {enrolled ? '✓ Enrolled' : 'Start Track'}
            </Button>
          </div>

          {/* Enrollment Count */}
          <p className="text-xs text-[#64748B] text-center mt-3">
            {track.enrollments?.length || 0} people enrolled
          </p>
        </div>
      </div>
    </motion.div>
  );
}
