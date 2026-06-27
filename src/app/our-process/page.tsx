import type { Metadata } from "next";

import { CTA } from "@/components/cta";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { processSteps } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "See how Alford Custom Builders approaches planning, communication, and execution for luxury residential construction.",
};

export default function OurProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Process"
        title="A thoughtful building process designed to protect quality, clarity, and momentum."
        description="Luxury projects deserve more than craftsmanship alone. They need a disciplined framework for planning, communication, and delivery."
      />

      <section className="section-shell">
        <SectionHeading
          eyebrow="How We Work"
          title="From first conversation to final walkthrough, every phase has a purpose."
          description="We believe process should reduce uncertainty and create confidence. That philosophy shapes the way we guide every project."
        />
        <div className="mt-12 space-y-6">
          {processSteps.map((item) => (
            <div
              key={item.step}
              className="grid gap-6 rounded-[2rem] border border-[var(--color-border)] bg-white p-8 lg:grid-cols-[140px_1fr]"
            >
              <div>
                <p className="text-sm font-semibold tracking-[0.32em] uppercase text-[var(--color-wood)]">
                  {item.step}
                </p>
              </div>
              <div>
                <h2 className="font-serif text-3xl text-[var(--color-charcoal)]">
                  {item.title}
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-8 text-[var(--color-muted)]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-8 rounded-[2rem] bg-[var(--color-surface)] p-8 lg:grid-cols-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[var(--color-wood)]">
              Client Experience
            </p>
            <h2 className="mt-4 font-serif text-4xl text-[var(--color-charcoal)]">
              Organized communication is part of the finished product.
            </h2>
          </div>
          <p className="text-sm leading-8 text-[var(--color-muted)]">
            We structure our projects to keep decisions moving, budgets visible,
            and the construction environment orderly. That reduces friction and
            supports a better outcome for everyone involved.
          </p>
          <p className="text-sm leading-8 text-[var(--color-muted)]">
            The result is a process that feels measured and premium, with fewer
            surprises and more confidence in the work taking place behind the walls
            and in every finished surface.
          </p>
        </div>
      </section>

      <section className="section-shell pt-20">
        <CTA
          title="Want to see how this process could apply to your home?"
          description="Reach out and we can talk through your timeline, goals, and the level of support your project needs."
          primaryHref="/contact"
          primaryLabel="Get In Touch"
        />
      </section>
    </>
  );
}
