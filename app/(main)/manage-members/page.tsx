import type { Metadata } from "next"
import MembersContent from "./_components/MembersContent"
import { getCurrentProfile, listProfiles } from "@/lib/data/profiles"

export const metadata: Metadata = {
  title: "Manage members — Team Transparency",
}

export default async function ManageMembersPage() {
  const [profile, members] = await Promise.all([
    getCurrentProfile(),
    listProfiles(),
  ])
  if (!profile) return null

  return <MembersContent members={members} currentUserId={profile.id} />
}
