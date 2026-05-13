'use client';

import React, { ReactNode } from 'react';

interface AccessibleInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  helperText?: string;
}

interface AccessibleSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  options: { value: string; label: string }[];
}

/**
 * 2026 Accessible Form Components
 * Features:
 * - WCAG 2.1 Level AA compliant
 * - Proper label associations
 * - Error messages with aria-describedby
 * - Keyboard navigation support
 * - Focus management
 * - Semantic HTML
 */

export function AccessibleInput({
  label,
  error,
  hint,
  required,
  helperText,
  id,
  ...props
}: AccessibleInputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const hintId = hint ? `${inputId}-hint` : undefined;

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-text-primary"
        >
          {label}
          {required && <span className="text-accent ml-1" aria-label="required">*</span>}
        </label>
      )}

      {hint && (
        <p id={hintId} className="text-xs text-text-muted">
          {hint}
        </p>
      )}

      <input
        id={inputId}
        aria-describedby={`${errorId || ''} ${hintId || ''}`}
        aria-invalid={!!error}
        required={required}
        className={`
          w-full px-4 py-2 rounded-organicSm border-2 transition-all
          bg-white text-text-primary placeholder-text-muted
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
          ${error ? 'border-accent' : 'border-warm-200'}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        {...props}
      />

      {error && (
        <p
          id={errorId}
          className="text-sm text-accent font-medium"
          role="alert"
        >
          {error}
        </p>
      )}

      {helperText && (
        <p className="text-xs text-text-muted">{helperText}</p>
      )}
    </div>
  );
}

export function AccessibleSelect({
  label,
  error,
  hint,
  required,
  options,
  id,
  ...props
}: AccessibleSelectProps) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${selectId}-error` : undefined;

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-text-primary"
        >
          {label}
          {required && <span className="text-accent ml-1">*</span>}
        </label>
      )}

      {hint && (
        <p className="text-xs text-text-muted">{hint}</p>
      )}

      <select
        id={selectId}
        aria-describedby={errorId}
        aria-invalid={!!error}
        required={required}
        className={`
          w-full px-4 py-2 rounded-organicSm border-2 transition-all
          bg-white text-text-primary
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
          ${error ? 'border-accent' : 'border-warm-200'}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p
          id={errorId}
          className="text-sm text-accent font-medium"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

interface AccessibleCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function AccessibleCheckbox({
  label,
  error,
  id,
  ...props
}: AccessibleCheckboxProps) {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <input
          id={checkboxId}
          type="checkbox"
          className="w-5 h-5 rounded border-2 border-warm-300 checked:bg-primary checked:border-primary focus:ring-2 focus:ring-primary focus:outline-none accent-primary cursor-pointer"
          {...props}
        />
        <label
          htmlFor={checkboxId}
          className="text-sm text-text-primary cursor-pointer hover:text-primary transition-colors"
        >
          {label}
        </label>
      </div>
      {error && (
        <p className="text-sm text-accent font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Accessible form wrapper with fieldset
 */
export function AccessibleFormSection({
  legend,
  children,
}: {
  legend: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="space-y-4 border border-warm-200 rounded-lg p-6">
      <legend className="text-lg font-semibold text-text-primary">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}
