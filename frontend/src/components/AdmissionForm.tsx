'use client';

import { useState } from 'react';

export function AdmissionForm({
  theme = 'light',
  hideHeader = false,
}: {
  theme?: 'light' | 'dark';
  hideHeader?: boolean;
}) {
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('Play Group');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const isLight = theme === 'light';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          parentName,
          phone,
          email: email || undefined,
          grade,
          message: message || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Submission failed. Please check details.');
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setStudentName('');
      setParentName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className={`rounded-3xl p-8 text-center transition-all ${
          isLight
            ? 'border border-emerald-200 bg-emerald-50/80 text-emerald-950 shadow-sm'
            : 'border border-white/20 bg-white/10 text-white backdrop-blur-md'
        }`}
      >
        <div
          className={`mx-auto mb-3.5 flex size-14 items-center justify-center rounded-full text-2xl font-black shadow-lg ${
            isLight
              ? 'bg-emerald-600 text-white'
              : 'bg-white text-navy'
          }`}
        >
          ✓
        </div>
        <h3 className="font-display text-2xl font-black">
          Enquiry Submitted Successfully!
        </h3>
        <p
          className={`mx-auto mt-2 max-w-md text-sm leading-relaxed ${
            isLight ? 'text-emerald-800' : 'text-slate-100'
          }`}
        >
          Thank you for reaching out to Wisdom International School. Our admissions counselor will contact you via phone or WhatsApp shortly.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className={`mt-6 inline-flex rounded-xl px-5 py-2.5 text-xs font-black uppercase tracking-wider transition ${
            isLight
              ? 'bg-emerald-700 text-white shadow-md hover:bg-emerald-800'
              : 'bg-white text-navy shadow-md hover:bg-slate-100'
          }`}
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  const labelStyles = isLight
    ? 'block text-xs font-bold uppercase tracking-wider text-slate-700'
    : 'block text-xs font-bold uppercase tracking-wider text-slate-200';

  const inputStyles = isLight
    ? 'mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/90 px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-[#9c271e] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9c271e]/15 transition-all'
    : 'mt-1.5 w-full rounded-xl border border-white/20 bg-white/15 px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm text-white placeholder-slate-300 focus:bg-white focus:text-navy focus:outline-none transition-all';

  const selectStyles = isLight
    ? 'mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/90 px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm font-semibold text-slate-900 focus:border-[#9c271e] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9c271e]/15 transition-all'
    : 'mt-1.5 w-full rounded-xl border border-white/20 bg-[#0a2546] px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm font-semibold text-white focus:outline-none transition-all';

  return (
    <form
      onSubmit={handleSubmit}
      className={
        isLight
          ? 'w-full'
          : 'rounded-[24px] sm:rounded-3xl border border-white/20 bg-white/10 p-5 sm:p-8 backdrop-blur-md'
      }
    >
      {!hideHeader && (
        <div className="mb-6">
          <h3
            className={`font-display text-2xl font-black ${
              isLight ? 'text-navy' : 'text-white'
            }`}
          >
            Online Admission Enquiry (2026–27)
          </h3>
          <p
            className={`mt-1 text-xs ${
              isLight ? 'text-slate-600' : 'text-slate-200'
            }`}
          >
            Fill out this quick form and our academic counselor will contact you.
          </p>
        </div>
      )}

      {error && (
        <div className="mb-5 rounded-xl bg-rose-600/90 p-3.5 text-xs font-bold text-white shadow-sm">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelStyles}>
            Student&apos;s Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="e.g. Aarav Sharma"
            className={inputStyles}
          />
        </div>

        <div>
          <label className={labelStyles}>
            Parent / Guardian Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            placeholder="e.g. Rajesh Sharma"
            className={inputStyles}
          />
        </div>

        <div>
          <label className={labelStyles}>
            Mobile / WhatsApp No. <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className={inputStyles}
          />
        </div>

        <div>
          <label className={labelStyles}>
            Seeking Class <span className="text-red-500">*</span>
          </label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className={selectStyles}
          >
            <option value="Play Group">Play Group (Ages 2.5–3)</option>
            <option value="Nursery">Nursery (Ages 3–4)</option>
            <option value="LKG">LKG (Ages 4–5)</option>
            <option value="UKG">UKG (Ages 5–6)</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option>
            <option value="Class 4">Class 4</option>
            <option value="Class 5">Class 5</option>
            <option value="Class 6">Class 6</option>
            <option value="Class 7">Class 7</option>
            <option value="Class 8">Class 8</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelStyles}>
            Email Address (Optional)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="parent@example.com"
            className={inputStyles}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelStyles}>
            Questions / Message (Optional)
          </label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Any specific questions about curriculum, school bus route, fees, etc."
            className={inputStyles}
          />
        </div>

        <div className="sm:col-span-2 mt-2">
          <button
            type="submit"
            disabled={loading}
            className={`flex min-h-12 w-full items-center justify-center rounded-xl font-extrabold shadow-md transition-all disabled:opacity-50 ${
              isLight
                ? 'bg-[#9c271e] text-white hover:bg-[#851e16] hover:shadow-lg'
                : 'bg-white text-navy hover:bg-slate-100 hover:shadow-lg'
            }`}
          >
            {loading ? 'Submitting enquiry...' : 'Submit Admission Enquiry →'}
          </button>
        </div>
      </div>
    </form>
  );
}
