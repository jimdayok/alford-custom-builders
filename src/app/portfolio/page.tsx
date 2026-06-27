import type { Metadata } from "next";

import { CTA } from "@/components/cta";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { featuredProjects } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse featured residential construction projects from Alford Custom Builders.",
};

const portfolioProjects = [
  ...featuredProjects,
  {
    title: "Harbor Point Manor",
    category: "Interior Reimagining",
    description:
      "A formal residence refreshed with gallery-like circulation, tailored stonework, and warm contemporary finishes.",
    image: "/images/placeholders/project-harbor.svg",
  },
  {
    title: "Cedar Bluff Estate",
    category: "Architectural Remodel",
    description:
      "Reworked structural volumes and exterior materials to create a more elegant, natural, and cohesive home.",
    image: "/images/placeholders/project-cedar.svg",
  },
  {
    title: "Oak Terrace Residence",
    category: "Custom New Build",
    description:
      "A layered family home with expansive glazing, crafted millwork, and spaces designed for gathering and retreat.",
    image: "/images/placeholders/project-oak.svg",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="A collection of homes defined by proportion, texture, and careful execution."
        description="Our portfolio represents the kind of residential work we love most: elegant, thoughtful homes that feel effortless because every detail was considered."
      />

      <section className="section-shell">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects that balance beauty, livability, and enduring construction quality."
          description="These featured concepts are representative of the tone, level of finish, and architectural character we bring to each engagement."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {portfolioProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>

      <section className="section-shell pt-20">
        <CTA
          title="Looking for the right builder for a design-driven project?"
          description="Let’s talk about the home you are planning and the kind of experience you want along the way."
          primaryHref="/contact"
          primaryLabel="Discuss Your Project"
          secondaryHref="/about"
          secondaryLabel="About The Firm"
        />
      </section>
    </>
  );
}
