import type { Metadata } from "next";
import Image from "next/image";

import { ComingSoonInquiry } from "@/components/coming-soon-inquiry";

const navItemGroupClassName = "group relative text-[0.72rem] font-light tracking-[0.28em] sm:text-[0.86rem]";
const navItemClassName = "leading-normal text-white/85 transition-colors hover:text-white";
const navTooltipClassName = "pointer-events-none absolute top-full left-1/2 mt-3 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full border border-white/20 bg-[#102538]/90 px-3 py-1.5 text-[0.5rem] font-semibold tracking-[0.24em] text-white opacity-0 shadow-lg backdrop-blur-md transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100";

export const metadata: Metadata = {
  title: "6207 Prestonshire | Coming Soon",
  description: "Luxury, personalized. A new Alford Custom Builders residence is coming soon to 6207 Prestonshire in Preston Hollow.",
};

export default function ComingSoonPage() {
  return (
    <section
      id="the-home"
      className="coming-soon-page relative isolate min-h-svh overflow-hidden bg-[#1b2834] text-white"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/prestonshire-coming-soon.jpg"
          alt="Architectural rendering of the residence planned for 6207 Prestonshire in Preston Hollow"
          fill
          preload
          unoptimized
          className="object-cover object-[58%_center] sm:object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(16,30,43,0.52)_0%,rgba(12,22,31,0.36)_42%,rgba(8,14,20,0.52)_100%)]" />

      <header className="absolute inset-x-0 top-0 z-30 border-b border-white/15 bg-[rgba(12,29,44,0.18)]">
        <div className="mx-auto flex h-[6.5rem] w-full max-w-[96rem] items-center justify-between gap-5 px-5 sm:h-[7.75rem] sm:px-10 lg:px-12">
          <a href="#the-home" aria-label="Alford Custom Builders home" className="relative h-16 w-48 shrink-0 overflow-hidden sm:h-[4.5rem] sm:w-60">
            <Image
              src="/logos/alfordtemplogo.png"
              alt="Alford Custom Builders"
              width={1000}
              height={562}
              preload
              unoptimized
              sizes="(max-width: 639px) 12rem, 15rem"
              className="absolute top-1/2 left-0 h-auto w-full -translate-y-1/2"
            />
          </a>

          <nav className="flex items-center gap-5 sm:gap-12" aria-label="Coming soon navigation">
            <span className={`${navItemGroupClassName} hidden sm:inline-flex`}>
              <a href="#the-home" className={navItemClassName}>
                THE HOME
              </a>
              <span aria-hidden="true" className={navTooltipClassName}>COMING SOON</span>
            </span>
            <span className={`${navItemGroupClassName} inline-flex`}>
              <ComingSoonInquiry
                buttonLabel="THE BUILDER"
                buttonClassName={navItemClassName}
              />
              <span aria-hidden="true" className={navTooltipClassName}>COMING SOON</span>
            </span>
          </nav>
        </div>
      </header>

      <main className="relative z-20 mx-auto flex min-h-svh w-full max-w-[96rem] items-center justify-center px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[8.5rem] text-center sm:px-10 sm:pt-[10rem] lg:px-12">
        <div className="-translate-y-[1vh] sm:translate-y-[3vh]">
          <h1 className="font-serif text-[clamp(4.15rem,9.2vw,8.9rem)] font-normal leading-[0.78] tracking-[-0.055em] text-[#f7f3ec] [text-shadow:0_3px_28px_rgba(0,0,0,0.34)]">
            Luxury. Personalized.
          </h1>
          <p className="mt-10 text-[0.68rem] font-semibold tracking-[0.34em] text-white/92 sm:mt-12 sm:text-[0.9rem]">
            6207 PRESTONSHIRE <span aria-hidden="true">·</span> PRESTON HOLLOW
          </p>
          <p className="mt-5 text-[0.68rem] font-semibold tracking-[0.42em] text-white sm:text-[0.86rem]">
            COMING SOON
          </p>
        </div>
      </main>
    </section>
  );
}
