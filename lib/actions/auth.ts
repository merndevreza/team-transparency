"use server"

import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

export interface AuthResult {
  error?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Only in-app paths, never protocol-relative "//evil.com".
const safeNext = (next?: string): string =>
  next && /^\/(?!\/)/.test(next) ? next : "/dashboard"

export const signUpCompany = async (input: {
  companyName?: string
  fullName: string
  email: string
  password: string
  inviteToken?: string
}): Promise<AuthResult> => {
  const fullName = input.fullName.trim()
  const email = input.email.trim().toLowerCase()
  const companyName = input.companyName?.trim() ?? ""
  const inviteToken = input.inviteToken?.trim()

  if (!inviteToken && !companyName)
    return { error: "Your company name is required" }
  if (!fullName) return { error: "Your name is required" }
  if (!EMAIL_PATTERN.test(email))
    return { error: "Enter a valid email address" }
  if (input.password.length < 8)
    return { error: "Passwords need at least 8 characters" }

  const supabase = createClient(await cookies())
  const { data, error } = await supabase.auth.signUp({
    email,
    password: input.password,
    options: {
      data: {
        company_name: companyName,
        full_name: fullName,
        ...(inviteToken ? { invite_token: inviteToken } : {}),
      },
    },
  })

  if (error) {
    return {
      error:
        error.message === "User already registered"
          ? "An account with this email already exists — try logging in"
          : error.message,
    }
  }
  if (!data.session) {
    return { error: "Please confirm your email before signing in" }
  }

  redirect("/dashboard")
}

export const signIn = async (input: {
  email: string
  password: string
  next?: string
}): Promise<AuthResult> => {
  const supabase = createClient(await cookies())
  const { data, error } = await supabase.auth.signInWithPassword({
    email: input.email.trim().toLowerCase(),
    password: input.password,
  })

  if (error) {
    return {
      error: error.status === 400 ? "Invalid email or password" : error.message,
    }
  }

  await supabase
    .from("profiles")
    .update({ last_login_at: new Date().toISOString() })
    .eq("id", data.user.id)

  redirect(safeNext(input.next))
}

export const requestPasswordReset = async (
  email: string
): Promise<AuthResult> => {
  const trimmed = email.trim().toLowerCase()
  if (!EMAIL_PATTERN.test(trimmed))
    return { error: "Enter a valid email address" }

  const supabase = createClient(await cookies())
  const origin = (await headers()).get("origin") ?? "http://localhost:3000"

  // Deliberately ignores errors so the endpoint can't be used to probe accounts.
  await supabase.auth.resetPasswordForEmail(trimmed, {
    redirectTo: `${origin}/auth/confirm?next=/reset-password`,
  })

  return {}
}

export const resetPassword = async (
  newPassword: string
): Promise<AuthResult> => {
  const supabase = createClient(await cookies())
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Your session has expired — request a new link" }

  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) return { error: error.message }

  redirect("/dashboard")
}

export const signOut = async (): Promise<void> => {
  const supabase = createClient(await cookies())
  await supabase.auth.signOut()
  redirect("/login")
}
