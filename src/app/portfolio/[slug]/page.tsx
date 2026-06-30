import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CTA } from "@/components/cta";
import { ProjectHero } from "@/components/portfolio/project-hero";
import { ProjectSlideshow } from "@/components/portfolio/project-slideshow";
import {
  getPortfolioProject,
  getProjectHref,
  portfolioProjects,
} from "@/data/portfolio";
import { siteConfig } from "@/lib/site-data";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) {
    return {
      title: "Portfolio Project",
    };
  }

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `${siteConfig.url}${getProjectHref(project.slug)}`,
    },
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.description,
      images: [
        {
          url: project.coverImage,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${siteConfig.name}`,
      description: project.description,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <ProjectHero project={project} priority />

      <section className="border-b border-white/8 bg-[#11100e]">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] uppercase text-[#d2b38f] transition hover:text-[#f0d3b0]"
          >
            <span aria-hidden="true">←</span>
            Back to Portfolio
          </Link>
        </div>
      </section>

      <ProjectSlideshow project={project} />

      <section className="bg-[#13110f] pb-16 pt-2 sm:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <CTA
            title="Start Your Custom Home Conversation"
            description="If this level of craftsmanship and detail feels like the right fit, let’s talk about your project and the experience you want from your builder."
            primaryHref="/contact"
            primaryLabel="Discuss Your Project"
            secondaryHref="/portfolio"
            secondaryLabel="View More Projects"
          />
        </div>
      </section>
    </>
  );
}
