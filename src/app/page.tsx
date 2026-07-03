import type { Metadata } from "next";
import Image from "next/image";

import { CTA } from "@/components/cta";
import { Button } from "@/components/button";
import {
  founderHighlights,
  homepageGallery,
  marketFocus,
  processSteps,
  services,
  siteConfig,
  stats,
  testimonials,
} from "@/lib/site-data";

const galleryLabels = [
  "Preston Hollow Residence",
  "University Park Remodel",
  "Highland Park Addition",
  "North Dallas Custom Home",
  "Park Cities Outdoor Living",
  "Design-Focused Interior",
];

export const metadata: Metadata = {
  title: "Luxury Custom Homes In Dallas",
  description:
    "Luxury custom homes and estate renovations for Dallas clients who value craftsmanship, clear communication, and direct owner involvement.",
};

export default function HomePage() {
  const [featuredTestimonial, ...moreTestimonials] = testimonials;

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

      <section className="relative overflow-hidden">
        <div className="image-sheen relative h-[74vh] min-h-[38rem] w-full sm:h-[78vh]">
          <Image
            src="/images/4301-armstrong-pkwy-hf-1-155.jpg"
            alt="Luxury Dallas residence by Alford Custom Builders"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,17,24,0.14),rgba(11,17,24,0.56))]" />
          <div className="absolute inset-x-0 bottom-0 top-0 flex items-end">
            <div className="mx-auto w-full max-w-7xl px-5 pb-14 sm:px-6 sm:pb-18 lg:px-8 lg:pb-20">
              <div className="max-w-4xl text-white animate-fade">
                <p className="text-xs font-semibold tracking-[0.34em] uppercase text-white/76">
                  Luxury Custom Homes In Dallas
                </p>
                <h1 className="mt-6 font-serif text-5xl leading-[0.98] sm:text-6xl lg:text-8xl">
                  Luxury custom homes and high-end renovations for Dallas clients who expect clarity, craftsmanship, and a builder personally invested in every detail.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
                  Serving Preston Hollow, University Park, Highland Park, and the
                  Park Cities with direct owner involvement, transparent planning,
                  and a more modern luxury building experience.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button href="/contact" variant="secondary">
                    Start a Private Consultation
                  </Button>
                  <Button href="/portfolio" variant="ghost">
                    View Recent Work
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
          <div className="image-sheen relative overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_90px_rgba(15,24,34,0.08)]">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/headshot.png"
                alt="Ben Alford"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 38vw, 100vw"
              />
            </div>
          </div>

          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--color-wood)]">
              Meet Ben Alford
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-[var(--color-charcoal)] sm:text-5xl lg:text-6xl">
              A new company shaped by familiar standards and a more current way of building.
            </h2>
            <p className="mt-6 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              Greg Alford built an extraordinary reputation in Dallas through
              craftsmanship, honesty, and relationships. Alford Custom Builders is
              Ben Alford&apos;s independent company, built for clients who want those
              same standards with a more collaborative, technology-forward, and
              highly personal experience.
            </p>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              Today&apos;s homeowners expect faster answers, cleaner communication,
              tighter budget visibility, and a builder who stays close to the
              details. That is where Ben has chosen to focus.
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
            <div className="mt-8">
              <Button href="/about">Meet Ben</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="rounded-[1.75rem] border border-[var(--color-border)] bg-white px-6 py-7 shadow-[0_18px_60px_rgba(15,24,34,0.05)]"
            >
              <p className="font-serif text-3xl text-[var(--color-navy)]">{stat.value}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--color-wood)]">
            Services
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-[var(--color-charcoal)] sm:text-5xl lg:text-6xl">
            Highly personal. Deeply detailed. Built with the standards of a name Dallas already knows.
          </h2>
          <p className="mt-6 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
            The work spans new homes, transformative renovations, additions, and
            early advisory support, with each project shaped around design,
            feasibility, timing, and clear client communication.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-[1.75rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(246,240,231,0.9))] p-7 shadow-[0_18px_60px_rgba(20,26,35,0.05)]"
            >
              <p className="font-serif text-2xl text-[var(--color-charcoal)]">{service.title}</p>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="locations" className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="image-sheen relative overflow-hidden rounded-[2rem] bg-[var(--color-charcoal)] shadow-[0_30px_90px_rgba(10,14,20,0.16)]">
            <div className="relative aspect-[16/10]">
              <Image
                src="/images/3534-greenbrier-dr-52.jpg"
                alt="Luxury Dallas home exterior and pool"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 56vw, 100vw"
              />
            </div>
          </div>

          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--color-wood)]">
              Where We Build
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-[var(--color-charcoal)] sm:text-5xl">
              A Dallas-focused building company with deep familiarity in the neighborhoods that expect the most.
            </h2>
            <p className="mt-6 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              From Preston Hollow to University Park, Highland Park, and the
              broader Park Cities, our work is built for clients who care about
              design quality, owner access, thoughtful additions, and homes that
              hold their value visually and structurally over time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {marketFocus.map((market) => (
                <span
                  key={market}
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[var(--color-charcoal)]"
                >
                  {market}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <Button href="/contact" variant="ghost">
                Discuss Your Project
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--color-wood)]">
              How We Build
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-[var(--color-charcoal)] sm:text-5xl">
              The modern client experience becomes real in the way the process is run.
            </h2>
            <p className="mt-6 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              The goal is simple: better planning, cleaner decisions, and more
              visibility throughout the life of the project. That means weekly
              updates, tighter budget conversations, and collaboration that keeps
              architects, designers, and clients moving together.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_18px_60px_rgba(20,26,35,0.05)]"
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

      <section id="testimonials" className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--color-wood)]">
              Client Perspective
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-[var(--color-charcoal)] sm:text-5xl">
              Premium homes are remembered as much for the experience as for the finish.
            </h2>
            <blockquote className="mt-8 font-serif text-3xl leading-tight text-[var(--color-navy)] sm:text-4xl">
              “{featuredTestimonial.quote}”
            </blockquote>
            <p className="mt-6 text-sm font-semibold tracking-[0.16em] uppercase text-[var(--color-charcoal)]">
              {featuredTestimonial.name}
            </p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              {featuredTestimonial.context}
            </p>
            <div className="mt-8">
              <Button href="/contact">Start a Private Consultation</Button>
            </div>
          </div>

          <div className="image-sheen relative overflow-hidden rounded-[2rem] bg-[var(--color-charcoal)] shadow-[0_30px_90px_rgba(10,14,20,0.16)]">
            <div className="relative aspect-[5/4]">
              <Image
                src="/images/4301-armstrong-pkwy-hf-1-59.jpg"
                alt="Interior view of a luxury home by Alford Custom Builders"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {moreTestimonials.map((item) => (
            <article
              key={item.quote}
              className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-7 shadow-[0_20px_70px_rgba(15,24,34,0.06)]"
            >
              <p className="font-serif text-2xl leading-9 text-[var(--color-charcoal)]">
                “{item.quote}”
              </p>
              <p className="mt-6 text-sm font-semibold tracking-[0.16em] uppercase text-[var(--color-charcoal)]">
                {item.name}
              </p>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{item.context}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--color-wood)]">
              Gallery Preview
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-[var(--color-charcoal)] sm:text-5xl">
              Recent work across Dallas homes, additions, and estate-scale renovations.
            </h2>
            <p className="mt-6 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              A more specific look at the kind of work, settings, and finish level
              Alford Custom Builders is designed to deliver.
            </p>
          </div>
          <Button href="/portfolio" variant="ghost">
            View Recent Work
          </Button>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {homepageGallery.map((image, index) => (
            <div
              key={image}
              className={`image-sheen relative overflow-hidden rounded-[1.75rem] shadow-[0_18px_60px_rgba(15,24,34,0.08)] ${
                index === 0 || index === 5 ? "xl:row-span-2" : ""
              }`}
            >
              <div className={`relative ${index === 0 || index === 5 ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
                <Image
                  src={image}
                  alt={galleryLabels[index] ?? "Alford Custom Builders gallery preview"}
                  fill
                  className="object-cover transition duration-700 hover:scale-[1.03]"
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-[linear-gradient(180deg,transparent,rgba(10,16,24,0.72))] px-5 pb-5 pt-14 text-white">
                <p className="text-xs font-semibold tracking-[0.22em] uppercase text-white/72">
                  {galleryLabels[index] ?? "Recent Work"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell pt-20">
        <CTA
          title="Begin with a private conversation about your project."
          description="Whether you are planning a custom home, an estate renovation, or an addition in one of Dallas&apos; premier neighborhoods, we would be glad to talk through the vision, timing, and next step."
          primaryHref="/contact"
          primaryLabel="Discuss Your Project"
          secondaryHref="/about"
          secondaryLabel="Meet Ben"
        />
      </section>
    </>
  );
}
