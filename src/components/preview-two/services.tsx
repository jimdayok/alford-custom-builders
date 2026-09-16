import Image from "next/image";

import { BrandActions } from "@/components/brand/brand-actions";
import { ClosingPanel } from "@/components/brand/closing-panel";
import { EditorialHero } from "@/components/brand/editorial-hero";
import { StatementBand } from "@/components/brand/statement-band";

export function PreviewTwoServices() {
  return (
    <>
      <EditorialHero
        eyebrow="Services"
        title="Built Around You."
        subheadline="A custom home should begin with your life — not someone else's blueprint."
        intro={
          <>
            <p>Every project begins organically.</p>
            <p>You may have land. Architectural plans. Inspiration. A growing family. A new chapter. Or simply the belief that your dream home has not been built yet.</p>
            <p>We bring the people, planning, craftsmanship, and oversight together to create a home that feels uniquely yours.</p>
          </>
        }
        image="/images/4301-armstrong-pkwy-hf-1-1.jpg"
        imageAlt="Custom home built by Alford Custom Builders"
        primaryHref="/contact#project-form"
        primaryLabel="Tell Us About Your Project"
        secondaryHref="/portfolio"
        secondaryLabel="View Our Work"
      />

      <StatementBand statement="Every project begins organically." />

      <section className="acb-split" id="custom-builds">
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
          <p className="acb-kicker">Custom Builds</p>
          <h2 className="acb-heading mt-6">Designed around the way you want to live.</h2>
          <div className="acb-body mt-7">
            <p>We guide each ground-up home from the first idea through the final detail, keeping the process clear and the vision personal.</p>
          </div>
          <BrandActions
            primaryHref="/contact"
            primaryLabel="Start Your Custom Home"
            secondaryHref="/portfolio"
            secondaryLabel="Explore the Gallery"
          />
        </div>
      </section>

      <section className="acb-split acb-split--reverse" id="remodels-additions">
        <div className="acb-split__copy acb-split__copy--blanket">
          <p className="acb-kicker">Remodels / Additions</p>
          <h2 className="acb-heading mt-6">A thoughtful new chapter for the home you know.</h2>
          <div className="acb-body mt-7">
            <p>We reshape existing homes with respect for what belongs, clarity about what should change, and details that make every addition feel intentional.</p>
          </div>
          <BrandActions
            primaryHref="/contact"
            primaryLabel="Tell Us About Your Home"
            secondaryHref="/portfolio"
            secondaryLabel="See Our Work"
          />
        </div>
        <div className="acb-split__media">
          <Image
            src="/images/4906-deloache-ave-42.jpg"
            alt="Remodeled residence by Alford Custom Builders"
            fill
            className="object-cover"
            sizes="(min-width: 901px) 48vw, 100vw"
          />
        </div>
      </section>

      <ClosingPanel
        eyebrow="Begin Here"
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
