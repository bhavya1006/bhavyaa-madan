export type ProjectCategory = "design" | "development" | "ai" | "backend" | "hardware"

export type Project = {
  id: string
  slug: string
  title: string
  shortTitle?: string
  description?: string
  year?: number
  role?: string
  categories: readonly ProjectCategory[]
  technologies: readonly string[]
  featured: boolean
  priority: number
  cover?: { src: string; alt: string; width: number; height: number }
  previewUrl?: string
  sourceUrl?: string
  caseStudyUrl?: string
}
