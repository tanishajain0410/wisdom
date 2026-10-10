import Image from "next/image";
import Link from "next/link";
import {SiteHeader} from "@/components/SiteHeader";
import {SiteFooter} from "@/components/SiteFooter";
import {SectionHeading} from "@/components/SectionHeading";
import {GalleryShowcase} from "@/components/GalleryShowcase";
import {facilityCards,leaders,programs} from "@/data/site";
import {AdmissionForm} from "@/components/AdmissionForm";
import {getAdmissionSession} from "@/lib/settings";

const button="inline-flex min-h-13 items-center justify-center rounded-xl px-6 font-extrabold transition hover:-translate-y-0.5";

export default async function Home() {
  const admissionSession = await getAdmissionSession();

  return (
    <>
 <a href="#main" className="fixed -top-20 left-4 z-[100] bg-white px-4 py-2 focus:top-4">Skip to content</a><SiteHeader/>
 <main id="main">
  <section id="home" className="school-pattern relative overflow-hidden bg-navy-deep py-12 sm:py-16 text-white lg:py-24">
    <div className="absolute -left-28 top-12 size-72 rounded-full bg-sun/10 blur-3xl pointer-events-none" />
    <div className="absolute -right-20 bottom-0 size-80 rounded-full bg-[#9c271e]/35 blur-3xl pointer-events-none" />
    <div className="section-wrap relative grid items-center gap-10 sm:gap-14 lg:grid-cols-[.92fr_1.08fr]">
      <div className="reveal text-center lg:text-left">
        <div className="mx-auto mb-4 sm:mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-sun lg:mx-0">
          <span className="size-2 rounded-full bg-sun animate-pulse" />
          Admissions open · {admissionSession}
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-black leading-[1.08] sm:leading-[.96] tracking-[-.04em] text-white">
          Where young minds<br />
          <span className="text-sun">learn to shine.</span>
        </h1>
        <p className="mx-auto my-5 sm:my-7 max-w-xl text-base sm:text-lg leading-7 sm:leading-8 text-slate-200 lg:mx-0">
          A safe, joyful and value-rich school where curiosity becomes confidence—from Play Group through Class 8.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
          <a className={`${button} w-full sm:w-auto bg-sun text-navy shadow-xl shadow-black/20`} href="#admissions">
            Enquire for admission
          </a>
          <a className={`${button} w-full sm:w-auto border-2 border-white/40 text-white hover:border-white`} href="#gallery">
            Explore school life
          </a>
        </div>
        <div className="mt-7 sm:mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3 text-left text-xs sm:text-sm text-slate-300 lg:justify-start">
          <span><b className="block text-base sm:text-lg text-white">PG–8</b>Classes</span>
          <span><b className="block text-base sm:text-lg text-white">Activity-led</b>Learning</span>
          <span><b className="block text-base sm:text-lg text-white">Child-first</b>Guidance</span>
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-2xl reveal">
        <div className="relative h-[360px] sm:h-[480px] lg:h-[590px] overflow-hidden rounded-[28px] sm:rounded-[36px] border-4 sm:border-8 lg:border-[10px] border-white/10 shadow-[0_35px_90px_rgba(0,0,0,.32)]">
          <Image src="/images/gallery/round-2/r2-02.webp" alt="Wisdom International School students taking part in a mindful outdoor activity" fill sizes="(max-width:1024px) 100vw,55vw" priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
            <p className="eyebrow text-sun text-xs sm:text-sm">Learning beyond books</p>
            <p className="mt-1 sm:mt-2 max-w-xs sm:max-w-sm font-display text-base sm:text-2xl font-black leading-snug">
              Confidence, creativity, culture and care—every day.
            </p>
          </div>
        </div>
        <div className="absolute top-3.5 right-3.5 sm:top-auto sm:-bottom-7 sm:-right-6 z-20 flex items-center gap-2.5 sm:gap-3 rounded-2xl bg-white px-3 py-2 sm:px-4 sm:py-3 text-navy shadow-2xl">
          <span className="grid size-9 sm:size-12 place-items-center rounded-full bg-sun text-base sm:text-xl">★</span>
          <span>
            <b className="block text-xs sm:text-sm">A happy place to grow</b>
            <small className="text-[10px] sm:text-xs text-slate-500">Play · Explore · Create</small>
          </span>
        </div>
      </div>
    </div>
  </section>
  <section className="relative z-10 bg-white"><div className="section-wrap -mt-1 grid overflow-hidden rounded-b-[28px] border-x border-b border-slate-200 bg-white shadow-[0_24px_55px_rgba(15,43,79,.09)] md:grid-cols-3">{[["01","Interactive learning","Ideas become experiences"],["02","Caring classrooms","Every child feels supported"],["03","Strong foundations","Skills for school and life"]].map(([n,t,s])=><div key={n} className="flex items-center gap-4 border-b border-slate-200 px-6 py-7 last:border-0 md:border-b-0 md:border-r md:px-8"><span className="font-display text-3xl font-black text-[#9c271e]">{n}</span><span><b className="block font-display text-navy">{t}</b><small className="text-slate-500">{s}</small></span></div>)}</div></section>

  <section id="about" className="section-pad">
    <div className="section-wrap grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
      <div className="relative pr-0 sm:pr-4">
        <div className="relative h-[300px] sm:h-[420px] lg:h-[500px] overflow-hidden rounded-3xl soft-shadow">
          <Image
            src="/images/school-life-1.jpg"
            alt="Wisdom International School children during a school activity"
            fill
            sizes="(max-width:1024px) 100vw,50vw"
            className="object-cover"
          />
        </div>
        <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-0 rounded-2xl bg-sun px-4 py-3 sm:px-6 sm:py-5 text-xs sm:text-sm shadow-lg text-navy">
          Growing curious minds<br />
          <b className="font-extrabold text-sm sm:text-base">since the first day</b>
        </div>
      </div>
      <div>
        <p className="eyebrow mb-4 text-coral">Welcome to Wisdom</p>
        <h2 className="text-4xl font-black leading-tight tracking-tight text-navy sm:text-6xl">
          A school where childhood is celebrated.
        </h2>
        <p className="my-6 text-lg leading-8 text-slate-500">
          Wisdom International School brings together thoughtful teaching, modern resources and a caring community in Mauranipur. From first friendships in Play Group to confident learning in Class 8, each stage is designed to help children thrive.
        </p>
        <div className="grid gap-3 font-semibold sm:grid-cols-2 text-slate-700">
          {[
            "Safe, welcoming environment",
            "1:20 Student-teacher ratio",
            "Activity-led understanding",
            "Values and stage confidence",
          ].map((x) => (
            <span key={x} className="flex items-center gap-2">
              <span className="text-emerald-600 font-black">✓</span> {x}
            </span>
          ))}
        </div>
        <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
          <Link
            href="/about/"
            className={`${button} w-full sm:w-auto bg-[#9c271e] text-white shadow-lg shadow-red-900/15 hover:bg-[#821e16]`}
          >
            <span>Read School Story & Values</span> <span className="ml-1 text-sun">→</span>
          </Link>
          <Link
            href="/facilities/"
            className={`${button} w-full sm:w-auto border-2 border-slate-300 bg-white text-navy hover:border-navy`}
          >
            Tour Campus
          </Link>
        </div>
      </div>
    </div>
  </section>

  <section id="learning" className="section-pad bg-gradient-to-b from-[#fbfcfe] via-cream to-white">
    <div className="section-wrap">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end mb-12">
        <div>
          <p className="eyebrow mb-2 text-coral">Our learning journey</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-navy">
            Right for every age,<br />ready for every next step.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
            Purposeful play in the early years grows into scientific inquiry, creative collaboration, and independent thinking.
          </p>
        </div>
        <Link
          href="/learning/"
          className={`${button} w-full sm:w-auto bg-[#9c271e] text-white shadow-md hover:bg-[#821e16]`}
        >
          <span>Explore Curriculum</span> <span className="ml-1 text-sun">→</span>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            num: 1,
            stage: "Early Years",
            title: "Play Group & Nursery",
            image: "/images/gallery/round-2/r2-00.webp",
            age: "Ages 2.5 – 5",
            description: "Language, movement, sensory discovery, and social confidence fostered through guided play.",
            points: ["Story and rhyme circles", "Sensory & tactile play", "Fine-motor development"],
          },
          {
            num: 2,
            stage: "Primary",
            title: "Classes 1–5",
            image: "/images/gallery/round-2/r2-09.webp",
            age: "Ages 5 – 10",
            description: "Rock-solid foundations in literacy, mathematical reasoning, and scientific curiosity.",
            points: ["Visual concept clarity", "Hands-on projects", "Creative expression"],
          },
          {
            num: 3,
            stage: "Middle School",
            title: "Classes 6–8",
            image: "/images/gallery/round-2/r2-14.webp",
            age: "Ages 11 – 14",
            description: "Deeper subject proficiency, analytical thinking, coding lab skills, and leadership readiness.",
            points: ["Science & digital lab", "Debate & critical thought", "Mentored exam confidence"],
          },
        ].map((p) => (
          <article
            key={p.title}
            className="group flex flex-col justify-between overflow-hidden rounded-[32px] border border-slate-200/90 bg-white shadow-[0_12px_45px_rgba(15,43,79,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
          >
            <div>
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/20 to-transparent" />
                <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-white/95 font-display text-sm font-black text-navy shadow-md">
                    {p.num}
                  </span>
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-navy shadow-xs backdrop-blur-xs">
                    {p.age}
                  </span>
                </div>
                <div className="absolute inset-x-5 bottom-4 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-sun">
                    {p.stage}
                  </span>
                  <h3 className="font-display text-2xl font-black text-white">{p.title}</h3>
                </div>
              </div>

              <div className="p-7">
                <p className="text-sm leading-relaxed text-slate-600">{p.description}</p>
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Key Highlights:
                  </p>
                  <ul className="space-y-1.5 text-xs font-semibold text-slate-700">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2">
                        <span className="text-[#9c271e] font-black">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 p-6 pt-3 flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Activity-Led</span>
              <Link href="/learning/" className="text-[#9c271e] hover:underline font-extrabold flex items-center gap-1">
                Learn more <span>→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>

  <section id="facilities" className="section-pad bg-gradient-to-b from-white to-[#fbfcfe]">
    <div className="section-wrap grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
      <div className="lg:sticky lg:top-36 lg:self-start">
        <p className="eyebrow mb-3 sm:mb-4 text-coral">Made for discovery</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-navy">
          Spaces that invite children to participate.
        </h2>
        <p className="my-5 sm:my-6 text-base sm:text-lg leading-7 sm:leading-8 text-slate-500">
          Children learn best when they can see, touch, try and talk about new ideas. Our campus infrastructure supports active, curiosity-led learning throughout the day.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <Link className={`${button} w-full sm:w-auto bg-[#9c271e] text-white shadow-lg shadow-red-900/15 hover:bg-[#851e16]`} href="/facilities/">
            <span>Explore All Facilities</span> <span className="ml-1 text-sun">→</span>
          </Link>
          <a className={`${button} w-full sm:w-auto border-2 border-slate-300 bg-white text-navy hover:border-navy`} href="#gallery">
            View school life
          </a>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {facilityCards.map((item) => (
          <article key={item.title} className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-[0_10px_35px_rgba(15,43,79,.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(15,43,79,.12)]">
            <div>
              <div className="relative mb-5 h-44 w-full overflow-hidden rounded-2xl bg-slate-100">
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 30vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 inline-flex size-8 items-center justify-center rounded-full bg-white/95 font-display text-sm font-black text-navy shadow-sm backdrop-blur-md">
                  {parseInt(item.num, 10)}
                </span>
                <span className="absolute bottom-3 left-3 text-xs font-bold uppercase tracking-wider text-white drop-shadow-sm">
                  {item.tag}
                </span>
              </div>
              <h3 className="font-display text-xl font-black text-navy group-hover:text-[#9c271e] transition-colors">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.copy}</p>
            </div>
            <div className="mt-5 border-t border-slate-100 pt-3 flex items-center justify-between text-xs font-bold text-slate-500">
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">✓ Active Campus</span>
              <Link href="/facilities/" className="text-[#9c271e] hover:underline font-extrabold flex items-center gap-1">
                Details <span>→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>

  <section id="gallery" className="py-14 sm:py-20 bg-navy text-white"><div className="section-wrap"><SectionHeading light eyebrow="Life at Wisdom" title={<>Every activity.<br/>A new discovery.</>} description="Explore celebrations, creative learning, cultural programmes and playful moments from school life."/><GalleryShowcase isHome/></div></section>

  <section className="section-pad"><div className="section-wrap"><SectionHeading eyebrow="Leadership" title={<>A shared vision for<br/>meaningful education.</>}/><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{leaders.map(({name,role,image,quote})=><article key={name} className="overflow-hidden rounded-3xl border border-slate-200 bg-white"><div className="relative aspect-[4/5] overflow-hidden bg-slate-100"><Image src={image} alt={`${name}, ${role} of Wisdom International School`} fill sizes="(max-width:1024px) 100vw,33vw" className="object-cover"/></div><blockquote className="m-0 p-6 sm:p-8"><p className="mb-6 sm:mb-7 text-sm sm:text-base leading-6 sm:leading-7">“{quote}”</p><footer><b className="block text-navy">{name}</b><span className="text-sm font-bold text-coral">{role}</span></footer></blockquote></article>)}</div></div></section>



  <section className="overflow-hidden bg-[#f4f8fc] py-14 sm:py-18">
    <div className="section-wrap grid items-center gap-8 lg:grid-cols-[1fr_.6fr] lg:gap-16">
      <div className="text-center lg:text-left">
        <p className="eyebrow mb-4 text-coral">Our governing trust</p>
        <h2 className="text-4xl font-black leading-tight tracking-tight text-navy sm:text-5xl">
          Our institution is run by
        </h2>
        <p className="mt-4 font-display text-2xl font-black text-[#244d91]">
          Janhit Seva Sansthan Trust
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600 lg:mx-0">
          The trust guides Wisdom International School’s commitment to accessible education, strong values and the all-round development of every child.
        </p>
      </div>
      <div className="relative mx-auto aspect-square w-full max-w-[260px]">
        <Image
          src="/images/janhit-seva-sansthan-trust.png"
          alt="Janhit Seva Sansthan Trust emblem"
          fill
          sizes="(max-width:1024px) 70vw,260px"
          className="object-contain"
        />
      </div>
    </div>
  </section>

  <section id="admissions" className="py-10 sm:py-14">
    <div className="section-wrap relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#b83126] via-coral to-[#8c1e17] px-5 py-9 sm:px-9 sm:py-12 text-white shadow-2xl lg:p-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-sun mb-4">
            <span className="size-2 rounded-full bg-sun animate-pulse" />
            Admissions Open · {admissionSession} Session
          </div>
          <h2 className="text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Come and see where<br />your child could flourish.
          </h2>
          <p className="mt-4 text-base text-slate-100 leading-relaxed">
            Speak directly with our admissions counselor about the right class (Play Group through Class 8), campus tours, and enrollment details.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className={`${button} bg-white text-navy shadow-lg hover:bg-slate-100`} href="tel:+917011160057">
              Call +91 70111 60057
            </a>
            <a className={`${button} border-2 border-white/70 text-white hover:bg-white/10`} href="mailto:wisdominternational.mau@gmail.com?subject=Admission%20Enquiry">
              Email Admissions
            </a>
          </div>
          <div className="mt-8 flex items-center gap-4 border-t border-white/20 pt-6 text-xs text-slate-200">
            <span>✓ Individual Attention</span>
            <span>✓ Smart Classrooms</span>
            <span>✓ Safe Campus</span>
          </div>
        </div>
        <div>
          <AdmissionForm theme="dark" session={admissionSession} />
        </div>
      </div>
    </div>
  </section>
 </main>
 <SiteFooter />
</>
);
}
