import type { Metadata } from "next"
import DotComposer from "@/components/dots/DotComposer"
import {
  getCurrentProfile,
  listProfiles,
  listProfilesAsMap,
} from "@/lib/data/profiles"
import { listCategories, listLabelsById } from "@/lib/data/taxonomy"

export const metadata: Metadata = {
  title: "Give Dots — Team Transparency",
}

export default async function GiveDotPage() {
  const profile = await getCurrentProfile()
  if (!profile) return null

  const [recipients, categories, labels, users] = await Promise.all([
    listProfiles(),
    listCategories(),
    listLabelsById(),
    listProfilesAsMap(),
  ])

  return (
    <DotComposer
      mode="give"
      currentUserId={profile.id}
      recipients={recipients}
      categories={categories}
      labels={labels}
      users={users}
    />
  )
}
