import { generatedPortfolio } from "@/data/generated-portfolio";

const projectDescriptions: Record<string, string> = {
  "bryn-mawr-dr":
    "A tailored residential composition with refined finishes, generous light, and spaces designed to feel quietly luxurious.",
  "greenbrier-dr":
    "An elegant family home defined by balanced proportions, warm materials, and a polished indoor-outdoor rhythm.",
  "armstrong-pkwy":
    "A grand custom residence layered with architectural detail, sculptural moments, and expansive gathering spaces.",
  "deloache-ave":
    "A sophisticated home with crisp detailing, elevated textures, and rooms choreographed for both entertaining and retreat.",
  "stefani-dr":
    "A high-touch residential project showcasing crafted interiors, rich natural light, and a calm contemporary palette.",
  "other-projects":
    "A curated collection of additional custom builder work, selected to highlight craftsmanship across a range of spaces.",
};

export type PortfolioImage = {
  src: string;
  filename: string;
  room: string;
  alt: string;
  caption: string;
};

export type PortfolioProject = {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  images: PortfolioImage[];
  photoCount: number;
  rooms: string[];
};

const projectCardImages: Record<string, string> = {
  "bryn-mawr-dr": "/images/thumbs/bryn-mawr-dr-card.jpg",
  "greenbrier-dr": "/images/thumbs/greenbrier-dr-card.jpg",
  "armstrong-pkwy": "/images/thumbs/armstrong-pkwy-card.jpg",
  "deloache-ave": "/images/thumbs/deloache-ave-card.jpg",
  "stefani-dr": "/images/thumbs/stefani-dr-card.jpg",
  "other-projects": "/images/thumbs/other-projects-card.jpg",
};

function chooseCoverImage(images: PortfolioImage[], fallback: string) {
  return (
    images.find((image) => image.room === "Exterior")?.src ??
    images.find((image) => image.room === "Entry")?.src ??
    fallback
  );
}

function sortRooms(rooms: string[]) {
  return rooms.sort((a, b) => {
    if (a === "Featured Space") return 1;
    if (b === "Featured Space") return -1;
    return a.localeCompare(b);
  });
}

export const portfolioProjects: PortfolioProject[] = generatedPortfolio
  .filter((project) => project.images.length > 0)
  .map((project) => {
    const images = [...project.images];
    const coverImage = chooseCoverImage(images, project.coverImage ?? images[0].src);
    const rooms = sortRooms(Array.from(new Set(images.map((image) => image.room))));

    return {
      title: project.title,
      slug: project.slug,
      description:
        projectDescriptions[project.slug] ??
        "A luxury residential project by Alford Custom Builders.",
      coverImage,
      images,
      photoCount: images.length,
      rooms,
    };
  });

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}

export function getProjectHref(slug: string) {
  return `/portfolio/${slug}`;
}

export function getProjectCardImage(slug: string, fallback: string) {
  return projectCardImages[slug] ?? fallback;
}
