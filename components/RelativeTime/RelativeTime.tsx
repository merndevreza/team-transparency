"use client"

import { useSyncExternalStore } from "react"

const DAY_MS = 24 * 60 * 60 * 1000

const formatAbsolute = (iso: string): string =>
  new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(iso))

const formatRelative = (iso: string): string => {
  const diffMs = Date.now() - Date.parse(iso)
  const days = Math.floor(diffMs / DAY_MS)
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" })
  if (days < 1) {
    const hours = Math.max(1, Math.floor(diffMs / (60 * 60 * 1000)))
    return formatter.format(-hours, "hour")
  }
  if (days < 7) return formatter.format(-days, "day")
  if (days < 30) return formatter.format(-Math.floor(days / 7), "week")
  if (days < 365) return formatter.format(-Math.floor(days / 30), "month")
  return formatter.format(-Math.floor(days / 365), "year")
}

// Time advances on its own; no subscription needed — the snapshot is
// re-checked on every render and day-granularity strings are stable.
const emptySubscribe = () => () => {}

interface RelativeTimeProps {
  iso: string
}

export default function RelativeTime({ iso }: RelativeTimeProps) {
  const label = useSyncExternalStore(
    emptySubscribe,
    () => formatRelative(iso),
    () => formatAbsolute(iso)
  )

  return <span title={formatAbsolute(iso)}>{label}</span>
}
