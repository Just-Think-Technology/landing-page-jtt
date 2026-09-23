import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <p className="font-technical text-xs tracking-[0.2em] text-[#4F7CFF] uppercase">
        <span className="text-[#8A8A8A]">{index}</span>
        <span aria-hidden="true" className="mx-3 text-[#242424]">
          /
        </span>
        {eyebrow}
      </p>
      <h2 className="font-display mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#8A8A8A] sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
