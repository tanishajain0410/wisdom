"use client";

import { usePathname } from "next/navigation";

export function FloatingCallButton() {
  const pathname = usePathname();

  // Do not show on admin portal
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <aside
      aria-label="Quick Call"
      className="fixed z-50 bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] sm:bottom-7 sm:right-7 transform-gpu"
    >
      <a
        href="tel:+917011160057"
        title="Call Wisdom International School (+91 70111 60057)"
        aria-label="Call Wisdom International School at +91 70111 60057"
        className="relative grid size-13 sm:size-16 place-items-center rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-500 text-white shadow-[0_10px_30px_rgba(16,185,129,0.5)] ring-4 ring-white/95 transition-all duration-300 hover:scale-110 hover:shadow-[0_15px_35px_rgba(16,185,129,0.65)] active:scale-95"
      >
        {/* Subtle Pulse Animation Ring */}
        <span
          className="absolute -inset-1 -z-10 rounded-full bg-emerald-500 opacity-40 blur-xs animate-ping"
          aria-hidden="true"
        />

        {/* Clean Centered Phone Receiver Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-7 sm:size-8"
        >
          <path
            fillRule="evenodd"
            d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </aside>
  );
}
