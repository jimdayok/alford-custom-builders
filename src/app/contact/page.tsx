import type { Metadata } from "next";

import { BrandActions } from "@/components/brand/brand-actions";
import { ClosingPanel } from "@/components/brand/closing-panel";
import { EditorialHero } from "@/components/brand/editorial-hero";
import { StatementBand } from "@/components/brand/statement-band";
import { LeadForm } from "@/components/home/lead-form";
import { getContactPageContent } from "@/lib/cms/published-content";

export const metadata: Metadata = {
  title: "Start a Conversation",
  description:
    "Tell Alford Custom Builders about the custom home you are considering and begin with a clear, personal conversation.",
};

export default async function ContactPage() {
  const { data } = await getContactPageContent();
  const phoneHref = `tel:${data.displayedPhone.replace(/[^+\d]/g, "")}`;

  return (
    <>
      <EditorialHero
        eyebrow="Contact"
        title="Every Great Home Starts With a Conversation."
        subheadline="Tell us what you are thinking. We'll help you understand what comes next."
        intro={
          <>
            <p>You may have property, plans, inspiration, and a clear vision.</p>
            <p>Or you may simply know you are ready to create something more personal.</p>
            <p>Either way, the first step is the same: a conversation.</p>
          </>
        }
        image="/images/6707Stefani-71.jpg"
        imageAlt="Warm custom home interior by Alford Custom Builders"
        primaryHref="#project-form"
        primaryLabel="Start Your Project"
        secondaryHref={phoneHref}
        secondaryLabel="Call Alford"
      />

      <section className="acb-section acb-section--paper">
        <div className="acb-shell">
          <div className="acb-section__intro">
            <p className="acb-kicker">The First Conversation</p>
            <div className="acb-section__content">
              <h2 className="acb-heading">No Pressure. Just Clarity.</h2>
              <p className="acb-section-lede mt-7">Choosing the right builder matters. So does knowing if the relationship feels right.</p>
              <div className="acb-body mt-7">
                <p>Our first conversation is an opportunity to learn about your project, understand where you are in the process, answer initial questions, and determine if Alford Custom Builders is the right fit for what you want to create.</p>
                <p>We believe trust is earned one conversation, one decision, and one promise at a time.</p>
              </div>
              <BrandActions
                primaryHref="#project-form"
                primaryLabel="Schedule a Conversation"
                secondaryHref="/about"
                secondaryLabel="Learn More About Alford"
              />
            </div>
          </div>
        </div>
      </section>

      <StatementBand statement="Trust is earned one promise at a time." />

      <section className="acb-form-panel" id="project-form">
        <div className="acb-form-panel__intro">
          <p className="acb-kicker">Project Form</p>
          <h2 className="acb-heading mt-6">Tell Us About Your Project.</h2>
          <p className="acb-section-lede mt-7">You do not have to have every answer yet.</p>
          <div className="acb-body mt-7">
            <p>Share what you know today.</p>
            <p>Where you want to build. What stage you are in. What you hope the home becomes. What matters most to you.</p>
            <p>The more we understand, the better conversation we can have.</p>
          </div>
          <a href={phoneHref} className="mt-9 inline-block border-b border-[var(--brand-organic)] pb-2 text-xs font-bold tracking-[0.18em] uppercase text-[var(--brand-organic)]">
            Prefer to Call? {data.displayedPhone}
          </a>
        </div>
        <div className="acb-form-panel__body">
          <LeadForm />
        </div>
      </section>

      <ClosingPanel
        title="Luxury Is Personal."
        subheadline="The relationship with your builder should be, too."
        intro="Our promise is simple: to care about your home, your investment, your family, and the experience of building it. And to earn your trust through preparation, communication, and consistency."
        primaryHref="#project-form"
        primaryLabel="Let's Talk"
        secondaryHref="/portfolio"
        secondaryLabel="Explore Our Work"
      />
    </>
  );
}
