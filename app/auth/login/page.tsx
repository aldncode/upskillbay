'use client';

import { useMemo, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import { authSchema, getZodErrorMessage } from '@/lib/validations/auth';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validation = useMemo(
    () => authSchema.safeParse({ email, password }),
    [email, password]
  );
  const fieldErrors = validation.success ? undefined : validation.error.flatten().fieldErrors;
  const emailError = email ? fieldErrors?.email?.[0] : '';
  const passwordError = password ? fieldErrors?.password?.[0] : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');

    if (!validation.success) {
      const errorMessage = getZodErrorMessage(validation.error);
      setApiError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setApiError(result.error);
        toast.error(result.error);
      } else {
        toast.success('Login successful!');
        router.push('/dashboard');
      }
    } catch {
      setApiError('An error occurred');
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-6">
      <motion.div
        className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-8 max-w-md w-full"
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
          <h1 className="text-3xl font-bold tracking-tight text-[#111827]">
            UpskillBay
          </h1>
          <p className="text-[#6B7280] text-sm mt-2">Welcome back</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-semibold text-[#111827] mb-2">Email</label>
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
            <label className="block text-sm font-semibold text-[#111827] mb-2">Password</label>
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
              disabled={loading || !validation.success}
              className="w-full"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </motion.div>
        </form>

        <motion.div
          className="mt-6 border-t border-[#E5E7EB] pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={() => signIn('google')}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-[#E5E7EB] rounded-lg text-[#374151] font-semibold shadow-sm hover:bg-[#F9FAFB] transition-colors"
          >
            Continue with Google
          </button>
        </motion.div>

        <motion.p
          className="text-center mt-6 text-sm text-[#6B7280]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-[#4F46E5] font-semibold hover:underline">
            Sign up
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
