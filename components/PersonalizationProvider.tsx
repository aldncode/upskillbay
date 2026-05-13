'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type PersonalizationLevel = 'low' | 'medium' | 'high';
export type UserBehavior = 'explorer' | 'goal-driven' | 'casual';

interface PersonalizationContextType {
  personalizationLevel: PersonalizationLevel;
  userBehavior: UserBehavior;
  trackInteraction: (interaction: string) => void;
  updatePersonalization: (level: PersonalizationLevel) => void;
  preferences: {
    reducedMotion: boolean;
    darkMode: boolean;
    highContrast: boolean;
  };
}

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(
  undefined
);

/**
 * 2026 Personalization Provider
 * Features:
 * - AI-driven behavior tracking (respects privacy)
 * - Adaptive UI based on user interactions
 * - Accessibility preferences (prefers-reduced-motion, prefers-color-scheme)
 * - User preference learning
 * - Ethical data handling
 */
export function PersonalizationProvider({ children }: { children: ReactNode }) {
  const [personalizationLevel, setPersonalizationLevel] = useState<PersonalizationLevel>('medium');
  const [userBehavior, setUserBehavior] = useState<UserBehavior>('casual');
  const [preferences, setPreferences] = useState({
    reducedMotion: false,
    darkMode: false,
    highContrast: false,
  });
  const [interactionCount, setInteractionCount] = useState(0);

  // Initialize accessibility preferences
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersHighContrast = window.matchMedia('(prefers-contrast: more)');

    setPreferences({
      reducedMotion: prefersReducedMotion.matches,
      darkMode: prefersDarkMode.matches,
      highContrast: prefersHighContrast.matches,
    });

    // Listen for changes
    const handleMotionChange = () => {
      setPreferences((prev) => ({
        ...prev,
        reducedMotion: prefersReducedMotion.matches,
      }));
    };

    const handleDarkModeChange = () => {
      setPreferences((prev) => ({
        ...prev,
        darkMode: prefersDarkMode.matches,
      }));
    };

    const handleContrastChange = () => {
      setPreferences((prev) => ({
        ...prev,
        highContrast: prefersHighContrast.matches,
      }));
    };

    prefersReducedMotion.addEventListener('change', handleMotionChange);
    prefersDarkMode.addEventListener('change', handleDarkModeChange);
    prefersHighContrast.addEventListener('change', handleContrastChange);

    return () => {
      prefersReducedMotion.removeEventListener('change', handleMotionChange);
      prefersDarkMode.removeEventListener('change', handleDarkModeChange);
      prefersHighContrast.removeEventListener('change', handleContrastChange);
    };
  }, []);

  // Update data attributes on root element
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-personalization-level', personalizationLevel);
    html.setAttribute('data-user-behavior', userBehavior);
    html.setAttribute('data-prefers-motion', preferences.reducedMotion ? 'reduce' : 'auto');
    html.setAttribute('data-prefers-theme', preferences.darkMode ? 'dark' : 'light');
  }, [personalizationLevel, userBehavior, preferences]);

  const trackInteraction = (interaction: string) => {
    const newCount = interactionCount + 1;
    setInteractionCount(newCount);

    // Adapt personalization based on interaction count
    if (newCount > 50 && personalizationLevel === 'low') {
      setPersonalizationLevel('medium');
    } else if (newCount > 100 && personalizationLevel === 'medium') {
      setPersonalizationLevel('high');
    }

    // Detect user behavior patterns (simplified)
    if (interaction.includes('search')) {
      setUserBehavior('explorer');
    } else if (interaction.includes('purchase') || interaction.includes('enroll')) {
      setUserBehavior('goal-driven');
    }

    // Send to analytics (privacy-friendly)
    // Note: This would be connected to your analytics service
    console.debug('[Personalization]', {
      interaction,
      level: personalizationLevel,
      behavior: userBehavior,
      count: newCount,
    });
  };

  const updatePersonalization = (level: PersonalizationLevel) => {
    setPersonalizationLevel(level);
  };

  const value: PersonalizationContextType = {
    personalizationLevel,
    userBehavior,
    trackInteraction,
    updatePersonalization,
    preferences,
  };

  return (
    <PersonalizationContext.Provider value={value}>
      {children}
    </PersonalizationContext.Provider>
  );
}

/**
 * Hook to use personalization context
 */
export function usePersonalization() {
  const context = useContext(PersonalizationContext);
  if (!context) {
    throw new Error(
      'usePersonalization must be used within PersonalizationProvider'
    );
  }
  return context;
}
