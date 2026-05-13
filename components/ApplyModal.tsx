'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'track' | 'project';
  targetId: string;
  targetName: string;
  onSuccess?: () => void;
}

export default function ApplyModal({
  isOpen,
  onClose,
  type,
  targetId,
  targetName,
  onSuccess,
}: ApplyModalProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    motivation: '',
  });

  useEffect(() => {
    if (isOpen && status === 'unauthenticated') {
      toast.error('Please sign in to continue');
      onClose();
      router.push('/auth/login?callbackUrl=' + encodeURIComponent(window.location.pathname));
      return;
    }
  }, [isOpen, status, onClose, router]);

  useEffect(() => {
    if (isOpen && session?.user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || session.user?.name || '',
        email: prev.email || session.user?.email || '',
      }));
    }
  }, [isOpen, session]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === 'unauthenticated') {
      toast.error('Please sign in to continue');
      router.push('/auth/login');
      return;
    }

    if (!agreedToTerms) {
      toast.error('Please agree to the terms to continue');
      return;
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.experience || !formData.motivation) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          targetId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          experience: formData.experience,
          motivation: formData.motivation,
          agreedToTerms: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Application failed');
      }

      toast.success('Application submitted successfully!');
      setFormData({ name: session?.user?.name || '', email: session?.user?.email || '', phone: '', experience: '', motivation: '' });
      setAgreedToTerms(false);
      onClose();
      onSuccess?.();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Application failed';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md"
          />

          <div className="fixed inset-0 z-50 flex items-start justify-center px-4 py-6 sm:py-10">
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative flex max-h-[calc(100vh-3rem)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20 sm:max-h-[calc(100vh-5rem)]"
            >
              <div className="absolute top-0 left-0 right-0 h-1 flex-shrink-0 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]" />

              <button
                onClick={onClose}
                className="absolute right-3 top-3 z-10 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 sm:right-4 sm:top-4"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col overflow-y-auto">
                <div className="flex-shrink-0 px-6 pt-8 sm:px-8 sm:pt-10">
                  <div className="mb-4 sm:mb-6">
                    <div className="mb-3 inline-flex items-center rounded-full bg-[#4F46E5]/10 px-3 py-1 text-xs font-semibold text-[#4F46E5]">
                      {type === 'track' ? 'Career Track' : 'Project'}
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-[#0F172A]">
                      Apply for {targetName}
                    </h2>
                    {session?.user ? (
                      <p className="mt-2 text-sm text-slate-500">
                        Great to have you back! Tell us a bit more about yourself.
                      </p>
                    ) : (
                      <p className="mt-2 text-sm text-slate-500">
                        Sign in to save your progress and track your applications.
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex-1 px-6 sm:px-8">
                  <form onSubmit={handleSubmit} className="space-y-5 pb-4">
                    {status === 'loading' ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-[#4F46E5]" />
                      </div>
                    ) : status === 'unauthenticated' ? (
                      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
                        <svg className="mx-auto mb-3 h-8 w-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <h3 className="mb-2 font-semibold text-amber-800">Sign in required</h3>
                        <p className="mb-4 text-sm text-amber-700">
                          You need to be signed in to enroll in this program.
                        </p>
                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
                          <button
                            type="button"
                            onClick={() => router.push('/auth/login?callbackUrl=' + encodeURIComponent(window.location.pathname))}
                            className="rounded-lg bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white"
                          >
                            Sign In
                          </button>
                          <button
                            type="button"
                            onClick={() => router.push('/auth/signup?callbackUrl=' + encodeURIComponent(window.location.pathname))}
                            className="rounded-lg border border-amber-300 px-4 py-2 text-sm font-semibold text-amber-800"
                          >
                            Create Account
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-[#4F46E5] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#4F46E5]/10"
                              placeholder="e.g. Priya Sharma"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                              Email <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-[#4F46E5] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#4F46E5]/10"
                              placeholder="e.g. priya@example.com"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-slate-700">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-[#4F46E5] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#4F46E5]/10"
                            placeholder="e.g. +91 98765 43210"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-slate-700">
                            Your Background <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            rows={3}
                            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-[#4F46E5] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#4F46E5]/10"
                            placeholder="Share your educational background, any relevant work experience, or current role..."
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-slate-700">
                            Why this career path? <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            name="motivation"
                            value={formData.motivation}
                            onChange={handleChange}
                            rows={3}
                            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-[#4F46E5] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#4F46E5]/10"
                            placeholder="What inspired you to choose this career? What are your goals?"
                          />
                        </div>

                        <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                          <input
                            type="checkbox"
                            id="terms"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className="mt-0.5 h-4 w-4 cursor-pointer rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5]/20"
                          />
                          <label htmlFor="terms" className="cursor-pointer text-xs leading-relaxed text-slate-600">
                            I agree to the terms and conditions and confirm that the information provided is accurate.
                          </label>
                        </div>
                      </>
                    )}
                  </form>
                </div>

                {status === 'authenticated' && (
                  <div className="flex-shrink-0 border-t border-slate-100 bg-white px-6 pb-6 pt-4 sm:px-8 sm:pb-8 sm:pt-5">
                    <button
                      type="submit"
                      disabled={isSubmitting || !agreedToTerms}
                      onClick={handleSubmit}
                      className={`w-full rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 ${
                        agreedToTerms && !isSubmitting
                          ? 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                    <p className="mt-3 text-center text-xs text-slate-400">
                      We'll review your application and get back to you within 24-48 hours
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}