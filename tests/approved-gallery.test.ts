import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import config from "../next.config";
import { portfolioProjects } from "../src/data/portfolio";

describe("approved public gallery release", () => {
  it("pins static content even when the hosting environment enables the legacy CMS", () => {
    expect(config.env?.CMS_ENABLED).toBe("false");
  });
  it("retains the approved six projects and all 134 photographs", () => {
    expect(portfolioProjects.map(p => p.title)).toEqual(["Armstrong", "Bryn Mawr", "Deloache", "Greenbrier", "Harrys", "Palomar"]);
    expect(portfolioProjects.reduce((n, p) => n + p.images.length, 0)).toBe(134);
    for (const project of portfolioProjects) {
      expect(project.images.some(i => i.src === project.coverImage)).toBe(true);
      for (const image of project.images) expect(existsSync(path.join(process.cwd(), "public", image.src)), image.src).toBe(true);
    }
  });
});
