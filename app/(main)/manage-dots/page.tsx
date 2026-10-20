import type { Metadata } from "next"
import ManageDotsContent from "./_components/ManageDotsContent"

export const metadata: Metadata = {
  title: "Manage dots — Team Transparency",
}

export default function ManageDotsPage() {
  return <ManageDotsContent />
}
