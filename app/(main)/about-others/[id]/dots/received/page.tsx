import type { Metadata } from "next"
import { notFound } from "next/navigation"
import DotFeed from "@/components/dots/DotFeed"
import SummaryHeader from "@/components/summary/SummaryHeader"
import SummaryTabs from "@/components/summary/SummaryTabs"
import { getProfileById, listProfilesAsMap } from "@/lib/data/profiles"
import { getReceivedDots } from "@/lib/data/dots"
import { listLabelsById } from "@/lib/data/taxonomy"

export const metadata: Metadata = {
  title: "Dots received — Team Transparency",
}

export default async function AboutOtherDotsReceivedPage(
  props: PageProps<"/about-others/[id]/dots/received">
) {
  const { id } = await props.params
  const user = await getProfileById(id)
  if (!user) notFound()

  const [entries, users, labels] = await Promise.all([
    getReceivedDots(user.id),
    listProfilesAsMap(),
    listLabelsById(),
  ])

  return (
    <div className="tt-page tt-stack">
      <SummaryHeader user={user} />
      <SummaryTabs base={`/about-others/${user.id}`} active="received" />
      <DotFeed
        entries={entries}
        direction="received"
        users={users}
        labels={labels}
      />
    </div>
  )
}
