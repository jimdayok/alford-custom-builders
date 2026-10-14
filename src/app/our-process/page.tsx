import type { Metadata } from "next";

import { CTA } from "@/components/cta";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { getAboutPageContent, getProcessSteps } from "@/lib/cms/published-content";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "See how Alford Custom Builders approaches planning, communication, and execution for Dallas luxury custom homes and remodels.",
};

export default async function OurProcessPage() {
  const [processSteps, about] = await Promise.all([getProcessSteps(), getAboutPageContent()]);
  const brandPillars = about.data.brandPillars;
  return (
    <>
      <PageHero
        eyebrow="Our Process"
        title="A lean, relationship-led process designed to protect quality, clarity, and momentum."
        description="Alford Custom Builders believes homeowners should feel guided through every stage of the project with clear communication, budget clarity, timeline discipline, and direct builder accountability."
      />

      <section className="section-shell">
        <SectionHeading
          eyebrow="How We Work"
          title="From first conversation to final walkthrough, every phase is built to reduce friction."
          description="The goal is not to bury good work under red tape. It is to keep the project moving while preserving trust, finish quality, and smart decision-making."
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
            Ben Alford identified communication, transparency, and quality as the
            things his best clients value most. This process is designed to make
            those qualities obvious all the way through the build.
          </p>
          <p className="text-sm leading-8 text-[var(--color-muted)]">
            The result is a premium building experience with fewer surprises, more
            confidence, and a builder who stays personally engaged in the work.
          </p>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeading
          eyebrow="What Guides The Work"
          title="Process matters because values only mean something when clients can feel them."
          description="These standards shape how projects are managed, how decisions are made, and how issues are handled."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
      </section>

      <section className="section-shell pt-20">
        <CTA
          title="Want to see how this process could apply to your home?"
          description="Reach out and we can talk through your timeline, neighborhood, goals, and the level of support your project needs."
          primaryHref="/contact"
          primaryLabel="Discuss Your Build"
        />
      </section>
    </>
  );
}
