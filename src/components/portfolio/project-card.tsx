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
      className="group relative block overflow-hidden rounded-[2rem] border border-white/10 bg-[#191714] shadow-[0_30px_90px_rgba(0,0,0,0.18)] transition duration-500 hover:-translate-y-1.5 hover:border-[#d2b38f]/45"
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(10,10,10,0.2)_45%,rgba(10,10,10,0.9))]" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        <div className="inline-flex rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[11px] font-semibold tracking-[0.24em] uppercase text-[#d2b38f] backdrop-blur-sm">
          {project.photoCount} Photos
        </div>
        <h3 className="mt-4 font-serif text-3xl text-[#f7f1e7] sm:text-[2.15rem]">
          {project.title}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-7 text-[#efe8dc]/72">
          {project.description}
        </p>
      </div>
    </Link>
  );
}
