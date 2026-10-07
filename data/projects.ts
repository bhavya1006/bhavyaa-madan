import type { Project } from "@/lib/portfolio/types"

// Priority controls presentation order. Unknown roles, years and outcomes stay absent.
export const projects: readonly Project[] = [
  {
    id: "p3", slug: "legal-connect", title: "Legal Connect",
    categories: ["design"], technologies: ["Figma", "Open Source", "Prototype Designing"],
    featured: true, priority: 1,
    sourceUrl: "https://www.figma.com/community/file/1505244706824730737/legal-connect",
  },
  {
    id: "p4", slug: "insta-vitaminc-advertisement", title: "Insta-VitaminC-Advertisement",
    categories: ["design"], technologies: ["Figma", "Product Designing"],
    featured: true, priority: 2,
    sourceUrl: "https://www.figma.com/community/file/1542189929422183011/insta-vitaminc-advertisement",
  },
  {
    id: "p2", slug: "traveless", title: "Traveless",
    categories: ["design"], technologies: ["Figma", "Python", "Prototype Designing"],
    featured: true, priority: 3,
    previewUrl: "https://bhavya1006.github.io/traveless/",
    sourceUrl: "https://github.com/bhavya1006/traveless",
  },
  {
    id: "p5", slug: "pre-dap", title: "Pre DAP",
    categories: ["design", "development"], technologies: ["Figma", "Next.js", "Prototype Designing"],
    featured: true, priority: 4,
    previewUrl: "https://predap-ai-guide.vercel.app",
    sourceUrl: "https://github.com/bhavya1006/Hackbyte-3.0",
  },
  {
    id: "p1", slug: "flowsync", title: "FlowSync",
    categories: ["development", "backend"], technologies: ["Next.js", "Node.js", "WebSockets"],
    featured: true, priority: 5,
    sourceUrl: "https://github.com/Ankur2606/FlowSync",
  },
  {
    id: "p6", slug: "water-supply-management", title: "Water Supply Management | Hack'ndore",
    categories: ["development", "hardware"], technologies: ["Hardware", "React", "Frontend"],
    featured: true, priority: 6,
    sourceUrl: "https://github.com/ayushmanlakshkar/Hack-Ndore",
  },
]
