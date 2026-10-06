import Image from "next/image";
import Link from "next/link";
import { InteriorPage } from "@/components/InteriorPage";
import { GalleryShowcase } from "@/components/GalleryShowcase";

const galleryHighlights = [
  {
    num: 1,
    title: "Cultural & Stage Performances",
    tag: "Performing Arts",
    image: "/images/gallery/round-2/r2-06.webp",
    desc: "Children build stage courage through patriotic songs, dance performances, and traditional drama on Independence Day, Republic Day, and Annual Day.",
    points: [
      "Vocal expression & public speaking",
      "Traditional Indian festival dance",
      "Costume & theatrical skits",
    ],
  },
  {
    num: 2,
    title: "Physical Vitality & Morning Yoga",
    tag: "Sports & Wellness",
    image: "/images/gallery/round-2/r2-02.webp",
    desc: "Fresh morning air, guided pranayama, stretching asanas, and track athletics ensure students stay energized, alert, and physically fit throughout school hours.",
    points: [
      "Guided morning breathing & mindfulness",
      "Inter-house athletic races & relays",
      "Teamwork and sportsman spirit",
    ],
  },
  {
    num: 3,
    title: "Experiential Student Market",
    tag: "Life Skills",
    image: "/images/gallery/round-2/r2-11.webp",
    desc: "A hands-on campus marketplace where students manage stalls, calculate change, negotiate politely, and understand practical mathematics in everyday life.",
    points: [
      "Real-world currency math calculations",
      "Team collaboration & stall setup",
      "Polite customer communication",
    ],
  },
  {
    num: 4,
    title: "Art, Craft & Clay Modeling",
    tag: "Creative Expression",
    image: "/images/gallery/round-2/r2-19.webp",
    desc: "Fine-motor coordination flourishes through clay pottery, Diya painting, rangoli art, and festival greeting card design under teacher mentorship.",
    points: [
      "Tactile clay sculpture & pottery",
      "Color harmony & festive rangoli",
      "Original creative problem solving",
    ],
  },
];

export default function GalleryPage() {
  return (
    <InteriorPage
      eyebrow="Life at Wisdom"
      title="Every activity. A new discovery."
      description="Explore celebrations, creative learning, cultural programmes, sports events, and everyday joyful moments captured across our Mauranipur campus."
    >
      <div className="space-y-16 lg:space-y-24">
        {/* Top Metric Highlights Bar */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">📸</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">75+ Moments</b>
            <p className="mt-1 text-xs text-slate-500">Documenting everyday classroom growth & campus activities.</p>
          </div>
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">🎭</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">10+ Celebrations</b>
            <p className="mt-1 text-xs text-slate-500">Annual Day, Janmashtami, Diwali, Republic Day & cultural fairs.</p>
          </div>
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">🧘</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">Daily Wellness</b>
            <p className="mt-1 text-xs text-slate-500">Morning outdoor yoga, physical drills and athletic sports.</p>
          </div>
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">🎨</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">Hands-on Expos</b>
            <p className="mt-1 text-xs text-slate-500">Student market stalls, science fairs & clay craft exhibitions.</p>
          </div>
        </section>

        {/* Live Photo Gallery Container */}
        <section className="overflow-hidden rounded-[36px] bg-navy-deep p-6 shadow-2xl sm:p-10 lg:p-12 border border-white/10 text-white">
          <div className="mb-8 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-sun">
                <span>★</span> Campus Photography
              </span>
              <h2 className="mt-3 font-display text-2xl font-black text-white sm:text-3xl">
                Browse School Moments
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                Click any photo to zoom in. Use category tabs to explore specific celebrations.
              </p>
            </div>
            <div className="text-xs text-slate-400">
              <span>Updated directly from school activities</span>
            </div>
          </div>

          <GalleryShowcase />
        </section>

        {/* Annual Activity Highlights Grid (Consistent 1, 2, 3, 4 Badges) */}
        <section className="rounded-[36px] border border-slate-200/90 bg-gradient-to-b from-[#f8fafc] to-white p-8 sm:p-12 lg:p-16 shadow-sm">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-sun/60 bg-sun/10 px-3.5 py-1 text-xs font-bold text-[#a96800]">
              <span>🌟</span> Co-Curricular Calendar
            </span>
            <h3 className="mt-3 font-display text-3xl font-black text-navy sm:text-4xl">
              Signature events that make childhood memorable.
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Beyond the textbooks, students at Wisdom participate in round-the-year programmes that build cultural grounding, physical grit, and collaborative leadership.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {galleryHighlights.map((item) => (
              <article
                key={item.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_12px_45px_rgba(15,43,79,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden bg-slate-100 sm:h-64">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/20 to-transparent" />

                    {/* Simple Circular 1, 2, 3, 4 Badge */}
                    <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                      <span className="inline-flex size-10 items-center justify-center rounded-full bg-white/95 font-display text-sm font-black text-navy shadow-md">
                        {item.num}
                      </span>
                      <span className="rounded-full border border-white/40 bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy shadow-sm backdrop-blur-md">
                        {item.tag}
                      </span>
                    </div>

                    <div className="absolute inset-x-6 bottom-4">
                      <h4 className="font-display text-xl font-black text-white sm:text-2xl">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <div className="p-7">
                    <p className="text-sm leading-relaxed text-slate-600">
                      {item.desc}
                    </p>

                    <div className="mt-5 border-t border-slate-100 pt-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Event Takeaways:
                      </p>
                      <ul className="mt-2.5 space-y-1.5 text-xs font-semibold text-slate-700">
                        {item.points.map((p) => (
                          <li key={p} className="flex items-center gap-2">
                            <span className="text-[#9c271e] font-black">✓</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 p-6 pt-3 text-xs font-bold text-slate-500">
                  <span>Wisdom International School Traditions</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Campus Visit Invitation Banner */}
        <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-navy-deep via-[#0d2a4d] to-navy p-8 text-white shadow-xl sm:p-12 lg:p-14">
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-sun/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-[#9c271e]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-sun">
                <span>📍</span> Visit Our Campus
              </span>
              <h3 className="mt-3 font-display text-3xl font-black text-white sm:text-4xl">
                See our students in action.
              </h3>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-200">
                Photographs can only capture a glimpse of school life. We invite you and your child to visit our campus in Mauranipur, meet the teachers, and experience the warmth first-hand.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:justify-end">
              <Link
                href="/contact/"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-sun px-6 text-sm font-extrabold text-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-400"
              >
                <span>Schedule Campus Walk-Through</span>
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
