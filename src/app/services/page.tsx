import type { Metadata } from "next";

import { CTA } from "@/components/cta";
import { PageHero } from "@/components/page-hero";
import { ServiceCard } from "@/components/service-card";
import { SectionHeading } from "@/components/section-heading";
import { clientFit, processSteps, services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore custom homes, high-end remodels, and builder-led planning services from Alford Custom Homes.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Luxury custom homes and high-end remodels led with direct communication, disciplined planning, and timeless standards."
        description="Alford Custom Homes serves Dallas clients who want premium residential work handled with personal builder involvement, practical judgment, and a process that stays clear from beginning to end."
      />

      <section className="section-shell">
        <SectionHeading
          eyebrow="What We Do"
          title="Services shaped around high-touch residential work, not one-size-fits-all production building."
          description="Every service is delivered with the same priorities: quality, transparency, responsiveness, and a strong eye for what works."
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
            eyebrow="Who We Build For"
            title="The best-fit projects are the ones that benefit from close builder involvement and fast, thoughtful decisions."
            description="These are the kinds of clients and projects this company is designed to serve best."
          />
          <div className="space-y-4">
            {clientFit.map((item) => (
              <div
                key={item}
                className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-7"
              >
                <p className="text-sm leading-8 text-[var(--color-muted)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="How It Comes Together"
            title="Premium execution begins long before the first day on site."
            description="The process is intentionally lean so projects can stay organized without becoming slow or overcomplicated."
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
          description="Share your project scope, neighborhood, timeline, and design direction, and we can talk through the best next step."
          primaryHref="/contact"
          primaryLabel="Plan Your Custom Home"
          secondaryHref="/portfolio"
          secondaryLabel="View Our Work"
        />
      </section>
    </>
  );
}
