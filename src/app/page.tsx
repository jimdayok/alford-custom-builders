import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/button";
import { LeadForm } from "@/components/home/lead-form";
import { getProjectCardImage } from "@/data/portfolio";
import { siteConfig } from "@/lib/site-data";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildHomeConstructionBusinessSchema,
  buildOrganizationSchema,
  buildWebsiteSchema,
} from "@/lib/schema";
import {
  getGlobalSettings,
  getHomepageContent,
  getPortfolioProjects,
  getProcessSteps,
  getServiceAreas,
} from "@/lib/cms/published-content";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getHomepageContent();

  return {
    title: "Luxury Is Personal | Dallas Custom Home Builder",
    description:
      "Alford Custom Builders creates exceptional Dallas homes through calm leadership, clear communication, careful preparation, and a deeply personal building experience.",
    openGraph: {
      title: "Luxury Is Personal | Alford Custom Builders",
      description:
        "Exceptional Dallas homes. A more personal building experience.",
      images: [{ url: data.image.path }],
    },
  };
}

const standards = [
  ["01", "Preparation before problems", "We plan beyond the next milestone so decisions feel considered, not rushed."],
  ["02", "Communication before questions", "Clear, direct updates keep you confident about what is happening and what comes next."],
  ["03", "Consistency before recognition", "The work behind the scenes matters as much as the moments everyone sees."],
  ["04", "Craftsmanship without shortcuts", "Every detail is protected by people who care how the finished home lives and feels."],
] as const;

const principles = [
  "People before projects",
  "Trust before transactions",
  "Preparation before promises",
  "Details over shortcuts",
  "Action over words",
  "Experience over ego",
] as const;

