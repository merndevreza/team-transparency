import type { Metadata } from "next"
import { notFound } from "next/navigation"
import DotComposer from "@/components/dots/DotComposer"
import { getDotById } from "@/lib/demo-data/dots"

export const metadata: Metadata = {
  title: "Edit dot — Team Transparency",
}

export default async function EditDotPage(props: PageProps<"/edit-dot/[id]">) {
  const { id } = await props.params
  const entry = getDotById(id)
  if (!entry) notFound()

  return <DotComposer mode="edit" entry={entry} />
}
