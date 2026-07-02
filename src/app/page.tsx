import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CTA } from "@/components/cta";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import {
  brandPillars,
  differentiators,
  featuredProjects,
  founderHighlights,
  founderStory,
  journalTopics,
  marketFocus,
  processSteps,
  recentWork,
  services,
  siteConfig,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Dallas Luxury Custom Homes And High-End Renovations",
  description:
    "Luxury custom homes and high-end renovations for Dallas clients who expect clarity, craftsmanship, and a builder personally invested in every detail.",
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
    areaServed: marketFocus,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Hero />

      <section className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div className="section-panel rounded-[2rem] p-8 lg:p-10">
            <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--color-wood)]">
              Founder-Led
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-[var(--color-charcoal)] sm:text-5xl">
              {founderStory.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              Alford Custom Builders is positioned for clients in Preston Hollow,
              University Park, Highland Park, and the surrounding Dallas luxury
              neighborhoods who want more than a standard builder experience.
            </p>
            <div className="mt-8 space-y-4">
              {founderHighlights.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 text-sm leading-7 text-[var(--color-muted)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="What We Build"
              title="Luxury custom homes and high-end remodels for Dallas clients who want clarity, craftsmanship, and lasting value."
              description="The work is tailored for timeless, transitional residences and a project experience that feels direct, refined, and well-managed from the first meeting forward."
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {services.slice(0, 4).map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Why Clients Choose Alford"
            title="A premium homebuilding experience should feel personal, capable, and quietly well-run."
            description="The differentiator is not noise. It is direct involvement, faster decisions, clear updates, and the confidence that the builder is truly invested in the result."
          />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="group rounded-[1.85rem] border border-[var(--color-border-strong)] bg-white p-7 shadow-[0_22px_70px_rgba(20,26,35,0.07)] transition duration-300 hover:-translate-y-1"
              >
                <div className="h-px w-16 bg-[var(--color-wood)] transition duration-300 group-hover:w-24" />
                <h3 className="mt-5 font-serif text-2xl text-[var(--color-charcoal)]">
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
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[2rem] bg-[var(--color-charcoal)] p-3 shadow-[0_30px_90px_rgba(10,14,20,0.18)]">
            <div className="image-sheen relative aspect-[5/4] overflow-hidden rounded-[1.6rem]">
              <Image
                src="/images/6707Stefani-71.jpg"
                alt="Interior view from an Alford Custom Builders residence"
                fill
                className="object-cover transition duration-700 hover:scale-[1.02]"
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
            </div>
            <div className="absolute inset-x-8 bottom-8 rounded-[1.5rem] border border-white/10 bg-[rgba(11,18,28,0.74)] px-6 py-5 text-white backdrop-blur-md">
              <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[var(--color-sand)]">
                Dallas Credibility
              </p>
              <p className="mt-3 font-serif text-2xl leading-tight">
                Built for Preston Hollow, the Park Cities, and the neighborhoods where details and reputation both matter.
              </p>
            </div>
          </div>

          <div className="section-panel rounded-[2rem] p-8 lg:p-10">
            <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--color-wood)]">
              Neighborhood Focus
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-[var(--color-charcoal)] sm:text-5xl">
              Natural credibility in Dallas luxury neighborhoods.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              Alford Custom Builders is positioned for clients in Preston Hollow,
              University Park, Highland Park, the Park Cities, and surrounding
              affluent Dallas neighborhoods who want timeless homes and a builder
              who stays close to the work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {marketFocus.map((market) => (
                <span
                  key={market}
                  className="rounded-full border border-[var(--color-border)] bg-white px-4 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[var(--color-charcoal)]"
                >
                  {market}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeading
          eyebrow="Featured Work"
          title="Classic, transitional homes with the kind of finish and presence that feel timeless."
          description="The portfolio should feel understated and expensive. Real project photography already gives the brand that credibility."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <SectionHeading
            eyebrow="Recent Work"
            title="A refined section ready for project photography, field updates, and future Instagram-led storytelling."
            description="This gives the site a living layer of social proof now, while also creating an elegant place for future recent work, behind-the-scenes progress, or curated project journal content."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {recentWork.map((item, index) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-[1.85rem] border border-[var(--color-border)] bg-white shadow-[0_22px_70px_rgba(20,26,35,0.07)]"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="image-sheen relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    sizes="(min-width: 768px) 30vw, 100vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold tracking-[0.26em] uppercase text-[var(--color-wood)]">
                    {item.label}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl text-[var(--color-charcoal)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Our Process"
            title="Premium in tone, practical in execution."
            description="The process is meant to feel thoughtful without becoming complicated. It creates budget clarity, protects schedule momentum, and keeps communication transparent from start to finish."
          />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-7 shadow-[0_18px_60px_rgba(20,26,35,0.06)]"
              >
                <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[var(--color-wood)]">
                  {item.step}
                </p>
                <h3 className="mt-4 font-serif text-2xl text-[var(--color-charcoal)]">
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
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Journal"
            title="SEO-ready structure for future insights, planning content, and market authority."
            description="The site now has a clean path to support future articles around Dallas luxury custom homes, planning strategy, and remodeling decisions without slipping into broad marketing language."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {journalTopics.map((topic) => (
              <Link
                key={topic.title}
                href={topic.href}
                className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-7 transition duration-300 hover:-translate-y-1 hover:bg-white"
              >
                <h3 className="font-serif text-2xl text-[var(--color-charcoal)]">
                  {topic.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  {topic.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Brand Standards"
            title="Quality, integrity, transparency, and excellence are not talking points. They are the expectation."
            description="The brand should feel trusted, classic, professional, and memorable. These standards make that positioning credible."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {brandPillars.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-7"
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

      <section className="section-shell pt-20">
        <CTA
          title="Discuss your build with a builder who stays personally invested in the details."
          description="Whether you are planning a custom home in Preston Hollow, a Park Cities remodel, or an early-stage luxury project elsewhere in Dallas, the next step starts with a private conversation."
          primaryHref="/contact"
          primaryLabel="Start a Private Consultation"
          secondaryHref="/portfolio"
          secondaryLabel="View Our Work"
        />
      </section>

      <section className="px-5 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-8">
          <Link
            href="/about"
            className="text-sm font-semibold tracking-[0.18em] uppercase text-[var(--color-navy)] transition hover:text-[var(--color-wood)]"
          >
            Meet Ben Alford
          </Link>
          <Link
            href="/journal"
            className="text-sm font-semibold tracking-[0.18em] uppercase text-[var(--color-navy)] transition hover:text-[var(--color-wood)]"
          >
            Explore The Journal
          </Link>
        </div>
      </section>
    </>
  );
}
