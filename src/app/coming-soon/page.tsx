import type { Metadata } from "next";
import Image from "next/image";

import { ComingSoonInquiry } from "@/components/coming-soon-inquiry";

export const metadata: Metadata = {
  title: "Coming Soon",
  description: "A more personal standard for luxury homebuilding is coming soon from Alford Custom Builders in Dallas.",
};

export default function ComingSoonPage() {
  return (
    <section className="coming-soon-page relative isolate min-h-svh overflow-hidden bg-[#111b29] text-white">
      <Image
        src="/logos/aclogoblue.png"
        alt="Alford Custom Builders"
        fill
        priority
        className="-z-30 object-contain object-center md:object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(8,15,25,0.08)_35%,rgba(8,15,25,0.2)_62%,rgba(8,15,25,0.72)_100%)]" />

      <main className="mx-auto flex min-h-svh w-full max-w-[100rem] items-end justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-7 sm:pb-7 lg:px-10 lg:pb-10">
        <div className="grid w-full max-w-5xl items-center gap-5 rounded-[1.75rem] border border-[#ead6b6]/24 bg-[#08111e]/78 px-6 py-5 shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:px-8 sm:py-6 md:grid-cols-[1fr_auto] md:gap-8">
          <div>
            <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#e4cba4] sm:text-[10px]">The next chapter is taking shape</p>
            <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] font-normal leading-none tracking-[-0.035em] text-white">Coming Soon</h1>
              <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-white/52">Dallas, Texas</p>
            </div>
          </div>
          <ComingSoonInquiry buttonLabel="Click Here to Contact Us" />
        </div>
      </main>
    </section>
  );
}
