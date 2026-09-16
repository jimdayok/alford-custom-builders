import Image from "next/image";

import { LeadForm } from "@/components/home/lead-form";
import { getContactPageContent } from "@/lib/cms/published-content";
import { siteConfig } from "@/lib/site-data";

export async function PreviewTwoContact() {
  const { data } = await getContactPageContent();
  const phoneHref = `tel:${data.displayedPhone.replace(/[^+\d]/g, "")}`;

  return (
    <section className="acb-v2-contact">
      <div className="acb-v2-contact__intro">
        <div className="acb-v2-contact__image">
          <Image
            src="/images/6707Stefani-71.jpg"
            alt="Warm custom home interior by Alford Custom Builders"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 900px) 42vw, 100vw"
          />
        </div>
        <div className="acb-v2-contact__copy">
          <p className="acb-kicker">Contact</p>
          <h1>Tell us what you want to create.</h1>
          <a href={phoneHref}>{data.displayedPhone}</a>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </div>
      </div>
      <div className="acb-v2-contact__form" id="project-form">
        <p className="acb-kicker">Start a Conversation</p>
        <LeadForm />
      </div>
    </section>
  );
}
