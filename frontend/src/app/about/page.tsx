import Image from "next/image";
import Link from "next/link";
import { InteriorPage } from "@/components/InteriorPage";
import { leaders } from "@/data/site";

const coreValues = [
  {
    num: 1,
    title: "Activity-Led Learning",
    desc: "Concepts are discovered through hands-on participation, interactive smart boards, and experiments rather than passive rote learning.",
    icon: "🌱",
    tag: "Modern Pedagogy",
  },
  {
    num: 2,
    title: "Indian Values & Culture",
    desc: "We instill deep respect for cultural traditions, family values, and civic responsibility through festive celebrations and ethical education.",
    icon: "🪔",
    tag: "Ethical Roots",
  },
  {
    num: 3,
    title: "Individual Attention",
    desc: "With a balanced 1:20 student-teacher ratio, our educators know each child personally, nurturing their strengths and addressing hurdles early.",
    icon: "🤝",
    tag: "1:20 Ratio",
  },
  {
    num: 4,
    title: "Safe & Nurturing Campus",
    desc: "24×7 CCTV coverage, filtered RO drinking water, hygienic sanitation, and emergency medical protocols keep parents completely worry-free.",
    icon: "🛡️",
    tag: "Campus Safety",
  },
];

export default function AboutPage() {
  return (
    <InteriorPage
      eyebrow="About Our School"
      title="A school where childhood is celebrated and potential is nurtured."
      description="Wisdom International School brings together thoughtful teaching, modern digital resources, and a deeply caring community in Mauranipur — from Play Group to Class 8."
    >
      <div className="space-y-16 lg:space-y-24">
        {/* Top Metric Highlights Bar */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">🏫</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">PG to Class 8</b>
            <p className="mt-1 text-xs text-slate-500">Comprehensive foundation from early childhood to upper primary.</p>
          </div>
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">👥</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">1:20 Ratio</b>
            <p className="mt-1 text-xs text-slate-500">Close mentor attention with personalized progress tracking.</p>
          </div>
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">📜</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">Govt Recognized</b>
            <p className="mt-1 text-xs text-slate-500">Recognized by the Department of Basic Education, U.P.</p>
          </div>
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">🌿</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">Values First</b>
            <p className="mt-1 text-xs text-slate-500">Blending modern progressive syllabus with cultural ethos.</p>
          </div>
        </section>

        {/* Story Section: Images + Text */}
        <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative h-56 sm:h-80 overflow-hidden rounded-2xl sm:rounded-3xl shadow-md">
              <Image
                src="/images/school-life-1.jpg"
                alt="Students during an activity session at Wisdom International School"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="relative h-56 sm:h-80 overflow-hidden rounded-2xl sm:rounded-3xl shadow-md sm:translate-y-8">
              <Image
                src="/images/school-life-2.jpg"
                alt="Classroom learning at Wisdom International School"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#9c271e]/20 bg-rose-50 px-3.5 py-1 text-xs font-bold text-[#9c271e]">
              <span>🏛️</span> Established in Mauranipur, Jhansi
            </span>
            <h2 className="mt-4 font-display text-3xl font-black text-navy sm:text-4xl lg:text-5xl">
              Curious minds. Confident hearts. Strong roots.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              At Wisdom International School, we believe that quality education should be joyful, accessible, and grounded in character. We blend activity-led progressive pedagogy with timeless Indian cultural values.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              From their first step in Play Group to graduation from Class 8, students learn to communicate with clarity, solve problems collaboratively, and carry themselves with confidence.
            </p>

            <div className="mt-8 grid gap-3 font-bold text-slate-800 sm:grid-cols-2 text-sm">
              <span className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 border border-slate-200/80">
                <span className="text-emerald-600 font-black">✓</span> Safe & caring campus
              </span>
              <span className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 border border-slate-200/80">
                <span className="text-emerald-600 font-black">✓</span> 1:20 Student-Teacher Ratio
              </span>
              <span className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 border border-slate-200/80">
                <span className="text-emerald-600 font-black">✓</span> Digital Smart Classrooms
              </span>
              <span className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 border border-slate-200/80">
                <span className="text-emerald-600 font-black">✓</span> Value-based Education
              </span>
            </div>
          </div>
        </section>

        {/* Core Values 4-Grid with simple 1, 2, 3, 4 badges */}
        <section>
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow text-coral mb-2">Our Guiding Pillars</p>
            <h3 className="font-display text-3xl font-black text-navy sm:text-4xl">
              The four cornerstones of our pedagogy.
            </h3>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Every initiative, lesson plan, and campus facility is guided by these foundational values.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((val) => (
              <div
                key={val.title}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-slate-300"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-slate-100 text-2xl group-hover:scale-110 transition-transform">
                      {val.icon}
                    </span>
                    {/* Clean Circular 1, 2, 3, 4 badge */}
                    <span className="inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 font-display text-sm font-black text-navy shadow-xs group-hover:border-[#9c271e] group-hover:bg-rose-50 group-hover:text-[#9c271e] transition-all">
                      {val.num}
                    </span>
                  </div>
                  <h4 className="mt-5 font-display text-xl font-bold text-navy">
                    {val.title}
                  </h4>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                    {val.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-bold text-slate-400">
                  <span>Wisdom Pillar</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-slate-600">
                    {val.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Section with Real Profiles */}
        <section className="rounded-[28px] sm:rounded-[36px] border border-slate-200/90 bg-gradient-to-b from-[#f8fafc] to-white p-6 sm:p-10 lg:p-16 shadow-sm">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-sun/60 bg-sun/10 px-3.5 py-1 text-xs font-bold text-[#a96800]">
              <span>★</span> Academic Leadership
            </span>
            <h3 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-black text-navy">
              A shared vision for meaningful education.
            </h3>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Meet the visionary educators and administrators guiding Wisdom International School.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {leaders.map(({ name, role, image, quote }) => (
              <article
                key={name}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={image}
                    alt={`${name}, ${role} of Wisdom International School`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute inset-x-5 bottom-4 text-white">
                    <b className="block font-display text-xl font-black">{name}</b>
                    <span className="text-xs font-bold uppercase tracking-wider text-sun">
                      {role}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <blockquote className="text-sm leading-relaxed text-slate-600 italic">
                    “{quote}”
                  </blockquote>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Governing Trust Card */}
        <section className="overflow-hidden rounded-[28px] sm:rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <p className="eyebrow text-coral mb-2">Governing Body</p>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-navy">
                Run by Janhit Seva Sansthan Trust
              </h3>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
                Wisdom International School operates under the benevolent guidance of Janhit Seva Sansthan Trust. The trust is dedicated to social upliftment, cultural preservation, and making high-caliber education accessible to every deserving child in Mauranipur and surrounding Bundelkhand regions.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3 text-xs font-bold text-slate-700">
                <span className="rounded-xl bg-slate-100 px-3.5 py-2">✓ Registered Educational Trust</span>
                <span className="rounded-xl bg-slate-100 px-3.5 py-2">✓ Dedicated to Rural & Suburban Education</span>
                <span className="rounded-xl bg-slate-100 px-3.5 py-2">✓ Non-Profit Mission</span>
              </div>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-[180px] sm:max-w-[220px]">
              <Image
                src="/images/janhit-seva-sansthan-trust.png"
                alt="Janhit Seva Sansthan Trust official emblem"
                fill
                sizes="(max-width: 1024px) 70vw, 220px"
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* Interactive CTA Banner */}
        <section className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#9c271e] via-coral to-[#7a1811] p-6 sm:p-10 lg:p-14 text-white shadow-xl">
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-sun">
                <span>🎒</span> Admissions Open 2026–27
              </span>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                Ready to take the next step with Wisdom?
              </h3>
              <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-slate-100">
                Enrollments are open from Play Group to Class 8. Visit our campus in Mauranipur or speak directly with our admissions counselor today.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:justify-end">
              <Link
                href="/contact/"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-sun px-6 text-sm font-extrabold text-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-400"
              >
                <span>Schedule a School Tour</span>
              </Link>
              <a
                href="tel:+917011160057"
                className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-white/70 bg-white/10 px-6 text-sm font-extrabold text-white backdrop-blur-sm transition hover:bg-white/20"
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
