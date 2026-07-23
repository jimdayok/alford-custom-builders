import type { Metadata } from "next";
import Link from "next/link";

import { LeadForm } from "@/components/home/lead-form";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/site-data";
import { getContactPageContent, getServiceAreas } from "@/lib/cms/published-content";
import { buildBreadcrumbSchema } from "@/lib/schema";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getContactPageContent();
  return { title: data.seo.title, description: data.seo.description };
}

export default async function ContactPage() {
  const [{ data, source }, serviceAreas] = await Promise.all([getContactPageContent(), getServiceAreas()]);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Contact", url: `${siteConfig.url}/contact` },
  ]);

  return (
    <>
      {source === "preview" ? <div role="status" className="fixed right-4 bottom-4 z-[100] rounded-full bg-[#d8b486] px-4 py-2 text-xs font-semibold text-[#101820] shadow-xl">Draft preview · <a className="underline" href="/api/cms/exit-preview">Exit preview</a></div> : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        eyebrow={data.eyebrow}
        title={data.heading}
        description={data.introduction}
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
              <p>{data.serviceAreaCopy}</p>
              <p>
                Phone:{" "}
                <a href={`tel:${data.displayedPhone.replace(/[^+\d]/g, "")}`} className="font-semibold text-[var(--color-navy)]">
                  {data.displayedPhone}
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href={`mailto:${data.displayedEmail}`}
                  className="font-semibold text-[var(--color-navy)]"
                >
                  {data.displayedEmail}
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
                {serviceAreas.map((area) => (
                  <span
                    key={area.slug}
                    className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--color-charcoal)]"
                  >
                    {area.title}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Link
                href={`mailto:${data.displayedEmail}?subject=Project Inquiry`}
                className="inline-flex min-h-12 items-center rounded-[0.95rem] bg-[var(--color-navy)] px-6 py-3 text-sm font-semibold tracking-[0.18em] uppercase text-white transition hover:-translate-y-0.5 hover:bg-[var(--color-charcoal)]"
              >
                {data.ctaText}
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
