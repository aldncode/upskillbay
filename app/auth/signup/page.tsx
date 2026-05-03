'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import { getZodErrorMessage, signupSchema } from '@/lib/validations/auth';

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validation = useMemo(
    () => signupSchema.safeParse({ name, email, password }),
    [name, email, password]
  );
  const fieldErrors = validation.success ? undefined : validation.error.flatten().fieldErrors;
  const nameError = name ? fieldErrors?.name?.[0] : '';
  const emailError = email ? fieldErrors?.email?.[0] : '';
  const passwordError = password ? fieldErrors?.password?.[0] : '';
  const confirmPasswordError = confirmPassword && password !== confirmPassword
    ? 'Passwords do not match'
    : '';
  const isFormInvalid = !validation.success || password !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');

    if (!validation.success) {
      const errorMessage = getZodErrorMessage(validation.error);
      setApiError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    if (password !== confirmPassword) {
      setApiError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMessage = data.error || 'Signup failed';
        setApiError(errorMessage);
        toast.error(errorMessage);
      } else {
        toast.success('Account created! Please sign in.');
        router.push('/auth/login');
      }
    } catch {
      setApiError('An error occurred');
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
      <motion.div
        className="bg-[#111827] border border-[#1F2937] rounded-2xl shadow-2xl p-8 max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#1E40AF] bg-clip-text text-transparent">
            UpskillBay
          </h1>
          <p className="text-[#9CA3AF] text-sm mt-2">Start your journey</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-white mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="John Doe"
              required
            />
            {nameError && (
              <p className="mt-2 text-sm text-red-400">{nameError}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <label className="block text-sm font-medium text-white mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="you@example.com"
              required
            />
            {emailError && (
              <p className="mt-2 text-sm text-red-400">{emailError}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-white mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Password"
              required
            />
            {passwordError && (
              <p className="mt-2 text-sm text-red-400">{passwordError}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <label className="block text-sm font-medium text-white mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input"
              placeholder="Confirm password"
              required
            />
            {confirmPasswordError && (
              <p className="mt-2 text-sm text-red-400">{confirmPasswordError}</p>
            )}
          </motion.div>

          {apiError && (
            <p className="text-sm text-red-400">{apiError}</p>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              type="submit"
              variant="primary"
              disabled={loading || isFormInvalid}
              className="w-full"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </motion.div>
        </form>

        <motion.p
          className="text-center mt-6 text-sm text-[#9CA3AF]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[#3B82F6] font-medium hover:underline">
            Sign in
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
