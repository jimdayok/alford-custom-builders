import fs from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const manifestPath = path.join(rootDir, "src/data/project-photo-manifest.json");
const projects = JSON.parse(await fs.readFile(manifestPath, "utf8"));
const seen = new Set();
for (const project of projects) {
  if (!project.title || !project.slug || project.images.length === 0) throw new Error("Invalid photo project");
  if (!project.images.some((image) => image.src === project.coverImage)) throw new Error(`Missing cover: ${project.title}`);
  for (const image of project.images) {
    if (!image.src.startsWith(`/images/projects-20261004/${project.slug}/`) || image.src.includes("..") || seen.has(image.src)) throw new Error(`Invalid or duplicate photo: ${image.src}`);
    seen.add(image.src);
    await fs.access(path.join(rootDir, "public", image.src));
  }
}
await fs.writeFile(path.join(rootDir, "src/data/generated-portfolio.json"), JSON.stringify(projects, null, 2) + "\n");
console.log(`Verified ${projects.length} named projects and ${seen.size} supplied photographs.`);
