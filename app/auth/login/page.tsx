'use client';

import { useMemo, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
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
        toast.success('Welcome back!');
        router.push('/dashboard');
      }
    } catch {
      setApiError('Something went wrong');
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4F46E5]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#7C3AED]/4 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-sm">
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] shadow-lg shadow-indigo-500/25">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4.125-1.625a1 1 0 00.788-.38l-.003.003a1 1 0 01-.14.09l-1.975 1.02a1 1 0 00-.37.306l.002.002a1 1 0 01.37.306l1.976-1.02a1 1 0 00.14-.09l1.975-1.022a.999.999 0 01.356.257l4.125 1.625a1 1 0 00.788.38l.003-.003a1 1 0 01-.37.306l-.002.002a1 1 0 00-.37.306l1.976 1.02a1 1 0 00.14.09l1.975 1.022a.999.999 0 01-.356.257l-4.125-1.625a1 1 0 00-.788-.38l-1.976-1.022a1 1 0 01-.37-.306l.002-.002a1 1 0 00.37-.306l1.976-1.02a1 1 0 00.14-.09l1.975-1.022.003.003zM6.894 9.06a1 1 0 00-1.788 0l-3.5 2a1 1 0 000 1.788l3.5 2a1 1 0 001.788 0l3.5-2a1 1 0 000-1.788l-3.5-2zM10.5 7.5a1 1 0 10-2 0v2.268a3 3 0 00-.879 2.098l1.536 2.98a1 1 0 001.756-.233l1.5-2.866A3 3 0 0012.5 9.768V7.5a1 1 0 00-2 0zM13.106 9.06a1 1 0 00-1.788 0l-3.5 2a1 1 0 000 1.788l3.5 2a1 1 0 001.788 0l3.5-2a1 1 0 000-1.788l-3.5-2z" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">Welcome back</h1>
            <p className="mt-2 text-sm text-slate-500">Sign in to continue your learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-[#4F46E5] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#4F46E5]/10"
                placeholder="e.g. priya@example.com"
                required
              />
              {emailError && (
                <p className="mt-1.5 text-xs text-red-500">{emailError}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <Link href="#" className="text-xs font-medium text-[#4F46E5] hover:text-[#4338CA]">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-[#4F46E5] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#4F46E5]/10"
                placeholder="Enter your password"
                required
              />
              {passwordError && (
                <p className="mt-1.5 text-xs text-red-500">{passwordError}</p>
              )}
            </div>

            {apiError && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
                {apiError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !validation.success}
              className="w-full rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-4 text-slate-400">or</span>
            </div>
          </div>

          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="font-semibold text-[#4F46E5] hover:text-[#4338CA]">
              Create one
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          By signing in, you agree to our{' '}
          <Link href="#" className="text-slate-500 underline hover:text-slate-600">Terms</Link>
          {' '}and{' '}
          <Link href="#" className="text-slate-500 underline hover:text-slate-600">Privacy Policy</Link>
        </p>
      </motion.div>
    </div>
  );
}