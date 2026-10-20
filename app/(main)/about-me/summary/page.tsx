import type { Metadata } from "next"
import SummaryView from "@/components/summary/SummaryView"
import { getCurrentProfile } from "@/lib/data/profiles"
import { getSummary } from "@/lib/data/summary"
import { listLabelsById } from "@/lib/data/taxonomy"
import { listProfilesAsMap } from "@/lib/data/profiles"

export const metadata: Metadata = {
  title: "About me — Team Transparency",
}

export default async function AboutMeSummaryPage() {
  const user = await getCurrentProfile()
  if (!user) return null

  const [summary, users, labels] = await Promise.all([
    getSummary(user.id),
    listProfilesAsMap(),
    listLabelsById(),
  ])

  return (
    <SummaryView
      user={user}
      summary={summary}
      base="/about-me"
      active="summary"
      users={users}
      labels={labels}
    />
  )
}
