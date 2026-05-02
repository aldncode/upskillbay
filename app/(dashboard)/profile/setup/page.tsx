'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ProgressBar from '@/components/ProgressBar';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface ProfileData {
  interest: string;
  experienceLevel: string;
  goal: string;
  skills: string[];
  toolsKnown: string[];
  availability: number;
  portfolioLinks: string[];
  pastWorkDescription: string;
  resumeURL: string;
  linkedinURL: string;
  location: string;
  expectedSalary: number;
}

function SetupContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepParam = searchParams.get('step');
  const [currentStep, setCurrentStep] = useState(parseInt(stepParam || '2'));
  const [formData, setFormData] = useState<Partial<ProfileData>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
        setFormData({
          interest: data.interest || '',
          experienceLevel: data.experienceLevel || '',
          goal: data.goal || '',
          skills: data.skills || [],
          toolsKnown: data.toolsKnown || [],
          availability: data.availability || 0,
          portfolioLinks: data.portfolioLinks || [],
          pastWorkDescription: data.pastWorkDescription || '',
          resumeURL: data.resumeURL || '',
          linkedinURL: data.linkedinURL || '',
          location: data.location || '',
          expectedSalary: data.expectedSalary || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddArrayItem = (field: string, value: string) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...(prev[field as keyof ProfileData] as string[]) || [], value],
      }));
    }
  };

  const handleRemoveArrayItem = (field: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field as keyof ProfileData] as string[]).filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Profile updated successfully');
        if (currentStep < 5) {
          setCurrentStep(currentStep + 1);
          router.push(`/profile/setup?step=${currentStep + 1}`);
        } else {
          router.push('/profile');
        }
      } else {
        toast.error('Failed to save profile');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  const stepTitles = {
    2: { title: 'Career Setup', description: 'Tell us about your career goals' },
    3: { title: 'Skills & Tools', description: 'What are your key skills?' },
    4: { title: 'Proof of Work', description: 'Show your portfolio and experience' },
    5: { title: 'Hiring Information', description: 'Help recruiters connect with you' },
  };

  const current = stepTitles[currentStep as keyof typeof stepTitles] || stepTitles[2];
  const progress = ((currentStep - 1) / 4) * 100;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">{current.title}</h1>
              <p className="text-gray-400 mt-1">{current.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-400">Step {currentStep - 1}/4</div>
            </div>
          </div>
          <ProgressBar percentage={progress} showLabel={false} />
        </motion.div>

        {/* Form */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8 mb-8"
        >
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">What's your main interest?</label>
                <select
                  value={formData.interest || ''}
                  onChange={(e) => handleChange('interest', e.target.value)}
                  className="w-full bg-[#0B0F19] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select an interest</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Data">Data</option>
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Product">Product</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Experience Level</label>
                <div className="space-y-2">
                  {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <label key={level} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="experienceLevel"
                        value={level}
                        checked={formData.experienceLevel === level}
                        onChange={(e) => handleChange('experienceLevel', e.target.value)}
                        className="w-4 h-4 accent-blue-500"
                      />
                      <span>{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">What's your main goal?</label>
                <div className="space-y-2">
                  {['Earn Money', 'Get Job', 'Freelance', 'Build Skills'].map((goal) => (
                    <label key={goal} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="goal"
                        value={goal}
                        checked={formData.goal === goal}
                        onChange={(e) => handleChange('goal', e.target.value)}
                        className="w-4 h-4 accent-blue-500"
                      />
                      <span>{goal}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Skills</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    id="skillInput"
                    placeholder="Add a skill (e.g., React)"
                    className="flex-1 bg-[#0B0F19] border border-[#1F2937] rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddArrayItem(
                          'skills',
                          (e.target as HTMLInputElement).value
                        );
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('skillInput') as HTMLInputElement;
                      handleAddArrayItem('skills', input.value);
                      input.value = '';
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(formData.skills || []).map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveArrayItem('skills', idx)}
                        className="text-blue-400 hover:text-blue-200"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tools & Technologies</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    id="toolInput"
                    placeholder="Add a tool (e.g., Adobe XD)"
                    className="flex-1 bg-[#0B0F19] border border-[#1F2937] rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddArrayItem(
                          'toolsKnown',
                          (e.target as HTMLInputElement).value
                        );
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('toolInput') as HTMLInputElement;
                      handleAddArrayItem('toolsKnown', input.value);
                      input.value = '';
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(formData.toolsKnown || []).map((tool, idx) => (
                    <span
                      key={idx}
                      className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {tool}
                      <button
                        onClick={() => handleRemoveArrayItem('toolsKnown', idx)}
                        className="text-cyan-400 hover:text-cyan-200"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  How many hours per week can you work?
                </label>
                <input
                  type="number"
                  value={formData.availability || ''}
                  onChange={(e) => handleChange('availability', parseInt(e.target.value))}
                  placeholder="e.g., 20"
                  className="w-full bg-[#0B0F19] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Portfolio Links</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="url"
                    id="portfolioInput"
                    placeholder="Add a portfolio URL"
                    className="flex-1 bg-[#0B0F19] border border-[#1F2937] rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddArrayItem(
                          'portfolioLinks',
                          (e.target as HTMLInputElement).value
                        );
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('portfolioInput') as HTMLInputElement;
                      handleAddArrayItem('portfolioLinks', input.value);
                      input.value = '';
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {(formData.portfolioLinks || []).map((link, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-[#0B0F19] p-3 rounded-lg">
                      <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline truncate">
                        {link}
                      </a>
                      <button
                        onClick={() => handleRemoveArrayItem('portfolioLinks', idx)}
                        className="text-red-400 hover:text-red-300"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Past Work Description</label>
                <textarea
                  value={formData.pastWorkDescription || ''}
                  onChange={(e) => handleChange('pastWorkDescription', e.target.value)}
                  placeholder="Tell us about your past projects and accomplishments..."
                  rows={5}
                  className="w-full bg-[#0B0F19] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="e.g., San Francisco, USA"
                  className="w-full bg-[#0B0F19] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Expected Salary (in thousands)</label>
                <input
                  type="number"
                  value={formData.expectedSalary || ''}
                  onChange={(e) => handleChange('expectedSalary', parseInt(e.target.value))}
                  placeholder="e.g., 80"
                  className="w-full bg-[#0B0F19] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={formData.linkedinURL || ''}
                  onChange={(e) => handleChange('linkedinURL', e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full bg-[#0B0F19] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Resume URL</label>
                <input
                  type="url"
                  value={formData.resumeURL || ''}
                  onChange={(e) => handleChange('resumeURL', e.target.value)}
                  placeholder="https://example.com/resume.pdf"
                  className="w-full bg-[#0B0F19] border border-[#1F2937] rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              const newStep = currentStep - 1;
              if (newStep >= 2) {
                setCurrentStep(newStep);
                router.push(`/profile/setup?step=${newStep}`);
              }
            }}
            disabled={currentStep === 2}
            className="px-6 py-3 border border-[#1F2937] rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#111827] transition-colors"
          >
            ← Back
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => router.push('/profile')}
              className="px-6 py-3 border border-[#1F2937] rounded-lg font-medium hover:bg-[#111827] transition-colors"
            >
              Skip
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
            >
              {saving ? 'Saving...' : currentStep === 5 ? 'Finish' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SetupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#0B0F19]"><div className="text-gray-400">Loading...</div></div>}>
      <SetupContent />
    </Suspense>
  );
}
