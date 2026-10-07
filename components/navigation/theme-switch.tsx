"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"

const subscribe = () => () => {}

export function ThemeSwitch() {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)
  const { theme, setTheme } = useTheme()

  return (
    <div className="theme-switch">
      <label htmlFor="theme">Theme</label>
      <select
        id="theme"
        value={mounted ? theme ?? "system" : "system"}
        disabled={!mounted}
        onChange={(event) => setTheme(event.target.value)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  )
}
