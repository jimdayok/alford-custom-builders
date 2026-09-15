import type { Metadata } from "next";
import Image from "next/image";

import { BrandActions } from "@/components/brand/brand-actions";
import { ClosingPanel } from "@/components/brand/closing-panel";
import { EditorialHero } from "@/components/brand/editorial-hero";
import { StatementBand } from "@/components/brand/statement-band";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { siteConfig } from "@/lib/site-data";
import { getPortfolioProjects } from "@/lib/cms/published-content";
import { getPreviewVersion } from "@/lib/preview-version";

export async function generateMetadata(): Promise<Metadata> {
  const projects = await getPortfolioProjects();
  const description = "Explore personal homes, thoughtful details, and exceptional execution from Alford Custom Builders.";
  return {
    title: "Gallery",
    description,
    openGraph: {
      title: `Gallery | ${siteConfig.name}`,
      description,
      images: [{ url: projects[0]?.coverImage ?? "/opengraph-image", alt: projects[0]?.title ?? siteConfig.name }],
    },
  };
}

export default async function PortfolioPage() {
  const [previewVersion, projects] = await Promise.all([
    getPreviewVersion(),
    getPortfolioProjects(),
  ]);

  if (previewVersion === "preview2") {
    return (
      <section className="acb-v2-gallery">
        <div className="acb-shell">
          <div className="acb-v2-gallery__heading">
            <p className="acb-kicker">Gallery</p>
            <h1>The homes do the talking.</h1>
          </div>
          <PortfolioGrid projects={projects} />
        </div>
      </section>
    );
  }

  return (
    <>
      <EditorialHero
        eyebrow="Gallery"
        title="Crafted With Intention."
        subheadline="Personal homes. Thoughtful details. Exceptional execution."
        intro={
          <p>No two Alford homes should look exactly alike because no two clients live exactly alike. Explore a collection of homes and spaces shaped by personal vision, thoughtful design, careful craftsmanship, and the details that make each project distinct.</p>
        }
        image="/images/thumbs/armstrong-pkwy-card.jpg"
        imageAlt="A crafted Dallas residence by Alford Custom Builders"
        primaryHref="#projects"
        primaryLabel="Explore Our Projects"
        secondaryHref="/contact"
        secondaryLabel="Start Your Own"
      />

      <section className="acb-section acb-section--paper">
        <div className="acb-shell">
          <div className="acb-section__intro">
            <p className="acb-kicker">Project Stories</p>
            <div className="acb-section__content">
              <h2 className="acb-heading">More Than Beautiful Rooms.</h2>
              <p className="acb-section-lede mt-7">Every project begins with a reason.</p>
              <div className="acb-body mt-7">
                <p>Behind every kitchen, living space, exterior, primary suite, or architectural detail is a homeowner who wanted something specific from their home.</p>
                <p>More room to gather. Better flow. Natural light. Privacy. Connection. A stronger relationship between indoors and outdoors.</p>
                <p>The design may change from project to project. The level of intention does not.</p>
              </div>
              <BrandActions
                primaryHref="#projects"
                primaryLabel="View Featured Projects"
                secondaryHref="/services"
                secondaryLabel="Our Building Approach"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="acb-section acb-section--organic" id="projects">
        <div className="acb-shell">
          <div className="acb-section__intro mb-14">
            <p className="acb-kicker">Selected Residences</p>
            <div className="acb-section__content">
              <h2 className="acb-heading">The homes do the talking.</h2>
            </div>
          </div>
          <PortfolioGrid projects={projects} />
        </div>
      </section>

      <StatementBand statement="We notice what others overlook." />

      <section className="acb-split">
        <div className="acb-split__media">
          <Image
            src="/images/3529-bryn-mawr-dr-34.jpg"
            alt="Thoughtful architectural detail in an Alford custom home"
            fill
            className="object-cover"
            sizes="(min-width: 901px) 52vw, 100vw"
          />
        </div>
        <div className="acb-split__copy acb-split__copy--blanket">
          <p className="acb-kicker">The Details</p>
          <h2 className="acb-heading mt-6">Thoughtful From Every Angle.</h2>
          <p className="acb-section-lede mt-7">The details you notice matter. So do the ones you never see.</p>
          <div className="acb-body mt-7">
            <p>Exceptional craftsmanship is not limited to dramatic finishes or statement spaces.</p>
            <p>It is found in alignment, proportions, planning, transitions, materials, construction methods, and countless small decisions made correctly along the way.</p>
            <p>We notice what others overlook.</p>
          </div>
          <BrandActions
            primaryHref="#projects"
            primaryLabel="See the Details"
            secondaryHref="/services"
            secondaryLabel="Explore Services"
          />
        </div>
      </section>

      <ClosingPanel
        title="Imagine What We Could Build Around You."
        subheadline="Your home does not need to look like someone else's to be exceptional."
        intro="The best custom homes begin with understanding the people who will live inside them. Tell us about the one you are imagining."
        primaryHref="/contact"
        primaryLabel="Start Your Project"
        secondaryHref="/contact"
        secondaryLabel="Contact Alford"
      />
    </>
  );
}
