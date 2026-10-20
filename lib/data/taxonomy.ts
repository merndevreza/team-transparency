import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import type { DotCategory, DotLabel } from "./types"

const mapLabel = (row: {
  id: string
  category_id: string
  name: string
}): DotLabel => ({
  id: row.id,
  categoryId: row.category_id,
  name: row.name,
})

export const listCategories = async (): Promise<DotCategory[]> => {
  const supabase = createClient(await cookies())
  const { data } = await supabase
    .from("dot_categories")
    .select("*, dot_labels(id, category_id, name)")
    .order("name", { ascending: true })
  if (!data) return []

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    labels: (row.dot_labels ?? [])
      .map(mapLabel)
      .sort((a: DotLabel, b: DotLabel) => a.name.localeCompare(b.name)),
  }))
}

export const listLabelsById = async (): Promise<Record<string, DotLabel>> => {
  const supabase = createClient(await cookies())
  const { data } = await supabase
    .from("dot_labels")
    .select("id, category_id, name")
  if (!data) return {}

  return Object.fromEntries(
    data.map(mapLabel).map((label) => [label.id, label])
  )
}

export const getLabelById = async (id: string): Promise<DotLabel | null> => {
  const supabase = createClient(await cookies())
  const { data } = await supabase
    .from("dot_labels")
    .select("id, category_id, name")
    .eq("id", id)
    .single()
  if (!data) return null

  return mapLabel(data)
}
