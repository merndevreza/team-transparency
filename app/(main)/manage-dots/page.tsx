import type { Metadata } from "next"
import ManageDotsContent from "./_components/ManageDotsContent"
import { listCategories } from "@/lib/data/taxonomy"

export const metadata: Metadata = {
  title: "Manage dots — Team Transparency",
}

export default async function ManageDotsPage() {
  const categories = await listCategories()

  return <ManageDotsContent categories={categories} />
}
