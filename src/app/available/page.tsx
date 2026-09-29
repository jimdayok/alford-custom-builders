import type { Metadata } from "next";

import { PreviewTwoAvailable } from "@/components/preview-two/available";

export const metadata: Metadata = {
  title: "Available | 6207 Prestonshire",
  description: "Explore the home planned for 6207 Prestonshire in Preston Hollow.",
};

export default function AvailablePage() {
  return <PreviewTwoAvailable />;
}
