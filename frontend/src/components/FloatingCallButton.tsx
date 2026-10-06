"use client";

import { usePathname } from "next/navigation";

export function FloatingContactButtons() {
  const pathname = usePathname();

  // Do not show on admin portal
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const phoneNumber = "7011160057";
  const formattedPhone = "+91 70111 60057";
  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(
    "Hello Wisdom International School, I would like to inquire about admissions."
  )}`;
  const callUrl = `tel:+91${phoneNumber}`;

  return (
    <>
      {/* LEFT: Quick Phone Call Button */}
      <aside
        aria-label="Quick Phone Call"
        className="fixed z-50 bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1.25rem,env(safe-area-inset-left))] sm:bottom-7 sm:left-7 transform-gpu"
      >
        <a
          href={callUrl}
          title={`Call Wisdom International School (${formattedPhone})`}
          aria-label={`Call Wisdom International School at ${formattedPhone}`}
          className="group relative flex size-13 sm:size-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#173b68] via-[#1d4ed8] to-[#2563eb] text-white shadow-[0_10px_30px_rgba(29,78,216,0.45)] ring-4 ring-white/95 transition-all duration-300 hover:scale-110 hover:shadow-[0_15px_35px_rgba(29,78,216,0.65)] active:scale-95"
        >
          {/* Subtle Pulse Animation Ring */}
          <span
            className="absolute -inset-1 -z-10 rounded-full bg-blue-500 opacity-40 blur-xs animate-ping"
            aria-hidden="true"
          />

          {/* Clean Centered Phone Receiver Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 sm:size-7 transition-transform duration-300 group-hover:rotate-12"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
              clipRule="evenodd"
            />
          </svg>

          {/* Desktop Hover Label */}
          <span className="pointer-events-none absolute left-full ml-3 hidden items-center whitespace-nowrap rounded-full bg-slate-900/95 px-3.5 py-1.5 text-xs font-bold text-white shadow-xl backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 sm:flex">
            Call: {formattedPhone}
          </span>
        </a>
      </aside>

      {/* RIGHT: Quick WhatsApp Button */}
      <aside
        aria-label="Quick WhatsApp Chat"
        className="fixed z-50 bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] sm:bottom-7 sm:right-7 transform-gpu"
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={`Chat with Wisdom International School on WhatsApp (${formattedPhone})`}
          aria-label={`Chat with Wisdom International School on WhatsApp at ${formattedPhone}`}
          className="group relative flex size-13 sm:size-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#128c7e] via-[#25d366] to-[#2ecc71] text-white shadow-[0_10px_30px_rgba(37,211,102,0.5)] ring-4 ring-white/95 transition-all duration-300 hover:scale-110 hover:shadow-[0_15px_35px_rgba(37,211,102,0.65)] active:scale-95"
        >
          {/* Subtle Pulse Animation Ring */}
          <span
            className="absolute -inset-1 -z-10 rounded-full bg-[#25d366] opacity-40 blur-xs animate-ping"
            aria-hidden="true"
          />

          {/* Clean Centered WhatsApp Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-7 sm:size-8 transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.414Z" />
          </svg>

          {/* Desktop Hover Label */}
          <span className="pointer-events-none absolute right-full mr-3 hidden items-center whitespace-nowrap rounded-full bg-[#075e54]/95 px-3.5 py-1.5 text-xs font-bold text-white shadow-xl backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 sm:flex">
            Chat on WhatsApp
          </span>
        </a>
      </aside>
    </>
  );
}

// Backward compatibility export
export const FloatingCallButton = FloatingContactButtons;

