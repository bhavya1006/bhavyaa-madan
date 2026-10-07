import { projects } from "@/data/projects"
import { PanelNumber, SectionLabel } from "./editorial"
import { SceneArt } from "./scene-art"
import { JourneyPath } from "./journey-path"
import { spatialRoute } from "@/lib/portfolio/camera"

export function SelectedWork() {
  const selected = projects.filter((project) => project.featured).toSorted((a, b) => a.priority - b.priority)

  return (
    <section id="work" className="scene work-scene" aria-labelledby="work-heading">
      <div className="work-viewport">
      <div className="work-camera">
      <JourneyPath scene="work" />
      <svg className="spatial-route" viewBox="0 0 2400 1800" aria-hidden="true" focusable="false">
        <path d={spatialRoute} pathLength="1" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <div className="work-heading scene-copy">
        <SectionLabel index="01">Selected pieces</SectionLabel>
        <h2 id="work-heading">Selected<br />work</h2>
        <p className="body-copy">Interfaces, products<br />& experiments.</p>
        <span className="brush-rule" aria-hidden="true" />
        <p className="work-note">Design first.<br />Development alongside it.</p>
      </div>
      <ol className="project-world">
        {selected.map((project, index) => {
          const destination = project.caseStudyUrl ?? project.sourceUrl ?? project.previewUrl
          const isExternal = destination?.startsWith("http")
          return (
            <li key={project.id} className="project-panel" data-project={project.slug}>
              <div className="project-visual" aria-hidden="true">
                {destination && <a className="project-art-link" href={destination} tabIndex={-1} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined} />}
                {project.slug === "legal-connect" || project.slug === "traveless" ? (
                  <SceneArt art="city" />
                ) : project.slug === "pre-dap" ? (
                  <SceneArt art="desk" />
                ) : project.slug === "insta-vitaminc-advertisement" ? (
                  <div className="vitamin-study"><span>C</span><span>Product / Design</span></div>
                ) : (
                  <div className="development-study"><span>{project.technologies[0]}</span><span>↗</span></div>
                )}
              </div>
              <div className="project-caption">
                <div className="project-caption-top">
                  <PanelNumber value={String(index + 1).padStart(2, "0")} />
                  <span className="eyebrow">{project.categories.includes("design") ? "Design" : "Development"}</span>
                  {project.year && <span className="eyebrow">{project.year}</span>}
                </div>
                <h3>{destination ? (
                  <a className="project-main-link" href={destination} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
                    {project.shortTitle ?? project.title}
                    {isExternal && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                ) : project.title}</h3>
                {project.role && <p>{project.role}</p>}
                {project.description && <p>{project.description}</p>}
                <p className="project-technologies">{project.technologies.join(" / ")}</p>
                <span className="project-arrow" aria-hidden="true">↗</span>
                {project.previewUrl && project.previewUrl !== destination && (
                  <a className="project-preview" href={project.previewUrl} target="_blank" rel="noopener noreferrer">
                    Preview <span aria-hidden="true">↗</span><span className="sr-only"> {project.title} (opens in a new tab)</span>
                  </a>
                )}
                {project.caseStudyUrl && project.sourceUrl && (
                  <a className="project-preview" href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                    Source <span aria-hidden="true">↗</span><span className="sr-only"> {project.title} (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </li>
          )
        })}
      </ol>
      <p className="work-colophon scene-copy">Illustrated settings. Real projects. Follow a title to explore the work.</p>
      </div>
      <a className="work-exit-link" href="#about">Continue to About <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  )
}

