import Image from "next/image"
import designer from "@/public/art/designer-ink.png"
import city from "@/public/art/city-ink.png"
import desk from "@/public/art/desk-ink.png"

const artwork = {
  designer: { src: designer, width: 1024, height: 1536 },
  city: { src: city, width: 1536, height: 1024 },
  desk: { src: desk, width: 1774, height: 887 },
} as const

// Environmental illustrations are decorative, never presented as project screenshots.
export function SceneArt({ art, className = "", priority = false }: {
  art: keyof typeof artwork
  className?: string
  priority?: boolean
}) {
  return (
    <div className={`scene-art scene-art-${art} ${className}`} aria-hidden="true">
      <Image {...artwork[art]} alt="" placeholder="blur" sizes="(max-width: 767px) 95vw, (max-width: 1440px) 60vw, 850px" preload={priority} />
    </div>
  )
}

export function InkBirds() {
  return (
    <svg className="ink-birds" viewBox="0 0 200 90" fill="currentColor" aria-hidden="true">
      <path d="M10 52 36 45 53 27 44 49 68 40 49 58 35 54 25 65 28 53Z M103 18 125 25 145 10 134 29 153 37 130 35 121 44 118 33Z M152 72 168 67 177 55 175 70 194 67 177 80 166 77 159 83Z" />
    </svg>
  )
}
