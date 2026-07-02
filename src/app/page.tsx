import type { Metadata } from "next";
import Image from "next/image";

import { CTA } from "@/components/cta";
import { Button } from "@/components/button";
import { ServiceCard } from "@/components/service-card";
import {
  homepageGallery,
  marketFocus,
  services,
  siteConfig,
  testimonials,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Luxury Custom Homes In Dallas",
  description:
    "Luxury custom homes and high-end renovations for Dallas clients who value legacy craftsmanship, refined design, and a more transparent building experience.",
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
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,17,24,0.16),rgba(11,17,24,0.52))]" />
          <div className="absolute inset-x-0 bottom-0 top-0 flex items-end">
            <div className="mx-auto w-full max-w-7xl px-5 pb-14 sm:px-6 sm:pb-18 lg:px-8 lg:pb-20">
              <div className="max-w-4xl text-white animate-fade">
                <p className="text-xs font-semibold tracking-[0.34em] uppercase text-white/76">
                  Built on a legacy. Driven by a new generation.
                </p>
                <h1 className="mt-6 font-serif text-5xl leading-[0.98] sm:text-6xl lg:text-8xl">
                  Luxury custom homes and high-end renovations for Dallas clients who expect clarity, craftsmanship, and a builder personally invested in every detail.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
                  Serving Preston Hollow, University Park, Highland Park, and the
                  Park Cities with a more personal, design-conscious approach to
                  timeless residential construction.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button href="/contact" variant="secondary">
                    Contact
                  </Button>
                  <Button href="/portfolio" variant="ghost">
                    Explore
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
              The Next Chapter
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-[var(--color-charcoal)] sm:text-5xl lg:text-6xl">
              Continuing a legacy. Building the future.
            </h2>
            <p className="mt-6 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              Greg Alford built one of Dallas&apos; most respected luxury homebuilding
              reputations through craftsmanship, honesty, and enduring client
              relationships. Ben Alford carries those values forward with a new
              generation&apos;s focus on communication, technology, design
              collaboration, and a more transparent client experience.
            </p>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              The goal is not to change what made the name trusted. It is to
              build on that foundation with personal attention, faster decisions,
              and a process that feels every bit as remarkable as the finished
              home.
            </p>
            <div className="mt-8">
              <Button href="/about">Meet Ben</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--color-wood)]">
            Reimagining Luxury Custom Homes
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-[var(--color-charcoal)] sm:text-5xl lg:text-6xl">
            Legacy craftsmanship. Modern client experience.
          </h2>
          <p className="mt-6 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
            Alford Custom Builders brings together timeless architecture,
            relationship-first service, and a more collaborative way of working
            for homeowners who care deeply about design, detail, and trust.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
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
              Designed for Dallas neighborhoods where architecture, trust, and detail all matter.
            </h2>
            <p className="mt-6 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              From Preston Hollow to University Park, Highland Park, and the
              broader Park Cities, our work is shaped for clients who want a home
              that feels timeless and a building experience that feels confident,
              responsive, and deeply considered.
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
                Learn More
              </Button>
            </div>
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
              A luxury home should feel exceptional long before move-in day.
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
              <Button href="/contact">Contact</Button>
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
              Homes experienced through material, proportion, and light.
            </h2>
            <p className="mt-6 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              A selection of recent photography that reflects the calm, polished,
              and highly detailed character of the work.
            </p>
          </div>
          <Button href="/portfolio" variant="ghost">
            View More
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
                  alt="Alford Custom Builders gallery preview"
                  fill
                  className="object-cover transition duration-700 hover:scale-[1.03]"
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell pt-20">
        <CTA
          title="Begin with a private conversation about your home."
          description="Whether you are planning a custom residence, a transformative remodel, or simply exploring what the next chapter could look like, we would be glad to hear your vision."
          primaryHref="/contact"
          primaryLabel="Contact"
          secondaryHref="/journal"
          secondaryLabel="Learn More"
        />
      </section>
    </>
  );
}
