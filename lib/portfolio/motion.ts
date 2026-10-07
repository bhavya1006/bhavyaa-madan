export const motion = {
  duration: { fast: 160, normal: 420, slow: 700 },
  easing: { editorial: "cubic-bezier(.2,.7,.2,1)", settle: "cubic-bezier(.22,1,.36,1)" },
  mobileWidth: 768,
  tilt: 1.25,
  pointerQuiet: 140,
  intro: { minimum: 1100, readinessDeadline: 1500, exit: 400, failOpen: 2200, heroSeed: .16 },
} as const

export const clamp = (value: number) => Math.max(0, Math.min(1, value))

// Offset/direction are intentional chapter accents, not independent animation clocks.
export const entrances = [
  { selector: ".work-heading", x: -22, y: 0 },
  { selector: '.project-panel[data-project="legal-connect"] .project-visual', x: 0, y: 18 },
  { selector: '.project-panel[data-project="insta-vitaminc-advertisement"]', x: 12, y: 0 },
  { selector: '.project-panel[data-project="traveless"]', x: 0, y: 12 },
  { selector: '.project-panel[data-project="pre-dap"]', x: -12, y: 0 },
  { selector: '.project-panel[data-project="flowsync"], .project-panel[data-project="water-supply-management"]', x: 0, y: 6 },
  { selector: ".about-copy", x: 0, y: 8 },
  { selector: ".about-art", x: 0, y: 6 },
  { selector: ".capability-design", x: 20, y: 0 },
  { selector: ".capability-development, .capability-ai", x: 0, y: 7 },
  { selector: ".contact-copy", x: 0, y: 8 },
] as const
