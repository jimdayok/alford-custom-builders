import type { NextConfig } from "next";

const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : null;

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/api/c15t/:path*", destination: "https://d2d-consent-service.vercel.app/api/c15t/:path*" }];
  },
  images: {
    remotePatterns: supabaseHostname ? [{ protocol: "https", hostname: supabaseHostname, pathname: "/storage/v1/object/public/site-manager-public/**" }] : [],
  },
};

export default nextConfig;
