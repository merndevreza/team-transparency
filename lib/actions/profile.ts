"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server"

export interface ProfileResult {
  error?: string
}

export const updateName = async (name: string): Promise<ProfileResult> => {
  const supabase = createClient(await cookies())
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "You are not signed in" }

  const trimmed = name.trim()
  if (!trimmed) return { error: "Your name is required" }

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: trimmed })
    .eq("id", user.id)
  if (error) return { error: error.message }

  revalidatePath("/", "layout")
  return {}
}

export const updatePassword = async (input: {
  currentPassword: string
  newPassword: string
}): Promise<ProfileResult> => {
  const supabase = createClient(await cookies())
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "You are not signed in" }

  // Verify the current password first — updateUser alone would change it
  // without checking.
  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: user.email ?? "",
    password: input.currentPassword,
  })
  if (verifyError) return { error: "Your current password is incorrect" }

  const { error } = await supabase.auth.updateUser({
    password: input.newPassword,
  })
  if (error) return { error: error.message }

  revalidatePath("/", "layout")
  return {}
}
