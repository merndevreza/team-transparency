import type { Metadata } from "next"
import { notFound } from "next/navigation"
import SummaryView from "@/components/summary/SummaryView"
import { getProfileById, listProfilesAsMap } from "@/lib/data/profiles"
import { getSummary } from "@/lib/data/summary"
import { listLabelsById } from "@/lib/data/taxonomy"

export const metadata: Metadata = {
  title: "About others — Team Transparency",
}

export default async function AboutOtherSummaryPage(
  props: PageProps<"/about-others/[id]/summary">
) {
  const { id } = await props.params
  const user = await getProfileById(id)
  if (!user) notFound()

  const [summary, users, labels] = await Promise.all([
    getSummary(user.id),
    listProfilesAsMap(),
    listLabelsById(),
  ])

  return (
    <SummaryView
      user={user}
      summary={summary}
      base={`/about-others/${user.id}`}
      active="summary"
      users={users}
      labels={labels}
    />
  )
}
