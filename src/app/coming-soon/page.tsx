import type { Metadata } from "next";
import Image from "next/image";

import { ComingSoonInquiry } from "@/components/coming-soon-inquiry";

export const metadata: Metadata = {
  title: "Coming Soon",
  description: "A more personal standard for luxury homebuilding is coming soon from Alford Custom Builders in Dallas.",
};

export default function ComingSoonPage() {
  return (
    <section className="coming-soon-page relative isolate flex min-h-svh overflow-hidden bg-[#151a22] text-white">
      <Image
        src="/images/4301-armstrong-pkwy-hf-1-1.jpg"
        alt="Alford Custom Builders residence in Dallas"
        fill
        priority
        className="-z-30 object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(10,14,20,0.94)_0%,rgba(10,14,20,0.73)_47%,rgba(10,14,20,0.34)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_20%,rgba(228,203,164,0.18),transparent_30%),linear-gradient(0deg,rgba(8,11,16,0.66),transparent_42%)]" />

      <div className="mx-auto flex min-h-svh w-full max-w-[96rem] flex-col px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
        <header className="flex items-start justify-between gap-6 border-b border-white/16 pb-6">
          <Image
            src="/logos/aclogoblue.png"
            alt="Alford Custom Builders"
            width={220}
            height={74}
            className="h-14 w-auto bg-[#151a22]/90 object-contain shadow-[0_12px_40px_rgba(0,0,0,0.22)] sm:h-16"
          />
          <div className="hidden items-center gap-3 pt-3 text-[10px] font-semibold tracking-[0.24em] uppercase text-white/60 sm:flex">
            <span className="h-2 w-2 rounded-full bg-[var(--color-sand)] shadow-[0_0_18px_var(--color-sand)]" />
            Dallas, Texas
          </div>
        </header>

        <div className="grid flex-1 items-center py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div className="max-w-4xl">
            <p className="text-[10px] font-bold tracking-[0.32em] uppercase text-[var(--color-sand)] sm:text-xs">The next chapter is taking shape</p>
            <h1 className="mt-6 font-serif text-[clamp(5rem,13vw,11.5rem)] font-normal leading-[0.68] tracking-[-0.055em]">
              Coming<br /><span className="ml-[0.34em] italic text-[var(--color-sand)]">Soon.</span>
            </h1>
            <p className="mt-9 max-w-xl text-base leading-8 text-white/72 sm:text-lg">
              A more personal standard for luxury homebuilding—defined by calm leadership, honest conversations, and exceptional execution.
            </p>
            <div className="mt-9"><ComingSoonInquiry /></div>
          </div>
        </div>

        <footer className="grid gap-5 border-t border-white/16 pt-6 text-white/58 sm:grid-cols-3 sm:items-end">
          <div>
            <p className="text-[9px] font-bold tracking-[0.26em] uppercase text-[var(--color-sand)]">Built on trust</p>
            <p className="mt-2 text-xs leading-5">Direct builder involvement from planning through closeout.</p>
          </div>
          <div>
            <p className="text-[9px] font-bold tracking-[0.26em] uppercase text-[var(--color-sand)]">Rooted in Dallas</p>
            <p className="mt-2 text-xs leading-5">Custom homes and estate renovations across Dallas neighborhoods.</p>
          </div>
          <p className="text-[9px] tracking-[0.2em] uppercase sm:text-right">© {new Date().getFullYear()} Alford Custom Builders</p>
        </footer>
      </div>
    </section>
  );
}
