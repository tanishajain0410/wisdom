'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
              width={70}
              height={60}
              className="object-contain"
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
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-medium text-slate-800 transition focus:border-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
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
