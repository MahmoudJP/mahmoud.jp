import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/api/studio", "/japan-life"],
      },
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "Google-Extended"],
        allow: "/",
        disallow: ["/studio", "/api/studio", "/japan-life"],
      },
    ],
    sitemap: "https://mahmoud.jp/sitemap.xml",
    host: "https://mahmoud.jp",
  };
}
