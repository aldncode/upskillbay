'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
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

const stepDetails = {
  2: { title: 'Your Career Goals', description: 'Tell us what you\'re working toward', icon: '🎯' },
  3: { title: 'Skills & Availability', description: 'Show us what you bring to the table', icon: '💡' },
  4: { title: 'Proof of Work', description: 'Showcase your portfolio and experience', icon: '📁' },
  5: { title: 'Hiring Details', description: 'Help employers find you', icon: '🎁' },
};

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
        toast.success('Progress saved!');
        if (currentStep < 5) {
          setCurrentStep(currentStep + 1);
          router.push(`/profile/setup?step=${currentStep + 1}`);
        } else {
          toast.success('Profile completed!');
          router.push('/dashboard');
        }
      } else {
        toast.error('Failed to save');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-[#4F46E5]" />
      </div>
    );
  }

  const current = stepDetails[currentStep as keyof typeof stepDetails] || stepDetails[2];
  const progress = ((currentStep - 1) / 4) * 100;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">{current.title}</h1>
              <p className="mt-1 text-slate-500">{current.description}</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-[#4F46E5]">Step {currentStep - 1}/4</span>
            </div>
          </div>
          
          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <motion.div 
              className="h-full rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="mt-4 flex justify-between text-xs font-medium text-slate-500">
            {Object.entries(stepDetails).map(([step, details]) => (
              <span key={step} className={currentStep >= parseInt(step) ? 'text-[#4F46E5]' : ''}>
                {details.title.split(' ')[0]}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700">What field interests you most?</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {['Web Development', 'Data Analytics', 'Digital Marketing', 'Product Design', 'Backend Engineering', 'Product Management'].map((opt) => (
                    <label
                      key={opt}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                        formData.interest === opt 
                          ? 'border-[#4F46E5] bg-[#4F46E5]/5' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="interest"
                        value={opt}
                        checked={formData.interest === opt}
                        onChange={(e) => handleChange('interest', e.target.value)}
                        className="h-4 w-4 accent-[#4F46E5]"
                      />
                      <span className="text-sm font-medium text-slate-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700">What's your experience level?</label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {['Beginner - Just starting out', 'Intermediate - Some experience', 'Advanced - Experienced professional'].map((level) => (
                    <label
                      key={level}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                        formData.experienceLevel === level 
                          ? 'border-[#4F46E5] bg-[#4F46E5]/5' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="experienceLevel"
                        value={level}
                        checked={formData.experienceLevel === level}
                        onChange={(e) => handleChange('experienceLevel', e.target.value)}
                        className="h-4 w-4 accent-[#4F46E5]"
                      />
                      <span className="text-sm font-medium text-slate-700">{level.split(' - ')[0]}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700">What do you want to achieve?</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { value: 'Get Hired', desc: 'Land a full-time job' },
                    { value: 'Freelance', desc: 'Work independently' },
                    { value: 'Build Skills', desc: 'Learn for growth' },
                    { value: 'Earn Money', desc: 'Generate income' },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                        formData.goal === opt.value 
                          ? 'border-[#4F46E5] bg-[#4F46E5]/5' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="goal"
                        value={opt.value}
                        checked={formData.goal === opt.value}
                        onChange={(e) => handleChange('goal', e.target.value)}
                        className="h-4 w-4 accent-[#4F46E5]"
                      />
                      <div>
                        <p className="text-sm font-medium text-slate-700">{opt.value}</p>
                        <p className="text-xs text-slate-500">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700">What skills do you have?</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="skillInput"
                    placeholder="e.g., React, Python, SEO..."
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-[#4F46E5] focus:bg-white"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const input = e.target as HTMLInputElement;
                        handleAddArrayItem('skills', input.value);
                        input.value = '';
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('skillInput') as HTMLInputElement;
                      handleAddArrayItem('skills', input.value);
                      input.value = '';
                    }}
                    className="rounded-xl bg-[#4F46E5] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[#4338CA]"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(formData.skills || []).map((skill, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveArrayItem('skills', idx)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700">Tools you know</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="toolInput"
                    placeholder="e.g., Figma, Tableau, VS Code..."
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-[#4F46E5] focus:bg-white"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const input = e.target as HTMLInputElement;
                        handleAddArrayItem('toolsKnown', input.value);
                        input.value = '';
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('toolInput') as HTMLInputElement;
                      handleAddArrayItem('toolsKnown', input.value);
                      input.value = '';
                    }}
                    className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(formData.toolsKnown || []).map((tool, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600"
                    >
                      {tool}
                      <button
                        onClick={() => handleRemoveArrayItem('toolsKnown', idx)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700">Weekly availability (hours)</label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { value: 10, label: '10 hrs/week', desc: 'Casual pace' },
                    { value: 20, label: '20 hrs/week', desc: 'Part-time' },
                    { value: 40, label: '40 hrs/week', desc: 'Full-time' },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                        formData.availability === opt.value 
                          ? 'border-[#4F46E5] bg-[#4F46E5]/5' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="availability"
                        value={opt.value}
                        checked={formData.availability === opt.value}
                        onChange={(e) => handleChange('availability', opt.value)}
                        className="h-4 w-4 accent-[#4F46E5]"
                      />
                      <div>
                        <p className="text-sm font-medium text-slate-700">{opt.label}</p>
                        <p className="text-xs text-slate-500">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700">Portfolio / Project Links</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    id="portfolioInput"
                    placeholder="https://github.com/yourname"
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-[#4F46E5] focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('portfolioInput') as HTMLInputElement;
                      handleAddArrayItem('portfolioLinks', input.value);
                      input.value = '';
                    }}
                    className="rounded-xl bg-[#4F46E5] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[#4338CA]"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-3 space-y-2">
                  {(formData.portfolioLinks || []).map((link, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-4 py-2">
                      <a href={link} target="_blank" rel="noopener noreferrer" className="truncate text-sm font-medium text-[#4F46E5]">
                        {link}
                      </a>
                      <button
                        onClick={() => handleRemoveArrayItem('portfolioLinks', idx)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700">Past Work Experience</label>
                <textarea
                  value={formData.pastWorkDescription || ''}
                  onChange={(e) => handleChange('pastWorkDescription', e.target.value)}
                  placeholder="Describe your relevant projects, internships, or work experience..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-[#4F46E5] focus:bg-white"
                />
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-700">Location</label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="e.g., Mumbai, India"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-[#4F46E5] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-700">Expected Salary (₹/year)</label>
                  <input
                    type="number"
                    value={formData.expectedSalary || ''}
                    onChange={(e) => handleChange('expectedSalary', parseInt(e.target.value))}
                    placeholder="e.g., 600000"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-[#4F46E5] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={formData.linkedinURL || ''}
                  onChange={(e) => handleChange('linkedinURL', e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-[#4F46E5] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700">Resume URL (optional)</label>
                <input
                  type="url"
                  value={formData.resumeURL || ''}
                  onChange={(e) => handleChange('resumeURL', e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-[#4F46E5] focus:bg-white"
                />
              </div>
            </div>
          )}
        </motion.div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => {
              const newStep = currentStep - 1;
              if (newStep >= 2) {
                setCurrentStep(newStep);
                router.push(`/profile/setup?step=${newStep}`);
              }
            }}
            disabled={currentStep === 2}
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:bg-slate-50"
          >
            ← Back
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50"
            >
              Save & Exit
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Saving...' : currentStep === 5 ? 'Complete ✓' : 'Continue →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SetupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-[#4F46E5]" />
      </div>
    }>
      <SetupContent />
    </Suspense>
  );
}