// Vercel provides the stable production domain, including on preview builds.
// Set SITE_URL when assigning a custom canonical domain.
const domain = process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined)

export const siteUrl = domain ? new URL(domain) : undefined
export const siteTitle = "Bhavya Madan — UI/UX Designer & Creative Developer"
export const siteDescription = "UI/UX and product design by Bhavya Madan. Thoughtful digital experiences brought to life through frontend and creative development."
