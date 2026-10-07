"use client"

import { useEffect } from "react"
import { motion } from "@/lib/portfolio/motion"

export function EntryIntro() {
  useEffect(() => {
    const root = document.documentElement
    if (root.dataset.intro !== "pending") return
    const reduced = matchMedia("(prefers-reduced-motion: reduce)")
    const start = Number(root.dataset.introStarted) || performance.now()
    const elapsed = () => performance.now() - start
    const timers: ReturnType<typeof setTimeout>[] = []
    let disposed = false
    let finished = false

    function clear() {
      finished = true
      delete root.dataset.intro
      delete root.dataset.introStarted
      timers.forEach(clearTimeout)
      window.removeEventListener("scroll", interrupt)
      window.removeEventListener("wheel", interrupt)
      window.removeEventListener("touchstart", interrupt)
      window.removeEventListener("keydown", interrupt)
      window.removeEventListener("pointerdown", interrupt)
      window.removeEventListener("resize", interrupt)
      window.removeEventListener("focusin", interrupt)
      window.removeEventListener("pagehide", interrupt)
      reduced.removeEventListener("change", interrupt)
    }
    function interrupt() { clear() }
    function exit() {
      if (disposed || finished || root.dataset.intro !== "pending") return
      if (scrollY > 40 || reduced.matches || location.hash) { clear(); return }
      const hero = document.querySelector<SVGSVGElement>(".journey-hero")
      const route = document.querySelector<SVGSVGElement>(".entry-route")
      const screen = document.querySelector<HTMLElement>(".entry-screen")
      if (!hero || !route || !screen) { clear(); return }
      const rect = hero.getBoundingClientRect()
      route.setAttribute("viewBox", hero.getAttribute("viewBox")!)
      route.querySelector("path")!.setAttribute("d", hero.querySelector("path")!.getAttribute("d")!)
      route.style.cssText = `left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px`
      // The small opening stroke lands on the actual Hero route's first point.
      screen.style.setProperty("--ink-x", `${rect.left + rect.width * 20 / 1200 - innerWidth / 2}px`)
      screen.style.setProperty("--ink-y", `${rect.top + rect.height * 755 / 900 - (innerHeight / 2 + 130)}px`)
      root.dataset.intro = "exit"
      timers.push(setTimeout(clear, motion.intro.exit))
    }
    function ready() {
      if (disposed || finished) return
      timers.push(setTimeout(exit, Math.max(0, motion.intro.minimum - elapsed())))
    }
    const image = document.querySelector<HTMLImageElement>(".hero-figure img")
    // Decode only the critical portrait. Other chapters never hold up entry.
    void (image?.decode() ?? Promise.resolve()).then(ready, ready)
    timers.push(setTimeout(exit, Math.max(0, motion.intro.readinessDeadline - elapsed())))
    window.addEventListener("scroll", interrupt, { passive: true })
    window.addEventListener("wheel", interrupt, { passive: true })
    window.addEventListener("touchstart", interrupt, { passive: true })
    window.addEventListener("keydown", interrupt)
    window.addEventListener("pointerdown", interrupt, { passive: true })
    window.addEventListener("resize", interrupt)
    window.addEventListener("focusin", interrupt)
    window.addEventListener("pagehide", interrupt)
    reduced.addEventListener("change", interrupt)
    window.dispatchEvent(new Event("portfolio:intro-hydrated"))
    if (scrollY > 40 || reduced.matches) clear()
    return () => {
      disposed = true
      timers.forEach(clearTimeout)
      window.removeEventListener("scroll", interrupt)
      window.removeEventListener("wheel", interrupt)
      window.removeEventListener("touchstart", interrupt)
      window.removeEventListener("keydown", interrupt)
      window.removeEventListener("pointerdown", interrupt)
      window.removeEventListener("resize", interrupt)
      window.removeEventListener("focusin", interrupt)
      window.removeEventListener("pagehide", interrupt)
      reduced.removeEventListener("change", interrupt)
    }
  }, [])

  return (
    <div className="entry-screen" aria-hidden="true">
      <div className="entry-backdrop" />
      <div className="entry-title"><span><b>Bhavya</b></span><span><b>Madan</b></span></div>
      <svg className="entry-ink" viewBox="0 0 120 16"><path d="M1 10 Q54 3 119 6" pathLength="1" /></svg>
      <span className="entry-accent" />
      <svg className="entry-route" preserveAspectRatio="none"><path pathLength="1" /></svg>
    </div>
  )
}
