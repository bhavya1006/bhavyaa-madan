import { Navigation } from "@/components/navigation/navigation"
import { Hero, About, Capabilities, Contact } from "@/components/portfolio/sections"
import { SelectedWork } from "@/components/portfolio/selected-work"
import { JourneyMotion } from "@/components/portfolio/journey-motion"
import { EntryIntro } from "@/components/portfolio/entry-intro"

export default function HomePage() {
  return (
    <>
      <EntryIntro />
      <Navigation />
      <main id="main-content" tabIndex={-1} className="page-shell">
        <JourneyMotion />
        <Hero />
        <SelectedWork />
        <About />
        <Capabilities />
        <Contact />
      </main>
    </>
  )
}
