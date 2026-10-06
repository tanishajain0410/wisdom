import { InteriorPage } from "@/components/InteriorPage";
import { AdmissionForm } from "@/components/AdmissionForm";

const contactFaqs = [
  {
    q: "What is the age requirement for Play Group and Nursery?",
    a: "Children should be 2.5 to 3 years old for Play Group, and 3 to 4 years old for Nursery as of March 31st of the academic session.",
  },
  {
    q: "Is school transport available in and around Mauranipur?",
    a: "Yes, supervised school vans cover major routes and surrounding neighborhoods of Mauranipur with verified drivers.",
  },
  {
    q: "Can parents tour the school before taking admission?",
    a: "Absolutely! We encourage parents to tour the classrooms, inspect the amenities, and meet the teachers from Monday to Saturday between 8:00 AM and 3:00 PM.",
  },
  {
    q: "What documents are required for student admission?",
    a: "Birth certificate, child's and parents' Aadhaar cards, passport-sized photographs, and a Transfer Certificate (TC) from the previous school if applicable.",
  },
];

export default function ContactPage() {
  const mapQueryUrl =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      "Parwaripura Mohalla, Bus Stand, near Tikamgarh, Mauranipur, Roni, Uttar Pradesh 284204"
    );

  return (
    <InteriorPage
      eyebrow="Come Visit Us"
      title="Let’s talk about your child’s educational journey."
      description="Our admissions team and school counselors are here to help with grade placement, curriculum details, fee structures, and campus walk-throughs in Mauranipur."
    >
      <div className="space-y-16 lg:space-y-24">
        {/* Top Metric Highlights Bar */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">📞</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">Direct Call</b>
            <p className="mt-1 text-xs text-slate-500">+91 70111 60057 for quick enquiry & fee details.</p>
          </div>
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">🕒</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">8 AM – 3 PM</b>
            <p className="mt-1 text-xs text-slate-500">School reception & counseling open Monday to Saturday.</p>
          </div>
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">📍</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">Mauranipur</b>
            <p className="mt-1 text-xs text-slate-500">Parwaripura Mohalla, near Bus Stand & Tikamgarh Rd.</p>
          </div>
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md">
            <span className="text-2xl">✉️</span>
            <b className="mt-3 block font-display text-2xl font-black text-navy">Email Desk</b>
            <p className="mt-1 text-xs text-slate-500">24-hour response on admission enquiries.</p>
          </div>
        </section>

        {/* 3 Quick Contact Cards with Circular 1, 2, 3 Badges */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Call Us Card */}
          <a
            href="tel:+917011160057"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 shadow-[0_12px_36px_rgba(15,43,79,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400/80 hover:shadow-[0_22px_45px_rgba(34,197,94,0.18)]"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-gradient-to-br from-emerald-100/50 to-transparent blur-2xl transition-all duration-300 group-hover:scale-125 group-hover:from-emerald-200/60" />

            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-[#2ecc71] via-[#22c55e] to-[#15803d] text-white shadow-[0_8px_22px_rgba(34,197,94,0.38)] ring-4 ring-emerald-500/10 transition-all duration-300 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="size-7" fill="currentColor">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.053 15.053 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1.01A11.36 11.36 0 0 1 8.57 3.9c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.52c0-.55-.45-1-.99-1z" />
                  </svg>
                </div>
                <span className="inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 font-display text-sm font-black text-navy shadow-xs group-hover:border-emerald-500 group-hover:bg-emerald-50 group-hover:text-emerald-800 transition-all">
                  1
                </span>
              </div>

              <span className="block text-xs font-extrabold uppercase tracking-wider text-emerald-600">
                Direct Helpline
              </span>
              <b className="mt-1 block font-display text-2xl font-black text-navy">Call us</b>
              <span className="mt-3 block text-lg font-bold text-slate-800 transition-colors group-hover:text-emerald-700">
                +91 70111 60057
              </span>
              <p className="mt-1 text-sm text-slate-500">
                Mon – Sat · 8:00 AM to 3:00 PM
              </p>
            </div>

            <div className="relative mt-7 flex items-center border-t border-slate-100 pt-4 text-sm font-extrabold text-emerald-600 transition-colors group-hover:text-emerald-700">
              <span>Call admissions</span>
              <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1.5">→</span>
            </div>
          </a>

          {/* Email Us Card */}
          <a
            href="mailto:wisdominternational.mau@gmail.com"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 shadow-[0_12px_36px_rgba(15,43,79,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-400/80 hover:shadow-[0_22px_45px_rgba(37,99,235,0.18)]"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-gradient-to-br from-blue-100/50 to-transparent blur-2xl transition-all duration-300 group-hover:scale-125 group-hover:from-blue-200/60" />

            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-[#38bdf8] via-[#2563eb] to-[#1d4ed8] text-white shadow-[0_8px_22px_rgba(37,99,235,0.38)] ring-4 ring-blue-500/10 transition-all duration-300 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="size-7" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <span className="inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 font-display text-sm font-black text-navy shadow-xs group-hover:border-blue-500 group-hover:bg-blue-50 group-hover:text-blue-800 transition-all">
                  2
                </span>
              </div>

              <span className="block text-xs font-extrabold uppercase tracking-wider text-blue-600">
                Online Enquiry
              </span>
              <b className="mt-1 block font-display text-2xl font-black text-navy">Email us</b>
              <span className="mt-3 block break-all text-sm font-bold text-slate-800 transition-colors group-hover:text-blue-700">
                wisdominternational.mau@gmail.com
              </span>
              <p className="mt-1 text-sm text-slate-500">
                Prompt response within 24 hours
              </p>
            </div>

            <div className="relative mt-7 flex items-center border-t border-slate-100 pt-4 text-sm font-extrabold text-blue-600 transition-colors group-hover:text-blue-700">
              <span>Send an email</span>
              <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1.5">→</span>
            </div>
          </a>

          {/* Visit Us Card */}
          <a
            href={mapQueryUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 shadow-[0_12px_36px_rgba(15,43,79,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-red-400/80 hover:shadow-[0_22px_45px_rgba(239,68,68,0.18)]"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-gradient-to-br from-red-100/50 to-transparent blur-2xl transition-all duration-300 group-hover:scale-125 group-hover:from-red-200/60" />

            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-[#f87171] via-[#ef4444] to-[#b91c1c] text-white shadow-[0_8px_22px_rgba(239,68,68,0.38)] ring-4 ring-red-500/10 transition-all duration-300 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="size-7" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 font-display text-sm font-black text-navy shadow-xs group-hover:border-red-500 group-hover:bg-rose-50 group-hover:text-[#9c271e] transition-all">
                  3
                </span>
              </div>

              <span className="block text-xs font-extrabold uppercase tracking-wider text-red-600">
                Campus Location
              </span>
              <b className="mt-1 block font-display text-2xl font-black text-navy">Visit us</b>
              <span className="mt-3 block text-sm font-bold text-slate-800 transition-colors group-hover:text-red-700">
                Parwaripura Mohalla, Bus Stand
              </span>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                Near Tikamgarh, Mauranipur, Roni<br />
                Uttar Pradesh 284204
              </p>
            </div>

            <div className="relative mt-7 flex items-center border-t border-slate-100 pt-4 text-sm font-extrabold text-red-600 transition-colors group-hover:text-red-700">
              <span>Open in Google Maps</span>
              <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1.5">→</span>
            </div>
          </a>
        </div>

        {/* 2-Column Section: Campus Details & Interactive Online Enquiry Form */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          {/* Left Column: Office Hours & Location Guidance */}
          <div className="space-y-8">
            <div className="rounded-[28px] sm:rounded-[32px] border border-slate-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
              <span className="eyebrow text-coral">Visiting Hours</span>
              <h3 className="mt-2 font-display text-2xl font-black text-navy sm:text-3xl">
                When can you visit our school?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Our administrative staff and admission counselors are available every weekday and Saturday to assist you with inquiries, campus walk-throughs, and form submissions.
              </p>

              <div className="mt-6 space-y-3 text-sm font-bold text-slate-700">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-slate-50 p-4 border border-slate-200/70">
                  <span className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span>Monday to Saturday</span>
                  </span>
                  <span className="text-navy font-black sm:text-right">8:00 AM – 3:00 PM</span>
                </div>

                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-slate-50 p-4 border border-slate-200/70">
                  <span className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-amber-500 shrink-0" />
                    <span>Sunday & Public Holidays</span>
                  </span>
                  <span className="text-slate-500 font-semibold sm:text-right">Prior Appointment</span>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-6">
                <h4 className="font-display text-base font-bold text-navy">
                  📍 How to reach our campus:
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Located conveniently in Mauranipur, Jhansi, close to the main Bus Stand area and easily accessible from Tikamgarh road. Parents can take local e-rickshaws or autos directly to Parwaripura Mohalla.
                </p>
                <div className="mt-5">
                  <a
                    href={mapQueryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-navy bg-white px-4 py-2.5 text-xs font-bold text-navy transition hover:bg-navy hover:text-white"
                  >
                    <span>🗺️ Navigate via Google Maps</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Helpline Callout Card */}
            <div className="rounded-[24px] sm:rounded-3xl bg-gradient-to-br from-navy-deep to-navy p-6 sm:p-8 text-white shadow-lg">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-sun">
                <span>⚡</span> Immediate Support
              </span>
              <h4 className="mt-3 font-display text-xl font-bold text-white">
                Have a quick question about admissions?
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                Call our admissions team directly at +91 70111 60057 for fee details, syllabus structure, and seat availability.
              </p>
              <div className="mt-5">
                <a
                  href="tel:+917011160057"
                  className="inline-flex items-center gap-2 rounded-xl bg-sun px-5 py-2.5 text-xs font-extrabold text-navy shadow-md transition hover:bg-amber-400"
                >
                  <span>📞 Call +91 70111 60057</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Online Admission Enquiry Form */}
          <div className="overflow-hidden rounded-[28px] sm:rounded-[32px] border border-slate-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-lg">
            <span className="eyebrow text-coral">Direct Online Form</span>
            <h3 className="mt-2 font-display text-2xl font-black text-navy sm:text-3xl">
              Submit an Admission Enquiry
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Fill in your contact details below, and our admissions team will get in touch with you shortly.
            </p>
            <div className="mt-6 border-t border-slate-100 pt-6">
              <AdmissionForm theme="light" hideHeader />
            </div>
          </div>
        </div>

        {/* Helpful Parent FAQs Section */}
        <section className="rounded-[28px] sm:rounded-[36px] border border-slate-200/90 bg-gradient-to-b from-[#f8fafc] to-white p-6 sm:p-10 lg:p-16 shadow-sm">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-sun/60 bg-sun/10 px-3.5 py-1 text-xs font-bold text-[#a96800]">
              <span>❓</span> Admissions FAQ
            </span>
            <h3 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-black text-navy">
              Frequently asked questions by parents
            </h3>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Common questions answered to make your school visit and admission process smooth.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 grid gap-6 sm:grid-cols-2">
            {contactFaqs.map((faq, index) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs transition hover:shadow-md hover:border-slate-300"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-[#9c271e]">
                    Q{index + 1}
                  </span>
                  <h4 className="font-display text-base font-bold text-navy">
                    {faq.q}
                  </h4>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:pl-11">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </InteriorPage>
  );
}
