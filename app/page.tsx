"use client"

import * as React from "react"

import { useIsMobile } from "../hooks/useIsMobile"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Github, Linkedin, Twitter, Star, FileUser } from "lucide-react"
import { cn } from "@/lib/utils"

type Comment = {
  id: string
  name: string
  message: string
  rating: number
  createdAt: number
}

function useLocalFeedback() {
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem("bhavyaa-portfolio-feedback")
      if (raw) setComments(JSON.parse(raw))
    } catch { }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("bhavyaa-portfolio-feedback", JSON.stringify(comments))
    } catch { }
  }, [comments])

  const add = (c: Omit<Comment, "id" | "createdAt">) => {
    const newItem: Comment = {
      ...c,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    }
    setComments((prev) => [newItem, ...prev])
  }

  const avgRating = useMemo(() => {
    if (comments.length === 0) return 0
    const sum = comments.reduce((acc, c) => acc + (c.rating || 0), 0)
    return sum / comments.length
  }, [comments])

  return { comments, add, avgRating }
}

function SplashHero({ name, onDone }: { name: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div
        aria-hidden
        className="opacity-0 animate-[fadein_1200ms_ease-out_200ms_forwards,fadeout_900ms_ease-in_1500ms_forwards]"
      >
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center"
          style={{
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "rgba(255,255,255,0.85)",
            color: "transparent",
          }}
        >
          {name}
        </h1>
      </div>
      <style>{`
        @keyframes fadein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeout { from { opacity: 1; } to { opacity: 0; } }
      `}</style>
    </div>
  )
}

// function ImagePanel({ ready }: { ready: boolean }) {
// return (
// <Panel ariaLabel="Profile image" className={cn("flex items-center justify-center", "h-full")}>

// </Panel>
//)
//}
function GlowHover({
  className,
  children,
  glowColor = "rgba(59,130,246,0.35)", // bright blue
  glowAccent = "rgba(250,204,21,0.25)", // yellow
}: {
  className?: string
  children: React.ReactNode
  glowColor?: string
  glowAccent?: string
}) {
  return (
    <div className={cn("relative group", className)}>
      <div
        className="pointer-events-none absolute -inset-2 -z-10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            `radial-gradient(120px 120px at 30% 30%, ${glowColor}, transparent 70%),` +
            `radial-gradient(140px 140px at 70% 70%, ${glowAccent}, transparent 70%)`,
        }}
        aria-hidden
      />
      {children}
    </div>
  )
}

function Panel({
  children,
  className,
  ariaLabel,
}: {
  children: React.ReactNode
  className?: string
  ariaLabel?: string
}) {
  return (
    <GlowHover>
      <section
        aria-label={ariaLabel}
        className={cn(
          "h-full w-full rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md",
          "transition-transform duration-500",
          className,
        )}
      >
        {children}
      </section>
    </GlowHover>
  )
}

function NamePanel({ name, ready }: { name: string; ready: boolean }) {
  return (
    <Panel ariaLabel="Name panel" className="flex items-end">
      <div
        className={cn(
          "opacity-0",
          ready && "animate-[soft-slide-in-left_1400ms_cubic-bezier(0.22,1,0.36,1)_120ms_forwards]",
        )}
      >
        <div className={cn(
          "opacity-0",
          ready && "animate-[soft-slide-in-right_1450ms_cubic-bezier(0.22,1,0.36,1)_200ms_forwards]",
        )}>

          <img
            src="/hero.png"
            alt="Hero"
            className="w-full max-h-36 object-cover rounded-xl shadow-lg border-4 border-white/10 transition-all"
            style={{ filter: ready ? "none" : "blur(2px)" }}
          />
        </div>
        <h2 className="text-4xl md:text-xl font-bold text-foreground text-pretty">{name}</h2>
        <p className="text-sm text-muted-foreground mt-2">Designer • UI/UX • Developer</p>
      </div>
    </Panel>
  )
}

