import type { NextConfig } from "next";

const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : null;

const nextConfig: NextConfig = {
  // The approved public release uses the versioned photo manifest, not legacy CMS records.
  // Keep this in source so automatic Git deployments cannot re-enable stale content.
  env: { CMS_ENABLED: "false" },
  images: {
    qualities: [70, 72, 74, 75],
    remotePatterns: supabaseHostname ? [{ protocol: "https", hostname: supabaseHostname, pathname: "/storage/v1/object/public/site-manager-public/**" }] : [],
  },
};

export default nextConfig;
