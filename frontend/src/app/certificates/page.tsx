import Image from "next/image";
import Link from "next/link";
import { InteriorPage } from "@/components/InteriorPage";
import { certificates } from "@/data/site";

export default function CertificatesPage() {
  return (
    <InteriorPage
      eyebrow="Official Recognition & Affiliation"
      title="Recognized by the Department of Basic Education, Government of Uttar Pradesh."
      description="Wisdom International School holds official recognition for Pre-Primary, Primary (Classes 1–5), and Upper Primary (Classes 6–8), issued by the Office of the District Basic Education Officer (BSA), Jhansi."
    >
      <div className="space-y-16 lg:space-y-24">
        {/* Top Metric Highlights Bar */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">🏛️</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">Govt. Recognized</b>
            <p className="mt-1 text-xs text-slate-500">Office of District Basic Education Officer (BSA), Jhansi.</p>
          </div>
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">📜</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">Permanent (1–5)</b>
            <p className="mt-1 text-xs text-slate-500">Order No. JHA0936117190 under U.P. Basic Education.</p>
          </div>
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">📑</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">Upper Primary (6–8)</b>
            <p className="mt-1 text-xs text-slate-500">Order No. JHA09369070291 with full curriculum authority.</p>
          </div>
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">🛡️</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">100% Verified</b>
            <p className="mt-1 text-xs text-slate-500">Building stability, fire safety and health audits up to date.</p>
          </div>
        </section>

        {/* Certificate Display Cards with Circular 1, 2 Badges */}
        <div className="grid gap-8 lg:grid-cols-2">
          {certificates.map((cert, index) => {
            const isPermanent = cert.status.toLowerCase().includes("permanent");
            const certNum = index + 1;

            return (
              <article
                key={cert.number}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-slate-200/90 bg-white p-8 shadow-[0_12px_45px_rgba(15,43,79,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                {/* Decorative Top Accent Ribbon */}
                <div
                  className={`absolute inset-x-0 top-0 h-2.5 ${
                    isPermanent
                      ? "bg-gradient-to-r from-amber-400 via-sun to-amber-500"
                      : "bg-gradient-to-r from-[#9c271e] via-coral to-red-600"
                  }`}
                />

                <div>
                  {/* Status, Circular Badge & Authority Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 font-display text-sm font-black text-navy shadow-xs group-hover:border-[#9c271e] group-hover:bg-rose-50 group-hover:text-[#9c271e] transition-all">
                        {certNum}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold shadow-xs ${
                          isPermanent
                            ? "bg-amber-100 text-amber-900 border border-amber-200"
                            : "bg-rose-100 text-[#9c271e] border border-rose-200"
                        }`}
                      >
                        <span>✓</span>
                        <span>{cert.status}</span>
                      </span>
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs font-bold text-slate-600">
                      Classes {cert.classes}
                    </span>
                  </div>

                  <h2 className="mt-5 font-display text-2xl font-black text-navy sm:text-3xl">
                    {cert.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Office of the District Basic Education Officer, Jhansi (U.P.)
                  </p>

                  {/* Official Credentials Grid */}
                  <div className="mt-6 rounded-2xl bg-slate-50/90 border border-slate-200/80 p-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                          {cert.dateLabel}
                        </span>
                        <b className="mt-1 block text-base font-bold text-navy">
                          {cert.date}
                        </b>
                      </div>
                      <div>
                        <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                          Official Recognition No.
                        </span>
                        <b className="mt-1 block font-mono text-sm font-bold text-[#9c271e]">
                          {cert.number}
                        </b>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2 text-xs font-semibold text-slate-600">
                    <p className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Compliant with U.P. Basic Education Board Norms</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Verified Infrastructure, Safety & Faculty Standards</span>
                    </p>
                  </div>
                </div>

                {/* Download Actions */}
                <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-navy px-6 text-sm font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-navy-deep hover:shadow-lg active:translate-y-0"
                  >
                    <span>📄 Download Official PDF</span>
                  </a>
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-slate-500 hover:text-navy hover:underline text-center sm:text-right"
                  >
                    Preview in new tab ↗
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Institutional Trust & Governance Section */}
        <section className="rounded-[28px] sm:rounded-[36px] border border-slate-200/90 bg-gradient-to-b from-[#f8fafc] to-white p-6 sm:p-10 lg:p-16 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-sun/60 bg-sun/10 px-3.5 py-1 text-xs font-bold text-[#a96800]">
                <span>⚖</span> Transparency & Trust
              </span>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-black text-navy">
                Operated by Janhit Seva Sansthan Trust
              </h3>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
                Wisdom International School is managed by Janhit Seva Sansthan Trust, a registered charitable society committed to delivering high-quality, value-based education across the Bundelkhand region. All statutory permissions, fire clearances, building safety audits, and academic accreditations are strictly maintained up-to-date.
              </p>

              <div className="mt-6 grid gap-2.5 sm:gap-3 sm:grid-cols-2 text-xs font-bold text-slate-700">
                <span className="flex items-center gap-2 rounded-xl bg-white p-3 border border-slate-200/80 shadow-xs">
                  <span className="text-emerald-600 font-bold">✓</span> Registered Trust Deed
                </span>
                <span className="flex items-center gap-2 rounded-xl bg-white p-3 border border-slate-200/80 shadow-xs">
                  <span className="text-emerald-600 font-bold">✓</span> Annual Safety Audits
                </span>
                <span className="flex items-center gap-2 rounded-xl bg-white p-3 border border-slate-200/80 shadow-xs">
                  <span className="text-emerald-600 font-bold">✓</span> Certified Teaching Staff
                </span>
                <span className="flex items-center gap-2 rounded-xl bg-white p-3 border border-slate-200/80 shadow-xs">
                  <span className="text-emerald-600 font-bold">✓</span> Verified Drinking Water & Sanitation
                </span>
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

        {/* Verification Note for Parents */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 sm:p-6 text-center text-xs sm:text-sm text-amber-900">
          <p className="font-semibold leading-relaxed">
            📌 <b>Note for Parents:</b> The files available for download above are the digitally signed official recognition certificates issued by the Basic Education Department, Jhansi. Original copies are also available for inspection at our school administration office during working hours.
          </p>
        </div>

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
                Have questions regarding admission or documentation?
              </h3>
              <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-slate-200">
                Our administrative staff will guide you through transfer certificate (TC) submissions, age criteria, and enrollment guidelines.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:justify-end">
              <Link
                href="/contact/"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-sun px-6 text-sm font-extrabold text-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-400"
              >
                <span>Contact Admissions Desk</span>
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
