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
        primaryHref="#ben-alford"
        primaryLabel="Meet Ben Alford"
        secondaryHref="/contact"
        secondaryLabel="Start a Conversation"
      />

      <StatementBand statement={<>The home is the product.<br />The experience is the brand.</>} />

      <section className="acb-section acb-section--paper" id="ben-alford">
        <div className="acb-shell">
          <div className="acb-section__intro">
            <p className="acb-kicker">Meet Ben Alford</p>
            <div className="acb-section__content">
              <h2 className="acb-heading">A family tradition. A vision of his own.</h2>
              <p className="acb-section-lede">A second-generation builder who believes the experience matters as much as the home.</p>
              <div className="acb-body">
                <p>Ben Alford grew up in the homebuilding business. He worked alongside his family and later helped lead the family company. Those years taught him that a well-built home depends on more than skilled construction. It depends on trust, clear communication, and care for the people who will live there.</p>
                <p>With Alford Custom Builders, Ben is carrying that family tradition forward while creating something distinctly his own. His focus is on timeless architecture, refined craftsmanship, and homes thoughtfully shaped around the way each family lives.</p>
                <p>Ben stays close to every project, from the first conversation to the final details. He listens, asks the right questions, and takes personal responsibility for the experience as well as the result. For him, the goal is simple: a home that feels unmistakably yours, built through a relationship you can feel good about.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            src="/images/prestonshire-coming-soon.jpg"
            alt="Architectural rendering of the Prestonshire residence by Alford Custom Builders"
            fill
            className="object-cover object-[58%_center] saturate-[0.85] contrast-[1.03]"
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