function SocialPanel({ rating, ready }: { rating: number; ready: boolean }) {
  const display = rating > 0 ? rating.toFixed(1) : "—"
  return (
    <div className="relative h-full w-full">
      <div className="absolute right-3 top-3 z-10">
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-sm">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="text-foreground">{display}</span>
        </div>
      </div>
      <Panel ariaLabel="Social links" className="h-full">
        <div
          className={cn(
            "opacity-0",
            ready && "animate-[soft-slide-in-right_1450ms_cubic-bezier(0.22,1,0.36,1)_200ms_forwards]",
          )}
        >
          <header className="mb-3">
            <h3 className="text-lg font-semibold text-foreground">Connect</h3>
            <p className="text-xs text-muted-foreground">Small icons, top-right area grid</p>
          </header>
          <div className="grid grid-cols-6 gap-3">
            <Link
              href="https://github.com/bhavya1006"
              target="_blank"
              aria-label="GitHub"
              className="flex h-10 items-center justify-center rounded-lg border border-white/10 bg-black/30 hover:bg-black/40"
            >
              <Github className="h-4 w-4 text-foreground" />
            </Link>
            <Link
              href="https://linkedin.com/in/bhavyaa-madan-05324a264/"
              target="_blank"
              aria-label="LinkedIn"
              className="flex h-10 items-center justify-center rounded-lg border border-white/10 bg-black/30 hover:bg-black/40"
            >
              <Linkedin className="h-4 w-4 text-foreground" />
            </Link>
            <Link
              href="https://x.com/BhavyaMadan20"
              target="_blank"
              aria-label="X (Twitter)"
              className="flex h-10 items-center justify-center rounded-lg border border-white/10 bg-black/30 hover:bg-black/40"
            >
              <Twitter className="h-4 w-4 text-foreground" />
            </Link>
	    
	    <Link
              href="https://drive.google.com/file/d/1O52iuX0URwHBhCLcUgrRv___JxOstGsz/view?usp=sharing"
              target="_blank"
              aria-label="Resume"
              className="flex h-10 items-center justify-center rounded-lg border border-white/10 bg-black/30 hover:bg-black/40"
            >
              <FileUser className="h-4 w-4 text-foreground" />
            </Link>
	    
            {/* {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-10 rounded-lg border border-white/5 bg-black/20" aria-hidden />
            ))} */}
          </div>
        </div>
      </Panel>
    </div>
  )
}

