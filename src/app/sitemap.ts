import type { MetadataRoute } from "next";
import { siteUrl } from "@/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
  ];
}
