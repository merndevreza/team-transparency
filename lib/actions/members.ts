"use server"

import { cookies, headers } from "next/headers"
import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server"
import type { UserRole, UserStatus } from "@/lib/data/types"

export interface MemberResult {
  error?: string
  signupUrl?: string
}

const resolveClient = async () => {
  const supabase = createClient(await cookies())
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "You are not signed in" as const }
  return { supabase, userId: user.id }
}

export const updateMember = async (
  memberId: string,
  input: Partial<{ name: string; role: UserRole; status: UserStatus }>
): Promise<MemberResult> => {
  const resolved = await resolveClient()
  if ("error" in resolved) return { error: resolved.error }

  const patch: Record<string, string> = {}
  if (input.name !== undefined) patch.full_name = input.name.trim()
  if (input.role !== undefined) patch.role = input.role
  if (input.status !== undefined) patch.status = input.status
  if (Object.keys(patch).length === 0) return {}

  const { error } = await resolved.supabase
    .from("profiles")
    .update(patch)
    .eq("id", memberId)

  if (error) return { error: error.message }

  revalidatePath("/", "layout")
  return {}
}

export const removeMember = async (memberId: string): Promise<MemberResult> => {
  const resolved = await resolveClient()
  if ("error" in resolved) return { error: resolved.error }
  if (resolved.userId === memberId) {
    return { error: "You can't remove yourself" }
  }

  const { error } = await resolved.supabase
    .from("profiles")
    .delete()
    .eq("id", memberId)

  if (error) return { error: error.message }

  revalidatePath("/", "layout")
  return {}
}

// Creating auth users needs the service-role key, so admins share a signup
// link instead. A real invite-email flow is future work (Edge Function).
export const inviteMember = async (input: {
  email: string
}): Promise<MemberResult> => {
  const resolved = await resolveClient()
  if ("error" in resolved) return { error: resolved.error }

  const email = input.email.trim().toLowerCase()
  const { data: existing } = await resolved.supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle()
  if (existing)
    return { error: "Someone with this email is already in the workspace" }

  const origin = (await headers()).get("origin") ?? "http://localhost:3000"
  return { signupUrl: `${origin}/register?email=${encodeURIComponent(email)}` }
}
