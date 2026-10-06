import Image from "next/image";
import Link from "next/link";
import { InteriorPage } from "@/components/InteriorPage";
import { facilityCards } from "@/data/site";

const toneStyles = {
  amber: {
    accent: "text-amber-600",
    borderGlow: "group-hover:border-amber-300",
    badge: "bg-amber-50 text-amber-800 border-amber-200",
    pillBg: "bg-amber-500/10 text-amber-800",
  },
  sky: {
    accent: "text-sky-600",
    borderGlow: "group-hover:border-sky-300",
    badge: "bg-sky-50 text-sky-800 border-sky-200",
    pillBg: "bg-sky-500/10 text-sky-800",
  },
  emerald: {
    accent: "text-emerald-600",
    borderGlow: "group-hover:border-emerald-300",
    badge: "bg-emerald-50 text-emerald-800 border-emerald-200",
    pillBg: "bg-emerald-500/10 text-emerald-800",
  },
  coral: {
    accent: "text-[#9c271e]",
    borderGlow: "group-hover:border-rose-300",
    badge: "bg-rose-50 text-[#9c271e] border-rose-200",
    pillBg: "bg-red-500/10 text-[#9c271e]",
  },
};

const amenities = [
  {
    icon: "📹",
    title: "24×7 CCTV Surveillance",
    desc: "Complete camera coverage across classrooms, corridors, and activity grounds for verified safety.",
  },
  {
    icon: "💧",
    title: "Pure RO Drinking Water",
    desc: "Multi-stage purified water stations installed on every wing with routine quality checks.",
  },
  {
    icon: "⚡",
    title: "100% Power Backup",
    desc: "Seamless inverter and power generator support ensuring uninterrupted multimedia classes.",
  },
  {
    icon: "🩺",
    title: "First-Aid & Wellness Support",
    desc: "Well-equipped medical room for immediate care with on-call doctor tie-up in Mauranipur.",
  },
  {
    icon: "🧼",
    title: "Hygienic Sanitation",
    desc: "Child-friendly, clean, regularly sanitized separate washrooms for boys and girls.",
  },
  {
    icon: "🚌",
    title: "Safe Transport Route",
    desc: "Supervised pick-and-drop school vans covering key local areas with experienced drivers.",
  },
];

export default function FacilitiesPage() {
  return (
    <InteriorPage
      eyebrow="Campus Life & Infrastructure"
      title="Spaces designed to inspire curiosity and active learning."
      description="From tech-equipped smart classrooms to open-air yoga spaces and caring educators, our campus in Mauranipur provides an environment where every child feels safe, motivated, and happy."
    >
      <div className="space-y-16 lg:space-y-24">
        {/* Top Metric Highlights Bar */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">🖥️</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">Smart Classes</b>
            <p className="mt-1 text-xs text-slate-500">Audio-visual touch displays & interactive digital curriculum.</p>
          </div>
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">💻</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">Computer Lab</b>
            <p className="mt-1 text-xs text-slate-500">Modern workstations for coding & digital literacy basics.</p>
          </div>
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">🧘</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">Yoga Grounds</b>
            <p className="mt-1 text-xs text-slate-500">Open-air morning yoga, physical drills & sports athletics.</p>
          </div>
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">🛡️</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">Safe Campus</b>
            <p className="mt-1 text-xs text-slate-500">24×7 CCTV, RO drinking water & medical first-aid room.</p>
          </div>
        </section>

        {/* 4 Main Facilities Feature Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
          {facilityCards.map((item) => {
            const tone = toneStyles[item.tone];

            return (
              <article
                key={item.title}
                className={`group relative flex flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_12px_45px_rgba(15,43,79,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(15,43,79,0.12)] ${tone.borderGlow}`}
              >
                {/* Visual Header with Real Photo */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-100 sm:h-72">
                  <Image
                    src={item.image}
                    alt={`Wisdom International School - ${item.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle Gradient Shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/60 bg-white/95 font-display text-base font-black text-navy shadow-md backdrop-blur-md">
                      {parseInt(item.num, 10)}
                    </span>

                    <span className="rounded-full border border-white/40 bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy shadow-sm backdrop-blur-md">
                      {item.tag}
                    </span>
                  </div>

                  {/* Bottom Title over Image */}
                  <div className="absolute inset-x-6 bottom-5">
                    <h2 className="font-display text-2xl font-black text-white drop-shadow-md sm:text-3xl">
                      {item.title}
                    </h2>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col justify-between p-7 sm:p-8">
                  <div>
                    <p className="text-base font-semibold leading-relaxed text-slate-800 sm:text-lg">
                      {item.copy}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>

                    {/* Key Feature Badges / Highlights */}
                    <div className="mt-6 border-t border-slate-100 pt-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Campus Highlights:
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.highlights.map((h) => (
                          <span
                            key={h}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-slate-50/90 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors group-hover:bg-white"
                          >
                            <span className={tone.accent}>✓</span>
                            <span>{h}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Micro-Indicator */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <span>Wisdom Standards</span> · <span>Mauranipur</span>
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 font-bold text-emerald-700">
                      <span>✓ Active Facility</span>
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Essential Campus Amenities Grid */}
        <section className="rounded-[28px] sm:rounded-[36px] border border-slate-200/90 bg-gradient-to-b from-[#f8fafc] to-white p-6 sm:p-10 lg:p-16 shadow-sm">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800">
              <span className="size-2 rounded-full bg-emerald-500" />
              Safety & Wellbeing
            </span>
            <h3 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-black text-navy">
              Every detail built for student safety & comfort.
            </h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
              Beyond academic spaces, we maintain high standards of physical safety, clean hygiene, and modern utilities so parents can feel completely confident every school day.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map((amenity) => (
              <div
                key={amenity.title}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs transition hover:shadow-md hover:border-slate-300"
              >
                <div className="grid size-12 place-items-center rounded-xl bg-slate-100 text-2xl">
                  {amenity.icon}
                </div>
                <h4 className="mt-4 font-display text-lg font-bold text-navy">
                  {amenity.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {amenity.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Visit Campus Invitation Banner */}
        <section className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-navy-deep via-[#0d2a4d] to-navy p-6 sm:p-10 lg:p-14 text-white shadow-xl">
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-sun/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-[#9c271e]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-sun">
                <span>📍</span> Visit Our Campus
              </span>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                Would you like to experience our campus in person?
              </h3>
              <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-slate-200">
                Parents are warmly invited to tour our classrooms, see the play areas, and meet our teachers. Our admissions desk is open Monday to Saturday from 8:00 AM to 3:00 PM.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:justify-end">
              <Link
                href="/contact/"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-sun px-6 text-sm font-extrabold text-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-400 active:translate-y-0"
              >
                <span>Schedule Campus Visit</span>
              </Link>
              <a
                href="tel:+917011160057"
                className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-white/60 bg-white/10 px-6 text-sm font-extrabold text-white backdrop-blur-sm transition hover:bg-white/20 hover:border-white"
              >
                <span>📞 Call +91 70111 60057</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </InteriorPage>
  );
}
