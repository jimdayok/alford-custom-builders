import fs from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const imagesDir = path.join(rootDir, "public", "images");
const outputFile = path.join(rootDir, "src", "data", "generated-portfolio.ts");
const outputJsonFile = path.join(rootDir, "src", "data", "generated-portfolio.json");

const projectDefinitions = [
  {
    slug: "bryn-mawr-dr",
    title: "Bryn Mawr Dr",
    matchers: [/bryn/, /mawr/],
  },
  {
    slug: "greenbrier-dr",
    title: "Greenbrier Dr",
    matchers: [/greenbrier/, /greenrbrier/],
  },
  {
    slug: "armstrong-pkwy",
    title: "Armstrong Pkwy",
    matchers: [/armstrong/],
  },
  {
    slug: "deloache-ave",
    title: "Deloache Ave",
    matchers: [/deloache/],
  },
  {
    slug: "stefani-dr",
    title: "Stefani Dr",
    matchers: [/stefani/],
  },
];

const roomDefinitions = [
  { label: "Kitchen", patterns: [/kitchen/] },
  { label: "Living", patterns: [/\bliving\b/] },
  { label: "Great Room", patterns: [/great[-_\s]?room/, /\bgreatroom\b/] },
  { label: "Dining", patterns: [/dining/] },
  {
    label: "Bath",
    patterns: [/primary[-_\s]?bath/, /bathroom/, /\bbath\b/],
  },
  {
    label: "Bedroom",
    patterns: [/primary[-_\s]?bedroom/, /\bbedroom\b/],
  },
  { label: "Exterior", patterns: [/exterior/, /front/, /facade/] },
  { label: "Entry", patterns: [/entry/, /foyer/] },
  { label: "Office", patterns: [/office/, /study/] },
  { label: "Bar", patterns: [/\bbar\b/] },
  { label: "Laundry", patterns: [/laundry/, /mudroom/] },
  { label: "Staircase", patterns: [/staircase/, /\bstairs?\b/] },
  { label: "Patio", patterns: [/patio/, /outdoor/, /pool/] },
  { label: "Details", patterns: [/detail/, /millwork/, /fireplace/] },
];

const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const excludedPathParts = new Set(["placeholders"]);
const excludedFilePatterns = [/alford-custom-builders/i];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (excludedPathParts.has(entry.name.toLowerCase())) {
          return [];
        }

        return walk(fullPath);
      }

      return [fullPath];
    }),
  );

  return files.flat();
}

function naturalCompare(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function normalizeForMatch(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ");
}

function inferProject(normalizedName) {
  for (const project of projectDefinitions) {
    if (project.matchers.some((matcher) => matcher.test(normalizedName))) {
      return project;
    }
  }

  return {
    slug: "other-projects",
    title: "Other Projects",
    matchers: [],
  };
}

function inferRoom(normalizedName) {
  for (const room of roomDefinitions) {
    if (room.patterns.some((pattern) => pattern.test(normalizedName))) {
      return room.label;
    }
  }

  return "Featured Space";
}

function sentenceCaseLabel(value) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function inferCaption(projectTitle, roomLabel, fileBaseName) {
  const cleanedBase = sentenceCaseLabel(
    fileBaseName
      .replace(/\b\d+\b/g, " ")
      .replace(/\b(hf)\b/gi, " ")
      .replace(/\b(dr|ave|pkwy)\b/gi, " ")
      .replace(/\b(bryn|mawr|greenbrier|greenrbrier|armstrong|deloache|stefani)\b/gi, " "),
  );

  if (cleanedBase && cleanedBase !== "Hf") {
    return `${projectTitle} • ${roomLabel}`;
  }

  return `${projectTitle} • ${roomLabel}`;
}

function inferAlt(projectTitle, roomLabel, index) {
  return `${projectTitle} ${roomLabel.toLowerCase()} view ${index + 1}`;
}

async function main() {
  const imageFiles = (await walk(imagesDir))
    .filter((filePath) => supportedExtensions.has(path.extname(filePath).toLowerCase()))
    .filter((filePath) => !excludedFilePatterns.some((pattern) => pattern.test(path.basename(filePath))))
    .sort(naturalCompare);

  const groupedProjects = new Map();

  for (const filePath of imageFiles) {
    const relativePath = path.relative(path.join(rootDir, "public"), filePath);
    const src = `/${relativePath.split(path.sep).join("/")}`;
    const fileBaseName = path.basename(filePath, path.extname(filePath));
    const normalizedName = normalizeForMatch(fileBaseName);
    const project = inferProject(normalizedName);
    const room = inferRoom(normalizedName);

    if (!groupedProjects.has(project.slug)) {
      groupedProjects.set(project.slug, {
        title: project.title,
        slug: project.slug,
        images: [],
      });
    }

    const projectEntry = groupedProjects.get(project.slug);
    const imageIndex = projectEntry.images.length;

    projectEntry.images.push({
      src,
      filename: path.basename(filePath),
      room,
      alt: inferAlt(project.title, room, imageIndex),
      caption: inferCaption(project.title, room, fileBaseName),
    });
  }

  const orderedProjects = Array.from(groupedProjects.values())
    .filter((project) => project.images.length > 0)
    .sort((a, b) => {
      const orderA = projectDefinitions.findIndex((project) => project.slug === a.slug);
      const orderB = projectDefinitions.findIndex((project) => project.slug === b.slug);
      const normalizedOrderA = orderA === -1 ? Number.MAX_SAFE_INTEGER : orderA;
      const normalizedOrderB = orderB === -1 ? Number.MAX_SAFE_INTEGER : orderB;

      if (normalizedOrderA !== normalizedOrderB) {
        return normalizedOrderA - normalizedOrderB;
      }

      return naturalCompare(a.title, b.title);
    })
    .map((project) => ({
      ...project,
      images: project.images.sort((a, b) => naturalCompare(a.filename, b.filename)),
      coverImage: project.images[0]?.src ?? null,
    }));

  const fileContents = `// This file is auto-generated by scripts/generate-portfolio-data.mjs.
// Do not edit manually.

import generatedPortfolioJson from "./generated-portfolio.json";

export type GeneratedPortfolioImage = {
  src: string;
  filename: string;
  room: string;
  alt: string;
  caption: string;
};

export type GeneratedPortfolioProject = {
  title: string;
  slug: string;
  images: GeneratedPortfolioImage[];
  coverImage: string | null;
};

export const generatedPortfolio =
  generatedPortfolioJson as GeneratedPortfolioProject[];
`;

  const jsonContents = `[
${orderedProjects.map((project) => JSON.stringify(project, null, 2)).join(",\n")}
]
`;

  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(outputJsonFile, jsonContents);
  await fs.writeFile(outputFile, fileContents);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
