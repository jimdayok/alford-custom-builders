import Image from "next/image";
import Link from "next/link";

import {
  getProjectCardImage,
  getProjectHref,
  type PortfolioProject,
} from "@/data/portfolio";

type ProjectCardProps = {
  project: PortfolioProject;
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const cardImage = getProjectCardImage(project.slug, project.coverImage);

  return (
    <Link
      href={getProjectHref(project.slug)}
      className="group relative block overflow-hidden border border-[rgba(242,224,209,0.16)] bg-[var(--brand-ink)] transition duration-500 hover:border-[var(--brand-apricot)]"
      style={{ contentVisibility: "auto", containIntrinsicSize: "680px" }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={cardImage}
          alt={`${project.title} featured image`}
          fill
          priority={priority}
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          quality={72}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_28%,rgba(35,31,32,0.18)_48%,rgba(35,31,32,0.9))]" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        <div className="inline-flex border border-white/14 bg-black/20 px-3 py-2 text-[10px] font-bold tracking-[0.22em] uppercase text-[var(--brand-apricot)] backdrop-blur-sm">
          {project.photoCount} Photos
        </div>
        <h3 className="mt-4 font-serif text-3xl text-[var(--brand-blanket)] sm:text-[2.15rem]">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}
