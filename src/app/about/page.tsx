import type { Metadata } from "next";
import Image from "next/image";

import { CTA } from "@/components/cta";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import {
  brandPillars,
  differentiators,
  founderStory,
  marketFocus,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Ben Alford, the second-generation story behind Alford Custom Homes, and the values guiding each Dallas project.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A second-generation builder creating timeless Dallas homes with personal attention and clear accountability."
        description="Alford Custom Homes was shaped around legacy, relationships, and the belief that premium residential construction should feel trusted, orderly, and personally led from first conversation through final detail review."
      />

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/4301-armstrong-pkwy-hf-1-154.jpg"
              alt="Interior architectural detail from an Alford Custom Homes project"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow={founderStory.eyebrow}
              title={founderStory.title}
              description={founderStory.description}
            />
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {differentiators.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] bg-white p-6 shadow-[0_18px_50px_rgba(15,24,32,0.06)]"
                >
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
              Legacy And Values
            </p>
            <h2 className="mt-4 font-serif text-4xl text-[var(--color-charcoal)]">
              The business is built on doing the work well and standing behind it.
            </h2>
          </div>
          <div className="text-sm leading-8 text-[var(--color-muted)]">
            Ben Alford learned the business from his dad and sees this company as
            a continuation of that legacy. The goal is not to chase trends. It is
            to build homes that feel classic, memorable, and worth the investment.
          </div>
          <div className="text-sm leading-8 text-[var(--color-muted)]">
            Clients choose Alford Custom Homes for relationships, communication,
            professionalism, and the confidence that if something needs to be made
            right, it will be handled the right way.
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="What Matters Here"
            title="The brand is meant to feel trusted, professional, classic, and best-in-class."
            description="Those qualities came through repeatedly in the discovery work, and they define how the company wants to show up in the market."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {brandPillars.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-7 shadow-[0_18px_60px_rgba(20,26,35,0.06)]"
              >
                <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[var(--color-wood)]">
                  {item.title}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="rounded-[2rem] bg-[var(--color-charcoal)] px-8 py-10 text-white shadow-[0_30px_90px_rgba(10,14,20,0.16)] lg:px-10">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-sand)]">
            Dallas Focus
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
            Designed for clients in North Dallas neighborhoods where trust and reputation lead the conversation.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {marketFocus.map((market) => (
              <span
                key={market}
                className="rounded-full border border-white/12 bg-white/[0.05] px-4 py-3 text-sm tracking-[0.14em] uppercase text-white/78"
              >
                {market}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-20">
        <CTA
          title="Tell us about the home or remodel you want to create."
          description="If you want a builder who values communication, quality, and a clean process, Alford Custom Homes would love to hear about your plans."
          primaryHref="/contact"
          primaryLabel="Discuss Your Build"
          secondaryHref="/portfolio"
          secondaryLabel="View Our Work"
        />
      </section>
    </>
  );
}
