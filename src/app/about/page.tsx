import type { Metadata } from "next";
import Image from "next/image";

import { BrandActions } from "@/components/brand/brand-actions";
import { ClosingPanel } from "@/components/brand/closing-panel";
import { EditorialHero } from "@/components/brand/editorial-hero";
import { StatementBand } from "@/components/brand/statement-band";
import { PreviewTwoAbout } from "@/components/preview-two/about";
import { getPreviewVersion } from "@/lib/preview-version";

export const metadata: Metadata = {
  title: "About Alford",
  description:
    "Meet Alford Custom Builders and discover the preparation, relationships, communication, and standards behind every exceptional home.",
};

const values = [
  "People before projects.",
  "Trust before transactions.",
  "Preparation before promises.",
  "Details over shortcuts.",
  "Action over words.",
  "Experience over ego.",
];

export default async function AboutPage() {
  const previewVersion = await getPreviewVersion();
  if (previewVersion === "preview2") return <PreviewTwoAbout />;

  return (
    <>
      <EditorialHero
        eyebrow="About Alford"
        title={
          <>
            Building Homes Is What We Do.
            <span className="acb-display__secondary">How We Build Relationships Is Who We Are.</span>
          </>
        }
        subheadline="Because the home is the product. The experience is the brand."
        intro={
          <>
            <p>At Alford Custom Builders, we believe exceptional craftsmanship should be expected from a luxury builder.</p>
            <p>What should set a builder apart is everything surrounding it — thoughtful preparation, honest conversations, clear communication, consistent execution, and a genuine commitment to the people trusting us with their home.</p>
            <p>Every meeting, update, detail, and promise contributes to the reputation of the company.</p>
          </>
        }
        image="/images/headshot.png"
        imageAlt="Ben Alford of Alford Custom Builders"
        imagePosition="object-top"
        primaryHref="#difference"
        primaryLabel="Meet Alford"
        secondaryHref="/contact"
        secondaryLabel="Start a Conversation"
      />

      <StatementBand statement={<>The home is the product.<br />The experience is the brand.</>} />

      <section className="acb-split acb-split--reverse" id="difference">
        <div className="acb-split__copy acb-split__copy--blanket">
          <p className="acb-kicker">What We Believe</p>
          <h2 className="acb-heading mt-6">What We Believe</h2>
          <p className="acb-section-lede mt-7">Luxury does not begin with materials. It begins with understanding.</p>
          <div className="acb-body mt-7">
            <p>Understanding how you live. What matters to your family. How you want your home to feel. What details will make everyday life easier, better, and more personal.</p>
            <p>We believe the strongest homes are built when craftsmanship and relationships receive the same level of attention.</p>
          </div>
          <BrandActions
            primaryHref="/services#pre-construction"
            primaryLabel="Our Building Philosophy"
            secondaryHref="/portfolio"
            secondaryLabel="See Our Work"
          />
        </div>
        <div className="acb-split__media">
          <Image
            src="/images/4301-armstrong-pkwy-hf-1-154.jpg"
            alt="Refined interior detail by Alford Custom Builders"
            fill
            className="object-cover"
            sizes="(min-width: 901px) 48vw, 100vw"
          />
        </div>
      </section>

      <section className="acb-section acb-section--paper">
        <div className="acb-shell">
          <div className="acb-section__intro">
            <p className="acb-kicker">Values &amp; Standards</p>
            <div className="acb-section__content">
              <h2 className="acb-heading">What We Stand For</h2>
              <p className="acb-section-lede mt-7">Simple principles. High standards. No shortcuts.</p>
              <div className="acb-body mt-7">
                <p>Our values influence every decision we make.</p>
                <p>They are not marketing statements. They are the standard our clients should experience throughout the relationship.</p>
              </div>
              <div className="acb-values">
                {values.map((value) => <p key={value}>{value}</p>)}
              </div>
              <BrandActions
                primaryHref="/contact"
                primaryLabel="Experience the Difference"
                secondaryHref="/services"
                secondaryLabel="Explore Our Services"
              />
            </div>
          </div>
        </div>
      </section>

      <StatementBand statement="Preparation before promises." />

      <ClosingPanel
        eyebrow="Our Vision"
        title="We Are Not Trying to Be the Biggest."
        subheadline="We want to be the builder people measure everyone else against."
        intro="Known for exceptional homes, yes. But also for calm leadership. Honest conversations. Thoughtful preparation. Exceptional execution. And relationships that continue long after move-in day. That is the company we are building."
        primaryHref="/contact"
        primaryLabel="Start Your Home"
        secondaryHref="/portfolio"
        secondaryLabel="View Our Gallery"
      />
    </>
  );
}
