import { serviceAreaDetails, siteConfig } from "@/lib/site-data";

export const dynamic = "force-static";

export async function GET() {
  const content = [
    `# ${siteConfig.name}`,
    "",
    `Summary: ${siteConfig.description}`,
    `Phone: ${siteConfig.phone}`,
    `Email: ${siteConfig.email}`,
    `Website: ${siteConfig.url}`,
    "",
    "Services:",
    "- Custom homes",
    "- High-end remodels",
    "- Additions",
    "- Pre-construction planning",
    "- Design and budget alignment",
    "",
    "Service Areas:",
    ...serviceAreaDetails.map((area) => `- ${area.title}: ${area.description}`),
    "",
    "Key Pages:",
    `- Home: ${siteConfig.url}/`,
    `- About: ${siteConfig.url}/about`,
    `- Services: ${siteConfig.url}/services`,
    `- Portfolio: ${siteConfig.url}/portfolio`,
    `- Service Areas: ${siteConfig.url}/service-areas`,
    `- Contact: ${siteConfig.url}/contact`,
  ].join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
