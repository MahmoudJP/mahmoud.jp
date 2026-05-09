import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/nihongo-kit",
        destination: "/nihongo-kit/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/nihongo-kit/", destination: "/nihongo-kit/index.html" },
    ];
  },
};

export default nextConfig;
