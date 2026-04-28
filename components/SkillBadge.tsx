'use client';

interface SkillBadgeProps {
  skill: string;
  variant?: 'default' | 'primary' | 'success' | 'warning';
}

export default function SkillBadge({ skill, variant = 'default' }: SkillBadgeProps) {
  const variants = {
    default: 'bg-[#1E293B] text-[#E2E8F0] border border-[#334155]',
    primary: 'bg-[#3B82F6] text-white border border-[#2563EB]',
    success: 'bg-[#10B981] text-white border border-[#059669]',
    warning: 'bg-[#F59E0B] text-white border border-[#D97706]',
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${variants[variant]} hover:shadow-lg hover:scale-105`}
    >
      {skill}
    </span>
  );
}
