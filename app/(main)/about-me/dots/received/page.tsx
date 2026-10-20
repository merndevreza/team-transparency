import type { Metadata } from "next"
import DotFeed from "@/components/dots/DotFeed"
import SummaryHeader from "@/components/summary/SummaryHeader"
import SummaryTabs from "@/components/summary/SummaryTabs"
import { getCurrentUser } from "@/lib/demo-data/current-user"
import { getReceivedDots } from "@/lib/demo-data/dots"

export const metadata: Metadata = {
  title: "Dots received — Team Transparency",
}

export default function AboutMeDotsReceivedPage() {
  const user = getCurrentUser()
  const entries = getReceivedDots(user.id)

  return (
    <div className="tt-page tt-stack">
      <SummaryHeader user={user} />
      <SummaryTabs base="/about-me" active="received" />
      <DotFeed entries={entries} direction="received" showQuality />
    </div>
  )
}
