import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.transparenttextures.com", // I added a texture in ProductCard.tsx, so we need this too
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;