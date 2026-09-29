import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Choose a Preview | Alford Custom Builders",
  description: "Explore the Alford Custom Builders website previews.",
  robots: { index: false, follow: false },
};

const previews = [
  {
    title: "Preview 1",
    description: "The original website direction.",
    href: "https://preview1.alfordcustombuilders.com/",
    label: "Open Preview 1",
  },
  {
    title: "Preview 2",
    description: "The updated image-led direction.",
    href: "https://preview2.alfordcustombuilders.com/",
    label: "Open Preview 2",
  },
  {
    title: "Preview 3",
    description: "The new walk-through concept on this server.",
    href: "/preview-3",
    label: "Open Preview 3",
  },
] as const;

export default function PreviewLandingPage() {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-[#16222d] text-white">
      <Image
        src="/images/hero-journey/greenbrier-wide.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,rgba(10,24,35,0.90),rgba(10,24,35,0.68)_54%,rgba(10,24,35,0.38))]" />
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pb-12 pt-8 sm:px-10 sm:pt-12 lg:px-14">
        <div className="flex items-center justify-between gap-6">
          <Image
            src="/logos/alfordtemplogo.png"
            alt="Alford Custom Builders"
            width={240}
            height={120}
            priority
            className="h-auto w-36 brightness-0 invert sm:w-48"
          />
          <span className="text-right text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/70 sm:text-xs">
            Website previews
          </span>
        </div>
        <div className="my-auto max-w-5xl py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#dbc3a5]">Alford Custom Builders</p>
          <h1 className="mt-6 font-serif text-[clamp(3.4rem,8vw,7.5rem)] leading-[0.94] tracking-[-0.045em]">
            Choose a preview.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
            Explore each direction and return here whenever you want to compare them.
          </p>
          <nav aria-label="Website preview versions" className="mt-12 grid gap-4 md:grid-cols-3">
            {previews.map((preview) => (
              <a
                key={preview.title}
                href={preview.href}
                aria-label={preview.label}
                className="group flex min-h-48 flex-col justify-between rounded-[1.4rem] border border-white/30 bg-[#102331]/70 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.16)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#dbc3a5] hover:bg-[#102331]/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dbc3a5]"
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="font-serif text-3xl">{preview.title}</span>
                  <span aria-hidden="true" className="text-2xl text-[#dbc3a5] transition group-hover:translate-x-1">↗</span>
                </span>
                <span className="mt-6 text-sm leading-6 text-white/75">{preview.description}</span>
              </a>
            ))}
          </nav>
        </div>
        <p className="text-xs tracking-[0.14em] text-white/60">Private review · The public website remains unchanged.</p>
      </div>
    </section>
  );
}
