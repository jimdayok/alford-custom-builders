import type { Metadata } from "next";

import { Button } from "@/components/button";
import { PageHero } from "@/components/page-hero";
import { serviceAreaDetails, siteConfig } from "@/lib/site-data";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Explore the Dallas neighborhoods and communities served by Alford Custom Homes, including Preston Hollow, Highland Park, University Park, and the Park Cities.",
};

export default function ServiceAreasPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Service Areas", url: `${siteConfig.url}/service-areas` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        eyebrow="Service Areas"
        title="Luxury custom homes and high-end remodels across Dallas neighborhoods where trust, design, and execution all matter."
        description="Alford Custom Homes focuses on communities where architecture, property context, and long-term value deserve a builder who stays personally involved from planning through closeout."
      />

      <section className="section-shell">
        <div className="grid gap-6 lg:grid-cols-2">
          {serviceAreaDetails.map((area) => (
            <article
              id={area.slug}
              key={area.slug}
              className="scroll-mt-32 rounded-[2rem] border border-[var(--color-border)] bg-white p-8 shadow-[0_20px_70px_rgba(15,24,34,0.06)]"
            >
              <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[var(--color-wood)]">
                Dallas Service Area
              </p>
              <h2 className="mt-4 font-serif text-4xl text-[var(--color-charcoal)]">
                {area.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
                {area.description}
              </p>
              <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
                Clients in {area.title} typically value direct communication,
                thoughtful design coordination, disciplined budgeting, and the
                peace of mind that comes from working closely with the builder
                leading the project.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/portfolio" variant="primary">
                  View Work
                </Button>
                <Button href="/contact" variant="secondary">
                  Schedule a Consultation
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
