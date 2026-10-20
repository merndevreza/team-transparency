import type { Metadata } from "next"
import DotFeed from "@/components/dots/DotFeed"
import SummaryHeader from "@/components/summary/SummaryHeader"
import SummaryTabs from "@/components/summary/SummaryTabs"
import { getCurrentProfile, listProfilesAsMap } from "@/lib/data/profiles"
import { getGivenDots } from "@/lib/data/dots"
import { listLabelsById } from "@/lib/data/taxonomy"

export const metadata: Metadata = {
  title: "Dots given — Team Transparency",
}

export default async function AboutMeDotsGivenPage() {
  const user = await getCurrentProfile()
  if (!user) return null

  const [entries, users, labels] = await Promise.all([
    getGivenDots(user.id),
    listProfilesAsMap(),
    listLabelsById(),
  ])

  return (
    <div className="tt-page tt-stack">
      <SummaryHeader user={user} />
      <SummaryTabs base="/about-me" active="given" />
      <DotFeed
        entries={entries}
        direction="given"
        showEdit
        showQuality
        users={users}
        labels={labels}
      />
    </div>
  )
}
