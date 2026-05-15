'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ProgressBar from '@/components/ProgressBar';
import ProfileSection from '@/components/ProfileSection';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface ProfileData {
  id: string;
  userId: string;
  profileCompletion: number;
  interest: string | null;
  experienceLevel: string | null;
  goal: string | null;
  skills: string[];
  toolsKnown: string[];
  availability: number | null;
  portfolioLinks: string[];
  pastWorkDescription: string | null;
  resumeURL: string | null;
  linkedinURL: string | null;
  location: string | null;
  expectedSalary: number | null;
  user: {
    name: string | null;
    email: string | null;
    image: string | null;
  };
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      const user = session.user as any;
      if (user?.id || user?.email) {
        fetchProfile();
      }
    }
  }, [session]);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else if (response.status === 404) {
        toast.error('Profile not found');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
        <div className="text-gray-400">Loading profile...</div>
      </div>
    );
  }

  const completion = profile.profileCompletion;

  const careerComplete = !!(profile.interest && profile.experienceLevel && profile.goal);
  const skillsComplete = !!(
    (profile.skills?.length ?? 0) > 0 && (profile.toolsKnown?.length ?? 0) > 0 && profile.availability
  );
  const proofComplete = !!(((profile.portfolioLinks?.length ?? 0) > 0) || profile.pastWorkDescription);
  const hiringComplete = !!(profile.resumeURL || profile.linkedinURL || profile.location);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Your Profile</h1>
          <p className="text-gray-400">Build your profile gradually and unlock more opportunities</p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-6 mb-8"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Profile Completion</h2>
              <p className="text-gray-300">
                {completion === 100
                  ? '🎉 Your profile is complete! You are now visible to recruiters.'
                  : completion >= 80
                    ? '✨ Almost there! Complete the final section to unlock all features.'
                    : completion >= 60
                      ? '🚀 Great progress! Keep going to unlock premium opportunities.'
                      : completion >= 40
                        ? '💪 Good start! Add your skills to showcase your expertise.'
                        : '👋 Welcome! Start by setting up your career goals.'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {Math.round(completion)}%
              </div>
            </div>
          </div>
          <ProgressBar percentage={completion} showLabel={false} />
        </motion.div>

        {/* Sections Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-6"
        >
          {/* Career Setup Section */}
          <ProfileSection
            title="Career Setup"
            description="Tell us about your career goals and experience level"
            isCompleted={careerComplete}
            completionPercent={careerComplete ? 100 : profile.interest || profile.experienceLevel || profile.goal ? 50 : 0}
            icon="🎯"
            link="/profile/setup?step=2"
          >
            {careerComplete && (
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 mb-1">Interest</p>
                  <p className="font-semibold text-blue-400">{profile.interest}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Experience</p>
                  <p className="font-semibold text-blue-400">{profile.experienceLevel}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Goal</p>
                  <p className="font-semibold text-blue-400">{profile.goal}</p>
                </div>
              </div>
            )}
          </ProfileSection>

          {/* Skills Section */}
          <ProfileSection
            title="Skills & Tools"
            description="Showcase your technical skills and tools expertise"
            isCompleted={skillsComplete}
            completionPercent={skillsComplete ? 100 : (((profile.skills?.length ?? 0) > 0 || (profile.toolsKnown?.length ?? 0) > 0 || profile.availability) ? 50 : 0)}
            icon="🛠️"
            link="/profile/setup?step=3"
          >
            {((profile.skills?.length ?? 0) > 0 || (profile.toolsKnown?.length ?? 0) > 0) && (
              <div className="space-y-3 text-sm">
                {(profile.skills?.length ?? 0) > 0 && (
                  <div>
                    <p className="text-gray-400 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {(profile.toolsKnown?.length ?? 0) > 0 && (
                  <div>
                    <p className="text-gray-400 mb-2">Tools</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.toolsKnown.map((tool) => (
                        <span key={tool} className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {profile.availability && (
                  <div>
                    <p className="text-gray-400 mb-1">Availability</p>
                    <p className="text-white">{profile.availability} hours/week</p>
                  </div>
                )}
              </div>
            )}
          </ProfileSection>

          {/* Proof Section */}
          <ProfileSection
            title="Proof of Work"
            description="Show your portfolio and past work experience"
            isCompleted={proofComplete}
            completionPercent={proofComplete ? 100 : 0}
            icon="📁"
            link="/profile/setup?step=4"
          >
            {proofComplete && (
              <div className="space-y-3 text-sm">
                {(profile.portfolioLinks?.length ?? 0) > 0 && (
                  <div>
                    <p className="text-gray-400 mb-2">Portfolio Links</p>
                    <div className="space-y-1">
                      {profile.portfolioLinks.map((link) => (
                        <a
                          key={link}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline flex items-center gap-1"
                        >
                          🔗 {link}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {profile.pastWorkDescription && (
                  <div>
                    <p className="text-gray-400 mb-2">Past Work</p>
                    <p className="text-gray-300">{profile.pastWorkDescription}</p>
                  </div>
                )}
              </div>
            )}
          </ProfileSection>

          {/* Hiring Section */}
          <ProfileSection
            title="Hiring Information"
            description="Help recruiters reach out and understand your expectations"
            isCompleted={hiringComplete}
            completionPercent={hiringComplete ? 100 : 0}
            icon="💼"
            link="/profile/setup?step=5"
          >
            {hiringComplete && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                {profile.location && (
                  <div>
                    <p className="text-gray-400 mb-1">Location</p>
                    <p className="text-white">{profile.location}</p>
                  </div>
                )}
                {profile.expectedSalary && (
                  <div>
                    <p className="text-gray-400 mb-1">Expected Salary</p>
                    <p className="text-white">${profile.expectedSalary}k/year</p>
                  </div>
                )}
                {profile.linkedinURL && (
                  <div className="col-span-2">
                    <p className="text-gray-400 mb-1">LinkedIn</p>
                    <a
                      href={profile.linkedinURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {profile.linkedinURL}
                    </a>
                  </div>
                )}
              </div>
            )}
          </ProfileSection>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/profile/setup"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all"
          >
            {completion === 100 ? '✓ Profile Complete' : 'Continue Building Profile'}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
