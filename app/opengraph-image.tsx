import { ImageResponse } from "next/og"

export const alt = "Bhavya Madan — UI/UX Designer & Creative Developer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "#f7f3ea", color: "#171715", padding: "48px 64px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 4 }}><span>PORTFOLIO / DESIGN & CODE</span><span>01 —</span></div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 142, lineHeight: 0.94, fontWeight: 900, letterSpacing: -9, marginTop: 40 }}><span>BHAVYA</span><span>MADAN<span style={{ color: "#ac3c27" }}>.</span></span></div>
      <div style={{ display: "flex", marginTop: 32, fontSize: 28, fontWeight: 700 }}>UI/UX DESIGNER & CREATIVE DEVELOPER</div>
      <svg width="360" height="440" viewBox="0 0 360 440" style={{ position: "absolute", right: 38, top: 120 }}><path d="M180 0C-60 110 370 115 225 255S-15 310 160 435" fill="none" stroke="#ac3c27" strokeWidth="9" /><circle cx="160" cy="435" r="5" fill="#ac3c27" /></svg>
    </div>, size,
  )
}
