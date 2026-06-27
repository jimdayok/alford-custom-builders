import type { Metadata } from "next";

import { CTA } from "@/components/cta";
import { PageHero } from "@/components/page-hero";
import { ServiceCard } from "@/components/service-card";
import { SectionHeading } from "@/components/section-heading";
import { processSteps, services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore custom homes, renovations, additions, and pre-construction services from Alford Custom Builders.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Residential construction services tailored for complex, design-forward homes."
        description="We support our clients from the earliest planning conversations through closeout, with clear communication and premium execution at every phase."
      />

      <section className="section-shell">
        <SectionHeading
          eyebrow="What We Do"
          title="A full suite of services for custom homes and transformative renovations."
          description="Every service is delivered with the same focus on planning, material quality, and a seamless client experience."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="How It Comes Together"
            title="Premium execution begins long before the first day on site."
            description="Our process supports design integrity, financial clarity, and build quality through every stage of the project."
          />
          <div className="space-y-5">
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-7"
              >
                <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[var(--color-wood)]">
                  {item.step}
                </p>
                <h3 className="mt-3 font-serif text-2xl text-[var(--color-charcoal)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-20">
        <CTA
          title="Need a builder who can lead both planning and execution?"
          description="We would be glad to learn about your project scope, design team, timeline, and priorities."
          primaryHref="/contact"
          primaryLabel="Schedule A Consultation"
        />
      </section>
    </>
  );
}
