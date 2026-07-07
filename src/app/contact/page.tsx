import type { Metadata } from "next";
import Link from "next/link";

import { LeadForm } from "@/components/home/lead-form";
import { PageHero } from "@/components/page-hero";
import { marketFocus, siteConfig } from "@/lib/site-data";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Alford Custom Homes to discuss a Dallas luxury custom home or high-end remodel project.",
};

export default function ContactPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Contact", url: `${siteConfig.url}/contact` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        eyebrow="Contact"
        title="Let’s start with a conversation about your home, your goals, and the standard you expect from your builder."
        description="Whether your project is still forming or already has plans in hand, Alford Custom Homes welcomes thoughtful inquiries for Preston Hollow, University Park, Highland Park, the Park Cities, and surrounding Dallas luxury neighborhoods."
      />

      <section className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-[2rem] border border-[var(--color-border)] bg-white p-8 shadow-[0_20px_70px_rgba(15,24,32,0.08)]">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-wood)]">
              Reach Us
            </p>
            <h2 className="mt-4 font-serif text-4xl text-[var(--color-charcoal)]">
              Private consultations for custom homes and luxury remodels
            </h2>
            <div className="mt-8 space-y-5 text-sm leading-8 text-[var(--color-muted)]">
              <p>{siteConfig.location}</p>
              <p>
                Phone:{" "}
                <a href="tel:+14698631381" className="font-semibold text-[var(--color-navy)]">
                  {siteConfig.phone}
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold text-[var(--color-navy)]"
                >
                  {siteConfig.email}
                </a>
              </p>
              <p>
                Best fit: luxury custom homes, high-end remodels, and major
                residential additions in Dallas-area neighborhoods where quality
                and communication matter.
              </p>
              <p>
                Every inquiry is reviewed directly by Ben Alford. If you already
                have plans, a lot, or inspiration images, feel free to mention
                that in your message.
              </p>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[var(--color-wood)]">
                Neighborhood Focus
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {marketFocus.map((market) => (
                  <span
                    key={market}
                    className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--color-charcoal)]"
                  >
                    {market}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Link
                href={`mailto:${siteConfig.email}?subject=Project Inquiry`}
                className="inline-flex min-h-12 items-center rounded-[0.95rem] bg-[var(--color-navy)] px-6 py-3 text-sm font-semibold tracking-[0.18em] uppercase text-white transition hover:-translate-y-0.5 hover:bg-[var(--color-charcoal)]"
              >
                Email Your Project Details
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[linear-gradient(145deg,#172230_0%,#0f1721_100%)] p-3 sm:p-4">
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
