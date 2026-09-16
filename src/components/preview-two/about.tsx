import Image from "next/image";

import { BrandActions } from "@/components/brand/brand-actions";
import { EditorialHero } from "@/components/brand/editorial-hero";
import { StatementBand } from "@/components/brand/statement-band";

const values = [
  "People before projects.",
  "Trust before transactions.",
  "Preparation before promises.",
  "Details over shortcuts.",
  "Action over words.",
  "Experience over ego.",
];

export function PreviewTwoAbout() {
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
            <p>At Alford Custom Builders, exceptional craftsmanship is the beginning.</p>
            <p>Thoughtful preparation, honest conversations, clear communication, and genuine care shape everything around it.</p>
          </>
        }
        image="/images/headshot.png"
        imageAlt="Ben Alford of Alford Custom Builders"
        imagePosition="object-top"
        primaryHref="#beliefs"
        primaryLabel="What We Believe"
        secondaryHref="/contact"
        secondaryLabel="Start a Conversation"
      />

      <StatementBand statement={<>The home is the product.<br />The experience is the brand.</>} />

      <section className="acb-split acb-split--reverse" id="beliefs">
        <div className="acb-split__copy acb-split__copy--blanket">
          <p className="acb-kicker">What We Believe</p>
          <h2 className="acb-heading mt-6">Luxury begins with understanding.</h2>
          <div className="acb-body mt-7">
            <p>Understanding how you live. What matters to your family. How you want your home to feel.</p>
            <p>The strongest homes are built when craftsmanship and relationships receive the same level of attention.</p>
          </div>
          <BrandActions
            primaryHref="/services"
            primaryLabel="Our Services"
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
              <p className="acb-section-lede mt-7">Our values influence every decision we make.</p>
              <div className="acb-values">
                {values.map((value) => <p key={value}>{value}</p>)}
              </div>
              <BrandActions
                primaryHref="/contact"
                primaryLabel="Start a Conversation"
                secondaryHref="/services"
                secondaryLabel="Explore Our Services"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
