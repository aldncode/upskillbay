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

      toast.success('✓ Application submitted successfully!');
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
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal Container - Centered with flex */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-8 shadow-2xl">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-[#6B7280] hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Apply for {type === 'track' ? 'Career Track' : 'Project'}
                </h2>
                <p className="text-[#9CA3AF] text-sm">
                  {targetName}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1F2937] rounded-lg text-white placeholder-[#6B7280] focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/50 transition-all duration-200 outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1F2937] rounded-lg text-white placeholder-[#6B7280] focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/50 transition-all duration-200 outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1F2937] rounded-lg text-white placeholder-[#6B7280] focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/50 transition-all duration-200 outline-none"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Your Experience *
                  </label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Tell us about your relevant experience..."
                    rows={3}
                    className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1F2937] rounded-lg text-white placeholder-[#6B7280] focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/50 transition-all duration-200 outline-none resize-none"
                  />
                </div>

                {/* Motivation */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Why do you want to apply? *
                  </label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    placeholder="Share your motivation..."
                    rows={3}
                    className="w-full px-4 py-3 bg-[#0B0F19] border border-[#1F2937] rounded-lg text-white placeholder-[#6B7280] focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/50 transition-all duration-200 outline-none resize-none"
                  />
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded bg-[#0B0F19] border border-[#1F2937] text-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/50 cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-sm text-[#9CA3AF] cursor-pointer">
                    I agree to the terms and conditions and confirm that the information provided is accurate.
                  </label>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !agreedToTerms}
                  whileHover={!isSubmitting && agreedToTerms ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting && agreedToTerms ? { scale: 0.98 } : {}}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 mt-6 ${
                    agreedToTerms && !isSubmitting
                      ? 'bg-[#111827] border border-[#3B82F6] text-white hover:shadow-lg hover:shadow-[#3B82F6]/20'
                      : 'bg-[#0B0F19] border border-[#1F2937] text-[#6B7280] cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block animate-spin">⚙️</span>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Application'
                  )}
                </motion.button>
              </form>

              {/* Info Text */}
              <p className="text-xs text-[#6B7280] text-center mt-4">
                We'll review your application and get back to you shortly.
              </p>
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
