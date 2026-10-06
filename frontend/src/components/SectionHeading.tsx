import React from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-8 sm:mb-12 flex flex-col justify-between gap-4 sm:gap-5 md:flex-row md:items-end">
      <div>
        <p className={`eyebrow mb-2 sm:mb-3.5 ${light ? "text-sun" : "text-coral"}`}>
          {eyebrow}
        </p>
        <h2
          className={`max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] sm:leading-[1.08] tracking-tight ${
            light ? "text-white" : "text-navy"
          }`}
        >
          {title}
        </h2>
      </div>
      {description && (
        <p
          className={`max-w-sm md:max-w-md text-sm sm:text-base leading-relaxed ${
            light ? "text-slate-300" : "text-slate-500"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
