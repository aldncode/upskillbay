'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { PersonalizationProvider } from '@/components/PersonalizationProvider';

/**
 * 2026 App Providers
 * Includes:
 * - Session management (Next-Auth)
 * - AI-driven personalization
 * - Toast notifications
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PersonalizationProvider>
        {children}
        <Toaster position="bottom-right" />
      </PersonalizationProvider>
    </SessionProvider>
  );
}
