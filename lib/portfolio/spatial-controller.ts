import { clamp, motion } from "./motion"
import { projectStops, sampleCamera, workWorld } from "./camera"

/** Shares the journey's scheduler. No scroll listener or independent animation loop. */
export function createSpatialController(root: HTMLElement) {
  const work = root.querySelector<HTMLElement>("#work")!
  const viewport = root.querySelector<HTMLElement>(".work-viewport")!
  const world = root.querySelector<HTMLElement>(".work-camera")!
  const path = root.querySelector<SVGPathElement>(".spatial-route path")!
  const panels = Array.from(work.querySelectorAll<HTMLElement>(".project-panel"))
  const capabilities = root.querySelector<HTMLElement>(".capabilities-scene")!
  const spread = root.querySelector<HTMLElement>(".capability-spread")!
  let enabled = false
  let top = 0
  let run = 1
  let width = 1
  let height = 1
  let capTop = 0
  let capHeight = 1
  let progress = 0
  let lastScrollTime = 0
  let quietTimer: ReturnType<typeof setTimeout> | undefined
  let restorePending: number | undefined
  let initialHash = (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined)?.type === "navigate" ? location.hash.slice(1) : ""
  const storageKey = "portfolio:work-position"
  try {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined
    const saved = JSON.parse(sessionStorage.getItem(storageKey) ?? "null") as { url: string; progress: number } | null
    if (navigation?.type !== "navigate" && saved?.url === location.href && Number.isFinite(saved.progress)) restorePending = saved.progress
  } catch { /* Storage is optional; native restoration remains available. */ }
  let debug: HTMLOutputElement | undefined
  if (process.env.NODE_ENV === "development" && new URLSearchParams(location.search).has("cameraDebug")) {
    debug = document.createElement("output")
    debug.className = "camera-debug"
    debug.setAttribute("aria-hidden", "true")
    document.body.append(debug)
  }

  function configure(reduced: boolean) {
    // New projects remain accessible in normal flow until an authored stop is added.
    const next = innerWidth >= 1024 && !reduced && panels.every(panel => panel.dataset.project! in projectStops)
    const changed = next !== enabled
    enabled = next
    root.dataset.spatial = String(enabled)
    root.style.setProperty("--work-run", `${innerHeight * workWorld.scrollScreens}px`)
    if (!enabled) {
      world.style.removeProperty("transform")
      spread.style.removeProperty("translate")
      panels.forEach(panel => panel.style.removeProperty("--project-presence"))
    }
    return changed
  }

  function measure() {
    top = work.getBoundingClientRect().top + scrollY
    height = innerHeight
    width = viewport.getBoundingClientRect().width
    run = Math.max(1, work.offsetHeight - height)
    capTop = capabilities.getBoundingClientRect().top + scrollY
    capHeight = capabilities.offsetHeight
    if (restorePending !== undefined && enabled) {
      window.scrollTo({ top: top + clamp(restorePending) * run, behavior: "instant" })
      restorePending = undefined
    } else if (enabled && ["work", "about", "capabilities", "contact"].includes(initialHash)) {
      document.getElementById(initialHash)?.scrollIntoView({ behavior: "instant" })
    }
    initialHash = ""
  }

  function render(y: number) {
    if (!enabled) { if (debug) debug.textContent = "Camera disabled / vertical layout"; return }
    progress = clamp((y - top) / run)
    const camera = sampleCamera(progress, width, height)
    world.style.transform = `translate3d(${camera.x}px, ${camera.y}px, 0) scale(${camera.scale})`
    path.style.strokeDashoffset = String(1 - camera.draw)
    panels.forEach(panel => {
      const distance = Math.abs(progress - (projectStops[panel.dataset.project!] ?? 0))
      panel.style.setProperty("--project-presence", String(1 - Math.min(.18, distance * .35)))
    })
    const cap = clamp((y + height * .6 - capTop) / capHeight)
    spread.style.translate = `${18 - 36 * cap}px ${-8 + 16 * cap}px`
    if (debug) debug.textContent = `Work ${progress.toFixed(3)}\n${camera.stop}\nx ${camera.x.toFixed(1)} / y ${camera.y.toFixed(1)}`
  }

  function focus(event: FocusEvent) {
    if (!enabled) return
    if (!(event.target instanceof HTMLElement) || !event.target.matches(":focus-visible")) return
    const panel = (event.target as Element).closest<HTMLElement>(".project-panel")
    if (!panel) return
    // Real DOM focus/order is retained; native scrolling selects the matching stop.
    const stop = projectStops[panel.dataset.project!]
    if (stop !== undefined) window.scrollTo({ top: top + stop * run, behavior: "instant" })
  }
  root.addEventListener("focusin", focus)
  function savePosition() {
    const inside = enabled && scrollY >= top && scrollY <= top + run
    try {
      if (inside) sessionStorage.setItem(storageKey, JSON.stringify({ url: location.href, progress: clamp((scrollY - top) / run) }))
      else sessionStorage.removeItem(storageKey)
    } catch { /* Private browser settings can disable session storage. */ }
  }
  window.addEventListener("pagehide", savePosition)

  return {
    configure, measure, render,
    get enabled() { return enabled },
    get start() { return top },
    get end() { return top + run },
    get progress() { return clamp((scrollY - top) / run) },
    markScroll() {
      lastScrollTime = performance.now()
      root.dataset.cameraMoving = "true"
      clearTimeout(quietTimer)
      quietTimer = setTimeout(() => { delete root.dataset.cameraMoving }, motion.pointerQuiet)
    },
    get pointerAllowed() { return !enabled || performance.now() - lastScrollTime > motion.pointerQuiet },
    // Preserve the same authored position when the desktop viewport changes size.
    restoreAfterResize(wasInside: boolean, previousProgress: number) {
      if (enabled && wasInside) window.scrollTo({ top: top + previousProgress * run, behavior: "instant" })
      if (!enabled && wasInside) {
        const closest = panels.toSorted((a, b) => Math.abs((projectStops[a.dataset.project!] ?? 0) - previousProgress) - Math.abs((projectStops[b.dataset.project!] ?? 0) - previousProgress))[0]
        closest?.scrollIntoView({ block: "center", behavior: "instant" })
      }
    },
    dispose() {
      root.removeEventListener("focusin", focus)
      window.removeEventListener("pagehide", savePosition)
      debug?.remove()
      clearTimeout(quietTimer)
      delete root.dataset.cameraMoving
      delete root.dataset.spatial
      root.style.removeProperty("--work-run")
      world.style.removeProperty("transform")
      spread.style.removeProperty("translate")
      panels.forEach(panel => panel.style.removeProperty("--project-presence"))
    },
  }
}
