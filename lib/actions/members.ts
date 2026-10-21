"use server"

import { cookies, headers } from "next/headers"
import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server"
import { createAdminClient } from "@/utils/supabase/admin"
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

// Admin directly creates the account with a temporary password (shared
// out-of-band). Uses the service-role client; the signup trigger places the
// user into the admin's company thanks to the join_company_id metadata +
// service_role claim check.
export const createMember = async (input: {
  name: string
  email: string
  role: UserRole
  temporaryPassword: string
}): Promise<MemberResult> => {
  const resolved = await resolveClient()
  if ("error" in resolved) return { error: resolved.error }

  // Only admins may create members.
  const { data: admin } = await resolved.supabase
    .from("profiles")
    .select("company_id, role")
    .eq("id", resolved.userId)
    .single()
  if (!admin) return { error: "Your profile could not be found" }
  if (admin.role !== "admin") return { error: "Only admins can create members" }

  const email = input.email.trim().toLowerCase()
  const name = input.name.trim()
  if (!name) return { error: "The name is required" }
  if (!email) return { error: "The email is required" }
  if (input.temporaryPassword.length < 8)
    return { error: "Temporary passwords need at least 8 characters" }

  const { data: existing } = await resolved.supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle()
  if (existing)
    return { error: "Someone with this email is already in the workspace" }

  let adminClient
  try {
    adminClient = createAdminClient()
  } catch {
    return {
      error:
        "The server is missing SUPABASE_SERVICE_ROLE_KEY — add it to .env.local",
    }
  }

  const { error: createError } = await adminClient.auth.admin.createUser({
    email,
    password: input.temporaryPassword,
    email_confirm: true,
    user_metadata: {
      full_name: name,
      join_company_id: admin.company_id,
      join_role: input.role,
    },
  })
  if (createError) {
    return {
      error:
        createError.message === "User already registered"
          ? "Someone with this email already exists"
          : createError.message,
    }
  }

  revalidatePath("/", "layout")
  return {}
}

// Invite flow: share a signup link — registering through it joins the
// admin's company.
export const inviteMember = async (input: {
  email: string
  role: UserRole
}): Promise<MemberResult> => {
  const resolved = await resolveClient()
  if ("error" in resolved) return { error: resolved.error }

  const email = input.email.trim().toLowerCase()
  const { data: profile } = await resolved.supabase
    .from("profiles")
    .select("company_id")
    .eq("id", resolved.userId)
    .single()
  if (!profile) return { error: "Your profile could not be found" }

  const { data: existing } = await resolved.supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle()
  if (existing)
    return { error: "Someone with this email is already in the workspace" }

  const { data: invite, error: inviteError } = await resolved.supabase
    .from("invites")
    .upsert(
      { company_id: profile.company_id, email, role: input.role },
      { onConflict: "company_id,email" }
    )
    .select("token")
    .single()
  if (inviteError || !invite)
    return { error: inviteError?.message ?? "Could not create the invite" }

  const origin = (await headers()).get("origin") ?? "http://localhost:3000"
  return {
    signupUrl: `${origin}/register?invite=${invite.token}&email=${encodeURIComponent(email)}`,
  }
}
