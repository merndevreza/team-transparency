import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import type { Profile } from "./types"

interface ProfileRow {
  id: string
  full_name: string
  email: string
  role: Profile["role"]
  status: Profile["status"]
  last_login_at: string | null
  created_at: string
}

const mapProfile = (row: ProfileRow): Profile => ({
  id: row.id,
  name: row.full_name,
  email: row.email,
  role: row.role,
  status: row.status,
  lastLoginAt: row.last_login_at,
  joinedAt: row.created_at,
})

export const getCurrentProfile = async (): Promise<Profile | null> => {
  const supabase = createClient(await cookies())
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()
  if (!data) return null

  return mapProfile(data as ProfileRow)
}

export const getProfileById = async (id: string): Promise<Profile | null> => {
  const supabase = createClient(await cookies())
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single()
  if (!data) return null

  return mapProfile(data as ProfileRow)
}

export const listProfiles = async (): Promise<Profile[]> => {
  const supabase = createClient(await cookies())
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: true })
  if (!data) return []

  return data.map(mapProfile)
}

export const listProfilesAsMap = async (): Promise<Record<string, Profile>> => {
  const profiles = await listProfiles()
  return Object.fromEntries(profiles.map((profile) => [profile.id, profile]))
}
