import type { ReactNode } from "react"

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return <p className="section-label"><span>{index}</span>{children}</p>
}

export function PanelNumber({ value }: { value: string }) {
  return <span className="panel-number" aria-hidden="true">{value}</span>
}

export function EditorialDivider({ label }: { label: string }) {
  return <div className="editorial-divider" aria-hidden="true"><span>+</span><span>{label}</span><span>+</span></div>
}
