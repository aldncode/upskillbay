import React from 'react';
import Link from 'next/link';

interface ProfileSectionProps {
  title: string;
  description?: string;
  isCompleted: boolean;
  completionPercent: number;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
  link?: string;
}

export default function ProfileSection({
  title,
  description,
  isCompleted,
  completionPercent,
  icon,
  children,
  actionText = 'Complete',
  onAction,
  link,
}: ProfileSectionProps) {
  const content = (
    <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 hover:border-[#3B82F6] transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          {icon && <div className="text-2xl">{icon}</div>}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              {title}
              {isCompleted && (
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  ✓ Complete
                </span>
              )}
            </h3>
            {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
          </div>
        </div>
      </div>

      {children && <div className="mb-4">{children}</div>}

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">Progress</span>
            <span className="text-xs font-semibold text-blue-400">{completionPercent}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>

        {(link || onAction) && !isCompleted && (
          <button
            onClick={onAction}
            className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );

  if (link) {
    return <Link href={link}>{content}</Link>;
  }

  return content;
}
