'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Vintage air-cooled 911 in Martini livery (Unsplash, licensed for free use).
const HERO =
  'https://images.unsplash.com/photo-1566238432098-35fc2fa3d908?auto=format&fit=crop&w=1600&q=80';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password');
      setIsLoading(false);
    } else if (result?.ok) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Visual panel */}
      <div className="relative hidden lg:block">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
        <div className="relative h-full flex flex-col justify-between p-12 text-white">
          <div className="wordmark text-xl">
            THE LUCURELL<span className="text-[#d5001c]">.</span>COLLECTION
          </div>
          <div>
            <p className="eyebrow text-white/70 mb-3">The Collection</p>
            <h1 className="text-4xl font-light leading-tight max-w-md">
              There is no substitute.
            </h1>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center px-6 py-16 sm:px-12 bg-white">
        <div className="w-full max-w-sm fade-up">
          <div className="lg:hidden wordmark text-lg mb-12">
            THE LUCURELL<span className="text-[#d5001c]">.</span>COLLECTION
          </div>

          <p className="eyebrow text-[#d5001c] mb-3">Members</p>
          <h2 className="text-3xl font-light tracking-tight mb-10">Sign in</h2>

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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0a0a0a] hover:bg-[#d5001c] text-white eyebrow py-4 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-10 text-sm text-[#5b5b5b]">
            Not yet a member?{' '}
            <Link href="/auth/signup" className="text-[#0a0a0a] font-medium hover:text-[#d5001c] transition-colors">
              Request access
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
