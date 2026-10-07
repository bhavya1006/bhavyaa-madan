import { ThemeSwitch } from "@/components/navigation/theme-switch"
import { identity } from "@/data/identity"

export function Navigation() {
  return (
    <header className="site-header page-shell">
      <a className="wordmark" href="#home" aria-label={`${identity.name} — home`}>BM<span aria-hidden="true">.</span></a>
      <nav aria-label="Main navigation">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#capabilities">Capabilities</a>
        <a href="#contact">Contact</a>
      </nav>
      <ThemeSwitch />
      <a className="navigation-contact" href="#contact">Let’s talk <span aria-hidden="true">↗</span></a>
    </header>
  )
}
