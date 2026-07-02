import Image from "next/image";

import { Button } from "@/components/button";
import { founderStory, marketFocus, stats } from "@/lib/site-data";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-10 sm:px-6 sm:pb-24 lg:px-8 lg:pt-14">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#f7f2ea_0%,#efe6d8_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(11,31,52,0.12),transparent_48%),radial-gradient(circle_at_top_right,rgba(176,132,92,0.18),transparent_36%)]" />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="animate-rise">
          <p className="text-xs font-semibold tracking-[0.34em] uppercase text-[var(--color-wood)]">
            Built On Legacy. Led With Personal Attention.
          </p>
          <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.02] text-[var(--color-charcoal)] sm:text-6xl lg:text-7xl">
            Luxury custom homes and high-end renovations for Dallas clients who expect clarity, craftsmanship, and a builder personally invested in every detail.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
            Led by Ben Alford, a second-generation builder, the firm serves
            Preston Hollow, University Park, Highland Park, the Park Cities, and
            surrounding Dallas luxury neighborhoods with a professional, trusted,
            and timeless approach.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="/contact">Start a Private Consultation</Button>
            <Button href="/portfolio" variant="secondary">
              View Our Work
            </Button>
            <Button href="/services" variant="ghost">
              Plan Your Custom Home
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {marketFocus.slice(0, 4).map((market) => (
              <span
                key={market}
                className="rounded-full border border-[var(--color-border-strong)] bg-white/72 px-4 py-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-charcoal)] shadow-[0_10px_30px_rgba(19,29,38,0.05)]"
              >
                {market}
              </span>
            ))}
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="rounded-[1.5rem] border border-[var(--color-border-strong)] bg-white/72 p-5 shadow-[0_18px_50px_rgba(12,18,25,0.08)] backdrop-blur-sm animate-fade"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <p className="font-serif text-3xl text-[var(--color-navy)]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade [animation-delay:120ms]">
          <div className="grid gap-4 lg:grid-cols-[0.6fr_0.4fr]">
            <div className="relative overflow-hidden rounded-[2rem] bg-[var(--color-charcoal)] p-3 shadow-[0_34px_100px_rgba(10,14,20,0.18)] lg:row-span-2">
            <div className="image-sheen relative aspect-[4/5] overflow-hidden rounded-[1.6rem]">
                <Image
                  src="/images/4301-armstrong-pkwy-hf-1-1.jpg"
                  alt="Exterior of a luxury custom home by Alford Custom Builders"
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 32vw, 100vw"
                />
              </div>
              <div className="absolute bottom-8 left-8 right-8 rounded-[1.5rem] border border-white/10 bg-[rgba(11,18,28,0.72)] p-5 text-white backdrop-blur-md">
                <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[var(--color-sand)]">
                  Builder Promise
                </p>
                <p className="mt-3 font-serif text-2xl leading-tight">
                  Personal involvement, timeless standards, and integrity when it matters.
                </p>
                <p className="mt-3 text-sm leading-7 text-white/76">
                  A relationship-driven process with direct communication, fast
                  decisions, and the accountability that comes from working
                  closely with the builder himself.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.6rem] border border-[var(--color-border-strong)] bg-white p-3 shadow-[0_18px_50px_rgba(17,24,32,0.08)]">
              <div className="image-sheen relative aspect-[4/3] overflow-hidden rounded-[1.2rem]">
                <Image
                  src="/images/4906-deloache-ave-42.jpg"
                  alt="Interior living space from an Alford Custom Builders project"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 18vw, 50vw"
                />
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-[var(--color-border-strong)] bg-[var(--color-charcoal)] p-6 text-white shadow-[0_18px_50px_rgba(17,24,32,0.1)]">
              <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[var(--color-sand)]">
                {founderStory.eyebrow}
              </p>
              <p className="mt-4 font-serif text-2xl leading-tight">
                Ben Alford leads with the kind of practical judgment that only comes from living the work for years.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/76">
                Second-generation experience paired with a classic, transitional
                point of view and a high standard for how the process should feel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
