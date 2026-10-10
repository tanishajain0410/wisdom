'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If this specific tab has already authenticated, redirect to /admin
  useEffect(() => {
    const isTabAuth =
      typeof window !== 'undefined' &&
      sessionStorage.getItem('wisdom_admin_tab_authenticated') === 'true';

    if (isTabAuth) {
      fetch('/api/auth/me')
        .then((res) => {
          if (res.ok) {
            router.replace('/admin');
          }
        })
        .catch(() => {});
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed. Please check credentials.');
        setLoading(false);
        return;
      }

      // Mark this specific browser tab as authenticated
      sessionStorage.setItem('wisdom_admin_tab_authenticated', 'true');
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Connection error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#071f3b] via-[#0f2c52] to-[#173b68] px-4 py-12 text-slate-800">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-white p-8 shadow-2xl shadow-black/40 sm:p-10">
        {/* Subtle decorative glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 size-48 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative text-center">
          <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-2xl bg-slate-50 p-2 shadow-inner ring-1 ring-slate-200">
            <Image
              src="/images/wisdom-logo-official.png"
              alt="Wisdom International School"
              width={140}
              height={140}
              quality={100}
              className="h-16 w-auto object-contain"
            />
          </div>

          <h1 className="font-display text-2xl font-black text-navy sm:text-3xl">Admin Portal</h1>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Wisdom International School, Mauranipur
          </p>
        </div>

        {error && (
          <div className="relative mt-6 rounded-xl border border-red-200 bg-red-50 p-3.5 text-center text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="relative mt-8 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Admin Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-medium text-slate-800 transition focus:border-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Admin Password
            </label>
            <div className="relative mt-2">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 pr-11 text-sm font-medium text-slate-800 transition focus:border-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:text-navy transition cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex min-h-12 w-full items-center justify-center rounded-xl bg-navy py-3 font-extrabold text-white shadow-lg shadow-navy/20 transition hover:-translate-y-0.5 hover:bg-navy-deep disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Signing in...
              </span>
            ) : (
              'Sign In to Dashboard'
            )}
          </button>
        </form>

        <div className="relative mt-8 border-t border-slate-100 pt-5 text-center">
          <a
            href="/"
            className="text-xs font-bold text-slate-500 transition hover:text-navy"
          >
            ← Return to Public Website
          </a>
        </div>
      </div>
    </div>
  );
}
