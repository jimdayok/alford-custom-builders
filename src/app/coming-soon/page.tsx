import type { Metadata } from "next";
import Image from "next/image";

import { ComingSoonInquiry } from "@/components/coming-soon-inquiry";

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

      <header className="absolute inset-x-0 top-0 z-30 border-b border-white/15">
        <div className="mx-auto flex h-[6.5rem] w-full max-w-[96rem] items-center justify-between gap-5 px-5 sm:h-[7.75rem] sm:px-10 lg:px-12">
          <a href="#the-home" aria-label="Alford Custom Builders home" className="flex shrink-0 items-center gap-3 sm:gap-4">
            <span className="relative h-[3.65rem] w-[2.9rem] shrink-0 sm:h-[4.2rem] sm:w-[3.35rem]">
              <Image
                src="/brand/alford-mark.svg"
                alt=""
                fill
                preload
                unoptimized
                sizes="(max-width: 639px) 46px, 54px"
              />
            </span>
            <span className="leading-none">
              <span className="block text-[1.05rem] font-light tracking-[0.29em] text-white sm:text-[1.35rem]">ALFORD</span>
              <span className="mt-1.5 block text-[0.38rem] font-semibold tracking-[0.34em] text-white/80 sm:text-[0.46rem]">CUSTOM BUILDERS</span>
            </span>
          </a>

          <nav className="flex items-center gap-5 sm:gap-12" aria-label="Coming soon navigation">
            <a
              href="#the-home"
              className="hidden text-[0.64rem] font-semibold tracking-[0.32em] text-white/80 transition hover:text-white sm:inline"
            >
              THE HOME
            </a>
            <ComingSoonInquiry
              buttonLabel="THE BUILDER"
              buttonClassName="text-[0.64rem] font-semibold tracking-[0.32em] text-white/80 transition hover:text-white"
            />
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
