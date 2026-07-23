import Image from "next/image";

import type { PortfolioProject } from "@/data/portfolio";

type ProjectHeroProps = {
  project: PortfolioProject;
  priority?: boolean;
};

export function ProjectHero({ project, priority = false }: ProjectHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#141311]">
      <div className="absolute inset-0">
        <Image
          src={project.coverImage}
          alt={`${project.title} cover image`}
          fill
          priority={priority}
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.26),rgba(10,10,10,0.72)_45%,rgba(10,10,10,0.92))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,165,117,0.18),transparent_30%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[72svh] max-w-7xl items-end px-5 pb-12 pt-28 sm:px-6 lg:px-8 lg:pb-18">
        <div className="max-w-4xl animate-fade">
          <p className="text-xs font-semibold tracking-[0.36em] uppercase text-[#d2b38f]">
            Portfolio
          </p>
          <h1 className="mt-5 font-serif text-5xl leading-none text-[#f7f1e7] sm:text-6xl lg:text-7xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#efe8dc]/76 sm:text-lg">
            {project.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold tracking-[0.22em] uppercase text-[#cfb08b]">
            <span className="rounded-full border border-white/12 bg-white/6 px-4 py-2">
              {project.photoCount} Photos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
