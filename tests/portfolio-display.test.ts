import { describe, expect, it } from "vitest";

import type { PortfolioImage } from "@/data/portfolio";
import {
  getPortfolioImageAlt,
  getPortfolioImageCaption,
} from "@/lib/portfolio-display";

const placeholderImage: PortfolioImage = {
  src: "/images/armstrong-pkwy-1.jpg",
  filename: "armstrong-pkwy-1.jpg",
  room: "Featured Space",
  alt: "Armstrong Pkwy featured space view 1",
  caption: "Armstrong Pkwy • Featured Space",
};

describe("portfolio display labels", () => {
  it("replaces placeholder room text in image alternatives", () => {
    expect(getPortfolioImageAlt(placeholderImage, 0, "Armstrong Pkwy")).toBe(
      "Armstrong Pkwy image 1",
    );
  });

  it("suppresses placeholder room captions", () => {
    expect(getPortfolioImageCaption(placeholderImage)).toBe("");
  });

  it("preserves specific non-placeholder image copy", () => {
    const image = {
      ...placeholderImage,
      room: "Exterior",
      alt: "Armstrong Pkwy front exterior",
      caption: "Front elevation at dusk",
    };

    expect(getPortfolioImageAlt(image, 1, "Armstrong Pkwy")).toBe(
      "Armstrong Pkwy front exterior",
    );
    expect(getPortfolioImageCaption(image)).toBe("Front elevation at dusk");
  });
});
