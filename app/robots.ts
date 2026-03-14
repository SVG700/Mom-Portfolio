import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const url = "https://example.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${url}/sitemap.xml`
  };
}
