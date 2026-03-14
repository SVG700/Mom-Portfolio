import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = "https://example.vercel.app";

  return [
    {
      url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    }
  ];
}
