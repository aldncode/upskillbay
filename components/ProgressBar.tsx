import React from 'react';

interface ProgressBarProps {
  percentage: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  label?: string;
  showPercentage?: boolean;
}

/**
 * 2026 Progress Bar Component
 * Features:
 * - Organic curved shape
 * - Smooth gradient animation
 * - Semantic color progression
 * - Accessibility with aria-valuenow
 * - Motion preference support
 */
export default function ProgressBar({
  percentage,
  showLabel = true,
  size = 'md',
  animated = true,
  label = 'Progress',
  showPercentage = true,
}: ProgressBarProps) {
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  const getGradient = (percent: number) => {
    if (percent < 30) return 'from-accent to-accent/80';
    if (percent < 60) return 'from-yellow-500 to-yellow-600';
    if (percent < 85) return 'from-primary to-primary/80';
    return 'from-eco-600 to-eco-700';
  };

  const clampedPercentage = Math.max(0, Math.min(100, percentage));
  const gradientClass = getGradient(clampedPercentage);

  return (
    <div className="w-full space-y-2">
      {/* Label */}
      {showLabel && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-text-primary">
            {label}
          </label>
          {showPercentage && (
            <span className="text-sm font-semibold text-text-secondary">
              {Math.round(clampedPercentage)}%
            </span>
          )}
        </div>
      )}

      {/* Progress Container */}
      <div
        className={`w-full bg-warm-200 rounded-full overflow-hidden ${sizeClasses[size]}`}
        role="progressbar"
        aria-valuenow={Math.round(clampedPercentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        {/* Progress Fill with Gradient */}
        <div
          className={`${sizeClasses[size]} rounded-full transition-all bg-gradient-to-r ${gradientClass} ${
            animated ? 'duration-600 ease-out' : ''
          }`}
          style={{ width: `${clampedPercentage}%` }}
        >
          {/* Shimmer effect for 0-100% complete */}
          {clampedPercentage === 100 && (
            <div className="absolute inset-0 animate-pulse opacity-30" />
          )}
        </div>
      </div>

      {/* Micro-hint for accessibility */}
      {clampedPercentage === 100 && (
        <p className="text-xs text-eco-600 font-medium flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Completed
        </p>
      )}
    </div>
  );
}
