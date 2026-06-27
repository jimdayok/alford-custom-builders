import Image from "next/image";

import { Button } from "@/components/button";
import { stats } from "@/lib/site-data";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-10 sm:px-6 sm:pb-24 lg:px-8 lg:pt-14">
      <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(18,38,58,0.08),transparent_55%),radial-gradient(circle_at_top_right,rgba(126,90,63,0.08),transparent_45%)]" />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="animate-rise">
          <p className="text-xs font-semibold tracking-[0.34em] uppercase text-[var(--color-wood)]">
            Alford Custom Builders
          </p>
          <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.02] text-[var(--color-charcoal)] sm:text-6xl lg:text-7xl">
            Luxury homes built with architectural discipline and quiet confidence.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
            We craft high-end custom homes, transformative renovations, and
            detail-rich additions for homeowners who value timeless design,
            rigorous execution, and an elevated building experience.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="/portfolio">View Portfolio</Button>
            <Button href="/contact" variant="ghost">
              Start Your Project
            </Button>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="rounded-[1.5rem] border border-[var(--color-border)] bg-white/70 p-5 shadow-[0_14px_40px_rgba(12,18,25,0.06)] backdrop-blur-sm animate-fade"
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
          <div className="relative overflow-hidden rounded-[2rem] bg-[var(--color-charcoal)] p-3 shadow-[0_30px_90px_rgba(10,14,20,0.18)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
              <Image
                src="/images/placeholders/hero-estate.svg"
                alt="Architectural exterior placeholder for a luxury residence"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            </div>
            <div className="absolute bottom-8 left-8 right-8 rounded-[1.5rem] border border-white/10 bg-[rgba(11,18,28,0.72)] p-5 text-white backdrop-blur-md">
              <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[var(--color-sand)]">
                Signature Approach
              </p>
              <p className="mt-3 font-serif text-2xl leading-tight">
                Elegant homes shaped through craftsmanship, planning, and
                uncompromising attention to detail.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
