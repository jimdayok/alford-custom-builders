import type { Metadata } from "next";
import Image from "next/image";

import { CTA } from "@/components/cta";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { getAboutPageContent } from "@/lib/cms/published-content";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getAboutPageContent();
  return { title: data.seo.title, description: data.seo.description };
}

export default async function AboutPage() {
  const { data, source } = await getAboutPageContent();
  return (
    <>
      {source === "preview" ? <div role="status" className="fixed right-4 bottom-4 z-[100] rounded-full bg-[#d8b486] px-4 py-2 text-xs font-semibold text-[#101820] shadow-xl">Draft preview · <a className="underline" href="/api/cms/exit-preview">Exit preview</a></div> : null}
      <PageHero
        eyebrow={data.eyebrow}
        title={data.heading}
        description={data.introduction}
      />

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image
              src={data.founderImage.path}
              alt={data.founderImage.decorative ? "" : data.founderImage.altText}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow={data.founderEyebrow}
              title={data.founderTitle}
              description={data.founderDescription}
            />
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {data.differentiators.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] bg-white p-6 shadow-[0_18px_50px_rgba(15,24,32,0.06)]"
                >
                  <h3 className="font-serif text-2xl text-[var(--color-charcoal)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-8 rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 lg:grid-cols-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[var(--color-wood)]">
              {data.legacyEyebrow}
            </p>
            <h2 className="mt-4 font-serif text-4xl text-[var(--color-charcoal)]">
              {data.legacyTitle}
            </h2>
          </div>
          {data.legacyParagraphs.map((paragraph) => <div key={paragraph} className="text-sm leading-8 text-[var(--color-muted)]">{paragraph}</div>)}
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow={data.valuesEyebrow}
            title={data.valuesTitle}
            description={data.valuesDescription}
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {data.brandPillars.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-7 shadow-[0_18px_60px_rgba(20,26,35,0.06)]"
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

      <section className="section-shell">
        <div className="rounded-[2rem] bg-[var(--color-charcoal)] px-8 py-10 text-white shadow-[0_30px_90px_rgba(10,14,20,0.16)] lg:px-10">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-sand)]">
            Dallas Focus
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
            Designed for clients in North Dallas neighborhoods where trust and reputation lead the conversation.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {data.marketFocus.map((market) => (
              <span
                key={market}
                className="rounded-full border border-white/12 bg-white/[0.05] px-4 py-3 text-sm tracking-[0.14em] uppercase text-white/78"
              >
                {market}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-20">
        <CTA
          title={data.ctaTitle}
          description={data.ctaDescription}
          primaryHref="/contact"
          primaryLabel={data.primaryCtaLabel}
          secondaryHref="/portfolio"
          secondaryLabel={data.secondaryCtaLabel}
        />
      </section>
    </>
  );
}
