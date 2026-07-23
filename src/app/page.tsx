import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/button";
import { ChapterRail } from "@/components/home/chapter-rail";
import { GuidedProcessExperience } from "@/components/home/guided-process-experience";
import { LeadForm } from "@/components/home/lead-form";
import { HomepageMotion } from "@/components/home/homepage-motion";
import { getProjectCardImage } from "@/data/portfolio";
import {
  faqItems,
  founderHighlights,
  materialsShowcase,
  processJourney as fallbackProcessJourney,
  siteConfig,
  stats,
  whyAlfordPoints,
} from "@/lib/site-data";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildHomeConstructionBusinessSchema,
  buildOrganizationSchema,
  buildWebsiteSchema,
} from "@/lib/schema";
import { getGlobalSettings, getHomepageContent, getPortfolioProjects, getProcessSteps, getServiceAreas } from "@/lib/cms/published-content";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getHomepageContent();
  return { title: data.seo.title || "Dallas Luxury Custom Homes", description: data.seo.description || siteConfig.description };
}

export default async function HomePage() {
  const [{ data: homepageHero, source }, portfolioProjects, cmsProcessSteps, serviceAreaDetails, globalSettings] = await Promise.all([
    getHomepageContent(), getPortfolioProjects(), getProcessSteps(), getServiceAreas(), getGlobalSettings(),
  ]);
  const featuredProjects = portfolioProjects.slice(0, 3);
  const processJourney = cmsProcessSteps.map((step, index) => ({
    step: step.step,
    title: step.title,
    eyebrow: step.eyebrow ?? fallbackProcessJourney[index]?.eyebrow ?? "Builder-Led Process",
    description: step.description,
    image: step.image?.path ?? fallbackProcessJourney[index]?.image ?? "/images/4301-armstrong-pkwy-hf-1-59.jpg",
  }));
  const schemas = [
    buildOrganizationSchema(globalSettings),
    buildWebsiteSchema(globalSettings),
    buildHomeConstructionBusinessSchema(globalSettings, serviceAreaDetails),
    buildFaqSchema(),
    buildBreadcrumbSchema([
      { name: "Home", url: siteConfig.url },
    ]),
  ];

  return (
    <>
      <HomepageMotion />
      <ChapterRail />
      {source === "preview" ? <div role="status" className="fixed right-4 bottom-4 z-[100] rounded-full bg-[#d8b486] px-4 py-2 text-xs font-semibold text-[#101820] shadow-xl">Draft preview · <a className="underline" href="/api/cms/exit-preview">Exit preview</a></div> : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <section
        data-hero
        id="top"
        className="relative min-h-[calc(100vh-6rem)] overflow-hidden bg-[var(--color-charcoal)] text-white"
      >
        <div className="absolute inset-0">
          <div data-hero-parallax className="absolute inset-0 scale-[1.06]">
            <Image
              src={homepageHero.image.path}
              alt={homepageHero.image.decorative ? "" : homepageHero.image.altText}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(9,14,20,0.78)_0%,rgba(9,14,20,0.5)_42%,rgba(9,14,20,0.22)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(234,214,184,0.18),transparent_30%)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-7xl items-end px-5 pb-14 pt-16 sm:px-6 lg:px-8 lg:pb-20">
          <div
            data-hero-copy
            className="grid w-full gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end"
          >
            <div className="max-w-4xl">
              <p className="text-xs font-semibold tracking-[0.34em] uppercase text-[var(--color-sand)]">
                {homepageHero.eyebrow}
              </p>
              <h1
                data-split-heading
                data-hero-heading
                className="text-balance mt-6 font-serif text-5xl leading-[0.94] sm:text-6xl lg:text-[5.7rem]"
              >
                {homepageHero.heading}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/76 sm:text-lg">
                {homepageHero.supportingCopy}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href={homepageHero.primaryCta.href}>{homepageHero.primaryCta.label}</Button>
                <Button
                  href={homepageHero.secondaryCta.href}
                  variant="ghost"
                  className="border-white/20 bg-white/8 !text-white hover:border-[var(--color-sand)] hover:bg-white/14 hover:!text-white"
                >
                  {homepageHero.secondaryCta.label}
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {homepageHero.trustCues.map((cue) => (
                  <span
                    key={cue}
                    className="rounded-full border border-white/14 bg-white/8 px-4 py-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/74"
                  >
                    {cue}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:justify-self-end">
              <div className="rounded-[2rem] border border-white/12 bg-[rgba(14,22,31,0.52)] p-6 shadow-[0_34px_80px_rgba(0,0,0,0.24)] backdrop-blur-md">
                <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[var(--color-sand)]">
                  Builder-Led Experience
                </p>
                <p className="mt-4 font-serif text-3xl leading-tight">
                  A premium home should feel as well-managed as it looks.
                </p>
                <div className="mt-6 grid gap-4">
                  {founderHighlights.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-7 text-white/72"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-10">
        <div
          data-reveal
          className="grid gap-4 rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(245,239,230,0.95))] p-4 shadow-[0_22px_70px_rgba(15,24,34,0.06)] md:grid-cols-3 md:p-6"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              data-lux-card
              className="rounded-[1.45rem] bg-white/86 px-5 py-5 shadow-[0_10px_30px_rgba(15,24,34,0.04)]"
            >
              <p className="font-serif text-4xl text-[var(--color-charcoal)]">{stat.value}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell" id="story">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div data-reveal className="relative overflow-hidden rounded-[2rem] bg-[#efe3d2] p-6">
            <div className="absolute left-6 top-6 h-24 w-24 rounded-full border border-[rgba(15,34,54,0.14)]" />
            <div className="absolute right-6 top-16 h-px w-28 bg-[rgba(15,34,54,0.14)]" />
            <div className="absolute bottom-8 left-8 h-20 w-20 border border-[rgba(15,34,54,0.14)]" />
            <div className="image-sheen relative overflow-hidden rounded-[1.6rem]">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/headshot.png"
                  alt="Ben Alford, President of Alford Custom Builders"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 36vw, 100vw"
                />
              </div>
            </div>
          </div>

          <div data-reveal className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--color-wood)]">
              The Next Chapter
            </p>
            <h2
              data-split-heading
              className="text-balance mt-4 font-serif text-4xl leading-tight text-[var(--color-charcoal)] sm:text-5xl lg:text-6xl"
            >
              Ben Alford is carrying forward a respected Dallas building legacy with a more current, responsive way of working.
            </h2>
            <p className="mt-6 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              Alford Custom Builders stands on the foundation Greg Alford helped
              establish, but it is very much Ben&apos;s own company: detail-driven,
              technology-enabled, and personally involved in the decisions that
              shape how a home is built and how the process feels.
            </p>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              Clients come for the craftsmanship. They stay confident because the
              communication is faster, the planning is clearer, and the builder is
              close enough to the work to answer real questions in real time.
            </p>
            <div className="mt-8">
              <Button href="/about" variant="secondary">
                Meet Ben Alford
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-shell scroll-mt-32"
        id="process"
      >
        <div data-reveal className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--color-wood)]">
            Guided Process
          </p>
          <h2
            data-split-heading
            className="text-balance mt-4 font-serif text-4xl leading-tight text-[var(--color-charcoal)] sm:text-5xl lg:text-6xl"
          >
            A luxury project should unfold with the same confidence and rhythm as the finished home.
          </h2>
          <p className="mt-6 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
            Scroll through the journey and you will see how each stage builds on the
            one before it, with builder-led decisions, cleaner communication, and
            a steadier path from first conversation to move-in.
          </p>
        </div>
        <GuidedProcessExperience steps={processJourney} />
      </section>

      <section className="section-shell py-2">
        <div
          data-reveal
          className="rounded-[2.1rem] border border-[rgba(15,34,54,0.08)] bg-[linear-gradient(120deg,#182330_0%,#101820_42%,#1b2937_100%)] px-7 py-8 text-white shadow-[0_28px_90px_rgba(8,13,20,0.18)]"
        >
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--color-sand)]">
                Signature Standards
              </p>
              <h2
                data-split-heading
                className="text-balance mt-4 font-serif text-4xl leading-tight sm:text-5xl"
              >
                Personal oversight, refined material judgment, and construction decisions that feel calm instead of chaotic.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              Great homes do not just happen on the drawing board. They are protected
              by disciplined execution, thoughtful sequencing, and a builder who
              stays close enough to the work to keep the experience sharp.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell scroll-mt-32" id="portfolio">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div data-reveal className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--color-wood)]">
              Recent Work
            </p>
            <h2
              data-split-heading
              className="text-balance mt-4 font-serif text-4xl leading-tight text-[var(--color-charcoal)] sm:text-5xl lg:text-6xl"
            >
              Editorial project stories built from real homes, real materials, and real neighborhood context.
            </h2>
          </div>
          <Button href="/portfolio" variant="secondary">
            View Our Work
          </Button>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <article
              key={project.slug}
              data-reveal
              className={`group overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white shadow-[0_22px_70px_rgba(15,24,34,0.06)] ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <Link href={`/portfolio/${project.slug}`} className="block">
                <div className="image-sheen relative overflow-hidden">
                  <div className={`relative ${index === 0 ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
                    <Image
                      src={getProjectCardImage(project.slug, project.coverImage)}
                      alt={`${project.title} luxury residential project by Alford Custom Builders`}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      sizes={index === 0 ? "(min-width: 1024px) 52vw, 100vw" : "(min-width: 1024px) 24vw, 100vw"}
                      quality={74}
                    />
                  </div>
                </div>
                <div className="p-6 sm:p-7">
                  <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[var(--color-wood)]">
                    {project.slug === "armstrong-pkwy" ? "Park Cities Custom Home" : "Dallas Luxury Residence"}
                  </p>
                  <h3 className="mt-3 font-serif text-3xl text-[var(--color-charcoal)]">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                    {project.description}
                  </p>
                  <p className="mt-5 text-xs font-semibold tracking-[0.22em] uppercase text-[var(--color-charcoal)]">
                    Explore Project
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div data-reveal className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--color-wood)]">
            Material Language
          </p>
          <h2
            data-split-heading
            className="text-balance mt-4 font-serif text-4xl leading-tight text-[var(--color-charcoal)] sm:text-5xl"
          >
            Premium homes are remembered through texture, restraint, and the confidence of the details.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {materialsShowcase.map((material) => (
            <article
              key={material.title}
              data-float-card
              className="overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(245,239,230,0.94))] shadow-[0_20px_65px_rgba(15,24,34,0.06)]"
            >
              <div className="image-sheen relative overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={material.image}
                    alt={`${material.title} details from an Alford Custom Builders interior`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 28vw, (min-width: 768px) 46vw, 100vw"
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-3xl text-[var(--color-charcoal)]">
                  {material.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  {material.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="rounded-[2.25rem] bg-[var(--color-charcoal)] px-6 py-12 text-white shadow-[0_30px_90px_rgba(10,14,20,0.16)] sm:px-8 lg:px-12">
          <div data-reveal className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--color-sand)]">
              Why Alford
            </p>
            <h2
              data-split-heading
              className="text-balance mt-4 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl"
            >
              Clear communication, trusted craftsmanship, and a process built for real family life.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {whyAlfordPoints.map((point) => (
              <div
                key={point}
                data-reveal
                className="rounded-[1.5rem] border border-white/10 bg-white/6 px-5 py-5 text-sm leading-7 text-white/78"
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell scroll-mt-32" id="service-areas">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div data-reveal className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--color-wood)]">
              Service Areas
            </p>
            <h2
              data-split-heading
              className="text-balance mt-4 font-serif text-4xl leading-tight text-[var(--color-charcoal)] sm:text-5xl"
            >
              Crawlable service-area content for the Dallas neighborhoods where reputation matters most.
            </h2>
          </div>
          <Button href="/service-areas" variant="secondary">
            Explore Service Areas
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {serviceAreaDetails.map((area) => (
            <article
              key={area.slug}
              data-reveal
              className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-7 shadow-[0_18px_60px_rgba(20,26,35,0.05)]"
            >
              <h3 className="font-serif text-3xl text-[var(--color-charcoal)]">
                {area.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                {area.shortDescription}
              </p>
              <Link
                href={`/service-areas#${area.slug}`}
                className="mt-5 inline-flex text-xs font-semibold tracking-[0.22em] uppercase text-[var(--color-charcoal)] transition hover:text-[var(--color-wood)]"
              >
                View Area Details
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell scroll-mt-32" id="faq">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div data-reveal className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.32em] uppercase text-[var(--color-wood)]">
              FAQ
            </p>
            <h2
              data-split-heading
              className="text-balance mt-4 font-serif text-4xl leading-tight text-[var(--color-charcoal)] sm:text-5xl"
            >
              Answers for clients planning a custom home or high-end remodel in Dallas.
            </h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.question}
                data-reveal
                className="group rounded-[1.5rem] border border-[var(--color-border)] bg-white px-6 py-5 shadow-[0_12px_40px_rgba(15,24,34,0.04)]"
              >
                <summary className="cursor-pointer list-none font-serif text-2xl text-[var(--color-charcoal)]">
                  {item.question}
                </summary>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pb-2 scroll-mt-32" id="contact-form">
        <div className="grid gap-6 rounded-[2.25rem] bg-[linear-gradient(145deg,#172230_0%,#0f1721_100%)] p-4 sm:p-6 lg:grid-cols-[0.86fr_1.14fr] lg:p-8">
          <div className="image-sheen relative overflow-hidden rounded-[1.8rem]">
            <div className="relative min-h-[26rem]">
              <Image
                src="/images/4301-armstrong-pkwy-hf-1-141.jpg"
                alt="Architectural interior from an Alford Custom Builders custom residence"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 36vw, 100vw"
              />
            </div>
          </div>
          <LeadForm />
        </div>
      </section>
    </>
  );
}
