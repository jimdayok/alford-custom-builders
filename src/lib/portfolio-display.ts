import type { PortfolioImage } from "@/data/portfolio";

const placeholderRoomPattern = /\bfeatured space\b/i;

export function getPortfolioImageAlt(
  image: PortfolioImage,
  index: number,
  projectTitle?: string,
) {
  if (!placeholderRoomPattern.test(image.alt)) {
    return image.alt;
  }

  return `${projectTitle ?? "Portfolio"} image ${index + 1}`;
}

export function getPortfolioImageCaption(image: PortfolioImage) {
  if (placeholderRoomPattern.test(image.caption)) {
    return "";
  }

  return image.caption;
}
