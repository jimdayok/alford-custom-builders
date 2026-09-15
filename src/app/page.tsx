import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BrandActions } from "@/components/brand/brand-actions";
import { ClosingPanel } from "@/components/brand/closing-panel";
import { EditorialHero } from "@/components/brand/editorial-hero";
import { StatementBand } from "@/components/brand/statement-band";
import { PreviewTwoHome } from "@/components/preview-two/home";
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
  getServiceAreas,
} from "@/lib/cms/published-content";
import { getPreviewVersion } from "@/lib/preview-version";

export async function generateMetadata(): Promise<Metadata> {
  const previewVersion = await getPreviewVersion();
  if (previewVersion === "preview2") {
    return {
      title: "Alford Custom Builders",
      description: "Personal custom homes shaped by thoughtful planning and exceptional craftsmanship.",
    };
  }

  return {
    title: "Luxury. Personalized. | Dallas Custom Home Builder",
    description:
      "Alford Custom Builders creates exceptional Dallas homes through thoughtful planning, trusted relationships, exceptional craftsmanship, and personal attention.",
  };
}

const standards = [
  ["01", "Preparation before problems", "The right work starts before the first visible sign of construction."],
  ["02", "Communication before questions", "Clear updates create confidence at every stage of the building experience."],
  ["03", "Consistency before recognition", "The standard stays high whether or not anyone is watching."],
  ["04", "Craftsmanship without shortcuts", "Every detail receives the attention the larger vision deserves."],
] as const;

export default async function HomePage() {
  const previewVersion = await getPreviewVersion();
  if (previewVersion === "preview2") return <PreviewTwoHome />;

  const [{ data: homepage }, projects, serviceAreas, settings] = await Promise.all([
    getHomepageContent(),
    getPortfolioProjects(),
    getServiceAreas(),
    getGlobalSettings(),
  ]);
  const featuredProjects = projects.slice(0, 3);
  const schemas = [
    buildOrganizationSchema(settings),
    buildWebsiteSchema(settings),
    buildHomeConstructionBusinessSchema(settings, serviceAreas),
    buildFaqSchema(),
    buildBreadcrumbSchema([{ name: "Home", url: siteConfig.url }]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />

      <EditorialHero
        eyebrow="Alford Custom Builders · Dallas"
        title={<>Luxury.<br />Personalized.</>}
        subheadline="Exceptional homes deserve an equally exceptional building experience."
        intro={
          <>
            <p>At Alford Custom Builders, we create custom homes through thoughtful planning, trusted relationships, exceptional craftsmanship, and a level of personal attention that carries from the first conversation through the final detail.</p>
            <p>Because a beautiful home should be expected. The difference is how you feel while getting there.</p>
          </>
        }
        image={homepage.image.path}
        imageAlt={homepage.image.decorative ? "" : homepage.image.altText}
        primaryHref="/contact"
        primaryLabel="Start a Conversation"
        secondaryHref="/portfolio"
        secondaryLabel="Explore Our Work"
      />

      <StatementBand statement="Luxury is personal." />

      <section className="acb-split" id="difference">
        <div className="acb-split__media">
          <Image
            src="/images/4301-armstrong-pkwy-hf-1-141.jpg"
            alt="Light-filled interior crafted by Alford Custom Builders"
            fill
            className="object-cover"
            sizes="(min-width: 901px) 52vw, 100vw"
          />
        </div>
        <div className="acb-split__copy">
          <p className="acb-kicker">The Brand Difference</p>
          <h2 className="acb-heading mt-6">Luxury Is Personal.</h2>
          <p className="acb-section-lede mt-7">It isn&apos;t defined by what goes into the home. It is defined by how personally the entire experience is handled.</p>
          <div className="acb-body mt-7">
            <p>Luxury is confidence.</p>
            <p>It is knowing what comes next. Knowing your questions will be answered. Knowing the details are being handled and that your builder cares as much about your home, your investment, and your family as you do.</p>
            <p>That is the experience Alford Custom Builders is committed to creating.</p>
          </div>
          <BrandActions
            primaryHref="/about#difference"
            primaryLabel="Discover the Alford Difference"
            secondaryHref="/about"
            secondaryLabel="About Alford"
          />
        </div>
      </section>

      <StatementBand statement="Communication before questions." />

      <section className="acb-section acb-section--organic" id="services">
        <div className="acb-shell">
          <div className="acb-section__intro">
            <p className="acb-kicker">The Experience</p>
            <div className="acb-section__content">
              <h2 className="acb-heading">We Outwork Expectations.</h2>
              <p className="acb-section-lede mt-7 text-[var(--brand-natural)]">The easiest experience is often supported by the hardest work behind the scenes.</p>
              <div className="acb-body mt-7">
                <p>Preparation before problems. Communication before questions. Consistency before recognition. Craftsmanship without shortcuts.</p>
                <p>From early planning and construction management to the final walkthrough, our role is to simplify complexity, manage the details, communicate clearly, and make the process feel as intentional as the finished home.</p>
              </div>
              <BrandActions
                primaryHref="/services"
                primaryLabel="Explore Our Services"
                secondaryHref="/portfolio"
                secondaryLabel="View Our Gallery"
                inverse
              />
            </div>
          </div>

          <div className="acb-standard-grid">
            {standards.map(([number, title, description]) => (
              <article key={number} className="acb-standard-card">
                <p className="acb-standard-card__number">{number}</p>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="acb-section acb-section--paper">
        <div className="acb-shell">
          <div className="acb-section__intro">
            <p className="acb-kicker">Selected Work</p>
            <div className="acb-section__content">
              <h2 className="acb-heading">Personal homes. Thoughtful details.</h2>
              <p className="acb-section-lede mt-7">No two homes should feel the same because no two clients live the same.</p>
            </div>
          </div>
          <div className="acb-projects">
            {featuredProjects.map((project) => (
              <Link key={project.slug} href={`/portfolio/${project.slug}`} className="acb-project-card">
                <Image
                  src={getProjectCardImage(project.slug, project.coverImage)}
                  alt={`${project.title} residence by Alford Custom Builders`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 901px) 33vw, 100vw"
                />
                <div className="acb-project-card__copy">
                  <p>Alford Residence</p>
                  <h3>{project.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ClosingPanel
        title="Your Home Should Feel Like You."
        subheadline="So should the experience of building it."
        intro="If you are thinking about building, you do not need to have every decision made before reaching out. Sometimes the best place to begin is simply a conversation about what you want to create."
        primaryHref="/contact#project-form"
        primaryLabel="Tell Us About Your Home"
        secondaryHref="/contact"
        secondaryLabel="Contact Alford"
      />
    </>
  );
}
