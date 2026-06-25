'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const HERO =
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1600&q=80';

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
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Form panel */}
      <div className="flex items-center justify-center px-6 py-16 sm:px-12 bg-white order-2 lg:order-1">
        <div className="w-full max-w-sm fade-up">
          <div className="lg:hidden wordmark text-lg mb-12">
            DREW<span className="text-[#d5001c]">.</span>PORSCHES
          </div>

          <p className="eyebrow text-[#d5001c] mb-3">Request Access</p>
          <h2 className="text-3xl font-light tracking-tight mb-10">
            Create your account
          </h2>

          <form className="space-y-8" onSubmit={handleSubmit}>
            {error && (
              <div className="border-l-2 border-[#d5001c] bg-[#d5001c]/5 px-4 py-3">
                <p className="text-sm text-[#b00017]">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="eyebrow text-[#5b5b5b] block mb-3">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full border-b border-[#e3e3e3] py-2 text-[#0a0a0a] placeholder-[#b8b8b8] focus:outline-none focus:border-[#0a0a0a] transition-colors"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="eyebrow text-[#5b5b5b] block mb-3">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full border-b border-[#e3e3e3] py-2 text-[#0a0a0a] placeholder-[#b8b8b8] focus:outline-none focus:border-[#0a0a0a] transition-colors"
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="eyebrow text-[#5b5b5b] block mb-3">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="w-full border-b border-[#e3e3e3] py-2 text-[#0a0a0a] placeholder-[#b8b8b8] focus:outline-none focus:border-[#0a0a0a] transition-colors"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0a0a0a] hover:bg-[#d5001c] text-white eyebrow py-4 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating…' : 'Create account'}
            </button>
          </form>

          <p className="mt-10 text-sm text-[#5b5b5b]">
            Already a member?{' '}
            <Link href="/auth/login" className="text-[#0a0a0a] font-medium hover:text-[#d5001c] transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Visual panel */}
      <div className="relative hidden lg:block order-1 lg:order-2">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
        <div className="relative h-full flex flex-col justify-between p-12 text-white">
          <div className="wordmark text-xl text-right w-full">
            DREW<span className="text-[#d5001c]">.</span>PORSCHES
          </div>
          <div>
            <p className="eyebrow text-white/70 mb-3">Your Garage Awaits</p>
            <h1 className="text-4xl font-light leading-tight max-w-md">
              Every detail. Every drive. Documented.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
