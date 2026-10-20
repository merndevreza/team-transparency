import type { Metadata } from "next"
import SummaryView from "@/components/summary/SummaryView"
import { getCurrentUser } from "@/lib/demo-data/current-user"
import { getSummary } from "@/lib/demo-data/summary"

export const metadata: Metadata = {
  title: "About me — Team Transparency",
}

export default function AboutMeSummaryPage() {
  const user = getCurrentUser()
  const summary = getSummary(user.id)

  return (
    <SummaryView
      user={user}
      summary={summary}
      base="/about-me"
      active="summary"
    />
  )
}
