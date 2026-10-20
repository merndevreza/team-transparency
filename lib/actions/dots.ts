"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server"
import type { Sentiment } from "@/lib/data/types"

export interface DotsResult {
  error?: string
}

export const giveDots = async (input: {
  recipientIds: string[]
  selections: Record<string, Sentiment>
  comment: string
}): Promise<DotsResult> => {
  const supabase = createClient(await cookies())
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "You are not signed in" }

  const comment = input.comment.trim()
  const selections = Object.entries(input.selections)
  if (input.recipientIds.length === 0)
    return { error: "Pick at least one recipient" }
  if (selections.length === 0) return { error: "Pick at least one attribute" }
  if (!comment) return { error: "Write a few words about what happened" }

  const { data: profile } = await supabase
    .from("profiles")
    .select("company_id")
    .eq("id", user.id)
    .single()
  if (!profile) return { error: "Your profile could not be found" }

  const { data: created, error: dotsError } = await supabase
    .from("dots")
    .insert(
      input.recipientIds.map((recipientId) => ({
        company_id: profile.company_id,
        giver_id: user.id,
        receiver_id: recipientId,
        comment,
      }))
    )
    .select("id")
  if (dotsError) return { error: dotsError.message }
  if (!created) return { error: "The dots could not be saved" }

  const details = created.flatMap((dot) =>
    selections.map(([labelId, sentiment]) => ({
      dot_id: dot.id,
      label_id: labelId,
      sentiment,
    }))
  )
  const { error: detailsError } = await supabase
    .from("dot_details")
    .insert(details)
  if (detailsError) return { error: detailsError.message }

  revalidatePath("/", "layout")
  return {}
}

export const editDot = async (input: {
  dotId: string
  selections: Record<string, Sentiment>
  comment: string
}): Promise<DotsResult> => {
  const supabase = createClient(await cookies())
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "You are not signed in" }

  const comment = input.comment.trim()
  const selections = Object.entries(input.selections)
  if (selections.length === 0) return { error: "Pick at least one attribute" }
  if (!comment) return { error: "Write a few words about what happened" }

  const { error: updateError } = await supabase
    .from("dots")
    .update({ comment })
    .eq("id", input.dotId)
    .eq("giver_id", user.id)
  if (updateError) return { error: updateError.message }

  const { error: detailsError } = await supabase.rpc("replace_dot_details", {
    p_dot_id: input.dotId,
    p_details: selections.map(([labelId, sentiment]) => ({
      label_id: labelId,
      sentiment,
    })),
  })
  if (detailsError) return { error: detailsError.message }

  revalidatePath("/", "layout")
  return {}
}
