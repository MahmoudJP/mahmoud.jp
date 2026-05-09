import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/nihongo-kit", destination: "/nihongo-kit/index.html" },
      { source: "/nihongo-kit/", destination: "/nihongo-kit/index.html" },
    ];
  },
};

export default nextConfig;
