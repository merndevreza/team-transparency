import type { Metadata } from "next"
import MyProfileContent from "./_components/MyProfileContent"
import { getCurrentProfile } from "@/lib/data/profiles"

export const metadata: Metadata = {
  title: "My profile — Team Transparency",
}

export default async function MyProfilePage() {
  const profile = await getCurrentProfile()
  if (!profile) return null

  return <MyProfileContent profile={profile} />
}
