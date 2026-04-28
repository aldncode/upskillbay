/**
 * Calculate profile completion percentage
 * 
 * Breakdown:
 * - Basic info (name, email): 20%
 * - Career setup (interest, experience, goal): +20%
 * - Skills & tools: +20%
 * - Proof/Portfolio: +20%
 * - Hiring info: +20%
 */

interface ProfileData {
  // Basic (auto at 20% after signup)
  name?: string;
  email?: string;

  // Stage 2: Career setup
  interest?: string | null;
  experienceLevel?: string | null;
  goal?: string | null;

  // Stage 3: Skills
  skills?: string[];
  toolsKnown?: string[];
  availability?: number | null;

  // Stage 4: Proof
  portfolioLinks?: string[];
  pastWorkDescription?: string | null;

  // Stage 5: Hiring
  resumeURL?: string | null;
  linkedinURL?: string | null;
  location?: string | null;
  expectedSalary?: number | null;
}

export function calculateProfileCompletion(profile: ProfileData): number {
  let completion = 20; // Basic info (after signup)

  // Stage 2: Career Setup (20%)
  const careerSetupFields = [profile.interest, profile.experienceLevel, profile.goal];
  const careerFilledCount = careerSetupFields.filter((field) => field).length;
  completion += (careerFilledCount / 3) * 20;

  // Stage 3: Skills (20%)
  const skillsFields = [
    profile.skills && profile.skills.length > 0 ? true : false,
    profile.toolsKnown && profile.toolsKnown.length > 0 ? true : false,
    profile.availability ? true : false,
  ];
  const skillsFilledCount = skillsFields.filter(Boolean).length;
  completion += (skillsFilledCount / 3) * 20;

  // Stage 4: Proof (20%)
  const proofFields = [
    profile.portfolioLinks && profile.portfolioLinks.length > 0 ? true : false,
    profile.pastWorkDescription ? true : false,
  ];
  const proofFilledCount = proofFields.filter(Boolean).length;
  completion += (proofFilledCount / 2) * 20;

  // Stage 5: Hiring (20%)
  const hiringFields = [profile.resumeURL, profile.linkedinURL, profile.location];
  const hiringFilledCount = hiringFields.filter((field) => field).length;
  completion += (hiringFilledCount / 3) * 20;

  // Cap at 100%
  return Math.min(100, Math.round(completion));
}

export function getProfileStages(completion: number) {
  return {
    basic: { name: 'Basic Info', completed: completion >= 20, percentage: 20 },
    career: { name: 'Career Setup', completed: completion >= 40, percentage: 40 },
    skills: { name: 'Skills & Tools', completed: completion >= 60, percentage: 60 },
    proof: { name: 'Proof of Work', completed: completion >= 80, percentage: 80 },
    hiring: { name: 'Hiring Info', completed: completion >= 100, percentage: 100 },
  };
}

export function getCompletionMessage(completion: number): string {
  if (completion < 20) return 'Get started by completing your basic info';
  if (completion < 40) return 'Complete your career setup to unlock opportunities';
  if (completion < 60) return 'Add your skills to showcase your expertise';
  if (completion < 80) return 'Add proof of work to build credibility';
  if (completion < 100) return 'Nearly there! Add hiring details to get discovered';
  return '🎉 Profile complete! You\'re ready to get hired!';
}

export function getUnlockMessage(completion: number): string {
  if (completion < 40) return 'Unlock more opportunities by completing career setup';
  if (completion < 60) return 'Get recruiter visibility at 60%+';
  if (completion < 80) return 'Unlock premium gigs at 80%+';
  if (completion < 100) return 'Unlock recruiter spotlight at 100%';
  return 'You have access to all opportunities!';
}
