'use client';

import { ReactNode } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

interface OutcomeBoxProps {
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
}

export default function OutcomeBox({ children, className = '', showIcon = true }: OutcomeBoxProps) {
  return (
    <div className={`rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-5 text-[15px] font-semibold leading-7 text-[#065F46] shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] ${className}`}>
      <div className="flex items-start gap-3">
        {showIcon && (
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[#047857] shadow-sm">
            <CheckIcon className="h-4 w-4" />
          </span>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}
