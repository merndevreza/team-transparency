import type { Metadata } from "next"
import { notFound } from "next/navigation"
import DotFeed from "@/components/dots/DotFeed"
import SummaryHeader from "@/components/summary/SummaryHeader"
import SummaryTabs from "@/components/summary/SummaryTabs"
import { getUserById } from "@/lib/demo-data/users"
import { getReceivedDots } from "@/lib/demo-data/dots"

export const metadata: Metadata = {
  title: "Dots received — Team Transparency",
}

export default async function AboutOtherDotsReceivedPage(
  props: PageProps<"/about-others/[id]/dots/received">
) {
  const { id } = await props.params
  const user = getUserById(id)
  if (!user) notFound()

  const entries = getReceivedDots(user.id)

  return (
    <div className="tt-page tt-stack">
      <SummaryHeader user={user} />
      <SummaryTabs base={`/about-others/${user.id}`} active="received" />
      <DotFeed entries={entries} direction="received" />
    </div>
  )
}
