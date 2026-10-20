import type { Metadata } from "next"
import { cookies } from "next/headers"
import DirectoryContent from "./_components/DirectoryContent"
import { createClient } from "@/utils/supabase/server"
import { getCurrentProfile, listProfiles } from "@/lib/data/profiles"

export const metadata: Metadata = {
  title: "About others — Team Transparency",
}

export default async function AboutOthersPage() {
  const profile = await getCurrentProfile()
  if (!profile) return null

  const supabase = createClient(await cookies())
  const [{ data: dotRows }, people] = await Promise.all([
    supabase.from("dots").select("giver_id, receiver_id"),
    listProfiles(),
  ])

  const counts = new Map<string, { received: number; given: number }>()
  ;(dotRows ?? []).forEach((row) => {
    const entry = counts.get(row.receiver_id) ?? { received: 0, given: 0 }
    entry.received += 1
    counts.set(row.receiver_id, entry)
    const giverEntry = counts.get(row.giver_id) ?? { received: 0, given: 0 }
    giverEntry.given += 1
    counts.set(row.giver_id, giverEntry)
  })

  const entries = people
    .filter((person) => person.id !== profile.id)
    .map((person) => ({
      user: person,
      received: counts.get(person.id)?.received ?? 0,
      given: counts.get(person.id)?.given ?? 0,
    }))

  return <DirectoryContent currentUserId={profile.id} entries={entries} />
}
