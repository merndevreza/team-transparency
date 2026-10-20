import type { Metadata } from "next"
import DotFeed from "@/components/dots/DotFeed"
import SummaryHeader from "@/components/summary/SummaryHeader"
import SummaryTabs from "@/components/summary/SummaryTabs"
import { getCurrentUser } from "@/lib/demo-data/current-user"
import { getGivenDots } from "@/lib/demo-data/dots"

export const metadata: Metadata = {
  title: "Dots given — Team Transparency",
}

export default function AboutMeDotsGivenPage() {
  const user = getCurrentUser()
  const entries = getGivenDots(user.id)

  return (
    <div className="tt-page tt-stack">
      <SummaryHeader user={user} />
      <SummaryTabs base="/about-me" active="given" />
      <DotFeed entries={entries} direction="given" showEdit showQuality />
    </div>
  )
}