function ProjectsPanel({ ready }: { ready: boolean }) {
  const projects = [
    { id: "p1", name: "FlowSync", tag: "Next.js, Node.js, WebSockets", preview: "", source: "https://github.com/Ankur2606/FlowSync" },
    { id: "p2", name: "Traveless", tag: "Figma, Python, Prototype Designing", preview: "https://bhavya1006.github.io/traveless/", source: "https://github.com/bhavya1006/traveless" },
    { id: "p3", name: "Legal Connect", tag: "Figma, Open Source, Prototype designing", source: "https://www.figma.com/community/file/1505244706824730737/legal-connect" },
    { id: "p4", name: "Insta-VitaminC-Advertisement", tag: "Figma, Product Designing", source: "https://www.figma.com/community/file/1542189929422183011/insta-vitaminc-advertisement" },
    { id: "p5", name: "Pre DAP", tag: "Figma, Next.js, Prototype Designing", preview: "https://predap-ai-guide.vercel.app", source: "https://github.com/bhavya1006/Hackbyte-3.0" },
    { id: "p6", name: "Water Supply Management | Hack'ndore", tag: "Hardware, React, Frontend", preview: "", source: "https://github.com/ayushmanlakshkar/Hack-Ndore" },
  ]
  return (
    <Panel ariaLabel="Projects list">
      <div
        className={cn("opacity-0", ready && "animate-[soft-rise-in_1500ms_cubic-bezier(0.22,1,0.36,1)_260ms_forwards]")}
      >
        <header className="mb-3">
          <h3 className="text-lg font-semibold text-foreground">Projects</h3>
          <p className="text-xs text-muted-foreground">
            Personal projects, open source, and more
          </p>
        </header>
        <ul className="space-y-2 max-h-[350px] overflow-auto pr-1 scrollbar-thin scrollbar-thumb-black/30 scrollbar-track-black/10">
          <style>{`
          ul::-webkit-scrollbar {
            width: 6px;
            background: rgba(0,0,0,0.1);
          }
          ul::-webkit-scrollbar-thumb {
            background: rgba(0,0,0,0.3);
            border-radius: 4px;
          }
        `}</style>
          {projects.map((p, i) => (
            <li
              key={p.id}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-3 py-2"
              style={i >= 8 ? { display: 'none' } : {}}
            >
              <div>
                <p className="text-sm text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.tag}</p>
              </div>
              <div className="flex gap-2">
                {p.preview && (
                  <a
                    className="text-[10px] text-green-400 underline"
                    href={p.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Preview
                  </a>
                )}
                {p.source && (
                  <a
                    className="text-[10px] text-blue-400 underline"
                    href={p.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  )
}

function Stars({
  value,
  onChange,
  size = 18,
}: {
  value: number
  onChange: (v: number) => void
  size?: number
}) {
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          role="radio"
          aria-checked={value === i}
          onClick={() => onChange(i)}
          className="group"
          title={`${i} star${i > 1 ? "s" : ""}`}
        >
          <Star
            className={cn("transition-colors", value >= i ? "text-yellow-400 fill-yellow-400" : "text-white/30")}
            style={{ width: size, height: size }}
          />
        </button>
      ))}
    </div>
  )
}

function FeedbackPanel({
  onSubmit,
  ready,
}: {
  onSubmit: (data: { name: string; message: string; rating: number }) => void
  ready: boolean
}) {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [rating, setRating] = useState(0)

  return (
    <Panel ariaLabel="Comments and rating">
      <div
        className={cn("opacity-0", ready && "animate-[soft-rise-in_1550ms_cubic-bezier(0.22,1,0.36,1)_320ms_forwards]")}
      >
        <header className="mb-3">
          <h3 className="text-lg font-semibold text-foreground">Feedback</h3>
          <p className="text-xs text-muted-foreground">Leave a comment and rate this portfolio</p>
        </header>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (!message.trim() || rating === 0) return
            onSubmit({ name: name.trim() || "Anonymous", message: message.trim(), rating })
            setMessage("")
            setName("")
            setRating(0)
          }}
          className="flex flex-col gap-3"
        >
          <Stars value={rating} onChange={setRating} />
          <input
            type="text"
            placeholder="Your name (optional)"
            className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-foreground placeholder:text-white/40 outline-none focus:ring-2 focus:ring-blue-400/50"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Say something about this portfolio..."
            className="w-full min-h-24 rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-foreground placeholder:text-white/40 outline-none focus:ring-2 focus:ring-blue-400/50"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-md border border-white/10 bg-blue-500/20 px-4 py-2 text-sm text-blue-300 hover:bg-blue-500/30"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Panel>
  )
}

function CommentsList({ items }: { items: Comment[] }) {
  if (items.length === 0) {
    return <p className="text-xs text-muted-foreground">No comments yet. Be the first!</p>
  }
  return (
    <ul className="mt-3 max-h-40 overflow-auto space-y-3 pr-1">
      {items.map((c) => (
        <li key={c.id} className="rounded-md border border-white/10 bg-black/20 p-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-foreground">{c.name}</p>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              <span className="text-[11px] text-foreground">{c.rating}</span>
            </div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{c.message}</p>
        </li>
      ))}
    </ul>
  )
}


export default function HomePage() {
  const isMobile = useIsMobile()
  const [showSplash, setShowSplash] = useState(true)
  const { comments, add, avgRating } = useLocalFeedback()
  const panelsReady = !showSplash

  return (
    <main className="relative min-h-screen bg-[radial-gradient(1200px_800px_at_80%_-10%,rgba(59,130,246,0.15),transparent),radial-gradient(900px_700px_at_-10%_90%,rgba(250,204,21,0.10),transparent)]">
      {showSplash && <SplashHero name="Bhavyaa Madan" onDone={() => setShowSplash(false)} />}

      {isMobile ? (
        // Mobile: stacked, ProjectsPanel above FeedbackPanel
        <div className="flex flex-col gap-4 p-3">
          <SocialPanel rating={avgRating} ready={panelsReady} />
          <NamePanel name="Bhavyaa Madan" ready={panelsReady} />
          <ProjectsPanel ready={panelsReady} />
          <FeedbackPanel
            ready={panelsReady}
            onSubmit={(d) => {
              add({ name: d.name, message: d.message, rating: d.rating })
            }}
          />
          <Panel ariaLabel="Recent comments">
            <div
              className={cn(
                "opacity-0",
                panelsReady && "animate-[soft-rise-in_1650ms_cubic-bezier(0.22,1,0.36,1)_380ms_forwards]",
              )}
            >
              <h3 className="text-lg font-semibold text-foreground">Recent</h3>
              <CommentsList items={comments} />
            </div>
          </Panel>
        </div>
      ) : (
        // Desktop: original grid layout
        <div
          className="grid grid-cols-2 grid-rows-none grid-flow-row-dense gap-4 p-3 h-screen
          md:grid-cols-3 md:grid-rows-none
          sm:grid-cols-1 sm:grid-rows-none sm:gap-4"
        >
          <div className="col-span-2 grid gap-6">
            <div className="col-span-2 col-start-1 row-start-1">
              <SocialPanel rating={avgRating} ready={panelsReady} />
            </div>
            <div className="row-start-2 col-start-2">
              <NamePanel name="Bhavyaa Madan" ready={panelsReady} />
            </div>
            <div className="col-span-2">
              <FeedbackPanel
                ready={panelsReady}
                onSubmit={(d) => {
                  add({ name: d.name, message: d.message, rating: d.rating })
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="col-start-3 col-span-2 ">
              <ProjectsPanel ready={panelsReady} />
            </div>
            <div className="col-span-1 col-start-3">
              <Panel ariaLabel="Recent comments">
                <div
                  className={cn(
                    "opacity-0",
                    panelsReady && "animate-[soft-rise-in_1650ms_cubic-bezier(0.22,1,0.36,1)_380ms_forwards]",
                  )}
                >
                  <h3 className="text-lg font-semibold text-foreground">Recent</h3>
                  <CommentsList items={comments} />
                </div>
              </Panel>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
//        <div className="row-start-2 col-start-1">
//          <ImagePanel ready={panelsReady} />
//        </div>