export default async function HomePage() {
  const [
    { data: homepageHero, source },
    portfolioProjects,
    processSteps,
    serviceAreas,
    globalSettings,
  ] = await Promise.all([
    getHomepageContent(),
    getPortfolioProjects(),
    getProcessSteps(),
    getServiceAreas(),
    getGlobalSettings(),
  ]);
  const featuredProjects = portfolioProjects.slice(0, 3);
  const schemas = [
    buildOrganizationSchema(globalSettings),
    buildWebsiteSchema(globalSettings),
    buildHomeConstructionBusinessSchema(globalSettings, serviceAreas),
    buildFaqSchema(),
    buildBreadcrumbSchema([{ name: "Home", url: siteConfig.url }]),
  ];

  return (
    <>
      {source === "preview" ? (
        <div role="status" className="fixed right-4 bottom-4 z-[100] rounded-full bg-[var(--color-sand)] px-4 py-2 text-xs font-semibold text-[var(--color-charcoal)] shadow-xl">
          Draft preview · <a className="underline" href="/api/cms/exit-preview">Exit preview</a>
        </div>
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <section className="brand-hero" id="top">
        <div className="brand-hero__media">
          <Image
            src={homepageHero.image.path}
            alt={homepageHero.image.decorative ? "" : homepageHero.image.altText}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="brand-hero__veil" />
        <div className="brand-hero__frame">
          <div className="brand-hero__copy">
            <p className="brand-kicker text-white/70">Alford Custom Builders · Dallas</p>
            <h1 className="brand-display mt-5 max-w-5xl text-white">
              Luxury.<br />Personalized.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/78 sm:text-lg">
              Exceptional homes are expected. A building experience that feels calm,
              clear, and deeply personal is the difference.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact">Begin a Conversation</Button>
              <Button
                href="/portfolio"
                variant="ghost"
                className="border-white/30 bg-transparent !text-white hover:border-white hover:bg-white hover:!text-[var(--color-charcoal)]"
              >
                Explore Our Work
              </Button>
            </div>
          </div>
          <div className="brand-hero__aside" aria-label="Brand promise">
            <span>Luxury is personal.</span>
          </div>
        </div>
        <a href="#belief" className="brand-hero__scroll" aria-label="Continue to our belief">
          <span>Discover</span><i aria-hidden="true" />
        </a>
      </section>

      <section className="brand-section brand-belief" id="belief">
        <div className="brand-container grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <div>
            <p className="brand-kicker">What we believe</p>
            <p className="mt-6 hidden font-serif text-8xl leading-none text-[var(--color-sand)] lg:block">“</p>
          </div>
          <div>
            <h2 className="brand-heading max-w-4xl">
              Luxury isn&apos;t measured by what you buy. It&apos;s measured by how you feel.
            </h2>
            <div className="mt-10 grid gap-8 border-t border-[var(--color-border)] pt-8 md:grid-cols-2">
              <p className="brand-body">
                It is knowing your builder cares as much about your home as you do.
                It is confidence, calm, and never wondering what is happening next.
              </p>
              <p className="brand-body">
                From the first conversation to the final detail, every decision is
                handled with the attention a personal investment deserves.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="brand-section bg-[var(--color-charcoal)] text-white">
        <div className="brand-container">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="brand-kicker text-[var(--color-sand)]">Our standard</p>
              <h2 className="brand-heading mt-6 text-white">We outwork expectations.</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/66 sm:text-lg lg:justify-self-end">
              Our clients do not see everything we do. They simply feel the difference.
              The experience feels effortless because the preparation never is.
            </p>
          </div>
          <div className="mt-14 grid border-l border-t border-white/14 sm:grid-cols-2 xl:grid-cols-4">
            {standards.map(([number, title, description]) => (
              <article key={number} className="border-b border-r border-white/14 p-6 sm:p-8">
                <p className="text-xs tracking-[0.28em] text-[var(--color-sand)]">{number}</p>
                <h3 className="mt-12 font-serif text-3xl leading-tight">{title}</h3>
                <p className="mt-5 text-sm leading-7 text-white/60">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="brand-section overflow-hidden">
        <div className="brand-container grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <div className="relative min-h-[36rem] overflow-hidden bg-[var(--color-surface)]">
            <Image
              src="/images/4301-armstrong-pkwy-hf-1-141.jpg"
              alt="Light-filled interior by Alford Custom Builders"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-7 pb-7 pt-24 text-white sm:px-10 sm:pb-10">
              <p className="brand-kicker text-white/68">The home is the product.</p>
              <p className="mt-3 font-serif text-4xl sm:text-5xl">The experience is the brand.</p>
            </div>
          </div>
          <div className="flex flex-col justify-between bg-[var(--color-sand)] p-8 sm:p-12">
            <div>
              <p className="brand-kicker">How trust is built</p>
              <h2 className="brand-heading mt-7">One conversation. One decision. One promise at a time.</h2>
            </div>
            <p className="brand-body mt-14 max-w-xl">
              We lead with honesty, simplify complexity, and listen before we decide.
              Trust is not a closing-day achievement. It is earned in the moments that
              happen all along the way.
            </p>
          </div>
        </div>
      </section>

      <section className="brand-section bg-white" id="process">
        <div className="brand-container">
          <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr]">
            <p className="brand-kicker">A considered journey</p>
            <div>
              <h2 className="brand-heading max-w-4xl">Every step should feel as intentional as the finished home.</h2>
              <p className="brand-body mt-7 max-w-2xl">
                Preparation, communication, and clear leadership turn a complex build
                into a process that feels steady from first conversation through move-in.
              </p>
            </div>
          </div>
          <ol className="mt-14 border-t border-[var(--color-border-strong)]">
            {processSteps.map((step, index) => (
              <li key={step.step} className="group grid gap-4 border-b border-[var(--color-border)] py-7 md:grid-cols-[0.18fr_0.42fr_1fr] md:items-baseline">
                <span className="text-xs tracking-[0.28em] text-[var(--color-wood)]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="font-serif text-3xl text-[var(--color-charcoal)]">{step.title}</h3>
                <p className="max-w-2xl text-sm leading-7 text-[var(--color-muted)] md:justify-self-end">{step.description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Button href="/our-process" variant="secondary">See How We Build</Button>
          </div>
        </div>
      </section>

      <section className="brand-section" id="portfolio">
        <div className="brand-container">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="brand-kicker">Selected residences</p>
              <h2 className="brand-heading mt-6">Homes with presence.<br />Spaces with purpose.</h2>
            </div>
            <Button href="/portfolio" variant="secondary">View the Full Gallery</Button>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-12">
            {featuredProjects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className={`brand-project group ${index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-12"}`}
              >
                <div className={`relative overflow-hidden ${index === 2 ? "aspect-[16/7]" : "aspect-[4/5]"}`}>
                  <Image
                    src={getProjectCardImage(project.slug, project.coverImage)}
                    alt={`${project.title} residence by Alford Custom Builders`}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.025]"
                    sizes={index === 2 ? "100vw" : "(min-width: 1024px) 50vw, 100vw"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 text-white sm:p-8">
                    <div>
                      <p className="text-[10px] tracking-[0.28em] uppercase text-white/62">Dallas Residence</p>
                      <h3 className="mt-2 font-serif text-3xl sm:text-4xl">{project.title}</h3>
                    </div>
                    <span className="text-xs tracking-[0.22em] uppercase">Explore</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="brand-section bg-[var(--color-sand)]">
        <div className="brand-container grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="brand-kicker">What we stand for</p>
            <h2 className="brand-heading mt-6">Experience over ego.</h2>
          </div>
          <div className="border-t border-[rgba(23,27,35,0.3)]">
            {principles.map((principle) => (
              <p key={principle} className="border-b border-[rgba(23,27,35,0.22)] py-5 font-serif text-3xl sm:text-4xl">{principle}.</p>
            ))}
          </div>
        </div>
      </section>

      <section className="brand-section">
        <div className="brand-container grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="relative min-h-[34rem] overflow-hidden bg-[var(--color-surface)]">
            <Image
              src="/images/headshot.png"
              alt="Ben Alford, President of Alford Custom Builders"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </div>
          <div className="px-0 lg:px-14">
            <p className="brand-kicker">Why Alford</p>
            <h2 className="brand-heading mt-6">We promise to care as much as you do.</h2>
            <p className="brand-body mt-7">
              About your home. About your investment. About your family. About the
              experience. Ben Alford leads every project with personal involvement,
              honest conversations, and a relentless attention to detail.
            </p>
            <p className="mt-8 font-serif text-2xl italic leading-relaxed text-[var(--color-charcoal)]">
              “The greatest compliment isn&apos;t a referral. It&apos;s the invitation back.”
            </p>
            <div className="mt-9"><Button href="/about" variant="secondary">Meet Ben Alford</Button></div>
          </div>
        </div>
      </section>

      <section className="brand-section pt-0" id="contact-form">
        <div className="brand-container grid gap-0 bg-[var(--color-charcoal)] lg:grid-cols-[0.84fr_1.16fr]">
          <div className="flex flex-col justify-between p-8 text-white sm:p-12 lg:p-14">
            <div>
              <p className="brand-kicker text-[var(--color-sand)]">Start with a conversation</p>
              <h2 className="brand-heading mt-7 text-white">Let&apos;s change what luxury feels like.</h2>
            </div>
            <p className="mt-12 max-w-md text-base leading-8 text-white/64">
              Tell us where you are in the process and what you hope to create. We will
              begin with an honest, personal conversation about the right next step.
            </p>
          </div>
          <div className="bg-[#111923] p-4 sm:p-6 lg:p-8"><LeadForm /></div>
        </div>
      </section>
    </>
  );
}
