const exactPaths = new Set(["/", "/about", "/services", "/our-process", "/service-areas", "/portfolio", "/journal", "/contact"]);
const tagPrefixes = ["site:alford-custom-homes", "content:global_settings", "content:page", "content:page_section", "content:service", "content:process_step", "content:testimonial", "content:service_area", "content:portfolio_project", "content:journal_post"];
export function isAllowedPath(path: string) { return exactPaths.has(path) || /^\/(portfolio|journal)\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(path); }
export function isAllowedTag(tag: string) { return tag.length <= 256 && tagPrefixes.some((prefix) => tag === prefix || tag.startsWith(`${prefix}:`)); }
