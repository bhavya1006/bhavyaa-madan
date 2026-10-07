import { clamp } from "./motion"

// World coordinates also author the CSS grid: 24 columns × 18 rows of 100 units.
export const workWorld = { width: 2400, height: 1800, referenceWidth: 1376, scrollScreens: 4.5 }
export const cameraStops = [
  { name: "work-intro", at: 0, x: 688, y: 425, draw: .04 },
  { name: "legal", at: .16, x: 950, y: 425, draw: .22 },
  { name: "vitamin-c", at: .34, x: 1650, y: 500, draw: .4 },
  { name: "traveless", at: .51, x: 1550, y: 1000, draw: .58 },
  { name: "pre-dap", at: .67, x: 850, y: 1100, draw: .73 },
  { name: "development-cluster", at: .88, x: 1700, y: 1425, draw: .91 },
  { name: "work-exit", at: 1, x: 1700, y: 1425, draw: 1 },
] as const

export const projectStops: Record<string, number> = {
  "legal-connect": .16,
  "insta-vitaminc-advertisement": .34,
  traveless: .51,
  "pre-dap": .67,
  flowsync: .88,
  "water-supply-management": .88,
}

export const spatialRoute = "M80 0 C70 160 100 280 220 390 C350 540 590 620 820 560 C1050 495 1200 220 1580 320 C1910 405 1900 740 1630 990 C1430 1190 1110 1350 830 1230 C630 1090 1260 1130 1730 1270 C2100 1360 2150 1580 1850 1630 C2010 1660 2250 1670 2250 1800"

export function sampleCamera(progress: number, width: number, height: number) {
  const p = clamp(progress)
  const next = cameraStops.findIndex(stop => stop.at > p)
  const index = next < 0 ? cameraStops.length - 2 : Math.max(0, next - 1)
  const from = cameraStops[index]
  const to = cameraStops[index + 1]
  const t = clamp((p - from.at) / (to.at - from.at))
  const eased = t * t * (3 - 2 * t)
  const lerp = (a: number, b: number) => a + (b - a) * eased
  const scale = Math.min(width / workWorld.referenceWidth, height / 850)
  const centerX = lerp(from.x, to.x)
  const centerY = lerp(from.y, to.y)
  const x = -Math.max(0, Math.min(workWorld.width - width / scale, centerX - width / scale / 2)) * scale
  const y = -Math.max(0, Math.min(workWorld.height - height / scale, centerY - height / scale / 2)) * scale
  return { x, y, scale, draw: lerp(from.draw, to.draw), stop: t < .5 ? from.name : to.name }
}

