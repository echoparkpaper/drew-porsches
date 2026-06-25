'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create account');
        setIsLoading(false);
        return;
      }

      router.push('/auth/login');
    } catch {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="text-5xl font-light tracking-tight text-white">
              DREW
            </div>
          </div>
          <div className="flex justify-center space-x-1">
            <div className="text-3xl font-light tracking-widest text-red-600">
              PORSCHES
            </div>
          </div>
          <p className="text-sm text-gray-400 tracking-wide">
            CREATE YOUR ACCOUNT
          </p>
        </div>

        {/* Form */}
        <form className="mt-12 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-lg bg-red-900/20 border border-red-600/30 p-4">
              <p className="text-sm font-medium text-red-400">{error}</p>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-300 tracking-wide mb-3">
                EMAIL
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-0 py-3 bg-transparent border-b border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-gray-300 tracking-wide mb-3">
                PASSWORD
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-0 py-3 bg-transparent border-b border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors"
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-semibold text-gray-300 tracking-wide mb-3">
                CONFIRM PASSWORD
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="w-full px-0 py-3 bg-transparent border-b border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 tracking-wide transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        {/* Footer */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-red-600 hover:text-red-500 font-semibold transition-colors">
              SIGN IN
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
