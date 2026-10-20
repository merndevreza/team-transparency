import type { Metadata } from "next"
import { notFound } from "next/navigation"
import DotComposer from "@/components/dots/DotComposer"
import {
  getCurrentProfile,
  listProfiles,
  listProfilesAsMap,
} from "@/lib/data/profiles"
import { listCategories, listLabelsById } from "@/lib/data/taxonomy"
import { getDotById } from "@/lib/data/dots"

export const metadata: Metadata = {
  title: "Edit dot — Team Transparency",
}

export default async function EditDotPage(props: PageProps<"/edit-dot/[id]">) {
  const { id } = await props.params
  const [entry, profile] = await Promise.all([
    getDotById(id),
    getCurrentProfile(),
  ])
  if (!entry) notFound()
  if (!profile) return null

  const [recipients, categories, labels, users] = await Promise.all([
    listProfiles(),
    listCategories(),
    listLabelsById(),
    listProfilesAsMap(),
  ])

  return (
    <DotComposer
      mode="edit"
      entry={entry}
      currentUserId={profile.id}
      recipients={recipients}
      categories={categories}
      labels={labels}
      users={users}
    />
  )
}
