'use client';

import { useState } from 'react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    motivation: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToTerms) {
      toast.error('You must agree to the terms');
      return;
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.experience || !formData.motivation) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
        throw new Error(data.error || 'Failed to submit application');
      }

      toast.success('Application submitted successfully!');
      setFormData({ name: '', email: '', phone: '', experience: '', motivation: '' });
      setAgreedToTerms(false);
      onClose();
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit application');
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
            onClick={onClose}
            className="fixed inset-0 z-40 bg-[#6B7280]/30 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-2xl"
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-lg p-1 text-[#6B7280] transition-colors hover:bg-[#F3F4F6] hover:text-[#111827]"
                aria-label="Close modal"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="mb-6 pr-8">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#4F46E5]">
                  {type === 'track' ? 'Career Track' : 'Project'}
                </p>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-[#111827]">
                  Enroll in {targetName}
                </h2>
                <p className="text-sm leading-6 text-[#6B7280]">
                  Share a few details so we can guide your next step.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#111827]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="input"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#111827]">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="input"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#111827]">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="input"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#111827]">
                    Your Experience *
                  </label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Tell us about your relevant experience..."
                    rows={3}
                    className="input resize-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#111827]">
                    Why do you want to enroll? *
                  </label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    placeholder="Share your motivation..."
                    rows={3}
                    className="input resize-none"
                  />
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 cursor-pointer rounded border-[#D1D5DB] text-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20"
                  />
                  <label htmlFor="terms" className="cursor-pointer text-sm leading-6 text-[#6B7280]">
                    I agree to the terms and conditions and confirm that the information provided is accurate.
                  </label>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || !agreedToTerms}
                  whileHover={!isSubmitting && agreedToTerms ? { y: -2 } : {}}
                  whileTap={!isSubmitting && agreedToTerms ? { scale: 0.99 } : {}}
                  className={`mt-6 w-full rounded-lg px-4 py-3 font-semibold transition-all duration-200 ${
                    agreedToTerms && !isSubmitting
                      ? 'bg-[#4F46E5] text-white shadow-sm hover:bg-[#4338CA] hover:shadow-md'
                      : 'border border-[#E5E7EB] bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </motion.button>
              </form>

              <p className="mt-4 text-center text-xs text-[#6B7280]">
                We will review your application and get back to you shortly.
              </p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
