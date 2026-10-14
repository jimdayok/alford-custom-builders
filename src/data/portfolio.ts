import { generatedPortfolio } from "@/data/generated-portfolio";

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
        `Explore the completed ${project.title} home through Ben Alford’s selected photographs.`,
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
  return getPortfolioProject(slug)?.coverImage ?? fallback;
}
