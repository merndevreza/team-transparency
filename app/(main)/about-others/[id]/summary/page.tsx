import type { Metadata } from "next"
import { notFound } from "next/navigation"
import SummaryView from "@/components/summary/SummaryView"
import { getUserById } from "@/lib/demo-data/users"
import { getSummary } from "@/lib/demo-data/summary"

export const metadata: Metadata = {
  title: "About others — Team Transparency",
}

export default async function AboutOtherSummaryPage(
  props: PageProps<"/about-others/[id]/summary">
) {
  const { id } = await props.params
  const user = getUserById(id)
  if (!user) notFound()

  const summary = getSummary(user.id)

  return (
    <SummaryView
      user={user}
      summary={summary}
      base={`/about-others/${user.id}`}
      active="summary"
    />
  )
}
