import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  titleId: string;
  aside?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  titleId,
  aside,
}: SectionHeadingProps) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-teal-700">
          {eyebrow}
        </p>
        <h2 id={titleId} className="text-xl font-bold text-slate-900">
          {title}
        </h2>
      </div>
      {aside}
    </div>
  );
}
