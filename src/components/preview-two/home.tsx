import Image from "next/image";
import Link from "next/link";

import { PreviewLogoLink } from "@/components/preview-logo-link";
import { getProjectCardImage } from "@/data/portfolio";
import { getPortfolioProjects } from "@/lib/cms/published-content";

export async function PreviewTwoHome() {
  const projects = (await getPortfolioProjects()).slice(0, 3);

  return (
    <>
      <section className="acb-v2-home">
        <Image
          src="/images/3529-bryn-mawr-dr-1.jpg"
          alt="Front elevation of a custom residence by Alford Custom Builders"
          fill
          preload
          quality={75}
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="acb-v2-home__veil" />
        <div className="acb-v2-home__center">
          <PreviewLogoLink previewVersion="preview2" variant="hero" />
          <p className="acb-v2-home__slogan">Luxury. Personalized.</p>
          <div className="acb-v2-home__actions">
            <Link href="/contact#project-form">Start a Conversation</Link>
            <Link href="/portfolio">Explore Our Work</Link>
          </div>
        </div>
      </section>

      <section className="acb-v2-standard" id="difference">
        <div className="acb-v2-standard__image">
          <Image
            src="/images/4301-armstrong-pkwy-hf-1-141.jpg"
            alt="Light-filled interior crafted by Alford Custom Builders"
            fill
            className="object-cover"
            sizes="(min-width: 900px) 50vw, 100vw"
          />
        </div>
        <div className="acb-v2-standard__copy">
          <p className="acb-kicker">Our Difference</p>
          <h2>Luxury Is Personal.</h2>
          <p>A luxury home isn&apos;t defined by the materials, but by how the experience is made personal to you.</p>
          <Link href="/about">About Alford <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="acb-v2-expectations">
        <div className="acb-shell">
          <p className="acb-kicker">Expectations</p>
          <div className="acb-v2-expectations__grid">
            <h2>A clear process. A personal experience.</h2>
            <div>
              <p>Preparation before problems. Communication before questions. Craftsmanship without shortcuts.</p>
              <p>From early planning through the final walkthrough, our role is to simplify complexity, manage the details, communicate clearly, and make the process feel as intentional as your finished home.</p>
              <Link href="/services">Explore Our Services <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="acb-v2-work">
        <div className="acb-shell">
          <div className="acb-v2-work__heading">
            <div>
              <p className="acb-kicker">Selected Work</p>
              <h2>Personal homes. Thoughtful details.</h2>
            </div>
            <Link href="/portfolio">View the Gallery <span aria-hidden="true">→</span></Link>
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

      <section className="acb-v2-start">
        <div className="acb-shell">
          <p className="acb-kicker">Start Here</p>
          <h2>Every great home starts with a conversation.</h2>
          <p>If you are thinking about building, you don&apos;t need to have every decision made before reaching out. Often, the best place to begin is with a conversation. Let us help.</p>
          <div className="acb-v2-start__actions">
            <Link href="/contact#project-form">Start a Conversation</Link>
            <Link href="/portfolio">Explore Our Work</Link>
          </div>
        </div>
      </section>
    </>
  );
}
