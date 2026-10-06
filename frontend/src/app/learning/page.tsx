import Image from "next/image";
import Link from "next/link";
import { InteriorPage } from "@/components/InteriorPage";

const academicStages = [
  {
    num: 1,
    stage: "Early Years",
    classes: "Play Group & Nursery",
    age: "Ages 2.5 – 5 Years",
    image: "/images/gallery/round-2/r2-00.webp",
    description:
      "Language development, sensory discovery, fine-motor coordination, and social confidence fostered through joyful, guided play and story circles.",
    tone: "border-amber-200 bg-gradient-to-b from-amber-50/60 to-white",
    badge: "bg-amber-100 text-amber-800",
    accent: "text-amber-700",
    icon: "☀",
    points: [
      "Storytelling, rhymes and vocal expression",
      "Sensory discovery and tactile creative play",
      "Fine-motor skills through clay & puzzles",
      "Social sharing, values and self-care routines",
    ],
  },
  {
    num: 2,
    stage: "Primary School",
    classes: "Classes 1 to 5",
    age: "Ages 5 – 10 Years",
    image: "/images/gallery/round-2/r2-09.webp",
    description:
      "Building rock-solid foundations in literacy, mathematical reasoning, and scientific wonder — reinforced through participatory classroom activities.",
    tone: "border-sky-200 bg-gradient-to-b from-sky-50/60 to-white",
    badge: "bg-sky-100 text-sky-800",
    accent: "text-sky-700",
    icon: "✎",
    points: [
      "Visual concept clarity in Maths & Science",
      "English & Hindi reading fluency",
      "Hands-on science models and projects",
      "Abacus math and logical problem-solving",
    ],
  },
  {
    num: 3,
    stage: "Middle School",
    classes: "Classes 6 to 8",
    age: "Ages 11 – 14 Years",
    image: "/images/gallery/round-2/r2-14.webp",
    description:
      "Deeper subject proficiency, analytical thinking, technology literacy, and leadership preparation to excel in high school and board curricula.",
    tone: "border-rose-200 bg-gradient-to-b from-rose-50/60 to-white",
    badge: "bg-rose-100 text-[#9c271e]",
    accent: "text-[#9c271e]",
    icon: "⚛",
    points: [
      "Digital laboratory coding & computer skills",
      "Critical thinking, essay writing and debate",
      "Advanced science experimentation",
      "Goal-oriented mentoring and exam confidence",
    ],
  },
];

const coCurriculars = [
  {
    num: 1,
    title: "Cultural & Stage Expression",
    desc: "Stage confidence through drama, dance, patriotic skits, and traditional Indian festival celebrations.",
    image: "/images/gallery/round-2/r2-06.webp",
    tag: "Performing Arts",
  },
  {
    num: 2,
    title: "Yoga & Physical Vitality",
    desc: "Morning open-air yoga, drill sessions, outdoor sports, and athletics for physical agility and focus.",
    image: "/images/gallery/round-2/r2-02.webp",
    tag: "Sports & Fitness",
  },
  {
    num: 3,
    title: "Hands-on Practical Market",
    desc: "Experiential student markets where children learn currency handling, teamwork, and entrepreneurial basics.",
    image: "/images/gallery/round-2/r2-11.webp",
    tag: "Life Skills",
  },
  {
    num: 4,
    title: "Art, Craft & Clay Modeling",
    desc: "Fine-motor agility, color harmony, pottery crafts, and innovative sculpture in dedicated art classes.",
    image: "/images/gallery/round-2/r2-19.webp",
    tag: "Creative Arts",
  },
];

