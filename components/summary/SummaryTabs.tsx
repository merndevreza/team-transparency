"use client"

import { useRouter } from "next/navigation"
import { Segmented } from "antd"

export type SummaryTab = "summary" | "received" | "given"

const TAB_OPTIONS = [
  { label: "Summary", value: "summary" },
  { label: "Dots Received", value: "received" },
  { label: "Dots Given", value: "given" },
]

const HREFS: Record<SummaryTab, (base: string) => string> = {
  summary: (base) => `${base}/summary`,
  received: (base) => `${base}/dots/received`,
  given: (base) => `${base}/dots/given`,
}

interface SummaryTabsProps {
  base: string
  active: SummaryTab
}

export default function SummaryTabs({ base, active }: SummaryTabsProps) {
  const router = useRouter()

  return (
    <Segmented
      value={active}
      options={TAB_OPTIONS}
      onChange={(value) => router.push(HREFS[value as SummaryTab](base))}
    />
  )
}
