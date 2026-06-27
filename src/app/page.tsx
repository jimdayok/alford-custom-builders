import type { Metadata } from "next";
import Link from "next/link";

import { CTA } from "@/components/cta";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { Testimonial } from "@/components/testimonial";
import {
  differentiators,
  featuredProjects,
  processSteps,
  services,
  siteConfig,
  testimonials,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Luxury Residential Construction",
  description:
    "Explore Alford Custom Builders for luxury custom homes, refined renovations, and a high-touch construction experience.",
};

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Hero />

      <section className="section-shell">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Distinctive homes shaped around architecture, craftsmanship, and the way people truly live."
          description="Every project is built to feel composed, warm, and enduring. Our portfolio reflects careful material choices, thoughtful detailing, and a commitment to execution that honors the original design intent."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Services"
            title="Comprehensive residential construction for homes that require more than standard execution."
            description="From new construction to transformative renovations, our work is guided by planning, restraint, and meticulous finish quality."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {services.slice(0, 4).map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Why Choose Alford"
            title="A premium build experience depends on both craftsmanship and the discipline behind it."
            description="We bring together design sensitivity, project leadership, and trusted trade execution to create homes of lasting quality."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-7 shadow-[0_18px_60px_rgba(20,26,35,0.06)]"
              >
                <h3 className="font-serif text-2xl text-[var(--color-charcoal)]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeading
          eyebrow="Our Process"
          title="A clear process allows luxury projects to move with less friction and more confidence."
          description="We believe great homes are built through strong early planning, consistent communication, and careful finish management all the way to completion."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-4">
          {processSteps.map((item) => (
            <div
              key={item.step}
              className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-7"
            >
              <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[var(--color-wood)]">
                {item.step}
              </p>
              <h3 className="mt-4 font-serif text-3xl text-[var(--color-charcoal)]">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-navy)] px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Testimonials"
            title="Clients remember how the process felt as much as how the home looks."
            description="We aim to create a measured, elevated experience from first concept through final delivery."
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <Testimonial key={item.quote} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-20">
        <CTA
          title="Ready to build something enduring?"
          description="Whether you are planning a custom residence, a major renovation, or a carefully integrated addition, we would love to hear about your vision."
          primaryHref="/contact"
          primaryLabel="Start Your Project"
          secondaryHref="/services"
          secondaryLabel="Explore Services"
        />
      </section>

      <section className="px-5 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <Link
            href="/our-process"
            className="text-sm font-semibold tracking-[0.18em] uppercase text-[var(--color-navy)] transition hover:text-[var(--color-wood)]"
          >
            Learn more about our process
          </Link>
        </div>
      </section>
    </>
  );
}
