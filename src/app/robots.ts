import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/dashboard", "/studio/login", "/studio/mind-map", "/api/studio"],
      },
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "Google-Extended"],
        allow: "/",
        disallow: ["/studio/dashboard", "/studio/login", "/studio/mind-map", "/api/studio"],
      },
    ],
    sitemap: "https://mahmoud.jp/sitemap.xml",
    host: "https://mahmoud.jp",
  };
}
