import type { Metadata } from "next";

import { PreviewTwoDiscover } from "@/components/preview-two/discover";

export const metadata: Metadata = {
  title: "Discover Alford",
  description: "Discover the homes, services, and building standard of Alford Custom Builders.",
};

export default function DiscoverPage() {
  return <PreviewTwoDiscover />;
}
