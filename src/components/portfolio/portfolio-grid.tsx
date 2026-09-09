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
      <div className="flex flex-wrap gap-2 border-b border-[rgba(242,224,209,0.2)] pb-7">
        {projectFilters.map((filter) => {
          const isActive = filter === activeProject;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveProject(filter)}
              className={`border px-4 py-2 text-[0.65rem] font-bold tracking-[0.2em] uppercase transition duration-300 ${
                isActive
                  ? "border-[var(--brand-apricot)] bg-[var(--brand-apricot)] text-[var(--brand-ink)]"
                  : "border-[rgba(242,224,209,0.24)] bg-transparent text-[rgba(242,224,209,0.74)] hover:border-[var(--brand-apricot)] hover:text-[var(--brand-blanket)]"
              }`}
              aria-pressed={isActive}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="mt-8 columns-1 gap-4 md:columns-2 xl:columns-3">
        {visibleProjects.map((project, index) => (
          <div key={project.slug} className="mb-4 break-inside-avoid">
            <ProjectCard project={project} priority={index < 2} />
          </div>
        ))}
      </div>
    </div>
  );
}
