import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/api/studio"],
      },
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "Google-Extended"],
        allow: "/",
        disallow: ["/studio", "/api/studio"],
      },
    ],
    sitemap: "https://mahmoud.jp/sitemap.xml",
    host: "https://mahmoud.jp",
  };
}
