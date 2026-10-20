"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server"

export interface TaxonomyResult {
  error?: string
}

const resolveClient = async () => {
  const supabase = createClient(await cookies())
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "You are not signed in" as const }
  return { supabase }
}

export const createCategory = async (name: string): Promise<TaxonomyResult> => {
  const resolved = await resolveClient()
  if ("error" in resolved) return { error: resolved.error }

  const { error } = await resolved.supabase
    .from("dot_categories")
    .insert({ name: name.trim() })
  if (error) return { error: error.message }

  revalidatePath("/", "layout")
  return {}
}

export const renameCategory = async (
  categoryId: string,
  name: string
): Promise<TaxonomyResult> => {
  const resolved = await resolveClient()
  if ("error" in resolved) return { error: resolved.error }

  const { error } = await resolved.supabase
    .from("dot_categories")
    .update({ name: name.trim() })
    .eq("id", categoryId)
  if (error) return { error: error.message }

  revalidatePath("/", "layout")
  return {}
}

export const deleteCategory = async (
  categoryId: string
): Promise<TaxonomyResult> => {
  const resolved = await resolveClient()
  if ("error" in resolved) return { error: resolved.error }

  const { error } = await resolved.supabase
    .from("dot_categories")
    .delete()
    .eq("id", categoryId)
  if (error) return { error: error.message }

  revalidatePath("/", "layout")
  return {}
}

export const createLabel = async (
  categoryId: string,
  name: string
): Promise<TaxonomyResult> => {
  const resolved = await resolveClient()
  if ("error" in resolved) return { error: resolved.error }

  const { data: category } = await resolved.supabase
    .from("dot_categories")
    .select("company_id")
    .eq("id", categoryId)
    .single()
  if (!category) return { error: "That category no longer exists" }

  const { error } = await resolved.supabase.from("dot_labels").insert({
    category_id: categoryId,
    company_id: category.company_id,
    name: name.trim(),
  })
  if (error) return { error: error.message }

  revalidatePath("/", "layout")
  return {}
}

export const renameLabel = async (
  labelId: string,
  name: string
): Promise<TaxonomyResult> => {
  const resolved = await resolveClient()
  if ("error" in resolved) return { error: resolved.error }

  const { error } = await resolved.supabase
    .from("dot_labels")
    .update({ name: name.trim() })
    .eq("id", labelId)
  if (error) return { error: error.message }

  revalidatePath("/", "layout")
  return {}
}

export const deleteLabel = async (labelId: string): Promise<TaxonomyResult> => {
  const resolved = await resolveClient()
  if ("error" in resolved) return { error: resolved.error }

  const { error } = await resolved.supabase
    .from("dot_labels")
    .delete()
    .eq("id", labelId)
  if (error) return { error: error.message }

  revalidatePath("/", "layout")
  return {}
}
