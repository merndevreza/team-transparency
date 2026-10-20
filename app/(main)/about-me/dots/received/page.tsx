import type { Metadata } from "next"
import DotFeed from "@/components/dots/DotFeed"
import SummaryHeader from "@/components/summary/SummaryHeader"
import SummaryTabs from "@/components/summary/SummaryTabs"
import { getCurrentProfile, listProfilesAsMap } from "@/lib/data/profiles"
import { getReceivedDots } from "@/lib/data/dots"
import { listLabelsById } from "@/lib/data/taxonomy"

export const metadata: Metadata = {
  title: "Dots received — Team Transparency",
}

export default async function AboutMeDotsReceivedPage() {
  const user = await getCurrentProfile()
  if (!user) return null

  const [entries, users, labels] = await Promise.all([
    getReceivedDots(user.id),
    listProfilesAsMap(),
    listLabelsById(),
  ])

  return (
    <div className="tt-page tt-stack">
      <SummaryHeader user={user} />
      <SummaryTabs base="/about-me" active="received" />
      <DotFeed
        entries={entries}
        direction="received"
        showQuality
        users={users}
        labels={labels}
      />
    </div>
  )
}
