"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { App as AntApp, ConfigProvider, theme as antdTheme } from "antd"
import { useThemeStore, type Theme } from "@/lib/store/themeStore"

const LIGHT_TOKENS = {
  colorPrimary: "#4cae66",
  colorSuccess: "#4cae66",
  colorInfo: "#4f9bd7",
  colorLink: "#4f9bd7",
  colorWarning: "#ff8f00",
  colorError: "#d95555",
  borderRadius: 12,
  fontFamily: "var(--font-body), sans-serif",
}

const DARK_TOKENS = {
  colorPrimary: "#58c273",
  colorSuccess: "#58c273",
  colorInfo: "#5fa9de",
  colorLink: "#5fa9de",
  colorWarning: "#ffa133",
  colorError: "#e06a6a",
  borderRadius: 12,
  fontFamily: "var(--font-body), sans-serif",
}

const themeConfig = (current: Theme) => ({
  algorithm:
    current === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  token: current === "dark" ? DARK_TOKENS : LIGHT_TOKENS,
  components: {
    Button: { borderRadius: 999 },
  },
})

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useThemeStore((s) => s.theme)
  const setTheme = useThemeStore((s) => s.setTheme)
  const lastSynced = useRef<Theme | null>(null)

  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme")
    const applied: Theme = attr === "dark" ? "dark" : "light"
    lastSynced.current = applied
    if (applied !== theme) setTheme(applied)
    // Run once: adopt the attribute the pre-paint script applied.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (lastSynced.current === null || lastSynced.current === theme) return
    document.documentElement.setAttribute("data-theme", theme)
    lastSynced.current = theme
    try {
      localStorage.setItem("tt-theme", theme)
    } catch {
      // storage unavailable (private mode) — attribute still applies for the session
    }
  }, [theme])

  return (
    <ConfigProvider theme={themeConfig(theme)}>
      <AntApp>{children}</AntApp>
    </ConfigProvider>
  )
}
