import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export function InteriorPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Interior Hero Banner */}
        <section className="school-pattern relative overflow-hidden bg-navy-deep px-4 py-12 text-white sm:px-6 sm:py-18 lg:py-24">
          <div className="pointer-events-none absolute -left-20 top-0 size-72 rounded-full bg-sun/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-0 size-80 rounded-full bg-[#9c271e]/30 blur-3xl" />

          <div className="section-wrap relative z-10">
            {/* Breadcrumb Navigation */}
            <nav className="mb-3 sm:mb-4 flex items-center gap-2 text-xs font-bold tracking-wide text-slate-300">
              <Link href="/" className="hover:text-sun transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-sun">{eyebrow}</span>
            </nav>

            <p className="eyebrow mb-2 sm:mb-3 text-sun">{eyebrow}</p>
            <h1 className="max-w-4xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.12] sm:leading-tight tracking-tight">
              {title}
            </h1>
            <p className="mt-3.5 sm:mt-5 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-slate-200">
              {description}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-pad">
          <div className="section-wrap">{children}</div>
        </section>
      </main>

      {/* Shared Unified School Footer */}
      <SiteFooter />
    </>
  );
}

export function InteriorImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-56 sm:h-72 md:h-96 overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width:1024px) 100vw,70vw"
        className="object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
}
