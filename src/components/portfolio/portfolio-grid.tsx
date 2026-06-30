"use client";

import { useMemo, useState } from "react";

import type { PortfolioProject } from "@/data/portfolio";

import { ProjectCard } from "@/components/portfolio/project-card";

type PortfolioGridProps = {
  projects: PortfolioProject[];
};

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [activeProject, setActiveProject] = useState("All");

  const projectFilters = useMemo(
    () => ["All", ...projects.map((project) => project.title)],
    [projects],
  );

  const visibleProjects = useMemo(() => {
    if (activeProject === "All") return projects;
    return projects.filter((project) => project.title === activeProject);
  }, [activeProject, projects]);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {projectFilters.map((filter) => {
          const isActive = filter === activeProject;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveProject(filter)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.22em] uppercase transition duration-300 ${
                isActive
                  ? "border-[#d2b38f] bg-[#d2b38f] text-[#171512]"
                  : "border-white/10 bg-white/[0.03] text-[#efe8dc]/72 hover:-translate-y-0.5 hover:border-[#d2b38f]/60 hover:text-[#f7f1e7]"
              }`}
              aria-pressed={isActive}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="mt-10 columns-1 gap-6 md:columns-2 xl:columns-3">
        {visibleProjects.map((project, index) => (
          <div key={project.slug} className="mb-6 break-inside-avoid">
            <ProjectCard project={project} priority={index < 2} />
          </div>
        ))}
      </div>
    </div>
  );
}