export default function LearningPage() {
  return (
    <InteriorPage
      eyebrow="Academic Journey"
      title="Right for every age. Ready for every next step."
      description="At Wisdom International School, purposeful play in the early years grows organically into scientific inquiry, creative collaboration, and independent thinking."
    >
      <div className="space-y-16 lg:space-y-24">
        {/* Top Metric Highlights Bar */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">🌱</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">Ages 2.5 to 14</b>
            <p className="mt-1 text-xs text-slate-500">Gradual progression tailored to each developmental milestone.</p>
          </div>
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">📚</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">NCERT Pattern</b>
            <p className="mt-1 text-xs text-slate-500">Structured foundational curriculum infused with experiential learning.</p>
          </div>
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">💡</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">Smart Tech</b>
            <p className="mt-1 text-xs text-slate-500">Audio-visual smart classrooms and computer laboratory skills.</p>
          </div>
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">🎯</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">Zero Fear</b>
            <p className="mt-1 text-xs text-slate-500">Formative assessment system without exam stress or anxiety.</p>
          </div>
        </section>

        {/* 3 Main Academic Stage Cards */}
        <section className="grid gap-8 lg:grid-cols-3">
          {academicStages.map((stage) => (
            <article
              key={stage.stage}
              className={`group flex flex-col justify-between overflow-hidden rounded-[32px] border ${stage.tone} shadow-[0_12px_45px_rgba(15,43,79,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl`}
            >
              <div>
                {/* Stage Photo Header */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={stage.image}
                    alt={`Wisdom International School - ${stage.stage}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/20 to-transparent" />
                  
                  {/* Clean Circular Badge */}
                  <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-white/95 font-display text-sm font-black text-navy shadow-md">
                      {stage.num}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold shadow-sm ${stage.badge}`}
                    >
                      {stage.age}
                    </span>
                  </div>

                  <div className="absolute inset-x-5 bottom-4 text-white">
                    <span className="text-xs font-bold uppercase tracking-wider text-sun">
                      {stage.stage}
                    </span>
                    <h2 className="font-display text-2xl font-black">{stage.classes}</h2>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <p className="text-sm leading-relaxed text-slate-600">
                    {stage.description}
                  </p>

                  <div className="mt-6 border-t border-slate-200/60 pt-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Key Stage Highlights:
                    </p>
                    <ul className="mt-3 space-y-2 text-xs font-semibold text-slate-700">
                      {stage.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2">
                          <span className={`${stage.accent} font-black`}>✓</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200/60 p-6 pt-4 text-xs font-bold text-slate-500">
                <span>Activity-Led Pedagogy</span> · <span>Mauranipur</span>
              </div>
            </article>
          ))}
        </section>

        {/* Co-Curricular & Holistic Learning Section */}
        <section className="rounded-[36px] border border-slate-200/90 bg-gradient-to-b from-[#f8fafc] to-white p-8 sm:p-12 lg:p-16 shadow-sm">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-sun/60 bg-sun/10 px-3.5 py-1 text-xs font-bold text-[#a96800]">
              <span>🎨</span> Beyond the Textbook
            </span>
            <h3 className="mt-3 font-display text-3xl font-black text-navy sm:text-4xl">
              Co-curricular excellence in everyday school life.
            </h3>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              True education happens when hands, heart, and mind work in harmony. Every week features dedicated sessions in arts, fitness, cultural values, and practical teamwork.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coCurriculars.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Clean Circular Badge */}
                    <span className="absolute left-3.5 top-3.5 inline-flex size-8 items-center justify-center rounded-full bg-white/95 font-display text-xs font-black text-navy shadow-sm">
                      {item.num}
                    </span>

                    <span className="absolute bottom-3 left-3 rounded-md bg-navy/85 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-xs">
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <h4 className="font-display text-lg font-bold text-navy">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 p-5 pt-3 text-xs font-bold text-slate-400">
                  <span>Weekly Activity</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Teaching Philosophy Banner */}
        <section className="overflow-hidden rounded-[28px] sm:rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-3 lg:items-center">
            <div className="lg:col-span-2">
              <p className="eyebrow text-coral mb-2">Our Philosophy</p>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-navy">
                How our educators nurture each child
              </h3>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
                We replace fear of exams with joyful curiosity. Teachers maintain continuous formative evaluations, regular parent dialogues, and differentiated support to make sure no child is left behind.
              </p>
              <div className="mt-5 sm:mt-6 flex flex-wrap gap-2.5 sm:gap-3 text-xs font-bold text-slate-700">
                <span className="rounded-xl bg-slate-100 px-3.5 py-2">✓ No High-Stakes Exam Anxiety</span>
                <span className="rounded-xl bg-slate-100 px-3.5 py-2">✓ Bi-monthly Parent Conferences</span>
                <span className="rounded-xl bg-slate-100 px-3.5 py-2">✓ Personalized Pace Support</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
              <Link
                href="/facilities/"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-navy px-6 text-sm font-extrabold text-white shadow-md transition hover:bg-navy-deep text-center"
              >
                <span>See Our Smart Classrooms</span>
              </Link>
              <Link
                href="/contact/"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-navy px-6 text-sm font-extrabold text-navy transition hover:bg-navy hover:text-white text-center"
              >
                <span>Enquire for Admission</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Campus Visit Invitation Banner */}
        <section className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-navy-deep via-[#0d2a4d] to-navy p-6 sm:p-10 lg:p-14 text-white shadow-xl">
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-sun/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-[#9c271e]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-sun">
                <span>📍</span> Visit Our Campus
              </span>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                Experience our classrooms in person.
              </h3>
              <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-slate-200">
                Tour our activity rooms, see our interactive touch boards in action, and talk to our teachers about your child’s learning style.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:justify-end">
              <Link
                href="/contact/"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-sun px-6 text-sm font-extrabold text-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-400"
              >
                <span>Book a Campus Visit</span>
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
