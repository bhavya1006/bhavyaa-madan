import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/portfolio/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(siteUrl ? { sitemap: new URL("/sitemap.xml", siteUrl).href } : {}),
  }
}
