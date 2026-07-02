import type { Metadata } from "next";
import Link from "next/link";

import { CTA } from "@/components/cta";
import { PageHero } from "@/components/page-hero";
import { marketFocus, siteConfig } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Alford Custom Builders to discuss a Dallas luxury custom home or high-end remodel project.",
};

const inquiryTopics = [
  "Custom home construction",
  "Whole-home renovation",
  "High-end remodel planning",
  "Additions and expansions",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s start with a conversation about your home, your goals, and the standard you expect from your builder."
        description="Whether your project is still forming or already has plans in hand, Alford Custom Builders welcomes thoughtful inquiries for Preston Hollow, University Park, Highland Park, the Park Cities, and surrounding Dallas luxury neighborhoods."
      />

      <section className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-[var(--color-border)] bg-white p-8 shadow-[0_20px_70px_rgba(15,24,32,0.08)]">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-wood)]">
              Reach Us
            </p>
            <h2 className="mt-4 font-serif text-4xl text-[var(--color-charcoal)]">
              Project inquiries and consultation requests
            </h2>
            <div className="mt-8 space-y-5 text-sm leading-8 text-[var(--color-muted)]">
              <p>{siteConfig.location}</p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+14698631381"
                  className="font-semibold text-[var(--color-navy)]"
                >
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
            </div>
          </div>

          <div className="rounded-[2rem] bg-[var(--color-surface)] p-8">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-wood)]">
              Typical Inquiries
            </p>
            <div className="mt-6 space-y-4">
              {inquiryTopics.map((topic) => (
                <div
                  key={topic}
                  className="rounded-[1.5rem] border border-[var(--color-border)] bg-white px-5 py-4 text-sm text-[var(--color-charcoal)]"
                >
                  {topic}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {marketFocus.map((market) => (
                <span
                  key={market}
                  className="rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--color-charcoal)]"
                >
                  {market}
                </span>
              ))}
            </div>
            <p className="mt-8 text-sm leading-8 text-[var(--color-muted)]">
              The best first step is a conversation about your home, design status,
              priorities, desired timeline, and the level of finish you want to
              achieve.
            </p>
            <div className="mt-8">
              <Link
                href={`mailto:${siteConfig.email}?subject=Project Inquiry`}
                className="inline-flex items-center rounded-full bg-[var(--color-wood)] px-6 py-3 text-sm font-semibold tracking-[0.18em] uppercase text-white transition hover:bg-[#6d4c34]"
              >
                Email Your Project Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-20">
        <CTA
          title="Ready when you are."
          description="Share your plans, inspiration, or project goals and we will help you understand the right next step for your project."
          primaryHref={`mailto:${siteConfig.email}?subject=Project Inquiry`}
          primaryLabel="Start a Private Consultation"
          secondaryHref="/portfolio"
          secondaryLabel="View Our Work"
        />
      </section>
    </>
  );
}
