"use client"

import { useEffect } from "react"
import { clamp, entrances, motion } from "@/lib/portfolio/motion"
import { createSpatialController } from "@/lib/portfolio/spatial-controller"

// One event-driven frame scheduler; the portfolio itself remains server rendered.
export function JourneyMotion() {
  useEffect(() => {
    const container = document.querySelector<HTMLElement>("#main-content")
    if (!container) return
    const root = container
    const spatial = createSpatialController(root)
    const reduced = matchMedia("(prefers-reduced-motion: reduce)")
    const pointer = matchMedia("(hover: hover) and (pointer: fine)")
    const scenes = Array.from(root.querySelectorAll<HTMLElement>(".scene"))
    const paths = scenes.map(scene => scene.querySelector<SVGPathElement>(".journey-path path")!)
    const targets = entrances.flatMap(spec => Array.from(root.querySelectorAll<HTMLElement>(spec.selector)).map(el => ({ el, x: spec.x, y: spec.y, top: 0, height: 0 })))
    const panels = Array.from(root.querySelectorAll<HTMLElement>(".project-panel"))
    const dot = root.querySelector<SVGCircleElement>(".journey-contact circle")
    let bounds: { top: number; height: number }[] = []
    let maxScroll = 1
    let height = innerHeight
    let viewportWidth = innerWidth
    let small = innerWidth <= motion.mobileWidth
    let dirty = true
    let frame = 0
    let arrived = false
    let active: HTMLElement | null = null
    let point = { x: 0, y: 0 }
    let panelBounds: DOMRect | null = null
    let pulse: Animation | undefined
    let resizePosition: { inside: boolean; progress: number } | undefined

    function resetPointer() {
      panels.forEach(panel => panel.style.removeProperty("--pointer-tilt"))
      active = null
      panelBounds = null
    }

    function update() {
      frame = 0
      let y = window.scrollY
      // Layout reads are batched only after resize/content size changes.
      if (dirty) {
        if ((height !== innerHeight || viewportWidth !== innerWidth) && !resizePosition) {
          resizePosition = { inside: spatial.enabled && scrollY >= spatial.start && scrollY <= spatial.end, progress: spatial.progress }
        }
        viewportWidth = innerWidth
        spatial.configure(reduced.matches)
        spatial.measure()
        y = window.scrollY
        if (resizePosition) {
          spatial.restoreAfterResize(resizePosition.inside, resizePosition.progress)
          resizePosition = undefined
          y = window.scrollY
        }
        height = innerHeight
        small = innerWidth <= motion.mobileWidth
        maxScroll = Math.max(1, document.documentElement.scrollHeight - height)
        bounds = scenes.map(el => { const rect = el.getBoundingClientRect(); return { top: rect.top + y, height: rect.height } })
        targets.forEach(target => {
          const rect = target.el.getBoundingClientRect()
          const ownTranslation = parseFloat(target.el.style.translate.split(" ")[1]) || 0
          target.top = rect.top + y - ownTranslation
          target.height = rect.height
        })
        dirty = false
      }
      const progress = clamp(y / maxScroll)
      root.style.setProperty("--journey-progress", String(progress))
      root.style.setProperty("--scroll-cue-opacity", String(1 - clamp(y / 100)))
      root.dataset.motion = reduced.matches ? "reduced" : "ready"
      spatial.render(y)
      if (reduced.matches) {
        paths.forEach(path => { path.style.strokeDashoffset = "0" })
        targets.forEach(({ el }) => { el.style.removeProperty("translate"); el.style.removeProperty("clip-path") })
        root.style.setProperty("--hero-drift", "0px")
        root.style.setProperty("--sun-drift", "0px")
        if (dot) dot.style.opacity = "1"
        pulse?.cancel()
        resetPointer()
        return
      }
      // A common reading position traverses section boundaries, so segment N+1
      // cannot start before N is complete. Bottom-of-page always reaches Contact.
      const start = bounds[0].top
      const finish = bounds.at(-1)!.top + bounds.at(-1)!.height * .78
      const releaseCursor = spatial.end + height * .65
      const cursor = spatial.enabled
        ? releaseCursor + clamp((y - spatial.end) / Math.max(1, maxScroll - spatial.end)) * (finish - releaseCursor)
        : start + progress * (finish - start)
      paths.forEach((path, index) => {
        const end = index === paths.length - 1 ? finish : bounds[index + 1].top
        const local = index === 0 ? Math.max(motion.intro.heroSeed, spatial.enabled ? clamp(y / spatial.start) : clamp((cursor - bounds[0].top) / (end - bounds[0].top)))
          : spatial.enabled && index === 1 ? spatial.progress
          : clamp((cursor - bounds[index].top) / (end - bounds[index].top))
        path.style.strokeDashoffset = String(1 - local)
      })
      targets.forEach(({ el, top, height: targetHeight, x, y: offset }) => {
        if (spatial.enabled && el.closest("#work, #capabilities")) { el.style.removeProperty("translate"); return }
        const entry = clamp((y + height * .92 - top) / Math.min(height * .45, targetHeight + height * .15))
        const remaining = (1 - entry) ** 3
        const scale = small ? .3 : 1
        el.style.translate = `${x * remaining * scale}px ${offset * remaining * scale}px`
        if (el.classList.contains("about-art")) el.style.clipPath = `inset(0 0 ${remaining * (small ? 2 : 7)}% 0)`
      })
      const hero = clamp(y / bounds[0].height)
      root.style.setProperty("--hero-drift", `${hero * (small ? 3 : 18)}px`)
      root.style.setProperty("--sun-drift", `${hero * (small ? -2 : -12)}px`)
      if (active && pointer.matches && !small && spatial.pointerAllowed) active.style.setProperty("--pointer-tilt", `${point.x * motion.tilt}deg`)
      const complete = progress >= .995
      if (dot) dot.style.opacity = complete ? "1" : "0"
      if (complete && !arrived) {
        arrived = true
        pulse = dot?.animate([{ transform: "scale(.7)" }, { transform: "scale(1.35)", offset: .55 }, { transform: "scale(1)" }], { duration: motion.duration.slow, easing: motion.easing.settle })
      }
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update) }
    function invalidate() { dirty = true; resetPointer(); schedule() }
    function resize() {
      resizePosition ??= { inside: spatial.enabled && scrollY >= spatial.start && scrollY <= spatial.end, progress: spatial.progress }
      invalidate()
    }
    function scroll() { spatial.markScroll(); if (active) resetPointer(); schedule() }
    function move(event: PointerEvent) {
      if (reduced.matches || small || !pointer.matches || !spatial.pointerAllowed || event.pointerType !== "mouse") return
      const panel = (event.target as Element).closest<HTMLElement>(".project-panel")
      if (!panel) { resetPointer(); return }
      if (active !== panel) { resetPointer(); active = panel; panelBounds = panel.getBoundingClientRect() }
      point = { x: clamp((event.clientX - panelBounds!.left) / panelBounds!.width) * 2 - 1, y: 0 }
      schedule()
    }
    const observer = new ResizeObserver(invalidate)
    observer.observe(root)
    scenes.forEach(scene => observer.observe(scene))
    window.addEventListener("scroll", scroll, { passive: true })
    window.addEventListener("resize", resize)
    window.addEventListener("pageshow", invalidate)
    reduced.addEventListener("change", resize)
    pointer.addEventListener("change", invalidate)
    root.addEventListener("pointermove", move, { passive: true })
    root.addEventListener("pointerleave", resetPointer)
    schedule()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      pulse?.cancel()
      window.removeEventListener("scroll", scroll)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pageshow", invalidate)
      reduced.removeEventListener("change", resize)
      pointer.removeEventListener("change", invalidate)
      root.removeEventListener("pointermove", move)
      root.removeEventListener("pointerleave", resetPointer)
      delete root.dataset.motion
      paths.forEach(path => path.style.removeProperty("stroke-dashoffset"))
      targets.forEach(({ el }) => { el.style.removeProperty("translate"); el.style.removeProperty("clip-path") })
      dot?.style.removeProperty("opacity")
      ;["--journey-progress", "--hero-drift", "--sun-drift", "--scroll-cue-opacity"].forEach(name => root.style.removeProperty(name))
      resetPointer()
      spatial.dispose()
    }
  }, [])
  return null
}
