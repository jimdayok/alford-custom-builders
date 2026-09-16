import type { Metadata } from "next";
import Image from "next/image";

import { BrandActions } from "@/components/brand/brand-actions";
import { ClosingPanel } from "@/components/brand/closing-panel";
import { EditorialHero } from "@/components/brand/editorial-hero";
import { StatementBand } from "@/components/brand/statement-band";
import { PreviewTwoServices } from "@/components/preview-two/services";
import { getPreviewVersion } from "@/lib/preview-version";

export const metadata: Metadata = {
  title: "Custom Home Building Services",
  description:
    "Explore custom home building, remodeling, and additions from Alford Custom Builders.",
};

export default async function ServicesPage() {
  const previewVersion = await getPreviewVersion();
  if (previewVersion === "preview2") return <PreviewTwoServices />;

  return (
    <>
      <EditorialHero
        eyebrow="Services"
        title="Built Around You."
        subheadline="A custom home should begin with your life — not someone else's blueprint."
        intro={
          <>
            <p>Every project begins differently.</p>
            <p>You may have land. Architectural plans. Inspiration. A growing family. A new chapter. Or simply the belief that the home you want has not been built yet.</p>
            <p>Alford Custom Builders brings the people, planning, craftsmanship, and oversight together to turn that vision into a home that feels unmistakably yours.</p>
          </>
        }
        image="/images/4301-armstrong-pkwy-hf-1-1.jpg"
        imageAlt="Custom home built by Alford Custom Builders"
        primaryHref="/contact#project-form"
        primaryLabel="Tell Us About Your Project"
        secondaryHref="/portfolio"
        secondaryLabel="View Our Work"
      />

      <StatementBand statement="Preparation before problems." />

      <section className="acb-split" id="custom-homes">
        <div className="acb-split__media">
          <Image
            src="/images/3534-greenbrier-dr-52.jpg"
            alt="Custom kitchen and living space by Alford Custom Builders"
            fill
            className="object-cover"
            sizes="(min-width: 901px) 52vw, 100vw"
          />
        </div>
        <div className="acb-split__copy">
          <p className="acb-kicker">Custom Homes</p>
          <h2 className="acb-heading mt-6">Custom Home Building</h2>
          <p className="acb-section-lede mt-7">From the first idea to the final detail.</p>
          <div className="acb-body mt-7">
            <p>Building a custom home gives you the opportunity to create something deeply personal.</p>
            <p>Our role is to make a complex process feel clear through careful preparation, collaborative decision-making, disciplined construction management, trusted trade relationships, and consistent communication.</p>
            <p>Every detail serves the larger vision: a home designed around the way you want to live.</p>
          </div>
          <BrandActions
            primaryHref="/contact"
            primaryLabel="Start Your Custom Home"
            secondaryHref="/portfolio"
            secondaryLabel="Explore the Gallery"
          />
        </div>
      </section>

      <section className="acb-section acb-section--blanket" id="pre-construction">
        <div className="acb-shell">
          <div className="acb-section__intro">
            <p className="acb-kicker">Pre-Construction</p>
            <div className="acb-section__content">
              <h2 className="acb-heading">Good Construction Starts Before Construction.</h2>
              <p className="acb-section-lede mt-7">Preparation creates clarity. Clarity creates confidence.</p>
              <div className="acb-body mt-7">
                <p>Many of the decisions that determine the success of a project happen before construction begins.</p>
                <p>Planning. Budget conversations. Site considerations. Design coordination. Scheduling. Material selections. Trade involvement.</p>
                <p>The more intentionally those pieces come together early, the fewer surprises clients experience later.</p>
                <p>It is part of the Alford standard: preparation before problems.</p>
              </div>
              <BrandActions
                primaryHref="/contact"
                primaryLabel="Talk About Your Project"
                secondaryHref="/about"
                secondaryLabel="Why Alford"
              />
            </div>
          </div>
        </div>
      </section>

      <StatementBand statement="Details handled. Expectations clear." />

      <section className="acb-split acb-split--reverse" id="construction-management">
        <div className="acb-split__copy">
          <p className="acb-kicker">Construction Management</p>
          <h2 className="acb-heading mt-6">Details Handled. Expectations Clear.</h2>
          <p className="acb-section-lede mt-7">You should never feel like you need to manage your builder.</p>
          <div className="acb-body mt-7">
            <p>A custom home includes hundreds of decisions, trades, timelines, materials, inspections, and moving pieces.</p>
            <p>Our responsibility is to bring those pieces together, maintain quality, communicate progress, anticipate challenges, and keep the project moving with purpose.</p>
            <p>Our clients may never see every detail happening behind the scenes. They should simply feel the difference.</p>
          </div>
          <BrandActions
            primaryHref="/our-process"
            primaryLabel="Learn About Our Approach"
            secondaryHref="/contact"
            secondaryLabel="Contact Us"
          />
        </div>
        <div className="acb-split__media">
          <Image
            src="/images/4301-armstrong-pkwy-hf-1-59.jpg"
            alt="Carefully executed custom home interior by Alford Custom Builders"
            fill
            className="object-cover"
            sizes="(min-width: 901px) 48vw, 100vw"
          />
        </div>
      </section>

      <ClosingPanel
        title="Have Land? Plans? Or Just an Idea?"
        subheadline="You do not need to have everything figured out before you reach out."
        intro="Tell us where you are in the process and what you hope to build. We can begin there."
        primaryHref="/contact"
        primaryLabel="Start the Conversation"
        secondaryHref="/about"
        secondaryLabel="Meet Alford"
      />
    </>
  );
}
