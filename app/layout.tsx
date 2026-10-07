import type { Metadata } from "next"
import type { ReactNode, CSSProperties } from "react"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { identity } from "@/data/identity"
import { introBootstrap } from "@/lib/portfolio/intro"
import { motion } from "@/lib/portfolio/motion"
import { siteUrl, siteTitle, siteDescription } from "@/lib/portfolio/site"
import "./globals.css"

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: siteUrl ?? new URL("http://localhost:3000"),
  ...(siteUrl ? { alternates: { canonical: "/" } } : {}),
  authors: [{ name: identity.name }],
  openGraph: { type: "website", locale: "en_US", siteName: identity.name, title: siteTitle, description: siteDescription, ...(siteUrl ? { url: siteUrl } : {}) },
  twitter: { card: "summary_large_image", title: siteTitle, description: siteDescription, images: ["/opengraph-image"] },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning style={{
      "--motion-fast": `${motion.duration.fast}ms`, "--motion-normal": `${motion.duration.normal}ms`,
      "--motion-slow": `${motion.duration.slow}ms`, "--ease-editorial": motion.easing.editorial,
      "--ease-settle": motion.easing.settle, "--intro-exit": `${motion.intro.exit}ms`,
      "--intro-offset": 1 - motion.intro.heroSeed,
    } as CSSProperties}>
      <head><script dangerouslySetInnerHTML={{ __html: introBootstrap }} /></head>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          enableColorScheme
          storageKey="portfolio-theme"
        >
          <a className="skip-link" href="#main-content">Skip to content</a>
          {children}
        </ThemeProvider>
        {process.env.VERCEL === "1" && <Analytics />}
      </body>
    </html>
  )
}
