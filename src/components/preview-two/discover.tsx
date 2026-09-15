import Image from "next/image";
import Link from "next/link";

import { getProjectCardImage } from "@/data/portfolio";
import { getPortfolioProjects } from "@/lib/cms/published-content";

const services = [
  ["Custom Homes", "Personal residences shaped around the way you live."],
  ["Pre-Construction", "Early clarity for plans, priorities, and possibilities."],
  ["Construction Management", "Hands-on oversight from first detail to final walk-through."],
] as const;

export async function PreviewTwoDiscover() {
  const projects = (await getPortfolioProjects()).slice(0, 3);

  return (
    <>
      <section className="acb-v2-discover-hero">
        <div className="acb-v2-discover-hero__copy">
          <p className="acb-kicker">Discover Alford</p>
          <h1>Luxury.<br /><em>Personalized.</em></h1>
          <p>Homes shaped around the people who live in them.</p>
          <Link href="/portfolio">Explore the homes <span aria-hidden="true">→</span></Link>
        </div>
        <div className="acb-v2-discover-hero__image">
          <Image
            src="/images/4301-armstrong-pkwy-hf-1-141.jpg"
            alt="Light-filled custom interior by Alford Custom Builders"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 900px) 56vw, 100vw"
          />
        </div>
      </section>

      <section className="acb-v2-services">
        <div className="acb-shell">
          <p className="acb-kicker">What We Build</p>
          <div className="acb-v2-services__grid">
            {services.map(([title, description], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h2>{title}</h2>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="acb-v2-standard">
        <div className="acb-v2-standard__image">
          <Image
            src="/images/3534-greenbrier-dr-52.jpg"
            alt="Custom kitchen and gathering space by Alford Custom Builders"
            fill
            className="object-cover"
            sizes="(min-width: 900px) 50vw, 100vw"
          />
        </div>
        <div className="acb-v2-standard__copy">
          <p className="acb-kicker">The Alford Standard</p>
          <h2>The experience should feel as considered as the home.</h2>
          <p>Preparation. Communication. Craftsmanship. Follow-through.</p>
          <Link href="/contact">Start a conversation <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="acb-v2-work">
        <div className="acb-shell">
          <div className="acb-v2-work__heading">
            <div>
              <p className="acb-kicker">Selected Homes</p>
              <h2>Let the work speak.</h2>
            </div>
            <Link href="/portfolio">View the gallery <span aria-hidden="true">→</span></Link>
          </div>
          <div className="acb-v2-work__grid">
            {projects.map((project) => (
              <Link key={project.slug} href={`/portfolio/${project.slug}`}>
                <Image
                  src={getProjectCardImage(project.slug, project.coverImage)}
                  alt={`${project.title} residence by Alford Custom Builders`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 900px) 33vw, 100vw"
                />
                <span>{project.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
