import type { Metadata } from "next"
import SectionCard from "@/components/summary/SectionCard"
import AddMemberForm from "./_components/AddMemberForm"

export const metadata: Metadata = {
  title: "Invite member — Team Transparency",
}

export default function AddMemberPage() {
  return (
    <div className="tt-page tt-stack tt-narrow">
      <SectionCard title="Invite a member">
        <AddMemberForm />
      </SectionCard>
    </div>
  )
}
