import { identity } from "@/data/identity"
import { SectionLabel } from "./editorial"
import { SceneArt, InkBirds } from "./scene-art"
import { JourneyPath } from "./journey-path"

export function Hero() {
  return (
    <section id="home" className="scene hero-scene" aria-labelledby="hero-heading">
      <JourneyPath scene="hero" />
      <div className="hero-environment"><SceneArt art="city" /><span className="coral-sun" /></div>
      <div className="hero-copy scene-copy">
        <p className="eyebrow hero-kicker">Portfolio / Design & code</p>
        <h1 id="hero-heading" aria-label={identity.name}><span>Bhavya</span><span>Madan</span></h1>
        <p className="hero-role">UI/UX Designer<span>& Creative Developer</span></p>
        <span className="brush-rule" aria-hidden="true" />
        <p className="hero-intro">Designing digital experiences.<br />Bringing them to life through code.</p>
        <a className="text-link" href="#work">Explore the work <span aria-hidden="true">↘</span></a>
      </div>
      <SceneArt art="designer" className="hero-figure" priority />
      <InkBirds />
      <div className="hero-ground"><SceneArt art="city" /></div>
      <p className="scene-footnote">UI/UX & product design / Creative development / AI & ML</p>
      <span className="scroll-cue" aria-hidden="true">Begin the chapter <span>↘</span></span>
    </section>
  )
}

export function About() {
  return (
    <section id="about" className="scene about-scene" aria-labelledby="about-heading">
      <JourneyPath scene="about" />
      <div className="about-copy scene-copy">
        <SectionLabel index="02">About the practice</SectionLabel>
        <h2 id="about-heading">Think it<br />through.<br /><span>Then build it.</span></h2>
        <div className="body-copy">
          <p>I’m {identity.name}, a UI/UX designer and creative developer.</p>
          <p>I bring interface and product design together with frontend development. AI / ML and backend support that practice.</p>
        </div>
        <span className="brush-rule" aria-hidden="true" />
        <a className="text-link" href={identity.resumeUrl} target="_blank" rel="noopener noreferrer">
          View résumé <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <div className="about-art">
        <p className="hand-note">Design.<br />Code.<br />Create.</p>
        <SceneArt art="designer" />
      </div>
      <InkBirds />
    </section>
  )
}

export function Capabilities() {
  return (
    <section id="capabilities" className="scene capabilities-scene" aria-labelledby="capabilities-heading">
      <JourneyPath scene="capabilities" />
      <div className="capabilities-heading scene-copy">
        <SectionLabel index="03">The tools of the practice</SectionLabel>
        <h2 id="capabilities-heading">Capabilities</h2>
        <p className="eyebrow">Ideas into interfaces. And beyond.</p>
        <span className="brush-rule" aria-hidden="true" />
      </div>
      <div className="capability-spread">
        <SceneArt art="desk" className="capability-desk" />
        <dl className="capabilities">
          <div className="capability-design">
            <dt><span className="eyebrow">01 / Primary focus</span>Design</dt>
            <dd><ul><li>UI/UX design</li><li>Product design</li><li>Figma</li><li>Prototyping</li></ul></dd>
          </div>
          <div className="capability-development">
            <dt><span className="eyebrow">02 / Secondary</span>Development</dt>
            <dd>Frontend & creative development<br /><span className="muted">React / Next.js</span></dd>
          </div>
          <div className="capability-ai">
            <dt><span className="eyebrow">03 / Supporting</span>AI</dt>
            <dd>AI / ML<br /><span className="muted">Backend</span></dd>
          </div>
        </dl>
      </div>
      <InkBirds />
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="scene contact-scene" aria-labelledby="contact-heading">
      <JourneyPath scene="contact" />
      <div className="contact-copy scene-copy">
        <SectionLabel index="04">An open ending</SectionLabel>
        <h2 id="contact-heading">Have an idea?<br /><span>Let’s make<br />something.</span></h2>
        <p className="body-copy">For collaborations, design work,<br />or a conversation.</p>
        <ul className="social-links">
          {identity.links.map((link) => (
            <li key={link.label}><a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.label} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
            </a></li>
          ))}
        </ul>
      </div>
      <div className="contact-environment">
        <span className="coral-sun" />
        <SceneArt art="city" />
        <SceneArt art="designer" className="contact-figure" />
        <p className="hand-note">Good ideas.<br />New possibilities.</p>
      </div>
      <InkBirds />
      <footer className="portfolio-footer">
        <span>{identity.name}</span><span>UI/UX / Creative development / AI & ML</span>
        <a href="#home">Back to the beginning <span aria-hidden="true">↑</span></a>
      </footer>
    </section>
  )
}

