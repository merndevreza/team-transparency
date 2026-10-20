import type { Metadata } from "next"
import MyProfileContent from "./_components/MyProfileContent"

export const metadata: Metadata = {
  title: "My profile — Team Transparency",
}

export default function MyProfilePage() {
  return <MyProfileContent />
}
