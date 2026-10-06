"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { activityNames, galleryMoments } from "@/data/site";

interface DisplayMoment {
  src: string;
  alt: string;
  category: string;
  caption: string;
  wide?: boolean;
  is_featured?: boolean;
}

export function GalleryShowcase({ isHome = false }: { isHome?: boolean }) {
  const [items, setItems] = useState<DisplayMoment[]>(
    galleryMoments.map((g) => ({
      ...g,
      wide: false,
      is_featured: g.wide ?? false,
    }))
  );
  const [active, setActive] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  // Fetch live gallery items from database so admin edits & new uploads appear instantly
  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.items && Array.isArray(data.items) && data.items.length > 0) {
          const mapped: DisplayMoment[] = data.items.map((it: any) => ({
            src: it.image_url,
            alt: `Wisdom International School — ${it.title || it.caption || 'Moment'}`,
            category: it.category,
            caption: it.title || it.caption || '',
            wide: false,
            is_featured: Boolean(it.is_featured),
          }));
          setItems(mapped);
        }
      })
      .catch((err) => console.error('Error fetching live gallery:', err));
  }, []);

  const rawCategories = Array.from(new Set(items.map((item) => item.category)));

  // On Homepage, show only a curated compact list of popular categories to keep layout tight
  const categories = isHome
    ? [
        "All",
        "⭐ Highlights",
        ...rawCategories
          .filter((c) =>
            ["Cultural Activities", "Celebrations", "Diwali", "Yoga", "Games"].includes(c)
          )
          .slice(0, 4),
      ]
    : ["All", "⭐ Highlights", ...rawCategories];

  const visible =
    active === "All"
      ? items
      : active === "⭐ Highlights"
      ? items.filter((item) => item.is_featured)
      : items.filter((item) => item.category === active);

  const selectedItem = selected === null ? null : visible[selected];

  useEffect(() => {
    if (selected === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowLeft")
        setSelected((current) =>
          current === null ? null : (current - 1 + visible.length) % visible.length
        );
      if (event.key === "ArrowRight")
        setSelected((current) =>
          current === null ? null : (current + 1) % visible.length
        );
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected, visible.length]);

  const chooseCategory = (category: string) => {
    setActive(category);
    setSelected(null);
    setShowAll(category !== "All");
  };

  // On homepage show exactly 6 curated photos (2 clean rows of 3), otherwise respect showAll
  const displayed = isHome ? visible.slice(0, 6) : showAll ? visible : visible.slice(0, 6);

  return (
    <>
      {/* Categories Filter Bar */}
      <div
        className={`flex flex-wrap items-center gap-2 ${
          isHome ? "mb-8 justify-center" : "mb-10 justify-start"
        }`}
        aria-label="Gallery categories"
      >
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => chooseCategory(category)}
            aria-pressed={active === category}
            className={`min-h-10 rounded-full border px-4 text-xs sm:text-sm font-extrabold transition ${
              active === category
                ? "border-sun bg-sun text-navy shadow-md"
                : "border-white/20 bg-white/5 text-white/90 hover:border-white/50 hover:bg-white/10"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Proportional, Balanced Photo Grid (No horizontal stretched banners) */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {displayed.map((item, index) => (
          <figure
            key={`${item.src}-${index}`}
            className="group relative m-0 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white/10 shadow-lg ring-1 ring-white/10"
          >
            <button
              type="button"
              onClick={() => setSelected(index)}
              aria-label={`Open photo: ${item.caption}`}
              className="absolute inset-0 cursor-zoom-in text-left"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
                priority={index < 3}
              />

              {/* Highlight Badge */}
              {item.is_featured && (
                <span className="absolute left-3.5 top-3.5 z-10 flex items-center gap-1 rounded-full bg-amber-500/95 px-2.5 py-0.5 text-[11px] font-black text-white shadow-md backdrop-blur-xs">
                  <span>★</span>
                  <span>Highlight</span>
                </span>
              )}

              {/* Subtle hover prompt */}
              <span className="absolute right-3.5 top-3.5 rounded-full bg-navy-deep/80 px-2.5 py-0.5 text-[11px] font-bold text-white opacity-0 transition duration-200 group-hover:opacity-100">
                View ↗
              </span>

              {/* Bottom Gradient with Category & Caption */}
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/60 to-transparent p-4 pt-12">
                <span className="block text-[11px] font-extrabold uppercase tracking-wider text-sun">
                  {item.category}
                </span>
                <b
                  className="mt-0.5 block truncate text-sm sm:text-base font-bold text-white"
                  title={item.caption}
                >
                  {item.caption}
                </b>
              </span>
            </button>
          </figure>
        ))}
      </div>

      {/* Homepage CTA to Dedicated Gallery */}
      {isHome ? (
        <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <Link
            href="/gallery"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-sun px-6 sm:px-8 py-3 sm:py-3.5 font-display text-xs sm:text-sm font-extrabold text-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-400 text-center"
          >
            <span>Explore Full School Gallery ({items.length} Photos)</span>
            <span>→</span>
          </Link>
        </div>
      ) : (
        /* On Dedicated Gallery Page: Allow expanding all photos */
        !showAll && visible.length > displayed.length ? (
          <div className="mt-8 sm:mt-10 text-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="min-h-12 w-full sm:w-auto rounded-full bg-sun px-6 sm:px-8 font-extrabold text-navy shadow-lg transition hover:-translate-y-0.5 text-xs sm:text-sm"
            >
              See all photos ({visible.length})
            </button>
          </div>
        ) : null
      )}

      {/* Show Annual Activities Tags only on dedicated /gallery page, not on Homepage */}
      {!isHome && (
        <div className="mt-10 sm:mt-12 rounded-3xl border border-white/15 bg-white/5 p-5 sm:p-8">
          <p className="eyebrow mb-4 sm:mb-5 text-sun">Activities throughout the year</p>
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {activityNames.map((name) => (
              <span
                key={name}
                className="rounded-full bg-white/10 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-white"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedItem ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.caption}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
          className="fixed inset-0 z-[200] grid bg-[#06182d]/95 p-2 sm:p-6 lg:p-8"
        >
          <div className="relative m-auto flex h-full max-h-[920px] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-navy-deep shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/15 px-3.5 py-2.5 text-white sm:px-6 sm:py-3">
              <div className="min-w-0 flex-1 pr-3">
                <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[.14em] text-sun block sm:inline">
                  {selectedItem.category}
                </span>
                <b className="mt-0.5 sm:mt-0 sm:ml-3 block sm:inline text-xs sm:text-base truncate">
                  {selectedItem.caption}
                </b>
              </div>
              <button
                ref={closeButton}
                type="button"
                onClick={() => setSelected(null)}
                className="grid size-9 sm:size-11 shrink-0 place-items-center rounded-full bg-white/10 text-xl sm:text-2xl hover:bg-white/20"
                aria-label="Close photo"
              >
                ×
              </button>
            </div>
            <div className="relative min-h-0 flex-1">
              <Image
                src={selectedItem.src}
                alt={selectedItem.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-white/15 px-3.5 py-2.5 text-white sm:px-6 sm:py-3">
              <button
                type="button"
                onClick={() =>
                  setSelected((current) =>
                    current === null
                      ? null
                      : (current - 1 + visible.length) % visible.length
                  )
                }
                className="min-h-10 sm:min-h-11 rounded-full bg-white/10 px-4 sm:px-5 text-xs sm:text-sm font-bold hover:bg-white/20"
              >
                Previous
              </button>
              <span className="text-xs sm:text-sm text-slate-300">
                {(selected ?? 0) + 1} / {visible.length}
              </span>
              <button
                type="button"
                onClick={() =>
                  setSelected((current) =>
                    current === null ? null : (current + 1) % visible.length
                  )
                }
                className="min-h-10 sm:min-h-11 rounded-full bg-white/10 px-4 sm:px-5 text-xs sm:text-sm font-bold hover:bg-white/20"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
