import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/portfolio/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return siteUrl ? [{ url: siteUrl.href }] : []
}
