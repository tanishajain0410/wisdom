"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Disable smooth scroll on admin dashboard to allow native table/form scrolling
    if (pathname?.startsWith("/admin")) {
      return;
    }

    // Respect reduced motion on real user devices if explicitly enabled
    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isHeadless = navigator.userAgent.includes("Headless");
    if (prefersReduced && !isHeadless) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.4,
      infinite: false,
    });

    // Provide globally accessible instance if needed
    (window as any).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Intercept in-page hash links (e.g. #admissions, #gallery, #facilities) for buttery-smooth gliding
    const onHashClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (href.startsWith("#") && href.length > 1) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl as HTMLElement, {
            offset: -95,
            duration: 1.2,
          });
        }
      } else if (href.startsWith("/#") && pathname === "/") {
        const hash = href.replace("/", "");
        const targetEl = document.querySelector(hash);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl as HTMLElement, {
            offset: -95,
            duration: 1.2,
          });
        }
      }
    };

    document.addEventListener("click", onHashClick, { passive: false });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onHashClick);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, [pathname]);

  return null;
}
