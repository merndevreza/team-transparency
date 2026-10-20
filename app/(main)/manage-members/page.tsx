import type { Metadata } from "next"
import MembersContent from "./_components/MembersContent"

export const metadata: Metadata = {
  title: "Manage members — Team Transparency",
}

export default function ManageMembersPage() {
  return <MembersContent />
}
