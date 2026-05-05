import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "Google-Extended"],
        allow: "/",
      },
    ],
    sitemap: "https://mahmoud.jp/sitemap.xml",
    host: "https://mahmoud.jp",
  };
}
