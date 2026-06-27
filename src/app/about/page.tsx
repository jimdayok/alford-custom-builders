import type { Metadata } from "next";
import Image from "next/image";

import { CTA } from "@/components/cta";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { differentiators } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Alford Custom Builders and the values behind our luxury residential construction work.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="We build luxury homes with a steady process, careful hands, and a deep respect for design."
        description="Alford Custom Builders exists to deliver residential construction that feels considered at every level, from pre-construction planning to final detailing."
      />

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/placeholders/about-craft.svg"
              alt="Architectural craft placeholder"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Our Philosophy"
              title="Building well is about more than finish quality."
              description="It also requires listening well, planning with discipline, and protecting the integrity of the design throughout construction. We approach each project as a long-term investment in how a home looks, functions, and feels over time."
            />
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {differentiators.map((item) => (
                <div key={item.title} className="rounded-[1.5rem] bg-white p-6 shadow-[0_18px_50px_rgba(15,24,32,0.06)]">
                  <h3 className="font-serif text-2xl text-[var(--color-charcoal)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-8 rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 lg:grid-cols-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[var(--color-wood)]">
              What We Value
            </p>
            <h2 className="mt-4 font-serif text-4xl text-[var(--color-charcoal)]">
              Homes that feel timeless because the decisions behind them were thoughtful.
            </h2>
          </div>
          <div className="text-sm leading-8 text-[var(--color-muted)]">
            We prize calm communication, detailed planning, and construction that
            respects both architecture and daily life. That means fewer surprises,
            cleaner execution, and a project experience that feels composed.
          </div>
          <div className="text-sm leading-8 text-[var(--color-muted)]">
            Our goal is not simply to complete a scope of work. It is to help
            create a residence with lasting character, strong craftsmanship, and
            the confidence that every important detail was handled well.
          </div>
        </div>
      </section>

      <section className="section-shell pt-20">
        <CTA
          title="Tell us about the home you want to create."
          description="We’re happiest partnering with clients who care deeply about quality, clarity, and a thoughtful building experience."
          primaryHref="/contact"
          primaryLabel="Contact Us"
          secondaryHref="/portfolio"
          secondaryLabel="See Our Work"
        />
      </section>
    </>
  );
}
