"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/data/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";

  // Close mobile drawer on route change or Escape
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Helper to normalize path and detect active state
  const isRouteActive = (href: string) => {
    const cleanCurrent = pathname.replace(/\/+$/, "") || "/";
    const cleanTarget = href.replace(/\/+$/, "") || "/";

    if (cleanTarget === "/") {
      return cleanCurrent === "/";
    }
    return cleanCurrent === cleanTarget || cleanCurrent.startsWith(`${cleanTarget}/`);
  };

  return (
    <>
      {/* Top Banner Bar */}
      <div className="bg-navy-deep text-[12px] sm:text-[13px] text-white">
        <div className="mx-auto flex min-h-9 sm:min-h-10 w-full max-w-[1360px] items-center justify-between gap-3 px-4 sm:px-6 py-1.5 sm:py-0">
          <span className="hidden font-semibold sm:inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-sun animate-pulse" />
            Admissions Open · Play Group to Class 8 (Session 2026–27)
          </span>
          <div className="flex items-center gap-4 sm:gap-5 ml-auto sm:ml-0 font-medium text-xs sm:text-[13px]">
            <a
              className="flex items-center gap-1.5 font-bold text-sun transition hover:text-white"
              href="tel:+917011160057"
            >
              <span>📞</span> Call +91 70111 60057
            </a>
            <a
              className="hidden md:flex items-center gap-1.5 text-slate-200 transition hover:text-white"
              href="mailto:wisdominternational.mau@gmail.com"
            >
              <span>✉</span> wisdominternational.mau@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-[#eadfcb] bg-white/98 shadow-[0_10px_35px_rgba(15,43,79,.07)] backdrop-blur-md transform-gpu">
        <div className="mx-auto flex h-[80px] sm:h-[92px] w-full max-w-[1360px] items-center justify-between gap-4 px-4 sm:px-6 lg:gap-8 xl:gap-12">
          {/* Logo with Link back to Home */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 sm:gap-3 transition-transform hover:scale-[1.01] shrink-0 mr-2 sm:mr-4 lg:mr-6 xl:mr-8"
            aria-label="Wisdom International School home"
          >
            <Image
              src="/images/wisdom-logo-official.png"
              alt="Official Wisdom International School Mauranipur emblem"
              width={86}
              height={74}
              priority
              className="h-[56px] w-[66px] sm:h-[68px] sm:w-[80px] object-contain transition group-hover:drop-shadow-md"
            />
            <span className="flex flex-col leading-tight">
              <strong className="font-display text-[15px] sm:text-base lg:text-[15px] xl:text-[17px] 2xl:text-xl font-black text-navy group-hover:text-[#9c271e] transition-colors whitespace-nowrap">
                Wisdom International School
              </strong>
              <small className="mt-0.5 text-[10px] sm:text-xs font-bold tracking-[.12em] text-[#9c271e] whitespace-nowrap">
                MAURANIPUR · JHANSI
              </small>
            </span>
          </Link>

          {/* Mobile Menu Hamburger Button */}
          <button
            className="grid gap-1.5 rounded-xl p-2.5 hover:bg-slate-100 lg:hidden focus:outline-hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={open ? "Close Navigation Menu" : "Open Navigation Menu"}
          >
            <span
              className={`h-0.5 w-6 bg-navy transition-transform duration-200 ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-navy transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-navy transition-transform duration-200 ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>

          {/* Desktop & Mobile Navigation Links */}
          <nav
            id="main-nav"
            className={`${
              open ? "flex" : "hidden"
            } absolute left-0 right-0 top-[80px] sm:top-[92px] max-h-[calc(100dvh-80px)] sm:max-h-[calc(100dvh-92px)] overflow-y-auto flex-col gap-1.5 border-b border-slate-200 bg-white/98 p-5 shadow-2xl backdrop-blur-2xl lg:static lg:flex lg:flex-row lg:items-center lg:ml-auto lg:gap-1 xl:gap-1.5 lg:border-0 lg:p-0 lg:text-sm lg:shadow-none lg:max-h-none lg:overflow-visible`}
          >
            {navItems.map(([label, href]) => {
              const active = isRouteActive(href);

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`transition-all duration-200 text-sm lg:text-[13px] xl:text-sm whitespace-nowrap ${
                    active
                      ? "bg-[#9c271e]/10 text-[#9c271e] font-black ring-1 ring-[#9c271e]/25 shadow-xs px-4 py-2.5 lg:px-3 lg:py-1.5 xl:px-4 xl:py-2 rounded-full flex items-center gap-2 border-l-4 border-[#9c271e] lg:border-l-0"
                      : "text-slate-700 hover:text-[#9c271e] hover:bg-slate-100/80 font-bold px-4 py-2.5 lg:px-2.5 lg:py-1.5 xl:px-3.5 xl:py-2 rounded-full"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {active && (
                    <span
                      className="size-2 rounded-full bg-[#9c271e] animate-pulse"
                      aria-hidden="true"
                    />
                  )}
                  <span>{label}</span>
                </Link>
              );
            })}

            {/* Admission CTA Button */}
            <Link
              href="/#admissions"
              onClick={() => setOpen(false)}
              className="mt-3 lg:mt-0 lg:ml-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#9c271e] px-5 py-3 lg:px-3 lg:py-2 xl:px-5 xl:py-2.5 text-center text-sm lg:text-xs xl:text-sm font-extrabold text-white shadow-lg shadow-red-900/20 transition-all hover:-translate-y-0.5 hover:bg-[#851e16] hover:shadow-xl active:translate-y-0 shrink-0 whitespace-nowrap"
            >
              <span>Enroll Now</span>
              <span className="text-sun">→</span>
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
